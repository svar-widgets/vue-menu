<script setup>
defineOptions({ name: "MenuBar" });

import { ref, computed } from "vue";
import ActionMenu from "./ActionMenu.vue";
import { prepareMenuData } from "../helpers";

const props = defineProps({
	css: { default: "" },
	menuCss: { default: "" },
	options: {},
	onclick: { type: Function },
});

const menu = ref(null);

const finalOptions = computed(() => prepareMenuData(props.options));

const active = ref(false);
const menuOptions = ref([]);

function doClick(ev) {
	active.value = null;
	props.onclick && props.onclick(ev);
}

function setMenu(ev, option, trigger) {
	// if the option has a submenu, show it and enable hover mode
	if (option.data && option.data.length) {
		if (active.value && trigger) {
			// second click on option with submenu disables hover mode
			active.value = null;
		} else {
			menuOptions.value = option.data;
			active.value = option.id;
			menu.value.show(ev, option);
		}
	} else {
		// hide the submenu
		menu.value.show(null);
		// if it was the click action, dispatch it and end hover mode
		if (trigger) {
			//[deprecated] action will be deprecated in 3.0
			props.onclick && props.onclick({ action: option, option });
			active.value = null;
		} else {
			// do not remove active flag, to preserve the hover mode
			active.value = -1;
		}
	}
}

function onHover(ev, option) {
	if (active.value) setMenu(ev, option);
}
</script>

<template>
	<div :class="['wx-menubar', css]">
		<button
			v-for="option in finalOptions"
			:key="option.id"
			:class="[
				'wx-option',
				{ 'wx-active': active === option.id, 'wx-disabled': option.disabled },
			]"
			@mouseenter="ev => onHover(ev, option)"
			@click="ev => setMenu(ev, option, true)"
		>
			{{ option.text }}
		</button>
	</div>

	<ActionMenu
		:css="menuCss"
		:onclick="doClick"
		:options="menuOptions"
		ref="menu"
	/>
</template>

<style scoped>
.wx-menubar {
	display: flex;
	position: relative;
	width: fit-content;
}

.wx-option {
	background-color: transparent;
	border: none;
	color: var(--wx-color-font);
	box-sizing: border-box;
	height: 36px;
	line-height: 30px;
	padding: 2px 12px;
	font-family: var(--wx-font-family);
	font-weight: var(--wx-font-weight);
	font-size: var(--wx-font-size);

	cursor: pointer;
	outline: none;
	white-space: nowrap;
}

.wx-active,
.wx-option:hover {
	background-color: var(--wx-background-alt);
	border-radius: var(--wx-button-border-radius);
}
.wx-disabled {
	pointer-events: none;
}
.wx-disabled {
	color: var(--wx-color-font-disabled);
}
</style>
