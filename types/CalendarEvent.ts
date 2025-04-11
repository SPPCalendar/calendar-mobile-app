export type CalendarEvent = {
    id: number;
    event_name: string;
    start_time: string;
    end_time: string;
    color: string;
    calendar_id: number;
    category_id: number | null;
    category: any | null;
    calendar: any | null;
  };