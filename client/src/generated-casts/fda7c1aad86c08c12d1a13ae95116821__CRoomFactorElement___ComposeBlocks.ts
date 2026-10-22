// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFactorElement / _ComposeBlocks

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ComposeBlocks(_me: LingoMe, _this: LingoValue) {
  var t_bReturn = 1;
  var t_rContext = callMethod("GetContext", callMethod("getObject", _this));
  var t_rObj = callMethod("getObject", _this);
  var t_rStruct = callMethod("GetParam", t_rObj, "STRUCT");
  var t_iDir = callNamed("integer", callMethod("GetParam", t_rObj, "DIR"));
  for (var t_rDir of t_rStruct.child.toArray()) {
  if (lingoBinary("eq", callNamed("integer", t_rDir.param["NUM"]), t_iDir)) {
  var t_rBlocks = t_rDir.child;
  break;
  }

  }

  if (callNamed("voidp", t_rBlocks)) {
  return 1;
  }

  var t_rXML = callNamed("CreateXML", callNamed("getMember", "room.object.block.xml").text);
  callMethod("Search", t_rXML, "type", "NODE")
  callMethod("SetParam", t_rXML, "ELEMENT_TYPE", callMethod("GetParam", t_rObj, "TYPE"))
  var t_iTileSize = callNamed("integer", callMethod("GetParam", callMethod("GetContext", callMethod("getObject", _this)), "TILESIZE"));
  var t_ar_rBlocks = new LingoList([]);
  for (var t_sKey of meProp(_me, "m_ar_sKey").toArray()) {
  var t_rBlock = callMethod("GetObjByKey", t_rContext, t_sKey);
  if (callNamed("objectp", t_rBlock)) {
  callMethod("SetToTileStack", callMethod("GetFactor", t_rBlock), t_rObj, 0)
  callMethod("add", t_ar_rBlocks, t_rBlock)
  }

  }

  setMeProp(_me, "m_ar_sKey", new LingoList([]));
  var t_rFloor = meProp(_me, "m_rTile");
  while (1) {
  if (lingoBinary("eq", callMethod("GetParam", t_rFloor, "CLASS"), "floor")) {
  break;
  continue;
  }

  t_rFloor = callMethod("GetOwner", t_rFloor);
  }

  for (var t_rBlock of t_rBlocks.toArray()) {
  var t_iX = lingoBinary("add", callMethod("GetRelPos", meProp(_me, "m_rTile")).x, lingoBinary("mul", callNamed("integer", t_rBlock.param["X"]), t_iTileSize));
  var t_iY = lingoBinary("add", callMethod("GetRelPos", meProp(_me, "m_rTile")).y, lingoBinary("mul", callNamed("integer", t_rBlock.param["Y"]), t_iTileSize));
  var t_rTile = callMethod("GetTileByRelLoc", callMethod("GetFactor", t_rFloor), t_iX, t_iY);
  var t_iStack = 0;
  if (callNamed("voidp", t_rTile)) {
  t_bReturn = 0;
  t_rTile = callMethod("GetTheTileStack", _this);
  callNamed("error", _this, "Failed to find tile for block!", symbol("_ComposeBlocks"))
  } else {
  var t_rCopy = t_rTile;
  while (1) {
  if (lingoBinary("gt", callMethod("GetCount", t_rCopy), 0)) {
  t_rCopy = t_rCopy[1];
  t_iStack = lingoBinary("add", t_iStack, 1);
  continue;
  }

  break;
  }

  if (lingoBinary("eq", callMethod("GetParam", t_rCopy, "CLASS"), "avatar")) {
  t_rCopy = callMethod("GetOwner", t_rCopy);
  t_iStack = lingoBinary("sub", t_iStack, 1);
  }

  }

  if (lingoBinary("gt", t_ar_rBlocks.count, 0)) {
  var t_rOld = t_ar_rBlocks[1];
  callMethod("deleteAt", t_ar_rBlocks, 1)
  callMethod("SetParam", t_rOld, "REF", callMethod("GetParam", t_rObj, "REF"))
  callMethod("SetParam", t_rOld, "NAME", t_rBlock.param["NAME"])
  callMethod("SetParam", t_rOld, "HGT", t_rBlock.param["HGT"])
  callMethod("SetParam", t_rOld, "X", "0")
  callMethod("SetParam", t_rOld, "Y", "0")
  callMethod("SetParam", t_rOld, "Z", "0")
  callMethod("SetParam", t_rOld, "SPRITES", t_rBlock.child)
  callMethod("SetParam", t_rOld, "SIT", t_rBlock.param["SIT"])
  callMethod("SetParam", t_rOld, "WLK", t_rBlock.param["WLK"])
  callMethod("SetParam", t_rOld, "STK", t_rBlock.param["STK"])
  callMethod("SetParam", t_rOld, "TILESIZE", t_rStruct.param["TILESIZE"])
  if ((lingoTruthy(callNamed("voidp", t_rBlock.param["ACT"])) ? 0 : 1)) {
  callMethod("SetParam", t_rOld, "ACT", t_rBlock.param["ACT"])
  }

  if ((lingoTruthy(callNamed("voidp", t_rBlock.param["ZTRANS"])) ? 0 : 1)) {
  callMethod("SetParam", t_rOld, "ZTRANS", t_rBlock.param["ZTRANS"])
  }

  if ((lingoTruthy(callNamed("voidp", t_rBlock.param["NOCLK"])) ? 0 : 1)) {
  callMethod("SetParam", t_rOld, "NOCLK", t_rBlock.param["NOCLK"])
  }

  callMethod("append", meProp(_me, "m_ar_sKey"), callMethod("GetKey", t_rOld))
  callMethod("SetToTileStack", callMethod("GetFactor", t_rOld), t_rTile, t_iStack)
  continue;
  }

  callMethod("SetParam", t_rXML, "REF", callMethod("GetParam", t_rObj, "REF"))
  callMethod("SetParam", t_rXML, "NAME", t_rBlock.param["NAME"])
  callMethod("SetParam", t_rXML, "HGT", t_rBlock.param["HGT"])
  callMethod("SetParam", t_rXML, "X", "0")
  callMethod("SetParam", t_rXML, "Y", "0")
  callMethod("SetParam", t_rXML, "Z", "0")
  callMethod("SetParam", t_rXML, "SPRITES", t_rBlock.child)
  callMethod("SetParam", t_rXML, "SIT", t_rBlock.param["SIT"])
  callMethod("SetParam", t_rXML, "WLK", t_rBlock.param["WLK"])
  callMethod("SetParam", t_rXML, "STK", t_rBlock.param["STK"])
  callMethod("SetParam", t_rXML, "TILESIZE", t_rStruct.param["TILESIZE"])
  if ((lingoTruthy(callNamed("voidp", t_rBlock.param["ACT"])) ? 0 : 1)) {
  callMethod("SetParam", t_rXML, "ACT", t_rBlock.param["ACT"])
  }

  if ((lingoTruthy(callNamed("voidp", t_rBlock.param["ZTRANS"])) ? 0 : 1)) {
  callMethod("SetParam", t_rXML, "ZTRANS", t_rBlock.param["ZTRANS"])
  }

  if ((lingoTruthy(callNamed("voidp", t_rBlock.param["NOCLK"])) ? 0 : 1)) {
  callMethod("SetParam", t_rXML, "NOCLK", t_rBlock.param["NOCLK"])
  }

  t_sKey = callMethod("createKey", t_rObj);
  if (callMethod("create", t_rObj, t_sKey, t_rXML)) {
  var t_rNew = callMethod("Access", t_rObj, t_sKey);
  callMethod("append", meProp(_me, "m_ar_sKey"), t_sKey)
  callMethod("SetToTileStack", callMethod("GetFactor", t_rNew), t_rTile, t_iStack)
  continue;
  }

  t_bReturn = 0;
  callNamed("error", _this, "Failed to create furni block!", symbol("_ComposeBlocks"))
  }

  if (lingoBinary("gt", t_ar_rBlocks.count, 0)) {
  for (var t_rBlock of t_ar_rBlocks.toArray()) {
  callMethod("Remove", callMethod("GetContext", t_rObj), callMethod("GetKey", t_rBlock))
  }

  t_ar_rBlocks = new LingoList([]);
  }

  return t_bReturn;
}

