require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Lesson = require('../models/Lesson');
const Quiz = require('../models/Quiz');
const lessonsData = require('./lessons');
const quizzesData = require('./quizzes');

const seed = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Lesson.deleteMany({});
    await Quiz.deleteMany({});
    
    // Seed lessons
    console.log('📚 Seeding lessons...');
    const createdLessons = await Lesson.insertMany(lessonsData);
    console.log(`   ✅ Created ${createdLessons.length} lessons`);
    
    // Build order-to-id map
    const orderToId = {};
    createdLessons.forEach(lesson => {
      orderToId[lesson.order] = lesson._id;
    });
    
    // Seed quizzes with lesson references
    console.log('📝 Seeding quizzes...');
    const quizzesToInsert = quizzesData.map(quiz => ({
      lessonId: orderToId[quiz.lessonOrder],
      title: quiz.title,
      passingScore: quiz.passingScore,
      questions: quiz.questions
    }));
    
    const createdQuizzes = await Quiz.insertMany(quizzesToInsert);
    console.log(`   ✅ Created ${createdQuizzes.length} quizzes`);
    
    console.log('\n🎉 Seed completed successfully!');
    console.log(`   📚 ${createdLessons.length} lessons`);
    console.log(`   📝 ${createdQuizzes.length} quizzes`);
    console.log(`   ❓ ${quizzesData.reduce((sum, q) => sum + q.questions.length, 0)} total questions`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seed();
