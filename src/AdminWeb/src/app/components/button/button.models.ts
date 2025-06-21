import { Colors } from "@coreui/angular";

export interface ButtonDef {
  title?: string | ((row: any) => string);
  icon?: string;
  action?: (row: any) => void;
  isVisible?: (row: any) => boolean;
  id: string;
  color?: Colors | ((row: any) => Colors);
  redirectTo?: string | ((row: any) => string);
  size?: '' | 'sm' | 'lg';
  variant?: 'ghost' | 'outline' | undefined;
}
