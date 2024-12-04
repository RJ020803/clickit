"use client";

import { useEffect, useState } from "react";

const UploadedImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/fetchuploaded");
        const data = await response.json();

        if (response.ok) {
          setImages(data.images);
        } else {
          console.error("Error fetching images:", data.error);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-gray-600 text-xl">Loading images...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Uploaded Images</h1>

      {images.length === 0 ? (
        <p className="text-gray-600">No images uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {images.map((image) => (
            <div
              key={image._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={"/api/upload?key=" + image.image}
                alt="Uploaded"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-gray-600 truncate">{image.image}</p>
                <a
                  href={"/api/upload?key=" + image.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm font-semibold hover:underline"
                >
                  View Full Image
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadedImages;
