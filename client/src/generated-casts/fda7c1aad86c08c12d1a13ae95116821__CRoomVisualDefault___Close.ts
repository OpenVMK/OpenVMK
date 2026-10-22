// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualDefault / _Close

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _Close(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectExists", "RoomEventProcessor")) {
  var t_rSprMgr = callNamed("getObject", "RoomEventProcessor");
  } else {
  t_rSprMgr = callNamed("createObject", "RoomEventProcessor", "CRoomMouseEventProcessor");
  }

  if (lingoBinary("gt", meProp(_me, "m_rSprite").spriteNum, 0)) {
  callMethod("RemoveSprite", t_rSprMgr, meProp(_me, "m_rSprite"))
  setMeProp(_me, "m_rSprite", callNamed("sprite", 0));
  }

  return 1;
}

