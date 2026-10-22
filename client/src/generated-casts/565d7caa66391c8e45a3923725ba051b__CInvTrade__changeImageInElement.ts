// 565d7caa66391c8e45a3923725ba051b.cct / CInvTrade / changeImageInElement

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
  setThePropOf(tSprite, "ink", 36);
  setThePropOf(tSprite.member, "image", tmember.image);
  setThePropOf(tSprite.member, "regPoint", tmember.regPoint);
  setThePropOf(tSprite, "width", tmember.width);
  setThePropOf(tSprite, "height", tmember.height);
  }

  }

  }

}

