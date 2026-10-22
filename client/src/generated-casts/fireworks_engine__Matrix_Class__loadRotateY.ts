// fireworks_engine.cct / Matrix Class / loadRotateY

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function loadRotateY(_me: LingoMe, angle: LingoValue) {
  meProp(_me, "vData")[1] = new LingoList([callNamed("cos", angle), 0, -float(callNamed("sin", angle)), 0]);
  meProp(_me, "vData")[2] = new LingoList([0, 1, 0, 0]);
  meProp(_me, "vData")[3] = new LingoList([callNamed("sin", angle), 0, callNamed("cos", angle), 0]);
  meProp(_me, "vData")[4] = new LingoList([0, 0, 0, 1]);
}

