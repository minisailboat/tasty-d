import type { TabbarEnum } from "@/enums";

export interface TabbarItem {
	key: TabbarEnum;
	title: string;
	icon: string;
	selectedIcon: string;
}
