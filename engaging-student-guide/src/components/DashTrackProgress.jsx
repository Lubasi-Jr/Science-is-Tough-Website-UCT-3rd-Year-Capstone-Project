import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../hooks/useAuth";

export default function DashTrackProgress() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    finishedContent: 0,
    engagementScore: 0,
    quizCompleted: 0,
  });

  useEffect(() => {
    const fetchCompleted = async () => {
      if (!user) {
        return;
      }
      const { id: student_id } = user;
      const { data: quizdata, error: quizerror } = await supabase
        .from("student_quiz")
        .select("complete")
        .eq("student_id", student_id);

      if (quizerror) {
        console.error("Error fetching quizzes completed:", quizerror);
        return;
      }

      const quizCompleted = quizdata.filter((quiz) => quiz.done).length;

      const { data: audiodata, error: audioerror } = await supabase
        .from("student_content")
        .select("audio_complete")
        .eq("student_id", student_id);
      if (audioerror) {
        console.error("Error fetching audio's completed:", audioerror);
        return;
      }

      const finishedContent = audiodata.filter(
        (audio) => audio.audio_complete
      ).length;

      setStats((stat) => ({
        ...stat,
        quizCompleted: quizCompleted,
        finishedContent: finishedContent,
        engagementScore: quizCompleted + finishedContent,
      }));
    };

    fetchCompleted();
    const contentsubscription = supabase
      .channel("public:student_content")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "student_content" },
        (payload) => {
          console.log("Change received:", payload);
          fetchCompleted(); // Re-fetch progress data when there's an update
        }
      )
      .subscribe((status) => {
        console.log("Subscription status:", status); // Log subscription status
      });
    const quizSubscription = supabase
      .channel("public:student_quiz")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "student_quiz" },
        (payload) => {
          console.log("Change detected in students_quizzes:", payload);
          fetchCompleted(); // Re-fetch data when quizzes are updated
        }
      )
      .subscribe();

    // Cleanup the subscription when the component unmounts
    return () => {
      supabase.removeChannel(contentsubscription);
      supabase.removeChannel(quizSubscription);
    };
  }, [user]);

  return (
    <section className="progress-container">
      <div className="student-stats-container">
        <h5 className="stats-title">Student Progress</h5>
        <div className="stats-content">
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
