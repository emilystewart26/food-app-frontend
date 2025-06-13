"use client";

import { useState } from "react";
import { ApiClient } from "../../../apiClient/apiClient";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // const { login } = useAuth(); // Get login function from context

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!form.email || !form.password) {
    setError("Please enter both email and password.");
    return;
  }
  setLoading(true);
  try {
    const apiClient = new ApiClient();
    const response = await apiClient.login(form.email, form.password);

    if (response.data && response.data.token) {
      router.push("/");
    } else {
      setError("Login successful but no token received");
    }
  } catch (err) {
    console.error("Login error:", err.response || err);
    setError(err.response?.data?.message || "Invalid credentials or server error.");
  } finally {
    setLoading(false);
  }
};

  return (
  <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-900 text-center">Login</h1>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
        </div>
        {error && (
          <p className="mb-4 text-red-500 text-sm text-center">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="hover:cursor-pointer rounded-full text-center transition bg-gradient-to-b from-amber-500 to-amber-600 active:from-yellow-400 px-8 h-12 items-center justify-center overflow-hidden font-semibold text-white mx-auto"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <Link href="/register">
          <p className="mt-6 text-center text-sm text-slate-400 hover:underline hover:cursor-pointer hover:text-slate-200">
            Don't have account? Click here to register.
          </p>
        </Link>
      </form>
    </div>
    )
}