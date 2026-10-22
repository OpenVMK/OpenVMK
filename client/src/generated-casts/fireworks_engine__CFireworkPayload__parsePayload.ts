// fireworks_engine.cct / CFireworkPayload / parsePayload

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function parsePayload(_me: LingoMe, i_mp_value: LingoValue, i_vDirectionNormal: LingoValue) {
  if (callNamed("voidp", i_vDirectionNormal)) {
  setMeProp(_me, "m_vVelocity", callNamed("vector", 0, i_mp_value[symbol("velocity")], 0));
  } else {
  setMeProp(_me, "m_vVelocity", lingoBinary("mul", i_vDirectionNormal, i_mp_value[symbol("velocity")]));
  }

  setMeProp(_me, "m_fLagTime", callNamed("float", i_mp_value[symbol("lagtime")]));
  setMeProp(_me, "m_ar_emitters", i_mp_value[symbol("emitters")]);
  for (var tEmitter of meProp(_me, "m_ar_emitters").toArray()) {
  if (lingoBinary("gt", tEmitter[symbol("life")], meProp(_me, "m_fMaxEmitterAge"))) {
  setMeProp(_me, "m_fMaxEmitterAge", tEmitter[symbol("life")]);
  }

  }

}

