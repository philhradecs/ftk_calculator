<script lang="ts">
	import type { Weapon } from '$lib/server/database';
	import { IconX } from '@tabler/icons-svelte';
	import Card from './Card.svelte';

	export let weapon: Weapon;
	const { pHit, nDice, dmg, name } = weapon;
</script>

<Card title={name} cardClass="bg-gray-900">
	<div class='flex'>
	  <table class="table table-xs w-fit">
  		<tr>
  			<th>DMG</th>
  			<td>{dmg}</td>
  		</tr>
  		<tr>
  			<th>Roll</th>
  			<td>
  				<div class="flex items-center gap-2">
  					<div
  						class="bg-base-content w-5 h-5 flex justify-center items-center text-xs text-black font-bold mask mask-squircle"
  					>
  						{nDice}
  					</div>
  					<IconX class="w-4 h-4" />
  					<div>{pHit}%</div>
  				</div>
  			</td>
  		</tr>
  	</table>
    <!-- <FocusStats {weapon} /> -->
	</div>
</Card>
