import { Effect } from '../Effect';
import { EffectDesc } from '../EffectDesc';

export class PentUp extends EffectDesc {
    public description(effect: Effect): string {
        return "Increases minimum lust by " + Math.round(effect.values.lust.min.flat) + " and makes you more vulnerable to seduction.";
    }

    public constructor() {
        super("Pent Up", "Pent Up", "Increases minimum lust and makes you more vulnerable to seduction");
    }
}