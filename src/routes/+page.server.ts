import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import type { ServerLoad } from '@sveltejs/kit';
import * as db from '$lib/server/database';
import { calculateStats } from '$lib/server/calculate-weapon-stats.js';
import { getMinSuccessHeatmaData } from '$lib/server/calculate-heatmap-data';

export const load = (({ cookies }) => {
	const id = cookies.get('userId');

	if (!id) {
		cookies.set('userId', crypto.randomUUID(), { path: '/' });
	}

	return {
		weapons: id ? db.getWeapons(id) ?? [] : [],
		heatmaps: getMinSuccessHeatmaData([0, 1, 2, 3, 4, 5])
	};
}) satisfies ServerLoad;

export const actions = {
	'create-weapon': async ({ cookies, request }) => {
		const userId = cookies.get('userId')

		if (!userId) {
			return fail(422, {
				error: 'User ID not found'
			});
		}

		const data = await request.formData();

		const values = {
			name: data.get('name'),
			pHitPct: Number(data.get('pHitPct')),
			nDice: Number(data.get('nDice')),
			dmg: Number(data.get('dmg'))
		};

		try {
			const validated = z
				.object({
					name: z.string().min(1),
					pHitPct: z.number().min(0).max(100),
					nDice: z.number().min(1),
					dmg: z.number().min(0)
				})
				.parse(values);

			const stats = calculateStats(validated);
			const data = { ...values, ...stats };
			
			db.createWeapon(userId, data);
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
