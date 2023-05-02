import { useCallback, useEffect, useState } from "react";

export default function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth <= 991);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return isMobile;
}
