// d0e535313898676eb605277339b50f27.cct / CAvatarFactor / ShowHideAvatarName

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowHideAvatarName(_me: LingoMe, a_kEvent: LingoValue) {
  if (lingoBinary("and", (lingoTruthy(meProp(_me, "m_bMinigameRunning")) ? 0 : 1), lingoBinary("neq", meProp(_me, "m_iCurrentMagic"), 16))) {
  if (callNamed("objectp", meProp(_me, "m_ObjRenderer"))) {
  callMethod("ShowName", meProp(_me, "m_ObjRenderer"), meProp(_me, "m_sAvatarName"), a_kEvent)
  }

  }

}

