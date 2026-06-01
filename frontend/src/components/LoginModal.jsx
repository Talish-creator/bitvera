import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from '../hooks/use-toast';

const LoginModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate login - In production, this would call your auth API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Login Successful! 🎉",
        description: "Welcome back to Vortexa!",
      });
      
      setFormData({ email: '', password: '' });
      onClose();
      
      // Redirect to admin or dashboard
      // window.location.href = '/admin';
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <div className="bg-gradient-to-r from-cyan-500 to-teal-600 p-6 text-white flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-bold">Welcome Back</h2>
            <p className="text-sm text-cyan-100 mt-1">Login to your account</p>
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
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded border-slate-300" />
              <span className="text-slate-600">Remember me</span>
            </label>
            <button type="button" className="text-cyan-600 hover:underline">
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>

          <p className="text-sm text-slate-600 text-center">
            Don't have an account?{' '}
            <button type="button" className="text-cyan-600 hover:underline font-semibold">
              Contact Sales
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;