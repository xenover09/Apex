# APEX — Your offline AI teacher

Apex is an offline AI teacher designed to make learning accessible, secure, and private. It provides interactive education across Cybersecurity, Artificial Intelligence, and Programming in three languages (English, Roman Urdu, and اردو). Powered by Ollama and the Gemma 2-2B open-weight model, Apex operates 100% locally on your machine without needing an internet connection.

## Features

- **Chat (3 Subjects)**: Specialized AI personas for Cybersecurity, AI, and Programming.
- **Quiz**: Dynamic, model-generated multiple-choice questions tailored to the active subject.
- **Practice Modes**: 
  - *Attack Scenarios* (Cybersecurity)
  - *Code Challenge* (Programming)
  - *Prompt Lab* (AI)
- **Learning Paths**: Structured curriculum with 40 interactive topics.
- **Daily Challenge**: A unique daily question to test your knowledge.
- **Certificate**: Downloadable completion certificate upon finishing a subject's learning path.
- **Model Switcher**: Easily switch between supported local models directly in the app.
- **Gamification**: Earn XP, build your daily streak, and level up as you progress.
- **3 Languages**: Fully localized interface and AI responses in English, Roman Urdu, and اردو.
- **Themes**: Support for White, Black, and System themes.
- **Chat History**: Save and export conversation sessions locally.

## Tech Stack

- **Backend**: Python, Flask
- **AI Integration**: Ollama Local API
- **Model**: Gemma 2-2B (open-weight model)
- **Frontend**: Vanilla HTML, CSS, JavaScript (No external frameworks)

## Setup Instructions

1. **Install Ollama**: Download from [ollama.com/download](https://ollama.com/download).
2. **Pull the Model**: Open your terminal and run:
   ```bash
   ollama pull gemma2:2b
   ```
3. **Install Dependencies**: Ensure Python is installed, then run:
   ```bash
   pip install -r requirements.txt
   ```
4. **Run the App**:
   ```bash
   python app.py
   ```
5. **Start Learning**: Open your browser and navigate to `http://localhost:5000`.

## Why Open-Source AI Matters

Open-source AI represents a fundamental shift towards digital sovereignty and privacy. By running models locally, users retain complete control over their data, ensuring that learning habits and questions remain entirely private. It breaks down financial barriers and is free forever—you are no longer reliant on a corporation's servers or subscriptions. This empowers individuals everywhere with unrestricted access to education, regardless of internet connectivity.

## Project Structure

- `app.py`: Flask backend server and Ollama API integration.
- `requirements.txt`: Python dependencies.
- `scenarios.json`: Static scenario data for the Cybersecurity practice mode.
- `quiz_bank.json`: Fallback static quiz questions.
- `learning-paths.json`: Structured curriculum data.
- `templates/`
  - `index.html`: Main application interface.
- `static/`
  - `style.css`: All styling and custom responsive designs.
  - `app.js`: Client-side logic handling gamification, chat, local storage, and dynamic UI updates.

## License

This project is licensed under the MIT License.

---
**Note:** Built for Hacktoberfest 2026 — Open-Source AI Challenge, Week 1.
