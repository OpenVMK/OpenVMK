// vmk_fireworks_minigame.cct / CFireworksGameInterface / getElementMember

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getElementMember(_me: LingoMe, tWndObj: LingoValue, tElemName: LingoValue) {
  if (callNamed("objectp", tWndObj)) {
  var tElem = callMethod("getElement", tWndObj, tElemName);
  if (lingoBinary("neq", tElem, 0)) {
  var tSprite = callMethod("getProperty", tElem, symbol("sprite"));
  if (lingoBinary("neq", tSprite, 0)) {
  return tSprite.member;
  }

  }

  }

  return callNamed("member", "null");
}

