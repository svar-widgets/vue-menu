<script setup>
import { ref } from "vue";
import { Button } from "@svar-ui/vue-core";
import { Menu } from "../../src/index";

import { getOptions } from "../data";

const options = getOptions();

const menu1 = ref(null);
const menu2 = ref(null);
const menu3 = ref(null);

const message = ref("");
function clicked(ev) {
	const option = ev.option;
	message.value = option ? `clicked on ${option.id}` : "closed";
	menu1.value = menu2.value = menu3.value = null;
}
</script>

<template>
	<div class="demo-status">{{ message }}</div>

	<div class="demo-box">
		<h3>Bottom menu</h3>
		<Button type="primary" :onclick="ev => (menu1 = ev.target)">
Click me
</Button>
		<Menu
			v-if="menu1"
			:options="options"
			:parent="menu1"
			:onclick="clicked"
		/>
	</div>

	<div class="demo-box">
		<h3>Right-side menu</h3>
		<Button type="primary" :onclick="ev => (menu2 = ev.target)">
Click me
</Button>
		<Menu
			v-if="menu2"
			:options="options"
			:parent="menu2"
			:onclick="clicked"
			at="right"
		/>
	</div>

	<div class="demo-box">
		<h3>Menu at cursor</h3>
		<div class="box" @click="ev => (menu3 = ev)">Click me</div>
		<Menu
			v-if="menu3"
			:options="options"
			:left="menu3.clientX + 5"
			:top="menu3.clientY + 5"
			:onclick="clicked"
			at="right"
		/>
	</div>
</template>

<style scoped>
.box {
	width: 400px;
	height: 100px;
	line-height: 100px;
	text-align: center;
	border: var(--wx-border);
}
</style>
