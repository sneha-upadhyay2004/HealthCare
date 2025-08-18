

// import React from "react";
// import Navbar from "./Navbar";
// import SendForSelf from "./SendForSelf";
// import SendForOthers from "./SendForOthers";
// import { FaHeartbeat } from "react-icons/fa"; // Add icon

// const SOSLandingPage = () => {
//   return (
//     <>
//       <Navbar />
//       <div className="p-6 bg-gradient-to-br from-blue-100 to-blue-200 min-h-screen font-[Inter]">
       
//         <div className="text-center mb-8">
//           <div className="flex justify-center items-center gap-3 text-blue-800 mb-2">
//             <FaHeartbeat className="text-4xl animate-pulse text-red-500 drop-shadow-md" />
//             <h1 className="text-4xl font-extrabold tracking-wide drop-shadow-lg">
//               HealthCare <span className="text-blue-600">SOS</span> Emergency
//             </h1>
//           </div>
//           <p className="text-gray-600 text-md">Send instant alerts for medical help</p>
//         </div>

       
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
//           {/* Self Form */}
//           <div className="bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-3xl p-6 border-l-4 border-blue-500 transition-transform duration-300 hover:scale-[1.02] hover:shadow-blue-300">
//             <h2 className="text-xl font-bold text-blue-700 mb-4 border-b pb-2 border-blue-100">
//               🧍 Emergency For Self
//             </h2>
//             <SendForSelf />
//           </div>

//           {/* Others Form */}
//           <div className="bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-3xl p-6 border-l-4 border-purple-500 transition-transform duration-300 hover:scale-[1.02] hover:shadow-purple-300">
//             <h2 className="text-xl font-bold text-purple-700 mb-4 border-b pb-2 border-purple-100">
//               🧑‍🤝‍🧑 Emergency For Others
//             </h2>
//             <SendForOthers />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SOSLandingPage;


import React from "react";
import Navbar from "./Navbar";
import SendForSelf from "./SendForSelf";
import SendForOthers from "./SendForOthers";
import { FaHeartbeat } from "react-icons/fa";

const SOSLandingPage = () => {
  return (
    <>
      <Navbar />
      <div className="p-6 bg-gradient-to-br from-blue-100 to-blue-200 min-h-screen font-[Inter]">
        {/* Title */}
        <div className="text-center mb-6">
          <div className="flex justify-center items-center gap-3 text-blue-800 mb-2">
            <FaHeartbeat className="text-4xl animate-pulse text-red-500 drop-shadow-md" />
            <h1 className="text-3xl font-extrabold tracking-wide drop-shadow-lg">
              HealthCare <span className="text-blue-600">SOS</span> Emergency
            </h1>
          </div>
          <p className="text-gray-600 text-sm">
            Send instant alerts for medical help
          </p>
        </div>

        {/* Forms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Self Form */}
          <div className="bg-white shadow-lg rounded-2xl p-4 border-l-4 border-blue-500 
                          transition-transform duration-300 hover:scale-[1.02] hover:shadow-blue-300 
                          w-full max-w-[500px] h-[500px] mx-auto overflow-hidden">
            <h2 className="text-lg font-bold text-blue-700 mb-3">
              🧍 Emergency For Self
            </h2>
            <div className="h-[420px] overflow-auto custom-scrollbar">
              <SendForSelf />
            </div>
          </div>

          {/* Others Form */}
          <div className="bg-white shadow-lg rounded-2xl p-4 border-l-4 border-purple-500 
                          transition-transform duration-300 hover:scale-[1.02] hover:shadow-purple-300 
                          w-full max-w-[500px] h-[500px] mx-auto overflow-hidden">
            <h2 className="text-lg font-bold text-purple-700 mb-3">
              🧑‍🤝‍🧑 Emergency For Others
            </h2>
            <div className="h-[420px] overflow-auto custom-scrollbar">
              <SendForOthers />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SOSLandingPage;
