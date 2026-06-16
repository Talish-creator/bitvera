import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';
const API = `${BACKEND_URL}/api`;

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
    // Attempt to connect to the backend
    const response = await axios.post(`${API}/ai/chat`, {
      text,
      session_id: sessionId
    });
    return response.data;
  } catch (error) {
    logError('Error sending AI message', error);
    
    // Fallback: If the backend is not reachable (e.g. on Vercel without a deployed Python backend),
    // we return a mock response instead of throwing an error that breaks the UI.
    console.warn("Backend unreachable. Returning simulated AI response.");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          response: `[Simulated Response] I received your message: "${text}". (Note: The AI backend server is currently disconnected or not deployed.)`,
          session_id: sessionId
        });
      }, 1000);
    });
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