import React, { useContext, useState, useEffect, useRef } from "react";
import { FaStar } from "react-icons/fa";
import { ThemeContext } from "../Them/ThemProvider";

const ReviewGrid = () => {
    const { theme, primaryColor } = useContext(ThemeContext);
    const [reviews, setReviews] = useState([]);
    const primaryClr = primaryColor || "#3b82f6";

    const bgClass = theme === "dark" ? "bg-black" : "bg-white";
    const cardBgClass = theme === "dark" ? "bg-black" : "bg-white";
    const mainTextClass = theme === "dark" ? "text-white" : "text-black";
    const commentTextClass = theme === "dark" ? "text-gray-300" : "text-gray-700";
    const dateTextClass = theme === "dark" ? "text-gray-400" : "text-gray-500";

    // Intersection observer
    const cardRefs = useRef([]);
    const [visibleCards, setVisibleCards] = useState([]);

    // dialog ref
    const dialogRef = useRef(null);

    // form state
    const [formData, setFormData] = useState({
        userName: "",
        userPhoto: "",
        rating: 5,
        comment: "",
    });

    useEffect(() => {
        fetch("https://services-server.vercel.app/reviews")
            .then((res) => res.json())
            .then((data) => setReviews(data))
            .catch(console.error);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(({ target, isIntersecting }) => {
                    if (isIntersecting) {
                        setVisibleCards((prev) => {
                            if (!prev.includes(target.dataset.id)) {
                                return [...prev, target.dataset.id];
                            }
                            return prev;
                        });
                    }
                });
            },
            { threshold: 0.2 }
        );

        cardRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            cardRefs.current.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, [reviews]);

    const openDialog = () => {
        document.getElementById("my_modal_3").showModal();
    };

    const closeDialog = () => {
        document.getElementById("my_modal_3").close();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { userName, rating, comment } = formData;
        if (!userName.trim() || !comment.trim() || rating < 1 || rating > 5) {
            alert("Please provide valid name, rating (1-5) and comment.");
            return;
        }

        const userPhoto = formData.userPhoto.trim() || "https://i.pravatar.cc/100?img=10";
        const newReview = { userName, userPhoto, rating: Number(rating), comment, date: new Date() };

        try {
            const res = await fetch("https://services-server.vercel.app/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newReview),
            });
            if (!res.ok) throw new Error("Failed to post review");

            setReviews((prev) => [newReview, ...prev]);
            setFormData({ userName: "", userPhoto: "", rating: 5, comment: "" });
            closeDialog();
        } catch (error) {
            alert("Error posting review: " + error.message);
        }
    };

    const AddReviewCard = () => (
        <div
            className={`p-6 rounded-xl  flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-105 border hover:shadow-blue-100 ${theme === "dark" ? "bg-black" : "bg-white"
                }`}
            style={{ minHeight: "280px" }}
            onClick={openDialog}
        >
            <div className="text-blue-500 mb-4" style={{ fontSize: "4rem", lineHeight: 1 }} aria-hidden="true">
                +
            </div>
            <h3 className="text-xl font-semibold text-blue-500">Add Review</h3>
            <p className={`mt-2 text-center ${mainTextClass} text-sm`}>Share your experience with us!</p>
        </div>
    );

    return (
        <div className={`${bgClass} py-10 px-4 `}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2">Customer Reviews</h2>
                    <p className={`text-sm ${mainTextClass}`}>
                        See what our customers have to say about our services and share your own experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {reviews.map((rev, idx) => (
                        <div
                            key={idx}
                            data-id={idx}
                            ref={(el) => (cardRefs.current[idx] = el)}
                            className={`p-4 bg-gray-900 flex flex-col shadow rounded-2xl items-center text-center transform transition-all  duration-700 ${visibleCards.includes(idx.toString()) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                } ${cardBgClass}`}
                        >
                            <img
                                src={rev.userPhoto}
                                alt={rev.userName}
                                className="w-20 h-20 rounded-full mb-3 object-cover"
                                style={{ border: `2px solid ${primaryClr}` }}
                            />
                            <h3 className={`text-xl font-semibold mb-0.5 ${mainTextClass}`}>{rev.userName}</h3>
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
                                {new Date(rev.date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
                            </small>
                        </div>
                    ))}

                    {/* Add Review Card */}
                    <AddReviewCard />
                </div>
            </div>


            <dialog
                id="my_modal_3"
                className="modal"
                onClick={(e) => {
                    if (e.target.id === "my_modal_3") document.getElementById("my_modal_3").close();
                }}
            >
                <div className="modal-box rounded-lg relative bg-white dark:bg-gray-900">
                    <form method="dialog">
                        <button
                            type="button"
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={() => document.getElementById("my_modal_3").close()}
                        >
                            ✕
                        </button>
                    </form>
                    <h3 className="font-bold text-lg mb-4 text-center text-black dark:text-white">Add Your Review</h3>

                    <form onSubmit={handleSubmit} className="space-y-4 text-black dark:text-white">
                        <div>
                            <label htmlFor="userName" className="block mb-1 font-medium">
                                Your Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="userName"
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm
                       focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-600
                       dark:bg-gray-800 transition"
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div>
                            <label htmlFor="userPhoto" className="block mb-1 font-medium">
                                Photo URL <span className="text-gray-400">(Optional)</span>
                            </label>
                            <input
                                type="url"
                                id="userPhoto"
                                name="userPhoto"
                                value={formData.userPhoto}
                                onChange={handleChange}
                                placeholder="https://example.com/photo.jpg"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm
                       focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-600
                       dark:bg-gray-800 transition"
                            />
                        </div>

                        <div>
                            <label htmlFor="rating" className="block mb-1 font-medium">
                                Rating <span className="text-red-500">*</span> (1 to 5)
                            </label>
                            <input
                                type="number"
                                id="rating"
                                name="rating"
                                min="1"
                                max="5"
                                value={formData.rating}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm
                       focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-600
                       dark:bg-gray-800 transition"
                            />
                        </div>

                        <div>
                            <label htmlFor="comment" className="block mb-1 font-medium">
                                Comment <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="comment"
                                name="comment"
                                rows="4"
                                value={formData.comment}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm
                       focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-600
                       dark:bg-gray-800 transition resize-none"
                                placeholder="Write your review here..."
                            />
                        </div>

                        <div className="flex justify-end gap-3 mt-2">
                            <button
                                type="button"
                                onClick={closeDialog}
                                className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default ReviewGrid;
