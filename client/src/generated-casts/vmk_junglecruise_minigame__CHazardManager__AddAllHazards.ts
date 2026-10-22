// vmk_junglecruise_minigame.cct / CHazardManager / AddAllHazards

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AddAllHazards(_me: LingoMe) {
  if (callNamed("voidp", meProp(_me, "m_stage"))) {
  return callNamed("error", _me, "Stage not valid!", symbol("AddAllHazards"));
  }

  if (callNamed("voidp", meProp(_me, "m_roomContext"))) {
  return callNamed("error", _me, "Room context not valid!", symbol("AddAllHazards"));
  }

  var i = 1;
  var i_iType = 1;
  for (var tHazard of callMethod("GetHazards", meProp(_me, "m_stage")).toArray()) {
  switch (tHazard[symbol("type")]) {
case symbol("rock"):
  var t_rXML = callNamed("CreateXML");
  callMethod("open", t_rXML, callNamed("getMember", "empty.node.xml").text)
  callMethod("Search", t_rXML, "type", "NODE")
  callMethod("SetParam", t_rXML, "REF", i)
  callMethod("SetParam", t_rXML, "CLASS", "rock")
  callMethod("_CreateIndexed", meProp(_me, "m_roomContext"), i, "rock", t_rXML)
  var tRock = callMethod("_AccessIndexed", meProp(_me, "m_roomContext"), i, "rock");
  callMethod("SetParam", tRock, "Reference", i)
  callMethod("SetParam", tRock, "WorldPosition", tHazard[symbol("pos")])
  callMethod("SetParam", tRock, "BoundsType", symbol("circle"))
  var tRadius = callNamed("getVariableValue", "junglecruise.collisionBoundary.radius.hazard");
  if (lingoBinary("eq", tRadius, 0)) {
  tRadius = 10;
  }

  callMethod("SetParam", tRock, "BoundingCircleRadius", tRadius)
  callMethod("SetParam", tRock, "Boat", meProp(_me, "m_boat"))
  callMethod("SetParam", tRock, "IsHit", 0)
  callMethod("SetParam", tRock, "Entry", callMethod("CreateMemberListFromLoop", _me, callMethod("getaProp", meProp(_me, "m_mp_elementDecl"), i_iType).entry))
  callMethod("SetParam", tRock, "Loop", callMethod("CreateMemberListFromLoop", _me, callMethod("getaProp", meProp(_me, "m_mp_elementDecl"), i_iType).loop))
  callMethod("SetParam", tRock, "Leave", callMethod("CreateMemberListFromLoop", _me, callMethod("getaProp", meProp(_me, "m_mp_elementDecl"), i_iType).leave))
  callMethod("SetParam", tRock, "State", symbol("loop"))
  callMethod("SetParam", tRock, "FrameNum", 0)
  callMethod("append", meProp(_me, "m_ar_visibleHazards"), tRock)
  break;
  }

  i = lingoBinary("add", i, 1);
  }

  return 1;
}

