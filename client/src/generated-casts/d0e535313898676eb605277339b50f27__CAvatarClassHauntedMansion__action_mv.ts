// d0e535313898676eb605277339b50f27.cct / CAvatarClassHauntedMansion / action_mv

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function action_mv(_me: LingoMe) {
  setMeProp(_me, "m_bActSit", 0);
  setMeProp(_me, "m_bActMv", 1);
  callNamed("call", symbol("defineActMultiple"), meProp(_me, "m_mpSortedParts"), "wlk", new LingoList(["ch", "lpn"]))
}

