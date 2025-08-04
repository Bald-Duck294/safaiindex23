// "use client";
// import { useState, useEffect } from "react";

// import ImageUploader  from "./ImageUploader";
// import LocationDetector from "./LocationDetector";

// export default function SubmitReview() {
//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     remarks: "",
//     images: [],
//   });
//   const [locationCoords, setLocationCoords] = useState(null);
//   const [name, setName] = useState("");
//   const [siteId, setSiteId] = useState("");
//   const [phone, setPhone] = useState("");
//   const [remarks, setRemarks] = useState("");
//   const [images, setImages] = useState([]);
//   const [successMsg, setSuccessMsg] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [locationRecordId, setLocationRecordId] = useState(null);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           setLocationCoords({
//             lat: pos.coords.latitude,
//             lng: pos.coords.longitude,
//           });
//         },
//         (err) => {
//           console.warn("Geolocation not allowed:", err);
//         }
//       );
//     }
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name.trim() || !phone.trim() || !remarks.trim()) {
//       alert("Please fill all required fields");
//       return;
//     }

//     if (!selectedLocation) {
//       alert("Location not detected yet.");
//       return;
//     }

//     try {
//       setSubmitting(true);

//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("site_id", siteId);
//       formData.append("phone", phone);
//       formData.append("remarks", remarks);
//       formData.append("latitude", selectedLocation.latitude.toString());
//       formData.append("longitude", selectedLocation.longitude.toString());
//       formData.append("address", selectedLocation.address);
//       images.forEach((img) => formData.append("images", img));

//       const res = await fetch("http://localhost:8000/cleaner-reviews", {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) throw new Error("Failed to submit review");

//       setSuccessMsg("Review submitted successfully!");

//       setTimeout(() => setSuccessMsg(""), 4000);
//     } catch (err) {
//       alert("Something went wrong. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
//       <div className="bg-white shadow-xl rounded-lg w-full max-w-2xl p-8 space-y-6">
//         <h2 className="text-3xl font-bold text-gray-800 text-center">
//           Submit Cleanliness Review
//         </h2>

//         {successMsg && (
//           <div className="bg-green-100 text-green-700 px-4 py-3 rounded relative text-sm">
//             ✅ {successMsg}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <LocationDetector
//             location={selectedLocation}
//             onLocationChange={setSelectedLocation}
//           />

//           <div>
//             <label className="block font-medium text-sm text-gray-700">
//               Name *
//             </label>
//             <input
//               name="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block font-medium text-sm text-gray-700">
//               Location Id *
//             </label>
//             <input
//               name="site_id"
//               value={siteId}
//               onChange={(e) => setSiteId(e.target.value)}
//               required
//               className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block font-medium text-sm text-gray-700">
//               Phone *
//             </label>
//             <input
//               name="phone"
//               type="tel"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               required
//               className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block font-medium text-sm text-gray-700">
//               Remarks
//             </label>
//             <textarea
//               name="remarks"
//               rows={3}
//               value={remarks}
//               onChange={(e) => setRemarks(e.target.value)}
//               className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <ImageUploader
//             images={images}
//             onImagesChange={setImages}
//             maxImages={3}
//             maxSizeKB={300}
//           />

//           <button
//             type="submit"
//             disabled={submitting}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-200"
//           >
//             {submitting ? "Submitting..." : "Submit Review"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// ---------------------------------------------------------------------------------------------------------//

// "use client";
// import { useState, useEffect } from "react";
// import { useParams } from 'next/navigation';
// import {
//   MapPin,
//   Phone,
//   User,
//   MessageSquare,
//   Camera,
//   Globe,
//   QrCode,
//   CheckCircle,
//   AlertCircle,
//   Loader
// } from "lucide-react";

// export default function SubmitReview() {
//   const params = useParams();
//   const toiletId = params?.id || ''; // Handle case when ID is not present

//   const [language, setLanguage] = useState('en');
//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     remarks: "",
//     images: [],
//   });
//   const [locationCoords, setLocationCoords] = useState(null);
//   const [images, setImages] = useState([]);
//   const [successMsg, setSuccessMsg] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [selectedLocation, setSelectedLocation] = useState(null);

//   // Language translations
//   const translations = {
//     en: {
//       title: "Submit Cleanliness Review",
//       toiletId: "Toilet ID",
//       name: "Name",
//       phone: "Phone Number",
//       remarks: "Remarks / Comments",
//       images: "Upload Images",
//       submit: "Submit Review",
//       submitting: "Submitting...",
//       required: "Required",
//       optional: "Optional",
//       maxImages: "Maximum 3 images",
//       maxSize: "Max size: 300KB each",
//       location: "Location",
//       locationDetected: "Location detected",
//       locationFailed: "Location detection failed",
//       fillRequired: "Please fill all required fields",
//       locationNotDetected: "Location not detected yet",
//       success: "Review submitted successfully!",
//       error: "Something went wrong. Please try again.",
//       selectImages: "Select Images",
//       removeImage: "Remove image",
//       scannedFrom: "Scanned from QR Code"
//     },
//     hi: {
//       title: "स्वच्छता समीक्षा जमा करें",
//       toiletId: "शौचालय आईडी",
//       name: "नाम",
//       phone: "फोन नंबर",
//       remarks: "टिप्पणी / सुझाव",
//       images: "चित्र अपलोड करें",
//       submit: "समीक्षा जमा करें",
//       submitting: "जमा कर रहे हैं...",
//       required: "आवश्यक",
//       optional: "वैकल्पिक",
//       maxImages: "अधिकतम 3 चित्र",
//       maxSize: "अधिकतम आकार: 300KB प्रत्येक",
//       location: "स्थान",
//       locationDetected: "स्थान का पता लगाया गया",
//       locationFailed: "स्थान खोजने में असफल",
//       fillRequired: "कृपया सभी आवश्यक फ़ील्ड भरें",
//       locationNotDetected: "स्थान अभी तक नहीं मिला",
//       success: "समीक्षा सफलतापूर्वक जमा की गई!",
//       error: "कुछ गलत हुआ। कृपया पुनः प्रयास करें।",
//       selectImages: "चित्र चुनें",
//       removeImage: "चित्र हटाएं",
//       scannedFrom: "QR कोड से स्कैन किया गया"
//     },
//     mr: {
//       title: "स्वच्छता पुनरावलोकन सबमिट करा",
//       toiletId: "शौचालय आयडी",
//       name: "नाव",
//       phone: "फोन नंबर",
//       remarks: "टिप्पणी / सूचना",
//       images: "फोटो अपलोड करा",
//       submit: "पुनरावलोकन सबमिट करा",
//       submitting: "सबमिट करत आहे...",
//       required: "आवश्यक",
//       optional: "पर्यायी",
//       maxImages: "जास्तीत जास्त 3 फोटो",
//       maxSize: "जास्तीत जास्त आकार: 300KB प्रत्येक",
//       location: "स्थान",
//       locationDetected: "स्थान आढळले",
//       locationFailed: "स्थान शोधण्यात अयशस्वी",
//       fillRequired: "कृपया सर्व आवश्यक फील्ड भरा",
//       locationNotDetected: "स्थान अजून आढळले नाही",
//       success: "पुनरावलोकन यशस्वीरित्या सबमिट झाले!",
//       error: "काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा.",
//       selectImages: "फोटो निवडा",
//       removeImage: "फोटो काढा",
//       scannedFrom: "QR कोड वरून स्कॅन केले"
//     }
//   };

//   const t = translations[language];

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const coords = {
//             lat: pos.coords.latitude,
//             lng: pos.coords.longitude,
//           };
//           setLocationCoords(coords);
//           setSelectedLocation({
//             latitude: coords.lat,
//             longitude: coords.lng,
//             address: `${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`
//           });
//         },
//         (err) => {
//           console.warn("Geolocation not allowed:", err);
//         }
//       );
//     }
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     if (images.length + files.length > 3) {
//       alert(`${t.maxImages}`);
//       return;
//     }

//     // Don't change this - keep your existing compression logic
//     const validFiles = [];
//     files.forEach(file => {
//       // Your compression logic will go here
//       // For now, just adding files as-is
//       validFiles.push(file);
//     });

//     setImages(prev => [...prev, ...validFiles]);
//   };

//   const removeImage = (index) => {
//     setImages(prev => prev.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async () => {
//     if (!form.name.trim() || !form.phone.trim()) {
//       alert(t.fillRequired);
//       return;
//     }

//     if (!selectedLocation) {
//       alert(t.locationNotDetected);
//       return;
//     }

//     try {
//       setSubmitting(true);

//       const formData = new FormData();
//       formData.append("name", form.name);
//       formData.append("site_id", toiletId || 'manual-entry');
//       formData.append("phone", form.phone);
//       formData.append("remarks", form.remarks);
//       formData.append("latitude", selectedLocation.latitude.toString());
//       formData.append("longitude", selectedLocation.longitude.toString());
//       formData.append("address", selectedLocation.address);
//       formData.append("language", language);

//       images.forEach((img) => formData.append("images", img));

//       const res = await fetch("http://localhost:8000/cleaner-reviews", {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) throw new Error("Failed to submit review");

//       setSuccessMsg(t.success);

//       // Reset form
//       setForm({ name: "", phone: "", remarks: "", images: [] });
//       setImages([]);

//       setTimeout(() => setSuccessMsg(""), 4000);
//     } catch (err) {
//       alert(t.error);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-6 sm:py-12">
//       <div className="max-w-2xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
//             <QrCode className="w-8 h-8 text-slate-600" />
//           </div>
//           <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
//             {t.title}
//           </h1>
//           <p className="text-slate-600 text-sm sm:text-base">
//             {toiletId ? t.scannedFrom : 'Manual entry form'}
//           </p>
//         </div>

//         {/* Language Selector */}
//         <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <Globe className="w-5 h-5 text-slate-600" />
//               <span className="font-medium text-slate-700">Language</span>
//             </div>
//             <div className="flex bg-slate-100 rounded-lg p-1">
//               {[
//                 { code: 'en', name: 'English' },
//                 { code: 'hi', name: 'हिंदी' },
//                 { code: 'mr', name: 'मराठी' }
//               ].map((lang) => (
//                 <button
//                   key={lang.code}
//                   onClick={() => setLanguage(lang.code)}
//                   className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
//                     language === lang.code
//                       ? 'bg-white text-slate-900 shadow-sm'
//                       : 'text-slate-600 hover:text-slate-900'
//                   }`}
//                 >
//                   {lang.name}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Main Form */}
//         <div className="bg-white shadow-xl rounded-lg border border-slate-200 overflow-hidden">
//           {/* Success Message */}
//           {successMsg && (
//             <div className="bg-green-50 border-l-4 border-green-400 p-4 m-6 mb-0">
//               <div className="flex items-center">
//                 <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
//                 <p className="text-green-700 font-medium">{successMsg}</p>
//               </div>
//             </div>
//           )}

//           <div className="p-6 sm:p-8">
//             <div className="space-y-6">
//               {/* Toilet ID Display - Only show if ID exists */}
//               {toiletId && (
//                 <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
//                   <div className="flex items-center space-x-2">
//                     <QrCode className="w-5 h-5 text-slate-600" />
//                     <label className="block font-medium text-slate-700">
//                       {t.toiletId}
//                     </label>
//                   </div>
//                   <div className="mt-2">
//                     <input
//                       type="text"
//                       value={toiletId}
//                       readOnly
//                       className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-md text-slate-700 font-mono text-sm"
//                     />
//                   </div>
//                 </div>
//               )}

//               {/* Location Coordinates Display */}
//               <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
//                 <div className="flex items-center space-x-2">
//                   <MapPin className="w-5 h-5 text-slate-600" />
//                   <label className="block font-medium text-slate-700">
//                     {t.location}
//                   </label>
//                 </div>
//                 <div className="mt-2">
//                   {selectedLocation ? (
//                     <div className="space-y-2">
//                       <div className="flex items-center space-x-2">
//                         <CheckCircle className="w-4 h-4 text-green-500" />
//                         <span className="text-green-700 text-sm">{t.locationDetected}</span>
//                       </div>
//                       <div className="bg-white p-3 rounded border text-sm font-mono">
//                         <div><strong>Lat:</strong> {selectedLocation.latitude.toFixed(6)}</div>
//                         <div><strong>Lng:</strong> {selectedLocation.longitude.toFixed(6)}</div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="flex items-center space-x-2">
//                       <Loader className="w-4 h-4 text-slate-500 animate-spin" />
//                       <span className="text-slate-600 text-sm">Detecting location...</span>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Name Field */}
//               <div>
//                 <label className="block font-medium text-slate-700 mb-2">
//                   <div className="flex items-center space-x-2">
//                     <User className="w-4 h-4" />
//                     <span>{t.name}</span>
//                     <span className="text-red-500 text-sm">({t.required})</span>
//                   </div>
//                 </label>
//                 <input
//                   name="name"
//                   value={form.name}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
//                   placeholder={t.name}
//                 />
//               </div>

//               {/* Phone Field */}
//               <div>
//                 <label className="block font-medium text-slate-700 mb-2">
//                   <div className="flex items-center space-x-2">
//                     <Phone className="w-4 h-4" />
//                     <span>{t.phone}</span>
//                     <span className="text-red-500 text-sm">({t.required})</span>
//                   </div>
//                 </label>
//                 <input
//                   name="phone"
//                   type="tel"
//                   value={form.phone}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
//                   placeholder={t.phone}
//                 />
//               </div>

//               {/* Remarks Field */}
//               <div>
//                 <label className="block font-medium text-slate-700 mb-2">
//                   <div className="flex items-center space-x-2">
//                     <MessageSquare className="w-4 h-4" />
//                     <span>{t.remarks}</span>
//                     <span className="text-slate-500 text-sm">({t.optional})</span>
//                   </div>
//                 </label>
//                 <textarea
//                   name="remarks"
//                   rows={4}
//                   value={form.remarks}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors resize-none"
//                   placeholder={t.remarks}
//                 />
//               </div>

//               {/* Image Upload */}
//               <div>
//                 <label className="block font-medium text-slate-700 mb-2">
//                   <div className="flex items-center space-x-2">
//                     <Camera className="w-4 h-4" />
//                     <span>{t.images}</span>
//                     <span className="text-slate-500 text-sm">({t.optional})</span>
//                   </div>
//                 </label>
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-center w-full">
//                     <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
//                       <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                         <Camera className="w-8 h-8 mb-3 text-slate-400" />
//                         <p className="mb-2 text-sm text-slate-500">
//                           <span className="font-semibold">{t.selectImages}</span>
//                         </p>
//                         <p className="text-xs text-slate-500">{t.maxImages} - {t.maxSize}</p>
//                       </div>
//                       <input
//                         type="file"
//                         className="hidden"
//                         multiple
//                         accept="image/*"
//                         onChange={handleImageUpload}
//                       />
//                     </label>
//                   </div>

//                   {/* Image Preview */}
//                   {images.length > 0 && (
//                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                       {images.map((image, index) => (
//                         <div key={index} className="relative">
//                           <img
//                             src={URL.createObjectURL(image)}
//                             alt={`Preview ${index + 1}`}
//                             className="w-full h-24 object-cover rounded-lg border border-slate-200"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => removeImage(index)}
//                             className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-colors"
//                             title={t.removeImage}
//                           >
//                             ×
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <button
//                 onClick={handleSubmit}
//                 disabled={submitting || !selectedLocation}
//                 className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
//               >
//                 {submitting ? (
//                   <>
//                     <Loader className="w-5 h-5 animate-spin" />
//                     <span>{t.submitting}</span>
//                   </>
//                 ) : (
//                   <span>{t.submit}</span>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { CheckCircle, AlertCircle } from "lucide-react";
import { fetchToiletFeaturesByName } from "@/lib/api/configurationsApi";
import ImageUploader from "./ImageUploader";
import LocationDetector from "./LocationDetector";

// Multilingual support
const translations = {
  en: {
    title: "Submit Cleanliness Review",
    name: "Name",
    phone: "Phone",
    remarks: "Remarks",
    locationId: "Toilet ID",
    submit: "Submit Review",
    submitting: "Submitting...",
    success: "Review submitted successfully!",
    thankYou: "Thank You!",
    successMessage:
      "Your cleanliness review has been submitted successfully. Thank you for helping improve public facilities!",
    submitAnother: "Submit Another Review",
    requiredMsg: "Please fill all required fields",
    noLocationMsg: "Location not detected yet.",
    langLabel: "Language",
    validation: {
      nameRequired: "Name is required",
      nameMaxLength: "Name cannot exceed 100 characters",
      phoneRequired: "Phone number is required",
      phoneInvalid: "Phone number must be exactly 10 digits",
      phoneOnlyNumbers: "Phone number should contain only numbers",
      remarksRequired: "Remarks are required",
      remarksMaxLength: "Remarks cannot exceed 250 characters",
      imagesRequired: "At least one image is required",
      locationRequired: "Location is required",
    },
  },
  hi: {
    title: "स्वच्छता समीक्षा जमा करें",
    name: "नाम",
    phone: "फ़ोन नंबर",
    remarks: "टिप्पणी",
    locationId: "शौचालय आईडी",
    submit: "समीक्षा सबमिट करें",
    submitting: "जमा कर रहे हैं...",
    success: "समीक्षा सफलतापूर्वक जमा हुई!",
    thankYou: "धन्यवाद!",
    successMessage:
      "आपकी स्वच्छता समीक्षा सफलतापूर्वक जमा हो गई है। सार्वजनिक सुविधाओं को बेहतर बनाने में मदद करने के लिए धन्यवाद!",
    submitAnother: "दूसरी समीक्षा जमा करें",
    requiredMsg: "कृपया सभी आवश्यक फ़ील्ड भरें",
    noLocationMsg: "स्थान अभी तक नहीं मिला है।",
    langLabel: "भाषा",
    validation: {
      nameRequired: "नाम आवश्यक है",
      nameMaxLength: "नाम 100 अक्षरों से अधिक नहीं हो सकता",
      phoneRequired: "फ़ोन नंबर आवश्यक है",
      phoneInvalid: "फ़ोन नंबर ठीक 10 अंकों का होना चाहिए",
      phoneOnlyNumbers: "फ़ोन नंबर में केवल संख्याएँ होनी चाहिए",
      remarksRequired: "टिप्पणी आवश्यक है",
      remarksMaxLength: "टिप्पणी 250 अक्षरों से अधिक नहीं हो सकती",
      imagesRequired: "कम से कम एक तस्वीर आवश्यक है",
      locationRequired: "स्थान आवश्यक है",
    },
  },
  mr: {
    title: "स्वच्छता पुनरावलोकन सबमिट करा",
    name: "नाव",
    phone: "फोन नंबर",
    remarks: "टीप",
    locationId: "शौचालय आयडी",
    submit: "पुनरावलोकन सबमिट करा",
    submitting: "सबमिट करत आहोत...",
    success: "पुनरावलोकन यशस्वीरित्या सबमिट झाले!",
    thankYou: "धन्यवाद!",
    successMessage:
      "तुमचे स्वच्छता पुनरावलोकन यशस्वीरित्या सबमिट झाले आहे. सार्वजनिक सुविधा सुधारण्यासाठी मदत केल्याबद्दल धन्यवाद!",
    submitAnother: "दुसरे पुनरावलोकन सबमिट करा",
    requiredMsg: "कृपया सर्व आवश्यक फील्ड भरा",
    noLocationMsg: "स्थान अद्याप शोधले गेले नाही.",
    langLabel: "भाषा",
    validation: {
      nameRequired: "नाव आवश्यक आहे",
      nameMaxLength: "नाव 100 अक्षरांपेक्षा जास्त असू शकत नाही",
      phoneRequired: "फोन नंबर आवश्यक आहे",
      phoneInvalid: "फोन नंबर नक्की 10 अंकांचा असावा",
      phoneOnlyNumbers: "फोन नंबरमध्ये फक्त संख्या असाव्यात",
      remarksRequired: "टीप आवश्यक आहे",
      remarksMaxLength: "टीप 250 अक्षरांपेक्षा जास्त असू शकत नाही",
      imagesRequired: "किमान एक प्रतिमा आवश्यक आहे",
      locationRequired: "स्थान आवश्यक आहे",
    },
  },
};

export default function SubmitReview({ lang = "en" }) {
  const params = useParams();
  const toiletIdFromUrl = params?.id?.toString() || "";

  const [currentLang, setCurrentLang] = useState(lang || "en");
  const [showSuccess, setShowSuccess] = useState(false);
  const [features, setFeatures] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const t = translations[currentLang];

  const [name, setName] = useState("");
  const [toiletId, setToiletId] = useState("");
  const [phone, setPhone] = useState("");
  const [remarks, setRemarks] = useState("");
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loder, setLoading] = useState(true);

  // Validation states
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setSelectedLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            address: "",
          });
        },
        (err) => {
          console.warn("Geolocation error:", err);
        }
      );
    }
  }, []);

  useEffect(() => {
    const loadFeatures = async () => {
      try {
        const data = await fetchToiletFeaturesByName("cleaner_config");
        // Assuming data looks like [{ id: 1, description: "Mirror is clean" }, ...]
        console.log(data, "data");
        if (data) {
          setLoading(false);
        }
        setFeatures(data?.description);
      } catch (error) {
        console.error("Failed to fetch features:", error);
      }
    };

    loadFeatures();
  }, []);
  // Validation functions
  const validateName = (value) => {
    if (!value.trim()) {
      return t.validation.nameRequired;
    }
    if (value.length > 100) {
      return t.validation.nameMaxLength;
    }
    return "";
  };

  const validateTasks = (tasks) => {
    if (!tasks || tasks.length === 0) {
      return "Please select at least one checklist item.";
    }
    return "";
  };

  const validatePhone = (value) => {
    if (!value.trim()) {
      return t.validation.phoneRequired;
    }
    if (!/^\d+$/.test(value)) {
      return t.validation.phoneOnlyNumbers;
    }
    if (value.length !== 10) {
      return t.validation.phoneInvalid;
    }
    return "";
  };

  const validateRemarks = (value) => {
    if (!value.trim()) {
      return t.validation.remarksRequired;
    }
    if (value.length > 250) {
      return t.validation.remarksMaxLength;
    }
    return "";
  };

  const validateImages = (imageArray) => {
    if (!imageArray || imageArray.length === 0) {
      return t.validation.imagesRequired;
    }
    return "";
  };

  const validateLocation = (location) => {
    if (!location) {
      return t.validation.locationRequired;
    }
    return "";
  };

  // Real-time validation
  useEffect(() => {
    const newErrors = {};

    if (touched.name) {
      const nameError = validateName(name);
      if (nameError) newErrors.name = nameError;
    }

    if (touched.phone) {
      const phoneError = validatePhone(phone);
      if (phoneError) newErrors.phone = phoneError;
    }
    if (touched.tasks) {
      const tasksError = validateTasks(selectedTasks);
      if (tasksError) newErrors.tasks = tasksError;
    }

    if (touched.remarks) {
      const remarksError = validateRemarks(remarks);
      if (remarksError) newErrors.remarks = remarksError;
    }

    if (touched.images) {
      const imagesError = validateImages(images);
      if (imagesError) newErrors.images = imagesError;
    }

    if (touched.location) {
      const locationError = validateLocation(selectedLocation);
      if (locationError) newErrors.location = locationError;
    }

    setErrors(newErrors);
  }, [name, phone, remarks, images, selectedLocation, touched, t.validation]);

  // Check if form is valid
  const isFormValid = () => {
    const nameError = validateName(name);
    const phoneError = validatePhone(phone);
    const remarksError = validateRemarks(remarks);
    const imagesError = validateImages(images);
    const locationError = validateLocation(selectedLocation);

    return (
      !nameError &&
      !phoneError &&
      !remarksError &&
      !imagesError &&
      !locationError
    );
  };

  useEffect(() => {
    console.log("Component mounted");
  }, []);

  const handleNameChange = (e) => {
    const value = e.target.value;
    // Allow only up to 100 characters
    console.log("HandleNameChange:", e.target.value);

    console.log(value, "value");
    if (value.length <= 100) {
      setName(value);
    }
    setTouched((prev) => ({ ...prev, name: true }));
  };

   const handleToiletIdChange = (e) => {
    const value = e.target.value;
    // Allow only up to 100 characters
    console.log("HandleToiletIdChange:", e.target.value);

    console.log(value, "value");
    if (value.length <= 100) {
      setToiletId(value);
    }
    setTouched((prev) => ({ ...prev, toiletId: true }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and up to 10 digits
    if (/^\d{0,10}$/.test(value)) {
      setPhone(value);
    }
    setTouched((prev) => ({ ...prev, phone: true }));
  };

  const handleRemarksChange = (e) => {
    const value = e.target.value;
    // Allow only up to 250 characters
    if (value.length <= 250) {
      setRemarks(value);
    }
    setTouched((prev) => ({ ...prev, remarks: true }));
  };

  const handleImagesChange = (newImages) => {
    setImages(newImages);
    setTouched((prev) => ({ ...prev, images: true }));
  };

  const handleLocationChange = (newLocation) => {
    setSelectedLocation(newLocation);
    setTouched((prev) => ({ ...prev, location: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched to show validation errors
    setTouched({
      name: true,
      phone: true,
      remarks: true,
      images: true,
      location: true,
      tasks: true,
    });

    if (!isFormValid()) {
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("site_id", toiletId);
      formData.append("phone", phone);
      formData.append("remarks", remarks);
      formData.append("latitude", selectedLocation.latitude.toString());
      formData.append("longitude", selectedLocation.longitude.toString());
      formData.append("address", selectedLocation.address || "");
      images.forEach((img) => formData.append("images", img));
      selectedTasks.forEach((taskId) => formData.append("task_ids", taskId));
      console.log(formData, "form data");
      console.log(selectedTasks, "selected task");
      const res = await fetch(
        "https://safai-index-backend.onrender.com/cleaner-reviews",
        {
          method: "POST",
          body: formData,
        }
      );

      console.log(res, "response");
      if (!res.ok) throw new Error("Failed to submit review");

      setShowSuccess(true);

      // // Reset form
      // setName("");
      // setPhone("");
      // setRemarks("");
      // setImages([]);
      // setSelectedLocation(null);
      // setTouched({});
      // setErrors({});
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t.thankYou}
          </h2>
          <p className="text-gray-600 mb-8 text-lg">{t.successMessage}</p>
          <button
            onClick={() => setShowSuccess(false)}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {t.submitAnother}
          </button>
        </div>
      </div>
    );
  }

  if (loder) {
    return <div>loading ....</div>;
  }
  // console.log(errors, "errors");
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-2xl p-6 sm:p-8 space-y-6">
        {/* Language Selector */}
        <div className="flex justify-end">
          <label className="mr-2 text-sm font-medium text-gray-700">
            {t.langLabel}:
          </label>
          <select
            value={currentLang}
            onChange={(e) => setCurrentLang(e.target.value)}
            className="border px-2 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="mr">मराठी</option>
          </select>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
          {t.title}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Location Detector */}
          <div>
            <LocationDetector
              location={selectedLocation}
              onLocationChange={handleLocationChange}
            />
            {errors.location && touched.location && (
              <div className="flex items-center mt-2 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.location}
              </div>
            )}
          </div>

          {/* Name Field */}
          <div>
            <label className="block font-medium text-sm text-gray-700">
              {t.name} *
            </label>
            <input
              name="name"
              value={name}
              onChange={handleNameChange}
              onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
              className={`mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                errors.name && touched.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Enter your full name"
            />
            <div className="flex justify-between mt-1">
              {errors.name && touched.name && (
                <div className="flex items-center text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.name}
                </div>
              )}
              <div className="text-xs text-gray-500 ml-auto">
                {name.length}/100
              </div>
            </div>
          </div>

          {/* Toilet ID Field */}
          <div>
            <label className="block font-medium text-sm text-gray-700">
              {t.locationId} *
            </label>
            <input
              type="number"
              name="site_id"
              value={toiletId}
              onChange={handleToiletIdChange}
              className="mt-1 w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-600 shadow-sm"
            />
          </div>

          {/* Phone Field */}
          <div>
            <label className="block font-medium text-sm text-gray-700">
              {t.phone} *
            </label>
            <input
              name="phone"
              type="number"
              value={phone}
              onChange={handlePhoneChange}
              onBlur={() => setTouched((prev) => ({ ...prev, phone: true }))}
              className={`mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                errors.phone && touched.phone
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Enter 10-digit phone number"
            />
            <div className="flex justify-between mt-1">
              {errors.phone && touched.phone && (
                <div className="flex items-center text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.phone}
                </div>
              )}
              <div className="text-xs text-gray-500 ml-auto">
                {phone.length}/10
              </div>
            </div>
          </div>

          {/* Remarks Field */}
          <div>
            <label className="block font-medium text-sm text-gray-700">
              {t.remarks} *
            </label>
            <textarea
              name="remarks"
              rows={3}
              value={remarks}
              onChange={handleRemarksChange}
              onBlur={() => setTouched((prev) => ({ ...prev, remarks: true }))}
              className={`mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 resize-none ${
                errors.remarks && touched.remarks
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Share your experience and observations"
            />
            <div className="flex justify-between mt-1">
              {errors.remarks && touched.remarks && (
                <div className="flex items-center text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.remarks}
                </div>
              )}
              <div className="text-xs text-gray-500 ml-auto">
                {remarks.length}/250
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div>
            <label className="block font-medium text-sm text-gray-700 mb-2">
              Checklist *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features?.map((feature, idx) => (
                <label key={idx} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={feature.id}
                    checked={selectedTasks.includes(feature.id)}
                    onChange={(e) => {
                      const taskId = feature.id;
                      setSelectedTasks((prev) =>
                        e.target.checked
                          ? [...prev, taskId]
                          : prev.filter((id) => id !== taskId)
                      );
                    }}
                    className="form-checkbox text-blue-600"
                  />
                  <span>{feature.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <ImageUploader
              images={images}
              onImagesChange={handleImagesChange}
              maxImages={3}
              maxSizeKB={300}
            />
            {errors.images && touched.images && (
              <div className="flex items-center mt-2 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.images}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting || !isFormValid()}
            className={`w-full font-semibold py-3 px-4 rounded-md shadow-md transition duration-200 ${
              submitting || !isFormValid()
                ? "bg-gray-400 cursor-not-allowed text-gray-600"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {submitting ? t.submitting : t.submit}
          </button>
        </form>
      </div>
    </div>
  );
}
