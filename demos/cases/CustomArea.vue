<script setup>
import { ActionMenu } from "../../src/index";
import { Icon } from "@svar-ui/vue-core";
import { ref } from "vue";

const options = [
	{
		text: "Cut 111",
		icon: "wxi wxi-content-cut",
	},
	{
		text: "Copy",
		icon: "wxi wxi-content-copy",
	},
	{
		text: "Paste",
		icon: "wxi wxi-content-paste",
	},
];

const message = ref("");
const submessage = ref("");
function clicked(ev) {
	const { context, option } = ev;
	message.value = option ? `${option.id} for item #${context}` : "closed";
}

const items = [
	{ id: 1, type: "project" },
	{ id: 2, type: "task" },
];

const resolver = id => id;
const innerResolver = id => (id[0] == "b" ? id : null);
const outerResolver = id => (id[0] == "c" ? id : null);

const menu = ref(null);
</script>

<template>
	<div class="demo-status">{{ message }} {{ submessage }}</div>

	<ActionMenu at="right" :options="options" :onclick="clicked" ref="menu" />
	<div class="demo-box">
		<h3>Action menu, icons</h3>
		<p>Click on menu "button"</p>
		<div v-for="item in items" :key="item.id" class="item">
			<div class="icon">
				<Icon css="wxi-menu" :onclick="ev => menu.show(ev, item.id)" />
			</div>
			<div class="title">{{ item.type }} {{ item.id }}</div>
		</div>
	</div>

	<div class="demo-box">
		<h3>Action menu, limited to specific areas</h3>
		<p>Click on menu "button"</p>
		<ActionMenu at="right" :options="options" :onclick="clicked" :resolver="resolver">
			<div v-for="item in items" :key="item.id" class="item">
				<div :data-context-id="item.id" class="menu">menu</div>
				<div class="title">{{ item.type }} {{ item.id }}</div>
			</div>
		</ActionMenu>
	</div>

	<div class="demo-box">
		<h3>Nested action menu, different menu for card and button areas</h3>
		<p>Click on menu "button" or on any card</p>
		<ActionMenu
			at="right"
			:options="[{ id: 1, text: 'inner menu' }]"
			:resolver="innerResolver"
		>
			<ActionMenu
				at="point"
				:options="options"
				:onclick="clicked"
				:resolver="outerResolver"
			>
				<div
					v-for="item in items"
					:key="item.id"
					class="item"
					:data-context-id="'c' + item.id"
				>
					<div :data-context-id="'b' + item.id" class="menu">menu</div>
					<div class="title">{{ item.type }} {{ item.id }}</div>
				</div>
			</ActionMenu>
		</ActionMenu>
	</div>
</template>

<style scoped>
.item {
	width: 200px;
	height: 100px;
	line-height: 30px;
	border: var(--wx-border);
	text-align: left;
	margin: 10px;
	padding: 5px 10px;
}
.title {
	text-transform: uppercase;
}
.menu {
	float: right;
	border: var(--wx-border);
	border-radius: 2px;
	padding: 0 10px;
	cursor: pointer;
}
.icon {
	float: right;
	margin-right: 10px;
}
</style>
