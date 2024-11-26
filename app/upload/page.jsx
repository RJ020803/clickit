"use client";

import { useState } from "react";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadedUrl(data.fileUrl); 
        alert("File uploaded successfully!");
      } else {
        alert(`Upload failed: ${data.error}`);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            Upload Your Image
          </h1>
          <p className="text-gray-600 mb-6">
            Select an image to upload to the server and view it securely.
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-4"
          />
          <button
            onClick={handleUpload}
            disabled={uploading}
            className={`py-3 px-6 rounded-lg font-semibold transition duration-300 ${
              uploading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {uploading ? "Uploading..." : "Upload Image"}
          </button>

          {uploadedUrl && (
            <div className="mt-6">
              <p className="text-green-500 font-semibold">Upload Successful!</p>
              <a
                href={uploadedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View Uploaded Image
              </a>
              <div className="mt-4">
                <img
                  src={uploadedUrl}
                  alt="Uploaded"
                  className="w-full h-auto rounded-lg shadow"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;
