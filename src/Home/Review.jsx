import React, { useContext, useState } from "react";
import { FaStar } from "react-icons/fa";
import { ThemeContext } from "../Them/ThemProvider";

const initialReviews = [
  {
    userName: "John Doe",
    userPhoto: "https://i.pravatar.cc/100?img=1",
    rating: 5,
    comment: "Amazing service! Highly recommend.",
    date: "2025-08-05",
  },
  {
    userName: "Jane Smith",
    userPhoto: "https://i.pravatar.cc/100?img=2",
    rating: 4,
    comment: "Good experience, but can improve delivery speed.",
    date: "2025-08-07",
  },
  {
    userName: "Alice Johnson",
    userPhoto: "https://i.pravatar.cc/100?img=3",
    rating: 5,
    comment: "Very professional and timely.",
    date: "2025-08-08",
  },
  {
    userName: "Bob Williams",
    userPhoto: "https://i.pravatar.cc/100?img=4",
    rating: 3,
    comment: "Average service, expected better communication.",
    date: "2025-08-06",
  },
  {
    userName: "Mary Clark",
    userPhoto: "https://i.pravatar.cc/100?img=5",
    rating: 5,
    comment: "Exceeded my expectations!",
    date: "2025-08-04",
  },
  {
    userName: "David Brown",
    userPhoto: "https://i.pravatar.cc/100?img=6",
    rating: 4,
    comment: "Good quality work and friendly staff.",
    date: "2025-08-03",
  },
];

const ReviewGrid = () => {
  const { theme, primaryColor } = useContext(ThemeContext);
  const [reviews, setReviews] = useState(initialReviews);
  

  const primaryClr = primaryColor || "#3b82f6"; // fallback blue-500
  const primaryClrDark = primaryClr + "cc";

  // Background color for dark and light theme
  const bgClass = theme === "dark" ? "bg-black" : "bg-white";
  // Card bg color (with no border in dark mode)
  const cardBgClass = theme === "dark" ? "bg-gray-900" : "bg-white";
  // Border only for light theme, none for dark
  const borderStyle = theme === "dark" ? "none" : "2px solid #000000";

  const mainTextClass  = theme === "dark" ? "text-white" : "text-black";
  const commentTextClass = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const dateTextClass = theme === "dark" ? "text-gray-400" : "text-gray-500";


  return (
    <div className={`${bgClass} min-h-screen py-10 px-4`}>
      <div className="max-w-7xl  mx-auto px-4">
      <div className="text-center mb-8">
  <h2 className="text-3xl font-bold mb-2" style={{ color: "#3b82f6" }}>
    Customer Reviews
  </h2>
  <p className={`text-sm ${mainTextClass}`}>
    See what our customers have to say about our services and share your own experience.
  </p>
</div>


        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl shadow-lg flex flex-col items-center text-center ${cardBgClass}`}
              style={{ border: borderStyle }}
            >
              <img
                src={rev.userPhoto}
                alt={rev.userName}
                className="w-20 h-20 rounded-full mb-3 object-cover"
                style={{ border: `2px solid ${primaryClr}` }}
              />
              <h3 className={`text-xl font-semibold mb-0.5 ${mainTextClass}`}>
                {rev.userName}
              </h3>
              <div className="flex justify-center mb-2">
                {Array.from({ length: rev.rating }, (_, i) => (
                  <FaStar key={i} style={{ color: primaryClr }} />
                ))}
                {Array.from({ length: 5 - rev.rating }, (_, i) => (
                  <FaStar key={"empty" + i} className="text-gray-400" />
                ))}
              </div>
              <p className={`${commentTextClass} mb-2`}>{rev.comment}</p>
              <small className={`${dateTextClass} text-sm`}>
                {new Date(rev.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </small>
            </div>
          ))}
        </div>

     
      </div>
    </div>
  );
};

export default ReviewGrid;
