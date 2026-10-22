// d0e535313898676eb605277339b50f27.cct / CAvatarRendererBU / ActLeftFoot

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ActLeftFoot(_me: LingoMe, a_iAct: LingoValue) {
  if (lingoBinary("and", lingoBinary("eq", meProp(_me, "m_iMagic"), 18), lingoBinary("eq", a_iAct, 1))) {
  setMeProp(_me, "m_sStatusLegs", "std");
  return;
  }

  if (lingoBinary("gt", meProp(_me, "m_iMagic"), 99)) {
  callNamed("call", symbol("defineActMultiple"), meProp(_me, "m_mpSortedParts"), "null", new LingoList(["llg", "lpn", "lsh"]))
  return 1;
  }

  switch (a_iAct) {
case 1:
  var t_sAct = "wlk";
  setMeProp(_me, "m_bActDnc", 0);
  callMethod("stopAnimation", _me)
  setMeProp(_me, "m_bActSit", 0);
  setMeProp(_me, "m_bActMv", 1);
  callNamed("call", symbol("defineActMultiple"), meProp(_me, "m_mpSortedParts"), "wlk", new LingoList(["lh", "ls", "llg", "lpn", "lsh", "rh", "rs", "rlg", "rpn", "rsh"]))
  break;
case 2:
  t_sAct = "dnc";
  callMethod("startAnimation", _me, "dance.aero")
  setMeProp(_me, "m_bActDnc", 1);
  break;
case 3:
case 4:
  t_sAct = "sit";
  setMeProp(_me, "m_bActDnc", 0);
  setMeProp(_me, "m_bActMv", 0);
  callMethod("stopAnimation", _me)
  setMeProp(_me, "m_bActSit", 1);
  callNamed("call", symbol("defineActMultiple"), meProp(_me, "m_mpSortedParts"), "sit", new LingoList(["tr"]))
  break;
case 5:
case 7:
case 10:
case 11:
  t_sAct = "null";
  break;
case 6:
case 8:
case 9:
  t_sAct = "sit";
  setMeProp(_me, "m_bActDnc", 0);
  callMethod("stopAnimation", _me)
  setMeProp(_me, "m_bActSit", 1);
  callNamed("call", symbol("defineActMultiple"), meProp(_me, "m_mpSortedParts"), "sit", new LingoList(["tr"]))
  break;
  default:
  t_sAct = "std";
  setMeProp(_me, "m_bActSit", 0);
  callMethod("stopAnimation", _me)
  break;
  break;
  break;
  break;
  break;
  break;
  }

  setMeProp(_me, "m_sStatusLegs", t_sAct);
  if (lingoBinary("and", lingoBinary("neq", t_sAct, "wlk"), lingoBinary("neq", t_sAct, "dnc"))) {
  callNamed("call", symbol("defineActMultiple"), meProp(_me, "m_mpSortedParts"), t_sAct, new LingoList(["llg", "lpn", "lsh"]))
  }

}

