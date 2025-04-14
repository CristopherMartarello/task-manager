import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import InputErrorMessage from './InputErrorMessage';
import InputLabel from './InputLabel';

// const TimeSelect = (props) => {
//   return (
//     <div className="flex flex-col gap-1 text-left">
//       <InputLabel htmlFor="time">Horário</InputLabel>
//       <select
//         id="time"
//         className="rounded-lg border border-solid px-4 py-3 text-sm outline-brand-primary placeholder:text-brand-text-gray"
//         {...props}
//       >
//         <option value="morning">Manhã</option>
//         <option value="afternoon">Tarde</option>
//         <option value="night">Noite</option>
//       </select>
//       {props.error && (
//         <p className="text-left text-xs text-red-500">{props.error.message}</p>
//       )}
//     </div>
//   );
// };

const TimeSelect = forwardRef((props, ref) => {
  return (
    <div className="flex flex-col gap-1 text-left">
      <InputLabel htmlFor="time">Horário</InputLabel>
      <select
        id="time"
        className="rounded-lg border border-solid px-4 py-3 text-sm outline-brand-primary placeholder:text-brand-text-gray"
        {...props}
        ref={ref}
      >
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="night">Noite</option>
      </select>
      {props.error?.message && (
        <InputErrorMessage>{props.error.message}</InputErrorMessage>
      )}
    </div>
  );
});

TimeSelect.displayName = 'TimeSelect';
TimeSelect.propTypes = {
  errorMessage: PropTypes.string,
};

export default TimeSelect;
