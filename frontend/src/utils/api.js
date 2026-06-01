import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const logError = (context, error) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(`${context}:`, error);
  }
};

// Contact API
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

// Testimonials API
export const getTestimonials = async () => {
  try {
    const response = await axios.get(`${API}/testimonials`);
    return response.data.testimonials;
  } catch (error) {
    logError('Error fetching testimonials', error);
    throw error;
  }
};

// Newsletter API
export const subscribeNewsletter = async (email) => {
  try {
    const response = await axios.post(`${API}/newsletter`, { email });
    return response.data;
  } catch (error) {
    logError('Error subscribing to newsletter', error);
    throw error;
  }
};

// Payment API
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