import { useEffect,useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../hooks/useAuth";

export default function DashTrackProgress() {
  const { user } = useAuth();
  const [stats,setStats] = useState ({
    hoursRead :0,
    finishedContent: 0, 
    engagementScore: 0, 
    quizCompleted:0, 
     
  });

  useEffect(()=>{
    const fetchCompleted = async () => {

      if (!user) {
        console.error("User not authenticated");
        return;
      }
      console.log("User ID:", user.id);
      const{id:student_id} = user;
      const { data:quizdata, error:quizerror } = await supabase.from("students_quizzes").select("done").eq("student_id",student_id);
      
      if(quizerror){
        console.error("Error fetching quizzes completed:", quizerror);
        return;
      } 

      const quizCompleted = quizdata.filter((quiz) => quiz.done).length;
      
      const { data:audiodata, error:audioerror } = await supabase.from("students_content").select("audio_complete").eq("student_id",student_id);
      console.log("Audio data: ", audiodata);
      if(audioerror){
        console.error("Error fetching audio's completed:", audioerror);
        return;
      } 

      const finishedContent = audiodata.filter((audio) => audio.audio_complete).length;
      
      setStats((stat) =>({
        ...stat,
        quizCompleted:quizCompleted,
        finishedContent:finishedContent,
        engagementScore:quizCompleted+finishedContent,
       }));
  };

    fetchCompleted();
    const subscription = supabase
    .from("students_content")
    .on("UPDATE", (payload) => {
      console.log("Change received", payload);
      fetchCompleted(); // Re-fetch progress data when there's an update
    })
    .subscribe();

  return () => {
    supabase.removeSubscription(subscription); 
  };
}, [user]);

  return (
    <section className="progress-container">
      <div className="student-stats-container">
        <h5 className="stats-title">Student Progress</h5>
        <div className="stats-content">
          <div className="stat-item">
            <span className="stat-value">{stats.hoursRead}</span>
            <span className="stat-label">Hours Read</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{stats.finishedContent}</span>
            <span className="stat-label">Audios Complete</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{stats.quizCompleted}</span>
            <span className="stat-label">Quizzes Completed</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{stats.engagementScore}</span>
            <span className="stat-label">Engagement Score</span>
          </div>
        </div>
      </div>
    </section>
  );
}
