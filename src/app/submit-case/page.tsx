'use client';

import { useState, useEffect } from 'react';
import { X, Paperclip, Check, X as XIcon, Plus } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/navigation';

interface CaseForm {
  id: string;
  // Client Information
  clientName: string;
  clientEmail: string;
  clientPhone: string;

  // Case Details
  legalIssue: string;
  caseDescription: string;
  location: string;

  // Case Status
  urgency: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

  // Case Timeline
  estimatedDuration: string;

  // Compensation
  compensationMin: string;
  compensationMax: string;
  compensationCurrency: string;

  // Additional
  tags: string;
  attachments: File[];
}

export default function SubmitCasePage() {
  const [forms, setForms] = useState<CaseForm[]>([
    {
      id: '1',
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      legalIssue: '',
      caseDescription: '',
      location: '',
      urgency: 'MEDIUM',
      estimatedDuration: '',
      compensationMin: '',
      compensationMax: '',
      compensationCurrency: 'USD',
      tags: '',
      attachments: [],
    },
  ]);

  const [posted, setPosted] = useState<CaseForm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const authToken = localStorage.getItem('authToken');
    const role = localStorage.getItem('role');
    const userData = localStorage.getItem('user');

    if (!authToken || !userData) {
      router.push('/auth/login');
      return;
    }

    if (role !== 'client') {
      router.push('/')
    }

    try {
      // Verify the user data is valid JSON
      JSON.parse(userData);
      setIsLoading(false);
    } catch (error) {
      console.error('Invalid user data, redirecting to login');
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      router.push('/auth/login');
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const legalIssues = [
    'Family Law',
    'Criminal Law',
    'Civil Law',
    'Employment Law',
    'Property Law',
    'Contract Law',
    'Immigration Law',
    'Other',
  ];

  const updateForm = (id: string, field: keyof CaseForm, value: any) => {
    setForms(forms.map(form =>
      form.id === id ? { ...form, [field]: value } : form
    ));
  };

  const removeForm = (id: string) => {
    setForms(forms.filter(form => form.id !== id));
  };

  const addForm = () => {
    const newForm: CaseForm = {
      id: Date.now().toString(),
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      legalIssue: '',
      caseDescription: '',
      location: '',
      urgency: 'MEDIUM',
      estimatedDuration: '',
      compensationMin: '',
      compensationMax: '',
      compensationCurrency: 'USD',
      tags: '',
      attachments: [],
    };
    setForms([...forms, newForm]);
  };

  const postForm = async (id: string) => {
    const form = forms.find(f => f.id === id);
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    const clientId = userData ? JSON.parse(userData).id : null;

    if (!token || !clientId) {
      alert('You must be logged in to submit a case.');
      return;
    }

    if (form) {
      try {
        const response = await fetch('/api/cases/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            clientId,
            // clientName: form.clientName,
            // clientEmail: form.clientEmail,
            // clientPhone: form.clientPhone,
            legalIssue: form.legalIssue,
            caseDescription: form.caseDescription,
            location: form.location,
            urgency: form.urgency,
            estimatedDuration: form.estimatedDuration,
            compensationMin: form.compensationMin ? parseFloat(form.compensationMin) : null,
            compensationMax: form.compensationMax ? parseFloat(form.compensationMax) : null,
            compensationCurrency: form.compensationCurrency,
            tags: form.tags,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Case submitted successfully:', result);

          // Move form to posted list
          setPosted([...posted, form]);
          setForms(forms.filter(f => f.id !== id));

          // Show success message
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 5000);
        } else {
          const error = await response.json();
          console.error('Failed to submit case:', error);
          alert(`Failed to submit case: ${error.error || 'Please try again.'}`);
        }
      } catch (error) {
        console.error('Error submitting case:', error);
        alert('Network error. Please check your connection and try again.');
      }
    }
  };

  const saveToDrafts = (id: string) => {
    // In a real app, this would save to a database
    console.log('Saving to drafts:', forms.find(f => f.id === id));
  };

  const clearAllApplications = () => {
    setForms([]);
    setPosted([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Sidebar />

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          <div className="flex items-center space-x-2">
            <Check className="w-5 h-5" />
            <span>Case submitted successfully!</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">unseen.</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* Left and Center Forms */}
        <div className="lg:col-span-2 space-y-6">
          {forms.map((form) => (
            <div key={form.id} className="bg-green-50 rounded-lg p-6 relative">
              <button
                onClick={() => removeForm(form.id)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                {/* Client Information */}
                {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name/Nickname (optional)
                    </label>
                    <input
                      type="text"
                      value={form.clientName}
                      onChange={(e) => updateForm(form.id, 'clientName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter your name or nickname"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email (optional)
                    </label>
                    <input
                      type="email"
                      value={form.clientEmail}
                      onChange={(e) => updateForm(form.id, 'clientEmail', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      value={form.clientPhone}
                      onChange={(e) => updateForm(form.id, 'clientPhone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div> */}

                {/* Legal Issue */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Legal Issue
                  </label>
                  <select
                    value={form.legalIssue}
                    onChange={(e) => updateForm(form.id, 'legalIssue', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select a legal issue</option>
                    {legalIssues.map((issue) => (
                      <option key={issue} value={issue}>
                        {issue}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Case Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Case Description
                  </label>
                  <textarea
                    value={form.caseDescription}
                    onChange={(e) => updateForm(form.id, 'caseDescription', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Describe your legal case in detail..."
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location (optional)
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => updateForm(form.id, 'location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your location"
                  />
                </div>

                {/* Urgency Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Urgency Level
                  </label>
                  <select
                    value={form.urgency}
                    onChange={(e) => updateForm(form.id, 'urgency', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="LOW">Low Priority</option>
                    <option value="MEDIUM">Medium Priority</option>
                    <option value="HIGH">High Priority</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>

                {/* Estimated Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Duration (optional)
                  </label>
                  <input
                    type="text"
                    value={form.estimatedDuration}
                    onChange={(e) => updateForm(form.id, 'estimatedDuration', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., 3-6 months, 1 year"
                  />
                </div>

                {/* Compensation */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Min Compensation (optional)
                    </label>
                    <input
                      type="number"
                      value={form.compensationMin}
                      onChange={(e) => updateForm(form.id, 'compensationMin', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="0"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Compensation (optional)
                    </label>
                    <input
                      type="number"
                      value={form.compensationMax}
                      onChange={(e) => updateForm(form.id, 'compensationMax', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="0"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Currency
                    </label>
                    <select
                      value={form.compensationCurrency}
                      onChange={(e) => updateForm(form.id, 'compensationCurrency', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="CAD">CAD (C$)</option>
                    </select>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (optional)
                  </label>
                  <input
                    type="text"
                    value={form.tags}
                    onChange={(e) => updateForm(form.id, 'tags', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., divorce, custody, property dispute"
                  />
                </div>

                {/* Attachments */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Attachments (optional)
                  </label>
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                      <Paperclip className="w-4 h-4" />
                      <span>Add files</span>
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={() => postForm(form.id)}
                    disabled={!form.legalIssue || !form.caseDescription}
                    className={`px-6 py-2 rounded-md transition-colors ${!form.legalIssue || !form.caseDescription
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                  >
                    Post
                  </button>
                  <button
                    onClick={() => saveToDrafts(form.id)}
                    className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Save to Drafts
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Add New Form Button */}
          <button
            onClick={addForm}
            className="w-full bg-green-50 border-2 border-dashed border-green-300 rounded-lg p-6 text-green-600 hover:bg-green-100 transition-colors"
          >
            <Plus className="w-8 h-8 mx-auto mb-2" />
            <span className="text-lg font-medium">Add New Case</span>
          </button>
        </div>

        {/* Right Section - Posted */}
        <div className="space-y-6">
          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Posted:</h3>
            <div className="min-h-[200px] bg-white rounded-md border border-gray-200 p-4">
              {posted.length === 0 ? (
                <p className="text-gray-500 text-center">No posted cases yet</p>
              ) : (
                <div className="space-y-4">
                  {posted.map((post, index) => (
                    <div key={index} className="border-b border-gray-200 pb-2">
                      <h4 className="font-medium">{post.clientName || 'Anonymous'}</h4>
                      <p className="text-sm text-gray-600">{post.legalIssue}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Clear All Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={clearAllApplications}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Clear ALL Current Applications
            </button>
            <div className="flex space-x-2">
              <button className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700">
                <Check className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700">
                <XIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 