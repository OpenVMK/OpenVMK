// item_2355.cct / CCheckersGameEngine / RemovePlayer

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RemovePlayer(_me: LingoMe, _this: LingoValue, a_iAvatarRef: LingoValue, a_rMsg: LingoValue) {
  callMethod("deleteProp", meProp(_me, "m_rPlayers"), a_iAvatarRef)
  if (callNamed("objectp", meProp(_me, "m_rInterface"))) {
  callMethod("RemovePlayer", meProp(_me, "m_rInterface"), a_iAvatarRef)
  }

}

