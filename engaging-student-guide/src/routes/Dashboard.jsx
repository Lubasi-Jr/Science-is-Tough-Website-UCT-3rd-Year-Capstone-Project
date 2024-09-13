// import "./Dashboard.css";
import DashChallenges from "../components/DashChallenges";
import DashTrackProgress from "../components/DashTrackProgress";
import DashRecentlyUploaded from "../components/DashRecentlyUploaded";
// import DashFavourites from "../components/DashFavourites";
import DashRecentActivity from "../components/DashRecentActivity";

export default function Dashboard() {
  return (
    <>
      <div className="dashboard-container">
        <div className="bottom-container">
          <div className="left-panel">
            {/* Recent Activity */}
            <DashRecentActivity />
            {/* Favourite Container */}
            {/* <DashFavourites /> */}
            {/* Recently Uploaded  */}
            <DashRecentlyUploaded />
          </div>
          <div className="right-panel">
            {/* Track Progress */}
            <DashTrackProgress />
            {/* Weekly Challenges Component */}
            <DashChallenges />
          </div>
        </div>
      </div>
    </>
  );
}
