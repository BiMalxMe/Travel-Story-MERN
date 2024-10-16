import { useNavigate } from "react-router-dom";
import { PasswordInput } from "../../components/Input/PasswordInput";
import { useState } from "react";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name.");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    //Signup API call
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName:name,
        email: email,
        password: password,
      });
      //Handle sucessfull login response
      if (response.data && response.data.acessToken) {
        localStorage.setItem("token", response.data.acessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      //Handle the login error
      if (
        error.response &&
        error.response.data &&
        error.response.data.msg
      ) {
        setError(error.response.data.msg);
      } else {
        setError("An unexpected error occured. Please try again");
      }
    }
  };
  const navigate = useNavigate();
  return (
    <div className="h-screen bg-cyan-50 overflow-hidden relative">
      <div className="login-ui-box right-10 -top-40" />
      <div className="login-ui-box bg-cyan-200 -bottom-40 right-1/2" />
      <div className="h-screen container flex items-center justify-center px-20 mx-auto">
        <div className="w-2/4 h-[90vh] flex items-end bg-login-bg-img bg-cover bg-center rounded-lg p-10 z-50">
          <div>
            <h4 className="text-5xl text-white font-semibold leading-[50px]">
              Join the <br /> Adventure
            </h4>
            <p className="text-[15px] text-white leading-6 pr-7 pt-4">
              Create an account to start documenting your travels and 
              preserving your memories in your personal travel journal.
            </p>
          </div>
        </div>
        <div className="w-2/4 h-[75vh] bg-white rounded-r-lg relative p-16 shadow-lg shadow-cyan-200/20">
          <form onSubmit={handleSignup}>
            <h4 className="text-2xl font-semibold mb-7">Create User</h4>
            <input
              type="text"
              placeholder="fullname"
              className="input-box"
              value={name}
              onChange={({ target }) => {
                setName(target.value);
              }}
            />
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={({ target }) => {
                setEmail(target.value);
              }}
            />
            <PasswordInput
              value={password}
              onChange={({ target }) => {
                setPassword(target.value);
              }}
            />
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary">
              Create User
            </button>
            <p className="text-xs text-slate-500 text-center my-4">Or</p>
            <button
              type="submit"
              className="btn-primary btn-light"
              onClick={() => {
                navigate("/login");
              }}
            >
              {" "}
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
