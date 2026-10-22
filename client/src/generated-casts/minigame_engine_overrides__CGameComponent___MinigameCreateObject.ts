// minigame_engine_overrides.cct / CGameComponent / _MinigameCreateObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _MinigameCreateObject(_me: LingoMe, i_sName: LingoValue, i_params: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", _me.m_rRoomContext)) ? 0 : 1)) {
  if (lingoBinary("eq", _me.m_iAllocationModel, symbol("simple"))) {
  var t_rXML = callNamed("CreateXML");
  callMethod("open", t_rXML, callNamed("getMember", "empty.node.xml").text)
  callMethod("Search", t_rXML, "type", "NODE")
  callMethod("SetParam", t_rXML, "REF", i_params.ref)
  callMethod("SetParam", t_rXML, "CLASS", callMethod("getaProp", _me.m_mp_sObject, i_params._type))
  callMethod("_CreateIndexed", _me.m_rRoomContext, i_params.ref, callMethod("getaProp", _me.m_mp_sObject, i_params._type), t_rXML)
  var tNewObject = callMethod("_AccessIndexed", _me.m_rRoomContext, i_params.ref, callMethod("getaProp", _me.m_mp_sObject, i_params._type));
  } else {
  if (lingoBinary("eq", _me.m_iAllocationModel, symbol("pooled"))) {
  tNewObject = callMethod("newObject", _me.m_rObjectPool, callMethod("getaProp", _me.m_mp_sObject, i_params._type));
  }

  }

  var tFactor = callMethod("GetFactor", tNewObject);
  if (callNamed("voidp", tNewObject)) {
  callNamed("error", _me, "FATAL ERROR : Minigame object create unsuccessful", symbol("_MinigameCreateObject"))
  } else {
  callMethod("SetParam", tNewObject, "Reference", i_params.ref)
  callMethod("SetParam", tNewObject, "Owner", i_params.owner)
  callMethod("SetParam", tNewObject, "Team", i_params.team)
  callMethod("SetParam", tNewObject, "WorldPosition", i_params.worldpos)
  callMethod("SetParam", tNewObject, "Direction", i_params.Dir)
  callMethod("SetParam", tNewObject, "ObjectCode", i_params._type)
  callMethod("SetParam", tNewObject, "GameParams", callMethod("duplicate", i_params.extra))
  callMethod("SetParam", tNewObject, "BoundsType", symbol("point"))
  callNamed("call", symbol("SetConstants"), new LingoList([tFactor]))
  }

  return tNewObject;
  }

}

