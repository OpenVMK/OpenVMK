// vmk_monorail_train_handler.cct / CMonorailTrainInterface / OpenDoors

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function OpenDoors(_me: LingoMe) {
  var tRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  var t_Nodes = new LingoList(["frontdoors_1", "frontdoors_2", "frontdoor", "backdoors_1", "backdoors_2", "backdoor"]);
  var t_Mems = new LingoList(["double_frontdoors_04", "double_frontdoors_04", "frontdoor_04", "double_backdoors_04", "double_backdoors_04", "backdoor_04"]);
  for (var i = 1; i <= t_Nodes.count; ++i) {
  var tNode = callMethod("Search", tRoomContext, "NAME", t_Nodes[i]);
  var tSprite = callMethod("getSprite", callMethod("GetVisual", tNode));
  var tmember = callNamed("member", t_Mems[i]);
  setThePropOf(tSprite, "member", tmember);
  setThePropOf(tSprite, "width", tmember.image.width);
  setThePropOf(tSprite, "height", tmember.image.height);
  }

}

