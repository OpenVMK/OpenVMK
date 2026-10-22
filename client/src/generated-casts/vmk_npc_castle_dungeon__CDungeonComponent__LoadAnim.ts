// vmk_npc_castle_dungeon.cct / CDungeonComponent / LoadAnim

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LoadAnim(_me: LingoMe) {
  var t_rNode = callMethod("findNode", callMethod("getInterface", _me), "dragon");
  var t_rAnimationManager = callNamed("getObject", "AnimationManager");
  if (callNamed("objectp", t_rNode)) {
  var tSprite = callMethod("getSprite", callMethod("GetVisual", t_rNode));
  if (callNamed("objectp", tSprite)) {
  setThePropOf(tSprite, "blend", 0);
  }

  if (callNamed("objectp", t_rAnimationManager)) {
  callMethod("NewAnimation", t_rAnimationManager, callMethod("GetAbsPos", callMethod("getObject", t_rNode)), "dragon", "dragon_all.ani")
  }

  } else {
  callNamed("put", "Could not initialize NPC-animation")
  }

}

