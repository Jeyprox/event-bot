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

export interface Category {
  name: string;
  colour: string;
}

export interface EventPreview {
  id: string;
  name: string;
  user: string;
  start: Date;
  duration: number;
  details: string;
  category: Category;
}
