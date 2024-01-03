export const Input = ({ placeholder, value, onChange }) => {
    return (
        <input
            className="h-12 border-gray-300 border-2 rounded-md p-2 w-full"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
};
