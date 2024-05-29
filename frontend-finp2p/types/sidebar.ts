export interface SidebarItem {
  isTitle: boolean;
  name: string;
  icon: string;
  link: string;
  subItems: SubItem[];
  active: string;
}

type SubItem = {
  name: string;
  icon: string;
  link: string;
};
