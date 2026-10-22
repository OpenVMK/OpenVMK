// vmk_furniture_code.cct / CRoomItemProximityConfig / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  callNamed("registerObject", callNamed("getUniqueID"), _this)
  setMeProp(_me, "m_ar_configuration", new LingoPropList(["f", 3, "fr", 0, "r", 2, "br", 1, "b", 1, "bl", 1, "l", 2, "fl", 0]));
  setMeProp(_me, "m_ar_directions", new LingoList([]));
  callMethod("append", meProp(_me, "m_ar_directions"), callNamed("vector", 1, 0, 0))
  callMethod("append", meProp(_me, "m_ar_directions"), callNamed("vector", 1, 1, 0))
  callMethod("append", meProp(_me, "m_ar_directions"), callNamed("vector", 0, 1, 0))
  callMethod("append", meProp(_me, "m_ar_directions"), callNamed("vector", -float(1), 1, 0))
  callMethod("append", meProp(_me, "m_ar_directions"), callNamed("vector", -float(1), 0, 0))
  callMethod("append", meProp(_me, "m_ar_directions"), callNamed("vector", -float(1), -float(1), 0))
  callMethod("append", meProp(_me, "m_ar_directions"), callNamed("vector", 0, -float(1), 0))
  callMethod("append", meProp(_me, "m_ar_directions"), callNamed("vector", 1, -float(1), 0))
  setMeProp(_me, "m_bReady", 0);
  setMeProp(_me, "m_bShowTiles", 0);
  var t_rContext = callMethod("_AccessRoom", callNamed("getThread", symbol("room")).component);
  var t_sTileSize = callMethod("GetParam", t_rContext, "TILESIZE");
  setMeProp(_me, "m_rTileMember", callNamed("getMember", lingoBinary("join", "proximity_marker_", t_sTileSize)));
  setMeProp(_me, "m_sConfigurationWindowID", "vmk_darkride_item_configuration");
  setMeProp(_me, "m_iRoomType", symbol("private"));
  if (callMethod("exists", callNamed("getObject", symbol("session")), "RoomType")) {
  setMeProp(_me, "m_iRoomType", callMethod("get", callNamed("getObject", symbol("session")), "RoomType"));
  }

  setMeProp(_me, "m_ar_radiobuttons", new LingoList([]));
  setMeProp(_me, "m_ar_tiles", new LingoList([]));
  return 1;
}

