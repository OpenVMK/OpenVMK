// d0e535313898676eb605277339b50f27.cct / CAvatarClassHauntedMansion / Refresh

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Refresh(_me: LingoMe, tDirHead: LingoValue, tDirBody: LingoValue) {
  if (meProp(_me, "m_bActSit")) {
  var t_bSit = 1;
  }

  setMeProp(_me, "m_bActMv", 0);
  setMeProp(_me, "m_bActTlk", 0);
  setMeProp(_me, "m_bActRtl", 0);
  setMeProp(_me, "m_bActCth", 0);
  setMeProp(_me, "m_bActTlk", 0);
  setMeProp(_me, "m_bAnimating", 0);
  callMethod("arrangeParts", _me)
  setMeProp(_me, "m_iLocFix", callNamed("point", -float(1), 2));
  callNamed("call", symbol("defineDirMultiple"), meProp(_me, "m_mpSortedParts"), meProp(_me, "m_iBdDir"), new LingoList(["ch", "lpn"]))
  callNamed("call", symbol("defineDirMultiple"), meProp(_me, "m_mpSortedParts"), meProp(_me, "m_iHeadDir"), new LingoList(["hd", "hr", "ey", "fc", "ht"]))
  callNamed("call", symbol("reset"), meProp(_me, "m_mpSortedParts"))
  setMeProp(_me, "m_bChanges", 1);
}

