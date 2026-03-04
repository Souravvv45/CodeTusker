# 🐘 CodeTusker

**CodeTusker** is an interactive, AI-powered platform for learning C++ programming through a structured level-based curriculum. Built with React and Node.js, it features a built-in code editor, real-time code execution, and an AI assistant powered by Google Gemini.

![C++](https://img.shields.io/badge/Language-C++-blue?logo=cplusplus)
![React](https://img.shields.io/badge/Frontend-React-61dafb?logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=nodedotjs)
![Firebase](https://img.shields.io/badge/Auth-Firebase-FFCA28?logo=firebase)
![Gemini](https://img.shields.io/badge/AI-Gemini-8E75B2?logo=google)

---

## ✨ Features

- **📝 Built-in Code Editor** — Write C++ code in a sleek CodeMirror editor with syntax highlighting and the One Dark theme.
- **▶️ Live Code Execution** — Run your C++ code instantly via the JDoodle API and see output in real time.
- **🤖 AI-Powered Assistance** — Get code explanations, error analysis, and chat with an AI tutor (Google Gemini).
- **🎮 50-Level Curriculum** — Progress through 50 structured C++ challenges, from basics to advanced topics.
- **🔐 User Authentication** — Sign up and log in securely with Firebase Authentication.
- **📊 Progress Tracking** — Your level progress is saved so you can pick up right where you left off.
- **🌙 Dark Theme UI** — Modern, elegant dark interface with glassmorphism effects and smooth animations.

---

## 🛠️ Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React, CodeMirror, React Markdown   |
| Backend    | Node.js, Express                    |
| AI Engine  | Google Gemini (gemini-1.5-flash)    |
| Code Runner| JDoodle API                         |
| Auth       | Firebase Authentication             |
| Styling    | Vanilla CSS (custom dark theme)     |

---

## 📁 Project Structure

```
codetusker/
├── client/                  # React frontend
│   ├── public/
│   └── src/
│       ├── App.js           # Main app with routing & state
│       ├── MainPage.js      # Landing page
│       ├── Login.js         # Firebase login
│       ├── SignUp.js         # Firebase sign-up
│       ├── HomePage.js      # Dashboard with progress stats
│       ├── LevelPage.js     # Level selection grid
│       ├── CodeEditor.js    # Code editor + execution + AI
│       ├── AiPanel.js       # AI assistant panel
│       ├── Roadmap.js       # Learning roadmap
│       ├── firebase.js      # Firebase config
│       └── index.css        # Global dark theme styles
├── server/                  # Express backend
│   ├── server.js            # API endpoints (execute, AI)
│   └── .env                 # Environment variables
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or later)
- **npm** (v9 or later)
- A **Google Gemini API Key** — [Get one here](https://aistudio.google.com/app/apikey)
- A **Firebase Project** — [Create one here](https://console.firebase.google.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/Souravvv45/CodeTusker.git
cd CodeTusker/codetusker
```

### 2. Set Up the Server

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Set Up the Client

```bash
cd ../client
npm install
```

### 4. Run the Application

Start the **server** (from the `server/` directory):

```bash
node server.js
```

Start the **client** (from the `client/` directory, in a new terminal):

```bash
npm start
```

The app will be available at **http://localhost:3000** and the server runs on **http://localhost:5000**.

---

## 🔑 Environment Variables

| Variable         | Description                     |
|------------------|---------------------------------|
| `GEMINI_API_KEY` | Google Gemini API key for AI    |

> ⚠️ **Never commit your `.env` file or API keys to version control.**

---

## 📸 Pages Overview

| Page           | Description                                               |
|----------------|-----------------------------------------------------------|
| **Main Page**  | Landing page with branding and "Get Started" CTA          |
| **Login**      | Firebase email/password authentication                    |
| **Sign Up**    | New user registration with Firebase                       |
| **Home**       | Dashboard showing progress, stats, and quick actions      |
| **Levels**     | Grid of 50 levels with lock/unlock state                  |
| **Code Editor**| Full-featured editor with run, AI explain, and AI chat    |

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👨‍💻 Author

**Sourav** — [@Souravvv45](https://github.com/Souravvv45)

---

<p align="center">Made with ❤️ for C++ learners everywhere</p>
