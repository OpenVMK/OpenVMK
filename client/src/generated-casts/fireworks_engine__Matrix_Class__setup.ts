// fireworks_engine.cct / Matrix Class / setup

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setup(_me: LingoMe, i_vUp: LingoValue) {
  meProp(_me, "vData")[1][2] = i_vUp.x;
  meProp(_me, "vData")[2][2] = i_vUp.y;
  meProp(_me, "vData")[3][2] = i_vUp.z;
}

