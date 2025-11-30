import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

export function DatePicker({ value, onChange }) {
  const initialDate = value
    ? new Date(value.split("-").reverse().join("-"))
    : null;

  const [date, setDate] = useState(initialDate);

  // Reset when parent clears input
  useEffect(() => {
    if (!value) {
      setDate(null);
    } else {
      setDate(new Date(value.split("-").reverse().join("-")));
    }
  }, [value]);

  const handleDateSelect = (selected) => {
    if (!selected) return;
    setDate(selected);
    onChange(format(selected, "dd-MM-yyyy"));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative w-full">
          <Input
            readOnly
            value={date ? format(date, "dd-MM-yyyy") : ""}
            placeholder="dd-mm-yyyy"
            className="cursor-pointer pr-10"
          />
          <CalendarIcon
            className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none"
          />
        </div>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          // 🚫 Disable all past dates
          disabled={(day) => day < new Date(new Date().setHours(0, 0, 0, 0))}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
