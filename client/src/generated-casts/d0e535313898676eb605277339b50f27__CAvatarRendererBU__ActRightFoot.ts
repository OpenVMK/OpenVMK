// d0e535313898676eb605277339b50f27.cct / CAvatarRendererBU / ActRightFoot

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ActRightFoot(_me: LingoMe, a_iAct: LingoValue) {
  if (lingoBinary("eq", meProp(_me, "m_iMagic"), 18)) {
  if (lingoBinary("or", lingoBinary("eq", a_iAct, 1), lingoBinary("eq", a_iAct, 2))) {
  setMeProp(_me, "m_sSPaceWalkAct", "wlk");
  } else {
  setMeProp(_me, "m_sSPaceWalkAct", undefined);
  }

  }

  if (lingoBinary("gt", meProp(_me, "m_iMagic"), 99)) {
  callNamed("call", symbol("defineActMultiple"), meProp(_me, "m_mpSortedParts"), "null", new LingoList(["rlg", "rpn", "rsh"]))
  return 1;
  }

  switch (a_iAct) {
case 1:
  var t_sAct = "wlk";
  break;
case 2:
  t_sAct = "dnc";
  break;
case 3:
case 4:
case 6:
case 8:
case 9:
  t_sAct = "sit";
  break;
case 5:
case 7:
case 10:
case 11:
  t_sAct = "null";
  break;
  default:
  t_sAct = "std";
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  }

  if (lingoBinary("gt", meProp(_me, "m_iMagic"), 99)) {
  t_sAct = "null";
  }

  if (lingoBinary("and", lingoBinary("neq", t_sAct, "wlk"), lingoBinary("neq", t_sAct, "dnc"))) {
  callNamed("call", symbol("defineActMultiple"), meProp(_me, "m_mpSortedParts"), t_sAct, new LingoList(["rlg", "rpn", "rsh"]))
  }

}

