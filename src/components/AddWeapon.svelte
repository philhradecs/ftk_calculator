<script lang="ts">
	import { enhance } from '$app/forms';
	import { IconX } from '@tabler/icons-svelte';
	import Card from './Card.svelte';
</script>

<Card title="+ Add Weapon">
	<form method="POST" action="?/create-weapon" use:enhance>
		<div class="flex gap-3">
			<input
				name="name"
				placeholder="Weapon Name"
				autocomplete="off"
				required
				class="input flex-1"
			/>
			<input
				name="dmg"
				placeholder="DMG"
				type="number"
				min="0"
				autocomplete="off"
				required
				class="input w-32"
			/>
		</div>

		<div class="flex items-center justify-between gap-6 mt-3">
			<div class="rating rating-lg gap-2">
				{#each [1, 2, 3, 4, 5] as i (i)}
					<input type="radio" name="nDice" value={i} checked={i === 3} class="mask mask-squircle" />
				{/each}
			</div>
			<IconX class="w-5 h-5" />
			<input
				name="pHitPct"
				placeholder="Hit Chance"
				type="number"
				min="0"
				max="100"
				required
				class="input w-32"
			/>
		</div>
		<button class="btn btn-sm px-8 btn-success mt-6">Save</button>
	</form>
</Card>
