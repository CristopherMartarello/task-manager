import PropTypes from 'prop-types';
import { tv } from 'tailwind-variants';

const Button = ({
  text,
  icon,
  color = 'primary',
  size = 'small',
  className,
  ...rest
}) => {
  const button = tv({
    base: `flex items-center justify-center gap-1 rounded-md transition hover:opacity-80`, //Todas as classes que são comuns ao componente
    variants: {
      color: {
        primary: 'bg-brand-primary text-white',
        secondary: 'bg-transaparent text-brand-dark-gray',
        default: 'bg-brand-light-gray text-brand-dark-blue',
      },
      size: {
        small: 'px-3 py-2 text-xs',
        large: 'px-4 py-3 text-sm',
      },
    },
    defaultVariants: {
      color: 'primary',
      size: 'small',
    },
  });

  return (
    <button className={button({ color, size, className })} {...rest}>
      {text}
      {icon}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf(['primary', 'default', 'secondary', 'danger']),
  size: PropTypes.oneOf(['small', 'large']),
  className: PropTypes.string,
};

export default Button;
