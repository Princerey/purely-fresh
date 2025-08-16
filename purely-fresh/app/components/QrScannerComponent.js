import { useState } from "react";
import dynamic from 'next/dynamic';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode, faUpload, faTimes, faCamera } from "@fortawesome/free-solid-svg-icons";
import jsQR from "jsqr";
import { Dialog } from '@headlessui/react';
import { Typography } from "@mui/material";

const QrScanner = dynamic(() => import('react-qr-scanner'), { ssr: false });

export default function QrScannerComponent({ setItemInfo, closeModal }) {
    const [scanning, setScanning] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleScan = async (data) => {
        if (data) {
            setScanning(false);
            console.log(data);

            try {
                setLoading(true);
                let jsonData;

                if (typeof data === 'object' && data.text) {
                    jsonData = data.text;
                } else if (typeof data === 'string') {
                    jsonData = data;
                } else {
                    console.error("Unexpected data format:", data);
                    return;
                }

                const parsedData = JSON.parse(jsonData);
                console.log(jsonData)
                const response = await axios.post('http://127.0.0.1:8000/analyze_freshness',
                    new URLSearchParams({
                        temp: parsedData.temp,       // Extracted temp from the QR code data
                        humidity: parsedData.humidity,  // Extracted humidity
                        time_kept: parsedData.time_kept,  // Extracted time_kept
                        product_name: parsedData.product_name // Extracted product_name
                    }),
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'accept': 'application/json'
                        }
                    }
                );

                setItemInfo(response.data);
                closeModal();
            } catch (error) {
                console.error("Error calling the API:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleError = (err) => {
        console.error("QR scan error:", err);
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const imageData = e.target.result;
                const image = new Image();
                image.onload = async () => {
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.width = image.width;
                    canvas.height = image.height;
                    context.drawImage(image, 0, 0, image.width, image.height);
                    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                    const qrCode = jsQR(imageData.data, canvas.width, canvas.height);
                    if (qrCode) {
                        handleScan(qrCode.data);
                    } else {
                        console.error("No QR code found in the image.");
                    }
                };
                image.src = imageData;
            };
            reader.readAsDataURL(file);
        }
    };

    const startScanning = () => {
        setScanning(true);
    };

    return (
        <div className="p-6">
            <div className="flex justify-end mb-4">
                <button className="text-gray-700" onClick={closeModal}>
                    <FontAwesomeIcon icon={faTimes} size="2x" />
                </button>
            </div>

            {!scanning ? (
                <div className="flex flex-col items-center mt-4">
                    <button
                        className="text-white mx-2 flex items-center bg-[#074F3B] p-4 rounded mb-4 text-lg"
                        onClick={startScanning}
                        disabled={loading}
                    >
                        <FontAwesomeIcon icon={faCamera} className="mr-2" />
                        Open Camera
                    </button>

                    <button
                        className="text-white mx-2 flex items-center bg-[#074F3B] p-4 rounded text-lg"
                        onClick={() => document.getElementById('fileInput').click()}
                        disabled={loading}
                    >
                        <FontAwesomeIcon icon={faUpload} className="mr-2" />
                        Upload Image
                    </button>
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                        disabled={loading}
                    />
                </div>
            ) : (
                <div className="flex flex-col items-center mt-4">
                    <QrScanner
                        delay={300}
                        onError={handleError}
                        onScan={handleScan}
                        style={{ width: '100%' }}
                    />
                </div>
            )}

            {loading && (
                <>
                    <div className="flex justify-center items-center mt-4">
                        <div className="loader"></div>
                    </div>
                    <p className="text-black text-center mt-5">Calculating Freshness...</p>
                </>
            )}
        </div>
    );
}
