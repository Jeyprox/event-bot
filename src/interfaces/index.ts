export interface Guild {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: number;
}

export interface UserGuild {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: number;
  hasBot: boolean;
}

export interface EventItem {
  event_id: string;
  event_name: string;
  creator: number;
}
