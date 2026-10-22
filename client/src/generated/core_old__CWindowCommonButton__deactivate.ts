// core.old.cct / CWindowCommonButton / deactivate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deactivate(_me: LingoMe) {
  callMethod("changeState", _me, symbol("up"))
  setThePropOf(_me.pSprite, "blend", 50);
  setMeProp(_me, "pBlend", 50);
  return 1;
}

