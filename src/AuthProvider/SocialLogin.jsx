// import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseAuth from "../Hook/UseAuth";
import "../Shared/Pro.css";
const SocialLogin = () => {
  const { googleLogin } = UseAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const navigate = useNavigate();
  const handlelogin = () => {
    googleLogin().then((res) => {
      // server side add  করার পর এইটা  বাদ দিতে হবে
      if (res.user) {
        Swal.fire("Good job!", "You logged in successfully!", "success");
        navigate(location.state ? location.state : "/");
      }
      //   const user =res.user;
      //   const userInfo = {
      //     email: res?.user?.email,
      //     name: res?.user?.displayName,
      //     firebaseUid:user.uid,
      //     role:'user'
      //   };

      //   axios.post("/user", userInfo).then((res) => {
      //     if (res.data.insertedId) {
      //       Swal.fire({
      //         position: "top-center",
      //         icon: "success",
      //         title: "Your signUp has been saved",
      //         showConfirmButton: false,
      //         timer: 1500,
      //       });
      //     }
      //     console.log("social login")
      //   });
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
