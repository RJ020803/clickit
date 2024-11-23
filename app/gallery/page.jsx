

"use client";


import React, { useEffect, useState } from "react";


export default function Gallery() {
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);


  useEffect(() => {
    const fetchRandomPhotos = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/imageforall?query=random`);
        const data = await res.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetching random images:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRandomPhotos();
  }, []);


  const fetchImages = async () => {
    if (!searchQuery) return;


    setLoading(true);
    try {
      const res = await fetch(`/api/imageforall?query=${searchQuery}`);
      const data = await res.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };


  const openPreview = (image) => {
    setSelectedImage(image);
  };


  const closePreview = () => {
    setSelectedImage(null);
  };


  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <div className="flex items-center justify-center mb-8 w-full max-w-md">
        <input
          type="text"
          placeholder="Search for images (e.g., animals, nature)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 w-full rounded-l-md"
        />
        <button
          onClick={fetchImages}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
        >
          Search
        </button>
      </div>


      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full max-w-7xl">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative rounded overflow-hidden shadow-md cursor-pointer"
              onClick={() => openPreview(image)}
            >
              <img
                src={image.urls.small}
                alt={image.alt_description || "Image"}
                className="w-full h-full object-cover"
              />


              <p className="text-sm p-2">
                {image.description || "No description"}
              </p>
            </div>
          ))}
        </div>
      )}


      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative">
            <button
              className="absolute top-4 right-2 text-white text-3xl font-bold hover:text-red-500"
              onClick={closePreview}
            >
              &times;
            </button>
            <img
              src={selectedImage.urls.full}
              alt={selectedImage.alt_description || "Preview"}
              className="max-w-full max-h-screen object-contain"
            />
            <div className="text-center mt-4 text-white">
              <p className="text-lg">
                Description: {selectedImage.description || "No description"}
              </p>
              <p className="text-sm">
                Uploaded on:{" "}
                {new Date(selectedImage.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
