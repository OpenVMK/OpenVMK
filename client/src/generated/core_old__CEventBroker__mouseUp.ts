// core.old.cct / CEventBroker / mouseUp

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function mouseUp(_me: LingoMe, _this: LingoValue) {
  if (!lingoTruthy(callNamed("voidp", meProp(_me, "pLink")))) {
  callMethod("openNetPage", callNamed("getSpecialServices"), meProp(_me, "pLink"))
  }

  if (callMethod("redirectEvent", _this, symbol("mouseUp"))) {
  callNamed("stopEvent")
  return 1;
  } else {
  callNamed("pass")
  return 0;
  }

}

