// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CNPCDialogWindow / hide

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function hide(_me: LingoMe) {
  if (lingoBinary("neq", callNamed("getWindow", meProp(_me, "m_wWindowTitle")), 0)) {
  callNamed("removeWindow", meProp(_me, "m_wWindowTitle"))
  }

}

