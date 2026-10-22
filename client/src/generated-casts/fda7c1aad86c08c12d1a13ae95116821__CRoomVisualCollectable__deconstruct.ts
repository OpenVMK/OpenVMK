// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualCollectable / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectExists", "RoomEventProcessor")) {
  var t_rSprMgr = callNamed("getObject", "RoomEventProcessor");
  } else {
  t_rSprMgr = callNamed("createObject", "RoomEventProcessor", "CRoomMouseEventProcessor");
  }

  for (var t_rSprite of meProp(_me, "m_ar_rSprites").toArray()) {
  callMethod("RemoveSprite", t_rSprMgr, t_rSprite)
  }

  setMeProp(_me, "m_ar_rSprites", new LingoList([]));
  return 1;
}

