// item_2355.cct / CCheckersGameModule / ShowInterface

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowInterface(_me: LingoMe, _this: LingoValue, a_kType: LingoValue) {
  if ((lingoTruthy(callNamed("objectExists", meProp(_me, "m_sInterface"))) ? 0 : 1)) {
  callNamed("createObject", meProp(_me, "m_sInterface"), "CCheckersLobbyInterface")
  }

  callMethod("open", callNamed("getObject", meProp(_me, "m_sInterface")), a_kType)
}

