import { useState, useEffect } from "react";
import { MdAudiotrack } from "react-icons/md";
import { GrDocumentPdf } from "react-icons/gr";
import QuizIcon from "./QuizIcon";
// import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { RecentContext } from "../context/contextRecentActivity";
import { useAuth } from "../hooks/useAuth";

export default function DashRecentlyUploaded() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setRecentContent, setContentType } = RecentContext();
  const handleQuizClick = async (content) => {
    // const { data, error } = await supabase
    //   .from("quiz")
    //   .select("id")
    //   .eq("content_id", content.id)
    //   .single();

    // if (error) {
    //   console.error("Error fetching quiz ID:", error.message);
    //   return;
    // }

    // const quizId = data.id;
    // console.log("Clicked on quizz thing: ...")
    navigate(`/quiz/${content.id}`, {
      state: { content: content },
    });
    // await quizComplete(content.id, quizId);
  };

  const handleContentClick = async (content, contentType) => {
    // navigate(`/content/${content.id}`, {
    //   state: { content: content, contentType: contentType },
    // });
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
    if (!user) {
      console.error("User not authenticated");
      return;
    }
    //console.log("User ID:", user.id);
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
    }
    console.log("updated");
  };

  // const quizComplete = async (contentI, quizId) => {
  //   console.log("Quiz is Complete execution....");

  //   if (!user) {
  //     console.error("User not authenticated");
  //     return;
  //   }
  //   const { id: student_id } = user;
  //   console.log(
  //     "Updating quiz completion for user:",
  //     student_id,
  //     "content ID:",
  //     contentI
  //   );
  //   const details = {
  //     student_id: student_id,
  //     content_id: contentI,
  //     quiz_id: quizId,
  //     complete: true,
  //   };
  //   const { error } = await supabase
  //     .from("student_quiz")
  //     .insert(details)
  //     .eq("student_id", student_id)
  //     .eq("content_id", contentI)
  //     .eq("quiz_id", quizId);
  //   // , { onConflict: ["student_id", "content_id", "quiz_id"] })

  //   if (error) {
  //     console.error("Error updating audio completion:", error);
  //   }
  //   console.log("updated");
  // };

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
