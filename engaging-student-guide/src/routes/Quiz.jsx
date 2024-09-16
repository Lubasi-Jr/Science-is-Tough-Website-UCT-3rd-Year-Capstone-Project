import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Quiz.css";
import { Question } from "../models/quizz";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../hooks/useAuth";

function Quiz() {
  const { user } = useAuth();
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [pointsEarned, setPointsEarned] = useState(0);
  const MAX_SCORE = 3;
  useEffect(() => {
    if (showScore && score == MAX_SCORE) {
      // check if student has everything correct to get the points
      async function updateScore() {
        // update the score of the student
        const { error } = await supabase.rpc("update_student_points", {
          student_id: user.id,
          points: pointsEarned,
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
      const { data: titleData, e } = await supabase
        .from("content")
        .select("title")
        .eq("id", id);

      if (e) {
        console.log("Error fetching title: ", e);
      } else {
        setTitle(titleData[0].title);
      }

      const { data, error } = await supabase
        .from("quizzes")
        .select()
        .eq("content_id", id);
      if (error) {
        console.log("Error fetching quizzes: ", error);
      } else {
        setQuestions(formatData(data));
        setPointsEarned(
          questions.reduce((accumulator, currentQuestion) => {
            return accumulator + currentQuestion.points;
          }, 0)
        );
      }
    }

    fetchQuizzes(id);
  }, [id, showScore, score]);

  function formatData(data) {
    let res = [];
    for (let i = 0; i < data.length; i++) {
      const obj = data[i];
      const q = Question.fromJson(obj);
      res.push(q);
    }
    return res;
  }

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleRetry = () => {
    setShowScore(false);
    setCurrentQuestion(0);
    setScore(0);
  };

  const handleAnswerClick = () => {
    const isCorrect = questions[currentQuestion].options.find(
      (option) => option.option === selectedOption
    ).isCorrect;

    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
    } else {
      setShowScore(true);
    }
  };

  const handleOptionClick = (opt) => {
    setSelectedOption(opt);
  };

  return (
    <>
      <div className="quiz-container">
        <div className="question-content">{title}</div>
        {showScore ? (
          <div className="score-section">
            <h5>
              You scored {score} out of {questions.length}
            </h5>
            <button className="quiz-next-btn" onClick={handleRetry}>
              Retry
            </button>
          </div>
        ) : questions.length > 0 ? (
          <>
            <div className="question-section">
              <div className="question-text">
                {questions[currentQuestion].question}
              </div>
            </div>
            <div className="option-section">
              {questions[currentQuestion].options.map((option, index) => (
                <div
                  className={`option-item ${
                    selectedOption === option.option ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => handleOptionClick(option.option)}
                >
                  {option.option}
                </div>
              ))}
            </div>
            <button
              className="quiz-next-btn"
              onClick={handleAnswerClick}
              disabled={selectedOption === null}
            >
              Next {currentQuestion + 1}/{questions.length}
            </button>
          </>
        ) : (
          <div>Loading quiz...</div>
        )}
      </div>
    </>
  );
}

export default Quiz;
