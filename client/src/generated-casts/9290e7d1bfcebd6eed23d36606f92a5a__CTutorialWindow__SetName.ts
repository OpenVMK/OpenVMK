// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CTutorialWindow / SetName

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetName(_me: LingoMe, tName: LingoValue) {
  setMeProp(_me, "m_sTutorialTitle", tName);
}

