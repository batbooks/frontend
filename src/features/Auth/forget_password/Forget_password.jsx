import React from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import Forget_password_2 from "./Vf";

function Forget_password() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  // const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  // const [countdown, setCountdown] = useState(0); // Countdown timer

  // Simulate an API call to get the verification code

  // Handle countdown timer

  const handleSendCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      // Replace this with your actual API endpoint
      const response = await fetch(
        "https://www.batbooks.liara.run/auth/reset-password/send-otp/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Code sent successfully!");
        // Redirect to verification page or next step after a short delay

        navigate("/Vf", { state: { email: { email } } }); // Adjust the route as needed
      } else {
        throw new Error(data.message || "Failed to send verification code");
      }
    } catch (err) {
      setError(" ایمیل خود را درست وارد کنید ");
    } finally {
      setIsLoading(false);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   setMessage('');

  //   if (!code) {
  //     setError('Please enter the verification code');
  //     return;
  //   }

  //   setIsSubmitting(true);

  //   try {
  //     if (code === generatedCode) {
  //       setMessage('Verification successful!');
  //       // navigate........
  //       // Proceed with password recovery logic
  //     } else {
  //       setError('Invalid verification code');
  //     }
  //   } catch (err) {
  //     setError('Verification failed. Please try again.');
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  return (
    <div className="w-full h-[100vh] bg-[#D9F0FF]">
      <div className="flex gap-1 items-center ">
        <h2 className="text-[24px] mt-1.5 ml-2 font-bold text-[#002D54]">
          Bat<span className="text-[#2663CD]">Books</span>
        </h2>
      </div>
      <main
        style={styles.container}
        className="flex flex-col m-auto mt-24 h-80 w-[39vw] bg-[#A4C0ED] rounded-lg"
      >
        <h2 style={styles.title} className="font-bold">
          بازیابی رمز عبور
        </h2>
        <form onSubmit={handleSendCode} style={styles.form}>
          <div className="relative">
            <input
              className="p-[1.29vw] pr-[2.6vw] rounded-full h-10 w-[26vw] bg-white placeholder:opacity-40 placeholder:text-right placeholder:mr-4 hover:ring-2 hover:ring-blue-700  focus:outline-none  focus:ring-2 focus:ring-blue-700 transition-all duration-300 "
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" ...ایمیل خود را وارد کنید "
              required
            />
            <div className="absolute inset-y-0 left-[27.5vw] flex items-center pl-[1vw] pointer-events-none ">
              <img
                src="/images/user.png"
                alt="Email Icon"
                className="h-4.5  w-[1.2vw] opacity-90"
              />
            </div>
          </div>
          {error && <div className="text-red-600">{error}</div>}
          <div className="flex flex-row justify-center gap-[0.77vw]">
            <button type="submit" disabled={isLoading} className="btn">
              <span className="span-btn ">ارسال کد</span>
            </button>
          </div>

          {message && <div style={styles.message}>{message}</div>}
        </form>

        <Link
          to={"/auth/login"}
          className="text-[1vw] text-center mx-auto flex justify-center hover:text-[#2663CD]   cursor-pointer"
        >
          بازگشت به صفحه ورود
        </Link>
        <img
          src="/images/mid-left.png"
          alt="mid-right"
          className="w-45 absolute top-64 left-[30vw] "
        />
        {/* <img src="batbooks.png" alt="mid-right" className="w-[5.2vw] absolute top-3 left-0 "/> */}

        <img
          src="/images/bottom-left.png"
          alt="bottom-left"
          className="absolute left-0 bottom-0 w-[25vw] aspect-auto"
        />
        <img
          src="/images/bottom-right.png"
          alt="bottom-right"
          className=" absolute right-[0px] bottom-0 w-[33vw] aspect-auto"
        />

        <img
          src="/images/mid-right.png"
          alt="mid-right"
          className="w-[13vw]   absolute -top-1 left-[62.3vw] min-w-32"
        />
      </main>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",

    backgroundColor: "#A4C0ED",
    textAlign: "center",
  },
  title: {
    marginTop: "40px",
    fontSize: "17px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    // borderRadius: '4px',
    // border: '1px solid #ccc',
    fontSize: "16px",
  },

  button: {
    padding: "10px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    flex: 1,
  },
  submitButton: {
    padding: "10px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#28a745",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    flex: 1,
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
  message: {
    color: "green",
    fontSize: "14px",
  },
};

export default Forget_password;
