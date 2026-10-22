// 2230483a2e5366aa24e52c1b02d9674c.cct /  / handle_roomitems

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function handle_roomitems(_me: LingoMe, a_rMsg: LingoValue) {
  /* global */ var g_rCore = globalVar("g_rCore");
  var t_rInput = a_rMsg.connection;
  var t_rContext = callMethod("_AccessRoom", callNamed("getObject", symbol("room_component")));
  var t_iCount = callMethod("GetIntFrom", t_rInput);
  var t_rLoader = callNamed("getObject", "RoomItemAssetManager");
  var t_rFurniMap = callNamed("getObject", symbol("room_component")).m_rFurniMap;
  for (var i = 1; i <= t_iCount; ++i) {
  var t_iRef = callMethod("GetIntFrom", t_rInput);
  var t_iTypeCode = callMethod("GetIntFrom", t_rInput);
  var t_iCategory = callMethod("GetIntFrom", t_rInput);
  var t_iPlaceRef = callMethod("GetIntFrom", t_rInput);
  var t_iAllowGuestMove = callMethod("GetIntFrom", t_rInput);
  var t_iDir = callMethod("GetIntFrom", t_rInput);
  var t_rStruct = callMethod("GetByTypeCode", t_rFurniMap, t_iTypeCode);
  var t_iState = callMethod("GetIntFrom", t_rInput);
  var t_iStack = callMethod("GetIntFrom", t_rInput);
  var t_ar_iParams = new LingoList([]);
  var t_iParamCount = callMethod("GetIntFrom", t_rInput);
  for (var j = 1; j <= t_iParamCount; ++j) {
  callMethod("append", t_ar_iParams, callMethod("GetIntFrom", t_rInput))
  }

  var t_rCopy = callMethod("_AccessIndexed", t_rContext, t_iPlaceRef, "tile");
  t_iStack = 0;
  while (lingoBinary("gt", t_rCopy, 0)) {
  t_iStack = lingoBinary("add", t_iStack, 1);
  t_rCopy = t_rCopy[1];
  }

  var t_rXMLElement = callNamed("getObject", symbol("room_handler")).m_rXMLElement;
  callMethod("SetParam", t_rXMLElement, "REF", callNamed("string", t_iRef))
  callMethod("SetParam", t_rXMLElement, "TYPE", callNamed("string", t_iTypeCode))
  callMethod("SetParam", t_rXMLElement, "DIR", callNamed("string", t_iDir))
  callMethod("SetParam", t_rXMLElement, "STATE", callNamed("string", t_iState))
  callMethod("SetParam", t_rXMLElement, "GUESTMOVE", callNamed("string", t_iAllowGuestMove))
  callMethod("SetParam", t_rXMLElement, "STRUCT", t_rStruct)
  callMethod("SetParam", t_rXMLElement, "PARAMS", t_ar_iParams)
  callNamed("trace", lingoBinary("joinPad", "FURNITURE TILE:", t_iPlaceRef))
  var t_rTile = callMethod("_AccessIndexed", t_rContext, t_iPlaceRef, "tile");
  if (callNamed("objectp", t_rTile)) {
  if (callMethod("_CreateIndexed", t_rContext, t_iRef, "element", t_rXMLElement)) {
  var t_rObject = callMethod("_AccessIndexed", t_rContext, t_iRef, "element");
  if (callMethod("SetToTileStack", callMethod("GetFactor", t_rObject), t_rTile, t_iStack)) {
  callMethod("LoadCastLibsForItem", t_rLoader, t_rObject)
  callMethod("setState", callMethod("GetFactor", t_rObject), t_iState)
  callNamed("trace", lingoBinary("joinPad", lingoBinary("joinPad", "Set state:", t_iState), t_iDir))
  } else {
  callNamed("error", _me, "Failed to set item into a tile!", symbol("handle_roomitems"))
  }

  } else {
  callNamed("error", _me, "Failed to create item!", symbol("handle_roomitems"))
  }

  continue;
  }

  callNamed("error", _me, "Tile does not exist!", symbol("handle_roomitems"))
  }

  callNamed("trace", "repeat finished")
}

