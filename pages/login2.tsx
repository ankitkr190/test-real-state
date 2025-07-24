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
        throw new Error(responseData?.message || "Login failed");
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
        <title>Best Property Agent in Bangkok | APK Real Estate | Thailand</title>
      </Head>

      <div className="min-h-screen bg-[#E2FFF3] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-center mb-6">
            <Image
              src="/richy.svg"
              alt="Richy Logo"
              width={100}
              height={100}
              className="h-12 w-auto"
            />
          </div>

          <h2 className="font-bold text-gray-900 text-center">
            Login for reserve right
          </h2>

          <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded-sm" />

          <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full px-2 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#00804A] transition-all"
                placeholder="Enter your username"
                autoComplete="username"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
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
                  className="w-full px-2 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#00804A] transition-all"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#00804A] text-xl focus:outline-none"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#0D3D21] hover:bg-[#00804A] text-white font-medium py-2.5 rounded-lg transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "LOGIN"}
            </button>
          </form>

          {/* Links */}
          <div className="flex items-center justify-between mt-4 text-sm text-[#0D3D21]">
            <a href="#" className="hover:underline">
              Forgot Your Password
            </a>
            <a href="#" className="hover:underline">
              Register
            </a>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Powered by
            <Image
              src="/prediqt.webp"
              alt="Pred Logo"
              width={100}
              height={100}
              className="inline h-4 w-auto ml-1"
            />
          </div>
        </div>
      </div>

      <Toaster position="top-right" richColors theme="light" />
    </>
  );
}

export default LoginPage;
