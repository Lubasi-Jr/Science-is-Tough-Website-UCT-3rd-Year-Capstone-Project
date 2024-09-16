import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function DashQuizzes() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    fetchContent();
  }, []);

  async function fetchContent() {
    const { data, error } = await supabase.from("content").select("id,title");
    if (error) {
      console.log("Error fecthing content for quizzes: ", error);
    } else {
      setContent(data);
      console.log("Data return from dash quizzes: ", data);
    }
  }

  // const quizzes = [
  //     new Question(
  //       "What is the purpose of Consolidation Week during the exam season?",
  //       [
  //         { option: "To attend lectures and practicals.", isCorrect: false },
  //         {
  //           option:
  //             "To focus on preparing for exams without other academic activities.",
  //           isCorrect: true,
  //         },
  //         { option: "To take a break from all academic work.", isCorrect: false },
  //         {
  //           option: "To start new assignments for the next semester.",
  //           isCorrect: false,
  //         },
  //         {
  //           option: "To socialize with classmates and discuss exam topics.",
  //           isCorrect: false,
  //         },
  //       ]
  //     ),
  //     new Question(
  //       "Which of the following is NOT recommended for thriving during exam season?",
  //       [
  //         {
  //           option: "Reviewing past exam papers under timed conditions.",
  //           isCorrect: false,
  //         },
  //         {
  //           option:
  //             "Creating a daily schedule with regular breaks and well-being activities.",
  //           isCorrect: false,
  //         },
  //         {
  //           option: "Studying for 9–11 hours a day without any breaks.",
  //           isCorrect: true,
  //         },
  //         {
  //           option: "Maintaining physical, mental, and social health.",
  //           isCorrect: false,
  //         },
  //         { option: "Using a calendar to track exam dates.", isCorrect: false },
  //       ]
  //     ),
  //     new Question("What should you do the day before an exam?", [
  //       {
  //         option: "Arrive at the exam venue 10 minutes before the exam starts.",
  //         isCorrect: false,
  //       },
  //       {
  //         option: "Review your notes and get at least 6 hours of sleep.",
  //         isCorrect: false,
  //       },
  //       {
  //         option:
  //           "Double-check your exam timetable and familiarize yourself with exam rules.",
  //         isCorrect: true,
  //       },
  //       {
  //         option: "Focus on cramming as much information as possible.",
  //         isCorrect: false,
  //       },
  //       {
  //         option: "Leave your student ID at home to avoid losing it.",
  //         isCorrect: false,
  //       },
  //     ]),
  //   ];
  return (
    <>
      <section className="challenges-container">
        <div>
          <h5>Quizzes</h5>
          {content.length > 0 ? (
            content.map((c) => (
              <div key={c.id} className="challenge-item">
                <div className="challenge-item-details">
                  <div className="challenge-item-icon">
                    <img src="../../public/quiz-icon.png" alt="quiz icon" />
                  </div>

                  <div
                    className="challenge-item-info"
                    // onClick={() => toggleExpand(challenge.challenge_info.id)}
                  >
                    <p>{c.title}</p>
                    <p>Completed: </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>Loading quizzes...</div>
          )}
          {/* <div className="challenge-item">
      <div className="challenge-item-icon">
        <img src="../../public/game-icon.png" alt="quiz icon" />
      </div>
      <div className="challenge-item-info">
        <p>Read Next-Level Time Management for succeeding at UCT</p>
        <p>Participants: 12</p>
        <p>End: 35 August 2024</p>
      </div>
    </div>
    <div className="challenge-item">
      <div className="challenge-item-icon">
        <img src="../../public/game-icon.png" alt="quiz icon" />
      </div>
      <div className="challenge-item-info">
        <p>Play Game based on X-PDF</p>
        <p>Participants: 12</p>
        <p>End: 35 August 2024</p>
      </div>
    </div> */}
        </div>
      </section>
    </>
  );
}
