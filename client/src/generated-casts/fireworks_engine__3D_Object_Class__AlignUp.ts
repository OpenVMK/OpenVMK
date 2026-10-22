// fireworks_engine.cct / 3D Object Class / AlignUp

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AlignUp(_me: LingoMe, i_vNewUp: LingoValue) {
  var tUp = callMethod("duplicate", i_vNewUp);
  callMethod("normalize", tUp)
  callMethod("setup", meProp(_me, "m_pTransformMtx"), tUp)
  callMethod("orthonormalize", meProp(_me, "m_pTransformMtx"), symbol("up"))
  setMeProp(_me, "m_bWorldTransformValid", 0);
}

