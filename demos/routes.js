import ActionMenu from "./cases/ActionMenu.vue";
import BasicInit from "./cases/BasicInit.vue";
import Context from "./cases/Context.vue";
import ContextData from "./cases/ContextData.vue";
import CustomArea from "./cases/CustomArea.vue";
import CustomOptions from "./cases/CustomOptions.vue";
import DropDown from "./cases/DropDown.vue";
import MenuBar from "./cases/MenuBar.vue";
import MenuPositions from "./cases/MenuPositions.vue";
import Relative from "./cases/Relative.vue";
import MenuInAreas from "./cases/MenuInAreas.vue";
import Styling from "./cases/Styling.vue";
import DisabledOption from "./cases/DisabledOption.vue";

export const links = [
	["/base/:skin", "Menu basic", BasicInit, "BasicInit"],
	["/bar/:skin", "Menu bar", MenuBar, "MenuBar"],
	["/dropdown/:skin", "Dropdown menu", DropDown, "DropDown"],
	["/context/:skin", "Context menu", Context, "Context"],
	["/action/:skin", "Action menu for items", ActionMenu, "ActionMenu"],
	[
		"/context-data/:skin",
		"Context menu for items",
		ContextData,
		"ContextData",
	],
	["/custom-area/:skin", "Custom activation area", CustomArea, "CustomArea"],
	["/custom/:skin", "Custom options", CustomOptions, "CustomOptions"],
	["/positions/:skin", "Menu positions", MenuPositions, "MenuPositions"],
	["/relative/:skin", "Relative scroll", Relative, "Relative"],
	["/areas/:skin", "Menu in modals", MenuInAreas, "MenuInAreas"],
	["/styling/:skin", "Styling", Styling, "Styling"],
	["/disabled/:skin", "Disabled option", DisabledOption, "Disabled option"],
];
