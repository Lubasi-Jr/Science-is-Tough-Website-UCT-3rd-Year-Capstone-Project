import "./Dashboard.css";
import DashChallenges from "../components/DashChallenges";
import DashTrackProgress from "../components/DashTrackProgress";
import DashRecentlyUploaded from "../components/DashRecentlyUploaded";
import DashRecentActivity from "../components/DashRecentActivity";
import DashRewards from "../components/DashRewards";
import DashGame from "../components/DashGame";

export default function Dashboard() {
  return (
    <>
      <div className="dashboard-container">
        <div className="bottom-container">
          <div className="left-panel">
            {/* Recent Activity */}
            <DashRecentActivity />

            {/* Weekly Challenges Component */}
            <DashChallenges />
            {/* Favourite Container */}
            {/* <DashFavourites /> */}
            {/* Recently Uploaded  */}
            <DashRecentlyUploaded />
          </div>
          <div className="right-panel">
            {/* Rewards */}
            <DashRewards />
            {/* Track Progress */}
            <DashTrackProgress />
            {/* Game preview */}
            <DashGame />
          </div>
        </div>
      </div>
    </>
  );
}
