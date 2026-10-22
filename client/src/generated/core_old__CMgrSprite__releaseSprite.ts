// core.old.cct / CMgrSprite / releaseSprite

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function releaseSprite(_me: LingoMe, tSprNum: LingoValue) {
  if (lingoBinary("lt", callMethod("getPos", meProp(_me, "pTotalSprList"), tSprNum), 1)) {
  return callNamed("error", _me, lingoBinary("joinPad", "Sprite not marked as usable:", tSprNum), symbol("releaseSprite"));
  }

  if (lingoBinary("gt", callMethod("getPos", meProp(_me, "pFreeSprList"), tSprNum), 0)) {
  return callNamed("error", _me, lingoBinary("joinPad", "Attempting to release free sprite!", tSprNum), symbol("releaseSprite"));
  }

  var tSprite = callNamed("sprite", tSprNum);
  callMethod("resetSpriteProps", _me, tSprNum)
  setThePropOf(tSprite, "puppet", 0);
  callMethod("append", meProp(_me, "pFreeSprList"), tSprNum)
  meProp(_me, "pClientList")[tSprNum] = 0;
  return 1;
}

