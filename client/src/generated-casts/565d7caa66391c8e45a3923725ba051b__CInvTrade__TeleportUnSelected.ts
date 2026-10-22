// 565d7caa66391c8e45a3923725ba051b.cct / CInvTrade / TeleportUnSelected

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TeleportUnSelected(_me: LingoMe, a_iOtherID: LingoValue) {
  callMethod("Unhighlight", meProp(_me, "m_rGridInvItems"))
  callMethod("Unhighlight", meProp(_me, "m_rGridOwnItems"))
  callMethod("Unhighlight", meProp(_me, "m_rGridHerItems"))
}

