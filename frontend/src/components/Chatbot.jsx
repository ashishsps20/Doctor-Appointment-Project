import React, { useContext, useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import ReactMarkdown from 'react-markdown'; // 🌟 Markdown formatter add kiya
import { useNavigate } from 'react-router-dom'; // 🌟 Navigation ke liye import

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false); // 🌟 Expand karne ke liye naya state
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { backendURL } = useContext(AppContext);

    const messagesEndRef = useRef(null);

    const [messages, setMessages] = useState(() => {
        const savedChat = sessionStorage.getItem('prescripto_current_chat');
        return savedChat ? JSON.parse(savedChat) : [
            { role: 'model', parts: [{ text: 'Hi! I am the Prescripto AI Assistant. How can I help you today?' }] }
        ];
    });

    // Jab bhi naya message aaye, usko session mein save karo
    useEffect(() => {
        sessionStorage.setItem('prescripto_current_chat', JSON.stringify(messages));
    }, [messages]);

   // 🌟 Scroll to bottom jab naya message aaye
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }, [messages, isOpen]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userText = input;
        const newMessages = [...messages, { role: 'user', parts: [{ text: userText }] }];

        setMessages(newMessages);
        setInput('');
        setLoading(true);

        try {

            const { data } = await axios.post(`${backendURL}/api/chat/ask`, {
                message: userText,
            });

            if (data.success) {
                setMessages(prev => [...prev, { role: 'model', parts: [{ text: data.reply }] }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { role: 'model', parts: [{ text: "Sorry, I lost connection to the hospital server." }] }]);
        }
        setLoading(false);
    };

    const handleDoctorClick = (e, href) => {
        e.preventDefault(); // Default browser reload roko

        const token = localStorage.getItem('token'); // Apne auth logic ke hisaab se check karo

        if (!token) {
            alert("Please login to book an appointment with this doctor.");
            navigate('/login'); // Login page par bhej do
            setIsOpen(false); // Chat window band kar do
            return;
        }

        // Agar logged in hai toh doctor ke page par bhejo
        navigate(href);
        setIsOpen(false); // Navigate hone ke baad chat band kar do
    };

    return (
        // 🌟 Expand hone par window ko screen ke center mein aur full width/height par set karega
        <div className={`fixed z-50 transition-all duration-300 ${isExpanded ? 'inset-0 sm:p-10 p-0 bg-black/20' : 'bottom-6 right-6'}`}>

            {isOpen && (
                <div className={`bg-white shadow-2xl flex flex-col overflow-hidden border border-gray-200 transition-all duration-300 mx-auto ${isExpanded ? 'w-full h-full sm:rounded-2xl rounded-none max-w-4xl' : 'w-80 sm:w-96 h-[450px] rounded-2xl mb-4'
                    }`}>
                    {/* Header */}
                    <div className="bg-primary text-white p-4 font-bold flex justify-between items-center shadow-md">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">🤖</span>
                            <span>Prescripto AI</span>
                        </div>
                        <div className="flex items-center gap-4">
                            {/* 🌟 Naya Expand Button */}
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="text-white hover:text-gray-200 text-xl font-bold cursor-pointer"
                                title="Expand/Collapse"
                            >
                                {isExpanded ? '🗗' : '⛶'}
                            </button>
                            {/* Close Button */}
                            <button
                                onClick={() => { setIsOpen(false); setIsExpanded(false); }}
                                className="text-white hover:text-gray-200 text-2xl font-bold leading-none cursor-pointer"
                            >
                                ×
                            </button>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 p-4 overflow-y-auto bg-slate-50 flex flex-col gap-4">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`p-3 rounded-2xl max-w-[85%] text-sm shadow-sm ${msg.role === 'user'
                                    ? 'bg-primary text-white rounded-br-none'
                                    // 🌟 Tailwind arbitrary classes to format Markdown bold text and lists properly
                                    : 'bg-white border border-gray-100 text-gray-700 rounded-bl-none [&>p]:mb-2 [&>strong]:font-semibold [&>ul]:list-disc [&>ul]:ml-5 [&>ul]:mb-2 [&>ol]:list-decimal [&>ol]:ml-5 [&>ol]:mb-2 [&>li]:mb-1'
                                    }`}>
                                    {/* 🌟 Naya ReactMarkdown Wrapper */}
                                    {msg.role === 'model' ? (
                                        <ReactMarkdown
                                            components={{
                                                // 🌟 'a' tag (links) ko customize kar rahe hain
                                                a: ({ node, ...props }) => (
                                                    <a
                                                        href={props.href}
                                                        onClick={(e) => handleDoctorClick(e, props.href)}
                                                        className="text-secondary underline font-bold cursor-pointer hover:text-secondary/80"
                                                    >
                                                        {props.children}
                                                    </a>
                                                )
                                            }}
                                        >
                                            {msg.parts[0].text}
                                        </ReactMarkdown>
                                    ) : (
                                        msg.parts[0].text
                                    )}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-200 p-3 rounded-2xl rounded-bl-none text-sm text-gray-500 animate-pulse">
                                    Typing...
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:border-primary transition-colors bg-white text-gray-800 placeholder:text-gray-400"
                            placeholder="Type your question..."
                            disabled={loading}
                        />
                        <button
                            onClick={sendMessage}
                            disabled={loading}
                            className="bg-primary hover:bg-secondary text-white rounded-full w-10 h-10 flex items-center justify-center transition-transform active:scale-95 disabled:opacity-50 cursor-pointer"
                        >
                            ➤
                        </button>
                    </div>
                </div>
            )}

            {/* Floating Bubble */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-primary hover:bg-secondary w-16 h-16 rounded-full shadow-2xl text-white text-3xl flex items-center justify-center hover:scale-105 transition-all duration-300 ml-auto border-4 border-white cursor-pointer"
                >
                    💬
                </button>
            )}
        </div>
    );
};

export default Chatbot;





