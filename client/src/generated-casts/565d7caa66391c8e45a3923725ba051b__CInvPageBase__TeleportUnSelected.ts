// 565d7caa66391c8e45a3923725ba051b.cct / CInvPageBase / TeleportUnSelected

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TeleportUnSelected(_me: LingoMe, _this: LingoValue, a_iOtherID: LingoValue) {
  if (lingoBinary("eq", meProp(_me, "m_kCurPageName"), symbol("items"))) {
  callMethod("Unhighlight", meProp(_me, "m_rCurPageObj").m_rGridRenderer)
  }

}

