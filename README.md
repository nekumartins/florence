# Florence AI

Florence AI is an AI-powered personalized tutoring platform designed specifically for Nigerian students preparing for WAEC and JAMB examinations. It features **GALE** (Gap Analysis and Learning Engine), an intelligent assistant that utilizes the Socratic method to guide students through a comprehensive Mathematics curriculum.

## Highlights
- **Curriculum-Aligned:** 10 structured lessons covering deep Mathematics topics from Number Systems to Logarithms.
- **Dynamic Quizzes:** Choose difficulty, time limits, and whether to use curriculum questions or AI-generated questions on the fly.
- **Instant Feedback:** Get immediate, detailed explanations for quiz questions to learn from mistakes instantly.
- **GALE AI Tutor:** A customized conversational assistant powered by Groq and Llama 3 that acts as a patient, encouraging Nigerian math tutor.
- **Google Authentication:** Seamless and secure sign-in process for students.
- **Progress Tracking:** Granular tracking of completed lessons, quiz scores, and learning time.

## Tech Stack
- **Frontend:** React 19, Vite, React Router, CSS Variables (Glassmorphism UI)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Uses `mongodb-memory-server` out-of-the-box for easy local dev, easily swappable to Atlas)
- **AI Integrations:** Groq SDK (Llama 3 70B & 8B) 
- **Authentication:** Google Identity Services, JWT

## Getting Started Locally

### 1. Prerequisites
- Node.js (v18+)
- A Google Cloud OAuth Client ID
- A Groq API Key

### 2. Installation
Clone the repository and install dependencies for both the client and server:

```bash
# Install Server Dependencies
cd server
npm install

# Install Client Dependencies
cd ../client
npm install
```

### 3. Environment Variables
Create `.env` files in both directories:

**Server (`server/.env`)**
```env
PORT=5000
MONGODB_URI= # Optional: Leave blank to use in-memory database
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
GOOGLE_CLIENT_ID=your_google_client_id
```

**Client (`client/.env`)**
```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### 4. Running the App
Start both servers in development mode:

```bash
# In the server directory:
npm start

# In the client directory:
npm run dev
```

The app will be available at `http://localhost:5173`.

## License
MIT
