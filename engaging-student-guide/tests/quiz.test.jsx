/* eslint-disable react/prop-types */
// tests/quiz.test.jsx

import { useState, useEffect } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { supabase } from "../src/lib/supabaseClient";
import { Quiz as QuizModel } from "../src/models/quiz";

// TestQuiz component that accepts quiz data as props

function TestQuiz({ id }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quiz, setQuiz] = useState(QuizModel.empty());
  // const { user } = useAuth();
  // fetching quiz data
  useEffect(() => {
    async function fetchQuiz(id) {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.rpc("get_quiz", {
          content_id: id,
        });

        if (error) {
          throw error;
        } else {
          const q = formatData(data);
          setQuiz(q);
          setIsLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    }

    if (id) {
      fetchQuiz(id);
    }
  }, [id]);



  function formatData(obj) {
    let q = QuizModel.fromJson(obj.quiz);
    q.setQuestions(obj.questions);
    console.log(q.questions);
    return q;
  }

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

  const handleRetry = () => {
    setIsDone(false);
    setCurrentQuestion(0);
    setScore(0);
  };

  return (
    <div>
      {isLoading ? (
        <div className="loading-message">Loading quiz...</div>
      ) : error ? (
        <div className="error-message">Error fetching quiz: {error}</div>
      ) : (
        <div>
          {isDone ? (
            <>
              <h5>
                You scored {score} out of {quiz.questions.length}
              </h5>
              <button className="quiz-next-btn" onClick={handleRetry}>
                Retry
              </button>
            </>
          ) : (
            <div>
              {quiz && quiz.questions.length > 0 ? (
                <>
                  <div className="question-title">{quiz.contentTitle}</div>
                  <div className="question-text">
                    {quiz.questions[currentQuestion].question}
                  </div>
                  {quiz.questions[currentQuestion].options.map(
                    (option, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedOption(option.option)}
                        className={
                          selectedOption === option.option ? "selected" : ""
                        }
                      >
                        {option.option}
                      </div>
                    )
                  )}
                  <button
                    onClick={handleAnswerClick}
                    disabled={!selectedOption}
                  >
                    Next
                  </button>
                </>
              ) : (
                <>No questions available...</>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Mock quiz data
const mockQuizData = {
  quiz: {
    id: "356d4f0d-c810-43f4-9f82-c02fdc7de1f6",
    created_at: "2024-09-16T14:09:20.893019+00:00",
    challenge_id: "dbf069ba-f5bb-46c2-b7e4-b901b647ed9d",
    content_id: "e9d47b35-7034-4978-b263-d49a57874c72",
    content_title: "The shape of your well-being",
    points: 300,
  },
  questions: [
    {
      question: {
        created_at: "2024-09-15T18:03:08.932372+00:00",
        options: [
          { option: "Increased energy and enthusiasm.", isCorrect: false },
          {
            option: "Persistent sadness and loss of interest in activities.",
            isCorrect: true,
          },
          {
            option: "Enhanced social interactions and engagement.",
            isCorrect: false,
          },
          { option: "Frequent and uninterrupted sleep.", isCorrect: false },
          {
            option: "Consistent positive behavior and achievements.",
            isCorrect: false,
          },
        ],
        question: "Which of the following is a sign of depression?",
        id: "1a1f20b1-8181-46b5-8984-620063511b35",
        quiz_id: "356d4f0d-c810-43f4-9f82-c02fdc7de1f6",
      },
    },
    {
      question: {
        created_at: "2024-09-15T18:02:34.302779+00:00",
        options: [
          {
            option:
              "Breathing exercises help increase oxygen flow and promote calmness.",
            isCorrect: false,
          },
          {
            option:
              "Breathing exercises should be practiced regularly to lower heart rate and reduce blood pressure.",
            isCorrect: false,
          },
          {
            option:
              "Breathing exercises involve inhaling and exhaling for four counts each.",
            isCorrect: false,
          },
          {
            option:
              "Breathing exercises are most effective when done only once a week.",
            isCorrect: true,
          },
          {
            option:
              "Breathing exercises help in better handling of anxiety when practiced regularly.",
            isCorrect: false,
          },
        ],
        question:
          "Which of the following statements about breathing exercises for stress management is NOT true?",
        id: "45a6c5a4-c195-4e71-9444-bf5d8182713b",
        quiz_id: "356d4f0d-c810-43f4-9f82-c02fdc7de1f6",
      },
    },
    {
      question: {
        created_at: "2024-09-15T18:07:02.315072+00:00",
        options: [
          {
            option: "Use substances freely without concern for their effects.",
            isCorrect: false,
          },
          {
            option: "Understand the impact on brain development and health.",
            isCorrect: true,
          },
          {
            option: "Ignore the consequences of substance use.",
            isCorrect: false,
          },
          {
            option: "Prioritize substance use over academic responsibilities.",
            isCorrect: false,
          },
          {
            option: "Avoid any discussion about substance use effects.",
            isCorrect: false,
          },
        ],
        question: "How should one handle substance use?",
        id: "d3ee32a8-aca4-4016-9dcf-6827a0be0405",
        quiz_id: "356d4f0d-c810-43f4-9f82-c02fdc7de1f6",
      },
    },
  ],
};

// mocking supabase
vi.mock("../src/lib/supabaseClient", () => ({
  supabase: {
    rpc: vi.fn(),
    from: vi.fn(),
  },
}));

// Vitest test for the TestQuiz component
describe("TestQuiz Component", () => {
  it("renders questions and handles answers correctly", async () => {
    supabase.rpc.mockResolvedValueOnce({
      data: mockQuizData,
      error: null,
    });

    render(<TestQuiz id={"123"} />);
    await waitFor(() => {
      // Check the first question
      expect(
        screen.getByText(/Which of the following is a sign of depression?/)
      ).toBeInTheDocument();
    });
    // Select the correct answer and click next
    fireEvent.click(
      screen.getByText("Persistent sadness and loss of interest in activities.")
    );
    fireEvent.click(screen.getByText("Next"));

    // Check the second question
    expect(
      screen.getByText(
        /Which of the following statements about breathing exercises for stress management is NOT true?/
      )
    ).toBeInTheDocument();

    // Select the correct answer and click next
    fireEvent.click(
      screen.getByText(
        "Breathing exercises are most effective when done only once a week."
      )
    );
    fireEvent.click(screen.getByText("Next"));

    // Check the third question
    expect(
      screen.getByText(/How should one handle substance use?/)
    ).toBeInTheDocument();

    // Select the correct answer and click next
    fireEvent.click(
      screen.getByText("Understand the impact on brain development and health.")
    );
    fireEvent.click(screen.getByText("Next"));

    // Check the score
    expect(screen.getByText(/You scored 3 out of 3/)).toBeInTheDocument();
    // });

    screen.debug();
  });

  it("User gets one incorrect", async () => {
    supabase.rpc.mockResolvedValueOnce({
      data: mockQuizData,
      error: null,
    });

    render(<TestQuiz id={"123"} quizData={null} />);
    await waitFor(() => {
      // Check the first question
      expect(
        screen.getByText(/Which of the following is a sign of depression?/)
      ).toBeInTheDocument();
    });
    // Select the wrong answer and click next
    fireEvent.click(
      screen.getByText("Enhanced social interactions and engagement.")
    );
    fireEvent.click(screen.getByText("Next"));

    // Check the second question
    expect(
      screen.getByText(
        /Which of the following statements about breathing exercises for stress management is NOT true?/
      )
    ).toBeInTheDocument();

    // Select the correct answer and click next
    fireEvent.click(
      screen.getByText(
        "Breathing exercises are most effective when done only once a week."
      )
    );
    fireEvent.click(screen.getByText("Next"));

    // Check the third question
    expect(
      screen.getByText(/How should one handle substance use?/)
    ).toBeInTheDocument();

    // Select the correct answer and click next
    fireEvent.click(
      screen.getByText("Understand the impact on brain development and health.")
    );
    fireEvent.click(screen.getByText("Next"));

    // Check the score. User only gets 2 out of 3.
    expect(screen.getByText(/You scored 2 out of 3/)).toBeInTheDocument();
  });

  it("should handle empty quiz data and no error", async () => {
    supabase.rpc.mockResolvedValueOnce({
      data: { quiz: {}, questions: [] },
      error: null,
    });

    render(<TestQuiz id={"123"} />);
    await waitFor(() => {
      expect(
        screen.getByText(/No questions available.../i)
      ).toBeInTheDocument(); // Example error message
    });
  });

  it("Next button should be disabled when no answer is selected", async () => {
    supabase.rpc.mockResolvedValueOnce({
      data: mockQuizData,
      error: null,
    });

    render(<TestQuiz id={"123"} />);
    await waitFor(() => {
      expect(screen.getByText("Next")).toBeDisabled();
    });
  });

  it("Clicking Next should navigate to the next question", async () => {
    supabase.rpc.mockResolvedValueOnce({
      data: mockQuizData,
      error: null,
    });

    render(<TestQuiz id={"123"} />);
    await waitFor(() => {
      fireEvent.click(
        screen.getByText(
          "Persistent sadness and loss of interest in activities."
        )
      );
    });
    fireEvent.click(screen.getByText("Next"));
    expect(
      screen.queryByText(/Which of the following is a sign of depression?/i)
    ).not.toBeInTheDocument();
  });

  it("Retry button should reset quiz state and allow restarting", async () => {
    supabase.rpc.mockResolvedValueOnce({
      data: mockQuizData,
      error: null,
    });

    render(<TestQuiz id={"123"} />);
    await waitFor(() => {
      // Simulate completing part of the quiz

      // Check the first question
      expect(
        screen.getByText(/Which of the following is a sign of depression?/)
      ).toBeInTheDocument();
    });
    // Select the correct answer and click next
    fireEvent.click(
      screen.getByText("Persistent sadness and loss of interest in activities.")
    );
    fireEvent.click(screen.getByText("Next"));

    // Check the second question
    expect(
      screen.getByText(
        /Which of the following statements about breathing exercises for stress management is NOT true?/
      )
    ).toBeInTheDocument();

    // Select the correct answer and click next
    fireEvent.click(
      screen.getByText(
        "Breathing exercises are most effective when done only once a week."
      )
    );
    fireEvent.click(screen.getByText("Next"));

    // Check the third question
    expect(
      screen.getByText(/How should one handle substance use?/)
    ).toBeInTheDocument();

    // Select the correct answer and click next
    fireEvent.click(
      screen.getByText("Understand the impact on brain development and health.")
    );
    fireEvent.click(screen.getByText("Next"));

    fireEvent.click(screen.getByText("Retry"));
    // First question should be on screen now
    expect(
      screen.getByText(/Which of the following is a sign of depression?/)
    ).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeEnabled();
  });

  it("should fetch quiz data successfully", async () => {
    supabase.rpc.mockResolvedValueOnce({
      data: mockQuizData,
      error: null,
    });

    render(<TestQuiz id={"123"} quizData={null} />);
    await waitFor(() =>
      expect(
        screen.getByText(mockQuizData.quiz.content_title)
      ).toBeInTheDocument()
    );

    screen.debug();
  });

  it("should display error message when fetching quiz data fails", async () => {
    supabase.rpc.mockResolvedValueOnce({
      data: null,
      error: { message: "Mocked error" },
    });

    render(<TestQuiz id={"123"} quizData={null} />);
    await waitFor(() =>
      expect(screen.getByText(/Error fetching quiz/i)).toBeInTheDocument()
    );
  });

});
