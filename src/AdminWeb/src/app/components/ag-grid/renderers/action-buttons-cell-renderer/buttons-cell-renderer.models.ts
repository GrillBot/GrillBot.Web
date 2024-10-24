import { Colors } from "@coreui/angular";

export interface ButtonDef {
  title?: string;
  icon?: string;
  action: (row: any) => void;
  id: string;
  color?: Colors;
  size?: 'sm' | 'lg'
  variant?: 'ghost' | 'outline'
}
