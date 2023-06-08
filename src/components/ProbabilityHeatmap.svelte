<script lang="ts">
	import type { HeatmapData } from '$lib/server/calculate-heatmap-data';
	import Plot from './Plot.svelte';
	import { type PlotOptions, cell, text, crosshair } from '@observablehq/plot';

	export let data: HeatmapData

	let options: PlotOptions;

	const height = 520;
	const width = 380;

	$: options = {
		height,
		width,
		padding: 0.03,
		marginLeft: 60,
		marginBottom: 38,
		color: { scheme: 'PuBuGn', type: 'linear' },
		x: {
			label: 'Number of dice',
			tickSize: 0,
			tickPadding: 5
		},
		y: {
			label: 'Hit chance per dice',
			reverse: true,
			tickFormat: '.0%',
			tickSize: 0,
			tickPadding: 6
		},
		marks: [
			cell(data.values, {
				fill: 'pMinSuccess',
				x: 'numDice',
				y: 'hitChance',
				fillOpacity: 0.85,
				inset: 0,
				margin: 0
			}),
			crosshair(data.values,{
				x: 'numDice',
				y: 'hitChance',
				textFill: 'none',
				textStroke: 'none',
				ruleStroke: 'white',
				ruleStrokeOpacity: 0.25,
			}),
			text(data.values, {
				x: 'numDice',
				y: 'hitChance',
				text: (d) =>
					d.pMinSuccess > 0.99 ? '★' : d.pMinSuccess < 0.01 ? '' : Math.round(d.pMinSuccess * 100),
				fill: 'white',
				fillOpacity: 0.95,
				stroke: 'black',
				strokeWidth: 1,
				strokeOpacity: 0.8,
				fontSize: 11,
				fontFamily: 'monospace',
				fontWeight: 'bold'
			}),
		]
	};
</script>

<div style:min-width={`${width}px`} style:min-height={`${height}px`}>
	<Plot {options} />
</div>
