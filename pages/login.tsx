import React from "react";

import richLogo from "../assets/logo.webp";
import predLogo from "../assets/pred-logo.webp";

function LoginPage() {
  return (
    <div className="min-h-screen bg-[#E2FFF3] flex items-center justify-center p-4">
  <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
    <div className="flex items-center justify-center mb-6">
      <img 
        src={richLogo.src}
        alt="Richy Logo"
        className="h-12 w-auto"
      />
    </div>
    <h2 className="text-1xl font-bold text-gray-900 mb-6 text-center">Login for reserve right</h2>
    <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded-sm md:my-5 dark:bg-gray-700"></hr>
    
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mt-10 my-1 ">Email</label>
        <input 
          type="email" 
          className="w-full px-2 py-2 border-b-2 border-gray-300 bg-transparent rounded-none focus:outline-none focus:border-[#00804A] transition-all"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input 
          type="password" 
          className="w-full px-2 py-2 border-b-2 border-gray-300 bg-transparent rounded-none focus:outline-none focus:border-[#00804A] transition-all"
          placeholder="••••••••"          
        />
        
      </div>      

      <button className="w-full bg-[#0D3D21] hover:bg-[#00804A] text-white font-medium py-2.5 rounded-lg transition-colors">
        LOGIN
      </button>
    </form>

    <div className="flex items-center justify-between m-4">
        <label className="flex items-center">          
          <a href="#" className="text-sm text-[#0D3D21] hover:text-[#0D3D21]">Forgot Your Password</a>
        </label>
        <a href="#" className="text-sm text-[#0D3D21] hover:text-[#0D3D21]">Register</a>
      </div>

    <div className="mt-6 text-center text-sm text-gray-600">
      Powered by
      <img 
        src={predLogo.src}
        alt="Pred Logo"
        className="inline h-4 w-auto ml-1"
      />      
    </div>
  </div>
</div>
  );
}

export default LoginPage;
