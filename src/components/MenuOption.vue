<script setup>
import { ref, computed } from "vue";
import { setID } from "@svar-ui/lib-dom";
import { getItemHandler } from "../helpers";

const props = defineProps({
	option: {},
	onclick: { type: Function },
	onshow: { type: Function },
});

const element = ref(null);

const itemComponent = computed(() =>
	props.option.comp ? getItemHandler(props.option.comp) : null
);

function onHover() {
	props.onshow?.(props.option.data ? props.option.id : false, element.value);
}
function onClick(ev) {
	if (props.option.data) {
		ev.stopPropagation();
		props.onshow?.(props.option.id, element.value);
		return;
	}
	props.onclick?.(ev);
}
</script>

<template>
	<div
		ref="element"
		:class="['wx-option', option.css || '', { 'wx-disabled': option.disabled }]"
		:data-id="setID(option.id)"
		@mouseenter="onHover"
		@click="onClick"
	>
		<i v-if="option.icon" :class="['wx-icon', option.icon]"></i>
		<template v-if="option.comp">
			<!-- [deprecated] item property will be deprecated in 3.0-->
			<component :is="itemComponent" :item="option" :option="option" />
		</template>
		<span v-else class="wx-value"> {{ option.text }} </span>
		<span v-if="option.subtext" class="wx-subtext">{{ option.subtext }}</span>
		<i v-if="option.data" class="wx-sub-icon wxi-angle-right"></i>
	</div>
</template>

<style scoped>
.wx-option {
	display: flex;
	align-items: center;
	box-sizing: border-box;
	height: 36px;
	line-height: 36px;
	padding: 2px 12px;
	font-family: var(--wx-font-family);
	font-weight: var(--wx-font-weight);
	font-size: var(--wx-font-size);
	background-color: var(--wx-background);
	cursor: pointer;
}

.wx-option:hover {
	background: var(--wx-background-alt);
}

.wx-option:first-child {
	border-top-left-radius: inherit;
	border-top-right-radius: inherit;
}

.wx-option:last-child {
	border-bottom-left-radius: inherit;
	border-bottom-right-radius: inherit;
}

.wx-value {
	flex-grow: 1;
	white-space: nowrap;
	color: var(--wx-color-font);
}
.wx-icon,
.wx-sub-icon {
	vertical-align: middle;
	height: inherit;
	line-height: inherit;
	font-size: var(--wx-icon-size);
	color: var(--wx-icon-color);
}

.wx-icon {
	margin-right: 8px;
}

.wx-subtext {
	color: var(--wx-color-font-disabled);
	margin-left: 20px;
	white-space: nowrap;
}

.wx-disabled {
	pointer-events: none;
}
.wx-disabled .wx-value,
.wx-disabled .wx-icon,
.wx-disabled .wx-sub-icon {
	color: var(--wx-color-font-disabled);
}
</style>
