import InputLabel from './InputLabel';

const TimeSelect = (props) => {
  return (
    <div className="flex flex-col gap-1 text-left">
      <InputLabel htmlFor="time">Horário</InputLabel>
      <select
        id="time"
        className="rounded-lg border border-solid px-4 py-3 text-sm outline-[#00ADB5] placeholder:text-[#9A9C9F]"
        {...props}
      >
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="night">Noite</option>
      </select>
      {props.error && (
        <p className="text-left text-xs text-red-500">{props.error.message}</p>
      )}
    </div>
  );
};

export default TimeSelect;
