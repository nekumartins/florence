const mongoose = require('mongoose');

let mongoServer;

const connectDB = async () => {
  try {
    let uri = process.env.MONGODB_URI;

    // Try connecting to the configured URI first
    try {
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 1500 });
      console.log(`✅ MongoDB connected: ${mongoose.connection.host}`);
      return;
    } catch (err) {
      console.log('⚠️  External MongoDB not available. Starting in-memory MongoDB...');
    }

    // Fallback to in-memory MongoDB
    const { MongoMemoryServer } = require('mongodb-memory-server');
    mongoServer = await MongoMemoryServer.create();
    uri = mongoServer.getUri();
    await mongoose.connect(uri);
    console.log(`✅ In-memory MongoDB started at: ${uri}`);
    console.log('   ℹ️  Data will not persist after server restart.');
    
    // Auto-seed when using in-memory DB
    await autoSeed();
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

const autoSeed = async () => {
  const Lesson = require('../models/Lesson');
  const Quiz = require('../models/Quiz');
  const lessonsData = require('../seeds/lessons');
  const quizzesData = require('../seeds/quizzes');

  const lessonCount = await Lesson.countDocuments();
  if (lessonCount > 0) return; // Already seeded

  console.log('📚 Auto-seeding curriculum data...');
  const createdLessons = await Lesson.insertMany(lessonsData);
  
  const orderToId = {};
  createdLessons.forEach(l => { orderToId[l.order] = l._id; });

  const quizzesToInsert = quizzesData.map(q => ({
    lessonId: orderToId[q.lessonOrder],
    title: q.title,
    passingScore: q.passingScore,
    questions: q.questions
  }));
  await Quiz.insertMany(quizzesToInsert);
  
  console.log(`   ✅ Seeded ${createdLessons.length} lessons and ${quizzesToInsert.length} quizzes`);
};

module.exports = connectDB;
