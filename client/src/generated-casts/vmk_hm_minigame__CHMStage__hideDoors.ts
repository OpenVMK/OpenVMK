// vmk_hm_minigame.cct / CHMStage / hideDoors

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function hideDoors(_me: LingoMe) {
  var tRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  for (var i = 1; i <= 10; ++i) {
  var tAnimName = lingoBinary("join", "door", i);
  var tNode = callMethod("Search", tRoomContext, "NAME", tAnimName);
  if (lingoBinary("neq", tNode, 0)) {
  var tSprite = callMethod("getSprite", callMethod("GetVisual", tNode));
  if (lingoBinary("neq", tSprite, callNamed("sprite", 0))) {
  setThePropOf(tSprite, "visible", 0);
  }

  }

  }

}

