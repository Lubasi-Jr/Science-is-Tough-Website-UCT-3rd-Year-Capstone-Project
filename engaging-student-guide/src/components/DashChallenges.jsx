import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../hooks/useAuth";

export default function DashChallenges() {
  const [challenges, setChallenges] = useState([]);

  const { user } = useAuth();

  // fetch all challenges with the number of completed quizzes
  useEffect(() => {
    fetchChallenges();
  }, []);

  // fetched all the challenges and wether the student has finished the quizzes associated
  async function fetchChallenges() {
    console.log("This is the user _id : ", user.id);
    const { data, error } = await supabase.rpc(
      "get_all_challenges_with_quiz_status",
      { user_id: user.id }
    );

    if (error) {
      console.log("Fetching completed quizes for challenge error: ", error);
    } else {
      setChallenges(data);
    }

    console.log("The challenge information returned: ", data);
  }

  async function startChallenge(challenge_id) {
    // increment number of participants for this challenge in the challenge table
    const { error: updateChallengeError } = await supabase.rpc(
      "increment_no_participants",
      { challenge_id: challenge_id }
    );

    const challengeToStart = challenges.find(
      (challenge) => challenge.challenge_info.id === challenge_id
    );

    let challengeToInsert = [];

    for (let i = 0; i < challengeToStart.quizzes_list.length; i++) {
      let obj = {
        challenge_id: challenge_id,
        quiz_id: challengeToStart.quizzes_list[i].quiz.id,
        student_id: user.id,
        done: challengeToStart.quizzes_list[i].finished,
      };
      challengeToInsert.push(obj);
    }

    const { error: insertChallengeError } = await supabase
      .from("students_quizzes")
      .insert(challengeToInsert);

    if (updateChallengeError) {
      console.log("Update Challenge Error: ", updateChallengeError);
    }
    if (insertChallengeError) {
      console.log("Start Challenge Error: ", insertChallengeError);
    }
  }

  // formatting teh date to make it more readable
  function formatDate(d) {
    const date = new Date(d);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  }
  return (
    <>
      <section className="challenges-container">
        <div>
          <h5>Weekly Challenges</h5>
          {challenges.length > 0 ? (
            challenges.map((challenge) => (
              <div key={challenge.challenge_info.id} className="challenge-item">
                <div className="challenge-item-icon">
                  <img src="../../public/quiz-icon.png" alt="quiz icon" />
                </div>

                <div className="challenge-item-info">
                  <p>{challenge.challenge_info.description}</p>
                  <p>
                    Participants: {challenge.challenge_info.no_participants}
                  </p>
                  <p>
                    Closing Date:{" "}
                    {formatDate(challenge.challenge_info.end_date)}
                  </p>
                  <p>Completed: {challenge.result}</p>
                </div>
                <button
                  onClick={() => startChallenge(challenge.challenge_info.id)}
                >
                  Start
                </button>
              </div>
            ))
          ) : (
            <div>Loading...</div>
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
