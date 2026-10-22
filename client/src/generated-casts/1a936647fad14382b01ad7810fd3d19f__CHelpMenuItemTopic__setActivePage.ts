// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpMenuItemTopic / setActivePage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setActivePage(_me: LingoMe, i: LingoValue) {
  if (callNamed("voidp", i)) {
  i = 1;
  }

  if (lingoBinary("gt", i, meProp(_me, "pages").count)) {
  i = meProp(_me, "pages").count;
  }

  setMeProp(_me, "activePage", i);
}

