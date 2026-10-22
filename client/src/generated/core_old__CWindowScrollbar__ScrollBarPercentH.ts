// core.old.cct / CWindowScrollbar / ScrollBarPercentH

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ScrollBarPercentH(_me: LingoMe) {
  var tWidth = callNamed("float", lingoBinary("sub", meProp(_me, "pClientSourceRect").width, meProp(_me, "pViewClientRect").width));
  if (lingoBinary("eq", tWidth, 0)) {
  return 0;
  } else {
  var tPercent = lingoBinary("div", callNamed("float", meProp(_me, "pScrollOffset")), tWidth);
  if (lingoBinary("gt", tPercent, float(1))) {
  return float(1);
  } else {
  return tPercent;
  }

  }

}

