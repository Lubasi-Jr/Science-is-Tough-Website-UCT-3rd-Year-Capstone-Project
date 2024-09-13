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

  async function fetchChallenges() {
    // get the number of quizzes finished for a challenge by a student
    const { data, error } = await supabase.rpc("num_quizzes_finished", {
      s_id: user.id,
    });
    if (error) {
      console.log("Fetching completed quizes for challenge error: ", error);
    } else {
      setChallenges(data);
    }
  }

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
