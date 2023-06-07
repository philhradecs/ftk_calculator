<script lang="ts">
	import type { Weapon } from '$lib/server/database';
	import type { PlotOptions } from '@observablehq/plot';
	import Plot from './Plot.svelte';

  const focusBonus = {
    1: 10,
    2: 15,
    3: 17,
    4: 19,
  };

	export let weapon: Weapon;
	const { pHit, nDice, dmg, name } = weapon;

	let options: PlotOptions;
	$: options = {};
</script>

<Plot {options} />
