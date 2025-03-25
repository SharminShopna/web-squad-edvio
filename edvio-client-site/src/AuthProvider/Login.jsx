import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import SocialLogin from "./SocialLogin";
import UseAuth from "../Hook/UseAuth";
import { Slide } from "react-awesome-reveal";
import "../Shared/Pro.css";
const Login = () => {
  const [disabled, setDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { signIn } = UseAuth();

  useEffect(() => {
    loadCaptchaEnginge(5);
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    const banTime = localStorage.getItem("banTime");
    const currentTime = Date.now();

    if (banTime && currentTime < parseInt(banTime)) {
      const remainingTime = Math.ceil(
        (parseInt(banTime) - currentTime) / 60000
      );
      return Swal.fire({
        icon: "error",
        title: "Too Many Failed Attempts",
        text: `You are temporarily banned. Try again in ${remainingTime} minutes.`,
      });
    }

    let failedAttempts = parseInt(localStorage.getItem("failedAttempts")) || 0;

    try {
      const result = await signIn(email, password);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome back, ${result.user.email}!`,
      });

      localStorage.removeItem("failedAttempts");
      localStorage.removeItem("banTime");

      navigate(from, { replace: true });
    } catch (error) {
      failedAttempts++;

      if (failedAttempts >= 3) {
        const banDuration = 60 * 60 * 1000;
        localStorage.setItem("banTime", currentTime + banDuration);
        localStorage.removeItem("failedAttempts");

        return Swal.fire({
          icon: "error",
          title: "Account Temporarily Locked",
          text: "You have entered the wrong password 3 times. Please try again after 1 hour.",
        });
      } else {
        localStorage.setItem("failedAttempts", failedAttempts);
        return Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: `Wrong password. ${
            3 - failedAttempts
          } attempts left before ban.`,
        });
      }
    }
  };

  const handleValidateCaptcha = (e) => {
    const userCaptchaValue = e.target.value;
    setDisabled(!validateCaptcha(userCaptchaValue));
  };

  return (
    <div className="min-h-screen flex items-center bg-TealGreen justify-center px-4">
      <div className="md:flex md:justify-center shadow-lg rounded-2xl border-white/20 bg-white/10 md:items-center">
        {/* step 1*/}
        <div className="w-full max-w-lg    px-8 py-4  ">
          <h2 className="text-2xl font-bold text-center text-white mb-4 ">
            Sign In
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <Slide direction="up" triggerOnce>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 bg-white/20 text-white border border-white/30 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none placeholder-white/70"
                  required
                />
              </div>
            </Slide>
            <Slide direction="up" triggerOnce>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 bg-white/20 text-white border border-white/30 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none placeholder-white/70"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </Slide>
            <Slide direction="down" triggerOnce>
              <div>
                <LoadCanvasTemplate />
                <input
                  type="text"
                  name="captcha"
                  placeholder="Type the captcha above"
                  onBlur={handleValidateCaptcha}
                  className="w-full px-4 py-2 bg-white/20 text-white border border-white/30 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none placeholder-white/70"
                  required
                />
              </div>
            </Slide>
            <button
              type="submit"
              disabled={disabled}
              className="w-full proCardButton"
            >
              Log In
            </button>
          </form>
          <p className="text-center mt-4 text-white/80">
            New here?{" "}
            <Link to="/register" className="text-green-300 hover:underline">
              Create an account
            </Link>
          </p>
          <div className="divider my-4 text-white/50">OR</div>
          <SocialLogin />
        </div>
        {/* step 2 */}
        <div className="w-3/4 mx-auto mt-4 md:mr-4 text-card space-y-2 text-center">
          <h3 className="md:text-3xl text-2xl font-bold">Hello,Friends</h3>
          <p>Enter your personal details and start journey with us </p>
          <div className="w-3/4 mx-auto">
            <button type="submit" className="w-full mb-4 proCardButton">
              <NavLink to="/register">Sign Up</NavLink>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
