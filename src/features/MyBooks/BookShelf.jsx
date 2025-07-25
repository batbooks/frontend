import React from "react";

const BookshelfSeparator = () => {
  return (
    <div className="bookshelf-floor-separator relative  h-6 rounded-lg  mb-15 mx-4">
      <style jsx>{`
        .bookshelf-floor-separator {
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.35),
            inset 0 4px 8px rgba(255, 255, 255, 0.5);
          background-image: linear-gradient(
              to right,
              rgba(139, 69, 19, 0.8) 0%,
              rgba(139, 69, 19, 0.7) 20%,
              rgba(139, 69, 19, 0.9) 40%,
              rgba(139, 69, 19, 0.75) 60%,
              rgba(139, 69, 19, 0.85) 80%,
              rgba(139, 69, 19, 0.7) 100%
            ),
            repeating-linear-gradient(
              -45deg,
              rgba(0, 0, 0, 0.1) 0px,
              rgba(0, 0, 0, 0.1) 1px,
              transparent 1px,
              transparent 5px
            );
          background-size: 100% 100%, 100% 100%;
          background-blend-mode: multiply;
        }
        .bookshelf-floor-separator::before,
        .bookshelf-floor-separator::after {
          content: '';
          position: absolute;
          bottom: -25px;
          width: 30px;
          height: 20px;
          background-color: #654321;
          border-radius: 8px 8px 0 0;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
          border-top: 2px solid #a0522d;
        }
        .bookshelf-floor-separator::before {
          left: 10%;
        }
        .bookshelf-floor-separator::after {
          right: 10%;
        }
      `}</style>
    </div>
  );
};
export default BookshelfSeparator;