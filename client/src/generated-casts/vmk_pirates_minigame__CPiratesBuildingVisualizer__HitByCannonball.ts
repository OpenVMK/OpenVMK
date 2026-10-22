// vmk_pirates_minigame.cct / CPiratesBuildingVisualizer / HitByCannonball

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HitByCannonball(_me: LingoMe) {
  var tHealth = callMethod("GetParam", callMethod("getObject", _me), "GameParams")[meProp(_me, "m_HEALTH")];
  var t_ar_dmgObjects = callMethod("GetParam", callMethod("getObject", _me), "DmgObjects");
  var t_ar_burnObjects = callMethod("GetParam", callMethod("getObject", _me), "BurnObjects");
  var tLevelToEnable = lingoBinary("div", lingoBinary("sub", callMethod("GetParam", callMethod("getObject", _me), "OriginalHealth"), tHealth), lingoBinary("div", callMethod("GetParam", callMethod("getObject", _me), "OriginalHealth"), 5));
  if (lingoBinary("gt", tLevelToEnable, 0)) {
  if (lingoBinary("gte", t_ar_dmgObjects.count, tLevelToEnable)) {
  for (var tObject of t_ar_dmgObjects[tLevelToEnable].toArray()) {
  setThePropOf(callMethod("getSprite", callMethod("GetVisual", tObject)), "visible", 1);
  if (lingoBinary("contains", callMethod("GetParam", tObject, "SPRITE"), "fire")) {
  callMethod("SetParam", tObject, "PiratesAnim", meProp(_me, "m_ar_rFireAnim"))
  callMethod("SetParam", tObject, "PiratesAnimFrame", callNamed("random", 15))
  continue;
  }

  if (lingoBinary("contains", callMethod("GetParam", tObject, "SPRITE"), "glow")) {
  callMethod("SetParam", tObject, "PiratesAnim", meProp(_me, "m_ar_rGlowAnim"))
  callMethod("SetParam", tObject, "PiratesAnimFrame", callNamed("random", 2))
  }

  }

  var tBlend = lingoBinary("mul", tLevelToEnable, 25);
  for (var tObject of t_ar_burnObjects.toArray()) {
  setThePropOf(callMethod("getSprite", callMethod("GetVisual", tObject)), "visible", 1);
  setThePropOf(callMethod("getSprite", callMethod("GetVisual", tObject)), "blend", tBlend);
  }

  }

  }

}

