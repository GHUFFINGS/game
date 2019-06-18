define(["require", "exports", "../../../BaseContent", "../../../PregnancyStore", "../../../GlobalFlags/kFLAGS", "../../../CoC", "../../../../console", "./TamanisDaughters", "../../../Appearance", "../../../CockTypesEnum", "../../../../../includes/appearanceDefs", "../../../StatusAffects", "../../../PerkLib", "../../../GlobalFlags/kGAMECLASS"], function (require, exports, BaseContent_1, PregnancyStore_1, kFLAGS_1, CoC_1, console_1, TamanisDaughters_1, Appearance_1, CockTypesEnum_1, appearanceDefs_1, StatusAffects_1, PerkLib_1, kGAMECLASS_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TamainsDaughtersScene extends BaseContent_1.BaseContent {
        constructor() {
            super();
            this.pregnancy = new PregnancyStore_1.PregnancyStore(kFLAGS_1.kFLAGS.TAMANI_DAUGHTERS_PREGNANCY_TYPE, kFLAGS_1.kFLAGS.TAMANI_DAUGHTER_PREGGO_COUNTDOWN, 0, 0);
            CoC_1.CoC.timeAwareClassAdd(this);
        }
        //Implementation of TimeAwareInterface
        timeChange() {
            this.pregnancy.pregnancyAdvance(); //Preg should be 7*24, ends at 0 to -48 --> 9*24, ends at 0
            console_1.trace("\nTamani's Daughters time change: Time is " + this.model.time.hours + ", incubation: " + this.pregnancy.incubation + ", event: " + this.pregnancy.event);
            if (this.pregnancy.isPregnant && this.pregnancy.incubation == 0) {
                this.flags[kFLAGS_1.kFLAGS.TAMANI_NUMBER_OF_DAUGHTERS] += this.flags[kFLAGS_1.kFLAGS.TAMANI_DAUGHTERS_PREGNANCY_COUNT];
                this.flags[kFLAGS_1.kFLAGS.TAMANI_DAUGHTERS_PREGNANCY_COUNT] = 0;
                this.pregnancy.knockUpForce(); //Clear Pregnancy
            }
            //Put a cap on daughters if they havent been met yet.
            if (this.flags[kFLAGS_1.kFLAGS.TIMES_ENCOUNTED_TAMANIS_DAUGHTERS] == 0 && this.flags[kFLAGS_1.kFLAGS.TAMANI_NUMBER_OF_DAUGHTERS] > 30) {
                this.flags[kFLAGS_1.kFLAGS.TAMANI_NUMBER_OF_DAUGHTERS] = 30;
            }
            //Lower daughter population by 1 every fourth day once population gets high
            if (this.flags[kFLAGS_1.kFLAGS.TAMANI_NUMBER_OF_DAUGHTERS] > 40 && this.model.time.hours > 23 && this.model.time.days % 4 == 0) {
                this.flags[kFLAGS_1.kFLAGS.TAMANI_NUMBER_OF_DAUGHTERS]--;
            }
            return false;
        }
        timeChangeLarge() {
            return false;
        }
        //Prime daughter tit-size
        //12-20 – C
        //21- 40 DD
        //41 –60 E
        //30+ - F mother fucker!
        tdCup() {
            if (this.flags[kFLAGS_1.kFLAGS.TAMANI_NUMBER_OF_DAUGHTERS] < 20)
                return "C";
            else if (this.flags[kFLAGS_1.kFLAGS.TAMANI_NUMBER_OF_DAUGHTERS] < 30)
                return "D";
            else if (this.flags[kFLAGS_1.kFLAGS.TAMANI_NUMBER_OF_DAUGHTERS] < 40)
                return "DD";
            else if (this.flags[kFLAGS_1.kFLAGS.TAMANI_NUMBER_OF_DAUGHTERS] < 50)
                return "E";
            else if (this.flags[kFLAGS_1.kFLAGS.TAMANI_NUMBER_OF_DAUGHTERS] < 60)
                return "EE";
            return "F";
        }
        //ENCOUNTER:
        encounterTamanisDaughters() {
            this.spriteSelect(57);
            this.flags[kFLAGS_1.kFLAGS.TIMES_ENCOUNTED_TAMANIS_DAUGHTERS]++;
            this.outputText("", true);
            if (this.flags[kFLAGS_1.kFLAGS.TIMES_ENCOUNTED_TAMANIS_DAUGHTERS] > 0 && TamainsDaughtersScene.rand(10) == 0) {
                TamainsDaughtersScene.tamaniPresent = true;
                this.outputText("While roaming along, you find your path ahead blocked by " + TamainsDaughtersScene.num2Text(Math.floor(this.flags[kFLAGS_1.kFLAGS.TAMANI_NUMBER_OF_DAUGHTERS] / 4)) + " goblins.  At the forefront of the mob is Tamani", false);
                if (this.flags[kFLAGS_1.kFLAGS.TAMANI_TIMES_HYPNOTISED] >= 10)
                    this.outputText(", your wife", false);
                this.outputText(".  You realize now that the other goblins must be your daughters.  Another crowd of small women emerges from the bushes, closing in a ring around you, preventing any chance of escape.  The largest of the younger goblin-women steps forwards, her " + this.tdCup() + " breasts jiggling, barely contained by the bondage ropes she has tied around herself.  She stops once she's next to her mother and Tamani explains, \"<i>I just can't keep their aching cunts at home anymore!  They're fertile adults now and they're wanting to get some experience with real dicks.  I figured you wouldn't mind helping them out a little.</i>\"\n\nWhat do you do? (Fight them off, Fuck them willingly, Let them fuck you)", false);
                //[Fuck Them] [Let Them] [Fight]
                this.simpleChoices("Fight", this.fightTamanisDaughters, "Fuck Them", this.fuckYoDaughtersHomie, "Let Them", this.legTamanisDaughtersRAEPYou, "", undefined, "", undefined);
                return;
            }
            TamainsDaughtersScene.tamaniPresent = false;
            this.outputText("While roaming along, you find your path ahead blocked by ", false);
            this.outputText(TamainsDaughtersScene.num2Text(Math.floor(this.flags[kFLAGS_1.kFLAGS.TAMANI_NUMBER_OF_DAUGHTERS] / 4)) + " goblins.  You ", false);
            if (this.player.weaponName == "fists")
                this.outputText("ready your fists ", false);
            else
                this.outputText("draw your weapon ", false);
            this.outputText("and glance around evaluating your options.   Another crowd of small women emerges from the bushes, closing in a ring around you, preventing any chance of escape.  The largest of the goblin-women steps forwards, her " + this.tdCup() + "-breasts jiggling, barely contained by the bondage ropes she has tied around herself.\n\n", false);
            //first time
            if (this.flags[kFLAGS_1.kFLAGS.TIMES_FUCKED_TAMANIS_DAUGHTERS] == 0) {
                this.outputText("She calls out, \"<i>We're tired of getting leftovers, so we're coming to the source.  Are you going to give us what we want?</i>\"\n\n", false);
                //[Fuck them] [Fight] [Play Dumb]
                this.simpleChoices("Fight", this.fightTamanisDaughters, "Fuck Them", this.fuckYoDaughtersHomie, "Play Dumb", this.playDumbToTamanisDaughters, "Let Them", this.legTamanisDaughtersRAEPYou, "", undefined);
            }
            else {
                this.outputText("She calls out, \"<i>We came back for more cream!  Come on, let's fuck again!</i>\"\n\nIt doesn't look like 'no' is a word they understand.  What do you do?</i>", false);
                this.simpleChoices("Fight", this.fightTamanisDaughters, "Fuck Them", this.fuckYoDaughtersHomie, "Let Them", this.legTamanisDaughtersRAEPYou, "", undefined, "", undefined);
            }
        }
        //[Play Dumb]
        playDumbToTamanisDaughters() {
            this.spriteSelect(57);
            this.outputText("", true);
            this.outputText("You shrug and ask, \"<i>What exactly is it you want again?  I'm not sure you have the right " + this.player.mf("guy", "person") + ".</i>\"\n\n", false);
            //approx 33% chance at 0 int, going up the smarter you are.
            if (this.player.inte / 2 + 25 > TamainsDaughtersScene.rand(75)) {
                this.outputText("The leader looks you up and down for a moment.  Her face slowly contorts to puzzlement, then rage, \"<i>Tammi you ditz!  I thought you said this was his trail?  Come on girls, we've got a dad to hunt.</i>\"\n\n", false);
                if (this.flags[kFLAGS_1.kFLAGS.TIMES_ENCOUNTED_TAMANIS_DAUGHTERS] > 1)
                    this.outputText("They really must not be paying much attention to what you look like.", false);
                this.doNext(this.camp.returnToCampUseOneHour);
                return;
            }
            this.outputText("The leader stamps her foot in a fit of rage.  It would be more imposing if she wasn't three feet tall... Her eyes lock onto your crotch and she says, \"<i>Last chance.   We're getting our ", false);
            if (this.flags[kFLAGS_1.kFLAGS.TIMES_ENCOUNTED_TAMANIS_DAUGHTERS] == 1)
                this.outputText("first ", false);
            this.outputText("litters one way or another!</i>\"\n\n", false);
            //[Fuck them] [Fight] [Let them have their way with you]
            this.simpleChoices("Fuck Them", this.fuckYoDaughtersHomie, "Fight", this.fightTamanisDaughters, "", undefined, "Let Them", this.legTamanisDaughtersRAEPYou, "", undefined);
        }
        //[Fight Them]
        fightTamanisDaughters() {
            this.outputText("", true);
            this.outputText("You whirl around threateningly, intent on putting Tamani's wayward brood back in their place.\n\n", false);
            this.startCombat(new TamanisDaughters_1.TamanisDaughters());
            this.spriteSelect(57);
            if (TamainsDaughtersScene.tamaniPresent) {
                //(+5 mob strength)
                this.monster.str += 5;
                //(+5 mob toughness)
                this.monster.tou += 5;
                this.monster.HP += 10;
                //(-20 mob lust)
                this.monster.lust -= 20;
                //append combat desc
                this.monster.long += " <b>Tamani lurks in the back of the crowd, curvier than her brood and watching with a mixture of amusement and irritation.  She runs a hand through her pink and black hair, waiting for an opportunity to get involved...</b>";
            }
            return;
        }
        //(COMBAT TEXT:  You're fighting Tamani's brood.  All total, there are (x) of them spread in a loose circle around you.  Most of them have their hair dyed wild colors, and dress in little more than fetish clothing – for easy access you assume.  Some are dolled up with make-up, others have oiled their luscious forms, and a few are stopping to kiss and lick each other, putting on a show for their latest victim.  (Tamani is here as well, fighting her way to the forefront and absently massaging one of her \" + tamaniChest + \" as eyehumps your body.\")
        //(Combat is 1 attack per 10 girls + 1x Tamani attack)
        //[Fuck them]
        fuckYoDaughtersHomie() {
            this.spriteSelect(57);
            this.flags[kFLAGS_1.kFLAGS.TIMES_FUCKED_TAMANIS_DAUGHTERS]++;
            var cocks = this.player.totalCocks();
            var daughters = Math.floor(this.flags[kFLAGS_1.kFLAGS.TAMANI_NUMBER_OF_DAUGHTERS] / 2);
            this.outputText("", true);
            this.outputText("You shrug out of your " + this.player.armorName + " and grab hold of ", false);
            if (cocks == 1)
                this.outputText("your ", false);
            else
                this.outputText("one of your ", false);
            this.outputText(this.multiCockDescriptLight() + ", swinging it around as it hardens, teasing the crowd of lusty bitches.\n\n", false);
            this.outputText("\"<i>Come and get it,</i>\" you shout, strutting forwards.  The ", false);
            if (daughters < 12)
                this.outputText("girls", false);
            else
                this.outputText("crowd", false);
            this.outputText(" surges forwards, mobbing you from all sides.  ", false);
            //Find a dick that fits
            var primary = this.player.cockThatFits(50);
            //(Fits)
            if (primary >= 0) {
                this.outputText("You pick a random body from the crowd, impaling her on your " + this.cockDescript(primary) + ".  The others crowd around, jealous of your chosen cock-sleeve.   She looks up at you, blissful as she hugs against you and grinds her tight body down, raping her virginal hole on the firmness of your " + this.cockDescript(primary) + ".   The others massage your " + this.player.legs() + ", licking and nibbling your skin as they compete to tempt you into taking them next.", false);
                if (TamainsDaughtersScene.tamaniPresent) {
                    this.outputText("  Tamani pushes aside the smaller sluts and ", false);
                    if (this.player.balls > 0)
                        this.outputText("cups your " + this.ballsDescriptLight() + ".", false);
                    else
                        this.outputText("licks your taint.", false);
                }
                this.outputText("\n\n", false);
                this.outputText("In no time, the vise-like grip of her cunt and thrill of taking her virginal passage push you beyond your threshold.  You groan and pump thick loads of jism deep into the tiny twat", false);
                if (this.player.cumQ() >= 500)
                    this.outputText(", bloating her belly until she gurgles and squishes on top of you", false);
                this.outputText(".  She falls off with her eyes crossed as her sisters scramble to take her place.", false);
                if (TamainsDaughtersScene.tamaniPresent) {
                    this.outputText("  Tamani shoves the rest of them away and mounts you, ", false);
                    if (this.player.tallness >= 60)
                        this.outputText("scrabbling up enough to ", false);
                    this.outputText("kiss you roughly on the lips, tasting of cherries and sweat.  Your body goes limp, dropping down onto your back as your green mistress has her way with you.\n\n", false);
                }
                else {
                    this.outputText("  Another mounts you, launching herself at you with such force that she knocks you off your " + this.player.feet() + " and onto your back.  A hand clamps over your mouth and jams something inside while another massages your throat, forcing you to swallow it.  Numbness flows through most of your body, robbing you of strength and feeling in all but one place...\n\n", false);
                }
                this.outputText("You're swarmed as you lie in the mud, covered head to toe in nubile young goblin flesh.  Some part of you KNOWS you're being raped, but you're so effectively drugged there really isn't anything to do but try to enjoy it.   The tight goblin-cunt wrapped around your dickflesh refuses to let it go soft, massaging it with clenching ripples of muscle.  ", false);
                if (TamainsDaughtersScene.tamaniPresent) {
                    this.outputText("Tamani's massive jugs rest against your " + this.breastDescript(0) + ", bouncing and wobbling.  She crosses her arms over them and sucks on a finger, watching your expression with a mix of amusement and arousal.  She asks, \"<i>So what do you think of your daughters, sweet stuff?  They're just aching for a taste of their daddy's spunk, and it's hard to keep so many rambunctious sluts under control.</i>\"\n\n", false);
                }
                else
                    this.outputText("Tamani's daughter looks up at you, giggling happily while her hips vigorously abuse you.   She asks, \"<i>Do you think my cunt is tighter than mom's is?  Bet you never thought you'd be fucking one of your daughters pregnant, did you?</i>\"\n\n", false);
                this.outputText("Such perverse thoughts, and coming from your own daughters.  ", false);
                if (this.player.cor < 33)
                    this.outputText("You were supposed to save the village from corruption, not breed tiny sluts to overrun it... y", false);
                else if (this.player.cor < 66)
                    this.outputText("You came here to make things better for everyone... well, at least you're helping these girls. Y", false);
                else
                    this.outputText("You came here to make things better, but you know you'll keep knocking up Tamani every chance you get.  It's too much fun to resist adding to the sea of green girls. Y", false);
                this.outputText("ou moan as a drooling green cunt is pressed into your " + this.player.face() + ", smothering away any protests you might have offered.  Your tongue laps away, servicing another one of your many goblin offspring as best it can.  It plunges deep to harvest her nectar, making her soak you with juice, performing oral as if it were possessed.  Your eyes cross and you feel your release building, cresting in a wave as it prepares to dump into your ");
                if (!TamainsDaughtersScene.tamaniPresent)
                    this.outputText("daughter");
                else
                    this.outputText("favorite goblin MILF");
                this.outputText(".\n\n", false);
                this.outputText("The pressure of orgasm spikes as the first blast takes ", false);
                if (!TamainsDaughtersScene.tamaniPresent)
                    this.outputText("your goblin daughter", false);
                else
                    this.outputText("Tamani", false);
                this.outputText(" in her waiting womb, painting her walls white.  Each successive glob mixes into the slurry of sexual fluids brewing in her slit, until it starts to dribble out.  The goblin on your face cums noisily, filling your mouth with female moisture.   With no other choice, you swallow it down while your tongue keeps trying to pleasure her.  A sudden void of sensation and cold air overtakes your " + this.cockDescript(primary) + " as you hear the goblins squabbling.  In no time flat a fresh cunt is squeezing over your still-orgasming member, clamping down to form a tight seal as you pump it full of even more fertile seed.\n\n", false);
                //(Go to End if < 10 daughters), else keep goin
                if (daughters > 10) {
                    this.outputText("As your orgasm trails off, your green cock-sleeve is removed.  You sigh happily, glad the ordeal is over.  Your " + this.cockDescript(0) + " manages to continue to throb, and you wonder just how long you'll have to wait for the goblin drugs to wear off.  The answer comes sooner than you think, in the form of a large vial of sweet-tasting liquid.  Your nose is pinched shut by a teal hand and your throat is massaged until you swallow the entire thing.  The result is immediate.  Slight shakes work their way through your body as it reacts to the corrupted drugs.  ", false);
                    if (this.player.balls > 0)
                        this.outputText("Your balls visibly puff up and slosh as one of your daughters plays with them, filling with more seed than ever before.", false);
                    else
                        this.outputText("Your gut clenches painfully as something inside puffs up.  Pressure builds at the base of your cock and you realize somehow you're more full of cum than ever before.", false);
                    this.outputText("\n\n", false);
                    if (TamainsDaughtersScene.tamaniPresent) {
                        this.outputText("Tamani pushes the slut on your face off and plants herself there, smearing your " + this.player.face() + " with a mixture of cum and vaginal wetness.  ", false);
                        if (kGAMECLASS_1.kGAMECLASS.forest.tamaniScene.pregnancy.isPregnant) {
                            this.outputText("She rubs her pregnancy swollen belly", false);
                        }
                        else
                            this.outputText("She fondles her nipples", false);
                        this.outputText(" and moans as she grinds against you, \"<i>Ahh, you're going to have so many more daughters!  You realize if you keep cumming into them like this, I'll never be able to restrain them all.  So if you don't want to be gang-raped by your daughters like this you should probably stop orgasming, ok?  Just don't cream any more dripping virginal cunts.</i>\"\n\n", false);
                    }
                    //Else:  
                    else {
                        this.outputText("The first daughter to take your seed climbs onto your face and plants herself there, smearing your " + this.player.face() + " with a mixture of cum and vaginal wetness.  She pinches her budding chest and grinds on top of you, asking, \"<i>You realize I'm going to be pregnant don't you?  I can already feel your little swimmers tickling all my eggs.  Can you imagine what I'll look like in a few days?  With bigger tits leaking milk and my belly stuffed with offspring?  Just let your dick do the thinking and keep cumming until we're all stuffed, ok?  Don't hold back now, we're just aching for more!</i>\"\n\n", false);
                    }
                    this.outputText("The perverse thoughts get to you, worming their way inside you until they reach your " + this.cockDescript(primary) + ".  It clenches and explodes, packing the slut's womb with cream.  She's lifted off by her sisters, and your next blast fires into the air, splattering over the assembled goblins with a wet plop.  Many gather it up, licking and slurping it, or shoveling it directly into their waiting cunts.  Another pussy is placed on you, and the sensation of new flesh taking you makes the contraction feel even longer.  She staggers off a few moments later, looking pregnant already.  The cycle repeats until", false);
                    if (daughters < 20)
                        this.outputText(" the majority ", false);
                    else
                        this.outputText(" half ", false);
                    this.outputText("of the girls have spooge-slicked cunts and big grins.\n\n", false);
                    this.outputText("As your ", false);
                    if (this.player.balls > 0)
                        this.outputText(this.ballsDescriptLight() + " empty", false);
                    else
                        this.outputText("prostate empties", false);
                    this.outputText(", one of the girls wanders over and asks, \"<i>How does it feel knowing your daughter is pregnant with even more children? Does it turn you on, <b>Daddy</b>?</i>\"\n\n", false);
                    //(Go to end unless daughters > 20)
                    if (daughters > 20) {
                        this.outputText("You lie there, feeling like an empty husk.  The crowd starts to disperse", false);
                        if (TamainsDaughtersScene.tamaniPresent)
                            this.outputText(" while Tamani walks away", false);
                        this.outputText(", but a few of the little sluts don't look satisfied yet.  They crowd around.  One straddles your chest and begins dancing in an erotic display.  Somehow, your " + this.cockDescript(primary) + " still manages to twitch weakly in response.  Another goblin opens a satchel and pulls out some fruit and a canteen.  She delicately begins feeding you, clearing wanting you to regain your strength.  It seems they aren't finished with you yet.  You down what feels like gallons of water, and then find yourself presented with another flask of pink goo.  Shrugging, you gulp it down willingly, enjoying the sensation of your " + this.cockDescript(0) + " re-inflating to its maximum, turgid size.\n\n", false);
                        this.outputText("Sighing happily, you lie there as the remainder of your daughters take you, fucking you one after another.  The whole time you don't stop eating, converting all of the girl's rations into gallons of baby batter.  Your daughters don't seem to mind, and take turns posing sexily and feeding you while they take turns riding your pole until they're bloating and pregnant.  By the time the last one rises up on shaky legs, you're exhausted and your eyes are drifting closed.  ", false);
                        if (daughters < 50)
                            this.outputText("Girlish giggles sooth you to sleep as the crowd slowly disperses.", false);
                        else
                            this.outputText("Girlish giggles sooth you to sleep as your body caves in to its fatigue.  The last thing you hear is the biggest daughter suggesting, \"<i>We should keep daddy around all the time...</i>\"", false);
                    }
                }
                //(Normal end)
                if (daughters <= 20) {
                    this.outputText("Exhausted and shaken by the ordeal, you lie there as the girls regroup, gathering any dripping seed into bottles or their puffy cunts.  Several of them blow you kisses", false);
                    if (TamainsDaughtersScene.tamaniPresent)
                        this.outputText(" and Tamani passionately frenches you.", false);
                    else
                        this.outputText(".", false);
                    this.outputText("  One of them licks your sore member and says, \"<i>Thanks for all the cream!</i>\"\n\n", false);
                }
            }
            //[DOESNT FIT]
            else {
                this.outputText("You pick a random girl from the crowd, and the others crowd around, jealous of your chosen cock-sleeve.   Her cries of excitement rapidly turn to pain when you try to push in though.  She's just too small, even for a goblin.  You set her down, disappointed, but then she lies down in the grass and spreads her legs wide.  She says, \"<i>Since you're too big for us, how about we take turns lining up on the ground while some of us suck out your sticky goop?</i>\"\n\n", false);
                this.outputText("The idea sounds great to you.  Two of the horny sluts are already climbing forwards while their sisters lay out, pulling their vulva apart and toying with their tiny green clits.  They must be twins, because aside from their wildly different hair, their features are identical.  The paired cock-sluts both kiss your swollen " + this.player.cockHead() + ", then drag their lips and tongues over your length.  At first they're working in sync, but as their efforts intensify they slowly get out of rhythm, until they're each slobbering over a different part of your " + this.cockDescript(0) + ".\n\n", false);
                if (TamainsDaughtersScene.tamaniPresent) {
                    this.outputText("Tamani steps up and reaches into a pouch.  As she withdraws her hand, you get your first glimpse of her cargo.  It appears to be a massive double-ended dildo, pink and floppy.  One end is shaped like a canine, with a huge knot, while the other ends in the flared tip of a horse-cock.  Tamani grunts as she spears herself with the pointed canine side, even forcing the massive dildo's knot inside.  She releases the dildo and the horse-half bobbles imposingly in front of her, dripping pink fluids.  She grins up at you saying, \"<i>If my daughters are going to claim all your cream, I'm going to make sure you don't hold back.  You saw the knot on this thing, didn't you?  Well, it's filled with aphrodisiacs, so when I cum and clamp down on it, you'll be forced to squirt every ounce of seed into my girls.</i>\"\n\n", false);
                    this.outputText("She disappears behind you and you cringe, knowing this will probably be at least slightly uncomfortable.  ", false);
                    if (this.player.tallness > 48)
                        this.outputText("You can hear her climbing up on something behind you, in order to get to the right height.  ", false);
                    this.outputText("Your expression of disdain is ruined when one of the sluts stretches wide and slurps your " + this.player.cockHead() + " into her mouth.  Her tongue feels like heaven as it slides over your tip, and her sister works the shaft, jerking the spit-lubed monster off with fast strokes.   Your enjoyment is interrupted by a sudden intrusion at your backdoor.  The rubbery flared horse-toy presses against your " + this.assholeDescript() + ", dribbling a little bit of its strange lubricants into your backdoor as Tamani pushes it forward.   Tiny hands grab your " + this.assDescript() + " as it's pushed forward, and you have no choice but to relax and allow it inside.\n\n", false);
                    this.outputText("Half the head slips inside you, then the other, and in no time Tamani is slowly forcing it inside you.  It hurts just a little, enough to make your hips swivel forwards in a futile attempt at escape.  The goblin on your cock nearly chokes from the sudden change, though her sister gives you a wicked grin and strokes harder.  A flash of warmth squirts inside you in time with a moan from Tamani, and suddenly your body is exploding with pleasure.\n\n", false);
                    this.outputText("Cum bubbles from the first goblin's nose as she falls off you, getting a massive facial in the process.  Her twin sister happily jacks you off, aiming your tool down at the row of cunts below you.  The sticky spooge splatters into their holes, painting their toned midriffs and ample thighs with sticky whiteness as you're used like some kind of fertility sprinkler. Tamani shoves her artificial dong further into your backdoor and somehow you manage to squeeze out a few more splattering drops of whiteness for her daughters.\n\n", false);
                    this.outputText("Spent, your " + this.cockDescript(0) + " wilts, drooping downward as it drips the last of its seed.  Tamani seems oblivious to that fact though, and continues to violate you from behind.  You're about to reach around to dislodge the tiny anal rapist when another squirt of aphrodisiacs releases inside you, catching some of your prostate with the goop.  A torrent of blood rushes to your " + this.cockDescript(0) + " and you're suddenly achingly hard again.", false);
                    if (this.player.balls > 0)
                        this.outputText("  Your " + this.ballsDescriptLight() + " ache from the strain, but struggle to churn up more sperm.  ", false);
                    this.outputText("A drop of pre-cum beads on the tip and you find yourself relaxing, letting Tamani slide her drug-slicked horse-cock the rest of the way into you.\n\n", false);
                }
                this.outputText("A third goblin suddenly attacks your taint, licking between your " + this.assholeDescript() + " and ", false);
                if (this.player.balls > 0)
                    this.outputText(this.ballsDescriptLight(), false);
                else if (this.player.hasVagina())
                    this.outputText(this.vaginaDescript(0), false);
                else
                    this.outputText("shaft", false);
                this.outputText(" as she presses her hard nipples up against your " + this.player.legs() + ". ", false);
                //(No Tamani:
                if (!TamainsDaughtersScene.tamaniPresent)
                    this.outputText("She presses something against your backdoor and before you have a chance to react, something hot and wet is filling your " + this.assholeDescript() + ".  You look down as she pulls out a tube of pink residue, and sways with burning desire.\n\n", false);
                else
                    this.outputText("The feeling of the ridges and flare of Tamani's fake cock as it slides inside you makes you sway on your feet, drunk with the lust its fluids have induced.   You sway back and forth with burning desire as both of the twins caress and stroke your meat, coaxing as much pleasure from it as possible.\n\n", false);
                this.outputText("You explode, coming harder than ever from the pressure and drugs buried against your prostate.  One of the twins, tired of waiting, pulls your " + this.cockDescript(0) + " over and shoves your tip against her slickened folds.  You manage to pump a thick blob of cum deep inside her before her sister snatches it away, grinding her own hungry twat against you until her entire groin is stained white.  They glare at each other, but after seemingly being sated, they return to fondling your " + this.cockDescript(0) + " together, using it like a hose to drench their smiling sisters with the remaining cum.\n\n", false);
                if (TamainsDaughtersScene.tamaniPresent) {
                    this.outputText("Tamani pushes hard and screams behind you, \"<i>OH FUCK YES KNOCK THEIR LITTLE CUNTS UP!  Oooooohh...</i>\"\n\n", false);
                    this.outputText("Her voice trails off into indecipherable gibberish as her orgasm takes her.  You can feel the horse-dick shaped dildo in your ass squirting its tainted fluids into you as Tamani's cunt clenches down on its other side.  Abruptly, the entire thing slides out, and you hear Tamani collapse in the grass.  You turn around as your cock responds to the drugs again, and note that she's totally out of it, mashing her tits with both hands and trembling with short involuntary muscle spasms.\n\n", false);
                }
                if (!TamainsDaughtersScene.tamaniPresent)
                    this.outputText("You're handed another bottle as t", false);
                else
                    this.outputText("T", false);
                this.outputText("he girls shift position, rearranging themselves so that those who got the most love-juice are now positioned alongside you.  ", false);
                if (!TamainsDaughtersScene.tamaniPresent)
                    this.outputText("You shrug and drink it, ", false);
                else
                    this.outputText("You begin ", false);
                this.outputText(" feeling hornier and hornier, as ready now as you were when you got here.  Twitching, your " + this.cockDescript(0) + " announces its readiness to repaint these living cum-sponges.  A trio of goblin tongues slip over your shaft, and lip-gloss smeared lips worship every ounce of your life-giving rod.  One of the girls, an older one with prominent breasts, breaks off and begins to scale her way up your body.  She doesn't stop until she's sitting on your shoulders with her hot messy cunt pressed against your face.\n\n", false);
                this.outputText("One of the girls on your " + this.cockDescript(0) + " gets an idea and mashes her tits against it you while she licks and strokes you.  The combined goblin assault once again achieves its goal, and you are brought to a body shaking orgasm AGAIN.   The swarm of goblins giggles happily as they gather your falling spunk into their waiting cunts.  What doesn't fit inside is slurped up, and soon you're covering a writhing orgy of curvy green women with a thick coat of spunk.\n\n", false);
                this.outputText("You finish and collapse backwards, totally drained and losing consciousness.  ", false);
                if (daughters < 20) { }
                //(20+ daughters:
                else if (daughters < 30) {
                    this.outputText("A glass vial is slipped into your mouth as you lose consciousness, and you reflexively swallow.  You swear you could hear something about, \"<i>not done yet,</i>\" but you pass out.  Your dreams are far from restful, but full of pleasure.", false);
                    this.dynStats("tou", -.5, "int", -.5);
                }
                //(30+ Daughters: 
                else {
                    this.outputText("Vial after vial is pressed against your mouth as liquids are poured down your throat.  Your body reflexively swallows and the massive jump in arousal prevents you from totally passing out.  You can't remember much before you truly lose consciousness, but one thing that sticks in your mind is some of your daughters asking, \"<i>Why don't we just bring Daddy back to camp and then we can fuck him whenever we want?</i>\"\n\nYou passed out before you could hear the answer.", false);
                    this.dynStats("tou", -.75, "int", -1, "lib", .5);
                }
            }
            this.player.orgasm();
            this.dynStats("lib", 1, "cor", 1);
            //Knock the bitches up, boost libido, corruption
            if (TamainsDaughtersScene.tamaniPresent)
                kGAMECLASS_1.kGAMECLASS.forest.tamaniScene.tamaniKnockUp(); //If she wasn't pregnant she will be now
            this.knockUpDaughters();
            this.player.cumMultiplier += .3;
            if (this.getGame().inCombat)
                this.cleanupAfterCombat();
            else
                this.doNext(this.camp.returnToCampUseFourHours);
        }
        //[Let them]
        legTamanisDaughtersRAEPYou() {
            this.spriteSelect(57);
            this.flags[kFLAGS_1.kFLAGS.TIMES_FUCKED_TAMANIS_DAUGHTERS]++;
            var cocks = this.player.totalCocks();
            var daughters = Math.floor(this.flags[kFLAGS_1.kFLAGS.TAMANI_NUMBER_OF_DAUGHTERS] / 2);
            //Find a dick that fits
            var primary = this.player.cockThatFits(50);
            this.outputText("", true);
            this.outputText("Knowing full well that a ", false);
            if (daughters > 20)
                this.outputText("large ", false);
            this.outputText("crowd of goblins isn't going to let you leave while you still have a drop of sperm in your body, you disrobe and walk into their midst, lying down in a soft mossy patch and giving yourself up to the horde completely.  In an instant you're smothered in a sea of supple green flesh, and caressed from head to toe.  The largest of the group is happily stroking ", false);
            if (cocks > 1)
                this.outputText("one of ", false);
            this.outputText(" your " + this.multiCockDescriptLight() + ", teasing you as it near-instantly rises, \"<i>Mommy never told me you were such an easy " + this.player.mf("man-", "") + "slut.</i>\"\n\n", false);
            this.outputText("A slippery gash mounts your " + this.player.face() + ", blocking your view of anything but a cute navel as pungent pussy slobbers over your lips.  With a resigned sigh, you open your mouth and bury your tongue into one of your many daughters' snatches.  It's tangy and sweet, and juicier than fresh fruit.   The girlish moans you hear let you know how successful your tongue is, and you work harder than ever to kiss and lick her slippery lips, pausing only to suck the tiny bud of her clit into your mouth.\n\n", false);
            this.outputText("Through it all the other girls stay busy, Tamani's eldest daughter gets most of your attention while she continues  to stroke you off.  She squeezes and caresses it until your member is trembling in her hand, ready to explode.\n\n", false);
            //(FORK BETWEEN TOO BIG AND FITS)
            //[FITS]
            if (primary >= 0) {
                this.outputText("Effortlessly, she straddles you and guides the entire length of your rod into her honeypot.  Amazingly the tiny girl is able to spread her cunt around you, forming a tight, but not uncomfortable, fit.  ", false);
                if (cocks == 2)
                    this.outputText("Another set of hands latches on to your free dick and forces herself down on top it, sitting back to back with the other lucky slut as she takes it to the hilt.  Somehow you know that if you could see beyond the tight body smothering your face, watching your daughters fuck together would push you over the edge.", false);
                else if (cocks > 2)
                    this.outputText("More and more hands latch onto the rest of your " + this.multiCockDescriptLight() + ", guiding each of them into a tight cunt-hole.   If you could see around the tight body of the slut on your face, you're sure the scene on your crotch would push you over the edge.", false);
                else
                    this.outputText("You stiffen as a tongue suddenly presses against your " + this.assholeOrPussy() + " sliding inside and intensifying the feelings radiating down your fuck-pole until you're unable to hold on.", false);
                this.outputText("\n\n", false);
                this.outputText("A sudden flow of fluids soaks your " + this.player.face() + " and dribbles from your chin.  The face-riding goblin bucks like a bronco, nearly breaking your nose before the strength drains from her body and she slides off into the dirt, panting weakly.   Confronted with the sight of ", false);
                if (cocks > 2)
                    this.outputText("so many girls impaled on your flesh", false);
                else if (cocks == 2)
                    this.outputText("your daughters' whorish expressions of pleasure", false);
                else
                    this.outputText("the sultry gaze of Tamani's oldest daughter as she rides your " + this.cockDescript(primary), false);
                this.outputText(", you can do nothing but cum.  ", false);
                if (cocks > 1)
                    this.outputText("Twitching powerfully, your body unloads into the tight, fertile cum-receptacles, giving them exactly what they want.", false);
                else
                    this.outputText("Twitching powerfully, your body unloads into the tight, fertile cum-receptacle, giving her exactly what she wants.", false);
                if (this.player.cumQ() >= 1000) {
                    this.outputText("  The near-supernatural amount of spooge you produce easily bloats ", false);
                    if (cocks == 1)
                        this.outputText("her belly until she looks a little pregnant", false);
                    else
                        this.outputText("each of their uteruses until they look a little pregnant", false);
                    this.outputText(".", false);
                }
                if (cocks == 1)
                    this.outputText("  She rises up off of your wilting member, blowing you a kiss and saying, \"<i>I think you got me pregnant Daddy!</i>\"\n\n", false);
                else
                    this.outputText("  They rise up off your wilting members.  The eldest daughter blows you a kiss and says, \"<i>I think you got us pregnant Daddy!</i>\"\n\n", false);
                //TAMANI IS THERE: 
                if (TamainsDaughtersScene.tamaniPresent) {
                    this.outputText("Tamani shoves the cum-filled girls out of her way and looks down at you with an expression of disdain, \"<i>I swear honey, the way you act, I think your dick is already a slave to goblin-twat.</i>\"\n\n", false);
                    this.outputText("She gives ", false);
                    if (cocks > 1)
                        this.outputText("one of ", false);
                    this.outputText("your deflating " + this.multiCockDescriptLight() + " a playful slap, smirking when it stiffens in response, \"<i>Honestly, you're so shameful, getting hard again from such an innocent touch.  I didn't know you wanted to make our little family that much bigger.</i>\"\n\n", false);
                    this.outputText("Pantomiming a sigh, Tamani drags her finger from your ", false);
                    if (!this.player.hasSheath())
                        this.outputText("base", false);
                    else
                        this.outputText("sheath", false);
                    this.outputText(" to the tip, giggling with mirth as her words and touches bring you to full readiness.\n\n", false);
                    this.outputText("\"<i>Well, I wouldn't be a very nice wife if I didn't let you empty your stress into my hungry cunny from time to time would I?  Here, drink this, it'll make sure we have lots of daughters,</i>\" says the goblin, shoving a flask into your hand.  You nod, made agreeable by constant touches and strokes the goblin lavishes upon your groin.  The drink goes down smoothly, disappearing into you with a few quick sips from the colored glass bottle.  It settles into your belly, radiating pleasant warmth that seeps down to your crotch while it fills your mind with fuzz.\n\n", false);
                    this.outputText("Tamani massages your ", false);
                    if (this.player.biggestTitSize() < 1)
                        this.outputText("chest", false);
                    else
                        this.outputText(this.allBreastsDescript(), false);
                    this.outputText(" as she mounts you, ", false);
                    this.outputText("squeezing her dripping wet cunt around your " + this.cockDescript(primary) + ".  She explains, caressing your cheek as you start to drool, \"<i>You see, " + this.player.short + ", this potion is a special one.  You can probably feel it now, emptying your mind and shutting down your thought processes.  That's what it's supposed to do.  You won't remember anything when I'm done either, aside from how great my pussy feels on your " + this.cockDescript(primary) + "</i>.\"\n\n", false);
                    this.outputText("You drool, accepting the truth.  She's so right, there's no way you'd ever forget the feeling of hot wetness as it rubs around your shaft.  Tamani keeps talking, confidently riding you as your mind soaks up her instructions, \"<i>My hot little cunt needs filling, and your cock knows it.  It wants it.</i>\"  She leans back, allowing you a glimpse of pinkness and sticky female juices while she teases her button, \"<i>Just the sight of my pussy gets you hard and ready.  The thought of feeling that hot hole mounting you just diverts all your blood and willpower into your ready fuckstick.  You CAN'T resist my pussy.</i>\"\n\n", false);
                    this.outputText("The words she's saying stop mattering.  All that matters is how much a slave your cock is to that tight little hole, and how great it feels to give yourself over it.  Your spunk-hungry wife never shuts up, and you just lie there, listening placidly, contentedly twitching against her as orgasm approaches.  A happy smile spreads over your face as you feel your ", false);
                    if (this.player.balls > 0)
                        this.outputText("balls", false);
                    else
                        this.outputText("groin", false);
                    this.outputText(" churning with lust and desire, ready to give life to another batch of daughters for your mistress.  ", false);
                    if (this.flags[kFLAGS_1.kFLAGS.TAMANI_TIMES_HYPNOTISED] < 10)
                        this.outputText("'Wait... wife... mistress?' your mind wonders, rejecting the foreign thoughts.  You look up at Tamani, confused for a moment", false);
                    else
                        this.outputText("Yes, that sounds so right – Tamani is your wife, and it's your husbandly duty to keep her pregnant.  You dwell on that for a moment", false);
                    this.outputText(", until an orgasm wracks your body and derails your train of thought, drowning it in a sea of pleasure.\n\n", false);
                    this.outputText("She wriggles and moans as your internal muscles clench, pumping thick spurts into the goblin's womb.  A new-found sense of satisfaction and pleasure spreads through you.  It feels so good to knock Tamani up that your orgasm drags on forever, until you feel empty and exhausted.   Looking back, you realize just how much more pleasurable her box is in comparison to the other holes you've tasting in your travels, even her daughter's.  As Tamani rises up off of you, dripping with cum, the memories of everything but the sex slowly slip away, leaving behind happiness and anticipation of your next chance to fill her.\n\n", false);
                    this.outputText("Your mistress steps away, swaying her more-than ample hips from side to side as she saunters past the throng of still-hungry goblins.  You shake your head, feeling a little out of sorts, but before you get a chance to puzzle it out, ", false);
                    if (daughters < 20)
                        this.outputText("the small pack of goblins is upon you, forcing liquids down your throat and making you fill cunt after cunt with sticky seed.", false);
                    else if (daughters < 30)
                        this.outputText("the pack of goblin daughters is upon you, forcing potent aphrodisiacs down your throat as you're raped for hours, forced to pack cunt after cunt full of jism.", false);
                    else
                        this.outputText("the massive group of goblins is on top of you, drugging and raping you over and over until you've had dozens of orgasms and licked off nearly as many cream-bloated sluts.", false);
                    this.outputText("  As you lie there, drugged and drained, your daughters form up in a line and kiss you, one after another, each whispering pleasantries like, \"<i>Thanks dad,</i>\" or \"<i>Yummy cum daddy,</i>\" before flouncing off, sloshing into the woods.", false);
                    //increase hypno value
                    this.flags[kFLAGS_1.kFLAGS.TAMANI_TIMES_HYPNOTISED]++;
                    //preggo up tamani
                    kGAMECLASS_1.kGAMECLASS.forest.tamaniScene.tamaniKnockUp();
                }
                //NO TAMANI:  
                else {
                    //(SMALL PACK)
                    if (daughters < 20) {
                        this.outputText("The smaller girls take turns, mounting your cum-soaked rod one after another, using their hungry cunts like cum-sponges until your " + this.cockDescript(primary) + " is polished with feminine fluids and cleaned of any residual jism.  After so many repeated mountings, you're hard and ready to cum again, and the horny sluts know it.   You're crammed back into each one of them, one after another in a barrage of quick fucks.  Each girl is only given a few seconds on your rod before she's pulled off by her peers and replaced by another ecstatic goblin.  While waiting for their next turn, the spare girls tease you, tweaking your " + this.nippleDescript(0) + "s while licking your ears and whispering, \"<i>Don't cum for her, it'll be much better in my hot little box,</i>\" or, \"<i>You won't cum for that skank, will you?  Save your baby-batter for me!</i>\"\n\n", false);
                        this.outputText("Amazingly, you orgasm again.  An orgiastic squeal erupts from your " + this.cockDescript(primary) + "'s current owner, breaking off into pants and gasps ", false);
                        if (this.player.cumQ() < 100)
                            this.outputText("as you twitch underneath her, emptying the last of your cum inside her.", false);
                        else if (this.player.cumQ() < 500)
                            this.outputText("as you twitch underneath her, pumping her full of cum, thoroughly seeding her womb with spunk.", false);
                        else
                            this.outputText("as you twitch underneath her in powerful spasms, blasting huge gouts of cum into her waiting body until her belly is bloated with seed and it begins to squirt out around you in time with each eruption of spunk.", false);
                        this.outputText("  Disappointed moans rise up from the others as they realize they've lost the cum-lottery.   The winner, patting her belly happily, stands up, filling the air with a loud 'slurrrrrp' as her twat noisily releases your " + this.cockDescript(primary) + ".", false);
                        if (this.player.cumQ() >= 500)
                            this.outputText("  A few enterprising goblins gather around, gathering up the loose spunk and shoveling it into their holes.", false);
                        this.outputText("\n\n", false);
                        this.outputText("Tired from the sexual acrobatics, your daughters gather up their possessions and begin dispersing, but a few stick around to lick your " + this.cockDescript(primary) + " clean and give you deep french-kisses.  Exhausted as well, you begin to doze off, but not before a girlish voice whispers in your ear, \"<i>Thanks daddy!  I'll bring your daughters back once they've grown up so you can have their cherries too.</i>\"\n\n", false);
                    }
                    //(MEDIUM PACK (or bigger))
                    else {
                        this.outputText("The smaller girls take turns, mounting your cum-soaked rod one after another, using their hungry cunts like cum-sponges until your " + this.cockDescript(primary) + " is polished with feminine fluids and cleaned of any residual jism.  After so many repeated mountings, you're hard and ready to cum again, and the horny sluts know it.   You're crammed back into each one of them, one after another in a barrage of quick fucks.  Each girl is only given a few seconds on your rod before she's pulled off by her peers and replaced by another ecstatic goblin.  While waiting for their next turn, the spare girls tease you, tweaking your " + this.nippleDescript(0) + "s while licking your ears and whispering, \"<i>Don't cum for her, it'll be much better in my hot little box,</i>\" or, \"<i>You won't cum for that skank, will you?  Save your babby-batter for me!</i>\"\n\n", false);
                        this.outputText("Amazingly, you orgasm again.  An orgiastic squeal erupts from your " + this.cockDescript(0) + "'s current owner, breaking off into pants and gasps ", false);
                        if (this.player.cumQ() < 100)
                            this.outputText("as you twitch underneath her, emptying the last of your cum inside her.", false);
                        else if (this.player.cumQ() < 500)
                            this.outputText("as you twitch underneath her, pumping her full of cum, thoroughly seeding her womb with spunk.", false);
                        else
                            this.outputText("as you twitch underneath her in powerful spasms, blasting huge gouts of cum into her waiting body until her belly is bloated with seed and it begins to squirt out around you in time with each eruption of spunk.", false);
                        this.outputText("  Disappointed moans rise up from the others as they realize they've lost the cum-lottery.   The winner, patting her belly happily, stands up, filling the air with a loud 'slurrrrrp' as her twat noisily releases your " + this.cockDescript(primary) + ".", false);
                        if (this.player.cumQ() >= 500)
                            this.outputText("A few enterprising goblins gather around, gathering up the loose spunk and shoveling it into their holes.", false);
                        this.outputText("\n\n", false);
                        this.outputText("You're exhausted from the sexual battering you've had to endure, but the giggling swarm won't let you rest.  Tiny hands pry open your jaws and force a bubbling concoction past your lips.  Another one massages your throat and you're forced to swallow the stuff.   The drug's effects are strong and immediate.  Your ", false);
                        if (this.player.balls > 0)
                            this.outputText("balls begin swelling, trembling as they visibly inflate, preparing a massive load of seed.", false);
                        else
                            this.outputText("groin shifts uncomfortably, trembling as it begins preparing a massive load of seed.", false);
                        this.outputText("  Your " + this.multiCockDescriptLight() + " spasms, twitching as unearned pleasures fill the flesh and bring you to climax.\n\n", false);
                        this.outputText("You grunt, squirting a long rope of the stuff that splatters onto your belly.  A palpable sense of relief comes with it, though the mystery drug they've fed you immediately turns that relief back into uncomfortable fullness.  Your hips twitch and try to launch the next load, but it's intercepted by a pierced goblin-twat that slides down on top of you.  The goblin pinches her nipples and coos happily as you send squirt after squirt into her, until she's cumming loudly and her over-full twat is squirting out each time you try to pack more in.\n\n", false);
                        this.outputText("The filled goblin is pulled off by her sisters, and through your haze of artificially-induced pleasure she looks completely insensate.  Her mouth is drooling, her eyes are rolled back, and her entire body is twitching in the arms of her sisters as they lay her in the grass to recover.   Despite being exposed to the air, you're still cumming hard, and a few more ropes of cum spatter your neck and chest with goo before the next daughter climbs aboard.\n\n", false);
                        this.outputText("This goblin is riding you reverse cowgirl, grinding up and down, peeking over her shoulder to give you seductive smiles as she's fully fertilized.  Her thighs quiver and her vaginal muscles squirm around you, contracting and squeezing until it gets hard to push any more jizz inside her.  With a self-satisfied smile, she rises up off of you and helps the next of her sisters into place.\n\n", false);
                        if (daughters < 40) {
                            this.outputText("Locked in a ceaseless orgasm, you're raped by one goblin after another.  A parade of tight pink pussies and their green-skinned owners passes by you, and once each of them is dripping with white seed, they take the time for a second pass.  By the time it's over, you're raw and sore, and your ", false);
                            if (this.player.balls > 0)
                                this.outputText(this.ballsDescriptLight() + " hurt", false);
                            else
                                this.outputText("crotch hurts", false);
                            this.outputText(" from having to generate such a ridiculous quantity of spooge.  The crowd of milling goblins seems much less frantic now that they've gotten what they want.  You're kissed and licked and massaged by the thankful mass, and you lose yourself to unconsciousness, still dribbling semen.", false);
                        }
                        //(LARGE PACK – as above minus last PG)
                        else {
                            this.outputText("Locked in a ceaseless orgasm, you're raped by one goblin after another.  A parade of tight pink pussies and their green-skinned owners passes by you, and once each of them is dripping with white seed, they take the time for a second pass.  You're raw, sore, and losing consciousness, but the huge mass of young goblins is far from done with you.  They force another potion into your throat as you lose consciousness.   Your dreams are filled with demented orgies where your dick is kept in one tight hole after another, a cruel reflection of reality.  When you awake they're gone and you're incredibly sore, but somehow still horny.  Getting dosed with so many goblin drugs in such a short time-span might not have been a good idea.", false);
                            //libido/cumq/corruption booster?
                            this.dynStats("lib", 1, "cor", .5);
                            this.player.cumMultiplier += .3;
                        }
                    }
                }
            }
            //[NO FIT]
            else {
                //	[No Tamani]
                if (!TamainsDaughtersScene.tamaniPresent) {
                    this.outputText("Effortlessly, Tamani's daughter launches herself onto you, straddling your body as she tries to work your " + this.cockDescript(0) + " into her tight gash.  No matter how hard she tries, she just can't get it in.  She looks up at you in confusion and asks, \"<i>How in Marae's cunt can my Mom take this beast?</i>\"\n\n", false);
                    this.outputText("Frowning in consternation, she presses it down onto your belly and sits on top, spreading her cunt as wide as she can around the bulge your urethra makes on the underside of your " + this.cockDescript(0) + ".  Though you can't see her, the feeling of her starting to slide along your length is wonderfully pleasurable.  After a few moments you can feel her getting into it, leaning over and pressing her taut body and heavy breasts against you as well.  Incredibly turned on by the mental picture you're forced to form, you attack the cunt riding your " + this.player.face() + ", licking it with feverish intensity.\n\n", false);
                    this.outputText("A sudden flow of fluids soaks your " + this.player.face() + " and dribbles from your chin.  The face-riding goblin bucks like a bronco, nearly breaking your nose before the strength drains from her body and she slides off into the dirt, panting weakly.  Now freed from your juicy prison, you can see the oldest daughter as she's squeezing on your " + this.cockDescript(0) + ", sliding her gash and ", false);
                    if (daughters < 20)
                        this.outputText("pert ", false);
                    else if (daughters > 40)
                        this.outputText("heavy ", false);
                    this.outputText("breasts over every part of it.", false);
                    if (cocks == 2)
                        this.outputText("  Another one of the petite sluts climbs aboard your " + this.cockDescript(1) + ", squealing happily to her sister as she joins her in riding you.", false);
                    if (cocks > 2) {
                        this.outputText("  A third, wearing slutty pink make-up with platinum blonde hair, lays out across your ", false);
                        if (cocks > 3)
                            this.outputText("remaining " + this.multiCockDescriptLight(), false);
                        else
                            this.outputText(this.cockDescript(2), false);
                        this.outputText(".", false);
                    }
                    this.outputText("\n\n", false);
                    this.outputText("She pivots around, placing her drooling, wet gash against your " + this.player.cockHead() + " and begins vigorously jerking you off.   Her ass bounces hypnotically on your ", false);
                    if (this.player.biggestTitSize() < 1)
                        this.outputText("chest", false);
                    else
                        this.outputText(this.allBreastsDescript(), false);
                    this.outputText(", sending a fresh surge of arousal through your " + this.multiCockDescriptLight() + ".   Another one of the girls leans down between your " + this.player.legs() + " licking your ", false);
                    if (this.player.balls > 0)
                        this.outputText("balls", false);
                    else if (this.player.hasVagina())
                        this.outputText("pussy", false);
                    else
                        this.outputText("taint", false);
                    this.outputText(", massaging your ", false);
                    if (this.player.hasSheath())
                        this.outputText("sheath", false);
                    else
                        this.outputText("crotch", false);
                    this.outputText(", and the sensitive " + this.player.skinDesc + " around your crotch.   The busty girl on your " + this.cockDescript(0) + " teases, \"<i>Go ahead and let it out " + this.player.mf("stud", "sexy") + ".  I'm tired of getting your cream second-hand, so squirt it right into my hot little cunt.</i>\"\n\n", false);
                    if (cocks == 2)
                        this.outputText("Her sister agrees, \"<i>Yeah, I want to feel the hot cum squirting into my cunt.  Fill me full of so many babies that you make Mom jealous!</i>\"\n\n", false);
                    else if (cocks > 2)
                        this.outputText("Her sisters agree, \"<i>Yeah, we want to feel the hot cum squirting into our cunts!  Fill us up with so many babies that Mom gets jealous!</i>\"\n\n", false);
                    this.outputText("Your body caves into their demands.  The girl between your " + this.player.legs() + " licks hard as your muscles tense with orgasm.  ", false);
                    //Single cock jizz scene
                    if (cocks == 1) {
                        this.outputText("The daughter giggles and squeals as bulges of cum squeeze up your urethra, visibly shifting her tight body before squirting inside with wet, fluid noises.  Sloshing squishing noises fill the air as you submit to your jizz-devouring pack of daughters, feeding their insatiable need for sperm.  Pleasure rocks you as ", false);
                        //Cum stuff
                        if (this.player.cumQ() < 100)
                            this.outputText("your orgasm ends, pulsing weakly inside the sloppy goblin flesh.", false);
                        else if (this.player.cumQ() < 500)
                            this.outputText("your orgasm drags on, pumping the slut up until she looks slightly pregnant.", false);
                        else {
                            this.outputText("your orgasm drags on, splattering cum everywhere as you plump up the girl until she looks pregnant.", false);
                            if (this.player.cumQ() > 1000)
                                this.outputText("  Seed gushes out her opening, actually pushing the goblin away as your orgasm splatters cum into the grass.", false);
                            if (this.player.cumQ() > 5000)
                                this.outputText("  The other goblins frolic around in the stuff, greedily shoveling it into their dripping pussies with both hands as you form a small lake of seed.", false);
                        }
                    }
                    //Multi jizz scene
                    else {
                        this.outputText("The daughters giggle and squeal as bulges of cum squeeze up your urethras, visibly shifting their tight bodies before squirting inside with wet, fluid noises.  Sloshing squishing noises fill the air as you submit to your jizz-devouring pack of daughters, feeding their insatiable need for sperm.  Pleasure rocks you as ", false);
                        //Orgazmo
                        if (this.player.cumQ() < 100)
                            this.outputText("your orgasm ends, pulsing weakly inside the sloppy goblin flesh.", false);
                        else if (this.player.cumQ() < 500)
                            this.outputText("your orgasm drags on, pumping the sluts up till they look slightly pregnant.", false);
                        else {
                            this.outputText("your orgasm drags on, splattering cum everywhere as you plump up the girls until they look pregnant.", false);
                            if (this.player.cumQ() > 1000)
                                this.outputText("  Seed gushes out their openings, actually pushing the goblins away as your orgasm splatters cum into the grass.", false);
                            if (this.player.cumQ() > 5000)
                                this.outputText("  The other goblins frolic around in the stuff, greedily shoveling it into their dripping pussies with both hands as you form a small lake of seed.", false);
                        }
                    }
                    this.outputText("\n\n", false);
                    this.outputText("Spent, you lie in the dirt, twitching weakly with an exhausted grin on your face.  A goblin with a long pierced tongue kneels next to your face and gives you a long kiss, twisting her tongue around your own.  Her spit tastes almost sweet to you, and the passionate tongue-fuck has you getting hard again even as you're running out of breath.  She breaks it off, and as you gasp for air, she forces a pill into your mouth.  Knowing they'll make you swallow it one way or another, you sigh and ingest the foreign drug.  Your tongue-twisting partner licks her shiny, cock-sucking lips and says, \"<i>Mom always did say you were an eager fuck.  I even stole that pill from her – it should make you cum enough to stuff every single one of us!  I can't wait to catch the first blast in my tight little snatch!</i>\"\n\n", false);
                    if (cocks == 1)
                        this.outputText("Y", false);
                    else
                        this.outputText("Each of y", false);
                    this.outputText("our " + this.multiCockDescriptLight() + " is now rock solid and beading pre-cum at the tip.  ", false);
                    //(single)
                    if (cocks == 1)
                        this.outputText("The purple-lipped cock-slut grabs your " + this.cockDescript(0) + " and makes a show of smearing the slippery fluid over your shaft, lubricating it as she jacks you off.  Her warm lips form a tight seal on your " + this.player.cockHead() + " as the young goblin begins lapping at your pre-cum as she sucks it from your urethra.   It feels heavenly, and your " + this.hipDescript() + " pump weakly into the air in an instinctive bid to enhance the sensation.", false);
                    //(multiple)
                    else {
                        this.outputText("The purple-lipped cock-slut grabs hold of one of your " + this.multiCockDescriptLight() + " and makes a show of smearing the slippering fluid over the shaft, lubricating it as she begins to jack you off.  Her sisters, taking the cue, step over the other sated sluts and grab hold of your " + this.cockDescript(1) + ", fondling it lovingly.  ", false);
                        if (cocks > 2)
                            this.outputText("They spread out until every one of your " + this.multiCockDescriptLight() + " has at least one goblin hanging off it, stroking and touching you.  ", false);
                        this.outputText("It feels heavenly, and your " + this.hipDescript() + " pump weakly into the air in an instinctive bid to enhance the sensation.", false);
                    }
                    this.outputText("\n\n", false);
                    this.outputText("The goblin who served between the legs crawls back into position, and you realize she must be the youngest, and therefore the lowest on the goblin totem-pole.  Her eager tongue is just as skilled as it was minutes ago, and between her attentions and the tongues on your " + this.multiCockDescriptLight() + ", you're leaking streamers of liquid lust.  Hands run over your ", false);
                    if (this.player.biggestTitSize() < 1)
                        this.outputText("chest", false);
                    else
                        this.outputText(this.allBreastsDescript(), false);
                    this.outputText(", circling your nipples and massaging your chest while a girlish voice whispers in your ear, \"<i>Cum for us now daddy, we've gotten so wet having to wait on you...</i>\"\n\n", false);
                    this.outputText("Ripples of convulsive pleasure wrack your midsection as you feel the muscular contractions of your orgasm threatening to tear you apart.   Your ", false);
                    //(single)
                    if (cocks == 1)
                        this.outputText(this.cockDescript(0) + " blasts a wave of seed directly into your cock-obsessed daughter's mouth, flooding it until she falls off of it with jism dripping from her nostrils.  You squirt a massive spurt high into the air overhead, and more than a few goblins are running around with their tongues out, trying to catch it in their mouths.   Each wave of seed is larger than the last, erupting from your " + this.cockDescript(0) + " like a geyser.   Soon everyone is spattered in a layer of the stuff, and your gut-clenching orgasm tapers down to a more reasonable, but constant, slow flow of semen.  Each of your daughters comes up and takes turns angling your shaft into her waiting cunt, allowing the thick fluid to fill her to capacity before waddling off.  Then the next girl does the same, and the next, and the next...", false);
                    //(Multi)
                    else
                        this.outputText(this.multiCockDescriptLight() + " blast waves of seed directly into your cock-obsessed daughters' mouths, flooding them until they fall off with jism dripping from their nostrils.   You spurt massive loads high into the air overhead, and more than a few goblins are running around with their tongues out, trying to catch the seed in their mouths.  Each wave is larger than the last, erupting from your " + this.multiCockDescriptLight() + " like a geyser.  Soon everyone is covered in a thick coating of the stuff, and your gut-clenching orgasm tapers down to a more reasonable, but constant, slow flow of semen.  Each of your daughters comes up and guides a shaft into her waiting cunt, filling herself to capacity with the thick fluid before waddling off.   Then the next set of girls does the same, and the next, and the next....", false);
                    this.outputText("You're done in by the effort, and quickly lose consciousness.", false);
                }
                //[Tamani is There]
                else {
                    this.outputText("A scuffle in the crowd breaks out to your right, and though you can hear it, the jiggling ass and delicious pussy of the goblin slut on your face makes it impossible to see what's going on.  You do what any horny " + this.player.mf("male", "herm") + " would do in your position – groan into the slippery box and ignore it, focusing on the feel of skilled hands fondling ", false);
                    if (cocks > 1)
                        this.outputText("each of ", false);
                    this.outputText("your " + this.multiCockDescriptLight() + ".\n\n", false);
                    this.outputText("High pitched voices rise in pleading tones, followed by the impact of flesh on flesh.  A sultry, familiar voice clears her throat and asks, \"<i>Oh, so this is where you've been.  Tamani would've expected her husband to be in his proper place – lodged deep between her legs, rather than rewarding his ditzy daughters' misbehavior.</i>\"\n\n", false);
                    this.outputText("You sigh into the fragrant pussy, the warm air-flow turning the slippery box a dripping fountain of orgasm.   The walls clamp around your tongue, squeezing it from base to tip in a milking motion you've become intimately acquainted with.   A high pitched shriek of pleasure rises, then cuts off.  You blink away a sudden burst of light as the orgasming girl is ripped from your questing tongue, revealing the crowd of sultry bodies and Tamani's knowing smirk.\n\n", false);
                    this.outputText("\"<i>Mother always said you had to keep your men on a tight leash, and boy was she ever right – you've been cheating on Tamani!  With your own daughters!</i>\" exclaims your ", false);
                    if (this.flags[kFLAGS_1.kFLAGS.TAMANI_TIMES_HYPNOTISED] >= 10)
                        this.outputText("wife", false);
                    else
                        this.outputText("\"wife\"", false);
                    this.outputText(" in mock indignation.   She taps her chin for a moment, ignoring her daughters as they continue to lick and stroke ", false);
                    if (cocks)
                        this.outputText("each of ", false);
                    this.outputText("your " + this.multiCockDescriptLight() + ".  Your eyes roll back in blissful pleasure as Tamani declares, \"<i>Tamani will take care of you, husband.  You're going to cum into these girls' hungry twats until they have to waddle home, and then you're going to remember why Tamani's cunt owns your " + Appearance_1.Appearance.cockNoun(CockTypesEnum_1.CockTypesEnum.HUMAN) + ", forever.</i>\"\n\n", false);
                    this.outputText("Tamani pulls out a ring gag, shoves it into your protesting mouth, and pulls the straps securely around the back of your neck.  She tousles your " + this.hairDescript() + " as you squirm, but the crowd of goblins easily keeps you subdued, assisting their mother now that they know her plans.   You ", false);
                    if (this.player.cor > 66)
                        this.outputText("sigh, actually anticipating what's about to come", false);
                    else if (this.player.cor > 33)
                        this.outputText("don't resist, knowing there's no way to stop what's about to happen", false);
                    else
                        this.outputText("shudder, struggling to pull free", false);
                    this.outputText(" as Tamani pulls out a half dozen vials and a handful of pills.  She drops the drug-filled capsules into your mouth, pouring in the potions, one at a time, to wash down her concoctions.\n\n", false);
                    this.outputText("\"<i>Ok girls, line up; Daddy's gonna start squirting for you, so grab hold of that monster he's got and hold the tip against your horny little cunts until you're full.  And don't be greedy, once you've got a puss full of seed waddle on home, ", false);
                    if (daughters < 20)
                        this.outputText("there's other girls waiting", false);
                    else if (daughters < 35)
                        this.outputText("we've got a lot of girls to fill up", false);
                    else
                        this.outputText("there's a TON of you here so you'll need to move quick if you each want a turn", false);
                    this.outputText(",</i>\" commands the goblin mother.\n\n", false);
                    this.outputText("Her words are downright prophetic.  Churning, bubbling warmth floods your crotch with need as you look on, moaning.  Your back arches and your eyes cross in an involuntary reaction to your drug-induced orgasm.  Grunting, you twitch as the goblins line up, the eldest daughter grabbing home of your flexing " + this.cockDescript(0) + " as it begins to erupt.  Strangely, it isn't the pulsing, squirting orgasms you're used to.  Instead, a steady stream of cum washes out over the girl's abdomen as she lines up, eventually grinding her wet pussy against your straining urethra.  She giggles with lewd pleasure, grinding against your swollen " + this.player.cockHead() + " as her womb is pumped full of semen.  Her belly quickly rounds out, and she's forced to step away, leaving you to soak your belly while the next of your daughters gets in position.\n\n", false);
                    //(MULTI)
                    if (cocks > 2) {
                        this.outputText("Meanwhile your other " + Appearance_1.Appearance.cockNoun(CockTypesEnum_1.CockTypesEnum.HUMAN) + "s are wasting their spunk over your belly, so some of the waiting girls grab them and pull them aside, ramming their tips deep inside their seemingly bottomless fuck-holes.  They giggle and run their manicured nails over your ", false);
                        if (this.player.biggestTitSize() < 1)
                            this.outputText("chest", false);
                        else
                            this.outputText(this.allBreastsDescript(), false);
                        this.outputText(", circling your sensitive nipples", false);
                        if (this.player.biggestLactation() >= 1) {
                            this.outputText(" as they start to ", false);
                            if (this.player.biggestLactation() < 2)
                                this.outputText("leak", false);
                            else if (this.player.biggestLactation() < 3)
                                this.outputText("drip", false);
                            else if (this.player.biggestLactation() < 5)
                                this.outputText("spew", false);
                            else
                                this.outputText("fountain", false);
                            this.outputText(" milk", false);
                        }
                        this.outputText(".  The perverse scene seems to feed you even more pleasure, and you feel your orgasm increase in intensity, thickening the flow of cum.\n\n", false);
                    }
                    //(SINGLE EXTRA)
                    else if (cocks == 2) {
                        this.outputText("Meanwhile your other " + Appearance_1.Appearance.cockNoun(CockTypesEnum_1.CockTypesEnum.HUMAN) + " is wasting its spunk over your belly, so one of the waiting girls grabs it and pulls it to the side, ramming its tip deep inside her seemingly bottomless fuck-hole.  She giggle and runs their manicured nails over your ", false);
                        if (this.player.biggestTitSize() < 1)
                            this.outputText("chest", false);
                        else
                            this.outputText(this.allBreastsDescript(), false);
                        this.outputText(", circling your sensitive nipples", false);
                        if (this.player.biggestLactation() >= 1) {
                            this.outputText(" as they start to ", false);
                            if (this.player.biggestLactation() < 2)
                                this.outputText("leak", false);
                            else if (this.player.biggestLactation() < 3)
                                this.outputText("drip", false);
                            else if (this.player.biggestLactation() < 5)
                                this.outputText("spew", false);
                            else
                                this.outputText("fountain", false);
                            this.outputText(" milk", false);
                        }
                        this.outputText(".  The perverse scene seems to feed you even more pleasure, and you feel your orgasm increase in intensity, thickening the flow of cum.\n\n", false);
                    }
                    this.outputText("The next slut grabs your " + this.player.cockHead() + " with both hands as she straddles you, pinching it tightly enough to make you wince.  The flow of white goo is pinched off, backing up painfully as she gets in position.  Just when you're about to cry, she's in position, and releases her too-tight grip.   Your body rewards the slut for her pain with a blast of seed so powerful it nearly blows her off your midsection, splattering out around her lips.  She holds on through an orgasm as you fill her depths with even more of your creamy load.  Surprisingly, she manages to take even more than her older sister, staying on until she looks a few months pregnant.  She staggers off, sloshing wetly while seed drips between her thighs.\n\n", false);
                    this.outputText("While you continue to fertilize the slutty goblin girls, Tamani is nice enough to remove your gag.  Sadly, you're too drunk with pleasure and Tamani's chemicals to do anything but pant and drool, but it was a nice gesture.  ", false);
                    //(SMALL CROWD: 
                    if (daughters < 20)
                        this.outputText("The crowd of girls takes their time since there's only around a dozen or so left to fill.  They ride you long and hard, getting their wombs packed full and making a mess while they do it.  Even after all of them has been filled, Tamani's potent chemicals keep you locked in orgasm, dripping unholy amounts of semen everywhere.  A few of the more daring of your offspring take turns sliding the tip into their tight assholes, allowing you to fill them completely as the drugs finally begin to wear off.\n\n", false);
                    //(ALT MORE GIRLZ)
                    else if (daughters < 35)
                        this.outputText("The crowd of girls seems to take forever to get filled.  Every time one of them gets too into it, her mother pulls her back and guides the next willing hole into place.  In spite of the orderly procession, cum manages to get everywhere, soaking your torso and more than a few goblin thighs with a glaze of whiteness.  The whole time, you're kept in constant orgasm, though by the time you're filling the last girl with cum, the flow is slowing while the chemicals wear off.\n\n", false);
                    //(ALT TOO MANY GIRLZ)
                    else
                        this.outputText("The massive crowd is forced to carefully ration your semen, bountiful though it is.   Tamani doesn't even let the girls get completely filled, instead forcing each of them to only get a few cunt-filling moments of your orgasm.  Those who've already had a turn hang around, scooping up the sperm-filled fluid that's leaking out and shoveling it into their baby-craving bodies.  The whole time you're kept locked in incredible climax.  If you had any capacity for reason you'd probably feel more like a tool than " + this.player.mf("man", "woman") + ", but the synapses of your brain are too busy firing off about how good it feels to think.  By the time the last girl gets her turn, your orgasm has trailed off to a weak flow, so she stays on until the drugs finally wear off.\n\n", false);
                    this.outputText("The soon-to-be-pregnant goblins stagger off, a bit bow-legged and generously glazed with semen.  You come down from your high, panting weakly and trembling.  Tamani wraps her arms around your head, cradling you deep into her incredible bust.  The soft skin completely envelops you in breast-flesh as her sweet, fruity scent fills your lungs with every breath.  ", false);
                    if (this.flags[kFLAGS_1.kFLAGS.TAMANI_TIMES_HYPNOTISED] > 10)
                        this.outputText("She's the best wife ever.  You nuzzle deep into her cleavage, sighing happily.", false);
                    else if (this.flags[kFLAGS_1.kFLAGS.TAMANI_TIMES_HYPNOTISED] > 5)
                        this.outputText("She really is a great wife... wait, wife? You shrug away the thought and enjoy slowly motorboating her breasts.", false);
                    else
                        this.outputText("She really isn't that bad to you, is she?  You sigh and nuzzle against her jiggly love-pillows.", false);
                    this.outputText("  Eventually she pulls you back and kisses you on the lips.\n\n", false);
                    this.outputText("Tamani offers you a canteen, and you readily accept it, thirsty after such a physics-shattering orgasm.  The water is cold and satisfying.  You gulp it down in record time, chugging and guzzling until the container empties.  Satisfied, you lie back down.  The pleasure is short-lived, short-circuited by the realization that the water you just drank had a tangy after-taste.  You try to glare at ", false);
                    if (this.flags[kFLAGS_1.kFLAGS.TAMANI_TIMES_HYPNOTISED] > 10)
                        this.outputText("your wife", false);
                    else
                        this.outputText("Tamani", false);
                    this.outputText(" in anger, but your head feels all numb, and looking over at her makes the world spin dizzily.\n\n", false);
                    this.outputText("Pink haze crowds away your thoughts as your glare melts away into dopey confusion.  Tamani giggles and says, \"<i>", false);
                    //(Done before)
                    if (this.flags[kFLAGS_1.kFLAGS.TAMANI_TIMES_HYPNOTISED] > 0)
                        this.outputText("Don't you remember the last time we did this?  Of course not.</i>\"  Your hot goblin wife gestures at your suddenly swollen and erect " + this.cockDescript(0) + ", and continues, \"<i>Your dick remembers my special potion though.  Now, let's get back to teaching that wonderful cum-spout of yours how to behave around its wife and mistress.</i>\"\n\n", false);
                    //(Not Done Before)
                    else
                        this.outputText("I mixed a special potion in that drink.   It shuts down all those pesky thoughts so you'll listen to your wonderful wife and let her tell you how to think and feel.</i>\"  She strokes your partially softened " + Appearance_1.Appearance.cockNoun(CockTypesEnum_1.CockTypesEnum.HUMAN) + ", giggling as it hardens for her, \"<i>You won't remember what Tamani tells you once it wears off, but your dick won't ever forget.</i>\"\n\n", false);
                    this.outputText("Tamani slides her jiggling body overtop of you, placing her sopping wet pussy directly over-top of your " + this.cockDescript(0) + ".  The warm wet fluids of her desire slowly drip down onto you until your entire surface is coated in her clear feminine-drool and the entire area smells like her cunt.  She shivers and looks into your eyes, smiling at your mindless expression as she lectures, \"<i>Feel how hard your dick is?  That's because it smells my hungry, wet pussy.  It knows that it wants to cum for my pussy.  Your cock wants nothing more than to touch my cunt, worship it and bathe it with cum.</i>\"\n\n", false);
                    this.outputText("She lets her pink-lipped entrance touch you at last, gliding it up and down your length.  You drool on yourself as she reaches your tip, leans back, and displays her glistening entrance to you as she talks, \"<i>This is what you want, what you need.   Just looking at it makes you hot and ready to fuck.  One glance and all your worries melt into arousal and desire to please your goblin wife.</i>\"\n\n", false);
                    this.outputText("She's completely right.  You're past truly comprehending words, all you know is how hot your wife is making your cock and had bad it wants to cum in her.   Tamani smirks knowingly and begins sliding herself along the sensitive shaft again, slowly bringing you closer to an inevitable orgasm with her glorious vagina.  She leans over and whispers, \"<i>You'll be a good obedient husband and fuck your wife, won't you?  That's a husband's duty – to worship his wife's beautiful pussy, bathe it in semen, and be obedient in her presence.</i>\"\n\n", false);
                    this.outputText("The words she's saying stop mattering.  All that matters is how much a slave your cock is to that wonderful, wet gash, and how great it feels to give yourself over to it.  Your spunk-hungry wife never shuts up, and you just lie there, listening placidly, contentedly twitching against her as orgasm approaches.  A happy smile spreads over your face as you feel your ", false);
                    if (this.player.balls > 0)
                        this.outputText("balls", false);
                    else
                        this.outputText("groin", false);
                    this.outputText(" churning with lust and desire, ready to give life to another batch of daughters for your mistress.  ", false);
                    if (this.flags[kFLAGS_1.kFLAGS.TAMANI_TIMES_HYPNOTISED] < 10)
                        this.outputText("'Wait... wife... mistress?' your mind wonders, rejecting the foreign thoughts.  You look up at Tamani, confused for a moment", false);
                    else
                        this.outputText("Yes, that sounds so right – Tamani is your wife, and it's your husbandly duty to keep her pregnant.  You dwell on that for a moment", false);
                    this.outputText(", until an orgasm wracks your body and derails your train of thought, drowning it in a sea of pleasure.  She moans and slides down, pressing her entrance against your urethra as your internal muscles clench, pumping thick spurts into the goblin's womb.  A new-found sense of satisfaction and pleasure spreads through you.  It feels so good to knock Tamani up that your orgasm drags on forever, until you feel empty and exhausted.   Looking back, you realize just how much more pleasurable her box is in comparison to the other holes you've tasting in your travels, even her daughter's.  As Tamani rises up off of you, dripping with cum, the memories of everything but the sex slowly slip away, leaving behind happiness and anticipation of your next chance to fill her.\n\n", false);
                    this.outputText("Your mistress steps away, swaying her more-than ample hips from side to side as she saunters off.  You shake your head, feeling a little out of sorts, but before you get a chance to puzzle it out, the exhaustion of the encounter overwhelms you, blacking you out.", false);
                    //knock up tamani chance
                    kGAMECLASS_1.kGAMECLASS.forest.tamaniScene.tamaniKnockUp();
                    //increase hypno value
                    this.flags[kFLAGS_1.kFLAGS.TAMANI_TIMES_HYPNOTISED]++;
                }
            }
            //knock bitches up, slight libido gain, slight strength/toughness loss.
            this.player.orgasm();
            this.dynStats("str", -.5, "int", -.5, "lib", 1, "cor", 1);
            if (TamainsDaughtersScene.tamaniPresent)
                kGAMECLASS_1.kGAMECLASS.forest.tamaniScene.tamaniKnockUp(); //If she wasn't pregnant she will be now
            this.knockUpDaughters();
            if (this.getGame().inCombat)
                this.cleanupAfterCombat();
            else
                this.doNext(this.camp.returnToCampUseFourHours);
        }
        //[Lose Combat, Get Your Dick DRAINED]
        tamaniDaughtersCombatLossDrain() {
            this.spriteSelect(57);
            this.flags[kFLAGS_1.kFLAGS.TIMES_FUCKED_TAMANIS_DAUGHTERS]++;
            this.outputText("", true);
            //Vars
            var cocks = this.player.totalCocks();
            // var daughters: number = Math.floor(this.flags[kFLAGS.TAMANI_NUMBER_OF_DAUGHTERS] / 2);
            this.outputText("Your efforts to resist were in vain – there's simply too many of your slutty daughters to fight off.  The crowd flows over your ", false);
            if (this.player.HP < 1)
                this.outputText("defeated", false);
            else
                this.outputText("lust weakened", false);
            this.outputText(" form, pulling you off your feet and carrying the whole of your body off.  ", false);
            if (this.player.lust > 99) {
                this.outputText("It doesn't bother you too much... they keep ", false);
                if (this.player.balls > 0)
                    this.outputText("fondling your balls and ", false);
                this.outputText("stroking your shaft to keep you nice and excited, squirming helplessly with desire.", false);
            }
            else
                this.outputText("Your abused body slips in and out of consciousness, but the crowd applies salves as they travel to slowly invigorate your form.  Their hands keep touching and stroking you, and despite your mighty efforts to resist, you find yourself aroused and willing in short order.", false);
            this.outputText("\n\n", false);
            this.outputText("Perhaps an hour later, you're pulled into a cave.   Daylight fades away, replaced by the flickering light cast by a few torches and candles.  Your daughters are giggling and gossiping as they parade you through their subterranean lair, taking you ever-deeper.   An indeterminate amount of time later, you hear a door opening and are pulled through an entryway into what passes for a room.  You pant and moan as one of the tallest of Tamani's brood does her best to fellate ", false);
            if (cocks > 1)
                this.outputText("one of ", false);
            this.outputText("your " + this.multiCockDescriptLight() + ", keeping your more than turned on enough to go along with whatever they have planned.\n\n", false);
            //(regular lower body)
            if (this.player.lowerBody != appearanceDefs_1.LOWER_BODY_TYPE_CENTAUR) {
                this.outputText("The hands holding you slowly lower you into a comfortable feeling chair, securing your " + this.player.legs() + " into tightly bound stirrups.  A moment later, your hands are strapped into equally firm cuffs.  By this point, your lust-dulled mind has begun to worry, and you start to struggle, but binding leather straps are passed over your chest, midsection, and upper thighs, then tightened against the chair to completely restrain you.  Perhaps the only ", false);
                if (cocks > 1)
                    this.outputText(" things not restrained are your " + this.multiCockDescriptLight() + ", standing at attention despite, or perhaps because of, your predicament.\n\n", false);
                else
                    this.outputText(" thing not restrained is your " + this.multiCockDescriptLight() + ", standing at attention despite, or perhaps because of, your predicament.\n\n", false);
            }
            //(Shit taurs go!)
            else {
                this.outputText("The hands holding you slowly lower you down onto your back, guiding you into a combination chair and harness designed to accommodate a centuar's size and shape.  Before you know it, straps secure your " + this.player.legs() + " into tightly bound restraints.  A moment later your, hands are strapped into equally firm cuffs.  By this point, your lust-dulled mind has begun to worry, and you start to struggle, but binding leather straps are passed over your chest, midsection, and hindquarters, then tightened against the chair to completely restrain you.  Perhaps the only ", false);
                if (cocks > 1)
                    this.outputText(" things not restrained are your " + this.multiCockDescriptLight() + ", standing at attention despite, or perhaps because of, your predicament.\n\n", false);
                else
                    this.outputText(" thing not restrained is your " + this.multiCockDescriptLight() + ", standing at attention despite, or perhaps because of, your predicament.\n\n", false);
            }
            this.outputText("A goblin with lustrous blue hair pulls a lever on the side of the chair, shifting your position to further expose you.  She assures, ", false);
            if (this.flags[kFLAGS_1.kFLAGS.UNKNOWN_FLAG_NUMBER_00058] == 0)
                this.outputText("\"<i>Stop worrying.  I invented this while I was waiting on mom to bring me back more of your cum, just in case we ever got our hands on you.  I promise, after you've had a taste of my chair you'll never want to leave.</i>\"\n\n", false);
            else
                this.outputText("\"<i>Stop worrying!  We both know you love my little love-seat.  Just lie back and you'll be cumming too hard to care before long.</i>\"\n\n", false);
            this.outputText("You hear a commotion to the side and crane your head to watch.  There's a crowd of the girls clustered around a machine.   It's about the size of a large dresser or cabinet, only instead of holding clothes it's covered in knobs, levers, and various mechanical dials.  A goblin with light blue, almost silvery hair looks back at you and blows you a kiss while she pulls a lever.  A mechanical whirring noise fills the room, emanating from the ceiling.  You tilt your head back and look up, and see a massive metal bulb descending from the ceiling.\n\n", false);
            this.outputText("The goblin-made device is clearly sexual in nature.  Dozens of openings cover the bottom surface, and inside each one is a some kind of pink-lined hole, dripping with lubricants.  Most intriguing of all, you realize that the different holes all have different shapes, patterns, and sizes.  Some are huge, resembling something that would be at home between a monster's legs, and others are tiny, practically elf-like in appearance.   The bulb pauses just over your crotch, and a few snickering, green skanks guide " + this.sMultiCockDesc() + " into a perfectly sized hole.\n\n", false);
            this.outputText("You shiver as your manhood", false);
            if (cocks > 1)
                this.outputText("s are", false);
            else
                this.outputText(" is", false);
            this.outputText(" totally encapsulated within ");
            if (cocks == 1)
                this.outputText("a ");
            this.outputText("wet orifice", false);
            if (cocks > 1)
                this.outputText("s", false);
            this.outputText(".  They're so cold that you shiver involuntary against your restraints.  The blue-haired girl growls, \"<i>Hey bitch!  Crank the fuckin' machine up before you make Dad's dick", false);
            if (cocks > 1)
                this.outputText("s", false);
            this.outputText(" wilt!</i>\"\n\n", false);
            this.outputText("The machinery's humming gets louder as an unseen goblin does as she is told.  Noisy, wet suckling fills the room as the dozens of artificial mouths activate.  The wet, slimy substance encapsulating you immediately heats until it feels as warm as a maiden's love, and a gentle suction pulls on ", false);
            if (cocks > 1)
                this.outputText("each of ", false);
            this.outputText("your " + this.multiCockDescriptLight() + " until it feels much harder and thicker than normal.  You stifle an involuntary groan, but fail to conceal your lust-filled pants from your audience.   A daring girl leaps onto your ", false);
            if (this.player.biggestTitSize() < 1)
                this.outputText("chest", false);
            else
                this.outputText(this.allBreastsDescript(), false);
            this.outputText(" and shoves a lactating nipple into your mouth, commanding, \"<i>Drink up, the more fluid you have the more baby batter you can cook up for us!</i>\"\n\n", false);
            this.outputText("Unable to fight back in any way, you shrug and begin suckling the purplish nipple, tasting the creamy goblin milk as it easily fills your mouth.  You gulp it down, slowly relaxing between the mechanized cock-sucking and gentle breast-feeding.  Your daughter was right, it's almost like paradise. Unfortunately, the pleasure is interrupted by something probing at your backside.  Unable to look with your mouth full of delicious tit, you can only gurgle and dribble in protest as a lubricated tube is inserted into your " + this.assholeDescript() + ".\n\n", false);
            this.outputText("The familiar voice of the machine's inventor whispers, \"<i>", false);
            if (this.flags[kFLAGS_1.kFLAGS.UNKNOWN_FLAG_NUMBER_00058] == 0)
                this.outputText("Time for your medicine!  We need you to cum enough for each of us, and maybe have a little left over to play with, so suck up the medicine, okay?  Just relax and let it fill you so that you give us all that yummy cummy!</i>\"\n\n", false);
            else
                this.outputText("Relax Dad, we're just giving you your cummy medicine.  I know you're a sexy, virile " + this.player.mf("stud", "slut") + "and all, but take your medicine and you'll have more than enough cum for us!</i>\"\n\n", false);
            this.outputText("You blush, ", false);
            //EXHIBITIONISTZ
            if (this.flags[kFLAGS_1.kFLAGS.PC_FETISH] > 0)
                this.outputText("unimaginably turned on by being used and abused by such machinery in front of an audience of your own horny children.", false);
            else if (this.player.cor > 60)
                this.outputText("turned on by being milked in such an obscene way.", false);
            else
                this.outputText("horrified at the situation but unable to resist arousal as you're constantly sucked and pleasured.", false);
            this.outputText("\n\n", false);
            this.outputText("A trickle of warm fluid flows into you, and immediately your skin tingles, burning with heat and need.  ", false);
            if (this.player.balls > 0)
                this.outputText("Your balls tighten inside your sack and swell up like sponges, slowly increasing in size in time with your desire.", false);
            else
                this.outputText("Your body feels tight and needy, your gut clenching as your body adjusts to the drugs it's absorbing so readily through your " + this.assholeDescript() + ".", false);
            this.outputText("  The suckling pleasure around ", false);
            if (cocks > 1)
                this.outputText("each of ", false);
            this.outputText("your " + this.multiCockDescriptLight() + " seems to slowly increase as more of the drugs are absorbed by your body, until escaping the straps for your freedom is longer a concern.   Now all that matters is getting free so that you can fuck ");
            if (cocks == 1)
                this.outputText("that");
            else
                this.outputText("those");
            this.outputText(" mechanical hole", false);
            if (cocks > 1)
                this.outputText("s", false);
            this.outputText(" until you feel that wonderful, delicious release that you crave.\n\n", false);
            this.outputText("The goblins, upon seeing your change in demeanor, begin smiling to one another and congratulating each other on their hard work.  The girl at the console twists a few more levers and the warmth inside you seems to double as more drugs are forced into your captive frame.  You start " + this.player.mf("laughing", "giggling") + ", the narcotics and pleasure overwhelming your thought processes, leaving you feeling like you're floating in heaven.  To anyone watching, you're panting and moaning in between the laughter, slobbering all over the milky goblin-tit in your mouth as your body begins squirting pre-cum into the cock-milker.\n\n", false);
            this.outputText("A few seconds away from your orgasm, the goblin running the machinery makes a few adjustments, and you feel the flow into your rectum growing stronger until you start to feel full and bloated.  Your body caves in to the pleasure, every inch of your skin tingling as you're forced to climax.  ", false);
            if (this.player.balls > 0)
                this.outputText("Straining and shaking, your " + this.ballsDescriptLight() + " clench against you, feeling tight as your body struggles to pump out the spooge they're producing.", false);
            else
                this.outputText("Straining and shaking , your body struggles through the orgasm as it tries to deal with all the cum your prostate and glands are putting out.", false);
            this.outputText("  The drugs and milking machines squish, suck, and whir noisily as you cum, flooding the tubes above the mechanical cunt-bulb with white.\n\n", false);
            this.outputText("The lactating green girl stops breast-feeding you and climbs off you, fed up that you're too busy moaning to properly suckle.  A few of the giggling goblins slap your face, laughing out loud when you fail to even register the blows.  The never-ending flow of orgasmic goop flooding out from ", false);
            if (cocks > 1)
                this.outputText("each of ", false);
            this.outputText("your " + this.multiCockDescriptLight() + " has your brain flooded with pleasure, blocking any other thoughts or feelings from arising from the swirling morass of fuck.\n\n", false);
            this.outputText("Another voice joins you in ecstatic moaning, echoing from the other side of the room.  The source is a curvy goblin with a hose rammed up her glistening snatch, buried to the hilt.  Her sisters are teasing her, opening and closing a valve on the machine, filling their sister up with short bursts of your copious cum.  She's moaning and fucking herself in desperation with the dildo-shaped tube-tip, but her brood-mates seem intent on staggering the flow of semen to prevent her from reaching orgasm.  It doesn't take more than a dozen seconds to fill her, and she's pulled off, crying and pouting about how she wasn't done.  The next girl steps in line, rams the juice-coated dispenser inside herself, and gets ready to become a mother...\n\n", false);
            this.outputText("Trapped in a constant orgasm by cruel machinery and a steady flow of specially tailored drugs, you start to smile uncontrollably.  True, you're utterly incapable of thinking by this point, but your body and mind are too pleased with the situation not to grin.  The situation in the corner of the scene repeats over and over as your daughters enjoy your 'milk'.  After they've had their fill they fall on each other, filling the room with orgiastic moans as any sense of order is blown away by a tide of female lust.\n\n", false);
            //// Chance of tamani saving you
            if (this.flags[kFLAGS_1.kFLAGS.UNKNOWN_FLAG_NUMBER_00058] < 4) {
                this.outputText("You lose consciousness a few hours into the ordeal, still cumming with no sign of stopping, your body sustained by the fluids pouring into your backside.  The dreams are a constant barrage of sexual situations, flitting between various incongruous orgasmic acts.  Were you capable of comprehending your situation, you probably wouldn't even want to wake up.  Alas, the pleasure does end, and you settle into a deeper slumber.  A gentle rocking and the exhaustion of your crotch keep you snoring soundly for hours.\n\n", false);
                this.outputText("When you do wake, you find yourself alone in a forest clearing, with a note taped to your face:\n\n", false);
                if (this.flags[kFLAGS_1.kFLAGS.UNKNOWN_FLAG_NUMBER_00058] == 0) {
                    this.outputText("<i>   " + this.player.mf("Husband", "Baby") + ",\n", false);
                    this.outputText("      Do you have any idea how hard it is for Tamani to drag you out here all by herself?  If you weren't my favorite breeder, I would've let my daughters keep you.  Next time stand up to the little twats or Tamani might look the other way while you're being milked!\n\n", false);
                    this.outputText("   Hugs & cums,\n", false);
                    this.outputText("      -Tamani</i>", false);
                }
                else {
                    this.outputText("<i>   Seriously, it isn't funny.  " + this.player.mf("Man", "Toughen") + "-up and beat the little cunts silly instead of letting them force themselves on you.   Do you have any idea how hard it is to drag you out here?  If you weren't so much fun in the sack Tamani would be tempted to let her daughters keep you in their milker.   Maybe the girls would give Tamani a good cut of your production to join the operation?\n\n", false);
                    this.outputText("   Fucks & Love,\n", false);
                    this.outputText("      -Tamani</i>", false);
                }
                this.cleanupAfterCombat();
            }
            //(ALT – BAD END GATEWAY)
            else {
                this.outputText("You lose consciousness a few hours into the ordeal, still cumming with no sign of stopping, your body sustained by the fluids pouring into your backside.  The dreams you have are a constant barrage of sexual situations, flitting between various incongruous orgasmic acts.  Were you capable of comprehending your situation, you probably wouldn't even want to wake up.  Thankfully, your unwished desires become reality.", false);
                //[NEXT]
                this.doNext(this.tamaniDaughtersBadEndChoice);
            }
            //Needz variable to track how many times PC has been 'chaired'
            this.flags[kFLAGS_1.kFLAGS.UNKNOWN_FLAG_NUMBER_00058]++;
            //moar daughters, increment 'times milked' by the daughters.
            this.knockUpDaughters();
            //boost cum production slightly.
            this.player.cumMultiplier += .3;
            //increase libido, slight corruption, minus stregth and speed.
            this.player.orgasm();
            this.dynStats("str", -.5, "int", -.5, "lib", 1, "cor", 1);
        }
        tamaniDaughtersBadEndChoice() {
            this.spriteSelect(57);
            this.outputText("The next morning your unfocused eyes blink open, and you find yourself in the same situation as before.  Thankfully your orgasm has been allowed to end, though you still feel dopey and unfocused from whatever is flowing into you.  You manage to twist your head around to get a better look at the situation and discover a pair of IV's lodged in your arms.  Twisting your body, you realize you can still feel the drug-enema tube lodged in your " + this.assholeDescript() + ".  Oddly, it's hard to feel worried or concerned about the situation.\n\n", false);
            this.outputText("A goblin leans over your face and hugs her jiggling breasts against you as she gushes, \"<i>Thank you so much daddy!   You probably can't see with all the straps holding you down, but you got me and my sisters totally pregnant.  There's even enough of your spunk left over to knock us up a few more times!  We decided that even though we don't need you to cum right now, we'd let you keep coming forever.  Do you want that?</i>\"\n\n", false);
            if (this.player.statusAffectv1(StatusAffects_1.StatusAffects.Exgartuan) == 1)
                this.outputText("Exgartuan barks, \"<i>Hell yes I do!</i>\" but the goblin only smirks down for a moment before looking back at you.\n\n", false);
            this.outputText("(Options: Yes, No, I'd rather fill your cunts individually & personally)", false);
            this.simpleChoices("Yes", this.tamaniDaughtersYesBadEndMePlease, "No", this.tamaniDaughtersDeclineBadEnd, "Individual", this.tamanisDaughtersFillIndividuallyBADEND, "", undefined, "", undefined);
        }
        //[Yes]
        tamaniDaughtersYesBadEndMePlease() {
            this.spriteSelect(57);
            this.outputText("", true);
            this.outputText("\"<i>Wonderful!</i>\" cries the excited pregnant slut.   She gives you a quick peck on the cheek as she prances back over to the machine.  You brace yourself in anticipation, eager to lose yourself to an eternal orgasm.  A switch clicks, and a dial whirs as it's turned up to the maximum.  The fluids pumping into your backside and directly into your veins suddenly jump in pressure, stinging painfully for a moment before the pleasure returns.  Your eyes slowly roll back, your jaw goes slack, and your " + this.multiCockDescriptLight() + " spew", false);
            if (this.player.totalCocks() == 1)
                this.outputText("s", false);
            this.outputText(" cum into the tubes.\n\n", false);
            if (this.player.statusAffectv1(StatusAffects_1.StatusAffects.Exgartuan) == 1)
                this.outputText("Exgartuan moans, \"<i>Ohhhhhh yeeeeaaaaahhhh...</i>\" before slipping into silence.\n\n", false);
            this.outputText("You spend the rest of your life trapped in orgasm, constantly feeding the growth of what becomes the biggest goblin tribe in all the land of Mareth.  Even when every single one of them is pregnant, they let you enjoy your reward.  Over time your capacity for memory, morals, or anything other feeling besides pleasure dwindles.  Trapped in a heaven of your own choosing, you gave up everything that you were for never-ending bliss.", false);
            this.getGame().gameOver();
        }
        //[NO]
        tamaniDaughtersDeclineBadEnd() {
            this.spriteSelect(57);
            this.outputText("", true);
            this.outputText("\"<i>Seriously!?</i>\" exclaims the pregnant slut, \"<i>What kind of person wouldn't want to cum all the time?  Fuck, just the idea of it is making me drip!</i>\"\n\n", false);
            this.outputText("She sighs, \"<i>Whatever, Dad.  Next time we need you I'm sure you'll remember how much fun this was and come running home.</i>\"\n\n", false);
            this.outputText("The restraints pop off you at once, and you pull the tubes and IV's from your skin.  You grunt with discomfort and remove the final tube from your " + this.assholeDescript() + ".  Climbing off the table, your " + this.player.legs() + " wobble unsteadily as you try to get your balance.   The goblin says, \"<i>Go on home dad before I strap you back down and teach you to enjoy my gifts!</i>\"\n\n", false);
            this.outputText("You sheepishly leave the cave and head home, glad to be out of there before your growing tribe of daughters decides to milk you forever.\n\n", false);
            this.cleanupAfterCombat();
        }
        //[Rather Fill Individually]
        tamanisDaughtersFillIndividuallyBADEND() {
            this.spriteSelect(57);
            this.outputText("", true);
            this.outputText("\"<i>Really?</i>\" asks the pregnant goblin before she exclaims, \"<i>You do love us!  Oh Dad, once mom comes home will you fuck all of us?  I want to feel you make love to my drippy, pregnant pussy while she watches!</i>\"\n\n", false);
            this.outputText("You agree to do just that, ", false);
            if (this.player.cockTotal() > 1)
                this.outputText("each of ", false);
            this.outputText("your " + this.multiCockDescriptLight() + " rising to full hardness in anticipation.  Your daughter pats ", false);
            if (this.player.cockTotal() > 1)
                this.outputText("one of them", false);
            else
                this.outputText("it", false);
            this.outputText(" as if it were a person and smiles as she pops the restraints from your chair.  She helps you as you stagger up to your " + this.player.feet() + ", though the feeling of her hand stroking ", false);
            if (this.player.cockTotal() > 1)
                this.outputText("a", false);
            else
                this.outputText("your", false);
            this.outputText(" " + this.cockDescript(0) + " doesn't make it easy.  The pair of you journey deeper into the caves to a massive antechamber filled with pregnant goblins.  Some are eating, others are sewing at tables, tinkering with machinery, or fiddling with alchemical equipment.  All of them turn to look at you as you enter.\n\n", false);
            this.outputText("The well endowed goblin next to you announces, \"<i>Dad has decided that he will willingly stay here and fuck each of us as often as we want.  Let's get him some succubi's delight, I want mom to watch him fill me when she gets home!</i>\"\n\n", false);
            this.outputText("A cheer reverberates off the ceiling as your daughters crowd around you, pressing their buxom chests and rounded backsides against you.  You're led to a secluded corner and fed food and strange drinks, while being kept incredibly horny for hours as you await Tamani's return.  True to her word, your daughter is on top of you in a flash once the clan's matriarch enters the room, and you're helpless to do anything but submit to her velvet pussy.  You cum loudly and messily, creaming her walls and flooding the area around you with spunk while Tamani is forced to watch with a jealous look on her face.\n\n", false);
            this.outputText("The rest of your life continues on in a similar fashion – you're kept happily fed, full, and pleasured by your hundreds of pregnant wives as your harem grows.  There's no shortage of sex, and no shortage of desire thanks to your wives' alchemical talents.  Within the span of a month you've utterly forgotten about your quest – it's hard to focus on anything but cuddling with your wives and daughters while you await your next fuck.", false);
            this.getGame().gameOver();
        }
        //[Lose to Daughters With Tamani There]
        loseToDaughtersWithTamaniThere() {
            this.spriteSelect(57);
            this.outputText("", true);
            this.flags[kFLAGS_1.kFLAGS.TIMES_FUCKED_TAMANIS_DAUGHTERS]++;
            //Find a dick that fits
            var primary = this.player.cockThatFits(50);
            this.outputText("Your attempts to resist prove to be in vain, as your daughters and their extra-curvy mother have completely defeated you.  ", false);
            if (this.player.HP < 1)
                this.outputText("Lying in the dirt, too hurt to fight back, you can only tremble in anticipation of what pleasures they're going to force upon you this time.", false);
            else {
                this.outputText("Lying back in the dirt, you're too hard to fight back.  You stroke ", false);
                if (this.player.totalCocks() > 1)
                    this.outputText("one of ", false);
                this.outputText("your trembling " + this.multiCockDescriptLight() + ", feeling it leak pre-cum in anticipation of getting to knock up some of these beautiful curvy women.", false);
            }
            this.outputText("  Tamani pushes her way to the front of the pack, her daughters looking disappointed but yielding to their mother's authority for the time being.  She walks over to you, stepping over your fallen form and uncorking a a potion.  You grunt as she drops her jiggling ass down on your ", false);
            if (this.player.biggestTitSize() < 1)
                this.outputText("chest", false);
            else
                this.outputText(this.allBreastsDescript(), false);
            this.outputText(" and says, \"<i>Now husband, you've let your daughters beat you fair and square, so now it's time to take your medicine and give them their reward for becoming so strong.</i>\"\n\n", false);
            this.outputText("The potion's bottle becomes a plug for your mouth as Tamani forces your mouth open.  She tips it back and massages your throat with one hand, forcing you to gulp down the fluid.  ", false);
            if (this.flags[kFLAGS_1.kFLAGS.TAMANI_TIMES_HYPNOTISED] < 2)
                this.outputText("It tastes syrupy-sweet", false);
            else
                this.outputText("It has a familiar taste that you can't quite place", false);
            this.outputText(" and nearly makes you gag, but Tamani makes sure you drink down every drop.  An immediate numbness spreads through your body, starting at your fingertips.  It slowly crawls up your arms and then starts at your " + this.player.feet() + " as well.  In no time it's hard to move, and it becomes hard to think.  Your mind feels almost like its full of cotton-candy, with fuzzy pink stuff constantly getting in the way of your thoughts.\n\n", false);
            this.outputText("Tamani rubs your temples soothingly as your " + this.player.face() + " creases with worry and reassures you, \"<i>Don't worry, this will wear off soon.  This drug just shuts down your mind so it'll be nice and open to suggestion.  You can feel how hard it is to think, can't you?  Every time you muster up a thought it gets caught up in the little pink clouds and whisked away.  Don't bother, just relax and listen to Tamani's voice.</i>\"\n\n", false);
            this.outputText("She reaches into your " + this.player.armorName + " to rub ", false);
            if (this.player.totalCocks() > 1)
                this.outputText("one of ", false);
            this.outputText("your " + this.multiCockDescriptLight() + ", casually stroking the hard member as she pivots around to explain, \"<i>You get so hard for Mistress Tamani, don't you?  ", false);
            if (this.flags[kFLAGS_1.kFLAGS.TAMANI_TIMES_HYPNOTISED] > 10)
                this.outputText("Your body must remember how much it loves being my pussy-hungry husband.", false);
            else
                this.outputText("That's because your body knows how hot and moist Tamani's pussy is and how much you want to service it.", false);
            this.outputText("</i>\"\n\n", false);
            this.outputText("Of course she's right – you can feel her wetness on your chest and you want to bury your face in it while she strokes you.  Tamani watches your eyes and turns to give you a better view, presenting her snatch while she leans back to stroke you.  She titters, \"<i>Yes, get a good look at your wife's cunt.  It looks so delicious, so warm, so inviting.  You want nothing more than to bury your cock or face into it, don't you?  That's because it's your wife's cunt, and you're a good husband.</i>\"\n\n", false);
            this.outputText("Her hand starts stroking you faster and her juices start to drip down the sides of your torso", false);
            if (this.player.skinType == appearanceDefs_1.SKIN_TYPE_FUR)
                this.outputText(", matting your " + this.player.hairColor + " fur", false);
            this.outputText(" as she continues ", false);
            if (this.flags[kFLAGS_1.kFLAGS.TAMANI_TIMES_HYPNOTISED] < 10)
                this.outputText("filling your mind with truths", false);
            else
                this.outputText("reinforcing your image of yourself as an obedient husband", false);
            this.outputText(", \"<i>It feels so good to service your wife's aching pussy and fill it full of cum.  Your cock knows it and wants it so much that any time you see your wife, Tamani, you'll get so hard and hot for her that you'll forget about anything but worshipping her cunt, won't you?</i>\"\n\n", false);
            this.outputText("You start nodding while she talks, your eyes never leaving the glistening fuck-hole a few inches away.  Your wife is so smart, and though you stop hearing the words, you know everything she's telling you is the truth.  The smooth skin of her hands strokes you perfectly, only getting better as they become slick with pre-cum.  Tamani's voice rises, taking on a tone of command, and then you're squirting obediently for her – a good husband.\n\n", false);
            if (this.player.cumQ() < 50)
                this.outputText("Cum splatters and drips down Tamani's hand, forming a tiny puddle on your chest.", false);
            //(ALT)
            else if (this.player.cumQ() < 250)
                this.outputText("Cum splatters over Tamani's hand and forearm, even hitting her ass and hips as you form a thick puddle over your torso that drips to the ground.", false);
            //(ALT2)
            else if (this.player.cumQ() < 600)
                this.outputText("Cum splatters out in thick waves, soaking Tamani's hand, forearm, and hips with thick puddles of the stuff.  It pools on your belly for a moment, then rolls off you, forming a small pool on the ground as you keep squirting.", false);
            //(ALT3)
            else {
                this.outputText("A massive wave of cum erupts from you, soaking Tamani from the shoulders to the knees in thick goop.  The next wave comes out with less force, pooling your belly before rolling off to puddle on the ground.   The puddle grows into a thick pool of the stuff as your orgasm drags on.", false);
                if (this.player.cumQ() >= 2000)
                    this.outputText("  Eventually it stops, but by then the pool is huge and nearly five inches deep.", false);
            }
            this.outputText("  Pride wells up in you when you realize what a good husband you've been.  Tamani pats you on the head, and whispers, \"<i>Good job lover</i>\" as the cobwebs slowly clear away.   You remember your wife pouring a lust draft down your throat and giving you the 69 of a lifetime, but now it's time to be a good husband and father and help your daughters out too.   The girls clamber forwards, giggling to each other excitedly as they remove what little garments they have.\n\n", false);
            this.outputText("You welcome them into your arms as Tamani steps away with a strange glint in her eye, rubbing the seed on her hand into her snatch.  Potions are pressed to your lips, and you happily accept your daughters' gifts, guzzling them happily and taking the time to compliment them on their alchemical skills while ", false);
            if (this.player.cockTotal() > 1)
                this.outputText("each of ", false);
            this.outputText("your " + this.multiCockDescriptLight() + " grows back to full erectness and trembles with desire, ready to seed a womb.  The girls ", false);
            if (this.player.cockTotal() == 1)
                this.outputText("grab your " + this.multiCockDescriptLight() + " and stroke it with long slow strokes, just like their mother.  Unlike her, they don't seem content to wait, and in seconds a slippery gash is stretching to accommodate your cock-head.\n\n", false);
            else
                this.outputText("each grab one of your " + this.multiCockDescriptLight() + " and stroke it with long slow strokes, just like their mother.  Unlike her, they don't seem content to wait, and in seconds a slippery gash is stretching to accommodate each cock-tip.\n\n", false);
            //(TOO BIG)
            if (primary < 0) {
                this.outputText("Sadly, you're just too big to properly impregnate your daughter, and a stab of worry that you might be a bad father lances through you.  ", false);
                if (this.player.cockTotal() == 1) {
                    this.outputText("Thankfully your daughter doesn't seem to mind.  She switches to resume stroking you, though the wet tightness of goblin cunt stretches around as much of your tip as it can.  Between the drugs, the sexy girl on top of you, and your desire to be a good patriarch, they have no problem getting you off into their waiting, fertile wombs.  You cry out and twitch, seeding your daughter's womb with spunk, treating her just like her mother now that she's all grown up.", false);
                    if (this.player.cumQ() > 700)
                        this.outputText("It gets everywhere as her womb fails to contain your massive load, even after you've bloated her belly with the stuff.", false);
                    if (this.player.cumQ() > 2000)
                        this.outputText("After a few more seconds the puddle from before gets even deeper, and your daughters kindly prop up your head to keep you from drowning in the jism pool.", false);
                }
                else {
                    this.outputText("Thankfully your daughters don't seem to mind.  They switch to resume stroking you, though the wet tightness of goblin cunts stretches around as much of your tips it can.  Between the drugs, the sexy girls on top of you, and your desire to be a good patriarch, they have no problem getting you off into their waiting, fertile wombs.  You cry out and twitch, seeding your daughters' womb with spunk, treating them just like their mother now that they're all grown up.", false);
                    if (this.player.cumQ() > 700)
                        this.outputText("It gets everywhere as their wombs fail to contain your massive load, even after you've bloated their bellies with the stuff.", false);
                    if (this.player.cumQ() > 2000)
                        this.outputText("After a few more seconds the puddle from before gets even deeper, and your daughters kindly prop up your head to keep you from drowning in the jism pool.", false);
                }
                this.outputText("\n\n", false);
                this.outputText("Drained from two amazing orgasms, you start to nod off, but you're happy knowing they'll keep you hard and cumming until every empty pussy is full of thick baby-making cream.", false);
            }
            //(FITS)
            else {
                this.outputText("Thankfully, the hungry goblin twat is able to devour your " + this.cockDescript(0) + " with ease.  Those pliable, fluid-slicked cunt-walls clench ever-so-tightly around you", false);
                if (this.player.biggestCockArea() < 30)
                    this.outputText(" in spite of the large sizes they usually handle.", false);
                else
                    this.outputText("r large size.", false);
                if (this.player.totalCocks() > 1) {
                    this.outputText("  You grunt happily as your daughters begin to slide up and down your lengths, moaning lewdly with every wet squelch that escapes their drooling pussies.  Thanks to the drugs, the writhing form of your sexy daughters, and the desire to be a good patriarch for your family, you get off in no time.  You cry out and twitch, seeding your daughters' womb with spunk, treating them just like their mother now that they're all grown up.", false);
                    if (this.player.cumQ() > 700)
                        this.outputText("  It gets everywhere as their wombs fail to contain your massive load, even after you've bloated their bellies with the stuff.", false);
                    if (this.player.cumQ() > 2000)
                        this.outputText("  After a few more seconds the puddle from before gets even deeper, and your daughters kindly prop up your head to keep you from drowning in the jism pool.", false);
                }
                else {
                    this.outputText(" You grunt happily as your daughter begins to slide up and down your length, moaning lewdly with every wet squelch that escapes her drooling pussy.  Thanks to the drugs, the writhing form of your sexy daughter, and the desire to be a good patriarch for your family, you get off in no time.  You cry out and twitch, seeding your daughter's womb with spunk, treating her just like her mother now that she's all grown up.", false);
                    if (this.player.cumQ() > 700)
                        this.outputText("  It gets everywhere as her womb fails to contain your massive load, even after you've bloated her belly with the stuff.", false);
                    if (this.player.cumQ() > 2000)
                        this.outputText("  After a few more seconds the puddle from before gets even deeper, and your daughters kindly prop up your head to keep you from drowning in the jism pool.", false);
                }
                this.outputText("\n\n", false);
                this.outputText("Drained from two amazing orgasms, you start to nod off, but you're happy knowing they'll keep you hard and cumming until every empty pussy is full of thick baby-making cream.", false);
            }
            //Chance of tamani pregnancy, chance of daughter preggers
            this.knockUpDaughters();
            kGAMECLASS_1.kGAMECLASS.forest.tamaniScene.tamaniKnockUp();
            this.flags[kFLAGS_1.kFLAGS.TAMANI_TIMES_HYPNOTISED]++;
            //daughter countdown reset. 
            this.player.orgasm();
            this.dynStats("str", -.5, "int", -.5, "lib", 1, "sen", 1, "cor", 1);
            if (this.getGame().inCombat)
                this.cleanupAfterCombat();
            else
                this.doNext(this.camp.returnToCampUseOneHour);
        }
        knockUpDaughters() {
            if (this.pregnancy.isPregnant)
                return;
            this.pregnancy.knockUpForce(PregnancyStore_1.PregnancyStore.PREGNANCY_PLAYER, 216); //Nine day long pregnancy, just like mom
            //Determine how many kids...
            this.flags[kFLAGS_1.kFLAGS.TAMANI_DAUGHTERS_PREGNANCY_COUNT] = 2;
            var cum = this.player.cumQ();
            //Breeder perk is awesome
            if (this.player.findPerk(PerkLib_1.PerkLib.MaraesGiftStud) >= 0)
                this.flags[kFLAGS_1.kFLAGS.TAMANI_DAUGHTERS_PREGNANCY_COUNT] += 3;
            if (cum >= 50 && TamainsDaughtersScene.rand(2) == 0)
                this.flags[kFLAGS_1.kFLAGS.TAMANI_DAUGHTERS_PREGNANCY_COUNT]++;
            if (cum >= 100 && TamainsDaughtersScene.rand(2) == 0)
                this.flags[kFLAGS_1.kFLAGS.TAMANI_DAUGHTERS_PREGNANCY_COUNT]++;
            if (cum >= 200 && TamainsDaughtersScene.rand(2) == 0)
                this.flags[kFLAGS_1.kFLAGS.TAMANI_DAUGHTERS_PREGNANCY_COUNT]++;
            if (cum >= 300 && TamainsDaughtersScene.rand(2) == 0)
                this.flags[kFLAGS_1.kFLAGS.TAMANI_DAUGHTERS_PREGNANCY_COUNT]++;
            if (cum >= 400 && TamainsDaughtersScene.rand(2) == 0)
                this.flags[kFLAGS_1.kFLAGS.TAMANI_DAUGHTERS_PREGNANCY_COUNT]++;
            if (cum >= 500 && TamainsDaughtersScene.rand(2) == 0)
                this.flags[kFLAGS_1.kFLAGS.TAMANI_DAUGHTERS_PREGNANCY_COUNT]++;
            if (cum >= 600 && TamainsDaughtersScene.rand(2) == 0)
                this.flags[kFLAGS_1.kFLAGS.TAMANI_DAUGHTERS_PREGNANCY_COUNT]++;
        }
        combatWinAgainstDaughters() {
            this.spriteSelect(57);
            if (this.monster.HP < 1) {
                this.outputText("You smile in satisfaction as " + this.monster.a + this.monster.short + " collapses, unable to continue fighting.", true);
                if (this.player.lust >= 33 && this.player.cockTotal() > 0) {
                    this.outputText("In spite of their injuries, they do try to present their bodies in as lewd a way as possible.  You could still fuck them, but things might get out of hand...\n\nDo you fuck them?", true);
                    this.doYesNo(this.fuckYoDaughtersHomie, this.cleanupAfterCombat);
                }
                else
                    this.cleanupAfterCombat();
                return;
            }
            else {
                this.outputText("You smile in satisfaction as your daughters collapse in upon themselves, devolving into a frenzied orgy.  It looks like they're too distracted to continue fighting.  They're putting on quite a show...\n\n", true);
                this.dynStats("lus", 5);
                if (this.player.lust >= 33 && this.player.cockTotal() > 0) {
                    this.outputText("You could still fuck them, but things might get out of hand...\n\nDo you fuck them?", false);
                    this.doYesNo(this.fuckYoDaughtersHomie, this.cleanupAfterCombat);
                }
                else
                    this.cleanupAfterCombat();
                return;
            }
        }
        loseToDaughters() {
            this.spriteSelect(57);
            if (this.player.lust > 99) {
                //worms r gross mmmmkay?
                if (this.player.findStatusAffect(StatusAffects_1.StatusAffects.Infested) >= 0) {
                    kGAMECLASS_1.kGAMECLASS.infestOrgasm();
                    this.outputText("\n\nThe goblins sigh and say, \"<i>Dad, that's just gross.  Don't get me wrong, we're still gonna have you knock us up, but I hate the feeling of those worms inside me.</i>\"", false);
                    this.player.orgasm();
                }
                this.outputText("\n\nYou give up, you're just too turned on by the sea of sexually charged deviants to resist them anymore.  You're ready to fuck them all.", false);
                if (this.player.cockTotal() == 0) {
                    this.outputText("The sexy sluts pout, \"<i>Why did you have to go and get rid of your dick!?</i>\" before something hits you in the head, HARD, knocking you out.", false);
                    this.cleanupAfterCombat();
                    return;
                }
                if (TamainsDaughtersScene.tamaniPresent) {
                    if (TamainsDaughtersScene.rand(2) == 0)
                        this.doNext(this.loseToDaughtersWithTamaniThere);
                    else
                        this.doNext(this.legTamanisDaughtersRAEPYou);
                    return;
                }
                else {
                    if (TamainsDaughtersScene.rand(2) == 0)
                        this.doNext(this.tamaniDaughtersCombatLossDrain);
                    else
                        this.doNext(this.legTamanisDaughtersRAEPYou);
                    return;
                }
            }
            //hp loss
            else {
                this.outputText("\n\nOverwhelmed by your wounds, you can't even try to stop the goblin horde...", false);
                if (this.player.cockTotal() == 0) {
                    this.outputText("The sexy sluts pout, \"<i>Why did you have to go and get rid of your dick!?</i>\" before something hits you in the head, HARD, knocking you out.", false);
                    this.cleanupAfterCombat();
                    return;
                }
                if (TamainsDaughtersScene.tamaniPresent) {
                    this.doNext(this.loseToDaughtersWithTamaniThere);
                    return;
                }
                else {
                    if (TamainsDaughtersScene.rand(2) == 0)
                        this.doNext(this.tamaniDaughtersCombatLossDrain);
                    else
                        this.doNext(this.legTamanisDaughtersRAEPYou);
                    return;
                }
            }
        }
    }
    //End of Interface Implementation
    TamainsDaughtersScene.tamaniPresent = false; //Used to communicate between this class and TamanisDaughters.as
    exports.TamainsDaughtersScene = TamainsDaughtersScene;
});
//# sourceMappingURL=TamanisDaughtersScene.js.map