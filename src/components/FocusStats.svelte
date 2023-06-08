<script lang="ts">
	import type { Weapon } from '$lib/server/database';

	export let weapon: Weapon;
	
</script>

<div>
	<div class="flex items-center">
		{#each weapon.focusStats as { dmgMode, color, focus, successRate }}
			<div class="flex flex-col items-center gap-1">
				{#if focus > 0}
					<div class="block mask mask-diamond bg-accent w-2 h-2" />
				{/if}
				<div
					style:background={color}
					class:w-14={focus === 0}
					class:h-14={focus === 0}
					class="w-10 h-10 flex justify-center items-center mask mask-hexagon"
				>
					<span
						class:text-xl={focus === 0}
						class:text-white={successRate === 1}
						class="text-black text-sm font-bold"
					>
						{dmgMode}
					</span>
				</div>
			</div>
		{/each}
	</div>
</div>
