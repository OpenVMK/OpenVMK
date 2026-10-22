// vmk_hm_minigame.cct / CollisionEngineMathMethods / RipFurni

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RipFurni(_me: LingoMe, a_ar_mp_elemProps: LingoValue, a_mp_mp_furniMap: LingoValue, t_mp_specialCodes: LingoValue) {
  var tRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", "room")));
  var t_mp_sElements = tRoomContext.m_mp_sCls_mp_iRef_sKey["element"];
  var t_mp_mp_map = new LingoPropList([]);
  if (callNamed("voidp", t_mp_sElements)) {
  return;
  }

  for (var tID of t_mp_sElements.toArray()) {
  var tElement = tRoomContext.m_rChilds[tID];
  if (lingoBinary("neq", tElement.m_rParams["CLASS"], "element")) {
  callNamed("put", "ABORT! INVALID ELEMENT!")
  return 0;
  }

  var tCode = callNamed("value", tElement.m_rParams["TYPE"]);
  var tdir = callNamed("value", tElement.m_rParams["DIR"]);
  var tTile = callNamed("value", tElement.m_rFactor.m_rTile.m_rParams["REF"]);
  var tPos = callMethod("GetAbsPos", tElement);
  var ttype = symbol("Furni");
  if ((lingoTruthy(callNamed("voidp", callMethod("getaProp", t_mp_specialCodes, tCode))) ? 0 : 1)) {
  ttype = callMethod("getaProp", t_mp_specialCodes, tCode);
  }

  var tExtra = new LingoPropList([]);
  var t_HauntedMansionType = tElement.m_rParams["HAUNTEDMANSION_TYPE"];
  switch (t_HauntedMansionType) {
case "DOOR":
case "LOOP":
  if ((lingoTruthy(callNamed("voidp", tElement.m_rParams["HM_NAME"])) ? 0 : 1)) {
  var t_val = tElement.m_rParams["HM_NAME"];
  if (lingoBinary("gt", t_val.length, 0)) {
  tExtra["NAME"] = t_val;
  }

  }

  break;
  break;
  }

  var tStruct = tElement.m_rParams["STRUCT"];
  var tDir3 = undefined;
  for (var tChild of tStruct[symbol("child")].toArray()) {
  if (lingoBinary("and", lingoBinary("eq", tChild[symbol("type")], "DIR"), lingoBinary("eq", tChild[symbol("param")]["NUM"], "3"))) {
  tDir3 = tChild[symbol("child")];
  }

  }

  if (callNamed("voidp", callMethod("getaProp", a_mp_mp_furniMap, tCode))) {
  var t_ar_map = new LingoList([]);
  if ((lingoTruthy(callNamed("voidp", tDir3)) ? 0 : 1)) {
  for (var tBlk of tDir3.toArray()) {
  callMethod("append", t_ar_map, new LingoPropList(["X", tBlk[symbol("param")]["X"], "Y", tBlk[symbol("param")]["Y"]]))
  }

  } else {
  callMethod("append", t_ar_map, new LingoPropList(["X", 0, "Y", 0]))
  }

  callMethod("setaProp", a_mp_mp_furniMap, tCode, new LingoPropList([symbol("map"), t_ar_map, symbol("code"), tCode]))
  }

  callMethod("append", a_ar_mp_elemProps, new LingoPropList([symbol("code"), tCode, symbol("Dir"), tdir, symbol("tile"), tTile, symbol("type"), ttype, symbol("pos"), tPos, symbol("extra"), tExtra]))
  }

}

