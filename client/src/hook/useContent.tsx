import { useEffect, useState } from "react";
import { backend_url } from "../config";
import axios from "axios";

const useContent = () => {
  const [contents, setContents] = useState([]);

  async function refresh() {
    await axios
      .get(`${backend_url}/api/v1/content`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setContents(response.data.content);
      });
  }

  useEffect(() => {
    const intervals = setInterval(() => {
      refresh();
    }, 10 * 100);
    return () => {
      clearInterval(intervals);
    };
  }, []);

  return { contents, refresh };
};

export default useContent;
