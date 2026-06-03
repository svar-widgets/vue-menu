<script setup>
defineOptions({ name: "MenuContext" });

import { ref } from "vue";
import { ContextMenu } from "../../src/index";
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
		<h3>Right click menu</h3>
		<ContextMenu :options="options" :onclick="clicked" at="point">
			<div class="box">Click me (menu at cursor)</div>
		</ContextMenu>
	</div>

	<div class="demo-box">
		<h3>Nested context menus</h3>
		<ContextMenu :options="options" :onclick="clicked" at="point">
			<div
				class="double-box"
				style="padding: 20px; background: var(--wx-background-alt)"
			>
				Click me (outer menu)
				<br />
				<ContextMenu
					:options="[{ id: 'inner', text: 'inner menu' }]"
					:onclick="clicked"
					at="right"
				>
					<span
						style="
							display: inline-block;
							width: 150px;
							padding: 10px;
							background: var(--wx-background);
						"
						>(inner menu)</span>
				</ContextMenu>
				<br />
			</div>
		</ContextMenu>
	</div>
</template>

<style scoped>
.box,
.double-box {
	width: 400px;
	height: 100px;
	line-height: 100px;
	text-align: center;
	border: var(--wx-border);
}
.double-box {
	line-height: 70px;
	height: 200px;
}
.double-box > :deep(div) {
	display: inline;
}
</style>
