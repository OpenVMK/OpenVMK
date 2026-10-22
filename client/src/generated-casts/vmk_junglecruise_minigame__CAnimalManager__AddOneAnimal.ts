// vmk_junglecruise_minigame.cct / CAnimalManager / AddOneAnimal

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AddOneAnimal(_me: LingoMe, i_ref: LingoValue, i_iType: LingoValue) {
  if (callNamed("voidp", meProp(_me, "m_stage"))) {
  return callNamed("error", _me, "Stage not valid!", symbol("AddOneAnimal"));
  }

  if (callNamed("voidp", meProp(_me, "m_roomContext"))) {
  return callNamed("error", _me, "Room context not valid!", symbol("AddOneAnimal"));
  }

  var tSet = callMethod("GetAnimalSet", meProp(_me, "m_stage"), i_iType);
  if ((lingoTruthy(callNamed("voidp", tSet)) ? 0 : 1)) {
  var t_ar_iReserved = callMethod("getaProp", meProp(_me, "m_mp_ar_spotsTaken"), tSet.name);
  if (callNamed("voidp", t_ar_iReserved)) {
  callMethod("setaProp", meProp(_me, "m_mp_ar_spotsTaken"), tSet.name, new LingoList([]))
  t_ar_iReserved = callMethod("getaProp", meProp(_me, "m_mp_ar_spotsTaken"), tSet.name);
  }

  var tSpotIndex = callNamed("random", tSet.Spots.count);
  if (lingoBinary("neq", callMethod("getPos", t_ar_iReserved, tSpotIndex), 0)) {
  for (var i = 1; i <= tSet.Spots.count; ++i) {
  if (lingoBinary("eq", callMethod("getPos", t_ar_iReserved, i), 0)) {
  break;
  }

  }

  if (lingoBinary("lt", i, tSet.Spots.count)) {
  tSpotIndex = i;
  } else {
  return;
  }

  }

  var t_rXML = callNamed("CreateXML");
  callMethod("open", t_rXML, callNamed("getMember", "empty.node.xml").text)
  callMethod("Search", t_rXML, "type", "NODE")
  callMethod("SetParam", t_rXML, "REF", i_ref)
  callMethod("SetParam", t_rXML, "CLASS", "animal")
  callMethod("_CreateIndexed", meProp(_me, "m_roomContext"), i_ref, "animal", t_rXML)
  var tRoomObj = callMethod("_AccessIndexed", meProp(_me, "m_roomContext"), i_ref, "animal");
  callMethod("SetOwner", tRoomObj, meProp(_me, "m_roomContext"))
  if (callNamed("voidp", tRoomObj)) {
  return callNamed("error", _me, "FATAL ERROR : Animal object create unsuccesful", symbol("AddOneAnimal"));
  } else {
  callMethod("SetParam", tRoomObj, "Reference", i_ref)
  callMethod("SetParam", tRoomObj, "Type", i_iType)
  callMethod("SetParam", tRoomObj, "WorldPosition", tSet.Spots[tSpotIndex].pos)
  callMethod("SetParam", tRoomObj, "Time", callNamed("float", tSet.Spots[tSpotIndex].time))
  callMethod("SetParam", tRoomObj, "Flip", callNamed("float", tSet.Spots[tSpotIndex].flip))
  callMethod("SetParam", tRoomObj, "Scale", callNamed("float", tSet.Spots[tSpotIndex].scale))
  callMethod("SetParam", tRoomObj, "FullTime", callNamed("float", tSet.Spots[tSpotIndex].time))
  callMethod("SetParam", tRoomObj, "Entry", callMethod("CreateMemberListFromLoop", _me, callMethod("getaProp", meProp(_me, "m_mp_animalDecl"), i_iType).entry))
  callMethod("SetParam", tRoomObj, "Loop", callMethod("CreateMemberListFromLoop", _me, callMethod("getaProp", meProp(_me, "m_mp_animalDecl"), i_iType).loop))
  callMethod("SetParam", tRoomObj, "Leave", callMethod("CreateMemberListFromLoop", _me, callMethod("getaProp", meProp(_me, "m_mp_animalDecl"), i_iType).leave))
  callMethod("SetParam", tRoomObj, "IsBlocker", callMethod("getaProp", meProp(_me, "m_mp_animalDecl"), i_iType).blocker)
  callMethod("SetParam", tRoomObj, "IsScared", callMethod("getaProp", meProp(_me, "m_mp_animalDecl"), i_iType).scared)
  callMethod("SetParam", tRoomObj, "State", symbol("entry"))
  callMethod("SetParam", tRoomObj, "FrameNum", 0)
  callMethod("SetParam", tRoomObj, "Boat", meProp(_me, "m_boat"))
  callMethod("SetParam", tRoomObj, "Spot", tSpotIndex)
  callMethod("SetParam", tRoomObj, "AnimalSet", tSet.name)
  var tRadius = callNamed("getVariableValue", "junglecruise.collisionBoundary.radius.animal");
  if (lingoBinary("eq", tRadius, 0)) {
  tRadius = 10;
  }

  callMethod("SetParam", tRoomObj, "BoundingCircleRadius", tRadius)
  var tVisualizer = callMethod("GetVisual", tRoomObj);
  var tFactor = callMethod("GetFactor", tRoomObj);
  }

  callMethod("playFx", callMethod("getComponent", callNamed("getThread", "junglecruise")), tSet.sound)
  setMeProp(_me, "m_iNextPuffRef", lingoBinary("add", meProp(_me, "m_iNextPuffRef"), 1));
  callMethod("CreatePuff", _me, tSet.Spots[tSpotIndex].pos, meProp(_me, "m_iNextPuffRef"), callNamed("float", tSet.Spots[tSpotIndex].scale))
  callMethod("addProp", meProp(_me, "m_mp_visibleAnimals"), i_ref, tRoomObj)
  callMethod("append", t_ar_iReserved, tSpotIndex)
  callMethod("setaProp", meProp(_me, "m_mp_ar_spotsTaken"), tSet.name, t_ar_iReserved)
  }

}

