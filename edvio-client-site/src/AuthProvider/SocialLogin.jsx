// import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseAuth from "../Hook/UseAuth";
import "../Shared/Pro.css";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
const SocialLogin = () => {
  const { googleLogin } = UseAuth();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const from = location.state?.from?.pathname || "/";

  const navigate = useNavigate();
  const handlelogin = () => {
    googleLogin()
    .then((res) => {
        const user =res.user;
        const userInfo = {
          email: res?.user?.email,
          name: res?.user?.displayName,
          firebaseUid:user.uid,
          image: res?.user?.photoURL,
          role:'user'
        };
        axiosPublic.post("addUser", userInfo)
        .then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Your signUp has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
        
      navigate(from, { replace: true } || "/");
    });
  };
  return (
    <div>
      <div className="flex justify-center py-2 ">
        <button
          onClick={handlelogin}
          className="w-full flex items-center justify-center gap-2 py-2 proCardButton"
        >
          <FcGoogle className="text-2xl" />
          <span className="font-medium">Continue with Google</span>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
