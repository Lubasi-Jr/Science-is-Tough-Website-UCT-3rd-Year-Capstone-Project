import { MdAudiotrack } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { GrDocumentPdf } from "react-icons/gr";
import { Content } from "../models/content";

export default function DashFavourites() {
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
    return <section className="fav-container">
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

}