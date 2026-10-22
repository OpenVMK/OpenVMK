// vmk_pirates_minigame.cct / CCloudField / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_ar_clouds", new LingoList([]));
  setMeProp(_me, "m_rPiraEng", callMethod("getComponent", callNamed("getThread", "piratesminigame")));
  setMeProp(_me, "m_rGameEng", callMethod("getComponent", callNamed("getThread", "minigame")));
  return 1;
}

