import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { submitContactForm } from '../utils/api';
import { toast } from '../hooks/use-toast';

const BookingModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    demoDate: '',
    additionalInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await submitContactForm(formData);
      
      if (result.success) {
        toast({
          title: "Success! 🎉",
          description: result.message,
        });
        
        setFormData({
          name: '',
          company: '',
          email: '',
          demoDate: '',
          additionalInfo: ''
        });
        onClose();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again or call us at +966 58 060 8336.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-cyan-500 to-teal-600 p-6 text-white flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Book Free Consultation</h2>
            <p className="text-sm text-cyan-100 mt-1">Let's discuss your ERP needs</p>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label htmlFor="company">Company Name *</Label>
            <Input
              id="company"
              placeholder="Your Company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label htmlFor="email">Business Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label htmlFor="demoDate">Preferred Date *</Label>
            <Input
              id="demoDate"
              type="date"
              value={formData.demoDate}
              onChange={(e) => setFormData({ ...formData, demoDate: e.target.value })}
              required
              disabled={isSubmitting}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <Label htmlFor="additionalInfo">Tell us about your needs</Label>
            <Textarea
              id="additionalInfo"
              placeholder="What challenges are you facing? What are your goals?"
              value={formData.additionalInfo}
              onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
              rows={4}
              disabled={isSubmitting}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Book Consultation'}
            </Button>
          </div>

          <p className="text-xs text-slate-500 text-center mt-4">
            Or call us directly at{' '}
            <a href="tel:+966580608336" className="text-cyan-600 hover:underline font-semibold">
              +966 58 060 8336
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;