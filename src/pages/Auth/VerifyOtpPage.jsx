import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function OTPVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = location.state?.email || 'your email'; // Get email from navigation state
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef([]);

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split('').forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);

    // Focus last filled input
    const lastIndex = Math.min(pastedData.length, 5);
    inputRefs.current[lastIndex].focus();
  };

  const handleVerify = async () => {
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      setIsVerifying(true);
      
      try {
        // TODO: Replace with your actual API call
        // const response = await axios.post('/api/verify-otp', {
        //   email: userEmail,
        //   otp: otpValue
        // });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log('OTP Verified:', otpValue);
        
        // Navigate to patient dashboard on success
        navigate('/patient-dashboard');
        
      } catch (error) {
        console.error('OTP Verification failed:', error);
        alert('Invalid OTP. Please try again.');
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0].focus();
      } finally {
        setIsVerifying(false);
      }
    }
  };

  const handleResend = async () => {
    if (canResend) {
      try {
        // TODO: Replace with your actual API call
        // await axios.post('/api/resend-otp', { email: userEmail });
        
        setTimer(60);
        setCanResend(false);
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0].focus();
        console.log('Resending OTP to:', userEmail);
        
        // Show success message
        alert('New OTP sent to your email!');
      } catch (error) {
        console.error('Failed to resend OTP:', error);
        alert('Failed to resend OTP. Please try again.');
      }
    }
  };

  const isComplete = otp.every(digit => digit !== '');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2FBFA] via-white to-[#EAF7F6] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 border border-[#D3F0ED]">
          
          {/* Logo/Icon Section */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#18AAB0] to-[#86C443] flex items-center justify-center shadow-lg">
              <span className="text-4xl">🔐</span>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#0F4F52] mb-2">
              Verify Your Account
            </h1>
            <p className="text-gray-500 text-sm">
              We've sent a 6-digit verification code to
            </p>
            <p className="text-[#18AAB0] font-semibold text-sm mt-1">
              {userEmail}
            </p>
          </div>

          {/* OTP Input Boxes */}
          <div className="flex justify-center gap-2 sm:gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold rounded-xl border-2 
                  transition-all duration-200 outline-none
                  ${digit 
                    ? 'border-[#18AAB0] bg-[#F7FCFB] text-[#0F4F52]' 
                    : 'border-[#D3F0ED] bg-white text-gray-400'
                  }
                  focus:border-[#18AAB0] focus:ring-4 focus:ring-[#18AAB0]/20
                  hover:border-[#86C443]
                `}
              />
            ))}
          </div>

          {/* Timer / Resend Section */}
          <div className="text-center mb-6">
            {!canResend ? (
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <span className="text-lg">⏱️</span>
                <span>Resend code in</span>
                <span className="font-bold text-[#18AAB0]">
                  {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                </span>
              </div>
            ) : (
              <button
                onClick={handleResend}
                className="text-[#18AAB0] font-semibold text-sm hover:text-[#86C443] 
                  transition-colors duration-200 underline decoration-2 underline-offset-4"
              >
                Resend Verification Code
              </button>
            )}
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={!isComplete || isVerifying}
            className={`w-full py-4 rounded-full font-semibold text-white text-lg
              transition-all duration-300 transform
              ${isComplete && !isVerifying
                ? 'bg-gradient-to-r from-[#18AAB0] to-[#86C443] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-gray-300 cursor-not-allowed'
              }
            `}
          >
            {isVerifying ? 'Verifying...' : isComplete ? 'Verify & Continue' : 'Enter OTP Code'}
          </button>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400">
              Didn't receive the code?{' '}
              <button className="text-[#18AAB0] hover:text-[#86C443] font-medium underline">
                Check spam folder
              </button>
            </p>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            🔒 Your information is secure and encrypted
          </p>
        </div>

      </div>
    </div>
  );
}