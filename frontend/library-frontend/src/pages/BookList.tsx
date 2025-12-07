import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/axiosConfig";

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  category: string;
}

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [username, setUsername] = useState<string | null>("");

  const isLoggedIn = () => !!localStorage.getItem("token");

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) setUsername(user);
  }, []);

  useEffect(() => {
    api.get("/Books")
      .then(r => setBooks(r.data))
      .catch(() => alert("Error fetching books!"));
  }, []);

  const filteredBooks = books.filter(b =>
    (b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())) &&
    (categoryFilter === "" || b.category === categoryFilter)
  );

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure?")) {
      api.delete(`/Books/${id}`)
        .then(() => {
          alert(" Book deleted!");
          setBooks(prev => prev.filter(b => b.id !== id));
        });
    }
  };

  return (
    <div className="backdrop-blur-xl bg-white/70 shadow-2xl rounded-3xl p-8 border border-white/50">
      <h1 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
        Book Catalog
      </h1>

      {isLoggedIn() && (
        <p className="text-slate-700 font-medium mb-6 text-lg">
          Welcome back, <span className="text-indigo-600 font-bold">{username}</span>
        </p>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search by Title or Author..."
          className="flex-1 min-w-[250px] px-4 py-3 bg-white/80 border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          className="min-w-[200px] px-4 py-3 bg-white/80 border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500"
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Science">Science</option>
          <option value="Biography">Biography</option>
          <option value="History">History</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Table */}
      {/* Table */}
<div className="overflow-x-auto rounded-2xl shadow-xl border border-slate-200">
  <table className="w-full text-slate-800 border-collapse">
    
    <thead className="bg-gradient-to-r from-slate-900 to-indigo-900 text-white uppercase text-sm">
      <tr>
        <th className="px-5 py-3 text-left">ID</th>
        <th className="px-5 py-3 text-left">Title</th>
        <th className="px-5 py-3 text-left">Author</th>
        <th className="px-5 py-3 text-left">Description</th>
        <th className="px-5 py-3 text-left">Category</th>
        {isLoggedIn() && <th className="px-5 py-3 text-center">Action</th>}
      </tr>
    </thead>

    <tbody className="divide-y divide-slate-300">
      {filteredBooks.map(b => (
        <tr key={b.id} className="hover:bg-indigo-50 transition">
          <td className="px-5 py-3">{b.id}</td>
          <td className="px-5 py-3 font-medium">{b.title}</td>
          <td className="px-5 py-3">{b.author}</td>
          <td className="px-5 py-3">{b.description}</td>
          <td className="px-5 py-3">{b.category}</td>

          {isLoggedIn() && (
            <td className="px-5 py-3 text-center">
              <div className="flex justify-center gap-4">

                <Link to={`/edit/${b.id}`}>
                  <button
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                </Link>

                <button
                  onClick={() => handleDelete(b.id)}
                  className="px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>

              </div>
            </td>
          )}
        </tr>
      ))}
    </tbody>

  </table>
</div>

    </div>
  );
}

export default BookList;
