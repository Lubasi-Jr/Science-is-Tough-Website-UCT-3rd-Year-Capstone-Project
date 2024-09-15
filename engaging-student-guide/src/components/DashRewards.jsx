//import React from "react";
import { Link } from "react-router-dom";

export default function DashRewards(){
  return(
    <>
          <div className="r-panel">
            <section className="Toughpoints">
              <h4 style={{marginTop:'18px'}}>Rewards</h4>
              <img className="coins" src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L3YxMTYxLWItMDQ3LmpwZw.jpg"/>
            <h1 className="first"><b>1000</b></h1>
            <p className="second">pts</p>
             <b>Instructions:</b><br></br>
             Earn points doing any of your available challenges.<br></br>
             Once you reach 1000 points you will be able to claim a voucher.
            </section>
            <br></br>
          
          {/* Distract Me Game Preview */}
          <section className="game-preview">
            <h4 className="game-heading">Game</h4>
            <div className="game-preview-container">
              <img src="/images/game-preview.gif" alt="Game Preview" className="game-preview-gif" />
              <Link to="/distract" className="play-button">Start</Link>
            </div>
          </section>
          </div>
   </>
);
 }