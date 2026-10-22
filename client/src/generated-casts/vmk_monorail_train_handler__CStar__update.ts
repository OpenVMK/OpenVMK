// vmk_monorail_train_handler.cct / CStar / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  setMeProp(_me, "pWait", lingoBinary("sub", meProp(_me, "pWait"), 1));
  if (lingoBinary("lt", meProp(_me, "pWait"), 0)) {
  setMeProp(_me, "pTranslation", lingoBinary("add", meProp(_me, "pTranslation"), callNamed("point", meProp(_me, "vx"), meProp(_me, "vy"))));
  if (lingoBinary("and", lingoBinary("gt", meProp(_me, "pTranslation").locH, 800), lingoBinary("gt", meProp(_me, "pTranslation").locV, 600))) {
  callMethod("reset", _me)
  }

  }

}

