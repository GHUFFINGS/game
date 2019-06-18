define(["require", "exports", "../../Monster", "../../../console", "../../../../includes/appearanceDefs"], function (require, exports, Monster_1, console_1, appearanceDefs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Jojo extends Monster_1.Monster {
        defeated(hpVictory) {
            this.game.jojoScene.defeatedJojo(hpVictory);
        }
        won(hpVictory, pcCameWorms) {
            this.game.jojoScene.loseToJojo();
        }
        performCombatAction() {
            if (this.game.monk > 1 && Jojo.rand(2) == 0)
                this.selfCorruption(); //Shouldn't do any self corruption at monk one. Otherwise a 50/50 chance
            else
                this.eAttack();
        }
        selfCorruption() {
            switch (this.game.monk) {
                case 2:
                    this.outputText("Jojo looks lost in thought for a moment, and fails to attack.  ");
                    this.lust += 4;
                    break;
                case 3:
                    this.outputText("Jojo blushes as he fights you, distracted by a stray thought.  You think you see a bulge in the loose cloth of his pants.  ");
                    this.lust += 8;
                    break;
                case 4:
                    this.outputText("Jojo stumbles, shakes his head, and pulls one of his hands away from the stiff tent in his pants.  ");
                    this.lust += 10;
                    break;
                default:
                    this.outputText("Jojo frantically jerks his " + this.cockDescriptShort(0) + ", stroking the " + this.cockDescriptShort(0) + " as it leaks pre-cum at the sight of you.  ");
                    this.lust += 15;
            }
            if (this.lust >= 100) {
                this.doNext(this.game.endLustVictory);
                return;
            }
            else if (this.lust >= 85)
                this.outputText("The mouse is panting and softly whining, each movement seeming to make his bulge more pronounced.  You don't think he can hold out much longer.  ");
            else if (this.lust >= 70)
                this.outputText("The mouse is having trouble moving due to the rigid protrusion from his groin.  ");
            else if (this.lust >= 60)
                this.outputText("The mouse's eyes constantly dart over your most sexual parts, betraying his lust.  ");
            else if (this.lust > 50)
                this.outputText("The mouse's skin remains flushed with the beginnings of arousal.  ");
            this.doNext(this.game.playerMenu);
        }
        constructor() {
            super();
            console_1.trace("Jojo Constructor!");
            this.a = "";
            this.short = "Jojo";
            this.imageName = "jojo";
            this.long = "Jojo is an anthropomorphic mouse with immaculate white fur.  Though he stands only four feet tall, he is covered in lean muscle and moves with incredible speed.  He wears loose white clothes wrapped in prayer beads and tattered prayer papers.";
            // this.plural = false;
            this.createCock(7.5, 1.8);
            this.balls = 2;
            this.ballSize = 1;
            this.cumMultiplier = 1;
            this.hoursSinceCum = 1000;
            this.createBreastRow(0);
            this.ass.analLooseness = appearanceDefs_1.ANAL_LOOSENESS_TIGHT;
            this.ass.analWetness = appearanceDefs_1.ANAL_WETNESS_NORMAL;
            this.tallness = 4 * 12;
            this.hipRating = appearanceDefs_1.HIP_RATING_SLENDER;
            this.buttRating = appearanceDefs_1.BUTT_RATING_TIGHT;
            this.skinTone = "white";
            this.skinType = appearanceDefs_1.SKIN_TYPE_FUR;
            this.skinDesc = "fur";
            this.hairColor = "white";
            this.hairLength = 2;
            this.initStrTouSpeInte(35, 40, 65, 55);
            this.initLibSensCor(15, 40, 0);
            this.weaponName = "paw";
            this.weaponVerb = "punch";
            this.armorName = "robes";
            this.lust = 15;
            this.lustVuln = .9;
            this.temperment = Jojo.TEMPERMENT_LUSTY_GRAPPLES;
            this.level = 4;
            this.gems = Jojo.rand(5) + 2;
            this.special1 = this.selfCorruption;
            //Create jojo sex attributes
            //Variations based on jojo's corruption.
            if (this.game.monk == 3) {
                this.lust += 30;
                this.cocks[0].cockThickness += .2;
                this.cocks[0].cockLength += 1.5;
                if (this.player.gender == 1 || this.player.gender == 3)
                    this.ass.analLooseness = 2;
            }
            if (this.game.monk == 4) {
                this.lust += 40;
                this.cocks[0].cockThickness += .5;
                this.cocks[0].cockLength += 3.5;
                if (this.player.gender == 1 || this.player.gender == 3)
                    this.ass.analLooseness = 3;
            }
            if (this.game.monk == 5) {
                this.lust += 50;
                this.cocks[0].cockThickness += 1;
                this.cocks[0].cockLength += 5.5;
                this.str -= 20;
                this.tou += 30;
                this.HP += 60;
                if (this.player.gender == 1 || this.player.gender == 3)
                    this.ass.analLooseness = 4;
                this.long = "Jojo is an anthropomorphic mouse with immaculate white fur.  Though he stands only four feet tall, he is covered in lean muscle and moves with incredible speed.  He's naked, with a large tainted throbbing member bouncing at attention.  A fuzzy sack with painfully large looking balls dangles between his legs.";
            }
            this.drop = this.NO_DROP;
            this.checkMonster();
        }
    }
    exports.Jojo = Jojo;
});
//# sourceMappingURL=Jojo.js.map