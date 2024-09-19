import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../hooks/useAuth";
import { Challenge } from "../models/challenge";

export default function DashChallenges() {
  const [challenges, setChallenges] = useState([]);
  // const [challengesStarted, setChallengesStarted] = useState([]);

  const { user } = useAuth();
  const { id: student_id } = user;
  // fetch all challenges with the number of completed quizzes
  useEffect(() => {
    // fetched all the challenges and wether the student has finished the quizzes associated
    async function fetchChallenges() {
      const { data, error } = await supabase.rpc("get_challenges_data");

      if (error) {
        console.log("Fetching completed quizes for challenge error: ", error);
      } else {
        console.log("Received for this challenge :", data);
        const formattedChallenges = await formatData(data);
        console.log("Challenges data:", formattedChallenges)

        setChallenges(formattedChallenges);
      }
    }
    fetchChallenges();
    const contentsubscription = supabase
      .channel("public:student_content")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "student_content" },
        (payload) => {
          console.log("Change received:", payload);
          fetchChallenges(); // Re-fetch progress data when there's an update
        }
      )
      .subscribe()
    const Quizsubscription = supabase
    .channel("public:student_quiz")
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "student_quiz" },
      (payload) => {
        console.log("Change detected in students_quizzes:", payload);
        fetchChallenges(); // Re-fetch data when quizzes are updated
      }
    )
      .subscribe();


      return () => {
        supabase.removeChannel(Quizsubscription);
        supabase.removeChannel(contentsubscription);
      
      };
    
  }, [user.id]);
  // async function startChallenge(challenge_id) {
  //   console.log("Starting challenge...");

  //   // increment number of participants for this challenge in the challenge table
  //   const { error: updateChallengeError } = await supabase.rpc(
  //     "increment_no_participants",
  //     { challenge_id: challenge_id }
  //   );

  //   const challengeToStart = challenges.find(
  //     (challenge) => challenge.id === challenge_id
  //   );

  //   console.log(challengeToStart);

  //   let challengeToInsert = [];

  //   for (let i = 0; i < challengeToStart.quizzes.length; i++) {
  //     let obj = {
  //       challenge_id: challenge_id,
  //       q_id: challengeToStart.quizzes[i].id,
  //       student_id: user.id,
  //       done: challengeToStart.quizzes[i].done,
  //       started: true,
  //     };
  //     challengeToInsert.push(obj);
  //   }
  //   // console.log("Inserting challenges: ", challengeToInsert);

  //   const { error: insertChallengeError } = await supabase
  //     .from("student_quiz")
  //     .insert(challengeToInsert);

  //   await supabase.from("students_challenges").insert({
  //     student_id: user.id,
  //     challenge_id: challengeToStart.id,
  //     status: "in progress",
  //   });

  //   if (updateChallengeError) {
  //     console.log("Update Challenge Error: ", updateChallengeError);
  //   }
  //   if (insertChallengeError) {
  //     console.log("Start Challenge Error: ", insertChallengeError);
  //   }
  // }
  async function checkComplete(challenge){
    let isComplete = false;
  
  if (challenge.challenge_type === 'quiz') {
    // Fetch completed quizzes for the user for this challenge
    const { data: completedQuizzes, error: quizError } = await supabase
      .from('student_quiz')
      .select('complete')
      .eq('student_id', student_id)
      .eq('complete', true)
     

    if (quizError) {
      console.error('Error fetching quiz sessions:', quizError);
      return false;
    }

    // Check if at least 2 quizzes are complete for this challenge
    if(completedQuizzes.length >= 2){
      isComplete=true;
      console.log(isComplete);
    }
  } else if (challenge.challenge_type === 'audio') {
    // Fetch completed audio sessions for the user for this challenge
    const { data: completedAudio, error: audioError } = await supabase
      .from('student_content')
      .select('audio_complete')
      .eq('student_id', student_id)
      .eq('audio_complete', true)
      

    if (audioError) {
      console.error('Error fetching audio sessions:', audioError);
      return false;
    }

    // Check if at least 1 audio session is complete for this challenge
     if(completedAudio.length >= 1){
      isComplete = true;
      console.log(isComplete);
     }
  }

  return isComplete; 
}
  async function formatData(data) {
    let res = [];
    for (let i = 0; i < data.length; i++) {
      const obj = data[i];
      // console.log("Challenge datatata: ", obj)
      const c = Challenge.fromJson(obj);
      const isComplete = await checkComplete(c)
      res.push({
        ...c,
      isComplete});
    }
    return res;
  }
  
  return (
    <>
    {console.log("Challenges data:", challenges)}

      <section className="challenges-container">
        <h5>Weekly Challenges</h5>
        

        {challenges.length > 0 ? (
          challenges.map((challenge,index) => (

            <div key={`${challenge.id}-${index}`} className="challenge-item">
              <div className="challenge-item-container">
                <div
                  // onClick={() => toggleExpand(challenge.id)}
                  className="challenge-item-details"
                >
                  <div className="challenge-item-icon">
                    <img src="../../public/quiz-icon.png" alt="quiz icon" />
                  </div>

                  <div className="challenge-item-info">
                    <p>{challenge.description}</p>
                    
                    <p>Closing Date: {challenge.date_end}</p>
                    <p>
                    Completed:{" "}
                    {challenge.isComplete ? "Yes" : "No"}
                  </p>
                  </div>
                </div>
                {/* {challengesStarted.includes(challenge.id) ? (
                  <div className="challenge-item-started">Started</div>
                ) : (
                  <button onClick={() => startChallenge(challenge.id)}>
                    Start
                  </button>
                )} */}
              </div>

              {/* Expand content*/}
              {/* <div
                className={`expandable-content ${
                  isExpanded === challenge.id ? "expanded" : ""
                }`}
              >
                {challenge.quizzes.map((quiz) => (
                  <li className="challenge-content-item" key={quiz.id}>
                    <p className="content-text">{quiz.contentTitle}</p>
                  </li>
                ))}
              </div> */}
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
