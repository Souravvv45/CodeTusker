import React, { useState } from "react";
import axios from "axios";
import AiPanel from "./AiPanel";

const levelData = {
  1: { title: "Hello World", desc: 'Print "Hello World" exactly.', expected: "Hello World" },
  2: { title: "Sum of Two Numbers", desc: "Take two numbers (10 20) and print: Sum is 30", expected: "Sum is 30", input: "10 20" },
  3: { title: "Greet by Name", desc: "Read a name and greet:\nInput: Alice\nOutput: Hello, Alice!", expected: "Hello, Alice!", input: "Alice" },
  4: { title: "Multiply Two Numbers", desc: "Take two integers (5 6) and print: Product is 30", expected: "Product is 30", input: "5 6" },
  5: { title: "Even or Odd", desc: "Read an integer and print:\nIf even → Even number\nIf odd → Odd number\nInput: 7", expected: "Odd number", input: "7" },
  6: { title: "Find Max", desc: "Take two integers (15 20) and print the greater one.", expected: "20", input: "15 20" },
  7: { title: "Square a Number", desc: "Take an integer (4) and print its square.\nOutput: 16", expected: "16", input: "4" },
  8: { title: "Simple If Condition", desc: "If input is greater than 10, print 'Big'.\nInput: 12", expected: "Big", input: "12" },
  9: { title: "Simple Else", desc: "If input is less than 10, print 'Small'.\nInput: 5", expected: "Small", input: "5" },
  10: { title: "Check Equality", desc: "If both numbers are equal print 'Equal'.\nInput: 30 30", expected: "Equal", input: "30 30" },
  11: { title: "Print 1 to 5", desc: "Use a loop to print numbers 1 to 5.\nOutput: 1 2 3 4 5", expected: "1 2 3 4 5" },
  12: { title: "Sum 1 to N", desc: "Read a number and print sum from 1 to N.\nInput: 5\nOutput: 15", expected: "15", input: "5" },
  13: { title: "Print Even Numbers", desc: "Print even numbers from 1 to 10.\nOutput: 2 4 6 8 10", expected: "2 4 6 8 10" },
  14: { title: "Factorial", desc: "Input: 5\nOutput: 120", expected: "120", input: "5" },
  15: { title: "Check Prime", desc: "Check if a number is prime.\nInput: 7\nOutput: Prime", expected: "Prime", input: "7" },
  16: { title: "Reverse Digits", desc: "Reverse a given integer.\nInput: 123\nOutput: 321", expected: "321", input: "123" },
  17: { title: "Sum of Digits", desc: "Input: 123\nOutput: 6", expected: "6", input: "123" },
  18: { title: "Leap Year Check", desc: "Check if the given year is a leap year.\nInput: 2020\nOutput: Leap year", expected: "Leap year", input: "2020" },
  19: { title: "Fibonacci Term", desc: "Print the 6th Fibonacci term.\nOutput: 8", expected: "8" },
  20: { title: "Print Stars", desc: "Print 3 rows of 5 stars each.\nOutput: ***** (3 lines)", expected: "*****\n*****\n*****" },
  21: { title: "Char to ASCII", desc: "Input a char, print its ASCII.\nInput: A\nOutput: 65", expected: "65", input: "A" },
  22: { title: "Simple Switch", desc: "Input 1 print 'One', input 2 print 'Two'\nInput: 1\nOutput: One", expected: "One", input: "1" },
  23: { title: "Sum of Array", desc: "Input size 3 and elements 1 2 3\nOutput: 6", expected: "6", input: "3\n1 2 3" },
  24: { title: "Min in Array", desc: "Find minimum in array: 10 20 5\nOutput: 5", expected: "5", input: "3\n10 20 5" },
  25: { title: "Max in Array", desc: "Find max in array: 9 33 21\nOutput: 33", expected: "33", input: "3\n9 33 21" },
  26: { title: "Count Digits", desc: "Count digits of number 5678\nOutput: 4", expected: "4", input: "5678" },
  27: { title: "Power of Number", desc: "Input: 2 5\nOutput: 32", expected: "32", input: "2 5" },
  28: { title: "Palindrome Number", desc: "Check if number is palindrome.\nInput: 121\nOutput: Palindrome", expected: "Palindrome", input: "121" },
  29: { title: "Sum of First N Evens", desc: "Input: 4\nOutput: 20", expected: "20", input: "4" },
  30: { title: "Print in Reverse", desc: "Input: 3\nOutput: 3 2 1", expected: "3 2 1", input: "3" },
  31: { title: "GCD", desc: "Input: 20 28\nOutput: 4", expected: "4", input: "20 28" },
  32: { title: "LCM", desc: "Input: 3 5\nOutput: 15", expected: "15", input: "3 5" },
  33: { title: "Right Triangle", desc: "Input: 3\nOutput:\n*\n**\n***", expected: "*\n**\n***", input: "3" },
  34: { title: "Simple Calculator", desc: "Input: 3 + 4\nOutput: 7", expected: "7", input: "3 + 4" },
  35: { title: "Temperature Convert", desc: "Convert Celsius 100 to Fahrenheit.\nOutput: 212", expected: "212", input: "100" },
  36: { title: "Area of Circle", desc: "Input: 7\nOutput: 153.938", expected: "153.938", input: "7" },
  37: { title: "Swap Two Numbers", desc: "Input: 5 10\nOutput: 10 5", expected: "10 5", input: "5 10" },
  38: { title: "Check Alphabet", desc: "Input: a\nOutput: Alphabet", expected: "Alphabet", input: "a" },
  39: { title: "Count Vowels", desc: "Input: hello\nOutput: 2", expected: "2", input: "hello" },
  40: { title: "Uppercase String", desc: "Input: hello\nOutput: HELLO", expected: "HELLO", input: "hello" },
  41: { title: "Lowercase String", desc: "Input: HELLO\nOutput: hello", expected: "hello", input: "HELLO" },
  42: { title: "String Length", desc: "Input: elephant\nOutput: 8", expected: "8", input: "elephant" },
  43: { title: "Check Substring", desc: "Input: hello world\nOutput: Yes (if 'world' in it)", expected: "Yes", input: "hello world" },
  44: { title: "String Reverse", desc: "Input: apple\nOutput: elppa", expected: "elppa", input: "apple" },
  45: { title: "Char Frequency", desc: "Input: aabbb\nOutput: a=2 b=3", expected: "a=2 b=3", input: "aabbb" },
  46: { title: "Find Duplicate", desc: "Input: 1 2 2 3\nOutput: 2", expected: "2", input: "4\n1 2 2 3" },
  47: { title: "Palindrome String", desc: "Input: madam\nOutput: Palindrome", expected: "Palindrome", input: "madam" },
  48: { title: "Sum of Matrix", desc: "Input 2x2 matrix (1 2 3 4)\nOutput: 10", expected: "10", input: "1 2\n3 4" },
  49: { title: "Diagonal Sum", desc: "Input: 1 2 3 4\nOutput: 5 (1+4)", expected: "5", input: "1 2\n3 4" },
  50: { title: "Matrix Transpose", desc: "Transpose of 2x2 matrix\nInput: 1 2 3 4\nOutput:\n1 3\n2 4", expected: "1 3\n2 4", input: "1 2\n3 4" },
};

