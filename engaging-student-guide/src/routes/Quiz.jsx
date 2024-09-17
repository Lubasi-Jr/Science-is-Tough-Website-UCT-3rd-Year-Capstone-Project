import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Quiz.css";
import { useNavigate } from "react-router-dom";
import { Quiz as QuizModel } from "../models/quiz";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../hooks/useAuth";
import { Challenge } from "../models/challenge";

function Quiz() {
  const navigate = useNavigate();

  const { user } = useAuth();
  const { id } = useParams();
  const [quiz, setQuiz] = useState(QuizModel.empty());
  const [isPartOfChallenge, setIsPartOfChallenge] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [challenge, setChallenge] = useState(Challenge.empty());

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const MAX_SCORE = 3;
  useEffect(() => {
    if (showScore && score == MAX_SCORE) {
      // check if student has everything correct to get the points
      async function updateScore() {
        // update the score of the student
        const { error } = await supabase.rpc("update_student_points", {
          student_id: user.id,
          amount: quiz.points,
        });
        if (error) {
          console.log("Error updating score: ", error);
        } else {
          console.log("updated user points ");
          // setQuestions(formatData(data));
        }
      }

      updateScore();
    }

    async function fetchQuizzes(id) {
      const { data, error } = await supabase.rpc("get_quiz", {
        content_id: id,
      });

      if (error) {
        console.log("Error fetching quizzes: ", error);
      } else {
        const q = formatData(data);
        setQuiz(q);
      }
    }

    fetchQuizzes(id);
  }, [id, showScore, score, user, quiz]);

  useEffect(() => {
    // check if quiz is part of a challenge
    if (quiz.id !== "") {
      async function handlePartOfChallenge() {
        if (quiz.challengeId == null) {
          setIsPartOfChallenge(false);
        } else {
          setIsPartOfChallenge(true);

          // fetch the rest of the challenge items
          const { data, error } = await supabase.rpc(
            "get_challenge_and_quizzes",
            {
              challenge_id: quiz.challengeId,
            }
          );
          if (error) {
            console.log(
              "Error fecthing the challenge realted to this quiz: ",
              error
            );
          } else {
            setChallenge(Challenge.fromJson(data));
          }
        }
      }
      handlePartOfChallenge();
    }
  }, [quiz, isPartOfChallenge]);

  async function handleQuizFinished() {
    const item = {
      student_id: user.id,
      complete: true,
      quiz_id: quiz.id,
      challenge_id: challenge.id,
      content_id: quiz.contentId,
    };

    console.log("Inserting the following item: ", item);
    const { error } = await supabase.from("student_quiz").insert(item);

    if (error) {
      console.log("Error fetching quizzes: ", error);
    } else {
      console.log("Successfully inserted item");
      setShowScore(true);
    }
  }

  async function handleNextQuiz(id) {
    navigate(`/quiz/${id}`);
  }

  function formatData(obj) {
    let q = QuizModel.fromJson(obj.quiz);
    q.setQuestions(obj.questions);
    return q;
  }

  const handleRetry = () => {
    setShowScore(false);
    setCurrentQuestion(0);
    setScore(0);
  };

  const handleAnswerClick = () => {
    const isCorrect = quiz.questions[currentQuestion].options.find(
      (option) => option.option === selectedOption
    ).isCorrect;

    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quiz.questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
    } else {
      // setShowScore(true);
      setIsDone(true);
    }
  };

  const handleOptionClick = (opt) => {
    setSelectedOption(opt);
  };

  return (
    <>
      <div style={{ display: "flex", padding: "1em", columnGap: "1em" }}>
        <div className="quiz-container">
          <div className="question-content">{quiz.contentTitle}</div>
          {isDone ? (
            <div className="score-section">
              {showScore ? (
                <div>
                  <h5 style={{ padding: "1em" }}>
                    You scored {score} out of {quiz.questions.length}
                  </h5>
                  <p>
                    You&apos;re doing great! Keep the momentum going by tackling
                    any of the quizzes. Click on one to continue your challenge
                    adventure!
                  </p>
                  <div
                    style={{
                      display: "flex",
                      columnGap: "1em",
                      justifyContent: "center",
                    }}
                  >
                    {/* <button className="quiz-next-btn" onClick={handleNextQuiz}>
                      Next Quiz &gt;
                    </button> */}
                    <button className="quiz-next-btn" onClick={handleRetry}>
                      Retry
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {" "}
                  <button
                    style={{ margin: "1em" }}
                    className="quiz-next-btn"
                    onClick={handleQuizFinished}
                  >
                    Submit quiz
                  </button>
                </>
              )}
            </div>
          ) : quiz.questions.length > 0 ? (
            <>
              <div className="question-section">
                <div className="question-text">
                  {quiz.questions[currentQuestion].question}
                </div>
              </div>
              <div className="option-section">
                {quiz.questions[currentQuestion].options.map(
                  (option, index) => (
                    <div
                      className={`option-item ${
                        selectedOption === option.option ? "selected" : ""
                      }`}
                      key={index}
                      onClick={() => handleOptionClick(option.option)}
                    >
                      {option.option}
                    </div>
                  )
                )}
              </div>
              <button
                className="quiz-next-btn"
                onClick={handleAnswerClick}
                disabled={selectedOption === null}
              >
                Next {currentQuestion + 1}/{quiz.questions.length}
              </button>
            </>
          ) : (
            <div>Loading quiz...</div>
          )}
        </div>
        {isPartOfChallenge ? (
          <div className="quiz-list">
            <h4>Challenge: {challenge.description}</h4>
            {challenge.quizzes.map((challengeQuiz) =>
              quiz.id === challengeQuiz.id ? (
                <div className="quiz-item selected-quiz" key={challengeQuiz.id}>
                  <h3 className="quiz-title ">
                    Active: {challengeQuiz.contentTitle}
                  </h3>
                </div>
              ) : (
                <div
                  onClick={() => handleNextQuiz(challengeQuiz.contentId)}
                  className="quiz-item"
                  key={challengeQuiz.id}
                >
                  <h3 className="quiz-title ">{challengeQuiz.contentTitle}</h3>
                </div>
              )
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Quiz;
