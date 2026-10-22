// fireworks_engine.cct / Particle Class / updateParticle

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateParticle(_me: LingoMe, i_dt: LingoValue, i_velocityChange: LingoValue) {
  setMeProp(_me, "m_fAge", lingoBinary("add", meProp(_me, "m_fAge"), i_dt));
  if (lingoBinary("gte", meProp(_me, "m_fAge"), meProp(_me, "m_fAgeLimit"))) {
  setMeProp(_me, "m_removeFlag", 1);
  return;
  }

  setMeProp(_me, "m_vVelocity", lingoBinary("add", meProp(_me, "m_vVelocity"), i_velocityChange));
  setMeProp(_me, "m_vPosition", lingoBinary("add", meProp(_me, "m_vPosition"), lingoBinary("mul", meProp(_me, "m_vVelocity"), i_dt)));
  if (lingoBinary("gt", meProp(_me, "m_fRandomMotion"), float(0))) {
  setThePropOf(meProp(_me, "m_vPosition"), "x", lingoBinary("add", meProp(_me, "m_vPosition").x, lingoBinary("div", lingoBinary("mul", meProp(_me, "m_fRandomMotion"), callNamed("float", lingoBinary("sub", callNamed("random", 1000), 500))), float(500))));
  setThePropOf(meProp(_me, "m_vPosition"), "y", lingoBinary("add", meProp(_me, "m_vPosition").y, lingoBinary("div", lingoBinary("mul", meProp(_me, "m_fRandomMotion"), callNamed("float", lingoBinary("sub", callNamed("random", 1000), 500))), float(500))));
  setThePropOf(meProp(_me, "m_vPosition"), "z", lingoBinary("add", meProp(_me, "m_vPosition").z, lingoBinary("div", lingoBinary("mul", meProp(_me, "m_fRandomMotion"), callNamed("float", lingoBinary("sub", callNamed("random", 1000), 500))), float(500))));
  }

  if (lingoBinary("gt", meProp(_me, "m_ar_spriteListRef").count, 1)) {
  setMeProp(_me, "m_pSpriteRef", callMethod("GetSpriteRefAtTime", _me, meProp(_me, "m_fAge")));
  }

}

