"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Card({ title, description, price, image, freshness }) {
  const [isInWishlist, setIsInWishlist] = useState(false);

  const handleAddToCart = () => {
    console.log(`${title} added to cart.`);
  };

  const handleToggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
    console.log(`${title} ${isInWishlist ? "removed from" : "added to"} wishlist.`);
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg bg-white flex flex-col h-full">
      <div className="w-full h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/card-details/${title}`}>
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <p className="text-gray-700 mb-2 flex-grow">{description}</p>
          <p className="text-green-500 font-bold mb-4">${price}</p>
          <p className="text-blue-500 font-semibold mb-2">
            Freshness: {freshness}%
          </p>
        </Link>
        <div className="flex justify-between items-center mt-auto">
          <button
            onClick={handleAddToCart}
            className="text-[#074F3B] font-semibold hover:underline"
            aria-label="Add to Cart"
          >
            Add to Cart
          </button>
          <button
            onClick={handleToggleWishlist}
            className={`border-2 ${isInWishlist ? "border-red-600 text-red-600" : "border-gray-400 text-gray-400"} py-2 px-4 rounded-full hover:bg-red-100`}
            aria-label="Add to Wishlist"
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </div>
      </div>
    </div>
  );
}