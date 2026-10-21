// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./AuthPage.css";

// const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"}/api`;

// const AuthPage = () => {
//   const [isSignUp, setIsSignUp] = useState(true);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [otp, setOtp] = useState("");
//   const [otpRequested, setOtpRequested] = useState(false);
//   const [forgotPassword, setForgotPassword] = useState(false);
//   const [newPassword, setNewPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [serverStatus, setServerStatus] = useState("checking");

//   // Check if server is running on component mount
//   useEffect(() => {
//     checkServerStatus();
//   }, []);

//   const checkServerStatus = async () => {
//     try {
//       setServerStatus("checking");
//       await axios.get(`${API_BASE_URL}/health-check`, { timeout: 5000 });
//       setServerStatus("online");
//     } catch (error) {
//       console.error("Backend server appears to be offline:", error);
//       setServerStatus("offline");
//     }
//   };

//   const handleRequestOtp = async () => {
//     if (!email) {
//       setError("Please enter your email address");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       const response = await axios.post(
//         `${API_BASE_URL}/auth/request-otp`,
//         { email },
//         { timeout: 30000 }
//       );
//       if (response.data.success) {
//         alert(response.data.message || "OTP sent to your email.");
//         setOtpRequested(true);
//       } else {
//         setOtpRequested(false);
//         setError(response.data.message || "Failed to send OTP");
//         alert(response.data.message);
//       }
//     } catch (error) {
//       console.error("Error requesting OTP:", error);
//       setOtpRequested(false);
//       if (error.code === 'ERR_NETWORK') {
//         setError("Cannot connect to server. Please make sure the backend server is running.");
//       } else {
//         setError(error.response?.data?.message || "Failed to send OTP. Please try again later.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSignUp = async () => {
//     if (!email || !password || !otp) {
//       setError("Please fill all required fields");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       const response = await axios.post(
//         `${API_BASE_URL}/auth/signup`,
//         { email, password, otp },
//         { timeout: 30000 }
//       );
//       if (response.data.success) {
//         // Store email in localStorage for order tracking
//         localStorage.setItem("userEmail", email);

//         // Store token if provided
//         if (response.data.token) {
//           localStorage.setItem("token", response.data.token);
//           alert("Account created successfully! Redirecting to homepage...");
//           window.location.href = "/";
//         } else {
//           alert("Account created successfully! Please log in.");
//           // Reset fields
//           setOtp("");
//           setPassword("");
//           setOtpRequested(false);
//           // Switch to login view
//           setIsSignUp(false);
//         }
//       } else {
//         setError(response.data.message || "Signup failed");
//         alert(response.data.message);
//       }
//     } catch (error) {
//       console.error("Error signing up:", error);
//       if (error.code === 'ERR_NETWORK') {
//         setError("Cannot connect to server. Please make sure the backend server is running.");
//       } else {
//         setError(error.response?.data?.message || "Signup failed. Please try again later.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogin = async () => {
//     if (!email || !password) {
//       setError("Please enter both email and password");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       const response = await axios.post(
//         `${API_BASE_URL}/auth/login`,
//         { email, password },
//         { timeout: 30000 }
//       );
//       if (response.data.success) {
//         // Store email in localStorage for order tracking
//         localStorage.setItem("userEmail", email);

//         // Store token
//         localStorage.setItem("token", response.data.token);

//         alert("Logged in successfully!");
//         window.location.href = "/";
//       } else {
//         setError(response.data.message || "Login failed");
//         alert(response.data.message || "Wrong username or password.");
//       }
//     } catch (error) {
//       console.error("Error logging in:", error);
//       if (error.code === 'ERR_NETWORK') {
//         setError("Cannot connect to server. Please make sure the backend server is running.");
//       } else {
//         setError(error.response?.data?.message || "Login failed. Please check your credentials and try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleForgotPassword = async () => {
//     if (!email) {
//       setError("Please enter your email address");
//       return;
//     }

//     if (!otpRequested) {
//       try {
//         setLoading(true);
//         setError("");
//         const response = await axios.post(
//           `${API_BASE_URL}/auth/request-otp`,
//           { email },
//           { timeout: 30000 }
//         );
//         if (response.data.success) {
//           alert("OTP sent to your email.");
//           setOtpRequested(true);
//         } else {
//           setError(response.data.message || "Failed to send OTP");
//           alert(response.data.message);
//         }
//       } catch (error) {
//         console.error("Error requesting OTP:", error);
//         if (error.code === 'ERR_NETWORK') {
//           setError("Cannot connect to server. Please make sure the backend server is running.");
//         } else {
//           setError(error.response?.data?.message || "Failed to send OTP. Please try again later.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       if (!otp || !newPassword) {
//         setError("Please enter OTP and new password");
//         return;
//       }

