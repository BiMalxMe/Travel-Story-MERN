import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

export const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isshowPassword, setshowPassword] = useState(false);
  const togglePassword = () => {
    setshowPassword(!isshowPassword);
  };
  return (
    <div className="flex items-center bg-cyan-600/5 px-5 rounded mb-3">
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder || "password"}
        type={isshowPassword ? "text" : "password"}
        className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
      />
      {isshowPassword ? (
        <FaRegEye
          size={22}
          className="text-primary cursor-pointer"
          onClick={() => togglePassword()}
        ></FaRegEye>
      ) : (
        <FaRegEyeSlash
          size={22}
          className="text-slate-400 cursor-pointer"
          onClick={() => togglePassword()}
        />
      )}
    </div>
  );
};
