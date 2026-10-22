// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CDialogWindowManager / ShowNPCDialogWindows

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowNPCDialogWindows(_me: LingoMe) {
  for (var t_dialog of meProp(_me, "m_pNPCDialogWindows").toArray()) {
  }

  callNamed("put", meProp(_me, "m_pNPCDialogWindows"))
}

