import { useState, useEffect } from "react";
import "./Challenges.css";
import { Challenge } from "../models/challenge";
function Challenges() {
  const [openChallenges, setOpenChallenges] = useState([]);
  useEffect(
    () =>
      setOpenChallenges([
        new Challenge(
          1,
          "Challenge 1",
          "This is the first challenge.",
          "2024-08-01",
          "2024-08-31",
          "Cool reward",
          20
        ),
        new Challenge(
          2,
          "Challenge 2",
          "This is the second challenge.",
          "2024-09-01",
          "2024-09-30",
          "Another Cool reward",
          15
        ),
      ]),
    []
  );

  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [enrolledChallenges, setEnrolledChallenges] = useState([]);

  // adds the challeng to openChallenges the user is currently doing

  // Start a challenge
  const startChallenge = (challenge) => {
    setEnrolledChallenges([...enrolledChallenges, challenge]); // Add to enrolled challenges
    setOpenChallenges(openChallenges.filter((ch) => ch.id !== challenge.id)); // Remove from open challenges
  };

  const openModal = (challenge) => {
    setSelectedChallenge(challenge);
  };

  const closeModal = () => {
    setSelectedChallenge(null);
  };

  return (
    <>
      <div>
        <div className="oswald-text">
          <h3>Open Challenges</h3>
        </div>

        {openChallenges.length === 0 ? (
          <h3 style={{color: "#0e1b4b"}}>Congratulations! 🎉 You’ve completed all the challenges! </h3>
        ) : (
          <ul className="l-group">
            {openChallenges.map((challenge) => (
              <li key={challenge.id} className="l-group-item">
                <div
                  className="left-section"
                  onClick={() => openModal(challenge)}
                >
                  <div className="name">{challenge.name}</div>
                  <div className="date">
                    Start Date: {challenge.date_created}
                  </div>
                </div>
                <div className="right-section">
                  <button
                    className="challenge-btn"
                    onClick={() => startChallenge(challenge)}
                  >
                    Start Challenge
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="oswald-text">
          <h3>Challenges Started</h3>
        </div>
        <ul className="l-group">
          {enrolledChallenges.map((challenge) => (
            <li key={challenge.id} className="l-group-item">
              <div
                className="left-section"
                onClick={() => openModal(challenge)}
              >
                <div className="name">{challenge.name}</div>
                <div className="date">Start Date: {challenge.date_created}</div>
              </div>
              <div className="right-section">
                <div>Time left: 15min</div>
              </div>
            </li>
          ))}
        </ul>

        {/* Modal */}

        {selectedChallenge && (
          <div
            style={{
              paddingBottom: "20px",
              color: "#0e1b4b",
              backgroundColor: "rgba(0, 0, 0, .65)",
            }}
            className="modal show fade d-block"
            tabIndex="-1"
            role="dialog"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{selectedChallenge.name}</h5>
                </div>
                <div className="modal-body">
                  <p>
                    <strong>Description:</strong>{" "}
                    {selectedChallenge.description}
                  </p>
                  <p>
                    <strong>End Date:</strong> {selectedChallenge.date_end}
                  </p>
                  <p>
                    <strong>Students Starting:</strong>{" "}
                    {selectedChallenge.studentsStarting}
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    
                    className="challenge-btn"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default Challenges;