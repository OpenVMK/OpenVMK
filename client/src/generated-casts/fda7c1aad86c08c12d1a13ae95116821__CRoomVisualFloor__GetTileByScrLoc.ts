// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualFloor / GetTileByScrLoc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetTileByScrLoc(_me: LingoMe, _this: LingoValue, a_iX: LingoValue, a_iY: LingoValue) {
  if ((lingoTruthy(meProp(_me, "m_bValid")) ? 0 : 1)) {
  callMethod("_Prepare", _this)
  }

  if (lingoBinary("eq", meProp(_me, "m_iSelectMode"), symbol("old"))) {
  var t_rObj = callMethod("getObject", _this);
  var t_veScr = callMethod("GetScrPos", t_rObj);
  var t_iSiz = callNamed("integer", callMethod("GetParam", callMethod("GetContext", t_rObj), "TILESIZE"));
  var t_iCnt = callMethod("GetCount", t_rObj);
  var t_ptTest = callNamed("point", a_iX, a_iY);
  for (var i = 1; i <= t_iCnt; ++i) {
  var t_rTile = t_rObj[i];
  t_veScr = callMethod("GetScrPos", t_rTile);
  var t_ptScr = callNamed("point", t_veScr.x, t_veScr.y);
  if (callMethod("_IsInsideQuad", _this, t_ptTest, t_ptScr, meProp(_me, "m_iTileSize"))) {
  return t_rTile;
  }

  }

  return undefined;
  }

  if (lingoBinary("eq", meProp(_me, "m_iSelectMode"), symbol("bsp"))) {
  var t_ptRel = callMethod("_ScrToRel", _this, callNamed("point", a_iX, a_iY));
  return callMethod("Search", meProp(_me, "m_pBsp"), new LingoList([t_ptRel.locH, t_ptRel.locV]));
  }

}

