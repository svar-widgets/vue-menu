<script setup>
import { Button } from "@svar-ui/vue-core";
import { DropDownMenu, registerMenuItem } from "../../src/index";
import { getTeam } from "../data";

const styledOptions = [
	{ id: 1, text: "Add User", subtext: "Ctrl+A" },
	{ id: 2, text: "Refresh", subtext: "Ctrl+R" },
	{ id: 3, text: "Delete User", css: "danger" },
];

import ButtonMenuItem from "../custom/ButtonMenuItem.vue";
import UserMenuItem from "../custom/UserMenuItem.vue";

registerMenuItem("user", UserMenuItem);

const options = getTeam();
options[3].comp = ButtonMenuItem;
</script>

<template>
	<div class="demo-box">
		<h3>Styling menu options</h3>
		<p>Click the button</p>
		<DropDownMenu :options="styledOptions">
			<Button type="primary">Click me</Button>
		</DropDownMenu>
	</div>

	<div class="demo-box">
		<h3>Custom component as menu option</h3>
		<p>Click the button</p>
		<DropDownMenu :options="options">
			<Button type="primary">Select User</Button>
		</DropDownMenu>
	</div>
</template>
