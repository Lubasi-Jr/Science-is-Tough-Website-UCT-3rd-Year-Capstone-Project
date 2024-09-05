import { Link } from "react-router-dom";

export default function DashRecentActivity() {
  return (
    <section className="recent-activity">
      <h4>Recent Activity</h4>
      <div className="recent-activity-container">
        {/* If audio was recently used */}
        <div className="audio-player-container">
          <audio controls className="custom-audio-player">
            <source src="../../public/test_audio.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
        <Link to="/content">Continue on Content Page</Link>
      </div>
    </section>
  );
}
