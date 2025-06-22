import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Spinner from "../Components/Spinner";

const AddItem = () => {
  const [form, setForm] = useState({
    name: "",
    type: "",
    description: "",
  });

  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [additionalPreviews, setAdditionalPreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCoverImage = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const handleAdditionalImages = (e) => {
    const files = Array.from(e.target.files);
    setAdditionalImages((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setAdditionalPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coverImage || additionalImages.length === 0) {
      return toast.error("Please upload both cover and additional images.");
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("type", form.type);
      formData.append("description", form.description);
      formData.append("coverImage", coverImage);
      additionalImages.forEach((file) => formData.append("additionalImages", file));

      await axios.post("https://amrtech-backend.onrender.com/api/items", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Item successfully added");
      setForm({ name: "", type: "", description: "" });
      setCoverImage(null);
      setAdditionalImages([]);
      setCoverPreview(null);
      setAdditionalPreviews([]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 ">
      <h2 className="text-3xl font-bold mb-6 text-center">Product Information</h2>
      {loading && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-50">
          <Spinner />
        </div>
      )}
      <div  className=" max-w-3xl border-2 border-gray-100 mx-auto p-6"> 
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6 boder-2 border-gray-600">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          type="text"
          placeholder="Product Name"
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="type"
          value={form.type}
          onChange={handleChange}
          type="text"
          placeholder="Product Type (e.g., Shirt, Shoes)"
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          placeholder="Description"
          className="w-full border p-2 rounded"
          required
        />

        {/* Cover Image Upload */}
        <div>
          <label className="block font-semibold mb-2">Cover Image</label>
          <div className="w-full h-40 border-2 border-dashed rounded flex items-center justify-center cursor-pointer">
            {coverPreview ? (
              <img
                src={coverPreview}
                alt="Cover Preview"
                className="h-full object-contain"
              />
            ) : (
              <label className="w-full h-full flex items-center justify-center">
                + Upload Cover Image
                <input
                  type="file"
                  className="hidden"
                  onChange={handleCoverImage}
                  accept="image/*"
                />
              </label>
            )}
          </div>
        </div>

        {/* Additional Images */}
        <div>
          <label className="block font-semibold mb-2">Additional Images</label>
          <div className="flex flex-wrap gap-2">
            {additionalPreviews.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Additional ${i}`}
                className="w-24 h-24 object-cover rounded border"
              />
            ))}
            <label className="w-24 h-24 border-2 border-dashed flex items-center justify-center rounded cursor-pointer">
              +
              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleAdditionalImages}
                accept="image/*"
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 flex items-center justify-center"
        >
          Submit
        </button>
      </form>
      </div>
    </div>
  );
};

export default AddItem;
