// core.old.cct / CMgrSprite / reserveSprite

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function reserveSprite(_me: LingoMe, tClientID: LingoValue) {
  if (lingoBinary("eq", meProp(_me, "pFreeSprList").count, 0)) {
  return callNamed("error", _me, "Out of free sprite channels!", symbol("reserveSprite"));
  }

  var tSprNum = meProp(_me, "pFreeSprList")[1];
  var tSprite = callNamed("sprite", tSprNum);
  callMethod("deleteAt", meProp(_me, "pFreeSprList"), 1)
  setThePropOf(tSprite, "puppet", 1);
  callMethod("resetSpriteProps", _me, tSprNum)
  setThePropOf(tSprite, "locZ", tSprNum);
  setThePropOf(tSprite, "locV", -float(1000));
  setThePropOf(tSprite, "visible", 1);
  meProp(_me, "pClientList")[tSprNum] = tClientID;
  return tSprNum;
}

