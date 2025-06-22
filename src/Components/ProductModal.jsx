
import React from "react";
import { FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

const ProductModal = ({ item, onClose }) => {
  const handleEnquire = () => {
  
    toast.success("Enquiry email sent to support@example.com");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-2xl p-5 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <FaTimes size={20} />
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <div className="carousel overflow-hidden rounded-md">
              <img
                src={item.coverImage}
                alt="cover"
                className="w-full h-60 object-cover rounded"
              />
              <div className="mt-2 grid grid-cols-3 gap-2">
                {item.additionalImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`img-${index}`}
                    className="w-full h-16 object-cover rounded"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="md:w-1/2 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {item.name}
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                <strong>Type:</strong> {item.type}
              </p>
              <p className="text-gray-700 text-sm">
                {item.description}
              </p>
            </div>

            <button
              onClick={handleEnquire}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Enquire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
