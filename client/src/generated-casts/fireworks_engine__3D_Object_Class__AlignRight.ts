// fireworks_engine.cct / 3D Object Class / AlignRight

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AlignRight(_me: LingoMe, i_vNewRight: LingoValue) {
  var tRight = callMethod("duplicate", i_vNewRight);
  callMethod("normalize", tRight)
  callMethod("setRight", meProp(_me, "m_pTransformMtx"), tRight)
  callMethod("orthonormalize", meProp(_me, "m_pTransformMtx"), symbol("right"))
  setMeProp(_me, "m_bWorldTransformValid", 0);
}

