import React from 'react';

const Modal = ({ isOpen, onClose, title, message, redZoneItems }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
                <h2 className="text-black text-lg font-bold mb-4">{title}</h2>
                <p className="text-black mb-4">{message}</p>
                <ul className="text-black mb-4">
                    {redZoneItems.map(item => (
                        <li key={item.id}>{item.name} - Freshness: {item.freshness}%</li>
                    ))}
                </ul>
                <button
                    onClick={onClose}
                    className="bg-[#074F3B] text-white px-4 py-2 rounded-md hover:bg-[#063A2D]"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
