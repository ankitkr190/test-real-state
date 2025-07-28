import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { Toaster } from "@/components/ui/Toaster";
import { setCookie } from "cookies-next";
import { toast } from "sonner";

function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const { username, password } = form;

    if (!username || !password) {
      toast.error("Username and password are required");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.ENDPOINT_URL}/auth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userid: username, password }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw responseData?.message || "Login failed";
      }

      setCookie(
        "authUser",
        JSON.stringify(responseData?.token || responseData),
        {
          expires: new Date(Date.now() + 43200000), // 12 hours
        }
      );

      toast.success(`Welcome back ${username}!`, {
        description: "Login Successful! Redirecting...",
        duration: 1200,
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login Failed", {
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login | APK Real Estate | Thailand</title>
      </Head>

      {/* Full Screen Container */}
      <div className="min-h-screen bg-amber-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          <div className="flex h-full min-h-[600px]">
            {/* Left Side - Image with Text Overlay */}
            <div className="hidden md:flex md:w-1/2 relative bg-gradient-to-br from-[#000] to-[#000]">
              <div className="absolute inset-0">
                <Image
                  src="/loginimg.webp" // Replace with your actual image
                  alt="Bangkok Property"
                  fill
                  className="object-cover opacity-30"
                  priority
                />
              </div>

              {/* Text Overlay */}
              <div className="relative z-10 flex flex-col justify-center items-start p-12 text-white">
                <div className="mb-8">
                  <Image
                    src="/apk.webp"
                    alt="APK Logo"
                    width={120}
                    height={120}
                    className="h-16 w-auto mb-6"
                  />
                </div>

                <h1 className="text-4xl font-bold mb-4 leading-tight">
                  Welcome to
                  <br />
                  <span className="text-amber-200">APK Real Estate</span>
                </h1>

                <p className="text-lg mb-6 text-amber-100 leading-relaxed">
                  Your trusted property partner in Bangkok. Discover premium
                  properties and reserve your dream home today.
                </p>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-1 bg-[#E2FFF3] rounded"></div>
                  <span className="text-sm text-amber-100">
                    Premium Properties
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-12">
              <div className="w-full max-w-sm mx-auto">
                {/* Mobile Logo */}
                <div className="flex items-center justify-center mb-8 md:hidden">
                  <Image
                    src="/richy.svg"
                    alt="Richy Logo"
                    width={100}
                    height={100}
                    className="h-12 w-auto"
                  />
                </div>

                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Welcome Back
                  </h2>
                  <p className="text-gray-600">
                    Login to reserve your property
                  </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Username */}
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={form.username}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all"
                      placeholder="Enter your username"
                      autoComplete="username"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all pr-12"
                        placeholder="••••••••"
                        autoComplete="current-password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-amber-600 transition-colors"
                        tabIndex={-1}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        <FontAwesomeIcon
                          icon={showPassword ? faEyeSlash : faEye}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "LOGIN"}
                  </button>
                </form>

                {/* Links */}
                <div className="flex items-center justify-between mt-6 text-sm">
                  <a
                    href="#"
                    className="text-amber-500 hover:text-amber-600 hover:underline transition-colors"
                  >
                    Forgot Password?
                  </a>
                  <a
                    href="#"
                    className="text-amber-500 hover:text-amber-600 hover:underline transition-colors"
                  >
                    Register
                  </a>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-sm text-gray-500">
                  <span>Powered by </span>
                  <Image
                    src="/prediqt.webp"
                    alt="Pred Logo"
                    width={80}
                    height={80}
                    className="inline h-4 w-auto ml-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toaster position="top-right" richColors theme="light" />
    </>
  );
}

export default LoginPage;
