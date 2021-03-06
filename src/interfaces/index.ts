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
  id: number;
  name: string;
  colour: string;
}

export interface EventPreview {
  id: string;
  name: string;
  user: string;
  start: Date;
  details: string;
  category: Category;
}
