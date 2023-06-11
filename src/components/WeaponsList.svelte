<script lang="ts">
	import type { Weapon } from '../lib/server/database';
	import WeaponCard from './WeaponCard.svelte';

	export let weapons: Weapon[];
</script>

<div class="flex flex-col gap-8">
	{#each weapons as weapon (weapon.id)}
		<WeaponCard {weapon} />
	{/each}
</div>
