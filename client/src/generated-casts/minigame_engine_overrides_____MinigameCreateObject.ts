// minigame_engine_overrides.cct /  / _MinigameCreateObject

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
  var tFactor = callNamed("CreateXML");
  callMethod("open", tFactor, callNamed("getMember", "empty.node.xml").text)
  callMethod("Search", tFactor, "type", "NODE")
  callMethod("SetParam", tFactor, "REF", i_params.ref)
  callMethod("SetParam", tFactor, "CLASS", callMethod("getaProp", _me.m_mp_sObject, i_params._type))
  callMethod("_CreateIndexed", _me.m_rRoomContext, i_params.ref, callMethod("getaProp", _me.m_mp_sObject, i_params._type), tFactor)
  var t_rXML = callMethod("_AccessIndexed", _me.m_rRoomContext, i_params.ref, callMethod("getaProp", _me.m_mp_sObject, i_params._type));
  } else {
  if (lingoBinary("eq", _me.m_iAllocationModel, symbol("pooled"))) {
  t_rXML = callMethod("newObject", _me.m_rObjectPool, callMethod("getaProp", _me.m_mp_sObject, i_params._type));
  }

  }

  var tNewObject = callMethod("GetFactor", t_rXML);
  if (callNamed("voidp", t_rXML)) {
  callNamed("error", _me, "FATAL ERROR : Minigame object create unsuccessful", symbol("_MinigameCreateObject"))
  } else {
  callMethod("SetParam", t_rXML, "Reference", i_params.ref)
  callMethod("SetParam", t_rXML, "Owner", i_params.owner)
  callMethod("SetParam", t_rXML, "Team", i_params.team)
  callMethod("SetParam", t_rXML, "WorldPosition", i_params.worldpos)
  callMethod("SetParam", t_rXML, "Direction", i_params.Dir)
  callMethod("SetParam", t_rXML, "ObjectCode", i_params._type)
  callMethod("SetParam", t_rXML, "GameParams", callMethod("duplicate", i_params.extra))
  callMethod("SetParam", t_rXML, "BoundsType", symbol("point"))
  callNamed("call", symbol("SetConstants"), new LingoList([tNewObject]))
  }

  return t_rXML;
  }

}

