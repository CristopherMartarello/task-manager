const Button = ({
  text,
  icon,
  variant = 'primary',
  size = 'small',
  className,
  ...rest
}) => {
  const getVariantColors = () => {
    if (variant === 'primary') {
      return 'bg-brand-primary text-white';
    }

    if (variant === 'secondary') {
      return 'bg-transaparent text-brand-dark-gray';
    }

    if (variant === 'default') {
      return 'bg-brand-light-gray text-brand-dark-blue';
    }
  };

  const getSizeClasses = () => {
    if (size === 'small') {
      return 'px-3 py-2 text-xs';
    }

    if (size === 'large') {
      return 'py-3 px-4 text-sm';
    }
  };

  return (
    <button
      className={`flex items-center justify-center gap-1 rounded-md ${getSizeClasses()} ${getVariantColors()} transition hover:opacity-80 ${className}`}
      {...rest}
    >
      {text}
      {icon}
    </button>
  );
};

export default Button;
