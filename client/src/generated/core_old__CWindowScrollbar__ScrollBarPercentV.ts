// core.old.cct / CWindowScrollbar / ScrollBarPercentV

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ScrollBarPercentV(_me: LingoMe) {
  var tHeight = callNamed("float", lingoBinary("sub", meProp(_me, "pClientSourceRect").height, meProp(_me, "pViewClientRect").height));
  if (lingoBinary("eq", tHeight, 0)) {
  return 0;
  } else {
  var tPercent = lingoBinary("div", callNamed("float", meProp(_me, "pScrollOffset")), tHeight);
  if (lingoBinary("gt", tPercent, float(1))) {
  return float(1);
  } else {
  return tPercent;
  }

  }

}

