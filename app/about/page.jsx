import React from 'react';

export default function about() {
  return (
    <div className="py-8 px-6 max-w-6xl mx-auto">
      <div
        className="p-8 rounded-md shadow-lg text-white"
        style={{
          backgroundImage: "url('https://tse1.mm.bing.net/th?id=OIP.zeQRsriB4Py3at_07sNV8AHaE7&pid=Api&P=0&h=180')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <h1 className="text-4xl font-extrabold mb-6 text-center">
          About JustClick
        </h1>

        <p className="mb-6 text-lg font-semibold leading-relaxed">
          <span className="font-bold">Welcome to JustClick,</span> your one-stop solution for seamless image uploads and management. With JustClick, you can effortlessly upload, organize, and view your favorite images, all in one place.
        </p>

        <p className="mb-6 text-lg font-semibold leading-relaxed">
          Whether it’s a <span className="text-green-200">memorable moment</span>, an <span className="text-purple-200">inspiring visual</span>, or something you just want to keep handy, JustClick allows you to preserve your images securely. Designed with simplicity and user-friendliness in mind, our platform ensures that your image data stays <span className="text-red-200">private</span> and accessible only to you.
        </p>

        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Why Choose JustClick?</h2>
          <ul className="list-disc pl-6 text-lg">
            <li className="mb-2"><span className="font-bold">Simple Uploads:</span> Upload your images in just a few clicks. No fuss, no complications.</li>
            <li className="mb-2"><span className="font-bold">Secure Storage:</span> Your image information is stored safely and exclusively for your access.</li>
            <li className="mb-2"><span className="font-bold">Organized Gallery:</span> View and manage your uploads with ease using our intuitive interface.</li>
            <li><span className="font-bold">Anywhere, Anytime Access:</span> Access your images from any device, hassle-free.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
