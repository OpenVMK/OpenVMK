# POTC Classic (2005 / POTC1) — server port spec

This spec covers what the server has to do **differently** for the 2005 Pirates of the Caribbean
game (room 1010, Classics Lobby) compared with the 2006 port that already works:
`server/src/pirates-engine.ts` and `server/src/pirates-match.ts`. Every claim cites the Lingo it
comes from. Paths are relative to `client/assets/casts/`.

| Short name | Path |
|---|---|
| `E05` | `minigame_engine/scripts/` (2005 engine, MD5-identical to `vmk_potc\minigame_engine.cct`) |
| `E06` | `minigame_engine_potc2/scripts/` |
| `G05` | `vmk_pirates_minigame/scripts/` |
| `G06` | `vmk_pirates2_minigame/scripts/` |
| `S05` | `vmk_pirates_stages/text/` |
| `L05` | `vmk_pirates_game_preshow_handler/scripts/` |

**Provenance check (2026-10-09).** I re-extracted `vmk_potc\vmk_pirates_minigame.cct` from the archive,
`vmk_pirates_stages.cct` and `vmk_pirates_game_preshow_handler.cct` with LibreShockwave and compared them
with the client extractions. Every `.ls` and `.txt` file is byte-identical, so `G05`, `S05` and `L05` really
are the 2005 build. Room 1010 loads `vmk_minigame/minigame_engine`, the 2005 engine
(`assets/external_variables_casts.txt`, lines 944–965).

---

## 0. The biggest differences at a glance

| Area | 2006 (current port) | 2005 (classic) |
|---|---|---|
| Turn pulse | 0.3 s (`E06` `m_fTurnPulse = 0.3`) | **1.65 s** (`E05` `m_fTurnPulse = 1.64999997615814`) |
| `2607` load stage | `str, int version, int nParams, (str key, str val)*` | **`str, int version` only** |
| Ship GameParams | 11 ints, ammo as a list count, ship types | **9 ints**: `[vx, vy, health, ammo, state, navX, navY, score, whirlState]`, and **ammo is an int** |
| Ship constants | Per ship type: speed 666/1024, turn 14/17, NavStop 1423 | **One ship: Speed 700, TurningRate 15, NavigationStopRadius 1000**, Health/MaxHealth 5, Ammo/MaxAmmo 5 |
| Ship params at creation | `SetSpeedAndHealth` reads the wire GameParams | **`SetConstants` ignores the wire.** Internal Health=5, Ammo=5, Score=0, State=0, Nav=(0,0), WhirlpoolSuckState=**VOID**. See §8.1 |
| Dead ship | `Kill` sets Health -1; `LoseHealth` floors at -1 | `Kill` sets **Health 0**; `LoseHealth` floors at **0** and has no destroyed guard |
| Hit (13) | Shooter +gold | Shooter **+score**, and the **target loses score/2** |
| Scoreboard (9) | `[gold1, gold2, wins1, wins2]` | **`[avgScore1, avgScore2]`**, recomputed from the ships on every `AwardScore` |
| Powerups (3) | `[type, state, amount]`, flags, team | **`[type]`**; any ship that is not destroyed takes it; event 11 always gives **+3** |
| Events | 1–42 | **1–33 only**; 34–42 fall to `otherwise` |
| Hazards | Kraken (18), moonlight, team bases | **Sea monster (11), whirlpool (12), moonlight (13), oil (14), turrets (4), buildings (5)**. Wind is real (levels 2–3) |
| End-stage `2612` params | 9 ints | Client reads **only `[1]` winner and `[4]` last-stage flag** |
| Lobby | `{l,m,c}`, ships, AI, price | **`{l}` only**: no ships, no AI, no price, no client start rule |
| `2603` | broken | **broken in the same way** (same bytecode line). Never send it |

---

## 1. Engine and protocol (`E05` vs `E06`)

### 1.1 Messages registered
`E05/00015_CGameHandler.ls` `construct` registers **2601, 2602, 2603, 2604, 2605, 2607, 2609, 2610, 2611,
2612, 2613, 2614**, plus the command `"action" → 560`, which is never used because `_SendAction` sends 601.
**2615 `_GameInfoUpdate` does not exist in 2005.** It is 2006-only (`E06` `regMsgList`).

### 1.2 Wire layouts
- **2601 `_GameStatusUpdate`**: `turn, checksum, nSubturns, per subturn: nEvents, (count, ints…)*`. Identical
  in both years. `encodeTurn` works as it is. A subturn with 0 events gets `AddElement(i, VOID)`.
- **2602 / 2605 / 2609 / 2610 object record**: `count, type, ref, owner, team, x, y, z, dir, extras…`,
  where `count = 8 + extras`. Identical. `encodeObject` works as it is.
- **2603 `_GameUpdateObject`**: broken in 2005 too. `E05/00015_CGameHandler.ls:119`:
  `tParams = [#ref: t_iRef, #owner: t_iOwner, #team: 3, t_iTeam: #worldpos, intvector(...): #dir, t_iDir: #extra, t_iExtraParams: ]`.
  `#worldpos`, `#dir` and `#extra` are never keys. **Do not use 2603.** Use 2602 (create), 2604 (delete) and
  2609 (full status) instead.
- **2604 `_GameDeleteObject`**: `ref`. Usable.
- **2607 `_GameLoadStage`**: **`GetStrFrom()` stage name, `GetIntFrom()` version, and nothing else**
  (`E05` lines 159–164). The 2006 trailer `nParams, key, value…` must not be sent. 2005 has no game mode.
  `G05` `OnLoadStage me, i_sName` takes only the name.
- **2609 `_GameFullStatusUpdate`**: `nObjects, records…, then a turn` in 2601 layout. Identical. Existing
  objects get `SetParam(GameParams)` **and** `GetFactor().UpdateParameters(extra)`. New ones are created.
  Objects that are not in the list are deleted (`_TestObjectListVsRefList`). The turn buffer is then cleared.
- **2610 `_GameCreateMyObject`**: one record. It is appended to `m_ar_rMyObjects`, so `GetMyObjects()[1]`
  is "my ship". Identical.
- **2611 `_GameStartStage`**: `int timeToStart`. **2005 ignores the value.** `G05` `OnStartStage me` takes no
  argument. `CPiratesComponent.update` counts down from the stage XML `STARTTIME`:
  `value(m_stage.GetStartTime()) - (the milliSeconds - m_iStageStartedAt) / 1000`.
