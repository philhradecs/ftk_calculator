<script lang="ts">
	import { interpolatePuBuGn, interpolatePuRd } from 'd3-scale-chromatic';

	import type { FocusStat } from '$lib/server/calculate-weapon-stats';

	export let focusStat: FocusStat;
	const { dmgMode, successRate, focus } = focusStat;
	let color = interpolatePuBuGn(successRate);
</script>

<div class="flex flex-col items-center gap-1">
	{#if focus > 0}
		<div class="block mask mask-diamond bg-accent w-2 h-2" />
	{/if}
	{#if focus === 0}
		<div
			style:background={color}
			class="w-14 h-14 flex justify-center items-center mask mask-hexagon drop-shadow-lg"
		>
			<span class:text-white={successRate === 1} class="text-black text-xl font-bold">
				{dmgMode}
			</span>
		</div>
	{:else}
		<div
			style:background={color}
			class="w-9 h-9 flex justify-center items-center mask mask-hexagon drop-shadow-lg"
		>
			<span class:text-white={successRate === 1} class="text-black text-sm font-bold">
				{dmgMode}
			</span>
		</div>
	{/if}
</div>
