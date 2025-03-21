import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Quiz.css";
import { useNavigate } from "react-router-dom";
import { Quiz as QuizModel } from "../models/quiz";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

function Quiz() {
  const navigate = useNavigate();

  const { user } = useAuth();
  const { id } = useParams();
  const [quiz, setQuiz] = useState(QuizModel.empty());
  const [isDone, setIsDone] = useState(false);
  const [prevScore, setPrevScore] = useState(0); // Track previous score
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const MAX_SCORE = 3;

  // fetching quiz data
  useEffect(() => {
    async function fetchQuiz(id) {
      const { data, error } = await supabase.rpc("get_quiz", {
        content_id: id,
      });

      if (error) {
        console.log("Error fetching quizzes: ", error);
      } else {
        console.log("Quiz data looks like: ", data);
        const q = formatData(data);
        setQuiz(q);
      }
    }

    if (id) {
      fetchQuiz(id);
    }
  }, [id]);

  useEffect(() => {
    // if (showScore && score === MAX_SCORE && prevScore !== MAX_SCORE) {
    if (showScore && score === MAX_SCORE) {
      async function updateScore() {
        const { error } = await supabase.rpc("update_student_points", {
          student_id: user.id,
          amount: quiz.points,
        });

        if (error) {
          console.log("Error updating score:", error);
        }
      }

      updateScore();

      if (quiz.challengeId) {
        async function completeActivity() {
          const insert = {
            status: "complete",
            student_id: user.id,
            challenge_id: quiz.challengeId,
            quiz_id: quiz.id,
          };
          const { error } = await supabase
            .from("students_challenges")
            .upsert(insert, {
              onConflict: ["student_id", "challenge_id", "quiz_id"],
            });

          if (error) {
            console.error("Error updating progress: ", error);
          } else {
            console.log("Activity completed successfully");
          }
        }
        completeActivity();
      }
    }

    // update the student challenge progress

    // Update previous score after the effect has run
    setPrevScore(score);
  }, [showScore, score, user.id, quiz, prevScore]);

  async function handleQuizFinished() {
    const item = {
      student_id: user.id,
      complete: true,
      quiz_id: quiz.id,
      content_id: quiz.contentId,
    };

    const { error } = await supabase.from("student_quiz").insert(item);

    if (error) {
      console.log("Error fetching quizzes: ", error);
    } else {
      console.log("Successfully inserted item");
      setShowScore(true);
    }
  }

  function formatData(obj) {
    let q = QuizModel.fromJson(obj.quiz);
    q.setQuestions(obj.questions);
    return q;
  }

  const handleRetry = () => {
    setShowScore(false);
    setIsDone(false);
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
                    any of the quizzes.
                  </p>
                  <div
                    style={{
                      display: "flex",
                      columnGap: "1em",
                      justifyContent: "center",
                    }}
                  >
                    <button className="quiz-next-btn" onClick={handleRetry}>
                      Retry
                    </button>
                    <button
                      className="quiz-next-btn"
                      onClick={() => navigate("/")}
                    >
                      Return to Dashboard
                    </button>
                  </div>
                </div>
              ) : (
                <>
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
            <div>
              <p>No questions available... </p>
              <Link to="/">Back to dashboard</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Quiz;