- **2612 `_GameEndStage`**: `int timeToStart, int nParams, ints…`. The time is **ignored** in 2005. The
  countdown uses the XML `ENDTIME` (`m_stage.GetEndTime() - integer((ms - m_iStageEndedAt)/1000)`).
  For the params, see §6.
- **2613 `_GamePrepareRoom`**: `int roomCode`, which is ignored (`_PrepareRoom` → `OnPrepareRoom()`). The
  2005 `CPiratesComponent.PrepareRoom` does `room_switch "pirates_game"` and sends **580**, the same as 2006.
- **2614 `_GameParticipantList`**: `count, (int ref, str name)*`. It is stored as `ref → name` (a
  **string**). In 2006 it is `[#name, #figuredata]`, but the wire is the same unless the fireworks thread
  exists. Ship labels and score screens look owners up here. Owner **-1** is drawn as
  `pirates_computer_player_name` ("PirateShip"), so AI ships render fine (`G05/00172` line 375).
- **601** (client → server): `[n+1, action, data…]` (`E05 _SendMinigameAction`). For the 2005 action set,
  see §4.2.
- **602**: no params (`_SendStageLoaded`). It is sent from `CPiratesComponent.InitGameEngine` on
  `#room_ready` once `m_stage` exists, i.e. after the stage room loads. Same timing as 2006: send
  2605/2610 only after 602.

### 1.3 Turn pulse and subturns
- `E05/00016_CGameComponent.ls:46` `m_fTurnPulse = 1.64999997615814`. `G05` never calls `_SetTurnPulse`
  (only `vmk_hm_minigame` does), so **2601 must arrive every 1650 ms**. Subturn spacing is
  `pulse / nSubturns`, so the server picks `nSubturns` freely. The engine code is the same in both years
  (speed-up on buffer overfill, missed-subturn catch-up).
- The client does not fix the subturn count. 2006 runs 10 subturns/s (3 per 0.3 s). To keep 2005 ship,
  ball and moonlight speeds (all per subturn) at a similar real-time rate, use **16 or 17 subturns per
  1.65 s turn** (about 0.1 s each). `m_iSubTurnSpacing = 100.0` in `construct` hints at this. Ball TTL
  (25) and the aim range (`IsShootable`: `25 * 1400`) are in subturns and stay consistent at any count.
  The choice changes the game's tempo only; it cannot cause a desync.

### 1.4 Checksum
`E05 calculateChecksum` is **identical** to 2006. The seed is `IterateSeed(turnNumber)`. For each object in
`m_mp_objects`, the counter restarts at 1 and the sum adds `ObjectCode, Reference, Owner, Team,
integer(x), integer(y), integer(z), integer(Direction), integer(GameParams[i])…`. The existing
`World.checksum` and `nextTurn` (safe seeds) carry over unchanged. The checksum is tested once per turn,
before subturn 1 (`update`: `if not GetTested() then _MinigameTestChecksum`). A mismatch sends **action 3**,
the same as 2006.

### 1.5 Other engine differences (no protocol impact)
- `E05 StartMinigameEngine` does not call `initIntVector()`. The 2005 game does it in
  `CPiratesComponent.PrepareRoom`. 2005 also has no `#StartMinigameEngine`/`#StopMinigameEngine` messages.
- `E05 CCollision.TestCircleToCircleCollision` has an extra early `if dist < other.radius then return 1`.
  No 2005 object pair ever calls circle-vs-circle, so this does not matter.
- `G05 InitGameEngine` uses `_SetPooledAllocationModel()`, as 2006 does. `CStage` load calls
  `GetObjectPool().ClearAll()`. Within a stage, pooled cannonballs/powerups are re-`construct`ed, and their
  factors reset `m_collided` (in `SetConstants` and `construct` respectively).

### 1.6 Object creation order — read this
`E05 _MinigameCreateObject` sets `Reference, Owner, Team, WorldPosition, Direction, ObjectCode,
GameParams(extra)` and `BoundsType #point`, **then** calls `SetConstants`. In 2005 the ship's
`SetConstants` overwrites the internal Health, Ammo, Score, State and so on with constants, and no factor
calls `UpdateParameters` on creation. So **after a 2602/2605/2610 create, the internal params are the
`SetConstants` defaults. The wire GameParams only feed the checksum until the object's first
`SyncGameParameters`.** This matters for ships, the wind and whirlpools; §8.1 gives the fix.

---

## 2. Object model (`G05/00193_CPiratesComponent.ls` `InitGameEngine`)

```
1  piratesship         CPiratesFactorShip
2  piratescannonball   CPiratesFactorCannonball
3  piratespowerup      CPiratesFactorPowerup
4  piratesturret       CPiratesFactorTurret
5  piratesbuilding     CPiratesBuildingFactor
7  piratestree         factor = ["CRoomWorker"] only   -> no move(); NEVER create
8  pirateswindindicator CPiratesFactorWindIndicator
9  piratesscoreboard   CPiratesFactorScoreBoard
10 piratesbridge       CPiratesBridgeFactor (no 2005 stage has one)
11 piratesseamonster   CSeamonsterFactor
12 pirateswhirlpool    CWhirlpoolFactor
13 piratesmoonlight    CPiratesFactorMoonlight
14 piratesoilspill     COilFactor
15 piratesbuilding     (same class as 5, but cannonballs only test GetObjectsByCode(5))
```
There is **no 17 (team base) and no 18 (Kraken)**. Pooled reserves: 30 cannonballs, 10 puffs, 20 powerups.

`GetObjectsByCode(n)` lists are in **creation order**, not ref order (`_CreateObject` appends to
`m_ar_ar_objByType`). `move()` runs in **ref order** (`m_mp_objects` is sorted). Hit tests that loop
"for each ship" therefore loop in creation order.

### 2.1 Ship (type 1). `G05/00199_CPiratesFactorShip.ls`
`SetConstants` (lines 34–61):
```
BoundsType #triplecircle; 1stRadius 1000, 2ndRadius 1500, 3rdRadius 1000, 1stOffset 1500, 3rdOffset -1500, LargestRadius 2500
NavigationStopRadius 1000     (2006: 1423)
BowCannonOffset 2000, SideCannonOffset 1000
TurningRate 15                (2006: 14 or 17 by type)
Speed 700                     (2006: 666 or 1024 by type)
Velocity (0,0,0); Health 5; MaxHealth 5; Ammo 5 (INTEGER); MaxAmmo 5; State 0
NavigationTarget (0,0,0); Score 0; WindAffects 1; ArcStart 0; ArcEnd 90
WhirlpoolSuckState: NOT SET (VOID)   <- 2006 sets it from GameParams[9]
```
There are no ship types, no `SetSpeedAndHealth` and no rowboats.

