// 3f02613936ba018480acffaf92dd883a.cct / CVMKAnimationManager / CreateRoomAnimationObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateRoomAnimationObject(_me: LingoMe, a_sClass: LingoValue, a_iRef: LingoValue, a_mp_params: LingoValue) {
  var t_rXML = callNamed("CreateXML");
  if (lingoBinary("eq", callNamed("getMember", "empty.node.xml"), 0)) {
  callNamed("put", "Animation Manager has trouble finding the empty-node xml member")
  }

  callMethod("open", t_rXML, callNamed("member", "empty.node.xml").text)
  callMethod("Search", t_rXML, "type", "NODE")
  callMethod("SetParam", t_rXML, "REF", a_iRef)
  callMethod("SetParam", t_rXML, "CLASS", a_sClass)
  var t_rRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", "room")));
  callMethod("_CreateIndexed", t_rRoomContext, a_iRef, a_sClass, t_rXML)
  var t_rAnimationObject = callMethod("_AccessIndexed", t_rRoomContext, a_iRef, a_sClass);
  for (var i = 1; i <= a_mp_params.count; ++i) {
  var tKey = callMethod("getPropAt", a_mp_params, i);
  var tvalue = callMethod("getaProp", a_mp_params, tKey);
  callMethod("SetParam", t_rAnimationObject, tKey, tvalue)
  }

  return t_rAnimationObject;
}

