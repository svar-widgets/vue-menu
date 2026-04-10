<script setup>
import { ref, useSlots } from "vue";
import ActionMenu from "./ActionMenu.vue";

const slots = useSlots();

const props = defineProps({
	options: {},
	at: { default: "bottom" },
	resolver: { default: null },
	dataKey: { default: "contextId" },
	filter: { default: null },
	css: { default: "" },
	onclick: { type: Function },
});

const menu = ref(null);

function show(ev, obj) {
	menu.value.show(ev, obj);
}

defineExpose({ show });
</script>

<template>
	<span
		v-if="slots.default"
		@contextmenu="show"
		data-menu-ignore="true"
	>
		<slot />
	</span>

	<ActionMenu
		ref="menu"
		:css="css"
		:at="at"
		:options="options"
		:resolver="resolver"
		:data-key="dataKey"
		:filter="filter"
		:onclick="onclick"
	/>
</template>
