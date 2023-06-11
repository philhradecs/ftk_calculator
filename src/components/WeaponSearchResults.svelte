<script lang="ts">
	import {
		createQuery,
		keepPreviousData,
		type QueryFunctionContext
	} from '@tanstack/svelte-query';
	import { fade } from 'svelte/transition';
	import WeaponSearchResultCard from './WeaponSearchResultCard.svelte';
	import type { WeaponSearchItem, WeaponSearchResult } from '../routes/api/weapon/+server';
	import { createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';

	let dispatch = createEventDispatcher<{ click: WeaponSearchItem }>();

	function onClickWeapon(weaponSearchItem: WeaponSearchItem) {
		dispatch('click', weaponSearchItem);
	}

	export let search = '';

	const queryOptions = writable({
		queryKey: ['weaponSearch', search],
		queryFn: async ({ queryKey }: QueryFunctionContext) => {
			return fetch('/api/weapon?s=' + encodeURI(queryKey[1] as string), {
				method: 'GET'
			}).then((res) => res.json() as Promise<WeaponSearchResult>);
		},
		placeholderData: keepPreviousData
	});

	const query = createQuery(queryOptions);

	$: {
		$queryOptions.queryKey[1] = search;
	}

	$: console.log($query.data);
</script>

{#if !!$query.data?.length}
	<div
		transition:fade={{ duration: 120 }}
		class="grid grid-cols-2 justify-stretch gap-x-4 gap-y-8"
	>
		{#each $query.data as weaponSearchItem (weaponSearchItem.weapon_name)}
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
