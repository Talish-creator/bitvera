import React, { useState } from 'react';
import { solutionsData } from '../mock/solutions';
import { Building2, FileCheck, Network, ShoppingBag, UserSearch, Factory, Receipt, BadgeCheck, Users, Warehouse, TrendingUp, Package, X, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import BookingModal from './BookingModal';

const iconMap = {
  Building2,
  FileCheck,
  Network,
  ShoppingBag,
  UserSearch,
  Factory,
  Receipt,
  BadgeCheck,
  Users,
  Warehouse,
  TrendingUp,
  Package
};

const SolutionModal = ({ solution, isOpen, onClose }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const Icon = solution ? iconMap[solution.icon] : null;

  if (!isOpen || !solution) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {Icon && (
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                    <Icon size={32} />
                  </div>
                )}
                <div>
                  <h2 className="text-3xl font-bold">{solution.name}</h2>
                  <p className="text-sm text-indigo-100 mt-1">ERP Solution by BitVera</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="p-8">
            <p className="text-lg text-slate-600 mb-8">{solution.description}</p>

            <h3 className="text-2xl font-bold text-slate-900 mb-4">Key Features</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {solution.features.map((feature, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                  <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-200 mb-8">
              <h4 className="font-semibold text-slate-900 mb-2">Benefits</h4>
              <ul className="space-y-2 text-slate-600">
                <li>• Streamlined operations and reduced manual work</li>
                <li>• Real-time visibility and reporting</li>
                <li>• Improved accuracy and compliance</li>
                <li>• Scalable solution that grows with your business</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => {
                  onClose();
                  setIsBookingOpen(true);
                }}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white"
                size="lg"
              >
                Schedule Demo
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
                size="lg"
              >
                Close
              </Button>
            </div>

            <p className="text-center text-sm text-slate-500 mt-4">
              Need help? Call us at{' '}
              <a href="tel:+966580608336" className="text-indigo-600 hover:underline font-semibold">
                +966 58 060 8336
              </a>
            </p>
          </div>
        </div>
      </div>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
};

const Solutions = () => {
  const [selectedSolution, setSelectedSolution] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSolutionClick = (solution) => {
    setSelectedSolution(solution);
    setIsModalOpen(true);
  };

  return (
    <>
      <section id="solutions" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-indigo-900 mb-4">Solutions</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive ERP modules designed to transform every aspect of your business operations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {solutionsData.map((solution) => {
              const Icon = iconMap[solution.icon];
              return (
                <Card
                  key={solution.id}
                  onClick={() => handleSolutionClick(solution)}
                  className="cursor-pointer border-2 border-slate-200 hover:border-indigo-500 hover:shadow-xl transition-all duration-300 group"
                >
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-xl flex items-center justify-center group-hover:from-indigo-500 group-hover:to-blue-600 transition-all duration-300">
                        <Icon size={32} className="text-indigo-600 group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl group-hover:text-indigo-600 transition-colors">
                          {solution.name}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600 line-clamp-2">
                      {solution.description}
                    </CardDescription>
                    <div className="mt-4 flex items-center text-sm text-indigo-600 font-semibold group-hover:translate-x-2 transition-transform">
                      <span>Learn More</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-600 mb-4">
              Can't find what you're looking for? We offer custom solutions tailored to your needs.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white"
            >
              Contact Us for Custom Solutions
            </Button>
          </div>
        </div>
      </section>

      <SolutionModal
        solution={selectedSolution}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Solutions;