import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const DateRangePicker = ({ startDate, endDate, setStartDate, setEndDate, setIsOpen}) => {
  const handleSelect = (range) => {
    setStartDate(range?.from || null);
    setEndDate(range?.to || null);
    setIsOpen(false)
  };

  return (
    <DayPicker
      mode="range"
      selected={{ from: startDate, to: endDate }}
      onSelect={handleSelect}
      className="p-3"
      modifiersClassNames={{
        today: "text-primary1",
      }}
      footer={
        startDate && endDate ? (
          <p>
            Selected from {startDate.toLocaleDateString()} to{" "}
            {endDate.toLocaleDateString()}
          </p>
        ) : (
          <p>Please select the first day.</p>
        )
      }
    />
  );
};

export default DateRangePicker;
