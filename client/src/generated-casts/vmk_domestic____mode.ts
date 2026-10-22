// vmk_domestic.cct /  / mode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function mode(_me: LingoMe, handle_petchat: LingoValue) {
  if (callNamed("t_iCurAct", "RoomEventProcessor")) {
  var a_sBool = callNamed("t_iActual", "RoomEventProcessor");
  } else {
  a_sBool = callNamed("t_fY", "RoomEventProcessor", "CRoomMouseEventProcessor");
  }

  var m_rWalkSpeed = callMethod("m_veDistance", callMethod("t_iActual", handle_petchat));
  if (lingoBinary("lt", callNamed("m_rAction", callMethod("m_iStatusDelay", callMethod("t_iActual", handle_petchat), "TYPE")), 3)) {
  setThePropOf(handle_petchat, "RemoveSprite", callNamed("t_fY", symbol("t_rUnderMe"), "CIronCanRenderer"));
  } else {
  if (lingoBinary("eq", callNamed("m_rAction", callMethod("m_iStatusDelay", callMethod("t_iActual", handle_petchat), "TYPE")), 3)) {
  setThePropOf(handle_petchat, "RemoveSprite", callNamed("t_fY", symbol("t_rUnderMe"), "CBunnyRenderer"));
  } else {
  if (lingoBinary("eq", callNamed("m_rAction", callMethod("m_iStatusDelay", callMethod("t_iActual", handle_petchat), "TYPE")), 4)) {
  setThePropOf(handle_petchat, "RemoveSprite", callNamed("t_fY", symbol("t_rUnderMe"), "CYodaRenderer"));
  setThePropOf(callMethod("loc", callMethod("t_iActual", handle_petchat)), "Init", 1500);
  } else {
  if (lingoBinary("eq", callNamed("m_rAction", callMethod("m_iStatusDelay", callMethod("t_iActual", handle_petchat), "TYPE")), 5)) {
  setThePropOf(handle_petchat, "RemoveSprite", callNamed("t_fY", symbol("t_rUnderMe"), "CR2D2Renderer"));
  setThePropOf(callMethod("loc", callMethod("t_iActual", handle_petchat)), "Init", 1500);
  } else {
  if (lingoBinary("eq", callNamed("m_rAction", callMethod("m_iStatusDelay", callMethod("t_iActual", handle_petchat), "TYPE")), 6)) {
  setThePropOf(handle_petchat, "RemoveSprite", callNamed("t_fY", symbol("t_rUnderMe"), "CEveRenderer"));
  setThePropOf(callMethod("loc", callMethod("t_iActual", handle_petchat)), "Init", 750);
  } else {
  if (lingoBinary("eq", callNamed("m_rAction", callMethod("m_iStatusDelay", callMethod("t_iActual", handle_petchat), "TYPE")), 7)) {
  setThePropOf(handle_petchat, "RemoveSprite", callNamed("t_fY", symbol("t_rUnderMe"), "CPanicRenderer"));
  setThePropOf(callMethod("loc", callMethod("t_iActual", handle_petchat)), "Init", 1500);
  } else {
  if (lingoBinary("eq", callNamed("m_rAction", callMethod("m_iStatusDelay", callMethod("t_iActual", handle_petchat), "TYPE")), 8)) {
  setThePropOf(handle_petchat, "RemoveSprite", callNamed("t_fY", symbol("t_rUnderMe"), "CPainRenderer"));
  setThePropOf(callMethod("loc", callMethod("t_iActual", handle_petchat)), "Init", 1500);
  } else {
  if (lingoBinary("eq", callNamed("m_rAction", callMethod("m_iStatusDelay", callMethod("t_iActual", handle_petchat), "TYPE")), 9)) {
  setThePropOf(handle_petchat, "RemoveSprite", callNamed("t_fY", symbol("t_rUnderMe"), "CYzmaRenderer"));
  setThePropOf(callMethod("loc", callMethod("t_iActual", handle_petchat)), "Init", 500);
  } else {
  if (lingoBinary("eq", callNamed("m_rAction", callMethod("m_iStatusDelay", callMethod("t_iActual", handle_petchat), "TYPE")), 10)) {
  setThePropOf(handle_petchat, "RemoveSprite", callNamed("t_fY", symbol("t_rUnderMe"), "CTurkeyRenderer"));
  setThePropOf(callMethod("loc", callMethod("t_iActual", handle_petchat)), "Init", 500);
  } else {
  if (lingoBinary("eq", callNamed("m_rAction", callMethod("m_iStatusDelay", callMethod("t_iActual", handle_petchat), "TYPE")), 11)) {
  setThePropOf(handle_petchat, "RemoveSprite", callNamed("t_fY", symbol("t_rUnderMe"), "CEverTurkeyRenderer"));
  setThePropOf(callMethod("loc", callMethod("t_iActual", handle_petchat)), "Init", 500);
  } else {
  setThePropOf(handle_petchat, "RemoveSprite", callNamed("t_fY", symbol("t_rUnderMe"), "CIronCanRenderer"));
  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  setThePropOf(handle_petchat, "setVariable", callMethod("gDebugMode", a_sBool, callMethod("render", callMethod("t_iActual", handle_petchat)), 1));
  setThePropOf(handle_petchat.setVariable, "puppetSprite", m_rWalkSpeed.m_bDirty);
  setThePropOf(handle_petchat.setVariable, "point", m_rWalkSpeed.float);
  setThePropOf(handle_petchat.setVariable, "m_rAnimFrame", m_rWalkSpeed.m_iFactor);
  setMeProp(_me, "m_rCurrentFrame", m_rWalkSpeed.float);
  callMethod("me", handle_petchat.RemoveSprite, handle_petchat.setVariable)
  if (lingoBinary("lt", callNamed("m_rAction", callMethod("m_iStatusDelay", callMethod("t_iActual", handle_petchat), "TYPE")), 3)) {
  setThePropOf(handle_petchat.setVariable, "point", lingoBinary("sub", m_rWalkSpeed.float, 38));
  setThePropOf(handle_petchat.RemoveSprite, "tMsg", 1);
  }

}

