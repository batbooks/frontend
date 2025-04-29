
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react"; // for dropdown icon

const reviews = [
  {
    id: 1,
    name: "Michael Chen",
    date: "2025-03-15",
    rating: 5,
    verified: true,
    title: "A magical masterpiece that kept me reading all night",
    content: `This novel has completely blown me away. The character development is phenomenal, especially with Lyra whose growth from uncertain apprentice to confident archmage feels authentic and earned. The magic system is incredibly detailed and well thought out.`,
    helpful: 87,
    notHelpful: 3,
    chaptersRead: 387,
  },
  {
    id: 2,
    name: "Sophia Rodriguez",
    date: "2025-03-10",
    rating: 4,
    verified: true,
    title: "Great story with minor pacing issues",
    content: `I've been following this novel for the past six months and it's become a highlight of my week whenever new chapters drop. The premise is refreshing in a genre that often feels saturated with similar stories.`,
    helpful: 40,
    notHelpful: 5,
    chaptersRead: 380,
  },
  {
    id: 3,
    name: "David Thompson",
    date: "2025-02-28",
    rating: 5,
    verified: true,
    title: "Innovative magic system and compelling characters",
    content: `As someone who reads a lot of fantasy novels, it's rare to find one with a truly original magic system. The concept of arcane resonance and how it ties to emotional states creates fascinating possibilities for character development.`,
    helpful: 65,
    notHelpful: 2,
    chaptersRead: 387,
  },
];

const ReviewSection = () => {
  const [expandedReview, setExpandedReview] = useState(null);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Newest First");

  const getAverageRating = () => {
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const toggleExpand = (id) => {
    setExpandedReview(expandedReview === id ? null : id);
  };

  const filteredReviews = reviews
    .filter((review) => {
      if (filter === "All") return true;
      return review.rating === Number(filter);
    })
    .sort((a, b) => {
      if (sort === "Newest First") return new Date(b.date) - new Date(a.date);
      else return new Date(a.date) - new Date(b.date);
    });

  return (
    <div className="bg-blue-50 min-h-screen p-8 flex justify-center">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-6">Reader Reviews</h2>

        {/* Summary Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex flex-col items-center mb-6 md:mb-0">
            <span className="text-4xl font-bold">{getAverageRating()}</span>
            <div className="flex text-yellow-400 text-2xl">
              {Array.from({ length: 5 }).map((_, idx) => (
                <span key={idx}>★</span>
              ))}
            </div>
            <span className="text-gray-500 text-sm">{reviews.length} reviews</span>
          </div>

          <div className="flex-1 space-y-2 ml-8">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = reviews.filter((r) => r.rating === star).length;
              return (
                <div key={star} className="flex items-center">
                  <span className="w-12 text-sm">{star} stars</span>
                  <div className="flex-1 h-3 bg-gray-200 rounded-full mx-2">
                    <div
                      className="h-3 bg-blue-500 rounded-full"
                      style={{
                        width: `${(count / reviews.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {["All", "5", "4", "3", "2", "1"].map((label) => (
            <button
              key={label}
              className={`px-4 py-1 rounded-full text-sm ${
                filter === label ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setFilter(label)}
            >
              {label === "All" ? "All Reviews" : `${label} Stars`}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex justify-end mb-4">
          <div className="relative inline-block text-left">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border rounded-md py-1 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Newest First</option>
              <option>Oldest First</option>
            </select>
          </div>
        </div>

        {/* Reviews */}
        <div className="space-y-6">
          <AnimatePresence>
            {filteredReviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="border rounded-lg p-6 relative"
              >
                {/* Top Section */}
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-300 mr-3" />
                    <div>
                      <div className="font-semibold">{review.name}</div>
                      <div className="flex items-center text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        
                      </div>
                    </div>
                  </div>

                  {/* Chapters Read */}
                  <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-medium">
                    Read: {review.chaptersRead} chapters
                  </div>
                </div>

                {/* Stars */}
                <div className="flex text-yellow-400 text-lg mb-2">
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <span key={idx}>★</span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="font-bold mb-2">{review.title}</h3>

                {/* Content */}
                <p className="text-gray-700 text-sm mb-2">
                  {expandedReview === review.id
                    ? review.content
                    : `${review.content.slice(0, 200)}...`}
                </p>

                <button
                  onClick={() => toggleExpand(review.id)}
                  className="text-blue-500 text-sm hover:underline"
                >
                  {expandedReview === review.id ? "Show Less" : "Read More"}
                </button>

                {/* Helpful */}
                <div className="flex space-x-6 text-sm text-gray-500 mt-4">
                  <div>Helpful ({review.helpful})</div>
                  <div>Not Helpful ({review.notHelpful})</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;

