export type Language = 'om' | 'en';

export interface QuizQuestion {
  id: string;
  questionOm: string;
  questionEn: string;
  optionsOm: string[];
  optionsEn: string[];
  correctIndex: number;
}

export interface CourseModule {
  id: string;
  titleOm: string;
  titleEn: string;
  contentOm: string;
  contentEn: string;
  duration: string;
  quiz?: QuizQuestion;
}

export interface Course {
  id: string;
  titleOm: string;
  titleEn: string;
  descOm: string;
  descEn: string;
  categoryOm: string;
  categoryEn: string;
  priceBirr: number;
  durationWeeks: number;
  lessonsCount: number;
  rating: number;
  image: string;
  tagOm: string;
  tagEn: string;
  syllabus: CourseModule[];
}

export interface UserSession {
  email: string;
  fullName: string;
  phone?: string;
  isLoggedIn: boolean;
}

export interface Enrollment {
  courseId: string;
  status: 'pending' | 'approved';
  paymentMethod?: string;
  referenceNumber?: string;
  enrolledAt: string;
}

export interface UserProgress {
  courseId: string;
  completedModuleIds: string[];
  quizScores: Record<string, number>; // moduleId -> score (percentage or correct count)
  overallProgress: number; // percentage 0-100
}
