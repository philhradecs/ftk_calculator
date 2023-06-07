import { fail } from '@sveltejs/kit';
import type { ServerLoad } from '@sveltejs/kit';
import * as db from '$lib/server/database';

export const load = (({ cookies }) => {
	const id = cookies.get('userId');

	if (!id) {
		cookies.set('userId', crypto.randomUUID(), { path: '/' });
	}

	return {
		weapons: id ? db.getWeapons(id) ?? [] : []
	};
}) satisfies ServerLoad;

export const actions = {
	'create-weapon': async ({ cookies, request }) => {
		const data = await request.formData();
		const values = {
			name: data.get('name'),
			pHit: data.get('pHit'),
			nDice: data.get('nDice'),
			dmg: data.get('dmg')
		};

		try {
			db.createWeapon(cookies.get('userId'), values);
		} catch (error) {
			return fail(422, {
				description: data.get('name'),
				error: error.message
			});
		}
	},

	'delete-weapon': async ({ cookies, request }) => {
		const data = await request.formData();
		db.deleteWeapon(cookies.get('userId'), data.get('id'));
	}
};
