import React from 'react';

const MintyPage = () => {
    return (
        <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
            <h1 className="text-5xl font-bold mb-6 text-center text-green-600">Meet Minty</h1>
            <p className="text-xl mb-4 text-gray-700">
                Minty is your cutting-edge nutritionist bot, meticulously designed to guide you towards a healthier lifestyle. With Minty, you gain access to real-time insights on the freshness and nutritional content of your fruits and vegetables. Leveraging state-of-the-art technology and a comprehensive nutritional database, Minty is your go-to advisor for all things related to healthy eating.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white p-6 rounded shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Why Choose Minty?</h2>
                    <ul className="list-disc list-inside text-lg text-gray-700">
                        <li>Real-time freshness detection</li>
                        <li>Detailed nutritional analysis</li>
                        <li>Personalized dietary suggestions</li>
                        <li>Interactive and easy-to-use interface</li>
                    </ul>
                </div>
                <div className="bg-white p-6 rounded shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Features</h2>
                    <ul className="list-disc list-inside text-lg text-gray-700">
                        <li>Scan fruits and vegetables for freshness</li>
                        <li>Learn about health benefits</li>
                        <li>Get recipe suggestions based on ingredients</li>
                        <li>Track your daily nutrient intake</li>
                    </ul>
                </div>
            </div>
            <div className="bg-white p-6 rounded shadow-lg mt-8">
                <h2 className="text-2xl font-semibold mb-4">Testimonials</h2>
                <p className="text-lg text-gray-700 italic mb-2">"Minty has transformed the way I think about my diet. It’s like having a personal nutritionist at my fingertips!" - Sarah J.</p>
                <p className="text-lg text-gray-700 italic">"The freshness detection feature is a game-changer. Minty helps me make informed decisions in the kitchen." - Alex P.</p>
            </div>
            <div className="mt-8 flex justify-center">
                <button className="bg-green-500 text-white font-bold py-2 px-6 rounded-full hover:bg-green-600 shadow-lg">
                    Start Chatting with Minty
                </button>
            </div>
        </div>
    );
};

export default MintyPage;
