import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import InputErrorMessage from './InputErrorMessage';
import InputLabel from './InputLabel';

// const Input = ({ label, error, ...rest }) => {
//   return (
//     <div className="flex flex-col space-y-1 text-left">
//       <InputLabel htmlFor={rest.id}>{label}</InputLabel>
//       <input
//         className="rounded-lg border border-solid px-4 py-3 outline-brand-primary placeholder:text-sm placeholder:text-brand-text-gray"
//         {...rest}
//       />
//       {error && (
//         <p className="text-left text-xs text-red-500">{error.message}</p>
//       )}
//     </div>
//   );
// };

const Input = forwardRef(({ label, error, ...rest }, ref) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        className="rounded-lg border border-solid px-4 py-3 outline-brand-primary placeholder:text-sm placeholder:text-brand-text-gray"
        {...rest}
        ref={ref}
      />
      {error?.message && <InputErrorMessage>{error.message}</InputErrorMessage>}
    </div>
  );
});

Input.displayName = 'Input';
Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Input;
