// vmk_hm_minigame.cct / CHMDoor / SwingDoor

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SwingDoor(_me: LingoMe) {
  callMethod("openDoor", _me)
  callNamed("createTimeout", callNamed("symbol", lingoBinary("join", "swingdoor", meProp(_me, "m_sDoorName"))), 1000, symbol("closeDoor"), callMethod("getID", _me), undefined, 1)
}

