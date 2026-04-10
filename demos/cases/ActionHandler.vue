<script setup>
import { ref } from "vue";
import { ContextMenu } from "../../src/index";
import { getOptions } from "../data";

const options = getOptions();

const message = ref("");
function clicked(ev) {
	const { context, option } = ev;
	message.value = option
		? `${option.id} for ${context.type} ${context.id}`
		: "closed";
}

const items = [
	{ id: -1, name: "Disabled", disabled: true },
	{ id: 1, name: "Project A", type: "project" },
	{ id: 2, name: "Task 1.0" },
	{ id: 3, name: "Project B", type: "project" },
	{ id: 4, name: "Task 2.1" },
	{ id: 5, name: "Task 2.2" },
];
function getItem(id) {
	const item = items.find(a => a.id == id);

	if (item.disabled) return null;
	return item;
}
function filterMenu(option, item) {
	if (
		item.type === "project" &&
		typeof option.id === "string" &&
		!option.id.startsWith("add-task")
	)
		return false;

	return true;
}
</script>

<template>
	<div class="demo-status">{{ message }}</div>

	<div class="demo-box">
		<h3>Custom rules for context menu</h3>
		<p>Some items disabled, taks and project menu differs</p>
		<ContextMenu
			:options="options"
			:resolver="getItem"
			:filter="filterMenu"
			:onclick="clicked"
		>
			<div
				v-for="item in items"
				:key="item.id"
				:data-context-id="item.id"
				class="item"
				:class="{ disabled: item.disabled }"
			>
				{{ item.name }}
			</div>
		</ContextMenu>
	</div>
</template>

<style scoped>
.item {
	width: 240px;
	border: var(--wx-border);
	text-align: center;
	margin: 10px;
	padding: 20px 40px;
	white-space: nowrap;
}

.disabled {
	background: var(--wx-background-alt);
}
</style>
