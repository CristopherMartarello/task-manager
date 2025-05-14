import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { tv } from 'tailwind-variants';

const SidebarButton = ({ children, href }) => {
  const sidebar = tv({
    base: 'flex items-center gap-2 rounded-lg px-6 py-3',
    variants: {
      color: {
        selected: 'bg-brand-primary bg-opacity-15 text-brand-primary',
        default: 'text-brand-dark-blue',
      },
    },
  });

  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        sidebar({ color: isActive ? 'selected' : 'default' })
      }
    >
      {children}
    </NavLink>
  );
};

SidebarButton.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['selected', 'default']),
};

export default SidebarButton;
