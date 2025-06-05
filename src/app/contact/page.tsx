"use client";

import { useState, useEffect } from 'react';
import { Mail, MapPin, Phone, Calendar, CheckCircle, X, CreditCard } from 'lucide-react';

// TypeScript interfaces
interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface PaymentData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

interface FormErrors {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface PaymentErrors {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface InitializeBookingResponse {
  success: boolean;
  orderId: string;
  amount: number;
  currency: string;
  razorpayKeyId: string;
  paymentId: string;
  message?: string;
  error?: string;
}

interface VerifyPaymentResponse {
  success: boolean;
  message?: string;
  schedulingUrl?: string;
  bookingId?: string;
  error?: string;
}

type LoaderState = 'loading' | 'success' | 'error';
type ValidatedField = 'name' | 'customerName' | 'email' | 'customerEmail' | 'phone' | 'customerPhone' | 'message';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function ContactSection() {
  // API Configuration
  const API_BASE_URL: string = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://16.16.217.38';
  
  const [showToast, setShowToast] = useState<boolean>(false);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [loaderState, setLoaderState] = useState<LoaderState>('loading');
  const [loaderText, setLoaderText] = useState<string>('Processing...');
  const [loaderSubtext, setLoaderSubtext] = useState<string>('Please wait while we process your request');
  const [currentPaymentId, setCurrentPaymentId] = useState<string | null>(null);
  const [calendlyUrl, setCalendlyUrl] = useState<string>('');
  const [countdownTimer, setCountdownTimer] = useState<NodeJS.Timeout | null>(null);

  // Contact form state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  // Payment form state
  const [paymentData, setPaymentData] = useState<PaymentData>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
  });

