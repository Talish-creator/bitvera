import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Send, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hello! 👋 Welcome to Vortexa - BitVera IT Solutions. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);

  // Auto-open chatbot after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const quickReplies = [
    { id: 'pricing', text: '💰 Pricing Plans', action: 'pricing' },
    { id: 'demo', text: '📅 Book a Demo', action: 'demo' },
    { id: 'contact', text: '📞 Contact Us', action: 'contact' },
    { id: 'services', text: '🛠️ Our Services', action: 'services' }
  ];

  const handleQuickReply = (action) => {
    let botResponse = '';
    
    switch(action) {
      case 'pricing':
        botResponse = 'We offer 3 plans:\n\n✨ Starter: 594 SAR/month\n💼 Professional: 2,050 SAR/month\n🚀 Enterprise: 4,028 SAR/month\n\nWould you like to know more about any specific plan?';
        break;
      case 'demo':
        botResponse = 'Great! I can help you book a demo. Please provide your name and email, or call us directly at +966 58 060 8336';
        setShowNameInput(true);
        break;
      case 'contact':
        botResponse = 'You can reach us at:\n📞 Phone: +966 58 060 8336\n📧 Email: info@bitvera.com\n\nOr chat with us on WhatsApp!';
        break;
      case 'services':
        botResponse = 'We provide:\n\n• ERP Implementation\n• CRM Integration\n• Process Automation\n• Custom Development\n• 24/7 Support\n\nWhich service interests you?';
        break;
      default:
        botResponse = 'How can I assist you further?';
    }

    addMessage(botResponse, 'bot');
  };

  const addMessage = (text, sender) => {
    const newMessage = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    addMessage(inputMessage, 'user');
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      addMessage(
        'Thank you for your message! A member of our team will respond shortly. For immediate assistance, please call +966 58 060 8336 or WhatsApp us.',
        'bot'
      );
    }, 1000);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hello! I\'m interested in learning more about Vortexa - BitVera IT Solutions.');
    window.open(`https://wa.me/966580608336?text=${message}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+966580608336';
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-cyan-500 to-teal-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group animate-bounce"
        >
          <MessageCircle size={28} className="text-white" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-500 to-teal-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="https://customer-assets.emergentagent.com/job_style-forge-111/artifacts/o13twt3g_WhatsApp%20Image%202026-06-01%20at%2017.04.10.jpeg"
                alt="Vortexa Logo"
                className="h-10 w-10 bg-white rounded-full p-1"
              />
              <div>
                <h3 className="font-semibold">Vortexa Assistant</h3>
                <p className="text-xs text-cyan-100">Online • Typically replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-500 to-teal-600 text-white'
                      : 'bg-white text-slate-800 border border-slate-200'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <div className="grid grid-cols-2 gap-2 mt-4">
                {quickReplies.map((reply) => (
                  <button
                    key={reply.id}
                    onClick={() => handleQuickReply(reply.action)}
                    className="text-sm px-3 py-2 bg-white border-2 border-cyan-500 text-cyan-600 rounded-lg hover:bg-cyan-50 transition-colors"
                  >
                    {reply.text}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-2 bg-white border-t border-slate-200 flex gap-2">
            <Button
              onClick={handleWhatsApp}
              size="sm"
              className="flex-1 bg-green-500 hover:bg-green-600 text-white"
            >
              <MessageCircle size={16} className="mr-1" />
              WhatsApp
            </Button>
            <Button
              onClick={handleCall}
              size="sm"
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Phone size={16} className="mr-1" />
              Call Now
            </Button>
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-200">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700"
              >
                <Send size={18} />
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;