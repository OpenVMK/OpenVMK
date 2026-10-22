// vmk_tutorial.cct / CTutorial / GetSomethingToSay

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetSomethingToSay(_me: LingoMe) {
  var tOut = new LingoPropList([]);
  if (lingoBinary("gt", meProp(_me, "m_mp_sayBuffer").count, 0)) {
  tOut = meProp(_me, "m_mp_sayBuffer");
  }

  setMeProp(_me, "m_mp_sayBuffer", new LingoPropList([]));
  return tOut;
}

