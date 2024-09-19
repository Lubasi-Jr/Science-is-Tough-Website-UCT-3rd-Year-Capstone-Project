import { RecentContext } from "../context/contextRecentActivity";

export default function DashRecentActivity() {
  const { recentContent, contentType } = RecentContext();
{/*opens a new tab and displays either a pdf or audio depending on content type*/}

  async function handleRecentActivityNav(contentType, content) {
    if (contentType === "pdf" && content.pdf_url) {
      window.open(content.pdf_url, "_blank"); //show pdf on new tab
    } else if (contentType === "audio" && content.audio_url) {
      window.open(content.audio_url, "_blank"); //show audio on new tab
    }
  }
{/*Provide quick access to what users previously interacted with*/}

  return (
    <section className="recent-activity">
      <h4>Recent Activity</h4>
      {!recentContent || !contentType ? (
        <div>No recent activity</div>
      ) : (
        <div className="recent-activity-container">
          {/* If audio was recently used */}
          <div className="audio-player-container">
            {contentType === "audio" ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "1em",
                  paddingBottom: "1em",
                }}
              >
                <div
                  onClick={() => handleRecentActivityNav("audio", recentContent)}
                  style={{
                    textDecoration: "underline",
                    fontSize: "large",
                    width: "fit-content",
                    cursor: "pointer"
                  }}
                >
                  Listen in new window: {recentContent.title}
                </div>

                <audio controls className="custom-audio-player">
                  <source src={recentContent.audio_url} type="audio/wav" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            ) : (
              <div style={{ paddingBottom: "10px" }}>
                <span>Continue reading </span>
                <span
                  onClick={() => handleRecentActivityNav("pdf", recentContent)}
                  style={{
                    textDecoration: "underline",
                    fontSize: "large",
                    cursor: "pointer",
                  }}
                >
                  {recentContent.title}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
