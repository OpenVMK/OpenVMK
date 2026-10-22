// vmk_hm_minigame.cct / CHMGameInterface / SetNumber

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetNumber(_me: LingoMe, t_sWndName: LingoValue, tElemName: LingoValue, tmember: LingoValue) {
  tmember = callNamed("member", tmember);
  if (lingoBinary("lte", tmember._number, 0)) {
  return 0;
  }

  var tWndObj = callNamed("getWindow", t_sWndName);
  if (lingoBinary("neq", tWndObj, 0)) {
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

