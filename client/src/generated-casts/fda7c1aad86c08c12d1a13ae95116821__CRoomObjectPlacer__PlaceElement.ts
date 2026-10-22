// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomObjectPlacer / PlaceElement

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlaceElement(_me: LingoMe, _this: LingoValue, a_iCode: LingoValue) {
  if (meProp(_me, "m_bRunning")) {
  callNamed("error", _this, "Object placer already running!", symbol("PlaceElement"))
  return;
  }

  var t_rStruct = callMethod("GetByTypeCode", callNamed("getThread", symbol("room")).component.m_rFurniMap, a_iCode);
  if (lingoBinary("neq", callNamed("integer", t_rStruct.param["CODE"]), a_iCode)) {
  callNamed("error", _this, lingoBinary("joinPad", "Item definition not found:", a_iCode), symbol("PlaceElement"))
  return;
  }

  var t_rXML = callNamed("CreateXML", callNamed("getMember", "room.object.element.xml").text);
  callMethod("Search", t_rXML, "type", "NODE")
  callMethod("SetParam", t_rXML, "TYPE", callNamed("string", a_iCode))
  callMethod("SetParam", t_rXML, "DIR", callNamed("string", 3))
  callMethod("SetParam", t_rXML, "STRUCT", t_rStruct)
  callMethod("SetParam", t_rXML, "REF", -float(1))
  setMeProp(_me, "m_rContext", callMethod("_AccessRoom", callNamed("getThread", symbol("room")).component));
  var t_sKey = callMethod("createKey", meProp(_me, "m_rContext"));
  if (callMethod("create", callMethod("GetContext", meProp(_me, "m_rContext")), t_sKey, t_rXML)) {
  setMeProp(_me, "m_rMovable", callMethod("Access", meProp(_me, "m_rContext"), t_sKey));
  } else {
  callNamed("error", _this, "Failed to create temp poster!!!", symbol("PlaceElement"))
  return;
  }

  callMethod("LoadCastLibsForItem", callNamed("getObject", "RoomItemAssetManager"), meProp(_me, "m_rMovable"))
  setMeProp(_me, "m_kMode", symbol("Place"));
  setMeProp(_me, "m_bRunning", 1);
  setMeProp(_me, "m_sLastOwner", "");
  setMeProp(_me, "m_veLastScrPos", callNamed("vector"));
  setMeProp(_me, "m_ptLastScrPos", callNamed("point", 0, 0));
  setMeProp(_me, "m_rContext", callMethod("GetContext", meProp(_me, "m_rMovable")));
  setMeProp(_me, "m_rIterator", callMethod("GetIterator", meProp(_me, "m_rContext"), "floor"));
  callNamed("createObject", "RoomObjPlacerEventAgent", "CEventAgent")
  callMethod("registerEvent", callNamed("getObject", "RoomObjPlacerEventAgent"), _this, symbol("mouseUp"), symbol("StopPlacement"))
  callNamed("receiveUpdate", callMethod("getID", _this))
}

