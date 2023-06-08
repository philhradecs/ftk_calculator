<script lang="ts">
	import ProbabilityHeatmap from './ProbabilityHeatmap.svelte';
	import Card from './Card.svelte';
	import type { HeatmapData } from '$lib/server/calculate-heatmap-data';

	let maxMisses = 1;

	export let heatmaps: HeatmapData[];

	const maxMissesOptions = [
		{ value: 0, label: 'None' },
		{ value: 1, label: '1' },
		{ value: 2, label: '2' },
		{ value: 3, label: '3' }
	];

	$: data = heatmaps.find((d) => d.maxMisses === maxMisses) ?? { maxMisses, values: [] };
</script>

<div class="inline-block">
	<Card title="Success Rate" titleClass="text-amber-300">
		<h3 class="mr-4 font-bold">Max misses</h3>
		<div class="flex gap-3">
			{#each maxMissesOptions as { value, label } (value)}
				<label class="label">
					<input
						type="radio"
						name="max-misses"
						class="radio"
						class:radio-accent={value === 0}
						bind:group={maxMisses}
						{value}
					/>
					<span class="label-text ml-2">{label}</span>
				</label>
			{/each}
		</div>
		<div class="flex flex-col items-center">
			<ProbabilityHeatmap {data} />
		</div>
	</Card>
</div>
