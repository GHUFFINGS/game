import { kFLAGS } from "../../GlobalFlags/kFLAGS";
import { kGAMECLASS } from "../../GlobalFlags/kGAMECLASS";
import { PerkLib } from "../../PerkLib";
import { PregnancyStore } from "../../PregnancyStore";
import { StatusAffects } from "../../StatusAffects";
import { NPCAwareContent } from "./NPCAwareContent";

export class SophieBimbo extends NPCAwareContent {
    private get pregnancy(): PregnancyStore {
        return kGAMECLASS.sophieScene.pregnancy;
    } //Quick way to access sophie's pregnancyStore

    // VARS
    // 282	Sophie Bimbo Follower?
    // 283	Sophie Disabled Forever
    // 284	Has Ovi Event Procced?

    // const SOPHIE_HEAT_COUNTER: number = 737;
    // const SOPHIE_INCUBATION: number = 738;
    // const SOPHIE_BROACHED_SLEEP_WITH: number = 739;
    // const SOPHIE_ADULT_KID_COUNT: number = 740;
    // const SOPHIE_DAUGHTER_MATURITY_COUNTER: number = 741;
    // const SOPHIE_CAMP_EGG_COUNTDOWN: number = 742;
    // const SOPHIE_FAMILY_INCEST: number = 743;
    // const DAUGHTER_ONE_BIMBO: number = 750;
    // const DAUGHTER_TWO_BIMBO: number = 751;
    // const DAUGHTER_THREE_BIMBO: number = 752;
    // const DAUGHTER_FOUR_BIMBO: number = 753;
    // const TIMES_SOPHIE_AND_IZMA_FUCKED: number = 780;
    // const TOLD_SOPHIE_TO_IZMA: number = 781;

