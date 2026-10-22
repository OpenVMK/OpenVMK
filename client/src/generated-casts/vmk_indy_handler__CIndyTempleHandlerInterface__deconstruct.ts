// vmk_indy_handler.cct / CIndyTempleHandlerInterface / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("removeUpdate", callMethod("getID", _me))
  for (var tBoat of meProp(_me, "m_ar_rBoats").toArray()) {
  callNamed("RemoveRoomObject", "boat", callMethod("GetParam", tBoat, "Reference"))
  }

  return 1;
}

