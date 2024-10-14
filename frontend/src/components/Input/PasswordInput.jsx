export const PasswordInput = ({value, onChange, placeholder}) => {
  return (
    <div className="flex items-center bg-cyan-600/5 px-5 rounded mb-3">
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder || "password"}
        className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
      />
    </div>
  );
};
