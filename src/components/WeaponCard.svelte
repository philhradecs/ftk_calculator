<script lang="ts">
	import type { Weapon } from '$lib/server/database';
	import { IconTrash, IconTrashFilled, IconX } from '@tabler/icons-svelte';
	import Card from './Card.svelte';
	import FocusStats from './FocusStats.svelte';
	import { enhance } from '$app/forms';
	import WeaponStatsTable from './WeaponStatsTable.svelte';

	export let weapon: Weapon;
</script>

<Card title={weapon.name} titleClass="text-gray-200" cardClass="bg-gray-900 w-full relative">
	<div class="flex gap-8">
		<WeaponStatsTable {weapon} />
		<FocusStats {weapon} />
	</div>
	<div class="absolute -top-2.5 -right-2.5 z-20">
		<form method="POST" action="?/delete-weapon" use:enhance>
			<input type="hidden" name="id" value={weapon.id} />
			<button class="btn btn-sm bg-base-300 btn-square">
				<IconTrash class="w-3.5 h-3.5" />
			</button>
		</form>
	</div>
</Card>
