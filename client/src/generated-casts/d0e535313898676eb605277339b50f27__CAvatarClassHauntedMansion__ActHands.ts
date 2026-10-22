// d0e535313898676eb605277339b50f27.cct / CAvatarClassHauntedMansion / ActHands

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ActHands(_me: LingoMe, a_iAct: LingoValue) {
  var m_bBeamState = 0;
  var t_sAct = "std";
  setMeProp(_me, "m_iItemHands", undefined);
  switch (a_iAct) {
case 1:
  t_sAct = "wlk";
  break;
case 12:
  t_sAct = "rtl";
  setMeProp(_me, "m_bActRtl", 1);
  break;
case 13:
  t_sAct = "cth";
  setMeProp(_me, "m_bActCrr", 1);
  setMeProp(_me, "m_bActCth", 1);
  m_bBeamState = 1;
  break;
  default:
  t_sAct = "std";
  setMeProp(_me, "m_bActSit", 0);
  }

  setMeProp(_me, "m_sStatusHands", t_sAct);
  if (lingoBinary("neq", t_sAct, "wlk")) {
  callNamed("call", symbol("defineActMultiple"), meProp(_me, "m_mpSortedParts"), t_sAct, new LingoList(["ch", "lpn", "rpn", "ri"]))
  }

}

