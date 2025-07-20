// 'use client';

// import { useState, useEffect } from 'react';
// import { Check, X, Heart, MapPin, Calendar, User, Scale, Eye, ArrowLeft, Phone, Mail, Clock, DollarSign, FileText } from 'lucide-react';
// import Sidebar from '@/components/Sidebar';
// import { useRouter } from 'next/navigation';

// interface Case {
//   id: string;
//   name: string;
//   legalIssue: string;
//   caseDescription: string;
//   location: string;
//   postedDate: string;
//   urgency: 'low' | 'medium' | 'high';
//   estimatedDuration: string;
//   compensation: string;
// }

// export default function CasesPage() {
//   const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
//   const [acceptedCases, setAcceptedCases] = useState<Case[]>([]);
//   const [rejectedCases, setRejectedCases] = useState<Case[]>([]);
//   const [showDetails, setShowDetails] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter();

//   const [cases, setCases] = useState<Case[]>([]);
//   const [isLoadingCases, setIsLoadingCases] = useState(true);

//   // Fetch cases from the API
//   useEffect(() => {
//     const fetchCases = async () => {
//       try {
//         const response = await fetch('/api/cases');
//         if (response.ok) {
//           const data = await response.json();
//           setCases(data);
//         } else {
//           console.error('Failed to fetch cases');
//         }
//       } catch (error) {
//         console.error('Error fetching cases:', error);
//       } finally {
//         setIsLoadingCases(false);
//       }
//     };

//     fetchCases();
//   }, []);

//   // Refresh cases when the page becomes visible (useful after submitting a new case)
//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (!document.hidden) {
//         const fetchCases = async () => {
//           try {
//             const response = await fetch('/api/cases');
//             if (response.ok) {
//               const data = await response.json();
//               setCases(data);
//             }
//           } catch (error) {
//             console.error('Error refreshing cases:', error);
//           }
//         };
//         fetchCases();
//       }
//     };

//     document.addEventListener('visibilitychange', handleVisibilityChange);
//     return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
//   }, []);

//   useEffect(() => {
//     // Check if user is logged in
//     const authToken = localStorage.getItem('authToken');
//     const userData = localStorage.getItem('user');
//     const role = localStorage.getItem('role');

//     if (!authToken || !userData) {
//       router.push('/auth/login');
//       return;
//     }

//     if (role === 'client') {
//       router.push('/');
//       return;
//     }

//     try {
//       // Verify the user data is valid JSON
//       JSON.parse(userData);
//       setIsLoading(false);
//     } catch (error) {
//       console.error('Invalid user data, redirecting to login');
//       localStorage.removeItem('authToken');
//       localStorage.removeItem('user');
//       router.push('/auth/login');
//     }
//   }, [router]);

//   if (isLoading || isLoadingCases) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   const currentCase = cases[currentCaseIndex];

//   const handleAccept = () => {
//     if (currentCase) {
//       setAcceptedCases([...acceptedCases, currentCase]);
//       setCurrentCaseIndex(currentCaseIndex + 1);
//       setShowDetails(false);
//     }
//   };

//   const handleReject = () => {
//     if (currentCase) {
//       setRejectedCases([...rejectedCases, currentCase]);
//       setCurrentCaseIndex(currentCaseIndex + 1);
//       setShowDetails(false);
//     }
//   };

//   const getUrgencyColor = (urgency: string) => {
//     switch (urgency) {
//       case 'high': return 'text-red-600 bg-red-100';
//       case 'medium': return 'text-yellow-600 bg-yellow-100';
//       case 'low': return 'text-green-600 bg-green-100';
//       default: return 'text-gray-600 bg-gray-100';
//     }
//   };

//   const getUrgencyText = (urgency: string) => {
//     switch (urgency) {
//       case 'high': return 'High Priority';
//       case 'medium': return 'Medium Priority';
//       case 'low': return 'Low Priority';
//       default: return 'Unknown';
//     }
//   };

//   // Detailed view component
//   if (showDetails && currentCase) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-6">
//         <Sidebar />

//         <div className="max-w-4xl mx-auto">
//           {/* Back Button */}
//           <button
//             onClick={() => setShowDetails(false)}
//             className="flex items-center space-x-2 text-green-600 hover:text-green-800 mb-6"
//           >
//             <ArrowLeft className="w-5 h-5" />
//             <span>Back to Case</span>
//           </button>

