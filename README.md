# MedhAI

MedhAI - AI Chat Application 💬
A beautiful and responsive AI chat application built with React.js and powered by the Google Gemini API. This project showcases a modern, feature-rich interface with persistent chat history, dynamic animations, and a cohesive glassmorphism design.

Live Demo: https://medhai.netlify.app/

![Screenshot (6)](https://github.com/user-attachments/assets/ada63b4c-f6c4-4ad6-b9a4-d30d809cd54a)
![Screenshot (7)](https://github.com/user-attachments/assets/2edd6bf8-3117-4c22-9bb0-e20b815e8607)
![Screenshot (8)](https://github.com/user-attachments/assets/c55d3dc0-d2b9-4ee6-ac16-3cfe8b55c70a)


✨ Features
Real-time AI Chat: Seamless, real-time conversation with Google's Gemini model.

Persistent Chat History: Conversations are automatically saved to localStorage, allowing you to revisit, continue, or delete past chats across browser sessions.

Modern & Responsive UI: A sleek, dual-pane layout with a green color theme and a stunning glassmorphism effect on all major components.

Animated Sidebar: A fully collapsible and expandable sidebar with smooth CSS transitions for a fluid user experience.

Dynamic "Thinking" Animation: A custom loader appears next to the bot's icon, providing an intuitive visual cue that the AI is processing a response.

Typewriter Effect: AI responses are rendered word-by-word for new messages, while old conversations load instantly.

Full CRUD for Chats: Users can Create new chats, Read past chats from the sidebar, and Delete unwanted chat sessions.




🛠️ Tech Stack
Frontend: React.js (with Vite)

State Management: React Context API

Styling: CSS3 (with Flexbox, Grid, Animations, and Glassmorphism)

Icons: react-icons

API: Google Gemini API (fetch)

Deployment: Netlify




🚀 Getting Started
To run this project locally, follow these steps:

1. Clone the repository

Bash

git clone https://github.com/ByteBard01/MedhAI.git
cd MedhAI

2. Install dependencies

Bash

npm install

3. Set up environment variables
You need to create a file named .env in the root of your project folder and add your Google Gemini API key to it.

Create a .env file:

VITE_GEMINI_API_KEY="YOUR_API_KEY_HERE"
(Replace YOUR_API_KEY_HERE with your actual key from Google AI Studio.)

4. Run the development server

Bash

npm run dev
The application should now be running on http://localhost:5173 (or a similar port).

📄 License
This project is licensed under the MIT License. See the LICENSE file for details.
