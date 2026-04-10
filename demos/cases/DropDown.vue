<script setup>
import { ref } from "vue";
import { Button } from "@svar-ui/vue-core";
import { DropDownMenu } from "../../src/index";

import { getOptions } from "../data";

const options = getOptions();

const message = ref("");
function clicked(ev) {
	const option = ev.option;
	message.value = option ? `clicked on ${option.id}` : "closed";
}
</script>

<template>
	<div class="demo-status">{{ message }}</div>

	<div class="demo-box">
		<h3>Dropdown menu, default</h3>
		<DropDownMenu :options="options" :onclick="clicked">
			<Button type="primary">Click me</Button>
		</DropDownMenu>
	</div>

	<div class="demo-box">
		<h3>Dropdown menu, fit to button</h3>
		<DropDownMenu :options="options" at="bottom-fit" :onclick="clicked">
			<Button type="primary">Click me and check the menu size</Button>
		</DropDownMenu>
	</div>

	<div class="demo-box">
		<h3>Dropdown menu, right</h3>
		<DropDownMenu :options="options" :onclick="clicked" at="right">
			<Button type="primary">Click me</Button>
		</DropDownMenu>
	</div>

	<div class="demo-box">
		<h3>Dropdown menu from icon</h3>
		<DropDownMenu :options="options" :onclick="clicked" at="right">
			<Button icon="wxi-calendar" />
		</DropDownMenu>
	</div>
</template>
