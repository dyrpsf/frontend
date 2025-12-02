import { useEffect } from "react";

export default function Splash() {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/home";
    }, 2000);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-blue-600 dark:bg-gray-900">
      <h1 className="text-4xl text-white animate-pulse">GDGC Members</h1>
    </div>
  );
}
