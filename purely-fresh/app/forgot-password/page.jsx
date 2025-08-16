"use client";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handlePasswordReset = (event) => {
        event.preventDefault();
        if (!email) {
            setError("Please enter your email address");
            return;
        }

        setTimeout(() => {
            if (email === "test@example.com") {
                setMessage("Password reset link sent to your email address");
                setError(null);
            } else {
                setError("Email address not found");
                setMessage(null);
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img className="mx-auto h-12 w-auto" src="/logo/logo-trans-white.png" alt="Purely Fresh" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Forgot your password?
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handlePasswordReset}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#074F3B] focus:border-[#074F3B] sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#074F3B] hover:bg-[#063A2D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#074F3B]"
                        >
                            Send Reset Link
                        </button>
                    </div>
                    {message && (
                        <div className="mt-4 text-green-600 text-center">
                            {message}
                        </div>
                    )}
                    {error && (
                        <div className="mt-4 text-red-600 text-center">
                            {error}
                        </div>
                    )}
                    <div className="text-sm mt-4 text-center">
                        <Link href="/login">
                            <p className="font-medium text-[#074F3B] hover:text-[#063A2D]">
                                Remembered your password? Sign in
                            </p>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
