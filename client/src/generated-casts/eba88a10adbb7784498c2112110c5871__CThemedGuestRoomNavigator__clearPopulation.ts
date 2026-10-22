// eba88a10adbb7784498c2112110c5871.cct / CThemedGuestRoomNavigator / clearPopulation

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function clearPopulation(_me: LingoMe) {
  var tWnd = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  if (lingoBinary("neq", tWnd, 0)) {
  for (var i = 1; i <= 3; ++i) {
  var tElem = callMethod("getElement", tWnd, lingoBinary("join", "nav.roominfo.population", i));
  if (lingoBinary("neq", tElem, 0)) {
  callMethod("clearImage", tElem)
  }

  }

  }

}

