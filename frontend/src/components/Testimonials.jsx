import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from './ui/card';
import { Star } from 'lucide-react';
import { getTestimonials } from '../utils/api';
import { testimonialsData } from '../mock/data';
import { useTranslation } from 'react-i18next'; // <-- 1. Import Translation Tool

const TestimonialCard = ({ testimonial }) => {
  const { t } = useTranslation(); // <-- 2. Activate tool inside the Card

  return (
    <Card className="relative bg-[#212121] border-white/10 hover:border-[#DEDBC8]/50 hover:shadow-2xl hover:shadow-[#DEDBC8]/5 transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none mix-blend-overlay"></div>
      <CardContent className="pt-6 relative z-10">
        <div className="flex items-center mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={`star-${testimonial.id}-${i}`} size={18} className="text-[#DEDBC8] fill-[#DEDBC8]" />
          ))}
        </div>
        {/* Wrap the mock data in the translation tool */}
        <p className="text-white/80 mb-6 italic transition-colors">"{t(testimonial.content)}"</p>
        <div className="flex items-center space-x-3">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full border border-white/10"
          />
          <div>
            {/* Wrap name and position */}
            <div className="font-semibold text-[#DEDBC8] transition-colors">{t(testimonial.name)}</div>
            <div className="text-sm text-white/50 transition-colors">{t(testimonial.position)}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const LoadingSkeleton = () => (
  <Card className="bg-[#212121] border-white/10 animate-pulse transition-colors">
    <CardContent className="pt-6">
      <div className="h-4 bg-white/10 rounded w-3/4 mb-4"></div>
      <div className="h-20 bg-white/10 rounded mb-6"></div>
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-white/10 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-white/10 rounded w-2/3 mb-2"></div>
          <div className="h-3 bg-white/10 rounded w-1/2"></div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { t } = useTranslation(); // <-- 3. Activate tool for the main titles

  const fetchTestimonials = useCallback(async () => {
    try {
      // Add a 3-second timeout to prevent infinite loading if backend hangs
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timed out')), 3000)
      );
      
      const data = await Promise.race([
        getTestimonials(),
        timeoutPromise
      ]);
      
      setTestimonials(data && data.length > 0 ? data : testimonialsData);
    } catch (error) {
      // Fallback to mock data on error or timeout
      setTestimonials(testimonialsData);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  if (loading) {
    return (
      <section className="relative py-20 bg-black transition-colors duration-300">
        <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 transition-colors">
              {t('testimonials_page.title')}
            </h2>
            <p className="text-lg text-[#DEDBC8]/70 transition-colors">
              {t('testimonials_page.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <LoadingSkeleton key={`skeleton-${i}`} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 bg-black transition-colors duration-300">
      <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 transition-colors">
            {t('testimonials_page.title')}
          </h2>
          <p className="text-lg text-[#DEDBC8]/70 transition-colors">
            {t('testimonials_page.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id || testimonial.name} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;