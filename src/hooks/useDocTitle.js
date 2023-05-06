import { useEffect } from "react";

const useDocTitle = (title) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} - HDK`;
    } else {
      document.title = "HDK Shop | Tất cả";
    }
  }, [title]);

  return null;
};

export default useDocTitle;
