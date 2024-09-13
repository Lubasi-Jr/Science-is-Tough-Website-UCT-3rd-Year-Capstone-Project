import { useState, useEffect } from "react";
import "./Content.css";
import { MdAudiotrack } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { GrDocumentPdf } from "react-icons/gr";
import { useLocation } from "react-router-dom";
import Discussion from "../components/Discussion";

export default function Content() {
  const location = useLocation();
  const { content, contentType } = location.state || {}; // Handle cases where state might be undefined

  const [view, setView] = useState(contentType || "audio"); // Default to 'audio' if undefined
  const [audioUrl, setAudioUrl] = useState("");
  const [pdfUrl, setPDFUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [tags, setTags] = useState([]); // Store content tags

  // Handles loading states for audio
  function handleWaiting() {
    setIsLoading(true);
  }

  function handleLoadedData() {
    setIsLoading(false);
  }

  function handleCanPlay() {
    setIsLoading(false);
  }

  // Fetch tags when content changes
  useEffect(() => {
    if (content) {
      getTags(); // Get tags only when the content is available
    }
  }, [content]);

  // Fetches content when view changes
  useEffect(() => {
    if (view) {
      fetchContent(view);
    }
  }, [view]);

  // Function to set content view and update URLs
  function fetchContent(v) {
    setView(v);
    if (v === "pdf") {
      setPDFUrl(content?.pdf_url);
    } else if (v === "audio") {
      setAudioUrl(content?.audio_url);
    }
  }

  // Extract tags from content
  function getTags() {
    if (content?.category) {
      const ts = content.category.split(",");
      setTags(ts);
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
                  onClick={() => fetchContent("pdf")}
                  className="media-select-item "
                />
              </div>
              <div className="audio-icon">
                <MdAudiotrack
                  onClick={() => fetchContent("audio")}
                  onWaiting={handleWaiting}
                  onCanPlay={handleCanPlay}
                  onLoadedData={handleLoadedData}
                  className="media-select-item "
                />
                {isLoading && view === "audio" && <p>Loading audio...</p>}
              </div>
              <div className="video-icon">
                <FaVideo
                  onClick={() => fetchContent("video")}
                  className="media-select-item "
                />
              </div>
            </div>
            <div className="media-tags">
              {tags.map((tag, index) => (
                <div key={index} className="media-tag">{tag}</div>
              ))}
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
              <source src={audioUrl} type="audio/wav" />
              Browser does not support the audio element
            </audio>
          )}
        </section>
        {/* Chat/Discussion Section */}
        {/* <Discussion /> */}
      </div>
    </>
  );
}
