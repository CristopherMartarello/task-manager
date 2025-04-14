import PropTypes from 'prop-types';

const Header = (props) => {
  return <header className="header">{props.children}</header>;
};

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;
