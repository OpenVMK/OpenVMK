// 3f02613936ba018480acffaf92dd883a.cct / CAnimationComponent / activateAnimations

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function activateAnimations(_me: LingoMe) {
  setMeProp(_me, "m_ar_animations", new LingoList([]));
  var tRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  if (callNamed("objectp", tRoomContext)) {
  for (var i = 1; i <= 15; ++i) {
  var tAnimName = lingoBinary("join", "vmk_anim_", i);
  var tNode = callMethod("Search", tRoomContext, "NAME", tAnimName);
  if (lingoBinary("neq", tNode, 0)) {
  var tWorldPos = callMethod("GetAbsPos", callMethod("getObject", tNode));
  if (callNamed("variableExists", tAnimName)) {
  var tMemName = callNamed("getVariable", tAnimName);
  if (lingoBinary("neq", callNamed("getmemnum", tMemName), 0)) {
  callMethod("NewAnimation", meProp(_me, "m_rAnimationManager"), tWorldPos, tAnimName, tMemName)
  }

  }

  var tSprite = callMethod("getSprite", callMethod("GetVisual", tNode));
  if (lingoBinary("neq", tSprite.spriteNum, 0)) {
  setThePropOf(tSprite, "visible", 0);
  }

  }

  }

  }

}

