"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";  // Import the useRouter hook from next/navigation

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [error, setError] = useState(null);

    const router = useRouter();  // Initialize the router

    const handleLogin = (event) => {
        event.preventDefault();
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        console.log("Logged in:", { email, role });

        // Conditional routing based on the role selected
        if (role === "admin") {
            router.push("/admin");  // Route to /admin for admin
        } else {
            router.push("/");  // Route to / for user
        }

        // Clear form fields and error after successful login
        setEmail("");
        setPassword("");
        setRole("user");
        setError(null);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img className="mx-auto h-12 w-auto" src="/logo/logo-trans-white.png" alt="Purely Fresh" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="flex items-center justify-center mb-6">
                        <label className="block text-sm text-gray-900 mr-4">
                            Login as:
                        </label>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <input
                                    id="role-user"
                                    name="role"
                                    type="radio"
                                    value="user"
                                    checked={role === "user"}
                                    onChange={() => setRole("user")}
                                    className="custom-radio h-4 w-4 focus:ring-[#074F3B] border-gray-300"
                                />
                                <label htmlFor="role-user" className="ml-2 block text-sm text-gray-900">
                                    User
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="role-admin"
                                    name="role"
                                    type="radio"
                                    value="admin"
                                    checked={role === "admin"}
                                    onChange={() => setRole("admin")}
                                    className="custom-radio h-4 w-4 focus:ring-[#074F3B] border-gray-300"
                                />
                                <label htmlFor="role-admin" className="ml-2 block text-sm text-gray-900">
                                    Admin
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#074F3B] focus:border-[#074F3B] focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#074F3B] focus:border-[#074F3B] focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center">
                            <input
                                id="remember_me"
                                name="remember_me"
                                type="checkbox"
                                className="custom-checkbox h-4 w-4 text-[#074F3B] focus:ring-[#074F3B] border-gray-300 rounded"
                            />
                            <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="/forgot-password" className="font-medium text-[#074F3B] hover:text-[#063A2D]">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#074F3B] hover:bg-[#063A2D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#074F3B]"
                        >
                            Sign in
                        </button>
                    </div>
                    {error && (
                        <div className="mt-4 text-red-600 text-center">
                            {error}
                        </div>
                    )}
                    <div className="text-sm mt-4 text-center">
                        <a href="/register">
                            <p className="font-medium text-[#074F3B] hover:text-[#063A2D]">
                                Don't have an account? Register
                            </p>
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}
