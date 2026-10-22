// fireworks_engine.cct / CFireworkPayload / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, i_dt: LingoValue, i_vDrag: LingoValue) {
  setMeProp(_me, "m_fAge", lingoBinary("add", meProp(_me, "m_fAge"), i_dt));
  setMeProp(_me, "m_vPosition", lingoBinary("add", meProp(_me, "m_vPosition"), lingoBinary("mul", meProp(_me, "m_vVelocity"), i_dt)));
  if ((lingoTruthy(callNamed("voidp", i_vDrag)) ? 0 : 1)) {
  setMeProp(_me, "m_vVelocity", lingoBinary("add", meProp(_me, "m_vVelocity"), lingoBinary("mul", i_vDrag, i_dt)));
  }

  for (var tNode of meProp(_me, "m_ar_activeEmitters").toArray()) {
  callMethod("setPosition", tNode, meProp(_me, "m_vPosition"))
  }

}

