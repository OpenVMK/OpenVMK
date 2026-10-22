// vmk_musicmix_handler.cct / CVMKMusicMixInterface / initTextScroller

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initTextScroller(_me: LingoMe) {
  if (lingoBinary("neq", callNamed("getThread", "TextScroller"), 0)) {
  var tWidth = 127;
  var tHeight = 85;
  var tRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  var tNode = callMethod("Search", tRoomContext, "NAME", "display_song");
  if (lingoBinary("neq", tNode, 0)) {
  var tSprite = callMethod("getSprite", callMethod("GetVisual", tNode));
  if (lingoBinary("neq", tSprite, 0)) {
  tWidth = tSprite.width;
  tHeight = tSprite.height;
  }

  }

  var t_initText = callNamed("getText", "musicmix.game.init.scroller");
  var t_pTextScroller = callNamed("createTextScroller", callNamed("convertToHigherCase", t_initText));
  callMethod("SetRenderer", t_pTextScroller, symbol("isometric"))
  callMethod("Init", callMethod("GetRenderer", t_pTextScroller), callMethod("getID", _me), "Digital_font2", tWidth, tHeight)
  callMethod("SetOffset", callMethod("GetRenderer", t_pTextScroller), callNamed("point", 2, 56))
  callMethod("setAngle", callMethod("GetRenderer", t_pTextScroller), 120)
  callMethod("setVisibleCharCount", t_pTextScroller, lingoBinary("div", tWidth, 10))
  setThePropOf(t_pTextScroller, "m_bLoop", 0);
  callMethod("start", t_pTextScroller)
  return t_pTextScroller;
  } else {
  return 0;
  }

}

