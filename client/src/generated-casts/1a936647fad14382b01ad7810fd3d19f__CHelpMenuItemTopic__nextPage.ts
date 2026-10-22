// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpMenuItemTopic / nextPage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function nextPage(_me: LingoMe) {
  if (lingoBinary("lt", meProp(_me, "activePage"), meProp(_me, "pages").count)) {
  setMeProp(_me, "activePage", lingoBinary("add", meProp(_me, "activePage"), 1));
  }

}

