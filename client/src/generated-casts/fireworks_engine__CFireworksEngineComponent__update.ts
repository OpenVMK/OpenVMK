// fireworks_engine.cct / CFireworksEngineComponent / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  var t_currentTime = theProperty("milliSeconds");
  var t_deltaTime = lingoBinary("mul", callNamed("float", lingoBinary("sub", t_currentTime, meProp(_me, "m_lastTime"))), 0.001);
  setMeProp(_me, "m_lastTime", t_currentTime);
  for (var i = 1; i <= meProp(_me, "m_ar_fireworks").count; ++i) {
  var tBomb = meProp(_me, "m_ar_fireworks")[i];
  callMethod("update", tBomb, t_deltaTime, callNamed("vector", -float(9.81), 0, 0))
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_ar_rocketParticles")[i])) ? 0 : 1)) {
  callMethod("setPosition", meProp(_me, "m_ar_rocketParticles")[i], callMethod("getPosition", tBomb))
  }

  if (lingoBinary("and", lingoBinary("and", meProp(_me, "m_autoExplode"), callMethod("TimeToExplode", tBomb)), (lingoTruthy(callMethod("GetExploded", tBomb)) ? 0 : 1))) {
  callMethod("ExplodeBomb", _me, tBomb)
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_ar_rocketParticles")[i])) ? 0 : 1)) {
  callMethod("SetRemoveFlag", meProp(_me, "m_ar_rocketParticles")[i], 1)
  }

  }

  }

  var t_ar_newBomblist = new LingoList([]);
  var t_ar_newRocketParticleList = new LingoList([]);
  for (var i = 1; i <= meProp(_me, "m_ar_fireworks").count; ++i) {
  tBomb = meProp(_me, "m_ar_fireworks")[i];
  if ((lingoTruthy(callMethod("TimeToRemove", tBomb)) ? 0 : 1)) {
  callMethod("append", t_ar_newBomblist, tBomb)
  callMethod("append", t_ar_newRocketParticleList, meProp(_me, "m_ar_rocketParticles")[i])
  }

  }

  setMeProp(_me, "m_ar_fireworks", t_ar_newBomblist);
  setMeProp(_me, "m_ar_rocketParticles", t_ar_newRocketParticleList);
}

