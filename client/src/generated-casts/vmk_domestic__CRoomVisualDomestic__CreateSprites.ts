// vmk_domestic.cct / CRoomVisualDomestic / CreateSprites

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateSprites(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectExists", "RoomEventProcessor")) {
  var t_rSprMgr = callNamed("getObject", "RoomEventProcessor");
  } else {
  t_rSprMgr = callNamed("createObject", "RoomEventProcessor", "CRoomMouseEventProcessor");
  }

  var t_veScr = callMethod("GetScrPos", callMethod("getObject", _this));
  if (lingoBinary("lt", callNamed("integer", callMethod("GetParam", callMethod("getObject", _this), "TYPE")), 3)) {
  setThePropOf(_this, "m_rRenderer", callNamed("createObject", symbol("random"), "CIronCanRenderer"));
  } else {
  if (lingoBinary("eq", callNamed("integer", callMethod("GetParam", callMethod("getObject", _this), "TYPE")), 3)) {
  setThePropOf(_this, "m_rRenderer", callNamed("createObject", symbol("random"), "CBunnyRenderer"));
  } else {
  if (lingoBinary("eq", callNamed("integer", callMethod("GetParam", callMethod("getObject", _this), "TYPE")), 4)) {
  setThePropOf(_this, "m_rRenderer", callNamed("createObject", symbol("random"), "CYodaRenderer"));
  setThePropOf(callMethod("GetFactor", callMethod("getObject", _this)), "m_iStatusDelay", 1500);
  } else {
  if (lingoBinary("eq", callNamed("integer", callMethod("GetParam", callMethod("getObject", _this), "TYPE")), 5)) {
  setThePropOf(_this, "m_rRenderer", callNamed("createObject", symbol("random"), "CR2D2Renderer"));
  setThePropOf(callMethod("GetFactor", callMethod("getObject", _this)), "m_iStatusDelay", 1500);
  } else {
  if (lingoBinary("eq", callNamed("integer", callMethod("GetParam", callMethod("getObject", _this), "TYPE")), 6)) {
  setThePropOf(_this, "m_rRenderer", callNamed("createObject", symbol("random"), "CEveRenderer"));
  setThePropOf(callMethod("GetFactor", callMethod("getObject", _this)), "m_iStatusDelay", 750);
  } else {
  if (lingoBinary("eq", callNamed("integer", callMethod("GetParam", callMethod("getObject", _this), "TYPE")), 7)) {
  setThePropOf(_this, "m_rRenderer", callNamed("createObject", symbol("random"), "CPanicRenderer"));
  setThePropOf(callMethod("GetFactor", callMethod("getObject", _this)), "m_iStatusDelay", 1500);
  } else {
  if (lingoBinary("eq", callNamed("integer", callMethod("GetParam", callMethod("getObject", _this), "TYPE")), 8)) {
  setThePropOf(_this, "m_rRenderer", callNamed("createObject", symbol("random"), "CPainRenderer"));
  setThePropOf(callMethod("GetFactor", callMethod("getObject", _this)), "m_iStatusDelay", 1500);
  } else {
  if (lingoBinary("eq", callNamed("integer", callMethod("GetParam", callMethod("getObject", _this), "TYPE")), 9)) {
  setThePropOf(_this, "m_rRenderer", callNamed("createObject", symbol("random"), "CYzmaRenderer"));
  setThePropOf(callMethod("GetFactor", callMethod("getObject", _this)), "m_iStatusDelay", 500);
  } else {
  if (lingoBinary("eq", callNamed("integer", callMethod("GetParam", callMethod("getObject", _this), "TYPE")), 10)) {
  setThePropOf(_this, "m_rRenderer", callNamed("createObject", symbol("random"), "CTurkeyRenderer"));
  setThePropOf(callMethod("GetFactor", callMethod("getObject", _this)), "m_iStatusDelay", 500);
  } else {
  if (lingoBinary("eq", callNamed("integer", callMethod("GetParam", callMethod("getObject", _this), "TYPE")), 11)) {
  setThePropOf(_this, "m_rRenderer", callNamed("createObject", symbol("random"), "CEverTurkeyRenderer"));
  setThePropOf(callMethod("GetFactor", callMethod("getObject", _this)), "m_iStatusDelay", 500);
  } else {
  if (lingoBinary("eq", callNamed("integer", callMethod("GetParam", callMethod("getObject", _this), "TYPE")), 12)) {
  setThePropOf(_this, "m_rRenderer", callNamed("createObject", symbol("random"), "CThumperRenderer"));
  setThePropOf(callMethod("GetFactor", callMethod("getObject", _this)), "m_iStatusDelay", 500);
  } else {
  if (lingoBinary("eq", callNamed("integer", callMethod("GetParam", callMethod("getObject", _this), "TYPE")), 13)) {
  setThePropOf(_this, "m_rRenderer", callNamed("createObject", symbol("random"), "CHeiheiRenderer"));
  setThePropOf(callMethod("GetFactor", callMethod("getObject", _this)), "m_iStatusDelay", 500);
  } else {
  setThePropOf(_this, "m_rRenderer", callNamed("createObject", symbol("random"), "CIronCanRenderer"));
  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  setThePropOf(_this, "m_rSprite", callMethod("CreateSprite", t_rSprMgr, callMethod("GetKey", callMethod("getObject", _this)), 1));
  setThePropOf(_this.m_rSprite, "locH", t_veScr.x);
  setThePropOf(_this.m_rSprite, "locV", t_veScr.y);
  setThePropOf(_this.m_rSprite, "locZ", t_veScr.z);
  setMeProp(_me, "m_iOriginalPosY", t_veScr.y);
  callMethod("Init", _this.m_rRenderer, _this.m_rSprite)
  if (lingoBinary("lt", callNamed("integer", callMethod("GetParam", callMethod("getObject", _this), "TYPE")), 3)) {
  setThePropOf(_this.m_rSprite, "locV", lingoBinary("sub", t_veScr.y, 38));
  setThePropOf(_this.m_rRenderer, "m_rID", 1);
  }

}

