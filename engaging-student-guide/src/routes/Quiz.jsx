import { useState } from "react";
import "./Quiz.css";
import { Question } from "../models/quizz";

function Quiz() {
  // Define the quiz questions and options
  const questions = [
    new Question(
      "What is the purpose of Consolidation Week during the exam season?",
      [
        { option: "To attend lectures and practicals.", isCorrect: false },
        {
          option:
            "To focus on preparing for exams without other academic activities.",
          isCorrect: true,
        },
        { option: "To take a break from all academic work.", isCorrect: false },
        {
          option: "To start new assignments for the next semester.",
          isCorrect: false,
        },
        {
          option: "To socialize with classmates and discuss exam topics.",
          isCorrect: false,
        },
      ]
    ),
    new Question(
      "Which of the following is NOT recommended for thriving during exam season?",
      [
        {
          option: "Reviewing past exam papers under timed conditions.",
          isCorrect: false,
        },
        {
          option:
            "Creating a daily schedule with regular breaks and well-being activities.",
          isCorrect: false,
        },
        {
          option: "Studying for 9–11 hours a day without any breaks.",
          isCorrect: true,
        },
        {
          option: "Maintaining physical, mental, and social health.",
          isCorrect: false,
        },
        { option: "Using a calendar to track exam dates.", isCorrect: false },
      ]
    ),
    new Question("What should you do the day before an exam?", [
      {
        option: "Arrive at the exam venue 10 minutes before the exam starts.",
        isCorrect: false,
      },
      {
        option: "Review your notes and get at least 6 hours of sleep.",
        isCorrect: false,
      },
      {
        option:
          "Double-check your exam timetable and familiarize yourself with exam rules.",
        isCorrect: true,
      },
      {
        option: "Focus on cramming as much information as possible.",
        isCorrect: false,
      },
      {
        option: "Leave your student ID at home to avoid losing it.",
        isCorrect: false,
      },
    ]),
  ];

  // State to track the current question index
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // State to track if the score should be shown
  const [showScore, setShowScore] = useState(false);

  // State to track the user's score
  const [score, setScore] = useState(0);

  // State to track the currently selected option
  const [selectedOption, setSelectedOption] = useState(null);

  // Reset the quiz to retry
  const handleRetry = () => {
    setShowScore(false); // Hide the score
    setCurrentQuestion(0); // Reset to the first question
    setScore(0); // Reset the score
  };

  // Handle the logic when an answer is clicked
  const handleAnswerClick = () => {
    // Check if the selected option is correct
    const isCorrect = questions[currentQuestion].options.find(
      (option) => option.option === selectedOption
    ).isCorrect;

    // Increment score if the selected option is correct
    if (isCorrect) {
      setScore(score + 1);
    }

    // Move to the next question or show the score if it was the last question
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null); // Clear the selected option
    } else {
      setShowScore(true); // Show the score at the end
    }
  };

  // Handle when an option is selected
  const handleOptionClick = (opt) => {
    setSelectedOption(opt); // Update the selected option
  };

  return (
    <>
      <div className="quiz-container">
        <div className="question-content">Acing exam season</div>
        {showScore ? (
          // Display the score section when the quiz is completed
          <div className="score-section">
            <h5>
              You scored {score} out of {questions.length}
            </h5>
            <button className="quiz-next-btn" onClick={handleRetry}>
              Retry
            </button>
          </div>
        ) : (
          // Display the question and options
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
              disabled={selectedOption === null} // Disable the button if no option is selected
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
