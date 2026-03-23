import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Landing.css';

const Landing = () => {
  const { user } = useAuth();

  return (
    <div className="landing">
      {/* Navbar */}
      <nav className="landing-nav">
        <div className="landing-nav-inner">
          <div className="landing-brand">
            <span className="landing-brand-icon">🎓</span>
            <span className="landing-brand-text">Florence AI</span>
          </div>
          <div className="landing-nav-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#curriculum">Curriculum</a>
          </div>
          <div className="landing-nav-actions">
            {user ? (
              <Link to="/dashboard" className="landing-cta-btn">Dashboard →</Link>
            ) : (
              <>
                <Link to="/login" className="landing-signin">Sign in</Link>
                <Link to="/register" className="landing-cta-btn">Sign Up Free</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="hero-badge">🇳🇬 Built for Nigerian Students</div>
        <h1 className="hero-headline">
          Master Maths<br />
          <span className="hero-highlight">3x faster</span><br />
          with AI
        </h1>
        <p className="hero-sub">
          Meet GALE, your personal AI tutor that understands the Nigerian curriculum.
          WAEC & JAMB-aligned lessons, instant feedback, and worked examples
          that actually make sense to you.
        </p>
        <div className="hero-actions">
          <Link to="/register" className="landing-cta-btn landing-cta-lg">
            Start Learning — It's Free
          </Link>
          <Link to="/login" className="landing-outline-btn">
            I have an account
          </Link>
        </div>
        <div className="hero-social-proof">
          <div className="proof-avatars">
            <span>A</span><span>C</span><span>E</span><span>O</span><span>+</span>
          </div>
          <span className="proof-text">Join hundreds of students acing Mathematics</span>
        </div>
      </section>

      {/* Features Section */}
      <section className="landing-features" id="features">
        <div className="features-inner">
          <div className="section-label">Why Florence AI?</div>
          <h2 className="section-title">Everything you need to<br /><span className="text-accent">master Maths</span></h2>

          <div className="features-grid">
            <div className="feature-card feature-card-accent">
              <div className="feature-icon">🤖</div>
              <h3>GALE</h3>
              <p>Ask questions anytime. Get patient, step-by-step worked examples using everyday Nigerian scenarios.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>WAEC & JAMB Aligned</h3>
              <p>10 topics from Number Systems to Logarithms & Surds, aligned with WAEC and JAMB syllabi. Structured properly.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Smart Quizzes</h3>
              <p>50+ auto-graded questions with detailed workings. AI can generate unlimited fresh questions on any topic.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Progress Tracking</h3>
              <p>Real-time dashboard showing your strengths, weaknesses, and learning streaks. Stay motivated.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Nigerian Context</h3>
              <p>Examples using Naira, sharing oranges, JAMB scores, and market prices. No confusing foreign word problems.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Instant Feedback</h3>
              <p>Choose difficulty, timer, and instant feedback. See explanations for every answer. Learn from your mistakes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="landing-how" id="how-it-works">
        <div className="how-inner">
          <div className="section-label">How It Works</div>
          <h2 className="section-title">Start learning in<br /><span className="text-accent">3 simple steps</span></h2>
          
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <h3>Sign up in seconds</h3>
              <p>Create an account with Google or email. No credit card, no wahala.</p>
            </div>
            <div className="step-card">
              <div className="step-number">02</div>
              <h3>Pick a topic & learn</h3>
              <p>Start from Number Systems or jump to any topic. Each lesson has clear objectives and worked examples.</p>
            </div>
            <div className="step-card">
              <div className="step-number">03</div>
              <h3>Quiz yourself & grow</h3>
              <p>Configure quizzes by difficulty, take timed tests, ask GALE for help, and watch your scores climb.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Preview */}
      <section className="landing-curriculum" id="curriculum">
        <div className="curriculum-inner">
          <div className="section-label">Curriculum</div>
          <h2 className="section-title">10 topics from<br /><span className="text-accent">basics to mastery</span></h2>
          
          <div className="curriculum-list">
            {[
              'Number Systems & Operations',
              'Algebra — Expressions & Equations',
              'Quadratic Equations',
              'Sets & Venn Diagrams',
              'Trigonometry',
              'Statistics & Probability',
              'Coordinate Geometry',
              'Geometry — Circles & Angles',
              'Sequences & Series',
              'Logarithms & Surds'
            ].map((title, i) => (
              <div key={i} className="curriculum-item">
                <span className="curriculum-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="curriculum-title">{title}</span>
                <span className="curriculum-badge">{i < 4 ? 'Beginner' : i < 9 ? 'Intermediate' : 'Advanced'}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="landing-cta-section">
        <div className="cta-inner">
          <h2>Ready to start learning?</h2>
          <p>Join Florence AI today. It's free, it's smart, and it's built for you.</p>
          <Link to="/register" className="landing-cta-btn landing-cta-lg">
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span>🎓</span>
            <span className="landing-brand-text">Florence AI</span>
          </div>
          <p className="footer-tagline">AI-powered Mathematics tutoring for the Nigerian curriculum.</p>
          <p className="footer-copy">© 2026 Florence AI. Built with ❤️ for Nigerian students.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
