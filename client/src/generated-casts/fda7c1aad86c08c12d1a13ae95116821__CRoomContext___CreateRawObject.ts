// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomContext / _CreateRawObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _CreateRawObject(_me: LingoMe, _this: LingoValue, a_iTypeCode: LingoValue, a_sCategory: LingoValue) {
  var t_rMbr = callNamed("getMember", lingoBinary("join", lingoBinary("join", "room.object.", a_sCategory), ".xml"));
  if (lingoBinary("gt", t_rMbr._number, 1)) {
  var t_rXML = callNamed("CreateXML", t_rMbr.text);
  callMethod("Search", t_rXML, "type", "NODE")
  } else {
  callNamed("error", _this, lingoBinary("joinPad", "Object definition XML not found:", a_sCategory), symbol("_CreateRawObject"))
  return undefined;
  }

  var t_rStruct = callMethod("GetByTypeCode", callNamed("getThread", symbol("room")).component.m_rFurniMap, a_iTypeCode);
  callMethod("SetParam", t_rXML, "REF", callNamed("string", -float(1)))
  callMethod("SetParam", t_rXML, "TYPE", callNamed("string", a_iTypeCode))
  callMethod("SetParam", t_rXML, "X", callNamed("string", 1))
  callMethod("SetParam", t_rXML, "Y", callNamed("string", 1))
  callMethod("SetParam", t_rXML, "Z", callNamed("string", 1))
  callMethod("SetParam", t_rXML, "DIR", callNamed("string", 3))
  callMethod("SetParam", t_rXML, "STRUCT", t_rStruct)
  var t_sKey = callMethod("createKey", _this);
  if (callMethod("create", _this, t_sKey, t_rXML)) {
  return callMethod("_Access", _this, t_sKey);
  } else {
  return undefined;
  }

}

