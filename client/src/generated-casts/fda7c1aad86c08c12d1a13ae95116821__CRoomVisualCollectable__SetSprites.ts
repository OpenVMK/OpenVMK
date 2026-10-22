// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualCollectable / SetSprites

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
  var t_iTileSize = callMethod("GetParam", callMethod("GetContext", t_rObj), "TILESIZE");
  var t_iTypeCode = callMethod("GetParam", t_rObj, "TYPE");
  var t_bLoaded = callMethod("IsItemReady", callNamed("getObject", "RoomItemAssetManager"), t_iTypeCode);
  var t_iRatio = lingoBinary("div", t_iTileSize, float(32));
  var t_veScr = callMethod("GetScrPos", t_rObj);
  var t_fXs = t_veScr.x;
  var t_fYs = t_veScr.y;
  var t_fZs = t_veScr.z;
  if (callNamed("objectExists", "RoomEventProcessor")) {
  var t_rSprMgr = callNamed("getObject", "RoomEventProcessor");
  } else {
  t_rSprMgr = callNamed("createObject", "RoomEventProcessor", "CRoomMouseEventProcessor");
  }

  if (t_bLoaded) {
  var t_ar_rSprites = callMethod("GetParam", t_rObj, "SPRITES");
  setMeProp(_me, "m_bLoading", 0);
  } else {
  t_ar_rSprites = new LingoPropList(["", new LingoPropList([symbol("type"), "SPR", symbol("value"), "", symbol("param"), new LingoPropList(["GFX", "loadingfx_0", "FLP", "0", "X", "0", "Y", "0", "Z", "0", "COL", "000000", "BGC", "FFFFFF", "BLD", "100", "INK", "8"]), symbol("child"), new LingoPropList([])])]);
  setMeProp(_me, "m_bLoading", 1);
  }

  for (var i = 1; i <= t_ar_rSprites.count; ++i) {
  var t_rStruct = t_ar_rSprites[i].param;
  if (lingoBinary("lt", meProp(_me, "m_ar_rSprites").count, i)) {
  var t_rSpr = callMethod("CreateSprite", t_rSprMgr, callMethod("GetKey", t_rObj), 1);
  callMethod("add", meProp(_me, "m_ar_rSprites"), t_rSpr)
  } else {
  t_rSpr = meProp(_me, "m_ar_rSprites")[i];
  }

  var t_iMember = callNamed("getmemnum", t_rStruct["GFX"]);
  if (lingoBinary("lt", t_iMember, 1)) {
  callNamed("put", lingoBinary("joinPad", "Item graphics member not present:", t_rStruct["GFX"]))
  t_iMember = callNamed("getmemnum", "item_placeholder");
  }

  setThePropOf(t_rSpr, "member", callNamed("member", t_iMember));
  setThePropOf(t_rSpr, "ink", callNamed("integer", t_rStruct["INK"]));
  setThePropOf(t_rSpr, "color", callNamed("rgb", t_rStruct["COL"]));
  setThePropOf(t_rSpr, "bgColor", callNamed("rgb", t_rStruct["BGC"]));
  setThePropOf(t_rSpr, "locH", lingoBinary("add", t_fXs, callNamed("integer", t_rStruct["X"])));
  setThePropOf(t_rSpr, "locV", lingoBinary("add", t_fYs, callNamed("integer", t_rStruct["Y"])));
  setThePropOf(t_rSpr, "locZ", lingoBinary("sub", lingoBinary("add", lingoBinary("add", t_fZs, callNamed("integer", t_rStruct["Z"])), 1), 10));
  setThePropOf(t_rSpr, "flipH", callNamed("integer", t_rStruct["FLP"]));
  setThePropOf(t_rSpr, "blend", callNamed("integer", t_rStruct["BLD"]));
  if (lingoBinary("and", lingoBinary("neq", t_iTileSize, 32), lingoBinary("neq", t_iTileSize, 16))) {
  setThePropOf(t_rSpr, "width", callNamed("integer", lingoBinary("mul", t_rSpr.member.image.width, t_iRatio)));
  setThePropOf(t_rSpr, "height", callNamed("integer", lingoBinary("mul", t_rSpr.member.image.height, t_iRatio)));
  continue;
  }

  setThePropOf(t_rSpr, "width", t_rSpr.member.width);
  setThePropOf(t_rSpr, "height", t_rSpr.member.height);
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

  setMeProp(_me, "m_iStateStart", theProperty("milliSeconds"));
}

