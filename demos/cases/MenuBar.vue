<script setup>
import { ref } from "vue";
import { MenuBar } from "../../src/index";
import { getMenuBarOptions } from "../data";

const options = getMenuBarOptions();

const message = ref("");
function clicked(ev) {
	const option = ev.option;
	message.value = option ? `clicked on ${option.id}` : "closed";
}
</script>

<template>
	<MenuBar :options="options" :onclick="clicked"></MenuBar>
	<div class="demo-status">{{ message }}</div>
</template>
