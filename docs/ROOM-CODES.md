# Room codes

Every `room.code.<n>` in `assets/external_variables_casts.txt` — the same map
the server builds `LOADABLE_ROOMS` from. Use with the staff command
`/goto <code>`.

⚠ GENERATED — do not edit by hand. Regenerate with:

```bash
node tools/list-room-codes.mjs --md
```

**147 codes** — 114 named (the navigator advertises these),
33 unnamed but loadable.
**seats** marks a room whose cast has extracted sit tiles
(`assets/room-seats.json`); it is per-CAST, so codes sharing a cast share the mark.

## Named

| code | name | cast | |
|---:|---|---|---|
| 0 | Skull Rock | `pirates_private` |  |
| 1 | Tiki Tiki Tiki Room | `tiki_private` |  |
| 2 | Central Plaza | `hub2` |  |
| 3 | Town Square | `mainstreet_square` |  |
| 4 | Main Street | `musical_mainstreet` |  |
| 5 | Adventureland Bazaar | `bazaar` |  |
| 6 | Elephant Bathing Pool | `cambodian` |  |
| 7 | Tiki Tiki Tiki Island | `tiki` |  |
| 8 | Forbidden Temple | `indy` |  |
| 9 | Explorer's Tent | `tent` |  |
| 10 | Lost Safari Party | `safari` |  |
| 11 | Jungle Cruise Dock | `dock` |  |
| 12 | Haunted Mansion Conservatory | `haunted_private` |  |
| 13 | Dungeon | `castle_dungeon` |  |
| 14 | Monorail Station | `monorail_station` |  |
| 15 | Monorail Train | `monorail_train` | seats |
| 16 | Shrunken Ned's Shop | `shrunken_neds_shop` |  |
| 17 | Tomorrowland Outerspace | `space_private` |  |
| 30 | Castle Gardens | `castle_moneyshot` |  |
| 31 | Gallery | `castle_entrance` |  |
| 32 | Spell Room | `castle_spellroom` |  |
| 33 | Matterhorn | `matterhorn` |  |
| 34 | Banquet Hall | `castle_banquet` | seats |
| 35 | Castle Forecourt | `castle_courtyard` |  |
| 36 | Pirate Treehouse | `treehouse` |  |
| 37 | Snow White Hide 'n Seek Forest | `snow_white` |  |
| 38 | "it's a small world" Imports | `small_world_shop` |  |
| 39 | Fantasyland in The Sky | `inthesky` |  |
| 40 | Storybookland | `storybookland` |  |
| 41 | VMK Central | `vmk_central` |  |
| 42 | Street Party Music Game Lobby | `musicmix` |  |
| 43 | Emporium | `emporium` |  |
| 44 | Golden Horseshoe Mercantile | `horseshoe_shop` |  |
| 45 | Inner-Space Shop | `galaxy_imports_shop` |  |
| 46 | Discovery Island | `kelloggs_pirate` |  |
| 47 | Tomorrowland Hub | `tomorrowland_hub` | seats |
| 48 | VMK Esplanade | `vmk_esplanade` | seats |
| 49 | Splash Mountain | `splashmountain` | seats |
| 50 | Pirate Prison | `cannon_room` |  |
| 51 | Boot Hill Shooting Gallery | `shooting_private` |  |
| 52 | Jungle Cruise Explorer's Tent | `tent_private` |  |
| 53 | Mad Hatter's Tea Party | `mad_hatter_private` |  |
| 54 | Maleficent's Evil Fortress | `fantasyland_private` |  |
| 55 | Nautilus Submarine Guest Room | `nautilus_private` |  |
| 56 | Space Mountain Guest Room | `spacemountain_private` |  |
| 57 | Steamboat | `steamboat` | seats |
| 58 | Frontierland Hub | `frontierland_hub` | seats |
| 59 | Frontierland Dock | `pier` | seats |
| 60 | Haunted Mansion Stretching Room | `hm_level2_public` |  |
| 61 | Big Thunder Mountain | `thundermountain` |  |
| 62 | Big Thunder Mountain Mine | `cave1` |  |
| 63 | Injun Joe's Cave | `cave2` |  |
| 64 | Tom Sawyer's Island | `tom_sawyer` | seats |
| 65 | Haunted Mansion Ballroom | `hm_level3_public` |  |
| 66 | Haunted Mansion Attic | `hm_level4_public` |  |
| 67 | Splash Mountain Bayou | `splash_private` |  |
| 68 | Mark Twain Steamboat | `steamboat_private` |  |
| 69 | Briar Patch | `brer_rabbits_private` |  |
| 70 | Animal Kingdom Safari Lodge | `animal_private` |  |
| 71 | Expedition Everest | `everest_private` |  |
| 72 | Sci-Fi Dine-In | `drivein` | seats |
| 73 | Space Mountain Quest Deck | `spacemountain` | seats |
| 74 | Autopia Space Race | `speedway` |  |
| 75 | Autopia Off Road on Mars | `mars` |  |
| 76 | Captain's Quest Quarters | `nautilus` | seats |
| 77 | Autopia Quest Track | `autopia` |  |
| 78 | Shipwreck Graveyard | `shipwreck` |  |
| 79 | VMK Baseball Diamond Guest Room | `wws_private` |  |
| 80 | Inner-Space Ray Room | `ray_room` | seats |
| 81 | Inner-Space Shrinking Machine | `shrinking_machine` |  |
| 82 | Nautilus Grotto | `nautilus_grotto` | seats |
| 83 | High School Musical Room | `high_school` |  |
| 84 | Caribbean Town Square Guest Room | `potc2_private` |  |
| 85 | Waterpark Pool | `shark_reef` | seats |
| 86 | Summit Plummet Guest Room | `typhoon_lagoon` |  |
| 87 | Blizzard Beach Private Room | `blizzard_beach` |  |
| 88 | Pirates Treasure room | `treasure_room` | seats |
| 89 | Tron Guest Room | `tron_private` |  |
| 90 | Refreshment Corner Guest Room | `refreshment_private` |  |
| 91 | Football Guest Room | `wws_football_private` |  |
| 93 | Club 33 HOST Room | `club33_private` |  |
| 94 | Castle Suite Guest Room | `dreams_suite_private` |  |
| 95 | New Orleans Square | `new_orleans_square` | seats |
| 96 | VMK Gallery | `disney_gallery` | seats |
| 97 | Blue Bayou | `blue_bayou` |  |
| 98 | Epcot Entrance Guest Room | `epcot_entrance_private` |  |
| 99 | Fantasyland Courtyard | `fantasyland_courtyard` |  |
| 100 | Empty Dark Ride Room | `dark_ride_room` |  |
| 101 | Down the Rabbit Hole | `dark_ride_room` |  |
| 102 | The Golden Afternoon | `dark_ride_room` |  |
| 103 | The Tulgey Woods | `dark_ride_room` |  |
| 104 | The Royal Garden | `dark_ride_room` |  |
| 105 | A Very Merry Unbirthday | `dark_ride_room` |  |
| 106 | The Darling's Nursery | `dark_ride_room` |  |
| 107 | Flying Over London | `dark_ride_room` |  |
| 108 | Welcome to Neverland | `dark_ride_room` |  |
| 109 | Battle on Captain Hook's Ship | `dark_ride_room` |  |
| 110 | Mermaid Lagoon | `dark_ride_room` |  |
| 136 | Empty Dark Ride Room | `dark_ride_room` |  |
| 137 | Winter Wonderland Guest Room | `winter_wonderland` |  |
| 138 | Skull Rock Holiday Edition | `pirates_private` |  |
| 139 | Haunted Mansion Conservatory Holiday Edition | `haunted_private` |  |
| 140 | Penny Arcade | `penny_arcade` |  |
| 141 | Monsters Inc Laugh Floor | `monsters_laugh_floor` |  |
| 1001 | Pirates of the Caribbean Game Lobby | `pirates_game_preshow` |  |
| 1010 | Classics Lobby | `pirates_classic_preshow` |  |
| 1011 | Cave of Wonders | `caveofwonders` |  |
| 1100 | Castle Fireworks Remixed Lobby | `fireworks_preshow` |  |
| 1102 | Jungle Cruise Photo Safari Game | `jungle_cruise` |  |
| 1103 | Street Party Music Game | `musicmix` |  |
| 1104 | Haunted Mansion Lobby | `haunted_mansion_lobby` |  |
| 1107 | Monorail Music Mixer Game | `musicmix` |  |
| 1108 | Main Street Magic Shop | `vmk_magic_shop` |  |
| 1109 | Magic Shop Checkers Room | `vmk_checkers` | seats |

