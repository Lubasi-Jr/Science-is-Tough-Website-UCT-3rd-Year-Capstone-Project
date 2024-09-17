//import React from "react";
import { Link } from "react-router-dom";


export default function DashGame() {
  {
    /* Distract Me Game Preview */
  }
  return (
    <>
      <section className="game-preview">
        <h4 className="game-heading">Game</h4>
        <div className="game-preview-container">
          <img
            src="/images/game-preview.gif"
            alt="Game Preview"
            className="game-preview-gif"
          />
          <Link to="/distract" className="play-button">
            Start
          </Link>
        </div>
      </section>
    </>
  );
}
