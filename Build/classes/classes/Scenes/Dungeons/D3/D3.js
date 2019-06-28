define(["require", "exports", "../../../BaseContent", "./JeanClaudeScenes", "./DopplegangerScenes", "./IncubusMechanicScenes", "./LivingStatueScenes", "./SuccubusGardenerScenes", "./HermCentaurScenes", "../../../room", "../../../GlobalFlags/kFLAGS", "../../../../console", "./SuccubusGardener", "./DriderIncubusScenes", "./MinotaurKingScenes", "./LethiceScenes"], function (require, exports, BaseContent_1, JeanClaudeScenes_1, DopplegangerScenes_1, IncubusMechanicScenes_1, LivingStatueScenes_1, SuccubusGardenerScenes_1, HermCentaurScenes_1, room_1, kFLAGS_1, console_1, SuccubusGardener_1, DriderIncubusScenes_1, MinotaurKingScenes_1, LethiceScenes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * ...
     * @author Gedan
     */
    class D3 extends BaseContent_1.BaseContent {
        constructor() {
            super();
            this.rooms = {};
            this._currentRoom = ''; // I don't think we'll need to save/load this, as we're not gonna allow saving in the dungeon, and it'll be overwritten by calling enterD3();
            this.jeanClaude = new JeanClaudeScenes_1.JeanClaudeScenes();
            this.doppleganger = new DopplegangerScenes_1.DopplegangerScenes();
            this.incubusMechanic = new IncubusMechanicScenes_1.IncubusMechanicScenes();
            this.livingStatue = new LivingStatueScenes_1.LivingStatueScenes();
            this.succubusGardener = new SuccubusGardenerScenes_1.SuccubusGardenerScenes();
            this.hermCentaur = new HermCentaurScenes_1.HermCentaurScenes();
            this.driderIncubus = new DriderIncubusScenes_1.DriderIncubusScenes();
            this.minotaurKing = new MinotaurKingScenes_1.MinotaurKingScenes();
            this.lethice = new LethiceScenes_1.LethiceScenes();
            this.BLACK = 1 << 0;
            this.BLUE = 1 << 1;
            this.WHITE = 1 << 2;
            this.PINK = 1 << 3;
            this.BROWN = 1 << 4;
            this.PURPLE = 1 << 5;
            this.configureRooms();
        }
        configureRooms() {
            var tRoom;
            // Entrance
            tRoom = new room_1.room();
            tRoom.RoomName = "entrance";
            tRoom.EastExit = "tunnel1";
            tRoom.RoomFunction = this.entranceRoomFunc;
            this.rooms[tRoom.RoomName] = tRoom;
            // Tunnel 1
            tRoom = new room_1.room();
            tRoom.RoomName = "tunnel1";
            tRoom.NorthExit = "antechamber";
            tRoom.WestExit = "entrance";
            tRoom.RoomFunction = this.tunnel1RoomFunc;
            this.rooms[tRoom.RoomName] = tRoom;
            // Antechamber
            tRoom = new room_1.room();
            tRoom.RoomName = "antechamber";
            tRoom.NorthExit = "magpiehalls";
            tRoom.EastExit = "roomofmirrors";
            tRoom.SouthExit = "tunnel1";
            tRoom.RoomFunction = this.antechamberRoomFunc;
            this.rooms[tRoom.RoomName] = tRoom;
            // Room of Mirrors
            tRoom = new room_1.room();
            tRoom.RoomName = "roomofmirrors";
            tRoom.WestExit = "antechamber";
            tRoom.RoomFunction = this.roomofmirrorsRoomFunc;
            this.rooms[tRoom.RoomName] = tRoom;
            // Magpie Hall S
            tRoom = new room_1.room();
            tRoom.RoomName = "magpiehalls";
            tRoom.NorthExit = "tunnel2";
            tRoom.SouthExit = "antechamber";
            tRoom.RoomFunction = this.magpiehallsRoomFunc;
            this.rooms[tRoom.RoomName] = tRoom;
            // Magpie Hall N
            tRoom = new room_1.room();
            tRoom.RoomName = "magpiehalln";
            tRoom.NorthExit = "tunnel2";
            tRoom.SouthExit = "antechamber";
            tRoom.RoomFunction = this.magpiehallnRoomFunc;
            this.rooms[tRoom.RoomName] = tRoom;
            // Tunnel 2
            tRoom = new room_1.room();
            tRoom.RoomName = "tunnel2";
            tRoom.EastExit = "edgeofkeep";
            tRoom.SouthExit = "magpiehalln";
            tRoom.RoomFunction = this.tunnel2RoomFunc;
            this.rooms[tRoom.RoomName] = tRoom;
            // Edge of Keep
            tRoom = new room_1.room();
            tRoom.RoomName = "edgeofkeep";
            tRoom.NorthExit = "northentry";
            tRoom.WestExit = "tunnel2";
            tRoom.RoomFunction = this.edgeofkeepRoomFunc;
            this.rooms[tRoom.RoomName] = tRoom;
            // North Entry
            tRoom = new room_1.room();
            tRoom.RoomName = "northentry";
            tRoom.NorthExit = "southcourtyard";
            tRoom.SouthExit = "edgeofkeep";
            tRoom.RoomFunction = this.northentryRoomFunc;
            this.rooms[tRoom.RoomName] = tRoom;
            // South Courtyard
            tRoom = new room_1.room();
            tRoom.RoomName = "southcourtyard";
            tRoom.SouthExit = "northentry";
            tRoom.EastExit = "southeastcourtyard";
            tRoom.WestExit = "southwestcourtyard";
            tRoom.RoomFunction = this.southcourtyardRoomFunc;
            this.rooms[tRoom.RoomName] = tRoom;
            // South West Courtyard
            tRoom = new room_1.room();
            tRoom.RoomName = "southwestcourtyard";
            tRoom.EastExit = "southcourtyard";
            tRoom.NorthExit = "southwestwalk";
            tRoom.RoomFunction = this.southwestcourtyardRoomFunc;
            this.rooms[tRoom.RoomName] = tRoom;
            // South West Walk
            tRoom = new room_1.room();
            tRoom.RoomName = "southwestwalk";
            tRoom.NorthExit = "westwalk";
            tRoom.SouthExit = "southwestcourtyard";
            tRoom.RoomFunction = this.southwestwalkRoomFunc;
            this.rooms[tRoom.RoomName] = tRoom;
            // West Walk
            tRoom = new room_1.room();
            tRoom.RoomName = "westwalk";
            tRoom.NorthExit = "northwestwalk";
            tRoom.EastExit = "courtyardsquare";
            tRoom.SouthExit = "southwestwalk";
            tRoom.RoomFunction = this.westwalkRoomFunc;
            this.rooms[tRoom.RoomName] = tRoom;
            // North West Walk
            tRoom = new room_1.room();
            tRoom.RoomName = "northwestwalk";
            tRoom.NorthExit = "northwestcourtyard";
            tRoom.SouthExit = "westwalk";
            tRoom.RoomFunction = this.northwestwalkRoomFunc;
            this.rooms[tRoom.RoomName] = tRoom;
            // North West Courtyard
            tRoom = new room_1.room();
            tRoom.RoomName = "northwestcourtyard";
            tRoom.EastExit = "northcourtyard";
            tRoom.SouthExit = "northwestwalk";
            tRoom.RoomFunction = this.northwestcourtyardRoomFunc;
            this.rooms[tRoom.RoomName] = tRoom;
            // North Courtyard
            tRoom = new room_1.room();
            tRoom.RoomName = "northcourtyard";
            tRoom.EastExit = "northeastcourtyard";
            tRoom.WestExit = "northwestcourtyard";
            tRoom.NorthExit = "throneroom";
            tRoom.RoomFunction = this.northcourtyardRoomFunc;
            this.rooms[tRoom.RoomName] = tRoom;
            tRoom = new room_1.room();
            tRoom.RoomName = "throneroom";
            tRoom.SouthExit = "northcourtyard";
            tRoom.RoomFunction = this.throneRoom;
            this.rooms[tRoom.RoomName] = tRoom;
            // North East Courtyard
            tRoom = new room_1.room();
            tRoom.RoomName = "northeastcourtyard";
            tRoom.SouthExit = "northeastwalk";
            tRoom.WestExit = "northcourtyard";
            tRoom.RoomFunction = this.northeastcourtyardRoomFunc;
            this.rooms[tRoom.RoomName] = tRoom;
            // North East Walk
            tRoom = new room_1.room();
            tRoom.RoomName = "northeastwalk";
            tRoom.NorthExit = "northeastcourtyard";
            tRoom.SouthExit = "eastwalk";
            tRoom.RoomFunction = this.northeastwalkRoomFunc;
            this.rooms[tRoom.RoomName] = tRoom;
            // East Walk
            tRoom = new room_1.room();
            tRoom.RoomName = "eastwalk";
            tRoom.NorthExit = "northeastwalk";
            tRoom.SouthExit = "southeastwalk";
            tRoom.WestExit = "courtyardsquare";
            tRoom.RoomFunction = this.eastwalkRoomFunc;
            this.rooms[tRoom.RoomName] = tRoom;
            // South East Walk
            tRoom = new room_1.room();
            tRoom.RoomName = "southeastwalk";
            tRoom.NorthExit = "eastwalk";
            tRoom.SouthExit = "southeastcourtyard";
            tRoom.RoomFunction = this.southeastwalkRoomFunc;
            this.rooms[tRoom.RoomName] = tRoom;
            // South East Courtyard
            tRoom = new room_1.room();
            tRoom.RoomName = "southeastcourtyard";
            tRoom.NorthExit = "southeastwalk";
            tRoom.SouthExit = "greatlift";
            tRoom.WestExit = "southcourtyard";
            tRoom.RoomFunction = this.southeastcourtyardRoomFunc;
            this.rooms[tRoom.RoomName] = tRoom;
            // Courtyard Square
            tRoom = new room_1.room();
            tRoom.RoomName = "courtyardsquare";
            tRoom.EastExit = "eastwalk";
            tRoom.WestExit = "westwalk";
            tRoom.RoomFunction = this.courtyardsquareRoomFunc;
            this.rooms[tRoom.RoomName] = tRoom;
            // Great Lift
            tRoom = new room_1.room();
            tRoom.RoomName = "greatlift";
            tRoom.NorthExit = "southeastcourtyard";
            tRoom.RoomFunction = this.greatliftRoomFunc;
            this.rooms[tRoom.RoomName] = tRoom;
        }
        // Entrance/Exit
        discoverD3() {
            if (this.flags[kFLAGS_1.kFLAGS.D3_DISCOVERED] == 0 && this.player.hasKeyItem("Zetaz's Map") >= 0 && this.player.level >= 10 && D3.rand(5) == 0) {
                this.flags[kFLAGS_1.kFLAGS.D3_DISCOVERED] = 1;
                this.clearOutput();
                this.outputText("During your exploration, you come across a familiar looking patch of ground. In fact... you pull out Zetaz’s map, your eyes widening as they realize what you’ve just found: Lethice’s Keep. You follow a concealed trail past several harpy nests directly to an almost invisible cave entrance. You never would’ve found it without the map.");
                this.outputText("\n\n<b>You’ve discovered a hidden entrance to Lethice’s lair. It can be accessed from the Dungeons submenu in the future.</b>");
                this.outputText("\n\nDo you step inside, or wait until you’re better prepared?");
                this.menu();
                this.addButton(0, "Enter", this.enterD3);
                this.addButton(1, "Leave", this.camp.returnToCampUseOneHour);
                return true;
            }
            return false;
        }
        enterD3() {
            this.inRoomedDungeon = true;
            this.inRoomedDungeonResume = this.resumeFromFight;
            this.move("entrance");
        }
        exitD3() {
            this.inRoomedDungeon = false;
            this.inRoomedDungeonResume = undefined;
            this.camp.returnToCampUseOneHour();
        }
        resumeFromFight() {
            this.move(this._currentRoom);
        }
        generateRoomMenu(tRoom) {
            if (tRoom.NorthExit != undefined && tRoom.NorthExit.length > 0) {
                if (tRoom.NorthExitCondition == undefined || tRoom.NorthExitCondition()) {
                    this.addButton(0, "North", this.move, tRoom.NorthExit);
                }
            }
            if (tRoom.EastExit != undefined && tRoom.EastExit.length > 0) {
                if (tRoom.EastExitCondition == undefined || tRoom.EastExitCondition()) {
                    this.addButton(1, "East", this.move, tRoom.EastExit);
                }
            }
            if (tRoom.SouthExit != undefined && tRoom.SouthExit.length > 0) {
                if (tRoom.SouthExitCondition == undefined || tRoom.SouthExitCondition()) {
                    this.addButton(6, "South", this.move, tRoom.SouthExit);
                }
            }
            if (tRoom.WestExit != undefined && tRoom.WestExit.length > 0) {
                if (tRoom.WestExitCondition == undefined || tRoom.WestExitCondition()) {
                    this.addButton(5, "West", this.move, tRoom.WestExit);
                }
            }
            if (tRoom.RoomName == "entrance") {
                this.addButton(5, "Exit", this.exitD3);
            }
            this.addButton(8, "Items", this.inventory.inventoryMenu);
            this.addButton(9, "Masturbate", this.getGame().masturbation.masturbateGo);
        }
        move(roomName) {
            console_1.trace("Entering room", roomName);
            this.clearOutput();
            if (this.rooms[roomName] == undefined) {
                this.clearOutput();
                this.outputText("Error: Couldn't find the room indexed as: " + roomName);
                this.menu();
                return;
            }
            var tRoom = this.rooms[roomName];
            if (tRoom.RoomFunction == undefined) {
                this.outputText("Error: Room entry function for room indexed as '" + roomName + "' was not set.");
                return;
            }
            this.menu();
            if (!tRoom.RoomFunction()) {
                this.generateRoomMenu(tRoom);
            }
            this._currentRoom = roomName;
        }
        entranceRoomFunc() {
            this.outputText("The inside of this cave is damp and dark, but it bears signs of frequent use. The map you got from Zetaz matches the curves of this winding passage exactly. There can be no doubt that this is the place, even though his map ends a short distance into the tunnel. Either he knew it would be a linear path or was so familiar with the territory that he didn’t think it was worth writing down. You can go east, deeper into the mountain towards Lethice’s fortress, or leave to the west.");
            return false;
        }
        tunnel1RoomFunc() {
            this.outputText("Winding back and forth, the tunnel gradually arcs west and north from here, sloping steeply upward in the latter direction. The upward sloping side must lead to Lethice’s fortress, supposedly at the top of the mountain. You’ll have to be careful down here. You doubt that such an entrance would be completely unguarded. As a matter of fact... you think you can see signs of worked stone to the north. You’re getting close to something.");
            return false;
        }
        antechamberRoomFunc() {
            this.outputText("You are standing in a large, gloomy lobby, lit by the drear yellow pulse of gas lamps. The walls, floor and distant ceiling are uniformly built from a dark, aged stone which serves to make the vault-like space shadowy and oppressive, despite its size. The floor has been polished a dull bronze by years of use and the distant sound of activity permeates the air; it has the atmosphere of a place which is thronged with people during rush hour but is for now as deserted as a school corridor during class hours. Something to be grateful for perhaps, but you should get a move on.");
            this.outputText("\n\nAhead is a large archway. Through it you can see some sort of dark screen set into a wall. On the right is a much smaller metal door, which looks like it might be a storage room.");
            return false;
        }
        roomofmirrorsRoomFunc() {
            this.outputText("The metal door opens soundlessly onto a fairly large, unlit room, shabby and grey with disuse. It is cluttered with a great quantity of mirrors. Round hand mirrors are stacked on shelves, square wall mirrors are leant against walls, a large,");
            if (this.flags[kFLAGS_1.kFLAGS.D3_MIRRORS_SHATTERED] == 1)
                this.outputText(" now shattered,");
            this.outputText(" ornate standing mirror dominates the center of the room, and a number of broken, jagged specimens are stacked near the back. They reflect the dull trappings of this place back at you emptily. You guess as self-centred a race as the demons probably has quite a large use for these.");
            if (this.player.hasKeyItem("Laybans") >= 0) {
                this.outputText("\n\nThe place feels hollow and creepy, even after the ad hoc exorcism you performed here. There is no reason to linger.");
            }
            else {
                this.outputText("\n\nNear the back, next to the broken stack is a white stand, displaying what appear to be a number of dark shades.");
                if (this.flags[kFLAGS_1.kFLAGS.D3_ENTERED_MAGPIEHALL] == 1)
                    this.outputText("  Your spirits rise. They look like they may very well be made of the same material as the screen in the basilisk hall.");
                if (this.player.inte >= 70 || this.player.sens >= 70)
                    this.outputText("  Disquiet edges down your spine. Something about this place doesn’t feel right. The room seems faded at the corners, as if it’s not quite there.");
                this.addButton(2, "Glasses", this.doppleganger.getDemGlasses);
            }
            return false;
        }
        magpiehallsRoomFunc() {
            if (this.flags[kFLAGS_1.kFLAGS.D3_JEAN_CLAUDE_DEFEATED] == 0) {
                if (this.flags[kFLAGS_1.kFLAGS.D3_ENTERED_MAGPIEHALL] == 0) {
                    this.flags[kFLAGS_1.kFLAGS.D3_ENTERED_MAGPIEHALL] = 1;
                    this.outputText("You creep through the archway. The sound of movement and bustle is closer here; it seems to be coming from directly below you. Ahead is the screen, a large window made from tinted glass. Cautiously you peer through it. You have entered a vast hall, near the very top of it; this seems to be some sort of observation booth set high in the stone wall. It’s designed in the grand, classical tradition, fluted balustrades flanking the walls, each decorated at the top by a carved magpie in flight. Below is - well. You blink, trying to take it all in.");
                    this.outputText("\n\nMany feet below the hall swarms with activity: tall, thin, grey-green reptiles sliding sinuously around each other and the long tables that run the length of the room. There must be hundreds, no, at least a thousand basilisks down there, carrying, analyzing, sorting the vast amount of junk the tables are heaped with.");
                    if (this.flags[kFLAGS_1.kFLAGS.BENOIT_AFFECTION] == 100)
                        this.outputText("  This can only be the hall that " + this.getGame().bazaar.benoit.benoitMF("Benoit", "Benoite") + " once worked in.");
                    this.outputText("  You get the fright of your life when you think you see a number of depthless pools of grey revolve up to meet yours- but they don’t freeze you, you note as you reflexively turn away. The tinted glass must carry some sort of anti-petrifying charm, and further it must be reflective on the other side, because no one below seems to realize you’re standing there. Relaxing a bit, you continue to absorb the massive room. At the end furthest away from you two huge piles have been created- one of eggs, a massed assortment of every color and size imaginable, and one of pure junk, presumably everything the basilisks have found whilst scavenging and considered worth keeping. The detritus of a dozen collapsed civilizations must be down there, collected for the demons’ perusal by their scaly custodians. Directly below you, you can see archways like the one you just passed under, through which the basilisks ebb and flow.");
                    this.outputText("\n\nYour heartbeat quickens as you consider. There is a grid gantry running from where you are right around the room to the other side, where you can see a matching observation booth, presumably containing another exit. But it’s quite a distance, there are stairs leading down to the ground level, and outside the protective glass you would surely be spotted and apprehended");
                    if (this.player.canFly())
                        this.outputText(", even if you tried to fly it");
                    this.outputText(". Wouldn’t you? You can’t outrun the gaze of a thousand basilisks... could you?");
                    if (this.player.hasKeyItem("Laybans") >= 0)
                        this.outputText("  You take the Laybans out of your pouch and hold them up against the glass. It’s exactly as you hoped - they are made of the same material, and are almost certainly what the demons wear when they themselves interact with the basilisks. They would surely help you get across the hall, if you were crazy enough to try.");
                }
                else {
                    this.outputText("Again you creep up to the tinted glass, again you take in the vast hall with the army of basilisks below hard at work, and again you stare out at the metal gantry, with the exit tantalizingly visible on the other side.");
                    if (this.player.hasKeyItem("Laybans") < 0)
                        this.outputText("  Are you going to try this?");
                    else
                        this.outputText("  You take the Laybans out of your pocket, turning them around in your hands as you consider. Are you going to try this?");
                }
                this.menu();
                this.addButton(0, "Go!", this.jeanClaude.gogoFuckTheseBasilisks);
                this.addButton(1, "Fall Back", this.fallbackFromMagpieHallS);
                return true;
            }
            this.outputText("You are back in the southern end of the Magpie Hall.  Without the bustle of activity below it is a gapingly empty and quiet place, the only sound the murmur of activity from elsewhere. There is a vast amount of collected junk below but it would take, well, an army of basilisks to sort through it to find anything worthwhile. You could check out the massive pile of eggs, though.");
            if (this.eggsAvailable() > 0) {
                this.addButton(2, "Eggs", this.goToEggPile);
            }
            return false;
        }
        eggsAvailable() {
            var flagNum = this.flags[kFLAGS_1.kFLAGS.D3_EGGS_AVAILABLE];
            var eggs = 0;
            if (!(flagNum & this.BLACK))
                eggs++;
            if (!(flagNum & this.BLUE))
                eggs++;
            if (!(flagNum & this.WHITE))
                eggs++;
            if (!(flagNum & this.PINK))
                eggs++;
            if (!(flagNum & this.BROWN))
                eggs++;
            if (!(flagNum & this.PURPLE))
                eggs++;
            return eggs;
        }
        goToEggPile() {
            this.clearOutput();
            this.outputText("You head down the stairs into the hall proper to inspect the ramble hoard of eggs the basilisks collected. They’re mostly unfertilised harpy ovum, but you quickly pick out a number of differently coloured transformative eggs stolen from Gods know who.");
            this.menu();
            var flagNum = this.flags[kFLAGS_1.kFLAGS.D3_EGGS_AVAILABLE];
            if (!(flagNum & this.BLACK))
                this.addButton(0, "Black", this.takeEgg, this.BLACK);
            if (!(flagNum & this.BLUE))
                this.addButton(1, "Blue", this.takeEgg, this.BLUE);
            if (!(flagNum & this.WHITE))
                this.addButton(2, "White", this.takeEgg, this.WHITE);
            if (!(flagNum & this.PINK))
                this.addButton(3, "Pink", this.takeEgg, this.PINK);
            if (!(flagNum & this.BROWN))
                this.addButton(4, "Brown", this.takeEgg, this.BROWN);
            if (!(flagNum & this.PURPLE))
                this.addButton(5, "Purple", this.takeEgg, this.PURPLE);
            this.addButton(9, "Back", this.resumeFromFight);
        }
        takeEgg(eggMask) {
            var item;
            if (eggMask == this.BLACK)
                item = this.consumables.L_BLKEG;
            if (eggMask == this.BLUE)
                item = this.consumables.L_BLUEG;
            if (eggMask == this.WHITE)
                item = this.consumables.L_WHTEG;
            if (eggMask == this.PINK)
                item = this.consumables.L_PNKEG;
            if (eggMask == this.BROWN)
                item = this.consumables.L_BRNEG;
            if (eggMask == this.PURPLE)
                item = this.consumables.L_PRPEG;
            //menuLoc = 9999;
            // Should actually be handled by the fallthrough of doNext(1) in the takeItem shit
            this.clearOutput();
            this.outputText("You pluck out " + item.longName + " ");
            this.flags[kFLAGS_1.kFLAGS.D3_EGGS_AVAILABLE] += eggMask;
            this.inventory.takeItem(item, this.playerMenu); //playerMenu is equivalent to doNext(1)
        }
        fallbackFromMagpieHallS() {
            this.clearOutput();
            this.outputText("No, there has to be a better way.");
            if (this.player.hasKeyItem("Laybans") < 0 && this.player.inte >= 50)
                this.outputText("  Surely the demons themselves are not immune to the basilisks’ glares - the darkened screen is proof of that. How do they interact with the creatures, then? Maybe if you keep poking around, you might find an answer.");
            this.outputText("\n\nYou head back through the archway into the gloomy antechamber.");
            this.menu();
            this.addButton(1, "Next", this.move, "antechamber");
        }
        magpiehallnRoomFunc() {
            if (this.flags[kFLAGS_1.kFLAGS.D3_JEAN_CLAUDE_DEFEATED] == 0) {
                this.outputText("You find yourself back in the small booth, with the locked door leading out into the Magpie Hall. Just like the one on the opposite side, there is a darkened screen here through which you can see hundreds of basilisks milling down below, sorting through the vast amount of junk and eggs they have collected from the mountainside. They don’t seem to have taken any extra precautions following your narrow escape of them- the gantry remains free of any guards, and the door on the other side looks open.");
                this.menu();
                this.addButton(0, "Go!", this.jeanClaude.gogoFuckTheseBasilisksNorth);
                this.addButton(1, "Stronghold", this.move, "tunnel2");
                return true;
            }
            this.outputText("You are back in the northern end of the Magpie Hall. Without the bustle of activity below it is a gapingly empty and quiet place, the only sound the murmur of activity from elsewhere. There is a vast amount of collected junk below but it would take, well, an army of basilisks to sort through it to find anything worthwhile. You could check out the massive pile of eggs, though.");
            if (this.eggsAvailable() > 0) {
                this.addButton(2, "Eggs", this.goToEggPile);
            }
            return false;
        }
        tunnel2RoomFunc() {
            this.outputText("Light trickles in from the east. After all the trekking through these subterranean holes, you’ve got to be close to the mountain’s summit. You know that down the steeply sloped passage will take you back through the basilisks’ chamber if you want to leave the way you came, but a second trip through that crowded hall might be ill-advised. It’d be best to move forward into the sun.");
            return false;
        }
        edgeofkeepRoomFunc() {
            this.outputText("Standing on the edge of the mountain's summit, you can see Mareth for miles in all direction. It's fairly disconcerting to focus on long with the constant shifting and twisting of the wasted areas, but here and there you can pick out islands of stability in the ephemeral terrain. You blink your eyes to clear the nauseating landscape from your view and turn back to the way ahead. Lethice's fortress lies a short distance to the north, its walls tall and stout. The gates themselves hang open. Likely she didn't expect anyone to make it this far.");
            return false;
        }
        northentryRoomFunc() {
            this.outputText("You now stand in the archway that is the southern entrance to Lethice's headquarters. The place is built like a castle. You can't see too much from your shaded position, but the bricks that surround you are individual as big as horses. The gates themselves are crafted of wood that looks at least a century old, reinforced with bands of gleaming metal that you doubt will ever rust. A barren cliffside can be seen to the south, the demon queen's lair to the north.");
            return false;
        }
        southcourtyardRoomFunc() {
            this.outputText("Lethice's courtyard is surprisingly well-groomed for a place that's supposedly home to neverending debauchery and depravity. The paths are laid with interconnecting sandstone bricks that reflect the sun to give the place a gentle, amber glow, and lush, green grass lines the sides along with well-trimmed hedges. You could almost mistake this place for a churchyard if it wasn't for the faint sound of moans on the wind. The courtyard paths lead away east and west, while the gateway out hangs open to the south.");
            return false;
        }
        southwestcourtyardRoomFunc() {
            this.outputText("Some of the nearby bushes are blooming, filling the air with their sweet scent, unlike any flowers you’ve encounter before. Their petals are a multitude of colors, and their scents, though laced with corruption, are as sweet and pleasant as anything you've had the pleasure of smelling. The path you're treading upon curves north and east from here along the thick, red walls. Vines seem to crowd the way to the north. There are no signs of any ramps or ladders to get to the battlements, but there is a doorway to the west marked as 'Forge Wing'. A notice declares it closed for repairs.");
            return false;
        }
        southwestwalkRoomFunc() {
            this.outputText("The bushes surrounding the path have given way here to a mass of tentacles, some still bedecked in the flowers that surround the air. They twist and writhe but seem content to stay in their place for now. Besides, if you hang back along the edge of the walk, you should be out of their reach. The path heads north and south... if the wall of oily-looking tendrils leaves you alone.");
            if (this.flags[kFLAGS_1.kFLAGS.D3_GARDENER_DEFEATED] == 0) {
                this.outputText("\n\nThe slick foilage parts just ahead, revealing a lissom leg clad in green hosiery that resembles the spiderwork patterns of leafy veins more than any garment. Its owner follows but a moment later, so perfectly, wonderfully shapely that you freeze in place, compelled by biology to take notice. Her expansive bosom, womanly hips, and gentle, soft curves invite you to fall into her embrace. Her lips, full and pouting, beckon for you to taste them. Her hair's lustrous shine glitters like an angler fish's lure, just out of reach and oh so foolish to pursue. The smooth, twists of her ram-like horns keep her coiffure stylish while simultaneously jolting you out of your reverie.");
                this.outputText("\n\nYou shake your head to regain your focus. This is a demon, and you won't fall for her tricks this easily");
                if (this.player.lust <= 75) // I'm not sure what this variation was supposed to point at specifically.
                 {
                    this.outputText("!");
                }
                else {
                    this.outputText(".... You grope yourself absentmindedly as you consider just how long you'll hold out before submitting. It won't be long.");
                }
                this.outputText("\n\n<i>\"Why hello there,\"</i> the corrupt temptress says with a tone that's the auditory equivalent to a pat on the head. <i>\"You must be [name]. Did you come all this way just to join my garden?\"</i> The corner of the succubus' mouth curls ever so slightly, her lips gleaming invitingly. <i>\"Or perhaps you could be my first non-floral pet. Would you like that?\"</i> She arches her back to present her breasts to you, held aloft by their own incredible, perfect shape and framed by a skimpy underbust covering that only serves to highlight her hard, perky nipples. They gleam with moisture - milk you suppose.");
                this.outputText("\n\nShe smiles encouragingly. <i>\"What'll it be?\"</i>");
                //[Surrender] [Fight]
                this.menu();
                this.addButton(0, "Fight", this.startCombatImmediate, new SuccubusGardener_1.SuccubusGardener());
                this.addButton(1, "Surrender", this.succubusGardener.surrenderToTheGardener);
                return true;
            }
            return false;
        }
        westwalkRoomFunc() {
            this.outputText("Pollen clings to you, released by the many flowering bushes in the area. They only grow thicker to the south, too. To the east, you can");
            if (this.flags[kFLAGS_1.kFLAGS.D3_STATUE_DEFEATED] == 0)
                this.outputText(" see a massive statue with an immense hammer");
            else
                this.outputText(" a mound of rubble, the scattered remains of the animated statue that you slew");
            this.outputText(". The warm, sandstone bricks underfoot fork in a T-intersection, leading north, east, and south. The thick castle walls prevent passage to the west.");
            return false;
        }
        northwestwalkRoomFunc() {
            this.outputText("A narrow path splits from the sandstone thoroughfare towards a pair of double doors to the west. The craftsmanship of the carpenter who made them is on full display; intricate designs of dragons engaged in sexual positions of all kinds are carved around the outer edges of the frame while more mundane, eye-pleasing patterns decorate the center panels. Above, a sign designates this area as the library. Unfortunately the doors are sealed closed. Perhaps the library is not yet written. You smirk at your own joke.");
            this.outputText("\n\nThe courtyard itself continues much as it has elsewhere. The bushes to the south appear more unruly than elsewhere, but to the north there appears to be nothing but pleasant walking through this botanical paradise.");
            return false;
        }
        northwestcourtyardRoomFunc() {
            this.outputText("The courtyard comes to an abrupt end here, hemmed in by a impressively high stone wall to the north, high enough to shame the walls in the other cardinal directions. The path is also bounded in by stonework to the west, forcing it to curve to the east and south around a bush that has been tastelessly shaped to resemble a turgid prick. The demons even went so far as to trim ivory flowers into a contiguous path along one side, very much looking like a stream of arboreal spunk.");
            return false;
        }
        northcourtyardRoomFunc() {
            this.outputText("You stand before what can only be the entrance to Lethice’s throne room. It is unlabelled, but the immense door is unlike any you’ve seen in this world or the last. Constructed from some kind of pink-tinged metal and polished to a mirror sheen, this portal has had a lifetime of care poured into it. What’s more, intricate locking mechanisms overlap the edges of it, each one culminating in an intricately worked seal. Fortunately, each of the seals has been left over. Security must not be much of a concern for the demon queen at this point in time. If only the door would open. For some reason, it’s still sealed closed. You can still move east and west through the courtyard, if you like.");
            return false;
        }
        northeastcourtyardRoomFunc() {
            this.outputText("This particular corner of the courtyard feels remarkably cramped, even a little claustrophobic. To the north, a stone wall rises, dwarfing the smaller one to the east, and to make matters worse, the hedges to the southwest are high and square, virtually a wall in their own right. The only avenues of travel available are to the south or west, following the red sandstone bricks as they bend around the corner.");
            if (this.flags[kFLAGS_1.kFLAGS.D3_CENTAUR_DEFEATED] == 0) {
                this.hermCentaur.encounterThePony();
                return true;
            }
            return false;
        }
        northeastwalkRoomFunc() {
            this.outputText("The air is pleasant and free here. Not even the corrupt nature of this place can stop you from enjoying this moment in the demon queen’s garden. Still, there is an aura of lingering danger here. The flowers smell pleasant but somehow off, and every now and again the breezes carry the sounds of whorish moans. An entryway in the east wall leads towards the barracks and mess, identified by a simple sign to the left of the imposing iron door frame. Fortunately, the door is barred and sealed. It seems you’ve come at a time when Lethice’s fortress is near empy. How fortunate for you.");
            return false;
        }
        eastwalkRoomFunc() {
            this.outputText("The smooth, almost flawlessly laid stones split into a T-intersection here, heading north, south, and west. The bushes that hem in the paths are likewise split, though they have been maintained with the same sense of care you’ve seen elsewhere in the garden. One particularly interesting shrub has been trimmed into the shape of a large bust, complete with erect nipples. You shake your head and glance west, where you can spot");
            if (this.flags[kFLAGS_1.kFLAGS.D3_STATUE_DEFEATED] == 0)
                this.outputText(" a massive statue with an immense hammer.");
            else
                this.outputText(" a mound of rubble, the scattered remains of the animated statue that you slew.");
            return false;
        }
        southeastwalkRoomFunc() {
            this.outputText("Swarms of butterflies congregate on the flowering bushes here. At first, the sight seems beautiful, almost pristine. Then, you spot the endemic corruption that Lethice has spread through the lands. They aren’t just swarms of butterflies - they’re swarms of mating butterflies, crawling all over each other in a swarm of sweet-smelling pollen and fluttering wings. You had best move on. The path leads north and south.");
            return false;
        }
        southeastcourtyardRoomFunc() {
            this.outputText("Walking along the sandstone path, you're treated to a remarkably peaceful view. Up here, above the clouds the ring the mountain, it's almost too easy to let your guard down. A small hole in the southern wall of Lethice's fortress appears to the south. Peeking through, you can see machinery and some kind of lift suspended over the cliffside. That must be how the demons can come and go safely. You can continue to walk among the bushes to the north and west. An iron door to the east bears lettering denoting it as 'recreation'. A small placard explains that it's currently off limits due to renovations. Graffiti below complains about some contractor named Fenoxo delivering on his promised work schedule.");
            return false;
        }
        // 9999 - Check this
        courtyardsquareRoomFunc() {
            //Statue not exploded - mossy - 30’ high
            this.outputText("A circle of polished stone wraps around a colossus here in the center of the courtyard, ringed by cushioned benches that would be a delight to sit on were they not stained with bodily fluids of all colors and sexes. You didn’t think pink cum was possible, but the demons’ endless sexual creativity doesn’t seem to be bound by such notions. You can leave east and west from here.");
            if (this.flags[kFLAGS_1.kFLAGS.D3_STATUE_DEFEATED] == 0) {
                this.outputText("\n\nWait... what’s that?");
                this.menu();
                this.addButton(0, "Next", this.livingStatue.encounter);
                return true;
            }
            this.outputText("Two disembodied, marble feet and a field of rubble are all that remains of the once proud statue that stood in the center of the courtyard. You dealt with the animated monstrosity but can’t help but feel a little shame at the destruction you’ve so openly wrought. Many of the bushes are torn in half by two ton slabs, and the path is scarred in a dozen places by chips and smashed divots. You can go east and west from here, if you move carefully around the more jagged pieces of stone.");
            return false;
        }
        greatliftRoomFunc() {
            this.outputText("Intricate stonework supports this precarious platform as it juts from the side of Lethice's fortress, hanging over a sheer cliff that must go down for hundreds of feet. The harpies appear to have moved away from the area immediately below, whether by choice or by demonic action, though you can still spot a few of their nests in other places on the mountainside. A complicated looking machine sits on the side of the platform, attached to a cage that dangles over the edge, supported by a lowly metal cable. It must be some kind of mechanical lift - a way to come and go as one would please.");
            this.incubusMechanic.meetAtElevator();
            return false;
        }
        throneRoom() {
            if (this.flags[kFLAGS_1.kFLAGS.DRIDERINCUBUS_DEFEATED] == 0) {
                this.driderIncubus.encounterDriderIncbutt();
                return true;
            }
            else if (this.flags[kFLAGS_1.kFLAGS.MINOTAURKING_DEFEATED] == 0) {
                this.minotaurKing.encounterMinotaurKing();
                return true;
            }
            else if (this.flags[kFLAGS_1.kFLAGS.LETHICE_DEFEATED] == 0) {
                this.lethice.encounterLethice();
                return true;
            }
            return false;
        }
    }
    exports.D3 = D3;
});
//# sourceMappingURL=D3.js.map