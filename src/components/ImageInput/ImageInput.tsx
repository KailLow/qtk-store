"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import FormData from "form-data"
import fs from 'fs';


function ImageInput() {
  const [image, setImage] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const tokenStr = localStorage.getItem("token") || "";

  // multiple image input change
  const handleMultipleImage = (event: any) => {
    const files = [...event.target.files];
    setImage(files);

    const previews = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        previews.push(reader.result);
        if (previews.length === files.length) {
          setImagePreviews(previews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // multile image upload
  const miltipleImageUpload = async (e) => {
    e.preventDefault();

    let formData = new FormData();

    Array.from(image).forEach((item) => {
      formData.append("images", item);
    });
    let data = new FormData();
    data.append('file', fs.createReadStream('postman-cloud:///1eeaf183-3666-4ad0-98f8-fbe01cf3c5d6'));

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://103.57.221.113:3000/v1//upload',
      headers: {
        'Authorization': 'Bearer ' + tokenStr,
        ...data.getHeaders()
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="upload">
        <h2>Upload Image</h2>

        <div>
          {imagePreviews?.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`Preview ${index}`}
              style={{ width: "200px", height: "auto" }}
            />
          ))}
        </div>

        <form onSubmit={(e) => miltipleImageUpload(e)}>
          <input type="file" multiple onChange={(e) => handleMultipleImage(e)} />
          <button className="uploadBtn">Upload</button>
        </form>
      </div>
    </>
  );
}

export default ImageInput;