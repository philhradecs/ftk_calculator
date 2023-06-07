<script lang="ts">
	import * as Plot from '@observablehq/plot';

	export let options: Plot.PlotOptions;

	function myplot(node: Element) {
		node.appendChild(Plot.plot({ style: { background: 'none' }, ...options }));
	}
</script>

{#key options}
	<div use:myplot {...$$restProps} />
{/key}
