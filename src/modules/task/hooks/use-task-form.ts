import { useState } from "react";

interface UseTaskFormProps {
  initialDateTime?: Date;
}

export function useTaskForm({ initialDateTime }: UseTaskFormProps = {}) {
  const [dateTime, setDateTime] = useState<Date | undefined>(initialDateTime);

  const handleTimeChange = (hours: number, minutes: number) => {
    if (dateTime) {
      const newDate = new Date(dateTime);
      newDate.setHours(hours, minutes);
      setDateTime(newDate);
    } else {
      const newDate = new Date();
      newDate.setHours(hours, minutes);
      setDateTime(newDate);
    }
  };

  const resetForm = () => {
    setDateTime(undefined);
  };

  return {
    dateTime,
    setDateTime,
    handleTimeChange,
    resetForm,
  };
}
