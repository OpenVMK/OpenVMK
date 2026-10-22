// vmk_junglecruise_minigame.cct / CPowerupManager / AddOnePowerup

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AddOnePowerup(_me: LingoMe, i_ref: LingoValue, i_type: LingoValue) {
  if (callNamed("voidp", meProp(_me, "m_stage"))) {
  return callNamed("error", _me, "Stage not valid!", symbol("AddOneAnimal"));
  }

  if (callNamed("voidp", meProp(_me, "m_roomContext"))) {
  return callNamed("error", _me, "Room context not valid!", symbol("AddOneAnimal"));
  }

  var tSpots = callMethod("GetPowerups", meProp(_me, "m_stage"), i_type);
  var tSpotIndex = callNamed("random", tSpots.count);
  var tSpotFree = 0;
  switch (i_type) {
case symbol("film"):
  if (lingoBinary("eq", callMethod("getOne", meProp(_me, "m_ar_filmoccupied"), tSpotIndex), 0)) {
  tSpotFree = 1;
  callMethod("append", meProp(_me, "m_ar_filmoccupied"), tSpotIndex)
  }

  break;
case symbol("fuel"):
  if (lingoBinary("eq", callMethod("getOne", meProp(_me, "m_ar_fueloccupied"), tSpotIndex), 0)) {
  tSpotFree = 1;
  callMethod("append", meProp(_me, "m_ar_fueloccupied"), tSpotIndex)
  }

  break;
  }

  if (lingoBinary("and", lingoBinary("gt", tSpots.count, 0), tSpotFree)) {
  var t_rXML = callNamed("CreateXML");
  callMethod("open", t_rXML, callNamed("getMember", "empty.node.xml").text)
  callMethod("Search", t_rXML, "type", "NODE")
  callMethod("SetParam", t_rXML, "REF", i_ref)
  callMethod("SetParam", t_rXML, "CLASS", "powerup")
  callMethod("_CreateIndexed", meProp(_me, "m_roomContext"), i_ref, "powerup", t_rXML)
  var tRoomObj = callMethod("_AccessIndexed", meProp(_me, "m_roomContext"), i_ref, "powerup");
  callMethod("SetOwner", tRoomObj, meProp(_me, "m_roomContext"))
  if (callNamed("voidp", tRoomObj)) {
  return callNamed("error", _me, "FATAL ERROR : Powerup object create unsuccesful", symbol("AddOnePowerup"));
  } else {
  callMethod("SetParam", tRoomObj, "Reference", i_ref)
  callMethod("SetParam", tRoomObj, "Type", i_type)
  callMethod("SetParam", tRoomObj, "WorldPosition", tSpots[tSpotIndex].pos)
  callMethod("SetParam", tRoomObj, "Picked", 0)
  callMethod("SetParam", tRoomObj, "BoundsType", symbol("circle"))
  var tRadius = callNamed("getVariableValue", lingoBinary("join", "junglecruise.collisionBoundary.radius.powerUp.", i_type));
  if (lingoBinary("eq", tRadius, 0)) {
  tRadius = 10;
  }

  callMethod("SetParam", tRoomObj, "BoundingCircleRadius", tRadius)
  callMethod("SetParam", tRoomObj, "Boat", meProp(_me, "m_boat"))
  callMethod("SetParam", tRoomObj, "SpotIndex", tSpotIndex)
  var tVisualizer = callMethod("GetVisual", tRoomObj);
  var tFactor = callMethod("GetFactor", tRoomObj);
  }

  callMethod("append", meProp(_me, "m_ar_visiblePowerups"), tRoomObj)
  return 1;
  }

  return 0;
}

