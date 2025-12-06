import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import BookList from "./pages/BookList";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // 👈 tracks current page

  // Check login status on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("username");
    if (token && user) {
      setLoggedIn(true);
      setUsername(user);
    }
  }, []);

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setLoggedIn(false);
    setUsername("");
    navigate("/login");
  };

  return (
    <>
      {/* Premium Navbar */}
      <nav className="bg-gradient-to-r from-slate-900 to-indigo-900 shadow-2xl px-8 py-5 relative z-50">

        <div className="max-w-7xl mx-auto flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Book Ledger
              </h1>
              <p className="text-xs text-blue-300 font-medium">
                Professional Library Management System
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-8">
            {/* Catalog Link */}
            <Link 
              to="/" 
              className="text-slate-200 hover:text-white font-medium transition-colors duration-300 relative group"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Book Catalog
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
            </Link>

            {/* Add Book Button */}
            {loggedIn && (
              <Link 
                to="/add" 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Book
              </Link>
            )}

            {/* Profile Badge */}
            {loggedIn && (
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-white/20">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  {username.charAt(0).toUpperCase()}
                </div>
                <p className="text-white font-semibold">Welcome back, {username}</p>
              </div>
            )}

            {/* Login/Register Buttons */}
            {!loggedIn && (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className={`text-slate-200 font-medium px-4 py-2.5 rounded-xl border border-white/20 
                  transition-all duration-300 
                  ${location.pathname === "/login"
                    ? "opacity-50 pointer-events-none"
                    : "hover:bg-white/10 hover:text-white"}`}
                >
                  Sign In
                </Link>

                <Link
                  to="/register"
                  className={`font-medium px-5 py-2.5 rounded-xl 
                  transition-all duration-300 shadow-lg
                  ${location.pathname === "/register"
                    ? "bg-slate-200 text-slate-600 opacity-50 pointer-events-none"
                    : "bg-white text-slate-900 hover:bg-slate-100 hover:shadow-xl hover:-translate-y-0.5"}`}
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Logout */}
            {loggedIn && (
              <button
                onClick={handleLogout}
                className="text-slate-300 hover:text-white font-medium px-4 py-2.5 rounded-xl border border-red-500/30 hover:bg-red-500/20 transition-all duration-300 flex items-center gap-2 group"
              >
                <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            )}

          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/add" element={<AddBook />} />
            <Route path="/edit/:id" element={<EditBook />} />
            <Route path="/login" element={<Login onLogin={(u) => { setLoggedIn(true); setUsername(u); }} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 to-indigo-900 text-white py-8 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold">Book Ledger</h2>
          <p className="text-slate-400 mt-2">Professional Library Management System</p>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-500">
            <p>© {new Date().getFullYear()} Created by Binada. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
