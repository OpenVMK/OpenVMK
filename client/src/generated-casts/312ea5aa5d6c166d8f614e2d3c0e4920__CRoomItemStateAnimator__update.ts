// 312ea5aa5d6c166d8f614e2d3c0e4920.cct / CRoomItemStateAnimator / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

/**
 * HAND-CORRECTED (addition): an animated frame drawn for the MIRROR facing is
 * mirrored, the way the furnimap's `FLP="1"` mirrors the item's own sprites.
 *
 * The ANI reuses one facing's art for its mirror (the scoreboard's dir 3 plays
 * `item_40_0_0_5_3_<n>`), but the furnimap slot it lands in is often an
 * unmarked `<SPR GFX="null" />`. `CRoomVisualBlock.SetSprites` then sets
 * `flipH = integer(VOID)` and the swapped-in frame keeps it, so at dir 3 the
 * scoreboard's lit bars sat unmirrored on the wrong face of a mirrored body.
 * Same gap on 17, 33, 58, 69, 397 and 535. Items with dedicated art for the
 * facing (the RNG's `item_38_0_0_3_3_<n>`) name their own dir and are left alone.
 *
 * ⚠ Which facing is the mirror is the FURNIMAP's call, not the frame name's.
 * The scoreboard draws `_5_` art plain at dir 5 and FLP'd at dir 3; the
 * turnstiles (41/90/124-126) do the opposite — plain at 3, FLP'd at 5. A rule
 * of "`_5_` art at dir 3 flips" mirrored every turnstile's turn at dirs 3 and
 * 1. So the frame takes the flip of a sibling sprite in the same block showing
 * art of the same facing: that sibling's flipH is the furnimap's FLP for it.
 */
const ART_DIR = /_([1357])_\d+_\d+$/;
function mirrorForFacing(sprite: any, mem: any, _itemDir: LingoValue, siblings: any) {
  const artDir = ART_DIR.exec(String(mem?.name ?? ""))?.[1];
  if (artDir === undefined) return;
  for (const other of siblings?.toArray?.() ?? []) {
    if (other === sprite) continue;
    if (ART_DIR.exec(String(other?.member?.name ?? ""))?.[1] !== artDir) continue;
    setThePropOf(sprite, "flipH", lingoTruthy(thePropOf(other, "flipH")) ? 1 : 0);
    return;
  }
}

