<script setup>
import { ref } from "vue";
import { ContextMenu } from "../../src/index";
import { getOptions } from "../data";

const options = getOptions();

let message = ref("");
function clicked(ev) {
	const { context, option } = ev;
	message.value = option
		? `${option.id} for ${context.type || "task"} ${context.id}`
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
</script>

<template>
	<div class="demo-status">{{ message }}</div>

	<div class="demo-box">
		<h3>Context menu can be limited to specific HTML elements</h3>
		<p>Some items are disabled</p>
		<ContextMenu
			:options="options"
			at="point"
			:resolver="getItem"
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
