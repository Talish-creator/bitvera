import axios from 'axios';

// Always use relative /api path so it correctly hits Vercel Serverless Functions
const API = '/api';

const logError = (context, error) => {
  // Only log in development, use proper error tracking in production
  if (process.env.NODE_ENV === 'development') {
    console.error(`${context}:`, error);
  }
  // In production, send to error tracking service (e.g., Sentry)
};

export const submitContactForm = async (formData) => {
  try {
    const response = await axios.post(`${API}/contact`, {
      name: formData.name,
      company: formData.company,
      email: formData.email,
      demo_date: formData.demoDate,
      additional_info: formData.additionalInfo
    });
    return response.data;
  } catch (error) {
    logError('Error submitting contact form', error);
    throw error;
  }
};

export const getTestimonials = async () => {
  try {
    const response = await axios.get(`${API}/testimonials`);
    return response.data.testimonials;
  } catch (error) {
    logError('Error fetching testimonials', error);
    throw error;
  }
};

export const subscribeNewsletter = async (email) => {
  try {
    const response = await axios.post(`${API}/newsletter`, { email });
    return response.data;
  } catch (error) {
    logError('Error subscribing to newsletter', error);
    throw error;
  }
};

export const createCheckoutSession = async (checkoutData) => {
  try {
    const response = await axios.post(`${API}/payment/checkout`, checkoutData);
    return response.data;
  } catch (error) {
    logError('Error creating checkout session', error);
    throw error;
  }
};

export const getPaymentStatus = async (sessionId) => {
  try {
    const response = await axios.get(`${API}/payment/status/${sessionId}`);
    return response.data;
  } catch (error) {
    logError('Error fetching payment status', error);
    throw error;
  }
};

// AI Chat API
export const sendAIMessage = async (text, sessionId = 'default') => {
  try {
    const response = await axios.post(`${API}/ai/chat`, {
      text,
      session_id: sessionId
    });
    return response.data;
  } catch (error) {
    logError('Error sending AI message', error);
    throw error;
  }
};

export const getChatHistory = async (sessionId) => {
  try {
    const response = await axios.get(`${API}/ai/chat/history/${sessionId}`);
    return response.data.history;
  } catch (error) {
    logError('Error fetching chat history', error);
    throw error;
  }
};

export const clearChatHistory = async (sessionId) => {
  try {
    const response = await axios.delete(`${API}/ai/chat/history/${sessionId}`);
    return response.data;
  } catch (error) {
    logError('Error clearing chat history', error);
    throw error;
  }
};