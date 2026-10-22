// vmk_furniture_code.cct / CItemAniStructure / returnAnimatedBlocks

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function returnAnimatedBlocks(_me: LingoMe, a_iState: LingoValue, a_iDirection: LingoValue, a_ar_props: LingoValue) {
  a_ar_props[symbol("condition")] = "";
  a_ar_props[symbol("sound")] = "";
  a_ar_props[symbol("loop")] = 0;
  var t_rXML = meProp(_me, "m_rStructure");
  if (callNamed("objectp", t_rXML)) {
  var t_animation = new LingoList([]);
  if (callMethod("Search", t_rXML, "type", "ANI", 1)) {
  var t_iMaxDelay = callNamed("value", callMethod("GetNode", t_rXML).param["DELAY"]);
  a_ar_props[symbol("delay")] = callNamed("max", 1, t_iMaxDelay);
  for (var tstate of callMethod("GetNode", t_rXML).child.toArray()) {
  switch (tstate._type) {
case "STATE":
  var tPos = callMethod("findPos", tstate.param, "NUM");
  var t_bContinue = 0;
  if (lingoBinary("neq", tPos, 0)) {
  var tParamValue = callNamed("value", tstate.param[tPos]);
  if (lingoBinary("eq", tParamValue, a_iState)) {
  t_bContinue = 1;
  }

  }

  if (t_bContinue) {
  tPos = callMethod("findPos", tstate.param, "SOUND");
  if (lingoBinary("neq", tPos, 0)) {
  a_ar_props[symbol("sound")] = tstate.param["SOUND"];
  }

  tPos = callMethod("findPos", tstate.param, "LOOP");
  if (lingoBinary("neq", tPos, 0)) {
  a_ar_props[symbol("loop")] = callNamed("value", tstate.param["LOOP"]);
  }

  for (var tDirection of tstate.child.toArray()) {
  switch (tDirection[symbol("type")]) {
case "DIR":
  tPos = callMethod("findPos", tDirection.param, "NUM");
  t_bContinue = 0;
  if (lingoBinary("neq", tPos, 0)) {
  tParamValue = callNamed("value", tDirection.param[tPos]);
  if (lingoBinary("eq", tParamValue, a_iDirection)) {
  t_bContinue = 1;
  }

  }

  if (t_bContinue) {
  tPos = callMethod("findPos", tstate.param, "CONDITION");
  if (lingoBinary("neq", tPos, 0)) {
  a_ar_props[symbol("condition")] = tstate.param["CONDITION"];
  }

  for (var tBlock of tDirection.child.toArray()) {
  switch (tBlock[symbol("type")]) {
case "BLK":
  var t_ar_block = new LingoPropList([]);
  t_ar_block[symbol("num")] = callNamed("value", tBlock.param["NUM"]);
  t_ar_block[symbol("sprites")] = new LingoList([]);
  for (var tSprite of tBlock.child.toArray()) {
  switch (tSprite._type) {
case "SPR":
  var t_ar_sprite = new LingoPropList([]);
  t_ar_sprite[symbol("mode")] = symbol("playing");
  t_ar_sprite[symbol("num")] = callNamed("value", tSprite.param["NUM"]);
  t_ar_sprite[symbol("index")] = 1;
  t_ar_sprite[symbol("loops")] = 0;
  t_ar_sprite[symbol("frames")] = new LingoList([]);
  t_ar_sprite[symbol("events")] = new LingoPropList([]);
  for (var tKeyframe of tSprite.child.toArray()) {
  switch (tKeyframe._type) {
case "FRAME":
  var t_sMem = tKeyframe.param["MEMBER"];
  if (callNamed("objectp", t_sMem)) {
  var t_rMem = t_sMem;
  } else {
  t_rMem = callNamed("getMember", t_sMem);
  if (lingoBinary("lte", t_rMem._number, 0)) {
  callNamed("put", lingoBinary("joinPad", "Could not find anim-mbr", t_sMem))
  t_rMem = callNamed("getMember", "null");
  }

  tKeyframe.param["MEMBER"] = t_rMem;
  }

  callMethod("append", t_ar_sprite[symbol("frames")], t_rMem)
  break;
case "EVENT":
  var t_sFrame = callNamed("string", t_ar_sprite[symbol("frames")].count);
  t_ar_sprite[symbol("events")][t_sFrame] = tKeyframe.param["VALUE"];
  break;
  }

  }

  callMethod("append", t_ar_block[symbol("sprites")], t_ar_sprite)
  break;
  }

  }

  if (lingoBinary("gt", t_ar_block[symbol("sprites")].count, 0)) {
  callMethod("append", t_animation, t_ar_block)
  }

  break;
  }

  }

  a_ar_props[symbol("frames")] = callMethod("duplicate", t_animation);
  return 1;
  }

  break;
  }

  }

  }

  break;
  }

  }

  return 0;
  } else {
  return 0;
  }

  } else {
  return 0;
  }

}

