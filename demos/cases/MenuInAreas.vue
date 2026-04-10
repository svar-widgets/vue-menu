<script setup>
import { ref } from "vue";
import { Button, ModalArea, SideArea, Popup } from "@svar-ui/vue-core";
import { ActionMenu } from "../../src/index";
import { getProjects } from "../data";

const options = getProjects();
const active = ref(["a", "b", "c", "d"]);
const byId = id => options.find(a => a.id === id);

function filterMenu(v, item) {
	if (v.id === active.value[item]) {
		v.icon = "wxi-check";
	} else {
		v.icon = "wxi-empty";
	}
	return true;
}

function clicked(ev) {
	const { context, option } = ev;
	if (option) active.value[context] = option.id;
}

const menu1 = ref(null);
const menu2 = ref(null);
const menu3 = ref(null);
const modal = ref(false);
const sidebar = ref(false);
const popup = ref(false);
</script>

<template>
	<div class="buttons">
		<Button :onclick="() => (modal = true)" text="Open modal" />
		<Button :onclick="() => (popup = true)" text="Open popup" />
		<Button :onclick="() => (sidebar = true)" text="Open sidebar" />
	</div>

	<Popup v-if="popup" :left="200" :top="100" :oncancel="() => (popup = false)">
		<div class="demo-box">
			<h3>Action menu</h3>
			<p>Click on any button</p>
			<ActionMenu
				:options="options"
				:filter="filterMenu"
				:onclick="clicked"
				ref="menu1"
			/>
			<Button
				v-for="(item, i) in active"
				:key="i"
				:onclick="ev => menu1.show(ev, i)"
				:value="active[i]"
			>
				{{ byId(item).text }}
			</Button>
		</div>
	</Popup>

	<ModalArea v-if="modal">
		<div class="toolbar">
			<Button icon="wxi-close" :onclick="() => (modal = false)" />
		</div>
		<div class="demo-box">
			<h3>Action menu</h3>
			<p>Click on any button</p>
			<ActionMenu
				:options="options"
				:filter="filterMenu"
				:onclick="clicked"
				ref="menu2"
			/>
			<Button
				v-for="(item, i) in active"
				:key="i"
				:onclick="ev => menu2.show(ev, i)"
				:value="active[i]"
			>
				{{ byId(item).text }}
			</Button>
		</div>
	</ModalArea>

	<SideArea v-if="sidebar" :oncancel="() => (sidebar = false)">
		<div class="toolbar">
			<Button icon="wxi-close" :onclick="() => (sidebar = false)" />
		</div>
		<div class="demo-box">
			<h3>Action menu</h3>
			<p>Click on any button</p>
			<ActionMenu
				:options="options"
				at="left"
				:filter="filterMenu"
				:onclick="clicked"
				ref="menu3"
			/>
			<Button
				v-for="(item, i) in active"
				:key="i"
				:onclick="ev => menu3.show(ev, i)"
				:value="active[i]"
			>
				{{ byId(item).text }}
			</Button>
		</div>
	</SideArea>
</template>

<style scoped>
.buttons {
	margin: 20px;
	display: flex;
	gap: 20px;
}

.demo-box {
	padding: 40px;
}

.toolbar {
	padding: 20px;
}

.toolbar:first-child {
	float: right;
}
</style>
