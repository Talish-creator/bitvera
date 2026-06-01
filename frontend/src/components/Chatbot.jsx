import React, { useState, useEffect, useRef } from 'react';
import { X, MessageCircle, Send, Phone, Sparkles, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { sendAIMessage } from '../utils/api';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hello! 👋 Welcome to Vortexa - BitVera IT Solutions. I\'m your AI assistant powered by GPT-5.4. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => `session-${Date.now()}`);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const quickReplies = [
    { id: 'pricing', text: '💰 Pricing Plans', query: 'What are your pricing plans?' },
    { id: 'demo', text: '📅 Book a Demo', query: 'I want to book a demo' },
    { id: 'contact', text: '📞 Contact', query: 'How can I contact you?' },
    { id: 'services', text: '🛠️ Services', query: 'What services do you provide?' }
  ];

  const handleQuickReply = async (query) => {
    addMessage(query, 'user');
    await getAIResponse(query);
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

  const getAIResponse = async (userText) => {
    setIsTyping(true);
    try {
      const response = await sendAIMessage(userText, sessionId);
      addMessage(response.response, 'bot');
    } catch (error) {
      addMessage(
        'I apologize, but I\'m having trouble connecting right now. Please call us at +966 58 060 8336 for immediate assistance.',
        'bot'
      );
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isTyping) return;

    const userText = inputMessage;
    setInputMessage('');
    addMessage(userText, 'user');
    await getAIResponse(userText);
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
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-cyan-500 to-teal-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group animate-bounce"
        >
          <MessageCircle size={28} className="text-white" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></span>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
          <div className="bg-gradient-to-r from-cyan-500 to-teal-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Sparkles size={24} className="text-cyan-600" />
              </div>
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  AI Assistant
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">GPT-5.4</span>
                </h3>
                <p className="text-xs text-cyan-100">Online • AI-Powered</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

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
                      : 'bg-white text-slate-800 border border-slate-200 shadow-sm'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-slate-800 border border-slate-200 shadow-sm rounded-2xl px-4 py-2 flex items-center space-x-2">
                  <Loader2 size={16} className="animate-spin text-cyan-600" />
                  <span className="text-sm">AI is thinking...</span>
                </div>
              </div>
            )}

            {messages.length <= 2 && !isTyping && (
              <div className="grid grid-cols-2 gap-2 mt-4">
                {quickReplies.map((reply) => (
                  <button
                    key={reply.id}
                    onClick={() => handleQuickReply(reply.query)}
                    className="text-sm px-3 py-2 bg-white border-2 border-cyan-500 text-cyan-600 rounded-lg hover:bg-cyan-50 transition-colors"
                  >
                    {reply.text}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

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

          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-200">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                type="submit"
                size="icon"
                className="bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700"
                disabled={isTyping}
              >
                {isTyping ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;