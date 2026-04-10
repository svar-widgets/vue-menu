<script setup>
const props = defineProps({
	option: {},
});
</script>

<template>
	<div>
		<span class="avatar">&nbsp;</span>
		<span>{{ props.option.name }}</span>
	</div>
</template>

<style scoped>
div {
	white-space: nowrap;
}
span {
	display: inline-block;
	height: 26px;
	line-height: 26px;
}
.avatar {
	width: 26px;
	border-radius: 26px;
	background-color: blueviolet;
	margin-right: 3px;
}
</style>