    /*Sophie TF Notes:
    DD tits become F, impairing flight to gliding at best.
    Pink feathers turn platinum blond and 'hair' feathers grow down to her ass.
    Lips plump slightly, and Sophie begins applying her lip gloss more generously.
    Hips widen and give her a swaying, hypnotic gait.
    Obviously makes her talk/sound like a bimbo, but somehow makes her lipnosis more effective. (backfire chance?)
    Fingernails stay nice and long.
    Chance of waking the PC by whispering how much they need to fuck her in their sleep, then sexing.
    Bimbo harpy pussy apparently tastes tangy with an undertone of sweet, almost peach-like flavor.
    */
    public sophieSprite(): void {
        if (
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00282] > 0 &&
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00283] == 0
        )
            this.spriteSelect(83);
        else this.spriteSelect(53);
    }

    public bimboSophie(): boolean {
        return (
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00282] > 0 &&
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00283] == 0 &&
            this.flags[kFLAGS.SOPHIE_DEBIMBOED] == 0
        );
    }

    public sophieIsInSeason(): boolean {
        return this.flags[kFLAGS.SOPHIE_HEAT_COUNTER] > 551 && !this.pregnancy.isPregnant;
    }

    public sophiePregChance(): void {
        if (this.flags[kFLAGS.FOLLOWER_AT_FARM_SOPHIE] != 0) return;

        // 25% + gradually increasing cumQ bonus
        if (SophieBimbo.rand(4) == 0 || this.player.cumQ() > SophieBimbo.rand(1000)) {
            this.pregnancy.knockUpForce(
                PregnancyStore.PREGNANCY_PLAYER,
                PregnancyStore.INCUBATION_HARPY
            );
        }
    }
    public sophieCapacity(): number {
        return 179;
    }

    // *Summary:  Sophie is defeated, give draft.
    public bimbotizeMeCaptainSophie(): void {
        this.sophieSprite();
        this.outputText("", true);
        this.player.consumeItem(this.consumables.BIMBOLQ);
        this.outputText("A wicked idea takes hold of you while you watch the harpy ", false);
        if (this.monster.lust > 99) this.outputText("touch herself", false);
        else this.outputText("squirm in the dirt around her nest", false);
        this.outputText(
            ".  Releasing the ties on one of your pouches, you reach inside to claim the contents.  You produce the bottle of bimbo liqueur with a flourish, swirling the potent fluid inside its prison as you approach the downed harpy matron; she looks up at you with dumb, ",
            false
        );
        if (this.monster.lust > 99) this.outputText("lust", false);
        else this.outputText("pain", false);
        this.outputText(
            "-glazed eyes, her beautiful but uncomprehending visage slack-jawed and empty.  It's a good look for her.\n\n",
            false
        );

        this.outputText(
            "The cork pops from the bottle's top with an easy tug, releasing a fine pink mist that reeks of alcohol, potent spices, and sweetness.  You hold Sophie's jaw in your hand and pull her mouth open, placing the bottle's lip upon the defeated slut's slack mouth.  Like this, she's almost perfect... almost.  You lift the back edge of the bottle higher, dribbling a flow of bimbolicious alcohol into Sophie's pliant, unresisting mouth.  She gulps as it hits her tongue, swaying back and forth dangerously while the magic starts to take effect.  You hold her fast and upend the rest of the liqueur directly into her throat.  The busty harpy shudders and shakes, sputtering a little bit with her eyes crossed.  Her convulsions grow so forceful that she wrenches out of your grip to flop about on the floor of her nest.\n\n",
            false
        );

        this.outputText(
            'Starting at her head, her flamingo-pink plumage brightens to an even more neon coloration.  It continually lightens until the blush utterly vanishes, a light, barely-blond hue fading into place in her feathery hair.  The same scene is repeated over her wings, legs, and feathery backside, girding her body in platinum pinions.  Fluffing softly, the changed feathers ruffle while Sophie\'s involuntary shudders slow to a stop.  She shakes her head and mutters, "<i>OOooh, wha... what did you give me?  So... hard to... think.</i>"\n\n',
            false
        );

        this.outputText(
            'You display the bottle\'s warning label to the harpy, waiting for her response.  She squints in confusion and pulls back, her heaving breasts jiggling and bouncing about.  "<i>What\'s that?  Some like, weird language or something?  I can\'t read it.</i>"  Sophie\'s brow knits in confusion - you can practically see the gears trying to turn behind her open, clueless eyes.  She taps at her chin, her arm brushing her suddenly-larger assets, once again setting her swelling bust to shaking.  "<i>Omigosh!  Are my titties getting bigger?</i>" she asks with a giggle.  "<i>They\'re so... jiggly and shaky!</i>"\n\n',
            false
        );

        this.outputText(
            "Looking down confirms her claims.  While the twin melons were definitely double-D's before, they've swollen up to an E-cup by now, and the blooming bosom shows no signs of stopping.  Before your eyes, Sophie's tits grow into a truly magnificent pair of breasts, shaking and rippling like bowls of jello.  Her nipples puff up and engorge, the nubs easily doubling in size and stretching out to nearly a full inch in their aroused state.  They redden as Sophie's creamy skin blushes pink, her flesh coloring from the pleasure of her chest's obscene growth.  Widening in panic and lust, Sophie's eyes glitter with half-formed tears as she wails, \"<i>I can't fly like thiiiis!</i>\"\n\n",
            false
        );

        this.outputText(
            "You chuckle and heft one of the harpy's weighty globes, marveling at the smooth softness of her heavy tit.\n\n",
            false
        );

        this.outputText('Sophie squeals, "<i>S-stop it!  It\'s s-s-sensitiiiive!</i>"\n\n', false);

        this.outputText(
            "Sighing, you rub your thumb across her areola, circling around the huge nipple before you give the long protrusion a hard flick.  The avian matron shivers and moans at that, arching her back to press the mammoth mounds further into your hands, forcing you back against the mountainside with their weight.  Protruding even more, her unyielding nips slide between your fingers.  Thankfully, they don't seem to be getting any bigger; while you're no tailor, you appraise them as at least F-cups now.  You idly massage the more-than-motherly melons, setting off a chorus of moans from the harpy's gold-glossed lips.  Her wide hips wiggle with sensuous need, the scent of horny harpy filling the air.  You must be doing something right.\n\n",
            false
        );

        this.outputText(
            'Sophie gasps and pulls back, turning about to place her hefty rump in front of your face.  The long tail-feathers tickle at you, but you brush the blond fluff aside with an irritated snort.  "<i>Y-you like, did this to me!  Whatever it is making me all... horny and slurpy and yummy and dumb and... mmmm... can we fuck?</i>" she accuses, losing her train of thought part way through her diatribe as juices begin to drip from her inflamed cunt-lips.\n\n',
            false
        );

        this.outputText(
            "You run a finger from the top of Sophie's box to the bottom, even stopping to slide the lubricated digit across her taint to circle her sensitive asshole.  She moans and bounces in place, her hips nearly blocking the light from your view when she presses back.  Did they get bigger too?  You pause to watch her hand-devouring ass-cheeks and confirm that they are, in fact, growing larger - just like her tits.  The plush pillow-butt rounds out, swelling larger.  You look down and note that her legs are moving apart as well, shifted wider by Sophie's changing body and expanding hips.\n\n",
            false
        );

        this.outputText(
            'Sophie giggles, "<i>Like, do you love my drippy pussy that much?  Gosh that\'s cute!  But why am I so horny and silly?</i>"  She giggles.  "<i>I don\'t get it.  My head\'s all light and floaty!  Not like before.</i>"  Her voice drops slightly as she struggles with herself.  "<i>So hard... hard to think.  Gotta... gotta... like, find someone to fuck!  Mmm, would you give me a lick?  Can\'t you feel how hot Momma Sophie\'s box is?  It like, needs a tongue to cool it down or something.</i>"\n\n',
            false
        );

        this.outputText(
            "The harpy's frothing gash smears over your nose and lips, trailing a fragrant smear of girl-honey across your face.  For one glorious moment, you're utterly deprived of light and left with the newly-minted bimbo's twat on your lips.  Her thighs muffle the sounds of the high mountains to near nothing, and you find yourself licking without meaning to, lapping  experimentally to see which parts of her slutted-up anatomy will release the strongest gushes of fluids.  Once you prod her clit with your tongue, she cums, drenching your face with harpy-lube.  The blond's thighs lock around you, holding you tight in the bimbo-bitch's snatch to receive her musky baptism.\n\n",
            false
        );

        this.outputText(
            "After a few moments of torrential, slimy output, Sophie's quivering cunt spasms and her legs give out.  She slumps over, ass in the air and utterly exposed as she giggles, \"<i>Like, wow!  You made me cum so hard, " +
                this.player.mf("mister", "miss") +
                "!  Can I, like, come home with you?  I don't really want to compete with these bitches and you're super " +
                this.player.mf("handsome", "hot") +
                '!  We can have lots of like, sex and stuff!</i>"\n\n',
            false
        );

        this.outputText(
            "You're a bit taken aback by her reaction, but it makes sense.  The dumb broad is too fucked up to survive without becoming someone's fuck-pet.  She may as well be yours.  She looks back with glossy, hopeful eyes and a pleading, pouty look on her thick lips.  Did they get bigger too?  (She probably gives great head...)\n\n",
            false
        );

        this.outputText(
            "Saying no seems silly... she's so fucking hot now, and you've no doubt she'll be like your personal masturbation toy.  Sophie titters, \"<i>Please please please!  Mmmm, I'll kiss and, like, lick you with my tongue all the time.  Don't say no... I totally need to fuck you!</i>\"\n\n",
            false
        );

        this.outputText(
            "You shake your head, feeling the compulsion picking at your mind.  Damn, she can still try to compel you with her words.  Do you take her home to be your live-in bimbo of choice?",
            false
        );
        this.dynStats("cor", 5);
        this.doYesNo(this.acceptBimboSophie, this.declineBimboSophie);
    }

    private declineBimboSophie(): void {
        this.sophieSprite();
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00283] = 1;
        this.outputText("", true);
        this.outputText(
            "You turn and flee the mountain, before she can compel you to take her to camp and fuck like bunnies.  Who knows when you'd have time to explore with a lust-crazed bird-woman like that around.  She'll find a mate soon enough, you're sure of that.\n\n",
            false
        );
        this.cleanupAfterCombat();
    }

    private acceptBimboSophie(): void {
        this.sophieSprite();
        this.outputText("", true);
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00282] = 1;
        // If she's already pregnant then convert the incubation from her wild 48 + rand(48) [95 to 0] to her follower incubation [168 to 0]. Your first daughter may already be on the way.
        if (this.pregnancy.isPregnant)
            this.pregnancy.knockUpForce(
                this.pregnancy.type,
                Math.floor(this.pregnancy.incubation * 1.75)
            );
        this.outputText(
            "You nod, and Sophie springs forward on her powerful legs, the strength undiminished by the effects of her bimbo transformation.  She tackles you in a bear-hug, kissing your " +
                this.chestDesc() +
                " over and over as her momentum carries you both off the side of the mountain.  You tumble in the air, screaming as you fall",
            false
        );
        if (this.player.canFly())
            this.outputText(
                " and unable to bring your wings to bear with arms pinning them to your back",
                false
            );
        this.outputText(".\n\n", false);

        this.outputText(
            'Sophie looks up and gasps, "<i>Oh no!</i>"  Thankfully, the ditz remembers her own wings and spreads them, slowing the descent to a rapid, controlled glide.  You sigh with relief, supported by her arms and legs thousands of feet in the air.  Sophie titters, "<i>Like, which way should we go, ' +
                this.player.short +
                '?  Everything is all funny up here, and I dunno where you live.  We need a place to fuck!</i>"\n\n',
            false
        );

        this.outputText(
            "You grudgingly direct her glide towards your campsite, and the two of you make good time.  Of course, Sophie's wet, drooling cunny makes an absolute mess of your " +
                this.player.armorName +
                " and " +
                this.player.legs() +
                " during the trip, soaking them with her copious pussy-cream.  She's exhausted and randy once you get to camp, and the landing is quite rough as a result.  You take a nasty tumble in the dirt, but it doesn't damage you significantly.  Sophie appears just as lucky - she's sitting on her plump rump with her legs spread wide, cluelessly scratching at her downy blond feathers.\n\n",
            false
        );

        this.outputText(
            "After a few seconds, the bimbo's dull eyes seem to light up with delight.  \"<i>Oh, is this where you live?  It's wonderful!  Oh, do you, like, sleep over there?  Can I share it with you?  Can we fuck every night?  Oh I've got, like, so many questions!  Umm... which ones did I ask already?  I forget!</i>\"\n\n",
            false
        );

        this.outputText(
            "You sigh and show the bimbo around.  She seems extremely pleased by the arrangements, and once the tour is complete, she prances off to touch up her make-up, though you see her masturbating the whole time.",
            false
        );

        if (this.player.findStatusAffect(StatusAffects.CampRathazul) >= 0) {
            this.outputText(
                "  Afterwards, she offers to suck Rathazul's cock.  The old rat looked about ready to have a heart attack, but he managed to decline her offer with some amount of dignity, after a few moments of stammering.",
                false
            );
        } else if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00238] == 1) {
            this.outputText(
                "  Afterwards, she offers to suck Izma's cock.  Izma looks at you for a moment before shaking her head, no.  Her skirt rises visibly in spite of her negative response.  Maybe she'll like having someone lower on the food chain to boss around?",
                false
            );
        } else if (
            this.flags[kFLAGS.AMILY_FOLLOWER] > 0 &&
            this.flags[kFLAGS.AMILY_BLOCK_COUNTDOWN_BECAUSE_CORRUPTED_JOJO] == 0
        ) {
            this.outputText(
                "  Afterwards, she offers to lick Amily's twat, if Amily will do the same to her.  Amily ",
                false
            );
            if (this.flags[kFLAGS.AMILY_FOLLOWER] == 1)
                this.outputText(
                    "flushes hotly and denies the bimbo's request with a terse 'no'.",
                    false
                );
            else
                this.outputText(
                    "flushes hotly and wiggles her hips Sophie's way.  The slutty, corrupted mouse and Sophie will clearly be helping to sate each other's needs in your absence.",
                    false
                );
        } else if (
            this.monk >= 5 &&
            this.player.findStatusAffect(StatusAffects.NoJojo) < 0 &&
            this.flags[kFLAGS.JOJO_DEAD_OR_GONE] == 0
        ) {
            this.outputText(
                "  Afterwards, she offers to suck Jojo's cock.  The corrupted slut-mouse nods and stiffens in delight, though he keeps glancing back your way.  Those two will probably spend a lot of time together...",
                false
            );
        } else if (this.player.findStatusAffect(StatusAffects.PureCampJojo) >= 0) {
            this.outputText(
                "  Afterwards, she offers to suck Jojo's cock.  The chaste mouse's jaw drops, but when he picks it up, he answers, \"<i>Never.  My body is as pure as my soul!</i>\"",
                false
            );
        } else if (kGAMECLASS.isabellaFollowerScene.isabellaFollower()) {
            this.outputText(
                "  Afterwards, she offers to lick Isabella's cunt.  Isabella answers sternly, "
            );
            if (this.isabellaAccent())
                this.outputText('"<i> Nein!  But you can drink mein milk from time to time.</i>"');
            else this.outputText("“<i>No! But you can still drink my milk from time to time.</i>”");
            this.outputText(
                "  The cow-girl is blushing hotly.  You've no doubt after a few nipple-licks she'll be spreading her thick thighs for the bimbo harpy.",
                false
            );
        }
        this.outputText("\n\n", false);
        this.outputText(
            "Well, you know where to find her any time you want to fuck the motherly bimbo.\n<b>(Bimbo Sophie has been added to your slaves!)</b>",
            false
        );
        this.cleanupAfterCombat();
    }
    // Follower In Camp Text:
    public sophieCampLines(): void {
        var choice: number = SophieBimbo.rand(4);
        if (choice == 0)
            this.outputText(
                "Sophie is sitting by herself, applying yet another layer of glittering lip gloss to her puffy bimbo lips.",
                false
            );
        else if (choice == 1)
            this.outputText(
                "Sophie is sitting by herself, idly diddling her twat and noisily moaning.  She keeps looking your way, hoping you'll approach.",
                false
            );
        else if (choice == 2)
            this.outputText(
                "The beach-blond harpy is preening herself with a vapid, brainless look plastered on her face.  Her puffy, bee-stung lips are slightly parted and lacquered with a heavy layer of golden gloss.",
                false
            );
        else
            this.outputText(
                "Your personal bimbo, Sophie, is playing with her breasts, touching and caressing the heavy orbs in between sighs of pleasure.  She keeps glancing your way, hoping you'll join her.  She's insatiable!",
                false
            );
        this.outputText("\n\n", false);
    }
    // Approach Texts
    public approachBimboSophieInCamp(output: boolean = true): void {
        this.sophieSprite();
        if (this.flags[kFLAGS.FOLLOWER_AT_FARM_SOPHIE] == 0) {
            if (output) {
                this.outputText("", true);
                if (this.sophieIsInSeason() && this.player.hasCock()) {
                    // New Sophie Greeting*
                    this.outputText(
                        "As soon as you call for Sophie, the blond bimbo trots over to you, her arms hugging around her chest, barely containing the enormous, bouncing mammaries within.  She's completely nude, like usual.  Her fluttering eyelashes lower coquettishly as she comes to a stop, rolling her immense hips back and forth hypnotically.  Her tail feathers twitch up and back, fanning a breeze in your direction that reeks of pheremonal sex.  The tangy, peach-like scent of her lust practically assaults your nostrils as the harpy attaches herself to your arm.  She presses her breasts against you as she clings tight, the prominent nipples so hard that they dig painfully in your " +
                            this.player.skinFurScales() +
                            "."
                    );
                    this.outputText(
                        "\n\nHer thick, soft thighs wrap around your [leg], pressing a slippery heat against you as she coos, \"<i>I've been thinking about you allll day, [name], and I was like, thinking maybe momma Sophie's earned a special treat, since I'm always so good to you.</i>\""
                    );
                    this.outputText(
                        "\n\nThe voluptuous harpy squeezes her legs around you again, and she pats [oneCock] through your [armor] to make it known exactly what she wants.  She circles her fingers around your [cockHead biggest] sensually.  You begin to stiffen almost immediately."
                    );
                    this.outputText(
                        "\n\n\"<i>Oohh, getting <b>soooo</b> hard, aren't you?  Why don't you just stuff that thing in me and cum until I'm like, totally full and pregnant?  Your cock wants it, doesn't it?</i>\" she asks, speaking in a singsong voice as she continues to caress your rock-solid shaft, her very words seeming to stir the cauldron of bubbling lust within you."
                    );
                    this.outputText(
                        "\n\nYou KNOW Sophie is trying to compel you to do what she wants, but she's not quite as good at it since she became a bimbo.  Do you fuck her pussy?  Her entire mound, labia and all, is slick with her moisture and shining gold layers of aphrodisiac lipstick.  Fucking that would be heavenly, but it would likely take the better part of the day and likely get her pregnant.  You could always just wipe it off with a piece of cloth and do something else instead."
                    );
                    // Normal Menu + Impregnate
                    // Big lust boost
                    this.dynStats("lus", 20);
                } else if (this.pregnancy.isPregnant) {
                    switch (this.pregnancy.event) {
                        case 3: //Medium Bump*
                            this.outputText(
                                "As usual, Sophie is laying on your bedroll.  Each day the fertile swell in her stomach seems to grow bigger with the egg inside.  The positively pregnant woman idly strokes her egg-bearing belly with motherly affection.  She even coos to the growing bump as she caresses her body, clearly loving the fact that she is pregnant with another egg.  It's not long before she catches sight of you; a big silly smile breaking across her puffy lips as she hurriedly gets up from your blankets and bounds over to you.  With each step, her voluptuous body jiggles and bounces, her big bountiful bosom heaving and shaking, her ripe round rump quivering like jelly as she sways her fecund hips for you."
                            );
                            this.outputText(
                                '\n\n"<i>There you are [name]!  Like, look at me!  Your egg is getting soooo big inside me!  Like, just look at how big and sexy I am!</i>" the bimbo brained woman tweets as she presses her curvaceous body against you, making sure you can feel her big soft tits and growing baby bump.  From how her body feels, you\'re sure her already bountiful bimbo-like breasts have only gotten bigger thanks to her pregnancy.  "<i>Thanks for getting me all pregnant and stuff!</i>"'
                            );
                            this.dynStats("lus", 5);
                            break;
                        case 4: //Big Belly Bump*
                            this.outputText(
                                "Once again, your pregnant bimbo lounges on your bedroll, her face buried in your pillow and taking deep breaths of your scent.  Even with her in such a - vulnerable... position, face down and ass up, you can clearly see the big, round bulge of her egg-laden belly.  With your feathery slut so gravid, you're sure it won't be long until she lays that womb-straining egg.  As if sensing your gaze, Sophie starts to sway her round spankable ass, her legs seeming to spread a little wider as well.  Your suspicions prove correct when she looks back at you; her plump bimbo lips blowing you a kiss as she looks at you with lusty eyes."
                            );
                            this.outputText(
                                "\n\nThe amorous harpy practically leaps out of your bed, her voluptuous body bouncing with each step as she bounds over to you.  Despite her heavily pregnant state, Sophie seems to carry herself well, the milfy harpy well adapted at being heavy with egg.  Taking advantage of your momentary distraction, the excited, happy bimbo flounces at you, tackling you and cuddling you happily.  She presses her egg-heavy belly and massive, perky tits against you and says, \"<i>Ohhh!  It's gonna be soon, momma Sophie's gonna like, lay this nice big egg for you, babe!</i>\"  Leaning in, she plants a big wet kiss on your cheek before sliding her hands down to her round bulging belly.  \"<i>It's going to be a really big egg too!  Don't worry, I'm good at laying eggs, and my pussy's going to stay niiice and tight for you, babe!</i>\""
                            );
                            this.dynStats("lus", 5);
                            break;
                        default:
                            this.outputText(
                                "Sophie sits by herself on your comfy bedroll.  The feathery female seems to have taken a liking to your place of rest.  Your bird-brained love-slave clearly desires to be close to you, or at least your fatherly scent, as much as possible.  Lost in her lusty fantasies, she caresses the gentle bump in her belly, the telltale sign that your virile seed has worked its magic on her egg-bearing womb.  One of her hands idly slips between her legs, fingers gently playing with her wet snatch as her other rubs her tummy."
                            );
                            this.outputText(
                                "\n\nFinally noticing your gaze on her body, Sophie looks up at you with an amorous smile, her thick, fertile thighs spreading and showing off her tight puffy pussy to you.  The blond bimbo puts her pregnant body on display for you, to show you the result of your virility and to entice you into playing with her hot, lusty form."
                            );
                            this.dynStats("lus", 3);
                    }
                } else {
                    var choice: number = SophieBimbo.rand(3);
                    if (choice == 0) {
                        this.outputText(
                            "Sophie flutters her wings, kicking up a small cloud of dust around herself as she shifts position to present her huge F-cup breasts to you.  She's not wearing a stitch of clothing, and you can see the sticky, soaking fluids of her lust running down her thick thighs unimpeded.  The harpy twists around, leaning over to show just how big and round her jiggling ass has become, the bulging cheeks framed by blond, feathery hair, draped over her derriere.  She asks, \"<i>Mmm, baby, I'm hooooorny, could we, like, fuck or something?</i>\"",
                            false
                        );
                        this.dynStats("lus", 5);
                    } else if (choice == 1) {
                        this.outputText(
                            "The harpy is reclining with her feathers splayed out behind her.  Her legs hang akimbo, the thick thighs shaking slightly.  As you move closer, you get to see just what's making her twitch.  She's got two of her long, gold-lacquered nails tracing over her puffy nether-lips.  The fingertips trace in lazy circles around her plump, fat little clit, occasionally brushing by it with the gentlest of touches.  Girl-spunk rushes over the harpy's curvy ass to puddle on the ground below as she arches her spine, lifting her heaving, heavy globes up into the air.  You swear it almost looks like she's putting on a show for you!  Her nipples are puffy and hard, nearly as thick as your thumbs, and they proudly display her lusty state to the world.  The big nubs look suckably full, begging for a pair of lips around them.  Leaning up, the bimbo puckers her lips and blows you a kiss with her cum-stained hand.  \"<i>Is there something momma Sophie could, like, touch or play with to make you happy, babe?</i>\"",
                            false
                        );
                        this.dynStats("lus", 15);
                    } else {
                        this.outputText(
                            "Sophie leans down when you approach, hiding most of her body behind the pendulous weight of her massive breasts.  The weighty orbs sway back and forth, the sweat-soaked skin sliding in a delicious rhythm, nearly dragging her heavy nipples through the dirt.  You find yourself transfixed by the sight, enraptured by the bimbo's hypnotic body while she jiggles and shakes for your pleasure.\n\n",
                            false
                        );

                        this.outputText(
                            '"<i>Enjoying the show?</i>" she purrs in one breathy exhalation.  You look up, straight into her plush, amber-colored lips and shudder, unconsciously imagining those',
                            false
                        );
                        if (this.player.hasCock())
                            this.outputText(" cock-pillows slurping around your member.", false);
                        else if (this.player.hasVagina())
                            this.outputText(
                                ", fuckable pussy-pillows crushing against your quim.",
                                false
                            );
                        else
                            this.outputText(
                                ", fuckable pillows locking you in their embrace.",
                                false
                            );
                        if (this.player.cor < 33)
                            this.outputText(
                                "  You find yourself nodding and blushing heavily as you drink in the bimbo's body.",
                                false
                            );
                        else if (this.player.cor < 66)
                            this.outputText(
                                "  You find yourself nodding and giving a lewd grin as you drink in the bimbo's body.",
                                false
                            );
                        else
                            this.outputText(
                                "  You nod vigorously, giving the harpy a lecherous leer as you take in her body.",
                                false
                            );
                        this.dynStats("lus", 10);
                    }
                }
            }
        } else {
            if (output) {
                this.clearOutput();
                this.sophieSprite();

                this.outputText(
                    "Sophie emerges from the hen coop and wiggles her way over to you when you call her name."
                );

                this.outputText(
                    "\n\n“<i>Hey babe! I’m just incub... inclu... clued... sitting on some eggs. The nice dog lady says I’m perfectly designed for that!</i>” She pats her vast bottom proudly."
                );
            }
        }

        this.menu();
        if (this.player.lust < 33 && output)
            this.outputText(
                "\n\n<b>You aren't turned on enough right now to make use of Sophie's 'services'.</b>",
                false
            );
        else if (this.player.lust >= 33) {
            this.addButton(0, "Sex", this.bimboSophieSexMenu);
        }
        if (this.player.hasItem(this.consumables.DEBIMBO)) {
            this.addButton(4, "Debimbo", this.sophieFollowerScene.unbimboSophie);
            if (output)
                this.outputText(
                    "\n\n<b>You could use the bottle of debimbo to return Sophie's intellect...</b>"
                );
        }
        if (this.flags[kFLAGS.SOPHIE_CAMP_EGG_COUNTDOWN] > 0 && output)
            this.outputText("\n\n<b>Sophie's egg is sitting nearby.</b>");
        if (this.flags[kFLAGS.SOPHIE_DAUGHTER_MATURITY_COUNTER] > 0) {
            this.addButton(5, "Daughter", this.daughterCheckup);
        }
        if (
            this.flags[kFLAGS.SOPHIE_BROACHED_SLEEP_WITH] == 1 &&
            this.flags[kFLAGS.FOLLOWER_AT_FARM_SOPHIE] == 0
        ) {
            if (this.flags[kFLAGS.SLEEP_WITH] != "Sophie") {
                if (output)
                    this.outputText("\n\nYou could invite her to share the bed with you at night.");
                this.addButton(6, "SleepWith", this.moveSophieInRepeat);
            } else {
                if (output)
                    this.outputText(
                        "\n\nYou're currently sharing your bed with Sophie at night.  You could kick her out."
                    );
                this.addButton(6, "NoSnuggles", this.noSophieSleepWith);
            }
        }
        // choices("Nice Fuck",vag2,"Mean Fuck",vag,"FuckHerAss",anal,"Get Licked",getLicked,"Ovi Elixer",ovi,"Titty-Fuck",titFuck,"",0,"",0,"",0,"Leave",campSlavesMenu);

        if (
            this.flags[kFLAGS.FOLLOWER_AT_FARM_SOPHIE] == 0 &&
            !this.pregnancy.isPregnant &&
            this.flags[kFLAGS.FARM_CORRUPTION_STARTED] == 1
        )
            this.addButton(1, "Farm Work", this.sendToFarm);
        if (this.flags[kFLAGS.FOLLOWER_AT_FARM_SOPHIE] != 0)
            this.addButton(1, "Go Camp", this.backToCamp);

        if (
            this.flags[kFLAGS.FOLLOWER_AT_FARM_SOPHIE] != 0 &&
            this.flags[kFLAGS.FOLLOWER_PRODUCTION_SOPHIE] == 0
        )
            this.addButton(2, "Harvest Eggs", this.harvestEggs);
        if (
            this.flags[kFLAGS.FOLLOWER_AT_FARM_SOPHIE] != 0 &&
            this.flags[kFLAGS.FOLLOWER_PRODUCTION_SOPHIE] == 1
        )
            this.addButton(2, "Change Eggs", this.changeEggs);

        if (
            this.flags[kFLAGS.FOLLOWER_AT_FARM_SOPHIE] != 0 &&
            this.flags[kFLAGS.FOLLOWER_PRODUCTION_SOPHIE] == 1
        )
            this.addButton(3, "Stop Harvest", this.stopHarvest);

        this.addButton(7, "Appearance", this.sophieBimboAppearance);

        if (this.flags[kFLAGS.FOLLOWER_AT_FARM_SOPHIE] == 0)
            this.addButton(9, "Leave", this.camp.campSlavesMenu);
        if (this.flags[kFLAGS.FOLLOWER_AT_FARM_SOPHIE] != 0)
            this.addButton(9, "Back", kGAMECLASS.farm.farmCorruption.rootScene);
    }

    // Appearance:
    private sophieBimboAppearance(): void {
        this.clearOutput();
        this.outputText("Sophie is a big, buxom harpy, no two ways about her.  She has ");
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00282] > 0) this.outputText("very ");
        this.outputText("long ");
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00282] > 0) this.outputText("platinum-blond");
        else this.outputText("pink");
        this.outputText(
            " 'hair' that dangles off her shoulders, like a bird's plumage.  She wears a thick layer of golden lipstick over her plump"
        );
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00282] > 0) this.outputText(", super-sized");
        this.outputText(
            " lips at all times, like most of her kind, the gloss capable of giving her voice a compelling quality or inducing arousal on contact with males or herms.  Her face lacks the youthful quality found among many of her sisters, though you don't see any of the lines that would indicate age."
        );

        this.outputText("\n\nSophie's breasts are ");
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00282] > 0)
            this.outputText(
                "so immense they would drag her to the ground if she tried to fly, a sexy, lingering aftereffect of the draft you gave her.  The wobbly bimbo-tits look to be about F-cups."
            );
        else
            this.outputText(
                "unusually large.  The buxom harpy does seem slightly encumbered by them, but still capable of flight.  Her breasts look to be about DD-cups, nice and big enough for a soft squeeze or rough tit-fuck."
            );

        this.outputText(
            "\n\nShe has a glittering, moist pussy concealed between her thick thighs, both of which start the feathery covering that reaches all the way to her bird-like, taloned feet.  Her jiggly backside wobbles slightly with every exaggerated step she takes, with her long tailfeathers fanning above it.  You're sure there's a tight butthole located between them, where it belongs, but you can't really get a look at it with all the plump ass surrounding it."
        );

        this.outputText(
            "\n\nSophie's arms are covered in feathers as well, and are somewhat wing-like in appearance, though she has human hands at the ends of them.  Her primary wings are larger and sprout out above her shoulder blades.  She often keeps them folded out of the way behind her, but she can kick up a huge dust-storm with them when she wants."
        );

        if (kGAMECLASS.farm.farmCorruption.hasTattoo("sophie")) {
            this.outputText("\n\n");
            if (kGAMECLASS.farm.farmCorruption.sophieFullTribalTats()) {
                this.outputText(
                    "She is covered from head to tail in tribal tattoos, erotic lines snaking all over her naked frame, giving her the look of a barely tamed savage."
                );
            } else {
                if (kGAMECLASS.farm.farmCorruption.numTattoos("sophie") > 1)
                    this.outputText("She has the following tattoos emblazoned across her body:\n");
                else this.outputText("She has ");

                if (this.flags[kFLAGS.SOPHIE_TATTOO_COLLARBONE] != "")
                    this.outputText(this.flags[kFLAGS.SOPHIE_TATTOO_COLLARBONE] + "\n");
                if (this.flags[kFLAGS.SOPHIE_TATTOO_SHOULDERS] != "")
                    this.outputText(this.flags[kFLAGS.SOPHIE_TATTOO_SHOULDERS] + "\n");
                if (this.flags[kFLAGS.SOPHIE_TATTOO_LOWERBACK] != "")
                    this.outputText(this.flags[kFLAGS.SOPHIE_TATTOO_LOWERBACK] + "\n");
                if (this.flags[kFLAGS.SOPHIE_TATTOO_BUTT] != "")
                    this.outputText(this.flags[kFLAGS.SOPHIE_TATTOO_BUTT] + "\n");
            }
        }

        this.menu();
        this.addButton(0, "Back", this.approachBimboSophieInCamp, false);
    }

    private harvestEggs(): void {
        this.clearOutput();
        this.sophieSprite();

        this.outputText(
            "You ask Sophie if it’s possible for her to produce eggs of a certain color whilst she’s here."
        );

        this.outputText(
            "\n\n“<i>Of course I can, silly,</i>” she giggles. “<i>Don’t you know about, like, the pretty lil colors that come out of the water over there?</i>” She points in the direction of the lake. “<i>The doggie takes me for like a walk down there all the time. The colors go whoomf, right into where it feels good!</i>” She demonstrates graphically. “<i>What color would you like, babe?</i>”"
        );

        this.eggSelector();
    }

    private changeEggs(): void {
        this.clearOutput();
        this.sophieSprite();

        this.outputText("You ask Sophie to change the type of eggs that she is producing for you.");

        this.outputText(
            "\n\n<i>Sure thing, babe,</i>” she giggles. “<i>Don’t you know about, like, the pretty lil colors that come out of the water over there? What color would you like, babe?</i>”"
        );

        this.eggSelector();
    }

    public eggColors: any[] = ["Black", "Blue", "Brown", "Pink", "Purple", "White"];

    private _eggTypes: any[] | undefined;

    public get eggTypes(): any[] {
        if (this._eggTypes == undefined) {
            this._eggTypes = [
                this.consumables.L_BLKEG,
                this.consumables.L_BLUEG,
                this.consumables.L_BRNEG,
                this.consumables.L_PNKEG,
                this.consumables.L_PRPEG,
                this.consumables.L_WHTEG,
            ];
        }
        return this._eggTypes;
    }

    private eggSelector(): void {
        for (var i: number = 0; i < this.eggColors.length; i++) {
            this.addButton(i, this.eggColors[i], this.postEggSelector, this.eggColors[i]);
        }
    }

    private postEggSelector(selected: string): void {
        this.clearOutput();
        this.sophieSprite();

        this.outputText(
            "“<i>I’ll make some nice " +
                selected.toLowerCase() +
                " eggs just for you then, good looking,</i>” she says. “<i>I can only make, like, one once a week, though. All the rest gotta be sold. I’ll put it with the weekly earnings, ok?</i>”"
        );

        this.flags[kFLAGS.FOLLOWER_PRODUCTION_SOPHIE] = 1;
        if (this.flags[kFLAGS.FOLLOWER_PRODUCTION_SOPHIE_COLORCHOICE] != selected) {
            this.flags[kFLAGS.FOLLOWER_PRODUCTION_SOPHIE_COLORCHOICE] = selected;
            this.flags[kFLAGS.FARM_EGG_STORED] = 0;
            this.flags[kFLAGS.FARM_EGG_COUNTDOWN] = 7;
        }

        this.doNext(kGAMECLASS.farm.farmCorruption.rootScene);
    }

    private stopHarvest(): void {
        this.clearOutput();
        this.sophieSprite();

        this.outputText(
            "You tell Sophie to stop giving you eggs; you’d rather she’d put them towards making the farm money."
        );

        if (this.silly())
            this.outputText(
                "\n\n“<i>I only wish I had your keenly developed financial acumen and, like, grasp of small scale agricultural supply and demand, babe. Whatever you say!</i>”"
            );
        else
            this.outputText(
                "“<i>I only wish I was good with numbers and things,</i>” Sophie sighs wistfully, picking at her bellybutton. “<i>Then I’d know when to give you my eggs and, and when to give them to the doggie. Whatever you say anyways, babe!</i>”"
            );

        this.flags[kFLAGS.FOLLOWER_PRODUCTION_SOPHIE] = 0;

        this.doNext(kGAMECLASS.farm.farmCorruption.rootScene);
    }

    private sendToFarm(): void {
        this.clearOutput();
        this.sophieSprite();

        this.outputText(
            "“<i>I want you to head towards the lake,</i>” you say to your pet bimbo, “<i>and find a farm. You’re to present yourself to th...</i>“ you stop. Sophie is staring at you in complete incomprehension, fingering herself impulsively."
        );

        this.outputText(
            "\n\n“<i>There were a lot of, like, big words in there, babe. What’s a farm?</i>” You sigh."
        );

        this.outputText(
            "\n\nIt takes you a while and you need to draw several diagrams in the dust, but eventually Sophie gets the picture."
        );

        this.outputText(
            "\n\n“<i>Ooh, I’m going on, like, an adventure!</i>” She giggles excitedly, bouncing up and down. If there is one thing the harpy can do, it’s bounce. “<i>I’m gonna milk cows and lay lotsa eggs for the nice dog lady and, and you’ll visit sometimes and we’ll fuck, right?</i>” You confirm that will be the case. Sophie claps with glee, and then begins to hop-glide her way towards the lake. She’ll be pretty useless as a worker or a protector for Whitney, you think, but she will easily make up for that in egg production."
        );

        this.flags[kFLAGS.FOLLOWER_AT_FARM_SOPHIE] = 1;

        this.doNext(this.camp.returnToCampUseOneHour);
    }

    private backToCamp(): void {
        this.clearOutput();
        this.sophieSprite();

        this.outputText(
            "You tell her to head back to camp; there are things you need to do to her you can’t do whilst she’s here. Repeatedly. Sophie’s face falls a bit."
        );

        this.outputText(
            "\n\n“<i>Aww, I was having fun here, too. Oh well!</i>” Her disappointment lasts for as long as it takes her to flap over the gate, after which one of her own feathers distracts her. Luckily, the wind is blowing in the direction of your camp."
        );

        this.flags[kFLAGS.FOLLOWER_AT_FARM_SOPHIE] = 0;

        this.doNext(kGAMECLASS.farm.farmCorruption.rootScene);
    }

    private bimboSophieSexMenu(): void {
        this.clearOutput();
        this.outputText("How will you have sex with your feather-brained slut?");
        this.menu();
        if (this.player.hasCock()) {
            // BUTT FUCKS
            if (this.player.cockThatFits(this.sophieCapacity()) >= 0 && this.player.lust >= 33)
                this.addButton(2, "Anal", this.buttFuckBimboSophie);
            else this.outputText("\n\n<b>You're too big to butt-fuck her.</b>", false);
            // TIT FUCKS!
            if (this.pregnancy.event >= 2)
                this.addButton(5, "Titty-Fuck", this.sophiePreggoTitJobs);
            else this.addButton(5, "Titty-Fuck", this.fuckBimboSophiesTits);

            // VAG FUCKS!
            if (this.player.cockThatFits(this.sophieCapacity()) >= 0) {
                if (this.sophieIsInSeason()) {
                    this.addButton(0, "Impregnate", this.sophieImpregnationSex);
                } else {
                    this.addButton(0, "Nice Fuck", this.sophieFenCraftedSex);
                }
                this.addButton(1, "Rough Fuck", this.rideDatSophieVag);
            } else {
                this.outputText("\n\n<b>You're too big to give her cunt a working over.</b>");
            }
            if (this.player.biggestCockArea() > this.sophieCapacity() && this.sophieIsInSeason()) {
                this.outputText(
                    "\n\nYou can always try to impregnate her with your biggest member..."
                );
                this.addButton(6, "Big Impreg", this.giantCocksImpregnateSophie);
            }
        }
        if (this.player.hasVagina()) this.addButton(3, "Get Licked", this.bimboSophieLicksRugs);
        if (
            this.flags[kFLAGS.TIMES_SOPHIE_HAS_DRUNK_OVI_ELIXIR] > 0 &&
            this.player.gender > 0 &&
            !this.pregnancy.isPregnant
        ) {
            if (
                this.player.hasItem(this.consumables.OVIELIX) ||
                this.inventory.hasItemInStorage(this.consumables.OVIELIX)
            ) {
                this.addButton(4, "Ovi Elixir", this.sophieEggApocalypse);
            } else
                this.outputText(
                    "\n\n<b>If you had an Oviposition Elixir in your inventory or camp storage, Sophie could have some fun with it...</b>",
                    false
                );
        }
        if (
            this.flags[kFLAGS.TOLD_SOPHIE_TO_IZMA] == 0 &&
            this.flags[kFLAGS.TIMES_SOPHIE_AND_IZMA_FUCKED] > 0 &&
            this.flags[kFLAGS.IZMA_NO_COCK] == 0
        ) {
            this.outputText(
                "\n\nYou could tell Sophie to visit Izma again.  She'd probably wind up tied AGAIN."
            );
            this.addButton(7, "Visit Izma", this.tellSophieToVisitIzma);
        }
        if (
            this.flags[kFLAGS.SOPHIE_ADULT_KID_COUNT] > 0 &&
            this.flags[kFLAGS.SOPHIE_FAMILY_INCEST] > 0 &&
            this.player.cockThatFits(this.sophieCapacity()) >= 0 &&
            this.player.hasCock()
        )
            this.addButton(
                8,
                "DaughterFuck",
                this.sophieFollowerScene.sophieIncestInHerCooterOrSomethingIDunno
            );
        this.addButton(9, "Leave", this.approachBimboSophieInCamp);
    }

    private tellSophieToVisitIzma(): void {
        this.clearOutput();
        this.outputText(
            "You suggest she visit Izma again.  Maybe this time she won't get tied up again?"
        );
        this.outputText(
            '\n\nSophie squeals, "<i>REAAALLY?</i>" before taking off towards the other side of camp.  This should be good.'
        );
        this.flags[kFLAGS.TOLD_SOPHIE_TO_IZMA] = 1;
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Lipstick Resistance Building
    public bimboSophieLustStickSurprise(): void {
        this.outputText("\n", false);
        // *The PC is repeatedly afflicted with harpy lipstick by Sophie in one of five ways.  Additional exposure from the mountain harpies will speed the process.  After 40(or 20-30?)  applications of lust-stick, the PC becomes resistant to it, raising the PC's lust by 20%, but also reducing lust gain by 20%.
        var select: number = SophieBimbo.rand(4);
        if (select == 0) {
            this.sophieSprite();
            this.outputText(
                "Sophie flounces into your arms and kisses you on the lips before you can react.  ",
                false
            );
            if (!this.player.hasCock()) {
                this.outputText(
                    "You smirk and pry the enthusiastic bimbo out of your arms, for now.",
                    false
                );
                this.dynStats("lus", 1);
            } else {
                this.outputText(
                    "You shiver, " +
                        this.sMultiCockDesc() +
                        " growing hard and ready to submit to the feathery blond's love.  Perhaps you'll take care of that soon...",
                    false
                );
                this.dynStats("lus", 15);
            }
            this.sophieScene.luststickApplication(5);
        } else if (select == 1) {
            this.sophieSprite();
            this.outputText(
                "During an idle moment, you feel heavy breasts squeezing against your back.  Sophie caresses your " +
                    this.chestDesc() +
                    " and nibbles at your ear.  She asks, \"<i>Can we like, fuck soon, babe?  I've been so wet here all by myself, just stroking my pussy and dreaming of you.</i>\"  You can't help but turn and smile at her, but as soon as you do, she plants a kiss full on your lips.  ",
                false
            );
            if (!this.player.hasCock()) {
                this.outputText(
                    "Pushing her back, you give her ass a slap and mouth, 'Soon'.",
                    false
                );
                this.dynStats("lus", 1);
            } else {
                this.outputText(
                    "Pushing her back, you try not to make contact against her with " +
                        this.oMultiCockDesc() +
                        ".  Your lips tingle dangerously, and you know you'll be lusting after harpies for at least a few hours.",
                    false
                );
                this.dynStats("lus", 15);
            }
            this.sophieScene.luststickApplication(5);
        } else if (select == 2) {
            this.sophieSprite();
            if (this.player.hasCock()) {
                this.outputText(
                    "While standing there, drinking a sip of water, strong hands pull down your " +
                        this.player.armorName +
                        ".  Plump lips wrap around " +
                        this.oMultiCockDesc() +
                        " and smother it in plush, warm slipperiness.  You look down at your bimbo harpy and sigh while " +
                        this.oMultiCockDesc() +
                        ' grows harder in her lips.  She pops off and asks, "<i>Like, wanna fuck?</i>"  You sigh and try to resist the images of yourself mounting the harpy that flood your mind.  It might be time to fuck her soon...',
                    false
                );
                this.dynStats("lus", 15);
            } else {
                this.dynStats("lus", 10);
                this.outputText(
                    "While standing there, drinking a sip of water, strong hands pull down your " +
                        this.player.armorName +
                        ".  Plump lips slide over your "
                );
                if (this.player.hasVagina())
                    this.outputText(
                        "vulva, sucking at your clitoral hood.  Those gold, slobbery pussy-lickers look good on your groin, and you find yourself releasing your wetness from her oral attentions.  It might be time to fuck her soon...",
                        false
                    );
                else
                    this.outputText(
                        "smooth groin, eventually licking at your [asshole].  Those gold, slobbery lickers look good pressed against you.  It might be time to fuck her soon...",
                        false
                    );
            }
            this.sophieScene.luststickApplication(5);
        } else {
            this.sophieSprite();
            this.outputText(
                'Sophie glides down from atop a rock, landing roughly atop you.  She plants a wet, smacking kiss on you and asks, "<i>Didja miss me?  I totally missed you!</i>"  ',
                false
            );
            if (this.player.hasCock()) {
                this.dynStats("lus", 15);
                this.outputText(
                    this.SMultiCockDesc() +
                        " seems to wiggle inside your " +
                        this.player.armorName +
                        ".  Damn, she feels really good on you!  Maybe you should screw the slutty bimbo soon?  ",
                    false
                );
            }
            this.outputText(
                "You nod and Sophie gets up, beaming a radiant smile as she prances away, her booty swaying enticingly behind her.",
                false
            );
            this.dynStats("lus", 2);
            this.sophieScene.luststickApplication(5);
        }
        this.outputText("\n", false);
    }

    public daughterCheckup(): void {
        this.clearOutput();
        if (this.flags[kFLAGS.SOPHIE_DAUGHTER_MATURITY_COUNTER] > 200) {
            this.outputText(
                "Back in the nest, your cute little harpy is still just a little chick.  Her body is small and childlike, and her feathers are fluffy and poofy, making your little girl look like she has puffballs for arms and legs.  Already looking to be four or five years old, the baby harpy is just as energetic as a human child of that age.  She flutters around and scrambles from one thing to another.  Thankfully, the rambunctious little darling runs out of explosive energy quickly, suddenly falling to the ground into a fluffy heap for a quick nap."
            );
        } else if (this.flags[kFLAGS.SOPHIE_DAUGHTER_MATURITY_COUNTER] > 100) {
            this.outputText(
                "Back in the nest, your sweet little harpy is starting to grow up!  Her body is much bigger than it was before, though her baby fat has spread out over her larger form and looks more lean and lanky then the big-butted harpies you're used to seeing.  Her feathers have even started to smooth out, though she is still quite the fluffball.  You're sure that it won't be too long before the curves harpies are known for start to appear.  The energy she exuded as a little chick still drives her to 'terrorize' your camp, scampering around, fluttering from place to place and getting into all kinds of things.  Your fluffy daughter seems to be able to stay active for longer than before, though you still see her curl up for a nap every so often.\n"
            );
        } else if (this.flags[kFLAGS.SOPHIE_DAUGHTER_MATURITY_COUNTER] > 0) {
            this.outputText(
                "Looking around for your developing daughter, you find that she and your "
            );
            if (this.bimboSophie()) this.outputText("boisterous bimbo ");
            else this.outputText("matronly harpy ");
            this.outputText(
                "are spending some quality mother-daughter time together.  Sophie is helping the young girl with her make up, showing her how to use that golden luststick that her people are so fond of.  You're not too sure how appropriate that is for your daughter, but then again, this is what harpies do, right? Aside from the lusty lipstick, your "
            );
            if (this.bimboSophie()) this.outputText("live-in bimbo ");
            else this.outputText("favorite bird-woman ");
            this.outputText(
                "moves on to her hair and nails, all the while gabbing on and on about you, and about all the daughters she plans to have."
            );
            this.outputText(
                "\n\nYour daughter is growing up so fast!  Already, her body is developing, breasts budding into supple bumps on her chest.  Her hips are starting to swell into the trademark birthing hips and round grabbable ass harpies are famous for.\n"
            );
        }
        this.menu();
        if (this.bimboSophie()) this.addButton(4, "Back", this.approachBimboSophieInCamp);
        else this.addButton(4, "Back", this.sophieFollowerScene.followerSophieMainScreen);
    }

    // Unlock resistance:
    public unlockResistance(): void {
        if (this.player.hasCock()) {
            this.outputText(
                "\nBy now, the effects of the harpy lipstick should be kicking in, yet you don't feel that different.  Sure, you feel hard and ready to fuck an egg into the nearest harpy, but at the same time, you've gotten quite used to that feeling.  It's almost like your body has adapted to being under the effects of the drugged lipstick after so many repeated applications.  Hell, you could probably let a pack of the bitches cover your body in it and it wouldn't bother you!  Maybe you could even wear it around to use on male enemies?\n\n",
                false
            );
        } else
            this.outputText(
                "\nYou've gotten so used to having harpy lipstick on your lips that you're sure you're immune to it, even if you were to sprout a dick.  You would even feel comfortable wearing it around to use on male enemies, if you could find any.\n\n",
                false
            );
        this.outputText(
            "<b>(Perk Unlocked: Luststick Adapted - your minimum lust is permanently raised, but you are 20% more lust resistant.  In combat, you're immune to it, though it still gives you a rush during sex.  You're also comfortable enough with it to use it like a harpy if you find any.)</b>\n",
            false
        );
        this.player.createPerk(PerkLib.LuststickAdapted, 0, 0, 0, 0);
    }
    // Get oral as female.
    private bimboSophieLicksRugs(): void {
        this.sophieSprite();
        this.outputText("", true);
        // *Summary - lean back on a rock and spread your legs.  She licks you off with chance of compelling you to sixtynine her.
        this.outputText(
            "You sit back on a nearby rock and spread your " + this.player.legs(),
            false
        );
        if (this.player.balls > 0)
            this.outputText(", lifting your heavy sack out of the way", false);
        this.outputText(
            " to give Sophie a perfect view of your " +
                this.vaginaDescript() +
                '.  Sophie\'s dull, somewhat glazed eyes brighten at the sight of your box, and she leans forward intently, dipping a digit into herself as she asks, "<i>Ooh, can I, like, lick it for you?  It looks soooo yummy!</i>"\n\n',
            false
        );

        if (this.player.cor < 33)
            this.outputText(
                "You nod nervously, blushing hotly at the thought of your bimbo-slut's fat lips kissing and lapping at your slit.",
                false
            );
        else if (this.player.cor < 66)
            this.outputText(
                "You nod and smile, blushing a bit in anticipation of feeling your bimbo-slut's fat, pussy-licking lips against your slit.",
                false
            );
        else
            this.outputText(
                "You confidently smile and scoot your " +
                    this.hipDescript() +
                    " forward, anticipating the feeling of your bimbo-bitch's fat, pussy-licking lips on your slit.",
                false
            );
        this.outputText(
            "  Sophie just looks at you, her wide-eyed gaze never leaving your engorged labia.  After what feels like a full minute of her watching you, she finally remembers that a nod means 'yes', and she bounces up and down in excitement, clapping and cheering while her tits jiggle ludicrously.  She leans in close, nearly brushing her nose into your ",
            false
        );
        if (this.player.wetness() < 3) this.outputText("moist", false);
        else if (this.player.wetness() < 4) this.outputText("wet", false);
        else if (this.player.wetness() < 5) this.outputText("sloppy", false);
        else this.outputText("soaked", false);
        this.outputText(
            " folds.  The harpy stops to look up at you with wide eyes, then slowly extends her tongue.\n\n",
            false
        );

        this.outputText(
            "The resulting fireworks in your loins make you shiver.  Her mouth is warm and wet, and you just can't seem to look away from the ditzy bird's submissive eyes while she kisses and licks between your vulva.  She exhales after each of her oral muscle's probing stabs, washing hot breath over your sensitive mons and adding to your pleasure.  The pink tongue slips and slides into your passage, mixing Sophie's frothy spit and your musky girl-jizz into a whirlpool of bubbling moisture.  She keeps looking at you through it all.  The slutty bimbo even manages to give you a wink before she finally turns her gaze down to focus on your " +
                this.clitDescript() +
                ".\n\n",
            false
        );

        // (small (IE normal clits))
        if (this.player.clitLength < 3) {
            this.outputText(
                "Plump, round lips ooze over your nub, peeling back the lips of the 'hood' and fully exposing the clit.  Her dexterous tongue twists up and circles around your most sensitive spot, curling and squeezing against you with passionate licks.  Sophie glances up at you with her cheeks pulled back in a happy smile before focusing back on your pussy.  She slurps and sucks just hard enough to make your " +
                    this.clitDescript() +
                    " grow even harder and more sensitive, fellating the tiny female organ as it was a miniature cock.  Her techniques are as skilled as they are passionate, and in no time you're humping your bimbo's face, bumping and grinding on her lips like a horny slut.\n\n",
                false
            );
        }
        // (medium (IE 3-7</i>\" inch clits!))
        else if (this.player.clitLength < 7) {
            this.outputText(
                "The plump, round lips ooze across your nub, peeling back the hood to expose its still-small button.  Her dexterous tongue twists up to touch it, circling it slowly while you " +
                    this.clitDescript() +
                    " thickens in her mouth.  Sophie's ministrations quicken when she feels the thick clit filling out towards her throat, and she starts to hum in pleasure once your girthy female organ takes on cock-like proportions.  With a satisfied smirk, she slides back, letting her puffy, glittering pussy-kissers slide along the incredibly sensitive girl-cock in an imitation of a blowjob.  You moan in delight, arching your hips to thrust your clitty-cock as deep as you can into your bimbo's hard-sucking maw.  She licks the underside, sliding her tongue along the entire, bloated length before burying her oral muscle back in your snatch, tasting and lapping up another heavy load of your slippery cunt's cum.\n\n",
                false
            );
        }
        // (ginormous clitties)
        else {
            this.outputText(
                "The plump, round lips ooze across your nub, peeling back the hood to expose the latent chick-stick.  Her dexterous tongue twists up to touch it, circling it slowly while it thickens in her mouth.  Sophie's ministrations quicken when she feels the thick clit filling out towards her throat, and she starts to hum in pleasure once your girthy female organ takes on cock-like proportions.  She gurgles in surprise, and pulls back, gasping around your still-growing, hyper-masculinized clit.  The bloated bitch-dick continues to swell, until Sophie releases it in a panic, letting it smear over her cheek.  She stares with a look of quiet disbelief on her ditzy, lube-glazed face.\n\n",
                false
            );
            this.outputText(
                "\"<i>It's... like, well... big!  Gosh, you're a big girl!  Mmm, you'll cum hard for Momma Sophie while I, like, suck on this fat pole, won't you?</i>\" teases the thick-bootied bird-bitch.\n\n",
                false
            );
            this.outputText(
                "You shudder as the harpy resumes her oral onslaught, slurping your " +
                    this.clitDescript() +
                    " deep into her throat in one smooth plunge.  She hums in delight, licking over the feminine fuck-stick's lower portions while she tries to get her fat, soft puss-pillows closer to your juicy snatch.  You rock your hips forward to thrust your " +
                    this.clitDescript() +
                    " further inside your bimbo's neckhole.  She gurgles happily and lashes at your " +
                    this.vaginaDescript() +
                    ", her tongue tracing trails of hot, sexual pleasure through your depths as her molten-hot throat milks you like no tomorrow.\n\n",
                false
            );
        }
        this.outputText(
            "Sophie purrs with desire, and when you hear a distinctive wet squelching coming from something other than your pussy, you realize she's vigorously masturbating.  You crane your head over to get a view of the harpy's frenzied, pumping fingers, watching them disappear into her puffy, lust-reddened lips, as if by magic.  Sophie ",
            false
        );
        if (this.player.clitLength < 3)
            this.outputText(
                "hums on your clit and doubles the speed of her licking while you watch her finger-fucking her sloppy cunt.",
                false
            );
        else
            this.outputText(
                "pumps on your clit with her hand and doubles the speed of her lashing tongue while you watch her finger-fucking her sloppy cunt.",
                false
            );
        this.outputText(
            "  The sight pushes you over the edge in a climax of body-shaking, muscle-locking proportions.  You seize up and ",
            false
        );
        if (this.player.wetness() >= 5) this.outputText("squirt", false);
        else if (this.player.wetness() >= 4) this.outputText("gush", false);
        else if (this.player.wetness() >= 3) this.outputText("leak", false);
        else if (this.player.wetness() >= 2) this.outputText("dribble", false);
        else this.outputText("drool", false);
        this.outputText(
            " fem-spunk all over Sophie's face, marking the bimbo with your love.  The horny harpy seems to be getting off on it as well, as she's moaning luridly into your labia, letting the fluid bubble up and muffle her outbursts.\n\n",
            false
        );

        this.outputText(
            "You both fall back, winded, gasping, and a little delirious from the encounter.  The entirely of your groin is covered in a gold coating, shining with the harpy's lipstick and your own feminine moisture.  In a way, the sight is oddly entrancing.  Your " +
                this.vaginaDescript() +
                " glitters in the light while the harpy's overly-thick lipstick sinks into your skin, filling your body with drugs designed to stimulate males.  ",
            false
        );
        if (!this.player.hasCock())
            this.outputText("  It's a good thing you don't have a penis!", false);
        else
            this.outputText(
                "You groan as your groin burns with desire, filling your " +
                    this.multiCockDescriptLight() +
                    " with blood.  Images of yourself relentlessly fucking your bimbo bride pregnant over and over again fill your mind.  You shudder and blush, trying to resist the artificial needs pounding through your body, but you realize your body is ready.",
                false
            );
        this.outputText("\n\n", false);

        this.outputText(
            'The ditzy blond giggles and tweaks her hefty nipples, cooing, "<i>That was absolutely yummy!  Your puss is like, totally tasty.  Let\'s go again!</i>"  You feel a little fucked out after the fantastic oral, and you decline.\n\n',
            false
        );

        this.outputText(
            "Sophie retorts, \"<i>But I wanna fuck nooooooowwww!</i>\"  She pouts, sticking out her lower lip and saying, \"<i>Come on... look at my pussy... just look at it.  Can't you, like, see how fucking wet you've gotten me?  You know you wanna lick me... your tongue TOOOTALLY wants to taste my sweet honey-pot!</i>\"  The harpy spreads her legs so wide she's nearly doing a split, pulling her pussy-lips apart to show you just how wet you've made the puffy, pink entrance.  You've got to admit... it does look really nice.  Her words seem... heavy somehow, like they have an extra weight behind them.  You have a hard time finding fault with her logic - she sure would taste good right about now...\n\n",
            false
        );

        this.outputText(
            "\"<i>Please?  I'll make you feel just as good as last time, maybe more.  Look at me, at my lips, would they lie to you?  I bet they'd feel soooo good back on your hot, wet cunny",
            false
        );
        if (this.player.hasCock()) this.outputText(", or thick, juicy dick", false);
        this.outputText(
            ".  Come over here and sixty-nine me, baby!</i>\" cheers Sophie with a wiggle of her considerable hips.  Damn, her lips are sooo plump and sexy, and that ass - gods she's getting you wet ",
            false
        );
        if (this.player.hasCock()) this.outputText("and hard ", false);
        this.outputText(
            "again!  You want to tackle her onto the ground and smash your crotch into her face!  Fuck, is she trying to use her compulsion on you? It's working!\n\n",
            false
        );
        this.player.orgasm();
        this.dynStats("sen", -1);
        this.sophieScene.luststickApplication(4);
        if (this.player.inte * 2 < this.player.cor + this.player.lib) {
            this.outputText(
                "There's no way you could ever turn her down at this point... just look at her lips... they'd never lie to you.  It'll feel so good...",
                false
            );
            this.doNext(this.bimboSophieSixtyNineAfterCunnilingus);
        } else {
            this.outputText("What do you do?", false);
            this.simpleChoices(
                "Sixtynine",
                this.bimboSophieSixtyNineAfterCunnilingus,
                "",
                undefined,
                "",
                undefined,
                "",
                undefined,
                "Leave",
                this.camp.returnToCampUseOneHour
            );
        }
    }
    // SixtyNine Continuation - GOILS you're a wreckin' machine
    private bimboSophieSixtyNineAfterCunnilingus(): void {
        this.sophieSprite();
        this.outputText("", true);
        // NON WANG
        if (!this.player.hasCock() || this.player.cockThatFits(this.sophieCapacity()) == -1) {
            this.outputText(
                "You throw yourself at Sophie, compelled by thoughts of pleasure and her delicious-looking pussy, wanting nothing more than to place your lips on her cunt and slurp with reckless abandon.  She takes the hit like a champ, tumbling with you through the dirt and dust until you land on your " +
                    this.buttDescript() +
                    ", bouncing to a stop with the harpy's feathery thighs clenching around your head.  "
            );
            if (this.pregnancy.event >= 2)
                this.outputText(
                    "Her pregnant belly rests against your middle, untouched by the rough fall.  "
                );
            this.outputText(
                "How did she do that?  Your questions fade away as you look up and spot your target - the cum-slicked delta of Sophie's cunt, so moist it seems to fog the air, beckoning you to plunge your tongue inside and taste it.\n\n",
                false
            );

            this.outputText(
                "With rapacious desire, you grab the harpy's down-coated ass-cheeks and squeeze her plump rump, pulling her dripping cooch straight onto your face.  You shiver at the potent, womanly smell as it oozes over your " +
                    this.player.face() +
                    ", and dribbles down your chin.  Without a moment's hesitation, you take the first long lick of Sophie's tasty juices.  They have a tangy flavor that seems to sizzle on your tongue before fading into a soft, sweet, peach-like taste.  You hum in pleasure - the harpy was right; your tongue REALLY wants to taste her.\n\n",
                false
            );

            this.outputText(
                "\"<i>Wow! You're so good at pussy-licking, babe,</i>\" declares Sophie, pursing her lips slowly and deliberately as she enunciates the rest of her statement, \"<i>Your tongue just can't get enough harpy pussy!  Ooooh yeah, you're totally the best cunny-licker I've like, ever had munch on my box!  Mmm, you love Momma Sophie's girl-cum, dontcha?  Yea-ah... lick lick lick!</i>\"  She giggles inarticulately after that, swiveling her hips to smear her leaking vagina all over your face.  You cram your " +
                    this.player.face() +
                    " further up Sophie's creamy quim and lick over and over, curling your tongue into every delicious nook and fold.\n\n",
                false
            );

            this.outputText(
                "Sophie drops down onto her elbows, her ass-length blond plumage tickling at your " +
                    this.player.legs() +
                    " as she examines your groin.  The slutty harpy leans over your gold-smeared crotch and gives your " +
                    this.clitDescript() +
                    " a kiss, her plush lips smothering the ",
                false
            );
            if (this.player.clitLength < 1) this.outputText("tiny ", false);
            this.outputText(
                "organ in warm, oral bliss.  You moan into her sumptuous pussy and giggle when the vibrations set off a cascade of harpy cum.  Inspired, you begin to hum with every lick, the sound carrying up from your voice-box to turn your tongue into the bimbo's new vibrator.\n\n",
                false
            );

            this.outputText(
                "The two of you attack each other's pussies in a frenzy of wanton need, slurping and moaning so loudly that the noise is likely carried a hundred yards away.  Sophie's pussy seems to grow even more delectable with every touch to your taste buds, if such a thing is possible.  Your moronic mate seems equally infatuated with your pussy, and she sucks your clit",
                false
            );
            if (this.player.clitLength >= 3)
                this.outputText(", even pausing to jack it off like a penis", false);
            this.outputText(
                " with hasty, need-filled strokes.  Eyes crossing, you suck and lick, swallowing great mouthfuls of bimbo-jizz in your haste to bring off the harpy.\n\n",
                false
            );

            this.outputText(
                "Sophie parts her silken lips from your gold-glazed groin with a moist *pop*.  \"<i>You're totally great at licking pussy, babe!  Mmmmhmmm, just, like, keep doing it like that.  You'll mmm-make Momma Sophie cum in no time!  Make me cum, baby!  Oooh, does trying to make cum make you hot for my pussy?  You're gonna cum... I know it... you'll cum with me,</i>\" utters the bimbo bitch while she stirs your pussy with a finger, stroking around it and dragging her long nails over the sensitive flesh of your loins.  Her words hit you like a wave, and with renewed vigor, you thrust your entire tongue deep inside the harpy and rub your lower lip back and forth across her pleasure-bud.  Pulling hard on her hips, you orally ravage her cunt with no regard for anything around yourself, your body burning hot from how good it feels to get your pet off.\n\n",
                false
            );

            this.outputText(
                "At long last, the bimbo's bald cunt climaxes from your work, splattering you with a flood of musky girl-spunk.  You still need her pussy so bad that you can't stop.  You lick, lap, and swallow with inhuman eagerness until the box atop you is emptied of everything save your saliva.  Then, and only then, do you finally feel release.  Your " +
                    this.vaginaDescript() +
                    " climaxes for Sophie, soaking her fingers and wringing them as if your life depended on it.  She giggles, coming down from her own orgasm and feeling quite pleased with the effects her words have had on you.\n\n",
                false
            );

            this.outputText(
                "The harpy gets up, but only long enough to turn around and lay atop you, face to face"
            );
            if (this.pregnancy.event >= 2)
                this.outputText(", egg-swollen belly smushing between you");
            this.outputText(
                '.  "<i>That was sooo fun!  Like, we\'ll totally do this sometime soon, but I need a drink, and you smell like pussy.  Mmmm, I like that smell.  It means fun stuff!</i>"  Sophie kisses you full on the mouth, her puffy, quim-stained lips coloring your own with her amber lipstick.  "<i>You\'re like, the best pussy-licker ever, ya know?</i>"\n\n',
                false
            );

            this.outputText(
                "Sophie struts off, touching a finger to her cunt before licking it, tasting the remnants of your saliva.",
                false
            );
            this.sophieScene.luststickApplication(5);
            this.player.orgasm();
            this.dynStats("sen", -1);
        }
        // SixtyNine Continuation - DUDES
        else {
            var x: number = this.player.cockThatFits(this.sophieCapacity());
            if (x < 0) x = this.player.smallestCockIndex();
            this.outputText(
                "You throw yourself at Sophie, compelled by thoughts of pleasure and her delicious-looking pussy.  Imagining yourself placing your lips on her cunt and slurping with reckless abandon, you tackle her, hard.  She takes the hit like a champ, tumbling with you through the dirt and dust until you land on your " +
                    this.buttDescript() +
                    ", bouncing to a stop with the harpy's feathery thighs clenching around your head.  "
            );
            if (this.pregnancy.event >= 2)
                this.outputText(
                    "Her gravid belly bumps up against your own, somehow untouched by the rough-and-tumble fall.  "
                );
            this.outputText(
                "How did she do that?  Your questions fade away as you look up and spot your target - the cum-slicked delta of Sophie's cunt, so moist it seems to fog the air, beckoning you to plunge your tongue inside and taste it.\n\n",
                false
            );

            this.outputText(
                "With rapacious desire, you grab the harpy's down-coated ass-cheeks and squeeze her plump rump, pulling her dripping cooch straight onto your face.  You shiver at the potent, womanly smell as it oozes over your " +
                    this.player.face() +
                    " and dribbles down your chin.  Without a moment's hesitation, you take the first, long lick of Sophie's tasty juices.  They have a tangy flavor that seems to sizzle on your tongue before fading into a soft, sweet peach-like taste.  You hum in pleasure - the harpy was right: your tongue really wants to taste her.\n\n",
                false
            );

            this.outputText(
                "\"<i>Wow! You're so good at pussy-licking, babe,</i>\" declares Sophie, pursing he lips slowly and deliberately as she enunciates the rest of her statement, \"<i>Your tongue just can't get enough harpy pussy!  Oooooh yeah, you're totally the best cunny-licker I've ever, like, had munching on my box!  Mmm, you love Momma Sophie's girl-cum, doncha?  Yeaah... lick lick lick!</i>\"  She giggles inarticulately after that, swiveling her hips to smear her leaking cooch all over your face.  You cram your mouth even further up Sophie's creamy quim and tongue it over and over, curling your mouth muscle through every delicious nook and fold.\n\n",
                false
            );

            this.outputText(
                "Sophie drops down onto her elbows, her ass-length blond plumage tickling at your " +
                    this.player.legs() +
                    " as she examines your groin.  The slutty harpy leans down over " +
                    this.oMultiCockDesc() +
                    " and gives it a gentle squeeze, staring down at the pulsating penis with a rapt, attentive gaze.  \"<i>Mmmm, such a yummy dick!  Did it, like, get this super-hard for lil' ol me?  Oh, that's so cute babe!  Just lie back and lick while Momma Sophie gets all the sticky, stinky ol' cum out of you!</i>\"\n\n",
                false
            );

            this.outputText(
                "The air-headed harpy rubs one of her long, manicured-looking nails over your urethra, teasing your poor " +
                    this.cockDescript(x) +
                    " with persistent touches.  You cry out in bliss, your straining voice muffled by the heavenly coochie oozing over your face, though the cries of passion lend your tongue a vibrating quality that seems to please her compelling cunt greatly.  It releases a wash of juice onto your tongue and mouth, giving you more of the peaches-and-tang taste that you've come to crave.  Sophie's cunt tastes so good, you've got to get more!\n\n",
                false
            );

            this.outputText(
                "You squeeze her jiggly, bimbo-sized ass-cheeks and cram her cunt harder against your lips.  MORE!  You've got to taste her more!  You lash at her pink pussy wildly, throwing your tongue around in a frenzy of whip-like licks.  Meanwhile, Sophie moans and bends down to curl her thick lips around your pre-cum-pulsing prick.  She's so warm that it feels like your cock is melting between those plush, painted pillows.  The bimbo circles her tongue over your slick dick-tip, firing constant bolts of hellish pleasure up your shaft.  Slurping noisily, she begins to suck as well, and her cheeks hollow from the effort of trying to vacuum the cum straight from your " +
                    this.cockDescript(x) +
                    ".\n\n",
                false
            );

            this.outputText(
                "The bimbo's mouth is like your own personal heaven.  As she continues to fellate you, you can feel your " +
                    this.player.skin() +
                    " blushing and your heart hammering from the influx of chemicals.  Sophie's smothering your " +
                    this.cockDescript(x) +
                    " in caramel-hued drugs, but you're already too far gone to care.  Her mouth feels so good, her pussy tastes even better, and you couldn't stop licking even if you wanted to.  Your tongue... it just can't get enough of that wonderful duff.  It's so good... so tasty.  You keep licking as hard you as can, your oral organ aching to stay buried in the sloppy wet box, even though it's already pushed as far inside as you can manage.\n\n",
                false
            );

            this.outputText(
                "Sophie pops your " +
                    this.cockDescript(x) +
                    ' out with a lurid moan, ignoring the strands of gold saliva connecting her to your crotch.  "<i>So yummy!  Did I ever tell you that your dick is, like, the best tasting thing?  It dripped some of your icing all over my tongue and it was soooo good.  Hurry up and give me more - squirt it all over my lips and tongue!  Cover me in your love babe, and like, don\'t stop licking!</i>" she commands.\n\n',
                false
            );

            this.outputText(
                "As her imperatives roll through you, you shudder and shake.  " +
                    this.OMultiCockDesc() +
                    " immediately releases a dollop of pre-cum, and Sophie dives down on it like an addict seeking her fix.  The return of her drugged suction is nearly too much for you, and you feel your " +
                    this.cockDescript(x) +
                    " swelling in her mouth, the " +
                    this.player.cockHead(x) +
                    " thickening against her hungry tongue.  She shakes on top of you and releases another wave of syrupy fluids.  You swallow a mouthful, compulsively drinking her prodigious pussy's copious lady-spunk.  Your back arches, your " +
                    this.player.legs() +
                    " clench, and you erupt inside your bimbo's puckered, sucking mouth-hole, giving her tonsils a bath of your creamy semen.  Rivulets of semen run over her juicy lips as you cum too fast for her to keep up with.",
                false
            );
            if (this.player.cumQ() >= 500) {
                this.outputText(
                    "  She gulps and swallows as fast as possible, but cum starts oozing from her nose, dripping from the corners of her mouth, and spurting back out around your " +
                        this.cockDescript(x) +
                        " to spatter your groin.",
                    false
                );
                if (this.player.cumQ() >= 1000)
                    this.outputText(
                        "  After a moment of this, the full-bellied harpy pulls back and lets you paint the remainder over her face, hair, and mountainous breasts.",
                        false
                    );
            }
            this.outputText("\n\n", false);

            this.outputText(
                "Sophie gives an airheaded giggle and jumps up, ignoring the slosh of your sexual fluids in her belly"
            );
            if (this.pregnancy.event >= 2)
                this.outputText(" and the way her egg-stuffed womb jiggles");
            this.outputText(
                ".  Shining in the light, a web of harpy-lube stretches between her groin and your soaked face.  You try to sit up and get your tongue back where it belongs, inside her, but she steps one of her clawed feet down on your chest to playfully pin you to the ground.\n\n",
                false
            );

            this.outputText(
                "The blond bombshell titters, \"<i>Like, you don't need to lick my cunny any more, babe. You were totally awesome and got me off super hard.  And you did such a good job cumming for me too!  Just relax there a moment, I'm gonna get a drink or something.  Let's do this again soon!</i>\"\n\n",
                false
            );

            this.outputText(
                "Sophie leans down to kiss you on the lips, smearing more of her lust-enhancing lipstick over your mouth.  " +
                    this.SMultiCockDesc() +
                    " stays hard as a rock, but the need to service her pussy with your tongue slowly fades.  You feel oddly sated in spite of your erection, yet you know that a peek at your vapid harpy mistress will likely throw you into a rutting frenzy all over again thanks to the properties of her lipstick.",
                false
            );
            this.player.orgasm();
            this.dynStats("lib", 1, "sen", -1);
            this.sophieScene.luststickApplication(5);
        }
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    private buttFuckBimboSophie(): void {
        this.sophieSprite();
        this.outputText("", true);
        var x: number = this.player.cockThatFits(this.sophieCapacity());
        if (x < 0) x = this.player.smallestCockIndex();
        this.outputText(
            'You instruct your bimbo bitch to bend over and show you that rounded rump that you keep her around for.  She leans away from you, her ass high in the air with tail feathers fluffing, and she cluelessly asks, "<i>Ummm, like this, babe? Or this?</i>"\n\n',
            false
        );

        this.outputText(
            "The bimbo bounces her backside back and forth, making her heavy cheeks jiggle a few inches away from you.  Winking between them, Sophie's puckered anal star and juicy, dripping pussy seem to beckon for your " +
                this.multiCockDescriptLight() +
                ', but you just watch for now, enjoying the sight of such a gorgeous ass jiggling and shaking for you.  After a moment she asks, "<i>Or did you mean like this?</i>"  The harpie flexes her thighs and begins to bounce her ass up and down to a vigorous, butt-shaking rhythm no one but your slut can seem to hear.  Your eyes sway up and down, following the glorious, heart-shaped mass on its ballistic trajectory while ' +
                this.sMultiCockDesc() +
                " becomes hard and completely ready to claim that bouncy butt.\n\n",
            false
        );

        this.outputText(
            "Stepping closer, you toss off your " +
                this.player.armorName +
                ' and reply, "<i>Yes, just like that.</i>"\n\n',
            false
        );

        this.outputText(
            'Sophie claps her hands and gives a girlish squeal of happiness. "<i>Really?  C-can I like, do this a little closer?  ',
            false
        );
        if (this.player.cockTotal() > 1) this.outputText("Those cocks look", false);
        else this.outputText("That cock looks", false);
        this.outputText(
            " delic... de... yummy!</i>\"  You slap her ass, grab her tail feathers, and pull the harpy's winking asshole down onto your " +
                this.cockDescript(x) +
                ". Her voices rises, not in anger, but in delight, and your " +
                this.player.cockHead(x) +
                " pulses pleasantly in the first few inches of the harpy's rectum.  The bimbo relaxes and sinks down, giggling and asking, \"<i>Is-ooh-is my butt, like, good for you?  It's soooo tight, and it's making my cunny all wet and stuff!</i>\"\n\n",
            false
        );

        this.outputText(
            "You squeeze her shuddering rump hard enough to feel her flesh bulging out around your fingers, the soft cheeks nearly subsuming your hands, and then you pull her hard, dragging your " +
                this.cockDescript(x) +
                " the rest of the way inside her, all the way to the ",
            false
        );
        if (!this.player.hasSheath()) this.outputText("hilt", false);
        else this.outputText("sheath", false);
        this.outputText(
            ".  Sophie's breasts sway underneath her, the pendulous globes occasionally dipping low enough to drag her thumb-sized nipples through the rough dirt."
        );
        if (this.pregnancy.event >= 2)
            this.outputText(
                "  Just like her breasts, her gravid tummy sways a little as well, plush with the weight of the egg you've given her."
            );
        this.outputText(
            "  The bimbo moans harder every time it happens and sounds more whorish and lurid with each passing second - a true anal slut.  She looks back at you with lust in her eyes and a gleeful grin on her face.  Suddenly, one of the ditz's fingernails is dragging ",
            false
        );
        if (this.player.balls > 0) this.outputText("over your " + this.ballsDescriptLight(), false);
        else this.outputText("across your taint", false);
        this.outputText(
            ".  It works its way down, crosses the joining of your bodies, and reaches its owner's pussy, circling the puffy lips until a long strand of girl-goo is dangling down towards the ground.\n\n",
            false
        );

        this.outputText(
            "\"<i>So... good.  Why didn't anyone tell me that butt-sex is like, super-duper fun?</i>\"  The breathless bimbo rocks her ass back and forth, and you let her have her 'fun'.  She's wiggling and squirming, impaled on a cock and loving it.  You simply relax and let her go to town, the bimbo's fingers running through her sodden box in time with the butt-jiggling contortions of her body.  Her anus milks your " +
                this.cockDescript(x) +
                " like a machine, drawing out thick streamers of pre-cum to make her ass almost as sloppy as her pussy.  It's hard to stand still with her working you so efficiently, and after a few moments of allowing your bimbo to pleasure you with her plump rump, you tire of waiting.\n\n",
            false
        );

        this.outputText(
            "Pushing her away, you unsheath most of your " +
                SophieBimbo.num2Text(Math.round(this.player.cocks[x].cockLength)) +
                " inches from Sophie's stretched asshole, leaving just your " +
                this.player.cockHead(x) +
                ' to hold the rectal portal open.  She whines in disappointment until you lunge forward and stuff her full of dick so suddenly that she squirts dribbles of lube.  You grab her hair with one hand and ride her ass hard and fast, each thrust punctuated by happy squeals of submissive pleasure from your airheaded anal toy.  Sophie cheers, "<i>Fuck me ' +
                this.player.mf("stud", "babe") +
                ", fuck my ass!  Unh, y-yeah like that.  Mmmm, yeah, pull my hair and tell me what a bad girl I've been!</i>\"\n\n",
            false
        );

        this.outputText(
            "Gods, she's such a naughty little bird bitch!  You yank her hair back and lean over her shoulder, whispering, \"<i>You like that, you brain-dead bimbo?  Look down at all the juices raining from your cunt.  Would anyone but a horny slut get off so hard from having her ass reamed?  I don't think so.</i>\"\n\n",
            false
        );

        this.outputText(
            "You keep butt-fucking her hard and fast, ignoring the sprinkles of sticky, maternal harpy-juice that splatter on your " +
                this.player.legs() +
                " as you fuck her.  In between throaty moans and screams, she bellows out \"<i>YES!</i>\" as loudly as possible, then lapses into quiet, exhausted grunts.  Yet, her vagina does not stop its prodigious leaking; if anything it's dripping and squirting out even heavier flows of submissive girl-spooge.  The harpie's anal ring is convulsing around you, reduced to pointless trembling from the hard fucking you're giving her.  Looking back with lidded eyes, she begs, \"<i>C-cum... cum in my ass... it'll... it'll feel soo good, babe.  Please?  Like, gimme your spooge!</i>\"\n\n",
            false
        );

        if (this.player.balls > 0)
            this.outputText(
                "Your balls seize up at Sophie's request, and you swear you can actually hear the fluid churning and sloshing of your cum before it burns a path of warmth through your body.",
                false
            );
        else
            this.outputText(
                "Your insides seem to seize up at Sophie's request, and you swear you can actually feel the fluid churning a path of warmth through your body.",
                false
            );
        this.outputText(
            "  Seed spews from your " +
                this.cockDescript(x) +
                " into your bimbo's blubbery bottom with an audible gurgle that brings a blush to her cheek.  You pull her hair harder and bounce your " +
                this.hipDescript() +
                " off her bottom a few times, injecting the rest of your cum inside her while you rut at her now-sloppy anus.",
            false
        );
        if (this.player.cumQ() >= 500) {
            this.outputText(
                "  Even though your semen is frothing and spurting from between her cheeks with each push, you keep at it",
                false
            );
            if (this.player.cumQ() >= 1000)
                this.outputText(", filling her belly with spooge", false);
            this.outputText(".", false);
        }
        this.outputText(
            "  With a few final clenches of pleasure, your dick's flow of cum trickles down to a dribble.  You sigh and muse that you must've completely emptied your " +
                this.ballsDescriptLight() +
                " by now, and you slump back against a rock to watch your jizz flood out of Sophie's ass.  She pushes some inside her pink nether-lips with a triumphant smile, clearly pleased with herself.\n\n",
            false
        );

        this.outputText(
            'Still full of energy, the big-tittied ditz bounces around and catches the cum as it drains from her gaped ass, shoving more and more into her soaked quim.  She even licks her fingers once she bores of that and says, "<i>Thanks for making my asshole so creamy!  You even left me enough to like, stuff up my twat so I can have an egg!  Yay!</i>"\n\n',
            false
        );
        if (this.pregnancy.event >= 2) {
            this.outputText(
                "Sophie giggles again, rubbing her already well-filled belly and winking at you, like you're sharing in some absurd joke.  You roll your eyes - bimbos!"
            );
        }
        if (this.sophieIsInSeason()) this.sophiePregChance();
        this.player.orgasm();
        this.dynStats("sen", -1);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // TitFuck
    private fuckBimboSophiesTits(): void {
        this.sophieSprite();
        this.outputText("", true);
        var x: number = this.player.cockThatFits(this.sophieCapacity());
        if (x < 0) x = this.player.smallestCockIndex();
        this.outputText(
            "You grab Sophie's tits in a squeezing grip and pull her towards you, flicking your thumbs across the bimbo's nipples.  She stumbles toward you and purrs, \"<i>Who's being forward now, huh?  If you wanted to play with Momma Sophie's tits, all you had to do was, like, ask!</i>\"\n\n",
            false
        );

        this.outputText(
            "The harpy grabs at your " +
                this.player.armorName +
                " and removes it, leaving your hands free to continue the fondling of her breasts.  Once you're as a nude as your salacious slut, you finally release the huge, watermelon-like breasts and admire your handiwork.  Sophie's ditzy, empty eyes are dilated, her mouth is open and drooling, and her nipples are easily as big as your thumbs.  She's panting softly and just staring at you with her eyes glazed.  You can only assume that her simple mind has slipped into some kind of erotic trance, but if anything it only makes the idea of releasing yourself with her big, soft mammaries that much more appealing.\n\n",
            false
        );

        this.outputText(
            "You grab hold of her nipples and sit down on a nearby rock; the dazed harpy is pulled onto her knees.  "
        );
        if (this.pregnancy.event >= 2)
            this.outputText(
                "Her swollen tummy pushes against your [legs] as she assumes the position, the weighty egg-distorted lump pressing against you.  "
            );
        this.outputText(
            "She wobbles forward and her massive mounds easily slide to either side of " +
                this.oMultiCockDesc() +
                ", completely engulfing it.  Still holding on to her nipples, you pull them together and ",
            false
        );
        if (this.player.cocks[x].cockThickness < 8)
            this.outputText("completely surround yourself", false);
        else this.outputText("surround as much of yourself as possible", false);
        this.outputText(
            " in warm, smooth skin.  The smell of your " +
                this.cockDescript(x) +
                " mere inches from her nose seems to startle Sophie from her trance, and she breaks into a smile so big you'll worry it'll break her face.\n\n",
            false
        );

        this.outputText(
            "\"<i>Wh-what's going o-mmmmmm, that looks nice!  Oooh, and it's already in Momma Sophie's big ol' titties!  Yay!  Like, do you mind if I give it a kiss?</i>\" asks the bimbo with a cross-eyed, dick-addicted look on her face.  You nod your assent and lean back, feeling quite pleased with how this is working out.\n\n",
            false
        );

        this.outputText(
            "Suddenly, Sophie's puckered lips are on your " +
                this.player.cockHead(x) +
                ", sucking it softly while her tongue tickles the sensitive slit of your urethra.  She pops off for a breath with a lusty look in her eyes and spit drooling from the corner of her puffy lips to lubricate her tits.  A golden lip print sits around the circumference of your " +
                this.cockDescript(x) +
                ", marking just how much she's managed to smother in oral pleasure.  Pulling her hands up, she presses her palms into the heavy weight of her breasts, nearly vanishing from view as she drags them up your " +
                SophieBimbo.num2Text(Math.round(this.player.cocks[x].cockLength)) +
                "-inch length.  Her drugged lipstick makes your " +
                this.player.cockHead(x) +
                " tingle deliciously, and you sigh, happy to have such glorious udders growing from your bleach-blonde bitch.\n\n",
            false
        );

        this.outputText(
            "Full, slippery lips slide back around you again, further staining your " +
                this.cockDescript(x) +
                ' in their amber gloss.  It\'s enough to make you swoon and flare, growing thicker inside her smothering mounds while she pumps at you with her tits.  Sophie croons in between sucking on your dick-tip, saying, "<i>Mmm, such a yummy cock!  Let my tits like, milk out all that yummy cum from your cock, okay babe?</i>"\n\n',
            false
        );

        this.outputText(
            "You demur and start pumping your hips.  The bimbo shakes her platinum-blonde feathers in irritation, but she doesn't dare stop you now.  You grab her tits as well, lifting them out of her grip as you begin to fuck them in earnest, your cock cresting through the massive cleavage with each stroke.  Sophie smiles dopily, rapidly forgetting her unhappiness at being so thoroughly manhandled, and she returns to worshipping your " +
                this.player.cockHead(x) +
                " each time it comes anywhere near her mouth.  Spit and golden lipstick drool down her cleavage, and soon your rod looks like a golden spear of lust, trembling in the pale valleys of your bimbo slut's mountainous peaks.\n\n",
            false
        );

        this.outputText(
            "Closing your eyes, you revel in bliss, utterly satisfied by the surging pleasure of having your cock smothered in fertility-enhancing drugs while it's tit-fucking a motherly harpy's giant breasts.  A simple, breathy voice begs, \"<i>Please cum for me... let out all of that fun stuff on my titties and slutty, cock-slurping lips.  Like, paint me with your seed, I wanna be your fat-bottomed harpy slut!</i>\"\n\n",
            false
        );

        this.outputText(
            "One of the dumb blonde's hands circles under her bouncing, jiggling chest to stroke your " +
                this.cockDescript(x) +
                ", jacking you off with the spit, sweat, and drugged gloss as lubricants.  She jerks you hard and fast, smearing it ",
            false
        );
        if (this.player.balls > 0)
            this.outputText(
                "all over your balls whenever she needs a break, and you feel your " +
                    this.ballsDescriptLight() +
                    " growing heavier by the moment.",
                false
            );
        else
            this.outputText(
                "all over your taint and asshole, and you feel your body churning, building up more seed for your moronic mate.",
                false
            );
        this.outputText(
            "  " +
                this.SMultiCockDesc() +
                " thickens and bloats, a rush of warmth rushing up the base as your internal muscles clench tight, squeezing out a globby rope of jism.  It explodes from your cum-slit, taking Sophie full on the face.\n\n",
            false
        );

        this.outputText(
            "You're just getting started.  Sophie smirks and opens her mouth, letting her tongue slide out to taste your jizm as you launch the next rope, so long it trails from her hair to her chin and so thick it rolls in drops from the side of her face.  She hums in delight and squeezes her breasts tight around your " +
                this.cockDescript(x) +
                ", the next blast backing up inside you from the pressure.  A moment of buildup later, and your seed germinates and blooms over the harpy's tits, soaking them with spunk.  Droplets of the stuff splatter onto the ground around the both of you, but you just keep coming.  In your mind you have visions of yourself knocking up harpy after harpy, the slutty bird-girls mounting your fountaining fuck-stick long enough for their bellies to bloat with seed before moving on.  Like this, you could inseminate a whole tribe...\n\n",
            false
        );

        this.outputText(
            "Once the thought passes, you sag back, utterly spent and more than a little parched.  Blinking the haze from your eyes, you look over at Sophie.  She's on her back, frigging herself non-stop and utterly lost to the world.  Her pretty blonde hair is plastered against her, her boobs are covered in a thick layer of white, "
        );
        if (this.pregnancy.event >= 2) this.outputText("her swollen midriff is glazed, ");
        this.outputText(
            "and her eyes are closed, held shut by a thick layer of your sperm.  She's been well and truly bukkaked, drenched in ejaculate, and judging by how furiously she's schlicking away at her pussy, she couldn't be happier.  As for you, " +
                this.sMultiCockDesc() +
                " is still erect, even though you feel like you don't have a drop left in you.  Of course, the drugs soaking into your gold-tinted cock will probably keep you hard and ready to breed for hours.\n\n",
            false
        );
        this.sophieScene.luststickApplication(5);
        this.player.orgasm();
        this.dynStats("sen", -1);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Bimbo Sophie Camp Event – (If the player has an Ovi Elixir)
    // 1 in 700 proc chance (roughly once a month? or flat 30 days)
    public sophieEggApocalypse(): void {
        this.sophieSprite();
        this.outputText("", true);
        // First time
        if (this.flags[kFLAGS.TIMES_SOPHIE_HAS_DRUNK_OVI_ELIXIR] == 0) {
            this.outputText(
                'You find her rooting through your belongings, curiously picking up bottles with her feet, trying to figure out what everything does.  She\'s surprisingly careful with the glass vials, raising her clutching talons to eye level and bobbing her head left and right before grabbing a new potion. "<i>What do all these symbols mean?</i>" she asks, inquisitively. When she grabs a hexagonal bottle, however, her eyes light up. "<i>Oh! I know this! This is an egg!</i>" She holds it out, proudly displaying the egg symbol on your Ovi Elixir. You nod and she flushes with irrational pride at getting one right. "<i>I used to lay so many eggs. All my pretty little babies,</i>" she sighs, wistfully. Pursing her golden lips, the harpy\'s face scrunches in thought, struggling to put an idea together. She perks up as it gradually works through the lusty haze you\'ve made of her mind. "<i>Ah! What if I drank this? Would I have more eggs? Ooh oh oh, pleeeeeease? Can you spare this one little bottle so that I can be a mommy again?</i>" She strokes the flat of her belly with platinum blond feathers, anxiously remembering the pregnancies of her youth. Would you like to play the dutiful spouse and give your bird-brained bimbo a chance to relive her wanton youth?',
                false
            );
        }
        // Repeat
        else {
            this.outputText(
                'You let Sophie find another Ovi Elixir amid your supplies and her normally vapid expression locks into a grin of impatient glee. "<i>Oh, can we do it again? Please please please!</i>"',
                false
            );
        }
        // [Daddy (Male/herm)] [Mommy (female/herm)] [Leave]
        var daddy = undefined;
        var mommy = undefined;
        this.flags[kFLAGS.TIMES_SOPHIE_HAS_DRUNK_OVI_ELIXIR]++;
        if (this.player.hasCock()) daddy = this.beBimboSophiesSugarDaddy;
        if (this.player.hasVagina()) mommy = this.beBimboSophiesSugarMommy;
        this.simpleChoices(
            "Daddy",
            daddy,
            "Mommy",
            mommy,
            "",
            undefined,
            "",
            undefined,
            "Leave",
            this.playerMenu
        );
    }

    // [Daddy]
    private beBimboSophiesSugarDaddy(): void {
        this.sophieSprite();
        this.outputText("", true);
        var x: number = this.player.cockThatFits(this.sophieCapacity());
        if (x < 0) x = this.player.smallestCockIndex();
        if (this.player.hasItem(this.consumables.OVIELIX))
            this.player.consumeItem(this.consumables.OVIELIX);
        else if (this.inventory.hasItemInStorage(this.consumables.OVIELIX))
            this.inventory.consumeItemInStorage(this.consumables.OVIELIX);
        this.outputText(
            "Giving Sophie a sly smile, you pluck the Ovi Elixir from her talons and run a fingertip along her sharp jaw line as you move around her in slow, contemplative circles. The anticipation drives the slutty harpy mad, her chest heaving and mouth agape as she puffs moist breath over her thickly-lacquered, golden lips. Pausing behind her, you seize the enraptured woman's feathery hair with one hand, jerking her head back so suddenly she gasps before giggling uncontrollably. Popping the delicate glass stopper from the hexagonal bottle, you hold it several feet above her waiting mouth, tilting the vial ever so slowly until a tiny drop of the viridian ichor bubbles at the elixir's tip. Sophie sticks out her tongue, impatiently, wriggling it in the air, as if her sheer, lascivious desire could pull the potion into her gullet. Finally, agonizingly, you upend the potent brew into her gluttonous maw, the whore's expertly honed instincts catching the emerald fluid in her drool-slick mouth without missing a single drop. She rolls the mixture over her tongue, savoring the promise of the concoction before sealing her glistening mouth in the pleased pucker of a kiss, swallowing the load with a single, satisfied gulp.\n\n",
            false
        );

        this.outputText(
            'Settling down next to Sophie, you can\'t help but notice that she looks thicker already. "<i>OoOoOo...</i>" she moans, "<i>I can feel them inside my tummy! Sweet little eggs growing in mommy\'s belly.</i>" She guides your hand to her midsection, your fingers stroking the soft flesh of her pouting abdomen. Sure enough, you can feel a tremor rippling through her womb as it expands with the surging growth of eggs. Cupping her dripping sex, you delight in the heat pouring off of her pussy, the promise of pregnancy thrilling the simple, sex-starved slut to vulgar wetness. You slip a few fingers into her creaming cunny, provoking a high-pitched squeal of pleasure from the squirming milf. She grinds her hips into you, drawing your honey-slick hand out from between her legs and pressing it against her belly again. It seems the eggs are still growing, and quite rapidly! Her gut has already expanded into an unmistakable bulge and every gurgling grumble from her body adds another inch to her waistline. "<i>You have to fertilize me,</i>" she begs with half-lidded eyes. "<i>Mommy needs that thick spunk inside her,</i>" she moans, face flushed, hands sliding between her legs, frantically rubbing her sopping snatch with both thumbs.\n\n',
            false
        );

        this.outputText(
            "You're pretty sure Ovi Elixir eggs can't be fertilized, but the dumb ditz doesn't know that and the look of wanton desperation on her trembling face is more than enough to excuse a little fun. Stripping, you hook your hands under her arms and haul her up, the harpy's body surprisingly light despite the mammoth, sweat-slick tits wobbling on her chest. Settling down, you lower Sophie over your " +
                this.cockDescript(x) +
                " as you lie on your back. Using her feet, she guides your twitching member toward her rosy slit and you note with amusement that she's taken to painting her talons pink, as if they were toenails. As your tip slides past her lips, she sighs in ecstatic relief, as if you were quenching a fire within her body. Unable to restrain herself, she plunges down, impaling herself on your straining phallus and slapping her tremendous ass against your inner thighs. She holds there for a moment, savoring the wonderful lewdness of her egg-filled womb and cock-filled uterus before you give the empty-headed woman a savage thrust, reminding her there's somebody attached to the " +
                this.cockDescript(x) +
                " ",
            false
        );
        if (this.player.balls > 0) this.outputText("balls-", false);
        this.outputText(
            "deep inside her. Using both her wings and arms, she flaps frantically, lifting herself a few inches up before the weight growing inside drops her back to the ground, slapping Sophie right back down atop your shaft. Too stupid to recognize a pattern, she keeps trying to fly only to be grounded, pumping up and down on your dick with every muscle in her body. Every time she slams against you, her squelching belly seems to grow larger until you can actually make out the outline of eggs under her bulging skin.\n\n",
            false
        );

        this.outputText(
            "As your climax nears, you grow bored with her futile attempts to fly, which have become mere grinding by this point - she's unable to lift herself off of your cock, even with her legs. You grab the harpy's broad hips in both hands and, grunting at her pregnant weight, you push the bloated milf onto her back, rising to lean over her to finish the job. With quickening pace, you fuck the blonde bimbo as hard as you can, her tits swaying back and forth with every pounding jolt. Wrapping her arms and wings around your back, a blinding, tickling curtain of feathers envelops you and you lose your focus long enough for your orgasm to bubble over. Thick, fertile ropes of jizz erupt from your " +
                this.cockDescript(x) +
                ", splashing into Sophie's depths, creamy seed licking at her cervix and basting the slut's uterus as platinum pale as her feathers. She coos wordlessly, her belly churning and squelching at the stimulation of your throbbing cum hose. Her abdomen has swollen several times the size of her normal waist, so heavily pregnant that it looks like she's about to pass a trio of baby minotaurs.\n\n",
            false
        );

        this.outputText(
            "As you pull out - sticky strands of pearlescent spunk still connecting you to her quivering cunt - her back arches in orgasmic bliss, her stomach lurching in the spasms of birth. Muttering aimlessly to herself, Sophie bites down on her lipstick-slathered lips and digs her talons into the ground as the contractions accelerate. You push her knees apart and brace your fingers against her puffy vulva just as the featureless surface of an egg pushes past her lips, the oval seemingly growing larger and larger until it finally pops free, an uneven sphere as large as a grapefruit tumbling into your hands. Hot on its heels, more eggs push their way into freedom as Sophie shrieks in surprisingly melodic throes of bliss. As one pile becomes two, then three, you realize there must've been dozens of egg growing inside her womb, perhaps her body reacting to the Ovi Elixir by giving it all she's got. With the small eggs out of the way, her belly finally settles down to a more reasonable thickness, though it's clear she's not done just yet. Puffing breaths as hard as she can, Sophie gives a monumental groan of effort and spreads her legs as far apart as possible. Slowly, with agonizing euphoria, she pushes out an egg as large as a watermelon, hyperventilating before clenching every muscle in her body to pass a second hot on the heels of the first. Her pussy gushes with the honey of her climax, a third monumental egg popping free before, finally, it seems as though she's empty. If she didn't have such wide, breeder's hips and an entire youth of birthing, you're not sure she'd be able to pass the jumbo-sized eggs. Even after all that, her pussy seems to have settled back to its normal size, without any lasting ill effects from the absurdly huge eggs. No wonder Sophie's so proud of being a mommy - a clutch of eggs like that would've ruined a lesser woman.\n\n",
            false
        );

        this.outputText(
            'Basking in the afterglow for a moment longer, she begins preening herself, pride plastered on her face thicker than her golden makeup. "<i>Momma Sophie\'s so good at birthing eggs,</i>" she brags, wrapping her arms around your shoulders. "<i>But you were so great too, Daddy,</i>" the older woman remarks, affectionately slathering your face with kisses.  Some birds cannot change.  You sigh as the aphrodisiac sinks into your skin and ' +
                this.sMultiCockDesc() +
                " hardens to tender stiffness again.  For the rest of the hour, the two of you fuck like newlyweds, only bothering to take stock of the inert eggs once you're both sore and exhausted.\n\n",
            false
        );

        this.player.orgasm();
        this.dynStats("sen", -1);
        this.sophieScene.luststickApplication(2);
        // [player gains random large egg]
        this.inventory.takeItem(
            this.consumables.LARGE_EGGS[SophieBimbo.rand(this.consumables.LARGE_EGGS.length)],
            this.camp.returnToCampUseOneHour
        );
    }

    // [Mommy]
    private beBimboSophiesSugarMommy(): void {
        this.sophieSprite();
        this.outputText("", true);
        if (this.player.hasItem(this.consumables.OVIELIX))
            this.player.consumeItem(this.consumables.OVIELIX);
        else if (this.inventory.hasItemInStorage(this.consumables.OVIELIX))
            this.inventory.consumeItemInStorage(this.consumables.OVIELIX);
        this.outputText(
            "Grinning, you playfully shrug. You suppose you can make a gift of it, if she's a good girl. Nodding energetically, Sophie puffs out her chest and stretches out her arms and wings, displaying her silvery plumage, vainly. \"<i>Don't you worry, Momma Sophie's done this a hundred times!</i>\" She flicks the bottle open and pours the green fluid into her mouth, her expression one of intense delight as the thick liquid splashes across her tongue, full of promise. She flutters into the air, barely able to lift her tremendous tits, and wraps her arms around your shoulders, legs hooking around your waist. Smiling sweetly, she leans in for a kiss and presses her glistening lips against yours, the heat of her aphrodisiac-laced lipstick coursing through your body instantly. You part your mouth to gasp softly and she uses the opening to deepen the kiss. Through the drugged excitement, you almost don't notice the cool elixir trickling into your mouth. You start to back away, but Sophie's muscular tongue forces your lips open and she eagerly snowballs more of the potion past your teeth, into your throat. Then, taking a big gulp herself, she nuzzles your nose with hers, gleefully. \"<i>Now we'll both be mommies!</i>\"\n\n",
            false
        );

        this.outputText(
            "You try to throw the bimbo off of you in annoyance, but a trembling lurch from your abdomen robs you of your anger. Something strange is going on with the Ovi Elixir- the gradual process of its effects seem to be wildly accelerated. You're not sure if it's the drugged lipstick or something about Harpy saliva, but Sophie's kiss has clearly affected the potion. It seems she's suffering the same effects, at least: the harpy's belly swells against your skin with every passing moment, the skinny slut's waist ballooning under the impregnating draft. Your own tummy grows against hers and a wave of contentment thrills down your " +
                this.player.skin() +
                ", the weight of your swelling womb making your " +
                this.vaginaDescript(0) +
                " drool in anticipation. Even your " +
                this.allBreastsDescript() +
                " feels heavier as your body is kicked into the depths of pregnancy in a matter of minutes. The mischievous harpy moans, stroking her belly with one hand while she grinds her pert nipples into your " +
                this.nippleDescript(0) +
                ", getting off on the tension of your jutting bellies, distended with eggs, mushrooming against each other. Through her groping contact, you can feel the contents of your stretching womb gaining shape and firmness within you, the suddenness of the conception robbing you of your restraint. Despite yourself, you let out a whorish moan, your body clenching down in orgasm at your bloating growth.\n\n",
            false
        );

        this.outputText(
            "You pant, falling to your " +
                this.buttDescript() +
                ", only to find that the sudden shock has initiated labor! Perhaps in a sympathetic response, Sophie's torso lurches, trembling as her body begins contracting to force out the eggs. \"<i>Oh, it's just as good as I remember,</i>\" she shrieks in rapture. \"<i>Watch Momma Sophie, she'll show you how it's done!</i>\" The inflated harpy rolls onto her back and kicks her legs into the air, pink-painted talons stretching wide as she steadies her breathing. Groaning with the weight of her womb, she digs her fingers into the ground and clenches her eyes, ecstatic drool leaking from the side of her mouth as she pushes with all her might. Not to be outdone, your own pussy tingles with inflamed pleasure, your muscles shivering with the pressure inside you. You bite down on the inside of your cheek and try to reach your " +
                this.clitDescript() +
                " to jill yourself off, but find your overfilled belly blocks your arms from reaching your cunt. Helplessly, you run your hands over your stretched " +
                this.player.skin() +
                ", every gurgling tremor of your spasming, egg-stuffed depths igniting minor orgasms that pour through your mind and body like a torrential river of squirting, squirming sexual release. It isn't until the first egg slides out of your body that you notice that you've gone into labor, the smallest eggs popping out of your " +
                this.vaginaDescript(0) +
                " with every spasm of your inner walls.\n\n",
            false
        );

        this.outputText(
            "Eggs tumble from your body, thick and fast, rolling out of your clenching cunny in twos and threes, your muscles operating purely instinctually as you just lie back and gurgle in unfocused bliss, lubricating girl-cum spurting from your ongoing sequence of orgasms. The small eggs clear your uterus easily enough, but the remaining eggs feel oh so much larger. You rub your belly, feeling their girth through your sweat-slick abdomen. The largest egg finds itself pressed against your cervix and a burst of pain cuts through the suffocating ecstasy like a splash of cold water. You struggle, panting, to push it free, but your rebellious muscles refuse to relax, holding the titanic egg inside your womb as long as they can. With the rest of your load emptied, you can actually see the jumbo-sized egg's shape through your" +
                this.player.skin() +
                ", a hulking protrusion refusing to leave your aching womb. In desperation, you try Sophie's method, rolling your weight onto your back and heaving your knees shoulder-high. You clench your teeth to slow your breathing and ball your hands into fists, focusing every inch of your strength on pushing the egg past your cervix. With agonizing slowness, the large egg squeezes out of your womb, into your birth canal and past your quivering vulva, finally plopping out of your pussy. A ragged gasp of relief shudders from your lungs and it feels as though an immense weight has been removed from your chest. The sheer pleasure of birthing the monumental oval is enough to give you one final climax, your body too weak to even lift your head.\n\n",
            false
        );

        this.outputText(
            "You come to before long, your whole body raw from the experience. Sophie is between your thighs, lapping at your " +
                this.vaginaDescript(0) +
                " with her narrow tongue and sucking at your " +
                this.clitDescript() +
                ' with her plump, golden lips. You\'re about to push her away until you realize that her tender ministrations are taking the lingering tenderness of the birth from your abused pussy. Gingerly, you check your oozing sex, relieved to find that your body isn\'t nearly as stretched out as you assumed the ruinous egg would leave you. "<i>Silly girl,</i>" Sophie chides, "<i>lipstick is good on both sets of lips! How do you think we can still please our mates?</i>" She gestures at the piles of eggs the two of you have laid and you gasp. There are easily three dozen eggs, the smallest of which is apple-sized.  You find yourself a bit intimidated to see the sheer bulk of the fruits of your womb. "<i>Girl, you\'ve got to find us some studs one of these days! It\'s SO MUCH BETTER when the eggs are fertilized.</i>" She leans in close, conspiratorially. "<i>They get even bigger,</i>" she giggles. You\'d like to tell her to go to hell with the thought of larger eggs, but Marae help you, you just can\'t change. Shaking your head, you push the harpy bimbo\'s puckered mouth down to kiss your pussy a little bit better before cleaning up and taking stock of all the eggs.\n\n',
            false
        );

        // [player gains random large egg]
        this.player.orgasm();
        this.dynStats("sen", -1);
        // [player gains random large egg]
        this.sophieScene.luststickApplication(2);
        this.inventory.takeItem(
            this.consumables.LARGE_EGGS[SophieBimbo.rand(this.consumables.LARGE_EGGS.length)],
            this.camp.returnToCampUseOneHour
        );
    }

    // Butts McGee
    // =====================================================
    private rideDatSophieVag(nice: boolean = false): void {
        this.clearOutput();
        this.sophieSprite();
        var x: number = this.player.cockThatFits(this.sophieCapacity());
        if (x < 0) x = this.player.smallestCockIndex();
        var y: number = -1;
        if (this.player.cockTotal() > 1) {
            y = this.player.cockThatFits2(this.sophieCapacity());
            if (y < 0) {
                y = this.player.biggestCockIndex();
                if (y == x) y = this.player.smallestCockIndex();
            }
        }
        if (this.player.cor <= 50) nice = true;
        if (nice) {
            this.outputText(
                "Before you can decide what, exactly, you're going to do with your harpy slut, Sophie jiggles her way over to you, the insides of her thighs dripping with every step.  You watch as the plump bird wobbles, too aroused and too damn big to walk straight, but eventually she does manage to make it to you."
            );
            if (this.pregnancy.event >= 2)
                this.outputText("  Her pregnancy-imbued middle doesn't really help, either.");
            this.outputText(
                '\n\n"<i>Like, hey, babe...</i>" she coos, leaning forward and pressing her plushy, oversized breasts against you. Her nipples in particular push hard against your [armor], the harpy completely aroused, and before you can do anything else - she leans in and kisses you, drug-ringed lips smacking desperately against yours again and again.'
            );

            this.outputText(
                "\n\nFor a second you lose yourself in it as the drugged cocktail starts to run through you, making [eachCock] start to throb and pulse as "
            );
            if (this.player.cockTotal() >= 2) this.outputText("they grow");
            else this.outputText("it grows");
            this.outputText(
                " hard inside of your [armor], and your arms slowly start to reach up to fondle the drug-laden harpy.  She coos and squawks into your kiss as you feel her up, shaking her feathered rump for you as you squeeze it, until finally she pulls off of your drug-tethered kiss as you give the fat thing a light little slap."
            );

            this.outputText(
                '\n\n"<i>Can we, can we fuck? Can we? Momma Sophie n-needs it so bad...</i>"  Her voice jumps and her mind wanders every time you grope her blonde-ringed ass, but she manages to get the question out despite your... enjoyment.  You give voice to the fact that you hadn\'t exactly <i>told</i> her you wanted to have sex before this, and she pouts for a bit... until [oneCock] pushes against her through your [armor], and she immediately brightens.'
            );

            this.outputText(
                '\n\n"<i>Well, like, you totally want to fuck now, right?</i>" Sophie asks you, her voice hitching into a soft, squawky moan.  You mutter under your breath as the harpy turns and saunters away, her fat rump jiggling with each step of her talon-capped legs, and she turns once more to sit down on it, the bulging cheeks apparently making a pretty comfortable cushion.'
            );

            this.outputText("\n\nSophie looks at you - and the bulge");
            if (this.player.cockTotal() > 1) this.outputText("s");
            this.outputText(
                " in your [armor] - and starts to finger herself as she watches to see what you'll do, her wet folds easily parting for her randy, exploring fingers."
            );
            this.outputText(
                "\n\n\"<i>So let's, y'know, let's fuck, okay? Okay, babe? We can fuck, r-right?</i>\" she pleads with you, biting her lower lip.  Her fingers are digging farther into her soppy snatch now, and you can tell that either you're going to fuck her into a coma, or she's going to do it to herself. And damn it, you <i>are</i> hard now, so it may as well be you."
            );

            this.outputText(
                "\n\nYou strip off your [armor] with a grumble, [eachCock] bouncing as you do, and you make your way over to the gesticulating harpy as she beckons you with her free hand, squawking out little '<i>yeahs</i>' and '<i>come heres</i>'.  You shove the harpy down, onto her back, and watch with some amusement as her massive chest wobbles and bounces from the impact."
            );

            this.outputText(
                '\n\nDeciding that no, you don\'t want to fuck her just yet, you grab her masturbating hand and her beckoning one and yank them both upward, leaning over the harpy as you pin them above her head.  "<i>Yeah!</i>" Sophie cries, feeling [eachCock] rubbing against her crotch.  "<i>D-do it! I, I need it so bad!</i>" she croons, jiggling her chest at you.  You grope one of her plush breasts with your free hand as you slowly grind your hips against her, rubbing your [cock biggest] straight against her snatch.'
            );

            this.outputText(
                '\n\n"<i>Not yet,</i>" you casually inform her, smirking wickedly, "<i>you need to be punished first, you skank.</i>" You let go of the harpy\'s big breast and take hold of one of her nipples, squeezing it just hard enough to hurt - hard enough for a little pain to mix with the pleasure.  "<i>N-no, baby! I like, I need, like-</i>" You interrupt her by squeezing tighter for a moment, making her voice catch as she moans.  She\'s actually enjoying it!'
            );

            this.outputText(
                '\n\n"<i>You need what?</i>" you ask her, not intending to let her answer as you pinch her massive tits again.  She chirps in pain, her teeth gritting together a little as she gets even wetter, and you pause to pinch and roll her nipples back and forth between your fingers.  You rub the little bud with your clever digits, watching as the harpy\'s eyes water almost as much as her pussy.'
            );

            this.outputText(
                '\n\n"<i>Well?</i>" you ask her.  "<i>What do you need?</i>" She opens her mouth as you ready another set of pinches, but then shuts it, letting out a high, chirpy whine from her throat.  "<i>Yes, that\'s better,</i>" you coo, bringing your hand slowly back down to pat the slut\'s sensitive tits.  She whimpers from the contact, especially when you press your hand down and rub it back and forth over her nipples, but stays quiet.'
            );

            this.outputText(
                '\n\n"<i>That\'s better,</i>" you reaffirm, gripping one of her wobbly tits by the base.  You pull up on it, squeezing the oversized melon from bottom to tit as she moans through her closed lips, and you grab ahold of her nipple once more, pinching the reddened nub.  That gets a higher-pitched moan out of her as she stares, pleadingly, into your eyes, but in response you merely grind your ' +
                    this.cockDescript(x) +
                    " against her, letting the harpy feel it."
            );

            this.outputText(
                "\n\nYou lean down afterwards, holding one big, floppy tit up, and lock your drug-suffused lips onto it; Sophie lets out a squawk, her lips flying open, but as you look up at her, she shuts her mouth again.  It seems you <i>can</i> teach a bimbo new tricks.  You start to suckle on her teat, tongue roving over her sensitive areola and nipple, and her body shudders as your free hand mauls her other breast, all gropes, pinches and squeezes as you attack the slutty bird's oversized cleavage."
            );

            this.outputText(
                "\n\nSophie's hips start to grind against you, just barely strong enough to move the girth of her fat butt with your weight also pinning her down, and as a result the sensations of your " +
                    this.cockDescript(x) +
                    " rubbing against her needy slit only grow stronger.  You close your teeth on Sophie's nipple, watching as she gets a worried look in her eyes for a moment, and then you slowly grind them back and forth, roughly grinding the nub between your teeth."
            );

            this.outputText(
                "\n\nHer mouth <i>does</i> gape open this time as she lets out a shrill, crying moan, but you let it slide as you kick your stimulation of the bird's big mammaries into overdrive, licking, sucking, pinching and rubbing as Sophie mewls, squawks and raises her voice into a constant stream of pleasured cries.  You'd grin if your mouth wasn't full of harpy tit, but as it is... you let go, watching as her breast drops back down to bounce against her chest, and smirk at her."
            );

            this.outputText(
                '\n\n"<i>So then,</i>" you coo, reaching down and grabbing your ' +
                    this.cockDescript(x) +
                    ".  You give it a few strokes, enjoying the feeling of your cock between your fingers, and then angle it so the tip is rubbing directly against Sophie's gushing cunt, the bird herself begging you with her eyes.  You let go of her other breast to rub a downy-feathered thigh, and she bites her lip as you chuckle."
            );

            this.outputText(
                '\n\n"<i>Ready?</i>" you ask her, prodding your tip against her entrance.  She opens her mouth to answer - and you shove in all at once, enjoying the way her voice hikes up a couple of octaves as she moans in sheer pleasure.  Her soppy cunt squeezes down on your ' +
                    this.cockDescript(x) +
                    ", the internal muscles desperately trying to work you, but you give them little room to do so; you instead pull right back out, watching as Sophie's arms - freed from your grip - reach out to try and tug you back in."
            );

            this.outputText(
                '\n\nThey don\'t have to.  You spear the harpy open again with your throbbing cock, enjoying the way her wet insides shudder for a moment before they can actually grip down on you, and then pull back once more, settling into a rhythm.  "<i>Tell me what you want,</i>" you command her, slowly working your hips into a frenzy.'
            );

            this.outputText(
                '\n\nSophie eagerly complies, her voice ringing out.  "<i>Yes, yes, yes, f-fuck, yes, more! Puh-please! Ye-hes!</i>" she cries, her usually halting language forced into a stream of constant, desperate pleas for you and your cock.  You hear a subtle swishing as the feathery fan she calls a tail tries to move back and forth underneath of her, making a tiny dirt angel, and you lean forward once more, really getting into things.'
            );

            this.outputText(
                "\n\nSophie moves to wrap her arms around you as you lean over her, and you oblige her this once, letting the matron-turned-bimbo pull you against her bouncing, heaving chest.  Your face ends up stuffed straight into her cleavage as you pound her, your [chest] bumping against the underside, and you motorboat the harpy's tits, sucking hard on each orb as you move back and forth between them."
            );

            this.outputText(
                "\n\nShe half-giggles, half-moans from the treatment, but you pull her attention away from it by speeding up your fucking.  Your pre spills out inside of her as her walls adapt to your rapid pace, doing a better and better job of squeezing you with each thrust, and the mixed fluids from your sex start to drool out from the bitch's tight hole, spilling onto the ground."
            );

            this.outputText(
                "\n\nYou wrap your arms around her as the two of you rut together, reaching down, and your hands manage to find their way through the blonde feathers and onto her fat, squishy butt as she tries to hump it against you, her tail smacking lightly against your wrists.  You grip her jiggly cheeks in each hand and lift the harpy's hips against your own, the juices from your sex drooling down onto the thick mounds, and you use the increased leverage to pound the bimbo-slut harder."
            );

            this.outputText(
                "\n\nYour hips turn into a staccato of smacks and slaps as you help Sophie thrust against your constant pounding, her walls trying their very damnedest to milk your " +
                    this.cockDescript(x) +
                    " of its seed, and her feathery arms run across your back as she lets out another squawky moan - and then her body seizes up."
            );

            this.outputText(
                '\n\nThe bird bitch comes on and around you as her body shudders, her fluids gushing all over your dick and the excess squirting out of her as her insides contract around you, but you don\'t stop; instead you pull your head up from her cleavage - as hard as that is to do, with how big the bounding, heavy orbs are - and growl at her.  "<i>You came already?</i>" you ask aloud, fucking her harder in a rush to join her.'
            );

            this.outputText(
                "\n\nYour hands tighten their grip on her fat butt as she cries out, \"<i>I'm sorry!  I'm sorreh!  S-sorry!  Sorr- sorr- sorrahh-haah!  Ahn! Ah!</i>\" in an increasingly-broken mantra, the urge to moan quickly overpowering the urge to apologize.  You smirk as you tilt your head back down, tired of straining your neck, and decide that you'll just have to get your orgasm yourself - besides, what's better than having your big-bootied bimbo girl creaming non-stop around your cock until you cum?"
            );

            this.outputText(
                "\n\nAnd so, you squeeze hard on Sophie's butt, locking her hips into place, and rut against her again and again and again, slapping your hips strongly against hers as you hilt inside her hot, wet cunt in search of more pleasure.  And pleasure you find; the bird-bitch's hungry cunt is all too happy to milk your cock for its seed, undulating and moving around it like a living thing."
            );

            this.outputText(
                "\n\nPleasure builds up from your prostate to your crotch as you start to get close, "
            );
            if (this.player.balls > 0)
                this.outputText(
                    "your [balls] bouncing and slapping against what parts of Sophie's bubble butt they can reach, "
                );
            this.outputText(
                "and you start to grunt and moan with each movement of your hips as you get close.  Sophie picks up on it as well, her eyes lighting up as she drools, and her back-rubbing arms pull you against her."
            );

            this.outputText(
                "\n\n\"<i>Cu-cum, cum!  Cum in me!  F-fill me up, show me just how much you love, muh, momma Sophie's c-cunt!</i>\" the bird slut begs you, her legs wrapping around your thighs.  It doesn't take much for you to oblige her; you hump and thrust into her heated depths faster and faster as she moans encouragingly, and then finally, with a yell, you bury yourself inside of her."
            );
            // ((Still uses same cumshots and post-coitus text as before))*/
        } else {
            this.outputText(
                "Before you can decide what, exactly, you're going to do with your harpy slut, Sophie jiggles her way over to you, the insides of her thighs dripping with every step.  You watch as the plump bird wobbles, too aroused and too damn big to walk straight, but eventually she does manage to make it to you."
            );
            if (this.pregnancy.event >= 2)
                this.outputText("  Her pregnancy-imbued middle doesn't really help, either.");
            this.outputText(
                '\n\n"<i>Like, hey, babe...</i>" she coos, leaning forward and pressing her plushy, oversized breasts against you.  Her nipples in particular push hard against your [armor], the harpy completely aroused, and before you can do anything else - she leans in and kisses you, drug-ringed lips smacking desperately against yours again and again.'
            );
            this.outputText(
                "\n\nFor a second you lose yourself in it as the drugged cocktail starts to run through you, making [eachCock] start to throb and pulse as [if (cocks >= 2) they grow][if (cocks = 1) it grows] hard inside of your [armor], and your arms slowly start to reach up to fondle the drug-laden harpy... before your eyes snap wide and you shove her off."
            );
            this.outputText(
                '\n\n"<i>You bitch!</i>" you curse her, glaring as she falls onto her fat rump.  The stupid bird boggles for a moment, trying to process what just happened, but you\'re having none of it.  "<i>If I wanted to fuck you, I\'d fucking do it!</i>"  You berate her, slowly stripping off your [armor].  Despite your yelling, she only seems turned on; she licks her lips and begins to rub her drooling cunt as she watches you strip, and you glower at her the entire time, only being irritated by her encouraging moans.'
            );
            this.outputText(
                "\n\n\"<i>Well, like, you totally want to fuck now, right?</i>\" Sophie asks you, her voice hitching into a soft, squawky moan.  \"<i>So let's, y'know, let's fuck, okay?  Okay, babe?  We can fuck, r-right?</i>\"  Her fingers are digging farther into her soppy snatch now, and you can tell that either you're going to fuck her into a coma, or she's going to do it to herself.  And damn it, you <i>are</i> hard now, so it may as well be you."
            );
            this.outputText(
                "\n\nYou kick off the last of your [armor] with a grumble, [eachCock] bouncing as you do, and you make your way over to the gesticulating harpy as she beckons you with her free hand, squawking out little '<i>yeahs</i>' and '<i>come heres</i>'.  You shove the harpy down, onto her back, and watch with some amusement as her massive chest wobbles and bounces from the impact."
            );
            this.outputText(
                '\n\nDeciding that no, you don\'t want to fuck the slut just yet, you grab her masturbating hand and her beckoning one and yank them both upward, leaning over the harpy as you pin them above her head.  "<i>Yeah!</i>" Sophie cries, feeling [eachCock] rubbing against her crotch.  "<i>D-do it! I, I need it so bad!</i>" she croons, jiggling her chest at you.  You grope one of her plush breasts with your free hand as you slowly grind your hips against her, rubbing your [cock ' +
                    (x + 1) +
                    "] straight against her snatch."
            );
            this.outputText(
                '\n\n"<i>No,</i>" you casually inform her, smirking evilly, "<i>you need to be punished first, you skank.</i>"  You let go of the harpy\'s big breast and snap your hand back in an arc, making it come back down on her tits at an angle and spanking them both as the harpy caws out in pain beneath you.  "<i>N-no, baby! I like, I need, like-</i>"  You interrupt her by smacking her big jugs again, making her voice catch.'
            );
            this.outputText(
                '\n\n"<i>You need what, you overstuffed turkey?</i>" you ask her, not intending to let her answer as you slap her massive tits again.  She chips in pain, her teeth gritting together, and you pause to pinch one of her nipples between your fingers.  You rub and roll the little bud with your fingertips, watching as the harpy\'s eyes water and stare pleadingly at you, and smile.'
            );
            this.outputText(
                '\n\n"<i>Well?</i>"  You ask her.  "<i>What do you need?</i>"  She opens her mouth as you pull your hand back for another slap, but then shuts it, letting out a high, chirpy whine from her throat.  "<i>Yes, that\'s better.</i>"  You coo, bringing your hand slowly back down to pat the slut\'s reddened tits.  She whimpers from the contact, especially when you press your hand down and rub it back and forth over her nipples, but stays quiet.'
            );
            this.outputText(
                '\n\n"<i>That\'s better.</i>"  You reaffirm, gripping one of her wobbly tits by the base.  You pull up on it, squeezing the oversized melon from bottom to tit as she moans under her breath, and you grab ahold of her nipple once more, pinching the reddened nub.  That gets a higher-pitched moan out of her as she stares, pleadingly, into your eyes, but in response you merely grind your [cock ' +
                    (x + 1) +
                    "] against her, letting the harpy feel it."
            );
            this.outputText(
                "\n\nYou lean down afterwards, holding one big, floppy tit up, and lock your drug-suffused lips onto it; Sophie lets out a squawk, her lips flying open - but as you look up at her, she shuts her mouth again.  It seems you <i>can</i> teach a bimbo new tricks.  You start to suckle on her teat, tongue roving over her sensitive areola and nipple, and her body shudders as your free hand mauls her other breast, all gropes, pinches and squeezes as you attack the slutty bird's oversized cleavage."
            );
            this.outputText(
                "\n\nSophie's hips start to grind against you, just barely strong enough to move the girth of her fat butt with your weight also pinning her down, and as a result the sensations of your [cock " +
                    (x + 1) +
                    "] rubbing against her needy slit only grow stronger.  You close your teeth on Sophie's nipple, watching as she gets a worried look in her eyes for a moment, and then you slowly grind them back and forth, roughly grinding the nub between your teeth."
            );
            this.outputText(
                "\n\nHer mouth <i>does</i> gape open this time as she lets out a shrill, crying moan, but you let it slide as you kick your stimulation of the bird's big mammaries into overdrive, licking, sucking, pinching and rubbing as Sophie mewls, squawks and raises her voice into a constant stream of pleasured cries.  You'd grin if your mouth wasn't full of harpy tit, but as it is... you let go, watching as her breast drops back down to bounce against her chest, and smirk at her."
            );
            this.outputText(
                '\n\n"<i>So then, slut.</i>" you coo, reaching down and grabbing your [cock ' +
                    (x + 1) +
                    "].  You give it a few strokes, enjoying the feeling of your cock between your fingers, and then angle it so the tip is rubbing directly against Sophie's gushing cunt, the bird herself begging you with her eyes.  You let go of her other breast to rub a downy-feathered thigh, and she bites her lip as you chuckle."
            );
            this.outputText(
                '\n\n"<i>Ready?</i>" you ask her, prodding your tip against her entrance.  She opens her mouth to answer - and you shove in all at once, enjoying the way her voice hikes up a couple of octaves as she moans.  Her soppy cunt squeezes down on your [cock ' +
                    (x + 1) +
                    "], the internal muscles desperately trying to work you, but you give them little room to do so; you instead pull right back out, watching as Sophie's arms - freed from your grip - reach out to try and tug you back in."
            );
            this.outputText(
                '\n\nThey don\'t have to; you spear the harpy open again with your throbbing cock, enjoying the way her wet insides shudder for a moment before they can actually grip down on you, and then pull back once more, settling into a rhythm.  "<i>Shout for me, you eager cunt!</i>" you command her, slowly working your hips into a frenzy.'
            );
            this.outputText(
                '\n\nSophie eagerly complies, her voice ringing out.  "<i>Yes, yes, yes, f-fuck, yes, more! Puh-please! Ye-hes!</i>" she cries, her usually halting language forced into a stream of constant, desperate pleas for you and your cock.  You hear a subtle swishing as the feathery fan she calls a tail tries to move back and forth underneath of her, making a tiny dirt angel, and you lean forward once more, really getting into things.'
            );
            this.outputText(
                "\n\nSophie moves to wrap her arms around you as you lean over her, and you oblige her this once, letting the matron-turned-skank pull you against her bouncing, heaving chest.  Your face ends up stuffed straight into her cleavage as you pound her, your [chest] bumping against the underside, and you motorboat the harpy's tits, sucking hard on each orb as you move back and forth between them."
            );
            this.outputText(
                "\n\nShe half-giggles, half-moans from the treatment, but you pull her attention away from it by speeding up your fucking.  Your pre spills out inside of her as her walls adapt to your rapid pace, doing a better and better job of squeezing you with each thrust, and the mixed fluids from your sex start to drool out from the bitch's tight hole, spilling onto the ground."
            );
            this.outputText(
                "\n\nYou wrap your arms around her as the two of you rut together, reaching down, and your hands manage to find their way through the blonde feathers and onto her fat, squishy butt as she tries to hump it against you, her tail smacking lightly against your wrists.  You grip her jiggly cheeks in each hand and lift the harpy's hips against your own, the juices from your sex drooling down onto the thick mounds, and you use the increased leverage to pound the big slut harder."
            );
            this.outputText(
                "\n\nYour hips turn into a staccato of smacks and slaps as you help Sophie thrust against your constant pounding, her walls trying their very damnedest to milk your [cock " +
                    (x + 1) +
                    "] of its seed, and her feathery arms run across your back as she lets out another squawky moan - and then her body seizes up."
            );
            this.outputText(
                '\n\nThe bird bitch comes on and around you as her body shudders, her fluids gushing all over your dick and the excess squirting out of her as her insides contract around you, but you don\'t stop; instead you pull your head up from her cleavage - as hard as that is to do, with how big the bounding, heavy orbs are - and growl at her.  "<i>You came before me, you stupid whore!</i>" you yell at her, fucking her harder in your fury.'
            );
            this.outputText(
                "\n\nYour hands tighten their grip on her fat butt as she cries out, \"<i>I'm sorry!  I'm sorreh!  S-sorry!  Sorr- sorr- sorrahh-haah!  Ahn!  Ah!</i>\" in an increasingly-broken mantra, the urge to moan quickly overpowering the urge to apologize.  You grumble as you tilt your head back down, tired of straining your neck, and decide that you'll just have to get your orgasm yourself."
            );
            this.outputText(
                "\n\nAnd so you squeeze hard on Sophie's butt, locking her hips into place, and rut against her again and again and again, slapping your hips strongly against hers as you hilt inside her hot, wet cunt in search of more pleasure.  And pleasure you find; the bird-bitch's hungry cunt is all too happy to milk your cock for its seed, undulating and moving around it like a living thing."
            );
            this.outputText(
                '\n\nPleasure builds up from your prostate to your crotch as you start to get close, [if (hasBalls = true) "your [balls] bouncing and slapping against what parts of Sophie\'s bubble butt they can reach, "]and you start to grunt and moan with each movement of your hips as you get close.  Sophie picks up on it as well, her eyes lighting up as she drools, and her back-rubbing arms pull you against her.'
            );
            this.outputText(
                "\n\n\"<i>Cu-cum, cum!  Cum in me!  F-fill me up, show me just how much you love, muh, momma Sophie's c-cunt!</i>\" the bird slut begs you, her legs wrapping around your thighs.  It doesn't take much for you to oblige her; you hump and thrust into her heated depths faster and faster as she moans encouragingly, and then finally, with a yell, you bury yourself inside of her."
            );
        }
        // {if (cocks = 1) and (cumNormal = true)}
        if (this.player.cockTotal() == 1) {
            if (this.player.cumQ() < 250)
                this.outputText(
                    "\n\nYour [cock " +
                        (x + 1) +
                        "] throbs and spasms inside of the bird bitch, your hot seed surging up inside - and then you loose it inside of her, rope after rope of hot, sticky seed spraying against Sophie's insides as the bird-bitch coos and shudders, having a light orgasm of her own."
                );
            // {if (cocks = 1) and (cumMedium = true)}
            else if (this.player.cumQ() < 500)
                this.outputText(
                    "\n\nYour cock surges inside of Sophie's hot cunt, releasing thick spurts of your spunk inside of her, and the slutty bimbo croons and moans as you paint her insides with it, pleasure rocking through your hips, and she grinds her hips against yours in small circles, thoroughly enjoying getting a nice, hot load inside of her.  You grope and rub her butt in return as she hugs you, her legs uncurling from your back, and let out a loud sigh as you start to relax."
                );
            else if (this.player.cumQ() < 1500)
                this.outputText(
                    "\n\nYour body seizes up as your orgasm unfolds, gushes of your spunk emptying into the slut's cunt as she rubs your back and cries out, having an orgasm to match your own - and the added stimulation just fuels your own orgasm, loosing everything you have into the feathery whore.  Your seed drips and drools out around your [cock " +
                        (x + 1) +
                        "], adding to the mix of sexual fluids that are already gushing out of her, and you let out one last shuddering sigh."
                );
            else if (this.player.cumQ() < 3000)
                this.outputText(
                    "\n\nYour hips jump and shudder as your huge load of spunk begins to well up inside of you, and you find yourself moaning into Sophie's tits as the bird-slut eggs you on, muttering \"<i>Cum!  Cum!  Cum!</i>\" over and over.  You groan as the first spurt of your seed shoots out into the harpy's twat - and then the floodgates open.  Your hips buck repeatedly into the bird-whore as she moans her pleasure, each thrust met with a gout of your seed - which quickly starts to pour out of her.\n\nSophie's own climax quickly kicks off as her belly starts to swell with your orgasm, and your spunk paints her insides, her thighs, and the crack of her ass white along with your crotch, her belly bloated out into a little hump by the time you're done. She shudders, hips still twitching, and rubs your back lovingly."
                );
            else {
                this.outputText(
                    "\n\nYou flop over, lost in sensation for a few moments, and Sophie seems almost puzzled, still letting out the occasional coo but otherwise going silent.  Just as it seems she's about to ask what's wrong, your hips jump, giving you the last bit of stimulation you need - and the first massive gout of your spunk fires a blisteringly hot arc of pleasure down your [cock " +
                        (x + 1) +
                        "], the fluids spurting out and filling Sophie's cunt in a single go.  She lets out a shrill cry, head tilting back, and her entire body shudders.  You let out a desperate, needy moan and pull your hips back, then piston into her again, another gout of your spunk loosing inside of her already-overfilled tunnel, and the excess gushes out around your cock as you thrust into her again and again, each push accompanied by another gout of your hot cum.\n\nHer belly quickly bloats from the treatment, your seed spilling into her womb"
                );
                if (this.pregnancy.event >= 2)
                    this.outputText(
                        " (or at least all over her channel, since her womb is bound up with your egg)"
                    );
                this.outputText(
                    " as your [cock " +
                        (x + 1) +
                        "] plugs it all from going out, and Sophie's cries get louder as she comes again, her belly bloating with your thick, hot semen and pushing against your [chest].  You finally hilt out in her, letting out a few more surges, this time with nowhere to go - so they all spill directly out around your cock, high-pressure gushes of white cream that paint your crotch and the ground underneath of it with sticky seed."
                );
            }
        } else {
            if (this.player.cumQ() < 250)
                this.outputText(
                    "\n\n[EachCock] twitches and sputters as your orgasm kicks off, the [cock " +
                        (x + 1) +
                        "] inside Sophie's drooling cunt getting the first gout from your [balls], followed immediately by a second shot from the cock[if (cocks > 2) s] outside of her.  [EachCock] fire off a few more spurts and shots of your seed, getting Sophie's insides and thighs all sticky, and then you flop down with a sigh."
                );
            // {if (cocks >= 2) and (cumMedium = true)}
            else if (this.player.cumQ() < 500)
                this.outputText(
                    "\n\n[EachCock] throbs beneath of you as your orgasm kicks off, and your first few shots of semen get everywhere; Sophie's thighs and crotch and insides all get a liberal helping of your cream as you gush and shudder, emptying your [balls], and she coos happily, rubbing your back.  She reaches down and grabs your [cock " +
                        (y + 1) +
                        "] with her other hand, stroking the smaller length as it shoots out a few more spurts all over her wrist, and she cradles you."
                );
            // {if (cocks >= 2) and (cumHigh = true)}
            else if (this.player.cumQ() < 1500) {
                this.outputText(
                    "\n\nSophie's insides milk your [cock " +
                        (x + 1) +
                        '] as you sit, teetering on the edge - and then you hear her voice above you.  "<i>Cum in me, babe, I, I want it all inside! P-please...</i>"  That does it; the thought of filling Sophie with your spunk turns into a strange kind of self-fulfilling prophecy; your legs kick behind you as your hips buck, and the first shot of your hot seed spurts out your [cock ' +
                        (x + 1) +
                        "], dousing the heat in Sophie's cunt with your own scalding arousal.  She lets out a high-pitched moan as you fill her with a second spurt, then a third, and then a fourth - and your [cock " +
                        (y + 1) +
                        "] similarly sprays her thighs and pussy lips"
                );
                if (this.player.cockTotal() == 3)
                    this.outputText(
                        ", along with your third length, spittling and spraying onto her belly."
                    );
                else if (this.player.cockTotal() > 3)
                    this.outputText(
                        ", along with the rest of your cocks, your entire mass of lengths getting your seed all over her."
                    );
                if (this.player.cockTotal() == 2) this.outputText(".");
                this.outputText(
                    '  Sophie shudders and sighs, rubbing your [hair] with her hand, and you hear her breathe a "<i>Thank you...</i>"'
                );
            }
            // {if (cocks >= 2) and (cumVeryHigh = true)}
            else if (this.player.cumQ() < 3000)
                this.outputText(
                    "\n\n[EachCock] spasm, twitching and flooding with your seed - the first burst of which empties directly against Sophie's cervix, your [cock " +
                        (x + 1) +
                        "] painting the bird-slut in your colors.  You grope and rub her butt, holding her fat hips against yours as you come in and all over her, her platinum-blonde feathers getting a generous tinting towards white as you spray her belly and her thighs alike - and your belly and [chest] in the process, moaning and crying out your orgasm into the cleavage of her huge tits.\n\nThe bird slut wraps her arms tighter around you, hanging on for dear life as her cum-splattered belly bulges from gout after gout of your cum filling it, and her walls clench and spasm around your cock in a breeding-fueled orgasm.  You loose the rest of your seed from your [balls], leaving her with bukkake'd hips and a bulging belly, and collapse, letting her fat butt hit the wet dirt beneath her."
                );
            // {if (cocks >= 2) and (cumExtreme = true)}
            else
                this.outputText(
                    "\n\n[EachCock] burst all at once, your heated, spasming lengths unloading their seed all together - and as a result you not only spray Sophie's insides white and start to flood her womb with your hot cream, you also coat her thighs and belly with it, liberally spraying her thighs with your seed as you do your level best to knock up the kinky bird bitch.  Sophie screeches out her pleasure, arching her back as you let out spray after spray of your spunk in and out of her - and your [cock " +
                        (x + 1) +
                        "] finds itself squeezed and clamped down on as Sophie's orgasm only makes yours stronger.\n\nYour [balls] refuse to empty as your load makes Sophie's belly bloat with it all, the harpy squawking as she comes again off of the maternal high, and you find yourself moaning against her chest as your seed continues to spurt, helpless to stop your own orgasm.  You try to clamp down on it, the pleasure too much, the heat running straight up your spine, but you can't; each massive gout of your seed overloads your control, forcing you to keep coming all in and all over the fat harpy.\n\nFinally you end up biting onto the harpy's nipple, making her cry out as you try to ride out the waves of your own pleasure, and she shudders and moans and gushes her own juices to add to yours, the excess cream and juices showering your crotch and the dirt around the both of you.  Her excited squawking and screeching is loud enough that you're sure the rest of the camp can hear it, but you don't care; your orgasm is finally starting to taper off, Sophie's belly so bloated with your spunk that she looks pregnant with <i>several</i> eggs."
                );
        }
        // [if (hasVagina = true)
        if (this.player.hasVagina()) {
            this.outputText(
                "\n\nLike an afterthought, your neglected [vagina] is still tingling and shivering after your powerful orgasm, "
            );
            if (this.player.wetness() >= 4) this.outputText("squirting ");
            else this.outputText("dripping and drooling ");
            this.outputText(
                "with its own juices; you barely notice it over the orgasm from your male half, but, as you readjust your position, the slickness dripping down your thighs is unmistakable."
            );
        }
        this.outputText(
            "\n\nSophie coos and rubs your head, extremely grateful for the (rough, sexy, abusive) fucking, and she tilts your head up to plant a number of bubbly kisses all over your face, seemingly forgetting about the drugged cocktail she has smeared all over them.  You'd be worried about having to fuck her some more to get rid of the effect, but you're so drained that right now you couldn't fuck her again if you wanted to.  Instead you collapse against your slutty harpy milf once more, "
        );
        if (this.pregnancy.event >= 2)
            this.outputText("resting your head on her gravid tummy and smiling to yourself.");
        else this.outputText("hugging her tight as she tries her best to show her appreciation.");
        if (this.sophieIsInSeason()) this.sophiePregChance();
        this.player.orgasm();
        this.dynStats("lib", 0.5, "sen", -4);
        if (!nice && this.player.cor < 50) this.dynStats("cor", 1);
        this.sophieScene.luststickApplication(5);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // PREGNANCY EXPACK
    // Sophie Pregger

    // Getting Sophie Pregnant*
    // Sophie Fertile Text Alert (Only if PC has penis)*
    public sophieGoesIntoSeason(): void {
        this.sophieSprite();
        this.outputText(
            "\nSophie seems to be focusing on preening herself a little more often than usual.  She keeps finding excuses to be around you, close enough that you can smell the sweet, peach-like scent of lust that hangs around her.  Her lower lips are more puffy and engorged than normal, and you note she's even applied some of her lip gloss to them.  The bimbo harpy continually bends over rocks, stools, and the fire pit, always with her big, jiggly ass wobbling enticingly in your direction, gold-lipped sex peeking out below.  <b>She's clearly in season - ready to be bred and wanting you to do it!</b>\n"
        );
    }

    // Sophie Fertility Done (Expired or PC lost cock): any
    public sophieSeasonExpiration(): void {
        this.sophieSprite();
        this.outputText(
            "\nSophie has stopped behaving so oddly around you, and though her mannerisms continue to seethe with lust, she no longer seems so focused on getting a cock in her pussy.  <b>Her heat, or whatever the equivalent bird-brained harpies have, is over.</b>\n"
        );
    }

    // Sophie Fertility Knocked Up*
    public sophieGotKnockedUp(): void {
        this.sophieSprite();
        this.outputText(
            "\nSophie seems to have a bigger, dopier smile plastered across her face than usual.  The golden gloss she had applied to her mound is now nothing more than a smeared mess, stained with white drippings in places.  She preens her ruffled hair-feathers, occasionally rubbing her tummy as she cleans herself up.  The feathery bimbo seems to be over her heat, thanks to your 'virile' intervention.\n"
        );
    }

    // Impregnation Sex*
    // Lots of Sophie Compulsion Foreplay coupled with just jamming it in.  She loses all control and you ride her like a bucking bronco, cumming in her pussy a few times, then in her ass, in her tits/mouth, and then back in her pussy again.  Then snuggles?
    private sophieImpregnationSex(): void {
        var x: number = this.player.cockThatFits(this.sophieCapacity());
        var y: number = this.player.cockThatFits2(this.sophieCapacity());
        if (x < 0) x = this.player.smallestCockIndex();
        this.clearOutput();
        this.sophieSprite();
        this.outputText(
            "Hurriedly undressing, you realize she's right- you really do want to slide [oneCock] through that gilded entrance and cum until she's completely and utterly impregnated.  Deliciously, your [armor] tugs [eachCock] down, then in a moment of pure, unadulterated release, your tip"
        );
        if (this.player.cockTotal() > 1) this.outputText("s come");
        else this.outputText(" comes");
        this.outputText(" free of the offending garment's edge and snap");
        if (this.player.cockTotal() == 1) this.outputText("s");
        this.outputText(" up, proud and erect.  ");
        if (this.player.cockTotal() == 1) this.outputText("It wobbles");
        else this.outputText("They wobble");
        this.outputText(", ");
        if (this.player.cockTotal() > 1) this.outputText("each ");
        this.outputText("bouncing up and down.  Sophie's eyes never leave the bobbing erection");
        if (this.player.cockTotal() > 1) this.outputText("s");
        this.outputText(
            ".  She seems in a complete cock-trance, licking her glossy make-up soaked lips without meaning to.  You grab hold of "
        );
        if (this.player.cockTotal() > 1) this.outputText("one of your lengths");
        else this.outputText("your length");
        this.outputText(" and shake ");
        if (this.player.cockTotal() == 1) this.outputText("it");
        else this.outputText("them");
        this.outputText(", startling the dazed bimbo from her vacuous stare.");

        this.outputText(
            '\n\nSophie blinks innocently as she slowly pieces her thoughts back together.  She eventually settles on something, and her face tilts upwards, lashes lowered, her smoking-hot gaze firmly meeting yours.  "<i>So big,</i>" she chirps while taking your '
        );
        if (this.player.balls > 0) this.outputText("[balls]");
        else this.outputText("[sheath]");
        this.outputText(
            " in her hand and beginning a slow, sensuous massage.  \"<i>You got <b>soooo</b> hard for me... and you're getting harder... so... very... hard...</i>\"  She's using that singsong, compelling voice again, vibrating her words right into your head, body, and most importantly, overly tumescent prick.  [EachCock] begins to bounce in the air, pulsing rhythmically with each heartbeat, the veins thickening visibly with pulses, fat and engorged.  You groan as she fondles your maleness expertly.  Her feathers tickle at your thighs, on your [legs], and against the " +
                this.player.skinFurScales() +
                " of your loins."
        );

        this.outputText(
            "\n\n Sophie slowly pulls you to the ground with her pillowy chest and dagger-like nipples dragging against your side.  Her flaring hips, enhanced into an obscenely fecund, baby-making waistline, wiggle back and forth, her bubble butt arched up behind her so that you're treated to a sumptuous view of her jiggling ass-cleavage.  The feathery tresses of her 'hair' splay across the small of her arched back as you sit there and watch, allowing her ministrations to bring you to a state of incredible sexual arousal brought on by her lewd dancing and erotic, purring vocalizations."
        );

        this.outputText(
            "\n\nThose gold lips slowly descend towards your " +
                this.player.cockHead(x) +
                " before stopping a hairsbreadth away.  They slowly open, spreading agonizingly apart, exhaling hot puffs of breath over your sensitive, tremendously aroused boner.  Sophie smiles deviously, a surprisingly cunning glint shining in her eyes when she glances back up at you.  This entire time, her hands have been continuing their deft manipulations of your genitals, stirring the bubbling cauldron of lust that is your crotch well past boiling.  She breathily exhales on your cock, whispering, \"<i>So hard... so hot... so full... so ready for sex!</i>\" to it and you at the same time in that familiar, hypnotic tone she's been using.  \"<i>You're going to fuck me <b>so</b> hard, like crazy hard.  You're totally going to mount this pussy again and again.  It'll make your dick feel <b>so</b> good you won't want to pull out, not even after you've cum.  It's like, just that good.</i>\""
        );

        this.outputText(
            "\n\nYou shudder as her words take effect.  Sophie's surprisingly focused now, driven in her determination to have you fuck that glorious... sopping wet... beautiful pussy.  You can't wait any more!  You grab hold of the slow-witted bimbo's head and push it down over [oneCock], surrounding yourself with the soft pleasure of her plump, enveloping, and tingling lips.  Her plush cockpillows suckle into a vacuum-tight seal around you as you crudely face-fuck her, bathing your manhood in tingling aphrodisiac lip-gloss.  Sophie's spittle froths at the corners of her luscious lips.  Her nostrils flare as she sucks in lungfuls of air each time you yank her back.  Of course, the air she inhales, utterly saturated with the scent of your maleness and laden with virile pheromones, makes her slit drop slick moisture onto your [foot]."
        );

        this.outputText(
            "\n\nHer mouth feels good, <i>really</i> good, but that dripping on your [leg] reminds you that there's a juicy pussy just waiting to be jizzed inside, and your cock... it <b>needs</b> to enter it... to fuck it hard!  Sophie's mouth is a pale substitute for her creamy pussy.  You force her off, the airhead's plush, cock-sucking lips still connected to you by a shimmering wet web of drool."
        );

        this.outputText(
            "\n\nSophie pants, \"<i>Fuck me, [name].  Fuck me super hard!</i>\" She tries to crawl around on all fours, her swollen breasts dragging across your lower body as she turns.  As soon as her ass pivots towards you, you lose it.  Her heart-shaped rump is so curvy, so pert, and delightfully soft that you cannot resist your body's impulses, the breeding call that sings through every fiber of your being.  <b>You have to mount it!</b> Her feathery thighs are slick with sensuous moisture, and lewd drops of sexual need drip out from the bottom of that bodacious butt, slipping free of the glittering delta that is Sophie's sex.  It's like a golden target, a bull's-eye just waiting for a cock to spear it."
        );

        this.outputText(
            "\n\nYou're up in a second, and a moment later, you've got the bimbo pushed over on all fours, your " +
                this.cockDescript(x) +
                " already pressing against her mound"
        );
        if (this.player.cockTotal() > 1)
            this.outputText(
                ", the rest of your lipstick-smeared shafts slipping and sliding between the soft, lube-slicked thighs"
            );
        this.outputText(
            ".  Her tail feathers splay across your [fullChest] in a platinum fan.  Thankfully, they spread far enough so you can watch your length slowly sliding through the yellow-coated pussy lips smeared with another layer of Sophie's drug.  You're immensely turned on from her teasing already, but the aphrodisiacs left behind by the face-fucking have begun to do their work, addling your mind with hallucinations of thick-hipped harpies bouncing on your cock, smothering you with kisses and slippery pussies, surrounded by eggs on all sides."
        );

        this.outputText(
            "\n\nThe impact of your [hips] slapping against Sophie's smooth, round buttcheeks jars you from the fantasy.  Your body pulls back and slams in repeatedly, moving almost of its own volition.  You grab on to the bimbo's bouncing derriere, fistfuls of ass jiggling in your hands from the kinetic impacts of your hard-fucking, pussy-stretching fury.  Sophie's puffy pussy-lips cling to your " +
                this.cockDescript(x) +
                " with every pull back, sucking hungrily at your length with gentle tugs.  You don't oblige her until your " +
                this.player.cockHead(x) +
                " is the only part nestled inside her snug labia, a golden-dyed phallus that drips with the harpy's fruity-smelling vaginal lube.  A powerful, spearing thrust immediately follows, and the cycle begins anew, filling the air with unquestionably sexual, slippery sounds."
        );

        this.outputText(
            '\n\nSophie tries to work her magic again, but she\'s panting and moaning too hard to control herself.  It instead comes out as frenzied begging.  "<i>Fuck me, [name]!  Fuck my horny - OH YES -  harpy cunt!  Mmmmm... gimme... gimme your cum!  Gonna make me a mommy, [name], a totally pregnant, egg-bound, fuck-hungry... <b>oooohhh</b>... momma!</i>"'
        );

        this.outputText(
            "\n\nYour hands find their way to just above the flare of the bird-brained girl's waist and begin to pull her down with each piston forward you make, forcing her to meet you halfway.  You pound Sophie's twat like a jackhammer, fluids squirting out with each booty-shaking cunt-stuffing thrust you dish out.  Your " +
                this.cockDescript(x) +
                " feels so sensitive, so hard that her slit feels like a molten pleasure-sleeve"
        );
        if (this.player.cockTotal() > 1) {
            this.outputText(", and the extra");
            if (this.player.cockTotal() > 2) this.outputText("s between her thighs are");
            else this.outputText(" between her thighs is");
            this.outputText(
                " likewise in heaven, slowly gathering more of the drug as some of it drips down with the tide of her vaginal juices"
            );
        }
        this.outputText(
            ".  Sophie cums repeatedly around you, wiggling her butt in circular motions in between each orgasm to spur you on.  It works.  Her cunt is like a cock-vacuum - no matter how you move, it sucks you back inside, to a heaven of pleasure that you can no longer resist, or care to."
        );

        this.outputText(
            "\n\nEvery ounce of strength in your body diverts to stuffing your " +
                this.cockDescript(x) +
                " as far into Sophie's sodden, drug-inducing pussy as possible, ramming so hard into her that she gives a chirp of half-pleasure, half-pain.  Your dick"
        );
        if (this.player.cockTotal() > 1) this.outputText("s swell");
        else this.outputText(" swells");
        this.outputText(" with the onset of your release");
        if (this.player.balls > 0)
            this.outputText(", and your [balls] begin to rhythmically pulse in your [sack]");
        else this.outputText(", something inside you begins to clench rhythmically");
        this.outputText(
            ".  Sophie's pussy stretches around your increasing thickness, dripping its amber honey"
        );
        if (this.player.cockTotal() > 1) this.outputText(" over your extra, thigh slapping cock");
        if (this.player.cockTotal() > 2) this.outputText("s");
        this.outputText(
            ".  Responding, the warm ecstasy inside you rushes out in a tremendous spurt, squirting globs of thick white cum into the harpy's receptive cunt again and again."
        );
        if (this.player.cockTotal() > 1)
            this.outputText(
                "  Ropes of creamy spunk drizzle over the ground and the underside of Sophie's tits, but the lust-drunk harpy doesn't seem to mind any more than you do."
            );
        this.outputText(
            "  Her hungry twat drinks down the seed with gusto, drawing it out of you even as it milks you for more."
        );
        if (this.player.cumQ() >= 500)
            this.outputText("  You give her exactly what she wants, drowning her pussy with jism.");
        if (this.player.cumQ() >= 1000)
            this.outputText(
                "  Alabaster spooge oozes out of her lips after you stuff her womb full, dripping down your [legs] and her own feathery thighs."
            );
        if (this.player.cumQ() >= 2000)
            this.outputText(
                "  The ground quickly becomes a salty quagmire that Sophie's hands are sinking into."
            );
        if (this.player.cumQ() >= 5000)
            this.outputText(
                "  Soon, those droplets become thick gouts, as your immense virility asserts itself.  You hold her there, letting her belly balloon underneath you as you forcefully inseminate her, flooding her with hot seed."
            );

        this.outputText(
            "\n\nAs your orgasm tapers off, Sophie slips forward, cheek pulling up dirt, tongue lolling as her well-used mound twitches fitfully around you.  You sigh, partially satisfied, but [eachCock] is erect as ever, still tingling and hard, hungering for harpy holes.  Sophie's asshole opens and closes as her orgasmic contractions wrack her body, and as you watch, you know you'll have to sample her backside before you give her another few kids worth of cum."
        );

        // ON TO ZE BUTTFUCKING
        this.outputText(
            "\n\nThe white-on-gold glazed lips reluctantly release your withdrawing prick."
        );
        if (this.player.cockTotal() > 1) {
            this.outputText("  Her thighs seem almost sad to let your extra manhood");
            if (this.player.cockTotal() > 2) this.outputText("s");
            this.outputText(" escape as well.");
        }
        if (this.player.hasKnot(x))
            this.outputText(
                "  The thickness of your swollen, canine knot makes pulling out harder than you thought, and you wind up rocking back and forth while you keep drizzling into her, letting the engorged mass deflate slowly as you fill her womb further with canine seed.  Eventually, with a wet 'POP', you're freed, leaving Sophie nice and gaped, like a good, well-bred bitch."
            );
        else
            this.outputText(
                "  You slip out with a lurid 'schluuuuck', leaving Sophie a nice messy, well-fucked wreck of a harpy."
            );
        this.outputText(
            '  Sophie shudders, confused eyes looking back at you.  She whimpers, "<i>Noooo, fuck me again!</i>"'
        );

        this.outputText(
            "\n\nYou shift position slightly, grabbing a fistful of her expansive ass for leverage, that bouncy bimbo-butt allowing your fingers to sink into its supple flesh, giving in to your fingers perfectly as you pull them apart - giving your cum-slick dick a perfect path to her unadulterated pucker!  You push your " +
                this.cockDescript(x) +
                " against her backdoor immediately.  There's a moment of resistance, then Sophie relaxes, and all the spunk, girl-lube, and slippery aphrodisiac covering your cock helps you to slide into her yielding ass chasm with ease."
        );
        if (y >= 0)
            this.outputText(
                "  A sinful tightness clenches your " +
                    this.cockDescript(y) +
                    " at the same time.  You accidently started double penetrating her!  The sloppy vaginal heat around your second member is enough to make you forget that it was even an accident."
            );
        this.outputText(
            "  You push on, reveling in the tight clenching of her anal ring as it passes over every inch of cock, squeezing you like a slippery cock-ring as you nestle deeper into the harpy's plump bottom"
        );
        if (this.player.cumQ() >= 1000) this.outputText(" and sperm-oozing pussy");
        this.outputText(".");

        // NO DP:
        if (y < 0)
            this.outputText(
                '\n\nSophie moans, "<i>Hey...you can\'t - ungh - get me pre... preggers like that!</i>"'
            );
        else
            this.outputText(
                '\n\nSophie moans, "<i>Oooh, I didn\'t - ungh - want it in my like, butt, or anything!</i>"'
            );
        this.outputText(
            "\n\nTaking a reddened cheek in each hand you pull them apart before releasing them, letting them tap around your [sheath]'s sides.  You begin to properly drill her ass"
        );
        if (y >= 0) this.outputText(" and pussy");
        this.outputText(
            " with confident, sure strokes.  Your answer, never spoken aloud, becomes evident by your actions: she got you this horny, and you're going to impregnate every hole, no matter how long it takes.  Her asshole is tight, almost <i>too tight</i> after having experienced her pussy, and you can feel the next batch of cum already beginning to churn in your [balls], a heavy, warm weight growing larger and larger."
        );

        this.outputText(
            "\n\nSophie's gorgeous rump feels amazing, but you're getting tired of doing all the work yourself.  You let go of her plump, squishy buttcheeks and wrap your arms around her torso, just under her tits and lean back, pulling the soft-bodied bimbo bird up on top of you as you recline backwards.  Her weight causes her bottom to squish down against you, enveloping your [hips] in smooth skin and down-soft feathers.  The big-butted harpy might be dumb, but she <b>knows</b> sex!  She immediately begins to bounce on top of you, her tight asshole clenching as she lifts up and drags her bountiful butt off you.  Your gold-glossed pole"
        );
        if (y >= 0) this.outputText("s are");
        else this.outputText(" is");
        this.outputText(" revealed briefly to the cold air before ");
        if (y < 0) this.outputText("it's ");
        else this.outputText("they're ");
        this.outputText("devoured by the hot, enveloping anal entrance ");
        if (y >= 0) this.outputText("and squeezing pussy ");
        this.outputText("all over again.");

        this.outputText(
            '\n\nSophie groans, "<i>Is this, like, good for you, [name]?</i>" while looking back over her shoulder.'
        );

        this.outputText("\n\nYou answer by sitting up and groping her tits, ");
        if (this.player.tallness >= 74) this.outputText("nipping her ear");
        else if (this.player.tallness >= 60) this.outputText("nipping at her shoulder");
        else this.outputText("nipping at her side");
        this.outputText(
            ' as you answer, "<i>Yes.</i>"  Her breasts feel softer than her pillowy buttcheeks, which even now are squishingly running over your hips and [legs], smothering you in soft warmth while her innards milk your member'
        );
        if (y >= 0) this.outputText("s");
        this.outputText(
            ".  You roughly squeeze her breasts, too focused on the climax slowly building within your compressed crotches to be gentle.  Her breasts bounce and jiggle around your ministrations.  Her nipples, hard as lead bullets, are like magnets for your exploratory fingertips, and soon you lock onto them, squeezing and tugging, kneading them with each bounce for encouragement.  Sophie screeches as she bottoms out, pushing herself back against you, noisily cumming, her juices "
        );
        if (y < 0) this.outputText("spraying across your [legs]");
        else this.outputText("running down your " + this.cockDescript(y) + " in miniature rivers");
        this.outputText(
            " messily.  The explosion of sloppy lady-spunk accompanies convulsive anal clenching, and with a hard pinch on her nipples, you give yourself over to the unnatural lusts coursing through your bloodstream again."
        );
        this.outputText(
            "\n\nCum blossoms in Sophie's rectum like an alabaster flower, squirting into its every nook and cranny.  You hug against her as hard as you can, both hands locking her in place, prodigious bimbo-booty squashed flat onto your member"
        );
        if (y >= 0) this.outputText("s");
        this.outputText(
            ".  She wraps her arms behind herself to hold onto you affectionately.  Again and again, you blast rope after rope of spunk into her plush heiny.  "
        );
        if (y >= 0) {
            this.outputText("At the same time, you make her cunt even creamier");
            if (this.player.cumQ() >= 1000) this.outputText(" and her belly even more distended");
            this.outputText(".  ");
        }
        this.outputText(
            "There's no stopping your orgasm - it may even be more potent, more virile than the one before!  Sophie simply rides it out, gushing her girlspunk out all over you."
        );
        if (this.player.cumQ() >= 500) {
            this.outputText(
                "  Her gut rumbles as you fill more and more of her intestines, eventually "
            );
            if (this.player.cumQ() < 1000) this.outputText("giving her a");
            else this.outputText("adding to her visible");
            this.outputText(" cum-paunch.");
            if (this.player.cumQ() >= 1500) {
                this.outputText("  Soon, the cum is squirting out around you");
                if (this.player.hasKnot(x)) this.outputText("r knot");
                this.outputText(
                    ".  You've filled every inch of her intestines with cum, and there's simply nowhere for your fresh, virile squirts to go but out!"
                );
            }
        }
        this.outputText(
            "  The harpy goes limp in your arms, still dribbling from her cunt as you continue to sate yourself on her rump and nipples."
        );

        this.outputText(
            "\n\nYou sigh, but know you're far from done.  First, you've gotta get out of her asshole so that you can put your next load where it belongs: directly into her pussy... again and again.  You moan at the thought, [eachCock] stiffening even more inside the cum-stuffed jizz-puppet.  You push Sophie off you, leaving her to land in the puddle of girl-spunk she's birthed.  She lands face down; squawking in distress as sexual sludge completely covers her front.  It's enough to rouse her from the orgasmic stupor she was in, and the ditzy girl rounds on you, scolding, \"<i>You meanie!</i>\""
        );

        this.outputText(
            "\n\nYou grab her face and pull her down on [oneCock] again, ramming it into her throat without warning.  She gives a muffled grunt of displeasure before sucking on it again, just as enthusiastically as the last time.  Her muddy tits drag over your [legs] as she begins to bob on her own, prepping you for the next journey into her golden-gated egg-oven.  Those sucking-wet bimbo lips are too much for you at this point.  [EachCock] is a tower of immense sensation, so sensitive from her gloss and the back-to-back orgasms that a wave of ecstasy slams into you immediately.  You trickle out a few weak spurts - the best your body can offer up on such short notice."
        );

        this.outputText(
            '\n\nLicking her lips, Sophie chants, "<i>Just one more, in my pussy, please?  Please, cum in my pussy again!</i>"  She goes on like this, asking, begging, and even pleading as she pivots to place her plump, cum-soaked mound back on your ' +
                this.cockDescript(x) +
                ".  The silken vice fits you as snugly as a tailor-made glove.  She immediately begins to bounce it up and down, looking over her shoulder to watch your face as the waves of sensation overpower your resistance, breaking down your conscious thoughts.  You cum promptly, squirting a long rope of pleasure in on top of all the sperm you've already deposited.  She bounces, forcing more of that ecstasy through your " +
                this.cockDescript(x) +
                ", laboring messily atop you in a display lascivious enough to make a whore blush.  Every upstroke of her velvet walls along your shaft earns her all the cum your accelerated reproductive system can offer up since the last downstroke, weak spurts of little bearing, but still an extra dose of cream for her twat."
        );

        this.outputText(
            "\n\nYou fall back, eyes rolling wildly, moaning uncontrollably.  Consciousness for you becomes little more than the feelings tingling through your " +
                this.cockDescript(x) +
                " and the ensuing orgasms.  At some point, you lose track of time and pass out."
        );
        this.sophiePregChance();
        this.player.orgasm();
        this.dynStats("lib", 1);
        if (this.player.cumQ() < 5000) this.player.cumMultiplier += 3;
        this.sophieScene.luststickApplication(8);
        this.menu();
        this.addButton(0, "Next", this.postSophieImpreg);
    }

    private postSophieImpreg(): void {
        this.clearOutput();
        this.sophieSprite();
        this.outputText(
            "When you wake, Sophie is snuggled up next to you, her arms and legs wrapped around you affectionately.  A cup full of water, along with several strips of dried meat sit nearby... apparently she got them while you were out, knowing how thirsty and hungry you'd be.  You run your fingers through her platinum, down-soft hair.  Having a live-in bimbo isn't really all that bad."
        );
        this.doNext(this.camp.returnToCampUseEightHours);
    }
    // Too Big Impregnation Sex*
    // Sophie starts grinding on top, hypno-compelling you to get hornier and hornier until you flip her over and full-body titfuck her.  After the first jizz, you get a little winded and lay back, she remounts you and gets you to cum against her entrance, then she snuggles with you and slowly teases and orgasm denials you until you fucking explode and pass out cuddling with her.
    private giantCocksImpregnateSophie(): void {
        this.clearOutput();
        var x: number = this.player.biggestCockIndex();
        this.sophieSprite();

        this.outputText(
            "Damn, the voluptuous harpy is right - [eachCock] really, <i>really</i> wants to fuck her pussy, but there's just no way it'll fit!  You start disrobing anyway, figuring you'll find a way to blast a few loads of jizz deep into that dripping wet, mature cunt.  As soon as your [armor] is off, [eachCock] begins filling to its full, obscene size.  You truly have tremendous genitals by any standard, and you can't wait to put them to use.  They feel too good not to!"
        );

        this.outputText(
            '\n\nSophie giggles, "<i>Wow, [name], you\'re like, gig... gigant... really big, and stuff!</i>"  She kneels next to you, taking both hands to wrap around your enormous member, feeling the smooth, sensitive skin pulsing against her fingertips.  The veins thicken noticeably, each almost as big as her pinky finger when fully dilated, inflating [eachCock] like an absurd balloon.  Sophie immediately plants a kiss on the swelling underside, leaving behind a perfect, puckered kissmark in gold.  That spot tingles wonderfully, which only encourages your building tumescence.  As your semi-hard cock droops over her head, she hugs it, kissing it again and again, heedlessly planting more and more aphrodisiac all over the most sensitive areas of your ' +
                this.cockDescript(x) +
                ".  Before you know it, you're rigid and horny, tingling all over from whatever drug she has in her gloss and too turned on to care."
        );

        this.outputText(
            "\n\nPeeking out from under the mass of flesh, Sophie looks up to meet your gaze and says, \"<i>Oooh, [name], you're so virile!  I bet the cum is just all sloshy-woshy "
        );
        if (this.player.balls > 0) this.outputText("in those plump balls of yours");
        else this.outputText("inside you");
        this.outputText(
            ', just waiting to squirt out!</i>"  She says it as more a statement of fact than anything else, using that oddly hypnotic, sing-songish voice that seems to reach right inside you.  The cum really <b>does</b> seem to be sloshing around inside you, and as your heart beats faster in your chest, your ardor for the well-endowed harpy grows.  Sophie rubs her soft palm along the underside, right on the meatus your urethra makes as she continues in that strange tone, "<i>You\'re <b>soooo</b> hard, and full.  It\'s making your cock more...</i>" She plants another wet kiss on you, this time on your ' +
                this.player.cockHead(x) +
                '.  "<i>...and more sensitive.  <b>So</b> sensitive, like just me rubbing my finger on you is as good as fucking a cunt, right?</i>"'
        );

        this.outputText(
            "\n\nSophie drags a manicured fingertip over one of your rigid veins.  She... she's right.  You swear that isn't a fingertip at all, but a silky, slippery fold that's dragging warm, wet lubricants across your oversized dong.  When the other four fingers join the first, you find yourself immersed in a slippery, seductive heaven, one of which you're in no hurry to leave.  Sophie giggles as she fondles your immense rod, planting fresh kisses behind her trailing fingers.  Pre-cum bubbles out of your tip almost immediately, sloppily dripping into Sophie's hair, sticking its curls to the back of her head.  She grabs a dollop of it and begins to smear it around, which only drives the sensation to completely new heights.  You groan without meaning to, ejaculating a thick squirt of pre-cum in anticipation of the coming orgasm."
        );

        this.outputText(
            "\n\nAbruptly, Sophie leans away, flat onto her back.  Your " +
                this.cockDescript(x) +
                " drops squarely between her tits, the tip just inches from her puckered lips.  Sophie licks them, eyeballing your tremendous dong as you lower yourself.  You can feel your immense penis pleasantly tingling atop the slutty girl's curvy frame, every curve, bit of feathery fluff, and beautiful, flawless patch of skin.  Sophie slurps an over-sized drop of pre-cum up as it rolls out of your urethra and swallows it noisily.  She opens her lips as wide as she can and kisses you right around your spunk-hole.  A surge of lust immediately rockets through you, centered on your sensitive " +
                this.player.cockHead(x) +
                ".  Syrupy pre splatters onto her face, and she wiggles back, her whole body stroking you off right up until your " +
                this.player.cockHead(x) +
                " is nestled snugly against her gold-glittered nether-lips, absorbing more of her lust-inducing chemicals."
        );

        this.outputText(
            '\n\n"<i>It looks like, like you\'re all ready to cum, huh?</i>" Sophie muses as she grabs your cock with her feet, carefully keeping the talons from tearing into you.  You can still feel them, the sharpness pressing on your sensitive skin, not hard enough to be painful but enough to be felt.  She slowly begins to use them to stroke you off, using small, quick back-and-forth motions.  Happily, she moans in that sing-songish voice, "<i>Like, cum for Momma Sophie!  Squirt that cum into my hot, wet, juicy little cunt, ok?  Your gigantic cock should have like, no problems stuffing me full of eggs, right?  So go on, let it go.  Let out that bubbly lust that\'s getting so pent-up and tight inside you.</i>"'
        );

        this.outputText(
            "\n\nSophie grinds her hips against you while she speaks, but in no time she has to stop her chat due to her own moaning.  Her slippery gash is increasingly wet as she meets your eyes, boring into you and mouthing silently, \"<i>Cum for me.</i>\"  That bottled up pressure, the lust, the desire, and the drug-fueled fuck-haze that's settled over your mind all combine.  Her words are like the opening of a valve inside you, and with an exultant roar of bliss, the knot of molten ecstasy inside you explodes.  A torrent of liquid lust explodes from your tip, ejaculating directly into Sophie's sodden cunt.  She pulls her lips as wide apart as possible to ease the flow, but some still bubbles out around her fingernails, staining the gold-lacquered tips alabaster.  Like some kind of obscene cum-pump, you dispense thick loads one after another, urethra bulging with the fruit of your coupling."
        );
        if (this.player.cumQ() >= 500)
            this.outputText(
                "  In no time, Sophie's belly begins to form into a bump, and the pressure leaves more and more of your seed to be wasted on the bimbo's thighs."
            );
        if (this.player.cumQ() >= 1000)
            this.outputText(
                "  Your intense ejaculations quickly balloon that petite bump into a rounded dome.  Torrents of spunk run out of her around your tip, fountaining slightly with each fresh dose.  You simply can't pack any more cum into her, and the excess puddles around her plush bottom."
            );

        this.outputText(
            '\n\n Sophie coos, "<i>Oh yeah, get it all in there, [name].  It feels <b>tooootally</b> good!</i>"  She arches her back, delighting in the sensation, eventually rubbing her thumb in tight circles around her clit until she begins to shake, spasming and creaming herself over being well-inseminated.  Your own flow of orgasmic juices dies off, your cock still hard and tingling.  Semen slops out of Sophie\'s spasming cunt from her orgasmic clenching.  The blond bimbo slowly comes down, dipping a finger into the sexual sludge that oozes from her honeypot and sampling it with a lick.  She grabs hold of your immense manhood and drags it up to her lips for another kiss.'
        );

        this.outputText(
            '\n\n"<i>Ready for round two?</i>" she asks, already feeling fresh lust surging through your length.  Of course you are...'
        );
        this.sophiePregChance();

        this.player.orgasm();
        this.dynStats("lib", 1);
        if (this.player.cumQ() < 5000) this.player.cumMultiplier += 3;
        this.sophieScene.luststickApplication(8);
        // [Next]
        this.menu();
        this.addButton(0, "Next", this.postSophieTooBigImpreg);
    }

    private postSophieTooBigImpreg(): void {
        this.clearOutput();
        this.sophieSprite();
        this.outputText(
            "Sophie milks you through three more orgasms before she finally tires, and by that point, you're equally exhausted.  You snuggle up next to her and pass out, barely rousing when she begins kissing your manhood during the nap for a fourth helping of your spillable seed.  When you awaken nearly eight hours later, she's snoring soundly, with a skin of water and strips of dried meat left nearby for you to restore yourself.  Life with a bimbo isn't so bad!"
        );
        this.doNext(this.camp.returnToCampUseEightHours);
    }

    // Sophie Move In Request Scene*
    public sophieMoveInAttempt(): void {
        this.clearOutput();
        this.sophieSprite();
        this.flags[kFLAGS.SOPHIE_BROACHED_SLEEP_WITH] = 1;
        this.outputText(
            "Sophie approaches you with a particularly somber expression on her normally vapid face, pressing her index fingers together nervously.  Her walk, normally exaggerated and sexual, is meek and diminished as she makes her way forward.  You cock your head to the side, looking at her curiously."
        );

        this.outputText(
            '\n\n"<i>Could I like, sleep with you at night?  I thought... maybe... since you got me pre- preg... preggers and stuff, you wouldn\'t mind me snuggling with you while we slept?</i>" she asks hopefully, blinking her long lashes innocently at you.  "<i>I promise, I won\'t bother you or wake you up in the night or anything...  I just want someone to like, hold when it\'s cold.</i>" She immediately adds, "<i>And I make a really good pillow, ever since you gave me that drink!</i>" Sophie playfully bounces her boobs for effect, blushing as she awaits your response.'
        );

        this.outputText(
            "\n\nThe bimbo harpy seems genuine in her desire for companionship, though judging from the moisture that trickles from her cleft and down her feathery thighs, she'll probably be fucking you at some point, even if it isn't in the middle of the night.  Do you want to take the posh-bodied girl to bed with you at night?"
        );
        this.menu();
        this.addButton(0, "Yes", this.yesSophieSleepWith);
        this.addButton(1, "Nah", this.noSophieSleepWith);
    }

    // Yes*
    private yesSophieSleepWith(): void {
        this.clearOutput();
        this.sophieSprite();
        this.outputText(
            "Sophie claps her hands excitedly when you give your assent, immediately launching into a hug that presses her "
        );
        switch (this.pregnancy.event) {
            case 1:
                this.outputText("burgeoning");
                break;
            case 2:
                this.outputText("swollen");
                break;
            case 3:
            case 4:
                this.outputText("huge, gravid");
                break;
            default:
                this.outputText("taut");
        }
        this.outputText(
            " midriff and cushiony tits against you.  \"<i>You're awesome, [name], you know that?  You're totally " +
                this.player.mf("hunky", "cute") +
                ' AND awesome!</i>"  She spins about, dancing happily and shaking her voluptuous backside in your direction as she goes.'
        );
        this.flags[kFLAGS.SLEEP_WITH] = "Sophie";
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // No (Also Used To Kick Her Out Of Bed)*
    private noSophieSleepWith(): void {
        this.clearOutput();
        this.sophieSprite();
        this.outputText(
            'Sophie casts her eyes down and says, "<i>I get it...  I\'ll just... sleep over in my nest then.  Alone...</i>"  She shambles away, her tail feathers limp against her big, bouncing butt as she goes, clearly unhappy with the decision.  You can hear her sniffling even after she vanishes around a rock, trying not to cry.'
        );
        if (this.flags[kFLAGS.SLEEP_WITH] == "Sophie") this.flags[kFLAGS.SLEEP_WITH] = "";
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Option To Move Her In Any Time If Initially Declined*
    private moveSophieInRepeat(): void {
        this.clearOutput();
        this.sophieSprite();
        this.outputText(
            "You go up to the feathery bimbo and idly question if she still wants to share your bed with you"
        );
        if (!this.pregnancy.isPregnant) this.outputText(" even though she's not pregnant any more");
        this.outputText(
            ".  Sophie's voluminous, painted lips curl into a radiant smile, an effect enhanced even more by the gold gloss she coats them with."
        );

        this.outputText(
            '\n\n"<i>Really?  Like, I can snuggle up next to you when you sleep while you use my boobs as pillows?!</i>" she asks, unable to keep a girlish squeal of delight out of her voice.  Sophie bounces up and down; her wings flapping with wild excitement, nearly blinding you from the cloud of dust they kick up.  "<i>I promise I won\'t bother while you sleep or anything, but maybe we could like, have quickies in the morning?</i>"'
        );
        this.outputText(
            "\n\nYou roll your eyes and give her a thumbs up.  After all, you can't really sleep with a sex-crazed bimbo and NOT expect to be 'mounted' at some point."
        );
        this.flags[kFLAGS.SLEEP_WITH] = "Sophie";
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Sophie Morning Sex*
    // Alternate Intro/Outro for consensual fucking when it isn't morning?
    public sophieFenCraftedSex(morning: boolean = false): void {
        var x: number = this.player.cockThatFits(this.sophieCapacity());
        if (x < 0) x = this.player.smallestCockIndex();
        this.sophieSprite();
        // {Morning Sex}
        if (morning) {
            this.outputText(
                "\nOoooh, that feels good.  There's a slippery, warm snugness wrapping around your " +
                    this.cockDescript(x) +
                    ", accompanied by a quick, 'schluck-schluck-schluck' in steady beat.  Your heart beats faster as your ardor rises, matched lock step with your rising erection"
            );
            if (this.player.cockTotal() > 1) this.outputText("s");
            this.outputText(
                ".  The haze of sleep is still firm in your mind, but you become aware of other sensations as well.  There's the ticklish softness of feathers on your [legs], sliding up and down, and warm, smooth skin that squishes down on your [hips] again and again.  The velvety tunnel around [oneCock] squeezes pleasantly as it fully envelops you, eliciting a moan of pleasure in response.  The sound of your own audible enjoyment rouses you enough to make you open your eyes, whereupon you're treated to a view of Sophie riding you cowgirl style."
            );

            this.outputText(
                '\n\nSophie shakes her tits at you as you wake and chirps, "<i>Good morning, [name].  I got you some sex!</i>"  She giggles at her own terrible joke before resuming her riding, rolling her hips in short circles that press her walls tightly against each part of your ' +
                    this.cockDescript(x) +
                    " with delicious pressure.  \"<i>It is just so... hard, not to fuck someone as cute as you are when you're sleeping!  I almost didn't ma... aahhhhh... didn't, like, make it.</i>\"  Sophie shudders with excitement, continuing, \"<i>You're going to, like, have momma Sophie creaming herself <b>real</b> soon!</i>\""
            );
        }
        // {Regular Sex}
        else {
            this.clearOutput();
            this.sophieSprite();
            this.outputText(
                "You hastily remove your armor and lie back on your blankets, beckoning Sophie forward with your hand.  The slutty, sex-hungry bimbo prances up on her tiptoes, supporting herself with flapping wings as her flared hips roll hypnotically, ever closer.  In no time, she's straddling your supine form; dripping sex positioned a foot above.  The moisture her puffy, aroused cleft exudes patters off your "
            );
            if (this.player.pregnancyIncubation > 0 && this.player.pregnancyIncubation < 150)
                this.outputText("pregnant ");
            this.outputText(
                "midsection from time to time, hot droplets that shimmer with the proof of Sophie's ever-burning arousal for dick.  Above, her titanic cleavage casts a gloriously large shadow across you.  Each of the heaving globes is capped with a jutting nipple.  Her areolae look nearly as hard as your " +
                    this.multiCockDescriptLight() +
                    ", and you lick your lips at the sight of them."
            );

            this.outputText(
                "\n\nPointing down at your " +
                    this.cockDescript(x) +
                    ", you wave Sophie onward.  The feathery slut complies immediately, slapping herself down onto your crotch with a wet 'SPLAT' loud enough to be heard from anywhere in camp.  You weren't angled right to penetrate her, either.  Instead, her plush pussy-lips parted to either side, and the juicy slit begins a long grind-fest, pressing her clitty down hard on your now lubed shaft, the hard bud dragging up and down with sensuous strokes.  Sophie coos, \"<i>Ooohh, I've like, wanted this forever, [name].  Why can't we do this more?</i>\""
            );

            this.outputText(
                '\n\nBouncing her hips faster, the big-breasted woman grinds in a frenzied motion, rolling her jiggling ass up and down to give you something to watch - when your eyes aren\'t fixated on her ponderous breasts, that is.  Her juices grow more and more copious as she rides you, but soon, Sophie reaches the breaking point.  She chirps, "<i>Gotta get you inside, sexy,</i>" and drags herself forward.  Her hand reaches behind her, grabbing you around the base and adjusting the angle, before then pushing back, burying the ' +
                    this.cockDescript(x) +
                    ' deep inside her juicy mound.  "<i>Oooh, that\'s gonna make momma Sophie cum <b>soooo</b> hard,</i>" she moans.'
            );
        }
        // ALL SEX
        this.outputText(
            "\n\nSophie leans back groaning, impaled on your member while greedily groping at one of her tits.  Her fingers artlessly paw at the immense, soft tit in her hand and brush around its nipple repeatedly.  You prop yourself up on one elbow, and with your other arm you reach up to join in Sophie's fondling of her tremendous tits.  They're so massive and so... plush that they should droop, but they maintain a perfect, tantalizing shape, even when they're jiggling and bouncing around during a good fuck.  Her nipple finds its way into your fingers soon, and you take to rolling the sensitive flesh around in your fingertips, admiring the pebbly texture as Sophie begins to moan like a wanton slut."
        );

        this.outputText(
            '\n\n"<i>Fuck!  Yes!  Tug my nipple!  You\'re making me feel like, <b>so</b> fucking good!</i>" Sophie squeals, tossing her blond hair back.  Her eyes roll back slightly as she moves, beginning to bounce faster and faster.  Her clingy pussy-lips drag over every sensitive ridge and vein, even your ' +
                this.player.cockHead(x) +
                " before devouring you again in that sumptuous heat once more."
        );
        if (this.player.balls > 0)
            this.outputText(
                "  Sophie's immense backside slides over your [balls] each time she bottoms out, her tail feathers tickling at the bottom of your [sack]."
            );
        this.outputText(
            "  You pull on her nipple, earning yourself a squawk of surprised excitement from Sophie.  She writhes in your grip, twisting this way and that, pulling harder on her poor abused nipple as her pussy goes wild around you."
        );

        this.outputText(
            "\n\nYou feel her juices drip out over your length and across your middle as she hits climax, one hand holding on to your shoulder for support.  Her velvety interior spasms wonderfully, convulsing around your " +
                this.cockDescript(x) +
                " in what can only be the throes of orgasm.  Sophie folds double, dropping her tits onto your "
        );
        if (this.player.biggestTitSize() >= 1) this.outputText("own");
        else this.outputText("chest");
        this.outputText(
            ", as she kisses you passionately, moaning into your mouth.  The effects of her potent lip-gloss hit you immediately, fortifying your pleasure into a tsunami wave of excitement, one that's cresting whether you want it to or not.  You cry out into Sophie's tongue, hips lifting her off the ground, as you cum, hard.  Your ejaculate fires out in long, thick ropes of white, painting the harpy's sodden innards white.  With her folds coated in spunk, your spasming " +
                this.cockDescript(x) +
                " pours the rest of your lusts into her, emptying your [balls] completely."
        );
        if (this.pregnancy.isPregnant) {
            this.outputText(
                "  The thorough seeding fills her up completely - her womb is too full of egg for there to be any room for spunk, and it all drips out with each fresh injection."
            );
            if (this.player.cumQ() >= 500)
                this.outputText(
                    "  You cum so hard that torrents of spooge wash out of her slit, her womb obstructed by the egg you made with her."
                );
        }
        if (this.player.cumQ() >= 2000)
            this.outputText(
                "  The oozing spunk soaks you thoroughly, and Sophie's thighs become matted with the gallons of gunk that squirts out of her lips."
            );

        this.outputText(
            '\n\n"<i>OOoooooooooohhhhh!</i>" she screams into your mouth, eventually breaking it when her strength goes out and her body sags limply atop you.  She kisses the nape of your neck a few times affectionately, slowly moving her hips a few times, squeezing thick dollops of sticky spooge out onto your sweaty bodies.'
        );
        this.outputText(
            '\n\nSophie slowly drags herself off you, stifling another moan as you exit her still-spasming pussy.  "<i>Oooh, thanks for that, [name].  I needed that like, sooooo bad.</i>" The bimbo gives you another quick peck on the lips, leaving them tingling.  She sashays away dripping your semen from between her thick hips as she goes.'
        );

        // MORNING
        if (morning)
            this.outputText(
                "\n\nYou gather up your [armor] and head to the stream to get clean before you start your day.  What a morning!"
            );
        // REGULAR
        else
            this.outputText(
                "\n\nYou gather up your [armor], trying to ignore how it sticks to you after that messy fuck."
            );
        if (this.sophieIsInSeason()) this.sophiePregChance();
        this.player.orgasm();
        this.dynStats("sen", -2);
        if (morning) this.doNext(this.playerMenu);
        else this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Pregnant Sophie Morning Sex*
    // Alternate Intro/Outro for consensual fucking when it isn't morning?
    public fuckYoPregnantHarpyWaifu(morning: boolean = false): void {
        var x: number = this.player.cockThatFits(this.sophieCapacity());
        // {Morning Fuck}
        if (morning) {
            this.sophieSprite();
            this.outputText(
                "\nOh wow, something feels good.  You shake your head back and forth, trying to make sense of the pleasant sensations that roused you from slumber.  There's a warm wetness, no, a flood of hot moisture wrapped around your " +
                    this.cockDescript(x) +
                    ", all tied up in tight, velvet curtain.  Above that, there's a gravid weight pressing on your belly- not too hard, but enough to make you utterly aware on it.  Feathery thighs are clasped around your [hips], tickling up and down with every motion their owner makes.  You open your eyes to take in the sight of your pregnant harpy slut-wife."
            );

            this.outputText(
                "\n\nSophie is grinding herself on your " +
                    this.cockDescript(x) +
                    ", though you can't see your dick sliding in and out of her engorged mound.  Her egg-gravid belly is sitting on you, obscuring any view of the sexual happenings down below with its shining, drum-tight skin.  You chuckle as you see Sophie's belly button sticking out and give it a gentle poke."
            );

            this.outputText(
                "\n\nThe expectant mother happily chirps, \"<i>Do you like our baby, [name]?  She'll be super cute, just like me.  Maybe she'll even like, get big jugs like me!  Or big, fertile hips that can just pop out egg after egg...</i>\"  Sophie shudders at the thought and grabs hold of your hand to press it into her belly.  She makes you rub the gravid dome while continuing to grind on your cock, lost in the dual sensations of motherly bliss and a long, slow"
            );
            if (morning) this.outputText(", morning");
            this.outputText(
                " fuck.  Her skin is silky smooth, and if you push a little, you can actually feel the solid curve of the growth inside her.  That egg sure is getting big!"
            );
        }
        // REGULAR FUCK
        else {
            this.clearOutput();
            this.sophieSprite();
            this.outputText(
                "You go ahead and take off your [armor], letting Sophie take in the view of [eachCock].  She immediately flounces over and drops to her knees in front of you.  Her hands wraps around " +
                    this.cockDescript(x) +
                    ", "
            );
            if (this.player.lust > 50)
                this.outputText(
                    'feeling its firmness.  "<i>Wow, you\'re so hard already, [name]!</i>" she comments.'
                );
            else
                this.outputText(
                    "slowly stroking it until it begins to pulse to life, thickening in her hand."
                );
            this.outputText(
                "  Your rigid tool is soon tingling pleasantly from her handjob, the pregnant bimbo licking her lips hungrily.  She asks \"<i>Could you lie back and let me be on top?  It'll be easier on me, since I'm all big and stuff.</i>\"  She runs a hand over her gravid midriff, obviously enjoying herself as she waits."
            );
            this.outputText(
                "\n\nLeaning back on your blankets, you do as she asks, since sex with a pregnant woman does require a little bit of give and take.  Sophie waddles up, her curvy hips still managing to wiggle seductively as she climbs on to you.  Her heavy breasts, normally perky enough to support themselves, rest on top of her swollen gut as she settles into place, jiggling slightly.  You take your " +
                    this.cockDescript(x) +
                    ' in your hand and lift it up against her pussy lips, just in time for her to lower herself, absorbing you into the cock-squeezing haven that is her pussy.  She moans as she takes you.  "<i>Ooohh, you remind me why I got this egg in the first place!</i>" You rub her belly alongside her, simply admiring her smooth, super-curvy, pregnant frame.  That egg sure is big!'
            );
        }
        // BOTH FUCKS
        this.outputText(
            "\n\nSophie swivels her hips around in slow, circular strokes, riding your " +
                this.cockDescript(x) +
                " confidently."
        );

        this.outputText(
            '\n\n"<i>You have no idea how much I\'ve needed this,</i>" she says.  "<i>First my boobies got all big and stuff, and then my pussy got even wetter!  It\'s like, a fucking faucet whenever I think about you, and seeing you naked like this?  Gods, I\'m <b>gushing</b>!</i>" The rivulets of moisture run over your '
        );
        if (this.player.balls > 0)
            this.outputText(
                "[balls], where they hang in thick drops before falling to the ground,"
            );
        else this.outputText("taint and [legs]");
        this.outputText(
            " proving the veracity of her statements many times over.  You can't SEE the wetness, but your " +
                this.cockDescript(x) +
                " certainly feels it, twitching inside Sophie's silky slit when the waves of wetness roll over it."
        );

        this.outputText(
            "\n\nSitting up, you wrap your arms around the harpy's pregnant abdomen, grabbing hold of her by the small of her back.  Her breasts wobble and jostle against one another, just out of reach.  Pressing yourself against her fertile tummy, you get up far enough to kiss one of her breasts.  Sophie moans and begins to lift her hips up a few inches, dropping herself back down hard on top of you.  Her eyes meet yours, and she gingerly lifts one of her tits to push the nipple at your mouth.  You greedily suck on her areola, playing your tongue along the underside of her engorged, taut little nipple.  Sophie's pussy clenches with each suckle you give her chest, giving you a sinfully pleasant idea."
        );

        this.outputText(
            "\n\nYou release your pressure, and her pussy relaxes.  Then, you inhale around her tight bud again.  Her sodden snatch obliges your ploy with another supple squeeze.  In no time flat you're using the bimbo's big nipple like a control-rod for her pussy, suckling and releasing it again and again to make her milk your " +
                this.cockDescript(x) +
                " for all she's worth.  Sophie doesn't offer any complaints - just blissful exhalations of pleasure intermingled with lurid moans.  Even as a pregnant harpy matron, her body is absolutely, ridiculously designed for sex.  The air is virtually saturated with her fruity scent - a smell that only gets stronger each time you make her squeeze your dick and release a fresh drizzle of lady-cum."
        );

        this.outputText(
            "\n\nSophie shudders and shakes, her nipple getting puffier in your mouth.  After a while, you note the other seems equally engorged and yet untaken, so you pop the well-used tit-tip out of your mouth and hungrily latch on to the other, starting the cycle anew.  Sophie's gash explodes at that first suckle, undulating around you and clenching you wildly.  Her eyes roll up, half-hidden under her fluttering lashes as she releases a long, low moan, her whole body shaking with the excitement of it all.  Your " +
                this.cockDescript(x) +
                " is tingling all over, smothered in lubricant, sensuous pleasure, and a mountain of plump, harpy ass.  You shift your hands down there to squeeze the bouncing buttcheeks, holding on for dear life as the harpy's pussy assaults you with ecstasy."
        );

        this.outputText(
            '\n\nSophie pleads, "<i>Oooooh, cum in me baby, I wanna feel it agaaaiiiin!</i>"  Before you can even think to answer, [eachCock] is complying with the expectant mother\'s wishes.  All the pent-up pressure, excitement, and lust bubbles out of you in a rush, the liquid wave draining out of your well-milked ' +
                this.cockDescript(x) +
                " and directly into the harpy's channel."
        );
        if (this.player.cockTotal() > 1) {
            this.outputText(
                "  The underside of her tremendous, pregnant belly suddenly slides along you slickly, lubricated by the wasted spooge that's spurting from your unused member"
            );
            if (this.player.cockTotal() > 1) this.outputText("s");
            this.outputText(
                ".  The inadvertent tummyfuck redoubles the pleasure, forcing you to deal with a true, multi-cocked orgasm."
            );
        }
        this.outputText(
            "  Immediately, the cum you're squirting into her begins to be squeezed right back out.  Her womb is blocked thanks to the massive egg inside, and your lower body turns into a fruity, salty mess from all the cum and girl-jizz Sophie forces out."
        );
        if (this.player.cumQ() >= 500) {
            this.outputText("  There's enough there to ");
            if (this.player.cumQ() < 1000) this.outputText("soak your blankets");
            else if (this.player.cumQ() < 2000)
                this.outputText("soak your blankets and the ground below");
            else if (this.player.cumQ() < 5000)
                this.outputText(
                    "soak your blankets and form a giant puddle below, leaving you feeling like you're on a waterbed made of spunk."
                );
            else
                this.outputText(
                    "soak your blankets and create a lake the two of you sink partway into, surrounded by muddy, cum-flavored mud."
                );
        }
        this.outputText(
            '\n\nYou sag back as the last few drops leak out around you.  Sophie rolls off to the side, panting heavily.  She titters, "<i>'
        );
        if (morning) this.outputText("What... a... way to... start a... morning!");
        else this.outputText("Ooohh... you're... gonna be... a great... daddy...");
        this.outputText('</i>" in between panting gasps for breath.');

        this.outputText("\n\nSophie leaves you there");
        if (this.player.cumQ() >= 1000) this.outputText(" in the hardening mud");
        this.outputText(
            ", swaying her hips sensually as seed runs from her cunt in thick little rivers.  You're wet, sticky, and sated"
        );
        if (morning)
            this.outputText(" when you go wash up to get dressed.  It's going to be a good day.");
        else
            this.outputText(
                " when you go to get dressed.  You'll have to make sure to wash clean at some point, but for now you enjoy the sweet scent of your pet bimbo's cum."
            );
        this.player.orgasm();
        this.dynStats("sen", -2);
        if (morning) this.doNext(this.playerMenu);
        else this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Very Pregnant Sophie Tit Jobs*
    // Alternate Intro/Outro for consensual fucking when it isn't morning?
    private sophiePreggoTitJobs(): void {
        var x: number = this.player.biggestCockIndex();
        this.clearOutput();
        this.sophieSprite();
        this.outputText(
            "You whip out [oneCock] and point it at Sophie's tits, indicating that you'd like to fuck them.  She crosses her arms under her bouncy rack and pushes her titties together to create a fuckable canyon of cleavage.  She licks her lips sloppily, actually drooling in anticipation as she says, \"<i>So you want to fuck Momma Sophie's pregnant tits, huh?</i>\"  You stare at the jiggling expanse of smooth, creamy chest, and stiffen immediately, growing thicker than before.  Sophie shakes back and forth, setting off a boobquake of titanic proportions, her hands slowly starting to roam up and down the expansive flesh, trying to seduce you with her breasts alone.  From somewhere, she produces a vial of amber fluid (lip gloss, you wager) and upends it over her breasts, being sure to pour most of it down the middle, where your cock will soon be snuggled."
        );
        this.outputText(
            "\n\nSophie's cleavage was already appetizing, but when the entire chesty divide is glittering like precious metal, smelling of honey, and bouncing so enticingly, you feel recklessly drawn to it, your [legs] moving on their own to carry you closer to the shining breasts.  She catches a droplet of the fluid and rubs it over a nipple.  Her fingers go around and around, each circuit leaving behind a thicker coating of the reflective material.  Once her sizable teat is suitably decorated, she squeezes the last of the yellow paint up to the peak of her nipple, completing the coloring.  You lick your lips without meaning to, knowing that to touch your lips to that nipple or your dick to that aphrodisiac-poisoned valley would mean falling into an uncontrollable rut.  The ever-amorous harpy repeats the motion on the other side before giving up and letting the gold run down to her crotch, an obscene, reflective happy trail that your eyes gleefully follow up and down as you advance to her."
        );
        this.outputText(
            "\n\nSophie coos, \"<i>Oh, you're ready to go already, huh, [name]?  How about a good luck kiss for Momma Sophie?</i>\"  She lifts her breasts and presses them together, nipple to nipple and just inches away from your face.  You're gonna fuck her tits anyway... you might as well enjoy the whole package.  Sucking them both into your mouth, you let your tongue play across the twin peaks, a chemical buzz immediately slipping through your mouth membrane.  Your lips slide across the gilded areolas, sopping up more of the drug.  Bubbling lust pumps through your body, straight down to your groin where it begins to buzz away, a pleasant tingle in [eachCock] that makes you feel ready to fuck the whole world, starting with every single harpy on the mountain!  For now though, you keep kissing on those nipples.  The honeyed flavor makes them easy to enjoy, and Sophie's moans let you know that the affections are more than appreciated."
        );

        this.outputText(
            "\n\nSuddenly, the amber nubs are withdrawn, and you stagger dizzily for a moment, realizing you hadn't been breathing this whole time.  Sophie drops to her knees in front of you, supporting you by your [butt].  Her hands squeeze you affectionately as she kisses against your " +
                this.player.cockHead(x) +
                "."
        );
        if (this.player.cockTotal() > 1) {
            this.outputText("  Then, she fishes the ");
            if (this.player.cockTotal() == 2) this.outputText("other one");
            else this.outputText("rest");
            this.outputText(" out of your [armor], giving ");
            if (this.player.cockTotal() == 2) this.outputText("it");
            else this.outputText("each");
            this.outputText(" a slow, affectionate stroke before she returns to her target.");
        }
        this.outputText(
            "  The sensitive tip swells in her mouth, responding to the combination of sloppy, plump lip-kisses and the drugs now coursing through you."
        );

        this.outputText(
            "\n\nYour curvy cock-craving queen leans back, letting you slip free, connected to her by a golden strand of saliva as she arches her back and brings her immense melons into play.  She spreads them wide as your unrestrained erection lurches forward, dipping into the glossy valley she's made for you.  Her lipstick is extremely slick and the entire underside of your " +
                this.cockDescript(x) +
                " is immediately gilt with reflective aphrodisiac.  The buxom harpy presses her breasts in from each side, the change in tightness immediately noticeable to your sensitive cockflesh.  A delicious, warm friction envelops your maleness from all sides.  Smooth, gloss-lubed skin seems to caress you from every angle, compressing tightly about your girth as Sophie's hands finish bringing the pleasant power of her breasts to full erotic effect.  Your [legs] tremble, and your head is pounding from just how badly you desire a fuck, a cum- anything to bring you to orgasm."
        );

        this.outputText(
            "\n\nYou look down at Sophie, and the bimbo looks back, slowly tonguing her upper lip, the same color as your cock, matched perfectly.  She teases, \"<i>It's super good, isn't it?  Here, let me make it better!</i>\"  Before you know what's going on, Sophie is pushing her breasts down and meeting "
        );
        if (this.player.cocks[x].cockLength > 30)
            this.outputText("the underside of your immense erection");
        else this.outputText("your " + this.player.cockHead(x) + "");
        this.outputText(
            " with her lips, already pursed into a plump, cock-sucking doughnut hole of pleasure.  The noise she makes when your " +
                this.cockDescript(x) +
                " "
        );
        if (this.player.cocks[x].cockLength > 30) this.outputText("presses against");
        else this.outputText("slips into");
        this.outputText(
            " her puffy, puckered orifice is indescribably moist, a sloppy sucking sound that would make you dribble pre-cum if her tits and mouth weren't already milking a steady flow out."
        );
        if (this.player.cocks[x].cockLength > 30)
            this.outputText(
                "  Sophie pulls back long enough to gasp, \"<i>You're so long, I can't even take the tip!</i>\""
            );
        this.outputText(
            "\n\nYou rock your [hips], unable to resist, but at the first sign of motion, Sophie pulls her tits away.  \"<i>Like, just let me milk your dick babe.  Hold still and I'll make sure it's everything you want.</i>\"  She shakes her tits enticingly for emphasis."
        );

        this.outputText(
            "\n\nDo you let her rub your dick down with her tits how she wants, or push her down and go hog-wild on those giant, pregnancy-enhanced knockers?"
        );
        this.dynStats("lus=", 100, "resisted", false);
        // [Let Her] [Hog Wild]
        this.menu();
        this.addButton(0, "Let Her", this.letSophieMilkYoDick);
        this.addButton(1, "Hog Wild", this.goHogWildOnSophieBewbs);
    }

    // Hog Wild*
    private goHogWildOnSophieBewbs(): void {
        this.clearOutput();
        this.sophieSprite();
        var x: number = this.player.biggestCockIndex();
        this.outputText(
            "You don't care about her promises- there's a pair of soft tits right there just waiting for a dick to fuck them, and nothing is going to stop you from spooging all over them however you want!  Sophie barely has a chance to react before you're tossing her on her back and mounting her chest.  Your [butt] rubs on the top of her pregnant belly as you settle your " +
                this.cockDescript(x) +
                " into the perfect position."
        );
        if (this.player.cockTotal() > 1) {
            this.outputText("  Your other cock");
            if (this.player.cockTotal() > 2) this.outputText("s splay");
            else this.outputText(" splays");
            this.outputText(" out to the side, lamely brushing against the outsides of her tit.");
        }
        this.outputText("  Sophie blubbers in surprise, stopping only when your ");
        if (this.player.cocks[x].cockLength <= 30)
            this.outputText(
                this.player.cockHead(x) +
                    " pushes into through her startled cock-pillows, muffling her more effectively than any gag.  She immediately sucks on it, a happy look in her eyes.  The bimbo seems to want nothing more than to lie there and polish your rod."
            );
        else
            this.outputText(
                " immense rod smacks across her face, too long to try to jam down her throat.  It completely covers her face, smothering her features with rigid, veiny dickflesh.  She immediately begins to lavish the underside with licks and long wet kisses, aided by her plus-sized bimbo lips.  When her eyes peek out from under your " +
                    this.cockDescript(x) +
                    ", they seem placid and happy.  It seems the slut wants nothing more than to lie there and service your cock."
            );
        this.outputText(
            "\n\nGrabbing hold of Sophie's plump nipples, you immediately use them for leverage, tugging them together above your dick.  The tiny, pebbly joysticks are almost rock-hard already!  With your yanks merging her tits together around your " +
                this.cockDescript(x) +
                " and shooting explosions of sensation through her brain, Sophie struggles to stay coherent enough to keep orally attending to your maleness.  Her tongue's licks quickly begin to devolve into spastic, instinctive strokes, lashing around your underside with lusty fury.  They still feel good, so you don't really mind.  The space under Sophie's ass sloshes around muddily, proof of just how much the harpy is enjoying this tryst, even if you've turned the tables on her."
        );

        this.outputText(
            "\n\nSophie's tits bounce off your crotch, hard.  Your [hips] have begun their march back and forth, bouncing off your pregnant tart's immense belly and back into her voluptuous tits.  The jiggling udders feel so good pressed around your " +
                this.cockDescript(x) +
                " that you can't even comprehend why anyone would want to wait for such pleasure.  You fuck her tits hard, so violently that Sophie begins to give up short gasps of pain, stopping her fellatio as the pain and pleasure mix confusingly in her head.  She grabs her jugs from the side, pressing them into you to take some of the tension from her abused nipples."
        );

        this.outputText(
            "\n\nThe effects of her honeyed lipgloss are becoming more and more apparent to you, visible to the extreme in the thick, exceedingly quick pulsations that are running through your " +
                this.cockDescript(x) +
                ".  It's twitching happily, bouncing in the harpy's fat tits.  Her soft breasts have the perfect amount of give, and the golden fluid that slicks them makes them easily as slippery as a wet pussy, perhaps even more so.  Pre-cum is dribbling from your tip"
        );
        if (this.player.cocks[x].cockLength <= 30) this.outputText(" right into Sophie's mouth");
        else this.outputText(" above Sophie's head");
        this.outputText(
            ".  The bird slut stops her frenzied fellatio to beg, \"<i>Please cum on me, [name]!  Cum all over Momma's Sophie's face and tits!  I fucking love, like, being covered in jizz!</i>\""
        );

        this.outputText(
            "\n\nYou're about to reprimand her when she cries out again, louder and more forcefully, almost hypnotically, setting off a cascade of pleasure inside you so strongly that you can't hope to resist, \"<i>Cum on me!</i>\""
        );
        this.outputText(
            "\n\nSophie pushes you back just far enough for you to unload onto her face and breasts"
        );
        if (this.player.balls > 0)
            this.outputText(
                ", cupping your [balls] with a hand and massaging them to aid your ejaculation"
            );
        this.outputText(
            ".  Your [butt] is squished up against her belly, both of you sweating and slipping all over each other.  Bulging in her breasty embrace, your " +
                this.cockDescript(x) +
                " flexes, and your " +
                this.player.cockHead(x) +
                " thickens."
        );
        if (this.player.hasKnot(x))
            this.outputText(
                "  Your knot inflates to a ludicrous degree, squeezed down on from all sides by slick, gold-painted tits, happy to be engulfed by warm flesh."
            );
        this.outputText(
            "  Cum fountains from you, splattering over Sophie's face, some of it catching on her tits along the way.  A ribbon of the white goo dangles between her mountainous chest and her chin, breaking only when you spurt another set of alabaster cream all over her breasts, most trapped inside the snug cleavage with you.  You slip yourself forwards and continue to cum, lacing hot, sticky jets onto her face."
        );
        if (this.player.cumQ() > 1000)
            this.outputText(
                "  Again and again, you continue to paint her white.  Your orgasm seems almost without end as you ejaculate.  Sophie's face is soaked with it, and her breasts have become glazed mountain-peaks."
            );
        if (this.player.cumQ() > 2500)
            this.outputText(
                "  By the time you finish, the stuff is puddled under her.  The best your harpy pet can manage is a spermy smile as she languishes in your seed."
            );
        this.outputText(
            "  You push your " +
                this.player.cockHead(x) +
                " and get a kiss from her as you finish cumming, oozing one last dollop onto her fat lips.  She whimpers in the most exciting way as you withdraw, wiping your cock off on her swollen belly, marking her as yours once more."
        );

        this.outputText(
            "\n\nYou step away with a smile, getting dressed while the bimbo helplessly begins to frig herself.  Your gold rod quickly disappears into your [armor], but the lingering effects of her lipsticks will keep you thinking of her for some time..."
        );
        this.outputText(
            '\n\n"<i>Ooooh, like, thank you!</i>" she calls after you, "<i>Give my pussy some next time, okay?  It totally misses you!</i>"'
        );
        this.player.orgasm();
        this.dynStats("lib", 1, "sen", -2);
        this.sophieScene.luststickApplication(8);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Let Her*
    private letSophieMilkYoDick(): void {
        this.clearOutput();
        this.sophieSprite();
        var x: number = this.player.biggestCockIndex();
        this.outputText(
            "You nod at Sophie and hold yourself still.  She rewards you by wrapping her breasts back around you, enveloping you in tight pleasure again.  "
        );
        if (this.player.balls > 0)
            this.outputText(
                "Your [balls] drag across her pregnant belly as she goes to work, but you don't mind in the slightest.  There's something erotic about having them bumping up against the fruit of your union.  "
            );
        this.outputText(
            "Her breasts begin to bounce without warning, up and down in perfect sync.  The tight titty-embrace is almost too much.  You can feel your dick flexing in that smothering, lube-soaked chest.  Sophie extends her tongue to lick at you, and her tongue sends shockwaves of excitement through your already raging boner."
        );

        this.outputText(
            '\n\nGroaning out loud, you struggle mightily to restrain your instincts.  Sophie smiles, saying, "<i>Mmm, does my special ' +
                this.player.mf("boy", "girl") +
                " like having " +
                this.player.mf("his", "her") +
                " cock rubbed while " +
                this.player.mf("he", "she") +
                ' has to stand there all anxious and stuff?</i>"  She pecks your cock affectionately, another tingling kiss added onto the immense, chemical pleasure that\'s making your [balls] clench.  "<i>I know you like it babe.  Momma Sophie\'s gonna like, squeeze out all that thick, nasty cum onto her face for you.  Do you want to blow soon?  I can like, get you to cum whenever I want!</i>"'
        );

        this.outputText(
            '\n\nYou nod, biting your lip.  Sophie tilts her head to the side, as if she doesn\'t understand it.  "<i>YES!  I want to cum!  Please!</i>"'
        );

        this.outputText(
            '\n\nSophie rolls her eyes exaggeratedly and pops her mouth back off your dick.  "<i>Why didn\'t you just, like, say that, sexy?</i>"  She giggles cutely and returns to polishing your gold-gilt rod.  Her eyes flick back up at you, the corners of her mouth curling up as she begins to hum on your ' +
                this.cockDescript(x) +
                ".  Sophie suddenly switches tempo, bouncing her left tit down while she takes her right titty up.  With the creamy tits on either side to moving to different tempos, sliding their slick druggy payload across you with delicious, alternating friction your " +
                this.cockDescript(x) +
                " immediately begins to twitch and pulse fitfully.  It's like you have your cock fucking two different pussies at once, all while getting a blowjob from a pair of puffy, bee-stung bimbo-lips."
        );

        this.outputText(
            '\n\nSophie breaks away from fellatio long enough to mouth, "<i>Cum.  Now,</i>" and immediately pops her mouth back in place'
        );
        if (this.player.cocks[x].cockLength <= 30) this.outputText(", ready to catch the cum");
        else this.outputText(", assisting the cum");
        this.outputText(
            " that's already bubbling out of your [balls] with searing heat.  She presses harder on each side, crushing your " +
                this.cockDescript(x) +
                " with her slippery tits as your urethra bulges with the heavy load. With an audible squishing noise, you unload what feels like every drop of cum your body contains in one huge lance."
        );
        // {Fork between mouth and bukkake}
        // Mouth
        if (this.player.cocks[x].cockLength <= 30) {
            this.outputText("  Sophie");
            if (this.player.cumQ() < 250)
                this.outputText(
                    " swallows it without complaint, her eyes twinkling mirthfully as she suckles down your small load.  Surprisingly, you dump a few more pulses into her, each weaker than the last.  The bird-woman drinks it with ease, never looking away from you."
                );
            else if (this.player.cumQ() < 500)
                this.outputText(
                    "'s cheeks bulge from the size of your load, but she manages to get it down with a big gulp.  Surprisingly, you dump a few more jets of thick cream into her waiting gullet, each weaker than the last but big enough to make it hard for her to swallow.  She never looks away from you as she takes it."
                );
            else if (this.player.cumQ() < 1000)
                this.outputText(
                    "'s cheeks bulge cartoonishly at your immense deposit, cream escaping from the corners of her mouth as her poor mouth floods.  Her throat bobs ludicrously, trying to keep up with the flow, but when you follow up that virile blast with several smaller, still potent deposits, she gives up and lets the jizz run down her lip and face, dripping onto her tits.  Through it all, her eyes never leaves yours."
                );
            else {
                this.outputText(
                    "'s cheeks bulge ridiculously for a split second before the pleasure sends cum fountaining out her nose and jetting out the corners of her mouth.  She <b>tries</b> to swallow it, but her meager throat simply can't "
                );
                if (this.silly()) this.outputText("repel cum of that magnitude");
                else this.outputText("handle that much cum");
                this.outputText(
                    ".  Again and again, you spunk the hell out of her face, until Sophie pulls back gagging.  She gets a mask of jizz for her efforts, even after she's swallowed a bellyful of cum.  She WAS watching your face, until your cum obscured her eyes, and even then, she keeps her head facing you, letting you watch your jism dripping down her gorgeous features."
                );
            }
            this.outputText("  The bird-girl withdraws ");
            if (this.player.cumQ() < 1000) this.outputText("with a happy smile");
            else this.outputText("coughing and sputtering");
            this.outputText(
                " once you're dumped out every drop.  She touches your " +
                    this.cockDescript(x) +
                    " affectionately, tickling at its underside, and her flushed face seems extraordinairily pleased to have made you cum so hard.  Sophie's hands stroke her belly slowly as she looks up at you, whispering, \"<i>You're like, so good to Momma Sophie.  Just be sure and cum for my twat again soon, okay?  It misses you.</i>\""
            );
        }
        // On top of her.
        else {
            this.outputText("  Sophie");
            if (this.player.cumQ() < 250)
                this.outputText(
                    " giggles happily when the cum jets into the air and down atop her head, moaning against your dick while it seeps through her platinum feathers.  Throughout it all, she licks and sucks on your shaft, milking out every drop and never looking away."
                );
            else if (this.player.cumQ() < 800)
                this.outputText(
                    " moans when your heavy deposits splatter into her hair, dripping through the downy blond feathers in a messy web.  Throughout it all, she sucks and licks at you, polishing your " +
                        this.cockDescript(x) +
                        " until she's sure every single drop of jizz has been expelled onto her curvy frame."
                );
            else {
                this.outputText(
                    " moans whorishly as your gigantic cum-wad splatters over her, running down her hair in thick waves, soaking her shoulders and even dropping over her face in a slippery mask.  She keeps kissing and sucking to make sure you give up every drop, not stopping until she feels your urethra stop its orgasmic pulsating.  Even then, her face stays angled up at you, allowing you to watch as your jizz runs unimpeded across her voluptuous body, dripping from every curve."
                );
                if (this.player.cumQ() >= 2000) {
                    this.outputText("  She's completely soaked, head to toe");
                    if (this.player.cumQ() >= 3000) {
                        this.outputText(" and a ");
                        if (this.player.cumQ() < 4000) this.outputText("puddle");
                        else if (this.player.cumQ() < 6000) this.outputText("big puddle");
                        else if (this.player.cumQ() < 10000) this.outputText("small lake");
                        else this.outputText("obscene lake");
                        this.outputText(" has formed around the pair of you");
                    }
                    this.outputText(".");
                }
            }
            this.outputText(
                "  She gathers up some of your spunk and rubs it over her breasts and belly as you slump back, reveling in the feel on her skin and how wonderful her big, pregnant boobs are feeling."
            );
            this.outputText(
                '\n\nSophie grabs you and pulls you against her cum-slick belly, rubbing her hands up and down that smooth, egg-bound sphere.  She coos, "<i>You\'re like, so good to Momma Sophie.  Just be sure and cum for my twat again soon, okay?  It misses you.</i>"'
            );
        }
        this.player.orgasm();
        this.dynStats("lib", 1, "sen", -2);
        this.sophieScene.luststickApplication(8);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Sophie Births Egg*
    public sophieBirthsEgg(): void {
        this.sophieSprite();
        this.outputText(
            "\nA high pitched cry of pleasure rings out through your camp.  You rush towards it, knowing from that high-pitched tone that it can only be the harpy, Sophie.  She's leaning against a rock, her legs splayed wide.  Underneath her supple thighs, there's a well-made bed of straw, cloth, and leaves that vaguely resembles a nest.  She's been busy!"
        );

        this.outputText(
            '\n\nSophie\'s engorged pussy is on full display, though the entrance is dilated wide, completely gaped.  You can see muscular contractions rippling through her belly and legs, each one causing the rounded bulk to shift lower on her frame.  She looks up at you and moans, "<i>It\'s c-c-coming!</i>"  One hand is clenched tight to her breast, but the other is busy circling her clit, stopping only to rub over her sensitive labia and the outside of her puffy mound.  Lubricant is gushing out from her, and her flushed cheeks and taut, puckered nipples leave no doubt as to her enjoyment of the situation.  She groans, "<i>'
        );
        if (this.bimboSophie())
            this.outputText(
                "Come here, [name]!  I... whooooaaaa... I wanna like, hold your hand when the egg comes out!"
            );
        else
            this.outputText(
                "Come here, [name]!  I... whoooaaaa...  I need something to hold on to while this comes out!"
            );
        this.outputText('</i>"');

        if (this.player.cor < 33)
            this.outputText(
                "  You sit down next to her, and figuring this must be normal for her, you hold her hand with one arm and grope at her free breast with the other."
            );
        else if (this.player.cor < 66)
            this.outputText(
                "  You sit down next to her with a sigh.  Well, at least you can grope her tit with your other hand!"
            );
        else
            this.outputText(
                "  You plop down next to her, but ignore her proffered hand for one of those juicy melons on her chest.  Grinning, you can't help but think that this is a far more tender thing to hold anyway."
            );

        this.outputText(
            "\n\nYour fingers sink into the soft chest-flesh, two of them securing the sensitive areolae in a pinching grip.  Gasping, Sophie shudders as her gravid belly shifts.  The egg inside, clearly defined against her frame, drops lower.  The harpy's hips stretch apart, widening as if by magic, her leg coming to rest atop you"
        );
        if (this.player.isBiped()) this.outputText("rs");
        this.outputText(
            ".  A rounded white rim peeks out through her spasming pussy-lips, glistening with lubricants that drop from its bottom so fast it's almost a steady stream."
        );

        this.outputText(
            "\n\nSophie's fingertips begin to rub her clit so fast they seem a blur of constant movement, her hips lifting with jerky rocking motions, each one revealing a bit more white.  She grabs hold of you hard and digs into you with those dagger-sharp nails without meaning to.  Her lashes flutter madly as lust overwhelms her, and she screams out in excitement, high-pitched and piercing.  The jilting movements before are replaced with one long contraction.  The ovoid mass within your feathery girl moves quickly now, pushing through her lips with a slow, steady motion.  As it reaches the halfway point, the egg's progress stalls, though Sophie's orgasm does not.  Her scream cuts off, but her body keeps shaking.  You support her, even when her eyes roll back and you begin to worry that the egg might be stuck."
        );

        this.outputText(
            "\n\nA gush of fluids suddenly squirts from the well-endowed harpy matron, and the transluscent embryo squirts free, accompanied by a tremendous 'slurrrrrrPOP' sound.  Sophie sags back into your arms, panting weakly as her hips and well-stretched cunny begin to contract towards a more 'normal' size (at least for her).  She still quivers every few seconds - so much as removing your hand from her breast over-excites her, setting off a fresh flow of her love-juice."
        );

        this.outputText(
            '\n\nThe egg seems fine, as far as eggs go.  Rapidly drying, the surface loses its polished luster and takes on a flat, matte white tone.  Sophie blinks her eyes and snuggles up against you, saying, "<i>Look at what we did, [name].  It\'s beautiful.</i>"'
        );

        this.outputText(
            "\n\nYou stick around long enough to make sure Sophie and her egg are okay before you go."
        );
        if (this.flags[kFLAGS.SOPHIE_ADULT_KID_COUNT] == 0)
            this.outputText("  Can you handle having another harpy living in your camp?\n");
        else this.outputText("  Just how many harpies can your camp hold?\n");
        this.dynStats("lus", 10 + this.player.lib / 10);
    }

    // Egg Hatched Notification
    public sophiesEggHatches(): void {
        this.flags[kFLAGS.SOPHIE_CAMP_EGG_COUNTDOWN] = 0;
        this.sophieSprite();
        this.outputText(
            "\nThe quiet of your camp is suddenly broken by loud bird-like cries and squawks.  What on earth could have gotten Sophie so worked up?  Letting out a sigh, you head over to where your feathery "
        );
        if (this.bimboSophie()) this.outputText("bimbo ");
        else this.outputText("woman ");
        this.outputText(
            "is raising such a fuss.  Upon spotting Sophie, you can't help but notice the flapping of wings and a number of feathers strewn about.  The "
        );
        if (this.bimboSophie()) this.outputText("silly ");
        this.outputText(
            "harpy is once again fussing over her newly birthed egg, though this time she seems even more flustered about it.  Catching sight of you, her face instantly lights up, a bright"
        );
        if (this.bimboSophie()) this.outputText(", happy");
        this.outputText(
            " smile spreading across her plump, golden lips as she bounds over to you and grabs your hand."
        );

        if (this.bimboSophie())
            this.outputText(
                "\n\n\"<i>It's time!  It's time!  It's like, totally time for our egg to hatch!  Come on, babe!  Come see your new, fluffy little cutie!</i>\" she says as she pulls you over to her nest.  As soon as you get there, you can already see what the excited bimbo means.  The egg wiggles and shakes, cracks forming across its hard shell as if something inside is trying to break out.  Now that you're here and watching, Sophie lets go of you, bounding over to her precious egg.  She rubs it softly and coos to it, cheering her little baby harpy on.  Sophie may be a dumb horny bimbo, but she still seems to care for her offspring immensely."
            );
        else
            this.outputText(
                "\n\n\"<i>It's time!  It's time!  Our egg is going to hatch!  Come on!  Come see your new daughter!</i>\" she says as she pulls you over to her nest.  As soon as you get there, you can already see what the expectant mother is on about.  The egg wiggles and shakes, cracks forming across its hard shell as if something inside is trying to break out.  Now that you're here and watching, Sophie lets go of you, bounding over to her precious egg.  She rubs it softly and coos to it, cheering her little baby harpy on.  Sophie may be a bit of a domineering woman, but she shows nothing but immense tenderness for her offspring."
            );

        this.outputText(
            "\n\n\"<i>Ohhh, here it comes!  Come on sweetie, you're almost there,</i>\" she coos to her egg.  As if spurred on by its mother's calls, the egg shakes harder, big cracks splitting across the shell.  Finding yourself interested in what your harpy daughter is going to look like, you step closer, watching with bated breath as a talon tipped foot explodes its way out of the egg. Barely a few seconds later, a hand smashes through the shell.  Again and again, your newborn daughter breaks her egg's confining shell apart until she is free of the protective confines of her old home."
        );
        if (this.flags[kFLAGS.SOPHIE_ADULT_KID_COUNT] < 4) {
            // First Harpy:
            // -Pink plumage, big tits and (sensitive) lips, normal harpy hips. (blue eyes)
            if (this.flags[kFLAGS.SOPHIE_ADULT_KID_COUNT] == 0) {
                this.outputText(
                    "\n\nThe first thing that comes to mind when you see your newborn - or is that new-hatched? - daughter is... 'fluffy.'  She's covered in adorably soft, pink down, with big blue eyes that peer around curiously.  She looks cute as hell"
                );
                if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00282] > 0)
                    this.outputText(
                        ", though her lips are a little larger than you'd think was normal - maybe she inherited it from her mom?"
                    );
                else this.outputText(".");
                this.outputText(
                    "  The harpy chick is actually about as big as a four or five year old, and she looks up at Sophie curiously."
                );
                if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00282] > 0) {
                    this.flags[kFLAGS.DAUGHTER_ONE_BIMBO] = 1;
                }
            }
            // Second daughter
            // Second Harpy:
            // -Badonkadonk to 9000.  Blond feathers that grow very long. (violet eyes)
            else if (this.flags[kFLAGS.SOPHIE_ADULT_KID_COUNT] == 1) {
                this.outputText(
                    "\n\nYou'd think that since this is the second time you've seen one of Sophie's eggs hatch, you'd be a little more used to this, but the sight still awes you"
                );
                if (this.player.cor > 66) this.outputText(" a little bit");
                this.outputText(
                    ".  The newly hatched chick looks about as old as the other - four or five years old.  Unlike the first one, her face is fairly normal, though you think with her features she's sure to be a beauty when she matures.  She's a bit bigger in the butt and hips than her elder sister, and her eyes are violet while her plumage matches her mothers - "
                );
                if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00282] > 0) {
                    this.outputText("platinum blonde");
                    this.flags[kFLAGS.DAUGHTER_TWO_BIMBO] = 1;
                } else this.outputText("pure pink");
                this.outputText(
                    ".  Her feathers definitely seems longer as well, even though it's still just fuzzy down."
                );
            }
            // Third Harpy:
            // -Not that curvy, but has human feet and purple feathers. (violet eyes)
            else if (this.flags[kFLAGS.SOPHIE_ADULT_KID_COUNT] == 2) {
                this.outputText(
                    "\n\nOnce again, you get to watch another harpy experience the first few moments of her memorable life.  This one has perfect, normal-looking proportions, and though she clearly has the wide hips indicative of her race they're nowhere near as big as her big-butted sister's.  Most surprisingly of all, she lacks the talons that her mom and sisters share.  Instead, she has normal, human feet.  Sophie's brow furrows with worry, but you can't help but think that it's about damned time something in this place took after you for a change.  Her eyes are piercing violet, though her feathers are a deep purple in color."
                );
                if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00282] > 0)
                    this.flags[kFLAGS.DAUGHTER_THREE_BIMBO] = 1;
            }
            // Fourth Harpy:
            // -Curvy like Sophie, but with well-developed wings and extra-soft feathers (WINGJOBS).  Pink plumage.  (blue eyes)
            else {
                this.outputText(
                    "\n\nYour fourth child seems to take after her mom in just about every way.  She has blue eyes like Sophie, pink feathers"
                );
                if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00282] > 0)
                    this.outputText(" like her mother used to have before her bimbofication");
                this.outputText(
                    ", and a shape that seems to indicate that maturity will be VERY generous to her.  She looks around in wonder, already flapping wings that seem a touch more developed than her sisters were at that age.  You've got to wonder just how big they'll get with age."
                );
                if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00282] > 0)
                    this.flags[kFLAGS.DAUGHTER_FOUR_BIMBO] = 1;
            }

            // ALL FIRST FOUR END WITH THIS:
            if (this.bimboSophie())
                this.outputText(
                    '  Before the girl can try to stand she is swept up off her feet by her ecstatic mother.  "<i>Oohhhhh, just look at you!  My baby girl is sooo cute!  Soooo totally fluffy and like, suuuuper soft!</i>"'
                );
            else
                this.outputText(
                    '  Before the girl can try to stand she is swept up off her feet by her ecstatic mother.  "<i>Oohhhhh, you\'re so cute!  My baby girl is sooo cute!  Oh, the boys will be all over you when you grow up, I just know it!</i>"'
                );
        }
        // Every Other daughter*
        else {
            this.outputText(
                "\n\nYou never get tired of watching this, the young harpy bursting from her egg, shards of shell landing all around the nest as the fluffy little harpy emerges. The "
            );
            if (SophieBimbo.rand(2) == 0) this.outputText("pink");
            else {
                if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00282] > 0) this.outputText("blonde");
                else this.outputText("white");
            }
            this.outputText(" girl coos as she shields her ");
            if (SophieBimbo.rand(2) == 0) this.outputText("violet");
            else this.outputText("blue");
            this.outputText(
                " eyes from the sun.  The little bird-girl is soon out of her egg, but already looks to be four or five years old.  As always, the sweet little thing is as fluffy as a newborn chick, feathers sticking out every which way and making her look more like a puffball with skin showing than a little baby harpy.  Before the girl can try to stand she is swept up off her feet by her ecstatic mother.  "
            );
            if (this.bimboSophie())
                this.outputText(
                    '"<i>Oohhhhh, just look at you!  My baby girl is sooo cute!  Soooo totally fluffy and like, suuuuper soft!</i>"'
                );
            else
                this.outputText(
                    '"<i>Oohhhhh, you\'re so cute!  My baby girl is sooo cute! Oh, the boys will be all over you when you grow up, I just know it!</i>"'
                );
        }
        this.outputText(
            "\n\nThe tiny harpy lets out a surprised squawk, not expecting her mother to be so excited.  She squirms in Sophie's arms, afraid and unsure what to do about the busty monster that snatched her.  "
        );
        if (this.bimboSophie())
            this.outputText(
                "\"<i>Oh dearie, there there, like, calm down, sweetie.  Don't worry, Momma Sophie's here.</i>\"  The matronly harpy gently hugs the squirming fluff-ball into her big, soft breasts, her hands gently stroking her fussy daughter's feathery hair."
            );
        else
            this.outputText(
                "\"<i>There there, calm down, baby.  Momma Sophie's here...  I'm here.</i>\"  The matronly harpy gently hugs the squirming fluff-ball into her big, soft breasts, her hands gently stroking her fussy daughter's feathery hair."
            );

        this.outputText(
            "\n\nUnder such tender, motherly affections, your little daughter finally calms down, letting out a squeak before settling into the soft warm flesh of her mother's breasts. Gently nuzzling her face against the softness, her arms hug tight against Sophie.  You can't help but smile at the cavity-inducingly sweet sight."
        );

        this.outputText(
            "\n\nNot wanting to be left out of the fun, you step forward, moving to embrace your feathery family to show your newborn daughter that she has a home here.  Squeezing tightly, you snuggle with your avian lover and offspring, the fluffy plumage tickling your " +
                this.player.skinFurScales() +
                '.  If anything, your touch only seems to make Sophie even happier, a big dopey smile spreading across her lips from the intimate contact.  "<i>Oh babe, we make some real cuties, don\'t we?</i>"'
        );

        this.outputText("\n\nGrinning to your ");
        if (this.bimboSophie())
            this.outputText(
                'curvaceous bimbo, you reach down and grab her huge, round ass and squeeze, pulling her closer.  The rough grab rips a surprised gasp from your milfy harpy. "<i>Eeep!  Babe... not in front of our chick!  Mmmm, well, Momma Sophie would be happy to play with you babe, just let me put our little girl here for a nap first.  Then you and me can like, totally get started on putting another egg inside me!</i>"\n'
            );
        else
            this.outputText(
                "curvy mother, you reach down and grab her big, round ass and squeeze, pulling her closer.  The rough grab rips a surprised gasp from your milfy harpy. \"<i>Oh, [name]... not in front of our chick!  Mmmm, well, Momma Sophie would be happy to play with you babe, just let me put our little girl here for a nap first.  Then I'll take care of you, my virile " +
                    this.player.mf("stud", "breeder") +
                    '...</i>"\n'
            );
        this.flags[kFLAGS.SOPHIE_DAUGHTER_MATURITY_COUNTER] = 336;
    }

    // Mature alert
    public sophieKidMaturation(): void {
        this.clearOutput();
        this.sophieSprite();
        this.outputText(
            "Checking up on your growing daughter, you find her once again with her mother Sophie.  The two harpies are just gabbing away about this and that when suddenly your teen-looking daughter groans as if in pain.  Worried about the state of your offspring, you approach the nest and look over your daughter.  Next to her, Sophie flutters her wings, fussing over her daughter's health.  Before your very eyes, your daughter changes - her once plain body growing out, feminine curves ballooning exquisitely."
        );

        // First daughter
        if (this.flags[kFLAGS.SOPHIE_ADULT_KID_COUNT] == 0) {
            // First Harpy:
            // -Pink plumage, big tits and (sensitive) lips, normal harpy hips. (blue eyes)
            if (this.flags[kFLAGS.DAUGHTER_ONE_BIMBO] == 1)
                this.outputText(
                    "\n\nHer chest and lips develop remarkably, particularly her chest.  Her breasts are immense, akin to something you would see on a cow-girl, and the prominent nipples and soft, creamy skin make you wonder what it would be like to milk a harpy.  Her swollen tits actually put her mom's to shame, and Sophie looks on jealously as the girl's lips plump up bigger than her own.  The maturing woman's hips widen only slightly, a hair skinnier than most harpies in girth but still very noticeable.  She touches a finger to her bee-stung lips and moans, obviously enjoying how sensitive her plush cock-pillows feel."
                );
            else
                this.outputText(
                    "\n\nHer chest and lips develop remarkably.  Her breasts are large for a harpy, akin to something you would see on a young cow-girl, and the prominent nipples and soft, creamy skin make you wonder what it would be like to milk a harpy.  Her swollen tits actually put her mom's to shame, barely, and Sophie looks on jealously as the girl's lips plump up a little bigger than her own.  The maturing woman's hips widen only slightly, a hair skinnier than most harpies in girth but still very noticeable.  She touches a finger to her larger lips and moans, obviously enjoying how sensitive her cock-pillows feel."
                );
        }
        // Second daughter
        else if (this.flags[kFLAGS.SOPHIE_ADULT_KID_COUNT] == 1) {
            // Second Harpy:
            // -Badonkadonk to 9000.  Blond feathers that grow very long. (violet eyes)
            if (this.flags[kFLAGS.DAUGHTER_TWO_BIMBO] == 1)
                this.outputText(
                    "\n\nHer ass expands immensely along with her hips.  Soon, the freshly-matured harpy has a butt to rival her mother, but it doesn't just stop there.  Her immense rump swells until it's positively gravity-defying, a jiggly expanse of supple butt just wanting to be grabbed, squeezed, or even fucked.  Her chest is fairly modest, perhaps a B or C cup at best guess.  The blond feathers all over her body lengthen as well, her “hair” going down past her ass, the plumage about her legs and arms puffy and shaggy like leg-and-arm warmers.  She licks her lips as the changes finish, admiring her new, posh bottom."
                );
            else
                this.outputText(
                    "\n\nHer ass expands along with her hips.  Soon, the freshly-matured harpy has a butt to rival her mother, but it doesn't just stop there.  Her swollen rump swells until it's positively posh, a jiggly expanse of supple butt just wanting to be grabbed, squeezed, or even fucked.  Her chest is fairly modest, perhaps an A or B cup at best guess.  The feathers all over her body lengthen as well, her “hair” going down past her ass, the plumage about her legs and arms puffy and shaggy like leg-and-arm warmers.  She licks her lips as the changes finish, admiring her new, enlarged bottom."
                );
        }
        // Third daughter
        else if (this.flags[kFLAGS.SOPHIE_ADULT_KID_COUNT] == 2) {
            // Third Harpy:
            // -Not that curvy, but has human feet and purple feathers. (violet eyes)
            if (this.flags[kFLAGS.DAUGHTER_THREE_BIMBO] == 1)
                this.outputText(
                    "\n\nShe grows up into a perfect-looking harpy - all except her feet, which remain utterly and completely human.  Her hips are nice and broad, her breasts only slightly bigger than average for a harpy, maybe C or D-cup at best, her wings seeming as impressive as any of the other bird-women.  The matured woman stamps her foot in frustration - clearly she had hoped it would change with the rest of her.  Still, Sophie whispers something into her ear that makes her blush yet smile at the same time.  She lifts her foot and curls her toes, looking at herself in a whole new light."
                );
            else
                this.outputText(
                    "\n\nShe grows up into a perfect-looking harpy - all except her feet, which remain utterly and completely human.  Her hips are nice and broad, her breasts only slightly bigger than average for a harpy, maybe C at best, her wings seeming as impressive as any of the other bird-women.  The matured woman stamps her foot in frustration - clearly she had hoped it would change with the rest of her.  Still, Sophie whispers something into her ear that makes her blush yet smile at the same time.  She lifts her foot and curls her toes, looking at herself in a whole new light."
                );
        }
        // Fourth daughter
        else if (this.flags[kFLAGS.SOPHIE_ADULT_KID_COUNT] == 3) {
            // Fourth Harpy:
            // -Curvy like Sophie, but with well-developed wings and extra-soft feathers (WINGJOBS).  Pink plumage.  (blue eyes)
            if (this.flags[kFLAGS.DAUGHTER_FOUR_BIMBO] == 1)
                this.outputText(
                    "\n\nAss, hips, and chest all expand in equal measure, only stopping when she's reached a critical mass that puts her on even footing with her mother, perhaps only a single cup size smaller.  She admires her new self experimentally, barely even aware that her wings are still growing.  By the time they stop, they're much larger than her mom's, trailing wisps of soft feather-fluff.  She curls them around her new breasts and squeezes the massive boob flesh tightly, moaning in delight.  Sophie smiles and says something about a wingjob, which makes the freshly-minted, adult harpy blush."
                );
            else
                this.outputText(
                    "\n\nAss, hips, and chest all expand in equal measure, only stopping when she's reached a critical mass that puts her on even footing with her mother, perhaps only a single cup size smaller.  She admires her new self experimentally, barely even aware that her wings are still growing.  By the time they stop, they're much larger than her mom's, trailing wisps of soft feather-fluff.  She curls them around her new breasts and squeezes the massive boob flesh tightly, moaning in delight.  Sophie smiles and says something about a wingjob, which makes the freshly-minted, adult harpy blush."
                );
        }
        // Fifth+ daughter
        else {
            this.outputText(
                "\n\nHer flesh ripples as her hips and ass swell into wide, broodmotherly hips with a round, ripe ass to match that just begs to be spanked and grabbed.  Her once-humble breasts spill forth in a flood of supple tit-flesh. The growing orbs engorge to around nearly the same size as Sophie's big, "
            );
            if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00282] > 0) this.outputText("bimbo ");
            this.outputText(
                "breasts - just as high, round and perky, yet big and yielding to the touch, like the softest pillow."
            );
        }
        // ALL CONTINUE HERE
        this.outputText(
            "  The newly embodied harpy lets out a sigh of relief now that the changes have stopped, clearly surprised by what happened and glad it's over. Moving to get a better view of your daughter, you take in the sight of her new body. Your once petite harpy girl looks more like a stacked "
        );
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00282] > 0) this.outputText("bimbo");
        else this.outputText("bombshell");
        this.outputText(", just like her mother.");
        if (this.bimboSophie())
            this.outputText(
                "  From the inquisitive look on her face and spark of intelligence in her eyes, it seems that she hasn't lost her mind to her inner bimbo."
            );

        if (this.bimboSophie())
            this.outputText(
                '\n\n"<i>Ohhh!  Like, what happened to me, daddy?  Mmmm... this body is like, soooo totally hot!</i>" your daughter says as she inspects her new, more shapely body.  It seems she also gained her mother\'s speech patterns. You can guess she probably also inherited her ravenous libido as well...'
            );
        else
            this.outputText(
                '\n\n"<i>Ohhh, what happened to me, daddy?  This body is so different... so strange... so... sexy!</i>" your daughter says as she inspects her new, more shapely body.  You can guess she probably also inherited her ravenous libido as well...'
            );

        if (this.bimboSophie())
            this.outputText(
                "\n\n\"<i>Sweetie! Just look at you!  You grew up into one hot piece of ass!  Momma's so proud of you!  Baby, isn't our little girl like, suuuper sexy?!</i>\" Sophie says as she pushes her newly matured daughter at you.  Your happy, curvy daughter wraps her arms around you tightly, smooching you on the cheek as she presses her new body against you.  Her kiss leaves a big, golden lipstick mark on your " +
                    this.player.skinFurScales() +
                    '  "<i>What do you think, daddy? Aren\'t I super-duper sexy?</i>" she asks before leaning in, pushing her big, perky tits against you and making a pouty face at you, showing off her plump kissable lips.'
            );
        else
            this.outputText(
                "\n\n\"<i>Wow, you grew up into a fine looking harpy!  Momma Sophie's so proud of you!  [name], isn't our little girl a hottie?!</i>\" Sophie says as she pushes her newly matured daughter at you.  Your happy, curvy daughter wraps her arms around you tightly, smooching you on the cheek as she presses her new body against you.  Her kiss leaves a big, golden lipstick mark on your " +
                    this.player.skinFurScales() +
                    '  "<i>What do you think, daddy?  Aren\'t I cute?</i>" she asks before leaning in, pushing her big, perky tits against you and making a pouty face at you, showing off her plump kissable lips.'
            );
        // REPEATS:
        if (this.flags[kFLAGS.SOPHIE_ADULT_KID_COUNT] > 0) {
            // If Yes Incest
            if (this.flags[kFLAGS.SOPHIE_FAMILY_INCEST] == 1) {
                this.outputText(
                    "\n\nYou nod your head and tell her that she's very beautiful, just like her mom and sister"
                );
                if (this.flags[kFLAGS.SOPHIE_ADULT_KID_COUNT] > 1) this.outputText("s");
                this.outputText(
                    '.  She beams a radiant smile at you and turns around, shaking her rump at you enticingly, "<i>So, when do you want to try me out, ' +
                        this.player.mf("Daddy", "'Mom'") +
                        '?</i>"'
                );

                this.outputText("\n\nYou promise her that you will in due time.");
            }
            // If No
            else {
                this.outputText(
                    "\n\nYou smile ruefully and direct her to turn her attentions back to her mother, who even now is flapping her wings excitedly, promising her daughter the many delights of adulthood she'll get to sample, once she gets her own mate.  You just hope she doesn't cause any trouble in camp."
                );
            }
            this.doNext(this.camp.returnToCampUseOneHour);
        }
        // FIRST TIME:
        else {
            this.outputText(
                "\n\nIt seems obvious that the real question is whether you want to have an incestuous relationship with your freshly matured offspring.  If you answer yes, you're probably going to wind up with another bird-girl lusting after you (and maybe more, down the road).  You had better say no if you want to keep things platonic."
            );
            this.menu();
            this.addButton(0, "Yes - Incest", this.yesToSophieIncest);
            this.addButton(1, "No", this.noToSophieIncest);
        }
        this.flags[kFLAGS.SOPHIE_ADULT_KID_COUNT]++;
    }
    // [yes incest plz]
    private yesToSophieIncest(): void {
        this.clearOutput();
        this.sophieSprite();
        this.outputText(
            "Grinning at your eager girl, you lean in and kiss her lips, reaching around to grab her spankable ass.  Gripping that sumptuous rump, you yank her forward and spank her jiggling cheeks.  Your rough manhandling evokes a horny, needy squawk from the freshly matured harpy.  Smirking at your curvaceous daughter, you tell her that just like her mother, she is a beautiful, voluptuous example of her kind.  Pulling her into another kiss, you slide your tongue inside her warm mouth.  She slips a thick, fertile leg around you and kisses back, pressing her body tighter against yours."
        );

        this.outputText(
            '\n\n"<i>Ohhhh!  Lucky!  No fair, hogging [name] all to yourself,</i>" Sophie says with a pout as she watches you make out with your daughter.  Grinning into the kiss, you pull back and set your daughter back into the nest before pulling Sophie up for her turn.  Your '
        );
        if (this.bimboSophie()) this.outputText("personal bimbo ");
        else this.outputText("lusty matron ");
        this.outputText(
            "is more than happy to return the sudden affection, her hands running over your body as she grinds against you teasingly.  With a firm open-palm spank to her rump, you release her, telling both harpies that you will play with them again very soon.  The two horny girls giggle together before talking about all the fun they will have."
        );
        this.dynStats("lus", 5);
        this.flags[kFLAGS.SOPHIE_FAMILY_INCEST] = 1;
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // [nono]
    private noToSophieIncest(): void {
        this.clearOutput();
        this.sophieSprite();
        this.outputText(
            "Sliding your hand up to your daughter's cheek, you stroke her softly before running your fingers through her feathery hair.  Your soft touch draws a gentle, bird-like coo from your daughter.  You guide her down and tell her she should rest after such a transformation.  She should seek mates outside her family.  You don't want to encourage such blatantly sexual behavior so soon, and you sit her down in Sophie's nest to rest.  Instantly, her mother is at her side, fluttering excitedly and drawing her daughter into a conversation about you and all the fun she can have once she finds a mate of her own."
        );
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Izma dominating Sophie bondage.
    // have izma get irritated with Sophies constant advances.
    // First time happens randomly
    public sophieAndIzmaPlay(): void {
        this.outputText("\n");
        this.flags[kFLAGS.TIMES_SOPHIE_AND_IZMA_FUCKED]++;
        this.outputText("<b>Something odd happens that ");
        if (this.model.time.hours < 6 || this.model.time.hours > 20) this.outputText("night");
        else if (this.model.time.hours < 12) this.outputText("morning");
        else if (this.model.time.hours == 12) this.outputText("noon");
        else if (this.model.time.hours < 5) this.outputText("afternoon");
        else this.outputText("evening");
        this.outputText("...</b>");
        this.outputText(
            "\n\"<i>Give it a rest, you feathery slut!</i>\" shouts Izma's familiar but irritated voice.  \"<i>Just because you want a cock to suck doesn't mean you can lift my skirt and plant that... mmm... lovely lipstick all over my dick... Right there...</i>\"  The shark-herm's voice lifts, crooning with aroused pleasure.  Clearly, Sophie is under Izma's grass skirt and polishing her pole with as much of her heavy lip-gloss as possible.  You slowly creep closer, hearing the audible 'slurp-slurp-slurp' of Sophie's bee-stung lips on Izma's tiger-striped rod, accompanied by excited moans."
        );

        this.outputText(
            '\n\nThe well-hung beauty suddenly stops moaning with a grunt of irritation.  "<i>No, FUCK!  No means no, damn it!</i>"  You peep out around a rock in time to see Izma growl and lift the harpy before hurling her a dozen feet into the air.  Her proud fifteen inches juts out between the skirt\'s grass fronds, throbbing and almost painfully erect, the tip solid gold and more engorged than you\'ve ever seen.  It looks like Sophie got in more than a few kisses.  Before your eyes, the shark-girl\'s penis beads a fat dollop of pre-cum, one that dangles precariously before slowly stretching out to dip towards the ground.  She groans in irritation before wrapping her hand around it, moaning, "<i>Oh, [name] would never need to drug me to get me like this...</i>"'
        );

        this.outputText(
            '\n\nSophie lands with a gusty flap of her wings, panting slightly as she titters, "<i>Like, why did you have to toss me like that?  Don\'t be such a meanie!  I just wanted to make you feel really, really yummy and good.</i>"  She sticks a finger into her expansive, puckered lips and moans in delight as she deepthroats the digit, casting lusty looks towards Izma the whole time.  The drugged orange herm groans and drips another sticky bead of lust from her maleness.  Her thighs are shining as well, reflective with oozing, feminine lust.'
        );

        this.outputText(
            '\n\nIzma struts forward purposefully while the bird-brained bimbo coos, "<i>Oh, you\'re like, feeling sensi... sense... ummm... gonna let me ride you?</i>"'
        );
        this.outputText(
            "\n\n\"<i>Something like that,</i>\" the tigershark promises as she unties her skirt.  Sophie prances across the remaining distance, blissfully unaware of the dangerous glint in Izma's eyes.  The nude, stiff-dicked herm catches the harpy's wrist and expertly twists, spinning her body around expertly.  Grabbing the squawking bird-girl's free arm, she twists the garment around the feathery wrists until Sophie's arms are completely immobilized, finishing it off with a strong, tough knot."
        );

        this.outputText(
            '\n\nSophie cluelessly asks, "<i>What are you doing, baby?  We can\'t fuck like this!</i>"  She struggles futilely at the bindings, her wings flapping wildly as Izma takes her time rustling around in her chest.  The flustered harpy stumbles after her, flapping her wings for stability.  "<i>Hey, sexy shark!  I\'m talking to you!  You can\'t like, just leave me tied up like this!</i>"'
        );

        this.outputText(
            "\n\nIzma comes up with a coiled rope and explains, \"<i>Of course not, I'm just getting started.</i>\"  She flashes a dangerously large smile while pinning Sophie's wings flat on her back and looping the rope around to restrain them.  The front halves of the lashings go under Sophie's huge, bimbolicious titties and above them, and Izma finishes off by knotting them together through the valley-girl's valley-like cleavage.  \"<i>Now we're getting somewhere,</i>\" Izma proudly declares before she tosses the bound-up slut over her shoulder."
        );

        this.outputText(
            '\n\nSophie kicks and wiggles to little avail - Izma is just too strong.  The bound-up bimbo eventually gives up with an exasperated sigh, blowing a lock of her platinum plumage up out of her eyes.  "<i>You\'re no fun, you know that, right?</i>"'
        );

        this.outputText(
            "\n\nIzma rolls her eyes but answers, \"<i>I don't know, I'm having fun.  Aren't you having fun?</i>\""
        );

        this.outputText('\n\n"<i>No.</i>"');

        this.outputText(
            "\n\n\"<i>That'll change,</i>\" the shark-woman promises as she lifts the lighter avian over a pole she had been using to dry her clothes.  Sophie's thick thighs hook over the wooden structure while Izma holds the squirming slut's torso aloft.  \"<i>Almost there...</i>\"  She stands up straighter, bending Sophie double to press her heaving tits up against the rod.  Izma grunts and takes hold of the ropes on the curvy harpy's chest, retying them so that they connect to the supporting shaft.  When she finishes, she steps back and admires her work."
        );

        this.outputText(
            "\n\nSophie is completely immobilized, strung up so that her pussy's slick secretions are visible of on her engorged nether-lips, framed by the thick, smooth skin of her immense thighs, just begging to be grabbed hold of and mounted.  All Sophie can do is kick her taloned feet around, but that just makes her heavy bottom swing back and forth pendulously, waist height to the malicious grinning hermaphrodite."
        );

        this.outputText(
            "\n\nYou consider your options.  You could let Izma have her way with the sexy bombshell of a harpy, or you could put a stop to it, before it goes too far."
        );
        if (this.flags[kFLAGS.TIMES_SOPHIE_AND_IZMA_FUCKED] == 1) {
            this.outputText(
                "\n\n(Regardless, you could probably suggest that Sophie try this again in the future...)"
            );
        }
        this.dynStats("lus", 10 + this.player.lib / 10);
        // [Interrupt] [Watch]
        this.menu();
        this.addButton(0, "Interrupt", this.interruptSophieIzma);
        this.addButton(1, "Watch", this.watchIzmaSophie);
    }

    // (LEGGO MY EGGO)
    private interruptSophieIzma(): void {
        this.clearOutput();
        this.outputText(
            "You steel yourself.  As tempting as it is to watch these two vixens go at it, you've got to let them know they're part of <b>your</b> harem.  And of course, any fun that occurs without you is no fun at all.  You step out from behind the rock, calling out to the tigershark and bound harpy, demanding to know what's going on."
        );
        this.outputText(
            '\n\nIzma jumps away from the Harpy in surprise.  "<i>Oh, Alpha!</i>" she sputters, turning to face you.  She thinks for a moment, a bead of sweat forming on her already moist forehead.  "<i>I was, uh, just getting your slave ready for you,</i>" she lies.'
        );

        this.outputText(
            '\n\nYou narrow your eyes at them and look to the large-breasted slut and ask if this is true.  "<i>No, [name], but I\'m just <b>so</b> horny!</i>"'
        );

        this.outputText(
            "\n\nYou toss an icy stare at Izma and order her to cut Sophie down.  She does so, albeit reluctantly.  You remind Izma that you're HER Alpha, not the other way around, and that she should keep her hands off the merchandise.  You grope the bimbo's ample ass and lead her away from Izma's section of the camp, whispering that she'll get hers in due time."
        );
        this.doNext(this.playerMenu);
    }

    // (Watch like the voyeur you are)
    private watchIzmaSophie(): void {
        this.clearOutput();
        this.outputText(
            '"<i>Now, we do this my way,</i>" Izma says.  "<i>If you wanted to do things your way, you should\'ve fought back better.</i>"  She gleefully gropes the harpy\'s bottom, setting Sophie to swaying back and forth once more.  An orange fingertip probes the juicy, honeyed tunnel with slow exploratory penetrations, triggering a cacophony of lewd moans from the air-headed, bound slut.  "<i>Yeah... you like that don\'t you, you greedy little slut?  Gods, I bet all you do is lie around all day, trying to think of new ways to get something hard in here, huh?  Well, you should\'ve thought harder, because this pussy belongs to me until your drugs wear off.  And then?  Then, I\'m going to leave you hanging a while to think on your mistakes.</i>"'
        );

        this.outputText(
            '\n\nSophie\'s eyes light up at that.  "<i>You promise?</i>" she coos questioningly.  "<i>You\'re really going to fuck me?</i>"'
        );

        this.outputText(
            "\n\nIzma grabs her rigid cock in one hand before slapping it against Sophie's mons, splattering moisture everywhere and immediately slicking her dick with the harpy's lubrication.  She puts an orange hand on the big-breasted woman's middle and pushes her back hard enough to make her sway towards being horizontal.  Smiling, Izma adjusts the angle of her fifteen-inch monster as Sophie's inertia exhausts itself and gravity's inexorable pull reverses the motion, dragging the sopping-wet feather-slut's gash straight towards the waiting, striped dong."
        );

        this.outputText(
            "\n\nThere's a brief 'schlurp' followed by an echoing clap of skin on skin as the groins impact each other, swiftly followed by a squawk of pleasure.  Sophie moans, \"<i>OOoohhh, that totally hits the spot,</i>\" as she adjusts to the colossal, orange cock inside her.  Two pairs of curvy jugs press together as the women adjust to their stance, each pair of rigid nipples pressing into the other as they slide over each other's pebbly, sweaty areola.  Ardent, excited moans escape each girl's mouth as they settle into position, peaking when Izma sinks her hands into Sophie's ass and begins to swing her back and forth, treating her like little more than a personal cock-sleeve."
        );

        this.outputText(
            "\n\nThe scene has you very aroused, and you begin to play with yourself while you watch, enjoying the voyeuristic thrill of it all.  Sophie is openly panting by this point.  Her pussy is visibly distended by Izma's thick, hard rod, the thick cunt-lips spasming around the striped dong as they attempt to cling to it with each bounce, stretching out slightly as if to hold onto it as she bounces away.  Back and forth, the lust-drunk harpy sways like a sexual swing-set, helplessly bound and utterly at the mercy of the more powerful girl.  She coos with pleasure at the bottom of every arc, shaking her tits around, the heavy, chesty weights battering Izma's smaller pair with every stroke."
        );

        this.outputText(
            '\n\n"<i>Take it, you fat-tittied slut!</i>" Izma growls as she pounds away at the drooling harpy-snatch.  "<i>You\'re lucky you\'re getting any dick at all'
        );
        if (this.player.hasCock()) this.outputText(", from me OR my Alpha");
        this.outputText(
            ".  If I had MY way, you'd be tied up on the lake-side so my sisters could play with these ridiculous jugs while they pound your fat ass full of spunk and your belly full of shark-babies.</i>\""
        );

        this.outputText(
            '\n\nSophie giggles in between salacious cries of ecstasy, "<i>Ohhhh, baby, you\'re like, totally naughty!  Fuck me harder, please!  Stuff my box with that fat shark-cock!</i>"'
        );

        this.outputText(
            "\n\nThe striped lake-dweller lets go of Sophie's fat ass and shifts her hands to grab hold of the heaving globes up top.  Her slender fingers sink right on into the harpy's pliant flesh, and before long, the groping fingers grab hold of each tit-topping nipple, rolling the sensitive buds back and forth.  Izma's hips continue to thrust relentlessly enough to make it sound like she's spanking her bound prey's pussy.  Each time the impromptu swing joins their groins together, there's an echoing clap and a spray of harpy lube accompanying it.  You can see Izma's quartette of cum-factories bouncing in their sack, looking more than a little swollen from the effects of Sophie's drugs."
        );

        this.outputText(
            "\n\nIzma's lashes flutter dangerously while she bounces the bound woman on her improvised bondage-rack, just going to town on her tits, feeling them squish, compress, and bounce in her grip as she savages the make-up obsessed slut's pussy.  Without thinking, Izma starts kissing Sophie, right on the golden, bee-stung pucker she calls a mouth.  The amber gloss immediately smears all over the shark-girl's lips as well, a mistake she realizes immediately."
        );

        this.outputText(
            "\n\n\"<i>Fuck!</i>\" Izma cries, breaking the kiss, \"<i>I didn't... you made...  damnit!  Ahhh, screw it.</i>\"  She grabs the big-butted bimbo by her voluptuous ass once more and begins to speed the swaying needily, pounding Sophie's pussy with firm, potent thrusts, her arms speeding the mature matron's descent to ensure that each time she's hilted faster and more vigorously than before.  Once more, the dominant, aquatic hermaphrodite sinks into a kiss, and this time she doesn't pull back.  Her tongue slithers through the harpy's unresisting lips to explore inside, all while she continues to pump away, giving her body the pleasure that the drugs within her are instructing her to seek.  The winged woman's plump buttcheeks are quaking over and over, rippling and bouncing lewdly to expose her pucker and the bottom of her leaky slit, now happily spread for the thick, orange cock that plows its innermost depths, a cock that's visibly pulsing, the urethra stretching rhythmically as orgasm approaches."
        );

        this.outputText(
            '\n\nSophie purrs hypnotically, "<i>Oooh, give it to me already!  Spill out all of that cum!  Cum for your favorite, pretty little bird...</i>"  On hearing that, Izma suddenly stops her kiss, her eyelids lowering and her mouth hanging open blissfully.  A low moan starts in the back of her throat, matched by a quiet, ecstatic gasp of your own.  The words are compellingly arousing, and your orgasm goes off without you meaning for it to.  Your whole back quakes in excitement, and you simply watch the scene while you '
        );
        if (this.player.hasCock()) this.outputText("stroke yourself through bliss");
        else this.outputText("finger yourself through bliss");
        this.outputText(
            ".  Izma's quartette of sperm-filled balls abruptly rise in her suddenly taut prison and begin to pulsate in time with her cock.  At first, there's no visible change, but before long, semen begins to bubble out around the twitching shark-shaft, spattering onto the ground below.  Your own climax winds down as well"
        );
        if (this.player.hasCock()) {
            if (this.player.cumQ() >= 1000)
                this.outputText(", leaving you in a puddle of your own slimy mess");
        }
        this.outputText(
            ".  Izma keeps futilely pumping a bit longer, and you see Sophie's belly curve slightly with the hefty seed-deposit."
        );

        this.outputText(
            "\n\nIzma pants and withdraws from her home-made cream pie with a self-satisfied sigh, but her cock is still just as hard as before, even though her sack looks a little bit smaller.  She groans out loud as she staggers away, muttering something about coming back to 'check on' the harpy in a few minutes.  Her hand takes a few experimental pumps as she goes, and with all the lipstick she was exposed to, you're sure she'll be back before long.  As soon as she's out of sight, Sophie flexes her wings, easily breaking through the knots.  She gets loose and drops to the ground, then sticks a digit in her still-drooling cunt before sucking it into her mouth to taste.  \"<i>Hehe, silly sharks!</i>\" she chants before flouncing away.  \"<i>I gotta remember to be back before she is... this is totally fun!</i>\""
        );

        this.player.orgasm();
        this.dynStats("sen", -1);
        this.doNext(this.playerMenu);
    }
}
