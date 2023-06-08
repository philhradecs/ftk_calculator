// In a real app, this data would live in a database,

import type { FocusStats } from './calculate-weapon-stats';

// rather than in memory. But for now, we cheat.
export type BaseWeapon = {
	id: string;
	pHitPct: number;
	nDice: number;
	dmg: number;
	name: string;
};

export type Weapon = BaseWeapon & FocusStats;

const db = new Map<string, Weapon[]>();

export function getWeapons(userId: string) {
	if (!db.get(userId)) {
		db.set(userId, []);
	}

	return db.get(userId);
}

export function createWeapon(userId: string, weaponData: Omit<Weapon, 'id'>) {
	const weapons = db.get(userId);

	if (!weapons) {
		throw new Error('User does not exist');
	}

	weapons.push({
		id: crypto.randomUUID(),
		...weaponData
	});
}

export function deleteWeapon(userId: string, weaponId: string) {
	const weapons = db.get(userId);

	if (!weapons) {
		throw new Error('User does not exist');
	}

	const index = weapons.findIndex((weapon) => weapon.id === weaponId);

	if (index !== -1) {
		weapons.splice(index, 1);
	}
}
