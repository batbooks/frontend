import { useState, useEffect } from 'react';

function Forget_password() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [countdown, setCountdown] = useState(0); // Countdown timer

  // Simulate an API call to get the verification code
  const fetchVerificationCode = async (email) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const code = Math.floor(100000 + Math.random() * 900000).toString(); // Random 6-digit code
        resolve(code);
      }, 1000); // Simulate network delay
    });
  };

  // Handle countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSendCode = async () => {
    setError('');
    setMessage('');

    // Simple email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const code = await fetchVerificationCode(email);
      setGeneratedCode(code);
      setIsCodeSent(true);
      setMessage(`Verification code sent to ${email}`);
      setCountdown(60); // Start countdown from 60 seconds
    } catch (err) {
      setError('Failed to send code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!code) {
      setError('Please enter the verification code');
      return;
    }

    setIsSubmitting(true);

    try {
      if (code === generatedCode) {
        setMessage('Verification successful!');
        // navigate........
        // Proceed with password recovery logic
      } else {
        setError('Invalid verification code');
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container} className='m-auto mt-40 h-100 w-150 bg-[#A4C0ED] '>
      <h2 style={styles.title} className='font-bold'> بازیابی رمز عبور </h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div className='relative'  >
          <input 
          className='p-5 pr-10 rounded-full h-10 w-100 bg-white placeholder:opacity-40 placeholder:text-right placeholder:mr-4 hover:ring-2 hover:ring-blue-700  focus:outline-none  focus:ring-2 focus:ring-blue-700 transition-all duration-300 '
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" ...ایمیل خود را وارد کنید "
            
            required
          />
            <div className="absolute inset-y-0 left-106 flex items-center pl-4 pointer-events-none ">
    <img
      src="user.png" // Replace with the path to your icon
      alt="Email Icon"
      className="h-4.5 w-4.5 opacity-90"
    />
  </div>
        </div>
        <div className='flex flex-row justify-center gap-3'>
            
            
            
            
          <button
            type="button"
            onClick={handleSendCode}
            disabled={isLoading || countdown > 0}
            className='w-34 h-10 ml-11 rounded-full text-white bg-[#2663CD]  hover:border border-blue-700 transition-all duration-300'
          >
            {isLoading
              ? 'در حال ارسال...'
              : countdown > 0
              ? `ارسال مجدد (${countdown})`
              : 'ارسال کد'}
          </button>
          <div className='relative'>
          <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder=" کد بازیابی "
                 className='p-5 pr-10 rounded-full h-10 w-63 mr-11  bg-white placeholder:opacity-40 placeholder:text-right placeholder:mr-4 hover:ring-2 ring-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 transition-all duration-300'
                required
            />
            
            <img 
      src="lock.png" // Replace with the path to your icon
      alt="lock icon"
      className="h-4.5 w-4.7 opacity-90 absolute inset-y-2.5 left-53"
    />
    </div>
          
        </div>
       

        <div >
          

          <button
            type="submit"
            disabled={!isCodeSent || isSubmitting}
            className='w-30 h-9 ml-11 rounded-full text-white bg-[#2663CD]  hover:border border-blue-700 transition-all duration-300 font-[]'

          >
            {isSubmitting ? 'در حال بررسی...' : 'بازیابی'} 
          </button>
        </div>
        {error && <div style={styles.error}>{error}</div>}
        {message && <div style={styles.message}>{message}</div>}
      </form>
    </div>
  );
};

const styles = {
  container: {
    
    
    
    
    padding: '20px',
    
    
    backgroundColor:"#A4C0ED",
    textAlign: 'center',
  },
  title: {
    
    marginTop:'40px',
    fontSize: '17px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    
    padding: '10px',
    // borderRadius: '4px',
    // border: '1px solid #ccc',
    fontSize: '16px',
  },
  
  button: {
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    flex: 1,
  },
  submitButton: {
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#28a745',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    flex: 1,
  },
  error: {
    color: 'red',
    fontSize: '14px',
  },
  message: {
    color: 'green',
    fontSize: '14px',
  },
};

export default Forget_password;