export default function CodeEditor({ level, onBack, onSuccess }) {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("idle"); // idle | running | success | error
  const [showModal, setShowModal] = useState(false);
  const [showAi, setShowAi] = useState(false);
  const lvl = levelData[level];

  const handleRun = async () => {
    setStatus("running");
    setOutput("");
    try {
      const res = await axios.post("http://localhost:5000/execute", {
        script: code,
        stdin: lvl.input || "",
      });
      const result = res.data.output?.trim();
      if (!result) {
        setOutput("⚠️ No output received.");
        setStatus("error");
      } else {
        setOutput(result);
        if (result === lvl.expected) {
          setStatus("success");
          setShowModal(true);
          if (onSuccess) onSuccess();
        } else {
          setStatus("error");
        }
      }
    } catch {
      setOutput("⚠️ Network or server error. Is the server running?");
      setStatus("error");
    }
  };

  const handleNext = () => { setShowModal(false); onBack(); };

  return (
    <div style={s.root}>
      <div style={s.blob1} />

      {/* Nav */}
      <header style={s.nav}>
        <button className="btn btn-secondary" onClick={onBack} style={{ padding: "8px 16px", fontSize: "13px" }}>
          ← Levels
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={s.levelBadge}>Level {level}</span>
          <span style={s.titleText}>{lvl.title}</span>
        </div>
        <div style={{ width: "80px" }} />
      </header>

      {/* Body */}
      <div style={s.body}>
        {/* Left panel – problem */}
        <aside style={s.panel}>
          <div style={s.panelSection}>
            <p style={s.panelLabel}>📝 Problem</p>
            <pre style={s.problemText}>{lvl.desc}</pre>
          </div>
          {lvl.input !== undefined && (
            <div style={s.panelSection}>
              <p style={s.panelLabel}>📥 Input</p>
              <pre style={s.codeBlock}>{lvl.input}</pre>
            </div>
          )}
          <div style={s.panelSection}>
            <p style={s.panelLabel}>✅ Expected Output</p>
            <pre style={s.codeBlock}>{lvl.expected}</pre>
          </div>
        </aside>

        {/* Right panel – editor */}
        <div style={s.editorCol}>
          <div style={s.editorHeader}>
            <span style={{ fontSize: "13px", color: "var(--text-muted)", fontWeight: 600 }}>main.cpp</span>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <button
                onClick={() => setShowAi(v => !v)}
                title="Toggle AI Assistant"
                style={{
                  padding: "8px 16px", fontSize: "13px", fontWeight: 700,
                  background: showAi ? "linear-gradient(135deg,#6366f1,#4f46e5)" : "rgba(99,102,241,0.15)",
                  border: "1px solid rgba(99,102,241,0.4)",
                  color: showAi ? "#fff" : "#818cf8",
                  borderRadius: "10px", cursor: "pointer", transition: "all 0.2s",
                }}
              >
                ✨ AI
              </button>
              <button
                className="btn btn-primary"
                onClick={handleRun}
                disabled={status === "running"}
                style={{ padding: "8px 20px", fontSize: "13px" }}
              >
                {status === "running" ? "⏳ Running…" : "▶ Run Code"}
              </button>
            </div>
          </div>

          <textarea
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder={"// Write your C++ code here...\n#include <iostream>\nusing namespace std;\n\nint main() {\n    // your code\n    return 0;\n}"}
            style={s.textarea}
            spellCheck={false}
          />

          {/* Output */}
          {output && (
            <div style={{
              ...s.outputBox,
              borderColor: status === "success" ? "#10b98140" : status === "error" ? "#ef444440" : "var(--border-light)",
              background: status === "success" ? "rgba(16,185,129,0.05)" : status === "error" ? "rgba(239,68,68,0.05)" : "var(--bg-surface)",
            }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-muted)", marginBottom: "8px" }}>OUTPUT</p>
              <pre style={s.outputText}>{output}</pre>
              {status === "error" && output !== "⚠️ Network or server error. Is the server running?" && (
                <p style={{ color: "var(--danger)", fontSize: "13px", marginTop: "8px", fontWeight: 600 }}>
                  ✗ Output doesn't match. Try again!
                </p>
              )}
            </div>
          )}
        </div>

        {/* AI Panel */}
        {showAi && (
          <AiPanel
            code={code}
            output={output}
            status={status}
            level={level}
            levelData={levelData}
            onClose={() => setShowAi(false)}
          />
        )}
      </div>

      {/* Success Modal */}
      {showModal && (
        <div style={s.overlay} onClick={() => setShowModal(false)}>
          <div style={s.modal} onClick={e => e.stopPropagation()} className="fadeUp">
            <div style={s.modalIcon}>🎉</div>
            <h2 style={s.modalTitle}>Level {level} Complete!</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "28px", fontSize: "15px" }}>
              Excellent work! You've unlocked Level {level + 1}.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button className="btn btn-primary" onClick={handleNext} style={{ padding: "12px 28px" }}>
                Next Level →
              </button>
              <button className="btn btn-secondary" onClick={() => setShowModal(false)} style={{ padding: "12px 20px" }}>
                Stay Here
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const s = {
  root: { minHeight: "100vh", background: "var(--bg-base)", display: "flex", flexDirection: "column", fontFamily: "'Inter', sans-serif", position: "relative" },
  blob1: { position: "fixed", top: "-200px", right: "-150px", width: "450px", height: "450px", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)", pointerEvents: "none" },
  nav: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 24px", background: "rgba(10,13,20,0.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid var(--border)", zIndex: 100 },
  levelBadge: { background: "rgba(99,102,241,0.18)", color: "#818cf8", padding: "4px 10px", borderRadius: "99px", fontSize: "12px", fontWeight: 700 },
  titleText: { fontSize: "15px", fontWeight: 700, color: "var(--text-primary)" },
  body: { display: "flex", flex: 1, overflow: "hidden", height: "calc(100vh - 57px)" },
  panel: { width: "340px", minWidth: "280px", background: "var(--bg-card)", borderRight: "1px solid var(--border)", overflowY: "auto", padding: "24px 20px", display: "flex", flexDirection: "column", gap: "0" },
  panelSection: { marginBottom: "24px" },
  panelLabel: { fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "10px" },
  problemText: { fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.7, whiteSpace: "pre-wrap", fontFamily: "'Inter', sans-serif" },
  codeBlock: { background: "var(--bg-surface)", border: "1px solid var(--border-light)", borderRadius: "8px", padding: "10px 14px", fontSize: "13px", fontFamily: "'JetBrains Mono', monospace", color: "#22d3ee", whiteSpace: "pre-wrap" },
  editorCol: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" },
  editorHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", background: "var(--bg-surface)", borderBottom: "1px solid var(--border)" },
  textarea: {
    flex: 1, padding: "20px", background: "#0d1117", color: "#e2e8f0",
    fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", lineHeight: 1.7,
    border: "none", outline: "none", resize: "none", minHeight: "300px",
  },
  outputBox: { margin: "0", padding: "16px 20px", borderTop: "1px solid", transition: "all 0.25s ease" },
  outputText: { fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", color: "var(--text-primary)", whiteSpace: "pre-wrap" },
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200 },
  modal: { background: "var(--bg-card)", border: "1px solid rgba(99,102,241,0.4)", borderRadius: "24px", padding: "48px 40px", textAlign: "center", maxWidth: "400px", width: "90%", boxShadow: "0 0 60px rgba(99,102,241,0.25)" },
  modalIcon: { fontSize: "56px", marginBottom: "16px", animation: "float 2s ease-in-out infinite" },
  modalTitle: { fontSize: "26px", fontWeight: 900, color: "var(--text-primary)", marginBottom: "10px" },
};
