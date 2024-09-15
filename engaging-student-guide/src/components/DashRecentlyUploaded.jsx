import { useState, useEffect } from "react";
import { MdAudiotrack } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { GrDocumentPdf } from "react-icons/gr";
import QuizIcon from "./QuizIcon";
// import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { RecentContext } from "../context/contextRecentActivity";

export default function DashRecentlyUploaded() {
  const navigate = useNavigate();

  const { setRecentContent, setContentType } = RecentContext();
  const handleQuizClick = (content) => {
    // console.log("Clicked on quizz thing: ...")
    navigate(`/quiz/${content.id}`, {
      state: { content: content },
    });
  };
  const handleContentClick = (content, contentType) => {
    navigate(`/content/${content.id}`, {
      state: { content: content, contentType: contentType },
    });
    setContentType(contentType);
    setRecentContent(content);
  };

  const [allContent, setAllContent] = useState([]);

  useEffect(() => {
    const handleUpdate = (payload) => {
      const updatedItem = payload.new;
      setAllContent((prevItems) => {
        // Get index of item to update
        const existingIndex = prevItems.findIndex(
          (item) => item.id === updatedItem.id
        );
        // Update if valida index
        if (existingIndex > -1) {
          const updatedItems = [...prevItems];
          updatedItems[existingIndex] = updatedItem;
          return updatedItems;
        }
      });
    };

    // Subscribe to realtime updates on any field
    const subscription = supabase
      .channel("public:content")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "content" },
        handleUpdate
      )
      .subscribe();

    // Fetch all data on initial load
    const fetchData = async () => {
      const { data, error } = await supabase.from("content").select();

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setAllContent(data);
      }
    };

    fetchData();

    //! TODO: Check for network errors
    // { message: "TypeError: NetworkError when attempting to fetch resource.",
    // details: "", hint: "", code: ""

    // Clean up subscription on unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <section className="recent-container">
      <h4>Content</h4>
      <div className="recent-items">
        {allContent.length > 0 ? (
          allContent.map((content) => (
            <div key={content.id} className="recent-item">
              <div
                onClick={() => handleContentClick(content, "pdf")}
                className="recent-start"
              >
                <img
                  src={content.image_url}
                  alt="Card Image"
                  className="recent-image"
                />
                <div className="card-content">
                  <p className="card-title">{content.title}</p>
                </div>
              </div>
              <div className="recent-end">
                <div className="text-icon">
                  <GrDocumentPdf
                    onClick={() => {
                      handleContentClick(content, "pdf");
                    }}
                    className="recent-end-item "
                  />
                </div>
                <div className="audio-icon">
                  <MdAudiotrack
                    onClick={() => {
                      handleContentClick(content, "audio");
                    }}
                    className="recent-end-item "
                  />
                </div>
                <div className="video-icon">
                  <FaVideo
                    onClick={() => handleContentClick(content, "video")}
                    className="recent-end-item "
                  />
                </div>
                <div className="quiz-icon">
                  <QuizIcon onClick={() => handleQuizClick(content)} />
                </div>
                {/* <div className="fav-icon">
                  {content.favourite ? (
                    <FaHeart
                      style={{ color: "rgb(255, 62, 62)" }}
                      onClick={() =>
                        handleFavouriteUpdate(content.id, content.favourite)
                      }
                      className="recent-fav-item "
                    />
                  ) : (
                    <FaHeart
                      onClick={() =>
                        handleFavouriteUpdate(content.id, content.favourite)
                      }
                      className="recent-fav-item "
                    />
                  )}
                </div> */}
              </div>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </section>
  );
}
