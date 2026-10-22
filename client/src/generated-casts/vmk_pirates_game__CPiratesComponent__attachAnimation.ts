// vmk_pirates_game.cct / CPiratesComponent / attachAnimation

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function attachAnimation(_me: LingoMe, a_sElemName: LingoValue, a_sAnimMemName: LingoValue) {
  /* global */ var g_profComponent = globalVar("g_profComponent");
  var tRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  var t_rAnimationManager = callNamed("getObject", "AnimationManager");
  if (callNamed("objectp", t_rAnimationManager)) {
  if (callNamed("objectp", tRoomContext)) {
  var tNode = callMethod("Search", tRoomContext, "NAME", a_sElemName);
  if (lingoBinary("neq", tNode, 0)) {
  var tWorldPos = callMethod("GetAbsPos", callMethod("getObject", tNode));
  if (lingoBinary("neq", callNamed("getmemnum", a_sAnimMemName), 0)) {
  callMethod("NewAnimation", t_rAnimationManager, tWorldPos, a_sElemName, a_sAnimMemName)
  }

  var tSprite = callMethod("getSprite", callMethod("GetVisual", tNode));
  if (lingoBinary("neq", tSprite.spriteNum, 0)) {
  setThePropOf(tSprite, "visible", 0);
  }

  }

  }

  }

}

