import { useState } from "react";
import api from "@/apis/axios";

export default function ImageUpload() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();

    formData.append("image", image);

    try {
      const response = await api.post(
        "/business/upload",
        formData
      );

      console.log(response.data);

      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button
        type="button"
        onClick={handleUpload}
      >
        آپلود عکس
      </button>

      {imageUrl && (
        <img
          src={`http://localhost:5000${imageUrl}`}
          alt="uploaded"
          className="w-64 h-64 object-cover"
        />
      )}
    </div>
  );
}