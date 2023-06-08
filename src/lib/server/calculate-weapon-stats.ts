import mode from '@stdlib/stats-base-dists-binomial-mode';
import { interpolatePuRd } from 'd3-scale-chromatic';
import type { BaseWeapon } from './database';

type FocusStat = {
	focus: number;
	expectedSuccesses: number;
	dmgMode: number;
	successRate: number;
	color: string;
};

export type FocusStats = {
	focusStats: FocusStat[];
};

const getFocusBonus = (focus: number) => (focus >= 0 ? [0, 10, 15, 17, 19][focus] ?? 19 : 0);

export function calculateStats(weapon: Omit<BaseWeapon, 'id'>): FocusStats {
	const { pHitPct, nDice, dmg } = weapon;
	const dmgPerHit = dmg / nDice;

	const focusStats = Array.from({ length: nDice + 1 }, (_, idx) => {
		const guranteedHits = idx;
		const adjustedHitChance = Math.min(pHitPct + getFocusBonus(idx), 100) / 100;
		const rolledDice = Math.max(nDice - guranteedHits, 0);
		const expectedSuccesses = guranteedHits + mode(rolledDice, adjustedHitChance);
		const successRate = expectedSuccesses / nDice;

		return {
			focus: guranteedHits,
			expectedSuccesses,
			dmgMode: expectedSuccesses * dmgPerHit,
			successRate,
			color: interpolatePuRd(successRate)
		};
	});
	return { focusStats };
}
