import { useEffect, useState, createContext, useContext } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../hooks/useAuth";

const PointsContext = createContext();

export default function PointsContextProvider({ children }) {
  const auth = useAuth();
  const [points, setPoints] = useState(0);
  const [isFetched, setIsFetched] = useState(false); // Flag to track if points have been fetched

  useEffect(() => {
    if (auth.user && !isFetched) { // Ensure the function runs only once after user logs in
      async function fetchStudentPoints() {
        const { data, error } = await supabase
          .from("student")
          .select("points")
          .eq("id", auth.user.id);

        if (error) {
          console.log("Error fetching student score: ", error.message);
        } else if (!data || data.length === 0) {
          console.log("No student record found.");
        } else if (data.length > 1) {
          console.log("Multiple student records found.");
        } else {
          setPoints(data[0].points);
        }

        setIsFetched(true); // Set the flag to true after fetching
      }
      fetchStudentPoints();
    }
  }, [auth.user, isFetched]); // Only re-run if auth.user or isFetched changes

  useEffect(() => {
    if (auth.user) {
      const handleUpdate = (payload) => {
        const obj = payload.new;
        setPoints(obj.points);
      };

      const studentSubscription = supabase
        .channel("public:student")
        .on(
          "postgres_changes",
          { event: "UPDATE", schema: "public", table: "student" },
          handleUpdate
        )
        .subscribe();

      return () => {
        supabase.removeChannel(studentSubscription); // Clean up on unmount or dependency change
      };
    }
  }, [auth.user]);

  return (
    <PointsContext.Provider value={{ points }}>
      {children}
    </PointsContext.Provider>
  );
}

export const GetPointsContext = () => {
  return useContext(PointsContext);
};
