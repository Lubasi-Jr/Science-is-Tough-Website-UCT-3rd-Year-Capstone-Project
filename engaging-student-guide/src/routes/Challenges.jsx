import { useState } from "react";
import "./Challenges.css";

function Challenges() {
  const openChallenges = [
    {
      id: 1,
      name: "Challenge 1",
      description: "This is the first challenge.",
      startDate: "2024-08-01",
      endDate: "2024-08-31",
      award: "Cool award",
      studentsStarting: 20,
    },
    {
      id: 2,
      name: "Challenge 2",
      description: "This is the second challenge.",
      startDate: "2024-09-01",
      endDate: "2024-09-30",
      award: "Another Cool award",
      studentsStarting: 15,
    },
  ];

  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [enrolledChallenges, setEnrolledChallnges] = useState([]);

  // adds the challeng to openChallenges the user is currently doing
  const startChallenge = (challenge) => {
    // const found = selectedChallenge.find((c) => c.id === challenge.id);
    setEnrolledChallnges([...enrolledChallenges, challenge]);
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
        <div className="challenge-header">
          <h3>Open Challenges</h3>
        </div>
        <ul className="l-group">
          {openChallenges.map((challenge) => (
            <li key={challenge.id} className="l-group-item">
              <div
                className="left-section"
                onClick={() => openModal(challenge)}
              >
                <div className="name">{challenge.name}</div>
                <div className="date">Start Date: {challenge.startDate}</div>
              </div>
              <div className="right-section">
                <button
                  className="btn btn-primary"
                  onClick={() => startChallenge(challenge.id)}
                >
                  Start
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="challenge-header">
          <h3>Enrolled Challenges</h3>
        </div>
        <ul className="l-group">
          {enrolledChallenges.map((challenge) => (
            <li key={challenge.id} className="l-group-item">
              <div
                className="left-section"
                onClick={() => openModal(challenge)}
              >
                <div className="name">{challenge.name}</div>
                <div className="date">Start Date: {challenge.startDate}</div>
              </div>
              <div className="right-section">
                <div>Time left: 30min</div>
              </div>
            </li>
          ))}
        </ul>

        {/* Modal */}

        {selectedChallenge && (
          <div
            style={{
              paddingBottom: "20px",
              backgroundColor: "rgba(0, 0, 0, .65)",
            }}
            className="modal show fade d-block"
            tabIndex="-1"
            role="dialog"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {selectedChallenge.name} - About
                  </h5>
                </div>
                <div className="modal-body">
                  <p>
                    <strong>Description:</strong>{" "}
                    {selectedChallenge.description}
                  </p>
                  <p>
                    <strong>End Date:</strong> {selectedChallenge.endDate}
                  </p>
                  <p>
                    <strong>Students Starting:</strong>{" "}
                    {selectedChallenge.studentsStarting}
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
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
