// vmk_hm_minigame.cct / CHMStage / DumpFurni

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DumpFurni(_me: LingoMe, a_rContext: LingoValue) {
  callNamed("put", "DUMPING FURNI")
  if (callNamed("voidp", a_rContext)) {
  return callNamed("error", _me, "Room context not available!", symbol("DumpFurni"));
  }

  var t_editorMode = callNamed("getThread", "HauntedMansionEditor");
  if (lingoBinary("neq", t_editorMode, 0)) {
  callMethod("hideAnimationNodes", _me)
  callMethod("hideVortex", _me)
  } else {
  callMethod("hideVortex", _me)
  }

  setMeProp(_me, "m_ar_rRattlers", new LingoPropList([]));
  var t_rXMLElement = callNamed("CreateXML", callNamed("getMember", "room.object.element.xml").text);
  callMethod("Search", t_rXMLElement, "type", "NODE")
  var t_rFurniMap = callNamed("getThread", "room").component.m_rFurniMap;
  var t_delim = theProperty("itemDelimiter");
  setTheProperty("itemDelimiter", ",");
  for (var i = 1; i <= meProp(_me, "m_ar_items").count; ++i) {
  var tItem = meProp(_me, "m_ar_items")[i];
  var t_iRef = tItem[symbol("param")]["REF"];
  var t_iTypeCode = tItem[symbol("param")]["CODE"];
  var t_iCategory = 1;
  var t_iPlaceRef = tItem[symbol("param")]["TILE"];
  var t_sItemName = tItem[symbol("param")]["NAME"];
  var t_sPos = tItem[symbol("param")]["POS"];
  if ((lingoTruthy(callNamed("voidp", t_sPos)) ? 0 : 1)) {
  var t_vPos = callNamed("vector", callNamed("float", t_sPos.item[1]), callNamed("float", t_sPos.item[2]), callNamed("float", t_sPos.item[3]));
  }

  var t_rStruct = callMethod("GetByTypeCode", t_rFurniMap, t_iTypeCode);
  var t_ar_iParams = new LingoList([]);
  var t_iDir = tItem[symbol("param")]["DIR"];
  var t_iState = 0;
  callMethod("SetParam", t_rXMLElement, "REF", callNamed("string", t_iRef))
  callMethod("SetParam", t_rXMLElement, "TYPE", callNamed("string", t_iTypeCode))
  callMethod("SetParam", t_rXMLElement, "DIR", callNamed("string", t_iDir))
  callMethod("SetParam", t_rXMLElement, "STATE", callNamed("string", t_iState))
  callMethod("SetParam", t_rXMLElement, "STRUCT", t_rStruct)
  callMethod("SetParam", t_rXMLElement, "HAUNTEDMANSION_TYPE", tItem._type)
  var t_bDoorOK = 0;
  if (lingoBinary("eq", tItem._type, "DOOR")) {
  if ((lingoTruthy(callNamed("voidp", t_sItemName)) ? 0 : 1)) {
  if (lingoBinary("gt", t_sItemName.length, 0)) {
  t_bDoorOK = 1;
  }

  }

  }

  if (t_bDoorOK) {
  callMethod("SetParam", t_rXMLElement, "HM_NAME", t_sItemName)
  } else {
  var t_param = callMethod("GetParam", t_rXMLElement, "HM_NAME");
  callMethod("SetParam", t_rXMLElement, "HM_NAME", "")
  if (lingoBinary("neq", t_param, 0)) {
  callMethod("RemParam", t_rXMLElement, "HM_NAME")
  }

  }

  var t_rTile = callMethod("_AccessIndexed", a_rContext, t_iPlaceRef, "tile");
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

  t_editorMode = callNamed("getThread", "HauntedMansionEditor");
  if (lingoBinary("eq", t_editorMode, 0)) {
  switch (tItem._type) {
case "DOOR":
  break;
case "LOOP":
  continue;
  }

  }

  if (callMethod("_CreateIndexed", a_rContext, t_iRef, "element", t_rXMLElement)) {
  if (callMethod("SetToTileStack", callMethod("GetFactor", callMethod("_AccessIndexed", a_rContext, t_iRef, "element")), t_rTile, t_iStack)) {
  var t_rObj = callMethod("_AccessIndexed", a_rContext, t_iRef, "element");
  callMethod("setState", callMethod("GetFactor", t_rObj), t_iState)
  callMethod("LoadCastLibsForItem", callNamed("getObject", "RoomItemAssetManager"), t_rObj)
  if (lingoBinary("eq", tItem._type, "COFFIN")) {
  var tRattler = callNamed("createObject", symbol("random"), "CHMCoffinRattler");
  callMethod("LinkTo", tRattler, t_rObj, t_rTile)
  meProp(_me, "m_ar_rRattlers")[callNamed("string", t_iRef)] = tRattler;
  } else {
  if (lingoBinary("eq", tItem._type, "DOOR")) {
  var t_rLinkObj = t_rObj;
  callMethod("createDoor", callMethod("getComponent", callNamed("getThread", "hauntedmansiongame")), t_iRef, t_sItemName, t_rLinkObj)
  } else {
  }

  }

  for (var t_rBlk of callMethod("GetBlocks", callMethod("GetFactor", t_rObj)).toArray()) {
  callMethod("SetParam", t_rBlk, "CLASS", "hmblock")
  }

  } else {
  callNamed("error", _me, "Failed to set item into a tile!", symbol("DumpFurni"))
  }

  }

  continue;
  }

  callNamed("error", _me, lingoBinary("joinPad", "Referred tile not found:", t_iPlaceRef), symbol("DumpFurni"))
  }

}

