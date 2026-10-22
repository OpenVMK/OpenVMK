// fireworks_engine.cct / Matrix Class / setRight

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setRight(_me: LingoMe, i_vRight: LingoValue) {
  meProp(_me, "vData")[1][1] = i_vRight.x;
  meProp(_me, "vData")[2][1] = i_vRight.y;
  meProp(_me, "vData")[3][1] = i_vRight.z;
}

