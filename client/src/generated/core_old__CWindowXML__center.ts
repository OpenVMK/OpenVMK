// core.old.cct / CWindowXML / center

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function center(_me: LingoMe, _this: LingoValue) {
  var t_iX = lingoBinary("sub", lingoBinary("div", lingoBinary("sub", theProperty("stageRight"), theProperty("stageLeft")), 2), lingoBinary("div", meProp(_me, "pwidth"), 2));
  var t_iY = lingoBinary("sub", lingoBinary("div", lingoBinary("sub", theProperty("stageBottom"), theProperty("stageTop")), 2), lingoBinary("div", meProp(_me, "pheight"), 2));
  return callMethod("moveTo", _this, t_iX, t_iY);
}

