// fireworks_engine.cct / 3D Object Class / AlignForward

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AlignForward(_me: LingoMe, i_vNewFwd: LingoValue) {
  var tFwd = callMethod("duplicate", i_vNewFwd);
  callMethod("normalize", tFwd)
  callMethod("setForward", meProp(_me, "m_pTransformMtx"), tFwd)
  callMethod("orthonormalize", meProp(_me, "m_pTransformMtx"), symbol("forward"))
  setMeProp(_me, "m_bWorldTransformValid", 0);
}

