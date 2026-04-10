<script setup>
import { ref } from "vue";
import { Portal } from "@svar-ui/vue-core";
import Menu from "./Menu.vue";

const props = defineProps({
	options: {},
	at: { default: "bottom" },
	css: { default: "" },
	onclick: { type: Function },
});

const parent = ref(null);

function show(ev) {
	parent.value = ev.target;
	ev.preventDefault();
}

function onClick(ev) {
	parent.value = null;
	props.onclick && props.onclick(ev);
}

function showAt(ev) {
	let target = ev.target;
	while (!target.dataset.menuIgnore) {
		parent.value = target;
		target = target.parentNode;
	}
}

defineExpose({ show });
</script>

<template>
	<span @click="showAt" data-menu-ignore="true">
		<slot />
	</span>
	<Portal v-if="parent" v-slot="{ mount }">
		<Menu
			:key="parent"
			:css="css"
			:at="at"
			:mount="mount"
			:parent="parent"
			:options="options"
			:onclick="onClick"
		/>
	</Portal>
</template>
