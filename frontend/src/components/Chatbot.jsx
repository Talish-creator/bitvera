import React, { useState, useEffect, useRef } from 'react';
import { X, MessageCircle, Send, Phone, Sparkles, Loader2, Bot } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { sendAIMessage } from '../utils/api';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';

const Chatbot = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: t('Hello! 👋 Welcome to Bitvera. I\'m your AI assistant. How can I help you today?'),
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
  }, [messages, isTyping]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const quickReplies = [
    { id: 'pricing', text: '💰 ' + t('Pricing Plans'), query: 'What are your pricing plans?' },
    { id: 'demo', text: '📅 ' + t('Book a Demo'), query: 'I want to book a demo' },
    { id: 'contact', text: '📞 ' + t('Contact'), query: 'How can I contact you?' },
    { id: 'services', text: '🛠️ ' + t('Services'), query: 'What services do you provide?' }
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
      const context = {
        url: window.location.href,
        language: i18n.language
      };
      const response = await sendAIMessage(userText, sessionId, context);
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
    const message = encodeURIComponent('Hello! I\'m interested in learning more about Bitvera.');
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
          className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-tr from-cyan-500 to-teal-600 rounded-full shadow-[0_8px_30px_rgb(6,182,212,0.4)] hover:shadow-[0_8px_30px_rgb(6,182,212,0.6)] hover:scale-105 transition-all duration-300 flex items-center justify-center group"
        >
          <Bot size={32} className="text-white transform group-hover:rotate-12 transition-transform duration-300" />
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-white rounded-full animate-pulse"></span>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm sm:w-96 h-[650px] max-h-[85vh] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800 ring-1 ring-slate-900/5 dark:ring-white/5 transition-all duration-500 ease-in-out">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-600 to-teal-600 p-5 text-white flex items-center justify-between relative overflow-hidden shrink-0">
            <div className="absolute top-0 left-0 w-full h-full bg-white/10 blur-2xl transform -skew-y-12"></div>
            <div className="flex items-center space-x-3 relative z-10">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-inner">
                <Sparkles size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg flex items-center gap-2 tracking-tight">
                  {t('AI Assistant')}
                </h3>
                <p className="text-xs text-cyan-50 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  {t('Online • Smart Context')}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-full p-2 transition-colors relative z-10"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50/50 dark:bg-slate-800/50 transition-colors">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-5 py-3 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-md rounded-br-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700 rounded-bl-sm prose prose-sm prose-slate dark:prose-invert max-w-none transition-colors'
                  }`}
                >
                  {message.sender === 'bot' ? (
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                  ) : (
                    <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                  )}
                  <span className={`text-[10px] mt-2 block ${message.sender === 'user' ? 'text-cyan-100 text-right' : 'text-slate-400 text-left'}`}>
                    {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start animate-in fade-in duration-300">
                <div className="bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 shadow-sm rounded-2xl rounded-bl-sm px-5 py-4 flex items-center space-x-2 transition-colors">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies Strip */}
          {!isTyping && (
            <div className="px-3 pb-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 pt-3 overflow-x-auto whitespace-nowrap flex gap-2 shrink-0 transition-colors">
              {quickReplies.map((reply) => (
                <button
                  key={reply.id}
                  onClick={() => handleQuickReply(reply.query)}
                  className="inline-flex items-center text-xs px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-full hover:bg-cyan-50 dark:hover:bg-cyan-900/50 hover:text-cyan-700 dark:hover:text-cyan-400 hover:border-cyan-200 dark:hover:border-cyan-700 transition-all shadow-sm flex-shrink-0 font-medium"
                >
                  {reply.text}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shadow-[0_-10px_20px_-15px_rgba(0,0,0,0.1)] shrink-0 transition-colors">
            <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800 rounded-full px-2 py-2 border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-cyan-500/20 focus-within:border-cyan-500 transition-all">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={t("Type your message...")}
                className="flex-1 bg-transparent border-none shadow-none focus-visible:ring-0 px-3 h-10 text-sm dark:text-white transition-colors"
                disabled={isTyping}
              />
              <Button
                type="submit"
                size="icon"
                className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full w-10 h-10 shadow-md transition-transform active:scale-95 flex-shrink-0"
                disabled={isTyping || !inputMessage.trim()}
              >
                {isTyping ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="ml-1" />}
              </Button>
            </div>
            
            <div className="flex justify-center gap-4 mt-3">
              <button
                type="button"
                onClick={handleWhatsApp}
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-green-600 flex items-center gap-1 transition-colors font-medium"
              >
                <MessageCircle size={14} /> WhatsApp
              </button>
              <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 transition-colors"></div>
              <button
                type="button"
                onClick={handleCall}
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 flex items-center gap-1 transition-colors font-medium"
              >
                <Phone size={14} /> {t('Call Us')}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;