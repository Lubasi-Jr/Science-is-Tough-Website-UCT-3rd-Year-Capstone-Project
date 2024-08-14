import { useState } from "react";

import "./Quiz.css";
import { Question } from "../models/quizz";

function Quiz() {
  const questions = [
    new Question("Question 1?", [
      { option: "Option 1", isCorrect: false },
      { option: "Option 2", isCorrect: true },
      { option: "Option 3", isCorrect: false },
      { option: "Option 4", isCorrect: false },
      { option: "Option 5", isCorrect: false },
    ]),
    new Question("Question 2?", [
      { option: "Q2 Option 1", isCorrect: true },
      { option: "Q2 Option 2", isCorrect: false },
      { option: "Q2 Option 3", isCorrect: false },
      { option: "Q2 Option 4", isCorrect: false },
      { option: "Q2 Option 5", isCorrect: false },
    ]),
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

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

    setSelectedOption(null);
  };

  const handleOptionClick = (opt) => {
    setSelectedOption(opt);
  };

  return (
    /*Adapted and customised from Bootstrap*/
    <>
      {/* Quiz */}
      <div className="quiz-container">
        {showScore ? (
          <div className="score-section">
            You scored {score} out of {questions.length}
          </div>
        ) : (
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
              className="btn btn-primary"
              onClick={() => handleAnswerClick(selectedOption)}
              disabled={selectedOption === null}
            >
              Next {currentQuestion + 1}/{questions.length}
            </button>
          </>
        )}
      </div>
    </>
  );
}
export default Quiz;
