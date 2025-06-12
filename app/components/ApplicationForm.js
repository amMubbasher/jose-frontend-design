"use client";
import { useState, useEffect } from "react";
import {
  BsAlarmFill,
  BsSunFill,
  BsMoonFill,
  BsArrowClockwise,
  BsCheck,
  BsChatRightText,
  BsLock,
  BsClock,
  BsCoin,
  BsHeart,
  BsSlash,
  BsPlus,
  BsPlusSquare,
  BsPlusLg
} from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { FiMail } from "react-icons/fi";
import { FaHandPeace, FaRegFlag } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import Navbar from "./Navbar";


export default function ApplicationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    contactTime: "",
    training: [],
    germanSkills: "",
    contactInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      postalCode: "",
      privacyAccepted: false
    },
    workplacePreferences: [],
    experience: "",
    position: []
  });

  // Calculate progress percentage based on current step
  const progressPercentages = {
    1: 11,
    2: 22,
    3: 44,
    4: 56,
    5: 67,
    6: 78,
    7: 89
  };

  const handleNext = () => {
    setStep(prev => Math.min(prev + 1, 7));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOptionSelect = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setTimeout(handleNext, 300);
  };

  const handleMultiSelect = (field, value) => {
    setFormData(prev => {
      const currentValues = [...(prev[field] || [])];
      const exists = currentValues.includes(value);

      return {
        ...prev,
        [field]: exists
          ? currentValues.filter(item => item !== value)
          : [...currentValues, value]
      };
    });
    if (field === 'position' || field === 'training' || field === 'workplacePreferences') {
      setTimeout(handleNext, 300);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [field]: value
      }
    }));
  };

  const handlePrivacyChange = () => {
    setFormData(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        privacyAccepted: !prev.contactInfo.privacyAccepted
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Application submitted successfully!");
    setStep(1);
    setFormData({
      contactTime: "",
      training: [],
      germanSkills: "",
      contactInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        postalCode: "",
        privacyAccepted: false
      },
      workplacePreferences: [],
      experience: "",
      position: []
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add effect to auto-advance when privacy is accepted
  useEffect(() => {
    if (step === 7 && formData.contactInfo.privacyAccepted) {
      setTimeout(() => {
        if (
          formData.contactInfo.firstName &&
          formData.contactInfo.lastName &&
          formData.contactInfo.email &&
          formData.contactInfo.phone &&
          formData.contactInfo.postalCode
        ) {
          setStep(7); // Max step is 7, no further advancement needed
        }
      }, 300);
    }
  }, [formData.contactInfo]);

  return (
    <>

      <div className="bg-white min-h-[80vh] flex flex-col justify-center items-center px-5 sm:px-6 lg:px-8">

        {/* Progress bar */}
        <div className="w-40 max-w-md mb-6">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-1.5 bg-[#6cb744] rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${progressPercentages[step]}%` }}
            ></div>
          </div>
          <div className="text-center text-sm font-medium text-gray-500 mt-2">
            {progressPercentages[step]}%
          </div>
        </div>

        {/* Step 1: Position */}
        {step === 1 && (
          <div className="w-full max-w-xl">
            <h1 className="text-3xl font-bold text-center mb-5 text-gray-900">
              Which position are you interested in?
            </h1>
            <p className="text-center mb-6 text-gray-600 text-base sm:text-lg">
              Apply to us in under a minute <FaHandPeace className="inline text-yellow-500 text-lg" />. We look forward to hearing from you! 🎉
            </p>

            <div className="space-y-3">
              {[
                "Nursing professional (m/f/d)",
                "Nursing assistant (m/f/d)",
                "Domestic worker (m/f/d) for house cleaning"
              ].map((option) => (
                <button
                  key={option}
                  onClick={() => handleMultiSelect("position", option)}
                  className={`w-full flex items-center p-3 py-4 space-x-4 rounded-md border border-gray-200 bg-gray-100 hover:bg-gray-100 transition-colors ${formData.position.includes(option) ? "ring-2 ring-[#6cb744]" : ""}`}
                >

                  <FaCheck size={20} className="text-black font-md" />


                  <span className="text-gray-800 text-left text-md">{option}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Training */}
        {step === 2 && (
          <div className="w-full max-w-xl">
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-5 text-gray-900">
              What training have you completed?
            </h1>


            <div className="space-y-3">
              {[
                "Examined nursing professional",
                "Health and nursing assistant",
                "Nursing assistant",
                "Other / None"
              ].map((option) => (
                <button
                  key={option}
                  onClick={() => handleMultiSelect("training", option)}
                  className={`w-full flex items-center p-3 py-4 space-x-4 rounded-md border border-gray-200 bg-gray-100 hover:bg-gray-150 transition-colors ${formData.training.includes(option) ? "ring-2 ring-[#6cb744]" : ""}`}
                >


                  <FaCheck size={20} className="text-black font-md" />


                  <span className="text-gray-800 text-left text-md">{option}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Experience */}
        {step === 3 && (
          <div className="w-full max-w-4xl ">
            <h1 className="text-3xl sm:text-3xl font-bold text-center mb-5 text-gray-900">
              How much experience have you already gained in nursing?
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { value: "none", icon: BsSlash, label: "No experience" },
                { value: "1-5", icon: BsPlus, label: "1 - 5 years" },
                { value: "5-10", icon: BsPlusSquare, label: "5 - 10 years" },
                { value: "10+", icon: BsPlusLg, label: "Over 10 years" }
              ].map(({ value, icon: Icon, label }) => (
                <button
                  key={value}
                  onClick={() => handleOptionSelect("experience", value)}
                  className={`flex flex-col items-center justify-center border border-gray-300 p-9 py-14 rounded-md bg-gray-200 hover:bg-[#6cb744] transition-colors ${formData.experience === value ? "ring-2 ring-[#5ca63a]" : ""}`}
                >
                  <Icon size={38} className="mb-2 text-gray-600" />
                  <span className="text-gray-800 text-base sm:text-lg text-center">{label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Workplace preferences */}
        {step === 4 && (
          <div className="w-full max-w-xl">
            <h1 className="text-3xl font-bold text-center mb-5 text-gray-900">
              What is important to you in your workplace?
            </h1>
            <p className="text-center mb-6 text-gray-600 text-base sm:text-lg">
              (Multiple selection possible)
            </p>

            <div className="space-y-3">
              {[
                { value: "security", icon: BsLock, label: "Have a secure job", color: "text-yellow-500" },
                { value: "flexibility", icon: BsClock, label: "Flexible working hours", color: "text-blue-500" },
                { value: "salary", icon: BsCoin, label: "Good salary", color: "text-amber-600" },
                { value: "team", icon: BsHeart, label: "Great team", color: "text-red-500" }
              ].map(({ value, icon: Icon, label, color }) => (
                <button
                  key={value}
                  onClick={() => handleMultiSelect("workplacePreferences", value)}
                  className={`w-full flex items-center p-4 rounded-md border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors ${formData.workplacePreferences.includes(value) ? "ring-2 ring-[#5ca63a]" : ""}`}
                >
                  <Icon size={18} className={`${color} mr-2`} />
                  <span className="text-gray-800 text-base sm:text-lg">{label}</span>
                </button>
              ))}
            </div>
            {/* <div className="mt-6 flex justify-center">
            <button
              onClick={handleNext}
              className="px-5 py-2 bg-[#6cb744] hover:bg-[#5ca63a] text-white rounded-md transition-colors text-base sm:text-lg"
            >
              Further
            </button>
          </div> */}
          </div>
        )}

        {/* Step 5: German skills */}
        {step === 5 && (
          <div className="w-full max-w-4xl">
            <h1 className="text-3xl font-bold text-center mb-5 text-gray-900">
              How are your German skills?
            </h1>

            <div className="grid grid-cols-2  sm:grid-cols-4 gap-3">
              {["Not good", "OK", "Good", "Mother tongue"].map((level) => (
                <button
                  key={level}
                  onClick={() => handleOptionSelect("germanSkills", level)}
                  className={`flex flex-col items-center justify-center p-10 py-14 rounded-md border border-gray-300 bg-gray-150 hover:bg-[#6cb744] hover:text-white transition-colors ${formData.germanSkills === level ? "ring-2 ring-[#5ca63a]" : ""}`}
                >
                  <BsChatRightText size={28} className="mb-2 text-gray-600" />
                  <span className="text-gray-800 text-base sm:text-lg text-center">{level}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 6: Best time to reach */}
        {step === 6 && (
          <div className="w-full max-w-4xl">
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-5 text-gray-900">
              When is the best time to reach you?
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { value: "morning", icon: BsAlarmFill, label: "Morning" },
                { value: "lunch", icon: BsSunFill, label: "Lunch" },
                { value: "evening", icon: BsMoonFill, label: "At evening" },
                { value: "always", icon: BsArrowClockwise, label: "Always" }
              ].map(({ value, icon: Icon, label }) => (
                <button
                  key={value}
                  onClick={() => handleOptionSelect("contactTime", value)}
                  className={`flex flex-col items-center justify-center p-10 py-14 rounded-md border border-gray-200 bg-gray-50 hover:bg-[#6cb744]  ${formData.contactTime === value ? "ring-2 ring-[#5ca63a]" : ""}`}
                >
                  <Icon size={28} className="mb-2 text-gray-600" />
                  <span className="text-gray-800 hover:text-white text-base sm:text-lg text-center">{label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 7: Contact information */}
        {step === 7 && (
          <div className="w-full max-w-xl">
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-5 text-gray-900">
              How can we best reach you for a conversation?
            </h1>
            <p className="text-center mb-6 text-gray-600 text-base sm:text-lg">
              Last step. Then that's it! <FaHandPeace className="inline text-yellow-500 text-lg" />
            </p>

            <form className="space-y-3" onSubmit={handleSubmit}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="First name *"
                  className="py-4 w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6cb744] text-base sm:text-lg"
                  value={formData.contactInfo.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Last name *"
                  className="py-4 w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6cb744] text-base sm:text-lg"
                  value={formData.contactInfo.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-500" />
                </div>
                <input
                  type="email"
                  placeholder="Email *"
                  className="py-4 w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6cb744] text-base sm:text-lg"
                  value={formData.contactInfo.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaRegFlag className="text-gray-500" />
                  <span className="ml-1 text-gray-700">+</span>
                </div>
                <input
                  type="tel"
                  placeholder="Phone number *"
                  className="py-4 w-full pl-12 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6cb744] text-base sm:text-lg"
                  value={formData.contactInfo.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoLocationOutline className="text-gray-500" size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Postal code *"
                  className="py-4 w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6cb744] text-base sm:text-lg"
                  value={formData.contactInfo.postalCode}
                  onChange={(e) => handleInputChange("postalCode", e.target.value)}
                  required
                />
              </div>

              <div className="py-3 px-4 bg-gray-100 border border-gray-300 rounded-md">
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    className="py-4 mt-1 mr-2 h-4 w-4 text-[#6cb744] focus:ring-[#6cb744] border-gray-300 rounded"
                    checked={formData.contactInfo.privacyAccepted}
                    onChange={handlePrivacyChange}
                    required
                  />
                  <span className="text-base sm:text-lg text-gray-700">
                    By submitting this form I agree to the privacy policy of St. Josefshaus Refrath *
                  </span>
                </label>
              </div>
              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  className="py-4  px-7 bg-[#6cb744] text-white rounded-md transition-colors duration-200 hover:bg-[#5ca63a] active:bg-[#4e8e32] text-base sm:text-lg"
                >
                  Submit now
                </button>
              </div>

            </form>
          </div>
        )}
      </div>
    </>
  );
}
































// "use client";
// import { useState, useEffect } from "react";
// import {
//   BsAlarmFill,
//   BsSunFill,
//   BsMoonFill,
//   BsArrowClockwise,
//   BsCheck,
//   BsChatRightText,
//   BsLock,
//   BsClock,
//   BsCoin,
//   BsHeart,
//   BsSlash,
//   BsPlus,
//   BsPlusSquare,
//   BsPlusLg
// } from "react-icons/bs";
// import { IoLocationOutline } from "react-icons/io5";
// import { FiMail } from "react-icons/fi";
// import { FaHandPeace, FaRegFlag } from "react-icons/fa";
// import { FaCheck } from "react-icons/fa6";
// import Navbar from "./Navbar";


// export default function ApplicationForm() {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     contactTime: "",
//     training: [],
//     germanSkills: "",
//     contactInfo: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       phone: "",
//       postalCode: "",
//       privacyAccepted: false
//     },
//     workplacePreferences: [],
//     experience: "",
//     position: []
//   });

//   // Calculate progress percentage based on current step
//   const progressPercentages = {
//     1: 11,
//     2: 22,
//     3: 44,
//     4: 56,
//     5: 67,
//     6: 78,
//     7: 89
//   };

//   const handleNext = () => {
//     setStep(prev => Math.min(prev + 1, 7));
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleOptionSelect = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//     setTimeout(handleNext, 300);
//   };

//   const handleMultiSelect = (field, value) => {
//     setFormData(prev => {
//       const currentValues = [...(prev[field] || [])];
//       const exists = currentValues.includes(value);

//       return {
//         ...prev,
//         [field]: exists
//           ? currentValues.filter(item => item !== value)
//           : [...currentValues, value]
//       };
//     });
//     if (field === 'position' || field === 'training' || field === 'workplacePreferences') {
//       setTimeout(handleNext, 300);
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       contactInfo: {
//         ...prev.contactInfo,
//         [field]: value
//       }
//     }));
//   };

//   const handlePrivacyChange = () => {
//     setFormData(prev => ({
//       ...prev,
//       contactInfo: {
//         ...prev.contactInfo,
//         privacyAccepted: !prev.contactInfo.privacyAccepted
//       }
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Application submitted successfully!");
//     setStep(1);
//     setFormData({
//       contactTime: "",
//       training: [],
//       germanSkills: "",
//       contactInfo: {
//         firstName: "",
//         lastName: "",
//         email: "",
//         phone: "",
//         postalCode: "",
//         privacyAccepted: false
//       },
//       workplacePreferences: [],
//       experience: "",
//       position: []
//     });
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // Add effect to auto-advance when privacy is accepted
 

//   return (
//     <>

//       <div className="bg-white min-h-[80vh] flex flex-col justify-center items-center px-5 sm:px-6 lg:px-8">

//         {/* Progress bar */}
//         <div className="w-40 max-w-md mb-6">
//           <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
//             <div
//               className="h-1.5 bg-[#6cb744] rounded-full transition-all duration-500 ease-in-out"
//               style={{ width: `${progressPercentages[step]}%` }}
//             ></div>
//           </div>
//           <div className="text-center text-sm font-medium text-gray-500 mt-2">
//             {progressPercentages[step]}%
//           </div>
//         </div>

//         {/* Step 1: Position */}
       
//           <div className="w-full max-w-xl">
//             <h1 className="text-3xl font-bold text-center mb-5 text-gray-900">
//               Which position are you interested in?
//             </h1>
//             <p className="text-center mb-6 text-gray-600 text-base sm:text-lg">
//               Apply to us in under a minute <FaHandPeace className="inline text-yellow-500 text-lg" />. We look forward to hearing from you! 🎉
//             </p>

//             <div className="space-y-3">
//               {[
//                 "Nursing professional (m/f/d)",
//                 "Nursing assistant (m/f/d)",
//                 "Domestic worker (m/f/d) for house cleaning"
//               ].map((option) => (
//                 <button
//                   key={option}
                 
//                   className={`w-full flex items-center p-3 py-4 space-x-4 rounded-md border border-gray-200 bg-gray-100 hover:bg-gray-100 transition-colors ${formData.position.includes(option) ? "ring-2 ring-[#6cb744]" : ""}`}
//                 >

//                   <FaCheck size={20} className="text-black font-md" />


//                   <span className="text-gray-800 text-left text-md">{option}</span>
//                 </button>
//               ))}
//             </div>
//           </div>
        
//       </div>
//     </>
//   );
// }