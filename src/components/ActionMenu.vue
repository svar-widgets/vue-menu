<script setup>
import { ref, computed, useSlots } from "vue";
import { Portal } from "@svar-ui/vue-core";
import { locateID } from "@svar-ui/lib-dom";
import Menu from "./Menu.vue";
import { filterMenu } from "../helpers";

const props = defineProps({
	options: {},
	at: { default: "bottom" },
	resolver: { default: null },
	dataKey: { default: "contextId" },
	filter: { default: null },
	css: { default: "" },
	onclick: { type: Function },
});

const slots = useSlots();

const attrName = computed(() =>
	`data-${props.dataKey.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()}`
);

const item = ref(null);
const parent = ref(null);
const left = ref(0);
const top = ref(0);

const filteredOptions = computed(() => {
	if (item.value !== null && props.filter) {
		return filterMenu(props.options, v => props.filter(v, item.value));
	}
	return props.options;
});

function onClick(ev) {
	parent.value = null;
	props.onclick && props.onclick(ev);
}

function show(ev, obj) {
	if (!ev) {
		parent.value = null;
		return;
	}

	if (ev.defaultPrevented) return;

	const target = ev.target;
	if (target && target.dataset && target.dataset.menuIgnore) return;

	left.value = ev.clientX + 1;
	top.value = ev.clientY + 1;

	item.value =
		typeof obj !== "undefined" ? obj : locateID(target, attrName.value);
	if (props.resolver) {
		item.value = props.resolver(item.value, ev);
		if (!item.value) return;
	}

	parent.value = target;

	ev.preventDefault();
}

defineExpose({ show });
</script>

<template>
	<span
		v-if="slots.default"
		@click="show"
		data-menu-ignore="true"
	>
		<slot />
	</span>

	<Portal v-if="parent" v-slot="{ mount }">
		<Menu
			:key="parent"
			:css="css"
			:at="at"
			:top="top"
			:left="left"
			:mount="mount"
			:parent="parent"
			:context="item"
			:onclick="onClick"
			:options="filteredOptions"
		/>
	</Portal>
</template>
