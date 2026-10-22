// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpMenuItemTopic / previousPage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function previousPage(_me: LingoMe) {
  if (lingoBinary("gt", meProp(_me, "activePage"), 1)) {
  setMeProp(_me, "activePage", lingoBinary("sub", meProp(_me, "activePage"), 1));
  }

}

