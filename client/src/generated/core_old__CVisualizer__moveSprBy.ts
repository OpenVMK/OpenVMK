// core.old.cct / CVisualizer / moveSprBy

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function moveSprBy(_me: LingoMe, tID: LingoValue, tX: LingoValue, tY: LingoValue) {
  var tSprite = meProp(_me, "pActSprList")[tID];
  if (callNamed("voidp", tSprite)) {
  return callNamed("error", _me, lingoBinary("joinPad", "Sprite not found:", tID), symbol("moveSprBy"));
  }

  setThePropOf(tSprite, "loc", lingoBinary("add", tSprite.loc, new LingoList([tX, tY])));
  return callMethod("Refresh", _me);
}