//           {/* Detailed Case View */}
//           <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//             {/* Header */}
//             <div className="bg-gradient-to-r from-green-600 to-green-700 p-8 text-white">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h1 className="text-3xl font-bold mb-4">{currentCase.name}</h1>
//                   <div className="flex items-center space-x-6 text-green-100">
//                     <div className="flex items-center space-x-2">
//                       <MapPin className="w-5 h-5" />
//                       <span>{currentCase.location}</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Calendar className="w-5 h-5" />
//                       <span>Posted {new Date(currentCase.postedDate).toLocaleDateString()}</span>
//                     </div>
//                     <div className={`px-4 py-2 rounded-full text-sm font-medium ${getUrgencyColor(currentCase.urgency)}`}>
//                       {getUrgencyText(currentCase.urgency)}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Detailed Content */}
//             <div className="p-8 space-y-8">
//               {/* Legal Issue */}
//               <div>
//                 <div className="flex items-center space-x-3 mb-4">
//                   <Scale className="w-6 h-6 text-green-600" />
//                   <h2 className="text-2xl font-bold text-gray-800">Legal Issue</h2>
//                 </div>
//                         <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//           <p className="text-lg font-semibold text-green-800">{currentCase.legalIssue}</p>
//                 </div>
//               </div>

//               {/* Case Description */}
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-800 mb-4">Case Description</h2>
//                 <div className="bg-gray-50 rounded-lg p-6">
//                   <p className="text-gray-700 leading-relaxed text-lg">{currentCase.caseDescription}</p>
//                 </div>
//               </div>

//               {/* Additional Details Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="bg-gray-50 rounded-lg p-6">
//                   <div className="flex items-center space-x-3 mb-3">
//                     <Clock className="w-5 h-5 text-green-600" />
//                     <h3 className="text-lg font-semibold text-gray-800">Timeline</h3>
//                   </div>
//                   <p className="text-gray-700">Estimated Duration: <span className="font-semibold">{currentCase.estimatedDuration}</span></p>
//                   <p className="text-gray-600 text-sm mt-2">This is an estimate based on similar cases</p>
//                 </div>

//                 <div className="bg-gray-50 rounded-lg p-6">
//                   <div className="flex items-center space-x-3 mb-3">
//                     <DollarSign className="w-5 h-5 text-green-600" />
//                     <h3 className="text-lg font-semibold text-gray-800">Compensation</h3>
//                   </div>
//                   <p className="text-gray-700">Range: <span className="font-semibold text-green-600">{currentCase.compensation}</span></p>
//                   <p className="text-gray-600 text-sm mt-2">Final amount depends on case complexity</p>
//                 </div>

//                 <div className="bg-gray-50 rounded-lg p-6">
//                   <div className="flex items-center space-x-3 mb-3">
//                     <User className="w-5 h-5 text-purple-600" />
//                     <h3 className="text-lg font-semibold text-gray-800">Client Information</h3>
//                   </div>
//                   <p className="text-gray-700">Name: <span className="font-semibold">{currentCase.name}</span></p>
//                   <p className="text-gray-700">Location: <span className="font-semibold">{currentCase.location}</span></p>
//                 </div>

//                 <div className="bg-gray-50 rounded-lg p-6">
//                   <div className="flex items-center space-x-3 mb-3">
//                     <FileText className="w-5 h-5 text-orange-600" />
//                     <h3 className="text-lg font-semibold text-gray-800">Case Requirements</h3>
//                   </div>
//                   <ul className="text-gray-700 space-y-2">
//                     <li>• Initial consultation required</li>
//                     <li>• Documentation review</li>
//                     <li>• Regular client communication</li>
//                     <li>• Court representation if needed</li>
//                   </ul>
//                 </div>
//               </div>

//               {/* Contact Information */}
//               <div className="bg-green-50 border border-green-200 rounded-lg p-6">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4">Next Steps</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="flex items-center space-x-3">
//                     <Phone className="w-5 h-5 text-green-600" />
//                     <span className="text-gray-700">Schedule initial consultation</span>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <Mail className="w-5 h-5 text-green-600" />
//                     <span className="text-gray-700">Review case documents</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="p-8 bg-gray-50 flex justify-center space-x-8">
//               <button
//                 onClick={handleReject}
//                 className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200"
//               >
//                 <X className="w-5 h-5" />
//                 <span>Skip Case</span>
//               </button>

