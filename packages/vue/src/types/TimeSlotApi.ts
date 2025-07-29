export type TimeSlotApi = {
  _dev?: {
    row: number;
    schedule_id: any;
    available_from: string | null;
    available_to: string | null;
  } | undefined;
  start_at: string;
  duration: string;
  available: boolean;
  provider: string;
  performer: string;
};
