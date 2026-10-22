// item_2355.cct / CCheckersTrickOpticalIllusion / SetPiece

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetPiece(_me: LingoMe, _this: LingoValue, a_rPiece: LingoValue) {
  callNamed("executeMessage", "PlayFxSound", "checkers-opticalillusion")
  callNamed("callAncestor", symbol("SetPiece"), _this, a_rPiece)
  var t_iTrick = 3;
  var t_sAnim = callNamed("getVariable", lingoBinary("join", "checkers.trick.anim.", t_iTrick));
  if (lingoBinary("and", callNamed("stringp", t_sAnim), lingoBinary("neq", t_sAnim, ""))) {
  var t_vPos = callMethod("GetScrPos", callMethod("getObject", a_rPiece));
  var t_rAnim = callMethod("getAnimation", _this);
  callMethod("LoadAnimData", t_rAnim, callNamed("value", callNamed("getMember", t_sAnim).text))
  callMethod("setPosition", t_rAnim, callNamed("point", t_vPos.x, t_vPos.y), lingoBinary("add", t_vPos.z, 1))
  callMethod("SetSelfDestruct", t_rAnim, 0)
  callMethod("start", t_rAnim)
  }

}

