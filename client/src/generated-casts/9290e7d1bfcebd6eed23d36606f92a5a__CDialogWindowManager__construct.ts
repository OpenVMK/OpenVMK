// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CDialogWindowManager / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_pDialogWindows", new LingoPropList([]));
  setMeProp(_me, "m_pNPCDialogWindows", new LingoPropList([]));
  setMeProp(_me, "m_pTutorialWindows", new LingoPropList([]));
  return 1;
}

