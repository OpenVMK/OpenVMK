// vmk_monorail_train_handler.cct / CStar / setSpeed

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setSpeed(_me: LingoMe, iSpeed: LingoValue) {
  setMeProp(_me, "pSpeed", lingoBinary("mul", iSpeed, meProp(_me, "pMaxSpeed")));
  setMeProp(_me, "vx", lingoBinary("mul", meProp(_me, "pSpeed"), callNamed("cos", meProp(_me, "pAngle"))));
  setMeProp(_me, "vy", lingoBinary("mul", meProp(_me, "pSpeed"), callNamed("sin", meProp(_me, "pAngle"))));
}

