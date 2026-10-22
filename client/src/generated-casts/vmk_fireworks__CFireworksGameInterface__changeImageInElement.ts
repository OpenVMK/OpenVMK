// vmk_fireworks.cct / CFireworksGameInterface / changeImageInElement

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function changeImageInElement(_me: LingoMe, tWndObj: LingoValue, tElemName: LingoValue, tmember: LingoValue) {
  if (callNamed("objectp", tWndObj)) {
  var tElem = callMethod("getElement", tWndObj, tElemName);
  if (lingoBinary("neq", tElem, 0)) {
  var tSprite = callMethod("getProperty", tElem, symbol("sprite"));
  if (lingoBinary("neq", tSprite, 0)) {
  setThePropOf(tSprite, "ink", 8);
  setThePropOf(tSprite, "member", tmember);
  setThePropOf(tSprite, "width", tmember.width);
  setThePropOf(tSprite, "height", tmember.height);
  }

  }

  }

}