//       try {
//         setLoading(true);
//         setError("");
//         const response = await axios.post(
//           `${API_BASE_URL}/auth/reset-password`,
//           { email, otp, newPassword },
//           { timeout: 30000 }
//         );
//         if (response.data.success) {
//           alert("Password reset successfully!");
//           setForgotPassword(false);
//           setOtpRequested(false);
//           setIsSignUp(false);
//         } else {
//           setError(response.data.message || "Failed to reset password");
//           alert(response.data.message);
//         }
//       } catch (error) {
//         console.error("Error resetting password:", error);
//         if (error.code === 'ERR_NETWORK') {
//           setError("Cannot connect to server. Please make sure the backend server is running.");
//         } else {
//           setError(error.response?.data?.message || "Failed to reset password. Please try again later.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   return (
//     <div className="auth-page">
//       <h2>
//         {forgotPassword ? "Forgot Password" : isSignUp ? "Sign Up" : "Log In"}
//       </h2>

//       {serverStatus === "offline" && (
//         <div className="server-status-error">
//           <p>Backend server appears to be offline. Please start the server or try again later.</p>
//           <button
//             onClick={checkServerStatus}
//             className="retry-button"
//           >
//             Retry Connection
//           </button>
//         </div>
//       )}

//       {error && <div className="error-message">{error}</div>}