  const [paymentErrors, setPaymentErrors] = useState<PaymentErrors>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
  });

  const validateField = (name: ValidatedField, value: string): string => {
    let error = '';
    switch (name) {
      case 'name':
      case 'customerName':
        if (!value.trim()) error = 'Name is required';
        break;
      case 'email':
      case 'customerEmail':
        if (!value) error = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(value)) error = 'Invalid email address';
        break;
      case 'phone':
      case 'customerPhone':
        if (!value) error = 'Phone is required';
        else if (!/^\d{10}$/.test(value)) error = 'Phone must be 10 digits';
        break;
      case 'message':
        if (!value.trim()) error = 'Message is required';
        else if (value.trim().length < 10) error = 'Message must be at least 10 characters';
        break;
    }
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name as ValidatedField, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setPaymentData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name as ValidatedField, value);
    setPaymentErrors(prev => ({ ...prev, [name]: error }));
  };

  const isFormValid: boolean = Object.values(errors).every(err => !err) &&
                      Object.values(formData).every(val => val.trim() !== '');

  const isPaymentFormValid: boolean = Object.values(paymentErrors).every(err => !err) &&
                            Object.values(paymentData).every(val => val.trim() !== '');

  const handleSubmit = async (): Promise<void> => {
    if (!isFormValid) return;

    try {
      showFullscreenLoader('Submitting Form...', 'Please wait while we process your request');

      const response = await fetch(`${API_BASE_URL}/api/submit-form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.name,
          phoneNumber: formData.phone,
          email: formData.email,
          city: 'Not Specified', // You might want to add a city field to your form
          subject: formData.message
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.message === 'Form submitted successfully') {
        showSuccessLoader('Form Submitted!', 'Thank you for contacting us. We will get back to you soon.');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit form';
      showErrorLoader('Submission Failed', errorMessage);
    }
  };

  const showFullscreenLoader = (
    text: string = 'Processing...', 
    subtext: string = 'Please wait while we process your request', 
    state: LoaderState = 'loading'
  ): void => {
    setLoaderText(text);
    setLoaderSubtext(subtext);
    setLoaderState(state);
    setShowLoader(true);
  };

  const hideFullscreenLoader = (): void => {
    setShowLoader(false);
  };

  const showSuccessLoader = (
    text: string = 'Success!', 
    subtext: string = 'Your request has been processed successfully'
  ): void => {
    setLoaderState('success');
    setLoaderText(text);
    setLoaderSubtext(subtext);
    setTimeout(hideFullscreenLoader, 2000);
  };

  const showErrorLoader = (
    text: string = 'Error Occurred', 
    subtext: string = 'Something went wrong. Please try again.'
  ): void => {
    setLoaderState('error');
    setLoaderText(text);
    setLoaderSubtext(subtext);
    setTimeout(hideFullscreenLoader, 3000);
  };

  const initializePayment = async (): Promise<void> => {
    if (!isPaymentFormValid) return;

    try {
      showFullscreenLoader('Initializing Payment...', 'Setting up your payment details');

    

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/booking/initialize-booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: paymentData.customerName,
          customerEmail: paymentData.customerEmail,
          customerPhone: paymentData.customerPhone,
          amount: 999
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseText = await response.text();
      let data: InitializeBookingResponse;
      
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        throw new Error('Invalid response from server');
      }

      if (!data.success) {
        throw new Error(data.message || data.error || 'Failed to initialize booking');
      }

      // Store payment ID in a closure to ensure it's available during verification
      const paymentId = data.paymentId;
      setCurrentPaymentId(paymentId);
     

      hideFullscreenLoader();

      // Initialize Razorpay
      const options = {
        key: data.razorpayKeyId,
        amount: data.amount,
        currency: data.currency,
        name: 'NEET Counseling',
        description: 'Consultation Fee',
        order_id: data.orderId,
        prefill: {
          name: paymentData.customerName,
          email: paymentData.customerEmail,
          contact: paymentData.customerPhone
        },
        theme: { color: '#8b5cf6' },
        handler: function (response: RazorpayResponse) {
          // Use the closure variable instead of currentPaymentId state
          if (!paymentId) {
          
            showErrorLoader('Payment Error', 'Payment ID is missing. Please try again.');
            return;
          }
          verifyPayment(response, paymentId);
        },
        modal: {
          ondismiss: function() {
            handlePaymentFailure('Payment cancelled by user');
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
     
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      showErrorLoader('Initialization Failed', errorMessage);
    }
  };

  const verifyPayment = async (response: RazorpayResponse, paymentId: string): Promise<void> => {
    try {
      if (!paymentId) {
        throw new Error('Payment ID is missing');
      }

      showFullscreenLoader('Verifying Payment...', 'Please wait while we confirm your payment');

      const verificationData = {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        paymentId: paymentId
      };

    
      const verifyResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/booking/verify-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(verificationData),
      });

      if (!verifyResponse.ok) {
        throw new Error(`HTTP error! status: ${verifyResponse.status}`);
      }

      const responseText = await verifyResponse.text();
      let data: VerifyPaymentResponse;
      
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        throw new Error('Invalid response from server');
      }

      if (data.success === true) {
        showSuccessLoader('Payment Successful!', 'Redirecting to scheduling...');
        
        setTimeout(() => {
          if (data.schedulingUrl) {
            setCalendlyUrl(data.schedulingUrl);
            setShowPaymentModal(false);
            startCountdown(data.schedulingUrl);
          }
        }, 2000);
      } else {
        throw new Error(data.message || data.error || 'Payment verification failed');
      }

    } catch (error) {
     
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      showErrorLoader('Payment Verification Failed', errorMessage);
    }
  };

  const handlePaymentFailure = async (error: string): Promise<void> => {
    showErrorLoader('Payment Failed', error);
    
    if (currentPaymentId) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/booking/payment-failed`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentId: currentPaymentId,
            error: error
          }),
        });
      } catch (err) {
       
      }
    }
  };

  const startCountdown = (url: string): void => {
    let countdown = 5;
    const timer = setInterval(() => {
      countdown--;
      if (countdown <= 0) {
        clearInterval(timer);
        window.open(url, '_blank');
        setCountdownTimer(null);
      }
    }, 1000);
    setCountdownTimer(timer);
  };

  const cancelCountdown = (): void => {
    if (countdownTimer) {
      clearInterval(countdownTimer);
      setCountdownTimer(null);
    }
  };

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
     
    };
    script.onerror = (error) => {
     
    };
    document.body.appendChild(script);

    // Log API configuration for debugging
    if (process.env.NODE_ENV === 'development') {
     
    }

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div id="contact" className="bg-[#9B87F50F] py-20 px-6">
      {showToast && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-3 rounded-lg flex items-center shadow-lg z-50">
          <CheckCircle size={18} className="mr-2" />
          Form submitted successfully!
        </div>
      )}

      {/* Fullscreen Loader */}
      {showLoader && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-12 rounded-3xl text-center shadow-2xl max-w-md w-11/12">
            {loaderState === 'loading' && (
              <div className="w-16 h-16 border-4 border-gray-300 border-t-purple-500 rounded-full animate-spin mx-auto mb-6"></div>
            )}
            {loaderState === 'success' && (
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <CheckCircle size={32} className="text-white" />
              </div>
            )}
            {loaderState === 'error' && (
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <X size={32} className="text-white" />
              </div>
            )}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{loaderText}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{loaderSubtext}</p>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <CreditCard className="mr-2 text-purple-500" size={24} />
                Schedule Your Call
              </h2>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-500 hover:text-gray-700 p-1"
                type="button"
              >
                <X size={24} />
              </button>
            </div>

            <p className="text-gray-600 mb-6">Complete payment to book your consultation slot</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="customerName"
                  value={paymentData.customerName}
                  onChange={handlePaymentChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black"
                  required
                />
                {paymentErrors.customerName && <span className="text-red-500 text-xs">{paymentErrors.customerName}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="customerEmail"
                  value={paymentData.customerEmail}
                  onChange={handlePaymentChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black"
                  required
                />
                {paymentErrors.customerEmail && <span className="text-red-500 text-xs">{paymentErrors.customerEmail}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="customerPhone"
                  value={paymentData.customerPhone}
                  onChange={handlePaymentChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black"
                  required
                />
                {paymentErrors.customerPhone && <span className="text-red-500 text-xs">{paymentErrors.customerPhone}</span>}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600">Consultation Fee</div>
                <div className="text-3xl font-bold text-green-600">₹999</div>
              </div>

              <button
                onClick={initializePayment}
                disabled={!isPaymentFormValid}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200"
                type="button"
              >
                💳 Pay & Schedule Call
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Calendly Modal */}
      {calendlyUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">You can now schedule your consultation call.</p>
            
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200 mb-4"
            >
              📅 Schedule Your Call Now
            </a>

            {countdownTimer && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Opening Calendly automatically in 5 seconds...</p>
                <button
                  onClick={cancelCountdown}
                  className="text-red-500 text-sm hover:text-red-700"
                  type="button"
                >
                  Cancel Auto-Redirect
                </button>
              </div>
            )}

            <button
              onClick={() => setCalendlyUrl('')}
              className="text-gray-500 hover:text-gray-700"
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-3">
        <div className="text-center mb-12">
           <h2 className="text-[clamp(28px,4vw,36px)] font-bold font-poppins text-[#1f1f1f] mb-3">
    Have <span className="bg-gradient-to-r from-[#9B87F5] to-[#7E69AB] bg-clip-text text-transparent">Questions?</span> Get in Touch
  </h2>
  <p className="text-[clamp(14px,2vw,18px)] font-normal font-inter text-gray-600 max-w-[720px] mx-auto mb-12">
    Our team is ready to answer any questions you might have about our NEET counseling services.
  </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a message</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black"
                />
                {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black"
                />
                {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black"
                />
                {errors.phone && <span className="text-red-500 text-xs">{errors.phone}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black"
                />
                {errors.message && <span className="text-red-500 text-xs">{errors.message}</span>}
              </div>

              <button
                onClick={handleSubmit}
                disabled={!isFormValid}
                className="w-full text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
  style={{ backgroundColor: "#803F98" }}
                type="button"
              >
                Submit
              </button>
            </div>
          </div>

          {/* Contact Info & Booking */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone size={20} className="text-purple-500 mt-1" />
                  <div>
                    <p className="font-medium text-gray-800">Phone</p>
                    <p className="text-gray-600">+91 9876543210</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail size={20} className="text-purple-500 mt-1" />
                  <div>
                    <p className="font-medium text-gray-800">Email</p>
                    <p className="text-gray-600">contact@predicto.tier.app</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin size={20} className="text-purple-500 mt-1" />
                  <div>
                    <p className="font-medium text-gray-800">Office Address</p>
                    <p className="text-gray-600">
                      123 Main Street, Bangalore<br />
                      Karnataka, India - 560001
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Book Consultation */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Book a Consultation</h3>
              <p className="text-gray-600 mb-6">
                Schedule a 30-minute consultation with our expert counselors to discuss your NEET journey.
              </p>
             <button
  onClick={() => setShowPaymentModal(true)}
  type="button"
  className="w-full text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 hover:opacity-90"
  style={{ backgroundColor: "#803F98" }}
>
  <Calendar size={16} />
  <span>Book via Calendly</span>
</button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}