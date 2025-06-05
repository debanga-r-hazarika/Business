import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 'bot-1',
    text: 'Hi there! 👋 How can I help you today?',
    isUser: false,
    timestamp: new Date()
  }
];

const responseMessages = {
  services: "We offer software development, digital marketing, and graphic design services. Would you like to learn more about any specific service?",
  pricing: "Our pricing varies based on project requirements. For a custom quote, please fill out our contact form or schedule a consultation call.",
  contact: "You can reach us at info@nexusconsult.com or call us at (415) 555-0123. Would you like me to help you schedule a consultation?",
  hours: "Our business hours are Monday to Friday, 9:00 AM to 6:00 PM. Our offices are closed on weekends.",
  portfolio: "You can view our portfolio on the Portfolio page. We've worked with clients across various industries including finance, healthcare, retail, and more.",
  career: "We're always looking for talented individuals to join our team. Check our Careers page for current openings and internship opportunities.",
  fallback: "Thanks for your message. I'm not sure I understand your question. Would you like to speak with a human? You can also try asking about our services, pricing, contact information, or career opportunities."
};

const suggestedQuestions = [
  "What services do you offer?",
  "How much do your services cost?",
  "How can I contact your team?",
  "What are your business hours?",
  "Can I see your portfolio?",
  "Are you hiring?"
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Simulate response after a short delay
    setTimeout(() => {
      let responseText = responseMessages.fallback;
      
      // Simple keyword matching
      const lowercaseInput = inputValue.toLowerCase();
      if (lowercaseInput.includes('service') || lowercaseInput.includes('offer') || lowercaseInput.includes('help')) {
        responseText = responseMessages.services;
      } else if (lowercaseInput.includes('price') || lowercaseInput.includes('cost') || lowercaseInput.includes('quote') || lowercaseInput.includes('package')) {
        responseText = responseMessages.pricing;
      } else if (lowercaseInput.includes('contact') || lowercaseInput.includes('email') || lowercaseInput.includes('phone') || lowercaseInput.includes('call')) {
        responseText = responseMessages.contact;
      } else if (lowercaseInput.includes('time') || lowercaseInput.includes('hour') || lowercaseInput.includes('open')) {
        responseText = responseMessages.hours;
      } else if (lowercaseInput.includes('portfolio') || lowercaseInput.includes('work') || lowercaseInput.includes('project') || lowercaseInput.includes('client')) {
        responseText = responseMessages.portfolio;
      } else if (lowercaseInput.includes('job') || lowercaseInput.includes('career') || lowercaseInput.includes('hire') || lowercaseInput.includes('internship') || lowercaseInput.includes('position')) {
        responseText = responseMessages.career;
      }
      
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: responseText,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 800);
  };
  
  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chatbot toggle button */}
      <button
        onClick={handleToggle}
        className="bg-primary-500 hover:bg-primary-600 text-white rounded-full p-4 shadow-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
      
      {/* Chatbot panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-20 right-0 w-80 sm:w-96 bg-white rounded-lg shadow-hard overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary-500 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MessageSquare className="h-6 w-6 mr-2" />
                  <h3 className="font-medium">Chat with us</h3>
                </div>
                <button 
                  onClick={handleToggle}
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="Close chat"
                >
                  <X size={20} />
                </button>
              </div>
              <p className="text-white/80 text-sm mt-1">We typically reply within a few minutes</p>
            </div>
            
            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 bg-dark-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`rounded-lg p-3 max-w-[80%] ${
                      message.isUser 
                        ? 'bg-primary-500 text-white' 
                        : 'bg-white shadow-soft text-dark-700'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${message.isUser ? 'text-primary-100' : 'text-dark-400'}`}>
                      {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Suggested questions */}
            <div className="p-3 border-t border-dark-100 bg-white">
              <p className="text-xs text-dark-500 mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="text-xs bg-dark-50 text-dark-600 hover:bg-primary-50 hover:text-primary-600 px-2 py-1 rounded-full transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-dark-100 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Type your message..."
                  className="flex-grow px-3 py-2 rounded-md border border-dark-200 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
                <button
                  type="submit"
                  className="bg-primary-500 hover:bg-primary-600 text-white rounded-md p-2 transition-colors"
                  disabled={!inputValue.trim()}
                  aria-label="Send message"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;