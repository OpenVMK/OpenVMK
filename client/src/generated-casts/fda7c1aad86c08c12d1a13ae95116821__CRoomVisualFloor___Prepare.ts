// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualFloor / _Prepare

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _Prepare(_me: LingoMe, _this: LingoValue) {
  var t_rObj = callMethod("getObject", _this);
  var t_iCnt = callMethod("GetCount", t_rObj);
  setMeProp(_me, "m_iTileSize", callNamed("integer", callMethod("GetParam", callMethod("GetContext", t_rObj), "TILESIZE")));
  if (lingoBinary("eq", meProp(_me, "m_iSelectMode"), symbol("old"))) {
  var m_mp_sLoc_sTile = new LingoPropList([]);
  for (var i = 1; i <= t_iCnt; ++i) {
  var t_rTile = t_rObj[i];
  var t_veRel = callMethod("GetRelPos", t_rTile);
  callMethod("addProp", m_mp_sLoc_sTile, lingoBinary("join", lingoBinary("join", callNamed("integer", t_veRel.x), "/"), callNamed("integer", t_veRel.y)), callMethod("GetKey", t_rTile))
  }

  }

  if (lingoBinary("eq", meProp(_me, "m_iSelectMode"), symbol("bsp"))) {
  var t_rXML = callMethod("getComponent", callNamed("getThread", "room")).m_rRoomBSPXML;
  if (callNamed("voidp", t_rXML)) {
  callNamed("error", _this, "BSP doc missing, defaulting to old selection mode", symbol("_Prepare"))
  setMeProp(_me, "m_iSelectMode", symbol("old"));
  return callMethod("_Prepare", _this);
  }

  callMethod("GetRoot", t_rXML)
  var t_result = callMethod("Search", t_rXML, "NAME", callMethod("GetParam", callMethod("getObject", _this), "NAME"));
  if ((lingoTruthy(t_result) ? 0 : 1)) {
  callNamed("error", _this, "Could not find floor in BSP doc", symbol("_Prepare"))
  setMeProp(_me, "m_iSelectMode", symbol("old"));
  return callMethod("_Prepare", _this);
  }

  callMethod("Search", t_rXML, "type", "NODE")
  setMeProp(_me, "m_pBsp", callNamed("createObject", symbol("random"), "CBspTree"));
  callMethod("setup_import", meProp(_me, "m_pBsp"), t_rXML)
  }

  setMeProp(_me, "m_bValid", 1);
}

