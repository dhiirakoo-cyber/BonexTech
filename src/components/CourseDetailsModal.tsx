import React, { useState } from 'react';
import { Course, Language, Enrollment } from '../types';
import { X, Sparkles, Check, PhoneCall, Copy, BookOpen, Clock, Award, ShieldCheck, HeartHandshake, CreditCard } from 'lucide-react';
import { CONTACT_INFO } from '../coursesData';
import { motion, AnimatePresence } from 'motion/react';

interface CourseDetailsModalProps {
  course: Course;
  language: Language;
  enrollment: Enrollment | undefined;
  onClose: () => void;
  onEnrollRequest: (courseId: string, method: string, reference: string, approveImmediately: boolean) => void;
}

export default function CourseDetailsModal({
  course,
  language,
  enrollment,
  onClose,
  onEnrollRequest,
}: CourseDetailsModalProps) {
  const isOm = language === 'om';
  const [copied, setCopied] = useState(false);
  const [activePaymentMethod, setActivePaymentMethod] = useState<'telebirr' | 'cbe' | 'cbe_birr'>('telebirr');
  
  // Payment Form States
  const [txRef, setTxRef] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const accounts = {
    telebirr: '0967145146 (Amanuel S.)',
    cbe: '1000287349129 (Amanuel S.)',
    cbe_birr: '*889# -> Send to 0967145146'
  };

  const handleCopyValue = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitPayment = (e: React.FormEvent, instantUnlock: boolean) => {
    e.preventDefault();
    setErrorMessage('');

    if (!instantUnlock && !txRef.trim()) {
      setErrorMessage(isOm 
        ? 'Maaloo lakkoofsa nagahee (Tx Reference) galchaa ykn koba salphaa banuuf "Instant Bypass" dhimma itti bahaa.' 
        : 'Please enter a valid transfer transaction reference or click instant unlock.'
      );
      return;
    }

    const finalRef = instantUnlock ? `INSTANT-PASS-${Math.floor(Math.random() * 99999)}` : txRef.trim();
    const finalMethod = activePaymentMethod.toUpperCase().replace('_', ' ');

    onEnrollRequest(course.id, finalMethod, finalRef, instantUnlock);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col md:max-h-[90vh]"
      >
        
        {/* Banner Section with title */}
        <div className="relative h-40 bg-slate-950 shrink-0">
          <img
            src={course.image}
            alt={isOm ? course.titleOm : course.titleEn}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-slate-950/80 hover:bg-slate-850 p-2 rounded-full text-slate-400 hover:text-white transition cursor-pointer border border-slate-850"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="bg-indigo-600 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              {isOm ? course.categoryOm : course.categoryEn}
            </span>
            <h2 className="text-2xl font-black text-white mt-1.5 title-font leading-tight">
              {isOm ? course.titleOm : course.titleEn}
            </h2>
          </div>
        </div>

        {/* Dynamic Modal Content (Two-column layout Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Syllabus & Learning outcomes (7 cols) */}
          <div className="md:col-span-7 space-y-6">
            <div>
              <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-indigo-400" />
                {isOm ? 'Syllabus Koorichaa' : 'Course Curriculum'}
              </h4>
              <p className="text-slate-400 text-xs mb-4">
                {isOm 
                  ? 'Koorsoota kana keessatti barannoo gadi-fageenyaan beekumsa barsiisan armaan gadii jiru.'
                  : 'A systematic module-by-module layout teaching core parameters in depth.'
                }
              </p>

              {/* Accordion / list of syllabus items */}
              <div className="space-y-3.5">
                {course.syllabus.map((mod, idx) => (
                  <div key={mod.id} className="bg-slate-950/50 rounded-2xl p-4 border border-slate-800">
                    <span className="text-[10px] text-indigo-400 font-mono font-bold uppercase">
                      {mod.duration}
                    </span>
                    <h5 className="text-sm font-bold text-slate-200 mt-0.5">
                      {isOm ? mod.titleOm : mod.titleEn}
                    </h5>
                    <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                      {isOm ? mod.contentOm : mod.contentEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions */}
            <div className="pt-4 border-t border-slate-800/60 grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 bg-slate-950/30 rounded-xl border border-slate-850 flex flex-col items-center">
                <Award className="h-5 w-5 text-emerald-400" />
                <span className="text-[10px] text-slate-300 font-bold mt-1.5">
                  {isOm ? 'Waraqaa Safuu' : 'Certificate'}
                </span>
              </div>
              <div className="p-2.5 bg-slate-950/30 rounded-xl border border-slate-850 flex flex-col items-center">
                <ShieldCheck className="h-5 w-5 text-blue-400" />
                <span className="text-[10px] text-slate-300 font-bold mt-1.5">
                  {isOm ? 'Mirkaneeffama' : 'Lifetime Access'}
                </span>
              </div>
              <div className="p-2.5 bg-slate-950/30 rounded-xl border border-slate-850 flex flex-col items-center">
                <HeartHandshake className="h-5 w-5 text-indigo-400" />
                <span className="text-[10px] text-slate-300 font-bold mt-1.5">
                  {isOm ? 'Gargaarsa' : 'Instructor Assist'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Checkout & Direct Payment Gateway (5 cols) */}
          <div className="md:col-span-5 bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col justify-between space-y-5">
            
            {/* Payment Top info banner */}
            <div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-850">
                <span className="text-slate-400 text-xs font-semibold">{isOm ? 'Gatii Koozii:' : 'Tuition Cost:'}</span>
                <span className="text-emerald-400 font-black text-lg font-mono">200 ETB / Birr</span>
              </div>

              {/* Enrolled view if already verified or pending */}
              {enrollment ? (
                <div className="mt-4 p-4 rounded-xl text-center space-y-3 bg-slate-900 border border-slate-800">
                  {enrollment.status === 'approved' ? (
                    <>
                      <div className="inline-flex p-2.5 bg-emerald-500/10 text-emerald-400 rounded-full">
                        <Check className="h-5 w-5" />
                      </div>
                      <h5 className="text-sm font-bold text-emerald-400">{isOm ? 'Baga Nagaan Galmoofte' : 'Enrollment Confirmed!'}</h5>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        {isOm ? 'Koorsee kana seentanii barachuu dandeessu. Classroom dhuunfaa banamaadha!' : 'This course has been successfully unlocked inside My Classroom tab!'}
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="inline-flex p-2.5 bg-yellow-500/10 text-yellow-500 rounded-full animate-pulse">
                        <Clock className="h-5 w-5" />
                      </div>
                      <h5 className="text-sm font-bold text-yellow-500">{isOm ? 'Hojjatamaa jira' : 'Awaiting Check'}</h5>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        {isOm 
                          ? 'Kaffaltiin kee Abbaa (Amanuel) biratti qoratamaa jira. Daqiiqaa muraasatti siif gadi lakkisama.' 
                          : 'Payment transaction reference is submitted and is being double-checked by Instructor Amanuel.'}
                      </p>
                    </>
                  )}
                </div>
              ) : (
                /* Payment form workflow */
                <div className="space-y-4 mt-3">
                  <span className="text-xs font-bold text-slate-300 block">
                    {isOm ? '1. Karaa kaffaluu barbaaddan filadhaa:' : '1. Choose payment method:'}
                  </span>

                  {/* Payment selector tabs */}
                  <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-850">
                    <button
                      type="button"
                      onClick={() => { setActivePaymentMethod('telebirr'); setTxRef(''); }}
                      className={`py-1.5 text-[10px] font-extrabold rounded-lg transition duration-200 cursor-pointer text-center ${
                        activePaymentMethod === 'telebirr' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400'
                      }`}
                    >
                      Telebirr
                    </button>
                    <button
                      type="button"
                      onClick={() => { setActivePaymentMethod('cbe_birr'); setTxRef(''); }}
                      className={`py-1.5 text-[10px] font-extrabold rounded-lg transition duration-200 cursor-pointer text-center ${
                        activePaymentMethod === 'cbe_birr' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400'
                      }`}
                    >
                      CBE Birr
                    </button>
                    <button
                      type="button"
                      onClick={() => { setActivePaymentMethod('cbe'); setTxRef(''); }}
                      className={`py-1.5 text-[10px] font-extrabold rounded-lg transition duration-200 cursor-pointer text-center ${
                        activePaymentMethod === 'cbe' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400'
                      }`}
                    >
                      CBE Bank
                    </button>
                  </div>

                  {/* Payment account details copy board */}
                  <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-850 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase font-mono font-bold block">{isOm ? 'Lakkoofsa Hojiirra oolu:' : 'Beneficiary Account:'}</span>
                      <span className="text-xs font-bold text-white font-mono mt-0.5 block">{accounts[activePaymentMethod]}</span>
                    </div>
                    <button
                      onClick={() => handleCopyValue(accounts[activePaymentMethod])}
                      className="text-slate-400 hover:text-white p-1 hover:bg-slate-850 rounded-md transition cursor-pointer"
                      title={isOm ? 'Kopii Godhi' : 'Copy account'}
                    >
                      {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>

                  {/* Submission form */}
                  <form onSubmit={(e) => handleSubmitPayment(e, false)} className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                        {isOm ? '2. Lakkoofsa Nagahee (Transaction Reference / Name):' : '2. Enter Transaction Ref / Sender Name:'}
                      </label>
                      <input
                        type="text"
                        value={txRef}
                        onChange={(e) => setTxRef(e.target.value)}
                        placeholder="e.g. TXN98726514"
                        className="w-full text-xs p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                        required
                      />
                    </div>

                    {errorMessage && (
                      <p className="text-[10px] text-red-400">{errorMessage}</p>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl transition duration-150 text-xs shadow-md shadow-indigo-950 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <CreditCard className="h-3.5 w-3.5" />
                      <span>{isOm ? 'Kaffaltii Ergi / Submit' : 'Send Payment Receipt'}</span>
                    </button>
                  </form>

                  {/* Instant Unlock Option for Easy Testing in AI Studio Preview */}
                  <div className="pt-3 border-t border-slate-850 text-center">
                    <span className="text-[10px] text-slate-500 block mb-2">
                      {isOm ? 'Qormaata malee saphalaan guutuuf (AI Studio):' : 'For instant testing bypass in AI Studio:'}
                    </span>
                    <button
                      onClick={(e) => handleSubmitPayment(e as any, true)}
                      className="w-full bg-emerald-600/10 hover:bg-emerald-600 hover:text-white border border-emerald-600/40 text-emerald-400 hover:border-transparent font-black py-2 rounded-xl transition duration-150 text-[11px] cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="h-3 w-3 text-emerald-400 animate-pulse" />
                      <span>{isOm ? 'Amma Gadi lakkisi (Unlock)' : 'Fast Demo Unlock ⚡'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Telephone connection info */}
            <div className="bg-indigo-950/25 border border-indigo-900/40 p-3 rounded-xl flex items-center justify-between text-slate-400">
              <div className="text-left">
                <span className="text-[9px] text-indigo-400 font-bold uppercase tracking-wider block">{isOm ? 'Gaaffii Qabduu?' : 'Have Queries?'}</span>
                <span className="text-[10px] font-bold text-white block mt-0.5">{CONTACT_INFO.owner}: +251967145146</span>
              </div>
              <a
                href="https://t.me/+251967145146"
                target="_blank"
                rel="noreferrer"
                className="bg-indigo-600/30 hover:bg-indigo-600 p-2 rounded-lg text-indigo-200 hover:text-white transition cursor-pointer text-[10px] font-bold"
              >
                {isOm ? 'Qunnam' : 'Message'}
              </a>
            </div>

          </div>

        </div>

      </motion.div>
    </div>
  );
}
