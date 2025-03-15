import axios from "axios";
import { useEffect, useState } from "react";

export default function useCourses() {
  const [courses, setCourse] = useState([]);
  const allCourses = async () => {
    const data = await axios.get("/public/demo.json");
    setCourse(data.data);
  };
  useEffect(() => {
    allCourses();
  }, []);

  return { courses };
}
