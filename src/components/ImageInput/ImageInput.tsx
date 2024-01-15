import { useState } from 'react';

const ImageInput: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const tokenStr = localStorage.getItem("token") || "";

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const url = 'http://103.57.221.113:3000/v1//upload';
      const token = tokenStr;

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${token}`);

      const formdata = new FormData();
      formdata.append('file', selectedFile, selectedFile.name);
      console.log(formdata);

      const requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      try {
        const response = await fetch(url, requestOptions);
        const result = await response.text();
        console.log(result);
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.error('No file selected.');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ImageInput;