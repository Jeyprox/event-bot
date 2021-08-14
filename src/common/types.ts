export interface Guild {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: number;
  features: string[];
}

export interface EventItem {
  event_id: string;
  event_name: string;
  creator: number;
}
