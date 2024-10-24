import React, { useState, useEffect } from "react";
import { Box, Icon } from "@shopify/polaris";
import iconUpload from "../assets/images/iconUpload.svg";
import styles from "../styles/UploadImage.module.css";
import { DeleteIcon } from "@shopify/polaris-icons";

const UploadImage = ({ setFile, imageUrl, setImageUrl }) => {
  const [localFile, setLocalFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (localFile && uploadProgress < 100) {
      interval = setInterval(() => {
        setUploadProgress((prevProgress) => {
          if (prevProgress < 100) {
            return prevProgress + 1;
          } else {
            clearInterval(interval);
            return prevProgress;
          }
        });
      }, 10);
    }

    return () => clearInterval(interval);
  }, [localFile, uploadProgress]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setLocalFile(selectedFile);
      setFile(selectedFile);
      setImageUrl(URL.createObjectURL(selectedFile));
      setUploadProgress(0);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setLocalFile(droppedFile);
      setFile(droppedFile);
      setImageUrl(URL.createObjectURL(droppedFile));
      setUploadProgress(0);
    }
  };

  const handleDelete = () => {
    setLocalFile(null);
    setFile(null);
    setImageUrl(null);
    setUploadProgress(0);
  };

  return (
    <div
      className={`${styles.uploadZone} ${localFile || imageUrl ? styles.noBorder : ""}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className={styles.iconUploadWrapper}>
        {localFile || imageUrl ? (
          uploadProgress < 100 && localFile ? (
            <div className={styles.progressWrapper}>
              <div className={styles.progressCircle}>
                <svg viewBox="0 0 36 36">
                  <path
                    className={styles.circle}
                    strokeDasharray={`${uploadProgress}, 100`}
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className={styles.progressText}>{uploadProgress}%</div>
              </div>
              <div className={styles.uploadText}>
                <h2>Drag and drop your file here</h2>
                <p className={styles.helperText}>
                  or click to browse (2MB max)
                </p>
              </div>
            </div>
          ) : (
            <div className={styles.fileDetails}>
              <span>{localFile ? localFile.name : imageUrl}</span>
              <Box onClick={handleDelete}>
                <Icon source={DeleteIcon} tone="critical" />
              </Box>
            </div>
          )
        ) : (
          <div className={styles.uploadContainer}>
            <div
              className={styles.iconUpload}
              onClick={() => document.getElementById("fileInput").click()}
            >
              <img src={iconUpload} alt="Upload Icon" />
            </div>
            <div className={styles.uploadText}>
              <h2>Drag and drop your file here</h2>
              <p className={styles.helperText}>or click to browse (2MB max)</p>
            </div>
          </div>
        )}
      </div>
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default UploadImage;
