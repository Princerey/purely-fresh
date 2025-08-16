'use client';
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCartShopping, faLocationDot, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import Link from "next/link";
import dynamic from 'next/dynamic';
import { Avatar, Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

const SearchBar = dynamic(() => import('./SearchBar'), { ssr: false });

export default function Navbar() {
    const [location, setLocation] = useState("Fetching...");
    const [country, setCountry] = useState("Unknown");
    const [postalCode, setPostalCode] = useState("Unknown");

    const user = {
        name: "Ananya",
        avatar: "/img/av.jpg"
    };


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
                            params: {
                                q: `${latitude},${longitude}`,
                                key: process.env.NEXT_PUBLIC_OPENCAGE_API_KEY
                            }
                        });
                        const results = response.data.results[0]?.components || {};
                        const countryName = results.country || "Unknown";
                        const postalCode = results.postcode || "Unknown";
                        setLocation(`${countryName} ${postalCode}`);
                        setCountry(countryName);
                        setPostalCode(postalCode);
                    } catch (error) {
                        setLocation("Default Location");
                        setCountry("USA");
                        setPostalCode("638293");
                    }
                },
                () => {
                    setLocation("Default Location");
                    setCountry("Default Country");
                    setPostalCode("Default Postal Code");
                }
            );
        } else {
            setLocation("Default Location");
            setCountry("California");
            setPostalCode("438743");
        }
    }, []);

    return (
        <nav className="bg-[#074F3B] p-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <img src="/logo/logo-trans-white.png" alt="Purely Fresh Logo" className="h-10 mr-2" />
                    <Link href="/" className="text-white text-xl font-bold">
                        Purely Fresh
                    </Link>
                </div>
                <SearchBar />
                <div className="flex items-center gap-5">
                    <button className="text-white mx-2 flex items-center">
                        <FontAwesomeIcon icon={faHeart} className="mr-2" />
                        Wishlist
                    </button>
                    <button className="text-white mx-2 flex items-center">
                        <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                        <div className="flex flex-col">
                            <span>{country}</span>
                            <span className="text-xs">{postalCode}</span>
                        </div>
                    </button>
                    <button className="text-white mx-2 flex items-center">
                        <FontAwesomeIcon icon={faCartShopping} className="mr-2" />
                        Add to Cart
                    </button>
                    {/* <Link href="/login" className="text-white mx-2 flex items-center">
                        <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                        Login
                    </Link> */}
                    <Tooltip title={user.name}>
                        <div className="flex items-center">
                            <Avatar 
                                alt={user.name} 
                                src={user.avatar} 
                                sx={{ width: 40, height: 40, border: '2px solid white' }}
                            />
                            <Typography variant="body2" color="white" className="ml-2">
                                {user.name}
                            </Typography>
                        </div>
                    </Tooltip>
                </div>
            </div>
        </nav>
    );
}
