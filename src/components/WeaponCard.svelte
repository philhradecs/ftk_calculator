<script lang="ts">
	import type { Weapon } from '$lib/server/database';
	import { IconTrash } from '@tabler/icons-svelte';
	import Card from './Card.svelte';
	import { enhance } from '$app/forms';
	import WeaponStatsTable from './WeaponStatsTable.svelte';
	import DmgStats from './DmgStats.svelte';
	import PerfectStats from './PerfectStats.svelte';

	export let weapon: Weapon;
</script>

<Card title={weapon.name} titleClass="text-gray-200" cardClass="bg-slate-900 w-full relative">
	<div class="flex gap-10 items-start mt-1">
		<WeaponStatsTable {weapon} />
		<div class="group">
			<div class="block group-hover:hidden">
				<div class="flex gap-3 items-center">
					<div class="flex items-start">
						{#each weapon.focusStats as focusStat}
							<DmgStats {focusStat} />
							<div class="hidden group-hover:block"><PerfectStats {focusStat} /></div>
						{/each}
					</div>
					<!-- <div class="text-sm">Expected DMG</div> -->
				</div>
			</div>

			<div class="hidden group-hover:block">
				<div class="flex gap-3 items-center">
					<div class="flex items-start">
						{#each weapon.focusStats as focusStat}
							<PerfectStats {focusStat} />
						{/each}
					</div>
					<!-- <div class="text-sm">Perfect Chance</div> -->
				</div>
			</div>
		</div>
	</div>
	<div class="absolute -top-2.5 -right-2.5 z-20">
		<form method="POST" action="?/delete-weapon" use:enhance>
			<input type="hidden" name="id" value={weapon.id} />
			<button class="btn btn-sm btn-black btn-square">
				<IconTrash class="w-3.5 h-3.5" />
			</button>
		</form>
	</div>
</Card>
