// src/App.js
import React, { useState } from "react";
import MainPage from "./MainPage";
import Login from "./Login";
import SignUp from "./SignUp";
import HomePage from "./HomePage";
import LevelPage from "./LevelPage";
import CodeEditor from "./CodeEditor";

// Helpers to load/save progress per user in localStorage
const getProgressKey = (email) => `codetusker_progress_${email}`;

const loadProgress = (email) => {
  try {
    const saved = localStorage.getItem(getProgressKey(email));
    if (saved) {
      const parsed = JSON.parse(saved);
      // Always ensure level 1 is included
      return parsed.includes(1) ? parsed : [1, ...parsed];
    }
  } catch (_) { }
  return [1];
};

const saveProgress = (email, levels) => {
  try {
    localStorage.setItem(getProgressKey(email), JSON.stringify(levels));
  } catch (_) { }
};

function App() {
  const [showMain, setShowMain] = useState(true);
  const [userEmail, setUserEmail] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showHome, setShowHome] = useState(false);
  const [showLevels, setShowLevels] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);

  const [unlockedLevels, setUnlockedLevels] = useState([1]);

  // Load saved progress for this user when they log in
  const handleLogin = (email) => {
    const saved = loadProgress(email);
    setUnlockedLevels(saved);
    setUserEmail(email);
    setShowLogin(false);
    setShowSignUp(false);
    setShowHome(true);
  };

  const handleSignUp = (email) => {
    // New account always starts at level 1
    saveProgress(email, [1]);
    setUnlockedLevels([1]);
    setUserEmail(email);
    setShowSignUp(false);
    setShowLogin(false);
    setShowHome(true);
  };

  const handleLogout = () => {
    setUserEmail(null);
    setUnlockedLevels([1]); // reset in-memory state
    setShowLogin(true);
    setShowSignUp(false);
    setShowHome(false);
    setShowLevels(false);
    setShowEditor(false);
  };

  const handleLevelSuccess = () => {
    const nextLevel = selectedLevel + 1;
    if (!unlockedLevels.includes(nextLevel)) {
      const updated = [...unlockedLevels, nextLevel];
      setUnlockedLevels(updated);
      // Persist updated progress for this user
      if (userEmail) saveProgress(userEmail, updated);
    }
  };

  return (
    <div>
      {showMain && (
        <MainPage
          onStart={() => {
            setShowMain(false);
            setShowLogin(true);
          }}
        />
      )}

      {showLogin && !showMain && (
        <Login
          onLogin={handleLogin}
          onSignUp={() => {
            setShowLogin(false);
            setShowSignUp(true);
          }}
          onBack={() => {
            setShowLogin(false);
            setShowMain(true);
          }}
        />
      )}

      {showSignUp && (
        <SignUp
          onSignUp={handleSignUp}
          switchToLogin={() => {
            setShowSignUp(false);
            setShowLogin(true);
          }}
          onBack={() => {
            setShowSignUp(false);
            setShowMain(true);
          }}
        />
      )}

      {showHome && !showLevels && !showEditor && (
        <HomePage
          userEmail={userEmail}
          unlockedLevels={unlockedLevels}
          onLogout={handleLogout}
          onStartCoding={() => {
            setShowLevels(true);
            setShowHome(false);
          }}
          onBack={() => {
            setShowHome(false);
            setShowLogin(true);
          }}
        />
      )}

      {showLevels && (
        <LevelPage
          unlockedLevels={unlockedLevels}
          onStartLevel={(level) => {
            setSelectedLevel(level);
            setShowLevels(false);
            setShowEditor(true);
          }}
          onBack={() => {
            setShowLevels(false);
            setShowHome(true);
          }}
        />
      )}

      {showEditor && selectedLevel && (
        <CodeEditor
          level={selectedLevel}
          onBack={() => {
            setShowEditor(false);
            setShowLevels(true);
          }}
          onSuccess={handleLevelSuccess}
        />
      )}
    </div>
  );
}

export default App;