**GameParams (9 ints)**, from `SyncGameParameters`:
`[1] vel.x, [2] vel.y, [3] Health, [4] Ammo (int), [5] State, [6] navTarget.x, [7] navTarget.y, [8] Score, [9] WhirlpoolSuckState`.
2006 adds `[10] Type, [11] Gold` and uses `Ammo.count` for `[4]`.

`UpdateParameters` (2609 only) sets Velocity, Health, Ammo (int), State, NavigationTarget, Score and
WhirlpoolSuckState from `[1..9]`.

**State bits** (`construct`): 1 MOVE, 2 SLOW (unused), 3 SHOOT, 4 DESTROYED, 5 FLOATINGWRECK,
6 INVINCIBILITY. **There are no bits 7–9** (no flags, no rowboat).

Other factor methods:
- `Shoot()`: `if Ammo > 0 then Ammo = Ammo - 1; return 1`.
- `Kill()`: sets bits 5 and 4, **`Health = 0`**, and does not sync (the next `move` syncs).
- `LoseHealth()`: `Health = max(0, Health - 1)`, then `SyncGameParameters()`. **There is no `IsDestroyed`
  guard** (2006 has one).
- `Burn()` = `LoseHealth()`.
- `Blow()`: clears bit 5 and sets `BoundsType #none`.
- `AwardScore(a)`: `Score = max(0, Score + a)`, `SyncGameParameters()`, then
  `scoreboard.UpdateTeamScores()`. This happens **even when `a = 0`** (2006 skips 0). It errors if there
  is not exactly one scoreboard object.
- There is no `LoseGold` and no `setCarryingFlag`.

### 2.2 Cannonball (type 2). `G05/00007_CPiratesFactorCannonball.ls`
GameParams `[shooterRef, vx, vy, ttl, state]`. State bits: 1 INVINCIBLE (shot by an invincible ship),
2 BROADSIDE (unused), 3 SHRAPNEL. **There is no bit 4 golden.** Constants come from the variable index
(`G05` text `variable.index`): `game.cannonballspeed = 1400`, `game.cannonballtimetolive = 25`. z = 500.
`SetConstants`: `BoundsType #point`, `WindAffects 0`, `m_collided = 0`.
`IsRemovable = ttl <= 0 or m_collided`, and `CPiratesComponent.update` deletes it. Same as 2006.

### 2.3 Powerup (type 3). `G05/00168_CPiratesFactorPowerup.ls`
GameParams **`[type]`** (1 = ammo, 2 = health). Team is -1 (event 5 forces it). `BoundsType #circle`,
`BoundingCircleRadius 550`. `UpdateParameters` and `SyncGameParameters` do nothing (there is no sync
method). Removed when `m_collided`.

### 2.4 Turret (type 4). `G05/00920_CPiratesFactorTurret.ls`
GameParams `[health]`. `BoundsType #box`, `BoxDimensions [(-1000,-1000), (1000,1000)]` relative to its
position. `move` does nothing. `HitByCannonball`: `[1] = max(0, [1] - 1)`. `Kill` sets the non-checksummed
`Killed = 1`, and the visualizer then shows `turret_1_damage`.

### 2.5 Building (types 5 and 15). `G05/00946_CPiratesBuildingFactor.ls`
GameParams **`[health, graphicCode]`**. `SetConstants` reads `GameParams[2]` and pulls
`BoxDimensions = GetBuildingBounds(graphic)`, i.e. `[intvector(BBOXTL), intvector(BBOXBR)]` from the stage
`<BUILDING GRAPHIC=… BBOXTL=… BBOXBR=…>` (`CPiratesComponent.InitGameEngine` lines 275–281).
`OriginalHealth = GameParams[1]`. `HitByCannonball`: `[1] = max(0, [1] - 1)`, plus damage visuals.
`CPiratesBuildingVisualizer.HitByCannonball` shows damage level
`(OriginalHealth - health) / (OriginalHealth / 5)`, so **use an initial health that is a multiple of 5**
(5 levels). **Create buildings only after 602**, because the bounds table is filled in `InitGameEngine`.
`graphicCode` must be one of that stage's `GRAPHIC` values.

### 2.6 Wind (type 8). `G05/00763_CPiratesFactorWindIndicator.ls` (identical to 2006)
GameParams `[beaufort]`, with index 0..12 into `[0, 2, 4, 8, 10, 16, 20, 30, 40, 50, 60, 80, 100]`.
`Strength = table[beaufort + 1]`, and the wind direction is the object's own **Direction** (checksummed).
`SetConstants`: `Strength = 0`. `move()`: `Strength = table[GameParams[1] + 1]`.
`ChangeWind(dir, v)`: `GameParams[1] = v`, `Direction = dir`, `Strength = table[v + 1]`.
There must be exactly one; ship `move` errors otherwise. Wind is invisible in 2005 (the visualizer is an
empty script) and only moves ships and clouds.

### 2.7 Scoreboard (type 9). `G05/00791_CPiratesFactorScoreBoard.ls`
GameParams **`[team1Score, team2Score]`**. `UpdateTeamScores()` replaces them with, per team,
`sum(ship Score) / count(ships in team)`. This is Lingo integer division over **all** ships of the team,
dead or alive, and uses each ship's internal `Score` param. Create it with `[0, 0]`. Unlike 2006 it has no
win counters and no vault.

### 2.8 Sea monster (type 11). `G05/01015_CSeamonsterFactor.ls`
GameParams `[targetX, targetY]`. `SetConstants`: `BoundsType #circle`, `BoundingCirleRadius 5000` (sic,
the typo means it is never used), `State 0`,
`Speed = GetStage().GetSeaMonsterSettings()["ChaseSpeed"]`, i.e. stage `<SEAMONSTER CHASESPD>` = 100.
**This throws on a stage without `<SEAMONSTER>`**, so create it only on level 2. `Attack()` sets State
bit 1, which is not checksummed.

### 2.9 Whirlpool (type 12). `G05/00936_CWhirlpoolFactor.ls`
GameParams **`[curDeviation, nextChange]`** (index 1 = deviation 1..4, index 2 = countdown).
`SetConstants`: `BoundsType #circle`, `State 0`, and
`m_speed = GetStage().GetWhirlPoolSettings()["MoveSpeed"]` (`<WHIRLPOOL MOVESPD>` = 50). `move` reads
`GameParams[2]` unconditionally, so **it must be created with two params** (see event 21, §4.1).

