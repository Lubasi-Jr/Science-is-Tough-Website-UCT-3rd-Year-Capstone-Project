import { useState } from "react";

import "./Quiz.css";

function Quiz() {
  const questions = [
    {
      question: "Question 1?",
      options: [
        { option: "Option 1", isCorrect: false },
        { option: "Option 2", isCorrect: true },
        { option: "Option 3", isCorrect: false },
        { option: "Option 4", isCorrect: false },
        { option: "Option 5", isCorrect: false },
      ],
    },
    {
      question: "Question 2?",
      options: [
        { option: "Q2 Option 1", isCorrect: true },
        { option: "Q2 Option 2", isCorrect: false },
        { option: "Q2 Option 3", isCorrect: false },
        { option: "Q2 Option 4", isCorrect: false },
        { option: "Q2 Option 5", isCorrect: false },
      ],
    },
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
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        style={{ backgroundColor: "#FFF5E1" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <h1>Science is Tough</h1>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => setView("home")}
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => setView("favourites")}
                >
                  Favourites
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => setView("quizzes")}
                >
                  Quizzes
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => setView("distract")}
                >
                  {" "}
                  Distract Me
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => setView("weekly")}
                >
                  {" "}
                  Weekly challenge
                </a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
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
