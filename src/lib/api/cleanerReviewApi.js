// app/lib/cleanerReviewApi.js
// import API_BASE_URL from "../utils/Constant";
const API_BASE = "https://safai-index-backend.onrender.com/api";


export async function getAllCleanerReviews() {
  try {
    const res = await fetch(`${API_BASE}/cleaner-reviews`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch cleaner reviews");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching cleaner reviews:", error);
    return [];
  }
}
