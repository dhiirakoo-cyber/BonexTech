import React, { useState } from 'react';
import { Language, UserSession } from '../types';
import { PREDEFINED_STUDENT } from '../coursesData';
import { Mail, Lock, User, Phone, CheckCircle2, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginViewProps {
  language: Language;
  onLoginSuccess: (session: UserSession) => void;
}

export default function LoginView({ language, onLoginSuccess }: LoginViewProps) {
  const isOm = language === 'om';
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  
  // UI states
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Quick fill default student account
  const handleQuickFill = () => {
    setEmail(PREDEFINED_STUDENT.email);
    setPassword(PREDEFINED_STUDENT.password);
    setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    setTimeout(() => {
      if (isRegistering) {
        // Registering a new custom student
        if (!email.includes('@') || password.length < 4 || !fullName) {
          setErrorMessage(isOm 
            ? 'Maaloo odeeffannoo guutuu fi sirrii ta’e galchaa (Password dherina 4+ barbada)' 
            : 'Please fill out all fields correctly (Password must be 4+ characters).'
          );
          setLoading(false);
          return;
        }

        // Save custom register database simulation in localStorage
        const customUsers = JSON.parse(localStorage.getItem('amoo_custom_users') || '{}');
        customUsers[email.toLowerCase()] = {
          email: email.toLowerCase(),
          password: password,
          fullName: fullName,
          phone: phone || 'N/A'
        };
        localStorage.setItem('amoo_custom_users', JSON.stringify(customUsers));

        setSuccessMessage(isOm 
          ? 'Baga nagaan galmoofte! Amma login gochuuf jirtu.' 
          : 'Successfully registered! Logging in now...'
        );

        setTimeout(() => {
          onLoginSuccess({
            email: email.toLowerCase(),
            fullName: fullName,
            phone: phone,
            isLoggedIn: true
          });
        }, 1000);

      } else {
        // Logging in
        const inputEmail = email.trim().toLowerCase();
        const inputPassword = password.trim();

        // 1. Check predefined demo student
        if (inputEmail === PREDEFINED_STUDENT.email && inputPassword === PREDEFINED_STUDENT.password) {
          setSuccessMessage(isOm ? 'Baga nagaan dhufte Amoo Academy keessatti!' : 'Welcome back to Amoo Academy!');
          setTimeout(() => {
            onLoginSuccess({
              email: PREDEFINED_STUDENT.email,
              fullName: PREDEFINED_STUDENT.fullName,
              phone: PREDEFINED_STUDENT.phone,
              isLoggedIn: true
            });
          }, 800);
        } else {
          // 2. Check registered custom users
          const customUsers = JSON.parse(localStorage.getItem('amoo_custom_users') || '{}');
          const matchedUser = customUsers[inputEmail];

          if (matchedUser && matchedUser.password === inputPassword) {
            setSuccessMessage(isOm ? 'Seensi keessan gaarii dha!' : 'Login successful!');
            setTimeout(() => {
              onLoginSuccess({
                email: matchedUser.email,
                fullName: matchedUser.fullName,
                phone: matchedUser.phone,
                isLoggedIn: true
              });
            }, 800);
          } else {
            setErrorMessage(isOm 
              ? 'Imayilii ykn Jecha-darbii (Password) dogoggora! Gargaartu "Quick Fill" gargaarami.' 
              : 'Invalid email or password. Try using the Quick Fill button.'
            );
          }
        }
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
      >
        {/* Background ambient circular gradients */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-emerald-600/10 rounded-full blur-2xl"></div>

        {/* Form header */}
        <div className="text-center mb-6 relative">
          <div className="inline-flex p-3 bg-indigo-500/10 text-indigo-400 rounded-2xl mb-4">
            <Sparkles className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight title-font">
            {isRegistering 
              ? (isOm ? 'Galmaa’i' : 'Create Account')
              : (isOm ? 'Baga Nagaan Dhuftan' : 'Welcome Back')
            }
          </h2>
          <p className="text-slate-400 text-sm mt-1.5 font-medium">
            {isRegistering 
              ? (isOm ? 'Koorsoota premium seenuudhaaf galmaayi' : 'Sign up to discover the classroom portal')
              : (isOm ? "Gara kooziitti deebi'uuf seeni" : 'Sign in to return to your Premium courses')
            }
          </p>
        </div>

        {/* Demo login notice tool */}
        {!isRegistering && (
          <div className="bg-slate-950/80 border border-indigo-950 p-3.5 rounded-2xl mb-5 flex flex-col gap-2 shadow-inner">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-indigo-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                {isOm ? 'Demo Barataa Saffisaa' : 'Quick Demo Student Acc'}
              </span>
              <button 
                type="button"
                onClick={handleQuickFill}
                className="text-[10px] bg-indigo-600 hover:bg-indigo-700 text-white font-black px-2.5 py-1 rounded-lg transition duration-200 cursor-pointer active:scale-95"
              >
                {isOm ? 'Koba Fill' : 'Quick Fill ⚡'}
              </button>
            </div>
            <div className="flex justify-between items-center text-[11px] text-slate-400 font-mono">
              <span>Email: student@amoo.com</span>
              <span>Pass: password123</span>
            </div>
          </div>
        )}

        {/* Error / Success status banners */}
        {errorMessage && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 p-3 bg-red-950/60 border border-red-900/50 text-red-300 text-xs rounded-xl flex items-center gap-2"
          >
            <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
            <p>{errorMessage}</p>
          </motion.div>
        )}

        {successMessage && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 p-3 bg-emerald-950/60 border border-emerald-900/50 text-emerald-300 text-xs rounded-xl flex items-center gap-2"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <p>{successMessage}</p>
          </motion.div>
        )}

        {/* Form elements */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {isRegistering && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  {isOm ? 'Maqaa Guutuu' : 'Full Name'}
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={isOm ? 'Amanu Sharaa' : 'Amanuel Sharaa'}
                    className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  {isOm ? 'Lakkoofsa Bilbilaa' : 'Phone Number'}
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-500" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0967145146"
                    className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition text-mono font-mono"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              {isOm ? 'Email Keessan' : 'Email Address'}
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              {isOm ? 'Jecha-Darbii (Password)' : 'Password'}
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-3 px-4 rounded-xl transition duration-150 transform hover:translate-y-[-1px] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                {isOm ? 'Eegamaa jira...' : 'Processing...'}
              </span>
            ) : (
              <>
                <span>{isRegistering ? (isOm ? 'Galmooftee Seeni' : 'Sign Up & Login') : (isOm ? 'Nagaan Seeni' : 'Login Tahuu')}</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Toggle Mode Footer */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">
          <p className="text-slate-400 text-xs">
            {isRegistering 
              ? (isOm ? 'Duraan account qabdaa?' : 'Already have an account?')
              : (isOm ? 'Akaakuu hin qabduu?' : 'New to Amoo Academy?')
            }{' '}
            <button
              onClick={() => {
                setIsRegistering(!isRegistering);
                setErrorMessage('');
                setSuccessMessage('');
              }}
              className="text-indigo-400 hover:text-indigo-300 font-bold hover:underline cursor-pointer ml-1"
            >
              {isRegistering 
                ? (isOm ? 'Login godhuu' : 'Sign In instead')
                : (isOm ? 'Galmaa’i' : 'Create an Account now')
              }
            </button>
          </p>
        </div>

      </motion.div>
    </div>
  );
}
