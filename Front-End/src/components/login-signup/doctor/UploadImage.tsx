import React, { ChangeEvent, useState } from "react";
import userAvatar from "../../../assets/images/user-removebg-preview.png";

interface ImageUploadProps {
  onFileSelect: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);
      onFileSelect(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
  };

  return (
    <section className="container mx-auto w-full">
      <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden w-full">
        <div className="flex justify-center items-center bg-transparent h-auto rounded-t-lg w-full relative">
          <label htmlFor="upload" className="cursor-pointer text-gray-700">
            {selectedFile ? (
               <img
                src={URL.createObjectURL(selectedFile)}
                alt="Selected Image"
                className="w-48 h-48 lg:h-40 lg:w-60 p-1 rounded-full dark:ring-gray-500"
              />
            ) : (
              <img
                src={userAvatar}
                alt="Selected Image"
                className="w-48 lg:w-60 h-auto p-1 rounded-full dark:ring-gray-500"
              />
            )}
          </label>
          <input
            id="upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          {selectedFile && (
            <button
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow"
              onClick={handleClearFile}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 text-gray-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ImageUpload;