## Unnamed (no `room.<n>.name` text; show as "Room <code>")

| code | cast | |
|---:|---|---|
| 111 | `vmks_ghoststory_town` |  |
| 112 | `vmks_ghoststory_hm_exterior` |  |
| 113 | `vmks_fantasy_castle_exterior` |  |
| 114 | `vmks_fantasy_forest` |  |
| 115 | `vmks_fantasy_scaryforest` |  |
| 116 | `vmks_fantasy_enchantedforest` |  |
| 117 | `vmks_fantasy_mountain3` |  |
| 118 | `vmks_fantasy_mountain4` |  |
| 119 | `vmks_fantasy_mountain5` |  |
| 120 | `vmks_fantasy_mountain6` |  |
| 121 | `vmks_fantasy_m_forest2` |  |
| 122 | `vmks_fantasy_m_forest3` |  |
| 123 | `vmks_fantasy_cave1` |  |
| 124 | `vmks_fantasy_cave2` |  |
| 125 | `vmks_fantasy_cave3` |  |
| 126 | `vmks_fantasy_cave5` |  |
| 127 | `vmks_fantasy_farm1` |  |
| 128 | `vmks_fantasy_farm2` |  |
| 129 | `vmks_fantasy_farm3` |  |
| 130 | `vmks_fantasy_dungeon1` |  |
| 131 | `vmks_fantasy_c_interior_1` |  |
| 132 | `vmks_fantasy_c_interior_2` |  |
| 133 | `vmks_fantasy_mine1` |  |
| 134 | `vmks_fantasy_c_exterior_2` |  |
| 135 | `Alice_demo_bgr` |  |
| 1106 | `tomorrowland_arcade` |  |
| 1200 | `hm_level_test` |  |
| 1201 | `hm_level1` |  |
| 1202 | `hm_level2` |  |
| 1203 | `hm_level3` |  |
| 1204 | `hm_level4` |  |
| 2000 | `vmks_lobby` |  |
| 2001 | `vmks_game` |  |
