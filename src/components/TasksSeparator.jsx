import PropTypes from 'prop-types';

const TasksSeparator = ({ icon, text }) => {
  return (
    <div className="flex gap-2 border-b border-solid border-brand-border pb-1">
      {icon}
      <p className="text-sm font-semibold text-brand-text-gray">{text}</p>
    </div>
  );
};

TasksSeparator.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.node.isRequired,
};

export default TasksSeparator;
