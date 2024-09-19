import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../hooks/useAuth";
import { Challenge } from "../models/challenge";

export default function DashChallenges() {
  const [challenges, setChallenges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    /*Checks if a students challenge is complete by fetching the challenge status from supabase and updates the setChallenges state with formatted data*/
    async function checkChallengeCompletion() {
      try {
        setIsLoading(true);

        const { data, error } = await supabase.rpc(
          "fetch_all_challenges_with_status",
          { s_id: user.id }
        );

        if (error) {
          throw error;
        } else {
          setChallenges(formatData(data));
          setIsLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    }
    checkChallengeCompletion();
  }, [user.id]);

  /*Data converted to a array of Challenge objects each object also has a property that checks how mamy quizzes were complete*/

  function formatData(data) {
    console.log(data);
    let res = [];
    for (let i = 0; i < data.length; i++) {
      const obj = data[i];
      const c = Challenge.fromJson(obj);
      c.wasCompleted = obj.student_completed_count;
      res.push(c);
    }
    return res;
  }

  return (
    <>
      <section className="challenges-container">
        <h5>Weekly Challenges</h5>
        {isLoading /* Display loading while we're fetchiing the data*/ ? (
          <div className="loading-message">Loading challenges...</div>
        ) : error /* Display error */ ? (
          <div className="error-message">
            Error fetching challenges. Contact admin.
          </div>
        ) : /*If there is one or more challenges it is displayed with a description and progress in the challenge,checks if challenge is completed and will then say challenge is complete*/
        challenges.length > 0 ? (
          challenges.map((challenge) => (
            <div key={challenge.id} className="challenge-item">
              <div className="challenge-item-container">
                <div className="challenge-item-details">
                  <div className="challenge-item-icon">
                    <img src="../../public/quiz-icon.png" alt="quiz icon" />
                  </div>

                  <div className="challenge-item-info">
                    <p>{challenge.description}</p>
                    <p>
                      Completed: {challenge.wasCompleted}/
                      {challenge.completedCount}
                    </p>
                    {challenge.wasCompleted === challenge.completedCount ? (
                      <p style={{ color: "#ff6969" }}>Challenge finished</p>
                    ) : (
                      <></>
                    )}
                    <p>Closing Date: {challenge.date_end}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            No open challenges at the moment. 🏖️ Feel free to continue with the
            quizzes and games. 💪
          </div>
        )}
      </section>
    </>
  );
}
