import { useEffect, useState } from "react";
import axios from "axios";
import ThemeToggle from "../components/ThemeToggle";

export default function Home() {
  const [members, setMembers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ role: "", skill: "" });

  useEffect(() => {
    axios.get("http://localhost:4000/members")
      .then(res => {
        setMembers(res.data);
        setFiltered(res.data);
      })
      .catch(() => alert("Error fetching members"));
  }, []);

  useEffect(() => {
    let data = members.filter(m =>
      (m.name.toLowerCase().includes(query) ||
        m.bio.toLowerCase().includes(query)) &&
      (filters.role ? m.role === filters.role : true) &&
      (filters.skill ? m.skills.includes(filters.skill) : true)
    );
    setFiltered(data);
  }, [query, filters]);

  return (
    <div className="p-4 dark:bg-black min-h-screen">
      <ThemeToggle />

      <input
        type="text"
        placeholder="Search..."
        className="p-2 border w-full my-3"
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
      />

      <div className="flex gap-4 mb-4">
        <select onChange={(e) => setFilters({ ...filters, role: e.target.value })}>
          <option value="">Filter by Role</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
        </select>

        <select onChange={(e) => setFilters({ ...filters, skill: e.target.value })}>
          <option value="">Filter by Skill</option>
          <option value="React">React</option>
          <option value="Node">Node</option>
          <option value="UI/UX">UI/UX</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {filtered.map((m) => (
          <div key={m.id} className="p-4 border shadow dark:bg-gray-800">
            <img src={m.photo} className="h-32 w-32 mx-auto rounded-full" />
            <h2 className="text-xl font-bold text-center">{m.name}</h2>
            <p className="text-center text-sm">{m.role}</p>
            <p className="text-sm mt-2">{m.bio}</p>
            <p className="text-xs mt-2 font-semibold">Skills: {m.skills.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
