import { Content } from "../models/content";
import { MdAudiotrack } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { GrDocumentPdf } from "react-icons/gr";
export default function DashRecentlyUploaded () {
    
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
    return <section className="recent-container">
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
}