import { GetPointsContext } from "../context/PointsContext";

export default function DashRewards() {
  const { points } = GetPointsContext();
 {/*creates rewards container which displays the total amount of points a user has earned over time*/}

  return (
    <>
      <section className="Toughpoints">
        <h4>Rewards</h4>
        <div className="toughpoints-body">
          <img
            className="coins"
            src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L3YxMTYxLWItMDQ3LmpwZw.jpg"
          />
          <h1 className="first">
            <b>{points}</b>
          </h1>
          <p className="second">pts</p>
        </div>
        <div className="instruction">
          <b style={{ marginTop: "10px" }}>
            Instructions:
          </b>
          <br></br>
          <p >
            Earn points doing any of your available challenges.<br></br>
            Once you reach 1000 points you will be able to claim a voucher.
          </p>
        </div>
      </section>
    </>
  );
}
