<script lang="ts">
	import type { Weapon } from '$lib/server/database';
	import { IconX } from '@tabler/icons-svelte';

	export let weapon: Weapon;
	const { pHitPct, nDice, dmg } = weapon;
</script>

<table class="table table-xs w-fit">
	<tr>
		<th>DMG</th>
		<td>{dmg}</td>
	</tr>
	<tr>
		<th>Roll</th>
		<td>
			<div class="flex items-center gap-1">
				<div
					class="bg-base-content w-5 h-5 flex justify-center items-center text-xs text-black font-bold mask mask-squircle drop-shadow-md"
				>
					{nDice}
				</div>
				<IconX class="w-3.5 h-3.5" />
				<div>{pHitPct}%</div>
			</div>
		</td>
	</tr>
</table>
