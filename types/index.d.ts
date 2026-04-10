import type { DefineComponent, Component } from "vue";

export interface IMenuOption {
	id?: string | number;
	text?: string;
	subtext?: string;
	handler?: (ev: IMenuOptionClick) => void;
	data?: IMenuOption[];
	css?: string;
	icon?: string;
	disabled?: boolean;
	type?: string | Component<any>; // @deprecated use `comp` instead. Will be removed in v3.0
	comp?: string | Component<any>;
}

export interface IMenuOptionClick {
	context?: any;
	action: IMenuOption; // @deprecated use `option` instead. Will be removed in v3.0
	option: IMenuOption;
	event?: MouseEvent;
}

export declare const Menu: DefineComponent<{
	options?: IMenuOption[];
	left?: number;
	top?: number;
	at?: string;
	parent?: HTMLElement;
	mount?: (callback: () => void) => void;
	context?: any;
	css?: string;
	onclick?: (ev: IMenuOptionClick) => void;
}>;

export declare const MenuBar: DefineComponent<{
	css?: string;
	menuCss?: string;
	options?: IMenuOption[];
	onclick?: (ev: IMenuOptionClick) => void;
}>;

export declare const DropDownMenu: DefineComponent<{
	options?: IMenuOption[];
	at?: string;
	css?: string;
	onclick?: (ev: IMenuOptionClick) => void;
}>;

export declare const ContextMenu: DefineComponent<{
	options?: IMenuOption[];
	at?: string;
	resolver?: (item: any, event: MouseEvent) => any;
	dataKey?: string;
	filter?: (option: IMenuOption, item: any) => boolean;
	css?: string;
	onclick?: (ev: IMenuOptionClick) => void;
}>;

export declare const ActionMenu: DefineComponent<{
	options?: IMenuOption[];
	at?: string;
	resolver?: (item: any, event: MouseEvent) => any;
	dataKey?: string;
	filter?: (option: IMenuOption, item: any) => boolean;
	css?: string;
	onclick?: (ev: IMenuOptionClick) => void;
}>;

export declare function registerMenuItem(
	type: string,
	handler: Component<{ option?: any }>
): void;
