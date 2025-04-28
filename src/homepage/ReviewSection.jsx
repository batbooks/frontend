
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const reviews = [
  {
    id: 1,
    name: "Michael Chen",
    date: "Mar 15, 2025",
    rating: 5,
    title: "A magical masterpiece that kept me reading all night",
    content: `This novel has completely blown me away. The character development is phenomenal, especially with Lyra whose growth from uncertain apprentice to confident archmage feels authentic and earned. The magic system is incredibly detailed and well thought out - I appreciate how the author has created rules for how magic works. It makes the story so much more believable and engaging. Can't wait for more chapters!`,
    helpful: 87,
    notHelpful: 3,
    chaptersRead: 387,
  },
  // Add more reviews if you want
];

const ReviewSection = () => {
  const [filter, setFilter] = useState("All");
  const [expandedReview, setExpandedReview] = useState(null);

  const filteredReviews =
    filter === "All" ? reviews : reviews.filter((r) => r.rating === parseInt(filter));

  const getAverageRating = () => {
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const ratingsCount = (stars) =>
    reviews.filter((review) => review.rating === stars).length;

  const toggleExpand = (id) => {
    setExpandedReview(expandedReview === id ? null : id);
  };

  return (
    <div className="bg-blue-50 min-h-screen p-6 flex justify-center">
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Reader Reviews</h2>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold">{getAverageRating()}</span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span key={idx} className={`text-yellow-400 text-xl`}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-gray-500 text-sm">{reviews.length} reviews</span>
            </div>

            <div className="w-2/3 space-y-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center">
                  <span className="w-12 text-sm">{star} stars</span>
                  <div className="flex-1 h-3 bg-gray-200 rounded-full mx-2">
                    <div
                      className="h-3 bg-blue-500 rounded-full"
                      style={{
                        width: `${
                          (ratingsCount(star) / reviews.length) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-2 mt-4">
            {["All", "5", "4", "3", "2", "1"].map((val) => (
              <button
                key={val}
                onClick={() => setFilter(val)}
                className={`px-3 py-1 rounded-full text-sm ${
                  filter === val
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {val === "All" ? "All Reviews" : `${val} Stars`}
              </button>
            ))}
          </div>
        </div>

        <div>
          <AnimatePresence>
            {filteredReviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-lg shadow-md mb-4"
              >
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-gray-300 mr-3" />
                  <div>
                    <h4 className="font-bold">{review.name}</h4>
                    <div className="text-sm text-gray-500">{review.date}</div>
                  </div>
                </div>

                <div className="flex items-center mb-2">
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <span key={idx} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>

                <h3 className="font-semibold mb-2">{review.title}</h3>

                <p className="text-gray-700 text-sm mb-2">
                  {expandedReview === review.id
                    ? review.content
                    : `${review.content.slice(0, 150)}...`}
                </p>

                <button
                  onClick={() => toggleExpand(review.id)}
                  className="text-blue-500 text-sm"
                >
                  {expandedReview === review.id ? "Show Less" : "Read More"}
                </button>

                <div className="flex items-center text-sm text-gray-500 mt-3">
                  <span className="mr-4">Read: {review.chaptersRead} chapters</span>
                  <span className="mr-4">Helpful ({review.helpful})</span>
                  <span>Not Helpful ({review.notHelpful})</span>
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

