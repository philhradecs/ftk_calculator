import cdf from '@stdlib/stats-base-dists-binomial-cdf';

export type HeatmapDatum = {
	numDice: number;
	hitChance: number;
	pMinSuccess: number;
};

export type HeatmapData = { maxMisses: number; values: HeatmapDatum[] };

function generateRange(start: number, end: number, interval = 1) {
	const length = Math.ceil((end - start) / interval) + 1;
	return Array.from({ length }, (_, i) => start + i * interval);
}

export function getMinSuccessHeatmaData(maxMissesList: number[]): HeatmapData[] {
	const pMinSuccess = (x: number, n: number, p: number) => 1 - cdf(x - 1, n, p);

	const hitChances = generateRange(0.3, 1, 0.05);
	const dice = generateRange(2, 7);

	return maxMissesList.map((maxMisses) => {
		const values = hitChances.flatMap((hitChance) => {
			return dice.map((numDice) => {
				return {
					numDice,
					hitChance,
					pMinSuccess: pMinSuccess(Math.max(numDice - maxMisses, 0), numDice, hitChance)
				};
			});
		});

		return { values, maxMisses };
	});
}
