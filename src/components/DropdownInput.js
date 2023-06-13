const DropdownInput = ({ label, options, value, onChange }) => {
  return (
    <div className="flex flex-col">
      <label className="font-normal text-gray-800">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded-lg"
        required
      >
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export { DropdownInput };
