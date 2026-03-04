import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const API = "http://localhost:5000";

export default function AiPanel({ code, output, status, level, levelData, onClose }) {
    const [tab, setTab] = useState("explain");
    const [explainText, setExplainText] = useState("");
    const [explainLoading, setExplainLoading] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [errorLoading, setErrorLoading] = useState(false);
    const [chatMessages, setChatMessages] = useState([
        { role: "model", text: "Hi! 👋 I'm your C++ AI assistant. Ask me anything about C++ or your current challenge!" }
    ]);
    const [chatInput, setChatInput] = useState("");
    const [chatLoading, setChatLoading] = useState(false);
    const chatEndRef = useRef(null);
    const lvl = levelData[level];

    // Auto-switch to error tab when there's an error
    useEffect(() => {
        if (status === "error" && output && output !== "⚠️ Network or server error. Is the server running?") {
            setTab("error");
            handleAnalyzeError();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status, output]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages]);

    const handleExplain = async () => {
        if (!code || code.trim().length === 0) {
            setExplainText("⚠️ Please write some code in the editor first!");
            return;
        }
        setExplainLoading(true);
        setExplainText("");
        try {
            const res = await axios.post(`${API}/ai/explain`, {
                code,
                levelTitle: lvl.title,
                levelDesc: lvl.desc,
            });
            setExplainText(res.data.explanation);
        } catch {
            setExplainText("❌ Failed to get explanation. Check your Gemini API key in server/.env");
        } finally {
            setExplainLoading(false);
        }
    };

    const handleAnalyzeError = async () => {
        if (!code || code.trim().length === 0) return;
        setErrorLoading(true);
        setErrorText("");
        try {
            const res = await axios.post(`${API}/ai/analyze-error`, {
                code,
                output: output || "",
                expected: lvl.expected,
                levelDesc: lvl.desc,
            });
            setErrorText(res.data.analysis);
        } catch {
            setErrorText("❌ Failed to analyze error. Check your Gemini API key in server/.env");
        } finally {
            setErrorLoading(false);
        }
    };

    const handleChat = async (e) => {
        e.preventDefault();
        if (!chatInput.trim() || chatLoading) return;
        const userMsg = chatInput.trim();
        setChatInput("");
        const newHistory = [...chatMessages, { role: "user", text: userMsg }];
        setChatMessages(newHistory);
        setChatLoading(true);
        try {
            const res = await axios.post(`${API}/ai/chat`, {
                message: userMsg,
                history: newHistory.slice(1), // skip the initial greeting
            });
            setChatMessages([...newHistory, { role: "model", text: res.data.reply }]);
        } catch {
            setChatMessages([...newHistory, { role: "model", text: "❌ Chat failed. Check your Gemini API key in server/.env" }]);
        } finally {
            setChatLoading(false);
        }
    };

    return (
        <div style={s.panel}>
            {/* Header */}
            <div style={s.header}>
                <div style={s.headerLeft}>
                    <span style={s.aiIcon}>✨</span>
                    <span style={s.title}>AI Assistant</span>
                </div>
                <button style={s.closeBtn} onClick={onClose} title="Close AI Panel">✕</button>
            </div>

            {/* Tabs */}
            <div style={s.tabs}>
                {[
                    { id: "explain", label: "💡 Explain" },
                    { id: "error", label: "🐛 Debug" },
                    { id: "chat", label: "💬 Chat" },
                ].map((t) => (
                    <button
                        key={t.id}
                        style={{ ...s.tab, ...(tab === t.id ? s.tabActive : {}) }}
                        onClick={() => setTab(t.id)}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div style={s.content}>

                {/* EXPLAIN TAB */}
                {tab === "explain" && (
                    <div style={s.tabPane}>
                        <p style={s.hint}>Get a clear explanation of your C++ code, tailored to this challenge.</p>
                        <button
                            style={{ ...s.aiBtn, opacity: explainLoading ? 0.6 : 1 }}
                            onClick={handleExplain}
                            disabled={explainLoading}
                        >
                            {explainLoading ? <><span style={s.spinner} /> Analyzing...</> : "💡 Explain My Code"}
                        </button>
                        {explainText && (
                            <div style={s.responseBox}>
                                <MarkdownContent text={explainText} />
                            </div>
                        )}
                    </div>
                )}

                {/* ERROR ANALYSIS TAB */}
                {tab === "error" && (
                    <div style={s.tabPane}>
                        <p style={s.hint}>Get AI-powered help understanding what went wrong.</p>
                        <button
                            style={{ ...s.aiBtn, background: "linear-gradient(135deg, #ef4444, #dc2626)", opacity: errorLoading ? 0.6 : 1 }}
                            onClick={handleAnalyzeError}
                            disabled={errorLoading}
                        >
                            {errorLoading ? <><span style={s.spinner} /> Analyzing...</> : "🐛 Analyze My Error"}
                        </button>
                        {status !== "error" && !errorText && (
                            <p style={{ ...s.hint, marginTop: "16px", color: "rgba(255,255,255,0.3)" }}>
                                Run your code first — if there's an error, I'll automatically analyze it!
                            </p>
                        )}
                        {errorText && (
                            <div style={{ ...s.responseBox, borderColor: "rgba(239,68,68,0.35)" }}>
                                <MarkdownContent text={errorText} />
                            </div>
                        )}
                    </div>
                )}

                {/* CHAT TAB */}
                {tab === "chat" && (
                    <div style={s.chatPane}>
                        <div style={s.chatMessages}>
                            {chatMessages.map((msg, i) => (
                                <div key={i} style={{ ...s.bubble, ...(msg.role === "user" ? s.userBubble : s.aiBubble) }}>
                                    {msg.role === "model" ? (
                                        <MarkdownContent text={msg.text} compact />
                                    ) : (
                                        <span style={{ fontSize: "14px" }}>{msg.text}</span>
                                    )}
                                </div>
                            ))}
                            {chatLoading && (
                                <div style={{ ...s.bubble, ...s.aiBubble }}>
                                    <span className="ai-dots"><span>•</span><span>•</span><span>•</span></span>
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>
                        <form onSubmit={handleChat} style={s.chatForm}>
                            <input
                                style={s.chatInput}
                                value={chatInput}
                                onChange={e => setChatInput(e.target.value)}
                                placeholder="Ask anything about C++..."
                                disabled={chatLoading}
                            />
                            <button type="submit" style={s.sendBtn} disabled={chatLoading || !chatInput.trim()}>
                                ➤
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

function MarkdownContent({ text, compact }) {
    return (
        <div style={{ fontSize: compact ? "13px" : "14px", lineHeight: 1.7, color: "var(--text-secondary)" }}
            className="ai-markdown">
            <ReactMarkdown>{text}</ReactMarkdown>
        </div>
    );
}

const s = {
    panel: {
        width: "360px",
        minWidth: "320px",
        height: "100%",
        background: "linear-gradient(180deg, #0f1219 0%, #0a0d14 100%)",
        borderLeft: "1px solid rgba(99,102,241,0.25)",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
        position: "relative",
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 18px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(99,102,241,0.08)",
    },
    headerLeft: { display: "flex", alignItems: "center", gap: "8px" },
    aiIcon: { fontSize: "18px" },
    title: { fontSize: "15px", fontWeight: 700, color: "var(--text-primary)" },
    closeBtn: {
        background: "transparent",
        border: "none",
        color: "var(--text-muted)",
        cursor: "pointer",
        fontSize: "16px",
        padding: "4px 8px",
        borderRadius: "6px",
        transition: "all 0.2s",
    },
    tabs: {
        display: "flex",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "8px 12px 0",
        gap: "4px",
    },
    tab: {
        flex: 1,
        padding: "8px 4px",
        background: "transparent",
        border: "none",
        color: "var(--text-muted)",
        cursor: "pointer",
        fontSize: "12px",
        fontWeight: 600,
        borderRadius: "8px 8px 0 0",
        transition: "all 0.2s",
        borderBottom: "2px solid transparent",
    },
    tabActive: {
        color: "#818cf8",
        borderBottom: "2px solid #818cf8",
        background: "rgba(99,102,241,0.08)",
    },
    content: {
        flex: 1,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
    },
    tabPane: {
        flex: 1,
        overflowY: "auto",
        padding: "18px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    },
    hint: {
        fontSize: "13px",
        color: "rgba(255,255,255,0.4)",
        lineHeight: 1.6,
        margin: 0,
    },
    aiBtn: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        width: "100%",
        padding: "12px 16px",
        background: "linear-gradient(135deg, #6366f1, #4f46e5)",
        border: "none",
        borderRadius: "10px",
        color: "#fff",
        fontSize: "14px",
        fontWeight: 700,
        cursor: "pointer",
        transition: "all 0.2s",
        boxShadow: "0 4px 15px rgba(99,102,241,0.3)",
    },
    responseBox: {
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(99,102,241,0.2)",
        borderRadius: "10px",
        padding: "14px",
        marginTop: "4px",
        overflowY: "auto",
    },
    // Chat
    chatPane: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
    },
    chatMessages: {
        flex: 1,
        overflowY: "auto",
        padding: "14px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
    bubble: {
        maxWidth: "90%",
        padding: "10px 14px",
        borderRadius: "14px",
        wordBreak: "break-word",
    },
    aiBubble: {
        alignSelf: "flex-start",
        background: "rgba(99,102,241,0.12)",
        border: "1px solid rgba(99,102,241,0.2)",
        borderTopLeftRadius: "4px",
    },
    userBubble: {
        alignSelf: "flex-end",
        background: "linear-gradient(135deg, #6366f1, #4f46e5)",
        color: "#fff",
        borderTopRightRadius: "4px",
    },
    chatForm: {
        display: "flex",
        gap: "8px",
        padding: "12px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(0,0,0,0.2)",
    },
    chatInput: {
        flex: 1,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "10px",
        padding: "10px 14px",
        color: "#e2e8f0",
        fontSize: "13px",
        outline: "none",
        fontFamily: "'Inter', sans-serif",
    },
    sendBtn: {
        background: "linear-gradient(135deg, #6366f1, #4f46e5)",
        border: "none",
        borderRadius: "10px",
        color: "#fff",
        width: "40px",
        height: "40px",
        cursor: "pointer",
        fontSize: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        transition: "all 0.2s",
    },
    spinner: {
        display: "inline-block",
        width: "14px",
        height: "14px",
        border: "2px solid rgba(255,255,255,0.3)",
        borderTopColor: "#fff",
        borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
    },
    dots: {
        display: "flex",
        gap: "4px",
        alignItems: "center",
        "& span": { animation: "bounce 1.2s infinite" },
    },
};
