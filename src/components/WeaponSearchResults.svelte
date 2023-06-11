<script lang="ts">
	import { createQuery, type QueryFunctionContext } from '@tanstack/svelte-query';
	import WeaponSearchResultCard from './WeaponSearchResultCard.svelte';
	import type { WeaponSearchItem, WeaponSearchResult } from '../routes/api/weapon/+server';
	import { createEventDispatcher } from 'svelte';

	let dispatch = createEventDispatcher<{ click: WeaponSearchItem }>();

	function onClickWeapon(weaponSearchItem: WeaponSearchItem) {
		dispatch('click', weaponSearchItem);
	}

	export let search = '';

	$: query = createQuery({
		queryKey: ['weaponSearch', search],
		queryFn: async ({ queryKey }: QueryFunctionContext) => {
			return fetch('/api/weapon?s=' + encodeURI(queryKey[1] as string), {
				method: 'GET'
			}).then((res) => res.json() as Promise<WeaponSearchResult>);
		}
	});
</script>

{#if !!$query.data?.length}
	<div class="grid grid-cols-2 justify-stretch gap-x-4 gap-y-8">
		{#each $query.data as weaponSearchItem}
			<button
				class="text-left"
				on:click={() => onClickWeapon(weaponSearchItem)}
				on:keydown={() => onClickWeapon(weaponSearchItem)}
			>
				<WeaponSearchResultCard {weaponSearchItem} />
			</button>
		{/each}
	</div>
{/if}