export function update(_me: LingoMe) {
  callNamed("callAncestor", symbol("update"), _me)
  var t_iDir = callMethod("GetParam", callMethod("getObject", _me), "DIR");
  if (lingoBinary("neq", t_iDir, meProp(_me, "m_iDir"))) {
  setMeProp(_me, "m_bReady", 0);
  }

  if ((lingoTruthy(meProp(_me, "m_bReady")) ? 0 : 1)) {
  callMethod("Init", _me)
  }

  if (meProp(_me, "m_bReady")) {
  if (lingoBinary("eq", meProp(_me, "m_iDelay"), 1)) {
  var t_rItem = callMethod("getObject", _me);
  var t_fFloorSize = callNamed("float", callMethod("GetParam", callMethod("_AccessRoom", callNamed("getThread", symbol("room")).component), "TILESIZE"));
  var t_fItemSize = callNamed("float", callMethod("GetParam", t_rItem, "STRUCT")[symbol("param")]["TILESIZE"]);
  if (callNamed("voidp", t_fItemSize)) {
  t_fItemSize = float(32);
  }

  var t_fScaling = undefined;
  if (lingoBinary("neq", t_fItemSize, t_fFloorSize)) {
  t_fScaling = lingoBinary("div", t_fFloorSize, t_fItemSize);
  }

  for (var t_rBlk of meProp(_me, "m_ar_frames").toArray()) {
  if (lingoBinary("gte", _me.m_ar_sKey.count, t_rBlk[symbol("num")])) {
  var t_sKey = _me.m_ar_sKey[t_rBlk[symbol("num")]];
  var t_rBlock = callMethod("GetObjByKey", callMethod("GetContext", t_rItem), t_sKey);
  var t_arSprites = callMethod("GetSprites", callMethod("GetVisual", t_rBlock));
  if (lingoBinary("gt", t_arSprites.count, 0)) {
  for (var t_rSpr of t_rBlk[symbol("sprites")].toArray()) {
  if (lingoBinary("gte", t_arSprites.count, t_rSpr[symbol("num")])) {
  var t_rSprite = t_arSprites[t_rSpr[symbol("num")]];
  var t_iCurFrame = t_rSpr[symbol("index")];
  var t_rMem = t_rSpr[symbol("frames")][t_iCurFrame];
  if (lingoBinary("neq", t_rSprite.member, t_rMem)) {
  setThePropOf(t_rSprite, "member", t_rMem);
  if (lingoBinary("neq", t_fScaling, undefined)) {
  setThePropOf(t_rSprite, "width", lingoBinary("mul", t_rMem.width, t_fScaling));
  setThePropOf(t_rSprite, "height", lingoBinary("mul", t_rMem.height, t_fScaling));
  } else {
  setThePropOf(t_rSprite, "width", t_rMem.width);
  setThePropOf(t_rSprite, "height", t_rMem.height);
  }

  mirrorForFacing(t_rSprite, t_rMem, t_iDir, t_arSprites);
  }

  setThePropOf(t_rSprite, "blend", 100);
  var t_iLooped = 0;
  var t_sEvent = callMethod("getaProp", t_rSpr[symbol("events")], callNamed("string", t_iCurFrame));
  if ((lingoTruthy(callNamed("voidp", t_sEvent)) ? 0 : 1)) {
  switch (t_sEvent.word[1]) {
case "stop":
  t_rSpr[symbol("mode")] = symbol("stopped");
  break;
case "goto":
  if (lingoBinary("eq", t_iCurFrame, t_rSpr[symbol("frames")].count)) {
  t_iLooped = 1;
  }

  t_iCurFrame = lingoBinary("sub", callNamed("integer", t_sEvent.word[2]), 1);
  break;
case "wait":
  if (lingoBinary("eq", t_rSpr[symbol("mode")], symbol("playing"))) {
  t_rSpr[symbol("mode")] = t_sEvent;
  }

  var t_iTimeLeft = lingoBinary("sub", callNamed("integer", t_rSpr[symbol("mode")].word[2]), 1);
  if (lingoBinary("gt", t_iTimeLeft, 0)) {
  t_rSpr[symbol("mode")] = lingoBinary("joinPad", "wait", t_iTimeLeft);
  } else {
  t_rSpr[symbol("mode")] = symbol("playing");
  }

  break;
case "random":
  t_rSpr[symbol("mode")] = symbol("stopped");
  t_iCurFrame = callNamed("random", t_rSpr[symbol("frames")].count);
  t_rMem = t_rSpr[symbol("frames")][t_iCurFrame];
  if (lingoBinary("neq", t_rSprite.member, t_rMem)) {
  setThePropOf(t_rSprite, "member", t_rMem);
  setThePropOf(t_rSprite, "width", t_rMem.width);
  setThePropOf(t_rSprite, "height", t_rMem.height);
  mirrorForFacing(t_rSprite, t_rMem, t_iDir, t_arSprites);
  }

  break;
case "sound":
  callNamed("executeMessage", "PlayFxSound", t_sEvent.word[2], "cut")
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Unknown item-animation event", t_sEvent))
  }

  }

  if (lingoBinary("eq", t_rSpr[symbol("mode")], symbol("playing"))) {
  t_iCurFrame = lingoBinary("add", t_iCurFrame, 1);
  if (lingoBinary("gt", t_iCurFrame, t_rSpr[symbol("frames")].count)) {
  t_iCurFrame = 1;
  t_iLooped = 1;
  }

  }

  if (t_iLooped) {
  t_rSpr[symbol("loops")] = lingoBinary("add", t_rSpr[symbol("loops")], 1);
  }

  t_rSpr[symbol("index")] = t_iCurFrame;
  continue;
  }

  callNamed("put", lingoBinary("joinPad", "Furnimap and Animation out of sync!", callMethod("GetParam", t_rItem, "TYPE")))
  }

  }

  }

  }

  }

  setMeProp(_me, "m_iDelay", lingoBinary("add", meProp(_me, "m_iDelay"), 1));
  if (lingoBinary("gt", meProp(_me, "m_iDelay"), meProp(_me, "m_iMaxDelay"))) {
  setMeProp(_me, "m_iDelay", 1);
  }

  if (lingoBinary("gt", meProp(_me, "m_iLoop"), 0)) {
  if (callMethod("loopsReached", _me)) {
  callMethod("setState", _me, 0, 1)
  }

  }

  }

}

