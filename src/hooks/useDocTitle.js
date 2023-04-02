import { useEffect } from "react";

const useDocTitle = (title) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} - HDK`;
    } else {
      document.title = "HDK Shop | All ";
    }
  }, [title]);

  return null;
};

export default useDocTitle;
