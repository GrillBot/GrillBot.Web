export interface IChildMenuItem {
  name: string;
  url: string;
  permissions: string[];
}

export interface IMenuItem extends IChildMenuItem {
  icon: string;
  productionDisabled?: boolean;
  childItems: IChildMenuItem[];
}
