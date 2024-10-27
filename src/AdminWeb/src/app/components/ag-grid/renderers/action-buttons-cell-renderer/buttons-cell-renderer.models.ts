import { Colors } from "@coreui/angular";

export interface ButtonDef {
  title?: string;
  icon?: string;
  action: (row: any) => void;
  isVisible?: (row: any) => boolean;
  id: string;
  color?: Colors;
  size?: 'sm' | 'lg';
  variant?: 'ghost' | 'outline';
}
