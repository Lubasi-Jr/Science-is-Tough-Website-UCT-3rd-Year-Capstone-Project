import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../hooks/useAuth";
import { Challenge } from "../models/challenge";

export default function DashChallenges() {
  const [challenges, setChallenges] = useState([]);
  const [challengesStarted, setChallengesStarted] = useState([]);

  const { user } = useAuth();

  // fetch all challenges with the number of completed quizzes
  useEffect(() => {
    // fetched all the challenges and wether the student has finished the quizzes associated
    async function fetchChallenges() {
      const { data, error } = await supabase.rpc("get_challenges");

      if (error) {
        console.log("Fetching completed quizes for challenge error: ", error);
      } else {
        setChallenges(formatData(data));
      }
    }

    //  Check if user has started the challenge
    async function checkIfChallengeStarted() {
      const { data, error } = await supabase
        .from("students_quizzes")
        .select("challenge_id")
        .eq("student_id", user.id)
        .eq("started", true);

      if (error) {
        console.error("Error checking if challenge started :", error.message);
      } else {
        setChallengesStarted(data.map((i) => i.challenge_id));
      }
    }

    fetchChallenges();
    checkIfChallengeStarted();
  }, [user.id]);
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

  function formatData(data) {
    let res = [];
    for (let i = 0; i < data.length; i++) {
      const obj = data[i];
      const c = Challenge.fromJson(obj);
      res.push(c);
    }
    return res;
  }



  const [isExpanded, setIsExpanded] = useState(null);

  // Toggle the state when clicking
  const toggleExpand = (challenge_id) => {
    setIsExpanded(isExpanded === challenge_id ? null : challenge_id);
  };
  return (
    <>
      <section className="challenges-container">
        <div>
          <h5>Weekly Challenges</h5>
          {challenges.length > 0 ? (
            challenges.map((challenge) => (
              <div key={challenge.id} className="challenge-item">
                <div className="challenge-item-details">
                  <div className="challenge-item-icon">
                    <img src="../../public/quiz-icon.png" alt="quiz icon" />
                  </div>

                  <div
                    className="challenge-item-info"
                    onClick={() => toggleExpand(challenge.id)}
                  >
                    <p>{challenge.description}</p>
                    <p>
                      Participants: {challenge.noParticipants}
                    </p>
                    <p>
                      Closing Date:{" "}
                      {challenge.date_end}
                    </p>
                    {/* <p>Completed: {challenge.result}</p> */}
                  </div>
                  {challengesStarted.includes(challenge.id) ? (
                    <div className="challenge-item-started">Started</div>
                  ) : (
                    <button
                      onClick={() =>
                        startChallenge(challenge.id)
                      }
                    >
                      Start
                    </button>
                  )}
                </div>

                {/* Expand content*/}
                <div
                  className={`expandable-content ${
                    isExpanded === challenge.id ? "expanded" : ""
                  }`}
                >
                  {challenge.quizzes.map((quiz) => (
                    <li
                      className="challenge-content-item"
                      key={quiz.id}
                    >
                      <p className="content-text">{quiz.contentTitle}</p>
                      <p> Points: {quiz.points}</p>
                    </li>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </section>
    </>
  );
}
