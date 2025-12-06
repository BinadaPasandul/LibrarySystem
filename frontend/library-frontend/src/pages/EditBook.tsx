import { useEffect, useState } from "react";
import api from "../services/axiosConfig";
import { useParams, useNavigate } from "react-router-dom";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      alert("Please login to edit books!");
      navigate("/login");
    }
  }, [navigate]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    api.get(`/Books/${id}`)
      .then(response => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setDescription(response.data.description);
        setCategory(response.data.category);
      });
  }, [id]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedBook = { id, title, author, description, category };

    api.put(`/Books/${id}`, updatedBook)
      .then(() => {
        alert("Book updated!");
        navigate("/");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">
          ✏ Edit Book
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="text"
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md h-28 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <select
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Science">Science</option>
            <option value="Biography">Biography</option>
            <option value="History">History</option>
            <option value="Other">Other</option>
          </select>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition font-semibold"
          >
            Update Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditBook;
