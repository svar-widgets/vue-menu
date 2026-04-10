<script setup>
import { ref, computed } from "vue";
import { ContextMenu, MenuBar } from "../../src/index";
import { Button } from "@svar-ui/vue-core";
import { getMenuBarOptions, getOptions } from "../data";

const disabled = ref(true);

function disableEdit(options) {
	const option = options.find(
		o => o.id === "edit" || o.id === "edit-task"
	);
	option.disabled = true;
}

const barOptions = computed(() => {
	const options = getMenuBarOptions().map(o => ({ ...o }));
	if (disabled.value) disableEdit(options);
	return options;
});

const options = computed(() => {
	const opts = getOptions().map(o => ({ ...o }));
	if (disabled.value) disableEdit(opts);
	return opts;
});

const message = ref("");
function clicked(ev) {
	const option = ev.option;
	message.value = option ? `clicked on ${option.id}` : "closed";
}

function switchDisabled() {
	disabled.value = !disabled.value;
}
</script>

<template>
	<MenuBar :options="barOptions" :onclick="clicked"></MenuBar>
	<div class="demo-status">{{ message }}</div>

	<div class="demo-box">
		<ContextMenu :options="options" :onclick="clicked" at="point">
			<div class="double-box">Click me ( context menu )</div>
		</ContextMenu>
	</div>

	<div style="padding-left: 20px">
		<Button :onclick="switchDisabled" type="primary">
{{
			(disabled ? "Enable" : "Disable") + " edit option"
		}}
</Button>
	</div>
</template>

<style scoped>
.double-box {
	width: 400px;
	height: 100px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: var(--wx-border);
}
</style>
