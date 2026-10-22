// vmk_fireworks_minigame.cct / CFireworksGameComponent / getLevelEnd

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getLevelEnd(_me: LingoMe) {
  if ((lingoTruthy(meProp(_me, "m_tutorialmode")) ? 0 : 1)) {
  var t_ar_level = callMethod("GetLevel", meProp(_me, "m_stage"));
  var tLastFirework = t_ar_level[t_ar_level.count];
  var tFwStyle = callNamed("getVariableValue", tLastFirework[symbol("f")]);
  if (callNamed("voidp", tFwStyle)) {
  callNamed("error", _me, lingoBinary("join", tLastFirework[symbol("f")], " variable is invalid."), symbol("getLevelEnd"))
  }

  var tMaxEmitterLife = float(0);
  var tMaxParticleLife = float(0);
  for (var tEmi of tFwStyle[symbol("emitters")].toArray()) {
  if (lingoBinary("gt", tEmi[symbol("life")], tMaxEmitterLife)) {
  tMaxEmitterLife = tEmi[symbol("life")];
  }

  var tParticleStyle = callNamed("getVariableValue", tEmi[symbol("style")]);
  if (callNamed("voidp", tParticleStyle)) {
  callNamed("error", _me, lingoBinary("join", tEmi[symbol("style")], " variable is invalid."), symbol("getLevelEnd"))
  }

  if (lingoBinary("gt", tParticleStyle[symbol("life")], tMaxParticleLife)) {
  tMaxParticleLife = tParticleStyle[symbol("life")];
  }

  }

  return lingoBinary("add", lingoBinary("add", lingoBinary("add", tLastFirework[symbol("t")], tFwStyle[symbol("lagtime")]), tMaxEmitterLife), tMaxParticleLife);
  } else {
  return float(180);
  }

}

