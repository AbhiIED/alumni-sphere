import { useState } from "react";
import { Link } from "react-router-dom";


const newsData = [
  {
    id: 1,
    date: "2025-09-01",
    category: "Alumni",
    title: "Alumni Spotlight: Inspiring Journeys",
    description:
      "Meet alumni who are making waves in their industries and giving back to the community.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    date: "2025-08-20",
    category: "Events",
    title: "Annual Alumni Meetup Announced",
    description:
      "Join us for the upcoming Alumni Meetup — a chance to network, reconnect, and celebrate achievements.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    date: "2025-07-15",
    category: "Careers",
    title: "Job Fair Success Stories",
    description:
      "Alumni share their experiences from the recent job fair and how networking opened new opportunities.",
    image:
      "https://images.unsplash.com/photo-1515169067865-5387ec356754?auto=format&fit=crop&w=800&q=80",
  },
];

export default function NewsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredNews =
    selectedCategory === "All"
      ? newsData
      : newsData.filter((item) => item.category === selectedCategory);

  return (
    <section className="bg-sky-100 py-12 px-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        News & Updates
      </h2>

      {/* Category Filter */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {["All", "Alumni", "Events", "Careers"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border text-sm font-medium ${
              selectedCategory === cat
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* News Cards */}
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
        {filteredNews.map((news) => (
          <div
            key={news.id}
            className="bg-sky-50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={news.image}
              alt={news.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <p className="text-sm text-gray-500">
                {new Date(news.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <span className="inline-block mt-1 mb-2 px-3 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-700">
                {news.category}
              </span>
                <h3 className="text-lg font-semibold text-gray-800">
                <Link to={`/news/${news.id}`} className="hover:text-blue-600">
                    {news.title}
                </Link>
                </h3>
              <p className="text-gray-600 text-sm mt-2">{news.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
