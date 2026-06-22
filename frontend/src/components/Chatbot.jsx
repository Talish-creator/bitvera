import React, { useState, useEffect, useRef } from 'react';
import { X, MessageCircle, Send, Phone, Sparkles, Loader2, Bot } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';

const Chatbot = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: t('chatbot.welcome'),
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
    { id: 'pricing', text: '💰 ' + t('chatbot.pricing_plans'), query: 'What are your pricing plans?' },
    { id: 'zatca', text: '🧾 ' + t('chatbot.quick_zatca'), query: 'Is the system ZATCA compliant?' },
    { id: 'customization', text: '⚙️ ' + t('chatbot.quick_customization'), query: 'Can you customize the ERP?' },
    { id: 'demo', text: '📅 ' + t('chatbot.book_demo'), query: 'I want to book a demo' },
    { id: 'services', text: '🛠️ ' + t('chatbot.services'), query: 'What services do you provide?' }
  ];

  const handleQuickReply = async (query) => {
    addMessage(query, 'user');
    setIsTyping(true);
    const response = await getAIResponse(query);
    setIsTyping(false);
    addMessage(response, 'bot');
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

  const generateLocalAIResponse = (text) => {
    const lowerText = text.toLowerCase();
    
    // Financial & ZATCA
    if (lowerText.includes('price') || lowerText.includes('cost') || lowerText.includes('plan')) {
      return t('chatbot.response_pricing');
    }
    if (lowerText.includes('zatca') || lowerText.includes('tax') || lowerText.includes('invoice') || lowerText.includes('invoicing')) {
      return t('chatbot.response_zatca');
    }
    if (lowerText.includes('accounting') || lowerText.includes('finance')) {
      return t('chatbot.response_accounting');
    }

    // Specific Modules
    if (lowerText.includes('hr ') || lowerText.includes('human') || lowerText.includes('payroll') || lowerText.includes('attendance') || lowerText.includes('leave')) {
      return t('chatbot.response_hr');
    }
    if (lowerText.includes('inventory') || lowerText.includes('warehouse') || lowerText.includes('stock')) {
      return t('chatbot.response_inventory');
    }
    if (lowerText.includes('manufactur') || lowerText.includes('production') || lowerText.includes('bom')) {
      return t('chatbot.response_manufacturing');
    }
    if (lowerText.includes('pos ') || lowerText.includes('point of sale') || lowerText.includes('retail')) {
      return t('chatbot.response_pos');
    }

    // Technical & Service Inquiries
    if (lowerText.includes('custom') || lowerText.includes('modify') || lowerText.includes('tailor')) {
      return t('chatbot.response_customization');
    }
    if (lowerText.includes('time') || lowerText.includes('long') || lowerText.includes('implement')) {
      return t('chatbot.response_implementation');
    }
    if (lowerText.includes('train') || lowerText.includes('learn') || lowerText.includes('manual')) {
      return t('chatbot.response_training');
    }
    if (lowerText.includes('migrat') || lowerText.includes('transfer') || lowerText.includes('old system') || lowerText.includes('odoo')) {
      return t('chatbot.response_migration');
    }
    if (lowerText.includes('language') || lowerText.includes('arabic') || lowerText.includes('english')) {
      return t('chatbot.response_languages');
    }
    if (lowerText.includes('mobile') || lowerText.includes('app ') || lowerText.includes('ios') || lowerText.includes('android')) {
      return t('chatbot.response_mobile');
    }
    if (lowerText.includes('host') || lowerText.includes('cloud') || lowerText.includes('server') || lowerText.includes('premise')) {
      return t('chatbot.response_hosting');
    }
    if (lowerText.includes('integrat') || lowerText.includes('shopify') || lowerText.includes('woocommerce') || lowerText.includes('api')) {
      return t('chatbot.response_integration');
    }

    // General
    if (lowerText.includes('demo') || lowerText.includes('book') || lowerText.includes('schedule')) {
      return t('chatbot.response_demo');
    }
    if (lowerText.includes('contact') || lowerText.includes('call') || lowerText.includes('support') || lowerText.includes('sla')) {
      return lowerText.includes('support') ? t('chatbot.response_support') : t('chatbot.response_contact');
    }
    if (lowerText.includes('service') || lowerText.includes('erp') || lowerText.includes('offer')) {
      return t('chatbot.response_services');
    }
    if (lowerText.includes('hello') || lowerText.includes('hi ') || lowerText.includes('hey')) {
      return t('chatbot.response_greeting');
    }
    
    return t('chatbot.response_default');
  };

  const getAIResponse = async (userText) => {
    setIsTyping(true);
    try {
      // Simulate network processing delay for realism (300-600ms)
      await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 200));
      
      const response = generateLocalAIResponse(userText);
      addMessage(response, 'bot');
    } catch (error) {
      addMessage(
        t('chatbot.error_message'),
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
          className="fixed bottom-6 end-6 z-50 w-16 h-16 bg-surface-raised border border-border-glass/10 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_8px_30px_rgba(222,219,200,0.2)] hover:scale-105 transition-all duration-300 flex items-center justify-center group"
        >
          <Bot size={32} className="text-text-accent transform group-hover:rotate-12 transition-transform duration-300" />
          <span className="absolute top-0 end-0 w-4 h-4 bg-text-accent border-2 border-surface-raised rounded-full animate-pulse"></span>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 end-6 z-50 w-full max-w-sm sm:w-96 h-[650px] max-h-[85vh] bg-surface-raised/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden border border-border-glass/10 ring-1 ring-white/5 transition-all duration-500 ease-in-out">
          {/* Header */}
          <div className="bg-surface-raised border-b border-border-glass/10 p-5 text-text-accent flex items-center justify-between relative overflow-hidden shrink-0">
            <div className="absolute top-0 start-0 w-full h-full bg-white/5 blur-2xl transform -skew-y-12"></div>
            <div className="flex items-center space-x-3 relative z-10">
              <div className="w-12 h-12 bg-surface-elevated rounded-full flex items-center justify-center border border-border-glass/10 shadow-inner">
                <Sparkles size={24} className="text-text-accent" />
              </div>
              <div>
                <h3 className="font-bold text-lg flex items-center gap-2 tracking-tight text-text-accent">
                  {t('chatbot.ai_assistant')}
                </h3>
                <p className="text-xs text-text-accent/70 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 bg-text-accent rounded-full animate-pulse"></span>
                  {t('chatbot.status')}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/10 rounded-full p-2 transition-colors relative z-10 text-text-accent"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-surface-main/50 transition-colors">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-5 py-3 ${
                    message.sender === 'user'
                      ? 'bg-text-accent text-black shadow-md rounded-br-sm'
                      : 'bg-surface-elevated text-text-accent shadow-sm border border-border-glass/10 rounded-bl-sm prose prose-sm prose-invert max-w-none transition-colors'
                  }`}
                >
                  {message.sender === 'bot' ? (
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                  ) : (
                    <p className="text-sm whitespace-pre-line leading-relaxed font-medium">{message.text}</p>
                  )}
                  <span className={`text-[10px] mt-2 block ${message.sender === 'user' ? 'text-black/60 text-end' : 'text-text-accent/50 text-start'}`}>
                    {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start animate-in fade-in duration-300">
                <div className="bg-surface-elevated text-text-accent/70 border border-border-glass/10 shadow-sm rounded-2xl rounded-bl-sm px-5 py-4 flex items-center space-x-2 transition-colors">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-text-accent rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-text-accent rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-text-accent rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies Strip */}
          {!isTyping && (
            <div className="px-3 pb-3 bg-surface-raised border-t border-border-glass/10 pt-3 overflow-x-auto whitespace-nowrap flex gap-2 shrink-0 transition-colors">
              {quickReplies.map((reply) => (
                <button
                  key={reply.id}
                  onClick={() => handleQuickReply(reply.query)}
                  className="inline-flex items-center text-xs px-4 py-2 bg-surface-elevated border border-border-glass/10 text-text-accent rounded-full hover:bg-text-accent hover:text-black hover:border-text-accent transition-all shadow-sm flex-shrink-0 font-medium"
                >
                  {reply.text}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 bg-surface-raised border-t border-border-glass/10 shadow-[0_-10px_20px_-15px_rgba(0,0,0,0.5)] shrink-0 transition-colors">
            <div className="flex items-center space-x-2 bg-surface-elevated rounded-full px-2 py-2 border border-border-glass/10 focus-within:border-text-accent transition-all">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={t('chatbot.placeholder')}
                className="flex-1 bg-transparent border-none shadow-none focus-visible:ring-0 px-3 h-10 text-sm text-text-accent placeholder:text-text-accent/40 transition-colors"
                disabled={isTyping}
              />
              <Button
                type="submit"
                size="icon"
                className="bg-text-accent hover:bg-text-accent/90 text-black rounded-full w-10 h-10 shadow-md transition-transform active:scale-95 flex-shrink-0"
                disabled={isTyping || !inputMessage.trim()}
              >
                {isTyping ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="ms-1" />}
              </Button>
            </div>
            
            <div className="flex justify-center gap-4 mt-3">
              <button
                type="button"
                onClick={handleWhatsApp}
                className="text-xs text-text-accent/60 hover:text-text-accent flex items-center gap-1 transition-colors font-medium"
              >
                <MessageCircle size={14} /> WhatsApp
              </button>
              <div className="w-px h-4 bg-white/10 transition-colors"></div>
              <button
                type="button"
                onClick={handleCall}
                className="text-xs text-text-accent/60 hover:text-text-accent flex items-center gap-1 transition-colors font-medium"
              >
                <Phone size={14} /> {t('chatbot.call_us')}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;