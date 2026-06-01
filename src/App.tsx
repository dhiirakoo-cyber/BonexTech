/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Language, UserSession, Enrollment, UserProgress, Course } from './types';
import { COURSES_DATA, CONTACT_INFO } from './coursesData';
import Navbar from './components/Navbar';
import LoginView from './components/LoginView';
import CourseCard from './components/CourseCard';
import CourseDetailsModal from './components/CourseDetailsModal';
import LearningPortal from './components/LearningPortal';

import { Sparkles, Star, Award, Users, BookOpen, GraduationCap, Phone, MapPin, Check, Mail, ChevronRight, BookOpenCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // --- Persistent States ---
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('amoo_lang') as Language) || 'om';
  });

  const [session, setSession] = useState<UserSession>(() => {
    const saved = localStorage.getItem('amoo_session');
    return saved ? JSON.parse(saved) : { email: '', fullName: '', isLoggedIn: false };
  });

  const [enrollments, setEnrollments] = useState<Record<string, Enrollment>>(() => {
    const saved = localStorage.getItem('amoo_enrollments');
    return saved ? JSON.parse(saved) : {};
  });

  const [progress, setProgress] = useState<Record<string, UserProgress>>(() => {
    const saved = localStorage.getItem('amoo_progress');
    return saved ? JSON.parse(saved) : {};
  });

  // --- UI Layout States ---
  const [activeTab, setActiveTab] = useState<'all' | 'my-courses'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [alertText, setAlertText] = useState<{ type: 'success' | 'info'; message: string } | null>(null);

  // Sync to outer standard persistence
  useEffect(() => {
    localStorage.setItem('amoo_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('amoo_session', JSON.stringify(session));
  }, [session]);

  useEffect(() => {
    localStorage.setItem('amoo_enrollments', JSON.stringify(enrollments));
  }, [enrollments]);

  useEffect(() => {
    localStorage.setItem('amoo_progress', JSON.stringify(progress));
  }, [progress]);

  // Flash custom notify alerts
  const showFlash = (message: string, type: 'success' | 'info' = 'success') => {
    setAlertText({ message, type });
    setTimeout(() => {
      setAlertText(null);
    }, 4000);
  };

  const handleToggleLanguage = () => {
    setLanguage(prev => {
      const next = prev === 'om' ? 'en' : 'om';
      showFlash(next === 'om' ? 'Afaan Oromotti jijjiirame' : 'Switched language to English', 'info');
      return next;
    });
  };

  const handleLoginSuccess = (user: UserSession) => {
    setSession(user);
    showFlash(
      language === 'om' 
        ? `Baga nagaan dhufte, ${user.fullName}!` 
        : `Welcome back, ${user.fullName}!`,
      'success'
    );
  };

  const handleLogout = () => {
    setSession({ email: '', fullName: '', isLoggedIn: false });
    setActiveTab('all');
    showFlash(
      language === 'om' 
        ? 'Dhuunfaa keessan irraa baatanittu.' 
        : 'Successfully logged out.',
      'info'
    );
  };

  // Handle enrollment submissions
  const handleEnrollRequest = (
    courseId: string,
    method: string,
    reference: string,
    approveImmediately: boolean
  ) => {
    // Check if logged in first, if not warn
    if (!session.isLoggedIn) {
      showFlash(
        language === 'om' 
          ? 'Maaloo dura login godhaa ykn account uumaa!' 
          : 'Please sign in or create an account to register!',
        'info'
      );
      setSelectedCourse(null);
      return;
    }

    const newEnrollment: Enrollment = {
      courseId,
      status: approveImmediately ? 'approved' : 'pending',
      paymentMethod: method,
      referenceNumber: reference,
      enrolledAt: new Date().toISOString()
    };

    setEnrollments(prev => ({
      ...prev,
      [courseId]: newEnrollment
    }));

    // If instantly approved, initialize student course progress too
    if (approveImmediately) {
      if (!progress[courseId]) {
        setProgress(prev => ({
          ...prev,
          [courseId]: {
            courseId,
            completedModuleIds: [],
            quizScores: {},
            overallProgress: 0
          }
        }));
      }

      showFlash(
        language === 'om' 
          ? 'Koorsee kana seentanii barachuu dandeessu. Classroom dhuunfaa banamaadha!' 
          : 'Course registration verified instantly! Ready to study now.',
        'success'
      );
      setActiveTab('my-courses');
    } else {
      showFlash(
        language === 'om' 
          ? 'Kaffaltiin kee Abba (Amanuel) biratti qoratamaa jira. Daqiiqaa muraasatti siif gadi lakkisama.' 
          : 'Payment verification submitted. Your coach will approve shortly.',
        'info'
      );
    }

    setSelectedCourse(null);
  };

  // Update curriculum progress
  const handleUpdateProgress = (courseId: string, completedModuleIds: string[], scoreMap: Record<string, number>) => {
    const course = COURSES_DATA.find(c => c.id === courseId);
    if (!course) return;

    const totalModules = course.syllabus.length;
    const currentCompleted = completedModuleIds.length;
    const overallProgress = Math.min(100, Math.round((currentCompleted / totalModules) * 100));

    setProgress(prev => ({
      ...prev,
      [courseId]: {
        courseId,
        completedModuleIds,
        quizScores: scoreMap,
        overallProgress
      }
    }));

    if (overallProgress === 100) {
      showFlash(
        language === 'om' 
          ? 'Masha’Allah! Barnoota hunda xumurtanii jirtu. Waraqaa keessan dhuunfaa fudhadhaa.' 
          : 'Congratulations! You have completed 100% of the program. Access your certificate now!',
        'success'
      );
    } else {
      showFlash(
        language === 'om' 
          ? 'Barnoonni kee guddateera!' 
          : 'Progress updated, keep going!',
        'success'
      );
    }
  };

  const handleGoToClassroom = (courseId: string) => {
    setActiveTab('my-courses');
    showFlash(
      language === 'om' ? 'Workspace dhuunfaa keessanii seentanittu.' : 'Opened your study desk.',
      'info'
    );
  };

  // Filter courses based on catalog choice
  const filteredCourses = COURSES_DATA.filter(course => {
    if (selectedCategory === 'all') return true;
    return course.categoryEn.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  const isOm = language === 'om';

  return (
    <div className="bg-slate-950 font-sans text-slate-100 min-h-screen antialiased flex flex-col justify-between selection:bg-indigo-600 selection:text-white">
      
      {/* Dynamic Floating Banner Status Alerts */}
      <AnimatePresence>
        {alertText && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl shadow-xl border text-xs font-bold font-mono tracking-tight flex items-center gap-2 max-w-sm ${
              alertText.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/30 text-emerald-300'
                : 'bg-indigo-950/90 border-indigo-500/30 text-indigo-300'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${alertText.type === 'success' ? 'bg-emerald-400' : 'bg-indigo-400'}`}></div>
            <span>{alertText.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header NavBar */}
      <Navbar
        language={language}
        onToggleLanguage={handleToggleLanguage}
        session={session}
        onLogout={handleLogout}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Container Section */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          
          {/* CATALOG TAB (all courses & Hero Dashboard) */}
          {activeTab === 'all' && (
            <motion.div
              key="catalog"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12 pb-16"
            >
              
              {/* Elegant Styled Hero Section */}
              <section className="relative overflow-hidden py-16 md:py-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/40 via-slate-950 to-slate-950 border-b border-slate-900 px-4">
                <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl"></div>

                <div className="max-w-4xl mx-auto text-center space-y-6 relative">
                  
                  {/* Physical Center validation badge in Harar, Ethiopia */}
                  <div className="inline-flex items-center gap-1.5 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-3.5 py-1.5 rounded-full text-xs font-black tracking-wider uppercase mb-2">
                    <MapPin className="h-4 w-4 text-emerald-400" />
                    <span>Harar, Ethiopia • Premium Tech Center</span>
                  </div>

                  <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none title-font text-white bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-300">
                    {isOm ? 'Dandeettii Kee Ol-Guddisuuf!' : 'Accelerate Your Path Forward!'}
                  </h1>

                  <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-medium">
                    {isOm 
                      ? 'Koorsoota keenya fi leenjisaa beekamaa Amanuel Sharaa jalatti dandeettii computer, dizaayinii, video editing fi web development dhuunfadhaa.'
                      : 'Step up your layout and technical competence. Discover bilingual step-at-a-time premium learning paths custom tailored for builders in Ethiopia.'
                    }
                  </p>

                  {/* Highlights Grid stats metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6">
                    <div className="bg-slate-900/60 border border-slate-850 p-4 rounded-2xl">
                      <Users className="h-5 w-5 text-indigo-400 mx-auto mb-1.5" />
                      <span className="text-lg font-black text-white font-mono">1,000+</span>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{isOm ? 'Barattoota' : 'Learners Trained'}</p>
                    </div>
                    <div className="bg-slate-900/60 border border-slate-850 p-4 rounded-2xl">
                      <BookOpenCheck className="h-5 w-5 text-indigo-400 mx-auto mb-1.5" />
                      <span className="text-lg font-black text-white font-mono">5</span>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{isOm ? 'Koorsoota' : 'Premium Topics'}</p>
                    </div>
                    <div className="bg-slate-900/60 border border-slate-850 p-4 rounded-2xl">
                      <Star className="h-5 w-5 text-amber-400 mx-auto mb-1.5 fill-amber-400/20" />
                      <span className="text-lg font-black text-white font-mono">4.9/5</span>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{isOm ? 'Madaalii' : 'Reviews Rating'}</p>
                    </div>
                    <div className="bg-slate-900/60 border border-slate-850 p-4 rounded-2xl">
                      <Award className="h-5 w-5 text-emerald-400 mx-auto mb-1.5" />
                      <span className="text-lg font-black text-white font-mono">100%</span>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{isOm ? 'Mirkaneeffama' : 'Accredited PDF'}</p>
                    </div>
                  </div>

                  {!session.isLoggedIn && (
                    <div className="pt-6">
                      <a
                        href="#auth-view"
                        className="bg-indigo-650 hover:bg-indigo-750 text-white font-extrabold text-xs px-6 py-3 rounded-xl transition duration-150 inline-flex items-center gap-1 shadow-lg shadow-indigo-950"
                      >
                        <span>{isOm ? 'Amma Seeni (Get Access)' : 'Get Instant Catalog Access'}</span>
                        <ChevronRight className="h-4 w-4" />
                      </a>
                    </div>
                  )}

                </div>
              </section>

              {/* Course Catalog display Row */}
              <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-8">
                
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-black text-white tracking-tight title-font">
                      {isOm ? 'Koorsoota Keenya / Our Courses' : 'Interactive Course Catalog'}
                    </h2>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {isOm 
                        ? 'Check out our professional courses designed to elevate your career goals.'
                        : 'Filter and double-tap on our professional streams to explore curriculum highlights.'
                      }
                    </p>
                  </div>

                  {/* Filter tags panel */}
                  <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
                    {['all', 'web', 'design', 'photo', 'video', 'marketing'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`text-[11px] font-black px-3 py-1.5 rounded-lg transition duration-200 cursor-pointer ${
                          selectedCategory === cat
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {cat.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Courses card grid rendering */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      language={language}
                      enrollment={enrollments[course.id]}
                      onOpenDetails={(c) => setSelectedCourse(c)}
                      onGoToClassroom={handleGoToClassroom}
                    />
                  ))}
                </div>

              </section>

              {/* Login authentication module screen at bottom if not logged in */}
              {!session.isLoggedIn && (
                <section id="auth-view" className="max-w-4xl mx-auto px-4 pt-10 border-t border-slate-900">
                  <LoginView language={language} onLoginSuccess={handleLoginSuccess} />
                </section>
              )}

            </motion.div>
          )}

          {/* CLASSROOM STUDY DESK WORKSPACE */}
          {activeTab === 'my-courses' && session.isLoggedIn && (
            <motion.div
              key="classroom"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-4"
            >
              <LearningPortal
                language={language}
                session={session}
                courses={COURSES_DATA}
                enrollments={enrollments}
                progress={progress}
                onUpdateProgress={handleUpdateProgress}
                onNavigateToCatalog={() => setActiveTab('all')}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer Credentials */}
      <footer className="bg-slate-950 border-t border-slate-900 py-6 px-4 shrink-0 text-center text-slate-500 font-mono text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 Amoo Academy. Coders & Architects Co.</p>
          
          <div className="flex flex-wrap justify-center gap-4 text-slate-400 text-[11px]">
            <span>{isOm ? 'Abbaa:' : 'Coach:'} <strong className="text-white">Amanuel</strong></span>
            <span>•</span>
            <span>{isOm ? 'Bilbila:' : 'Telephone:'} <strong className="text-white">+251967145146</strong></span>
            <span>•</span>
            <span>{isOm ? 'Magaalaa:' : 'Region:'} <strong className="text-white">Harar, Ethiopia</strong></span>
          </div>
        </div>
      </footer>

      {/* Course detailed curriculum & simulated billing gateway */}
      <AnimatePresence>
        {selectedCourse && (
          <CourseDetailsModal
            course={selectedCourse}
            language={language}
            enrollment={enrollments[selectedCourse.id]}
            onClose={() => setSelectedCourse(null)}
            onEnrollRequest={handleEnrollRequest}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
