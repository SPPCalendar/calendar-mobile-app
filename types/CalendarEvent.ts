export type CalendarEvent = {
    id: number;
    event_name: string;
    start_time: string; // You can convert to Date if needed
    end_time: string;
    color: string;
    calendar_id: number;
    category_id: number | null;
    calendar: {
      id: number;
      calendar_name: string;
      color: string;
    };
    category: any | null; // Define if needed later
  };