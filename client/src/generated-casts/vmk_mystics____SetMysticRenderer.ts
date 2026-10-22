// vmk_mystics.cct /  / SetMysticRenderer

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetMysticRenderer(_me: LingoMe, _this: LingoValue, a_rRenderer: LingoValue) {
  if (lingoBinary("and", callNamed("voidp", a_rRenderer), (lingoTruthy(callNamed("voidp", _this.m_rCustomRenderer)) ? 0 : 1))) {
  callMethod("endMagic", _this.m_rCustomRenderer)
  }

  setThePropOf(_this, "m_rCustomRenderer", a_rRenderer);
  if (lingoBinary("and", (lingoTruthy(callNamed("voidp", _this.m_rCustomSpr)) ? 0 : 1), callNamed("voidp", _this.m_rCustomRenderer))) {
  if (callNamed("objectExists", "RoomEventProcessor")) {
  var t_rSprMgr = callNamed("getObject", "RoomEventProcessor");
  } else {
  t_rSprMgr = callNamed("createObject", "RoomEventProcessor", "CRoomMouseEventProcessor");
  }

  callMethod("RemoveSprite", t_rSprMgr, _this.m_rCustomSpr)
  setThePropOf(_this, "m_rCustomSpr", undefined);
  return;
  }

  if (callNamed("voidp", _this.m_rCustomSpr)) {
  if (callNamed("objectExists", "RoomEventProcessor")) {
  t_rSprMgr = callNamed("getObject", "RoomEventProcessor");
  } else {
  t_rSprMgr = callNamed("createObject", "RoomEventProcessor", "CRoomMouseEventProcessor");
  }

  setThePropOf(_this, "m_rCustomSpr", callMethod("CreateSprite", t_rSprMgr, callMethod("GetKey", callMethod("getObject", _this)), 2));
  }

  callMethod("Init", _this.m_rCustomRenderer, _this.m_rCustomSpr)
  var t_veScr = callMethod("GetScrPos", callMethod("getObject", _this));
  var t_fXs = t_veScr.x;
  var t_fYs = t_veScr.y;
  var t_fZs = t_veScr.z;
  if ((lingoTruthy(callNamed("voidp", _this.m_rCustomSpr)) ? 0 : 1)) {
  setThePropOf(_this.m_rCustomSpr, "locH", t_fXs);
  setThePropOf(_this.m_rCustomSpr, "locV", t_fYs);
  setThePropOf(_this.m_rCustomSpr, "locZ", lingoBinary("add", t_fZs, callMethod("getOffsetZ", _this.m_rCustomRenderer)));
  }

}

