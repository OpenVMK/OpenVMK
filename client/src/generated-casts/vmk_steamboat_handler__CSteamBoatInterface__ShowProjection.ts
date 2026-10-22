// vmk_steamboat_handler.cct / CSteamBoatInterface / ShowProjection

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowProjection(_me: LingoMe, a_img: LingoValue) {
  var t_rContext = callMethod("_AccessRoom", callNamed("getThread", symbol("room")).component);
  if (callNamed("objectp", t_rContext)) {
  setMeProp(_me, "m_rVisualLights", callMethod("GetVisual", callMethod("Search", t_rContext, "SPRITE", "stage beams")));
  if (callNamed("objectp", meProp(_me, "m_rVisualLights"))) {
  callMethod("visible", meProp(_me, "m_rVisualLights"), 1)
  callNamed("executeMessage", "PlayInterfaceSound", "SB-lightson")
  }

  setMeProp(_me, "m_rVisualScreen", callMethod("GetVisual", callMethod("Search", t_rContext, "SPRITE", "screen")));
  if (callNamed("objectp", meProp(_me, "m_rVisualScreen"))) {
  if (callNamed("memberExists", meProp(_me, "m_sMemname"))) {
  var t_rMem = callNamed("getMember", meProp(_me, "m_sMemname"));
  setThePropOf(t_rMem, "image", a_img);
  setThePropOf(t_rMem, "regPoint", callNamed("point", 0, 0));
  } else {
  var t_iMemNum = callNamed("createMember", meProp(_me, "m_sMemname"), symbol("bitmap"));
  t_rMem = callNamed("member", t_iMemNum);
  setThePropOf(t_rMem, "image", a_img);
  setThePropOf(t_rMem, "regPoint", callNamed("point", 0, 0));
  }

  setThePropOf(callMethod("getSprite", meProp(_me, "m_rVisualScreen")), "member", t_rMem);
  callMethod("visible", meProp(_me, "m_rVisualScreen"), 1)
  }

  }

}

