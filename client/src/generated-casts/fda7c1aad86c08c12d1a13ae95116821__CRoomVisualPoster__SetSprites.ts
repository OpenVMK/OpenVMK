// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualPoster / SetSprites

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetSprites(_me: LingoMe, _this: LingoValue) {
  var t_rObj = callMethod("getObject", _this);
  var t_ar_rSprites = callMethod("GetParam", t_rObj, "SPRITES");
  var t_veRel = callMethod("GetRelPos", t_rObj);
  var t_veScr = callMethod("GetScrPos", t_rObj);
  var t_fXs = t_veScr.x;
  var t_fYs = t_veScr.y;
  var t_fZs = t_veScr.z;
  if (callNamed("voidp", meProp(_me, "m_ar_rSprites"))) {
  setMeProp(_me, "m_ar_rSprites", new LingoList([]));
  }

  if (callNamed("objectExists", "RoomEventProcessor")) {
  var t_rSprMgr = callNamed("getObject", "RoomEventProcessor");
  } else {
  t_rSprMgr = callNamed("createObject", "RoomEventProcessor", "CRoomMouseEventProcessor");
  }

  for (var i = 1; i <= t_ar_rSprites.count; ++i) {
  var t_rStruct = t_ar_rSprites[i].param;
  if (lingoBinary("lt", meProp(_me, "m_ar_rSprites").count, i)) {
  var t_rSpr = callMethod("CreateSprite", t_rSprMgr, callMethod("GetKey", t_rObj), 1);
  callMethod("add", meProp(_me, "m_ar_rSprites"), t_rSpr)
  } else {
  t_rSpr = meProp(_me, "m_ar_rSprites")[i];
  }

  setThePropOf(t_rSpr, "member", callNamed("getMember", t_rStruct["GFX"]));
  setThePropOf(t_rSpr, "width", t_rSpr.member.width);
  setThePropOf(t_rSpr, "height", t_rSpr.member.height);
  setThePropOf(t_rSpr, "ink", callNamed("integer", t_rStruct["INK"]));
  setThePropOf(t_rSpr, "color", callNamed("rgb", t_rStruct["COL"]));
  setThePropOf(t_rSpr, "bgColor", callNamed("rgb", t_rStruct["BGC"]));
  setThePropOf(t_rSpr, "locH", lingoBinary("add", t_fXs, callNamed("integer", t_rStruct["X"])));
  setThePropOf(t_rSpr, "locV", lingoBinary("add", t_fYs, callNamed("integer", t_rStruct["Y"])));
  setThePropOf(t_rSpr, "locZ", lingoBinary("add", lingoBinary("add", t_fZs, callNamed("integer", t_rStruct["Z"])), 1));
  setThePropOf(t_rSpr, "flipH", callNamed("integer", t_rStruct["FLP"]));
  }

  while (1) {
  if (lingoBinary("gt", meProp(_me, "m_ar_rSprites").count, t_ar_rSprites.count)) {
  if ((lingoTruthy(callMethod("RemoveSprite", t_rSprMgr, callMethod("getLast", meProp(_me, "m_ar_rSprites")))) ? 0 : 1)) {
  callNamed("error", _this, "Element's sprites are out of sync!", symbol("SetSprites"))
  break;
  }

  callMethod("deleteAt", meProp(_me, "m_ar_rSprites"), meProp(_me, "m_ar_rSprites").count)
  continue;
  }

  break;
  }

}

