import type { DefineComponent, Component } from "vue";
import type { TPosition } from "@svar-ui/lib-dom";

export type { TPosition } from "@svar-ui/lib-dom";

export type TID = string | number;

export interface IMenuOption {
	id?: TID;
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
	action: IMenuOption | null; // @deprecated use `option` instead. Will be removed in v3.0
	option: IMenuOption | null;
	event?: MouseEvent;
}

// props passed to a custom option component registered by registerMenuItem
export interface IMenuItemProps {
	option: IMenuOption;
	item: IMenuOption; // @deprecated use `option` instead. Will be removed in v3.0
}

export type TMenuResolver = (item: any, event: MouseEvent) => any;
export type TMenuFilter = (option: IMenuOption, item: any) => boolean;
export type TMenuMount = (callback: () => void) => void;

export declare const Menu: DefineComponent<{
	options?: IMenuOption[];
	left?: number;
	top?: number;
	at?: TPosition;
	parent?: HTMLElement;
	mount?: TMenuMount;
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
	at?: TPosition;
	css?: string;
	onclick?: (ev: IMenuOptionClick) => void;
}>;

export declare const ContextMenu: DefineComponent<{
	options?: IMenuOption[];
	at?: TPosition;
	resolver?: TMenuResolver;
	dataKey?: string;
	filter?: TMenuFilter;
	css?: string;
	onclick?: (ev: IMenuOptionClick) => void;
}>;

export declare const ActionMenu: DefineComponent<{
	options?: IMenuOption[];
	at?: TPosition;
	resolver?: TMenuResolver;
	dataKey?: string;
	filter?: TMenuFilter;
	css?: string;
	onclick?: (ev: IMenuOptionClick) => void;
}>;

export declare function registerMenuItem(
	type: string,
	handler: Component<IMenuItemProps>
): void;
