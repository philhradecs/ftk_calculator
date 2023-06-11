<script lang="ts">
	import AddWeapon from '../components/AddWeapon.svelte';
	import GeneralProbability from '../components/GeneralProbability.svelte';
	import WeaponsList from '../components/WeaponsList.svelte';

	export let data;
</script>

<div class="container mx-auto p-8 flex justify-center gap-16">
	<div class="self-start h-auto sticky top-8">
		<GeneralProbability heatmaps={data.heatmaps} />
	</div>
	<div class="flex flex-col gap-10 w-[540px]">
		{#if data.weapons.length}
			<WeaponsList weapons={data.weapons} />
		{/if}
		<AddWeapon />
	</div>
</div>
