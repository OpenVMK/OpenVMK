// d0e535313898676eb605277339b50f27.cct / CAvatarClassHauntedMansion / ActFeet

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ActFeet(_me: LingoMe, a_iAct: LingoValue) {
  switch (a_iAct) {
case 1:
  var t_sAct = "wlk";
  var m_bActDnc = 0;
  callMethod("stopAnimation", _me)
  callMethod("action_mv", _me)
  break;
case 2:
  t_sAct = "dnc";
  callMethod("startAnimation", _me, "dance.aero")
  m_bActDnc = 1;
  break;
case 3:
case 4:
  t_sAct = "sit";
  m_bActDnc = 0;
  callMethod("stopAnimation", _me)
  callMethod("action_sit", _me)
  break;
  default:
  t_sAct = "std";
  setMeProp(_me, "m_bActSit", 0);
  callMethod("stopAnimation", _me)
  break;
  }

  setMeProp(_me, "m_sStatusLegs", t_sAct);
  if (lingoBinary("and", lingoBinary("neq", t_sAct, "wlk"), lingoBinary("neq", t_sAct, "dnc"))) {
  callNamed("call", symbol("defineActMultiple"), meProp(_me, "m_mpSortedParts"), t_sAct, new LingoList(["rpn", "lpn", "ch"]))
  }

}

