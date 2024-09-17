/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../hooks/useAuth";

const PointsContext = createContext();

export default function PointsContextProvider({ children }) {
  const auth = useAuth();
  const [points, setPoints] = useState(0);

  useEffect(() => {
    async function fetchStudentPoints() {
      const { data, error } = await supabase
        .from("student")
        .select("points")
        .eq("id", auth.user.id)
        .single();
      if (error) {
        console.log("Error fetching student score: ", error);
      } else {
        setPoints(data.points);
      }
    }

    fetchStudentPoints();
  }, [auth]);

  useEffect(() => {
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
      supabase.removeChannel(studentSubscription);
    };
  }, []);
  return (
    <PointsContext.Provider value={{ points }}>
      {children}
    </PointsContext.Provider>
  );
}

export const GetPointsContext = () => {
  return useContext(PointsContext);
};