### 2.10 Moonlight (type 13)
Identical to 2006: GameParams `[vx, vy]`, `#circle` radius 5000 (never tested client-side).

### 2.11 Oil spill (type 14). `G05/00951_COilFactor.ls`
GameParams `[]`. `SetConstants` is **empty**, so `WindAffects` is never set (VOID) and **2005 oil never
moves**. (2006 sets `WindAffects 1` and drifts at `/512` with a map test.) Only the non-checksummed `Age`
changes. It has no bounds of its own; ships never touch it client-side. Burning is the server's event 29.

### 2.12 Bridge (type 10)
GameParams `[health]`, box ±1000. No 2005 stage defines one. There are two scripts with the same class
name (`00875`, `01121`); only `01121` has `HitByCannonball`. Skip bridges.

---

## 3. `move()` per object type (2005)

Notation: `/` is Lingo integer division (truncates toward zero). `vel(dir) = (VEL_X[dir], VEL_Y[dir])`
from `CVelocityTbl`, and `angle(dx,dy)` is `CComponentToAngle`. Both tables are identical to 2006.
`AdjustDirection` and `TestShipToCMap`/`CMap.TestPointToCMap` are identical too (`G05/00163_MathMethods.ls`,
`00715_CMap.ls`; the only MathMethods diff is `arcCos`, which the UI uses). Everything runs every subturn
in ref order, after that subturn's events.

### 3.1 Ship (`CPiratesFactorShip.move`)
The code is the same as 2006 apart from the constants. **The whirlpool branch is live in 2005** (the 2006
port left it out), and it is the only new piece:
```
pos = WorldPosition; dir = Direction; state = State; speed = 700; turn = 15
windStr = wind.Strength; windDir = wind.Direction         // the single type-8 object
origX, origY, origDir = pos.x, pos.y, dir
wps = GetObjectsByCode(12)                                  // CREATION order
if wps.count > 0:
  wp = wps[1]
  s = WhirlpoolSuckState
  if s == -1 and testDistance(pos, wp.pos, 3500):           // hard-coded 3500
    state = ClearBit(state, MOVE); WhirlpoolSuckState = 0   // then fall through to the normal path
  elif s > -1:
    if s < 25:                                              // wp3suck.count
      [ang, mag, rot] = WP3SUCK[s]                          // 0-based here
      dir = AdjustDirection(dir, rot); Direction = dir      // NOT restored on collision
      if ang == -1000:
        throwDir = getRandomNumber(IterateSeed(turnNumber + pos.x), 360)
      else:
        throwDir = angle(wp.x - pos.x, wp.y - pos.y) + ang  // may exceed 359; vel() wraps it
      pos.x += VEL_X[throwDir] * mag / 256; pos.y += VEL_Y[throwDir] * mag / 256
      if TestCollision(): pos = (origX, origY)
      Velocity = pos - orig; WhirlpoolSuckState = s + 1
      SyncGameParameters(); return                          // no nav, no wind, no fallback
    else:
      WhirlpoolSuckState = -1                               // then the normal path
// normal path, identical to 2006 (pirates-engine.ts moveShip) with NAV_STOP = 1000
if MOVE and not DESTROYED:
  steer toward the nav target by `turn`; if |pos - nav| < 1000 on both axes: clear MOVE, vel = 0
  else vel = vel(dir) * 700 / 256; pos += vel
if WindAffects: pos += vel(windDir) * windStr / 256          // every ship, always
State = state; Direction = dir; WorldPosition = pos
colliding = 0
if not DESTROYED or FLOATINGWRECK:
  colliding = TestCollision()                                // map > 1, or the triple-circle of another collidable ship
  if MOVE and colliding: try dir+45, dir-45, dir+85, dir-85 from orig at speed/2 (=350)
if colliding: pos = orig; Direction = origDir
Velocity = pos - orig; SyncGameParameters()
```
`WP3SUCK` (`G05` text member `wp3suck`, 25 rows of `[angle, magnitude, rotation]`):
```
[80,700,-3] [75,700,-5] [60,700,-6] [55,700,-7] [40,700,-8] [30,700,-9] [20,700,-20] [20,700,-30]
[20,700,-35] [20,700,-40] [20,700,-40] [20,700,-40] [20,700,-40] [20,700,-40] [20,700,-30] [20,700,-20]
[-1000,700,-11] [170,700,-10] [160,700,-9] [150,700,-8] [140,700,-2] [130,700,-1] [120,700,-1] [110,700,-1] [100,700,-1]
```
`getRandomNumber(seed, max)` (`E05/00014_CIterateSeed.ls`) is `abs(seed) mod max` when the seed is
negative and `seed mod max` otherwise. ⚠ Row 17 seeds with `turnNumber + pos.x`, an arbitrary integer
that the server's `iterateSeed` may not reproduce (it returns `null` when Director's float rounding is
ambiguous). If that happens, force a 2609 for the following turn (§8.3).

After a suck sequence MOVE stays cleared: the ship stops until it gets a new nav order (event 1).

### 3.2 Cannonball (`CPiratesFactorCannonball.move`)
Same as 2006, plus **turrets and buildings**:
```
pos += (GameParams[2], GameParams[3]); GameParams[4] -= 1
if map(pos) > 3: collided
owner = GetMGObject(GameParams[1])
inv = TestBit(State, 1)    // the ball's internal "State" param is never set -> always false
for ship in GetObjectsByCode(1) (creation order), ship != owner:
  skip if DESTROYED and not WRECK
  shipInv = bit 6 of ship.State
  if (not inv and not shipInv) or (inv and shipInv):       // bytecode order checked: (¬a∧¬b)∨(a∧b)
    if PointToTripleCircle(ball, ship): collided (+ cosmetic flash)
for t in GetObjectsByCode(4): if PointToBox(ball, t): collided   // box: strict >/<, relative BoxDimensions
for b in GetObjectsByCode(5): if PointToBox(ball, b): collided   // type 15 is NOT tested
```
As in 2006, every hit is cosmetic on the client. The server decides and sends 13, 14, 12, 7 and 6.
There is no team check: friendly balls flash too.

### 3.3 Powerup
```
for ship in GetObjectsByCode(1): if not bit4(ship.State) and CircleToTriple(550, ship): m_collided = 1
```
There is no team or flag logic. A ship that is a wreck (bit 4) cannot collect. A ship at Health 0 that has
not been killed yet can.

### 3.4 Wind
`Strength = table[GameParams[1] + 1]` (§2.6).

