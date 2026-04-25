import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const ChatAssistant = ({ weather }) => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: '🤖 Hello! I\'m your AI Weather Assistant. Ask me anything about the weather, climate, or outdoor activities!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    const newUserMessage = {
      id: messages.length + 1,
      type: 'user',
      text: userMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('/api/chat/send', {
        message: userMessage,
        context: {
          city: weather?.city,
          temperature: weather?.temperature,
          condition: weather?.description,
          humidity: weather?.humidity,
          windSpeed: weather?.windSpeed
        }
      });

      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: response.data.reply,
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: '❌ Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
      console.error('Chat error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 flex h-[28rem] w-[calc(100vw-2rem)] max-w-md flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700/50 dark:bg-slate-900 sm:h-[30rem]">
          {/* Header */}
          <div className="flex items-center justify-between bg-slate-900 p-4 text-white dark:bg-slate-800">
            <h3 className="flex items-center gap-2 text-lg font-bold">
              🤖 Weather AI Assistant
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 transition hover:bg-white/20"
            >
              ✕
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4 dark:bg-slate-800/50">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.type === 'user'
                      ? 'rounded-br-none bg-teal-600 text-white dark:bg-teal-700'
                      : 'rounded-bl-none bg-white text-slate-800 border border-slate-200 dark:bg-slate-700/60 dark:text-slate-100 dark:border-slate-600/50'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  {msg.timestamp && (
                    <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-bl-none rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-800 dark:border-slate-600/50 dark:bg-slate-700/60 dark:text-slate-300">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-500 dark:bg-slate-400" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-500 delay-100 dark:bg-slate-400" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-500 delay-200 dark:bg-slate-400" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={sendMessage} className="border-t border-slate-200 bg-white p-4 dark:border-slate-700/50 dark:bg-slate-800">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about weather..."
                disabled={loading}
                className="focus-ring flex-1 rounded-2xl border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400 disabled:bg-slate-100 dark:border-slate-600/50 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-500 dark:disabled:bg-slate-700/50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="rounded-2xl bg-slate-900 px-4 py-2 font-semibold text-white transition hover:bg-slate-700 disabled:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-600"
              >
                {loading ? '...' : '📤'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-14 w-14 items-center justify-center rounded-full text-2xl shadow-xl transition hover:scale-105 ${
          isOpen
            ? 'bg-orange-500 hover:bg-orange-600 text-white dark:bg-orange-600 dark:hover:bg-orange-500'
            : 'bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600'
        }`}
      >
        {isOpen ? '✕' : '💬'}
      </button>
    </div>
  );
};

export default ChatAssistant;
