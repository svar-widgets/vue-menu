<script setup>
import { ref } from "vue";
import { Button } from "@svar-ui/vue-core";
import { ActionMenu } from "../../src/index";
import { getProjects } from "../data";

const options = getProjects();
const active = ref(["a", "b", "c", "d"]);
const byId = id => options.find(a => a.id === id);

function filterMenu(option, item) {
	if (option.id === active.value[item]) {
		option.icon = "wxi-check";
	} else {
		option.icon = "wxi-empty";
	}
	return true;
}

function clicked(ev) {
	const { context, option } = ev;
	if (option) active.value[context] = option.id;
}

const menu = ref(null);
</script>

<template>
	<div class="demo-box">
		<h3>Action menu</h3>
		<p>Click on any button</p>
		<ActionMenu
			:options="options"
			:filter="filterMenu"
			:onclick="clicked"
			ref="menu"
		/>
		<template v-for="(item, i) in active" :key="i">
			<Button :onclick="ev => menu.show(ev, i)" :value="active[i]">
				{{ byId(item).text }}
			</Button>
			&nbsp;
		</template>
	</div>
</template>
