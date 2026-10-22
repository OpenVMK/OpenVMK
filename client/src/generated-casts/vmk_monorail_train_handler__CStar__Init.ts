// vmk_monorail_train_handler.cct / CStar / Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Init(_me: LingoMe, iType: LingoValue) {
  switch (iType) {
case 1:
  setMeProp(_me, "pSpeed", lingoBinary("add", callNamed("random", 10), 10));
  setMeProp(_me, "pImg", callMethod("duplicate", callNamed("member", "viuh_faded").image));
  break;
  default:
  setMeProp(_me, "pSpeed", lingoBinary("add", callNamed("random", 6), 6));
  setMeProp(_me, "pImg", callMethod("duplicate", callNamed("member", "viuh").image));
  }

  setMeProp(_me, "pMaxSpeed", meProp(_me, "pSpeed"));
  setMeProp(_me, "pAngle", lingoBinary("div", lingoBinary("mul", 28, callNamed("pi")), float(180)));
  callMethod("reset", _me)
  callMethod("setSpeed", _me, 0)
}

