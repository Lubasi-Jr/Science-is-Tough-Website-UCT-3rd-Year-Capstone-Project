import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Quiz.css";
import { useNavigate } from "react-router-dom";
import { Quiz as QuizModel } from "../models/quiz";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../hooks/useAuth";
// import { Challenge } from "../models/challenge";
import { Link } from "react-router-dom";

function Quiz() {
  const navigate = useNavigate();

  const { user } = useAuth();
  const { id } = useParams();
  const [quiz, setQuiz] = useState(QuizModel.empty());
  // const [isPartOfChallenge, setIsPartOfChallenge] = useState(false);
  const [isDone, setIsDone] = useState(false);
  // const [challenge, setChallenge] = useState(Challenge.empty());

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const MAX_SCORE = 3;
  useEffect(() => {
    async function fetchQuiz(id) {
      const { data, error } = await supabase.rpc("get_quiz", {
        content_id: id,
      });

      if (error) {
        console.log("Error fetching quizzes: ", error);
      } else {
        console.log("Data from fetching quiz questions: ", id, data);
        const q = formatData(data);
        setQuiz(q);
      }
    }

    if (id) {
      fetchQuiz(id);
    }
  }, [id]);

  useEffect(() => {
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
    }
  }, [showScore, score, user.id, quiz.points]);

  const completeQuiz = async (studentId, challengeId) => {
    // Increment progress
    // const { data, error } = await supabase
    //   .from("update_challenge_progress")
    //   .update({ progress: supabase.raw("progress + 1") }) // Assumes each quiz completion increments progress by 1
    //   .eq("student_id", studentId)
    //   .eq("challenge_id", challengeId);
    // if (error) {
    //   console.error("Error updating challenge progress:", error);
    // } else {
    //   // Check if challenge is completed
    //   const challenge = await supabase
    //     .from("challenges")
    //     .select("requirements")
    //     .eq("id", challengeId)
    //     .single();
    //   if (challenge.data.requirements <= data[0].progress) {
    //     // Mark challenge as completed
    //     await supabase
    //       .from("student_challenges")
    //       .update({ status: "completed" })
    //       .eq("student_id", studentId)
    //       .eq("challenge_id", challengeId);
    //   }
    // }
  };

  // useEffect(() => {
  //   if (quiz.id) {
  //     async function handlePartOfChallenge() {
  //       if (quiz.challengeId == null) {
  //         setIsPartOfChallenge(false);
  //       } else {
  //         setIsPartOfChallenge(true);

  //         const { data, error } = await supabase.rpc(
  //           "get_challenge_and_quizzes",
  //           { challenge_id: quiz.challengeId }
  //         );
  //         if (error) {
  //           console.log(
  //             "Error fetching the challenge related to this quiz:",
  //             error
  //           );
  //         } else {
  //           setChallenge(Challenge.fromJson(data));
  //         }
  //       }
  //     }

  //     handlePartOfChallenge();
  //   }
  // }, [quiz.challengeId, quiz.id]); // Trigger only when quiz.id changes

  async function handleQuizFinished() {
    const item = {
      student_id: user.id,
      complete: true,
      quiz_id: quiz.id,
      content_id: quiz.contentId,
    };

    console.log("Inserting the following item: ", item);
    const { error } = await supabase.from("student_quiz").insert(item);

    if (error) {
      console.log("Error fetching quizzes: ", error);
    } else {
      console.log("Successfully inserted item");
      setShowScore(true);
      await completeQuiz(user.id, quiz.challengeId);
    }
  }

  // async function handleNextQuiz(content_id) {
  //   handleRetry(); // resetting the quiz state
  //   navigate(`/quiz/${content_id}`);
  // }

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
                    {/* {isPartOfChallenge ? (
                      <button
                        className="quiz-next-btn"
                        onClick={handleNextQuiz}
                      >
                        Next Quiz
                      </button>
                    ) : (
                      <></>
                    )} */}
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
            <div>
              <p>fetching questions... </p>
              <Link to="/">Back to dashboard</Link>
            </div>
          )}
        </div>
        {/* {isPartOfChallenge ? (
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
        )} */}
      </div>
    </>
  );
}

export default Quiz;