//               <button
//                 onClick={handleAccept}
//                 className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200"
//               >
//                 <Check className="w-5 h-5" />
//                 <span>Accept Case</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!currentCase) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-6">
//         <Sidebar />
//         <div className="max-w-2xl mx-auto text-center pt-20">
//           <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">No More Cases</h2>
//           <p className="text-gray-600 mb-8">You've reviewed all available cases. Check back later for new submissions.</p>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-white rounded-lg p-6 shadow-sm">
//               <h3 className="text-lg font-semibold text-green-600 mb-2">Accepted Cases</h3>
//               <p className="text-3xl font-bold text-green-600">{acceptedCases.length}</p>
//             </div>
//             <div className="bg-white rounded-lg p-6 shadow-sm">
//               <h3 className="text-lg font-semibold text-red-600 mb-2">Rejected Cases</h3>
//               <p className="text-3xl font-bold text-red-600">{rejectedCases.length}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <Sidebar />

//       {/* Header */}
//       <div className="max-w-4xl mx-auto">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">unseen.</h1>
//           <p className="text-gray-600 mt-2">Review and accept cases that match your expertise</p>
//         </div>



//         {/* Case Card */}
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-2xl mx-auto">
//           {/* Case Header */}
//           <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
//             <div className="flex justify-between items-start mb-4">
//               <div>
//                 <h2 className="text-2xl font-bold mb-2">{currentCase.name}</h2>
//                 <div className="flex items-center space-x-4 text-green-100">
//                   <div className="flex items-center space-x-1">
//                     <MapPin className="w-4 h-4" />
//                     <span>{currentCase.location}</span>
//                   </div>
//                   <div className="flex items-center space-x-1">
//                     <Calendar className="w-4 h-4" />
//                     <span>Posted {new Date(currentCase.postedDate).toLocaleDateString()}</span>
//                   </div>
//                 </div>
//               </div>
//               <div className={`px-3 py-1 rounded-full text-sm font-medium ${getUrgencyColor(currentCase.urgency)}`}>
//                 {getUrgencyText(currentCase.urgency)}
//               </div>
//             </div>
//           </div>

//           {/* Case Details */}
//           <div className="p-6 space-y-6">
//             {/* Legal Issue */}
//             <div>
//               <div className="flex items-center space-x-2 mb-2">
//                 <Scale className="w-5 h-5 text-green-600" />
//                 <h3 className="text-lg font-semibold text-gray-800">Legal Issue</h3>
//               </div>
//               <p className="text-gray-700 bg-gray-50 px-3 py-2 rounded-md">{currentCase.legalIssue}</p>
//             </div>

//             {/* Case Description */}
//             <div>
//               <h3 className="text-lg font-semibold text-gray-800 mb-2">Case Description</h3>
//               <p className="text-gray-700 leading-relaxed">{currentCase.caseDescription}</p>
//             </div>

//             {/* Case Details Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h4 className="text-sm font-medium text-gray-600 mb-1">Estimated Duration</h4>
//                 <p className="text-gray-800 font-semibold">{currentCase.estimatedDuration}</p>
//               </div>
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h4 className="text-sm font-medium text-gray-600 mb-1">Compensation Range</h4>
//                 <p className="text-gray-800 font-semibold">{currentCase.compensation}</p>
//               </div>
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h4 className="text-sm font-medium text-gray-600 mb-1">Client</h4>
//                 <div className="flex items-center space-x-2">
//                   <User className="w-4 h-4 text-gray-500" />
//                   <span className="text-gray-800 font-semibold">{currentCase.name}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="p-6 bg-gray-50">
//             {/* View Details Button */}
//             <div className="flex justify-center mb-4">
//               <button
//                 onClick={() => setShowDetails(true)}
//                 className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200"
//               >
//                 <Eye className="w-5 h-5" />
//                 <span>View Details</span>
//               </button>
//             </div>

