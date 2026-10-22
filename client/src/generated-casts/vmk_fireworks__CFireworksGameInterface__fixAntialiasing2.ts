// vmk_fireworks.cct / CFireworksGameInterface / fixAntialiasing2

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function fixAntialiasing2(_me: LingoMe, tWndObj: LingoValue, tElemName: LingoValue, forceupdate: LingoValue) {
  if (callNamed("objectp", tWndObj)) {
  var tElem = callMethod("getElement", tWndObj, tElemName);
  if (lingoBinary("neq", tElem, 0)) {
  callMethod("deleteProp", tElem.pParams, symbol("ink"))
  callMethod("deleteProp", tElem.pParams, symbol("color"))
  callMethod("deleteProp", tElem.pParams, symbol("bgColor"))
  var tSprite = callMethod("getProperty", tElem, symbol("sprite"));
  if (lingoBinary("neq", tSprite, 0)) {
  setThePropOf(tSprite, "foreColor", 255);
  setThePropOf(tSprite, "bgColor", tElem.pTextMem.bgColor);
  }

  if (forceupdate) {
  callMethod("render", tElem)
  }

  return 1;
  }

  }

  return 0;
}

