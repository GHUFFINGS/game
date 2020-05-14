import { CockTypesEnum } from "../../../CockTypesEnum";
import { kFLAGS } from "../../../GlobalFlags/kFLAGS";
import { kGAMECLASS } from "../../../GlobalFlags/kGAMECLASS";
import { PerkLib } from "../../../PerkLib";
import { StatusAffects } from "../../../StatusAffects";
import { TelAdreAbstractContent } from "./TelAdreAbstractContent";

export class Scylla extends TelAdreAbstractContent {
    public static SCYLLA_NOT_PRESENT: number = 0;
    public static SCYLLA_ACTION_FIRST_TALK: number = 1;
    public static SCYLLA_ACTION_ROUND_TWO: number = 2;
    public static SCYLLA_ACTION_ROUND_THREE: number = 3;
    public static SCYLLA_ACTION_ROUND_FOUR: number = 4;
    public static SCYLLA_ACTION_MEET_CATS: number = 5;
    public static SCYLLA_ACTION_ADICTS_ANON: number = 6;
    public static SCYLLA_ACTION_FLYING_SOLO: number = 7;
    public static SCYLLA_ACTION_FUCKING_URTA: number = 8;
    public static SCYLLA_ACTION_FURRY_FOURSOME: number = 9;

    private scyllaAction: number = 0;
    private scyllaLastActionSelectionTime: number = 0;
    public get action(): number {
        return this.scyllaAction;
    }
    // const TIMES_SOLO_FED_NUN: number = 778;
    // const FED_SCYLLA_TODAY: number = 779;

    // Scylla- cum addicted demon-tainted nun

    private scyllaSprite(): void {
        if (this.flags[kFLAGS.NUMBER_OF_TIMES_MET_SCYLLA] > 3) this.spriteSelect(82);
        else this.spriteSelect(51);
    }

    public scyllaBarSelectAction(): void {
        // This allows Scylla's activity at the bar to be determined before any description of what Kath and Urta be doing.
        // Required because Scylla's behaviour in the bar is partly random, so you can't just check flags to see what she's up to.
        if (this.model.time.totalTime == this.scyllaLastActionSelectionTime) return; //Only choose action once per visit to the bar
        this.scyllaLastActionSelectionTime = this.model.time.totalTime;
        this.scyllaAction = Scylla.SCYLLA_NOT_PRESENT;
        if (
            this.player.findStatusAffect(StatusAffects.DungeonShutDown) >= 0 &&
            (!this.player.hasCock() || this.player.longestCockLength() < 12) &&
            this.flags[kFLAGS.NUMBER_OF_TIMES_MET_SCYLLA] == 0
        ) {
            this.scyllaAction = Scylla.SCYLLA_ACTION_FIRST_TALK;
            return;
        }
        if (
            this.player.cocks.length > 0 &&
            this.player.findStatusAffect(StatusAffects.DungeonShutDown) >= 0
        ) {
            if (this.player.longestCockLength() >= 12) {
                if (this.flags[kFLAGS.NUMBER_OF_TIMES_MET_SCYLLA] == 0) {
                    this.scyllaAction = Scylla.SCYLLA_ACTION_FIRST_TALK;
                    return;
                }
                if (this.flags[kFLAGS.NUMBER_OF_TIMES_MET_SCYLLA] == 1 && Scylla.rand(5) == 0) {
                    this.scyllaAction = Scylla.SCYLLA_ACTION_ROUND_TWO;
                    return;
                }
                if (this.flags[kFLAGS.NUMBER_OF_TIMES_MET_SCYLLA] == 2 && Scylla.rand(5) == 0) {
                    this.scyllaAction = Scylla.SCYLLA_ACTION_ROUND_THREE;
                    return;
                }
                if (this.flags[kFLAGS.NUMBER_OF_TIMES_MET_SCYLLA] == 3 && Scylla.rand(5) == 0) {
                    this.scyllaAction = Scylla.SCYLLA_ACTION_ROUND_FOUR;
                    return;
                }
                if (this.flags[kFLAGS.NUMBER_OF_TIMES_MET_SCYLLA] == 5 && Scylla.rand(5) == 0) {
                    this.scyllaAction = Scylla.SCYLLA_ACTION_MEET_CATS;
                    return;
                }
                if (
                    this.flags[kFLAGS.NUMBER_OF_TIMES_MET_SCYLLA] >= 4 &&
                    (this.model.time.hours == 18 || this.model.time.hours == 19)
                ) {
                    this.scyllaAction = Scylla.SCYLLA_ACTION_ADICTS_ANON;
                    return;
                }
                if (
                    this.flags[kFLAGS.NUMBER_OF_TIMES_MET_SCYLLA] >= 2 &&
                    this.flags[kFLAGS.FED_SCYLLA_TODAY] == 0 &&
                    this.model.time.hours >= 7 &&
                    this.model.time.hours <= 11
                ) {
                    this.scyllaAction = Scylla.SCYLLA_ACTION_FLYING_SOLO;
                    return;
                }
            }
            // All the following conditions are needed to see if she's fucking Urta
            if (this.flags[kFLAGS.NUMBER_OF_TIMES_MET_SCYLLA] < 3) return; //Minimum Scylla meetings for Urta to fuck her
            if (
                this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00147] == 1 &&
                this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00145] == 1
            )
                return; //Together these are the 'No more Scylla' flag
            if (
                !this.getGame().urta.urtaAtBar() ||
                this.flags[kFLAGS.URTA_ANGRY_AT_PC_COUNTDOWN] > 0
            )
                return;
            if (
                this.flags[kFLAGS.URTA_TIME_SINCE_LAST_CAME] > 0 ||
                this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] <= 2 ||
                this.flags[kFLAGS.TIMES_FUCKED_URTA] == 0
            )
                return;
            // She only fucks Scylla if she's horny and you've fucked her enough to make her comfortable
            if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00143] == 0) {
                // Never fucked Scylla before
                if (!this.getGame().urta.urtaDrunk()) return; //So she has to be drunk
            } else if (this.getGame().urta.urtaDrunk() && this.player.balls == 0) return; //Otherwise she has to be sober and you need to have balls (I'm not sure why, but it is so)
            if (this.telAdre.katherine.needIntroductionFromScylla()) return;
            if (Scylla.rand(3) == 0) this.scyllaAction = Scylla.SCYLLA_ACTION_FUCKING_URTA; //And after all that there's still just a 1/3 chance it will happen
            // Yay, Foursomes! - unless you're Scylla special
            if (
                Scylla.rand(2) == 0 &&
                this.flags[kFLAGS.NUMBER_OF_TIMES_MET_SCYLLA] >= 3 &&
                this.player.hasKeyItem("Opal Ring") < 0 &&
                kGAMECLASS.urta.urtaAtBar() &&
                this.player.longestCockLength() >= 8 &&
                this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00143] > 0
            )
                this.scyllaAction = Scylla.SCYLLA_ACTION_FURRY_FOURSOME;
        }
    }

    // The rain is pouring by the time you get to The Wet Bitch and the bar's roaring hearth is a welcome sight for your cold, shivering form.  You order some hot soup and look around at the other patrons. The miserable weather seems to have driven most of the regulars away, but
    public talkToScylla(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(this.images.showImage("scylla-first-meeting"), false);
        this.outputText(
            "You approach the busty stranger as her dark, curly black hair falls over her eyes.  She seems to be staring at the cup of coffee she's clutching. As she pours pale cream into it, her tongue absently licks the generous bulge of her scarlet, O-shaped lips. She notices the motion and shakes her head harshly, slamming the cream down too hard and shattering the ceramic. Milky white fluid splatters across her face and she utters a gasp that you think is only half surprise. Was it your imagination, or did that sound a little orgasmic? It might be a good idea to introduce yourself and help her clean up the mess.\n\n",
            false
        );

        // New modified intro
        if (!this.player.hasCock() || this.player.longestCockLength() < 12) {
            if (this.flags[kFLAGS.SCYLLA_SMALLCOCK_INTRO] == 0) {
                this.outputText(
                    "You step up to the woman and introduce yourself, noticing that the white and black hat she wears is covering tiny bulges in her skull.  Brushing her jet hair from her eyes, she follows your glance and blushes a deep purple hue. Pulling the cowl back, she reveals the twin nub-like horns that mark demonic taint. Apologizing for the scene she caused with the cup, she mumbles an introduction, getting as far as to explain that she is a nun before losing the thread entirely- evidently distracted by some inner turmoil. Following her gaze, you see that she’s staring at some of the other patrons- men whose massive members are visible through the knee-length bulge in their pant legs. You try to get her attention again, but she’s lost in a private world, her breath quick and shallow. Troublesome. If you want to keep her attention for any length of time, apparently you’ll need a monster cock swinging from your hips. You leave the size queen and go back to your soup.\n\n",
                    false
                );
                this.flags[kFLAGS.SCYLLA_SMALLCOCK_INTRO] = 1;
                // END EVENT, TRIGGER REPEAT INTRO OPTIONS WHEN “NUN” IS SELECTED FROM WET BITCH- EVENING HOURS.
            } else {
                this.outputText(
                    "The nun has apparently given up on coffee and instead sit in silent prayer, her eyes closed to the temptations around her. You give an introduction another attempt, but she remains oblivious. Rude.\n\n",
                    false
                );
            }
            this.doNext(this.camp.returnToCampUseOneHour);
            return;
        }

        if (this.flags[kFLAGS.SCYLLA_SMALLCOCK_INTRO] == 0) {
            this.outputText(
                "You step up to the woman and introduce yourself while you notice the white and black hat she wears is covering tiny bulges in her skull.  Brushing her jet hair from her eyes, she follows your glance and blushes a deep purple hue. Pulling the cowl back, she reveals the twin nub-like horns that mark demonic taint. Apologizing for the scene she caused with the cup, she introduces herself as Scylla. Though reluctant to discuss them, eventually your charisma wins her over and she speaks in a voice so soft you have to lean in to hear her.\n\n",
                false
            );
        } else {
            this.outputText(
                "Approaching the nun once more, you’re pleasantly surprised that you have her full attention. The " +
                    this.cockDescript(0) +
                    " bulging under your clothes may have something to do with her sudden attentiveness. Prying her gaze up to eye level, she offers a weak smile and a soft apology. She introduces herself as Scylla and offers you a seat. She seems troubled and before long you have the shy giantess of a woman laying her troubles out for you.\n\n"
            );
        }

        // PC DID BLOW FACTORY UP
        if (this.player.findStatusAffect(StatusAffects.FactoryOverload) >= 0)
            this.outputText(
                "\"<i>I was once a holy woman, sworn to relieve pain from any who suffer, but one night I experienced a dream. It told me that I must go on a pilgrimage to the distant mountains and save one who suffered greatly at an unjust hand. I travelled by day and fasted by night, but when I reached the mountains, I found that my vision had been a trick. Demons seized me and taunted me by saying that I was the one who suffered, for I had never known the touch of a lover. They dragged me to their terrible factory, where I beheld their sinful works and bound me to one of their devices. They promised that I would love my new life and to be sure that my 'suffering' lasted not a moment longer, they hooked a vial of alabaster liquid to my mouth. It was some blasphemous concentration of semen, sweat, and blood and the very smell of it nearly suffocated my mind. But just as the first drop touched my tongue, there was a terrible explosion, and the factory's machines detonated, as if struck down by the hands of the gods. I was saved and helped as many as I could from that den of inequity,</i>\" finishes Scylla.\n\n",
                false
            );
        // PC DIDNT
        else
            this.outputText(
                "\"<i>I was once a holy woman, sworn to relieve pain from any who suffer, but one night, I experienced a dream. It told me that I must go on a pilgrimage to the distant mountains and save one who suffered greatly at an unjust hand. I travelled by day and fasted by night, but when I reached the mountains, I found that my vision had been a trick. Demons seized me and taunted me by saying that I was the one who suffered, for I had never known the touch of a lover. They dragged me to their terrible factory, where I beheld their sinful works and bound me to one of their devices. They promised that I would love my new life and to be sure that my 'suffering' lasted not a moment longer, they hooked a vial of alabaster liquid to my mouth. It was some blasphemous concentration of semen, sweat, and blood and the very smell of it nearly suffocated my mind. Laughing, they left me to my fate, but just as the first drop touched my tongue, the machines ground to a halt, frozen in their wicked works. One of my fellow captives unhooked me from the device and we fled that den of inequity,</i>\" finishes Scylla.\n\n",
                false
            );

        this.outputText(
            'Scylla runs her fingertips along the rounded horns, embarrassed, "<i>I did not escape unscathed, I fear. Even the slightest taste of that foul brew was enough to change my body. I grew taller and... filled out in most impure ways. You have seen the horns but the worst is how it changed my mouth</i>."\n\nHer fingers run along her plump, crimson lips. She gasps as they tremble at the touch, her chest rising and falling in a motion that puts a terrible strain on her too-small robe. She looks at you with pure, blue eyes that shimmer on the edge of tears.\n\n"<i>I can\'t eat. I can\'t drink. Everything tastes like ashes in my mouth. Even wine might as well be salt water. My thirst is just... so...</i>" she trails off to stare at the shattered remains of the cream saucer, seemingly forgetting you as she runs a hand up her side, cups her breast, and tweaks her nipple through the fabric.\n\n',
            false
        );

        // (If the player has a penis and balls)
        this.outputText(
            "You're pretty sure you know what the demon drink did to Scylla.\n\n",
            false
        );

        this.outputText(
            "She's clearly addicted to semen, and if you don't help her she'll probably disappear with someone else forever.  Then again - whatever has tainted her might have an effect on you.  Do you help her quench her thirst?",
            false
        );
        this.doYesNo(this.helpScylla, this.dontHelpScylla);
    }

    private helpScylla(): void {
        this.scyllaSprite();
        this.flags[kFLAGS.NUMBER_OF_TIMES_MET_SCYLLA]++;
        var x: number = this.player.biggestCockIndex();
        this.outputText("", true);
        this.outputText(this.images.showImage("scylla-first-help"), false);
        this.outputText(
            "You explain that you've run into this sort of thing before and ask her to follow you upstairs to a room. Shyly, she accompanies you and sits down on the bed next to you. In the light, you get a better look at her. She's nearly 7 feet tall, though terribly thin from her demonic starvation. Her breasts have not lost any weight, however, and the D-cups push against her dress with every breath. She shakes her curly black hair from the hood and it spills down her back in surprisingly long locks- it's at least four feet and forms a billowing curtain around her shoulders, hips, and waist. She looks innocently at you, patiently waiting for your diagnosis. The hopeful trust in her eyes almost makes you blush as you explain that the demons have given her a powerful addiction. Considering the nature of her tormenters, she is almost certainly addicted to cum.\n\n",
            false
        );

        this.outputText(
            'Scylla squeaks in shock and crosses her legs tightly. "<i>I can\'t...! I\'ve never had... you know...</i>" she mouths the word "<i>sex,</i>" not daring to say it aloud. You assure her that it need not come to that. If she drank some, you explain, it would ease the thirst pains and preserve her chastity. She shakes her head, as if to drive the thought away, but you notice that her eyes are now locked onto your bulge and her fingers are curling her hair in self-doubt. Just once, you say. Nobody has to know. You can practically feel the heat of her breath. You stroke her hair to put her at ease and promise that she can go at her own pace.\n\n',
            false
        );

        this.outputText(
            "Reluctantly, Scylla accepts your idea and slides off the bed to kneel before you. With unsteady fingers, she pulls off your " +
                this.player.armorName +
                " and her eyes widen at the sight of your hardening length. She looks up one last time, as if uttering a silent prayer, then guides her head over your tip. Parting her succulent lips, she plants the faintest of kisses on the head of your " +
                this.cockDescript(x) +
                ". Embarrassedly inexperienced, she kisses up and down your dick, slowly at first, then slightly more confidently. Even though it is just her puckered lips, you feel warm moisture and an electric tingle at every contact. A small drop of pre rises to the tip of your head. Scylla shivers so intensely that her hair falls in front of her eyes again. Without parting it, she leans in and places the very tip of her tongue at the base of your tip and laps up the tiny drop of cum.\n\n",
            false
        );

        this.outputText(
            "Scylla's whole body tenses and her fingers dig into your legs like they're trying to dig trenches in the earth. She pants and soft whimpers rise from her shrouded face. She plants her head helplessly in your lap and you realize she came from a single drop of your jizz. She pulls the hair from her eyes, and you see that her pupils have contracted into an addict's pin-pricks. The blue of her irises rage with an inner fire and her already puffy lips look positively swollen. A stream of drool leaks from her mouth and wets her blood-red lips as she bends over you again. The thirst seems to have unseated her inhibitions because this time she slides her lips around the crown of your dick and her tongue whirls around it. As she pushes inches into the furnace of her mouth, you marvel at how tight her lips have become. It is almost as if the bulging hole was sealing around your member. With tightness you've rarely felt in pussies, she slides up and down your shaft, drool lubricating better than any oil.\n\n",
            false
        );
        this.outputText(
            "She swallows more inches and you can feel the tip of your penis against the back of her throat. If she had a gag-reflex, the demon-draught must've eliminated it because you can feel the flexing ripples of her throat engulf your head. Scylla makes a moan that can only be called a yummy noise",
            false
        );
        if (this.player.balls > 0) this.outputText(" and you feel your balls tightening", false);
        this.outputText(
            ". When she feels the twitching running down your body, Scylla tilts her head and swallows, hard, pulling your dick deeper into her throat. Seemingly determined to swallow your length, she hardens her expression and swallows again, her mouth closing around you like a vacuum. You can see her neck bulge as your dick is drawn deeper into her hungry maw and you briefly wonder how she's breathing.\n\n",
            false
        );

        this.outputText(
            "You have no time to contemplate further as you feel your orgasm burst, cum rushing through your length and down her sweet, virginal throat. Scylla gives a muffled gasp as the first spurt of your cum reaches her belly, and her eyes roll back into her head as a mind-blowing orgasm tears through her. Only barely aware of what's happening, you notice that her swallowing has intensified and now her head is accelerating along your shaft until, at last, her lower lip presses against your " +
                (this.player.balls > 0 ? "throbbing balls" : "taut abdomen") +
                ". She swallows load after thick load like one who's found an oasis in the desert. She wraps her arms around your ass and pushes you back onto the bed, her head twisting this way and that, milking you of your precious seed.\n\n",
            false
        );

        this.outputText(
            "Your spurts slow down and you pant at how much you came when Scylla's eyes lock with yours. You can tell in that instant that she's still thirsty. The tiny, nub-like horns on her skull pulse and with a startling crack of bones, grow backwards, curving around her ears. The sudden surge of demonic taint " +
                (this.player.balls > 0
                    ? "is immediately apparent as your balls expand as if filling with helium. You are obliged to slide off the bed a bit as they droop down and rest against the ground, as large as barrels. Scylla's lips inflate with a whorish sucking noise and now block your sight of every part of her face but the desperate, hungry blue eyes. Her tongue must've grown in her mouth, because you can feel it wrapping around your dick like a coiling serpent, pulling tighter and tighter before loosening in a milking motion. Your overstuffed balls immediately respond. A bulge of cum as large as a baseball works its way past her suckling lips and down her long, distended neck. The sensation of the cum spraying out of your " +
                      this.player.cockHead() +
                      " causes your toes to curl and makes you clench your fist so hard that blood leaks between your fingers."
                    : "seems to flow into you with a hellish warmth. The subtle changes of her hungering magic worms its way into your prostate and the swelling sensation obliges you to slide to the edge of the bed, a shuddering need for release wrapping iron bands around your lungs. Scylla's lips inflate with a whorish sucking noise and now block your sight of every part of her face but the desperate, hungry blue eyes. Her tongue must've grown in her mouth, because you can feel it wrapping around your dick like a coiling serpent, pulling tighter and tighter before loosening in a milking motion. Your entranced body immediately responds. A bulge of cum as large as a baseball works its way past her suckling lips and down her long, distended neck. The sensation of the cum spraying out of your " +
                      this.player.cockHead() +
                      " causes your toes to curl and makes you clench your fist so hard that blood leaks between your fingers.") +
                "\n\n",
            false
        );

        this.outputText(
            "Scylla's milking pulls glob after glob of cum from your " +
                (this.player.balls > 0 ? "monstrous nuts" : "gushing loins") +
                ' until you realize that those have been mere "drops" of pre-cum. Your eyes go wide as Scylla meets your gaze with a desperate lust. Her hands, still wrapped around your ass, part the cheeks and her long, thin middle finger slides so easily inside you that it might\'ve been greased. You can feel a slight pressure as it strokes you gently before pressing on your prostate. Like a release button had been pressed, your '
        );
        if (this.player.balls > 0) this.outputText("balls quiver ");
        else this.outputText("body quivers ");
        this.outputText(
            "and your mind shatters. You grab onto the two horns growing out of her head like they're safety bars and crush her lips and face against your abdomen as you buck into her head. Your shaft swells with the pressure of your load and Scylla's already taxed throat balloons outward. You can see the cum pumping into her with every heartbeat as her belly stretches, fills, and expands to accommodate the milk of your loins. As the cum flows into her, Scylla's breasts begin to respond to the nutrition and they expand nearly as much as her stomach, easily tearing through her shift of a robe.  She swells until her tits " +
                (this.player.balls > 0 ? "equal" : "are nearly") +
                " the size of " +
                (this.player.balls > 0 ? "your balls" : "barrels") +
                ". They, along with the bloated cum-dump of her belly, pin her to the ground. Cum starts spurting in goopy strands out of her nose as it overflows her stomach and is locked in by her pussy-tight mouth.\n\n",
            false
        );

        this.outputText(
            "Eventually, even your impossibly " +
                (this.player.balls > 0 ? "swollen testicles" : "potent reserves") +
                " empty and you immediately pass out, Scylla's dick-sucking lips still suckling at the base of your shaft, your dick still hard and crammed down her throat. When you awaken, your " +
                (this.player.balls > 0
                    ? "balls have shrunk back to almost normal- they've kept a bit of the increased size Scylla's thirst gave them. Scylla's body appears to have metabolized your cum already, as her belly and breasts have receded enough to allow her to stand. She still looks 9 months pregnant and her lips have been permanently transformed into a cock-sucking ring, but her horns have gone down to nubs and that familiar look of shy innocence has returned to the languid pools of her eyes. \"<i>I can't thank you enough,</i>\" she gushes. \"<i>I'm finally full! And I'm still a virgin,</i>\" she adds, giving you a wet kiss on the forehead.  \"<i>Now I can go back to my mission of relieving those who suffer,</i>\" she happily announces, wiping drool from her mouth with a pinkie. You have a pretty good idea how she'll do the relieving in the"
                    : "body seems to have returned more or less to normal- though you get the feeling Scylla's thirst may have left some lingering effects to help you sate her in the future. Scylla's body appears to have metabolized your cum already, as her belly and breasts have receded enough to allow her to stand. She still looks 9 months pregnant and her lips have been permanently transformed into a cock-sucking ring, but her horns have gone down to nubs and that familiar look of shy innocence has returned to the languid pools of her eyes. \"<i>I can't thank you enough,</i>\" she gushes. \"<i>I'm finally full! And I'm still a virgin,</i>\" she adds, giving you a wet kiss on the forehead.  \"<i>Now I can go back to my mission of relieving those who suffer,</i>\" she happily announces, wiping drool from her mouth with a pinkie. You have a pretty good idea how she'll do the relieving in the") +
                " future...",
            false
        );
        this.player.orgasm();
        this.dynStats("lib", 4, "sen", 3, "cor", 2);
        this.player.cumMultiplier += 2;
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    private dontHelpScylla(): void {
        this.scyllaSprite();
        this.flags[kFLAGS.NUMBER_OF_TIMES_MET_SCYLLA]--;
        this.outputText("", true);
        this.outputText(
            "You tell Scylla the demons have addicted her to cum and turn away before she can return.  You melt away into the crowd and leave her to her thoughts, knowing she'll end up on her knees soon enough.  You can't help but wonder if you did the right thing; suppressing your libido and preventing the possibility of taint was good, but then again, the nun looked about ready to starve...\n\nYou wrestle with your decision the whole way back to your camp, feeling fairly turned off by the time you get back.",
            false
        );
        this.dynStats("lib", -2, "lus", -99);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Scylla's Horns-
    public scyllaRoundII(): void {
        this.scyllaSprite();
        this.flags[kFLAGS.FED_SCYLLA_TODAY] = 1;
        this.flags[kFLAGS.NUMBER_OF_TIMES_MET_SCYLLA]++;
        this.clearOutput();
        this.outputText(this.images.showImage("scylla-help-round-two"), false);
        this.outputText(
            "The Wet Bitch is particularly busy today and you're obliged to sit at the bar after shouldering your way through the crowd. Before you can even place an order, the bartender slides you a note. Curious, you unfold the crisp, white parchment. The note is written in such a light hand that you have to strain to read it in the dim bar. The flowing, graceful message reads: \"<i>Dear " +
                this.player.short +
                ", I am sorry to impose upon you once more, but if you don't mind, could you maybe help me one more time? I am in one of the rooms upstairs, could you come up and see me?  In your debt, Scylla.</i>\"\n\n",
            false
        );

        this.outputText(
            "Dropping some gems on the counter, you grab a bottle of sweet wine and head to Scylla's room. You knock and step inside, closing the door behind you. Scylla is sitting on the bed, her hands nervously folded in her lap. She's still trying to wear a nun's habit, but her inflated body has made it more a satin glove than a shapeless robe. Her jet hair is tousled around her face in thick curls and tumbles around her ample breasts, which have grown to double-Ds since the last time you saw her. The bulging belly you gave her has vanished, however, and now her waist is so narrow and sunken that you can see her ribs under her dress. Her hourglass figure looks like it's about to snap in the middle.\n\n",
            false
        );

        this.outputText(
            "Lifting her head slightly, Scylla's big, innocent eyes peek through the veil of her hair and she holds up another note. Chuckling at her embarrassment, you brush her thick hair over one ear and draw back in surprise. Scylla's demon horns have grown, looping around her ears and across her narrow cheeks all the way to her succulent lips. Her plump, scarlet mouth is being held open by the curling horns, locking it into a wide O that oozes with clear spittle.\n\n",
            false
        );

        this.outputText(
            "Scylla's cheeks flush bright red and she motions for you to read the note. \"<i>Thank you for coming, " +
                this.player.short +
                '. As part of my worship, I have been fasting for the last five days. When I woke up on the sixth morning, my body was as you see it. I am too ashamed to ask for help, but will you at least keep me company for the next twelve hours? I pray that the light of dawn on the seventh day will break my bondage.</i>"\n\n',
            false
        );

        this.outputText(
            "Despite the tone of the letter, it's clear she wrote it hours ago. Now, her chest bounces with every shallow breath, the seams at her thighs are tearing from how quickly she rubs her legs together, and the drool from her gagged mouth drips steadily into a little, warm stream that pools in her cleavage. She tries to speak, but the bone ring turns her soft, nervous voice into wanton gurgles. Her pudgy lips struggle to form words, but all they manage are needy, sucking motions. On the verge of frustrated tears, she lays her head against your chest and wraps her fingers around yours, clenching your hand.\n\n",
            false
        );

        // Next
        this.doNext(this.scyllaRoundIIPartII);
    }

    private scyllaRoundIIPartII(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(this.images.showImage("scylla-help-round-two-part-two"), false);
        this.outputText(
            "You stroke her hair, letting your fingertips linger over the curling bone around her ears. Though firm as iron, the horns are warm and soft, almost like fingers. Absently caressing her cheeks, you gently press her head down, toward your groin and she gratefully sighs as she smells the musk of your body. Pulling away the cloth around your legs, she rubs her forehead affectionately against your stiffening cock. Scylla tries unsuccessfully to slurp back the torrent of drool that leaks past her locked lips when she almost reverently " +
                (this.player.balls > 0
                    ? "cups your balls with both palms"
                    : "strokes your crest with her fingertips") +
                ". Her expression is somewhere between hunger and lust, like one stranded at sea who finally meets another living soul.\n\n",
            false
        );

        this.outputText(
            "With trembling hands, Scylla lifts your shaft to her thirsty lips and runs the point of her tongue in quick swirls around its head. Then, in a fluid motion, she dives forward, your dick sliding through the hot, lubricated ring and into her mouth. She closes her eyes with an orgasmic moan and shivers as your penis hits the back of her throat and she begins to feed your long inches down her pussy-tight neck. Wrapping a hand lightly over her windpipe, you can feel your dick stuffing her clenching esophagus. You tilt her chin up and groan as the inferno heat of the nun's body washes over your cock. You squeeze her throat and you can feel your fingers clenching your dick through the cock-sheath of her pale skin. Scylla's heartbeat races at the pressure, every frenzied pulse contracting her muscles even as your blood pumps faster to fully inflate your organ.\n\n",
            false
        );

        this.outputText(
            "Through her cavernous waist, you can see the head of your penis pass her ribs and fill her belly, its distinctive bulge pushing under the skin below her shaking breasts. The added tension of your throat fucking is too much for her skin-tight robe and it splits right down the middle, velvet tatters falling around her pale arms. Scylla's sweat-glistening breasts quiver in the open air, vibrating at your thrusts. Her sweet, pink nipples are innies you note, almost like half-dollar sized mouths, as plump as her suckling lips. Scylla rubs her drool into their slick bulk, her fingers sinking into the ripples of flesh as she slides her fingertips inside the small mouths to tease her hidden nipples. With a lifting motion, she presses her tits hard against her throat, and strokes her overstuffed windpipe. In a moment, you understand the massaging motions she's making- she's tit-fucking the dick inside her neck. With firm, rolling motions, your already clenched cock is milked by the satin vice of Scylla's breast as she cranes her head into the ample cleavage.\n\n",
            false
        );

        if (this.player.hasKnot(0))
            this.outputText(
                "Unable to hold on, your knot balloons inside of her mouth, the pulsing flesh pinning her tongue and locking her head onto your dick.  ",
                false
            );
        else if (this.player.cocks[0].cockType == CockTypesEnum.HORSE)
            this.outputText(
                "You hiss in anticipation as the head of your horse-cock flares inside of her stomach, its girth almost double your dick's.  ",
                false
            );
        this.outputText(
            (this.player.balls > 0 ? "Your balls churn and you" : "You") +
                " can feel your orgasm building as your muscles clench and your fingers spasm. Scylla grinds her tits against the cock in her throat as tightly as if she were choking herself and her body trembles in wet anticipation. But...\n\n",
            false
        );

        this.outputText(
            "... something's wrong. Still on the verge of cumming, you find yourself unable to. With shaking hands, you pull Scylla's bloated lips apart and remember the gag her horns made around her mouth. You realize that while it was easy entry to the back of her throat earlier, now that your dick is swollen to bursting, the horns are acting as a cock-ring, keeping you from cumming.  ",
            false
        );
        if (this.player.hasKnot(0))
            this.outputText(
                "Frustrated, you try to pull back, but your bloated knot is far too large for her tight mouth, keeping the two of you hooked together.  ",
                false
            );
        else
            this.outputText(
                "Trying to pull the ring off, you find that your swollen head is too full to pull back through her esophagus and out of her stomach.  ",
                false
            );
        this.outputText("Without a release, the two of you are sealed, face to groin.\n\n", false);

        this.dynStats("lib", 1, "lus=", 100);
        this.doNext(this.scyllaRoundIIPartIII);
    }

    private scyllaRoundIIPartIII(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(this.images.showImage("scylla-help-round-two-part-three"), false);
        if (this.player.balls > 0) {
            this.outputText(
                "The famished nun whimpers and starts rapidly swallowing, as if to milk your cream by suction alone. The pressure behind your dick keeps growing and your balls bloat with their unspent seed. Scylla seizes your ass with her soft hands and her pinkie slips inside of you, stroking your prostate in hopeful encouragement. You actually shout in pain as your testicles go into overdrive, skin growing tight as they expand under their load, swelling by the minute. You find your feet, trying to coax some of the blood from your cock, but the ring has sealed you at the peak of your tremendous mass. You back away from the bed and Scylla is pulled along, crawling on hands and knees. Her throbbing lips have puffed up so large that they cover her nose and chin, hot flesh and drool caressing your balls with every movement. You step toward the table where you placed your wine and pull the cork out with shivering hands. You throw back the bottle and take a deep swallow which you almost immediately spit back out. The sight of you drinking set off something in Scylla's famished stomach and now the muscled walls quiver and rumble around the head of your cock, demanding the hot flow of your cum with a force that knocks your feet out from under you. The nun's head is dragged forward as you fall and she lands atop you, her wet breasts pressed against your watermelon-sized balls. You seize up as your body tries desperately to cum again and your testicles lurch under the pressure, gallons pouring atop gallons.\n\n",
                false
            );

            this.outputText(
                "You lose track of how long you've been entwined with the starving nun, no longer able to stand as your countless denied orgasms have inflated your balls into vast, twitching, gurgling satchels, larger than your entire lower torso. You let out a weak, ragged moan but cut it short as you hear the distinctive sound of a cockerel crowing to greet the dawn. Slowly, agonizingly, the vice of Scylla's horn-gag pulls back and the pressure is finally released. Your eyes bulge and your mouth hangs open, wordless as you buck wildly, grabbing the back of the nun's head with both hands and crushing her face into your groin. The dam bursts, and your cock immediately starts emptying the load your balls had accumulated after hours of constant stimulation. Scylla's fingers and toes go wide as the hot torrent rolls down her throat and geysers into her fist-tight stomach. She orgasms so hard that you can see her clear, virginal honey squirting through the ruins of her robe. A wicked thought crosses your mind to punish her for stroking your prostate.\n\n",
                false
            );

            this.outputText(
                'Summoning all of your strength, you roll over, pinning her beneath your pumping balls and giving you free reign to fuck her face with abandon as your cock keeps pumping its overflowing seed into her stretching belly. You can feel her body squirming under the wrapping, liquid weight of your testicles as she siphons cream into her frail, hungering form. Gradually, the weight of your balls is transferred into her stomach, ballooning with elastic tension. Her tits swell in time with her belly, spilling out to pin her arms at her sides and wrapping around her throat so that they jiggle every time a load rushes down your cock. Daylight spills into the room by the time your orgasm has finished and the nun before you is little more than lips, tits, and a belly full of your spunk, with hands and feet wriggling happily under the bulk. "<i>T-thank you...</i>" she manages to get out before she passes out, exhausted sleep taking her immediately. You don\'t even have the strength to get back into your clothes, so you wrap a bed sheet around your sweat-soaked body and you stumble downstairs. Taking a heavy seat at a table, you motion for one of the surprised barmaids to bring you something- anything- to eat.\n\n',
                false
            );
        } else {
            this.outputText(
                "The famished nun whimpers and starts rapidly swallowing, as if to milk your cream by suction alone. The pressure behind your dick keeps growing and your abdomen bloats with unspent seed. Scylla seizes your ass with her soft hands and her pinkie slips inside of you, stroking your prostate in hopeful encouragement. You actually shout in pain as your body goes into overdrive, gut swelling under its load, swelling by the minute. You find your feet, trying to coax some of the blood from your cock, but the ring has sealed you at the peak of your tremendous mass. You back away from the bed and Scylla is pulled along, crawling on hands and knees. Her throbbing lips have puffed up so large that they cover her nose and chin, hot flesh and drool caressing your felsh with every movement. You step toward the table where you placed your wine and pull the cork out with shivering hands. You throw back the bottle and take a deep swallow which you almost immediately spit back out. The sight of you drinking set off something in Scylla's famished stomach and now the muscled walls quiver and rumble around the head of your cock, demanding the hot flow of your cum with a force that knocks your feet out from under you. The nun's head is dragged forward as you fall and she lands atop you, her wet breasts pressed against your hips. You seize up as your body tries desperately to cum again and your abdomen throbs under the pressure.\n\n",
                false
            );

            this.outputText(
                "You lose track of how long you've been entwined with the starving nun, no longer able to stand as your countless denied orgasms have robbed you of your strength. You let out a weak, ragged moan but cut it short as you hear the distinctive sound of a cockerel crowing to greet the dawn. Slowly, agonizingly, the vice of Scylla's horn-gag pulls back and the pressure is finally released. Your eyes bulge and your mouth hangs open, wordless as you buck wildly, grabbing the back of the nun's head with both hands and crushing her face into your groin. The dam bursts, and your cock immediately starts emptying the load accumulated after hours of constant stimulation. Scylla's fingers and toes go wide as the hot torrent rolls down her throat and geysers into her fist-tight stomach. She orgasms so hard that you can see her clear, virginal honey squirting through the ruins of her robe. A wicked thought crosses your mind to punish her for stroking your prostate.\n\n",
                false
            );

            this.outputText(
                'Summoning all of your strength, you roll over, pinning her beneath you and giving you free reign to fuck her face with abandon as your cock keeps pumping its overflowing seed into her stretching belly. You can feel her body squirming under the overwrought weight of your sweating body as she siphons cream into her frail, hungering form. Gradually, the weight of your loins is transferred into her stomach, ballooning with elastic tension. Her tits swell in time with her belly, spilling out to pin her arms at her sides and wrapping around her throat so that they jiggle every time a load rushes down your cock. Daylight spills into the room by the time your orgasm has finished and the nun before you is little more than lips, tits, and a belly full of your spunk, with hands and feet wriggling happily under the bulk. "<i>T-thank you...</i>" she manages to get out before she passes out, exhausted sleep taking her immediately. You don\'t even have the strength to get back into your clothes, so you wrap a bed sheet around your sweat-soaked body and you stumble downstairs. Taking a heavy seat at a table, you motion for one of the surprised barmaids to bring you something- anything- to eat.\n\n',
                false
            );
        }

        this.player.orgasm();
        this.dynStats("lib", 4, "sen", 3, "cor", 2);
        this.player.cumMultiplier += 2;
        if (this.model.time.hours > 5) this.model.time.days++;
        this.model.time.hours = 5;
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    public scyllaRoundThreeCUM(): void {
        this.scyllaSprite();
        this.clearOutput();
        this.outputText(this.images.showImage("scylla-help-round-two-jizz"), false);
        this.flags[kFLAGS.NUMBER_OF_TIMES_MET_SCYLLA]++;
        // Standard
        if (this.player.hasKeyItem("Opal Ring") < 0 || this.flags[kFLAGS.FED_SCYLLA_TODAY] == 1) {
            this.outputText(
                "You step into the Wet Bitch and are immediately struck by the sighing silence that's settled over the usually bustling tavern. Glancing around, you notice that all the men and herms are leaning back in their chairs, completely worn out. The origin of their exhaustion becomes apparent when a door opens upstairs and an equine shambles out, adjusting his belt and walking unsteadily, looking decidedly drained. Deciding to investigate, you head upstairs and peek through the ajar door.\n\n",
                false
            );

            this.outputText(
                "Scylla the nun is inside, daintily smoothing the wrinkles from her too-tight velvet black habit. Her belly is swollen almost to bursting and she absently strokes it with one hand while her other wipes a slimy glob of cum from the side of her mouth with an alabaster pinkie. She slides the finger into her mouth and sucks it hard enough to bring a blush to her cheeks, sighing in savory delight. As you're about to knock on the door and greet her, you hear a loud growling sound and your instincts drop you to a wary crouch, looking for the creature that must've snuck through Tel'Adre's gates. A gurgle and rumble follow and you realize that it's Scylla's tummy that's making those monstrous noises. Before your eyes, her stomach quivers and pulses, flesh roiling and twitching violently under the apparently elastic robe. Then, with a deep draining slurp, her belly contracts, sinking inward until it is flat and smooth. It seems the nun just digested a few gallons of cum in a matter of seconds.\n\n",
                false
            );
            this.outputText(
                'She pats her empty tummy and sighs, half in relief and half in annoyance. "<i>Darn,</i>" she chirps in her soft, quiet voice, "<i>still thirsty.</i>" She squeaks in what you assume was supposed to be a frustrated grumble. Sitting down on the bed, she notices you in the doorway at last. Her face lights up at seeing her friend, but she immediately averts her eyes. "<i>I\'m sorry about my cursing just now,</i>" she apologizes bashfully. "<i>I\'m just having a little trouble. Please, sit down and talk with me.</i>" She pats the bed next to her plump thighs.\n\n',
                false
            );

            this.outputText(
                "After seeing that display, you've got a few questions for her. What would you like to discuss?",
                false
            );

            this.simpleChoices(
                "Belly",
                this.scyllaIIIBellyChat,
                "Breathing",
                this.scyllaIIIHOWZUBREETH,
                "",
                undefined,
                "",
                undefined,
                "",
                undefined
            );
        }
        // Special for cum pumps
        else {
            // Alternate Scylla #3 Intro
            // (If the Solo option in toggled, play this for the first screen of Scylla #3)
            this.outputText(
                "You step into the Wet Bitch and step up to the bar, taking a moment to relax and unwind.  After enjoying yourself for a while, you glance around and notice that Scylla, your ever-thirsty nun is nowhere to be found.  Deciding to go look for her, you head upstairs and toward the maiden's regular lodgings.  She appears to be at home, but unaware that her door is ajar, giving you a chance to look in on her.\r\r",
                false
            );

            this.outputText(
                "Scylla is inside, daintily smoothing the wrinkles from her too-tight velvet black habit.  Her belly is swollen almost to bursting and she absently strokes it with one hand while her other wipes a slimy glob of cum from the side of her mouth with an alabaster pinkie.  She slides the finger into her mouth and sucks it hard enough to bring a blush to her cheeks, sighing in savory delight.  In her other hand, she's clutching a massive, freshly emptied candy-colored condom that glistens as though licked clean.  As you're about to knock on the door and greet her, you hear a loud growling sound and your instincts drop you to a wary crouch, looking for the creature that must've snuck through Tel'Adre's gates.  A gurgle and rumble follow and you realize that it's Scylla's tummy that's making those monstrous noises.  Before your eyes, her stomach quivers and pulses, flesh roiling and twitching violently under the apparently elastic robe.  Then, with a deep draining slurp, her belly contracts, sinking inward until it is flat and smooth.  It seems the nun just digested a few gallons of cum in a matter of seconds.\r\r",
                false
            );
            this.outputText(
                'She pats her empty tummy and sighs, half in relief before a second rumble comes from her gut.  "<i>Darn,</i>" she chirps in her soft, quiet voice, "<i>still thirsty.</i>" She squeaks in what you assume was supposed to be a frustrated grumble.  Sitting down on the bed, she notices you in the doorway at last.  Her face lights up at seeing her friend, but she immediately averts her eyes.  "<i>I\'m sorry about my cursing just now,</i>" she apologizes bashfully.  "<i>I\'m just having a little trouble.  Please, sit down and talk with me.</i>" She pats the bed next to her plump thighs.\r\r',
                false
            );
            this.outputText(
                "After seeing that display, you've got a few questions for her.  What would you like to discuss?",
                false
            );
            this.simpleChoices(
                "Belly",
                this.scyllaIIIBellyChat,
                "Breathing",
                this.scyllaIIIHOWZUBREETH,
                "",
                undefined,
                "",
                undefined,
                "",
                undefined
            );
        }
    }

    // [Her Belly]-
    private scyllaIIIBellyChat(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(
            "Off-handedly, you ask how her thirst has been. She seemed to be, ahem, retaining a lot of fluid when you last left her, but now...\n\n",
            false
        );

        this.outputText(
            'Scylla\'s stomach moans audibly and she blushes, putting a hand over it. "<i>Ah ha, yes. It has been a trial. Thankfully, awfully kind people like yourself have been helping me when the hunger becomes unbearable. I can\'t really stomach normal food or drink anymore, but it\'s okay.</i>" She bites the side of her plump lip and glances aside. "<i>Besides... I really... like... the taste,</i>" she whispers, half to herself.\n\n',
            false
        );

        this.outputText(
            "The nun shakes her head. \"<i>But it hasn't been the same lately. The thirst comes back almost immediately. I can't keep it in my body long enough before digestion kicks in.</i>\"\n\n",
            false
        );

        this.outputText(
            "You look at her closer and you think you can guess where all the extra protein has been going lately.  Her always lustrous hair is practically alive, sparkling twinkles of light reflecting off her long, jet curls. Her skin looks even softer than before, flush and creamy with an ageless smoothness. A thin but sturdy layer of muscle has taken definition under her buxom flesh, making her back straighter and her lean arms more graceful.\n\n",
            false
        );

        this.outputText(
            "Knowing you're unlikely to discover any more on that topic, you turn the subject to her breathing...",
            false
        );
        this.doNext(this.scyllaIIIHOWZUBREETH);
    }

    // [Her Breathing] –
    private scyllaIIIHOWZUBREETH(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(
            'This has been bothering you for a while. You spend a minute trying to carefully phrase your question before giving up and just diving in. How, you ask, was she able to keep breathing last time you fed her? Nobody can hold their breath for that long. Scylla fidgets and curls her hair with a finger as she stutters "<i>Um, well...</i>" As the nun does her best to politely handle the question, your gaze drops to her dangerously stuffed neckline. Beads of glistening sweat have formed at the crest of her diving cleavage and her fidgeting has bunched up her robe. Under the velour black cloth, her puffy areolas are straining to pop out. Her sunken nipples are hidden in tiny ravines of pink flesh.\n\n',
            false
        );

        this.outputText(
            "You put your hand on her knee and Scylla yelps at the contact, her body shivering, sending her tits into a boob-quake that finally frees them from their cover. Her breasts seem to defy gravity, sculpted in soft orbs that, even free of her dress, press together tightly, beaded with drops of sweat from her body heat.\n\n",
            false
        );

        this.outputText(
            "Her nipples, however, appear to have changed. The pink circles are larger than before- ovals with pinched ends, like tear drops. Or, you realize as their color flushes to an almost ruby red, like lips. She can't meet your gaze as you lightly encircle one teat with your fingertips and rest your thumb upon her innie nipple. They're hot and moist, with a plump fullness that sends an electric tingle up your hand. Pressing a little more forcefully, your thumb slides inside her nipple and you can feel a soft, sucking wetness that confirms your suspicions. Scylla's nipples have become mouths.\n\n",
            false
        );

        this.outputText(
            "She squeaks in pleasure at the shallow penetration and tries to push your hand away so gently that she might actually be stroking it. \"<i>I'm sorry,</i>\" she apologizes, \"<i>they're weird now, right?</i>\" The tight, puckered button lips on her breast, however, have no such protests as they suck on your thumb, a pale white fluid drooling around it. Maybe that's the reason she's always thirsty now- she's only been feeding one mouth when she ought to be drinking for three.\n\n",
            false
        );

        this.outputText(
            "You push the nun on her back and savor her embarrassed squirming before you strip and let loose your " +
                this.multiCockDescriptLight() +
                ", letting the stiffening length",
            false
        );
        if (this.player.cockTotal() > 1) this.outputText("s", false);
        this.outputText(
            " slap down on her belly. You climb onto the bed and straddle her chest, sliding ",
            false
        );
        if (this.player.cockTotal() > 1) this.outputText("a ", false);
        else this.outputText("your ", false);
        this.outputText(
            "dick between her sweat-slick mounds. She gasps and the intake of breath squeezes your dick between her flesh. You can feel her heart race in her chest, the pulse matching the blood filling your penis as it grows atop her body. Unable to stop herself, Scylla wraps her arms around her chest, muscles sealing her cleavage around your dick. The milky drool leaking from her tits dribbles out of her small lips and pools over your cock, igniting your nerves and robbing your body of control. Your hips buck, violently fucking her tits. As they quiver, bouncing with each thrust, their nipples widen and contract, sucking at the air desperately.\n\n",
            false
        );

        this.outputText(
            "With every ounce of willpower you can muster, you hold back your orgasm and withdraw from the burning embrace of her tit-flesh. You seize Scylla's left boob in both hands and slide your cockhead against it, leaving a glistening coat of pre-cum before resting your tip against her puckered nipple. The lips kiss from the tip of your penis to the base of the crown, crimson skin trembling with husky need. With a wince, you push in, your dick slowly parting the virginal depths of Scylla's breast. The pressure is unbelievable and her sensitivity must've increased, because with every inch, her eyes roll a little further back in her head. Her arms splay out at her sides, muscles tense, fingers clenching and unclenching reflexively.\n\n",
            false
        );
        if (this.player.balls > 0) {
            this.outputText(
                "The intrusion has swollen her tit lips, but they still quiver with want, trying to milk the dick inside them. You rub the soft flesh of her breast and you feel the wet folds inside lapping against your shaft like dozens of tongues. They slide up and down your cock, wrapping around it in tightening rings until you can bear no more. With a hard thrust, you stuff another six inches inside her and cum. The load bulges as it leaves your balls and presses against her lips, but the pressure pushes past and your seed sprays into Scylla's chest. The nun thrashes in mindless orgasm, her tongue lolling out and her eyes so far back that all you can see are the whites. As you cum, you thrust deeper, trying to plumb her depths, to see if these mouths connect to her belly like the one in her head.\n\n",
                false
            );

            this.outputText(
                "You are somewhat surprised when you find that her tits are growing with each load, filling with your hot, white spunk. Not just the left, either- her right tit bloats under the liquid weight of your seed, tiny geysers of cum spurting from her unplugged mouth as it tries to hold in every gallon. The nun's chest expands from double D to E, then G, even surpassing a J-cup as they swallow your seething heat. By the time they're larger than her head, your orgasm begins to slow and after another few minutes, your balls have finally drained and you're able to catch your breath.\n\n",
                false
            );
        } else {
            this.outputText(
                "The intrusion has swollen her tit lips, but they still quiver with want, trying to milk the dick inside them. You rub the soft flesh of her breast and you feel the wet folds inside lapping against your shaft like dozens of tongues. They slide up and down your cock, wrapping around it in tightening rings until you can bear no more. With a hard thrust, you stuff another six inches inside her and cum. The load bulges as it leaves your body and presses against her lips, but the pressure pushes past and your seed sprays into Scylla's chest. The nun thrashes in mindless orgasm, her tongue lolling out and her eyes so far back that all you can see are the whites. As you cum, you thrust deeper, trying to plumb her depths, to see if these mouths connect to her belly like the one in her head.\n\n",
                false
            );

            this.outputText(
                "You are somewhat surprised when you find that her tits are growing with each load, filling with your hot, white spunk. Not just the left, either- her right tit bloats under the liquid weight of your seed, tiny geysers of cum spurting from her unplugged mouth as it tries to hold in every gallon. The nun's chest expands from double D to E, then G, even surpassing a J-cup as they swallow your seething heat. By the time they're larger than her head, your orgasm begins to slow and after another few minutes, your reserves have finally drained and you're able to catch your breath.\n\n",
                false
            );
        }

        this.outputText(
            "You collapse atop her, head pillowed between Scylla's now mammoth tits. A wicked impulse strikes you, and you pull yourself up by your elbows. You rub your cheek against her swollen tit and hover just over her nipple. Smiling, you run the tip of your tongue in a tightening spiral around it, tasting the creamy flesh and sending shivers up her spine. You let your tongue linger at her lips and press your own against them, kissing gently, the suction of your mouth trying to pull her clenched nipple open. \"<i>Oh!</i>\" she gasps, and wraps her arms around your head, pulling you into a tight embrace, her tit lips kissing you back, passionately. They're sweet in your mouth, like marshmallows or candy, and you run your tongue between her lips, parting them once more. Fluid flows out of her over-full breast and into your mouth. You roll it around on your tongue, trying to place the taste. It's slightly salty, but not at all bitter, like you expected. Instead, it's gained some of the sweetness of her lips, more like cream than the milk and cum that made it. You lock your lips around hers and suckle, pulling a mouthful out, which you drink with a shuddering satisfaction.",
            false
        );
        this.doNext(this.scyllaLevelIIIRoundIIIFIGHT);
    }
    private scyllaLevelIIIRoundIIIFIGHT(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(this.images.showImage("scylla-help-round-three"), false);
        // [one dick]-
        if (this.player.cockTotal() == 1) {
            this.outputText(
                "The richness of Scylla's milk seems to have reinvigorated you- a rush of blood sweeps your exhaustion away and your dick grows hard at the sight of her panting, supple body. Deciding to finish what you began, you straddle her once more and slide your dick between her tits. Their inflation has turned the tight but shallow cradle of her cleavage into a rippling embrace of almost liquid flesh. You sink your fingers into her alabaster skin and they vanish in her tits, swallowed from sight. She lets out a tittering laugh, still oblivious to anything beyond the sensation of your cock and hands upon her chest. Rubbing your palms along her boobs, you can feel the liquid sloshing within, hot and sweet. You squeeze them together as hard as you can and you are rewarded with a pulsing clench on your dick. You begin to rock back and forth, massaging her bloated tit flesh with your throbbing hardness. As you squeeze, her lips part slightly, allowing her cream to ooze down her cleavage and between your fingers, warm and pale white, giving her skin a glossy shine, like oil. Your thrusting works the cream all over her tits and before long, you're sliding in and out easily, the slick friction rocking her udder-like boobs hard enough that her whole body bobs back and forth, like a human cock-sheath.\n\n",
                false
            );

            if (this.player.balls > 0) {
                this.outputText(
                    "The throes of another orgasm begin to build in your balls and you plan to make the most of it. Sliding your hands up to the tops of her tits, you run your fingers over her nipple lips and press your thumbs down, forcing them inside the mouths of her breast. Hooking them around, you sink your fingers into the flesh and begin tit fucking the nun in earnest. With each thrust of your hips, you drag her tits against your pelvis, crushing them together as you draw back, only to thrust again, faster and harder each time. The cream filling her boobs leaks at first, then begins to spray out as your fucking reaches a frenzied pace. The thick fluid sprays across your chest with each plunge and across her gasping face with each recoil. Her tongue licks her lips and cheeks wildly, drinking her own milk as you abuse her oiled body.\n\n",
                    false
                );

                this.outputText(
                    "You give her tits one last thrust, mashing her tits together so hard that the cream filling them sprays as if her breast was cumming. Your balls ache and pulse, but you hold the orgasm right on the very edge. Scylla's body tenses and her eyelids flutter as her eyes roll back down and sense returns to her. She stares directly down the length of your dick, clutched within her immense tits, and shyly places a kiss on the tip of your cock. It's too much and your control is torn from you. The orgasm hits and your load blasts out of your dick like a geyser. The nun's pursed lips are instantly filled and her cheeks balloon at the rush of cum. Her throat reflexively tries to swallow, but it's too much too quick, and twin streams of cum burst from her nostrils. The mouths around your thumbs squeal in orgasmic ecstasy and you lose your balance atop her slick body. Your cock slips out from between her lips and your uncontrolled jizz sprays its load across her face, drenching her jet-black hair, thick curls wrapping around bloated pearls of your cum. With each load, your seed spills across her, mixing your cream with hers. Like liquid snow, you bury her torso in your cum.\n\n",
                    false
                );
            } else {
                this.outputText(
                    "The throes of another orgasm begin to build in your gut and you plan to make the most of it. Sliding your hands up to the tops of her tits, you run your fingers over her nipple lips and press your thumbs down, forcing them inside the mouths of her breast. Hooking them around, you sink your fingers into the flesh and begin tit fucking the nun in earnest. With each thrust of your hips, you drag her tits against your pelvis, crushing them together as you draw back, only to thrust again, faster and harder each time. The cream filling her boobs leaks at first, then begins to spray out as your fucking reaches a frenzied pace. The thick fluid sprays across your chest with each plunge and across her gasping face with each recoil. Her tongue licks her lips and cheeks wildly, drinking her own milk as you abuse her oiled body.\n\n",
                    false
                );

                this.outputText(
                    "You give her tits one last thrust, mashing her tits together so hard that the cream filling them sprays as if her breast was cumming. Your shaft aches and pulses, but you hold the orgasm right on the very edge. Scylla's body tenses and her eyelids flutter as her eyes roll back down and sense returns to her. She stares directly down the length of your dick, clutched within her immense tits, and shyly places a kiss on the tip of your cock. It's too much and your control is torn from you. The orgasm hits and your load blasts out of your dick like a geyser. The nun's pursed lips are instantly filled and her cheeks balloon at the rush of cum. Her throat reflexively tries to swallow, but it's too much too quick, and twin streams of cum burst from her nostrils. The mouths around your thumbs squeal in orgasmic ecstasy and you lose your balance atop her slick body. Your cock slips out from between her lips and your uncontrolled jizz sprays its load across her face, drenching her jet-black hair, thick curls wrapping around bloated pearls of your cum. With each load, your seed spills across her, mixing your cream with hers. Like liquid snow, you bury her torso in your cum.\n\n",
                    false
                );
            }
            this.outputText(
                "With a strangled noise, Scylla manages to swallow the load you blasted to the back of her skull and as she wipes the cum from her nose, her polite, nervous smile is replaced with a slut's wanton grin. Her eyes widen at the feast you're covering her with, and she sets to work with relish. With both hands, she scoops up your gooey cum and pours it into the sucking nipples atop each tit. She licks between each finger between handfuls, rubbing it into her skin as she rolls the hot jizz up toward the waiting mouths, which drink greedily. More tired than you realized, you roll to one side and let the nun clean herself, one hot, sticky mouthful at a time.\n\n",
                false
            );
        }
        // [two dicks]-
        else {
            this.outputText(
                "As you nurse from her tits, Scylla's arms wrap around your head, holding you close to her heart. Your dicks begin to stiffen as you swallow her cream and you decide you haven't had enough just yet. With a sucking pop, you pull back from her breast and grin wickedly as you straddle her again. Stroking your dicks with your hands, you spit some of her cream onto your cockheads and rub the lubricant into them. Rising, you place ",
                false
            );
            if (this.player.cockTotal() > 2) this.outputText("two ", false);
            else this.outputText("both ", false);
            this.outputText(
                "of your dicks against her nipple lips and savagely thrust down, penetrating both tits. Scylla gasps and moans as her lips wrap around your shafts and the milky depths of her tits clench your heads. You try to wrap your hands around each tit and fail miserably, so you content yourself with digging your fingers deep into the silky flesh. You thrust again, burying yourself inside her chest even as her lips suckle on your cocks.\n\n",
                false
            );

            if (this.player.balls > 0) {
                this.outputText(
                    "You can feel your balls filling and you grit your teeth, determined to bottom out inside her bloated boobs. You plunge inside of her, deeper and deeper, rocking her whole body with your urgent operation. The cream inside flows between the pulsing clench of her vaginally-tight tit-flesh and your dicks burn with renewed lust as the cream seeps through your urethra and into your balls. Your eyes widen as the cream seems to react violently to your churning cum and your balls begin to swell as much as Scylla's tits. You bury yourself inside her at last and the twin mouths are pressed together, kissing each other at the base of your shafts even as your inflating balls pin them in place with their fluid mass. Scylla instinctively wraps her arms around her tits and squeezes, causing you to buck backwards as a gallon of her milk flows up, into your dicks and through their shafts. Already full, your balls react to this new fuel with an explosive heat that makes every muscle in your body constrict.\n\n",
                    false
                );
                this.outputText(
                    "Your balls erupt and your shafts vibrate with the urgency of your orgasm. Your milk-fed cum rushes down your dicks and bursts from your convulsing heads, injecting your seed into the depths of Scylla's chest. You thrust your hips wildly as her bloated tits distend further, your pumping feeding both mouths with every drop your balls can muster. The nun's tits grow large enough to pin her arms at her sides before, at last, they seem to bottom out. Your orgasm is nowhere near done, however, and the cum you had been inflating her tits with finally makes its way into her stomach. Fattening almost immediately, her smooth belly puffs up fast enough that it looks like she is becoming pregnant in seconds. The elasticity of her dress can't hold against your pumping and it tears down the middle. The pressure is so great that you can see a bulge starting at her collarbone. It works its way up her neck, filling her throat until her cheeks puff out. She desperately tries to keep her mouth shut, but there is simply too much cum, and her jaw is forced open, your seed geysering from her mouth to drench her face.\n\n",
                    false
                );
            } else {
                this.outputText(
                    "You can feel your prostate filling and you grit your teeth, determined to bottom out inside her bloated boobs. You plunge inside of her, deeper and deeper, rocking her whole body with your urgent operation. The cream inside flows between the pulsing clench of her vaginally-tight tit-flesh and your dicks burn with renewed lust as the cream seeps through your urethra and into your gut. Your eyes widen as the cream seems to react violently to your churning cum and your abdomen begins to swell into a fluid paunch. You bury yourself inside her at last and the twin mouths are pressed together, kissing each other at the base of your shafts. Scylla instinctively wraps her arms around her tits and squeezes, causing you to buck backwards as a gallon of her milk flows up, into your dicks and through their shafts. Already full, your body reacts to this new fuel with an explosive heat that makes every muscle in your body constrict.\n\n",
                    false
                );
                this.outputText(
                    "Your shafts vibrate with the urgency of your orgasm. Your milk-fed cum rushes down your dicks and bursts from your convulsing heads, injecting your seed into the depths of Scylla's chest. You thrust your hips wildly as her bloated tits distend further, your pumping feeding both mouths with every drop your prostate can muster. The nun's tits grow large enough to pin her arms at her sides before, at last, they seem to bottom out. Your orgasm is nowhere near done, however, and the cum you had been inflating her tits with finally makes its way into her stomach. Fattening almost immediately, her smooth belly puffs up fast enough that it looks like she is becoming pregnant in seconds. The elasticity of her dress can't hold against your pumping and it tears down the middle. The pressure is so great that you can see a bulge starting at her collarbone. It works its way up her neck, filling her throat until her cheeks puff out. She desperately tries to keep her mouth shut, but there is simply too much cum, and her jaw is forced open, your seed geysering from her mouth to drench her face.\n\n",
                    false
                );
            }
            this.outputText(
                "You're still cumming, but it's too much for your body and you collapse, unconscious.",
                false
            );
        }
        // [Ending]-
        this.player.orgasm();
        this.dynStats("lib", 4, "sen", 3, "cor", 2);
        this.player.cumMultiplier += 2;
        if (this.player.balls > 0) this.player.ballSize += 2;
        this.doNext(this.scyllaIIIFinisher);
    }

    private scyllaIIIFinisher(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(
            "When you finally rouse from your slumber, you understand why all the guys downstairs in the Wet Bitch looked like they'd been sucked dry. Your body is sore and you feel like you haven't had anything to drink in months. Scylla is next to you, plump and happy. She's managed to replace her irredeemably stained robe with a new, larger one, but it too is on the verge of tearing. Though her digestion seems to have handled most of your cum, her breasts have kept some of their weight, each as large as a basketball. Her belly has the slightest paunch, but apparently this is enough to sate her thirst because she gives you an affectionate pat on the shoulder and a smile so bright that the candles in the room seem dim.\n\n",
            false
        );

        this.outputText(
            '"<i>Thank you so much,</i>" she gushes. "<i>Once again, you come to my rescue and teach me how to overcome my trials. You truly are my guardian angel. One of these days, I hope I\'ll be able to return the favor.</i>" She favors you with a moist kiss on the forehead and springs from bed, energized and ready to do some good. You groan, roll over, and go back to sleep.',
            false
        );
        this.doNext(this.camp.returnToCampUseFourHours);
    }

    public scyllaRoundIVGo(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(this.images.showImage("scylla-help-round-four"), false);
        this.flags[kFLAGS.NUMBER_OF_TIMES_MET_SCYLLA]++;
        this.outputText(
            "The tavern has a decent crowd, the air thick with laughter and ribald conversation. Scylla is speaking with a few strangers, politely nodding when you spot her. You wave to her on your way in and she waves back, excusing herself from the conversation and making her way over to you. She explains that she has a few things to take care of, but she'd be glad to have your company later.  Scylla ducks out the door and you shrug, deciding to kill some time. You order a drink and begin to walk away from the bar when you feel a sharp sting on the back of your neck. You slap the welt and angrily look for the insect that stung you, but the dull roar of the patrons' lusty conversations hides the culprit's escape. You grumble and rub the pinched muscle in your shoulder as you grab your drink and settle by the fire.\n\n",
            false
        );

        this.outputText(
            "You should've ordered something to eat, you realize a little later when the drink leaves you tipsier than it should have. You feel woozy and arise with difficulty, your head spinning. You're not sure how much time has passed, but everything's darker now. Nobody is paying attention to you, but they all somehow look larger and more imposing. You struggle to keep your balance and fail, tumbling into a clumsy heap on the floor. It seems your clothes tripped you up – for some reason, they don't fit very well anymore. As you dully pull at the loose material, your hands trace blurry trails through the air and it dawns on you that something is wrong. You try to work up a panic, but your building stupor makes everything seem distant and unimportant. You look at your glass and wonder if you've been drugged, or maybe... You touch the tiny welt on your neck. Poison, you realize too late. Your attempt to shout an alarm doesn't even manage to move your lips. All around you, strangers are talking, laughing and drinking, but for you, there is only the encroaching darkness and the mercy of an unknown assailant.\n\n",
            false
        );

        this.outputText(
            "When consciousness finally returns, you find yourself in a small stone room with no lights or windows. You aren't tied up, but you feel incredibly vulnerable. Your body feels strange, and you check yourself with a quick pat down. Everything seems to be in place, but the lingering effects of the poison are making it difficult to think clearly. You take stock of your situation: You're in a strange place, in the dark, all alone, and you can still feel the poison coursing through your veins. Your cheeks flush and you do the only thing you can think of: you cry out for help.",
            false
        );
        this.doNext(this.scyllaRoundIVPtII);
    }
    private scyllaRoundIVPtII(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(this.images.showImage("scylla-help-round-four-pt-two"), false);
        this.outputText(
            "Your call is answered by a scraping and shuffling at one of your walls, and for a moment, you fear you've alerted your captor. Then, a line of light forms against the stone and gradually widens into a doorway. Your relief at the illumination takes the breath from you. A face, framed by the light like a halo, appears in the doorway. \"<i>Is that you, " +
                this.player.short +
                '?  Are you all right?</i>" Your savior is a tall, busty nun with raven-black hair and pale, soft skin. Scylla looks as relieved to see you as you are to see her, tears misting in her eyes. "<i>Oh dear, let\'s get you out of this wretched place,</i>" she fusses, bustling in and scooping you to her breast. "<i>I\'m so glad you are all right!</i>" The nun\'s warm embrace is a welcome change from the cold stone, and you let yourself relax in her arms as she lifts you off the ground and carries you out.\n\n',
            false
        );

        this.outputText(
            'You glance warily between the towering mountains behind you and the dark forest ahead. You wonder just how long you\'ve been out, and how far they smuggled you. A thought tries to cross your muddled brain and you only catch snippets of what your rescuer is saying. "<i>--so worried when they said you\'d just vanished from the tavern! I searched the city without luck,</i>" she explains as you look up at her sweet, caring expression. Her strides are long, and you bounce against her gargantuan bust with each step. You are still trying to figure out what\'s off about your body... Something about size? "<i>It was by divine providence that I found you in time,</i>" the nun carries on, closing her eyes for a quick prayer of thanks. "<i>Whatever wicked creature snatched you never thought that I would search the mountain\'s foothills, and find the cave he\'d stashed you in.</i>" Her quiet, reserved public demeanor quite forgotten in her righteous joy, she gives you a kiss on your forehead. "<i>But the gods protect children.</i>"\n\n',
            false
        );

        this.outputText(
            "The last of your haze is burned away by her statement, and you take a careful look at yourself. You haven't changed physically, except in scale. Scylla isn't a lumbering giant – you've just shrunk down to a child's size, no more than three feet tall. The nun hushes your panicked squirming with a gentle shoosh and a pat on the head. \"<i>There there... You've been afflicted by a profane venom, but Scylla will make it all better.</i>\" She dips her head and lifts you up, threading your small " +
                this.player.legs() +
                " around her shoulders, letting you ride piggy-back as she walks to a small temple on the edge of the forest. You rest your tiny fingers in the thick, curly hair that spills all around you and smile, despite yourself, when she takes extra big steps to make you bounce on her shoulders.\n\n",
            false
        );

        this.outputText(
            "You reach her humble quarters, and Scylla sets you down on her plain-looking cot, leaving your " +
                this.player.legs() +
                ' to swing in the air over the side. "<i>I have never seen this poison\'s effects in person,</i>" she begins, taking a seat on a simple stool opposite you, "<i>but I have read accounts of it. Demon Lords brew it to topple heroes without risking noble combat. Its vile magic saps your size and your strength. If left untreated, victims regress until they have no hope of overcoming their attackers. I shudder to think what happens if it gets that far.</i>" Her eyes glaze, perhaps remembering the demonic factory that you shut down. Then she shakes her head and just like that, her concern is swept away – replaced by a smile like the first thaw of spring. "<i>But we won\'t let that happen,</i>" she soothes you, resting a large yet soft hand on your ' +
                this.player.leg() +
                '.  You look down at the nun\'s lingering arm and follow it up to her sizable chest. Her breathing is a little too shallow, and you meet her eyes only to see the beginnings of thirst reaching its hooks into her mind. "<i>We just need to get that poison out of you...</i>" she whispers, leaning down, her full, red lips glistening.',
            false
        );
        this.dynStats("lus", 5);
        // [Next]
        this.doNext(this.scyllaRoundIVPtIII);
    }
    private scyllaRoundIVPtIII(): void {
        this.scyllaSprite();
        this.hideUpDown();
        this.outputText("", true);
        this.outputText(this.images.showImage("scylla-help-round-four-pt-three"), false);
        this.outputText(
            "Your contact is broken as the distinctive odor of brimstone fills the air. Scylla draws back in shock, and you are painfully aware of just how weak you've become. A fountain of flames erupts from the floor and a figure of darkness steps out. You almost sigh in relief when you see it's only an imp, even if he is a rather large one. Actually, at four feet and covered in muscle and matted red fur, he looks completely capable of dragging your tiny body back to your lightless cell. You shake off your doubts and set your jaw. Standing on the bed, you defiantly face him.\n\n",
            false
        );

        this.outputText(
            '"<i>Weak-minded Champion,</i>" he taunts with a voice like oil on water, "<i>you are already beaten. My agent inside your wretched city caught you at the height of your power.  What hope do you have now? Submit to your new lord and I promise you will grow to enjoy your treatment in time.</i>"\n\n',
            false
        );

        this.outputText(
            'Before you can reply, Scylla interposes herself between you and the imp Lord, stretching her arms out protectively. "<i>I won\'t allow you to harm this child, Demon!</i>"\n\n',
            false
        );

        this.outputText(
            'The Imp Lord coyly plays with a wisp of fire between his fingers. "<i>You are already corrupted, Nun; soiled and unclean. What inconvenience could you pose to me, other than the threat of having to own another slave?</i>"\n\n',
            false
        );

        this.outputText(
            'Scylla looks stung by the imp\'s observation, but her spine stiffens and her expression sets into righteous indignation. "<i>How dare you! How DARE you! Call me whatever you will, but no one enslaves children! You poison my friend, you defile this temple, and you forget that even with my curse, all virtuous people can do good.</i>" Her voice picks up, magnified three times. "<i>They can also SMITE EVIL!</i>" Scylla slaps the imp with every bit of virtuous fury her seven-foot body can muster, and a bolt of brilliant white light crashes into the room. Its power burns away the brimstone stench, and leaves the imp Lord twitching and paralyzed on the floor.\n\n',
            false
        );

        this.outputText(
            "Scylla sits heavily on her stool, panting, with sweat dripping down her neck and into her heaving cleavage. Her thirst must be overpowering after defying the demon. She stares down at the stunned body of the imp and wets her lips. The tiny nubs poking out of her hair sharpen before your eyes, growing outwards and curling slowly in the air. What will you do?",
            false
        );

        // [Watch] [Kiss]
        this.simpleChoices(
            "Watch",
            this.scyllaRoundIVPtIVWATCH,
            "Kiss Her",
            this.scyllaPtIVKissPtI,
            "",
            undefined,
            "",
            undefined,
            "",
            undefined
        );
    }

    private scyllaRoundIVPtIVWATCH(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(
            "Scylla lowers herself to her knees and hovers over the unconscious imp, a shadow falling over her eyes and her lids drooping. Her plump lips curl slowly at their edges, and she murmurs something under her breath that sounds like a prayer you used to say as a child before having a meal. When she finishes, the nun unfolds her hands and lays them upon the hulking imp, gliding her fingers up his thighs and over his hips. With a dismissive tug, she pulls his fur loincloth aside to expose his flaccid member. Even soft, it's nearly 8 inches long, and covered in small, hooking protrusions to make sure it can't be removed from a victim while hard. Scylla wraps her hands around the shaft and strokes along its length, one finger at a time, tightening her grip just as she reaches the head. Under her eager, if inexperienced, strokes, the collapsed demon stiffens, his body submitting to her insistent caress.\n\n",
            false
        );

        this.outputText(
            "The nun begins trembling with need as the demonic cock springs to life, and she gratefully lowers her head to it with a hungry gasp. Her lips have swollen in anticipation, puffing into a whorish scarlet pucker. She rubs the imp's cock along the rise of her mouth and titters mindlessly at the feel against her skin. Pulling down the neck of her dress, she bares her tits to the air, the nipple-mouths on each one already drooling white milk. She rolls her palms along her boobs and smears the oily pre-cream across her livid flesh, circling each areola with her pinkies, teasing them with the promise of penetration. She levels a husky puff at the crown of his dick and sucks the tip of his cock into her mouth. She draws back slightly, but her lips seem glued on, pulling her cheeks into a narrow concave. She slides a finger into her hungry nipples and begins to suck rhythmically at the demon prick, fucking him in the cunt-like tightness of her swollen lips.\n\n",
            false
        );

        this.outputText(
            "The imp's face goes from expressionless neutrality to a grimace, and he grunts as his body orgasms to sate Scylla's thirst. His foot-long dick pulses with each load as the nun strokes her tit-lips feverishly, masturbating from their near-clit sensitivity. Her cheeks fill with the demon's seed before she takes a large, grateful gulp, savoring the feel of the burning fluid rolling down her throat. As she drinks, the imp rouses from his paralysis, taking in the scene between groans. His confused expression quickly becomes wicked relish. \"<i>Couldn't help yourself, eh bitch?</i>\" he says triumphantly. \"<i>You belong in our new factory after all. Maybe I'll take you there after I'm done, but for now, let's take that virginity of yours, shall we?</i>\"\n\n",
            false
        );
        this.dynStats("lus", 10);

        // [Next]
        this.doNext(this.scyllaWatchSecondPartPoorImp);
    }
    private scyllaWatchSecondPartPoorImp(): void {
        this.scyllaSprite();
        this.hideUpDown();
        this.dynStats("lus", 10);
        this.outputText("", true);
        this.outputText(
            "The Imp Lord rises and tries to pull his member from Scylla's lips, but manages only to stumble onto his back.  The nun's mouth remains locked on, slurping up the last drop of cum from his cockhead. He yanks again, but it only slides his shaft deeper into her maw, her sucking lips and swallowing throat eager for his next orgasm. It seems that the imp's hooked dick has made it impossible for him to pull out while Scylla keeps it stimulated. He shrieks in irritation, but she merely lets out a pleased purr, vibrations traveling up his barbed prick and exciting his rapidly-refilling balls.\n\n",
            false
        );

        this.outputText(
            "\"<i>Think you're smart, whore? I am no simple imp, to be defeated by a cock-sucking cum-dump jizz-junkie!</i>\" the imp Lord curses, balling his hands into fists. His body shimmers and his skin ripples as his infernal magic re-sculpts his flesh. He shrinks down to your height, gritting his fangs in focus as a second dick erupts from his groin. His ball sack swells as two new testicles drop into it. The new cock is longer than his first and weaves around in the air like a tentacle. \"<i>Let's have that cherry now-- wait, stop!</i>\" he screeches as Scylla's hands seize the long, ropy appendage. It lashes this way and that, but the thirst-mad nun's strength wrestles it down. With swift motions, she wraps it around the exposed length of his first dick in a tight spiral, and with a gurgle of victory, jams its head into her mouth. She shivers and squeaks in orgasm from the double penetration, and the mouth-nipples on her tits cry out in ecstasy. The Imp Lord grunts, stunned by the action as her sucking begins anew.  His second cock stiffens, growing thicker and squeezing tighter around the first one. The nun cups the imp's balls and rolls them in her eager fingers as she takes a long, deliberate gulp, swallowing a few more inches of the coiled cocks.\n\n",
            false
        );

        this.outputText(
            "The Imp Lord can't control himself; he thrusts instinctively, bucking his hips with each slurping quaff. Scylla's jaw is pushed to its limit as the double-thick, spiraling dicks are rammed into her throat like a drill.  Her lips are blood red from their aroused excitement at being stretched like a sheath over loop after loop of the demon's pricks. Her neck distends as she draws them deeper, bloated like a snake swallowing a meal. The nun coos with each gulp, inexorably closing the gap between her sucking mouth and his cum-bloated balls.\n\n",
            false
        );

        this.outputText(
            '"<i>F-Fucking freak!</i>" he cries in the beginnings of panic. "<i>I\'ll... have your cunny if it c-c-costs me every last... uug... bit of my power!</i>" He twitches wildly, his entire body vibrating as he once again shrinks smaller and smaller. When his cannibalizing magic ends, he\'s barely a foot tall. Two more tentacle cocks burst from his loins, and his ball sack doubles to hold eight testicles.  The quivering pouch is nearly as large as his head. "<i>Even a r-raging s-slut like you c-can\'t swallow f-four dicks,</i>" he insists weakly while his orgasm builds. "<i>Now I\'ll f-fuck that untouched c-cunt and y-your ass while I\'m at it,</i>" he promises, and his new tentacle dicks whip about to smack the nun across the face.\n\n',
            false
        );

        // [Next]
        this.doNext(this.scyllaWatchThirdPartOhShitSon);
    }
    private scyllaWatchThirdPartOhShitSon(): void {
        this.scyllaSprite();
        this.hideUpDown();
        this.dynStats("lib", 1, "lus", 10, "cor", -5);
        this.outputText("", true);
        if (this.player.balls > 0)
            this.outputText(
                "Scylla looks up at him, her eye level now at his chest.  Wild, empty eyes meet his, and the full depth of her addiction becomes apparent to the imp Lord. He tries to pull his cocks away, but she squeezes his crowded scrotum, and he howls in pain. Her trembling hands grab both of the new cocks, and her fingers tighten with vice-like strength. She hauls them toward her chest as her impaled face takes one last swallow, crushing her nose against his abdomen. Before the imp can recover, she drags the tentacle cocks around and under her tits, wrapping the demon's body in her cleavage and lifting her nipples to his sight. He takes a look at the nun's tits with an expression of abject horror, and the imp Lord whimpers. The lips on Scylla's boobs smile in response. In unison, they open wide and she thrusts the demon's dicks into their suckling maws. The simultaneous penetrations are too much for her pussy-like lips and she climaxes, screaming her brainless orgasm into the ball sack slapping against her drooling lips, her body tightening as every muscle clenches in cock-bloated pleasure.\n\n",
                false
            );
        else
            this.outputText(
                "Scylla looks up at him, her eye level now at his chest.  Wild, empty eyes meet his, and the full depth of her addiction becomes apparent to the imp Lord. He tries to pull his cocks away, but she squeezes his crowded scrotum, and he howls in pain. Her trembling hands grab both of the new cocks, and her fingers tighten with vice-like strength. She hauls them toward her chest as her impaled face takes one last swallow, crushing her nose against his abdomen. Before the imp can recover, she drags the tentacle cocks around and under her tits, wrapping the demon's body in her cleavage and lifting her nipples to his sight. He takes a look at the nun's tits with an expression of abject horror, and the imp Lord whimpers. The lips on Scylla's boobs smile in response. In unison, they open wide and she thrusts the demon's dicks into their suckling maws. The simultaneous penetrations are too much for her pussy-like lips and she climaxes, screaming her brainless orgasm into the flesh slapping against her drooling lips, her body tightening as every muscle clenches in cock-bloated pleasure.\n\n",
                false
            );

        this.outputText(
            "The imp can't hold back any longer; his over-stuffed balls throb as his shafts fill with cum. You watch in fascination as the nun's serpentine throat ripples with the inflation each load brings. Her tits swallow cum like sponges, surging larger and larger until they wrap entirely around the imp Lord, pinning his arms at his sides, and crushing him in their pillowy, almost-liquid embrace. Scylla's belly balloons from the quadruple loads, filling with infernal jizz that makes her horns shimmer and thicken in a cruel and goat-like manner. As her stomach fills and cum begins to surge back up her throat, she howls in animal defiance. Her digestion accelerates to compensate as she gulps down gallons of demonic sperm; her stomach rumbles and begins to tighten back into its original flatness, only to be refilled a moment later. Her abdomen pulses like her throat, fat with seed for a moment before it absorbs the spunk. She bounces between slim and stuffed for several long minutes until the emaciated imp is finally drained of every last drop.  The nun's body finally starts to settle down, thoroughly gorged and sated.\n\n",
            false
        );

        this.outputText(
            "Cum oozes from all three of Scylla's mouths, and her belly protrudes with a rotund pudge under her mammoth tits. Each boob is filled well beyond any letter system, though Triple-Z might come close. They are half as big as she is and large enough to fill a bathtub. The Imp Lord's dicks soften and their hooks finally release.  The nun's throat gradually looks less like she swallowed the imp's friends whole, until the dicks finally slide out of her pulsing lips with a wet, meaty slap. She takes several deep breaths as his other two cocks are regretfully released by her tit-lips, creamy cum-milk drizzling from their lips. The imp is still pinned in her cleavage, but his struggles have ceased - broken by Scylla's inexhaustible thirst.\n\n",
            false
        );

        this.outputText(
            'Her sperm-fix satisfied, sense returns to her mind, but her curling horns retain their size, giving the innocent woman a slight sinister air. Her eyelashes flutter as she turns to you with an embarrassed blush. "<i>I am sorry you had to see that. I just get a little... fired up when I go for too long without a meal. Please, let me apologize and attend to your cure...</i>" She gently pokes the exhausted imp tucked between her tits, and politely asks her captive about the antidote for your poison. He dully conjures it with a pained expression, the last of his magic consumed in an act of mercy. As you drink the foul concoction, you feel the weakness fade as the venom in you is cleansed; your strength and size swiftly return. "<i>Yay,</i>" Scylla cheers softly once you are fully restored, and she smiles sweetly. "<i>Leave it to demons to never even consider removing what binds them in the first place,</i>" she laughs.\n\n',
            false
        );
        // Go to epilogue
        this.doNext(this.scyllaPtIVEpilogue);
    }

    // [Kiss]
    private scyllaPtIVKissPtI(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(
            "You step up to the kneeling nun, grab her shoulders with small hands, and lean in for a deep kiss. Her large lips are soft on yours and taste pleasant on the tip of your tongue. She seems startled at first, but sighs after a moment as her mind-erasing thirst is driven back by your passionate embrace. The horns sprouting from her skull recede and disappear into her hair once more. She returns your kiss with genuine gratefulness, one hand cupping the back of your head, the other wrapped around your waist.  Her lips are warm against yours, their heat spreading through your shortened frame. When you break the kiss for air, Scylla's eyes glitter with affection, and her mouth turns up in cute amusement. \"<i>Even when I'm trying to protect you, you come to my rescue,</i>\" she softly chides.\n\n",
            false
        );

        this.outputText(
            'You take a step back and begin to appreciate the difference in scale between the two of you. In your poisoned state, you\'re not even three feet tall and losing inches with each hour. Scylla, on the other hand, has always been tall - nearly seven feet - and the changes the demonic taint has made to her body have made her buxom in a way her robe has given up trying to hide. Her long legs and plump thighs give way to a flat, fit waist while her breasts are over half your height and as deep as you are wide. Scylla leans in and wraps her strong arms around you in a pillowy hug. "<i>I think my hero deserves a second kiss,</i>" she insists, coyly. With one hand, she pulls the taut fabric around her tits down, allowing their full, J-cup flesh to roll against you, silken alabaster filling your vision. Cradling your diminutive form against her body, she raises your head to a scarlet nipple, areola lips moist from the milk within.\n\n',
            false
        );

        this.outputText(
            "You can't help yourself, and you rub your cheek against her satin boob as you kiss her nipple; the mouth kisses back with equal vigor. You thread your tongue between her candy lips and the sweet cream within squirts into your mouth, rich and intoxicating. Hazy fervor floods your body, your lips prickling with sexual sensitivity. You kiss harder, parting her lips with yours, and she yields, slick skin opening to your sudden thirst. The fine milk ebbs into your mouth, and you roll it around on your tongue before swallowing and savoring the warm, satin fluid that settles in your belly. Scylla takes a deep breath and contentedly strokes your hair as you nurse at her breast. You wrap your arms around her pliant titflesh and squeeze as you suckle in earnest. The creamy milk flows faster and thicker, flooding your mouth and forcing you to take big gulps. Even swallowing as much as you can, some milk dribbles down your chin, spilling between your fingers and the knead-able flesh of the nun's tits.\n\n",
            false
        );
        this.dynStats("lus", 15);
        this.doNext(this.scyllaPtIVKissPtII);
    }

    private scyllaPtIVKissPtII(): void {
        this.scyllaSprite();
        this.hideUpDown();
        this.player.orgasm();
        var x: number = this.player.biggestCockIndex();
        this.outputText("", true);
        this.outputText(
            "When you break your second kiss, tummy full of Scylla's cream, you find yourself entrapped by her mammoth chest. The stimulation of your nursing seems to have caused her tits to overcompensate, inflating with milk far in excess to what your small stomach could drain. You are literally encased between her breasts, the pliant but firm flesh engulfing everything from your shoulders down in her snug cleavage. You shift uncomfortably for a moment, until you realize not all of your body has shrunk. You shift, no longer able to resist your erection's pressure, and shed your " +
                this.player.armorName +
                ". With your shrunken body's child-like dimensions, " +
                this.sMultiCockDesc() +
                " is virtually as thick as your torso. The weight would knock you flat on your back if Scylla's tits weren't wrapped around you in their tight embrace.  " +
                this.SMultiCockDesc() +
                " strains just under her nose, pulsing at the tightness around you.\n\n",
            false
        );

        this.outputText(
            "Scylla strokes " +
                this.sMultiCockDesc() +
                ' with her palms and cheeks, reveling in the heat of your panting chest between her tits. "<i>We still have to get that nasty poison out of your precious body, little one. Don\'t worry; let Scylla kiss it all better.</i>" She purses her lips and plants kisses from shaft to head, pausing at your crown. Blushing, she lowers her mouth to the shaft again and pokes out her tongue.\n\n',
            false
        );

        this.outputText(
            "Scylla's tongue is as crimson as her lips and moist with the hungry drool in her mouth. She strokes your " +
                this.cockDescript(x) +
                " with her delicately pointed tip, tracing the swell of your cock-head bashfully. She smiles as she opens her mouth broadly and stretches her tongue out further. You've felt it curl around your " +
                this.cockDescript(x) +
                " before, but having not seen it until now, you never appreciated how long it must be to fit all the way around. At its base, the nun's tongue is three inches wide and a serpentine eight inches long. She giggles in delight at the look of shock on your adolescent face. Scylla dips her tongue into her cleavage and draws it up along your " +
                this.multiCockDescriptLight() +
                ", moving in long, slow motions, soft, wet muscle curling around you and drinking in the flavor of your sex. She presses her arms on either side of her love-pillows as she laps at your " +
                this.cockDescript(x) +
                ", and her tits squeeze " +
                this.sMultiCockDesc() +
                " with liquid tightness. Her tongue wraps around your cock, spiraling up and around, corkscrewing your head as the pressure from her mountainous breasts redoubles and squishes the breath from your chest.\n\n",
            false
        );

        this.outputText(
            "You begin to feel light headed from the blood trapped in " +
                this.sMultiCockDesc() +
                " just as she finally releases the squeezing embrace. " +
                this.SMultiCockDesc() +
                " can take no more; your orgasm robs your muscles of control, your whole body shivers against Scylla's chest.  She hungrily coaxes your cum upward with her coiled tongue, and places a dainty kiss on your tip just as it bursts from you. She drinks load after load, yummy noises gurgling from her throat while her tongue laps up the leaking sperm that runs in thick rivulets from her mouth.\n\n",
            false
        );
        // [2+ dicks only] -
        if (this.player.totalCocks() > 1) {
            if (this.player.totalCocks() == 2)
                this.outputText(
                    "Your other cock doesn't have the nun's eager mouth tending to it, but the pressure of her colossal tit fucking coaxes it to cum all the same. Jizz fountains in hot streams of white lust that splatter across the nun's blissful face and into her coal-dark hair. Gobs of it roll across her engorged tits, soaking you in the press of her cleavage as it rolls inward and leaks goopy tendrils that paint her alabaster skin whiter still. She runs her hands over the cum, gathering it between her fingers and massaging it into her flesh, every sensation drunk from the feeling of your sticky orgasm on her body.\n\n",
                    false
                );
            else
                this.outputText(
                    "Your other cocks don't have the nun's eager mouth tending to them, but the pressure of her colossal tit fucking coaxes it to cum all the same. Jizz fountains in hot streams of white lust that splatter across the nun's blissful face and into her coal-dark hair. Gobs of it roll across her engorged tits, soaking you in the press of her cleavage as it rolls inward and leaks goopy tendrils that paint her alabaster skin whiter still. She runs her hands over the cum, gathering it between her fingers and massaging it into her flesh, every sensation drunk from the feeling of your sticky orgasm on her body.\n\n",
                    false
                );
        }
        // [Next]
        this.doNext(this.scyllaPtIVKissPtIII);
    }
    private scyllaPtIVKissPtIII(): void {
        this.scyllaSprite();
        this.hideUpDown();
        this.player.orgasm();
        this.dynStats("lib", 1, "sen", 1);
        this.outputText("", true);
        var x: number = this.player.biggestCockIndex();
        this.outputText(
            "Scrambling up and out of your titty cocoon, you pull your tiny body onto the top of her jiggling mounds. Scylla laughs at the feeling of having you crawl over her body, and watches your progress with amusement as she lazily slurps down your slowing loads. With an expression of ecstatic agony, you buck your hips in an attempt to fuck the nun's face without any leverage. The cum on her body makes your perch slippery, however, and you begin to slide backward before she catches you with sure hands and draws you closer. Each time you thrust, she pulls you a little closer, a few more inches of your " +
                this.cockDescript(x) +
                ' jamming into her mouth. In your state, your strength is nothing next to hers, but she plays along, making surprised gasps and moans as you "ram" yourself deeper. When you get close enough for your short arms to reach her head, you grab onto her palm-sized horn nubs. She gives you complete control of her head as you jerk her back and forth, lips, mouth, and throat sliding along your length.\n\n',
            false
        );

        if (this.player.balls > 0) {
            this.outputText(
                "Scylla's long, winding tongue seeks out your " +
                    this.sackDescript() +
                    " and licks it ravenously, rolling each testicle around to reignite your flagging orgasm. She looks up and meets your eyes. Drinking in your adolescent expression of helpless pleasure, she blushes a vivid pink, shivering in her own orgasm. She can't stop herself from letting her tongue travel up your taint to your " +
                    this.assholeDescript() +
                    ". You gasp in juvenile surprise as she digs her fingers into her nipple lips, masturbating furiously at your cute expression. Without preamble, she thrusts her tongue into your ass and presses against your immature prostate, making you squeak in another helpless orgasm. You pull weakly at her horns and she complies hungrily, swallowing the rest of your " +
                    this.cockDescript(x) +
                    " in one gulp just in time for your renewed balls to flood her throat with your seed. You tremble uncontrollably, eyes clamped shut, sitting atop Scylla's tits with her head buried in your crotch.  Her arms curl around your back, hugging you as she drinks deeply. As the nun's thirst drains you, a cold sensation works its way through your ball sack and down your cock. When it finally bursts into her stomach, you gasp as blazing warmth fills you.\n\n",
                false
            );
            this.outputText(
                "Your " +
                    this.ballsDescriptLight() +
                    " pump out the last of your cum, and Scylla gulps it happily before she puts her hands under each of your arms and pulls you up, " +
                    this.sMultiCockDesc() +
                    " flopping sloppily against her face. She's smiling with puffed-out cheeks when she sets you down gently on the bed and strokes your young face with her fingertips. She winks at you and stoops down to the unconscious imp. She pins his mouth open with her forefinger and thumb, and she purses her bloated lips into a narrow opening. A thick stream of your cum slowly drips down toward the imp Lord's waiting gullet.  In the cum you can see thin streaks of a greenish fluid which you realize must be the venom he'd injected you with!  Indeed, you begin to feel pinpricks along your fingertips and toes as your strength ebbs back into your limbs. As you gradually start to regain your size, the agonizingly long stream of cum from Scylla's mouth reaches the imp's own. He begins to choke as it touches his throat, and Scylla swiftly lunges forward to plant a kiss on the demon, holding his mouth open with hers. The nun's cheeks empty, and the imp swallows in reflex at the flood filling his throat. Scylla breaks the kiss with a loud, wet, \"<i>Muah!</i>\" and grins mischievously at you. The imp coughs and gags, but the cum-coated poison swiftly courses through his system and he shrinks on the spot. He diminishes from four feet down to one, his aura of infernal power broken as his strength is siphoned away. Scylla picks him up like a doll and thrusts him into her cleavage for safe-keeping.  His struggles are so pathetic that they barely make her love-pillows jiggle at all.",
                false
            );
        } else {
            this.outputText(
                "Scylla's long, winding tongue seeks out the base of your shaft and licks it ravenously, pumping your rod to reignite your flagging orgasm. She looks up and meets your eyes. Drinking in your adolescent expression of helpless pleasure, she blushes a vivid pink, shivering in her own orgasm. She can't stop herself from letting her tongue travel up your taint to your " +
                    this.assholeDescript() +
                    ". You gasp in juvenile surprise as she digs her fingers into her nipple lips, masturbating furiously at your cute expression. Without preamble, she thrusts her tongue into your ass and presses against your immature prostate, making you squeak in another helpless orgasm. You pull weakly at her horns and she complies hungrily, swallowing the rest of your " +
                    this.cockDescript(x) +
                    " in one gulp just in time for you to flood her throat with your seed. You tremble uncontrollably, eyes clamped shut, sitting atop Scylla's tits with her head buried in your crotch.  Her arms curl around your back, hugging you as she drinks deeply. As the nun's thirst drains you, a cold sensation works its way through your cock. When it finally bursts into her stomach, you gasp as blazing warmth fills you.\n\n",
                false
            );
            this.outputText(
                "Your loins pump out the last of your cum, and Scylla gulps it happily before she puts her hands under each of your arms and pulls you up, " +
                    this.sMultiCockDesc() +
                    " flopping sloppily against her face. She's smiling with puffed-out cheeks when she sets you down gently on the bed and strokes your young face with her fingertips. She winks at you and stoops down to the unconscious imp. She pins his mouth open with her forefinger and thumb, and she purses her bloated lips into a narrow opening. A thick stream of your cum slowly drips down toward the imp Lord's waiting gullet.  In the cum you can see thin streaks of a greenish fluid which you realize must be the venom he'd injected you with!  Indeed, you begin to feel pinpricks along your fingertips and toes as your strength ebbs back into your limbs. As you gradually start to regain your size, the agonizingly long stream of cum from Scylla's mouth reaches the imp's own. He begins to choke as it touches his throat, and Scylla swiftly lunges forward to plant a kiss on the demon, holding his mouth open with hers. The nun's cheeks empty, and the imp swallows in reflex at the flood filling his throat. Scylla breaks the kiss with a loud, wet, \"<i>Muah!</i>\" and grins mischievously at you. The imp coughs and gags, but the cum-coated poison swiftly courses through his system and he shrinks on the spot. He diminishes from four feet down to one, his aura of infernal power broken as his strength is siphoned away. Scylla picks him up like a doll and thrusts him into her cleavage for safe-keeping.  His struggles are so pathetic that they barely make her love-pillows jiggle at all.",
                false
            );
        }
        // Epilogue
        this.doNext(this.scyllaPtIVEpilogue);
    }

    private scyllaPtIVEpilogue(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(
            "You thank Scylla for everything and prepare to head back to Tel'Adre. The Wet Bitch has a long-delayed second drink with your name on it. As you're leaving, Scylla pats the imp Lord's head, still sticking out of her vice-like cleavage. \"<i>I think I will keep you around,</i>\" she muses, \"<i>To give you a chance to atone for your wicked ways. We'll have to keep you from scaring people, though. Maybe stick you in a fluffy teddy bear?</i>\" You shake your head and leave the imp Lord to the nun's tender mercies.",
            false
        );
        this.doNext(this.camp.returnToCampUseFourHours);
    }

    // Scylla- Addicts Anonymous (repeatable)
    public scyllaAdictsAnonV(): void {
        this.scyllaSprite();
        this.doNext(this.camp.returnToCampUseOneHour);
        if (this.flags[kFLAGS.TIMES_MET_SCYLLA_IN_ADDICTION_GROUP] == 0) this.scyllaPtVFirstTime();
        else this.scyllaPtVRepeat();
        // Set scylla progression if not set yet!
        if (this.flags[kFLAGS.NUMBER_OF_TIMES_MET_SCYLLA] < 5)
            this.flags[kFLAGS.NUMBER_OF_TIMES_MET_SCYLLA] = 5;
    }
    // [Nun]
    private scyllaPtVFirstTime(): void {
        this.scyllaSprite();
        // (First time)
        this.outputText("", true);
        this.outputText(this.images.showImage("scylla-help-round-five-firt-time"), false);
        this.outputText(
            "You spot Scylla across the common room of the Wet Bitch, but she seems preoccupied. The nun is fetching a tray of assorted drinks and shots from the bar, which strikes you as strange since you haven't seen her order anything here that wasn't drowned in milk and cream. You slink back into the crowd and keep a curious eye on her. After marshalling the drinks, she hefts the tray and very carefully takes it upstairs.  She bumps one of the doors open with her plump butt and walks inside, before giving the door another rump bump to close it.  You quickly creep forward and hook a finger into the frame, keeping the door open an inch.\n\n",
            false
        );

        this.outputText(
            "Peering through the crack, you see the nun place the drinks on a modest table and take a seat, folding her hands neatly under her gargantuan chest with a prim, little smile. Joining her around the table are two other women, of considerably smaller stature. One, a goblin girl, slouches in her chair with one leg hung over an armrest, propping her head on her palm as she picks at her teeth with a small wooden stick. Her expression is one of intense boredom and she regards her hostess with a contemptuous glance before she grabs a mug of ale and chugs it. She's dressed modestly for a goblin, in oiled leather plates that conceal most of her green skin. She has no helm, however, to cover her bright red, braided hair or her tiny, pug nose. There's no sign of the usual assortment of potions and drugs most goblins seem to carry.\n\n",
            false
        );

        this.outputText(
            "You almost don't notice the third girl until what you'd assumed to be a very finely crafted salt shaker moves across the table. It's a fairy, robed in crystal that sparkles on her pale skin like morning dew. Her movements, however, are leaden, her gossamer wings drag limply behind her. She stumbles to a shot glass, and with one hand rubbing her temple, she leans down to takes a drink from a glass larger than her head. She groans and plops down, rubbing her eyes regretfully.\n\n",
            false
        );

        this.outputText(
            "Scylla's soft enthusiasm seems unfazed by her companions' dour attitudes. She takes a creamy liquor and sips it before starting. \"<i>I'm so very glad everyone could make it today. I am excited to begin, but perhaps it would be best to do some introductions? If it's all right with everyone, I will go first.  My name is Scylla and I am a nun in the service of the gods. I grew up very far away, but I live in Tel'Adre now, between my missionary expeditions.</i>\" She nods at the fairy and smiles so wide that she actually squeaks.\n\n",
            false
        );

        this.outputText(
            "The fairy shakes her head slowly and rubs a spot between her eyes. \"<i>Not so loud. My name's... ugh... Pastie. I'm from the forest and I really need to be sleeping off this hangover,</i>\" she mutters, her voice thin and high, like wind across reeds.\n\n",
            false
        );

        this.outputText(
            "Scylla turns her gaze to the goblin, who snorts and begins chewing on her toothpick. \"<i>What's it matter what my name is, I'm always just gonna be one of 'Tamani's daughters,' the dumb slut.</i>\" Her small, pointed nose makes the goblin's voice nasally and her habit of talking through sharp teeth gives her a coarse accent.\n\n",
            false
        );

        this.outputText(
            "The nun puts a hand over her bulbous lips. \"<i>Oh dear, please don't speak of your mother that way! I am sure she loves you very much. We care deeply about you here; this is a safe place.  Won't you please share your name with the group?</i>\" She leans forward, her eyelids fluttering hopefully.\n\n",
            false
        );

        this.outputText(
            "\"<i>Bleh, enough with tha 'sisterhood' crap,</i>\" the goblin responds, waving a hand dismissively in front of Scylla's face. \"<i>Fine, ya fat tub, I'm Abylon. But call me Abby or I'm outta here.</i>\" She kicks the air with her suspended leg and grabs another beer.",
            false
        );

        this.doNext(this.scyllaPtVFirstTimeII);
    }
    // [Next]
    private scyllaPtVFirstTimeII(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(this.images.showImage("scylla-help-round-five-firt-time-pt-two"), false);
        this.outputText(
            '"<i>Thank you ever so much, Abby,</i>" the nun says happily, ignoring the insult. "<i>Now, to begin the healing.</i>" She takes a deep breath that sends her chest heaving. "<i>I... am an addict.</i>" The confession makes Abby roll her eyes and sends Pastie into shivers, but she presses on. "<i>Since my escape from a demon lair, I have had a powerful thirst that even prayers have not slaked. It has changed my body and made me treat my friends in very disrespectful ways.</i>" She blushes as she tries to describe her actions and her voice drops so low that she looks like she\'s trying to whisper to her own shadow.\n\n',
            false
        );

        this.outputText(
            "\"<i>I guess I'll go next,</i>\" Pastie sighs once it's clear Scylla is going to need a moment to gather herself. She leans back and lies flat on the table, wings splayed at her sides. \"<i>I'm an addict, I guess. Human goo... sex stuff... make me kinda funny. It wasn't too bad in the beginning, but somewhere along the line, randomly stumbling upon visitors turned into hunting for 'em. I'd wake up, whole days lost, shivering from withdraw and all I could think of was finding my next hit. At first, it was just ladies, but eventually I degraded myself with herms and then even guys, with their icky man-parts! Anything for one more fix.</i>\" She closes her eyes, remembering some past humiliation and groans.\n\n",
            false
        );

        this.outputText(
            "Abylon hucks a glass over her shoulder, letting it shatter against the wall. \"<i>You jerks have problems. I ain't got problems,</i>\" she argues, anger making her accent even coarser. \"<i>Sister Suck-A-Lot an' Baby Can't-Hold-Her-Drink, a fine pair you two,</i>\" she taunts, leaning forward, a bead of sweat running down her forehead as she winds up. \"<i>Yeah, so my mom's a slut and my sisters are just like her, so what? That ain't me. I don't need dat junk!</i>\" she protests, rubbing her legs together under their leather wrappings. \"<i>So there were a couple boys here and there, that's normal! Who says it ain't? It feels good inside me, but that don't make me a baby-crazy bimbo like Mom! I can stop any time I want!</i>\" Scylla nods, sympathetic to the outburst, but Pastie rocks back and forth in agony at the noise and dunks her head in the shot glass, swallowing as fast as she can.\n\n",
            false
        );

        this.outputText(
            '"<i>We all have challenges,</i>" Scylla offers, when Abby falls quiet, the goblin panting and wiping sweat from her emerald neck with her tight, crimson braid. "<i>Victories aren\'t always going to be clear cut, but little steps in the right direction are what count. Whether that means turning seven days of drinking into six, or even just accepting that you\'re not as in control of your body as you want to be. The desire to retake some portion of yourself is the first step to recovery.</i>" She looks away, sadly touching the demon horns hidden under her habit.\n\n',
            false
        );

        this.outputText(
            "You feel a little shitty about spying on the three as they shared their weaknesses and you think it might be best to walk away from this one. Or, you could admit to your spying and share your own struggles with addiction. Another, darker part of you thinks that these girls seem awfully vulnerable right about now. What will you do?  Will you share, take advantage, or leave them in peace?",
            false
        );
        // [Share] [Take Advantage] [Leave]
        this.simpleChoices(
            "Share",
            this.scyllaPtVShare,
            "Advantage",
            this.scyllaPtVTakeAdvantage,
            "",
            undefined,
            "",
            undefined,
            "Leave",
            this.scyllaPtVLeave
        );
    }
    // [Nun]	(Repeat)
    private scyllaPtVRepeat(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(
            "Scylla's at the bar, filling up another large tray of drinks. Judging by how many she's got, you assume she's giving the addiction counseling meeting another shot. The nun is murmuring to herself, possibly rehearsing a sermon or maybe just working up the strength to be the pillar the other girls need. She heads upstairs and you ponder what to do as you watch her go. Will you join them?\n\n",
            false
        );
        // [Share][Take Advantage][Leave]
        this.simpleChoices(
            "Share",
            this.scyllaPtVShare,
            "Advantage",
            this.scyllaPtVTakeAdvantage,
            "",
            undefined,
            "",
            undefined,
            "Leave",
            this.scyllaPtVLeave
        );
    }
    // [Leave]	(First time and Repeat)
    private scyllaPtVLeave(): void {
        this.scyllaSprite();
        this.flags[kFLAGS.TIMES_MET_SCYLLA_IN_ADDICTION_GROUP]++;
        this.outputText("", true);
        // [Lust down]
        this.dynStats("lus", -10);
        if (this.player.cor > 30) this.dynStats("cor", -1);
        this.outputText(
            "You just don't feel right about interrupting and opt to take the high road, leaving them to their counseling. Nearly-forgotten warmth fills your chest and you smile with pride, despite yourself. You came here as a Champion to purge corruption and- despite every temptation- you acted like a good friend ought to. You walk back downstairs, with your head held high, and order a drink.",
            false
        );
        this.cheatTime(1);
        this.doNext(this.telAdre.barTelAdre);
    }

    // [Take Advantage]	(First time and Repeat)
    private scyllaPtVTakeAdvantage(): void {
        this.scyllaSprite();
        if (
            this.player.findStatusAffect(StatusAffects.Exgartuan) >= 0 &&
            this.player.statusAffectv2(StatusAffects.Exgartuan) == 0
        ) {
            this.flags[kFLAGS.TIMES_MET_SCYLLA_IN_ADDICTION_GROUP]++;
            this.flags[kFLAGS.TIMES_SCYLLA_ADDICT_GROUP_EXPLOITED]++;
            this.scyllaVTakeAdvantageWithExgartuan();
            return;
        }
        if (this.player.totalCocks() >= 3) {
            this.flags[kFLAGS.TIMES_MET_SCYLLA_IN_ADDICTION_GROUP]++;
            this.flags[kFLAGS.TIMES_SCYLLA_ADDICT_GROUP_EXPLOITED]++;
            this.addictionAdvantageMultiDickGreatTimeParty();
            return;
        }
        this.flags[kFLAGS.TIMES_MET_SCYLLA_IN_ADDICTION_GROUP]++;
        this.flags[kFLAGS.TIMES_SCYLLA_ADDICT_GROUP_EXPLOITED]++;
        this.outputText("", true);
        this.outputText(this.images.showImage("scylla-help-round-five-take-advantage"), false);
        // [Corruption up]
        this.dynStats("cor", 1);
        if (this.player.cor < 30) this.dynStats("cor", 2);
        if (this.player.cor < 60) this.dynStats("cor", 1);

        var x: number = this.player.biggestCockIndex();

        this.outputText(
            "You decide this is too good to pass up, so you step away and duck into an empty room. You whip out your " +
                this.cockDescript(x) +
                " and begin masturbating, careful to stop before you cum. You take a dollop of pre from the tip and dab it behind your ears, to make sure the musky scent will be obvious. Then, you slip back into your clothes and adjust your package to make the bulge unmistakable. Suitably prepared, you go to the ladies' door and knock crisply.\n\n",
            false
        );

        if (this.player.balls > 0) {
            this.outputText(
                'Scylla opens the door curiously and smiles when she sees you. "<i>Oh, ' +
                    this.player.short +
                    ", what a pleasant surprise! I'm sorry, but do you mind waiting a bit? I'd love to talk with you, but I'm in the middle of a... the middle of...</i>\" she trails off, the smell of your pre-cum floating into her nostrils and starting to shut off the nun's higher brain functions. Her eyes drop to your crotch and her stomach rumbles loudly as she stares at the outline of your " +
                    this.cockDescript(x) +
                    "  and " +
                    this.ballsDescriptLight() +
                    '. You grin and gently push her backwards, stepping into the room. Scylla follows after like a lost puppy, licking her lips without realizing it. "<i>This... um, this is ' +
                    this.player.short +
                    ', a friend of, uh, mine,</i>" she explains, stumbling through the introduction. Abylon regards you distrustfully but she bites her lips and rubs her legs together through her armor when your musk hits her. Pastie is too drunk to notice the sudden pressure in the room.\n\n',
                false
            );
            this.outputText(
                "No sense in playing coy when you're the drug in a room full of addicts. You brazenly whip out your " +
                    this.cockDescript(x) +
                    ' and spread your arms. "<i>Ladies,</i>" you grin, in invitation. The nun shakes her head, trying to clear her mind and failing, giggling involuntarily. The goblin trembles, her fists balled into pale knuckles, but then she slumps, defeated.  "<i>Can\'t fight nature,</i>" she grumbles, weakly. "<i>Like mother, like daughter.</i>" Pastie hiccups, trying to figure out what\'s happening.\n\n',
                false
            );
            this.outputText(
                "Scylla reaches out for your shaft and wraps long, thin fingers around it, almost worshipfully. This provokes an indignant cry from Abby, who crosses the distance between you faster than you would've believed. \"<i>Hands off, ya big bitch. That's my baby-batter.</i>\" She grabs your " +
                    this.ballsDescriptLight() +
                    " possessively, a little harder than you'd like. \"<i>You'll just waste it in yer fat mouth anyway. Dumb humans don't even know where ta take a cream pie- it's amazin' ya ever get knocked up!</i>\"\n\n",
                false
            );
            this.outputText(
                '"<i>You don\'t understand, I need this,</i>" the nun pleads, her hands tightening on your cock, nails starting to dig in as she jerks you, groin-first closer to her. "<i>You can have some after, I promise, but I need it in my mouth. I\'m just... so... hungry.</i>" Under her robes, her nipples bulge, lip-shaped against the black velvet.\n\n',
                false
            );
            this.outputText(
                "\"<i>Like fuck yer goin' first,</i>\" Abby shoots back, her grip on your balls so painful now that you hiss through your teeth. The goblin grabs a beer bottle and smashes it on the table, brandishing it at Scylla. \"<i>Go ahead, cunt, put those bimbo cock-sucking lips on my baby-daddy's dick. See what happens.</i>\" The jagged glass is perilously close to your shaft, and you don't dare to move while the two have a tug of war with your junk. Maybe this wasn't the best idea you've ever had.\n\n",
                false
            );
            this.outputText(
                "Pastie finally figures out what's going on through her stupor and flies between the three of you, settling atop your " +
                    this.cockDescript(x) +
                    ", tiny stiletto heels digging into soft flesh like pins. \"<i>Don't fight, you two, this thing's gross,</i>\" she argues. Pouting, she stomps her foot down and the heel punches into your cockhead, drawing a scream from you that only makes Scylla and Abby tug all the harder.\n\n",
                false
            );
            this.outputText(
                '"<i>Abylon, please,</i>" Scylla starts, but the use of her given name infuriates the goblin girl, and she hurls the broken bottle at the nun, who ducks. It shatters on the wall, sending glass shards flying, several of them cutting your cock and giving you a half-dozen scrapes. The goblin releases your scrotum and dives at the nun, snarling. They roll in a tangled cat fight, leather and cloth shredding under addiction-fueled claws. You swat Pastie from your dick and run out of the room, gingerly tending to your tormented groin.\n\n',
                false
            );
        } else {
            this.outputText(
                'Scylla opens the door curiously and smiles when she sees you. "<i>Oh, ' +
                    this.player.short +
                    ", what a pleasant surprise! I'm sorry, but do you mind waiting a bit? I'd love to talk with you, but I'm in the middle of a... the middle of...</i>\" she trails off, the smell of your pre-cum floating into her nostrils and starting to shut off the nun's higher brain functions. Her eyes drop to your crotch and her stomach rumbles loudly as she stares at the outline of your " +
                    this.cockDescript(x) +
                    '. You grin and gently push her backwards, stepping into the room. Scylla follows after like a lost puppy, licking her lips without realizing it. "<i>This... um, this is ' +
                    this.player.short +
                    ', a friend of, uh, mine,</i>" she explains, stumbling through the introduction. Abylon regards you distrustfully but she bites her lips and rubs her legs together through her armor when your musk hits her. Pastie is too drunk to notice the sudden pressure in the room.\n\n',
                false
            );
            this.outputText(
                "No sense in playing coy when you're the drug in a room full of addicts. You brazenly whip out your " +
                    this.cockDescript(x) +
                    ' and spread your arms. "<i>Ladies,</i>" you grin, in invitation. The nun shakes her head, trying to clear her mind and failing, giggling involuntarily. The goblin trembles, her fists balled into pale knuckles, but then she slumps, defeated.  "<i>Can\'t fight nature,</i>" she grumbles, weakly. "<i>Like mother, like daughter.</i>" Pastie hiccups, trying to figure out what\'s happening.\n\n',
                false
            );
            this.outputText(
                "Scylla reaches out for your shaft almost worshipfully with her long, thin fingers. This provokes an indignant cry from Abby, who crosses the distance between you faster than you would've believed. \"<i>Hands off, ya big bitch. That's my baby-batter.</i>\" She grabs your " +
                    this.cockDescript(x) +
                    " possessively, a little harder than you'd like. \"<i>You'll just waste it in yer fat mouth anyway. Dumb humans don't even know where ta take a cream pie- it's amazin' ya ever get knocked up!</i>\"\n\n",
                false
            );
            this.outputText(
                '"<i>You don\'t understand, I need this,</i>" the nun pleads, her hands tightening on your cock, nails starting to dig in as she jerks you, groin-first closer to her. "<i>You can have some after, I promise, but I need it in my mouth. I\'m just... so... hungry.</i>" Under her robes, her nipples bulge, lip-shaped against the black velvet.\n\n',
                false
            );
            this.outputText(
                "\"<i>Like fuck yer goin' first,</i>\" Abby shoots back, her grip on your base so painful now that you hiss through your teeth. The goblin grabs a beer bottle and smashes it on the table, brandishing it at Scylla. \"<i>Go ahead, cunt, put those bimbo cock-sucking lips on my baby-daddy's dick. See what happens.</i>\" The jagged glass is perilously close to your shaft, and you don't dare to move while the two have a tug of war with your junk. Maybe this wasn't the best idea you've ever had.\n\n",
                false
            );
            this.outputText(
                "Pastie finally figures out what's going on through her stupor and flies between the three of you, settling atop your " +
                    this.cockDescript(x) +
                    ", tiny stiletto heels digging into soft flesh like pins. \"<i>Don't fight, you two, this thing's gross,</i>\" she argues. Pouting, she stomps her foot down and the heel punches into your cockhead, drawing a scream from you that only makes Scylla and Abby tug all the harder.\n\n",
                false
            );
            this.outputText(
                '"<i>Abylon, please,</i>" Scylla starts, but the use of her given name infuriates the goblin girl, and she hurls the broken bottle at the nun, who ducks. It shatters on the wall, sending glass shards flying, several of them cutting your cock and giving you a half-dozen scrapes. The goblin releases your member and dives at the nun, snarling. They roll in a tangled cat fight, leather and cloth shredding under addiction-fueled claws. You swat Pastie from your dick and run out of the room, gingerly tending to your tormented groin.\n\n',
                false
            );
        }
        this.player.takeDamage(1);
        this.dynStats("lus", -99);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [Take Advantage] (With Exgartuan)
    private scyllaVTakeAdvantageWithExgartuan(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(
            this.images.showImage("scylla-help-round-five-take-advantage-with-exgartuan-one"),
            false
        );
        this.outputText(
            "You put your hand on the doorknob, ready to give the ladies what they so dearly desire when an all-too familiar voice echoes in your head. \"<i>Well, it's about damn time you're finally taking a little initiative. I'm even going to help you out on this one! You and me, bud, the perfect team!</i>\" You groan and begin to step away, rather than indulge the obnoxious demon, but the girls inside have apparently heard his voice because the door opens up and three curious faces fill the doorway. Scylla is pleased to see you, but seems confused, looking around for the source of the other voice. You step inside and close the door behind you, mentally instructing Exgartuan to just stay out of this, but the demon in your body makes no response. Scylla introduces you to her companions and suggests the four of you take a seat to explain the purpose of this meeting.\n\n",
            false
        );
        // [Player has fewer than three dicks:
        if (this.player.cockTotal() < 3) {
            this.outputText(
                'Exgartuan is having none of it. "<i>Damn, that\'s a mouthy bitch!</i>" your dick exclaims, startling the girls around you. "<i>Three, though, not bad! Whoops, looks like you\'re missing some hardware for this little jam. Don\'t worry, though. You may only have one of me, but everybody gets a dance partner.</i>" Your legs feel weak and it\'s all you can do to whip off your clothes before your infernal-infested prick bulges out obscenely, swelling to full size in seconds, stealing the blood from your brain to fuel its growth. You wobble a bit, shaking your head to regain your balance, but the fiend in your flesh isn\'t done. The tip of your cock flares and your urethra widens, like a mouth yawning. There is a sickening slurping noise and a bizarre, icy numbness floods your groin. You blink rapidly, trying to clear the wooziness from your eyes and when clarity finally returns, Exgartuan has transformed your titanic fuckshaft into three nearly as huge cocks, joined at the base by a fleshy sheath.  "<i>You would not believe how much that hurts,</i>" he quips happily, "<i>so don\'t get used to it, I\'m going right back to normal after this is over. Now, get to fucking, ya stud!</i>"\n\n',
                false
            );
        }
        // [Player has three or more dicks:
        else {
            this.outputText(
                'Exgartuan is having none of it. "<i>Damn, that\'s a mouthy bitch!</i>" your dick exclaims, startling the girls around you. "<i>Three, though, not bad! Don\'t worry, about performance anxiety, I got this one.</i>" Your legs feel weak and it\'s all you can do to whip off your clothes before your infernal-infested cocks bulge out obscenely, swelling to full size in seconds, vision receding as the erections steal the blood from your head to fuel their growth. The nest of swarming cocks nearly blocks your sight as you regain control of your boner-blinded eyes. "<i>Now, get to fucking, ya stud!</i>"\n\n',
                false
            );
        }

        this.outputText(
            "The girls stare at you blankly, not really sure what they're seeing. You know that if you don't make a move, the demon is just going to keep doing it for you, so you sigh and spread your arms and shrug. \"<i>Ladies,</i>\" you nod, by way of invitation. The nun shakes her head, trying to dismiss the unclean thoughts flooding through her and failing miserably. She giggles involuntarily, clapping a hand over her mouth in embarrassment. The goblin trembles, her fists balled into pale knuckles, but then she slumps, defeated.  \"<i>Damn it, my mom put you up to this, didn't she? Talking dicks? She just can't get grandchildren fast enough,</i>\" she grumbles, unable to conceal her burgeoning lust under her thick, leather armor. Pastie hiccups, trying to figure out what's happening.\n\n",
            false
        );
        this.dynStats("lus", 5);
        // [Next]
        this.doNext(this.scyllaVTakeAdvantageWithExgartuan2);
    }
    private scyllaVTakeAdvantageWithExgartuan2(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(
            this.images.showImage("scylla-help-round-five-take-advantage-with-exgartuan-two"),
            false
        );
        this.outputText(
            'Abby makes the first move, walking up to your crotch and lifting her arms up to seize one of your shafts, her tiny green hands dwarfed by your girth. She pulls it down and begins walking away, running her hands over your pulsing member, keeping it at head-level until she reaches the tip, several paces away. "<i>Let\'s get this over with,</i>" she complains, her voice catching in her throat when her mouth begins to water. She swallows and loosens the straps holding the oiled leather bands around her waist, slipping out of the bottom half of her protective armor. Without bothering to remove the top half, she spreads her knees, revealing a fiery red tuft of hair above her slit and the puffy, neglected lips of her pussy, already swollen in anticipation. She turns around and bends over, presenting her ass to you, still clinging to the reluctant act as she tries to guide one of your profanely-engorged poles into her emerald box. Her lack of experience makes it a difficult task, however, and she bats your cockhead against her jiggling ass and against her stout thighs. You decide to help the poor girl out and when you feel yourself braced against a hole, you give a little thrust, your cockhead surrounded by clenching tightness. Abby gasps and pants for breath. "<i>That\'s not the one I wanted!</i>" Exgartuan whines.  "<i>I don\'t mean to be an ass, butt this place is a hole!</i>"\n\n',
            false
        );

        this.outputText(
            "Scylla succumbs next, the large nun moving toward your nest of unclaimed cocks almost reverently, licking her lips, fingernails massaging the bulges her nipples make under her robe. \"<i>Yeah, virgin time,</i>\" your demon whispers into your mind, its voice greasy as you feel her body's radiant heat pouring against your trembling shafts. Her eyelids droop heavily over languid, sapphire eyes and she pulls the habit from her head, letting long coils of ebony hair spill all around her. With trembling fingers, she strokes the curving swell of your dick all the way down to your sheath, fingertips lingering at the base, thumbs stroking the pulsing veins that line your cock's surface. She gives you the smallest of ruby smiles before wordlessly drawing your head into her mouth, lapping wetness drooling down your cockhead and lubricating your length. Her bimbo-thick lips wrap around your massive member and suck with a need that surprises even your inner infernal. \"<i>The fuck? This cunt got a pussy under her nose? Did a blind imp play 'Pin the Organ on the Nun'? She hiding nipples between her legs or something?</i>\"\n\n",
            false
        );

        this.outputText(
            "Pastie has taken an intoxicated assessment of your nightmarish proportions and an absurd expression of resolution settles on the little lush's face. She nods slowly to herself and points at your unclaimed mast. \"<i>I'mma climb you,</i>\" she declares in defiance, addressing your mountainous cock directly. The diamond-robed fairy flutters to your groin and lands inside the trembling sheath housing your erections, kicking off her tiny high heels to give her legs a better grip. With drunk strength, the tiny creature wraps her lithe arms and legs around your shaft, hands gripping a throbbing vein as she hauls herself upward, entirely focused on reaching your summit. Her full bodied struggle up your varicose foothills squeeze tighter than you'd expect and the sensation of all those tiny limbs writhing over your flesh is enough to make you take a seat on your ass. \"<i>Don't forget to plant your flag in her when she gets to the top,</i>\" Exgartuan whispers to you, laughing hysterically at the fairy's mission.\n\n",
            false
        );

        if (this.player.balls > 0)
            this.outputText(
                "All three girls adequately attached, the fiend decides now would be a good time to get your balls working. Your groin floods with liquid warmth and your scrotum begins to expand, your body preparing an orgasm that, frankly, promises to be terrifying. You have to puff to catch your breath as your heart races and your ballsack bloats like two watermelons between your legs. Dollops of your pre-cum roll up your urethras like gooey appetizers. Abby's ass clenches and she loses her balance when your hot cream bubbles up into her booty. The slimy seed gives you some much needed lubrication and the goblin girl ends up stumbling backward, sliding another foot of your cock into her nethers. Scylla tastes the salty jizz a moment later and her horns begin to grow as she wraps her tongue around your cockhead, greedily milking you for more. Dissatisfied by the baseball-sized globs of pre-cum leaking down your shaft, she braces herself, and begins feeding your cock down her throat, inch by inch, slowly and deliberately, letting you feel every bit of her pussy-tight mouth and sphincter-tight neck. It's almost as if the two girls are in a race to reach your balls; ass-first versus head-first. Pastie, meanwhile, has nearly reached the swollen mid-point of your wobbling cock mountain when your pre begins to roll out of your head and wash down toward her, like sticky avalanches of seething spunk. She scrambles around your shaft to avoid the syrupy shower that threatens to wash her back down into your sheath, her nubile body stroking your cock in a way that you just can't put into words. The fairy's full-body climb has the expertly tight manipulation of a hand job mixed with the creamy softness of a tit-fuck and it's all you can do to keep from grabbing her diminutive form and using her like a beer-bloated onahole.\n\n",
                false
            );
        else
            this.outputText(
                "All three girls adequately attached, the fiend decides now would be a good time to get your cum flowing. Your groin floods with liquid warmth and your shaft begins to expand, your body preparing an orgasm that, frankly, promises to be terrifying. You have to puff to catch your breath as your heart races. Dollops of your pre-cum roll up your urethras like gooey appetizers. Abby's ass clenches and she loses her balance when your hot cream bubbles up into her booty. The slimy seed gives you some much needed lubrication and the goblin girl ends up stumbling backward, sliding another foot of your cock into her nethers. Scylla tastes the salty jizz a moment later and her horns begin to grow as she wraps her tongue around your cockhead, greedily milking you for more. Dissatisfied by the baseball-sized globs of pre-cum leaking down your shaft, she braces herself, and begins feeding your cock down her throat, inch by inch, slowly and deliberately, letting you feel every bit of her pussy-tight mouth and sphincter-tight neck. It's almost as if the two girls are in a race to reach your groin; ass-first versus head-first. Pastie, meanwhile, has nearly reached the swollen mid-point of your wobbling cock mountain when your pre begins to roll out of your head and wash down toward her, like sticky avalanches of seething spunk. She scrambles around your shaft to avoid the syrupy shower that threatens to wash her back down into your sheath, her nubile, body stroking your cock in a way that you just can't put into words. The fairy's full-body climb has the expertly tight manipulation of a hand job mixed with the creamy softness of a tit-fuck and it's all you can do to keep from grabbing her diminutive form and using her like a beer-bloated onahole.\n\n",
                false
            );
        // [Next]
        this.dynStats("lus=", 100);
        this.doNext(this.scyllaVTakeAdvantageWithExgartuan3);
    }
    private scyllaVTakeAdvantageWithExgartuan3(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(
            this.images.showImage("scylla-help-round-five-take-advantage-with-exgartuan-three"),
            false
        );
        if (this.player.balls > 0) {
            this.outputText(
                "You try to slow your breathing, to hold back the dark abyss of your groin's insistent crescendo, but Exgartuan's voice breaks your concentration. \"<i>I'm damn proud of you,</i>\" he congratulates, fierce pride in his voice. \"<i>Better find something to hold on to- this is going to be a rough one.</i>\" You can feel the pressure in your abdomen surge and you know the demon's not just bragging. Abby has wriggled her plump, apple-bottomed ass far enough down your cock that it feels like it's snaked clear through her large intestine. Scylla's a little further down and while you can't see much below your dick, you have to think her jaw must've unhinged to let her swallow this much. Thankfully, both girls are within arm's reach. Abby's hands are pulling her cheeks apart to feed your shaft into her distended bowls, and you grab her wrists, jerking her arms behind her. Scylla's horns have wrapped entirely around her ears and you seize the warm bone like a handlebar. You shiver, half in ecstasy and half in fear. The fairy girl finally scrambles up your cockhead and plants herself at the crest of your third dick in triumph. She straddles your urethra like a saddle, her tight fairy cunt dripping excitedly. \"<i>I'm queen of th' world!</i>\" she hoots, drunkenly. \"<i>I own this dick! It's my bitch!</i>\"\n\n",
                false
            );
            this.outputText(
                "The fairy's grinding ride of your over-teased cock is just too much to hold out any longer. A liquid gurgle rumbles from your testicles and the base of your shafts bloat outward, as your load is funneled down three passages. You bite your tongue and your mouth fills with blood, your legs uselessly trembling. You reflexively pull back on your handholds, dragging two of the girls into even deeper penetration. Abby cries out, mad with pain and pleasure, but Scylla just coos, her throat vibrating as her mouth runs over with the drool of anticipation. The impaled girls' tightness slows the cum rushing into them, but no such pressure stops the geyser underneath Pastie. Her victorious straddle changes to shocked, desperate clutching as her saddle erupts between her legs, blasting cum into her ass and pussy, filling the fairy like a diamond-colored condom in a second and bloating her well beyond capacity in the next second, her whole body stuffed with your spunk in the blink of an eye. Your orgasm crumples the last vestige of your restraint and you release your clenching muscles restraining your ejaculate. Cum blasts up all around Pastie and for a moment, you think the tiny girl has been blown right off of your dick, but when your cum recedes for the next load, you see the fairy has merely been completely drenched in your alabaster spunk, head to toe, little more than a writhing glop of jizz clinging for dear life to your dilating cockmouth.\n\n",
                false
            );
            this.outputText(
                "The pressure in your swollen balls forces the other two thirds of your cum past the clenching holes sucking at your dicks and into the girls' magma-hot bodies with a pulsing force that makes you rock your hips, helplessly pinned down. Abby's fingers go wide and claw wildly to break free of your grip, but the split goblin has even less strength than you, and her abdomen stretches even further, like she's giving birth in reverse. She keeps shouting out \"<i>whore!</i>\" but you're not sure if she's cursing her mother or describing herself, as she bucks her hips against your pumping fuckhose. The nun has torn holes in the front of her dress and is pumping four of her fingers into each nipple-mouth, masturbating furiously as your swollen rod blasts its long-awaited meal past her tongue's stroking coils, through her windpipe's sucking grip, and into her famished stomach. As it hits home, she jams both fists into her nipples and fucks her chest with both arms, swollen lips gurgling and drooling like a nursing cow. The weight on your cocks builds as you fill both girls with your silken seed, bloating their bodies and bathing their stomachs with your demon-blessed spunk.\n\n",
                false
            );
        } else {
            this.outputText(
                "You try to slow your breathing, to hold back the dark abyss of your groin's insistent crescendo but Exgartuan's voice breaks your concentration. \"<i>I'm damn proud of you,</i>\" he congratulates, fierce pride in his voice. \"<i>Better find something to hold on to- this is going to be a rough one.</i>\" You can feel the pressure in your abdomen surge and you know the demon's not just bragging. Abby has wriggled her plump, apple-bottomed ass far enough down your cock that it feels like it's snaked clear through her large intestine. Scylla's a little further down and while you can't see much below your dick, you have to think her jaw must've unhinged to let her swallow this much. Thankfully, both girls are within arm's reach. Abby's hands are pulling her cheeks apart to feed your shaft into her distended bowls and you grab her wrists, jerking her arms behind her. Scylla's horns have wrapped entirely around her ears and you seize the warm bone like a handlebar. You shiver, half in ecstasy and half in fear. The fairy girl finally scrambles up your cockhead and plants herself at the crest of your third dick in triumph. She straddles your urethra like a saddle, her tight fairy cunt dripping excitedly. \"<i>I'm queen of th' world!</i>\" she hoots, drunkenly. \"<i>I own this dick! It's my bitch!</i>\"\n\n",
                false
            );
            this.outputText(
                "The fairy's grinding ride of your over-teased cock is just too much to hold out any longer. A liquid gurgle rumbles from your abdomen and the base of your shafts bloat outward, as your load is funneled down three passages. You bite your tongue and your mouth fills with blood, your legs uselessly trembling. You reflexively pull back on your handholds, dragging two of the girls into even deeper penetration. Abby cries out, mad with pain and pleasure, but Scylla just coos, her throat vibrating as her mouth runs over with the drool of anticipation. The impaled girls' tightness slows the cum rushing into them, but no such pressure stops the geyser underneath Pastie. Her victorious straddle changes to shocked, desperate clutching as her saddle erupts between her legs, blasting cum into her ass and pussy, filling the fairy like a diamond-colored condom in a second and bloating her well beyond capacity in the next second, her whole body stuffed with your spunk in the blink of an eye. Your orgasm crumples the last vestige of your restraint and you release your clenching muscles restraining your ejaculate. Cum blasts up, all around Pastie and for a moment, you think the tiny girl has been blown right off of your dick, but when your cum recedes for the next load, you see the fairy has merely been completely drenched in your alabaster spunk, head to toe, little more than a writhing glop of jizz clinging for dear life to your dilating cockmouth.\n\n",
                false
            );
            this.outputText(
                "The pressure in your abdomen forces the other two thirds of your cum past the clenching holes sucking at your dicks and into the girls' magma-hot bodies with a pulsing force that makes you rock your hips, helplessly pinned down. Abby's fingers go wide and claw wildly to break free of your grip, but the split goblin has even less strength than you, and her abdomen stretches even further, like she's giving birth in reverse. She keeps shouting out \"<i>whore!</i>\" but you're not sure if she's cursing her mother or describing herself, as she bucks her hips against your pumping fuckhose. The nun has torn holes in the front of her dress and is pumping four of her fingers into each nipple-mouth, masturbating furiously as your swollen rod blasts its long-awaited meal past her tongue's stroking coils, through her windpipe's sucking grip, and into her famished stomach. As it hits home, she jams both fists into her nipples and fucks her chest with both arms, swollen lips gurgling and drooling like a nursing cow. The weight on your cocks builds as you fill both girls with your silken seed, bloating their bodies and bathing their stomachs with your demon-blessed spunk.\n\n",
                false
            );
        }

        this.outputText(
            "Long past the point where you should've run out of cum, or indeed any fluid in your body, you're still pumping out your gooey loads. Abby coughs, choking, and her eyes tear up as she opens her mouth to complain, but instead of her nasally voice, your slimy spooge dribbles out in pearl globs that roll down her chin and splat on the floor like gluey raindrops. She finally gives up, collapsing on the ground, her ass pierced by your cock-spear, your thrusting hips rubbing her limp face in the cum puddle spilling out of her mouth. Scylla digested your first dozen loads quickly enough, but even her obscene metabolism can't handle your infernal orgasm. Your cum inflates the poor nun past the limits of her robe, tearing it at her bust, her belly, and her hips, exposing pale skin that practically shimmers from her protein-filled liquid nourishment. Her tit lips are swollen to an almost purple shade, sore from her fist fucking and oozing creamy cum-thick milk, slowly staining the lower half of her body white. Pastie has been entirely plastered, inside and out, cum seeping into her every hole. She grinds harder with every spurt, cumming as her tiny box is blasted with fresh seed, her womb bulging her skin outward, pelvis jiggling like jelly with every motion.\n\n",
            false
        );
        this.player.orgasm();
        this.dynStats("lib", 1, "sen", 1);
        // [Next]
        this.doNext(this.scyllaVTakeAdvantageWithExgartuan4);
    }
    private scyllaVTakeAdvantageWithExgartuan4(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(
            this.images.showImage("scylla-help-round-five-take-advantage-with-exgartuan-four"),
            false
        );
        this.outputText(
            "Mercifully, your mind switches off after a half hour of inflating the girls, leaving your body to finish its pelvis-crushing imperative. You're not sure how much time has passed when your brain gets fuck-started back on by Exgartuan's teeth-scraping voice. \"<i>I said wake up!</i>\" he shouts, rousing you from your ecstatic waking-sleep.",
            false
        );
        // [fewer than three dicks:
        if (this.player.cockTotal() < 3)
            this.outputText(
                "  The demon has withdrawn from the girls, reforming your cocks into their pre-orgy state, slimy cum-slick fluids notwithstanding.",
                false
            );
        this.outputText(
            "  You try to gather your strength and wince in pain as you rise to your feet. The girls are strewn around the room, thoroughly sated. The goblin absently licks at the cum puddle she's lying in, her ass still wiggling and raised in the air, her sphincter clenching and opening like a babbling mouth. The nun's head barely pokes over her massive tits and belly, her clothes torn to shreds by her distended body, black stocking-clad legs barely poking out under her cum-inflated girth. Pastie is trapped in a sticky shell of your sperm, rubbing her belly and head with equal satisfaction and regret, black-out drunk on booze, jizz, and lust. \"<i>Good fuckin' job,</i>\" Exgartuan compliments, his voice slowly fading with satisfaction. \"<i>There's hope for you yet.</i>\" You leave before anybody can suggest you chip in for the cleaning bill.",
            false
        );
        this.dynStats("cor", 1);
        this.player.cumMultiplier += 2;
        this.player.changeStatusValue(StatusAffects.Exgartuan, 2, 24);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [Share]	(First time)
    private scyllaPtVShare(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(this.images.showImage("scylla-help-round-five-share"), false);
        // FIRST TIEM
        if (this.flags[kFLAGS.SCYLLA_TIMES_SHARED_IN_ADDICT_GROUP] == 0) {
            this.outputText(
                "With a blush of embarrassment, you push the door open and step inside. \"<i>I'm " +
                    this.player.short +
                    " and I'm an addict,</i>\" you admit, keeping your eyes cast down.\n\n",
                false
            );

            this.outputText(
                'The girls look surprised by your entry, but Scylla is welcoming all the same. "<i>Oh, ' +
                    this.player.short +
                    ', I\'m so glad you could join us after all,</i>" she fibs, covering up for the fact that you were obviously spying on them. "<i>Pastie, Abby, this is my dear friend. Please, take a seat here,</i>" she offers you her chair and daintily takes a place on the edge of the room\'s bed. "<i>Please, tell us more about yourself.</i>"\n\n',
                false
            );
        }
        // [Share]	(Repeat)
        else {
            this.outputText(
                "You knock on the door and poke your head in. As they look up, you see an empty chair's been pulled up to the table this time. It seems they were expecting - or perhaps hoping - you'd come again. Abylon still wears her carefully crafted mask of mocking apathy, but you think you catch a glimmer in her eyes that even she's not fully aware of. She scratches the tip of her nose and tosses you a curt 'hey' gesture with her wrist. Pastie is already wasted, but only on liquor. Is it just your imagination, or are the fairy's crystalline clothes a little sluttier than they were last time? Scylla seems happy to see you, though there are little crinkles of need at the edges of her smile.\n\n",
                false
            );

            this.outputText(
                "You resolve to be on your best behavior, mentally noting that your 'best' isn't what it used to be. What would you like to talk about today?\n\n",
                false
            );
        }
        // Increment times met share group
        this.flags[kFLAGS.SCYLLA_TIMES_SHARED_IN_ADDICT_GROUP]++;
        // Increment overall meetings
        this.flags[kFLAGS.TIMES_MET_SCYLLA_IN_ADDICTION_GROUP]++;
        this.outputText("What addiction would you like to discuss?", false);
        // Set choices
        var milk = undefined;
        if (
            (this.player.findPerk(PerkLib.MarblesMilk) >= 0 ||
                this.player.statusAffectv3(StatusAffects.Marble) > 0) &&
            this.player.findPerk(PerkLib.MarbleResistant) < 0
        )
            milk = this.scyllaPtVMilk;
        var cum = undefined;
        if (
            this.flags[kFLAGS.MINOTAUR_CUM_ADDICTION_TRACKER] >= 50 ||
            this.player.findPerk(PerkLib.MinotaurCumAddict) >= 0
        )
            cum = this.scyllaPtVCum;
        var sex = undefined;
        if (this.player.lib >= 85 || this.player.minLust() >= 20) sex = this.scyllaPtVSex;
        var tentacles = undefined;
        if (this.player.tentacleCocks() >= 2) tentacles = this.shareTentaclesWithScylla;
        // CHOOSE HERE
        this.simpleChoices(
            "Cum",
            cum,
            "Milk",
            milk,
            "Sex",
            sex,
            "Tentacles",
            tentacles,
            "None",
            this.scyllaPtVNoDiscussion
        );
    }
    private scyllaPtVNoDiscussion(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(
            "You fail to come up with a suitable explanation for your presence and politely excuse yourself.  AWKWARD!",
            false
        );
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // [Marble's Milk]	(First time and Repeat)
    private scyllaPtVMilk(): void {
        this.scyllaSprite();
        this.flags[kFLAGS.SCYLLA_MILK_THERAPY_TIMES]++;
        this.outputText("", true);
        this.outputText(this.images.showImage("scylla-help-round-five-with-milk-one"), false);
        this.outputText(
            "You tell the girls about Whitney's farm and how you help out when you can. You relate how you met Marble and the relationship that blossomed. Eventually, you get to the topic of her milk. Your mouth begins to water and you can almost see those big, beautiful udders as you describe your first taste- the warm flavor spraying on your mouth as you stroked her nipple with your tongue, her skin earthy and moist with matronly excitement. You talk about the feel of her arms cradling your head as you nursed one teat, then the other, drinking in her sighs of relief as much as the nectar of her body.\n\n",
            false
        );

        this.outputText(
            "Your audience is engrossed by your descriptions. Scylla is absently rolling her pouting lower lip between her thumb and forefinger, squeezing it thicker. Abby has her arms crossed self-consciously over her small chest, and is sitting bolt upright in her chair, her legs clenched together. You're a little surprised to see Pastie openly fingering herself through her gossamer dress with one hand while she leans against her shot glass, drinking between moans. You almost hate to ruin the mood, but you move on to the withdrawal. You describe the creeping weakness that drains the strength from your arms and the speed from your legs; how the world seems duller, noises louder, colors grayer. Your head hurts and your body aches, even to the point of physical sickness. Life just doesn't seem worth living. Marble means a lot to you, but sometimes you worry you're just using her for your next fix - and that thought scares you.\n\n",
            false
        );

        this.outputText(
            "Scylla rises to give you a big, mushy hug, smooshing you into her jiggling breast. \"<i>It's okay to worry about the ones you love,</i>\" she comforts you. \"<i>I think it's your feelings for her that make her milk so important to you. Your body makes you follow what your heart desires.</i>\" Abylon snorts and finishes off another beer, making an impressive collection of empties in front of her. Her hands show the alcohol's influence when she sets down the glass and nearly knocks it off of the table. Scylla's embrace keeps you from seeing what Pastie is doing, but you can hear a soft schlicking noise, so you can guess she's still thinking about the milk.\n\n",
            false
        );

        this.outputText(
            "You try to consider Scylla's words, but the heat and softness of her chest makes thinking hard. Your mind keeps coming back to your vivid memories of Marble and your stomach grumbles. You smack your lips, but you just can't get any moisture. Everything feels hot and cramped. When you look up at Scylla, her bulging lips almost look like Marble's if you squint a lot. You can almost see the cow girl's udders in the nun's skin-tight robe - mammoth mammaries hulking against your chest like ripe melons, full of sweet ambrosia. You pat your pockets for the bottle of milk you could've sworn you'd stashed for a rainy day, but find only the boiling fire coursing through your belly. The want. The need. The thirst. Scylla meets your addiction constricted eyes with a blue gaze of innocent concern, her eyebrows turned up in a plaintive expression.\n\n",
            false
        );
        this.dynStats("lus", 5);
        // [Next]
        this.doNext(this.scyllaPtVMilkII);
    }
    private scyllaPtVMilkII(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(this.images.showImage("scylla-help-round-five-with-milk-two"), false);
        this.outputText(
            "You reach a hand up to touch the nun's collar bone, wrapping your fingers around her robe's black and white collar, before savagely yanking down. The material tears in your grasp, and her sloshing tits bounce out gratefully, alabaster skin livid against her coal-dark tatters and bouncing, jet curls. Scylla gasps in surprise and tries to wrap her arms around the heaving swell of her pillows, crushing them against her chest, flesh spilling over and between her fingers. She stumbles back a few steps before tripping and landing on her generous rump, knees clenched in front of her and feet splayed at her thighs.\n\n",
            false
        );

        this.outputText(
            'Abylon spits her beer, laughing. "<i>Try a bra next time, ya fat dummy!</i>" She scrambles onto the table so she can point and laugh better, knocking Pastie to the floor. The fairy collects herself and freezes, her eyes going wide at the nun\'s bare chest, wobbling with its creamy, liquid promise. She starts hyperventilating, her tongue circling her mouth. Scylla shakes her head, ebony tresses spilling across her ivory breasts. "<i>No, it doesn\'t have to control you,</i>" she tries, "<i>You\'re stronger...</i>" She trails off as you plant yourself in front of her and bend down to bring your face level with hers.\n\n',
            false
        );

        this.outputText(
            "You lean in until she can feel your hot breath and grin wolfishly at the shepherd. With a darting motion, you nip at the bulge of her lower lip and take the plump, candy-apple red skin in your mouth, rolling it up and down. The nun surrenders a tender moan as her sensitive lips begin to swell. You suck it deeper into your mouth and pull back, drawing her elastic skin with you, parting her mouth and stealing another, higher-pitched moan.\n\n",
            false
        );

        this.outputText(
            "Her bottom lip bloats in your mouth, as sensitive as any nipple, inflating as you tease it with your tongue and lightly nibble with your teeth. The nun's lips fill out into a bimbo's sucking pucker, wobbling and stuffing your cheeks, her sweet drool polishing the pulsing, strawberry surface with a slick gloss before dribbling into your mouth. You swallow reflexively, and remember the thirst pangs that wrack your belly. You pull her lip far enough to make her squeak in pain, and then let go.  The bloated flesh slaps wetly back against her chin. She drops her hands from guarding her chest and brings their trembling fingers to stroke her enlarged kisser as her body shakes with the orgasm you've teased out of her. She seems unable to swallow as rivulets of clear saliva ooze down her cheeks, and she pants, wetly.\n\n",
            false
        );

        this.outputText(
            "Not one to miss an opportunity, you kneel and cushion your head against her right breast, letting your fingers sink and disappear in the plushness of her tits. You lick at the edges of her nipple lips, teasingly, savoring the bloated expansion as they begin flushing just like her upper mouth. They quiver and open a hair's breadth, softly sighing at your tongue's caresses. As your mouth comes around again, the lips pucker and suck at your tongue, pulling it into their velvet depths. You are drawn into a kiss by her nipple's suction and roll your head as your tongue trespasses on her tit's cunt-like interior. Your exploration is rewarded when a trickle of cream is stolen from her quivering reservoir, squeezed down her nipple, flowing like a pussy's wetness. You kiss her bosom deeper, sucking like the addict you've accepted you are.\n\n",
            false
        );
        this.dynStats("lus", 5);
        // [Next]
        this.doNext(this.scyllaPtVMilkIII);
    }
    private scyllaPtVMilkIII(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(this.images.showImage("scylla-help-round-five-with-milk-three"), false);
        this.outputText(
            "Scylla clenches her eyes shut and groans, her melons churning with the promise of lactation. She crushes your head into her right breast and strokes her left teat with a pinkie and thumb, holding the mouth open, gaping wide like a slut begging for cock. \"<i>It's... it's all right Pastie...</i>\" she whispers in ecstasy from your suckling. Milk begins to ooze from her left tit, spilling from the begging mouth and staining the wet spot between her legs a snowy cream color.\n\n",
            false
        );

        this.outputText(
            "The fairy darts into the air and plunges head-long toward the stream. Though just a pencil-thin rivulet of the nun's milk drips down, it's like a shower for the fairy. She fills her cheeks and gulps loudly, running her hands through her flowing, violet hair, washing it in the cum-like thickness of Scylla's milk. She hiccups giddily and flutters up to the source of the stream, pulling her upper torso over the nun's bulging nipple lips and lapping at the flowing milk with giggling head bobs.\n\n",
            false
        );

        this.outputText(
            "The goblin girl is having difficulty breathing, she's drunkenly laughing so hard. \"<i>Lipples? Are you kidding me?</i>\" she gasps between fits. She rolls on the table, clutching her sides, and ends up rolling off the edge. She flails as she falls and knocks her head on the floor, tumbling against Scylla's knees. The nun releases her grip on the back of your head and gently gathers the dazed goblin to her breast.\n\n",
            false
        );

        this.outputText(
            "\"<i>Are you all right?</i>\" she asks, worry pushing through her woozy bliss. She strokes Abby's hair, her fingertips curling around the braid's twisting knots. \"<i>Let me kiss that better,</i>\" she implores, pulling Abby into her slowly expanding cleavage. The goblin girl, still dazed by the fall, struggles weakly as Scylla cranes her neck down and presses her bulging lips against Abby's. The goblin stiffens at the kiss and tries to pull away, mumbling something that gets lost in the fleshy smooch. You can see Scylla's saliva leaking from the wet kiss and begin to seep down Abby's neck and into her armor. The smaller girl wriggles and does the only thing she can think of to get away from the feeding-drunk nun: she bites her pointed teeth into Scylla's lips - hard.\n\n",
            false
        );

        this.outputText(
            "Scylla's orgasm is immediate. The puffed nipple-lips you are sucking moan into your mouth and a torrent of cream rushes past your teeth, over your tongue, and down your eager gullet. You swallow as fast as you can, but Abby twists and pulls Scylla's lips, driving the nun crazy and opening her breasts' flood gates. You flick her nipple mouth with your tongue between gouts, and it kisses you with such force that the next burst of milk nearly chokes you. Meanwhile, Pastie appears to be clutching the bottom lip of Scylla's left nipple for dear life. The rushing blasts of milk are like creamy rapids to the fairy, and she sputters as it fills her mouth, nose, and eyes.\n\n",
            false
        );

        this.outputText(
            "Abby, mistaking the nun's orgasmic throes for pain, opens wide and sinks her teeth into the inflating lips, drawing blood. Scylla gasps and loses sensation in her arms. The fingers prying her tit's lips open for the fairy fall away, and her mouth closes tightly around the fairy's chest, leaving her legs and butt swinging wildly in the air. The lips around the tiny girl purse into a bloated pucker, the milk within rushing and churning, trying to get out through the struggling fairy. Pastie's belly swells rapidly as she swallows load after load, her wisp-thin waist bulging two, then three times its normal, fey size.\n\n",
            false
        );
        this.dynStats("lus", 5);
        // [Next]
        this.doNext(this.scyllaPtVMilkIV);
    }
    private scyllaPtVMilkIV(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(this.images.showImage("scylla-help-round-five-with-milk-four"), false);
        this.outputText(
            "Your own stomach feels full and you pause in your sucking to glance down. Scylla's orgasm-fueled lactation must've been greater than you realized, your milk-lust slowly clearing from your head.  Your belly jiggles with every movement, spilling nearly a foot past your " +
                this.hipDescript() +
                ", impossibly distended with the nun's rich cream. Despite the gallons stretching you like a nine-month pregnancy, you still feel empty - Scylla's milk just isn't the same as Marble's. You settle back on your " +
                this.buttDescript() +
                " and massage the liquid weight of your abdomen, watching Scylla's orgasm die down as her gushing tits slow to a drizzle.\n\n",
            false
        );

        this.outputText(
            "Suddenly, you remember Pastie and turn back to Scylla's glistening chest. The lips on her left breast let out a slow sucking noise, and you see the fairy's legs starting to disappearing into the milky mouth. Unfortunately, the nun is too lost in her overstimulation to notice what her tit is doing. You seize Pastie's tiny foot between two fingers just before it vanishes inside Scylla's nipple and tug against the suction, careful not to hurt the little drunk. There is a bit of resistance as the mouth tries to swallow the girl whole, but the fairy finally pops out and hacks white cream from her lungs, gasping for air in grateful gulps. The thin, waif-like fairy now more closely resembles a pear- her belly, hips, and ass are bloated and she sloshes around in your hand like a pale water balloon. Her violet hair is stuck in soggy clumps to her inflated tits which, themselves, leak with milk. She rolls helplessly in your hand, trying to sort out which way is up. \"<i>I'z neber drinkin' again,</i>\" she vows, in a slurred voice, high as well as drunk.\n\n",
            false
        );

        this.outputText(
            'Abylon pushes out of the panting nun\'s drool, sweat, and milk soaked cleavage, scrubbing her mouth with the back of her hand, pissed and cursing aloud. When she pulls her hand away, you see the cause of her distress. Her dark emerald lips have swollen and now resemble a smaller version of Scylla\'s o-ring mouth. She winces as she touches them. "<i>Now I wook wike a swut, ya dumb cow,</i>" she grumbles, her bimbo-thick lips mushing her words. She blushes a forest green as she strokes her lips more gently this time. "<i>This bettew not be pewmanent,</i>" she adds, licking them and trembling at the sensation.\n\n',
            false
        );
        // [Next]
        this.doNext(this.scyllaPtVMilkV);
    }
    private scyllaPtVMilkV(): void {
        this.outputText(this.images.showImage("scylla-help-round-five-with-milk-five"), false);
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(
            "Embarrassed at your outburst and the subsequent consequences, you apologize as you try to fit your " +
                this.player.armorName +
                " on over your liquid-fat gut. It's not until you're out of the Wet Bitch and away from the curious eyes of its patrons that you realize the meeting actually went quite well. Abylon has a new, sensitive spot to play with, to help avoid following in her mother's footsteps. Pastie's over-indulgence may've been the shock she needed to stop chasing human fluids. Scylla's nursing made her forget about her cum-thirst for once. And while you're still addicted to Marble's milk, at least now you know that it's more than just a chemical dependency. Even filled to the tonsils, you missed the emotional connection to the cowgirl.\n\n",
            false
        );

        this.outputText(
            "Feeling pretty pleased with yourself, you add a skip to your step, belly jiggling all the way back to camp.",
            false
        );
        // [Corruption Down]
        this.dynStats("lus", -1);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [Share- Minotaur cum]	(First time and Repeat)
    private scyllaPtVCum(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(this.images.showImage("scylla-help-round-five-jizz-pt-one"), false);
        this.flags[kFLAGS.SCYLLA_CUM_THERAPY_TIMES]++;
        this.outputText(
            "You take a moment to collect your thoughts before beginning. You're not exactly sure when it was that you first heard of minotaurs, but you remember in crystal-clear detail the first time you smelled one. Every rippling muscle on their monstrous body reeking of their musk, you found it impossible not to get light-headed each time you tangled with one. Even worse, they knew exactly how their stench affected their prey and those horrible beasts used it against you in the worst ways. Every time you see them, your resistance crumbles, your mind turns off, and there's nothing but your pounding heart and the promise of their release. The helplessness and the weakness that drains you is all the worse for how... relieved... you feel when at last their hot, thick cum whitewashes your body, inside and out. Every drop of the tingling heat wraps iron bands around your lungs and electrifies your muscles into jelly. Even afterwards, the odor lingers like a collar around your neck, marking you as their property, humiliating and exciting you all at once.\n\n",
            false
        );

        this.outputText(
            "You bury your face in your hands as you admit that you've never even seriously tried to quit. How could you? Can the dirt stop trees from drinking its nutrients? Does sand rebel when clams encase it in alabaster to produce pearls? Being used time and time again is all you deserve. It's what you need. You're not strong enough to stop and you never will be.\n\n",
            false
        );

        this.outputText(
            "When you look back up, Abby is pulling at her tight leather plates.  Your descriptions are making the goblin too hot to speak - she just pants and absently stares into space, her imagination picking up where your words left off. Pastie's face on the other hand, is turned up in an expression of disgust. She takes another drink and points a tiny finger at you, accusingly. \"<i>That's gross stuff, and I should know - I've tried everything. How can you LIKE it?</i>\" she complains. Scylla holds her hands over her mouth, self-consciously, big tears welling in her azure eyes. \"<i>Oh " +
                this.player.short +
                ', I know exactly what you are going through,</i>" she admits. "<i>You want to stop, but you just can\'t!</i>"\n\n',
            false
        );

        this.outputText(
            "\"<i>That's enough whining, ya dummies,</i>\" Abby cuts in, her eyes dilated and a mad smile on her face.  Leather armor hangs off the goblin loosely, giving you your first glance of her emerald cleavage and her wide, breeder's hips. Though she's still almost out of breath, something's off about her posture, and her grin isn't mocking anymore. \"<i>Yer goin' on like yer a buncha victims, but it don't gotta be that way. As I sees it, if ya like what yer gettin', yer givin' as good at ya get. Minos are jus' dumb jerks who do what they gotta, cause they're beasts. We're smarter so really, we're usin' them. Usin' em like big, muscle-bound cows.</i>\"\n\n",
            false
        );
        // [Next]
        this.doNext(this.scyllaPtVCumII);
    }
    private scyllaPtVCumII(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(this.images.showImage("scylla-help-round-five-jizz-pt-two"), false);
        var x: number = this.player.biggestCockIndex();
        this.outputText(
            '"<i>I\'ll prove it,</i>" Abby says, hopping down from her chair. "<i>We\'ll roleplay. You be the minotaur,</i>" she points at you, "<i>an I\'ll be the Champion. Come on, stand up, ya schlub. Good, now put your fingers on the sides of yer head like horns.</i>" You numbly follow her directions, unsure if you should be insulted or not. "<i>Great. Gimme a dumb cow-snort. Yer a minotaur and all ya do is fight and fuck all day. Ya don\'t know any better.</i>" You snort, a little embarrassed. "<i>Here I come, walkin\' through the mountains, tryin\' ta rescue virgins an fight demons, when bam - you jump out!</i>" She pantomimes surprise. "<i>I reach for my weapon but yer too fast, so ya knock me down and grab me.</i>" Abylon spins in place as if struck, and collapses face-down, her plump rear sticking up and wiggling back and forth invitingly. "<i>Come on, doofus, ya gotta grab me.</i>" You bend down and seize the goblin by her shoulders, hoisting her up into the air in front of you, her scarlet braid flapping in your face. "<i>Oh no, woe is me, whatever am I ta do?</i>" she theatrically asks the girls she\'s facing.\n\n',
            false
        );

        this.outputText(
            'While she\'s hanging in the air, she kicks off her boots and bends a foot back - against your groin. With surprisingly dexterous toes, she strokes the bulge of your shaft. You harden under her caress and let out a moan. She elbows you in the ribs and looks back over her shoulder, annoyed. "<i>Yer a minotaur, remember? Ya gotta snort an grunt an stuff.</i>" You roar and shake her up and down, making her clench her foot around your swelling cock through your clothes. "<i>B-b-better,</i>" she admits as you jostle her like a ragdoll. Like stubby fingers, her toes work around your ' +
                this.player.armorName +
                " and manage to free your " +
                this.cockDescript(x) +
                ', which springs up, invigorated by her bouncing ass and wobbling against it with every shake. She squirms free of her oiled leather pants and squeezes her emerald thighs against the monster growing between the two of you. "<i>D-d-don\'t take all day, d-d-dummy - what do minotaurs d-d-do next?</i>" she giggles in excitement.\n\n',
            false
        );

        this.outputText(
            'You lift the goblin girl over your head and line your cockhead up with her moist, leaking cunt, grunting in appreciation for the heat pouring out of her box. "<i>Oh noooo, the Champion is gonna get raped by a dumb beast!</i>" Abby wails, gleefully. You lower her onto your ' +
                this.cockDescript(x) +
                ", her tight, green folds parting gradually before you. She sighs in exasperation and kicks backward, painfully catching your head in the left temple. \"<i>We ain't makin' love, ya dope, I don't need ta be romanced. Ya gotta breed and I got a warm hole. Be a minotaur!</i>\"\n\n",
            false
        );
        // [Next]
        this.dynStats("lus", 20);
        this.doNext(this.scyllaPtVCumIII);
    }
    private scyllaPtVCumIII(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(this.images.showImage("scylla-help-round-five-jizz-pt-three"), false);
        var x: number = this.player.biggestCockIndex();
        this.outputText(
            "Before Abby can give you another kick, you slide your hands down to her hips and jerk downwards as you thrust up with all your might. The goblin bites her tongue in surprise as your cock plows past her labia and splits her cunny wide. Her lithe body distends wildly, abdomen and stomach bloating well past her hips as you impale the girl on your mast. Her legs spasm, toes curling as you fill her cunt to the cervix and, with a brutal snort, you ram past, into her womb. The bulge of your " +
                this.cockDescript(x) +
                " inside her body pushes upward under her armor's breastplate, and with another cruel thrust, you split it open.  Oiled leather hangs in tatters from her shoulders, revealing that your cock's outline is visible from her cunt all the way up the front of her body to its tip, nestled between her perky tits. Her womb throbs around your head, sucking at it with every heartbeat while her body clenches your shaft with every tremble from her flailing legs.\n\n",
            false
        );

        if (this.player.balls > 0)
            this.outputText(
                "Abylon lets out a ragged, delicious shudder and looks back at you.  Over her shoulder, a wicked smile shows off every blood-lined tooth. \"<i>Tha Champion's got tha minotaur right where she wants 'em,</i>\" she gloats in her nasal tone. \"<i>He can't fuck you, if ya fuck 'em first!</i>\" She pulls a knee up and drives her foot down, into your " +
                    this.sackDescript() +
                    ", heel-first. Your world explodes into shards of light and pain, the green cocksleeve forgotten to the mind-shattering, gut-wrenching agony that shoots through your body. Your legs give out and you fall backwards, landing on your back, stunned. Abby uses this opportunity to spin in place, still penetrated like a duck on a spit.  She wraps her legs around your " +
                    this.hipDescript() +
                    " and " +
                    this.buttDescript() +
                    ". Leaning in, she licks the blood from her teeth. \"<i>Gotta keep the minotaur from softenin'. Gotta claim the Champion's prize.</i>\"\n\n",
                false
            );
        else
            this.outputText(
                "Abylon lets out a ragged, delicious shudder and looks back at you.  Over her shoulder, a wicked smile shows off every blood-lined tooth. \"<i>Tha Champion's got tha minotaur right where she wants 'em,</i>\" she gloats in her nasal tone. \"<i>He can't fuck you, if ya fuck 'em first!</i>\" She pulls a knee up and drives her foot down, into your groin, heel-first. Your world explodes into shards of light and pain, the green cocksleeve forgotten to the mind-shattering, gut-wrenching agony that shoots through your body. Your legs give out and you fall backwards, landing on your back, stunned. Abby uses this opportunity to spin in place, still penetrated like a duck on a spit.  She wraps her legs around your " +
                    this.hipDescript() +
                    " and " +
                    this.buttDescript() +
                    ". Leaning in, she licks the blood from her teeth. \"<i>Gotta keep the minotaur from softenin'. Gotta claim the Champion's prize.</i>\"\n\n",
                false
            );

        this.outputText(
            "Abby runs her sharp nails up your waist and over your chest, points digging into your flesh hard enough to take away the worst pain in your abdomen. She reaches your neck, and her tiny hands curl around your windpipe and begin to squeeze. You try to call the crazy bitch off, but all you manage is a choked wheeze as her grip tightens. Even though you know Scylla won't let Abylon kill you, with your oxygen cut off, your body starts to panic. Your heart races, pumping blood into your erection, filling the goblin with a renewed and redoubled shaft that threatens to split her tiny hips. The bulge jutting out of the front of her body pulses through her skin and you can see bulbs of pre-cum travelling up your shaft, toward her torturously distended womb, driven nearly up to her neck. As the strength seeps out of your muscles, adrenaline starts pumping, and you buck wildly, " +
                this.hairDescript() +
                " flying around your face as you try to shake the emerald cockslave as savagely as an unbroken stallion. Despite the pounding and thrashing, Abby manages to hold on, grinding her hips and screaming in wild abandon as her body sucks every inch of your " +
                this.cockDescript(x) +
                ".\n\n",
            false
        );
        this.doNext(this.scyllaPtVCumIV);
    }

    private scyllaPtVCumIV(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(this.images.showImage("scylla-help-round-five-jizz-pt-four"), false);
        var x: number = this.player.biggestCockIndex();
        // [2 DICKS]
        if (this.player.totalCocks() >= 2) {
            if (this.player.balls > 0)
                this.outputText(
                    "Scylla is unable to keep herself away any longer, and she falls to her hands and knees, crawling toward the two of you. The nun kisses your " +
                        this.ballsDescriptLight() +
                        ", the wet electricity of her swollen lips drawing away some of your pain. She licks along your " +
                        this.cockDescript(1) +
                        " as it bounces wildly against Abby's ass. It's far too hard to work its way up there now that your " +
                        this.cockDescript(x) +
                        " is fully plugged into the goblin, so Scylla perches her mouth over its head and whorls her tongue around the swell, the tip of her tongue playfully penetrating a few inches of your urethra. The pressure is just another sensation on your overtaxed body, so you hardly notice when she threads more and more of her snaking organ down your cock until her lips press against your head in a tight O. Your " +
                        this.cockDescript(1) +
                        " feels strange from the tongue-fucking, like a warm, moist pressure that slides down your shaft and into your gut. Pre-cum bubbles up, trying to clear the blockage, but she merely coils her tongue into a U-shape and slurps it up through your cock like a straw. She opens her jaw and pushes your cock into her cunt-tight mouth, sliding her tongue even deeper into your dick, sucking up the increasingly frantic globs from your " +
                        this.ballsDescriptLight() +
                        " as your climax builds.\n\n",
                    false
                );
            else
                this.outputText(
                    "Scylla is unable to keep herself away any longer, and she falls to her hands and knees, crawling toward the two of you. The nun kisses your flesh, the wet electricity of her swollen lips drawing away some of your pain. She licks along your " +
                        this.cockDescript(1) +
                        " as it bounces wildly against Abby's ass. It's far too hard to work its way up there now that your " +
                        this.cockDescript(x) +
                        " is fully plugged into the goblin, so Scylla perches her mouth over its head and whorls her tongue around the swell, the tip of her tongue playfully penetrating a few inches of your urethra. The pressure is just another sensation on your overtaxed body, so you hardly notice when she threads more and more of her snaking organ down your cock until her lips press against your head in a tight O. Your " +
                        this.cockDescript(1) +
                        " feels strange from the tongue-fucking, like a warm, moist pressure that slides down your shaft and into your gut. Pre-cum bubbles up, trying to clear the blockage, but she merely coils her tongue into a U-shape and slurps it up through your cock like a straw. She opens her jaw and pushes your cock into her cunt-tight mouth, sliding her tongue even deeper into your dick, sucking up the increasingly frantic globs from your prostate as your climax builds.\n\n",
                    false
                );
        }

        if (this.player.balls > 0)
            this.outputText(
                "Just as darkness creeps at the edges of your vision, your balls quiver in orgasm, renewed fire shooting through your body. When cum finally erupts from you, it feels like snowballs bursting through a bonfire. Feeling your " +
                    this.cockDescript(x) +
                    " spasm within her, Abby finally releases her grip on your throat and you suck down air like you've never breathed before. She babbles in anticipation, feeling the cum wave's progress as it's pumped into her, up the front of her tight, green body. When it finally bursts from your cockhead, she screams bloody murder.  Her whole body vibrates in orgasm as she beats her fists against your shoulders, rocking up and down to milk every drop from your tortured testicles.  The combination of the orgasm denial from her nut-shot, the strangulation, and the subsequent bronco ride has made your orgasm the strongest you've felt in a while, and you almost can see yourself as a minotaur when your cock fire hoses the goblin's cunt, like it can't get your seed out fast enough.\n\n",
                false
            );
        else
            this.outputText(
                "Just as darkness creeps at the edges of your vision, your hips quiver in orgasm, renewed fire shooting through your body. When cum finally erupts from you, it feels like snowballs bursting through a bonfire. Feeling your " +
                    this.cockDescript(x) +
                    " spasm within her, Abby finally releases her grip on your throat and you suck down air like you've never breathed before. She babbles in anticipation, feeling the cum wave's progress as it's pumped into her, up the front of her tight, green body. When it finally bursts from your cockhead, she screams bloody murder.  Her whole body vibrates in orgasm as she beats her fists against your shoulders, rocking up and down to milk every drop from your tortured flesh.  The combination of the orgasm denial from her nut-shot, the strangulation, and the subsequent bronco ride has made your orgasm the strongest you've felt in a while, and you almost can see yourself as a minotaur when your cock fire hoses the goblin's cunt, like it can't get your seed out fast enough.\n\n",
                false
            );
        // [2 DICKS ]
        if (this.player.totalCocks() >= 2) {
            if (this.player.balls > 0)
                this.outputText(
                    "Your " +
                        this.cockDescript(1) +
                        " fires off just as Scylla's serpentine tongue reaches the root of your cock and its tip pokes into your " +
                        this.ballsDescriptLight() +
                        ". With her tongue fucking your urethra and her throat fucking your shaft, you feel her squeeze you from inside and out. Cum rushes up the nun's straw-like tongue and her windpipe convulses with each swallow, tasting its searing heat all the way up and savoring its creamy texture all the way down. She milks you up and down as the goblin's ass thrashes inches above her. After a minute of drinking straight from your " +
                        this.ballsDescriptLight() +
                        ", she slowly withdraws, letting the cum push her tongue back into her mouth.  The blasting force of your orgasm lifts her throat from your cock until it slips free of her pulsing lips and sprays an ivory jet into her face, the force knocking her habit off her head and plastering her curly hair into a long, gooey mess. Her horns curl into the semblance of a blissful, bone halo above her head.\n\n",
                    false
                );
            else
                this.outputText(
                    "Your " +
                        this.cockDescript(1) +
                        " fires off just as Scylla's serpentine tongue reaches the root of your cock. With her tongue fucking your urethra and her throat fucking your shaft, you feel her squeeze you from inside and out. Cum rushes up the nun's straw-like tongue and her windpipe convulses with each swallow, tasting its searing heat all the way up and savoring its creamy texture all the way down. She milks you up and down as the goblin's ass thrashes inches above her. After a minute of drinking straight from your loins, she slowly withdraws, letting the cum push her tongue back into her mouth.  The blasting force of your orgasm lifts her throat from your cock until it slips free of her pulsing lips and sprays an ivory jet into her face, the force knocking her habit off her head and plastering her curly hair into a long, gooey mess. Her horns curl into the semblance of a blissful, bone halo above her head.\n\n",
                    false
                );
        }
        this.outputText(
            "Abylon's leg lock keeps her rooted on your shaft for a brief while, but the pressure of your too-plentiful cum inside her too-small body breaks even her mighty hold and the goblin is launched off of your " +
                this.cockDescript(x) +
                ". She tumbles through the air before landing in a roll, her tongue waggling from her mouth at the rocket ride you gave her. Her eyes roll in her head and she giggles aimlessly. You feel utterly spent - exhaustion and pain return in full force, and you lay on your back, trying to catch your breath. Scylla digs her fingers into her nipple mouths, masturbating the sensitive flesh through the velvet fabric of her black robe, wet stains spilling down her chest and between her legs. She crawls toward your face, gives you an affectionate kiss on the forehead, and moves to Abby's side.\n\n",
            false
        );

        this.outputText(
            "\"<i>You've defeated the terrible minotaur and rescued the virgin. Please, let me reward you,</i>\" the nun murmurs as she lowers herself down, between Abby's twitching legs. The nun sticks out her tongue, and the long, prehensile organ glides through the air, toward the goblin's pulsing, overflowing cunt. Its tip traces the curves of her vulva, lapping up your seed as it spills out and wrapping around the goblin's small, pert clit. Scylla licks downward and her tongue penetrates Abby's box, making the other girl squeal. The nun presses her puffy, whorish lips against the green lips that had been riding you so hard, and she seals the two with a long, wet kiss, her writhing tongue exploring the goblin's fuck-stretched depths as her lips and throat greedily suck your cum from the other girl's distended womb.\n\n",
            false
        );
        this.player.orgasm();
        // [Next]
        this.doNext(this.scyllaPtVCumV);
    }
    private scyllaPtVCumV(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(this.images.showImage("scylla-help-round-five-jizz-pt-five"), false);
        // [Sensitivity down ]
        if (this.player.sens > 10) this.dynStats("sen", -1);
        this.outputText(
            "Abby weakly protests the theft, but Scylla's eyes are closed, lost in the cum-filled world between the goblin's defenseless legs. Pastie flutters overhead and laughs, drunkenly slurring something about 'just desserts,' but you can't concentrate on anything right now. Sleep sounds like such a good idea that you happily pass out. When you wake, you find the girls have gone, though Scylla cleaned up the room and left you a note and several drinks. She apologizes for any pain that Abby may have caused you, but thanks you for your help in the demonstration. Your body still hurts a bit, but all in all, not a bad session. Abby's right - the minotaurs can't rape you if you use them first. Their cum may be addicting, but you're the Champion: you take what you want.\n\n",
            false
        );
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [Sex Addiction]	(minimum lust at least 20 or current libido at 85)(First time and Repeat)
    private scyllaPtVSex(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(this.images.showImage("scylla-help-round-five-sex-pt-one"), false);
        this.flags[kFLAGS.SCYLLA_SEX_THERAPY_TIMES]++;
        this.dynStats("lus", 10);
        this.outputText(
            "You're a little uncomfortable talking about this in front of the nun, but you push through the embarrassment and admit that you like sex. Abylon snorts, rolling her eyes. You clarify that you really, really, REALLY like sex. Ever since you lost your virginity, you just haven't been able to get enough. Imps, hell hounds, naga - if it's got a pulse, you'll jump it. Sometimes, you'll even let yourself be beaten in battle - just to let them have their way with you, with bestial dicks stuffing your every orifice and monstrous cunts milking your seed. But it's not just beasts. All the people who've been so kind to you, all you can do is think about fucking them silly. The heat, the sweat, the cum; despite the importance of your mission, it's too much to resist. You worry that maybe it's warping how you see the world. Will you be able to return home without trying to suck and fuck your way through all the people you knew and loved? Are you even capable of real love anymore?\n\n",
            false
        );

        this.outputText(
            "Abby makes a retching noise, her finger in her throat. \"<i>Aw please, what're ya plannin' a weddin'? There ain't nothin' wrong with enjoyin' sex, dummy. Jus' don't be a huge slut about it.</i>\" She takes a drink, crossing her legs unconsciously as she does so.\n\n",
            false
        );

        this.outputText(
            'Scylla smiles nervously. "<i>Um, I\'m not really the best person to judge, but I think Abby is probably right when she suggests moderation?</i>" She crosses her arms under her breasts, squeezing them together.  "<i>Also, uh, there are things you can do that aren\'t sex, and those can feel pretty good too, I suppose.</i>"\n\n',
            false
        );

        this.outputText(
            '"<i>When everybody around is too big to fuck you, sex isn\'t a problem,</i>" Pastie grumbles, before catching herself. "<i>Besides, it\'s gross and stuff,</i>" she adds, quickly. She takes her longest drink yet and acts like she\'s scratching an itch, but you notice she\'s actually just tweaking one of her nipples through its gossamer covering. "<i>You should be more like me, an\' just run away from the icky parts.</i>" The alcohol hits her fey frame and she gestures too widely, her crystal dress sliding off one shoulder, exposing a tiny, alabaster breast, perfectly round with a bright pink nipple poking out like the head of a needle.\n\n',
            false
        );

        this.outputText(
            '"<i>Well, now, avoiding it entirely may not be the best course,</i>" Scylla hedges, reaching a finger over to help Pastie pull up her dress. The fairy shoos the nun\'s hand away, drunkenly stumbling backwards from the effort. "<i>All things in moderation,</i>" she presses on, "<i>You just have to be sure it doesn\'t control your actions, or you may end up hurting the ones you love.</i>"\n\n',
            false
        );

        this.outputText(
            "\"<i>Or just have sex with people who ya don't care about,</i>\" Pastie hiccups and laughs at her own intoxication. \"<i>Hey Abby, wanna see me make your nipple disappear?</i>\" She flaps her wings, tracing a dizzy course through the air before hovering in front of the goblin's face. Abby looks flustered, somewhat surprising for the girl. Maybe she's not used to other people being as direct as she is? She protests and tries to wave the fairy away, but the drunk's fluttering path is too chaotic, and Pastie lands atop Abby's shoulder, tiny hands making short work of the buckles keeping the goblin's oiled leather plates secure. The goblin girl's breastplate falls away, making her pert, green tits bounce in the open air. She shouts at the fairy to stop, but Pastie is too set on her prank to be dissuaded. She grabs Abby's long, red braid and wraps it around the goblin's head, stuffing the knotted hair into Abby's open mouth much quicker than you thought the drunk girl could manage.  Abby coughs and tries to spit the hair out, but her sharp teeth catch the curves and hold it in place. Pastie giggles and stuffs more of it in, jamming nearly a foot-long braid into the goblin's mouth, tangling the gag even further around her teeth as she does so.\n\n",
            false
        );
        // [Next]
        this.doNext(this.scyllaPtVSexII);
    }

    private scyllaPtVSexII(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(this.images.showImage("scylla-help-round-five-sex-pt-two"), false);
        var x: number = this.player.biggestCockIndex();
        this.outputText(
            "Scylla gasps in alarm. \"<i>Pastie, please stop! This isn't what I meant at all! Oh, " +
                this.player.short +
                ", will you please do something?</i>\" You rise, and walk up to the goblin just as Pastie lands atop a dark, emerald nipple.  She straddles the stiffness between her legs like a thick, stubby cock. She grins up at you through her haze and hiccups again, squeezing Abby's nipple between her thighs and sliding up and down on it, stroking her wet vagina against the sensitive flesh. The goblin moans through her gag and reaches a hand up to stop you as you move to pluck the fairy from her body. She looks up at you and you can see the desperate need in her eyes. Abby, you realize, has your problem - she's addicted to sex. She could've swatted Pastie away at any time, but the moment the fairy touched her skin, it was all she could do to not wet herself in anticipation. She grabs your hand, almost gently, and pulls your fingers to her other breast, shivering as you stroke her hot skin.\n\n",
            false
        );

        this.outputText(
            "\"<i>Oh, oh, no, this isn't... I mean... it's not,</i>\" Scylla stutters, wringing her hands. You cup Abby's breast, easily fitting the small girl's teat in your palm, and stroke the dark areola, teasingly close to her nipple but never quite touching it. Meanwhile, Pastie has thoroughly soaked her taut perch and slides forward slightly, letting the nipple's tip press against her pin-prick clit. She starts bouncing up and down, using her wings to add momentum as Abby's breasts jiggle in time to the fairy's bucking. The goblin girl hisses through her hair-gag and rubs her thighs together like she's trying to start a fire, girl cum leaking from her armor's gaps, re-oiling the plates with sticky, clear fluid. Using her wings to keep her aloft, Pastie turns 90 degrees downward and braces herself sideways against the goblin's boob, tiny high-heel-clad feet digging into the soft flesh around the areola to squeeze the nipple out further. Then, with a squeal of glee, the fairy flaps and impales herself on Abby's nipple, the whole jade nub vanishing inside her tiny snatch. You press your thumbnail against her other nipple and apply enough pressure to push it inward, sinking inside her tit up to your first knuckle.\n\n",
            false
        );

        this.outputText(
            "Abby screams into her gag in orgasm, far more sensitive to being used than you would've expected. She flexes her knees outward, hips bucking for friction against her armor. Her hands make a dive for your crotch and pulls out your " +
                this.multiCockDescriptLight() +
                ". She leans forward to your groin and grabs your shaft by the root, whipping it back and forth to smack herself in the face, gasping in pleasure at the degradation as she strokes it to life with masterful technique. With each meaty thwack against her pudgy cheeks and pug nose, it grows harder until she can't fit her small hands around it anymore, and she is forced to use both hands to encircle your " +
                this.cockDescript(x) +
                ". You grab the little goblin from her chair and peel off the rest of her armor, throwing the sopping wet leather to the floor and begin to line her twitching cunt up with your shaft when you happen to glance at Scylla, still sitting and watching you succumb to your addiction with sad worry on her face.",
            false
        );
        this.dynStats("lus", 20);
        // [Next]
        this.doNext(this.scyllaPtVSexIII);
    }

    private scyllaPtVSexIII(): void {
        this.outputText("", true);
        this.outputText(this.images.showImage("scylla-help-round-five-sex-pt-three"), false);
        this.scyllaSprite();
        var x: number = this.player.biggestCockIndex();
        this.outputText(
            "You take a deep breath, shake your head, and set the goblin's feet back on the floor. She moans in desperate disappointment until you bring your hand back and give her a slap across her plump butt. She shrieks through her stuffed mouth and her legs nearly give out. The goblin girl is forced to grab onto the edge of the table for support. She bends down, presenting her rump to you once more. You spit on your palm and smack her again, green ass flushing at the crack your hand makes. Her eyes roll up in her head while she clenches and unclenches her hams uncontrollably. Pastie, meanwhile, feels the vibrations of your spanking, gurgling as the jiggling goblin nipple jills her tiny clit into a clenching orgasm. She loses control of her wings and starts to fall down, but her crushing cunt latches her onto Abby's tit, and she's left hanging, legs up, like a moaning, crystal nipple piercing.\n\n",
            false
        );

        if (this.player.balls > 0) {
            this.outputText(
                'You wind up for one more, big strike when you see that Scylla\'s standing by your side, smiling. "<i>Thank you,</i>" she whispers, giving you a warm kiss on the cheek. Then, she sinks to her knees and presses her head against your ' +
                    this.ballsDescriptLight() +
                    ", lips and tongue slurping one testicle into her mouth, then the other. Your hand wobbles at the stimulation before you master yourself and take a wide stance to let the nun work between your legs. You stretch up, bringing your hand far above your head, then twist your " +
                    this.hipDescript() +
                    " and bring the full force of your strength to bear on Abylon's tender ass. The crack sounds like thunder and it knocks her knees out from under her. The goblin girl shrieks in ecstasy so loudly, her gag is flung out of her mouth. The impact is hard enough to shake Pastie loose, and the fairy tumbles to the ground, leaking a trail of shimmering fairy juice all the way down. Abby's legs quivery uselessly, and she cums in pulsing squirts, clear fluid arcing several feet into the air, splattering against Scylla's habit and across your balls, only to be slurped up by the attentive nun.\n\n",
                false
            );
            this.outputText(
                "Abylon spasms, face-down on the floor, for several moments longer before finally coming to. She pants heavily as she picks herself up and shoots you a wicked smile. \"<i>I guess tha virgin was right, for once. Ya don't need sex for a good time.</i>\" She glances down at the squirming fairy and stoops to pick her up.  Abby takes her saliva-soaked braid and coils it around Pastie's small frame, binding her in the red tresses. The fairy struggles, starting to come to her senses. The goblin grabs your " +
                    this.cockDescript(x) +
                    ", nearly on the verge of orgasm from Scylla's sweet mouth, and pulls it down to her level. \"<i>That don't mean I gotta turn tha other cheek, though,</i>\" she laughs. With a swift motion, she takes the bound fairy and jams her little head into your pulsing urethra.\n\n",
                false
            );
            this.outputText(
                "The startling action is enough to make you lose control. Scylla's sucking mouth swallows your entire " +
                    this.sackDescript() +
                    ", your testicles churning in her mouth. Teased by the nun's winding, looping tongue, bulges of jizz work their way up your spasming shaft to where Abby has trapped Pastie. The first dollop rolls against her head, and the fairy does her best to drink it down, her belly bloating a bit. Then, they start to come faster. The third load inflates her belly, and the sixth balloons her large enough to loosen the loops of Abby's hair keeping her tied up. She squirms out of the hair restraints and puts her arms at the head of your cock, trying to pull free before your next spurt. She's not fast enough, and your biggest load blasts her head right out of your dick with a splashing pop, sending the fairy careening head over foot through the air and onto the table, knocking bottles aside with the force of the cum geyser.\n\n",
                false
            );
            this.outputText(
                "Scylla releases your testicles from her mouth and rises to nurse the last few loads out of you, suckling serenely, satisfied at the restraint you and Abby showed. The goblin merely laughs her ass off at Pastie's plastered form, writhing on the table, soaked inside and out, sloppy like a used condom. Abyon slaps the nun on the back and chuckles, \"<i>Gotta give it to ya, fatty, ya know a good time.</i>\" Scylla fills her cheeks with your final load and spins around, grabbing the goblin's shoulders and pressing a deep kiss onto her, bulbous lips sealing around the lower half of the green girl's face. Abby tries to speak and Scylla empties her cheeks, snowballing your cum and her saliva into the unsuspecting goblin's mouth. Surprised, she swallows reflexively and almost chokes on the volume of gooey cum that pours down her throat. The nun ends the kiss with a wet \"<i>muah!</i>\" and smiles.\n\n",
                false
            );
        } else {
            this.outputText(
                'You wind up for one more, big strike when you see that Scylla\'s standing by your side, smiling. "<i>Thank you,</i>" she whispers, giving you a warm kiss on the cheek. Then, she sinks to her knees and presses her yielding lips against your shaft, wetly kissing the veins of your length. Your hand wobbles at the stimulation before you master yourself and take a wide stance to let the nun work between your legs. You stretch up, bringing your hand far above your head, then twist your ' +
                    this.hipDescript() +
                    " and bring the full force of your strength to bear on Abylon's tender ass. The crack sounds like thunder and it knocks her knees out from under her. The goblin girl shrieks in ecstasy so loudly, her gag is flung out of her mouth. The impact is hard enough to shake Pastie loose, and the fairy tumbles to the ground, leaking a trail of shimmering fairy juice all the way down. Abby's legs quivery uselessly, and she cums in pulsing squirts, clear fluid arcing several feet into the air, splattering against Scylla's habit and face, only to be slurped up by the attentive nun.\n\n",
                false
            );
            this.outputText(
                "Abylon spasms, face-down on the floor, for several moments longer before finally coming to. She pants heavily as she picks herself up and shoots you a wicked smile. \"<i>I guess tha virgin was right, for once. Ya don't need sex for a good time.</i>\" She glances down at the squirming fairy and stoops to pick her up.  Abby takes her saliva-soaked braid and coils it around Pastie's small frame, binding her in the red tresses. The fairy struggles, starting to come to her senses. The goblin grabs your " +
                    this.cockDescript(x) +
                    ", nearly on the verge of orgasm from Scylla's sweet mouth, and pulls it down to her level. \"<i>That don't mean I gotta turn tha other cheek, though,</i>\" she laughs. With a swift motion, she takes the bound fairy and jams her little head into your pulsing urethra.\n\n",
                false
            );
            this.outputText(
                "The startling action is enough to make you lose control. Scylla's sucking mouth presses voracious kisses across your tender groin, your prostate churning in response to the moist stimulation. Teased by the nun's winding, looping tongue, bulges of jizz work their way up your spasming shaft to where Abby has trapped Pastie. The first dollop rolls against her head, and the fairy does her best to drink it down, her belly bloating a bit. Then, they start to come faster. The third load inflates her belly, and the sixth balloons her large enough to loosen the loops of Abby's hair keeping her tied up. She squirms out of the hair restraints and puts her arms at the head of your cock, trying to pull free before your next spurt. She's not fast enough, and your biggest load blasts her head right out of your dick with a splashing pop, sending the fairy careening head over foot through the air and onto the table, knocking bottles aside with the force of the cum geyser.\n\n",
                false
            );
            this.outputText(
                "Scylla releases the vacuum-like suction of her scarlet-lacquored lips and rises to nurse the last few loads out of you, suckling serenely, satisfied at the restraint you and Abby showed. The goblin merely laughs her ass off at Pastie's plastered form, writhing on the table, soaked inside and out, sloppy like a used condom. Abyon slaps the nun on the back and chuckles, \"<i>Gotta give it to ya, fatty, ya know a good time.</i>\" Scylla fills her cheeks with your final load and spins around, grabbing the goblin's shoulders and pressing a deep kiss onto her, bulbous lips sealing around the lower half of the green girl's face. Abby tries to speak and Scylla empties her cheeks, snowballing your cum and her saliva into the unsuspecting goblin's mouth. Surprised, she swallows reflexively and almost chokes on the volume of gooey cum that pours down her throat. The nun ends the kiss with a wet \"<i>muah!</i>\" and smiles.\n\n",
                false
            );
        }
        this.outputText(
            '"<i>Please stop calling me fat,</i>" she asks, innocently. "<i>You know, if that\'s all right with you.</i>"\n\n',
            false
        );
        this.player.orgasm();
        // [Next]
        this.doNext(this.scyllaPtVSexIV);
    }
    private scyllaPtVSexIV(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(this.images.showImage("scylla-help-round-five-sex-pt-four"), false);
        this.outputText(
            "When the four of you are ready to leave, Scylla gives you a big hug and thanks you for coming. Pastie, barely able to keep her overinflated form aloft, gives you a drunk kiss on the nose before slowly flying away. Even Abby gives you a friendly smack on the ass, rubbing her own tender rump gingerly. While your travels have guaranteed you'll always - and frequently - need a release, you don't think you're as much a slave to it as you used to be.",
            false
        );
        // [Libido Down]
        this.dynStats("lib", -1);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [Take Advantage] (at least 3 dicks)
    private addictionAdvantageMultiDickGreatTimeParty(): void {
        this.outputText("", true);
        this.outputText(this.images.showImage("scylla-help-round-five-multi-cock-one"), false);
        this.scyllaSprite();
        // [First time]
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00144] == 0) {
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00144]++;
            this.outputText(
                "You decide this is too good to pass by, so you step up to the ladies' room and knock crisply. Scylla opens the door curiously and smiles when she sees you. \"<i>Oh, " +
                    this.player.short +
                    ', what a pleasant surprise! We were just in the middle of a... the middle of...</i>" she trails off, noticing the look of wicked relish on your face and you push the seven-foot girl aside, stepping inside confidently. Her eyes drop to your crotch and her stomach rumbles loudly as she stares at the over-stuffed mass of cocks straining against your ' +
                    this.player.armorName +
                    '. Licking her lips without realizing it, the nun keeps trying to stay focused. "<i>This... um... what was I...</i>?" she mutters, unable to keep her thoughts together. Abylon regards you distrustfully but she bites her lips and rubs her legs together through her armor when your musk hits her. Pastie is too drunk to notice the sudden pressure in the room.\n\n',
                false
            );

            this.outputText(
                'No sense in playing coy when you\'re the drug in a room full of addicts. You use both hands to pull out your fleshy sheath of monstrous organs, letting them hang in the open air, twitching under the surveillance of three sets of horny eyes. "<i>I brought enough for the whole class,</i>" you grin, by way of invitation. The nun shakes her head, trying to clear her mind and failing, giggling involuntarily. The goblin trembles, her fists balled into pale knuckles.  "<i>Can\'t fight nature,</i>" she sneers, through clenched teeth. "<i>Like mother, like daughter.</i>" Pastie hiccups, trying to figure out what\'s happening.\n\n',
                false
            );

            this.outputText(
                "Scylla sinks to her knees and reaches out for your " +
                    this.cockDescript(0) +
                    ', wrapping long, thin fingers around it, almost worshipfully. Abby, meanwhile, crosses the distance between you faster than you would\'ve believed. "<i>If this is how it\'s gotta be, might as well do it right, ya dummies!</i>" she announces in her nasally tone, producing several vials from a small pouch. "<i>Normally use these at weapons, but we might as well get wasted on \'em.</i>" She waves Pastie over and the three girls line up in front of your tools, the fairy looking confused, the nun panting, and the complaining goblin a little too helpful for how much she protests.\n\n',
                false
            );
            // [Next]
            this.doNext(this.addictionScyllaTakeAdvantageDicksII);
        }
        // [Second and on]
        else {
            this.outputText(
                "Walking in on the three girls, you're a little surprised to find them apparently expecting you. Scylla has a deep blush across her pale cheeks but Pastie and Abby seem only too eager to see you again. \"<i>Gotta admit, that las' time was the most fun I've had in *hic!* in years,</i>\" the fairy admits, already kicking off her crystalline heels and wriggling out of her gossamer dress. Abby says nothing, but produces more bottles and rolls them around in her fingers, coyly, giving you a wicked wink. The nun sighs and manages a weak smile, \"<i>This is not what I wanted for these sessions, but I supposed it's better that we release our urges with you than with someone less savory.</i>\" You weren't expecting them to jump onboard the orgy thing so willingly, but then again, the self-restraint in the room could fit in a thimble and still have room for your thumb. Ah well, you shrug, on to the sex!\n\n",
                false
            );
            // [Next]
            this.doNext(this.addictionScyllaTakeAdvantageDicksII);
        }
    }

    // [Every Time]
    private addictionScyllaTakeAdvantageDicksII(): void {
        this.outputText("", true);
        this.outputText(this.images.showImage("scylla-help-round-five-multi-cock-two"), false);
        this.scyllaSprite();
        this.outputText(
            "\"<i>Age before beauty,</i>\" Abby snorts, elbowing Scylla's jiggling tit as she uncorks a white vial. The smell reveals its contents immediately- there's no mistaking the potent pheromone cocktail of minotaur cum. Scylla blinks, trying to clear her head long enough to scold the emerald-skinned girl for bringing that here, but Abby shooshes her with a dismissive wave. She takes the vial in one hand and your " +
                this.cockDescript(0) +
                " in the other. Carefully, she empties a third of the goo in a neat line from tip to root, her soft green hands stroking firmly as she does so that your erection keeps the slime more or less horizontal.  Moving to your " +
                this.cockDescript(1) +
                ", she repeats the process, emptying the last of the vial on your " +
                this.cockDescript(2) +
                ' before tossing the bottle behind her. "<i>Well?</i>" she asks her companions, "<i>gonna stare all day or we gonna do this?</i>"\n\n',
            false
        );

        this.outputText(
            "Placing one finger over her left nostril, Abylon lowers her head to your " +
                this.cockDescript(1) +
                " and runs her pug nose along the line of cum she's placed on your dick, snorting it as she does so. The girl's body shudders violently when she finishes, and she rubs her nostril rapidly with the back of her hand as the addictive jizz shoots through her sinuses, straight to her brain. She blinks wildly and lets out a great sneeze, a thin rope of spunk spraying from her nose to your abdomen. Pastie, meanwhile, is using your " +
                this.cockDescript(2) +
                " as a sticky slide. She flutters up high, dive-bombs your tip with a belly flop, and slips along the slippery flesh with a gleeful \"<i>Weeee!</i>\" When she bumps into your groin at the end of her slide, she's got a face-full of minotaur cum coating her head like a snowy mask. She giggles so hard that she snorts and rubs the goo from her eyes, her lithe body squirming atop your base. Scylla shakes her head, still fighting the inevitable orgy, but her lips part all the same, whorish flesh disobeying her mind's fading control. Her tongue snakes out between her plump pucker and laps at the alabaster trail, long muscle wrapping around your cockhead. The serpentine organ squeezes your " +
                this.cockDescript(0) +
                " as it slides up and down the shaft, coiling around the gooey line of seed, careful not to let any escape her famished maw. The tongue-job is nearly enough to give her a meal of your own, but you hold back, eager to see what else the girls do.\n\n",
            false
        );

        this.outputText(
            "Snotty cum-rope still dangling from her face, Abby grabs the next bottle and twists off the cork to the viscous green fluid eagerly. \"<i>I don't even like this junk, but mommy dearest always said never leave home without some, so whatever. Bottom's up!</i>\" She takes a swig of the gurgling liquor and practically gasps when she pauses for breath. Whatever change is taking place in her body, it seems to be a doozy. She loses her balance and drops down onto her rump, the bottle falling out of her grasp as she clutches her small chest with both hands, sweat beading on her lush green skin and rolling across her tight, leather armor. Pastie sees the fallen bottle and tumbles off of your " +
                this.cockDescript(2) +
                ", eagerly zipping  for the booze before the precious ale is wasted. The little lush zooms into the bottle with such force that she knocks it upright and tumbles inside with an audible 'bonk' of fairy head on glass. She laughs in her tittering voice, oblivious to the injury, and begins drinking what's left of the goblin ale, practically swimming in the verdant liquor. \"<i>Guess Fatty doesn't get any,</i>\" Abby mumbles, but the nun doesn't seem to mind, her tongue licking your " +
                this.cockDescript(0) +
                " to a glistening sheen before moving to your " +
                this.cockDescript(2) +
                " to clean up Pasty's cum-slide mess.\n\n",
            false
        );

        this.outputText(
            "The goblin girl looks at the spunk-lust on Scylla's face and the drunken revelry the fairy is getting up to in the bottle and sighs. She grabs the third bottle and holds it to the light. She's marked this one with a big, black label with a red exclamation mark in the middle. Judging by the delicate way she holds it, she seems almost afraid of the contents. \"<i>All right, mom, let's see what it's like ta be a numbskull...</i>\" she mutters, popping the cork off with a thumb and clenching her eyes as she drinks it in one gulp. Before your eyes, the goblin undergoes a startling transformation. Her small breasts swell larger and larger until they burst out of her leather armor, spilling green flesh across her chest. Her hips and butt wage a similar battle against her leather skirt, bursting the iron studs holding it together, bare skin jiggling in the warm air. Her lips bloat and plump up until they're tiny clones of Scylla's cock-sucking pucker, wobbling when she shakes her head. Her eyelids droop heavily and a blissful smile spreads across her face, annoyance and protests evaporating to the airheaded pleasure of the bimbo liqueur's seething influence. She giggles absently. \"<i>Tee hee, I feel funny. Good funny.</i>\" She notices your still-straining cocks and licks her lips. \"<i>Gosh, those for me? Tha's, like, SO NICE of ya, guy!</i>\" Glancing at Scylla's milking tongue, she puts her hand to her mouth and gasps. \"<i>Wow, you're, like, SOOOO pretty, Scy! Wanna race? First one ta get some cum wins!</i>\" She giggles and makes kissy-lips at the nun.\n\n",
            false
        );
        // [Next]
        this.dynStats("lus=", 100, "cor", 1);
        this.doNext(this.addictionScyllaTakeAdvantageDicksIII);
    }

    private addictionScyllaTakeAdvantageDicksIII(): void {
        this.outputText("", true);
        this.outputText(this.images.showImage("scylla-help-round-five-multi-cock-three"), false);
        this.scyllaSprite();
        this.outputText(
            "Scylla's completely checked out by now, so the very mention of cum is enough to bring a woozy smile to her face. Her empty blue eyes waver, trying to focus on your body and she lowers her lips to your prick, all too happy to accept Abby's challenge. The two girls slide your shafts into their wet-lipped mouths and you have to bite your lip to keep from bursting right there. Scylla's mouth has the practiced expertise of her addiction-driven thirst, but Abylon's fresh, whorish mouth is by far tighter than you were prepared for. What she lacks in practice, she makes up for with enthusiasm, swallowing your long inches without a moment's hesitation. You place a hand on the backs of each girl's heads and pump them along your shafts in alternating strokes, drool slopping across your members as a heady foam of pre-cum bubbles in their throats.\n\n",
            false
        );

        if (this.player.balls > 0) {
            this.outputText(
                "Your " +
                    this.ballsDescriptLight() +
                    " quiver with the building load and the bubble-brained goblin girl notices the swelling pulses tightening in her throat. She pops her head off your " +
                    this.cockDescript(1) +
                    " and turns to her competitor with a grin. \"<i>I'm winnnn-ing!</i>\" she taunts, just in time to see Scylla's cheeks bloat with the first load of your orgasm, " +
                    this.cockDescript(0) +
                    ' erupting in her lewd mouth, her obscene tongue suckling with a vacuum-like pressure. Abby drops her jaw in disappointment and whines "<i>Aw, why isn\'t mine working?</i>" as she swings back to your ' +
                    this.cockDescript(1) +
                    " just in time for your urethra to dilate. A blast of jizz catches her directly in her unsuspecting face, hot streams lancing into her pug nose's large nostrils hard enough to spill back out of her still-open mouth. You grab her dumb-founded head and jam her onto your shaft in time to pump another load into her slut-shifted body before tossing her back on her ass, discarding the loser of the contest.\n\n",
                false
            );
            this.outputText(
                "Scylla casts her nun's habit aside as your churning cum causes her tiny demonic nubs to grow into large, curving horns. Pulling the front of her dress down, she bears her huge breasts, the mouth nipples hungrily opening as she scoops the mountainous tit-flesh in both arms and brings her mammary mouths level with your " +
                    this.cockDescript(0) +
                    " and " +
                    this.cockDescript(1) +
                    ". You push into her chest just as your orgasm begins to flag and Scylla's perverse body rekindles your climax as the thirsty mouths seal around your shafts, drinking your seed gratefully, swelling with the meal of spunk you're feeding them. Grabbing the lips of Scylla's tit-mouths you squeeze tight enough to make the pink skin bright red and she gasps as you attempt to sate her endless cum thirst. She shakes her head back and forth rapidly, hair wildly thrashing in the air, her breasts growing heavier under the orgasmic glee of her overstimulation. Milk begins to leak and squirt at each wet thrust you give her chest and the nun's back arches in rapture as she babbles incoherently, putty in your hands. Your balls churn one final time and you bottom out in the nun's body to spray a long, toe-curling gush of creamy lather into her profane mammaries before pulling out and letting her fall backward, mindlessly climaxing, while milk and cum spurt out of her clit-sensitive lipples with each heartbeat.\n\n",
                false
            );
        } else {
            this.outputText(
                "Your hips quiver with the building load and the bubble-brained goblin girl notices the swelling pulses tightening in her throat. She pops her head off your " +
                    this.cockDescript(1) +
                    " and turns to her competitor with a grin. \"<i>I'm winnnn-ing!</i>\" she taunts, just in time to see Scylla's cheeks bloat with the first load of your orgasm, " +
                    this.cockDescript(0) +
                    ' erupting in her lewd mouth, her obscene tongue suckling with a vacuum-like pressure. Abby drops her jaw in disappointment and whines "<i>Aw, why isn\'t mine working?</i>" as she swings back to your ' +
                    this.cockDescript(1) +
                    " just in time for your urethra to dilate. A blast of jizz catches her directly in her unsuspecting face, hot streams lancing into her pug nose's large nostrils hard enough to spill back out of her still-open mouth. You grab her dumb-founded head and jam her onto your shaft in time to pump another load into her slut-shifted body before tossing her back on her ass, discarding the loser of the contest.\n\n",
                false
            );
            this.outputText(
                "Scylla casts her nun's habit aside as your churning cum causes her tiny demonic nubs to grow into large, curving horns. Pulling the front of her dress down, she bears her huge breasts, the mouth nipples hungrily opening as she scoops the mountainous tit-flesh in both arms and brings her mammary mouths level with your " +
                    this.cockDescript(0) +
                    " and " +
                    this.cockDescript(1) +
                    ". You push into her chest just as your orgasm begins to flag and Scylla's perverse body rekindles your climax as the thirsty mouths seal around your shafts, drinking your seed gratefully, swelling with the meal of spunk you're feeding them. Grabbing the lips of Scylla's tit-mouths you squeeze tight enough to make the pink skin bright red and she gasps as you attempt to sate her endless cum thirst. She shakes her head back and forth rapidly, hair wildly thrashing in the air, her breasts growing heavier under the orgasmic glee of her overstimulation. Milk begins to leak and squirt at each wet thrust you give her chest and the nun's back arches in rapture as she babbles incoherently, putty in your hands. Your prostate churns one final time and you bottom out in the nun's body to spray a long, toe-curling gush of creamy lather into her profane mammaries before pulling out and letting her fall backward, mindlessly climaxing, while milk and cum spurt out of her clit-sensitive lipples with each heartbeat.\n\n",
                false
            );
        }
        this.outputText(
            "Your " +
                this.cockDescript(2) +
                " pulses, unsatisfied, and you stoop to grab the inebriated, encapsulated fairy from the ground. You try to shake her loose, but the drunk seems to have finished off half a bottle of goblin ale and her belly is overburdened with the liquid weight. Her lower torso slides out of the neck of the glass, but her bloated belly gets stuck in the neck, pinning the girl in place. Shrugging, you position the trapped girl over your cockhead and push at the tiny slit between her delicate legs. To your considerable surprise, she slides open, fairy pussy stretching like elastic around the tip of your " +
                this.cockDescript(2) +
                ". Apparently her overdose of Goblin Ale has made her considerably deeper and wider than her fey frame would suggest. The fairy is yelling something, but the glass drowns out her voice, so you go ahead and push deeper, delighting in the feel of Pastie's pussy sucking down inch after inch of your cock. Her body distorts wildly until she's little more than a flesh-colored condom from the neck down. She's just too tight to hold on long, however, and your " +
                this.cockDescript(2) +
                " erupts inside her, seed overflowing even the renewed elastic capacity of her womb. The pressure pops the girl back into the bottle and you jam your cockhead into the neck of the glass as your spunk splatters over the trapped, semen-stuffed girl. Before long, your shuddering orgasm has begun to fill the bottle and Pastie floats to the narrow top, buoyed by her liquid-fat body. When your ejaculate slows to a trickle, you let the bottle drop, the sperm-bubble of a fairy utterly blitzed and swimming helplessly inside the sea of spunk.\n\n",
            false
        );
        // [Next]
        this.player.orgasm();
        this.doNext(this.addictionScyllaTakeAdvantageDicksBonusAndEpilogue);
    }

    private addictionScyllaTakeAdvantageDicksBonusAndEpilogue(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(this.images.showImage("scylla-help-round-five-multi-cock-four"), false);

        // Array of all possible scenes
        var blah: any[] = new Array(0);
        // Add possible scenes to array
        if (this.player.totalCocks() >= 4) blah.push(4);
        if (this.player.tentacleCocks() > 0) blah.push(5);
        if (this.player.demonCocks() > 0) blah.push(6);
        // Pick an available scene and store it in select.
        var select: number = blah[Scylla.rand(blah.length)];

        // [If the player has 4 dicks]
        if (select == 4) {
            this.outputText(
                "Abby picks herself off the ground, giggling woozily and fingering her newly inflated lips. \"<i>That was fun! But don'tcha wanna knock me up? Gimme lots of little babies like my mommy?</i>\" She squeezes her bimbo-enlarged tits and flutters her eyelashes longingly. You command her to turn around and she gladly complies, wiggling her chubby, emerald butt. You can feel the heat pouring off of her wet sex from several feet away and it's enough to bring your other dicks back to hardness. The goblin girl's cocktail of drugs seems to have put her in an intense heat, like a mare in rutting season. Your " +
                    this.cockDescript(3) +
                    " stiffens painfully and you grab Abylon's fattened hips roughly, jerking her onto your shaft, the green curtains of her labia slurping your length with the moist sound of the excited girl's fluids squirting from her body. \"<i>If I'm gonna be like mom, I gotta get all I can!</i>\" she giggles, bending between her legs and grabbing at your crotch. She pulls your " +
                    this.cockDescript(2) +
                    " and slides it inside her pussy, then reaches with both hands for your " +
                    this.cockDescript(0) +
                    " and " +
                    this.cockDescript(1) +
                    ", pressing them together and aiming for her anus.\n\n",
                false
            );

            this.outputText(
                "With a goofy tittering, she takes a bouncing leap backward,  your cocks worming into her lubricated asshole and forcing you to catch the buttslut to keep her on your poles. With four dicks filling the goblin, Abby's belly balloons outward, her hips stretching tightly to accommodate the doubled double-penetration. Your lengths rub against each other perversely as you lift the goblin up and down, working more of your considerable girth into her jam-packed body. \"<i>Wee! Bouncy, bouncy, bouncy!</i>\" Her mounds jiggle with the motion and she plays with them happily, oblivious to the boner bouquet you've made of her nethers. The bimbo-breasted girl gleefully rides you all the way down to your base, her body impaled on your quartet of cocks until it seems like they're about to come out of her throat. You smack Abby's plump rear and she shrieks in joy, wiggling her legs uselessly, stroking the cock bulges that push out between her breasts. She tightens even further at the slap, so you give her another, with similar results. You keep spanking the whorish girl and she keeps tightening around you until the pressure is almost unbearable, despite her potion-inflated uterus. Grabbing hold of the girl's shoulders, you grunt as your four cocks unload, cum inflating the goblin in the blink of an eye. The fluid floods her innards and, with a body-shaking laugh, you release your grip, the fire hoses of your crotch launching the green fucktoy off your crotch, twin jets of jizz flooding from her body as she lifts into the air and bangs her head on the ceiling, tumbling to the ground in a thumping roll. Abylon shakes her head, dazed by the rocket-fuck and claps her hands together. \"<i>Again! Again! I wanna go again!</i>\"\n\n",
                false
            );
        }
        // [If the player has a tentacle dick]
        if (select == 5) {
            this.outputText(
                "As you take a moment to catch your breath, you notice Pastie's bottle rolling back and forth as she wriggles around in your fifth of cum-cream. She's managed to get her tiny arms through the neck of the bottle and, with a determined grunt, pulls her jizz-brimming body out of the glass with a moist pop. She flutters her wings as hard as she can and barely manages to take flight, wobbling in the air and dripping splatters of cum across the floor as she tries to rein in her over-loaded senses. A delightful thought strikes and you move closer to the drugged and drunk girl with a grin plastered on your face. Sweetly, you ask the girl if, with all the time she spends in the city, she ever misses the forest. She hovers, staring blankly. \"<i>I guess?</i>\"\n\n",
                false
            );
            this.outputText(
                "Stroking your writhing tentacle cock to life, you flash a smile that shows all your teeth and offer to make her feel more at home. Your whip-like erection lashes out, plucking the fairy from the air like low-hanging fruit, her gushing body squelching wetly as you coil your flesh around her torso, the liquid fat tummy bulging between your pulsing loops. She wriggles, still not understanding until you've wrapped her entirely in your snake-like appendage, its bulbous head circling around just inches from her face. You rub your glans against her cheek, almost affectionately, before flexing your urethra open and pressing it against the tiny girl's head. \"<i>Oh noooo,</i>\" she wails, \"<i>Not tentacle rape! I get away from fuckin' forest monsters and they jus' follow me here!</i>\" Her next sentence is cut off when you press her face into your mouth-like slit, the warm flesh sucking her features into your tentacle. She struggles in the embrace of your winding grasp and succeeds only in stimulating the twitching flesh, globs of pre-cum leaking up your shaft. When the bulbs begin to circle around her body, her panic intensifies and the fairy practically throbs in your curling length.\n\n",
                false
            );

            this.outputText(
                "Pumping your tip on and off of Pastie's head, you use the girl's delicate features to stimulate your sensitive hole, your pre bubbling onto her face in sticky balloons of white goo. She sputters and tries to spit it out, so you go ahead and cut to the chase. With a fleshy lunge, you slam your urethra down on the girl's head and tighten your grip around her body. She spasms under the assault and flaps her wings with every bit of strength left to her, nearly pulling free. The wild bucking, pleasantly enough, is enough to bring you over the edge. You watch with satisfaction as your spunk travels in bulbous wads up your length and around the fairy's thrashing body, making you shudder as your jizz-bloated flesh strokes the full length of Pastie's elegant body, from the tips of her delicate feet up to the pouting nipples of her delectable breasts. Finally, it reaches the tip of your urethra and the tentacle mushrooms at the girl's head as the liquid weight of your spunk presses against her encapsulated face. She struggles but bulb after bulb builds up until the pressure is too great and it begins spraying in wild trails all across the girl's bound body. She slumps, unable to keep fighting and you can feel her begin to swallow, adding heavy ounces of slimy spunk to her liquor-stuffed belly. When you finally release her, the fairy is dazed to the point of emptiness and stares unblinking into the air, her bloated chest rising and falling mechanically, deep in the trance of some semen-drugged hallucination.\n\n",
                false
            );
        }
        // [If the player has a demon dick]
        if (select == 6) {
            this.outputText(
                'Satisfied with the moist girls strewn around the room, you turn to leave and find a hand gently grabbing your leg. Scylla has crawled across the floor and looks up at you with blank, azure eyes and an empty smile. "<i>Please, let me heal you,</i>" she whispers, rising to her knees and stroking your demonic prick with trembling fingers. "<i>C-c-corruption must be cleansed. Please, let my body take the curse from you. I want... need to...</i>" She trails off as she places a shuddering kiss on your cockhead, the purplish penis jumping to life at the touch of the nun\'s crimson, dick-sucking lips. With a stumbling, half-remembered prayer, the bliss-blasted girl slides your length into her mouth, the throat parting like a well-trained pussy as you push into her jizz-devouring body.\n\n',
                false
            );

            if (this.player.balls > 0)
                this.outputText(
                    "An unfamiliar tingling starts at the base of your shaft and rushes to your tip in another second, sending cold chills through your frame. You can feel the bulbous protrusions of your infernal fuck-pole rippling inside Scylla's esophagus as she clenches down, muscles like a fist tightening on your prick. It almost feels like she's squeezing your flesh to its twitching core, milking your creamy center. The bumpy protrusions deforming the nun's neck flatten and deflate before your eyes and a spine-twisting rapture erupts from the tip of your cock. It's all you can do to grip the girl's curling horns to brace yourself from falling over. A sensation of teeth-clenching pleasure erupts from your " +
                        this.ballsDescriptLight() +
                        "  like no orgasm you've ever experienced, making you rock back on your heels and slam the nun's face against your groin. Scylla's expression shifts from mindless joy to suffocating ecstasy , her eyes rolling up in her head, body vibrating with a rolling orgasm, tiny hacking gasps escaping her throat as your climax pours hot, liquid relief into her belly.\n\n",
                    false
                );
            else
                this.outputText(
                    "An unfamiliar tingling starts at the base of your shaft and rushes to your tip in another second, sending cold chills through your frame. You can feel the bulbous protrusions of your infernal fuck-pole rippling inside Scylla's esophagus as she clenches down, muscles like a fist tightening on your prick. It almost feels like she's squeezing your flesh to its twitching core, milking your creamy center. The bumpy protrusions deforming the nun's neck flatten and deflate before your eyes and a spine-twisting rapture erupts from the tip of your cock. It's all you can do to grip the girl's curling horns to brace yourself from falling over. A sensation of teeth-clenching pleasure erupts from your abdomen like no orgasm you've ever experienced, making you rock back on your heels and slam the nun's face against your groin. Scylla's expression shifts from mindless joy to suffocating ecstasy , her eyes rolling up in her head, body vibrating with a rolling orgasm, tiny hacking gasps escaping her throat as your climax pours hot, liquid relief into her belly.\n\n",
                    false
                );
            this.outputText(
                "When your crescendo finally ends, you notice that in your shuddering throes, you lost control of your other cocks, the slutty nun's blowjob drawing a pearl eruption from every member of your squirming mass of dicks. A gooey white glaze drips from the ceiling, splatters the walls, and soaks all three girls in sticky cocoons of seed. When you slide out of the cum-dump you've made of the nun's throat, a snarky comment about over-achievers dies on your lips. Your slippery, drool and spunk-soaked shaft has lost its fiendish features and has been smoothed down to a normal, flesh-colored penis. Scylla has literally sucked the corruption from your dick! A glossy blackness leaks from her plump lips, staining them ebony and she licks her pucker with a thrashing, serpentine tongue. She soundlessly mouths wordless prayers, trying to restrain the seething demonic taint boiling through her body, driven wild by the raw sexual stimulation overloading her saccharine-sweet demeanor. Probably best to get out of here before she gives into further temptation- you might not survive the next blowjob!\n\n",
                false
            );
            // [Demon dick reverted to human dick. End bonus encounter]
            this.temp = this.player.cocks.length;
            while (this.temp > 0) {
                this.temp--;
                if (this.player.cocks[0].cockType == CockTypesEnum.DEMON) {
                    this.player.cocks[0].cockType = CockTypesEnum.HUMAN;
                    this.dynStats("cor", -3);
                    break;
                }
            }
        }
        // [Exit text for all encounter scenarios]
        this.outputText(
            'The room is a horrible, slimy mess by the time the four of you are done and you doubt if some of those cum-stains are going to ever come out of the carpets. Scylla is still out of it, and you doubt Pastie is going to be able to move for at least 24 hours, but Abby is on her feet again, ready for another ride. You notice a flask sticking out of the busted remains of her leather armor, miraculously intact despite the rough fucking you gave her. The bottle has a little note attached to it by a string and you pluck the vial from the giggling minx, unfolding the note carefully. It reads "<i>In case of Slut-ification.</i>" The concoction is thick and swirls with a golden light that reminds you of honey. When the goblin sees the light reflecting in the bottle, her wide eyes turn into dinner plates. "<i>Oooo... so shiny...</i>" She jumps up and down eagerly, her swollen breasts and jiggling butt wobbling heavily. You drop the mixture down to Abylon and she gleefully swallows it without hesitation. Her smile slowly fades and she blinks rapidly, eyes narrowing to a furrow. Her lips and breasts deflate to normal proportions, though her rump retains its weighty size. Gradually, the bubble-brained goblin\'s expression settles back into a familiar scowl of annoyed self-repression. "<i>Damnit, I knew carrying all tha\' potions around would be trouble sooner or later</i>," she grumbles, sticking a couple of fingers in her cunny, drawing a sloppy wad of your spunk out. "<i>At least I wasn\'t hopped up on mom\'s baby fertilizer too,</i>" she sighs. Glancing at her companions, she turns back with an expression of genuine amazement. "<i>All right, I\'ll admit it: I\'m impressed. Maybe yer not sucha doof after all.</i>" She gives you a smack on the ass and scoots you out of the room. "<i>Ya still can\'t call me Abylon, but I guess I don\'t mind ya comin\' round again.</i>"  With that, the green girl shoos you out and into the hall, dicks still hanging out, tossing your clothes out after you.',
            false
        );
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Scylla #6 - Cat Scratch Fever
    public Scylla6(): void {
        this.spriteSelect(59);
        if (this.flags[kFLAGS.NUMBER_OF_TIMES_MET_SCYLLA] < 6)
            this.flags[kFLAGS.NUMBER_OF_TIMES_MET_SCYLLA] = 6;
        this.outputText("", true);
        this.outputText(
            "For once, the Wet Bitch isn't terribly crowded, the few people in the bar finishing their drinks and heading out. Scylla is one of those on their way out of the bar- she's just finishing a suspiciously creamy coffee when you catch her attention. She apologizes that she's just now leaving, but invites you to join her on a walk around town. She often ministers to the ill and homeless and would welcome an extra set of hands at her modest soup kitchen. You're not really enthusiastic about that plan, but to be honest, you're a little curious to see how a cum-hungry, bimbo-proportioned, bashful nun serves her religion.\n\n",
            false
        );
        this.outputText(
            "The two of you step out into Tel'Adre's streets and you take Scylla's hand in the crook of your arm as you escort her. As strange a sight as the two of you are, few people look your way. In a city of numerous anthro-morphs, you suppose your own form isn't all that disturbing. The thought is vaguely comforting and you think you understand why Scylla chose to live here, rather than on church grounds. The buxom giantess may tower over most people, but centaurs are larger still. When people routinely wear rubber bondage suits and lace-thin bikinis, a full nun's habit barely even counts as a fetish outfit. And while her milk-bloated tits, with their puffed-out nipple lips are certainly notable, there are mice herms with cocks larger than they are, a bevy of ring studs piercing the towering organs like a ladder. Actually... people-watching in town might not be a bad pastime, you think to yourself while rubbing between your thighs when the nun isn't watching.\n\n",
            false
        );

        if (this.player.balls > 0)
            this.outputText(
                "Scylla guides you with polite little directions, pointing demurely at houses you pass by and letting you know a bit about their inhabitants. The cobbler over there just recovered from a terrible accident and has regained the use of his legs. That baker caught ill last week and is finally on the upswing. The family there found their missing daughter after searching high and low yesterday night. She seems happy to be able to tell you all the positive, encouraging things that would've seemed to be mundane back home. Here, in this demon-tainted land, every small blessing seems a miracle.\n\n",
                false
            );
        else
            this.outputText(
                "Scylla guides you with polite little directions, pointing demurely at houses you pass by and letting you know a bit about their inhabitants. The cobbler over there just recovered from a terrible accident and has regained the use of his legs. That baker caught ill last week and is finally on the upswing. The family there found their missing daughter after searching high and low yesterday night. She seems happy to be able to tell you all the positive, encouraging things that would've seemed to be mundane back home. Here, in this demon-tainted land, every small blessing seems a miracle.\n\n",
                false
            );
        this.dynStats("lus", 5 + this.player.lib / 20);
        this.outputText(
            "The nun guides you down an alley, talking about how she saw a bunny the other day when a couple of felines rush past, jostling you as they do so. You pat your pockets and notice they're emptier than usual, so you let go of Scylla's hand and turn around to chase the thieves. As you do so, you hear a soft shuffling behind you and the nun gasps.\n\n",
            false
        );
        // var duck: number = 0;
        // [Next][Duck! (high int/speed only)]
        this.simpleChoices(
            "Next",
            this.Scylla6SLOW,
            "Duck!",
            this.Scylla6DUCK,
            "",
            undefined,
            "",
            undefined,
            "",
            undefined
        );
    }
    // (super high Intelligence or speed)
    private Scylla6DUCK(): void {
        this.spriteSelect(59);
        this.outputText("", true);
        this.outputText(
            "You turn in time to spot the ambush and drop low, a pipe swinging just past your head and cracking a brick next to you. Sweeping low, you knock your attacker's legs out from under him and rise into a defensive stance. A dozen cat-morphs have crept up behind you, silently seizing Scylla. The felines hiss, startled by your acute awareness and suddenly doubting their plan of attack.  You decide to end this before it gets too bloody, so you slowly curl your fingers into a fist, audibly cracking each knuckle on your hand one after the other. You rise to your feet and flick your ear with your thumb, chuckling. \"<i>You really broadcast that one,</i>\" you start, speaking slowly and loudly enough for your voice to bounce around the cramped alley. \"<i>But I'm sure you've got better. I mean, you know what I'm capable of. I've had demons helpless at my feet. Minotaurs three times your size cower when they remember my face. Surely you didn't just attack us at random? Nobody's luck is that bad. No, you're definitely trained professionals and not a miserable pack of errant transients, too drugged out to appreciate the scope of the mistake they've just made. So you'll be ready for the worst I've got. And oh, it is going to be DREADFUL.</i>\"\n\n",
            false
        );

        this.outputText(
            'The cats need no further encouragement, and scatter in terror. You chuckle and brush the dirt from your clothes before helping Scylla back to her feet. The nun looks at you, worried, but places a gentle hand on your shoulder and gives you a stare with her big, blue eyes. "<i>Thank you, truly, but please take a softer touch with people. Everyone has their own challenges and whenever we can, we should pity and forgive, not threaten and terrify. Um. If that\'s okay with you?</i>" She looks embarrassed to be scolding you and hurries away, leaving you to your devices.',
            false
        );

        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // (Normal Characters)
    private Scylla6SLOW(): void {
        this.spriteSelect(59);
        this.outputText("", true);
        this.outputText(
            "Too late, you realize the pickpockets were a distraction, and before you can whip around, a heavy weight cracks against the side of your skull, turning your world into a pin point of pain in an ocean of black unconsciousness. You muscles become jelly and you don't remember falling to your knees or slumping against the brick wall of the alley",
            false
        );
        if (this.flags[kFLAGS.KATHERINE_UNLOCKED] < 1)
            this.outputText(
                ", but the last thing you remember is the soft jingling of a small bell",
                false
            );
        this.outputText(".\n\n", false);
        this.dynStats("lus", 5 + this.player.lib / 20);
        // [If the Player is Lactating]
        if (this.player.biggestLactation() >= 1 && Scylla.rand(2) == 0) {
            this.outputText(
                "You awaken shortly after the assault and try to move, but your limbs are oddly unresponsive. You shake your head and twist your wrists, but your hands feel distant and immobile. There is a weight on your legs that pins them down, though it is quite warm and soft. You blink and take in your situation. There are figures all around- the same cat-morphs who attacked you, presumably. Several of them have taken to sitting atop your lower body, their tails curling around your limbs as they sniff you appreciatively. Your arms appear to be bound behind your back by what feels like a loop of thick leather. The more you struggle, the tighter the fetter gets, cutting into your wrists and leaving a seething coldness shooting through your fingertips.\n\n",
                false
            );

            this.outputText(
                "You've been stripped down, your bare breasts spilling atop your chest, nipples stiff from the cool cobblestones beneath you. The alley they've dragged you down is dim from the overhanging roofs of the brick buildings, but not so dark you can't make out the hungry expressions on the faces of the cats around you. They must've smelt your milk and ambushed you to take it by force. But where is Scylla? You crane your neck and see the nun strung up nearby.\n\n",
                false
            );

            this.outputText(
                "Scylla has apparently been cat-napped as well and is in something of a compromising position. Using what looks like a long, leather leash, they've laced her ankles together and bound her upside-down from the building's gutters. Her robe has fallen away from her long, lean, stocking-clad legs but her thighs' plumpness has preserved her modesty; the black velvet dress is bunched up just shy of exposing her panties. She's hung so that her head is barely two feet off the ground, but her titanic tits heave around her neck and chin, the top half of her robe neatly cut away by her captors' claws. Her habit is missing, allowing her long hair to spill onto the street in a large pool of jet curls. Her hands have been tethered at the level of her waist with a cat's collar, the sad little bell on it jingling at her vain movements. The bondage presses her arms against the sides of her breast, clenching her tits together tightly, presenting her udders like waiting taps. She squirms enough to knock one of her shoes off and you can't help but notice she was wearing small, black heels with fuck-me stilettos over her white lace stockings.\n\n",
                false
            );

            this.outputText(
                "The cats around the two of you are jittery and mill impatiently. Males and females dressed in rags eye the pair of you with ill-concealed thirst, licking their lips with long, rough tongues. They're quite small, between four and five feet tall, but look lean and fast. Even if you broke your restraints, they'd be on you in an instant. You weren't too far from the city's dusty streets- if you can distract them for long enough, Urta or one of the other city guards should be along shortly. If you yelled for help, they might find you faster, but it would probably spook the felines away and, you have to admit, the furry bodies crawling atop you feel pretty good.\n\n",
                false
            );
            // [Yell]      [Wait]    [Kick Ass (Super high str only)]
            var kickass = undefined;
            if (this.player.str >= 85) kickass = this.lactateAndKickAss;
            this.simpleChoices(
                "Yell",
                this.Scylla6YellForHelp,
                "Wait",
                this.Scylla6MilkyWait,
                "Kick Ass",
                kickass,
                "",
                undefined,
                "",
                undefined
            );
        }
        // else! //[Player is not Lactating]
        else {
            this.outputText(
                "When you come to, you're just as your attackers left you. They even dropped your stolen gems at your feet. For once, it seems, your assaulter hasn't robbed you. A quiet gasp from around the corner tells you where Scylla's been taken. You gather your wits and lean on the wall as you dazedly stagger to the corner and peek around. Your assailants seem to be more felines, mostly small and armed with pipes.  That would explain the force of the concussion that loosened your jaw, and you grumble, rubbing the blood-crusted bruise at your temple. There are nearly a dozen cat folk, men and women, none taller than five feet, but all looking quite disheveled, like addicts in withdrawal. They're whispering and sniffing the air, though much of their attention is focused on their prey.\n\n",
                false
            );

            this.outputText(
                "Scylla has apparently been cat-napped and is in something of a compromising position. Using what looks like a long, leather leash, they've laced her ankles together and bound her upside-down from the building's gutters. Her robe has fallen away from her long, lean, stocking-clad legs but her thighs' plumpness has preserved her modesty; the black velvet dress is bunched up just shy of exposing her panties. She's hung so that her head is barely two feet off the ground, but her titanic tits heave around her neck and chin, the top half of her robe neatly cut away by her captors' claws. Her habit is missing, allowing her long hair to spill onto the street in a large pool of jet curls. Her hands have been tethered at the level of her waist with a cat's collar, the sad little bell on it jingling at her vain movements. The bondage presses her arms against the sides of her breast, clenching her tits together tightly, presenting her udders like waiting taps. She squirms enough to knock one of her shoes off and you can't help but notice she was wearing small, black heels with fuck-me stilettos over her white lace stockings.\n\n",
                false
            );

            this.outputText(
                "The cats are milling around her colossal chest, anxious and jittery. Between Scylla's position and the pressure her bound arms are putting on her supple tit flesh, the nun's nipples have begun leaking drops of her creamy, thick milk, the smell of which seems to be driving the cats wild. Still, they're holding back, perhaps because they've never seen lips on boobs before. Maybe it's the concussion talking, but between the sight of all that exposed flesh and the heat pouring off of their puffed genitals, you're starting to feel a little hot under the collar. They haven't noticed you yet. What will you do?\n\n",
                false
            );

            var submit = undefined;
            var rapeWorld = undefined;
            if (this.flags[kFLAGS.KATHERINE_UNLOCKED] < 1) {
                if (this.player.hasVagina()) submit = this.Scylla6NoMilkSubmit;
                rapeWorld = this.Scylla6NoMilkRAPETHEWORLD;
            }
            // [Get Help] [Submit (VAGINA+DICk ONLY)] [Rape]
            this.simpleChoices(
                "Get Help",
                this.Scylla6NoMilkGetHelp,
                "Submit",
                submit,
                "Rape",
                rapeWorld,
                "",
                undefined,
                "",
                undefined
            );
        }
    }
    // [Kick Ass]
    private lactateAndKickAss(): void {
        this.spriteSelect(59);
        this.outputText("", true);
        this.outputText(
            "Cracking your neck, you decide to end this right now. Flexing your nearly unholy strength, you easily break the leather collar binding your hands and rise to your feet, dumping the cats pining you down to their asses. The felines hiss and leap backward, fearful of your might. You rub the bridge of your nose with the back of your hand, sniffing. \"<i>I enjoy a good joke,</i>\" you start, speaking slowly and loud enough for your voice to bounce around the cramped alley. \"<i>But you have to be kidding me. Cats? I've beaten demon overlords into bloody pulps. I've nearly torn the head off an imp with my bare hands. I've stomached a lot of crap since I came through the portal, but nothing I've drank or eaten, no matter how foul, has been as hard to swallow as this pathetic little ambush. I'm going to count to three and then I'm going to fuck the closest thing I lay my hands on. And if a hole isn't convenient, I'll make my own. Understand? One.</i>\"\n\n",
            false
        );

        this.outputText(
            'The cats need no further encouragement, and scatter in terror. You chuckle and brush the dirt from your clothes before helping Scylla down from her perch. The nun looks relieved but you can see worry in her big, blue eyes as she places a gentle hand on your shoulder. "<i>Thank you, truly, but please take a softer touch with people. Life gives everyone challenges and whenever we can, we should pity and forgive, not threaten and harm. Um. If that\'s okay with you?</i>" She looks embarrassed to be scolding you and hurries away, leaving you alone in the alley.\n\n',
            false
        );
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [Yell]
    private Scylla6YellForHelp(): void {
        this.spriteSelect(59);
        this.outputText("", true);
        this.outputText(
            "You fill your lungs and scream for help as loudly as you can. The cats lying on you hiss and rake your exposed flesh with their needle-like claws. One tries to jam a leather ball in your mouth to gag you, but the damage is done. The clattering rush of the city guard surrounds the alley from both directions and the cats find themselves trapped. A few try to bolt between the guards, but a well-placed centaur kick knocks one into an unconscious slump and the others quail from the guards, huddling into a scared group.\n\n",
            false
        );

        this.outputText(
            "One of the guards, a canine woman with shaggy golden brown and crisp white fur, stoops down to pull the leather ball gag from your mouth, leaving the taste of catnip on your tongue. She unties you and instructs several of her men to get Scylla down. When the two of you are free and dressed again, the dog-lady gestures at the cats with a growl.\n\n",
            false
        );

        this.outputText(
            '"<i>Sorry about this. These damned milk-freaks have been coming out of the woodwork lately. A real menace, if you ask me. Don\'t worry, they\'ll never bother you again.</i>" She pauses, as an unpleasant thought strikes her and she makes a face. "<i>Unless... you were just up to some moronic exhibition-bondage crap?</i>" She manages to blush despite the stern tone, bobbed ears lowering. The cats look pitifully at you, tired, hungry, and horny despite their predicament. Will you turn them in, or lie to cover for them?\n\n',
            false
        );
        // [Truth] [Lie]
        this.simpleChoices(
            "Truth",
            this.Scylla6AfterYellTruth,
            "Lie",
            this.Scylla6AfterYellLie,
            "",
            undefined,
            "",
            undefined,
            "",
            undefined
        );
    }
    // [Truth]
    private Scylla6AfterYellTruth(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(
            '"<i>These drifters attacked us in broad daylight,</i>" you spit in disgust. "<i>Lock them up, banish them from the city, do whatever it is you do. I never want to see these furry freaks again.</i>"\n\n',
            false
        );

        this.outputText(
            "\"<i>Gladly,</i>\" the Collie watchwoman replies, her tail wagging rapidly. The watch tie up the cat-morphs and lead them out of the alley in a single-file march. \"<i>Cats,</i>\" the dog curses. You vaguely wonder if that would be considered racist here in Tel'Adre, but decide you really don't care. Scylla looks a little perturbed that you had all the felines arrested, but you suspect the nun would've forgiven them for rape and murder too, if you hadn't called for help. Well, she can just forgive your latest transgression, you grumble to yourself, annoyed by her lack of appreciation. You head back to camp.",
            false
        );
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // [Lie]
    private Scylla6AfterYellLie(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(
            "You pull the watchwoman aside, away from the too-honest nun, and explain that it was all just a misunderstanding. You asked the cats to tie you up because you've got a bit of a bondage fetish, but you forgot the safe word in your pleasure. You promise it won't happen again. The Collie woman eyes you suspiciously but is stuck- without your testimony, she's got to let the cats go.\n\n",
            false
        );

        this.outputText(
            "\"<i>But I'm going to fine you for this!</i>\" she barks, annoyed. \"<i>Keep your sex life behind closed doors and don't waste the watch's time again!</i>\" She collects her fee and disperses the Guard with another bark before turning to leave herself, tail curled up in irritation. The cats scatter too, but you're pretty sure you'll see them again as long as you're still lactating. Scylla's not sure what you told the watch, but she thanks you for your kindness with a kiss on the forehead and excuses herself; it's been a busy day and she's late for the soup kitchen. You muse that she'll probably end up feeding the same cats just recently denied a meal.",
            false
        );
        this.player.gems -= 10;
        this.statScreenRefresh();
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // [Wait]
    private Scylla6MilkyWait(): void {
        this.spriteSelect(59);
        this.outputText("", true);
        this.outputText(
            "You don't want to risk aggravating junkies while you're unable to defend yourself, especially while all your sensitive bits are in claw's reach of the kitties. You shiver as they begin to lick at your breasts, four felines crowding around your chest, whiskers tickling your nipples as coarse, wet tongues moisten your mounds. Their combined purring sends electric vibrations through your body, drowning out the anger and pain of the attack. Fuzzy faces and hot tongues slather your tits up to the nipples, coaxing small, white drops to the surface. They draw a weak moan from you as each cat takes a turn lapping at your leaking nubs, their rough tongues textured like slick sandpaper, softly scratching your vulnerable teats just enough to leave you panting for more.\n\n",
            false
        );

        this.outputText(
            "The others seem to have made up their minds about Scylla's unusual bosom and they creep up to her hanging mammaries like hunters stalking their prey. The nun fidgets nervously, but holds her tongue as the cat-morphs begin the same treatment for her hulking chest. Her nipple mouths begin leaking almost immediately, however, and it's all the felines can do to lick the pale creamy foam from her alabaster flesh before it drips to the ground to wet her coiling hair. The women drinking from Scylla thrash their tails around their legs and the men shift to accommodate their swelling erections. Under her drooling tits, the horns on Scylla's head grow little by little, demonic corruption turning her milk into an aphrodisiac.\n\n",
            false
        );

        // Two Tits-
        if (this.player.breastRows.length == 1)
            this.outputText(
                "You lick your lips before realizing what you're doing and shake your head to clear your mind. Your concentration is shattered when one of the cats latches onto your left nipple, his velvet fur tickling your areola while the tip of his incisor lightly prods your flushed skin. You gasp and quiver as he puts more pressure on the teat, sharp teeth rolling your nipple in his mouth, tongue darting back and forth to capture every squirt of your milk. The other three have ganged up on your right side, the felines licking together, all three tongues savoring your flavor and greedily whirling over your peak, working in concert to squeeze bigger drops from your reserve. You feel an orgasm coming and the four atop your chest sense it too, redoubling their efforts. Their rasping tongues drive you wild, stealing your milk with an animal's thirst, treating you like an overburdened cow.\n\n",
                false
            );
        // More than Two-
        else
            this.outputText(
                "Your own endowments keep the four cats restraining you busy, noses nuzzling between your sloping valleys and granular tongues fanning a suffocating fire in your chest. Your rows of breasts heave as you wriggle under needy mouths and a matronly pride knots your stomach as you arch your back to present your milk to the thirsting felines. They waste no more time, descending on your cream-stuffed chest. Your tits wobble as they smooth their faces down to gather mouthfuls of your boobs, only to pull upward, sucking at the flesh that achingly slides from their muzzles until only your nipples hang from their lips, skin straining between your liquid weight and their coaxing squeezing. Sharp teeth drag along your sensitive bulk, just hard enough to make you feel their jaws nibbling at the tips of your teats, engorged pores swelling larger still until you can't think of your breasts as anything but udders- bloated organs meant to be milked. Meant to feed and nurse. The thought burns white hot in your loins and you can feel the sweetness in your chest churning in their runaway fertility.\n\n",
                false
            );
        // NEXT
        this.dynStats("lus", 20 + this.player.lib / 10 + this.player.sens / 10);
        this.doNext(this.Scylla6MilkyWaitII);
    }
    // [Next]
    private Scylla6MilkyWaitII(): void {
        this.spriteSelect(59);
        this.outputText("", true);
        // [Low milk output]
        if (this.player.lactationQ() < 500)
            this.outputText(
                "They suck a shuddering orgasm from you and your hips buck against the cats's shaggy bodies, grinding for friction as you cum messily in the street. Your breasts respond by spritzing out what they can, thin jets spitting limpid splashes of milk against the four atop you. They suck at your nipples, slurping down all you've got and teasing your inflamed buds for more. Your breath catches in your throat as their greedy suckling empties you completely and begins to send perversely erotic pain shooting through your chest's summits. When your moans turn to throbbing gasps, the thieves finally relent, taking turns licking each other's faces while clutching and smoothing your bosom, massaging the fire from your over stimulated nipples. You pant and relax under their expertise, mammaries tingling to refill your drained wells, body submitting to the furry thieves' will.\n\n",
                false
            );
        // [High milk output]
        else if (this.player.lactationQ() < 3000)
            this.outputText(
                "Your tits cum before you do, nipples pulsing for a moment before your milk stores erupt in fountains of warm alabaster. The cats teasing your nipple are caught unprepared, sputtering and hissing as their eyes are filled with your geysering cream. One of them has enough of a seal to stop your milk from leaking, but his cheeks balloon at the strength of your flow and he swallows too slowly, gouts of milk spraying from his nose as he chokes on your bounty. The depraved nursing fuels your orgasm to indecent depths, your spasming member squirting wildly, bubbling gobs of cum flicking into the air with as much force as the fountains your lactating flesh pillows have become.  The cats, trying to slurp up the milk drenching them, end up lapping up much of your cum as well, too milk-drunk to notice the salty difference. The vagrants probably need the extra protein, you rationalize to yourself, puffing under your body's waning ejaculation.\n\n",
                false
            );
        // [Hyper Milk output]
        else {
            this.outputText(
                "Your breasts churn atop your chest, aching with a need that you can no longer suppress. You curl your fingers into fists and strain against the leather collar binding them behind your back. With gritted teeth, you arc your back and clench your eyes shut. The pressure building in your tits rushes through the rest of your body and every muscle tightens as your milk bursts from your body like an alabaster shower. The "
            );
            if (this.player.bRows() == 1)
                this.outputText(
                    "three sharing one of your nipples try to drink from the high pressure jet and are left coughing and sputtering as milk splashes up their noses, in their eyes, and down their gullets. The cat sucking from your other breast relaxes his throat in time for the eruption and does his best to keep up with your intense flow, gulping as swiftly as he can, eyes growing in alarm when you show no signs of slowing. "
                );
            else
                this.outputText(
                    "vagrant felines try to drink from the high-pressure jets and are left coughing and sputtering as milk splashes up their noses, in the eyes, and down their gullets. One of them manages to relax his throat in time for the eruption and does his best to keep up with your intense flow, gulping as swiftly as he can, eyes growing in alarm when you show no signs of slowing. "
                );
            this.outputText(
                "Milk begins pooling around your bodies, filling the gaps between cobblestones and lapping against the walls of the alley. You writhe in ecstasy at the sheer joy of your milking and the cats drink what they can, but your reservoir is simply too vast for their appetite. The cat sucking on your tit fills before your eyes, stomach filling, bloating, and stretching as he is burdened with your milky weight. One of his friends drags him off of the nipple just as his legs give out and he collapses atop his sloshing belly, limbs having difficulty touching the ground. The strongest gushing has died down, but a steady stream still leaks from your udders, the pool around the five of you now ankle deep. You idly wonder in your milked bliss if the houses nearby will end up with flooded basements by the end of the day.\n\n",
                false
            );
        }
        // Increase milk production!
        this.player.boostLactation(1);

        this.outputText(
            "When your orgasmic tunnel vision recedes, you glance over to where Scylla is being dangled. Her tits are swollen from the stimulation of the other cats, the nun's mouths puffy and throbbing. There is a cat nursing at either tit, drinking as quickly as they can. Lying around them are the cat-morphs who suckled first- a half-dozen men and women lying in ecstatic stupor, their bellies swollen to a fat paunch with the intoxicating cream. The aphrodisiac has turned their restraint to putty and it seems your orgasm was just one of many in the alley. The women are using their flexible tails to tease swollen clits and a few are even pumping their cunts energetically with the furry appendages, purring so rapidly that their bodies are vibrating against each other. The men are jacking themselves off, watching the women with hungry stares, their cream-laden weight keeping them from pouncing on the wanton pussies. You can't see the nun's face under the vast milk factory her chest has become, but her bound hands press against her robe, trying to cover the wetness dripping from between her legs, down her belly, and coating her tits in a glistening oil of the girl's cum.\n\n",
            false
        );
        this.player.orgasm();
        this.dynStats("sen", 2);
        // [Next]
        this.doNext(this.Scylla6MilkyWaitIII);
    }
    private Scylla6MilkyWaitIII(): void {
        this.spriteSelect(59);
        this.outputText("", true);
        this.outputText(
            "When the last feline has drunk their fill of you and the nun and their bloated masturbation burns off the arousal of their theft, they clumsily untie the constricting collars from your arms and help take Scylla down from her perch. They avoid meeting your eyes, perhaps ashamed or maybe just still too horny, but they press a few meager gems into your hand, trying to pay for the milk they stole. Scylla refuses what they offer her, instead giving them the money she had on her. She manages to gently scold them for not asking first while keeping her blushing gaze hidden behind a veil of her shimmering curls. You help the nun gather up the torn scraps of the top half of her robe and ineffectually drape them around her milk-inflated chest. She tries to put her habit back on but her horns have grown into twisting loops atop her head and are slow to recede while the lusty felines are still around. Before anything else can jump you, you excuse yourself and slink away, rubbing your achingly sore nipples under your " +
                this.player.armorName +
                " as you do so.",
            false
        );
        // [Gain gems. End encounter.]
        this.player.gems += 25;
        this.statScreenRefresh();
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [Get Help]
    private Scylla6NoMilkGetHelp(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(
            "You fill your lungs and scream for help as loudly as you can. The cats around Scylla hiss and leap to their feet, trying to find you, cursing. A tall, black-furred girl tries to flee down the alleyway, but the damage is done. The clattering rush of the city guard surrounds the group from both directions and the cats find themselves trapped. A few try to bolt between the guards, but a well-placed centaur kick knocks one into an unconscious slump and the others quail from the guards in a scared huddle.\n\n",
            false
        );

        this.outputText(
            "One of the guards, a canine woman with shaggy golden brown and crisp white fur, looms over the cats, growling in a low, dangerous tone. She instructs several of her men to get Scylla down while the other guards keep their weapons trained on the captives. When the nun is free, at your side, and dressed again, the dog-lady gestures at the cats with a growl.\n\n",
            false
        );

        this.outputText(
            '"<i>Sorry about this. These damned milk-freaks have been coming out of the woodwork lately. A real menace, if you ask me. Don\'t worry, they\'ll never bother you again.</i>" She pauses, as an unpleasant thought strikes her and she makes a face. "<i>Unless... you were just up to some moronic exhibition-bondage crap?</i>" She manages to blush despite the stern tone, bobbed ears lowering. The cats look pitifully at you, tired, hungry, and horny despite their predicament. Will you turn them in, or lie to cover for them?\n\n',
            false
        );
        // [Truth] [Lie]
        this.simpleChoices(
            "Truth",
            this.Scylla6NoMilkTruth,
            "Lie",
            this.Scylla6NoMilkLie,
            "",
            undefined,
            "",
            undefined,
            "",
            undefined
        );
    }
    // [Truth]
    private Scylla6NoMilkTruth(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(
            '"<i>These drifters attacked us in broad daylight,</i>" you spit in disgust. "<i>Lock them up, banish them from the city, do whatever it is you do. I never want to see these furry freaks again.</i>"\n\n',
            false
        );

        this.outputText(
            "\"<i>Gladly,</i>\" the Collie watchwoman replies, her tail wagging rapidly. The Watch bind the cat-morphs and lead them out of the alley in a single-file march. \"<i>Cats,</i>\" the canine curses. You vaguely wonder if that would be considered racist here in Tel'Adre, but decide you really don't care. Scylla looks a little perturbed that you had all the felines arrested, but you suspect the nun would've forgiven them for rape too, if you hadn't called for help. Well, she can just forgive your latest transgression, you grumble to yourself, annoyed by her lack of appreciation. You head back to camp to forget about this whole mess.\n\n",
            false
        );
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // [Lie]
    private Scylla6NoMilkLie(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(
            "You pull the Watchwoman aside, away from the too-honest nun, and explain that it was all just a misunderstanding. You asked the cats to tie the nun up because the two of you have got a bit of a bondage fetish, but they got a little caught up in the role play and when they didn't stop after your companion used the safe word, you panicked. You promise it won't happen again. The Collie woman eyes you suspiciously but has no choice but to take your word for it- without your testimony, she's got to let the cats go.\n\n",
            false
        );
        this.outputText(
            "\"<i>But I'm going to fine you for this!</i>\" she barks, annoyed. \"<i>Keep your sex life behind closed doors and don't waste the watch's time again!</i>\" She collects her fee and disperses the Guard with another bark before turning to leave herself, tail curled up in irritation. The cats scatter too, but you're pretty sure you'll see them again. Scylla's not sure what you told the Watch, but she thanks you for your kindness with a kiss on the forehead and excuses herself; it's been a busy day and she's late for the soup kitchen. You muse that she'll probably end up feeding the same cats just recently denied a meal.\n\n",
            false
        );
        this.player.gems -= 10;
        this.statScreenRefresh();
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [Submit] (Only available to players with vaginas)
    private Scylla6NoMilkSubmit(): void {
        this.spriteSelect(59);
        this.outputText("", true);
        this.outputText(
            "You step around the corner, ready to save the nun, but the heat in your gut overpowers your heroism and you let your tongue hang out of your mouth as your eyelids grow heavy. You stumble and fall to your knees, head hanging low as you rub your body with both hands. The cats smelt your lust, and twelve furred, clawed bodies ring yours, dark rings around their almond-shaped eyes. You weakly try to shoo them away, but hands surround you and they hold firm against your struggles. You tire almost immediately and the cats pull you to the ground. The others push the largest among them forward, a black-furred feline of five feet with a small chest and lean build. Without meeting your gaze, she unhooks the leather collar from her neck and binds your hands behind your back tight enough to make your fingertips tingle, the small bell on it jingling. Then, she ducks back into the crowd, shifting her ragged clothes uncomfortably.\n\n",
            false
        );

        this.outputText(
            "You manage a vain protest as they pull off your " +
                this.player.armorName +
                ", their furry bodies brushing yours, the soldering fervor in their gazes rising goose bumps to your skin.",
            false
        );
        // [BREASTS ONLY –
        if (this.player.biggestTitSize() >= 1 && this.player.biggestLactation() < 1) {
            this.outputText(
                "  Some of the felines cup your tits, nuzzling your nipples playfully. They run sandpapery tongues along the nubs of your teats, lapping slowly at first, then faster, until your chest feels like it's being churned into buttery smoothness and you can't help but moan. When their efforts produce no milk, they hiss unhappily and leave your flush, aching, saliva-soaked breasts alone. A trill of disappointment bunches in your gut, your budding orgasm left unclaimed.",
                false
            );
            this.player.boostLactation(0.25);
        }
        this.outputText(
            "  You can feel the moist excitement pouring off of the females while the males paw at the bulges under their ragged clothes. Hands grab you all over and lift you to your feet, knees still unable to stand on their own.\n\n",
            false
        );

        this.outputText(
            "To your surprise, they carry you to Scylla and force you down, in front of her. The strung-up nun looks at you with big, blue eyes full of concern for your safety, mingled with an embarrassed excitement for her situation. The cats jerk your head to Scylla's exposed breast, heaving right at eye-level. They thrust your face against the plump lips of the nun's nipple and instruct you to drink. The felines seem to be using you to check the safety of the nun's milk. Even the destitute refugees of Tel'Adre fear demonic corruption, it seems. You open your mouth to protest again and your captor pushes you into a kiss with the crimson pinkness of the cream-laden tit.\n\n",
            false
        );

        this.outputText(
            "Scylla's skin is sweet, her breast warm and yielding, but there is a tingling sensation between your eyes as you kiss her reluctantly at first, and deeper by degrees. An icy prickle runs down your spine when your tongue rolls along the pout of her lower lip and tastes the inside of her moist, clenching mound. A trickle of milk washes down your mouth like an intoxicating cream and you push your face into Scylla's tit harder, to lick deeper inside her swollen body. The plush softness of her breast molds against your face and her body jiggles with the sudden urgency of your thirst. Scylla squeaks and a rush of milk laps against your needy lips. You swallow gratefully, white rivulets running down the sides of your mouth.\n\n",
            false
        );

        this.outputText(
            "Before you can take a second gulp, the cat-morphs pull you back, your lips and hers still puckered from the broken kiss, milk leaking from both of you. Either the felines were satisfied that you haven't been further corrupted or their needs have overwhelmed their better judgment. They crowd around the nun's heaving chest and lap up her flowing bounty with a dozen thirsty tongues. As you regain your breath, you notice your throbbing erection and a different but no less pressing hunger fills you.\n\n",
            false
        );
        this.dynStats("lus", 75);
        this.doNext(this.Scylla6NoMilkSubmitII);
    }
    // [Next]
    private Scylla6NoMilkSubmitII(): void {
        this.spriteSelect(59);
        this.outputText("", true);
        this.outputText(
            "The black cat who bound your hands sees your lusty want all too well. While the others descend on the nun blindly, she helps you to your feet and pushes you between Scylla's massive, pillowy breasts. With swift but inexperienced motions, she ducks between your legs, grabs your pulsing cock, and guides it to the nun's blushing face. The cat inadvertently teases the captive girl by bopping your cockhead against the nun's cheeks and lips before aiming it against her moist pucker. Your legs clench when you feel Scylla's hot breath on your sensitive tip, the crowd of drinking felines on her chest blocking your view of her debased flush as she lavishes distressed kisses on your prick.\n\n",
            false
        );

        this.outputText(
            "You feel a presence behind you and a thick, meaty slap across your ass. The black cat seems to have your hunger, rather than the milk-lust of the other felines. Pressing tightly against you, you can feel her pounding heart through the girl's small, B-cup tits, large nipples stiff through her shirt. She's too close to catch more than a glance out the side of your periphery, but the pressure on your back is hint enough that the cat girl behind you is a hermaphrodite. Her dick slides up and down your butt crack, dollops of pre-cum oozing from it as she rubs against you. Where you'd expect to feel the barbs of a cat dick, however, you feel only smooth, almost rubbery skin. There is a strange fullness at the herm's root, and with a start, you realize it's a dog's knot. You try to turn, but find yourself held in place by the nun's gentle sucking, her kiss a honey-sweet leash stronger than any chain. You can't even step to one side; her slowly expanding chest swells around your hips, demonic taint warping her body to meet the thirst of the other cats. You can't see how large the herm behind you is, but a shiver runs up your spine as she grabs your shoulders and leans forward to purr next to your ear. You don't know how she got a dog-cock, but it's fairly likely she hasn't been able to use it much, surrounded by fellow cat-morphs. You brace yourself for her pent-up desperation.\n\n",
            false
        );

        this.outputText(
            "She pulls back and thrusts into you, her knotted cock finding your juicy snatch with instinctual accuracy. You gasp at the penetration and instinctively buck forward, your dick jamming into Scylla's kiss and parting her lips like a pussy. Her hot, wet mouth tightens in shock around your prick even as your cunt sucks at the black cat's doggy dick. The herm behind you gyrates her hips, working four inches into your box. The feeling of penetrating and being penetrated leaves your body feeling weak and pliable. The herm rams another two inches in and the momentum drives you further up Scylla's throat, her tongue wrapping around your shaft and coaxing it deeper with wet, stroking swallows.\n\n",
            false
        );

        this.outputText(
            "The feline within you pulls back, your clenching hole reluctant to give up a single inch of her meat. Your walls tremble at the stimulation and you sigh hotly as the scooped cockhead tickles and strokes your recesses maddeningly. She pulls back far enough for her tip, slick with your lubrication, to rub against your clit and you bite your tongue, trying to hold back the boiling orgasm. She licks her coarse tongue between your shoulder blades, up your spine, along your neck, and up to your ear. With tiny, sharp teeth, she nibbles at the base of your earlobe and slides her hands down to your hips. Then, with a nip just hard enough to draw blood, she thrusts back into you, bottoming out in one motion- knot and all- her balls slapping your ass with a furry thwack.\n\n",
            false
        );

        this.outputText(
            "Eight inches of the cat's bulbous dog cock stuffed into your body so suddenly draws a cry of sweet pain from you and the force of her insertion drives your dick all the way up Scylla's throat. Her neck bulges outward obscenely, the skin pulsing from the blood pumping through your dong. She tries to gasp and her throat opens just enough for your dick to slide under her collarbone, past her lungs, and into her stomach. The nun is speared on your cock, its outline clear between her breasts, pushing against your chest. Despite the vice-like sucking of your pussy, the cat girl hasn't had enough and she begins to fuck you with renewed vigor, thrusting hard and slow, shallow enough to keep her ballooning knot firmly locked inside you, teasing your cunny with her feral flesh.\n\n",
            false
        );
        this.player.cuntChange(36, true);
        this.dynStats("lib", 2, "sen", -1, "lus", 80, "cor", 1);
        // [Next]
        this.doNext(this.Scylla6NoMilkSubmitIII);
    }
    private Scylla6NoMilkSubmitIII(): void {
        this.spriteSelect(59);
        this.outputText("", true);
        if (this.player.balls > 0) {
            this.outputText(
                "Your spot in the middle of the nun-and-cat sandwich is too much, however, and your balls slap against Scylla's face with each thrust the cat-morph makes. She must be able to feel the cum churning in your groin because her throat milks your shaft, her tongue and lips coaxing your swollen pecker as her stomach sucks on your head like a fertile womb, hungry for your seed to the point of hysteria. You finally cum and your body clenches down, muscles tight as your strength deserts you. Your body is putty as the blobs of cum are forced past the suckling lips tightly wrapped against your groin and up the nun's gulping throat, fighting past the intense pressure of her neck. When they get up into her chest, you can feel the bulbs of spunk rushing toward your cockhead with urgent desire and Scylla's stomach rumbles in anticipation. Just as the first dollop bursts free, the herm behind you slaps your ass and gives you one last thrust before cumming herself. Her balloon of flesh flares lewdly and hot jizz pours into your body, painting your womb white with the kitty's dog-seed. The sensation is invigorating and you feel renewed strength as you buck against Scylla's face, fucking her stomach with your cock, even as it squirts its first load into her suspended body. You flex your vaginal walls as best you can, ass clenching, milking the black cat for every drop as she collapses against your back, breast slick with sweat and weakly panting as the orgasm takes its toll, her soft balls straining to make the most of what feels like a long-delayed fucking.\n\n",
                false
            );
            // HORSE COCK –
            if (this.player.cocks[0].cockType == CockTypesEnum.HORSE)
                this.outputText(
                    "The nun's belly bulges with the sperm and she slurps at your shaft, trying to keep your cum inside her. Luckily, the flared tip of your horse cock acts as a very efficient plug for her throat. Your cum fills her elastic stomach wider and wider, swelling with liquid weight around your panting body. The soft embrace of her breasts around your sides and her cum-inflated belly at your chest makes the nun a very tempting pillow and you lean against her, balls twitching your final few spurts into the nun's bound and bloated frame. You savor the sensation of hot jizz rolling over your head, each twitch pushing your equine seed deeper into her bowels. A deep, stallion-like sense of pride fills your breast as Scylla's tongue coils around the bulging sheath at your base. In your mind, you picture the potency of your seed impregnating the nun, sperm penetrating her stomach lining to reach her virginal womb and breed the impure mare. The fantasy is enough to coax another, small orgasm from your overtaxed scrotum and your decadent cum dump gurgles in appreciation.\n\n",
                    false
                );
            // DOG/LIZARD COCK -
            else if (
                this.player.cocks[0].cockType == CockTypesEnum.DOG ||
                this.player.cocks[0].cockType == CockTypesEnum.LIZARD ||
                this.player.cocks[0].cockType == CockTypesEnum.DISPLACER
            )
                this.outputText(
                    "The nun's belly bulges with sperm and she slurps at your shaft, trying to keep your cum inside her. But as you dump your loads into her fattening stomach, gravity takes over and your seething spunk runs back down your cock's shaft. By now, however, the bulbous base of your cock has fully inflated and fills Scylla's drooling mouth to the point of locking her jaw open and even pinning her snake-like tongue in place. The cum flowing out of her maw is stopped at your knotted bulge and builds up just shy of her mouth. Overloaded, it begins to drip out of her nostrils in thick, syrupy ropes, leaving goopy trails that roll over her eyelashes, sealing her eyes shut. You can hear a steady patter of cum gurgling out of her nose, down her forehead, and spilling into the onyx pools of her long hair on the cobblestones at your feet. You give a weak smile and collapse against her bulging stomach, your weight squeezing much of your cum out of her belly. The nun gurgles unhappily as gouts of sperm are forced through her nose, squirting wildly under your pressure, but you're far too exhausted to care.\n\n",
                    false
                );
            // DEMON/CAT COCK-
            else if (
                this.player.cocks[0].cockType == CockTypesEnum.DEMON ||
                this.player.cocks[0].cockType == CockTypesEnum.CAT
            )
                this.outputText(
                    "The nun's belly bulges with sperm and she slurps at your shaft, trying to keep your cum inside her. The small spikes along your shaft and head drag against the nun's stomach and throat, giving you additional friction as your orgasm begins to fill her belly. Like a living condom, her stomach clenches around your head and greedily sucks up your sloppy seed, rumbling around her feeding tube, digesting even as you cum inside her. You bite the inside of your lips and the force of her suction lifts you to the balls of your feet, her stomach milking your cockhead as expertly as her lips stimulate your shaft's root. You almost feel like her belly is drawing the cum from you faster than your orgasm is dolling it out, the gradual pumping you're used to turning to a frenzied spray that forces you to fall back against the chest of the cat behind you. You moan as she drinks more and more, her waist as flat as a gymnast's. You glance at your sides and think you've found what her body is doing with your seed- the milk pouring from her breasts has turned off-white and flows in long, sticky threads, like syrup rather than cream. Every load you dump into the nun is being turned into goopy cum-milk for the drinking cats. They choke it down at first, but swiftly learn to love the taste, licking each other clean while lapping up spilt strands from jizz-soaked fur. You pant and let Scylla's thirst drain you as expertly as any succubus.\n\n",
                    false
                );
            // HUMAN/TENTACLE-
            else
                this.outputText(
                    "The nun's belly bulges with sperm and she slurps at your shaft, trying to keep your cum inside her. The seeping drool leaving sticky webs of leaking sperm between her forehead and your balls, however, tell you that even Scylla's profane digestion isn't fast enough to keep all of your seed in the swelling stomach. She lets out a pitiful whimper and you feel some deep, dark part of your mind rouse itself. With inhuman focus, you concentrate on the nun's soft, surrendering body and feel her horns growing, answering your will. The nub-like bone grows, looping around her ears and under her jaw, slowly curling like an anaconda surrounding its prey. Gradually, the horns tighten until you've sculpted a collar of bone around the subjugated girl's throat. She lets out a choked gurgle and you hear her nipple mouths let out a deep gasp. With its escape cut off, your cum begins to inflate Scylla's stomach much more rapidly and she coos in appreciation, her tongue spiraling around your shaft and milking your orgasm with renewed enthusiasm.",
                    false
                );
        } else {
            this.outputText(
                "Your spot in the middle of the nun-and-cat sandwich is too much, however, and your thighs slap against Scylla's face with each thrust the cat-morph makes. She must be able to feel the cum churning in your groin because her throat milks your shaft, her tongue and lips coaxing your swollen pecker as her stomach sucks on your head like a fertile womb, hungry for your seed to the point of hysteria. You finally cum and your body clenches down, muscles tight as your strength deserts you. Your body is putty as the blobs of cum are forced past the suckling lips tightly wrapped against your groin and up the nun's gulping throat, fighting past the intense pressure of her neck. When they get up into her chest, you can feel the bulbs of spunk rushing toward your cockhead with urgent desire and Scylla's stomach rumbles in anticipation. Just as the first dollop bursts free, the herm behind you slaps your ass and gives you one last thrust before cumming herself. Her balloon of flesh flares lewdly and hot jizz pours into your body, painting your womb white with the kitty's dog-seed. The sensation is invigorating and you feel renewed strength as you buck against Scylla's face, fucking her stomach with your cock, even as it squirts its first load into her suspended body. You flex your vaginal walls as best you can, ass clenching, milking the black cat for every drop as she collapses against your back, breast slick with sweat and weakly panting as the orgasm takes its toll, her soft balls straining to make the most of what feels like a long-delayed fucking.\n\n",
                false
            );
            // HORSE COCK –
            if (this.player.cocks[0].cockType == CockTypesEnum.HORSE)
                this.outputText(
                    "The nun's belly bulges with the sperm and she slurps at your shaft, trying to keep your cum inside her. Luckily, the flared tip of your horse cock acts as a very efficient plug for her throat. Your cum fills her elastic stomach wider and wider, swelling with liquid weight around your panting body. The soft embrace of her breasts around your sides and her cum-inflated belly at your chest makes the nun a very tempting pillow and you lean against her, cock twitching your final few spurts into the nun's bound and bloated frame. You savor the sensation of hot jizz rolling over your head, each twitch pushing your equine seed deeper into her bowels. A deep, stallion-like sense of pride fills your breast as Scylla's tongue coils around the bulging sheath at your base. In your mind, you picture the potency of your seed impregnating the nun, sperm penetrating her stomach lining to reach her virginal womb and breed the impure mare. The fantasy is enough to coax another, small orgasm from your overtaxed prostate and your decadent cum dump gurgles in appreciation.\n\n",
                    false
                );
            // DOG/LIZARD COCK -
            else if (
                this.player.cocks[0].cockType == CockTypesEnum.DOG ||
                this.player.cocks[0].cockType == CockTypesEnum.LIZARD ||
                this.player.cocks[0].cockType == CockTypesEnum.DISPLACER
            )
                this.outputText(
                    "The nun's belly bulges with sperm and she slurps at your shaft, trying to keep your cum inside her. But as you dump your loads into her fattening stomach, gravity takes over and your seething spunk runs back down your cock's shaft. By now, however, the bulbous base of your cock has fully inflated and fills Scylla's drooling mouth to the point of locking her jaw open and even pinning her snake-like tongue in place. The cum flowing out of her maw is stopped at your knotted bulge and builds up just shy of her mouth. Overloaded, it begins to drip out of her nostrils in thick, syrupy ropes, leaving goopy trails that roll over her eyelashes, sealing her eyes shut. You can hear a steady patter of cum gurgling out of her nose, down her forehead, and spilling into the onyx pools of her long hair on the cobblestones at your feet. You give a weak smile and collapse against her bulging stomach, your weight squeezing much of your cum out of her belly. The nun gurgles unhappily as gouts of sperm are forced through her nose, squirting wildly under your pressure, but you're far too exhausted to care.\n\n",
                    false
                );
            // DEMON/CAT COCK-
            else if (
                this.player.cocks[0].cockType == CockTypesEnum.DEMON ||
                this.player.cocks[0].cockType == CockTypesEnum.CAT
            )
                this.outputText(
                    "The nun's belly bulges with sperm and she slurps at your shaft, trying to keep your cum inside her. The small spikes along your shaft and head drag against the nun's stomach and throat, giving you additional friction as your orgasm begins to fill her belly. Like a living condom, her stomach clenches around your head and greedily sucks up your sloppy seed, rumbling around her feeding tube, digesting even as you cum inside her. You bite the inside of your lips and the force of her suction lifts you to the balls of your feet, her stomach milking your cockhead as expertly as her lips stimulate your shaft's root. You almost feel like her belly is drawing the cum from you faster than your orgasm is dolling it out, the gradual pumping you're used to turning to a frenzied spray that forces you to fall back against the chest of the cat behind you. You moan as she drinks more and more, her waist as flat as a gymnast's. You glance at your sides and think you've found what her body is doing with your seed- the milk pouring from her breasts has turned off-white and flows in long, sticky threads, like syrup rather than cream. Every load you dump into the nun is being turned into goopy cum-milk for the drinking cats. They choke it down at first, but swiftly learn to love the taste, licking each other clean while lapping up spilt strands from jizz-soaked fur. You pant and let Scylla's thirst drain you as expertly as any succubus.\n\n",
                    false
                );
            // HUMAN/TENTACLE-
            else
                this.outputText(
                    "The nun's belly bulges with sperm and she slurps at your shaft, trying to keep your cum inside her. The seeping drool leaving sticky webs of leaking sperm between her forehead and your groin, however, tell you that even Scylla's profane digestion isn't fast enough to keep all of your seed in the swelling stomach. She lets out a pitiful whimper and you feel some deep, dark part of your mind rouse itself. With inhuman focus, you concentrate on the nun's soft, surrendering body and feel her horns growing, answering your will. The nub-like bone grows, looping around her ears and under her jaw, slowly curling like an anaconda surrounding its prey. Gradually, the horns tighten until you've sculpted a collar of bone around the subjugated girl's throat. She lets out a choked gurgle and you hear her nipple mouths let out a deep gasp. With its escape cut off, your cum begins to inflate Scylla's stomach much more rapidly and she coos in appreciation, her tongue spiraling around your shaft and milking your orgasm with renewed enthusiasm.",
                    false
                );
        }
        this.doNext(this.Scylla6NoMilkSubmitIV);
        this.player.orgasm();
    }
    // ALL - [Next]
    private Scylla6NoMilkSubmitIV(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(
            "You hadn't realized you fell asleep until the nun's gentle shaking rouses you. The cat-morphs have left, but the trail of their passing is impossible to miss. A long, gooey trail of paw print-shaped milk and cum puddles lead out of the alley and back into the city. Scylla hugs you warmly, her smile bright and satisfied. The nubs on her head look a bit larger than they used to, but she's more or less returned to her previous dimensions, the nun's strange elasticity compensating for her lusty transformations. She explains that the cats were very sorry for their aggression and agreed to a penance for their moment of weakness. Happily, she informs you, they've agreed to public works, trying to restore some of the ruined and abandoned structures in Tel'Adre that remain unused after the demonic sieges of some time ago. She taps you on the nose and assures you that she didn't forget the bop on the head they gave you. She produces a heavy sack of gems and says that while they don't have much, they wanted to offer a tithe to the Champion's noble cause. Holding a small silver bell between her forefinger and thumb, she adds that the tall black-furred girl wanted the two of you to carry her bell when you're walking around the city so she'll be able to find you again.\n\n",
            false
        );
        this.outputText(
            "It occurs to you that, if Scylla's saccharin mood is any indication, you suspect that more than a few of her 'missions of mercy' turn out like this. Your thighs are still sticky with the cat girl's spunk and you can feel it rolling inside you like the moistness of a wet kiss. All in all, you suppose, the day turned out a lot more fun than volunteering at the soup kitchen. You stomach rumbles at the thought of food and you excuse yourself to grab a meal, the nun waving good bye, jingling the ebony herm's tiny bell.",
            false
        );
        this.flags[kFLAGS.KATHERINE_MET_SCYLLA] = 1;
        this.player.createKeyItem("Silver Kitty-Bell", 0, 0, 0, 0);
        this.player.gems += 50;
        this.statScreenRefresh();
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [Rape]
    private Scylla6NoMilkRAPETHEWORLD(): void {
        this.spriteSelect(59);
        this.outputText("", true);
        this.outputText(
            "You decide to have a little fun with this situation, so you remain hidden around the corner while the cats mill around Scylla. It's not long before their thirst overwhelms their caution and the felines sink to their knees, nuzzling Scylla's bare chest, small tongues lacquering her mountainous breasts in saliva. Her skin shimmers in the alley's waning light and the nun moans, struggling weakly against her bonds, her milk-laden tits jiggling tantalizingly. You strip off your " +
                this.player.armorName +
                " and lightly grasp your cock, stroking slowly as you wait for the opportune moment.\n\n",
            false
        );

        this.outputText(
            "The suckable lips of Scylla's breasts join her moaning and as they do, pale fluid begins to leak from them. The nun's milk rivets the cats' attention, thin and clear at first, but swiftly thickening into a rich cream that drools from her mouths. The cat-morphs mew and purr as they lap at the dribbling meal, tails curling around their paws to stroke themselves as they indulge. One girl, however, sits apart from the others, drinking nothing and struggling to pull her ragged clothes over her groin. She turns away from her fellow felines and sighs unhappily. Shifting her baggy shirt aside, she accidentally flashes her firm, palm-able breasts and reveals the reason for her distress, bulging under her tight pants and poking over their waist.\n\n",
            false
        );

        this.outputText(
            "The girl is a hermaphrodite, which wouldn't be much of a surprise in Tel'Adre, but it appears as though the cat girl has a canine cock. The bright red shaft is erect and straining against her clothes, eight inches long and fat around the pointed tip. Her knot, however, is nearly the size of a baseball and still getting thicker. Even if she found another cat who was willing to overlook her puppy-pecker, that bulb would scare off anyone who valued untorn orifices. For your purposes, however, she's perfect.\n\n",
            false
        );

        this.outputText(
            "Scylla's moaning provides enough cover for you to creep along quietly, sliding through the shadows until you're arm's reach from the black herm. Your cock is quite stiff from your peep show and small globs of pre-cum bubble up with every stroke you give it. Rubbing the lubrication around your tip, you tense your legs and spring. With blinding speed, you hook your arms around the ebony-furred girl's elbows, pinning her hands behind her and dragging her tight ass to your groin. With a hooking dip, you thrust your cockhead up, just barely penetrating her dark pussy with an inch of your pecker. You're pleased to note she's sopping wet and you lean forward to whisper in her startled ear. \"<i>If you say anything, I'll have to pull out.</i>\"\n\n",
            false
        );
        this.dynStats("lus", 75, "cor", 1);
        // [Next]
        this.doNext(this.Scylla6NoMilkRapeII);
    }
    private Scylla6NoMilkRapeII(): void {
        this.spriteSelect(59);
        this.outputText("", true);
        this.outputText(
            "The cat-morph freezes in your arms, back arched as natural panic wages war against the heat pumping out of her drooling snatch. She nods her head slowly and you grin. \"<i>Good kittie,</i>\" you murmur, sliding another teasing inch into her cunny. \"<i>Let's give our friends a feast,</i>\" you whisper, directing her to turn about, toward the nursing nun. The two of you slowly pace past milk-addled felines, your captive's scarlet bulb bobbing with each deliberate step. Carefully moving between the distracted cats, you guide the dusky herm between Scylla's expanded breasts. She notices the erection you've marched up to her with a husky coo of pleasure.\n\n",
            false
        );

        this.outputText(
            "\"<i>Oh, you poor dear,</i>\" she soothes, her soft voice rich with smutty need. The nun's plump lips pucker to kiss the girl's sloped tip and her labia-soft skin begins to suck at the point of the straining dog cock. The herm's love tunnel tightens and her gushing slit threatens to push your cock out with its clenching. You reward her almost canine obedience by thrusting back in, slippery walls like greased velvet. She lets out a high-pitched \"<i>eep!</i>\" and bucks forward, penetrating the nun's lips and stuffing her bulbous prick into Scylla's hungry maw up to the knot. She shivers at the spine-melting warmth and tries to pull out, only to slam her hips into yours, sucking more of your fuckstick into her slick cunt. The black cat whines, trapped between a rod and a soft place.\n\n",
            false
        );

        if (this.player.balls > 0)
            this.outputText(
                "You're not sure who's enjoying the kitty more, you or Scylla. From behind the herm, you can appreciate the changes face-fucking seems to have on the tainted nun. Her breasts swell with each thrust, from sink-sized J-Cups to practically bathtub-sized Z-cups. Her rolling titflesh spills over the drinking cats, burying the ones nursing up to their heads, entombed by her liquid weight. The oozing flow from her nipple lips builds to pulsing leaks, mouths puckered and slurping at the cum-thick milk that gushes from their lips and into the cats' waiting muzzles. As much fun as it is watching your captive bounce between the two of you, your cock throbs with a more crude demand, your sack achingly full by now. The cat's slobbering cunny has drenched your dick, balls, and inner thighs with her warm, natural lubrication. Tightening your grip on her arms almost painfully, you thrust deeper.\n\n",
                false
            );
        else
            this.outputText(
                "You're not sure who's enjoying the kitty more, you or Scylla. From behind the herm, you can appreciate the changes face-fucking seems to have on the tainted nun. Her breasts swell with each thrust, from sink-sized J-Cups to practically bathtub-sized Z-cups. Her rolling titflesh spills over the drinking cats, burying the ones nursing up to their heads, entombed by her liquid weight. The oozing flow from her nipple lips builds to pulsing leaks, mouths puckered and slurping at the cum-thick milk that gushes from their lips and into the cats' waiting muzzles. As much fun as it is watching your captive bounce between the two of you, your cock throbs with a more crude demand, your gut achingly full by now. The cat's slobbering cunny has drenched your dick and inner thighs with her warm, natural lubrication. Tightening your grip on her arms almost painfully, you thrust deeper.\n\n",
                false
            );

        this.outputText(
            "The mastiff-cocked cat-morph bites her tongue at your dominance and she creams onto your shaft, yowling in surrendering pleasure. Her knot begins to swell as her dick attempts to complete the spurting her pussy has begun. Scylla's lips are so large and swollen, however, that the bulge can't fit past them. The nun's tongue snakes out of her maw and wraps around the herm's base, between the fist-sized bulb and the ebony-furred groin. With almost tentacle flexibility, her tongue tugs with every thrust, trying to provide extra assistance, her gullet noisily slurping with all the suction she can muster. You take longer, deeper, harder thrusts, trying your best to push the herm's knot past Scylla's jaw. You slam her hard enough to make the clap of her ass on your abs rouse the milk-sedated cats around you, lazy heads rising to see the stranger in their midst fucking the bound nun's face, with a cat girl as a condom.\n\n",
            false
        );
        // [Next]
        this.doNext(this.Scylla6NoMilkRapeIII);
    }
    private Scylla6NoMilkRapeIII(): void {
        this.spriteSelect(59);
        this.outputText("", true);
        this.outputText(
            "You give one more savage pump and, at last, the kitty-knot pushes past the nun's pussy-tight, bimbo-bloated kisser with a moist 'plop.' The onyx herm howls like a wolf as her sensitive bulb is swallowed by the captive woman, the grapefruit-sized knob stuffing her cheeks. The cat's body spasms as she howls, and you can see the nun's mouth is distended wide enough to see the knot's bulge under her jaw. Despite the frightening width of her knot, compared to the nun's normal fare, the larger-than-average herm seems positively small, so you decide to give them both a little extra cream.\n\n",
            false
        );

        this.outputText(
            "Right on the verge of cumming, you pull out of the cat's slippery cunt and move a few inches higher. Your dick is so soaked by the wet pussycat that your tip slides right past her sphincter before she understands what your intent is. She shakes her head nervously as you brace yourself, but you just nod and grin before thrusting in. With one motion, you push past her silky, vice-like ass and fill her colon with your throbbing meat. She's too tight for you to hold back any longer and your hips shake with the force of your orgasm. Spunk sprays into the herm's rear, your quivering flesh stimulating her prostate more forcefully than anything she's experienced.\n\n",
            false
        );

        this.outputText(
            "The black cat lets out a yelp that turns into a high-pitched shriek as you dump your spunk into her gut, her small, kitty balls throbbing as she begins cumming as well. She humps mindlessly, fucking the nun's face and impaling herself on your spurting shaft as rapidly as she can. Scylla swallows the cat's doggy loads with gusto, her tits spurting gouts of renewed milk to drench the cats lying around the three of you. You laugh in satisfaction as each drinking cat fills its belly until they can no longer stand, gut spilling past their hips, milk-fatness leaving the greedy felines as deliriously satisfied as if the lot of them had been fucked silly.\n\n",
            false
        );

        if (this.player.balls > 0)
            this.outputText(
                "When your sack finally empties and your hardness begins to slacken, you slide your dick out of the black-furred herm. You smile as you notice that everyone around you looks like they've been knocked up by a pack of pent-up minotaurs. Your seed spills out of the cat girl's ass, mixing with the jizz of her still-squirting cunt. Her abdomen hangs over Scylla's head and she tries weakly to pull free, but her knot is as large as a melon after the prostate-fucking you gave her. The nun's throat is stuffed in a way you've only ever seen in snakes after meals larger than their heads. Scylla's tummy has a happy paunch, but her tits are absolutely monstrous- each larger than any of the cats around her, lurid flesh vibrant and heaving, her crimson nipple lips panting with moist satisfaction. The other eleven cat-morphs are little more than milk balloons, their limbs limply hanging at their sides as they roll uselessly on inflated stomachs, recumbent and dazed. They look a bit like giant, used cat-skin condoms, you chuckle to yourself.\n\n",
                false
            );
        else
            this.outputText(
                "When your body finally empties and your hardness begins to slacken, you slide your dick out of the black-furred herm. You smile as you notice that everyone around you looks like they've been knocked up by a pack of pent-up minotaurs. Your seed spills out of the cat girl's ass, mixing with the jizz of her still-squirting cunt. Her abdomen hangs over Scylla's head and she tries weakly to pull free, but her knot is as large as a melon after the prostate-fucking you gave her. The nun's throat is stuffed in a way you've only ever seen in snakes after meals larger than their heads. Scylla's tummy has a happy paunch, but her tits are absolutely monstrous- each larger than any of the cats around her, lurid flesh vibrant and heaving, her crimson nipple lips panting with moist satisfaction. The other eleven cat-morphs are little more than milk balloons, their limbs limply hanging at their sides as they roll uselessly on inflated stomachs, recumbent and dazed. They look a bit like giant, used cat-skin condoms, you chuckle to yourself.\n\n",
                false
            );
        this.player.orgasm();
        this.dynStats("lib", 1, "sen", -1);
        // [Next]
        this.doNext(this.Scylla6NoMilkRapeIV);
    }

    private Scylla6NoMilkRapeIV(): void {
        this.scyllaSprite();
        this.outputText("", true);
        this.outputText(
            "You pull Scylla down from her bound position and cut her restraints, but her face is still locked onto the dusky kitty's doggy dick. You don't think you could move her obscenely inflated milk-bags without a small wagon at this point. You can at least make her comfortable while she waits for the cat's knot and her own breasts to deflate. Before you can leave, the cat herm stops you with a soft word. She's still plugged into the nun's lips, but she's turned around inside of her cum-dump so that her cock is tucked between her legs, jizz-drizzling ass leaking onto Scylla's collared head. The nun doesn't seem to mind; her serpentine tongue slurps the seed from her face and into her over-stuffed mouth.\n\n",
            false
        );

        this.outputText(
            "\"<i>I'm sorry for this,</i>\" the girl apologizes. It's hard to tell if she's genuinely sorry or just still experiencing the submissive streak you fucked into her. \"<i>We were just so hungry and your friend was so tempting. Please take what we've got. After today, I don't think they'll need to eat for a week.</i>\" She presses a few meager gems into your hand and pulls the silver bell from her collar. \"<i>And carry this, so I can find you again,</i>\" she whispers hopefully, flinching as Scylla's tongue snakes into her asshole to slurp down more of your cum. You leave them to their sticky cleanup with a pleased sigh. If only all trips to the soup kitchen could be so satisfying.",
            false
        );
        this.flags[kFLAGS.KATHERINE_MET_SCYLLA] = 1;
        this.player.createKeyItem("Silver Kitty-Bell", 0, 0, 0, 0);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // This scene is available if the player has at least two tentacle dicks, and appears when the player chooses to \"<i>share an addiction</i>\" under the heading [Tentacles].  Additional text becomes available if the player has four or six tentacle dicks.
    // -------------------------------------------------------------------------------------------------
    private shareTentaclesWithScylla(): void {
        this.clearOutput();
        this.outputText(this.images.showImage("scylla-share-tentacle-addiction-one"), false);
        this.outputText(
            'The girls pale as your writhing tentacle cocks snake out of your [armor], twisting and coiling in the air, already swollen with your excitement.  Scylla opens her mouth, but words fail her and the nun\'s puffy, crimson lips set into a worried pucker instead.  Abylon folds her arms over her chest and rolls her eyes.  "<i>Some security they\'ve got in this city,</i>" the goblin mutters.  Pastie turns white as her name, sobering up instantly.  Letting out a high-pitched "<i>Eeeek!</i>" she launches herself at the window, wings fluttering at top speed.  In her panic, however, it seems she\'s forgotten about the glass.  With a sharp crack, the fairy bounces off the window pane and tumbles to the ground, stunned and fluttering ineffectually.  Gesturing broadly at the quivering forest of cockflesh, you offer a simple smile and slowly close the door behind you.'
        );
        // [Silly Mode:
        if (this.silly())
            this.outputText(
                '\n\nYou throw your hands in the air and put on a lascivious grin.  "<i>You see a massive, shambling form emerge from the underbrush!</i>" you announce, gesturing back at the door.  "<i>Sensing your presence, it lumbers at you, full speed, tentacles outstretched!</i>"  Your cocks hover menacingly as you puff out your chest to make yourself look bigger.  "<i>While you struggle valiantly, the beast\'s raw might is more than a match for you.  You give up on fighting, too aroused to resist any longer!</i>"  The girls look back and forth at one another before shrugging, content to play along.'
            );
        else if (this.player.cor < 33)
            this.outputText(
                "\n\nAlmost apologetically, you ask the girls if they could help you with the predicament you seem to have gotten yourself in.  While your serpentine phalli may be a bit much for one person to handle by themselves, three would keep any one person from being overwhelmed.  Scylla nervously fidgets with her curled tresses and quietly agrees that perhaps that would be best.  After all, they're here to help anybody, no matter how embarrassing the problem.  Abby snorts and Pastie moans, but neither offers a flat refusal."
            );
        // [Medium corruption:
        else if (this.player.cor < 66)
            this.outputText(
                "\n\nMildly, you invite the girls to join you.  You know they need this just as much as you do and the sight of all your turgid, pulsing cocks can't help but burn in their minds.  As you expected, the two larger girls nod, reluctantly, while Pastie merely gives up, hugging her head in anticipation of tomorrow's hangover."
            );
        // [High Corruption:
        else
            this.outputText(
                "\n\nYou invite the girls to prepare themselves, reading their faces as they regard you with trepidation.  Stepping toward them, your tentacles slide through the air to stroke each girls' body, coiling your desire around their weakening resistance.  One caresses the supple pout of Scylla's lips, the scent of your bubbling pre-cum wafting into her nostrils and binding the nun to you as surely as if you'd locked a steel collar around her throat.  Another brushes against Abby's belly, sliding under her segmented armor.  The goblin gasps as the heat of your seed seeps through her boiled leather all the way into her flesh, igniting the dormant need of her over-fertile womb.  Pastie struggles weakly, but you simply slide the cock teasing Scylla's inflated lips to the fairy, pressing the member across her lithe body, pinning her in place with the girth of your meat, muffling the sole, tiny voice of opposition.  It's adorable that she thinks she gets a choice in the matter."
            );

        // [Cocks under 5' long:
        if (this.player.longestCockLength() < 60) {
            this.outputText(
                "\n\nScylla meets your gaze, her pure, sapphire eyes peering through her long, elegant lashes.  She opens her mouth once more to speak, perhaps to try to dissuade you from giving into temptation, perhaps to ask if she could be first.  The words die on her lips as the seething thirst inside her boils up, dulling the clarity of her eyes with a decidedly impure hunger.  She whispers a prayer and you can feel your body reacting to the nun's lustful desire, her corrupted supplications flowing across your flesh like sanctified oil.  [EachCock] pulse as blood surges through their lengths, growing longer and thicker with every heartbeat.  They expand and swell until each is at least five feet long, resembling true tentacles more than the simple cocks they once were.  You marvel at the famished depravity of the holy woman, but you must admit, her charity seems boundless."
            );
            // [Next]
        }
        this.menu();
        this.addButton(0, "Next", this.shareTentaclesWithScylla2);
    }

    private shareTentaclesWithScylla2(): void {
        this.clearOutput();
        this.outputText(this.images.showImage("scylla-share-tentacle-addiction-two"), false);
        // [Two Tentacles:
        if (this.player.tentacleCocks() <= 2)
            this.outputText(
                "Abylon shakes out of the lurid trance of your sinuous coils and folds her arms across her flat chest.  \"<i>I ain't sharin' with fatso over there.  You have yer fun with the blow-up nun and come let me know if ya remember to bring enough for the whole class.</i>\"  Scooping Pastie up off the floor, the two slink out of the room, leaving you alone with Scylla.  If her friend's harsh words hurt, she doesn't show it – she hasn't taken her eyes off your groin yet.  You suppose one will have to do for now.\n\n"
            );
        // [Four Tentacles:
        else if (this.player.tentacleCocks() <= 4)
            this.outputText(
                'The nun and the goblin move closer, seemingly mesmerized by the rippling motion of your serpentine lengths.  Pastie, however, has apparently fallen afoul of enough tentacle beasts to resist the fascination and regains her senses faster than you expected.  Zipping into the air and out of reach, she shakes her head vigorously.  "<i>Oh no, I know how this ends.  Count me out!  These two should be plenty!</i>"  She flies toward the door and past your squirming phalluses, the random bobbing and weaving of her inebriated flight making it impossible to snatch her before she squeezes under the door and out of the room.  You\'re going to need more tentacles if you hope to catch the flighty lush next time.  For now, you turn your attention to the two spellbound girls.\n\n'
            );

        this.outputText(
            "Drawing in a deep breath, you rest your hands on your [hips] and let your cocks do the work.  Snaking through the air, drawn by the heat of addiction, your tentacle-sized dicks creep onward.  Two tentacles glide at ground level and slither between Scylla's legs, slipping under her robe and coiling around her long, stocking-clad legs, visibly bulging under the tight velvet of her dress as they move upward."
        );
        // [Four cocks:
        if (this.player.tentacleCocks() >= 4)
            this.outputText(
                "\n\nTwo more find Abylon and glide across her emerald skin, one wrapping itself around her neck tightly enough for her to feel every pulse of blood rushing through your eager member.  The other pushes under the thick leather straps holding her armor in place, popping buckles open one after another until the goblin's clothing slumps to the ground and leaves her nude but for the knee-high boots that - you note with surprise - she's fitted with fuck-me heels."
            );
        // [Six cocks:
        if (this.player.tentacleCocks() >= 6)
            this.outputText(
                "  Another encircles Pastie, thick flesh lifting the limp fairy off the carpet while a sixth rubs the underside of its crest against her squirming face."
            );

        this.outputText(
            "\n\nScylla lets out a shriek as your tentacles tighten and twist around her thighs, tips sliding between her legs and across the moist valley of the nun's panties.  Your long inches slide over the lacy fabric to tease her virginal clit as your monstrous sexual organs worm along the soft skin of her abdomen and belly, the pronounced outline of your cocks spiraling upward under her modest attire like swollen ropes."
        );
        // [Four Cocks:
        if (this.player.tentacleCocks() >= 4)
            this.outputText(
                "\n\nAbby wraps a hand around the tentacle at her neck, weakly trying to loosen its hold, but she only succeeds in vigorously stroking your shaft as her breath quickens.  She braces her other hand at the junction of her legs, as much to block entry to her lubrication-drooling pussy as to massage the excitement-engorged lips of her vulva."
            );
        // [Six cocks:
        if (this.player.tentacleCocks() >= 6)
            this.outputText(
                "\n\nMeanwhile, the fairy writhes in your grasp, practically cocooned in the heat of your twitching cock-flesh.  A dollop of pre-cum bubbles to the crest of your member as it loops around to brace your widening urethra against her mouth, stealing a kiss from the disoriented girl just as the thick seminal glob oozes out.  Unprepared for the gooey surprise that bursts across her face, Pastie chokes and swallows much of the pre-spunk, sputtering as your fluid goes to work on her tiny form.  The heat of her skin spikes and her thrashing attempts to escape gradually slow to ecstatic undulations, her lithe limbs caressing the pulsing meat of your grasping phalluses."
            );

        this.outputText(
            "\n\nSinuously slipping toward the generous expanse of Scylla's cleavage, your obscene shafts press between the nun's breasts to find them wonderfully taut.  The too-tight robe she wears is already straining under the bulges of your tentacles, clasping her massive mammaries closely together.  You press against the supple flesh with tantalizing urgency and, with a force of will, you send large dollops of pre-cum through your shafts, the globules bulging bubble-like through the underside of your confined tools.  As the liquid lumps swell past her untouched pussy with fluid weight, the nun moans with whorish delight, your seed so close and yet so far from her maidenhead.  Finally, the flowing cream reaches the crest of your members and you press your cockheads against the clasped cleft of her heavily swollen flesh.  Hot spunk gushes between Scylla's lush ravine, slick jism lubricating her pussy-tight cleavage, finally giving your cocks the oily lather they need to force themselves upward."
        );

        this.outputText(
            "\n\nThe nun falls to her knees with a blissful cry, her hands sweeping through her habit to brush long, curling locks of jet black hair across her face as you thrust your tentacles up and around, corkscrewing around her pliant peaks.  The front of her robe groans as you spiral toward her nipples, their swollen lips panting through the cloth in anticipation.  Small slits open along the nun's hips and shoulders as her robe begins to tear under the pressure, but you push on.  Just as you reach the swell of her lips, the tightness of the nun's robe becomes unbearable and you grunt as you flex your shafts, swelling the already turgid girth to its full thickness.  The top of Scylla's dress explodes in tatters, her ponderous chest bursting free, flesh wobbling between the coils of your squeezing lengths.  The fat, crimson puckers at the peaks of her cock-caressed breasts gape shamelessly and you oblige, stuffing your pre-cum soaked heads into the nun's wanton nipples with a savage thrust."
        );

        // [Four cocks:
        if (this.player.tentacleCocks() >= 4) {
            this.outputText(
                "\n\nAbylon curses and grumbles, but all too soon, her knees begin shaking with the primal need of her mother's insatiable passions.  Before her legs give out, you tighten your grip around her throat and between her legs, curling one cock under her arm while the other circles around her bubble butt.  With a grunt, you hoist the small goblin girl into the air, suspending her by your muscled flesh like an emerald doll.  Hauling her closer, you reach out a hand and trace your fingertips over the goblin's firm abs and small, perky A-cups.  She tries to speak, but her cock-collar reduces it to gurgles, frothy saliva bubbling to her lips and dribbling down her chin as your fingers hover a hair's breadth from the dark jade of her diamond-hard nipples.  Instead, you slide down, between her stout thighs, to rub your cool palm against the oven of her pussy.  A scorching heat washes over your hand, liquid need pouring from her olive lips in a drooling torrent.  Her body is so ripe for breeding, that even restrained by your tentacles, she bucks wildly at your mere touch.  You loosen the cock around her throat to snake your shaft toward her fertile slit."
            );
            this.outputText(
                "\n\nHer voice-box released, the goblin gasps for breath, panting out insults.  \"<i>Too much blood in those things ta figger out where my pussy is?  Ya need a map or somethin'?  Just stick it in and let's get dis over with.</i>\"  Grimacing, you draw your hand away, and begin lowering her to the ground.  A surge of panic washes over her as the thought of losing out on the fucking of a lifetime dawns on the impulsive hellion.  \"<i>Hey now, let's not do anythin' we might regret.  D-don't tease me now,</i>\" Abby whines with growing frustration.  \"<i>Look, I ain't the whore my mom is, but I kinda need dis right now, so let's compromise.  You fuck my brains out and I'll pop out a brat for ya.</i>\"  You set her on her feet and she wobbles, unsteady with frustrated desire.  \"<i>Okay two!  Three!  A dozen!   Damn it, you stuff those cocks in me and I'll squeeze out a fuckin' green army for ya, just don't stop now!</i>\"  Smiling, you nod in satisfaction and flick the girl's viridian teat, sending a thrill through her that makes her honey-slick loins gush anew.  Wrapping your cocks around each other in a bloated spiral, you brace the double-thick shaft between her knees and, with a brutal upward thrust, dive into the girl.  Your spearing intrusion rushes up her lust-slick cunt, Abby's defiled temple sucking you upwards until your penetration carries you right past her permissive cervix, and into her seed-thirsty womb, all in one stroke.  She howls with delight, but you simply pull back and thrust upwards, even harder, this time with enough force to lift her off her toes, impaled in the air by the coiled helix of your throbbing organs."
            );
        }
        // [Six cocks:
        if (this.player.tentacleCocks() >= 6) {
            this.outputText(
                '\n\nYour drug-like cum flowing through Pastie\'s system has taken the fight out of her, turning the panicked fairy into the most willing of the girls in the matter of a few heartbeats.  "<i>Oh god yessh,</i>" she coos, stroking the shaft coiled around her body with her legs while reaching her arms out to stroke the bulbous head of the second cock that looms over her like some massive, predatory beast.  The fey girl slides back and forth in the grip of your manhood, tiny breasts tit-fucking the underside of your shaft with gusto.  Her diminutive form overwhelmed by the smell, the feel, the taste of your tentacle dicks, the fairy orgasms, driven wild by the promised bounty of your throbbing meat.  "<i>Take me!  Use me!  Wear me like a condom!  J-j-just fuuuck meee,</i>" she cries with a shudder, the junction of her svelte legs virtually gushing with the crystalline rain of her impassioned honey as the sprite bucks against your monstrous girth.  The carnal feelings flooding your groin can\'t help but bring the twinge of a grin to your lips as you appreciate the tableau: the dainty pixie jilling her brains out, wreathed within the possessive clutch of one hardness as she deliriously worships the other\'s pulsing crest like the face of some obscene deity.  Her eyes roll senselessly, her tongue waggling in the open air as she tries desperately to get another taste of your impure seed.  She so desperately wants your semen, even to just be inches closer to the sticky, drug-like spunk, that it gives you an idea.'
            );

            this.outputText(
                "\n\nYou shift the cock wrapping around her body, slowly encircling Pastie just below the fairy's breasts, looping down her torso so that the tip can snake under her legs.  A steady stream of pre dribbles from the stimulated shaft as you flex around her petite hips, her cascading lubrication swiftly soaking her lower body, thighs to ankles.  Pressing the tip of your cock against her teensy toes, you push forward, your fluid-soaked urethra swallowing Pastie's wriggling feet.  Her fey-cum mixes with your own, sending a tingling wave of pressurized bliss through your loins and you push harder, sucking the fairy into your cock up to the knees.  The suckling sensation of being gradually engulfed by the voracious heat of your flesh robs the girl of the last of her faculties.  Mind broken by the taut compression of your dick's ravenous mass, Pastie moans and squirms, wriggling deeper into the embrace of your tentacle, until its swollen peak dilates at her hips.  Loosening your grip around her waist, you position your other cock directly above her, blobs of pre-cum bubbling down upon her head.  She looks up, blankly, and instantly understands.  Obediently, she raises her arms and slides her cum-slick hands into your urethra, tensing in a mindless orgasm as her arms slip into the mouth of her new god.  The bloated lips of your cock consume her wrists, elbows, and even her shoulders as Pastie's head vanishes into the drooling maw of your manhood."
            );
        }
        // [Next]
        this.dynStats("lib", 0.5, "lus=", 100, "cor", 0.25, "resisted", false);
        this.menu();
        this.addButton(0, "Next", this.shareTentaclesWithScylla3);
    }

    private shareTentaclesWithScylla3(): void {
        this.clearOutput();
        this.outputText(this.images.showImage("scylla-share-tentacle-addiction-three"), false);
        this.outputText(
            "With your members in place, you take a moment to drink in the sensations pulsing through your flesh.  Scylla appears almost relieved as her crimson puckers wrap around the peaks of your undulating tentacles, their lengths coiled around her statuesque limbs and squeezing her inflated breasts a little tighter with every inch she sucks down."
        );
        // [four cocks:
        if (this.player.tentacleCocks() >= 4)
            this.outputText(
                "  Abylon's hips roll as she struggles for breath, transfixed atop your shafts, stiletto-heeled boots uselessly kicking air while her mouth works silently, speechless at the strength of your sinuous poles."
            );
        // [Six cocks:
        if (this.player.tentacleCocks() >= 6)
            this.outputText(
                "  Pastie, wriggling in her twin sheathes, shudders with ecstatic bliss, her every sensation overwhelmed by the pressing confines of your voracious cocks."
            );
        this.outputText(
            "  Just getting your writhing host into place has ignited the fuse of your crescendo, globs of pre-cum leaking down every shaft in anticipation.  Flesh throbbing, you curl a lip and abandon all restraint."
        );

        this.outputText(
            "\n\nThe nun, tightly bound by the twitching ropes of your cockflesh, heaves her chest, panting with hot gasps as your tentacles tense around one breast, then the other.  Squeezing her creamy mounds between your coils, the pliant flesh spills over your tendrils with buxom softness.  Her scarlet-lacquered lips curl in small smiles as your coronas slip between the ruby pillows, the moist pressure of her tits contracting as you clasp their fullness in your binding loops.  Sliding more and more of your sinuous length into her bulging breasts, a resolve settles over you, to plumb the nun's perverse throats for all of their worth.  You feed inch after inch down the suckling confines of her breasts until, with a thrust, your cocks force their way into her stomach, pre-cum dribbling a creamy appetizer into her rumbling belly. Moving as one, your shafts turn upwards, pressing themselves against the bottom of her esophagus. Startled, she searches for words, but you drive the intruding phalluses ever upward. Her neck bulges as the two cocks squirm up her besieged throat and her soft voice is cut off as your constraining tendrils nudge the back of her tonsils. Her thrashing tongue can't help but stroke your cockheads as you fill her mouth with the cheek-bloating girth of your twin, pulsing shafts."
        );

        // [Four cocks:
        if (this.player.tentacleCocks() >= 4)
            this.outputText(
                "\n\nMoving as one, your curled cocks twist and thrash, moving upward like a piston through the air and into the goblin girl.  Abylon bounces up and down atop your corkscrewing mast, each thrust lifting her into the air, only for gravity to slam her back down atop the spiraling cock-stalk.  The goblin's loosened armor shakes right off of her, piece by piece tumbling to the ground until every inch of her bare, viridian body is revealed, flesh richly glistening with beading sweat.  Her long, red braid lashes wildly with each buck, smacking her ass, tits, and hips with heavy blows, skin flushing from the whip-like spanking.  Gushing fem-cum dribbles from her cock-stuffed muff, drenching her inner thighs with the clear honey of her long denied passions.  Locking her boot-clad ankles together, she squeezes her supple thighs around the twisting dicks holding her aloft, athletic legs sliding up and down your sinewy organs with a tightness that mirrors her clutching uterus and desperate womb."
            );

        // [Six cocks:
        if (this.player.tentacleCocks() >= 6)
            this.outputText(
                "\n\nThe tentacles around Pastie ripple in wavelike motions, sliding the slit of your cockheads across her effete form.  Within your lubricated urethras, every minuscule curve on her tiny body is magnified.  Her booze-heavy ass jiggles inside you, while her fey breasts that seemed so small feel positively gargantuan against your inner walls, tiny nipples hot and stiff against the yielding softness of her mounds.  Diminutive feet delicately stroke your muscled lining while her petite legs are clenched ever tighter by your pulsing length.  She wriggles her shoulders with a muffled giggle, trying to work herself deeper inside you.  The slick pressure is incredible and, with a grunt, you push the two cocks together in an obscene kiss, leaving only the fairy's glittering wings to protrude from the plumped flesh of your shafts.  The cock-compressed outline of Pastie's form squirms with each enraptured shift of her drug-addled body, impatiently goading your body for the pearl cream all three girls covet."
            );

        this.outputText(
            "\n\nThe consuming thrills from each of your organs feed your already sizable lust, boiling a cold fire within your gut.  Gouts of churning spunk fill your [balls], flowing into your hose-like shafts with a breeder's urgency.  Your stalk-like tentacles swell and bulge under the pressure of your rushing ejaculate, visible bulges traveling through the long inches.  Scylla, wreathed from thighs to breasts and transfixed from breasts to mouth by your long tentacles, shudders in her cock-stuffed bindings.  Her supple lips, stimulated by the pressure of your leaking crests, swell to a whorish pucker.  The crimson O inflates until she can no longer keep her mouth closed, bulging lips filling the space between the bottom of her nose and the top of her chin.  Your tendrils squeeze, one by one, past the scarlet lacquer, wriggling freely in front of her face. As tightly as your cocks encircle the giantess, the force of your orgasm nevertheless propels your copious seed in bulbous loads that squeeze the nun tight enough to make her whine in immodest need."
        );

        this.outputText(
            "\n\nThe egg-like bulges slow as they slide through the suckling mouths of her nipples, the spunk seemingly draining the nun's strength, leaving her hanging limply in the muscular embrace of your binding phalluses.  Load after load pours into her tits, past her desperate stomach, and up her throbbing throat.  As the cum nears the end of its journey, you curl the tips of your tentacles around, positioning your urethras against her nostrils.  When the passion bursts from your long shafts, it splashes in sticky torrents against the nun's pale face, jets of jizz lancing down her delicate nose and back into her cock-gorged mouth. The spoo spills from the corners of her mouth and her efforts to swallow the precious seed send muscular vibrations over your violating poles that make you arch your back in bliss.  Her bosom expands, the burgeoning mounds wobbling in your grasp until, reluctantly, you loosen your curling hold on them, letting the engorged teats spill forth, each half as large as the woman who bears them.  She sinks to her knees, hands sinking to the junction of her legs, desperately dragging your girth against her virginal clit.  Grinding against the fleshy fetters wrapped about her legs and torso, she shakes her head in rapture as you paint her face in bubbling ivory and blast a pearl coating down her sinuses and esophagus."
        );

        // [Four cocks:
        if (this.player.tentacleCocks() >= 4)
            this.outputText(
                "\n\nAbby's heavy bouncing has served admirably to stretch out her naturally yielding pussy, the goblin's spongy inner walls a gift of her mother's slutty legacy.  Drawing her closer, you brace your hands on the girl's toned hips as you lean in.  The shuddering warmth has begun to pour into your spiraling shafts, but you decide to give the emerald lass a more intimate climax.  Your muscled phalluses slacken and you begin pressing your cocks around inside her, feeling every slick contour of her inner walls with your sensitive tips.  She wriggles as you pull her closer and closer, until her hot gasping breath beads moisture on your chest.  Your sinewy tendrils finish the full tour of her womb, but it is not enough.  You shove harder, stuffing more and more of your impossibly long cocks into her until the coil turns around inside the goblin.  Feeding inch after inch into her small frame, it isn't long before Abylon's gut bulges obscenely, your knotted, wriggling shafts making the skin of her belly pulse with your flesh.  By the time your spunk begins to flow through the phalluses, you've pushed nearly four feet of tentacles into her swollen uterus.  The girl's eyes have rolled into the back of her head and she drools freely, her senses unable to process the sheer volume of cock squeezed into her violated pussy.  Her taut womb trembles as the first load of sperm splashes against it, but her body is burdened by so much tentacle-flesh that your seething loads begin to gush out of her widely gaping cunt.  A river of jizz splashes out of the insensate goblin just as fast as you pump it inside of her, the regular, pulsing bulges of her stomach the only indication that it's going into her at all before it washes right back out.  It may be possible, you are forced to consider, that there is such a thing as being too full."
            );

        // [Six cocks:
        if (this.player.tentacleCocks() >= 6)
            this.outputText(
                "\n\nThe cock swallowing Pastie's upper body pulses with cum, hot jizz flooding the plugged crest of your shaft.  The sudden deluge of sticky spoo causes the little fairy to spasm in drunken nirvana as she gulps down as much as she can, opening her throat to let the spunk flow uninhibited down her throat.  The weight of your orgasm, however, is too great and liquid pressure forces your cock to slip off the girl's torso in an alabaster fountain, leaving her coated in bloated ivory globs of sperm.  Still up to her hips in the other cock, the sprite reclines, exulting in the lewd bounty coating her, licking her fingers as she rubs the drug-like spoo into her skin.  The tentacle binding her lower body, meanwhile, bloats with its own surplus.  Tidal spouts of seed well up at her feet, rushing between her legs and swell at the pixie's miniscule pussy and teensy ass.  Her eyes go wide as the rushing jism is forced up inside her, gushing into her small body like it were a winged condom.  Your sticky issue distends her lean torso, the fey girl's belly ballooning as both holes are flooded with the deluge of your passion.  \"<i>Urgh.  Too... much...</i>\" she burps as her petite form inflates with your semen.  Trying to keep her mouth closed, Pastie's throat bulges, her jaw trembles, and her cheeks puff out, a frothy lather bubbling in her nostrils.  Then, like an ivory oil derrick, the strain overwhelms her and a foaming jet of cum spurts from her maw, cascades into the air, and rains down over her seed-saturated body like a pale silver fountain.   The spunk-stuffed pixie gurgles, overwhelmed, and the force of your stream gradually pushes her hips and legs out of your cock.  Her wings manage a few half-hearted flaps, softening her descent, but the jizz-gorged fairy plops on the floor with a sticky splat, your spoo trickling out of her pussy, ass, mouth, and nose.  She wallows in the liquid weight, lost in cum-drunken rapture."
            );
        this.player.orgasm();
        this.dynStats("sen", -2, "cor", 0.5);
        this.menu();
        this.addButton(0, "Next", this.shareTentaclesWithScylla4);
    }

    // [Next]
    private shareTentaclesWithScylla4(): void {
        this.clearOutput();
        this.outputText(
            "As your orgasm wanes and you are able to catch your breath, the firmness gradually ebbs from your tentacle dicks.  Uncoiling them, your excess length shrinks back into your loins, restoring you, more or less, to normal.  Scylla slumps against the side of the bed, her eyes closed in a private communion, beatific face plastered and dripping with your seed."
        );
        // [four cocks:
        if (this.player.tentacleCocks() >= 4)
            this.outputText(
                "  Lowering the goblin girl into the nun's pillowy cleavage, she tries to make a snide remark, but can't find the strength and simply snuggles into the ample flesh of Scylla's inflated bosom.  Thick, creamy milk leaks from the nun's well-nourished nipple-lips, warm drool glazing Abby's beryl skin."
            );
        // [six cocks:
        if (this.player.tentacleCocks() >= 6)
            this.outputText(
                "  Scooping Pastie from the ground, you rest her atop the room's table, her body wobbling like an overfilled water balloon.  It's just as well that she's filled with a half gallon of spunk – she's far too drunk and high to fly without hurting herself."
            );
        this.outputText(
            "  Rather than linger, you take your leave, the restless heat of your indulgence lingering in the air as you close the door, avoiding the curious glances of tavern patrons on the way out."
        );
        if (this.player.cumQ() < 28000) this.player.cumMultiplier += 2;
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Solo Feed Scylla
    // (becomes available the day after the second plot event.   [Nun] button appears between 8 and 12 am)
    // (If player has the \"<i>Opal Ring,</i>\" change text on 3rd event)
    public scyllasFlyingSolo(): void {
        this.scyllaSprite();
        this.clearOutput();

        this.outputText(this.images.showImage("scylla-feed-bar-intro"), false);
        if (this.flags[kFLAGS.TIMES_SOLO_FED_NUN] == 0) {
            this.outputText(
                "Glancing around the bar, you spy the modestly attired, statuesque nun sitting alone in a booth.  She seems to be watching the bar patrons nervously, absently chewing at the ruby gloss of her plump lower lip.  Taking a moment longer, you realize that she's only staring at the male patrons, with a look halfway between worry and desire creasing her pale features.  Curling a loose lock of thick, jet-black hair with one hand, her other trembles atop the table, long, slender fingers drumming an anxious beat on the thick wood.  There is a lean, hungry look in her bright, blue eyes that would be positively predatory worn by anyone else— on the nun, it merely looks desperate.  She's so fixated on those around her that she doesn't even notice as you approach her booth until you clear your throat."
            );
            this.outputText(
                '\n\n"<i>O-oh!  Goodness, I am sorry, [name].  Forgive me, but I\'m a bit distracted today.  I haven\'t, ah, eaten,</i>" she apologizes, blushing.  Turning her gaze, you can\'t help but notice that she focuses in on your crotch first, before lifting her eyes to your face.  Despite her obvious thirst, she presses on with her politeness, asking, "<i>is there anything I can do to help you?</i>"'
            );

            this.outputText(
                "\n\nAs hungry as she is, Scylla seems in control of herself at the moment, so you use this opportunity to learn a bit about her condition.  As delicately as you can, you ask the nun how often she needs to feed.  \"<i>Ah, I feel the hunger every day, I'm afraid.  I try to restrain myself for as long as I can, but, well, you saw what happened when I went for nearly a week without any... food.  I don't need to eat every day, if I devote myself to prayer, but it is like a constant emptiness inside me that aches to be filled by the warmth of another.</i>\"  She manages a weak smile, her hands tightly folded in her lap.  \"<i>If I'm bringing happiness to one like yourself, it can't be too sinful to enjoy the act, can it?</i>\""
            );

            this.outputText(
                "\n\nPressing on, you inquire just how much she really needs.  Between the strange effects of her innate magic and an especially productive partner, could she ration out a single serving into several meals?  Your frank questions bring a pink flush to her cheeks and the table between you starts to wobble as she nervously bobs her legs up and down.  \"<i>I, um, don't really know, I suppose.  When I start, it's...</i>\"  She lowers her eyes, a small frown of self-reproach on her lips.  \"<i>Well, I guess I don't understand how some people can set aside things that they love.  People who can leave a meal unfinished or pour out a half glass of wine seem strange.  When the, um, hunger gets unbearable, sating it seems like the only path before me.  Like I've lost control of my ability to make choices.  I'm not sure how much is enough because there's always a desire for more, more, more...</i>\""
            );

            this.outputText(
                '\n\nThe conversation seems to be stirring up the frantic thirst inside the virgin, the bright clarity of her eyes gradually dulling as her breath quickens.  "<i>It is really quite embarrassing, having to ask this of you,</i>" Scylla implores, "<i>but I don\'t know if I can hold out for the rest of the day.  I don\'t suppose you would be willing to indulge a desperate woman?</i>"  A thought strikes you: With enough cum and a measure of self-restraint, you might be able to feed Scylla and leave her a meal or three for future days to spare the bashful nun the shame of having to beg strangers for their jizz.  Judging by how much it took to satisfy her tainted thirst in your previous meetings, you\'ll need an almost unholy volume to overwhelm her cravings.  You suppose you could offer to feed her, if you like, or just leave the buxom girl to find a meal from someone in the bar.'
            );
        } else {
            // Repeat Encounter:
            // (Available once per day, between 8-12 am)
            // [Nun]
            this.outputText(
                "Scylla is happily walking from table to table, greeting friends, inquiring how families are doing, and offering a sympathetic ear to the less fortunate.  If it weren't for her massive chest and scarlet pucker, you could almost imagine her as a normal clergy member, helping the community with unflapping kindness.  Spotting you through the tavern's crowd, she excuses herself from a conversation and sways over to you, all eight feet of the nun jiggling gently as she offers a warm smile.  Though she's in control of her impulses, you notice her waist is looking a little slim.  Catching up with the maiden, it isn't long before your attentive eyes pick up on the subtle hints warning you that her hunger is building."
            );
        }
        // [Feed] [Leave]
        this.menu();
        this.addButton(0, "Feed", this.feedScyllaSomeJizzDatJunkieNeedsIt);
        this.addButton(4, "Back", this.telAdre.barTelAdre);
    }

    // [Feed]
    private feedScyllaSomeJizzDatJunkieNeedsIt(): void {
        this.clearOutput();
        this.outputText(this.images.showImage("scylla-feed-jizz-solo-one"), false);
        this.scyllaSprite();
        this.flags[kFLAGS.TIMES_SOLO_FED_NUN]++;
        this.flags[kFLAGS.FED_SCYLLA_TODAY] = 1;
        if (this.flags[kFLAGS.TIMES_SOLO_FED_NUN] == 1) {
            this.outputText(
                "You can't just leave her here like this; the girl's desperate and it'd be too easy for somebody to take advantage of her.  Besides, judging by the tightness in your [armor], whatever strange force her appetite exerts on your body has already begun to creep into your flesh.  The cold tickle of liquid weight swells in your abdomen and your breath catches in your throat."
            );
            // [Balls:
            if (this.player.balls > 0)
                this.outputText(
                    "  The seething sensation in your loins begins to empty into your [balls], your cum factories lurching to life with a heavy, sinking sensation.  Your gear bulges as they grow, filling with your potent seed."
                );

            this.outputText(
                "\n\nDeciding it'd be best to get somewhere private sooner than later, you motion for Scylla to follow you upstairs and the two of you duck into the nearest empty room.  Slamming the door shut, you glance about and notice the chamber has been furnished with various belongings.  Somebody's staying here, but thankfully, they seem to be elsewhere for the time being.  The nun's eyes are heavily lidded, lost in some private bliss as her unconscious gluttony works its bloating effects on your body."
            );
            // [balls:
            if (this.player.balls > 0)
                this.outputText(
                    "  Your scrotum inflates ever larger until the pressure of your [armor] becomes unbearable."
                );
            this.outputText(
                "  You hastily strip and guide the pliant, hunger-dazed woman to the bed.  She proves to be further gone than you would've guessed, sinking down sluggishly and laying on her back with a hot, breathless sigh.  Her head droops over the edge of the bed, a dreamy smile playing across her bimbo-thick lips as voluminous ebony curls spill from her habit.  Your abdomen clenches in icy tightness as your loins thicken with a need nearly as great as the one dominating the overwrought maiden on the bed."
            );
            if (this.player.balls > 0)
                this.outputText(
                    "  The orbs swinging beneath your " +
                        this.multiCockDescriptLight() +
                        " continue their growth, threatening to immobilize you if you don't find release quickly.  Every motion sends your spunk-laden reservoirs sloshing and wobbling, the ponderous ballsac now hanging mere inches from the floor."
                );

            this.outputText(
                "\n\nStanding at the edge of the bed, you lift your [cock biggest] to the level of the virgin's head, holding your swollen tip inches from her panting mouth.  For the nun, everything has vanished but your turgid shaft and the creamy promise within.  With a moan of yearning desire, she circles her whorish pucker into a wanton O and presses the pliant, rosy flesh at the tip of your flushed crest.  The shameless prioress' obscene kiss sends tendrils of muscle-clenching bliss through your loins, and you can't help but thrust forward, your eager motion parting her garnet lips and slipping your pulsing cockhead into the virgin's needy mouth.  With voracious relish, she begins suckling at your [cock biggest] with a hungering devotion that borders on worship.  Her tongue swirls over and under your sloping shaft, licking and stroking every sensitive nerve in your trembling flesh.  Her cheeks go concave as she slurps greedily your long inches, her kiss reaching further, drawing more of your shaft into her.  You rock back and forth, letting the reclining maiden polish your receptive tip until a dangerous tingle thrills down your spine, warning you of the tensing in your loins."
            );
            // [balls:]
            if (this.player.balls > 0)
                this.outputText(
                    "  The churning burden heaving in your testes has grown large enough to put you off-balance, forcing you to adjust your stance to accommodate their barrel-sized girth."
                );

            this.outputText(
                "\n\nBefore you realize it, a thick lump of pre-cum gushes down your shaft and spurts into the nun's waiting maw.  The flood of thick passion takes the girl by surprise, her throat closing for a moment, forcing the geyser of lubricating spoo to find another route.  With a cough, cheeks bloating, twin streams of crystal pre-jism arc out of Scylla's nostrils, bursting across the underside of your cock.  The warm, slimy fluid drips down to splatter her flushed face.  She takes a deep swallow, trying to open the passage to her stomach, but another tide of semen floods into her jaw and follows the first, sticky strands fountaining from her nose and lacquering the nun's visage with a glistening web of spunk.  She gurgles in disappointed need and the sides of her habit tear as the demonic horns in her head curl outwards."
            );
        } else {
            // [Feed] (repeatable)
            this.outputText(
                "Suggesting the two of you retire to her room, she leads you up the stairs, closing the door behind you.  As the door clicks shut, you embrace the nun with a kiss, the sweet warmth of her pliant lips echoing through your bones as a tightness forms in your [armor].  The embrace turns impassioned, your tongue sweeping into her eager mouth as the swelling force of her silent prayers creep into your flesh.  Her long, mischievous tongue curls around you while a cold tickle of liquid weight swells in your abdomen."
            );
            // [Balls:
            if (this.player.balls > 0)
                this.outputText(
                    "  The seething sensation in your loins begins to empty into your [balls], your cum factories lurching to life with a heavy, sinking sensation.  Your [armor] bulge as they grow, filling with your potent seed."
                );

            this.outputText(
                "\n\nBreaking off the kiss, you stroke her cheek, the nun's eyes heavily lidded with content bliss as her unconscious gluttony works its bloating effects on your body."
            );
            // [balls:
            if (this.player.balls > 0)
                this.outputText(
                    "  Your scrotum inflates ever larger until the pressure of your [armor] becomes delicious."
                );
            this.outputText(
                "  She helps you strip and guides you to her bed with a coy smile.  Sinking down eagerly, she lays on her back with a hot, breathless sigh, just as before.  Her head droops over the edge of the bed, a dreamy smile playing across her bimbo-thick lips as voluminous ebony curls spill from her habit.  Your abdomen clenches in icy tightness as your loins thicken with a need nearly as great as her own."
            );
            if (this.player.balls > 0)
                this.outputText(
                    "  The orbs swinging beneath your " +
                        this.multiCockDescriptLight() +
                        " continue their growth, every motion sending your spunk-laden reservoirs sloshing and wobbling."
                );

            this.outputText(
                "\n\nStanding at the edge of the bed, you lift your [cock biggest] to the level of the virgin's head, holding your swollen tip inches from her panting mouth.  For the nun, everything has vanished but you and her, alone together in a moment that stretches on forever.  With a yearning moan, she circles her whorish pucker into a wanton O and presses the pliant, rosy flesh at the tip of your flushed crest.  The shameless prioress' obscene kiss sends tendrils of muscle-clenching bliss through your loins.  Eagerly, you thrust forward, parting her garnet lips and slipping your pulsing cockhead into the virgin's needy mouth.  With voracious relish, she begins suckling at your [cock biggest] with a hungering devotion that borders on worship.  Her tongue swirls over and under your sloping shaft, licking and stroking every sensitive nerve in your trembling flesh.  You rock back and forth, letting the reclining maiden polish your receptive tip until a dangerous tingle thrills down your spine, warning you of the tensing in your loins."
            );
            if (this.player.balls > 0)
                this.outputText(
                    "  The churning burden heaving in your testes has grown large enough to put you off-balance, forcing you to adjust your stance to accommodate their swelling girth."
                );

            this.outputText(
                "\n\nA thick lump of pre-cum gushes down your shaft and spurts into the nun's waiting maw.  The flood of thick passion takes the girl all the way to the back of her throat, the volume flooding back into her mouth.  With a cough, cheeks bloating, twin streams of crystal pre-jism arc out of Scylla's nostrils, bursting across the underside of your cock.  The warm, slimy fluid drips down to splatter her flushed face.  She takes a deep swallow, trying to open the passage to her stomach, but another tide of semen floods into her jaw and follows the first, sticky strands fountaining from her nose and lacquering the nun's visage with a glistening web of spunk.  She gurgles in happy laughter but the thirst inside of her is dissatisfied by the waste, her habit falling from her head as the tainted woman's demonic horns grow outward in curling spirals."
            );
        }
        this.player.orgasm();
        this.dynStats("sen", -1);
        // [Next]
        this.menu();
        this.addButton(0, "Next", this.feedingScyllaCumStepTwo);
    }

    private feedingScyllaCumStepTwo(): void {
        this.clearOutput();
        this.outputText(this.images.showImage("scylla-feed-jizz-solo-two"), false);
        this.scyllaSprite();
        if (this.flags[kFLAGS.TIMES_SOLO_FED_NUN] == 1) {
            this.outputText(
                "Like a punch to the stomach, the nun's virile magic pours into you, a flux of hot and cold stimulating your prostate into an intoxicating overdrive.  "
            );
            // [balls:
            if (this.player.balls > 0)
                this.outputText(
                    "The pressure on your corpulent balls is suffocating, the goblin-sized globes hanging from you literally vibrating under the tension of your imminent orgasm.  "
                );
            this.outputText(
                "To avoid further waste, you begin sliding your meat deeper into the nun's mouth, feeding inch after inch until you hit the back of her throat and push further.  Reaching out, you grab the sides of the nun's head, tilting her jaw back to ease the relentless journey of your tremulous hydrant.  Her throat clenches down around you in muscled pulses, rings of tension milking your [cock biggest] with every gulping gasp the tainted nun takes.  Her neck visibly bulges as you grit your teeth and force your girth deeper into her welcoming body."
            );
            this.outputText(
                "\n\nThe dilated swelling is forced down Scylla's throat with every grunting thrust until the conspicuous outline of your cockhead vanishes past her collarbone, slipping deeper into her.  The pulsing throb of her racing heart adds vigor to your increasingly intense motions, the entire bed rocking back and forth with wooden squeals of protests as you fuck the nun's ballooning throat with a single-minded fervor.  You shift your grip from the sides of her overburdened jaw to the curling bone of her demonic horns, using the tainted virgin's impure coils like handlebars as you hilt yourself against the plush expanse of her slutty, scarlet smile."
            );
            if (this.player.balls > 0) {
                this.outputText(
                    "  With her spoo-lacquered  face pressed against the trembling tautness of your preposterously ponderous pouch, you can feel the addled nun's expression melt from intense focus to beatific adulation.  Clasped tightly against your swollen sac, Scylla gurgles in idolizing reverence, her tongue wriggling free from the flesh-gag of your shaft to trace prayer-like whorls against your supple, seed-stuffed scrotum.  Paying her hot, wet homage to the spunk-bloated testes flooded with the oceanic weight of your treasured cream, the devoted woman exults in the heavenly opportunity you've given her to pay glorious tribute to the "
                );
                if (this.player.balls == 2) this.outputText("twin");
                else if (this.player.balls == 4) this.outputText("fourfold");
                else this.outputText("many");
                this.outputText(" deities hung from your loins.");
            }
            this.outputText(
                "\n\nWith a rapid series of shallow, ardent thrusts, the surging heat of your orgasm steadily tightens iron bands around your lungs until you peel your lips into a grimace, sucking cold air through your teeth.  The nun's immense breasts wobble in their too-tight robe, rippling mounds swaying in frantic oscillations that batter her chin with marshmallow-soft shudders.  The steady stream of pre-cum pulsing in rippling waves down your spearing shaft begin to accumulate in her eager belly, swelling Scylla's taut tummy with an appetizer of the countless gallons you have prepared for her.  Reacting to the fluid nourishment, the profane maiden's peaks bloat, distended with inflating flesh that plumps and fattens from merely mammoth mounds to truly titanic tits.  The black velvet of her robes groan and whine at the ballooning dimensions of her chest, the monochromatic fabric beginning to tear at the seams.  Before her bust spills out, however, you reach the limits of your restraint and your climax overwhelms you."
            );

            this.outputText(
                "\n\nThe deluge of your semen pours forth in globular torrents that stretch Scylla's jaw to its limits, bloated swells of cum distending your [cock biggest], while the prioress' throat fattens obscenely around your widening girth.  Pumping load after load directly into her tainted stomach, you are rewarded with the sight of her gut thickening into an expanding paunch.  With every fresh wave of cascading spunk, the nun's belly enlarges, her lean frame swallowed under the corpulent bulk of her cum-swollen heft."
            );
            // [Balls:
            if (this.player.balls > 0)
                this.outputText(
                    "  Discharging their pressurized bounty in an unbound release, your over-inflated balls finally cease their incapacitating growth and begin to deflate by inches at a time.  When you take a shuddering breath, it's as if you had been underwater and finally broken the surface - gulping cool air into your lungs with heaving gasps of blessed relief."
                );
        } else {
            this.outputText(
                "Like a bolstering surge, the nun's virile magic pours into you, a flux of hot and cold stimulating your prostate into an intoxicating overdrive.  "
            );
            // [balls:
            if (this.player.balls > 0)
                this.outputText(
                    "The pressure on your corpulent balls is tremendous, the over-burdened globes hanging from you literally vibrating under the tension of your imminent orgasm.  "
                );
            this.outputText(
                "Needing no further coaxing, you begin sliding your meat deeper into the nun's mouth, feeding inch after inch until you hit the back of her throat and push further.  Reaching out, you grab the sides of the nun's head, tilting her jaw back to ease the relentless journey of your tremulous hydrant.  Her throat clenches down around you in muscled pulses, rings of tension milking your [cock biggest] with every gulping gasp the impure nun takes.  Her neck visibly bulges as you grit your teeth and force your girth deeper into her welcoming body."
            );

            this.outputText(
                "\n\nThe dilated swelling is forced down Scylla's throat with every grunting thrust until the conspicuous outline of your cockhead vanishes past her collarbone.  The pulsing throb of her racing heart adds vigor to your increasingly intense motions, the entire bed rocking back and forth with wooden squeals of protests as you fuck the nun's ballooning throat with a single-minded fever.  You shift your grip from the sides of her overburdened jaw to the curling bone of her demonic horns, using the tainted virgin's corrupt coils like handlebars as you hilt yourself against the plush expanse of her slutty, scarlet smile."
            );
            // [Balls:
            if (this.player.balls > 0) {
                this.outputText(
                    "With her spoo-lacquered face pressed against the trembling tautness of your preposterously ponderous pouch, you can feel the awed nun's expression melt from intense focus to beatific adulation.  Clasped tightly against your swollen sac, Scylla gurgles in idolizing reverence, her tongue wriggling free from the flesh-gag of your shaft to trace prayer-like whorls against your supple, seed-stuffed scrotum.  Paying her hot, wet homage to the spunk-bloated testes flooded with the oceanic weight of your treasured cream, the devoted woman exults in the heavenly opportunity you've given her to pay glorious tribute to the "
                );
                if (this.player.balls == 2) this.outputText("twin");
                else if (this.player.balls == 4) this.outputText("fourfold");
                this.outputText(" deities hung from your loins.");
            }
            this.outputText(
                "\n\nWith a rapid series of shallow, ardent thrusts, the surging heat of your orgasm steadily tightens iron bands around your lungs until you peel your lips into a grimace, sucking cold air through your teeth.  The steady stream of pre-cum pulsing in rippling waves down your spearing shaft begin to accumulate in her eager belly, swelling Scylla's taut tummy with an appetizer of the countless gallons you have prepared for her.  Reacting to the fluid nourishment, the profane maiden's peaks bloat, distended with inflating flesh that plumps and fattens from merely mammoth mounds to truly titanic tits.  The black velvet of her robes groans at the ballooning dimensions of her chest, the new fabric stretching to accommodate the woman's unusual dimensions.  Before she can put the elastic robe to its fullest test, however, you reach the limits of your restraint and your climax overwhelms you."
            );

            this.outputText(
                "\n\nThe deluge of your semen pours forth in globular torrents that stretch Scylla's jaw to its limits, bloated swells of cum distending your [cock biggest], the prioress' throat fattening obscenely around your widening girth.  Pumping load after load directly into her tainted stomach, you are rewarded with the sight of her gut thickening into an expanding paunch.  With every fresh wave of cascading spunk, the nun's belly enlarges, her lean frame swallowed under the corpulent bulk of her cum-swollen heft."
            );
            // [Balls:
            if (this.player.balls > 0)
                this.outputText(
                    "  Discharging their pressurized bounty in an unbound release, your over-inflated balls finally cease their incapacitating growth and begin to deflate by inches at a time."
                );
        }
        this.player.orgasm();
        this.dynStats("lib", 0.5, "sen", -1);
        // [Next]
        this.addButton(0, "Next", this.cumFeedScyllaShesACoolGirl);
    }

    private cumFeedScyllaShesACoolGirl(): void {
        this.fatigue(10);
        this.scyllaSprite();
        this.clearOutput();
        this.outputText(this.images.showImage("scylla-feed-jizz-solo-three"), false);
        if (this.flags[kFLAGS.TIMES_SOLO_FED_NUN] == 1) {
            // [Low Cum Production (under 250,000 ml)]
            if (this.player.cumQ() <= 50000) {
                this.outputText(
                    'Eventually, your reservoir runs dry and the two of you separate, your cock sliding from her suckling lips with a wet pop.  For the volume of spunk you unleashed, the room is surprisingly clean— most of your spoo is either sloshing around inside Scylla\'s belly or dripping off of her blissful face.  Before long, the morphic nun processes the fattening banquet of your hydraulic sperm-spout, her tummy shrinking by degrees before your eyes.  She still looks positively pregnant with the liquid volume of your spunk, but the cum-siphoning maiden is able to lift her blimp-sized tits and waterlogged tummy to a sitting position.  Taking your hand in hers, she murmurs, "<i>I cannot thank you enough for this,</i>" her soft, quiet voice rich with warm gratitude.  "<i>Somehow, talking about my condition made it a little easier to handle.  I think, in time, I will be able to manage my thirst on my own terms.  As long as I have friends like you to help me along the way.</i>"  Offering her a shoulder to lean on, the two of you leave the room before it owner gets back.'
                );
                // [End Encounter]
                this.player.cumMultiplier += 1 + Scylla.rand(5);
                if (this.player.balls > 0) this.player.ballSize++;
                this.doNext(this.camp.returnToCampUseOneHour);
            }
            // [High Cum production (over 250,000 mL)]
            else {
                if (this.player.balls > 0) this.player.ballSize++;
                this.outputText(
                    "Your seething, potent issue spurts in a throbbing geyser that threatens to overwhelm you, but a cold island of strength wells up from deep inside.  As difficult as it is to stem the tide, you manage to tighten your internal muscles and slow the spouting flood of your loins into a trickling ooze, cutting the rush of your orgasm short.  Casting your gaze about, you spot a cache of condoms by the bedside and grab a handful.  Scylla, seed-saturated into a digestive daze, gulps mindlessly as you regretfully slide your still-hard shaft from the swallowing tug of her holy throat.  You pull your swollen tip past her bloated crimson pucker with a wet pop as blobs of your saliva-slick spoo bubble at her lips and run down her face in a frothy pearl veil.  With trembling fingers, you affix one of the condoms to your [cock biggest], the taut latex rolling down your engorged shaft just in time to catch a stray load that squeezes past your clenching abdomen.  Stroking yourself and releasing the clenching in your gut, you quickly fill the surprisingly hefty rubber with a few gallons of jizz before the candy-colored sheath begins to overflow and you are forced to peel it off, carefully tying the end before reaching for another."
                );
                this.outputText(
                    "\n\nTo your amazement, Scylla has recovered her wits faster than you would've expected.  While her body is still pinned to the bed by her robe-distorting girth, she's blinked back enough of your parting facial to see what you're doing.  Her gradually receding horns suggest the nun's regained a measure of control and she helpfully offers a fresh prophylactic to replace the filled one.  Letting her take care of the application from her prone position, you begin to slow your breath as the urgent deluge of your climax ebbs to a series of heavy, ecstatic spurts.  The attentive virgin affixes the condom firmly around your member, stroking and licking your underside to encourage the steady flow, filling the latex pouches one after another, twisting their ends into firm knots to keep the precious seed inside the bloated balloons.  Occasionally, a stray twitch sends a fist-sized dollop of your spunk splattering against her face or tits, but she holds herself back from pressing her whore-swollen lips to the faucet of your shaft.  Perhaps there is hope for her self control after all."
                );
                this.outputText(
                    '\n\nEventually, your reservoir runs dry and the two of you tie off the last condom.  All around you, a sea of colored rubber orbs sag under the globular weight of their sloshing contents.  The time you took letting Scylla milk you of every last drop has given the morphic nun a chance to process the fattening banquet of your hydraulic sperm-spout.  She still looks positively pregnant with the liquid volume of your spunk, but the cum-siphoning maiden is able to lift her blimp-sized tits and waterlogged tummy to a sitting position.  "<i>I cannot thank you enough for this,</i>" she murmurs, her soft, quiet voice rich with warm gratitude.  She takes your hands in hers and gives your palms a squeeze with the tips of her fingers.  "<i>With these to tide me over, I think I will be able to manage my thirst on my own terms, at least for a while.</i>"  She smiles, blue eyes glistening with small tears of happiness.  Though exhausting, you believe that you could provide a similar, absurd quantity for Scylla after a bit of rest.  In fact, if you wanted to, you could offer to be the sole spunk supplier for the eternally thirsty nun.  You\'d be keeping the mild woman\'s impure hunger from staining her reputation, not to mention shielding her from the lusts of strangers.'
                );

                this.outputText(
                    "\n\nWould you like to offer to become Scylla's personal- and only- cum purveyor?"
                );
                this.player.cumMultiplier += 1 + Scylla.rand(5);
                if (this.player.balls > 0) this.player.ballSize++;
                // [Offer][Decline]
                this.menu();
                this.addButton(0, "Offer", this.beScyllasPersonSemenSquirtingMilkMaid);
                this.addButton(4, "Leave", this.declineToBeASpunkPumpintJizztrocity);
            }
        } else {
            // [Low Cum Production (under 250,000 ml)]
            if (this.player.cumQ() <= 50000) {
                this.outputText(
                    'Eventually, your reservoir runs dry and the two of you separate, your cock sliding from her suckling lips with a wet pop.  Her tummy sloshing with gallons of your spoo, she eagerly laps the dripping cum from her blissful face with her long, serpentine tongue.  Scylla has already begun to processes the fattening banquet of your saliva-slick sperm-spout, her tummy shrinking by degrees before your eyes.  She still looks positively pregnant with the liquid volume of your spunk, but the cum-siphoning maiden is able to lift her blimp-sized tits and waterlogged tummy to a sitting position.  "<i>I cannot thank you often enough for your charity,</i>" she coos, her soft, quiet voice rich with warm gratitude.  You leave the girl to enjoy her lunch, heading back to camp with a grin.'
                );
                // [End Encounter]
                this.player.cumMultiplier += 1 + Scylla.rand(5);
                if (this.player.balls > 0) this.player.ballSize++;
                this.doNext(this.camp.returnToCampUseOneHour);
            }
            // [High Cum production (over 250,000 mL)]
            else {
                this.outputText(
                    "Your seething, potent issue spurts in a throbbing geyser that threatens to overwhelm you, but a cold island of strength wells up from deep inside.  As difficult as it is to stem the tide, you manage to tighten your internal muscles and slow the spouting flood of your loins into a trickling ooze, cutting the gush of your orgasm short.  Casting your gaze about, you spot a cache of condoms Scylla's placed by the bedside.  Scylla, seed-saturated into a digestive daze, laps the underside of your shaft encouragingly as you slide your still-hard shaft from the swallowing tug of her holy throat.  You pull your swollen tip past her bloated crimson pucker with a wet pop as blobs of your saliva-slick spoo bubble at her lips and run down her face in a frothy pearl veil.  With steady fingers, you affix one of the condoms to your [cock biggest], the taut latex rolling down your engorged shaft."
                );

                this.outputText(
                    "\n\nScylla's body is still pinned to the bed by her robe-distorting girth, but she's blinked back the lusty haze enough to help with the post-feeding task.  With tender motions, she helps you pump a few gallons into the condom before it threatens to overflow.  She peels it off and grabs a fresh prophylactic to replace the filled one, fitting it to your [cock biggest] with practiced motions as you tie off the first bubble.  The urgent deluge of your climax ebbs to a series of heavy, ecstatic spurts as the attentive virgin affixes the condom firmly around your member, stroking and licking your underside to encourage the steady flow, filling the latex pouches one after another, twisting their ends into firm knots to keep the precious seed inside the bloated balloons.  Occasionally, a stray twitch sends a bulbous dollop of your spunk splattering against her face or tits, but she merely laughs at the stray spunk, maintaining her self control."
                );

                this.outputText(
                    '\n\nEventually, your reservoir runs dry and the two of you tie off the last condom.  All around you, a sea of colored rubber orbs sag under the globular weight of their sloshing contents.  The time you took letting Scylla milk you of every last drop has given the morphic nun a chance to process the fattening banquet of your hydraulic sperm-spout.  She still looks positively pregnant with the liquid volume of your spunk, but the cum-siphoning maiden is able to lift her blimp-sized tits and waterlogged tummy to a sitting position.  "<i>I cannot thank you often enough for this,</i>" she coos, her soft, quiet voice rich with warm gratitude.  "<i>It almost seems as if you leave me with more of these gifts every time we do this!</i>"  she marvels.  "<i>You truly are a font of kindness.</i>"'
                );
                if (this.player.hasKeyItem("Opal Ring") < 0) {
                    this.outputText(
                        "\n\nThough exhausting, you believe that you could provide a similar, absurd quantity for Scylla after a bit of rest.  In fact, if you wanted to, you could offer to be the sole spunk supplier for the eternally thirsty nun.  You'd be keeping the mild woman's impure hunger from staining her reputation, not to mention shielding her from the lusts of strangers."
                    );
                    this.outputText(
                        "\n\nWould you like to offer to become Scylla's personal—and only—cum purveyor?"
                    );
                    this.player.cumMultiplier += 1 + Scylla.rand(5);
                    if (this.player.balls > 0) this.player.ballSize++;
                    // [Offer][Decline]
                    this.menu();
                    this.addButton(0, "Offer", this.beScyllasPersonSemenSquirtingMilkMaid);
                    this.addButton(4, "Leave", this.declineToBeASpunkPumpintJizztrocity);
                } else {
                    this.player.cumMultiplier += 1 + Scylla.rand(5);
                    if (this.player.balls > 0) this.player.ballSize++;
                    this.doNext(this.camp.returnToCampUseOneHour);
                }
            }
        }
    }

    // [Decline]
    private declineToBeASpunkPumpintJizztrocity(): void {
        this.clearOutput();
        this.scyllaSprite();
        this.outputText(
            "In retrospect, a thirst like Scylla's is only going to grow as time goes on and you'd just as soon not be accountable for the girl's limitless needs.  She seems capable of taking care of herself in your absence, so there's no reason to formalize the favors you do for her.  You accept the nun's grateful thanks and take your leave."
        );
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [Offer]
    private beScyllasPersonSemenSquirtingMilkMaid(): void {
        this.clearOutput();
        this.scyllaSprite();
        this.outputText(
            "You explain the proposition to the sated nun, who listens attentively.  She's hesitant at first, saying that she could never impose so much on you after all the kindness you've done her, asking nothing in return.  You dismiss her reservations  with a laugh and explain the sort of trials you've already endured in graphic enough detail to make her blush a bright crimson.  After so much strife, feeding a nun in the most pleasurable way possible is hardly the chore she makes it out to be.  Though you can't guarantee that you'd be able to stop by every day, with the sheer amount you can leave her, Scylla should have enough cum to keep herself from losing control.  You note that she'll have to see about picking up plenty of condoms for next time, though."
        );

        this.outputText(
            '\n\nWith a small nod, Scylla agrees.  "<i>Thank you, [name], this is more kindness than I could have ever asked for.</i>"  Her eyes light up and she reaches into a small pouch within her robe, producing a small band of pale white stone.  "<i>This is an opal ring from my home,</i>" she explains.  "<i>It normally signifies an oath, though in this case, I believe it is more a promise between friends.  I\'d like you to take it, with my gratitude.</i>"  She presses the ring into your hand with a wide smile, thanking you once more before rising to her feet, wobbling a bit at the liquid weight still inside her.  "<i>Please don\'t trouble yourself about the clean up.</i>"  Gesturing at the parcels you\'ve left today, she adds, "<i>I\'ll move these to my room and take care of the mess.  Meeting the kind soul who, ah, lent us their room today will give me a chance to ask where they got these condoms.  For next time,</i>" she cheerfully laughs.'
        );

        this.outputText("\n\nRing in hand, you head back to camp.");
        this.player.createKeyItem("Opal Ring", 0, 0, 0, 0);
        this.outputText("\n\n(<b>Gained Key Item: Opal Ring</b>)");
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    public openTheDoorToFoursomeWivScyllaAndFurries(): void {
        this.clearOutput();
        this.scyllaSprite();
        this.outputText(
            "The door audibly creaks when you slip into the Wet Bitch’s back room, but the chamber’s occupants are none the wiser, too busy passionately rutting to hear something as subtle as a hinge’s protest. Scylla is on her knees (of course), her breasts ballooned to gargantuan sizes, big enough that the sit on the floor with her while two white-furred girls pound away at her noisily slurping lipples."
        );
        this.outputText(
            "\n\nThe form on the left is the smaller of the two - a white-furred mouse-girl that can’t be more than an inch over five feet tall, her slit dripping so freely that a small puddle has formed betwixt her thrusting, well-muscled thighs. A frankly monstrous rod juts from where the pink bud of a clit ought to be, as thick around as the rodent woman’s arm and yet somehow fitting snugly between one of the nun’s extra lips all the same, stretching them into a scarlet ‘o’ of cock-devouring hunger."
        );
        this.outputText(
            "\n\nOn the right is a much more physically imposing woman - almost seven feet of muscular husky-girl, her fur slicked by a fine layer of sweat. Her hands are gripping Scylla’s tit so firmly that her fingers are buried deeply into the soft breastflesh, her muscles bulging from the effort of holding the over-sized mammary up to her bright red dog-cock. Unlike her miniature companion, she’s got a proper set of balls separating her turgid dick from the lips of her dewy slit."
        );
        this.outputText(
            "\n\nScylla’s fluttering eyes spot you from between the curvy hermaphrodites. Her tongue laps hungrily at her lips before she stops herself, blushing. <i>“[name]! I... ooh... didn’t... uh... oh my! You l-look so pent up!”</i>"
        );
        this.outputText(
            "\n\nYou shed your [armor] halfway through her stammered apology-turned-invitation, giving her a good long look at your [cocks]. Luminous, innocent eyes fix on your libertine display, filling with hunger by the second. Her mouth falls open on its own, her tongue rolling out like a lush red carpet, an invitation if you’ve ever seen one."
        );
        this.outputText(
            "\n\nThe orally-fixated nun’s companions finally react to your presence when you shoulder between them. The husky gasps briefly before making way, her voice trailing off into a simpering moan. To your left, the mouse just smirks at you, grinning lewdly while pumping several feet of cock deeper into the holy woman’s corrupted tit."
        );
        // First time
        if (this.flags[kFLAGS.SCYLLA_FURRY_FOURSOME_COUNT] == 0) {
            this.outputText(
                "\n\nShe greets you in between grunts of pleasure, <i>“I’m Snow, and the whimpering slut over there is Winter. Nice to finally meet you, [name].”</i>"
            );
            this.outputText(
                "\n\nYou nod and step a little closer. Scylla’s tongue stretches out to greet your [cockHead biggest], lapping wetly against it. You struggle not to groan too lewdly in the presence of the more composed mouse."
            );
            this.outputText(
                "\n\n<i>“Awww, don’t be shy,”</i> Snow coos, swatting at your [butt] with her whip-like tail until your hips hitch forward. <i>“She told us about you earlier.”</i> The mouse pauses, wiggling her tail between your cheeks until it’s pressing on your asshole. <i>“Usually I reserve this kind of treatment for Winter, but we can’t have you backing out after coming this far, can we?”</i> You lurch forward from the near-intrusion, burying more than a few inches into Scylla’s sucking gullet."
            );
            this.outputText(
                "\n\nShe hums happily, eyes falling closed to focus on the feelings coming from her three mouths."
            );
        } else {
            this.outputText(
                "\n\nThe cocky rodent, Snow, greets you in between grunts of pleasure, <i>“Hello again, [name]. You’re just in time - she hasn’t had any cum yet, and she wouldn’t shut up about wanting your dick in her mouth until we both started plugging her together. Some nun.”</i>"
            );
            this.outputText(
                "\n\nYou step a little closer, allowing Scylla’s tongue to stretch out to caress your [cockHead biggest]. She laps at you wetly, running an organ that seems more snake than muscle in lazy circles around your girth. You struggle not to groan too lewdly in presence of the two herms, silently hoping for a little encouragement from Snow again."
            );
            this.outputText(
                "\n\nThe albino mouse has quite the twinkle in her red-hued eyes as she watches you, silently wrapping her rodentine tail around behind your [butt]. She gently caresses each of your cheeks with it before threading in between to press gently on your [asshole]. <i>“Need a little more encouragement, don’t you?”</i>"
            );
            this.outputText(
                "\n\nYou nod and thrust the first few inches of your [cock biggest] into Scylla’s mouth at the direction of her tail. The nun moans around your shaft and lets her eyes drift closed, overwhelmed by the feelings from three dick-stuffed mouths and her own unholy seed-hunger."
            );
        }
        this.outputText(
            "\n\nSnow beams at you, still circling your [asshole] while you feed the rest of your [cock biggest] into the nun’s mouth of your own accord."
        );
        this.outputText(
            "\n\nWinter huskily whimpers from the other side, <i>“How can you two even talk... It’s so good.”</i>"
        );
        this.outputText(
            "\n\nThe mouse-girl just snickers, but looking down, you can see why she’s having so much trouble. Scylla’s nipple-mounted lips have swollen around the dog-girl’s dick into a pair of glistening fuckpillows. Slippery, lubricated milk spills down the lower lip in thick streams while deft fingers fondle the husky’s fuzzy balls. The holy woman’s expanded cocksuckers slide back and forth against a fully expanded knot, making wet sucking noises with every back and forth motion."
        );
        this.outputText(
            "\n\nThe hapless dog-woman isn’t even thrusting anymore, just wildly and uncontrollably trembling under the assault. By all the signs, she ought to be cumming already, knotting herself in Scylla’s tit and force-feeding her a hot, sticky snack."
        );
        this.outputText(
            "\n\nInstead, she seems held on the edge of orgasm while her balls twitch and... grow in the nun’s hand. You do a double take before you’re sure of what you’re seeing. Winter’s furry sack is at least twice as big as it was when you came in and growing bigger by the second. You should have expected as much after your previous encounters with the nun, but actually seeing it happen to someone else is something else entirely."
        );
        this.outputText(
            "\n\nSnow giggles while you watch, still pounding her gigantic rod deep into the corrupted sister’s boob. <i>“Somethin’ to see, isn’t it? I kind of wish Scylla’ed do that to me.”</i> She leans closer and adds, whispering low, <i>“I swear the husky slut cums way harder since our last visit than before. The bitch "
        );
        if (this.flags[kFLAGS.SCYLLA_FURRY_FOURSOME_COUNT] == 0)
            this.outputText("busts her nuts like a champ.");
        else if (this.flags[kFLAGS.SCYLLA_FURRY_FOURSOME_COUNT] <= 1)
            this.outputText("fills condoms like some kind of balloon-making machine.");
        else if (this.flags[kFLAGS.SCYLLA_FURRY_FOURSOME_COUNT] <= 2)
            this.outputText("busts condoms just about every other orgasm now.");
        else if (this.flags[kFLAGS.SCYLLA_FURRY_FOURSOME_COUNT] <= 3)
            this.outputText("busts condoms if she even thinks about using ‘em.");
        else
            this.outputText(
                "can almost fill a bathtub nowadays. Fuck, I love watching her squirm while I tease those huge loads out of her."
            );
        this.outputText("”</i>");
        this.outputText(
            "\n\nYou feel like you started cumming a little more... vigorously since your first visits with Scylla as well. Nothing wrong with a little bit more spunk though, right? You feed the last few inches of your length past the nun’s scarlet suckers, feeling your [cockHead biggest] snake down her seemingly endless throat. It’s hard to be concerned about something that feels so unequivocally good, particularly when you’re already started to leak pre-cum like a sieve into a wanton woman’s belly."
        );
        this.outputText(
            "\n\nScylla’s pearl-white cheeks color red in delight and excitement when her nose rubs against your belly, miraculously able to breath with "
        );
        if (this.player.biggestCockLength() <= 12) this.outputText("a foot");
        else if (this.player.biggestCockLength() < 24) this.outputText("over a foot");
        else this.outputText("a few feet");
        this.outputText(" of cock choking off her throat.");
        this.outputText(
            "\n\nSnow, clearly feeling mischievous, draws most of the way out of chosen target, releasing a small avalanche of backed-up milk in the process. She gingerly guides her nearly three-foot pole over the nun’s leaking lips, brushing her quivering tip against the sensitive ruby pillows. <i>“Hey, if you use some of that magic on me, I’ll put it back in </i>and<i> milk [name]’s prostate for you.”</i>"
        );
        this.outputText(
            "\n\nScylla shows no outward signs of having heard the mouse-woman’s offer."
        );
        this.outputText(
            "\n\n<i>“Don’t I get a say in this?”</i> you protest, held fast by the corrupted priestess’s lasciviously wriggling tongue and vacuum-sealed lips."
        );
        this.outputText(
            "\n\nSnow pushes her bulbous head halfway back in. <i>“Nope! Just think about it, you, making my huge dick squirt out rivers of that stuff you crave, and me, squeezing every... single... drop... from lover-" +
                this.player.mf("boy", "girl") +
                " here.”</i>"
        );
        this.outputText(
            "\n\nThe white-furred mouse abruptly squeals and violently rams herself back in hard enough to splatter you with a spray of milk. <i>“D-d-damn!”</i>"
        );
        this.outputText(
            "\n\nScylla’s eyes open wide, the white around her azure gaze darkening. Her sclera seem to be filling up with ink, entrapping her once-innocent eyes in deep, corrupted sable. Her horns, formerly nubs, elongate, arching back along the nun’s head until they have more in common with a ram’s twisted battering rams than muted, demonic tips she bore before. Worst of all, there’s no hint of the gentle creature you’ve gotten to know so well. Her compassionate features have warped into a hungry, cruel sort of beauty, the sort of spell-binding, hypnotic attraction you’ve only ever seen in the flames of a bonfire."
        );
        this.outputText(
            "\n\n<i>“Ahhhh~”</i> Snow gasps, arching her back to violently plunge herself deeply into Scylla. Just below her, you spy the demonic woman’s fingers wriggling, firmly embedded into the mousette’s vagina. Every movement of those digits is announced by the splattering of girlcum on the floor and echoed by abrupt upward pitching of Snow’s moans. The breast binding the mouse swells larger by the second, doubtless filling with a load of cum as immense as its source. It pushes against your [leg], partially enveloping you as it grows."
        );
        this.outputText(
            "\n\nIn spite of that, the small-statured but hung albino manages to stay true to her word, thrusting her tail into your [asshole] in between full-body, orgasmic spasms. It roughly presses on your anal walls, thrusting about as it hunts for your p-spot like some kind of prostate-seeking missile. You whimper, dick surging inside Scylla’s mouth, drizzling thicker and thicker gouts of pre with every second. The whole time, her eyes watch you knowingly, mischievously twinkling right up until Snow’s tail finally scores a hit on its target and rudely compresses your prostate."
        );
        this.outputText(
            "\n\nYou aren’t sure if Scylla’s subconscious use of black magic is responsible or if you’re merely a quick shot when dick-deep in a hot-girl’s throat and massaged from behind. Either way, you go off like a canon, flooding a gooey river of spooge directly into the cum-guzzling nun’s belly. You swear you can hear a purr from somewhere in her overstuffed gullet, but there’s no way she could make a sound like that with so much prick stuffed inside her, right?"
        );
        if (this.player.cockTotal() > 1) {
            this.outputText(" It’s nowhere near as strange as the fact that your other ");
            if (this.player.cockTotal() == 2) this.outputText("dick goes");
            else this.outputText("dicks go");
            this.outputText(
                " limp, seemingly unable to waste a single drop of your viscous release."
            );
        }
        this.outputText(
            "\n\nThe point of Snow’s tail slips off your prostate, easing up enough for your torrent of spunk to briefly abate. You whimper, and she merely presses down on it with the fold of tail behind it, penetrating you more deeply and simultaneously managing to more fully massage for your anal pleasure button. The thrumming arcs of bliss being squeezed into your [cock biggest] pale in comparison from the ecstasy being thrust into you directly through the most tender place in your ass."
        );
        this.outputText(
            "\n\nSomething soft and fuzzy brushes your [leg] on your right side, drawing your lust-addled gaze in that direction. It’s Winter’s ballsack, or at least the monstrosity it has become. It must have been growing this entire time, and it’s gotten so large that the poor husky has to stand on her clawtips to keep her bodyweight from compressing them too forcefully. Her face is more desperate than pained, and her knot is swollen almost as large as a grapefruit. Somehow, Scylla’s lipples are still able to slide back and forth across it - did her orally-gifted mammary grow even bigger to handle it? Those lips look big enough to handle another three huskies - or one more Snow."
        );
        this.outputText(
            "\n\nWinter pleads and moans, <i>“P-please let me c-cum! I can’t take anymore!”</i> Her claws dig in deeply enough to make Scylla’s throat convulse around you in pain, though you perceive it as nothing more than another form of massage for your [cock biggest], urging you to release more of the seemingly endless lake of jism within."
        );
        this.outputText(
            "\n\nScylla shakes her head, her eyes abruptly losing their onyx luster, pain and confusion evident on her face. Her horns, however, stay as they are, and you are unable to deny the lust pounding through your veins, grabbing to aid you in wildly humping her face, dumping wad after wad into into her expanding belly. Her hands release Snow’s squirting twat and Winter’s hyper-inflated nutsack at the same time. Their voices pitch into a chorus of orgiastic delight, filling the air with so much passionate screaming that you can’t even pick your own exultations out of the crowd."
        );
        this.outputText(
            "\n\nSnow is the first to whimper and fall away. Her thirty-inch rod pulls out with a tremendously wet-sounding pop, chased by sticky globules of cummy milk. She lays flat on her back, breathing heavily and lewdly pumping her hips as if she were still inside, somehow still pumping thick gouts of her own mousy cream onto her modest breasts. Gone is the swaggering dom. In her place is a lust-drunk mouse, rubbing palmfuls of pearly cream into her fur."
        );
        this.outputText(
            "\n\nYou aren’t far behind her. The moment her tail slips from your sore prostate and out of your [asshole], your [legs] give out, dropping you on a pile of clothes. Your [cock biggest] gives a few feeble squirts before "
        );
        if (this.player.lib >= 80 || this.player.minLust() > 50)
            this.outputText("slapping into your belly, still hard but spent");
        else this.outputText("starting to go limp");
        this.outputText(
            ". It feels like you’ve been cumming for hours, and you’re equal parts sore and exhausted as a consequence."
        );

        this.outputText(
            "\n\nStill standing, Winter has released Scylla’s tit in order to more aggressive maul at her own, her claws digging in so deeply that she looks about to pierce her own skin. Down below, a agonizingly bloated nutsack trembles rhythmically, contracting with every other beat of her heart, feeding fresh deluges of spermy goodness into the cum-hungry nun’s seemingly bottomless boob. Winter starts to fall back, but Scylla, looking confused but pleased beyond words, topples forward with her, pinning the still-spurting dick-doggie beneath her sloshing weight."
        );
        this.outputText(
            "\n\nFrom where you’re laying, it looks like nun’s lips sealed tight around the husky’s veiny, pulsing knot, effectively tying her to the still-spurting, canine prick. Both twitch and shake, one party’s balls diminishing as the other’s unholy bust expands above a jizz-swollen belly."
        );
        this.outputText(
            "\n\n<i>“Oh gosh! Mercy above!”</i> Scylla cries with each tit-expanding spurt, folding her hands into a prayer, her elbows resting upon the sloshing, tainted mounds. Her horns are receding, perhaps in response to receiving a feeding, perhaps reacting to her invocation of the divine. In either case, she begins praying, sometimes interrupted by her own moans."
        );
        this.outputText(
            "\n\nA look of sublime relief spreads across Winter’s face with each every audible squirt. In time, she releases her jiggling breasts from her self-imposed torment, mouthing, <i>“Thank you.”</i>"
        );
        // [Next]
        this.player.orgasm();
        this.dynStats("lib", 0.5, "sen", -1);
        this.doNext(this.scyllaFurryFoursomePartDues);
    }

    // Could totally wake to an interstitial scene with other shit happening if I get time/energy.
    private scyllaFurryFoursomePartDues(): void {
        this.clearOutput();
        this.scyllaSprite();
        this.outputText(
            "A strong hand slaps down on your chest, rousing you from slumber. <i>“Whaa...?”</i>"
        );
        this.outputText(
            "\n\n<i>“Wake up, Champion,”</i> Winter commands with an authority that seems entirely out of place after seeing her moaning and begging. <i>“Scylla’s sleeping off her feeding, but she wanted us to get you up - something about having to guard a door or something.”</i>"
        );
        this.outputText(
            "\n\nYou nod and stagger up, donning your armor as you do. Snow is around a corner, trying to get dressed over fur stiffened by dried cum. It’s not going well, and when she sees you looking, she blushes crimson enough to see through her white coat. <i>“Uhm... sorry about that.”</i> She clutches at her tail nervously. <i>“I get a little wild when I’m... uh... horny.”</i> Her blush deepens, and she spins around giving you a view of a tiny, three-inch dick between her legs as she does."
        );
        this.outputText(
            "\n\nYou accept her apology and thank Winter for the warning.{ On your way past Snow, you give the mouse-girl’s dick a squeeze beneath her skirt. She whimpers and nearly faints by the time you release her, the beginnings of a gigantic erection diverting nearly all of her blood southward}. <i>“Later girls!”</i>"
        );
        this.outputText(
            "\n\nThe door clicks closed behind you, and your groin has a wonderful, tingling kind of warmth in it. Maybe you’ll catch them for another three-way feeding soon."
        );
        if (this.player.cumMultiplier < 19990) this.player.cumMultiplier += 1 + Scylla.rand(5);
        if (this.player.balls > 0 && this.player.ballSize < 30) this.player.ballSize++;
        this.flags[kFLAGS.SCYLLA_FURRY_FOURSOME_COUNT]++;
        this.doNext(this.camp.returnToCampUseOneHour);
    }
}
