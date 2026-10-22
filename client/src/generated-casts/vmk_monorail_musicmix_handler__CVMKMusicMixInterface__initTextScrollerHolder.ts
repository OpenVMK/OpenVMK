// vmk_monorail_musicmix_handler.cct / CVMKMusicMixInterface / initTextScrollerHolder

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initTextScrollerHolder(_me: LingoMe) {
  var tRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  var tNode = callMethod("Search", tRoomContext, "NAME", "display_song");
  if (lingoBinary("neq", tNode, 0)) {
  var tSprite = callMethod("getSprite", callMethod("GetVisual", tNode));
  if (lingoBinary("neq", tSprite, 0)) {
  callNamed("put", lingoBinary("joinPad", "Found sprite", new LingoList([tSprite, tSprite.blend, tSprite.ink, tSprite.width, tSprite.height])))
  var t_Img = callNamed("image", tSprite.width, tSprite.height, 32);
  callMethod("fill", t_Img, t_Img.rect, new LingoPropList([symbol("color"), callNamed("rgb", "#000000")]))
  setThePropOf(tSprite.member, "image", t_Img);
  setThePropOf(tSprite, "blend", 100);
  setThePropOf(tSprite.member, "regPoint", callNamed("point", 0, 0));
  setThePropOf(tSprite, "bgColor", callNamed("rgb", "#000000"));
  setThePropOf(tSprite, "ink", 33);
  return tSprite.member;
  }

  }

  return 0;
}

