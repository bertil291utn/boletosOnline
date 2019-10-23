export interface NavItem {
    displayName: string;
    enabled?: boolean;
    iconName: string;
    route?: string;
    children?: NavItem[];
  }