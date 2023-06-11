<script lang="ts">
	import type { WeaponSearchItem } from '../routes/api/weapon/+server';
	import Card from './Card.svelte';
	import WeaponSearchResultTable from './WeaponSearchResultTable.svelte';

	export let weaponSearchItem: WeaponSearchItem;
	const { rarity, weapon_image, weapon_name } = weaponSearchItem;
</script>

<Card title={weapon_name} titleClass="text-2xl text-gray-200" cardClass='cursor-pointer border-l border-transparent transition-color hover:bg-success/20'>
	<div class="flex items-start gap-2">
		<div class="shrink-0">
			<img src={weapon_image} class="w-16 h-16" alt={weapon_name} />
			<div class="text-xs font-mono mt-2">{rarity}</div>
		</div>
		<WeaponSearchResultTable {weaponSearchItem} />
	</div>
</Card>
