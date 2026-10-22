// vmk_junglecruise_minigame.cct / CJungleCruiseComponent / InitStage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function InitStage(_me: LingoMe, m_rContext: LingoValue) {
  callNamed("put", "CJungleCruiseComponent::InitStage - begin")
  if ((lingoTruthy(meProp(_me, "m_prepared")) ? 0 : 1)) {
  callNamed("put", "Preparing room")
  callMethod("PrepareRoom", _me)
  }

  setMeProp(_me, "m_bInitializedFully", 0);
  if ((lingoTruthy(meProp(_me, "m_initialized")) ? 0 : 1)) {
  callMethod("Define", meProp(_me, "m_rMotorSound"), "JC-boat-motor")
  callMethod("SetSoundType", meProp(_me, "m_rMotorSound"), "fx")
  var t_bOn = callMethod("get", callNamed("getObject", symbol("session")), "fx");
  if (t_bOn) {
  callMethod("PlaySound", meProp(_me, "m_rMotorSound"))
  }

  setMeProp(_me, "m_initialized", 1);
  }

  callMethod("StartMinigameEngine", callMethod("getComponent", callNamed("getThread", "minigame")))
  if (lingoBinary("neq", meProp(_me, "m_stage"), 0)) {
  setMeProp(_me, "m_gameOn", 1);
  callNamed("executeMessage", symbol("stop_Music"))
  callNamed("executeMessage", symbol("stop_AllSounds"))
  if (callMethod("get", callNamed("getObject", symbol("session")), "music")) {
  callMethod("music", meProp(_me, "m_rSoundPlayer"), callNamed("getMember", callMethod("GetMusic", meProp(_me, "m_stage"))))
  }

  if (callMethod("get", callNamed("getObject", symbol("session")), "fx")) {
  callMethod("Atmos", meProp(_me, "m_rSoundPlayer"), callNamed("getMember", callMethod("GetAtmosphere", meProp(_me, "m_stage"))))
  }

  var t_rRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", "room")));
  for (var i = 1; i <= 49; ++i) {
  if (lingoBinary("lt", i, 10)) {
  var tAppendix = lingoBinary("join", "00", i);
  } else {
  if (lingoBinary("lt", i, 100)) {
  tAppendix = lingoBinary("join", "0", i);
  } else {
  tAppendix = i;
  }

  }

  var tNode = callMethod("Search", t_rRoomContext, "NAME", lingoBinary("join", "mickey", tAppendix));
  if (lingoBinary("neq", tNode, 0)) {
  setThePropOf(callMethod("getSprite", callMethod("GetVisual", tNode)), "member", undefined);
  }

  }

  callMethod("HideSubNodeGraphics", _me, t_rRoomContext, "NAME", "jcanimals")
  callMethod("HideSubNodeGraphics", _me, t_rRoomContext, "NAME", "jcpowerups")
  callMethod("HideSubNodeGraphics", _me, t_rRoomContext, "NAME", "jchazards")
  callMethod("HideNodeGraphics", _me, t_rRoomContext, "NAME", "vmk_anim_7")
  var t_rPointer = callMethod("Search", t_rRoomContext, "NAME", "pointer");
  while ((lingoTruthy(callNamed("voidp", t_rPointer)) ? 0 : 1)) {
  callMethod("Remove", t_rRoomContext, callMethod("GetKey", t_rPointer))
  t_rPointer = callMethod("Search", t_rRoomContext, "NAME", "pointer");
  }

  var t_rXML = callNamed("CreateXML");
  callMethod("open", t_rXML, callNamed("getMember", "empty.node.xml").text)
  callMethod("Search", t_rXML, "type", "NODE")
  callMethod("SetParam", t_rXML, "REF", 1)
  callMethod("SetParam", t_rXML, "CLASS", "boat")
  callMethod("_CreateIndexed", t_rRoomContext, 1, "boat", t_rXML)
  setMeProp(_me, "m_boat", callMethod("_AccessIndexed", t_rRoomContext, 1, "boat"));
  callMethod("SetOwner", meProp(_me, "m_boat"), t_rRoomContext)
  if (callNamed("voidp", meProp(_me, "m_boat"))) {
  return callNamed("error", _me, "FATAL ERROR : Boat object create unsuccesful", symbol("Contruct"));
  } else {
  callMethod("SetParam", meProp(_me, "m_boat"), "Reference", 1)
  callMethod("SetParam", meProp(_me, "m_boat"), "Color", meProp(_me, "m_Color"))
  callMethod("SetParam", meProp(_me, "m_boat"), "Direction", callMethod("getDirection", meProp(_me, "m_stage")))
  callMethod("SetParam", meProp(_me, "m_boat"), "SpotOn", callMethod("GetSpot", meProp(_me, "m_stage")))
  callMethod("SetParam", meProp(_me, "m_boat"), "Fuel", meProp(_me, "m_fuel"))
  callMethod("SetParam", meProp(_me, "m_boat"), "Film", meProp(_me, "m_film"))
  callMethod("SetParam", meProp(_me, "m_boat"), "Throttle", meProp(_me, "m_throttle"))
  callMethod("SetParam", meProp(_me, "m_boat"), "Steer", float(0))
  callMethod("SetParam", meProp(_me, "m_boat"), "Stage", meProp(_me, "m_stage"))
  callMethod("SetParam", meProp(_me, "m_boat"), "BoundsType", symbol("circle"))
  var tRadius = callNamed("getVariableValue", "junglecruise.collisionBoundary.radius.boat");
  if (lingoBinary("eq", tRadius, 0)) {
  tRadius = 20;
  }

  callMethod("SetParam", meProp(_me, "m_boat"), "BoundingCircleRadius", tRadius)
  callMethod("SetParam", meProp(_me, "m_boat"), "AvatarOn", 1)
  callMethod("SetParam", meProp(_me, "m_boat"), "Velocity", callNamed("vector", 0, 0, 0))
  callMethod("SetParam", meProp(_me, "m_boat"), "WorldPosition", callMethod("InterpolateAt", callMethod("GetBaseSpline", meProp(_me, "m_stage")), float(0)))
  callMethod("update", callMethod("GetFactor", meProp(_me, "m_boat")))
  }

  var tdir = 1;
  if (lingoBinary("eq", callMethod("getDirection", meProp(_me, "m_stage")), "down")) {
  tdir = 3;
  }

  callMethod("DrawAvatar", _me, tdir)
  callMethod("SetRoomContext", meProp(_me, "m_animalMgr"), t_rRoomContext)
  callMethod("SetStage", meProp(_me, "m_animalMgr"), meProp(_me, "m_stage"))
  callMethod("SetBoat", meProp(_me, "m_animalMgr"), meProp(_me, "m_boat"))
  callMethod("SetRoomContext", meProp(_me, "m_powerupMgr"), t_rRoomContext)
  callMethod("SetStage", meProp(_me, "m_powerupMgr"), meProp(_me, "m_stage"))
  callMethod("SetBoat", meProp(_me, "m_powerupMgr"), meProp(_me, "m_boat"))
  callMethod("SetRoomContext", meProp(_me, "m_hazardMgr"), t_rRoomContext)
  callMethod("SetStage", meProp(_me, "m_hazardMgr"), meProp(_me, "m_stage"))
  callMethod("SetBoat", meProp(_me, "m_hazardMgr"), meProp(_me, "m_boat"))
  callNamed("put", lingoBinary("joinPad", "HAZARDS COUNT", callMethod("GetHazards", meProp(_me, "m_stage")).count))
  callMethod("AddAllHazards", meProp(_me, "m_hazardMgr"))
  if (lingoBinary("eq", callMethod("GetName", meProp(_me, "m_stage")), "dock.stage1")) {
  callMethod("ReadTutorial", meProp(_me, "m_tutorial"), "tutorial")
  callMethod("DrawAvatar", _me)
  setThePropOf(meProp(_me, "m_avatarOnDock"), "member", callNamed("member", "tempAvatarImage"));
  setThePropOf(meProp(_me, "m_avatarOnDock"), "loc", callNamed("point", 500, 265));
  setThePropOf(meProp(_me, "m_avatarOnDock"), "locZ", -float(1000000));
  setThePropOf(meProp(_me, "m_avatarOnDock"), "width", lingoBinary("mul", callNamed("member", "tempAvatarImage").image.width, 0.75));
  setThePropOf(meProp(_me, "m_avatarOnDock"), "height", lingoBinary("mul", callNamed("member", "tempAvatarImage").image.height, 0.75));
  callMethod("SetParam", meProp(_me, "m_boat"), "AvatarOn", 0)
  callMethod("SetParam", meProp(_me, "m_boat"), "Deviation", -float(40))
  }

  }

  callNamed("put", "CJungleCruiseComponent::InitStage - end")
}

