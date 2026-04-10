<script setup>
import { Button, Text } from "@svar-ui/vue-core";
import { ref } from "vue";

const props = defineProps({
	option: {},
});

const value = ref("");
</script>

<template>
	<div @click.prevent>
		<div style="width: 120px; padding-right: 8px">
			<Text :placeholder="props.option.name" v-model:value="value" />
		</div>
		<Button
			icon="wxi-delete"
			type="primary"
			:onclick="() => (value = '')"
		/>
	</div>
</template>

<style scoped>
div {
	display: flex;
	flex-direction: row;
}
</style>
