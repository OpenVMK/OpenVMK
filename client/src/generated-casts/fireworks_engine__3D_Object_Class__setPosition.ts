// fireworks_engine.cct / 3D Object Class / setPosition

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setPosition(_me: LingoMe, p_position: LingoValue) {
  callMethod("setRow", meProp(_me, "m_pTransformMtx"), 4, new LingoList([p_position.x, p_position.y, p_position.z, 1]))
}

