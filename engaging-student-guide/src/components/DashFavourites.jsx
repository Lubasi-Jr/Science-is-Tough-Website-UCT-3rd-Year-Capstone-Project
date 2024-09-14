import { useState, useEffect } from "react";
import { MdAudiotrack } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { GrDocumentPdf } from "react-icons/gr";
import { supabase } from "../lib/supabaseClient";

export default function DashFavourites() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const handleUpdate = (payload) => {
      const updatedItem = payload.new;

      setFavourites((prevItems) => {
        // Check item exist
        const existingIndex = prevItems.findIndex(
          (item) => item.id === updatedItem.id
        );

        if (existingIndex > -1) {
          // add the item if it's favourite value was set to true
          if (updatedItem.favourite) {
            const updatedItems = [...prevItems];
            updatedItems[existingIndex] = updatedItem;
            return updatedItems;
          } else {
            // If the item is no longer a favourite, remove it from the list
            return prevItems.filter((item) => item.id !== updatedItem.id);
          }
        } else {
          // If the item is new and is a favourite, add it to the list
          if (updatedItem.favourite) {
            return [...prevItems, updatedItem];
          }
        }

        // If nothing changes, return the previous list
        return prevItems;
      });
    };

    // Subscribe to realtime updates on any field
    const subscription = supabase
      .channel("public:content_fav")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "content" },
        handleUpdate
      )
      .subscribe();

    // Fetch initial favourites
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("content")
        .select()
        .eq("favourite", true);
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setFavourites(data);
      }
    };

    fetchData();

    // Clean up subscription on unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <section className="fav-container">
      <h4>Favourites</h4>
      <div className="fav-cards">
        {favourites.length > 0 ? (
          favourites.map((content) => (
            <div key={content.id} className="recent-item">
              <div className="recent-start">
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
  );
}
