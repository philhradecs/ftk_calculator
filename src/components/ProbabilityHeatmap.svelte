<script lang="ts">
	import cdf from '@stdlib/stats-base-dists-binomial-cdf';
	import Plot from './Plot.svelte';
	import { type PlotOptions, cell, text } from '@observablehq/plot';

	function generateRange(start: number, end: number, interval: number = 1) {
		let length = Math.floor((end - start) / interval) + 1;
		return Array.from({ length }, (_, i) => start + i * interval);
	}

	const getMinsuccessHeatmap = (allowedMisses: number) => {
		const pMinSuccess = (x: number, n: number, p: number) => 1 - cdf(x - 1, n, p);

		const hitChances = generateRange(0.3, 1, 0.05);
		const dice = generateRange(1, 6);
		const data = hitChances
			.map((hitChance) => {
				return dice.map((numDice) => {
					return {
						numDice,
						hitChance,
						pMinSuccess: pMinSuccess(Math.max(numDice - allowedMisses, 0), numDice, hitChance)
					};
				});
			})
			.flat();

		return data;
	};

	export let maxMisses = 1;

	$: data = getMinsuccessHeatmap(maxMisses);

	let options: PlotOptions;

	const height = 560;
	const width = 340;

	$: options = {
		height,
		width,
		padding: 0.03,
		marginLeft: 60,
		marginBottom: 38,
		color: { scheme: 'PiYG', type: 'linear' },
		x: {
			label: 'Number of dice',
			tickSize: 0,
			tickPadding: 5
		},
		y: {
			label: 'Hit chance per dice',
			reverse: true,
			interval: 0.05,
			tickFormat: '.0%',
			tickSize: 0,
			tickPadding: 6
		},
		marks: [
			cell(data, {
				fill: 'pMinSuccess',
				x: 'numDice',
				y: 'hitChance',
				fillOpacity: 0.85,
				inset: 0,
				margin: 0
			}),
			text(data, {
				x: 'numDice',
				y: 'hitChance',
				text: (d) =>
					d.pMinSuccess > 0.99 ? '★' : d.pMinSuccess < 0.01 ? '' : Math.round(d.pMinSuccess * 100),
				fill: 'black',
				stroke: 'white',
				strokeWidth: 1.5,
				strokeOpacity: 0.8,
				fontFamily: 'monospace',
				fontWeight: 'bold'
			})
		]
	};
</script>

<div style:min-width={`${width}px`} style:min-height={`${height}px`}>
	<Plot {options} />
</div>
