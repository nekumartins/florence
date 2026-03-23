require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { execSync } = require('child_process');
const connectDB = require('./config/db');
const Lesson = require('./models/Lesson');

// Route imports
const authRoutes = require('./routes/auth');
const lessonRoutes = require('./routes/lessons');
const quizRoutes = require('./routes/quizzes');
const progressRoutes = require('./routes/progress');
const tutorRoutes = require('./routes/tutor');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/tutor', tutorRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Florence AI API is running 🚀' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const clientDistPath = path.resolve(__dirname, '../client/dist');
  app.use(express.static(clientDistPath));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(clientDistPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  
  try {
    const lessonCount = await Lesson.countDocuments();
    if (lessonCount === 0) {
      console.log('🌱 Database is empty. Running automatic seed...');
      execSync('npm run seed', { stdio: 'inherit' });
      console.log('✅ Auto-seed complete!');
    }
  } catch (error) {
    console.error('Failed to run auto-seed:', error);
  }

  app.listen(PORT, () => {
    console.log(`🚀 Florence AI server running on port ${PORT}`);
  });
};

start();
