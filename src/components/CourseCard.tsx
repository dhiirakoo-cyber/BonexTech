import { Course, Language, Enrollment } from '../types';
import { Star, BookOpen, Clock, CheckCircle, AlertCircle, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

interface CourseCardProps {
  key?: string;
  course: Course;
  language: Language;
  enrollment: Enrollment | undefined;
  onOpenDetails: (course: Course) => void;
  onGoToClassroom: (courseId: string) => void;
}

export default function CourseCard({
  course,
  language,
  enrollment,
  onOpenDetails,
  onGoToClassroom,
}: CourseCardProps) {
  const isOm = language === 'om';

  // Categories style guide 
  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'WEB DEVELOPMENT':
      case 'MISOOMA WEEBSAAYITII':
        return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
      case 'GRAPHIC DESIGN':
      case 'DIZAAYINII GIRAAFIKAA':
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      case 'PHOTO EDITING':
      case 'GULAALLII SUURAA':
        return 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
      case 'VIDEO EDITING':
      case 'GULAALLII VIIDIYOO':
        return 'bg-sky-500/10 text-sky-400 border border-sky-500/20';
      default:
        return 'bg-rose-500/10 text-rose-400 border border-rose-500/20';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -6, borderColor: 'rgba(99, 102, 241, 0.4)' }}
      transition={{ duration: 0.2 }}
      className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl flex flex-col h-full group"
    >
      {/* Course image / top deck */}
      <div className="relative h-48 w-full overflow-hidden shrink-0 bg-slate-950">
        <img
          src={course.image}
          alt={isOm ? course.titleOm : course.titleEn}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
        
        {/* Flag badge */}
        <div className="absolute top-3 left-3 bg-slate-900/90 text-slate-200 text-[10px] font-black px-2.5 py-1 rounded-lg border border-slate-700 uppercase tracking-wider backdrop-blur-sm">
          {isOm ? course.tagOm : course.tagEn}
        </div>

        {/* Rating and Reviews overview */}
        <div className="absolute bottom-3 right-3 bg-slate-900/95 border border-slate-700/60 rounded-lg px-2 py-0.5 flex items-center gap-1 backdrop-blur-sm shadow-md">
          <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
          <span className="text-white text-xs font-bold font-mono">{course.rating}</span>
        </div>
      </div>

      {/* Content body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Dynamic category pill */}
          <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2.5 ${getCategoryStyles(course.categoryEn)}`}>
            {isOm ? course.categoryOm : course.categoryEn}
          </span>

          <h3 className="text-lg font-extrabold text-slate-50 leading-snug tracking-tight title-font group-hover:text-indigo-300 transition duration-150">
            {isOm ? course.titleOm : course.titleEn}
          </h3>

          <p className="text-slate-400 text-xs leading-relaxed mt-2 line-clamp-3">
            {isOm ? course.descOm : course.descEn}
          </p>

          {/* Quick learning stat chips */}
          <div className="flex gap-4 items-center mt-4 text-[11px] text-slate-400 font-semibold font-mono pb-4 border-b border-slate-800/60">
            <span className="flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5 text-indigo-400" />
              {course.lessonsCount} {isOm ? 'Kutaa' : 'Modules'}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-indigo-400" />
              {course.durationWeeks} {isOm ? 'Torban' : 'Weeks'}
            </span>
          </div>
        </div>

        {/* Footer controls & Prices */}
        <div className="flex items-center justify-between pt-4 gap-2">
          {/* Prices tag */}
          <div className="flex flex-col">
            <span className="text-emerald-400 font-bold text-base font-mono">
              {course.priceBirr} Birr / ETB {course.priceBirr}
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              {isOm ? 'Leenjii Bilingual' : 'Bilingual Course'}
            </span>
          </div>

          {/* Enrollment Interactive CTA button state selection */}
          {!enrollment ? (
            <button
              onClick={() => onOpenDetails(course)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-1 active:scale-95 shadow-md shadow-indigo-900/10"
            >
              <span>{isOm ? 'Amma Ilaali' : 'Details'}</span>
              <ArrowUpRight className="h-3 w-3" />
            </button>
          ) : enrollment.status === 'pending' ? (
            <button
              onClick={() => onOpenDetails(course)}
              className="bg-yellow-950/40 border border-yellow-800 text-yellow-400 text-[11px] font-bold px-3 py-2.5 rounded-xl transition duration-150 cursor-pointer flex items-center gap-1 hover:bg-yellow-900/30"
              title={isOm ? 'Kaffaltii keessan mirkanaa’uun eegamaa jira' : 'Payment receipt under manual check'}
            >
              <AlertCircle className="h-3.5 w-3.5" />
              <span>{isOm ? 'Gulaalamaa Jira' : 'Pending Verification'}</span>
            </button>
          ) : (
            <button
              onClick={() => onGoToClassroom(course.id)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 active:scale-95 animate-pulse"
            >
              <CheckCircle className="h-3.5 w-3.5" />
              <span>{isOm ? 'Amma Baradhu' : 'Study Now'}</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
