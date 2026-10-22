// vmk_monorail_train_handler.cct / CStar / reset

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function reset(_me: LingoMe) {
  setMeProp(_me, "pWait", callNamed("random", 60));
  setMeProp(_me, "pTranslation", callNamed("point", -float(meProp(_me, "pImg").rect.width), -float(meProp(_me, "pImg").rect.height)));
  switch (callNamed("random", 2)) {
case 1:
  setMeProp(_me, "pOrigin", callNamed("point", lingoBinary("add", callNamed("random", 450), 350), 0));
  break;
case 2:
  setMeProp(_me, "pOrigin", callNamed("point", 0, lingoBinary("add", callNamed("random", 250), 350)));
  break;
  }

}