//             {/* Accept/Reject Buttons */}
//             <div className="flex justify-center space-x-8">
//               <button
//                 onClick={handleReject}
//                 className="w-16 h-16 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110"
//               >
//                 <X className="w-8 h-8" />
//               </button>

//               <button
//                 onClick={handleAccept}
//                 className="w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110"
//               >
//                 <Check className="w-8 h-8" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
//           <div className="bg-white rounded-lg p-4 shadow-sm text-center">
//             <p className="text-sm text-gray-600">Accepted</p>
//             <p className="text-2xl font-bold text-green-600">{acceptedCases.length}</p>
//           </div>
//           <div className="bg-white rounded-lg p-4 shadow-sm text-center">
//             <p className="text-sm text-gray-600">Rejected</p>
//             <p className="text-2xl font-bold text-red-600">{rejectedCases.length}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// } 




// 'use client';

// import { useState, useEffect } from 'react';
// import {
//   Check,
//   X,
//   Scale,
//   MapPin,
//   Calendar,
//   User,
//   Mail,
//   Phone,
// } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { cn } from '@/lib/utils';

// type Case = {
//   id: string;
//   legalIssue: string;
//   createdAt: string;
//   caseDescription: string;
//   clientName?: string;
//   client?: {
//     firstName?: string;
//     lastName?: string;
//     email?: string;
//     phone?: string;
//     location?: string;
//   };
// };

// export default function SwipeCases() {
//   const [cases, setCases] = useState<Case[]>([]);
//   const [isLoadingCases, setIsLoadingCases] = useState(true);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchCases = async () => {
//       try {
//         const userData = localStorage.getItem('user');
//         if (!userData) return;

//         const legalProfessional = JSON.parse(userData);
//         const tags: string[] = legalProfessional.tags || [];

//         const res = await fetch('/api/professionals/fetch/cases');
//         if (!res.ok) throw new Error('Failed to fetch cases');

//         const allCases: Case[] = await res.json();

//         // Filter: match any tag to legalIssue
//         const matchingCases = tags.length === 0
//           ? allCases
//           : allCases.filter((c) =>
//               tags.some((tag) =>
//                 c.legalIssue?.toLowerCase().includes(tag.toLowerCase())
//               )
//             );

//         setCases(matchingCases);
//       } catch (err) {
//         console.error('Error fetching filtered cases:', err);
//       } finally {
//         setIsLoadingCases(false);
//       }
//     };

//     fetchCases();
//   }, []);

//   const handleAccept = () => {
//     setCurrentIndex((prev) => prev + 1);
//   };

//   const handleReject = () => {
//     setCurrentIndex((prev) => prev + 1);
//   };

//   const currentCase = cases[currentIndex];

//   if (isLoadingCases) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="text-lg font-medium text-gray-500">Loading cases...</div>
//       </div>
//     );
//   }

//   if (!currentCase) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="text-lg font-medium text-gray-500">No matching cases found</div>
//       </div>
//     );
//   }

//   const name =
//     currentCase.clientName ??
//     (`${currentCase.client?.firstName ?? ''} ${currentCase.client?.lastName ?? ''}`.trim() || 'Anonymous');

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
//       <div className="max-w-xl w-full bg-white p-6 rounded-xl shadow-xl relative transition-all duration-300">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
//           <Scale className="w-6 h-6 text-blue-500" />
//           {currentCase.legalIssue}
//         </h2>

//         <div className="space-y-4">
//           <p className="text-gray-700">{currentCase.caseDescription}</p>

//           <div className="mt-4 space-y-2">
//             <div className="flex items-center gap-2 text-sm text-gray-600">
//               <User className="w-4 h-4" />
//               {name}
//             </div>
//             {currentCase.client?.email && (
//               <div className="flex items-center gap-2 text-sm text-gray-600">
//                 <Mail className="w-4 h-4" />
//                 {currentCase.client.email}
//               </div>
//             )}
//             {currentCase.client?.phone && (
//               <div className="flex items-center gap-2 text-sm text-gray-600">
//                 <Phone className="w-4 h-4" />
//                 {currentCase.client.phone}
//               </div>
//             )}
//             {currentCase.client?.location && (
//               <div className="flex items-center gap-2 text-sm text-gray-600">
//                 <MapPin className="w-4 h-4" />
//                 {currentCase.client.location}
//               </div>
//             )}
//             <div className="flex items-center gap-2 text-sm text-gray-600">
//               <Calendar className="w-4 h-4" />
//               {new Date(currentCase.createdAt).toLocaleDateString()}
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-between mt-6">
//           <button
//             onClick={handleReject}
//             className={cn(
//               'flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 transition'
//             )}
//           >
//             <X className="w-5 h-5" />
//             Reject
//           </button>

