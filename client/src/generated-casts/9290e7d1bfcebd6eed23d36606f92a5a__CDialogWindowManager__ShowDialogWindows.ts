// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CDialogWindowManager / ShowDialogWindows

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowDialogWindows(_me: LingoMe) {
  for (var t_dialog of meProp(_me, "m_pDialogWindows").toArray()) {
  }

  callNamed("put", meProp(_me, "m_pDialogWindows"))
}

