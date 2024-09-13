import { Link } from "react-router-dom";
import { RecentContext } from "../context/contextRecentActivity";

export default function DashRecentActivity() {
  const { recentContent, setRecentContent, contentType, setContentType } =
    RecentContext();

  return (
    <section className="recent-activity">
      <h4>Recent Activity</h4>
      {recentContent === null || recentContent === null ? (
        <div>No recent activity</div>
      ) : (
        <div className="recent-activity-container">
          {/* If audio was recently used */}
          <div className="audio-player-container">
            {contentType === "audio" ? (
              <div>
                <h4 style={{ textDecoration: "underline", fontSize: "large" }}>
                  {recentContent.title}
                </h4>

                <audio controls className="custom-audio-player">
                  <source src={recentContent.audio_url} type="audio/wav" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            ) : (
              <div style={{ paddingBottom: "10px" }}>
                <span>Continue reading </span>
                <span
                  style={{ textDecoration: "underline", fontSize: "large" }}
                >
                  {recentContent.title}
                </span>
              </div>
            )}
          </div>
          <Link to={`/content/${recentContent.id}`}>
            Continue on Content Page
          </Link>
        </div>
      )}
    </section>
  );
}
