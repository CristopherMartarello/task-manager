const Button = ({ text, icon, variant = 'primary' }) => {
  const getVariantColors = () => {
    if (variant === 'primary') {
      return 'bg-[#00AD85] text-white';
    }

    if (variant === 'secondary') {
      return 'bg-transaparent text-[#818181]';
    }
  };

  return (
    <button
      className={`flex items-center gap-1 rounded-md px-3 py-2 text-xs ${getVariantColors()} transition hover:opacity-80`}
    >
      {text}
      {icon}
    </button>
  );
};

export default Button;
