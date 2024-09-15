import { useState, useEffect } from "react";
import { MdAudiotrack } from "react-icons/md";
import { GrDocumentPdf } from "react-icons/gr";
// import { FaHeart } from "react-icons/fa";
//import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { RecentContext } from "../context/contextRecentActivity";


export default function DashRecentlyUploaded() {
  //const navigate = useNavigate();
  //const [viewingContentType, setViewingContentType] = useState(null);
  //constant [currentContent, setCurrentContent] = useState(null);

  const { setRecentContent, setContentType } = RecentContext();

  const handleContentClick = (content, contentType) => {
    //navigate(`/content/${content.id}`, {
      //state: { content: content, contentType: contentType },
    //});
   // console.log(`Clicked on ${contentType}:`, content); 
    setContentType(contentType);
    setRecentContent(content);
    //setCurrentContent(content);
    //setViewingContentType(contentType);
    if (contentType === "pdf" && content.pdf_url) {
      window.open(content.pdf_url, "_blank");//show pdf on new tab
    } else if (contentType === "audio" && content.audio_url) {
      window.open(content.audio_url, "_blank");//show audio on new tab
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

  // async function handleFavouriteUpdate(id, fav) {
  //   const { error } = await supabase
  //     .from("content")
  //     .update({ favourite: !fav }) // or false to unset the favourite
  //     .eq("id", id);

  //   if (error) {
  //     console.error("Error updating favourite:", error);
  //   }
  // }

  return (
    <section className="recent-container">
      <h4>Recently uploaded content</h4>
      <div className="recent-items">
        {allContent.length > 0 ? (
          allContent.map((content) => (
            <div key={content.id} className="recent-item">
              <div
                onClick={() => handleContentClick(content, "pdf")}
                className="recent-start"
              >
                
                <div className="c-images">
                <img
                  src={content.image_url}
                  alt="Card Image"
                  className="recent-image"
                />
                </div>
                <div className="card-content">
                  <p className="card-title">{content.title}</p>
                </div>
              </div>
              <div className="recent-end">
                <div className="card-icons">
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
