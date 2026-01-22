import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOtpApi, resendOtpApi } from '../../api/authApi';

export default function VerifyOtpPage() {
  const navigate = useNavigate();
  const location = useLocation();

  /* ================= SAFE ROUTER STATE ================= */
  const state = location.state ?? {};
  const userEmail = typeof state.email === 'string' ? state.email : '';
  const userType = state.userType === 'doctor' ? 'doctor' : 'patient';

  /* Prevent direct access */
  useEffect(() => {
    if (!userEmail) {
      navigate('/login', { replace: true });
    }
  }, [userEmail, navigate]);

  /* ================= STATE ================= */
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');

  const inputRefs = useRef([]);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  /* ================= HANDLERS ================= */
  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    if (error) setError('');

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').slice(0, 6);

    if (!/^\d+$/.test(pasted)) return;

    const newOtp = [...otp];
    pasted.split('').forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });

    setOtp(newOtp);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleVerify = async () => {
   
    const otpValue = otp.join('');
    if (otpValue.length !== 6) return;
 
    setIsVerifying(true);
    setError('');

    try {
      await verifyOtpApi(userEmail, otpValue);

      if (userType === 'doctor') {
        alert('✅ Verification successful! Await admin approval.');
        navigate('/login', { replace: true });
      } else {
        alert('✅ Verification successful!');
        navigate('/patient-dashboard', { replace: true });
      }
    } catch (err) {
      const message =
        typeof err?.response?.data?.message === 'string'
          ? err.response.data.message
          : typeof err?.message === 'string'
          ? err.message
          : 'Invalid OTP. Please try again.';

      setError(message);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    setError('');

    try {
      await resendOtpApi(userEmail);
      setTimer(60);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
      alert('📧 New OTP sent!');
    } catch (err) {
      const message =
        typeof err?.response?.data?.message === 'string'
          ? err.response.data.message
          : 'Failed to resend OTP';

      setError(message);
    }
  };

  const isComplete = otp.every(d => d !== '');

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2FBFA] via-white to-[#EAF7F6] flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-[#D3F0ED]">

          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#18AAB0] to-[#86C443] flex items-center justify-center">
              <span className="text-4xl">🔐</span>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#0F4F52] mb-2">
              Verify Your Account
            </h1>

            <p className="text-gray-500 text-sm">
              We've sent a 6-digit code to
            </p>

            {userEmail && (
              <p className="text-[#18AAB0] font-semibold text-sm mt-1">
                {userEmail}
              </p>
            )}

            {userType === 'doctor' && (
              <p className="text-xs text-amber-600 mt-2 bg-amber-50 p-2 rounded-lg">
                ⚠️ Admin approval required after verification
              </p>
            )}
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm text-center font-medium">
                ⚠️ {typeof error === 'string' ? error : 'Something went wrong'}
              </p>
            </div>
          )}

          <div className="flex justify-center gap-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => (inputRefs.current[index] = el)}
                value={digit}
                maxLength={1}
                type="text"
                onChange={e => handleChange(index, e.target.value)}
                onKeyDown={e => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-12 h-14 text-center text-2xl font-bold rounded-xl border-2
                  border-[#D3F0ED] focus:border-[#18AAB0] outline-none"
              />
            ))}
          </div>

          <div className="text-center mb-6">
            {!canResend ? (
              <span className="text-sm text-gray-500">
                ⏱️ Resend in {timer}s
              </span>
            ) : (
              <button
                onClick={handleResend}
                className="text-[#18AAB0] text-sm font-semibold underline"
              >
                Resend Code
              </button>
            )}
          </div>

          <button
            onClick={handleVerify}
            disabled={!isComplete || isVerifying}
            className={`w-full py-4 rounded-full font-semibold text-white
              ${isComplete
                ? 'bg-gradient-to-r from-[#18AAB0] to-[#86C443]'
                : 'bg-gray-300 cursor-not-allowed'}
            `}
          >
            {isVerifying ? 'Verifying...' : 'Verify & Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}
