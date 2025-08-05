"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ import router

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter(); // ✅ initialize router

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "https://safai-index-backend.onrender.com/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      console.log("user", data?.user?.role_id == 1);
      localStorage.setItem("cleaner_user", JSON.stringify(data.user));
      alert("Login successful!");

      data.user.role_id == 1
        ? router.push("/")
        : router.push("/completed-tasks"); // ✅ redirect to home
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-black">Cleaner Login</h2>

        {error && <div className="text-red-600 mb-3">{error}</div>}

        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-black p-2 mb-4 rounded text-black placeholder:text-gray-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-black p-2 mb-4 rounded text-black placeholder:text-gray-500"
        />

        <button
          type="submit"
          className={`w-full p-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
