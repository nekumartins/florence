import { useState, useRef, useEffect } from 'react';
import Markdown from 'react-markdown';
import api from '../utils/api';
import './Tutor.css';

const SUGGESTED_PROMPTS = [
  "What are rational numbers?",
  "Explain how to expand brackets in algebra",
  "How do I use the quadratic formula?",
  "What is the difference between a sequence and a series?",
  "Help me understand the Sine rule",
  "What are mutually exclusive events?"
];

const Tutor = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = { role: 'user', content: text.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/tutor/chat', {
        messages: newMessages.map(m => ({ role: m.role, content: m.content }))
      });
      setMessages(prev => [...prev, res.data]);
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Failed to get response. Please try again.';
      setError(errMsg);
      if (err.response?.data?.type === 'config_error') {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: '⚠️ **GALE is not configured yet.** Please add your Groq API key to the server `.env` file to enable GALE. You can get a free key at [console.groq.com](https://console.groq.com).'
        }]);
      }
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="tutor-container animate-fade-in">
      <div className="tutor-header">
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
            🤖 GALE
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Ask me anything about Mathematics • Powered by Groq AI
          </p>
        </div>
        {messages.length > 0 && (
          <button
            className="btn btn-ghost"
            onClick={() => { setMessages([]); setError(''); }}
            style={{ fontSize: '0.8rem' }}
          >
            🗑️ Clear Chat
          </button>
        )}
      </div>

      <div className="tutor-messages">
        {messages.length === 0 ? (
          <div className="tutor-welcome">
            <div style={{ fontSize: '3rem', marginBottom: 'var(--space-md)' }}>🎓</div>
            <h2>Hello! I'm GALE, your AI tutor</h2>
            <p>I am your Gap Analysis and Learning Engine. I can help you master WAEC and JAMB Mathematics. Ask me questions or request explanations!</p>
            
            <div className="suggested-prompts">
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 'var(--space-sm)' }}>Try asking:</p>
              <div className="prompt-grid">
                {SUGGESTED_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    className="prompt-chip"
                    onClick={() => sendMessage(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className={`message ${msg.role}`}>
              <div className="message-avatar">
                {msg.role === 'user' ? '👤' : '🤖'}
              </div>
              <div className="message-content">
                <div className="markdown-content">
                  <Markdown>{msg.content}</Markdown>
                </div>
              </div>
            </div>
          ))
        )}

        {loading && (
          <div className="message assistant">
            <div className="message-avatar">🤖</div>
            <div className="message-content">
              <div className="typing-indicator">
                <span /><span /><span />
              </div>
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="error-message" style={{ margin: 'var(--space-md)' }}>{error}</div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form className="tutor-input" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          className="input"
          placeholder="Ask me anything about Mathematics..."
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={loading}
          style={{ flex: 1 }}
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading || !input.trim()}
        >
          {loading ? '...' : '↑'}
        </button>
      </form>
    </div>
  );
};

export default Tutor;
