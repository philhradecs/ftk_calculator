<script lang="ts">
	import type { WeaponSearchItem } from '../routes/api/weapon/+server';

	export let weaponSearchItem: WeaponSearchItem;
	const { weapon_skill, weapon_type, attacks } =
		weaponSearchItem;
</script>

<table class="table table-xs">
	<tr>
		<th>Type</th>
		<td>{weapon_type}</td>
	</tr>
	<tr>
		<th>Skill</th>
		<td>{weapon_skill}</td>
	</tr>
	<tr>
		<th>DMG</th>
		<td>{attacks[0].dmg}</td>
	</tr>
	<tr>
		<th>Dice</th>
		<td>{attacks[0].dice}</td>
	</tr>
</table>

<style lang="postcss">
	th {
		font-size: 0.75rem;
	}
	th,
	td {
		padding-top: 0;
		padding-bottom: 0;
	}
</style>
