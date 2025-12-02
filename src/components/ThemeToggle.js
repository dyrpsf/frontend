export default function ThemeToggle() {
  const toggle = () => {
    let isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <button onClick={toggle} className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded">
      Toggle Theme
    </button>
  );
}
