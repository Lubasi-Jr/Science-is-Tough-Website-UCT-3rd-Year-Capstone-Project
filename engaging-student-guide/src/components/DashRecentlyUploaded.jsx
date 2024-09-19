import { useState, useEffect } from "react";
import { MdAudiotrack } from "react-icons/md";
import { GrDocumentPdf } from "react-icons/gr";
import QuizIcon from "./QuizIcon";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { RecentContext } from "../context/contextRecentActivity";
import { useAuth } from "../hooks/useAuth";

export default function DashRecentlyUploaded() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { setRecentContent, setContentType } = RecentContext();
  const handleQuizClick = async (content) => {
    navigate(`/quiz/${content.id}`, {
      state: { content: content },
    });
  };

  const handleContentClick = async (content, contentType) => {
    setContentType(contentType);
    setRecentContent(content);

    if (contentType === "pdf" && content.pdf_url) {
      window.open(content.pdf_url, "_blank"); //show pdf on new tab
    } else if (contentType === "audio" && content.audio_url) {
      window.open(content.audio_url, "_blank"); //show audio on new tab
      await audioComplete(content.id);
    }
  };

  const audioComplete = async (contentId) => {
    try {
      if (!user) {
        throw "User not authenticated";
      }
    } catch (error) {
      setError(error);
    }
    try {
      const { id: student_id } = user;
      console.log(
        "Updating audio completion for user:",
        student_id,
        "Content ID:",
        contentId
      );
      const i = {
        student_id: student_id,
        content_id: contentId,
        audio_complete: true,
      };
      const { error } = await supabase
        .from("student_content")
        .insert(i)
        .eq("student_id", student_id)
        .eq("content_id", contentId);

      if (error) {
        console.error("Error updating audio completion:", error);
        throw error;
      }
      console.log("updated");
    } catch (error) {
      setError(error.message);
    }
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
      try {
        setIsLoading(true);

        const { data, error } = await supabase.from("content").select();

        if (error) {
          throw error;
        } else {
          setAllContent(data);
          setIsLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
    // Clean up subscription on unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <section className="recent-container">
      <h4>Content</h4>
      <div className="recent-items">
        {isLoading ? (
          <div className="loading-message">Loading content...</div>
        ) : error ? (
          <div className="error-message">
            Error fetching content. Contact admin.
          </div>
        ) : allContent.length > 0 ? (
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
                <div className="quiz-icon">
                  <QuizIcon onClick={() => handleQuizClick(content)} />
                </div>
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
