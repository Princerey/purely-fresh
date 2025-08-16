import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    return (
        <footer className="bg-[#074F3B] p-8 text-white">
            <div className="container mx-auto flex flex-col md:flex-row justify-between gap-56">
                <div className="flex flex-col md:w-1/2">
                    <img src="/logo/logo-trans-white.png" alt="E-Commerce Logo" className="h-40 w-40 mb-4" />
                    
                    <p className="mb-4">
                        Discover the freshest produce and get personalized advice from our expert nutritionist bot, Minty. Explore our range of services and enjoy a healthier lifestyle with the best quality products.
                    </p>
                    <p className="text-lg mt-7 font-semibold mb-4">
                        &copy; 2024 All rights reserved.
                    </p>
                </div>
                <div className="flex flex-col md:w-1/2">
                    <div className="flex flex-col mb-10 gap-4">
                        <a href="#home" className="hover:underline">Home</a>
                        <a href="#about" className="hover:underline">About Us</a>
                        <a href="#services" className="hover:underline">Services</a>
                        <a href="#contact" className="hover:underline">Contact</a>
                        <a href="#privacy" className="hover:underline">Privacy Policy</a>
                    </div>
                    <h2 className="text-xl font-bold mb-4">Follow Us</h2>
                    <div className="flex gap-4">
                        <a
                            href="https://www.facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-gray-300 transition-colors"
                        >
                            <FontAwesomeIcon icon={faFacebookF} className="h-6 w-6" />
                        </a>
                        <a
                            href="https://www.twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-gray-300 transition-colors"
                        >
                            <FontAwesomeIcon icon={faTwitter} className="h-6 w-6" />
                        </a>
                        <a
                            href="https://www.instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-gray-300 transition-colors"
                        >
                            <FontAwesomeIcon icon={faInstagram} className="h-6 w-6" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
