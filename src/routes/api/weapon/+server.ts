import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import weapons from '$lib/server/ftk_weapons.json';

export type WeaponSearchItem = (typeof weapons)[number];
export type WeaponSearchResult = WeaponSearchItem[];

export const GET = (({ url }) => {
	const search = url.searchParams.get('s') ?? '';

	const results =
		search === ''
			? []
			: weapons.filter((weapon) => weapon.weapon_name.toLowerCase().includes(search.toLowerCase()));

	return json(results);
}) satisfies RequestHandler;
