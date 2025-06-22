import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductModal from "../Components/ProductModal";
import Spinner from "../Components/Spinner";

const ViewItem = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("https://amrtech-backend.onrender.com/api/items");
        setItems(res.data);
      } catch (err) {
        console.error("Failed to fetch items", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Online shopping site</h1>

   
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {items.map((item) => (
          <div
            key={item._id}
            onClick={() => setSelectedItem(item)}
            className="w-full bg-white border border-grey rounded-xl p-4 flex flex-col justify-between hover:scale-105 hover:shadow-2xl hover:shadow-black transition duration-300 ease-in cursor-pointer"
          >
           
            <div className= " text-gray-800 font-semibold text-lg truncate mb-2">
              {item.name}
            </div>


          
            <div className="h-48 w-full overflow-hidden rounded-md mb-3 bg-gray-100 flex items-center justify-center">
  <img
    src={item.coverImage}
    alt={item.name}
    className="max-h-full max-w-full object-contain"
  />
</div>

     

          </div>
        ))}
      </div>

      {selectedItem && (
        <ProductModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default ViewItem;
