// fireworks_engine.cct / CFireworksEngineComponent / ExplodeBomb

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ExplodeBomb(_me: LingoMe, i_rBomb: LingoValue, i_fPowerMod: LingoValue, i_fPPSMod: LingoValue, i_fSpreadMod: LingoValue, i_fLifeMod: LingoValue) {
  callMethod("SetExploded", i_rBomb, 1)
  var t_ar_Emitters = callMethod("getEmitters", i_rBomb);
  for (var tExplosion of t_ar_Emitters.toArray()) {
  var tPower = tExplosion[symbol("power")];
  var tPPS = tExplosion[symbol("pps")];
  var tSpread = tExplosion[symbol("spread")];
  var tLife = tExplosion[symbol("life")];
  if ((lingoTruthy(callNamed("voidp", i_fPowerMod)) ? 0 : 1)) {
  tPower = lingoBinary("mul", tPower, i_fPowerMod);
  }

  if ((lingoTruthy(callNamed("voidp", i_fPPSMod)) ? 0 : 1)) {
  tPPS = lingoBinary("mul", tPPS, i_fPPSMod);
  }

  if ((lingoTruthy(callNamed("voidp", i_fSpreadMod)) ? 0 : 1)) {
  tSpread = lingoBinary("mul", tSpread, i_fSpreadMod);
  }

  if ((lingoTruthy(callNamed("voidp", i_fLifeMod)) ? 0 : 1)) {
  tLife = lingoBinary("mul", tLife, i_fLifeMod);
  }

  // HAND-CORRECTED: `on GetParticleParams i_sStyle` has no `me`; the bare call must pass the style as its argument, not drop it into the receiver slot.
  var t_rEmitter = callMethod("requestNewEmitter", meProp(_me, "m_particleSystem"), tPower, tPPS, tSpread, tLife, callMethod("GetParticleParams", _me, tExplosion[symbol("style")]));
  if (lingoBinary("neq", t_rEmitter, undefined)) {
  callMethod("setPosition", t_rEmitter, callMethod("getPosition", i_rBomb))
  callMethod("AlignRight", t_rEmitter, callMethod("GetVelocity", i_rBomb))
  callMethod("AddEmitterNode", i_rBomb, t_rEmitter)
  }

  }

}

