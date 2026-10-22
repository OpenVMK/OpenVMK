// vmk_cambodian_handler.cct / CCambodianTempleHandlerInterface / CreateRoomObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateRoomObject(_me: LingoMe, a_sClass: LingoValue, a_iRef: LingoValue, a_mp_params: LingoValue) {
  var t_rRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", "room")));
  var t_rXML = callNamed("CreateXML");
  callMethod("open", t_rXML, callNamed("getMember", "empty.node.xml").text)
  callMethod("Search", t_rXML, "type", "NODE")
  callMethod("SetParam", t_rXML, "REF", a_iRef)
  callMethod("SetParam", t_rXML, "CLASS", a_sClass)
  callMethod("_CreateIndexed", t_rRoomContext, a_iRef, a_sClass, t_rXML)
  var tNewObject = callMethod("_AccessIndexed", t_rRoomContext, a_iRef, a_sClass);
  callMethod("SetParam", tNewObject, "Reference", a_iRef)
  for (var i = 1; i <= a_mp_params.count; ++i) {
  var tKey = callMethod("getPropAt", a_mp_params, i);
  var tvalue = callMethod("getaProp", a_mp_params, tKey);
  callMethod("SetParam", tNewObject, tKey, tvalue)
  }

  return tNewObject;
}

