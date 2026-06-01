import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

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
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

// Testimonials API
export const getTestimonials = async () => {
  try {
    const response = await axios.get(`${API}/testimonials`);
    return response.data.testimonials;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    throw error;
  }
};

// Newsletter API
export const subscribeNewsletter = async (email) => {
  try {
    const response = await axios.post(`${API}/newsletter`, { email });
    return response.data;
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw error;
  }
};
