import { useEffect, useState } from "react";

export const LoadingText = () => {
  const [loadingText, setLoadingText] = useState("Loading");

  useEffect(() => {
    const loader = setInterval(() => {
      setLoadingText((prevText) => (prevText === "Loading..." ? "Loading" : `${prevText}.`));
    }, 1000);

    return () => {
      clearInterval(loader);
    };
  }, []); // Dependency array to run effect once

  return <div className="text-center w-full bg-gray-950 text-white py-2 px-3 rounded-lg hover:bg-gray-800">
    {loadingText}
  </div>;
};
