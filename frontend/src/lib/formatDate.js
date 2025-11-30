import { format, parseISO } from "date-fns";

export function formatDateTime(dateInput) {
  if (!dateInput) return "-";
  try {
    const date = typeof dateInput === "string" ? parseISO(dateInput) : dateInput;
    return format(date, "dd-MM-yyyy HH:mm:ss a");
  } catch (e) {
    return "-";
  }
}


export function formatDate(dateInput) {
  if (!dateInput) return "-";
  try {
    const date = typeof dateInput === "string" ? parseISO(dateInput) : dateInput;
    return format(date, "dd-MM-yyyy");
  } catch (e) {
    return "-";
  }
}