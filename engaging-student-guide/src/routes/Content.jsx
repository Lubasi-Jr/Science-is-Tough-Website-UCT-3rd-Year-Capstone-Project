import { useState } from "react";
import "./Content.css";
import { MdAudiotrack } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { GrDocumentPdf } from "react-icons/gr";
import { supabase } from "../lib/supabaseClient";
import { useEffect } from "react";

export default function Content({ content, contentType }) {
  const [view, setView] = useState(contentType);
  const [audioUrl, setAudioUrl] = useState("");

  useEffect(() => {
    fetchContent(content, contentType);
  }, []);

  async function fetchContent(content, contentType) {
    // fetch pdf or audio url
    if (contentType === "pdf") {
      const { data, error } = await supabase
        .from("content")
        .select("audio_url")
        .eq("id", content.id);

      if (error) {
        console.error("Error fetching audio URL:", error);
      } else if (data && data.length > 0) {
        setAudioUrl(data[0].audio_url);
      }
    } else {
      const { data, error } = await supabase
        .from("content")
        .select("audio_url")
        .eq("id", content.id);

      if (error) {
        console.error("Error fetching audio URL:", error);
      } else if (data && data.length > 0) {
        setAudioUrl(data[0].audio_url); // Set the URL into state
      }
    }
  }

  return (
    <>
      <div className="content-container">
        {/* Display PDF, Video, or Audio here  */}
        <section className="media-section">
          <h4 className="media-title">
            Next-Level Time Management for succeeding at UCT
          </h4>
          <div className="media-info">
            <div className="media-select">
              <div className="text-icon">
                <GrDocumentPdf
                  onClick={() => setView("pdf")}
                  className="media-select-item "
                />
              </div>
              <div className="audio-icon">
                <MdAudiotrack
                  onClick={() => setView("audio")}
                  className="media-select-item "
                />
              </div>
              <div className="video-icon">
                <FaVideo
                  onClick={() => setView("video")}
                  className="media-select-item "
                />
              </div>
            </div>
            <div className="media-tags">
              <div className="media-tag">success</div>
              <div className="media-tag">study</div>
            </div>
          </div>
          {view === "video" && (
            <video controls>
              <source src="test.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          {view === "pdf" && (
            <iframe src={pdfUrl} height="500" title="PDF Viewer" />
          )}

          {view === "audio" && (
            <audio className="audio-player" controls>
              <source src={audioUrl} type="audio/mpeg" />
              Browser does not support the audio element
            </audio>
          )}
        </section>
        {/* Chat/Discussion Section  */}
        <section className="chat-section">
          <h4>Discussion Forum</h4>
          <div className="chat-box">
            <div className="chat-item">
              <strong>Student 2</strong> <span>21 Sept 2024</span>
              <p>I learned so much from this content.</p>
            </div>
            <div className="chat-item">
              <strong>Student 8</strong> <span>23 Sept 2024</span>
              <p>Me Too. Definitely engaging!!!</p>
            </div>
          </div>
          <textarea
            type="text"
            placeholder="Type your message..."
            className="chat-input"
          />
        </section>
      </div>
    </>
  );
}
