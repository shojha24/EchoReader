"use client"

// components/FileUpload.tsx
import React, { useRef, useState } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import axios from "axios";
const FileUpload = () => {
  const [fileList, setFileList] = useState(null);
  const [shouldHighlight, setShouldHighlight] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const preventDefaultHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const formDataToJson = (formData) => {
    const json = {};
    for (let [key, value] of formData.entries()) {
      if (json.hasOwnProperty(key)) {
        if (Array.isArray(json[key])) {
          json[key].push(value);
        } else {
          json[key] = [json[key], value];
        }
      } else {
        json[key] = value;
      }
    }
    return json;
  };

  const handleUpload = async () => {
    const UPLOAD_URL = "http://8f68-69-119-107-111.ngrok-free.app/get_img";
    const data = new FormData();
    let i = 0
    let images = []
    let indices = []
    for (let file of fileList) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64Data = reader.result.split(",")[1];
        images.push(base64Data)
        indices.push(i)
        i += 1
      };
    }
    data.append("images", images)
    data.append("indices", indices)
    const jsonData = formDataToJson(data);

    axios.get(UPLOAD_URL, jsonData, {
        onUploadProgress: (progressEvent) => {
            const progress = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
            );
            setProgress(progress);
            if (progress >= 100) {
                setFileList(null);
            }
            
    },}).then((res) => {
        console.log(res.data);
    });
  };
  
  return (
    <div
      className={classNames({
        "w-full h-56": true,
        "p-4 grid place-content-center cursor-pointer": true,
        "text-teal-500 rounded-lg": true,
        "border-4 border-dashed ": true,
        "transition-colors": true,
        "border-teal-500 bg-teal-100 hover:bg-teal-200 hover:border-teal-900": shouldHighlight,
        "border-teal-100 bg-teal-50 hover:bg-teal-100 hover:border-teal-200": !shouldHighlight,
      })}
      onDragOver={(e) => {
        preventDefaultHandler(e);
        setShouldHighlight(true);
      }}
      onDragEnter={(e) => {
        preventDefaultHandler(e);
        setShouldHighlight(true);
      }}
      onDragLeave={(e) => {
        preventDefaultHandler(e);
        setShouldHighlight(false);
      }}
      onDrop={(e) => {
        preventDefaultHandler(e);
        const files = Array.from(e.dataTransfer.files);
        setFileList(files);
        setShouldHighlight(false);
      }}
    >
      <div className="flex flex-col items-center">
        {!fileList ? (
          <>
            <CloudArrowUpIcon className="w-10 h-10" />
            <span>
              <span>Choose a File</span> or drag it here
            </span>
          </>
        ) : (
          <>
            <p>Files to Upload</p>
            {fileList.map((file, i) => {
              return <span key={i}>{file.name}</span>;
            })}
            <div className="flex gap-2 mt-2">
              <button className="bg-teal-500 text-teal-50 px-2 py-1 rounded-md"
                onClick={() => {handleUpload()}}>
                Upload
              </button>
              <button
                className="border border-teal-500 px-2 py-1 rounded-md"
                onClick={() => {
                  setFileList(null);
                }}
              >
                Clear
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;