//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       {forgotPassword ? (
//         <>
//           {otpRequested && (
//             <>
//               <input
//                 type="text"
//                 placeholder="Enter OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 required
//               />
//               <input
//                 type="password"
//                 placeholder="Enter New Password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 required
//               />
//             </>
//           )}
//           <button
//             onClick={handleForgotPassword}
//             disabled={loading || serverStatus === "offline"}
//           >
//             {loading ? "Processing..." : otpRequested ? "Reset Password" : "Request OTP"}
//           </button>
//         </>
//       ) : isSignUp ? (
//         <>
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           {otpRequested && (
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               required
//             />
//           )}
//           <button
//             onClick={otpRequested ? handleSignUp : handleRequestOtp}
//             disabled={loading || serverStatus === "offline"}
//           >
//             {loading ? "Processing..." : otpRequested ? "Sign Up" : "Request OTP"}
//           </button>
//         </>
//       ) : (
//         <>
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button
//             onClick={handleLogin}
//             disabled={loading || serverStatus === "offline"}
//           >
//             {loading ? "Processing..." : "Log In"}
//           </button>
//           <p
//             onClick={() => setForgotPassword(true)}
//             className="forgot-password"
//           >
//             Forgot Password?
//           </p>
//         </>
//       )}
//       {!forgotPassword && (
//         <p onClick={() => {
//           setIsSignUp(!isSignUp);
//           setOtpRequested(false);
//           setError("");
//         }} className="toggle-auth-mode">
//           {isSignUp
//             ? "Already have an account? Log In"
//             : "Don't have an account? Sign Up"}
//         </p>
//       )}
//       {forgotPassword && (
//         <p onClick={() => {
//           setForgotPassword(false);
//           setOtpRequested(false);
//           setError("");
//         }} className="back-to-login">
//           Back to {isSignUp ? "Sign Up" : "Login"}
//         </p>
//       )}
//     </div>
//   );
// };

// export default AuthPage;








import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AuthPage.css";

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"}/api`;

// Admin email — login redirects to admin panel
const ADMIN_EMAIL = "admin@homease.com";

const AuthPage = () => {
  const [isSignUp, setIsSignUp]             = useState(false);
  const [email, setEmail]                   = useState("");
  const [password, setPassword]             = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [otp, setOtp]                       = useState("");
  const [newPassword, setNewPassword]       = useState("");
  const [otpRequested, setOtpRequested]     = useState(false);
  const [loading, setLoading]               = useState(false);
  const [error, setError]                   = useState("");
  const [serverStatus, setServerStatus]     = useState("checking");

  useEffect(() => { checkServerStatus(); }, []);

  const checkServerStatus = async () => {
    try {
      setServerStatus("checking");
      await axios.get(`${API_BASE_URL}/health-check`, { timeout: 5000 });
      setServerStatus("online");
    } catch {
      setServerStatus("offline");
    }
  };

  // ── SIGN UP — email + password only, no OTP ───────────────────────────────
  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      setError("Please fill all fields"); return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match"); return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters"); return;
    }

    try {
      setLoading(true); setError("");
      const response = await axios.post(
        `${API_BASE_URL}/auth/register`,
        { email, password },
        { timeout: 30000 }
      );
      if (response.data.success) {
        localStorage.setItem("userEmail", email);
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          alert("Account created successfully! Redirecting to homepage...");
          window.location.href = "/";
        } else {
          alert("Account created successfully! Please log in.");
          setPassword(""); setConfirmPassword("");
          setIsSignUp(false);
        }
      } else {
        setError(response.data.message || "Signup failed");
      }
    } catch (err) {
      setError(
        err.code === "ERR_NETWORK"
          ? "Cannot connect to server. Please make sure the backend is running."
          : err.response?.data?.message || "Signup failed. Please try again."
      );
    } finally { setLoading(false); }
  };

  // ── LOGIN — also handles admin login ─────────────────────────────────────
  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password"); return;
    }

    // Admin login path
    if (email.toLowerCase().trim() === ADMIN_EMAIL) {
      try {
        setLoading(true); setError("");
        const res = await axios.post(
          `${API_BASE_URL}/admin/login`,
          { email, password },
          { timeout: 30000 }
        );
        if (res.data.success) {
          localStorage.setItem("adminToken", res.data.token);
          alert("Admin login successful! Opening admin panel...");
          window.open("https://homease-admin.vercel.app", "_blank");
          window.location.href = "/";
        } else {
          setError(res.data.message || "Invalid admin credentials.");
        }
      } catch (err) {
        setError(
          err.code === "ERR_NETWORK"
            ? "Cannot connect to server."
            : err.response?.data?.message || "Admin login failed."
        );
      } finally { setLoading(false); }
      return;
    }

    // Normal user login
    try {
      setLoading(true); setError("");
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        { email, password },
        { timeout: 30000 }
      );
      if (response.data.success) {
        localStorage.setItem("userEmail", email);
        localStorage.setItem("token", response.data.token);
        alert("Logged in successfully!");
        window.location.href = "/";
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      setError(
        err.code === "ERR_NETWORK"
          ? "Cannot connect to server. Please make sure the backend is running."
          : err.response?.data?.message || "Login failed. Please check your credentials."
      );
    } finally { setLoading(false); }
  };

  // ── FORGOT PASSWORD — keeps OTP flow for security ────────────────────────
  const handleForgotPassword = async () => {
    if (!email) { setError("Please enter your email address"); return; }

    if (!otpRequested) {
      try {
        setLoading(true); setError("");
        const res = await axios.post(
          `${API_BASE_URL}/auth/request-otp`,
          { email },
          { timeout: 30000 }
        );
        if (res.data.success) {
          alert("OTP sent to your email.");
          setOtpRequested(true);
        } else {
          setError(res.data.message || "Failed to send OTP");
        }
      } catch (err) {
        setError(
          err.code === "ERR_NETWORK"
            ? "Cannot connect to server."
            : err.response?.data?.message || "Failed to send OTP."
        );
      } finally { setLoading(false); }
    } else {
      if (!otp || !newPassword) { setError("Please enter OTP and new password"); return; }
      try {
        setLoading(true); setError("");
        const res = await axios.post(
          `${API_BASE_URL}/auth/reset-password`,
          { email, otp, newPassword },
          { timeout: 30000 }
        );
        if (res.data.success) {
          alert("Password reset successfully!");
          setForgotPassword(false); setOtpRequested(false);
          setOtp(""); setNewPassword(""); setIsSignUp(false);
        } else {
          setError(res.data.message || "Failed to reset password");
        }
      } catch (err) {
        setError(
          err.code === "ERR_NETWORK"
            ? "Cannot connect to server."
            : err.response?.data?.message || "Failed to reset password."
        );
      } finally { setLoading(false); }
    }
  };

  const switchMode = () => {
    setIsSignUp(!isSignUp);
    setError(""); setPassword(""); setConfirmPassword("");
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="auth-page">
      <h2>
        {forgotPassword ? "Reset Password" : isSignUp ? "Create Account" : "Log In"}
      </h2>

      {serverStatus === "offline" && (
        <div className="server-status-error">
          <p>Backend server appears to be offline.</p>
          <button onClick={checkServerStatus} className="retry-button">
            Retry Connection
          </button>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      {/* ── Forgot Password Flow ── */}
      {forgotPassword ? (
        <>
          <input type="email" placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)} required />
          {otpRequested && (
            <>
              <input type="text" placeholder="Enter OTP sent to email" value={otp}
                onChange={(e) => setOtp(e.target.value)} required />
              <input type="password" placeholder="New Password" value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)} required />
            </>
          )}
          <button onClick={handleForgotPassword}
            disabled={loading || serverStatus === "offline"}>
            {loading ? "Processing..." : otpRequested ? "Reset Password" : "Send OTP"}
          </button>
          <p className="back-to-login" onClick={() => {
            setForgotPassword(false); setOtpRequested(false);
            setOtp(""); setNewPassword(""); setError("");
          }}>
            Back to Login
          </p>
        </>

      ) : isSignUp ? (
        /* ── Sign Up — email + password only, no OTP ── */
        <>
          <input type="email" placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password (min 6 characters)" value={password}
            onChange={(e) => setPassword(e.target.value)} required />
          <input type="password" placeholder="Confirm Password" value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} required />
          <button onClick={handleSignUp}
            disabled={loading || serverStatus === "offline"}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
          <p className="toggle-auth-mode" onClick={switchMode}>
            Already have an account? Log In
          </p>
        </>

      ) : (
        /* ── Login ── */
        <>
        <span>Use this login Credentials</span>
        <p>Email: jigneshkanade93@gmail.com</p>
        <p>Password: jk@123</p>
          <input type="email" placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} required />
          <button onClick={handleLogin}
            disabled={loading || serverStatus === "offline"}>
            {loading ? "Logging in..." : "Log In"}
          </button>
          <p className="forgot-password" onClick={() => {
            setForgotPassword(true); setError("");
          }}>
            Forgot Password?
          </p>
          <p className="toggle-auth-mode" onClick={switchMode}>
            Don't have an account? Sign Up
          </p>
        </>
      )}
    </div>
  );
};

export default AuthPage;