### 3.5 Sea monster (type 11)
```
d = target - pos; dir = angle(d)
if |dx| < 20 and |dy| < 20: pos = target          // 2006 Kraken snaps at 40
else pos += vel(dir) * Speed / 256                 // Speed = CHASESPD (100)
```

### 3.6 Whirlpool (type 12)
```
gp[2] -= 1
if gp[2] <= 0:
  nd = gp[1] + 1; if nd > 4: nd = 1
  gp[2] = getRandomNumber(IterateSeed(turnNumber), 20) + 10    // same seed as the checksum
  gp[1] = nd
dir = Direction - gp[1]; if dir < 0: dir += 360
pos += vel(dir) * MOVESPD / 256                                // 50
Direction = dir
```

### 3.7 Moonlight
`pos += (gp[1], gp[2])`, the same as 2006.

### 3.8 Turret, building, scoreboard, bridge
These have no movement. Their state only changes through events.

### 3.9 Oil
Nothing that the checksum sees (§2.11).

---

## 4. Events and actions

### 4.1 `CPiratesMinigameHandlerExtension.OnEvent` (`G05/00203`)
`score` values are the stage's `<SCORES>` points (§5). The table marks what each event changes in the
**checksum** and how it differs from 2006.

| # | Data | Effect (2005) | vs 2006 |
|---|---|---|---|
| 1 | `ship, navX, navY` | `NavigationTarget = (x,y)`, set MOVE, clear SHOOT | same |
| 2 | – | no-op | same |
| 3 | `ship, ball, x, y` | `if ship.Shoot()` (Ammo int −1 if >0): ball at `pos + vel(angle(x-px,y-py))*2000/256`, z 500, extra `[ship, vx, vy, 25, inv?1:0]` | no golden |
| 4 | `turret, ball, dir` | ball owner −1, team −1, at `turretPos + vel(dir)*1400/256`, extra `[turret, vx, vy, 25, 0]` | same |
| 5 | `ref, x, y, type` | powerup, team −1, **extra `[type]`** | 2006: `[type,state,amount]` + team |
| 6 | `ship, killer, killerScore` | `Kill()` → bits 4+5, **Health 0**; if `killer <> -1`: `killer.AwardScore(killerScore)` when killer exists and `killerScore <> -1` (Lingo `and` does not short-circuit: `data[3]` is read whenever `data[2] <> -1`) | no `[4]` LoseGold; Health −1 in 2006 |
| 7 | `fixture, killer` | `fixture.Kill()` (`Killed=1`, not checksummed) | no `[3]` award |
| 8, 9 | – | no-op | same |
| 10 | `dir, beaufort(0..12)` | wind `ChangeWind` | same |
| 11 | `ship, type` | type 1: **`Ammo = min(Ammo+3, MaxAmmo)`**; type 2: **`Health = min(Health+3, MaxHealth)`**; `SyncGameParameters` | 2006: `[ship,type,state,team,amount]`, golden, flags |
| 12 | `x, y` | splash/explosion puff only | same |
| 13 | `target, x, y, shooter, score` | **`if target.Health > 0`**: `LoseHealth()`; `shooter.AwardScore(score)`; **`target.AwardScore(-1 * (score / 2))`** | 2006: `> -1`, no target deduction |
| 14 | `fixture, x, y, shooter, score` | `fixture.HitByCannonball()` (GameParams[1] −1, floored at 0); `shooter.AwardScore(score)` | same |
| 15 | `ref` | no-op | same |
| 16 | `ship, ball, side(0 L/1 R), cannon(1..5)` | dir = shipDir ∓ (75 + 5·cannon); **cannon 1 does `Ammo = Ammo − 1` (int, no floor)**; ball at `pos + vel(dir)*1000/256`, extra `[ship, vx, vy, 25, inv?1:0]` | no `[5]` golden; 2006 deletes a list entry |
| 17 | – | no-op | same |
| 18 | `ref, x, y` | create **type 11** (fixed), extra `[x, y]` | 2006 takes the type from `[4]` (2005 ignores a 4th int) |
| 19 | `ref` | delete | same |
| 20 | `monster, ship` | `monster.Attack()`; **`ship.LoseHealth()` twice** | 2006: `[3]` = count |
| 21 | `ref, x, y` | create type 12, dir 0, **extra `[]`** ⚠ | same |
| 22 | `ref` | delete | same |
| 23 | `ref, x, y, vx, vy` | create type 13, extra `[vx, vy]` | same |
| 24 | `ref` | delete | same |
| 25 / 26 | `ship` | set / clear State bit 6 | same |
| 27 | `ref, x, y` | create type 14, extra `[]` | same |
| 28 | `ref` | delete | same |
| 29 | `oil, ship` | `ship.Burn()` = `LoseHealth()` (`data[1]` unused) | same |
| 30 | `ship, n, ref1..refn` | blow up: shrapnel (below), then `ship.Blow()` (clear bit 5, BoundsType #none) | same |
| 31 | `monster, x, y` | `GameParams[1..2] = (x, y)` | same |
| 32 | `secondsLeft` | timer display | same |
| 33 | `avatarRef, seconds` | idle-kick warning if it is my ship | same |
| 34–42 | – | **not handled**: `otherwise` prints "Unrecognized event ID" | 2006: flags, rowboat, team win (39), extended play, expiry |

There is **no event 39 (team win)** and no `41` expire. To remove a powerup, use **2604**.

**Event 21 warning.** It creates the whirlpool with `extra []`, and `CWhirlpoolFactor.move` immediately
reads `tVariables[2]`. In Director that is an *index out of range* script error, which aborts the subturn's
move loop. **Create whirlpools with 2602 instead**: `type 12, ref, -1, -1, x, y, 0, dir, [1, 1]`. Remove them
with 2604, or with event 22, which is fine.

**Event 30 shrapnel** (identical in both years). The server's own simulation must reproduce it exactly or
send `n = 0`:
```
seed = turnNumber of the CURRENT turn (GetTurnNumber)
for i in 1..n:
  seed = IterateSeed(seed);  dir   = getRandomNumber(seed, 360)
  seed = IterateSeed(seed);  speed = 1400 - getRandomNumber(seed, 700)
  seed = IterateSeed(seed);  ttl   = getRandomNumber(seed, 70) + 5
  ball ref_i: owner/team = the ship's, pos = (ship.x, ship.y, 500), dir 0,
              extra [shipRef, vel(dir).x*speed/256, vel(dir).y*speed/256, ttl, 4]   // state 4 = bit 3 SHRAPNEL
then ship.Blow()
```
The 2005 instructions promise that blowing up your wreck can "take your enemies down with you"
(`assets/external_texts_181_disney.txt` `pirates.instructions.text.page.6`), so classic should send real
shrapnel. The seed chain leaves the safe range of `iterateSeed`, so follow every event 30 with a **2609 on
the next turn**. 2609 rewrites each ball's position and GameParams, so a client that iterated differently is
repaired.

### 4.2 Actions (601) the 2005 client sends
From `G05/00181_CPiratesInterface.ls` and `00910_CPiratesMessageBar.ls`:

| Action | Data | Trigger |
|---|---|---|
| 1 | `x, y` | single click (`singleClick`) |
| 3 | – | checksum mismatch (engine) |
| 4 | `side` (0 left, 1 right) | arrow key pressed twice, or double click. The client checks `Ammo > 0` and `interface.shootdelay = 1000` ms |
| 5 | – | `button.invinsibility` (level 3 user-triggered moonlight; the button is `deactivate`d unless `USER_TRIGGERED`) |
| 6 | – | double click while `IsFloatingWreck()`, i.e. blow up my wreck |
| 7 | – | exit dialog OK |

**There is no action 8** (no flags). The 2005 client never sends action 2 or uses event 3. Chat in the game
is `560 say` / `561 canned_say` (`G05/01566_CPiratesMsgHandler.ls`), and the client shows **2560**
`_AvatarChat [ref, canned msg]` over the sender's ship in team colour. This is the same as 2006.

---

## 5. Stage XML (`S05`, `G05/00781_CStage.ls`)

### 5.1 What the client reads
`CStage.LoadXML` keeps:
- root: `STAGE`, `STARTTIME`, `ENDTIME` (all nine stages: 5 / 5). These **drive the client's countdowns**.
- `FIXTURES/BUILDING` → `[#pos, #BBox: rect(BBOXTL, BBOXBR)]`, keyed by `GRAPHIC` (the building bounds).
- `FIXTURES/TURRET` and `OILBUILDING`: stored, never used.
- `SCORES`, `WIND` (`CHANGEINTERVAL`, `CHANGEPROPABILITY`), `POWERUPS` (`INTERVAL`, `PROPABILITY`,
  `CANNONBALLAMOUNT`): stored, **never used** client-side.
- `COLLISIONMAP` `TILESIZE`, `OFFSET`, `SIZE`, `DATAMEMBER` → `CMap.SetMap(value(member.text))`. This is
  the same Lingo-list collision member format as 2006, so `parseCollision` works.
- `WHIRLPOOL` (`PULLRADIUS`, `PULLAMT`, `SPINSPD`, `RELEASERADIUS`, `MOVESPD`) and `SEAMONSTER`
  (`CHASETRIG`, `CHASESPD`). The factors use only `MOVESPD` and `CHASESPD`.
- `MUSIC PLAY`, and `MOONLIGHT USER_TRIGGERED` via `value()`: `"true"` → 1, `"false"` → 0, missing → VOID.
  When it is false or VOID, `disableInvincibility()` greys out the button.

The client **ignores `TEAMS`, `ITEMS` and `NAVNODE`** (the `TEAMS`/`ITEMS` loops have empty bodies).
They, and `<JAVA RUNTIMECLASS="com.sulake.danny.vmk.minigame.pirates.domain.PiratesMiniGameStage">`,
are server data.

### 5.2 Contents per stage
All nine stages have 4 `START`s per team (`TEAM NUM="1"` and `"2"`, `POS="point(x, y)"`, `DIR`), the
collision map `TILESIZE 200, OFFSET (-60000,-60000), SIZE 601×601`, and `SCORES HITENEMY=1000
KILLEDENEMY=2000 HITNPC=1000 KILLEDNPC=2000 SELFHIT=-500 BAILOUT=-15000`. `POWERUP` `TYPE` is only 1 (ammo)
or 2 (health) and there is no `TEAMNUM`.

| Stage | Items (1/2) | Wind (Beaufort min–max, interval s, prob %, strength change, dir range, dir change) | Hazards / fixtures | Navnodes |
|---|---|---|---|---|
| L1S1 | 6 / 2 | 0–0, 20, 50, 0, 0–359, 200 | – | 13 |
| L1S2 | 5 / 2 | 0–0 (same) | – | 17 |
| L1S3 | 7 / 4 | 0–0 (same) | – | 27 |
| L2S1 | 6 / 4 | **5–10**, 20, 50, 0, 0–359, 200 | `SEAMONSTER` CHASETRIG 5000, CHASESPD 100, STARTFIXDLY 50, STARTRNDDLY 100, STAY 20, STAYRNDDELAY 20, REPEATFIXDLY 15, REPEATRNDDLY 10, 4 `START`s; `WHIRLPOOL` PULLRADIUS 3500, PULLAMT 2000, SPINSPD 500, RELEASERADIUS 6000, STAY 20, STAYRNDDELAY 20, REPEATFIXDLY 15, REPEATRNDDLY 10, MOVESPD 50, 3 `START`s; `MOONLIGHT USER_TRIGGERED="false"` STARTFIXDLY 2, STARTRNDDLY 2, STAY 20, REPEATFIXDLY 2, REPEATRNDDLY 4, INVINCIBILITY 5, VELOCITY 200 | 21 |
| L2S2 | 12 / 4 | **2–12**, 10, 75, 7, 0–359, 200 | `MOONLIGHT` (no `USER_TRIGGERED`, INVINCIBILITY 8), `WHIRLPOOL` (2 starts), `SEAMONSTER` (4 starts) | 10 |
| L2S3 | 13 / 5 | **2–12**, 10, 75, 7, 0–359, 200 | the same, whirlpool 5 starts, sea monster 6 starts | 24 |
| L3S1 | 6 / 4 | **3–9**, 10, 50, 6, 0–360, 90 | `MOONLIGHT USER_TRIGGERED="true" INVINCIBILITYDLY=30 INVINCIBILITY=5`; BUILDING g1 @(16600,31800) bbox ±(4550,4400) LEAK (14450,21150); BUILDING g2 @(-4950,-34050) ±(4000,4000) LEAK (4900,-26300) | 11 |
| L3S2 | 6 / 4 | 3–9 (same) | user moonlight; BUILDING g1 @(-14200,-7800) ±(4550,4400) LEAK (-12150,1950); TURRET (9100,42700), (-1850,-39350) | 9 |
| L3S3 | 6 / 4 | 3–9 (same) | user moonlight (the file has a typo, `<<MOONLIGHT`); BUILDING g1 @(-12200,6200) ±(4025,3900) LEAK (-18300,7500); g2 @(-14100,-18900) ±(3600,3300) LEAK (-12200,-9600); g4 @(15250,-17450) ±(4725,4900) LEAK (17650,-9050); TURRET (-38950,-6850), (24250,8150) | 17 |

L2S1 and all of level 3 also carry a 2006-style `<POWERUPS … HEALTH_START_SECONDS … AMMO_END_SECONDS>`
with `<GAME TYPE="small|large" …_INTERVAL …_PROPABILITY>` children. The other stages have the old
`<POWERUPS INTERVAL="10" PROPABILITY="50" CANNONBALLAMOUNT="3" HEALTHAMOUNT="3">`. The client ignores both.
Note that event 11 always grants +3 regardless.

`LEAK` sits inside its `BUILDING`, and `CStage` does not read it. It is where the server should spawn the
oil spill (events 27/28/29). The level 3 instructions say the towers "can shoot back and spill flaming
oil". The burn radius is not in any data, so the server has to choose it.

### 5.3 NAVNODE graph (server AI only)
```xml
<NAVNODE POINT = "point(-5200, -9000)">
  <LINK TO="4"/> <LINK TO="5"/> …
</NAVNODE>
```
`TO` is the **1-based index of the target `NAVNODE` in file order**. I checked all nine stages: every link
is **symmetric** (A→B implies B→A) and none dangle. The nodes are the island-free waypoints the Java server
used for AI ships. The existing `NavGrid` A* could be replaced or seeded with them.

### 5.4 Parser notes for `loadStage`
- `STAGE_DIR` is hard-coded to `vmk_pirates2_stages`. Point classic at `vmk_pirates_stages/text/`.
- Levels 1–2 write attributes with **spaces around `=`** (`NUM = "1"`, `POS = "point(…)"`). `attr()`
  already allows `\s*=\s*`, but the `TEAM` regex `/<TEAM\s+NUM="(\d)"/` does **not**, so it finds no starts
  in levels 1–2. Use `/<TEAM\s+NUM\s*=\s*"(\d)"/`.
- There is no `TEAMBASE` or `KRAKENSEAMONSTER`. The new things to parse are `WIND`, `SEAMONSTER`,
  `WHIRLPOOL` (with their `START` children; do not confuse them with team `START`s), `BUILDING`/`LEAK`,
  `TURRET`, `SCORES` and `NAVNODE`.

---

## 6. Interface: stage end and game end (`G05/00193 CPiratesComponent`, `00181 CPiratesInterface`)

`StageEndCountDown(i_iTime, i_ar_params)` stores the params. `update` then shows, for `ENDTIME` seconds
(taken from the XML; `i_iTime` is ignored):
```lingo
if m_ar_stagevictoryparams[4] <> 1 then
  DisplayStageEnd(name, players, scores, teamscores, tTimeRemaining)
else
  DisplayGameEnd(name, players, scores, teamscores, tTimeRemaining, m_ar_stagevictoryparams[1])
```
**Only `params[1]` (winning team, 1 = red, 2 = blue) and `params[4]` (1 = last stage / game over) are
read**, so the list must have **at least 4 ints**. The minimum is `2612 [endTime, 4, winner, 0, 0, last]`.
The 2006 9-int list is also harmless: the extra ints are ignored.

- `players` and `scores` come from `GetAllScores`: ships of team 1 (up to 4) then team 2 (up to 4), padded
  with empty slots. The name is `GetParticipantlist().getaProp(owner)`, or "PirateShip" for owner −1. The
  score is the ship's **internal `Score` param** (points, not gold). `teamscores` is the scoreboard
  `[1], [2]`, i.e. the per-team **average** score (`pirates_average = " Team Score"` in the 2005 texts).
- `DisplayGameEnd` merges `vmk_pirates_winner.window` and shows `winner.red` for 1 or `winner.blue` for 2
  ("RED TEAM WINS!" / "BLUE TEAM WINS!"). It plays `#OwnTeamWins` when `myShip.Team = winner` and
  `#OtherTeamWins` otherwise, then a fanfare. A winner of 0 leaves both banners in their default state.
- In-game HUD: health crates 0–5 and ammo 0–5 (`setHealthIndicator` and `setAmmoindicator` cover only
  0..5), and red/blue score = scoreboard `[1]`/`[2]`. Hits float `"<score> pts"`. The exit button is hidden
  during the end countdown (`enableExitButton(0)`) and returns after the next start countdown.
- **The client never decides who wins.** It shows the server's `[1]`, and its scores only reflect the
  events. The 2005 rules (`external_texts_181_disney.txt` page 2): "There are three rounds, each one
  ending when one side has lost all of its ships." Time-outs are left to the server, using event 32's
  timer. There is no event 39 and no win counter, so the server tracks the best-of-three itself.
- Nothing returns players to the lobby after the last stage. The server must (`toLobby`), or players press
  exit (action 7).
- Highscores: the 2005 lobby shows **`DisplayHighscore(4, …)`** (`L05/00004_CPPSInterface.ls:145`).
  Record classic scores under **game 4** (2006 uses 6 and 7).

---

## 7. Lobby (`L05` vs `vmk_pirates2_game_preshow_handler`)

`CPPSHandler` is **identical** in both years: it listens for 2023 `InstanceInfo` and 2645 `CreateFailed`
(→ `HidePrestart`), and has the command `GET_SPACE_INSTANCE_INFO_BY_TAG` → 36.

Room 1010 loads the **later** `vmk_minigame/minigame_lobby`. In it, `CLobbyComponent.JoinGame(id, team, pairs)`
sends 645 with a keypair count, and 2643 carries one. The true 2005 lobby
(`shockwave/vmk_classic/minigame_lobby.cct`, which I re-extracted) sends **645 `[ref, team]`** and reads
**2643 `[game, avatar, team]`** with no keypairs. It also has no 2650/2651/2652 and no 650/651. The server
must speak the **later** layout, because that is what 1010 loads. `pirates.ts` already reads 645 tolerantly.

What the 2005 `CPPSInterface` does, compared with 2006:
- **Create**: `CreateGame(["l": string(level)])` → `640 [1, "l", "1|2|3"]`. There is no `m` and no `c`.
  The creator is put on team 1 (`m_iMyTeam = 1`).
- **Join**: `JoinGame(gameID, 1|2)` → `645 [ref, team, 0]` with no price dialog. Switching team =
  `LeaveCurrentGame` + `JoinGame`. The JOIN buttons are hidden when a team has 4.
- **Leave** `646`, or `641` when the owner leaves (`CLobbyComponent.LeaveCurrentGame`). **Cancel** →
  `RemoveMyGame` → 641. **Kick** → 647. **Start** → 648.
- **There are no ship picks (650), AI slots (644), game conditions (651) or team-switch button.** Nothing
  reads participant data keys. The `t` the server sends is harmless.
- **There is no client start rule.** `button.pirates.startnow` is always active for the owner (2006 has
  `m_bCheckEqualPlayers`: at least 4 players and equal teams). The server's equal-teams check (205) is a
  server decision. Because the client lobby is the later one, 2652 shows `lobby.error.start.205`.
- **Level locks existed in 2005.** The 2005 text file has `lobby.error.create.202/203` and
  `lobby.error.join.2/3/202/203` ("You must win 10 times on level 1 …"). The current classic `refusal()`
  returns 0. Decide whether classic should enforce the locks. There was **no price** (no 204 text in 2005).
- **Game list on entry.** Neither lobby version requests one: `InitService` only resets state, and the 2005
  interface never sends 642/643/651. The comment in `pirates.ts` that says otherwise is wrong. `initRoom`
  (on `room_ready`, after the avatars exist) calls `InitService()` and then `GetMoreGameRooms()` →
  **`36 [#int: 1001]`**. Reply to that 36 in room 1010 with a `2642` snapshot, or push one at room_ready.
  Otherwise games created before the player entered stay invisible.
- `GetMoreGameRooms` **hard-codes space 1001**, and "go to room" sends `31 [spaceID, instanceID]`. Answer
  the 36 from room 1010 with 1010's instances, or 2006 rooms will be listed.
- `CreateGameDisplay` and the prestart window read participant names from **room avatars**
  (`_AccessIndexed(ref, "avatar").GetParam("NAME")`). Negative AI refs show blank names. The test-AI path
  works, but with empty slots.
- Instructions: 8 pages, `pirates.instructions.text.page.1..8`. The 2005 wording is in
  `assets/external_texts_181_disney.txt` (lines 610–617), but `assets/overlay/external_texts.txt`
  overrides the same keys with the 2006 text. Fixing that is client/asset work, not server work.

---

## 8. Implementation notes and pitfalls

### 8.1 Make the first turn of every stage a 2609
§1.6 explains why the 2005 ship's internal state after a 2605/2610 create is `SetConstants`' (Health 5,
Ammo 5, Score 0, State 0, Nav 0, **WhirlpoolSuckState VOID**), whatever the wire says:
- On whirlpool stages, VOID compared with `-1` / `> -1` is undefined territory. In Director it can start a
  suck sequence immediately.
- `SyncGameParameters` puts VOID into GameParams[9], and the checksum does `integer(VOID) * counter`.
- A ship's Score carried over from earlier stages is lost (`Score = 0`).
- The wind's `Strength` stays 0 until the wind object's own `move()` runs. When the wind's ref is above
  the ship refs, as with the 2006 port's `OBJECT_REF_BASE` 200000+, ships miss the wind for the first
  subturn.

**Send the first turn after everyone's 602 as a 2609** with every object's wire state (ship
`[0,0,health,ammo,state,navX,navY,score,-1]`, wind `[beaufort]`, scoreboard `[avg1,avg2]`, …).
`UpdateParameters` then sets every internal field from the wire. The existing `resync` flag
(`h.resync = true` for all) does exactly this. Model the server's ships from the wire values.

### 8.2 Ship model changes in `pirates-engine.ts` terms
- `syncShip`: `params = [vx, vy, health, ammo, state, navX, navY, score, whirl]`, with `ammo: number`.
- Constants: `speed 700`, `turn 15`, `NAV_STOP 1000`, `maxHealth 5`, `maxAmmo 5`. There are no
  `SHIP_STATS` and no rowboat.
- `kill`: health 0. `loseHealth`: `max(0, h-1)`, with no destroyed guard. Event 13 applies only when
  `health > 0`.
- `awardScore(s, a)`: `score = max(0, score + a)`, then recompute the scoreboard averages (truncated
  integer division over every ship of the team). Call it for the shooter (+score) **and** the target
  (`-(score/2)`) on 13, for the killer on 6 and for the shooter on 14.
- Wind: `world.windDir/windStrength` must follow event 10 (`STRENGTH[beaufort]`). It is not constant 0
  here.
- Add the whirlpool branch (§3.1), `moveBall` against turrets/buildings (§3.2), sea monster (snap 20),
  whirlpool move (§3.6), and the 2005 powerup rule (§3.3). Drop flags, team bases and the Kraken.

### 8.3 Randomness the client computes itself
Three things use `CIterateSeed` with seeds that are not checksum seeds:
- the whirlpool throw row 17 (`turn + pos.x`),
- whirlpool `nextChange` (`IterateSeed(turn)`, the same seed as the checksum, so safe whenever the turn is
  safe),
- shrapnel (a chained iteration).

When the server's `iterateSeed` returns `null` for one of these, or for shrapnel always, compute with any
fixed reading and **schedule a 2609 for the next turn**. 2609 fully overwrites position, direction and
GameParams of balls, ships and whirlpools.

### 8.4 Server-designed rules (no surviving data)
These need choices or `VMK_*` knobs, documented as guesses like the 2006 ones:
- Wind change schedule. The XML fields are named but the client never reads them, and the Java logic is
  lost.
- Sea monster, whirlpool and moonlight timing. Use the `*FIXDLY`/`*RNDDLY`/`STAY` fields, as the 2006 port
  does.
- Sea monster bite: event 20 does 2 health, and a follow-up 6 is needed when that reaches 0.
- Turret aim and fire rate, building/turret health, the oil burn radius and burn rate.
- Broadside size. The client handles cannons 1–5 and charges one ball per broadside (on cannon 1). Five
  matches the "volley" and the 80–100° spread.
- Stage length (event 32) and the stage winner at time-out.
- Powerup spawn cadence.
- Score values: use the stage `<SCORES>`, i.e. HITENEMY 1000 → event 13 `score`, KILLEDENEMY 2000 → event 6
  `killerScore`, HITNPC/KILLEDNPC → event 14 / the kill of a fixture, SELFHIT −500, BAILOUT −15000 for
  leaving. This mapping is inferred from the names.

### 8.5 Messages to avoid in classic
2603 (broken), 2607's param trailer, 2615, and events 34–42. 2005 handles none of these.
