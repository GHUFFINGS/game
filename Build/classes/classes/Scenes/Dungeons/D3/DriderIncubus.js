define(["require", "exports", "../../Areas/Swamp/AbstractSpiderMorph", "../../../CockTypesEnum", "../../../../../includes/appearanceDefs", "../../../StatusAffects", "../../../PerkLib", "../../../GlobalFlags/kGAMECLASS"], function (require, exports, AbstractSpiderMorph_1, CockTypesEnum_1, appearanceDefs_1, StatusAffects_1, PerkLib_1, kGAMECLASS_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DriderIncubus extends AbstractSpiderMorph_1.AbstractSpiderMorph {
        constructor() {
            super();
            this._goblinFree = false;
            this._combatRound = 0;
            this._hpGains = 0;
            this._seenResolute = false;
            this._goblinWebChain = false;
            this._goblinOiled = false;
            this.a = "the ";
            this.short = "drider incubus";
            this.long = "The drider incubus is a marvel of demonic perversions applied to inhuman flesh. His glittering dark skin is like a solid sheet of coal. Twisted obsidian horns spiral from his forehead like a pair of misshapen spears. Even his eyes are an eerie marvel, no longer windows to the soul, only pits of endless hunger. His evil visage pales in comparison to the monstrous form below his waist - that of a gigantic spider. Eight clattering legs skitter across the floor with his every move. A bulbous abdomen hangs behind them, covered with twitching spinnerets so full of silk that half-formed blobs of it dangle behind him.\n\nHanging from an impeccably made harness is a goblin, the only splash of color on the soulless abomination before you. She’s positioned against the larger male’s abdomen so that her bare crotch is impaled upon his turgid, writhing demon-dick, and by the looks of her frantic squirming, is doing her best to escape. Perhaps you could free her?";
            this.tallness = 12 * 9;
            this.createCock(24, 5, CockTypesEnum_1.CockTypesEnum.DEMON);
            this.createBreastRow(0);
            this.balls = 2;
            this.ballSize = 4;
            this.hoursSinceCum = 9999;
            this.hipRating = appearanceDefs_1.HIP_RATING_SLENDER;
            this.buttRating = appearanceDefs_1.BUTT_RATING_TIGHT;
            this.initStrTouSpeInte(65, 80, 90, 70);
            this.initLibSensCor(66, 40, 100);
            this.weaponName = "spear";
            this.weaponAttack = 19;
            this.weaponVerb = "lunge";
            this.armorName = "chitin";
            this.armorDef = 40;
            this.bonusHP = 500;
            this.lustVuln = 0.45;
            this.gems = 75 + DriderIncubus.rand(50);
            this.level = 22;
            this.drop = this.NO_DROP;
            this.checkMonster();
        }
        defeated(hpVictory) {
            this.game.d3.driderIncubus.beatTheSpooderbutt(hpVictory);
        }
        won(hpVictory, pcCameWorms) {
            this.game.d3.driderIncubus.spooderbuttGetsANewCockSleeve(hpVictory, pcCameWorms);
        }
        get goblinFree() { return this._goblinFree; }
        set goblinFree(v) {
            if (v != this._goblinFree) {
                this.long = "The drider incubus is a marvel of demonic perversions applied to inhuman flesh. His glittering dark skin is like a solid sheet of coal. Twisted obsidian horns spiral from his forehead like a pair of misshapen spears. Even his eyes are an eerie marvel, no longer windows to the soul, only pits of endless hunger. His evil visage pales in comparison to the monstrous form below his waist - that of a gigantic spider. Eight clattering legs skitter across the floor with his every move. A bulbous abdomen hangs behind them, covered with twitching spinnerets so full of silk that half-formed blobs of it dangle behind him.";
                if (!v) {
                    this.long += "Hanging from an impeccably made harness is a goblin, the only splash of color on the soulless abomination before you. She’s positioned against the larger male’s abdomen so that her bare crotch is impaled upon his turgid, writhing demon-dick, and by the looks of her frantic squirming, is doing her best to escape. Perhaps you could free her?";
                }
                else {
                    this.long += "The goblin you freed heedlessly chases her demonic master around the room, doing everything she can to bring his rod off. She seems barely conscious of the ongoing conflict; it’s a wonder the drider hasn’t stepped on her yet.";
                }
            }
        }
        performCombatAction() {
            // Because fuck having arguments with status affects :^)
            this._combatRound++;
            if (this.lust < 65 && this.HP < 33) {
                this.gainHpAndLust();
            }
            else if (this.lust >= 65 && this.HP >= 33) {
                this.dropHpAndLust();
            }
            if (DriderIncubus.rand(100) > this.lust + 10) {
                this.spearStrike();
                this.outputText("\n\n");
                this.performPhysicalAttack();
            }
            else {
                this.performLustAttack();
            }
            if (this._goblinFree) {
                this.outputText("\n\n");
                this.goblinAI();
            }
            this.combatRoundOver();
        }
        performPhysicalAttack() {
            if (this._combatRound >= 3 && (this._combatRound % 6 == 0 || this._combatRound == 3))
                this.stunningSpear();
            else {
                var opts = [this.bite, this.spiderMorphWebAttack, this.kick, this.kick, this.doubleStrike, this.doubleStrike];
                opts[DriderIncubus.rand(opts.length)]();
            }
        }
        performLustAttack() {
            if (this._combatRound >= 3 && (this._combatRound % 6 == 0 || this._combatRound == 3))
                this.constrictingThoughts();
            else {
                var opts = [this.arouseSpell, this.arouseSpell];
                if (this.player.findStatusAffect(StatusAffects_1.StatusAffects.TaintedMind) < 0 && !this._seenResolute)
                    opts.push(this.taintedMind);
                if (!this._seenResolute)
                    opts.push(this.purpleHaze);
                opts[DriderIncubus.rand(opts.length)]();
            }
        }
        goblinAI() {
            var opts = [this.goblinHandjob, this.goblinTongueGrapple, this.bootyTwerking, this.webNipplechain];
            if (!this._goblinOiled)
                opts.push(this.babyOilMeUp);
            opts[DriderIncubus.rand(opts.length)]();
        }
        gainHpAndLust() {
            //Heals 10% of HP but raises lust by 8.
            this.addHP(this.eMaxHP() * 0.1);
            this.lust += 8;
            if (this._hpGains == 0)
                this.outputText("<i>“You won’t defeat me so easily!”</i>");
            else if (this._hpGains == 1)
                this.outputText("<i>“I can keep this up longer than you, mortal!”</i>");
            else if (this._hpGains == 2)
                this.outputText("<i>“So stubborn! Lethice take you!”</i>");
            else
                this.outputText("<i>“Why won’t you give in?!”</i>");
            this._hpGains++;
            this.outputText(" The demon gestures wildly, drawing a rune across his own chest. It flares, blood red and pulsing. Your foe’s wounds slowly edge close, fueled by magic. When the luminous symbol fades, the drider pants, his black skin flushing purple in places.");
            if (this.lust > 65) {
                if (this._goblinFree)
                    this.outputText(" His dick is rigid and bouncing, so hard it looks like it could go off at any moment.");
                else
                    this.outputText(" His balls are tensing underneath the goblin, and he keeps moaning under his breath.");
                this.outputText(" You doubt he can keep drawing on his lust to heal himself without pushing himself over the edge!");
            }
            this.outputText("\n\n");
        }
        dropHpAndLust() {
            //-8% of max HP, -10 lust.
            this.HP -= (this.eMaxHP() * 0.08);
            this.lust -= 10;
            this.outputText("The demon snarls and draws his spear back, placing it blade down against his arm. Grinning malevolently, he slides the razor-sharp edge along his skin, leaving a trail of glittering ruby on his wounded flesh. <i>“Pain brings clarity of mind - something you couldn’t understand.”</i> He grins wider, mastering his baser emotions. <i>“Let me teach you.”</i>\n\n");
        }
        spearStrike() {
            //Always does this once plus another physical attack when physically attacking
            //Drider’s spear ignores armor and toughness completely.
            this.outputText("The drider rears back, lancing out with his spear.");
            var damage = (this.str + this.weaponAttack) * 0.40;
            if (damage <= 0 || (this.combatMiss() || this.combatFlexibility())) {
                this.outputText(" You barely slide out of the way.");
            }
            else if (this.combatEvade()) {
                this.outputText(" You evade the strike.");
            }
            else if (this.combatMisdirect()) {
                this.outputText(" Using your skills at misdirection, you avoid the strike.");
            }
            else {
                this.player.takeDamage(damage);
                this.outputText(" The weapon bites deep. (" + damage + ")");
            }
        }
        bite() {
            var amount;
            //Inflicts venom that reduces strength.
            if (this.player.findStatusAffect(StatusAffects_1.StatusAffects.Stunned) >= 0 || (this.player.spe <= 1 && this.player.findStatusAffect(StatusAffects_1.StatusAffects.Web) >= 2)) {
                if (this.player.findStatusAffect(StatusAffects_1.StatusAffects.DriderIncubusVenom) >= 0) {
                    this.player.changeStatusValue(StatusAffects_1.StatusAffects.DriderIncubusVenom, 1, 5);
                }
                else {
                    this.player.createStatusAffect(StatusAffects_1.StatusAffects.DriderIncubusVenom, 5, 0, 0, 0);
                }
                amount = 30;
                if (this.player.str - amount < 1) {
                    amount = this.player.str - 1;
                }
                this.player.str -= amount;
                DriderIncubus.showStatDown('str');
                this.player.addStatusValue(StatusAffects_1.StatusAffects.DriderIncubusVenom, 2, amount);
                //Alternate if PC cannot move
                this.outputText("Taking his time, the arachnid demon bares his fangs, easily biting deeply into you. His tongue slides sensually around the wounds as he pumps you full of venom, tasting your fear and desperation. You wince while the venom robs you of your strength.");
                if (this.player.str <= 25)
                    this.outputText(" It’s getting harder just to remain upright.");
                else if (this.player.str <= 1)
                    this.outputText(" You don’t think you can stand any longer, let alone resist.");
                this.outputText("\n\nWhen he pulls out, he’s smiling and a little flushed. <i>“");
                if (this.player.str > 25)
                    this.outputText("That should do.");
                else
                    this.outputText("Soon you won’t have the strength to resist.");
                this.outputText("”</i>");
            }
            else {
                this.outputText("Twisting over, the arachnid demon bares his fangs, attempting to bite you!");
                //Dodge
                if (this.combatMisdirect())
                    this.outputText(" You misdirect his venomous strike!");
                else if (this.combatEvade())
                    this.outputText(" You evade his venomous strike!");
                else if (this.combatMiss() || this.combatFlexibility())
                    this.outputText(" You avoid his venomous strike!");
                else {
                    //Hits
                    this.outputText(" Those needle-like canines punch into you, delivering their venomous payload! You already feel weaker, your muscles not responding as effectively.");
                    this.outputText("<i>“I do love watching you struggle.”</i> He flashes a crooked smile.");
                    if (this.player.findStatusAffect(StatusAffects_1.StatusAffects.DriderIncubusVenom) >= 0) {
                        this.player.changeStatusValue(StatusAffects_1.StatusAffects.DriderIncubusVenom, 1, 5);
                    }
                    else {
                        this.player.createStatusAffect(StatusAffects_1.StatusAffects.DriderIncubusVenom, 5, 0, 0, 0);
                    }
                    amount = 30;
                    if (this.player.str - amount < 1) {
                        amount = this.player.str - 1;
                    }
                    this.player.str -= amount;
                    DriderIncubus.showStatDown('str');
                    this.player.addStatusValue(StatusAffects_1.StatusAffects.DriderIncubusVenom, 2, amount);
                }
            }
        }
        kick() {
            this.outputText("While you’re busy with his spear, he nonchalantly snaps a kick in your direction!");
            if (this.combatMisdirect()) {
                this.outputText(" You twist out of the way at the last moment thanks to your misdirection.");
            }
            else if (this.combatMiss() || this.combatEvade() || this.combatFlexibility()) {
                this.outputText(" You twist out of the way at the last moment, evading with ease.");
            }
            else {
                var damage = (this.str + this.weaponAttack + 25) - DriderIncubus.rand(this.player.tou);
                if (damage > 0) {
                    damage = this.player.takeDamage(damage);
                    //Hit
                    this.outputText(" You go flying back into a pair of oiled-up slavegirls. They gasp in surprise as you tear your way back to the fight. Too late, they attempt to caress you, barely touching your [leg] before you’re back in the fight. (" + damage + ")");
                }
                else {
                    this.outputText(" You successfully manage to block the kick!");
                }
            }
        }
        stunningSpear() {
            //Used every six rounds, starting on the third (if he’s still in physical mode, of course)
            this.outputText("Twirling his weapon until it appears a blurred disc, the drider pivots, bringing the haft around at your head!");
            //Dodge
            if (this.combatMiss() || this.combatFlexibility()) {
                this.outputText(" You duck in the nick of time.");
            }
            else if (this.combatMisdirect()) {
                this.outputText(" You were already changing direction. You silently thank Raphael for his training.");
            }
            else if (this.combatEvade()) {
                this.outputText(" You lean in the direction of the swing, letting gravity pull you down and away from the stunning blow.");
            }
            else {
                var damage = (this.str + this.weaponAttack - 25) - DriderIncubus.rand(this.player.tou);
                if (damage > 0) {
                    damage = this.player.takeDamage(damage);
                    //Hit
                    this.outputText(" You don’t feel the impact, but you do hear the crack of wood striking");
                    // 9999
                    this.outputText(" bone");
                    // your outer membrane }
                    this.outputText(".");
                    if (this.player.findPerk(PerkLib_1.PerkLib.Resolute) < 0) {
                        this.outputText(" <b>You’re left stunned by the blow!</b> It’ll be a moment before you can regain your wits.");
                        this.player.createStatusAffect(StatusAffects_1.StatusAffects.Stunned, 0, 0, 0, 0);
                    }
                    this.outputText(" (" + damage + ")");
                }
                this.outputText(" You hear the crack of wood striking");
                // 9999
                this.outputText(" bone");
                this.outputText(", but you manage to deflect most of the force!");
            }
        }
        doubleStrike() {
            //Uses another strike like his normal one with a different intro
            this.outputText("He skitters forward and presses his attack, stabbing out with his spear once more.");
            //Use hit/dodge messages from above.
            var damage = this.str + this.weaponAttack + 10 - DriderIncubus.rand(this.player.tou);
            if (damage <= 0 || (this.combatMiss() || this.combatFlexibility())) {
                this.outputText(" You barely slide out of the way.");
            }
            else if (this.combatEvade()) {
                this.outputText(" You evade the strike.");
            }
            else if (this.combatMisdirect()) {
                this.outputText(" Using your skills at misdirection, you avoid the strike.");
            }
            else {
                this.player.takeDamage(damage);
                this.outputText(" The weapon bites deep. (" + damage + ")");
            }
        }
        arouseSpell() {
            //Like the imp one!
            this.outputText("The demonic drider mutters incomprehensible words that tickle at the back of your mind. Profane syllable mounts profane syllable until his mouth seems buried under the weight of the cacophony of corruption. His filth builds to a crescendo, and with a confident, arrogant gaze, he directs it at you.");
            this.outputText("\n\nAn invisible force falls upon you, infusing the most sensitive places of your body with desire, bringing your [nipples] to life with need");
            if (this.player.cocks.length > 0 || this.player.vaginas.length > 0) {
                this.outputText(", making your");
                if (this.player.cocks.length > 0)
                    this.outputText(" [cocks]");
                else
                    this.outputText(" [vagina]");
                this.outputText(" ache to be touched");
            }
            this.game.dynStats("lus", (this.player.lib / 10 + this.player.cor / 10) + 15);
            this.outputText(". Your body rebels against you under the unholy influence");
            if (this.player.lust < 100)
                this.outputText(", but the effect is fleeting, thankfully. You try to ignore the residual tingles. You can’t afford to lose this close to your goal!");
            else
                this.outputText(".");
        }
        taintedMind() {
            //Prevents use of attack, bow, other physical type stuff
            //Lasts 4 rounds? Iunno. Tune to adjust difficulty.
            this.outputText("<i>“You fight well, for a mortal... but can you fight like a demon?”</i> He claps his hands together, bathing the immediate area in a wave of energy. Some of the nearby slaves cry out in alarm, then settle into giggling, cooing messes. You don’t seem any worse for the wear in its wake, though something feels wrong about holding your [weapon].");
            // 9999
            if (this.player.cor <= 33)
                this.outputText(" What did he mean about fighting like a demon?");
            this.player.createStatusAffect(StatusAffects_1.StatusAffects.TaintedMind, 4, 0, 0, 0);
        }
        taintedMindAttackAttempt() {
            this.outputText("You ready an attack, but find your hands groping your own body instead. Somehow the demon’s magic has made it impossible to strike at him, crossing wires that weren’t meant to be crossed. Frowning, you look down at your more aroused form, determined not to fall for this a second time.");
            this.game.dynStats("lus", 15);
        }
        //On same round timer as physical stun
        constrictingThoughts() {
            this.outputText("<i>“Try this on for size!”</i> the corrupted arachnid shouts, waving his hand in your direction.");
            this.outputText("\n\nDisjointed, erotic thoughts claw at your mind’s defenses, worming their way in through what cracks they find, plunging sensuous fantasies of every shape and size in place of your own imaginings.");
            //Resist, no new line
            if (this.player.findPerk(PerkLib_1.PerkLib.Resolute) >= 0) {
                this._seenResolute = true;
                this.outputText(" You marshal your mental discipline and discard the errant thoughts.");
            }
            //Elsewise
            else {
                this.outputText(" The intensity overwhelms your ability to act, arousing and stunning you.");
                this.game.dynStats("lus", (this.player.lib / 15 + this.player.cor / 15) + 15);
                this.player.createStatusAffect(StatusAffects_1.StatusAffects.Stunned, 0, 0, 0, 0);
            }
        }
        purpleHaze() {
            //Blinds 2-3 turns
            this.outputText("<i>“Try this on for size!”</i> The drider gestures in your direction, gathering his will into a palpable force. It presses on your mind like a coiled snake, crushing down on you from all sides.");
            //Avoid
            // 9999, scale avoidance off lust/lib/corr?
            if (this.player.findPerk(PerkLib_1.PerkLib.Resolute) >= 0 || DriderIncubus.rand(3) >= 0) {
                if (this.player.findPerk(PerkLib_1.PerkLib.Resolute) >= 0)
                    this._seenResolute = true;
                this.outputText(" You flex your considerable will and feel the concentrated mental filth slough off. Whatever his attack was, it failed!");
            }
            else {
                //Fail
                this.outputText(" You concentrate to try and throw it off, but he overwhelms your mental defenses. Clouds of swirling pink filled with unsubtle erotic silhouettes fill your vision, effectively blinding you!");
                this.game.dynStats("lus", 25);
                this.player.createStatusAffect(StatusAffects_1.StatusAffects.PurpleHaze, 2 + DriderIncubus.rand(2), 0, 0, 0);
                this.player.createStatusAffect(StatusAffects_1.StatusAffects.Blind, this.player.statusAffectv1(StatusAffects_1.StatusAffects.PurpleHaze), 0, 0, 0);
            }
        }
        goblinHandjob() {
            this.outputText("Somehow, the goblin manages to get both her mitts on the drider’s ever erect member. A gleeful expression occupies her face as she begins pumping, worshipfully tugging on her master’s rod again and again, her mouth open excitedly as if he could bust a nut at any moment.");
            this.outputText("\n\nUnfortunately for her, the demonic arachnid’s motions carry him away from her greedy fingers. He slips out of her grip with a wet pop, and she can do naught but pout and chase after him once more.");
        }
        goblinTongueGrapple() {
            this.outputText("The determined goblin love-slave opens wide, launching a tongue that must be at least three feet long toward her master’s member with pinpoint accuracy. It makes contact with a wet ‘snap’ and wraps round the oozing, demonic length before either you or the drider can react. His motions slow from the attention, and he nearly stumbles, giving the goblin time to close to the distance, mummifying his member under layers of hot pink pleasure.");
            this.lust += 5;
            //Didn’t max lust
            if (this.lust <= 100) {
                this.outputText("\n\nThe drider skitters back, the motion dropping the goblin to her knees. Her tongue stretches taut a long moment, then slips from his shaft, snapping back into her mouth hard enough to make her recoil. Both parties look disappointed with the outcome, none moreso than the goblin. Fortunately for her, she’ll get another chance - the drider is focusing on you once more.");
            }
            //Maxxed lust
            else {
                this.outputText("\n\nThe drider attempts to skitter back, but his legs are shaking to hard for proper movement. He looks longingly at his love slave, forgetting you for the moment.");
            }
        }
        bootyTwerking() {
            this.outputText("The goblin gives up on her futile chase for the moment. Instead of trying to lay her hands on her treasured scepter, she spins around, raising her cushy-looking ass into the air. She twists and gyrates, making her voluminous asscheeks bounce independantly. Sometimes they audibly clap together. A few assembled demonic slaves applaud her performance, and the drider can’t help but spare her a few hungry glances.");
            this.lust += 5;
        }
        webNipplechain() {
            this.outputText("Every time she makes a grab for the demonic drider’s tool, he skitters aside, the ebb and flow of your fight keeping her from her objective. In a huff, she grabs hold of a hanging strand of web and affixes the sticky end to one of her nipples. Then, she gives the source spinnaret a squeeze, but not before pressing her other jiggling tit against it.");
            if (this._goblinWebChain == false) {
                this.outputText("\n\nShe comes away with an organic nipple chain, one that has her moaning with need as she shakes her diminutive body for her master’s pleasure. He tries his best to ignore her, even a demon can’t ignore a pair of white-plastered tits shaking a few feet away.");
                this._goblinWebChain = true;
            }
            //Already nip-chained
            else {
                this.outputText("\n\nThe goblin slave-girl shimmies and shakes once more, her arms pressing in on her tits from both sides to make the jiggling, web-painted mounds dance. Her eyes smoulder with desire, and her wanton smile promises nothing but hours of unending lewdness to her master. He does a double-take at the sight of it.");
            }
            this.lust += 5;
        }
        get goblinOiled() { return this._goblinOiled; }
        babyOilMeUp() {
            //1x only.
            this.outputText("Darting into the crowd, the goblin comes back with a bottle of unusual shape and design. She pops the cork and upends it across her petite but all-too-stacked form, smearing it across her more-than-ample tits with one hand, making them shine in the flickering candlelight. Her eyes are bright and mischievous while she spreads it over the rest of her form, leaving the whole of her body slick and ready for love.");
            this.outputText("\n\nShe dances and spins to the side, cooing, <i>“Don’t you want me anymore, baby? Look how ready I am”</i> Her nipples are taut and stiff, and the junction between her thighs absolutely drenched. Neither you nor your foe can keep from sparing lusty glances her way.");
            this.lust += 7;
            this.game.dynStats("lus", 7);
        }
        freeGoblin() {
            this.clearOutput();
            this._goblinFree = true;
            this.outputText("You lunge in low, hooking your hands beneath the writhing greenskin’s armpits and pulling. Webs snap like gauze between her weight and the mighty tug you strain them with. Her eyes bulge open in horror. She screams as you pull her free, revealing an inhumanly soaked rod and one seriously puffy set of labia. The poor thing won’t be able to walk without squishing them against each other.");
            this.outputText("\n\nYou’re forced to drop her as the enraged drider prepares his counterattack. She lands on her feet, surprisingly enough.");
            this.outputText("\n\n<i>“Oh, forgive me master! I’ll still get you off - I promise!”</i> The green slut wiggles away from you, trying to get at her master’s loins.");
            this.outputText("\n\nWell... maybe she didn’t want free after all. At least she’ll make for a good distraction.");
            kGAMECLASS_1.kGAMECLASS.enemyAI();
        }
    }
    exports.DriderIncubus = DriderIncubus;
});
//# sourceMappingURL=DriderIncubus.js.map