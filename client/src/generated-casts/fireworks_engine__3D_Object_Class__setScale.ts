// fireworks_engine.cct / 3D Object Class / setScale

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setScale(_me: LingoMe, p_scale: LingoValue) {
  meProp(_me, "m_pTransformMtx").vData[1][1] = p_scale.x;
  meProp(_me, "m_pTransformMtx").vData[2][2] = p_scale.y;
  meProp(_me, "m_pTransformMtx").vData[3][3] = p_scale.z;
  setMeProp(_me, "m_bWorldTransformValid", 0);
}

