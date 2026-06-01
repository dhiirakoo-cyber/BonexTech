import { useState, useMemo } from 'react';
import { Course, Language, Enrollment, UserProgress } from '../types';
import { BookOpen, CheckCircle, HelpCircle, Trophy, RefreshCcw, Award, Phone, Printer, Download, ArrowRight, ShieldAlert, GraduationCap, ArrowLeft, Star } from 'lucide-react';
import { CONTACT_INFO } from '../coursesData';
import { motion, AnimatePresence } from 'motion/react';

interface LearningPortalProps {
  language: Language;
  session: { email: string; fullName: string };
  courses: Course[];
  enrollments: Record<string, Enrollment>;
  progress: Record<string, UserProgress>;
  onUpdateProgress: (courseId: string, completedModuleIds: string[], scoreMap: Record<string, number>) => void;
  onNavigateToCatalog: () => void;
}

export default function LearningPortal({
  language,
  session,
  courses,
  enrollments,
  progress,
  onUpdateProgress,
  onNavigateToCatalog,
}: LearningPortalProps) {
  const isOm = language === 'om';

  // State
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [selectedModuleIdx, setSelectedModuleIdx] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizFeedback, setQuizFeedback] = useState<{ isCorrect: boolean; message: string }>({ isCorrect: false, message: '' });
  const [showCertificate, setShowCertificate] = useState(false);

  // Filter only approved courses
  const myApprovedCourses = useMemo(() => {
    return courses.filter(c => enrollments[c.id]?.status === 'approved');
  }, [courses, enrollments]);

  // Set the first course as default if empty
  const activeCourse = useMemo(() => {
    if (selectedCourseId) {
      return courses.find(c => c.id === selectedCourseId);
    }
    if (myApprovedCourses.length > 0) {
      return myApprovedCourses[0];
    }
    return null;
  }, [selectedCourseId, myApprovedCourses, courses]);

  // Read current progress
  const currentProgress: UserProgress = useMemo(() => {
    if (!activeCourse) return { courseId: '', completedModuleIds: [], quizScores: {}, overallProgress: 0 };
    return p_getProgress(activeCourse.id);
  }, [activeCourse, progress]);

  function p_getProgress(courseId: string): UserProgress {
    return progress[courseId] || {
      courseId,
      completedModuleIds: [],
      quizScores: {},
      overallProgress: 0
    };
  }

  // Handle slide module index
  const activeModule = activeCourse ? activeCourse.syllabus[selectedModuleIdx] : null;

  // Handle quiz submission
  const handleAnswerSelect = (idx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswer(idx);
  };

  const handleVerifyQuiz = () => {
    if (!activeCourse || !activeModule || !activeModule.quiz || selectedAnswer === null) return;

    const quiz = activeModule.quiz;
    const isCorrect = selectedAnswer === quiz.correctIndex;

    setQuizSubmitted(true);
    if (isCorrect) {
      setQuizFeedback({
        isCorrect: true,
        message: isOm 
          ? 'Deebiin keessan sirrii dha! Qabxii guutuu argattaniirtu.' 
          : 'Correct answer! You scored full credits for this unit.'
      });

      // Update student progress in DB
      const alreadyCompleted = currentProgress.completedModuleIds;
      if (!alreadyCompleted.includes(activeModule.id)) {
        const nextCompleted = [...alreadyCompleted, activeModule.id];
        const nextScores = { ...currentProgress.quizScores, [activeModule.id]: 100 };
        onUpdateProgress(activeCourse.id, nextCompleted, nextScores);
      }
    } else {
      setQuizFeedback({
        isCorrect: false,
        message: isOm 
          ? 'Deebiin keessan sirrii miti. Maaloo dizaayinii barruu keessaa deebitanii ilaalaa yaallaa!' 
          : 'Incorrect answer. Read the course module notes again and try again!'
      });
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswer(null);
    setQuizSubmitted(false);
    setQuizFeedback({ isCorrect: false, message: '' });
  };

  const handleModuleSelect = (idx: number) => {
    setSelectedModuleIdx(idx);
    handleResetQuiz();
  };

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourseId(courseId);
    setSelectedModuleIdx(0);
    handleResetQuiz();
    setShowCertificate(false);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      
      {/* If student has no approved active courses yet */}
      {myApprovedCourses.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-8 md:p-12 text-center max-w-2xl mx-auto space-y-6 shadow-xl"
        >
          <div className="inline-flex p-4 bg-indigo-500/10 text-indigo-400 rounded-2xl">
            <BookOpen className="h-8 w-8 animate-bounce" />
          </div>
          <h2 className="text-3xl font-black text-white title-font tracking-tight">
            {isOm ? 'Gara Dhuunfaa Classroomitti Koottaan!' : 'Your Online Classroom'}
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto">
            {isOm 
              ? 'Koorsee kamiyyuu irratti hin galmoofne ykn kaffaltiin keessan hin mirkanaa’in jira. Koorsoota keessa tokko filadhaa kaffaltii ergaa ykn daqiiqaa muraasati "Fast Demo Unlock" dhimma itti bahaa.'
              : 'You haven’t enrolled in any verified course yet. Please explore our premium catalog and request an enrollment or use the Fast Demo Unlock simulation inside any course details!'
            }
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={onNavigateToCatalog}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl transition duration-150 cursor-pointer flex items-center justify-center gap-2 text-sm shadow-lg active:scale-95"
            >
              <span>{isOm ? 'Koorsoota Ilaali' : 'Browse Premium Courses'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      ) : (
        /* Classroom workspace split */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Courses & Modules Directory Panel (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Quick Enrolled Selector list */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 shadow-lg">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-3">
                {isOm ? 'Koorsoota Keessan' : 'Your Enrolled Programs'}
              </span>
              <div className="space-y-2">
                {myApprovedCourses.map((c) => {
                  const prog = p_getProgress(c.id);
                  const isCur = activeCourse?.id === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => handleCourseSelect(c.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs flex justify-between items-center cursor-pointer ${
                        isCur
                          ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                          : 'bg-slate-950/70 border-slate-850 text-slate-300 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="font-bold leading-tight">
                          {isOm ? c.titleOm : c.titleEn}
                        </span>
                        <span className={`text-[10px] mt-0.5 font-mono ${isCur ? 'text-indigo-200' : 'text-slate-500'}`}>
                          {prog.overallProgress}% {isOm ? 'Xumurameera' : 'completed'}
                        </span>
                      </div>
                      <ChevronRight isCur={isCur} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Current Course Syllabus Directory tabs */}
            {activeCourse && (
              <div className="bg-slate-900/55 border border-slate-800 rounded-2xl p-4 shadow-md space-y-3.5">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    {isOm ? 'Syllabus/Leenjii' : 'Syllabus Index'}
                  </span>
                  <span className="text-xs bg-slate-950 font-black font-mono text-indigo-400 px-2 py-0.5 rounded border border-slate-850">
                    {currentProgress.completedModuleIds.length} / {activeCourse.syllabus.length} Completed
                  </span>
                </div>

                <div className="space-y-2">
                  {activeCourse.syllabus.map((mod, index) => {
                    const isModCompleted = currentProgress.completedModuleIds.includes(mod.id);
                    const isSelected = selectedModuleIdx === index;
                    return (
                      <button
                        key={mod.id}
                        onClick={() => handleModuleSelect(index)}
                        className={`w-full text-left p-3 rounded-xl border text-xs flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-slate-800/80 border-slate-750 text-white'
                            : 'bg-slate-950/20 border-slate-850 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={`w-5 h-5 flex items-center justify-center rounded-lg font-mono font-bold text-[10px] ${
                            isModCompleted 
                              ? 'bg-emerald-500/20 text-emerald-400' 
                              : isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {index + 1}
                          </span>
                          <span className="font-bold">{isOm ? mod.titleOm : mod.titleEn}</span>
                        </div>
                        {isModCompleted && <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* If completed 100%, show certificate trigger */}
                {currentProgress.overallProgress === 100 && (
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowCertificate(true)}
                    className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black py-3 rounded-xl transition duration-150 text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-emerald-900/10"
                  >
                    <Trophy className="h-4 w-4 text-amber-300" />
                    <span>{isOm ? 'Waraqaa Mirkaneeffama (Get Certificate)' : 'Generate Official Certificate'}</span>
                  </motion.button>
                )}
              </div>
            )}
          </div>

          {/* Active Lesson Content & Interactive Quiz Desk (8 cols) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {activeCourse && activeModule && (
                <motion.div
                  key={activeModule.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  
                  {/* Lesson Heading and progress bar */}
                  <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 shadow-lg">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div>
                        <span className="text-[10px] bg-indigo-500/10 text-indigo-400 font-mono font-extrabold px-3 py-1 rounded-full uppercase">
                          {isOm ? 'Barannoo' : 'Lesson Study'} - {activeModule.duration}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-slate-400 mt-0.5">{isOm ? 'Rawwii:' : 'Progress:'}</span>
                        <span className="text-sm font-black text-slate-100 font-mono">{currentProgress.overallProgress}%</span>
                      </div>
                    </div>

                    <h3 className="text-xl md:text-2xl font-black text-white title-font tracking-tight">
                      {isOm ? activeModule.titleOm : activeModule.titleEn}
                    </h3>

                    {/* Progress slider bar */}
                    <div className="w-full bg-slate-950 h-2.5 rounded-full mt-4 overflow-hidden border border-slate-900">
                      <div
                        className="bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 h-full transition-all duration-300"
                        style={{ width: `${currentProgress.overallProgress}%` }}
                      ></div>
                    </div>

                    {/* Rich text tutorial content */}
                    <div className="mt-6 pt-5 border-t border-slate-800/80 text-slate-300 text-sm leading-relaxed space-y-4">
                      <p className="indent-4">
                        {isOm ? activeModule.contentOm : activeModule.contentEn}
                      </p>
                      <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-850 text-slate-400 text-xs space-y-2 font-mono">
                        <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">⚡ {isOm ? 'Mirkaneeffama Leenjiitii:' : 'Instructor Note:'}</span>
                        <p>
                          {isOm 
                            ? `Gulaallii fi barannoo tokko xumuruuf gaaffilee gadii sirriitti deebisuu qabda. Gaaffiwwan ${activeCourse.syllabus.length} bifa kanaan xumuruun certificate argatta.`
                            : `To solidify and mark this module complete, successfully answer the concept quiz question below. Completing all ${activeCourse.syllabus.length} modules qualifies you for official graduation status.`
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Interactive assessment quiz widget */}
                  {activeModule.quiz && (
                    <div className="bg-slate-900/50 border border-slate-850 rounded-3xl p-6 shadow-md space-y-5">
                      <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
                        <HelpCircle className="h-4 w-4 text-emerald-400" />
                        <span>{isOm ? 'Madaalii Beekumsaa (Unit Assessment)' : 'Unit Concept Quiz'}</span>
                      </h4>

                      {/* Display question */}
                      <p className="text-sm font-extrabold text-slate-200">
                        {isOm ? activeModule.quiz.questionOm : activeModule.quiz.questionEn}
                      </p>

                      {/* Choices block */}
                      <div className="space-y-2.5">
                        {(isOm ? activeModule.quiz.optionsOm : activeModule.quiz.optionsEn).map((opt, idx) => {
                          const isSelected = selectedAnswer === idx;
                          let optStyle = 'bg-slate-950 border-slate-850 text-slate-300 hover:border-slate-700';

                          if (isSelected) {
                            optStyle = 'bg-indigo-650 border-indigo-500 text-white font-extrabold';
                          }

                          if (quizSubmitted) {
                            if (idx === activeModule.quiz.correctIndex) {
                              optStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-extrabold';
                            } else if (isSelected) {
                              optStyle = 'bg-red-950/60 border-red-900 text-red-300';
                            } else {
                              optStyle = 'bg-slate-950/20 border-slate-900 text-slate-600 cursor-not-allowed';
                            }
                          }

                          return (
                            <button
                              key={idx}
                              disabled={quizSubmitted}
                              onClick={() => handleAnswerSelect(idx)}
                              className={`w-full text-left text-xs p-3.5 rounded-xl border transition duration-150 flex items-center gap-3 cursor-pointer ${optStyle}`}
                            >
                              <span className="text-[10px] uppercase font-mono bg-slate-800 text-slate-400 w-5 h-5 flex items-center justify-center rounded">
                                {String.fromCharCode(65 + idx)}
                              </span>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Status assessment banners */}
                      {quizSubmitted && (
                        <div className={`p-4 rounded-xl text-xs flex items-center gap-2.5 ${
                          quizFeedback.isCorrect 
                            ? 'bg-emerald-950/60 border border-emerald-900/60 text-emerald-300' 
                            : 'bg-red-950/60 border border-red-900/60 text-red-300'
                        }`}>
                          <CheckCircle className={`h-5 w-5 shrink-0 ${quizFeedback.isCorrect ? 'text-emerald-400' : 'text-red-400'}`} />
                          <p>{quizFeedback.message}</p>
                        </div>
                      )}

                      {/* Submit controls */}
                      <div className="flex gap-2">
                        {!quizSubmitted ? (
                          <button
                            disabled={selectedAnswer === null}
                            onClick={handleVerifyQuiz}
                            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-950 text-white disabled:text-slate-600 font-bold px-5 py-2.5 rounded-xl text-xs transition duration-100 cursor-pointer active:scale-95"
                          >
                            {isOm ? 'Deebii Mirkaneessi' : 'Submit Answer'}
                          </button>
                        ) : (
                          <button
                            onClick={handleResetQuiz}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold px-4 py-2.5 rounded-xl text-xs transition duration-100 cursor-pointer flex items-center gap-1.5"
                          >
                            <RefreshCcw className="h-3.5 w-3.5" />
                            <span>{isOm ? 'Haaromsi / Retake' : 'Try Again'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      )}

      {/* Graduation Certificate overlay Modal */}
      {showCertificate && activeCourse && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl p-6 md:p-8 flex flex-col space-y-6"
          >
            {/* Header controls */}
            <div className="flex items-center justify-between border-b border-slate-850 pb-4">
              <span className="text-xs text-amber-400 font-black flex items-center gap-1 uppercase">
                <Trophy className="h-4 w-4" />
                {isOm ? 'Eebba Leenjitii' : 'Official Graduation'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintCertificate}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold p-2 rounded-xl transition cursor-pointer text-xs flex items-center gap-1"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>{isOm ? 'Print' : 'Print Certificate'}</span>
                </button>
                <button
                  onClick={() => setShowCertificate(false)}
                  className="border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white px-3 py-2 rounded-xl transition cursor-pointer text-xs"
                >
                  {isOm ? 'Dufi' : 'Dismiss'}
                </button>
              </div>
            </div>

            {/* Official Gorgeous styled Certificate Body to print */}
            <div id="print-area" className="bg-amber-50/5 text-amber-100 p-8 md:p-12 border-2 border-dashed border-amber-600/30 rounded-2xl relative text-center space-y-6 overflow-hidden shadow-inner">
              
              {/* Background watermark badge icons */}
              <div className="absolute -top-12 -right-12 text-amber-500/5 rotate-12">
                <GraduationCap className="w-48 h-48" />
              </div>
              <div className="absolute -bottom-12 -left-12 text-amber-500/5 -rotate-12">
                <Award className="w-48 h-48" />
              </div>

              {/* Certificate content */}
              <div className="flex justify-center mb-2">
                <div className="p-3 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20">
                  <GraduationCap className="h-8 w-8" />
                </div>
              </div>

              <div className="space-y-1">
                <h2 className="text-xs tracking-widest text-amber-400/80 font-black uppercase font-mono">
                  Waraqaa Mirkaneeffama Barnootaa
                </h2>
                <h1 className="text-3xl font-black text-amber-200 title-font tracking-tight">
                  AMOO ACADEMY
                </h1>
                <p className="text-[10px] text-slate-400 italic">
                  {CONTACT_INFO.address} | Call: {CONTACT_INFO.phone}
                </p>
              </div>

              <div className="space-y-1.5 py-4">
                <p className="text-xs text-slate-300">
                  {isOm ? 'Waraqaan kun akka ragatti korniyyeen dhuunfameeraaf:' : 'This credentials verify that our outstanding learner:'}
                </p>
                <h3 className="text-2xl font-black text-white underline decoration-amber-500 decoration-2 underline-offset-4 tracking-wide title-font py-1.5">
                  {session.fullName}
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  {isOm 
                    ? `Barnoota guutuu ${activeCourse.syllabus.length} Modules fi madaaloota dizaayinii irratti dammaqaan hirmaachun barannoo dandeettii:` 
                    : `Has successfully completed all curricular tracks and unit assessments required for the premium bilingual program:`
                  }
                </p>
                <h4 className="text-lg font-black text-amber-300 uppercase py-1">
                  {isOm ? activeCourse.titleOm : activeCourse.titleEn}
                </h4>
              </div>

              <p className="text-[10px] text-slate-400">
                {isOm ? 'Bara 2026 mirkanaa‘uun kennameera.' : 'Granted with absolute honors under fiscal term June 2026.'}
              </p>

              {/* Signatures Row */}
              <div className="pt-6 border-t border-amber-800/20 flex flex-col sm:flex-row justify-between items-center px-4 gap-4">
                <div className="text-center sm:text-left">
                  <span className="text-[10px] text-slate-500 font-mono block">{isOm ? 'Adreessi:' : 'Harar, Ethiopia Date:'}</span>
                  <span className="text-xs text-slate-300 font-bold block mt-0.5">01-06-2026</span>
                </div>
                <div className="text-center sm:text-right">
                  <span className="text-[10px] text-slate-500 font-mono block">{isOm ? 'Leenjisaa:' : 'Instructor Head:'}</span>
                  <span className="text-xs text-amber-400 font-black block mt-0.5 tracking-tight">
                    {CONTACT_INFO.owner} Sharaa
                  </span>
                </div>
              </div>

            </div>

            {/* Print style injection */}
            <style>{`
              @media print {
                body * {
                  visibility: hidden;
                }
                #print-area, #print-area * {
                  visibility: visible;
                }
                #print-area {
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100%;
                  background: white !important;
                  color: black !important;
                  border: 2px solid #b45309 !important;
                  padding: 40px !important;
                }
              }
            `}</style>
          </motion.div>
        </div>
      )}

    </div>
  );
}

// Chevron helper icon component
function ChevronRight({ isCur }: { isCur: boolean }) {
  return (
    <svg
      className={`h-4 w-4 transition-transform duration-200 shrink-0 ${isCur ? 'text-white' : 'text-slate-500'}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinelinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
    </svg>
  );
}
