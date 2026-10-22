// fireworks_engine.cct / Matrix Class / setForward

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setForward(_me: LingoMe, i_vForward: LingoValue) {
  meProp(_me, "vData")[1][3] = i_vForward.x;
  meProp(_me, "vData")[2][3] = i_vForward.y;
  meProp(_me, "vData")[3][3] = i_vForward.z;
}

