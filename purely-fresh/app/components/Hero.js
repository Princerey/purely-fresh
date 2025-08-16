'use client'
import 'animate.css';
import { useState, useEffect } from "react";
import QrScannerComponent from "./QrScannerComponent";
import { Dialog } from '@headlessui/react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCartShopping, faLocationDot, faQrcode, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Hero() {
  const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [itemInfo, setItemInfo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isItemModalOpen, setIsItemModalOpen] = useState(false); // Modal for item info
    const openItemModal = () => setIsItemModalOpen(true);
    const closeItemModal = () => setIsItemModalOpen(false);

    // This will be called when item info is received
    const handleItemInfo = (info) => {
        setItemInfo(info);
        closeModal(); // Close QR scanner modal
        openItemModal(); // Open the item info modal with animation
    };

    const getProgressColor = (percentage) => {
        if (percentage >= 75) return "#4caf50"; // Green
        if (percentage >= 50) return "#ffeb3b"; // Yellow
        if (percentage >= 25) return "#ff9800"; // Orange
        return "#f44336"; // Red
    };
    return (
      <section className="bg-white p-36 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#074F3B] to-[#00BFAE] opacity-40"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#074F3B] leading-tight animate__animated animate__fadeIn animate__delay-1s">
          Revitalize Your Produce with Precision
          </h1>
          <p className="text-xl md:text-2xl text-[#074F3B] mb-8 animate__animated animate__fadeIn animate__delay-2s">
            Check the freshness of your produce and enjoy tasty tips from our expert nutritionist, Minty!
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4 animate__animated animate__fadeIn animate__delay-3s">
            <a 
              className="bg-[#074F3B] text-white py-3 px-6 rounded-lg shadow-lg hover:bg-[#053e27] transition-colors transform hover:scale-105 transition-transform" onClick={openModal}
            >
              Check Freshness
            </a>
            <a 
              href="#meet-minty" 
              className="bg-[#074F3B] text-white py-3 px-6 rounded-lg shadow-lg hover:bg-[#053e27] transform hover:scale-105 transition-transform"
            >
              Meet Minty
            </a>
          </div>
        </div>
        <Dialog open={isModalOpen} onClose={closeModal} className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <QrScannerComponent setItemInfo={handleItemInfo} closeModal={closeModal} />
                </div>
            </Dialog>

            {/* Modal for displaying item info with freshness animation */}
            <Dialog open={isItemModalOpen} onClose={closeItemModal} className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
                    {itemInfo && (
                        <>
                            <div className="flex justify-end">
                                <button className="text-black" onClick={closeItemModal}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </div>
                            <h2 className="text-xl font-bold mb-4 text-[#1e1e1e] text-center">{itemInfo.product}</h2>
                            <Box sx={{ position: 'relative', display: 'inline-flex', justifyContent: 'center', width: '100%' }}>
                                <CircularProgress
                                    variant="determinate"
                                    value={itemInfo.freshness_percentage}
                                    size={100}
                                    thickness={4}
                                    sx={{ color: getProgressColor(itemInfo.freshness_percentage) }}
                                />
                                <Box
                                    sx={{
                                        display:"flex",
                                        alignItems:"center",
                                        justifyContent:"center",
                                        flexDirection:"column",
                                        position:"absolute",
                                        top: 0,
                                        left: 0,
                                        bottom: 0,
                                        right: 0,
                                    }}
                                >
                                    <Typography variant="caption" component="div" color="text.secondary">
                                        {`${itemInfo.freshness_percentage}%`}
                                    </Typography>
                                    <Typography variant="caption" component="div" color="text.secondary">
                                        Fresh
                                    </Typography>
                                </Box>
                            </Box>
                            <p className="text-center mt-4 text-[#1e1e1e]">
                                Shelf Life: {itemInfo.shelf_life_days} days
                            </p>
                        </>
                    )}
                </div>
            </Dialog>
      </section>
    );
  }
  