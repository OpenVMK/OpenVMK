// fireworks_engine.cct / Matrix Class / loadRotateX

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function loadRotateX(_me: LingoMe, angle: LingoValue) {
  meProp(_me, "vData")[1] = new LingoList([1, 0, 0, 0]);
  meProp(_me, "vData")[2] = new LingoList([0, callNamed("cos", angle), callNamed("sin", angle), 0]);
  meProp(_me, "vData")[3] = new LingoList([0, -float(callNamed("sin", angle)), callNamed("cos", angle), 0]);
  meProp(_me, "vData")[4] = new LingoList([0, 0, 0, 1]);
}

