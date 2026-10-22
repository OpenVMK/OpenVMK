// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomHandler / _CreateElements

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _CreateElements(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_rInput = a_rMsg.connection;
  var t_rLoader = callNamed("getObject", "RoomItemAssetManager");
  var t_rContext = callMethod("_AccessRoom", callMethod("getComponent", _this));
  if (callNamed("voidp", t_rContext)) {
  return callNamed("error", _this, "Room context not available!", symbol("_CreateElements"));
  }

  var t_rFurniMap = _this.component.m_rFurniMap;
  var t_iCount = callMethod("GetIntFrom", t_rInput);
  for (var i = 1; i <= t_iCount; ++i) {
  var t_iRef = callMethod("GetIntFrom", t_rInput);
  var t_iTypeCode = callMethod("GetIntFrom", t_rInput);
  var t_iCategory = callMethod("GetIntFrom", t_rInput);
  var t_iPlaceRef = callMethod("GetIntFrom", t_rInput);
  var t_iAllowGuestMove = callMethod("GetIntFrom", t_rInput);
  var t_rStruct = callMethod("GetByTypeCode", t_rFurniMap, t_iTypeCode);
  var t_iPrm = callMethod("GetIntFrom", t_rInput);
  var t_ar_iParams = new LingoList([]);
  switch (t_iCategory) {
case 1:
case 5:
  var t_iDir = callMethod("GetIntFrom", t_rInput);
  t_iPrm = lingoBinary("sub", t_iPrm, 1);
  if (t_iPrm) {
  var t_iState = callMethod("GetIntFrom", t_rInput);
  t_iPrm = lingoBinary("sub", t_iPrm, 1);
  } else {
  t_iState = 0;
  }

  if (lingoBinary("gt", t_iPrm, 0)) {
  var t_ar_Params = new LingoList([]);
  for (var j = 1; j <= t_iPrm; ++j) {
  callMethod("append", t_ar_Params, callMethod("GetIntFrom", t_rInput))
  }

  } else {
  t_ar_Params = undefined;
  }

  callMethod("SetParam", meProp(_me, "m_rXMLElement"), "REF", callNamed("string", t_iRef))
  callMethod("SetParam", meProp(_me, "m_rXMLElement"), "TYPE", callNamed("string", t_iTypeCode))
  callMethod("SetParam", meProp(_me, "m_rXMLElement"), "DIR", callNamed("string", t_iDir))
  callMethod("SetParam", meProp(_me, "m_rXMLElement"), "STATE", callNamed("string", t_iState))
  callMethod("SetParam", meProp(_me, "m_rXMLElement"), "GUESTMOVE", callNamed("string", t_iAllowGuestMove))
  callMethod("SetParam", meProp(_me, "m_rXMLElement"), "STRUCT", t_rStruct)
  callMethod("SetParam", meProp(_me, "m_rXMLElement"), "PARAMS", t_ar_Params)
  var t_rTile = callMethod("_AccessIndexed", t_rContext, t_iPlaceRef, "tile");
  if (callNamed("objectp", t_rTile)) {
  var t_iStack = 0;
  var t_rCopy = t_rTile;
  while (1) {
  if (lingoBinary("gt", callMethod("GetCount", t_rCopy), 0)) {
  t_rCopy = t_rCopy[1];
  t_iStack = lingoBinary("add", t_iStack, 1);
  continue;
  }

  break;
  }

  if (callMethod("_CreateIndexed", t_rContext, t_iRef, "element", meProp(_me, "m_rXMLElement"))) {
  var t_rObject = callMethod("_AccessIndexed", t_rContext, t_iRef, "element");
  if (callMethod("SetToTileStack", callMethod("GetFactor", t_rObject), t_rTile, t_iStack)) {
  callMethod("LoadCastLibsForItem", t_rLoader, t_rObject)
  callMethod("setState", callMethod("GetFactor", t_rObject), t_iState)
  } else {
  callNamed("error", _this, "Failed to set item into a tile!", symbol("_CreateElements"))
  }

  }

  } else {
  callNamed("error", _this, lingoBinary("joinPad", "Referred tile not found:", t_iPlaceRef), symbol("_CreateElements"))
  }

  break;
case 3:
  var t_iX = callMethod("GetIntFrom", t_rInput);
  var t_iY = callMethod("GetIntFrom", t_rInput);
  var t_iZ = callMethod("GetIntFrom", t_rInput);
  t_iDir = 5;
  t_iPrm = lingoBinary("sub", t_iPrm, 3);
  for (var j = 1; j <= t_iPrm; ++j) {
  callMethod("add", t_ar_iParams, callMethod("GetIntFrom", t_rInput))
  }

  callMethod("SetParam", meProp(_me, "m_rXMLPoster"), "REF", callNamed("string", t_iRef))
  callMethod("SetParam", meProp(_me, "m_rXMLPoster"), "TYPE", callNamed("string", t_iTypeCode))
  callMethod("SetParam", meProp(_me, "m_rXMLPoster"), "DIR", callNamed("string", t_iDir))
  callMethod("SetParam", meProp(_me, "m_rXMLPoster"), "GUESTMOVE", callNamed("string", t_iAllowGuestMove))
  callMethod("SetParam", meProp(_me, "m_rXMLPoster"), "STRUCT", t_rStruct)
  var t_rWall = callMethod("_AccessIndexed", t_rContext, t_iPlaceRef, "wall");
  if (callNamed("objectp", t_rWall)) {
  if (callMethod("_CreateIndexed", t_rContext, t_iRef, "poster", meProp(_me, "m_rXMLPoster"))) {
  callMethod("PlaceTo", callMethod("GetFactor", callMethod("_AccessIndexed", t_rContext, t_iRef, "poster")), t_rWall, callNamed("vector", t_iX, t_iY, t_iZ))
  }

  } else {
  callNamed("error", _this, lingoBinary("joinPad", "Referred wall not found:", t_iPlaceRef), symbol("_CreateElements"))
  }

  break;
case 6:
case 7:
  t_iDir = callMethod("GetIntFrom", t_rInput);
  t_iPrm = lingoBinary("sub", t_iPrm, 1);
  if (t_iPrm) {
  t_iState = callMethod("GetIntFrom", t_rInput);
  } else {
  t_iState = 0;
  }

  callMethod("SetParam", meProp(_me, "m_rXMLCollectable"), "REF", callNamed("string", t_iRef))
  callMethod("SetParam", meProp(_me, "m_rXMLCollectable"), "TYPE", callNamed("string", t_iTypeCode))
  callMethod("SetParam", meProp(_me, "m_rXMLCollectable"), "DIR", "5")
  callMethod("SetParam", meProp(_me, "m_rXMLCollectable"), "STATE", callNamed("string", t_iState))
  callMethod("SetParam", meProp(_me, "m_rXMLCollectable"), "STRUCT", t_rStruct)
  t_rTile = callMethod("_AccessIndexed", t_rContext, t_iPlaceRef, "tile");
  if (callNamed("objectp", t_rTile)) {
  t_iStack = 0;
  t_rCopy = t_rTile;
  while (1) {
  if (lingoBinary("gt", callMethod("GetCount", t_rCopy), 0)) {
  t_rCopy = t_rCopy[1];
  t_iStack = lingoBinary("add", t_iStack, 1);
  continue;
  }

  break;
  }

  if (callMethod("_CreateIndexed", t_rContext, t_iRef, "collectable", meProp(_me, "m_rXMLCollectable"))) {
  t_rObject = callMethod("_AccessIndexed", t_rContext, t_iRef, "collectable");
  var t_rFactor = callMethod("GetFactor", t_rObject);
  if (callMethod("SetToTileStack", t_rFactor, t_rTile, t_iStack)) {
  callMethod("LoadCastLibsForItem", t_rLoader, t_rObject)
  callMethod("setState", t_rFactor, t_iState)
  callMethod("PlaySound", t_rFactor, symbol("Appear"))
  } else {
  callNamed("error", _this, "Failed to set item into a tile!", symbol("_CreateElements"))
  }

  } else {
  callNamed("error", _this, "Failed to create collectable!", symbol("_CreateElements"))
  }

  } else {
  callNamed("error", _this, lingoBinary("joinPad", "Referred tile not found:", t_iPlaceRef), symbol("_CreateElements"))
  }

  break;
  default:
  callNamed("error", _this, lingoBinary("joinPad", "Unsupported item category:", t_iCategory), symbol("_CreateElements"))
  for (var j = 1; j <= t_iPrm; ++j) {
  callMethod("add", t_ar_iParams, callMethod("GetIntFrom", t_rInput))
  }

  break;
  break;
  }

  }

}

