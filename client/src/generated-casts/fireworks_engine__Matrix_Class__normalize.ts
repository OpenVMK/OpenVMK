// fireworks_engine.cct / Matrix Class / normalize

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function normalize(_me: LingoMe) {
  var t_rightVector = callNamed("vector", meProp(_me, "vData")[1][1], meProp(_me, "vData")[2][1], meProp(_me, "vData")[3][1]);
  var t_upVector = callNamed("vector", meProp(_me, "vData")[1][2], meProp(_me, "vData")[2][2], meProp(_me, "vData")[3][2]);
  var t_frontVector = callNamed("vector", meProp(_me, "vData")[1][3], meProp(_me, "vData")[2][3], meProp(_me, "vData")[3][3]);
  callMethod("normalize", t_rightVector)
  callMethod("normalize", t_upVector)
  callMethod("normalize", t_frontVector)
  meProp(_me, "vData")[1][1] = t_rightVector.x;
  meProp(_me, "vData")[2][1] = t_rightVector.y;
  meProp(_me, "vData")[3][1] = t_rightVector.z;
  meProp(_me, "vData")[1][2] = t_upVector.x;
  meProp(_me, "vData")[2][2] = t_upVector.y;
  meProp(_me, "vData")[3][2] = t_upVector.z;
  meProp(_me, "vData")[1][3] = t_frontVector.x;
  meProp(_me, "vData")[2][3] = t_frontVector.y;
  meProp(_me, "vData")[3][3] = t_frontVector.z;
}