//           <button
//             onClick={handleAccept}
//             className={cn(
//               'flex items-center gap-2 px-4 py-2 rounded-lg bg-green-100 hover:bg-green-200 text-green-700 transition'
//             )}
//           >
//             <Check className="w-5 h-5" />
//             Accept
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




'use client';

import { useEffect, useState } from 'react';
import {
  Check,
  X,
  Heart,
  MapPin,
  Calendar,
  User,
  Scale,
  Eye,
  Phone,
  Mail,
  Clock,
  DollarSign,
  FileText,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface LegalCase {
  id: string;
  name: string;
  legalIssue: string;
  caseDescription: string;
  location: string;
  postedDate: string;
  urgency: 'low' | 'medium' | 'high';
  estimatedDuration: string;
  compensation: string;
  client: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

export default function LegalCaseSwipe() {
  const [cases, setCases] = useState<LegalCase[]>([]);
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [acceptedCases, setAcceptedCases] = useState<LegalCase[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  const currentCase = cases[currentCaseIndex];
  const router = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const role = localStorage.getItem('role');
    const userData = localStorage.getItem('user');

    if (!authToken || !userData) {
      router.push('/auth/login');
      return;
    }

    if (role !== 'professional') {
      router.push('/')
    }

    const fetchCases = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');

        const response = await fetch('/api/professionals/cases', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ professionalId: userData.id }),
        });

        console.log(userData)

        console.log(response)

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error?.error || 'Failed to fetch cases');
        }

        const data = await response.json();
        setCases(data);
      } catch (error) {
        console.error('Error fetching cases:', error);
      }
    };



    fetchCases();
  }, []);

  const handleAccept = async () => {
    if (!currentCase) return;
    try {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      const res = await fetch('/api/professionals/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caseId: currentCase.id,
          professionalId: userData.id,
        }),
      });

      console.log(res)

      if (!res.ok) {
        const err = await res.json();
        if (err.error === 'Case already assigned') {
          setCurrentCaseIndex((i) => i + 1);
          return;
        }
        alert('Assignment error: ' + err.error);
        return;
      }

      const assigned = await res.json();
      setAcceptedCases((prev) => [...prev, assigned]);
      setCurrentCaseIndex((i) => i + 1);
      setShowDetails(false);
    } catch (err) {
      console.error('Accept error:', err);
    }
  };

  const handleReject = () => {
    setCurrentCaseIndex((i) => i + 1);
    setShowDetails(false);
  };

  if (!currentCase) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-gray-500">
        No more cases to review 🎉
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{currentCase.name}</h2>
          <span className="text-sm text-gray-400">{currentCase.postedDate}</span>
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Scale size={16} />
            <span className="capitalize">{currentCase.legalIssue}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={16} />
            <span>{currentCase.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock size={16} />
            <span>{currentCase.estimatedDuration}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <DollarSign size={16} />
            <span>{currentCase.compensation}</span>
          </div>
        </div>

        {showDetails && (
          <div className="border-t pt-4 mt-4 space-y-2 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <FileText size={16} className="mt-1" />
              <p>{currentCase.caseDescription}</p>
            </div>
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{currentCase.client.firstName} {currentCase.client.lastName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>{currentCase.client.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>{currentCase.client.email}</span>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={handleReject}
            className="bg-red-100 hover:bg-red-200 text-red-600 rounded-full p-3 transition"
          >
            <X />
          </button>
          <button
            onClick={() => setShowDetails((v) => !v)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full p-3 transition"
          >
            <Eye />
          </button>
          <button
            onClick={handleAccept}
            className="bg-green-100 hover:bg-green-200 text-green-600 rounded-full p-3 transition"
          >
            <Check />
          </button>
        </div>
      </div>
    </div>
  );
}
