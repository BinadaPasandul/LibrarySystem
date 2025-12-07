import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ password?: string }>({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: { password?: string } = {};

    if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (password !== confirmPassword) newErrors.password = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    axios
      .post("http://localhost:5156/api/Auth/register", { username, password })
      .then(() => {
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
      .catch(err => {
        console.error("❌ Backend Error:", err.response?.data);
        alert(err.response?.data?.message ?? err.response?.data ?? "Registration failed. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const passwordStrength = (pass: string) => {
    if (pass.length === 0) return { width: "0%", color: "bg-gray-200" };
    if (pass.length < 6) return { width: "33%", color: "bg-red-500" };
    if (pass.length < 8) return { width: "66%", color: "bg-yellow-500" };

    const hasUpper = /[A-Z]/.test(pass);
    const hasLower = /[a-z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecial = /[^A-Za-z0-9]/.test(pass);

    const strength = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;

    if (strength === 1) return { width: "33%", color: "bg-red-500" };
    if (strength === 2) return { width: "66%", color: "bg-yellow-500" };
    if (strength === 3) return { width: "85%", color: "bg-green-500" };
    return { width: "100%", color: "bg-green-600" };
  };

  const strength = passwordStrength(password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Card */}
      <div className="relative w-full max-w-lg">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 to-indigo-900 p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-emerald-500 to-green-500 p-4 rounded-2xl shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white">Sign Up here</h2>
            <p className="text-blue-200">Create your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="p-8 space-y-6">

            {/* Username */}
            <div>
              <label className="block font-semibold text-slate-700 mb-2">Username</label>
              <input
                type="text"
                placeholder="Choose a username"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3.5 border rounded-xl bg-slate-50 border-slate-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block font-semibold text-slate-700 mb-2">Password</label>
              <input
                type="password"
                placeholder="Create a strong password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3.5 border rounded-xl bg-slate-50 border-slate-200 focus:ring-2 focus:ring-blue-500"
              />

              {/* Strength Meter */}
              <div className="mt-2">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-500 ${strength.color}`} style={{ width: strength.width }}></div>
                </div>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block font-semibold text-slate-700 mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="Re-enter your password"
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                className={`w-full px-4 py-3.5 border rounded-xl ${errors.password ? "border-red-400" : "border-slate-200"} bg-slate-50 focus:ring-2 focus:ring-blue-500`}
              />
              {errors.password && (
                <p className="mt-2 text-red-600 text-sm">{errors.password}</p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 flex justify-center gap-2"
            >
              {isLoading && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
              Sign Up
            </button>

            {/* Link */}
            <div className="text-center">
              <p className="text-sm text-slate-600">Already have an account?</p>
              <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-800 transition">
                Sign in to existing account →
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob{ animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}

export default Register;
