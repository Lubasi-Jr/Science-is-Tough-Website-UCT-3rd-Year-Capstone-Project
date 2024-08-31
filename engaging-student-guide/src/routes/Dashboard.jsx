import "./Dashboard.css";
import { Link } from "react-router-dom";
import MuscleIcon from "../assets/muscle.svg";
import { Content } from "../models/content";
import { MdAudiotrack } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { GrDocumentPdf } from "react-icons/gr";

export default function Dashboard() {
  const favourites = [
    new Content(
      1,
      "images/metacog.jpg",
      "Metacognition: Your key to success",
      "content.html"
    ),
    new Content(
      2,
      "https://img.buzzfeed.com/buzzfeed-static/static/2020-09/28/15/asset/fc1f2fac717b/anigif_sub-buzz-29608-1601307260-18_preview.gif?output-quality=auto&output-format=auto&downsize=360:*",
      "How to succeed in your first BSc tests",
      "content.html"
    ),

    new Content(
      7,
      "images/brain.jpg",
      "So,how does your brain work?",
      "content.html"
    ),
  ];

  const recent = [
    new Content(
      2,
      "https://img.buzzfeed.com/buzzfeed-static/static/2020-09/28/15/asset/fc1f2fac717b/anigif_sub-buzz-29608-1601307260-18_preview.gif?output-quality=auto&output-format=auto&downsize=360:*",
      "How to succeed in your first BSc tests",
      "content.html"
    ),
    new Content(
      3,
      "images/ref.jpg",
      "Make the most of your vac",
      "content.html"
    ),
    new Content(
      4,
      "https://th.bing.com/th?id=OIF.ljB7NofIHqWXfUUV%2fMM5nQ&rs=1&pid=ImgDetMain",
      "The shape of your well-being",
      "content.html"
    ),
    new Content(
      5,
      "images/clock.jpg",
      "Next-level time management for succeeding at UCT",
      "content.html"
    ),
    new Content(
      6,
      "https://www.shutterstock.com/image-vector/goldfish-jumping-out-one-fishbowl-600nw-1870441930.jpg",
      "Culture shock at UCT",
      "content.html"
    ),
    new Content(8, "images/finals.jpg", "Acing exam season", "content.html"),
  ];

  const stats = {
    hoursRead: Math.floor(Math.random() * 100), // Random number between 0 and 99
    finishedContent: Math.floor(Math.random() * 50), // Random number between 0 and 49
    engagementScore: Math.floor(Math.random() * 100), // Random number between 0 and 99
    quizzesCompleted: Math.floor(Math.random() * 30), // Random number between 0 and 29
    gamesPlayed: Math.floor(Math.random() * 20), // Random number between 0 and 19
  };

  return (
    <>
      <div className="dashboard-container">
        {/* Navbar */}
        <div className="navbar">
          <div className="navbar-left">
            <Link to="/">Science is Tough</Link>
          </div>
          <div className="navbar-center">
            <Link to="/">Game</Link>
            <Link to="/">Logout</Link>
          </div>
          <div className="navbar-right">
            <div className="icon-text">
              <img className="muscle-icon" src={MuscleIcon} alt="muscle icon" />
              <p className="first">1000</p>
              <p className="second">pts</p>
            </div>
            <div className="profile-pic">
              <img
                src="../../public/default-profile-icon.png"
                alt="Profile Picture"
              />
            </div>
          </div>
        </div>
        <div className="bottom-container">
          <div className="left-panel">
            {/* Recent Activity */}
            <section className="recent-activity">
              <h4>Recent Activity</h4>
              <div className="recent-activity-container">
                {/* If audio was recently used */}
                <div className="audio-player-container">
                  <audio controls className="custom-audio-player">
                    <source
                      src="../../public/test_audio.mp3"
                      type="audio/mpeg"
                    />
                    Your browser does not support the audio element.
                  </audio>
                </div>
                <Link to="/content">Continue on Content Page</Link>
              </div>
            </section>

            {/* Favourite Container */}
            <section className="fav-container">
              <h4>Favourites</h4>
              <div className="fav-cards">
                {favourites.length > 0 ? (
                  favourites.map((f) => (
                    <div key={f.id} className="recent-item">
                      <div className="recent-start">
                        <img
                          src={f.imageSrc}
                          alt="Card Image"
                          className="recent-image"
                        />
                        <div className="card-content">
                          <p className="card-title">{f.title}</p>
                        </div>
                      </div>
                      <div className="recent-end">
                        <div className="text-icon">
                          <GrDocumentPdf className="recent-end-item " />
                        </div>
                        <div className="audio-icon">
                          <MdAudiotrack className="recent-end-item " />
                        </div>
                        <div className="video-icon">
                          <FaVideo className="recent-end-item " />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>You have not favourited any content yet</div>
                )}
              </div>
            </section>

            {/* Recently Uploaded  */}
            <section className="recent-container">
              <h4>Recently uploaded content</h4>
              <div className="recent-items">
                {recent.length > 0 ? (
                  recent.map((f) => (
                    <div key={f.id} className="recent-item">
                      <div className="recent-start">
                        <img
                          src={f.imageSrc}
                          alt="Card Image"
                          className="recent-image"
                        />
                        <div className="card-content">
                          <p className="card-title">{f.title}</p>
                        </div>
                      </div>
                      <div className="recent-end">
                        <div className="text-icon">
                          <GrDocumentPdf className="recent-end-item " />
                        </div>
                        <div className="audio-icon">
                          <MdAudiotrack className="recent-end-item " />
                        </div>
                        <div className="video-icon">
                          <FaVideo className="recent-end-item " />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>You have not favourited any content yet</div>
                )}
              </div>
            </section>
          </div>
          <div className="right-panel">
            {/* Track Progress */}
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
            {/* Weekly Challenges Component */}
            <section className="challenges-container">
              <div>
                <h5>Weekly Challenges</h5>
                <div className="challenge-item">
                  <div className="challenge-item-icon">
                    <img src="../../public/quiz-icon.png" alt="quiz icon" />
                  </div>
                  <div className="challenge-item-info">
                    <p>Do any two quizzes</p>
                    <p>Participants: 12</p>
                    <p>End: 35 August 2024</p>
                  </div>
                </div>
                <div className="challenge-item">
                  <div className="challenge-item-icon">
                    <img src="../../public/game-icon.png" alt="quiz icon" />
                  </div>
                  <div className="challenge-item-info">
                    <p>Read Next-Level Time Management for succeeding at UCT</p>
                    <p>Participants: 12</p>
                    <p>End: 35 August 2024</p>
                  </div>
                </div>
                <div className="challenge-item">
                  <div className="challenge-item-icon">
                    <img src="../../public/game-icon.png" alt="quiz icon" />
                  </div>
                  <div className="challenge-item-info">
                    <p>Play Game based on X-PDF</p>
                    <p>Participants: 12</p>
                    <p>End: 35 August 2024</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
