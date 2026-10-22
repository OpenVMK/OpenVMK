// vmk_monorail_train_handler.cct / CStar / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe, g: LingoValue) {
  if (lingoBinary("lt", meProp(_me, "pWait"), 0)) {
  if (lingoBinary("neq", meProp(_me, "pSprite"), 0)) {
  setThePropOf(meProp(_me, "pSprite"), "loc", lingoBinary("add", meProp(_me, "pOrigin"), meProp(_me, "pTranslation")));
  }

  }

}

