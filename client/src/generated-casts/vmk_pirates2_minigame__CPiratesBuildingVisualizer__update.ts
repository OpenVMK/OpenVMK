// vmk_pirates2_minigame.cct / CPiratesBuildingVisualizer / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  var tPos = callMethod("GetParam", callMethod("getObject", _me), "WorldPosition");
  var tHealth = callMethod("GetParam", callMethod("getObject", _me), "GameParams")[meProp(_me, "m_HEALTH")];
  var t_ar_dmgObjects = callMethod("GetParam", callMethod("getObject", _me), "DmgObjects");
  for (var tDmgLevel of t_ar_dmgObjects.toArray()) {
  for (var tObject of tDmgLevel.toArray()) {
  if (callMethod("getSprite", callMethod("GetVisual", tObject)).visible) {
  if ((lingoTruthy(callNamed("voidp", callMethod("GetParam", tObject, "PiratesAnim"))) ? 0 : 1)) {
  var tFrame = callMethod("GetParam", tObject, "PiratesAnimFrame");
  var tFrameList = callMethod("GetParam", tObject, "PiratesAnim");
  setThePropOf(callMethod("getSprite", callMethod("GetVisual", tObject)), "member", tFrameList[tFrame]);
  tFrame = lingoBinary("add", tFrame, 1);
  if (lingoBinary("gt", tFrame, tFrameList.count)) {
  tFrame = 1;
  }

  callMethod("SetParam", tObject, "PiratesAnimFrame", tFrame)
  }

  }

  }

  }

}

