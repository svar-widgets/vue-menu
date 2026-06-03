<script setup>
defineOptions({ name: "MenuMenu" });

import { ref, computed, watch, onMounted } from "vue";
import { clickOutside, calculatePosition, getPopupParents } from "@svar-ui/lib-dom";
import { asDirective } from "@svar-ui/lib-vue";

import MenuOption from "./MenuOption.vue";
import { prepareMenuData } from "../helpers";

const vClickoutside = asDirective(clickOutside);

const props = defineProps({
	options: {},
	left: { default: 0 },
	top: { default: 0 },
	at: { default: "bottom" },
	parent: { default: null },
	mount: { default: null },
	context: { default: null },
	css: { default: "" },
	onclick: { type: Function },
});

const x = ref(-10000);
const y = ref(-10000);
const z = ref(20);
const width = ref(undefined);

const self = ref(null);
const showSub = ref(false);
const activeOption = ref(null);

function updatePosition() {
	const result = calculatePosition(
		self.value,
		props.parent,
		props.at,
		props.left,
		props.top
	);
	if (result) {
		x.value = result.x;
		y.value = result.y;
		width.value = result.width;
	}

	let nextZ = result?.z ?? 20;
	// stay above ancestor popups (anchor lives in original DOM, not the portal)
	const parents = props.parent ? getPopupParents(props.parent) : [];
	let popupZ = 0;
	for (const node of parents) {
		const zi = parseInt(getComputedStyle(node).zIndex, 10);
		if (zi > popupZ) popupZ = zi;
	}
	if (popupZ >= nextZ) nextZ = popupZ + 1;
	z.value = nextZ;
}

if (props.mount) props.mount(updatePosition);
onMounted(updatePosition);

function onLeave() {
	showSub.value = false;
}
function cancel() {
	//[deprecated] action will be deprecated in 3.0
	props.onclick?.({ action: null, option: null });
}
function onshow(id, el) {
	showSub.value = id;
	activeOption.value = el;
}

const finalOptions = computed(() => prepareMenuData(props.options));

watch(
	() => props.parent,
	() => {
		updatePosition();
	}
);
</script>

<template>
	<div
		v-clickoutside="{ callback: cancel, modal: true, parent: () => parent }"
		ref="self"
		data-wx-menu="true"
		:class="['wx-menu', css]"
		:style="`position:absolute;top:${y}px;left:${x}px;width:${width};z-index:${z}`"
		@mouseleave="onLeave"
	>
		<template v-for="option in finalOptions" :key="option.id">
			<div v-if="option.comp === 'separator'" class="wx-separator"></div>
			<MenuOption
				v-else
				:option="option"
				:onshow="onshow"
				:onclick="
					ev => {
						if (!option.data && !ev.defaultPrevented) {
							//[deprecated] action will be deprecated in 3.0
							const pack = {
								context,
								action: option,
								option,
								event: ev,
							};
							if (option.handler) option.handler(pack);
							props.onclick?.(pack);

							// it is a rare case when we need to stop event bubbling
							// clicking on menu is isolated action which must not affect any other elements on the page
							ev.stopPropagation();
						}
					}
				"
			/>
			<Menu
				v-if="option.data && showSub === option.id"
				:css="css"
				:options="option.data"
				at="right-overlap"
				:parent="activeOption"
				:context="context"
				:onclick="onclick"
			/>
		</template>
	</div>
</template>

<style scoped>
.wx-menu {
	position: absolute;
	box-shadow: var(--wx-shadow-light);

	min-width: 125px;
	display: flex;
	flex-direction: column;
	z-index: 20;
	border-radius: var(--wx-border-radius);
	background-color: var(--wx-background);
	padding: 4px 0;
}

.wx-separator {
	width: 100%;
	border-top: var(--wx-border-medium);
}
</style>
