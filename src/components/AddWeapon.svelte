<script lang="ts">
	import { enhance } from '$app/forms';
	import { IconX } from '@tabler/icons-svelte';
	import Card from './Card.svelte';

	import type { WeaponSearchItem } from '../routes/api/weapon/+server';
	import WeaponSearchResults from './WeaponSearchResults.svelte';

	let search = '';
	let showForm = false;

	const handleNameChange = (e: Event) => {
		const target = e.target as HTMLInputElement;
		search = target.value;
	};

	let form: HTMLFormElement;

	let setFormValues = ({ weapon_name, attacks }: WeaponSearchItem) => {
		if (form) {
			const nameInput = <HTMLInputElement>form.elements.namedItem('name');
			const dmgInput = <HTMLInputElement>form.elements.namedItem('dmg');
			const nDiceInput = <HTMLInputElement>form.elements.namedItem('nDice');
			const pHitPctInput = <HTMLInputElement>form.elements.namedItem('pHitPct');
			if (nameInput && dmgInput && nDiceInput && pHitPctInput) {
				nameInput.value = weapon_name;
				dmgInput.value = String(attacks[0].dmg);
				nDiceInput.value = String(attacks[0].dice);
				pHitPctInput.value = '';

				pHitPctInput.focus();
			}
		}
	};

</script>

{#if showForm}
	<div>
		<Card title="+ Add Weapon">
			<form
				bind:this={form}
				method="POST"
				action="?/create-weapon"
				use:enhance
				on:submit={() => {
					search = '';
					showForm = false;
				}}
				class="mt-2"
			>
				<div class="flex gap-3">
					<input
						name="name"
						placeholder="Weapon Name"
						autofocus
						autocomplete="off"
						required
						class="input flex-1"
						on:input={handleNameChange}
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
							<input
								type="radio"
								name="nDice"
								value={i}
								checked={i === 3}
								class="mask mask-squircle"
							/>
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
				<div class="mt-6 flex gap-2">
					<button class="btn btn-sm w-28 btn-success">Add</button>
					<button
						type="button"
						class="btn btn-sm w-28 btn-ghost"
						on:click={() => (showForm = false)}
					>
						Cancel
					</button>
				</div>
			</form>
		</Card>
		<div class="mt-8">
			<WeaponSearchResults {search} on:click={(data) => setFormValues(data.detail)} />
		</div>
	</div>
{:else}
	<div class="flex">
		<button class="btn btn-black ml-auto" on:click={() => (showForm = true)}> + Add Weapon </button>
	</div>
{/if}
