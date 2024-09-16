export default function DashTrackProgress() {
  const stats = {
    finishedContent: Math.floor(Math.random() * 50), // Random number between 0 and 49
    engagementScore: Math.floor(Math.random() * 100), // Random number between 0 and 99
    quizzesCompleted: Math.floor(Math.random() * 30), // Random number between 0 and 29
    gamesPlayed: Math.floor(Math.random() * 20), // Random number between 0 and 19
  };
  return (
    <section className="progress-container">
      <div className="student-stats-container">
        <h5 className="stats-title">Student Progress</h5>
        <div className="stats-content">
          <div className="stat-item">
            <span className="stat-value">{stats.finishedContent}</span>
            <span className="stat-label">Finished Content</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{stats.engagementScore}</span>
            <span className="stat-label">Engagement Score</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{stats.quizzesCompleted}</span>
            <span className="stat-label">Quizzes Completed</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{stats.gamesPlayed}</span>
            <span className="stat-label">Games Played</span>
          </div>
        </div>
      </div>
    </section>
  );
}
