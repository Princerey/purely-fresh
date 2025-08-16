"use client";
import React, { useState, useEffect } from 'react';
import Modal from '../components/NotificationModal';
import FreshnessChart from '../components/FreshnessChart';
import { sampleItems } from '../lib/data/sample-data';

const AdminPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [redZoneItems, setRedZoneItems] = useState([]);

    const checkFreshness = (items) => {
        const itemsInRedZone = items.filter(item => item.freshness < 25 );
        if (itemsInRedZone.length > 0) {
            setNotificationMessage('Some items are in the red zone!');
            setRedZoneItems(itemsInRedZone);
            setIsModalOpen(true);
        }
    };
    

    useEffect(() => {
        checkFreshness(sampleItems);
    }, []);

    const openModalManually = () => {
        const itemsInRedZone = sampleItems.filter(item => item.freshness < item.threshold);
        if (itemsInRedZone.length > 0) {
            setNotificationMessage('Some items are in the red zone!');
            setRedZoneItems(itemsInRedZone);
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setRedZoneItems([]);
    };

    return (
        <div className='min-h-screen bg-gray-100 p-8'>
            <button
                onClick={openModalManually}
                className="bg-[#074F3B] text-white px-4 py-2 rounded-md hover:bg-[#063A2D] mb-4"
            >
                Show Freshness Alert
            </button>
            <div className="flex flex-col lg:flex-row">
                <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-4">Items Freshness</h1>
                    <ul className="space-y-4">
                        {sampleItems.map(item => (
                            <li key={item.id} className={`p-4 rounded-lg ${item.freshness < 25 ? 'bg-red-100 text-red-800' : item.freshness < 50 ? 'bg-orange-100 text-orange-800' : item.freshness <= 75 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                            <span className="font-semibold">{item.name}</span> - Freshness: {item.freshness}% (Shelf Life: {item.threshold} days)
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="lg:w-1/2 lg:ml-8 mt-8 lg:mt-0">
                    <FreshnessChart items={sampleItems} />
                </div>
                {isModalOpen && (
                    <Modal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        title="Freshness Alert"
                        message={notificationMessage}
                        redZoneItems={redZoneItems}
                    />
                )}
            </div>
        </div>
    );
};

export default AdminPage;
