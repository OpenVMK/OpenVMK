// vmk_steamboat_handler.cct / CSteamBoatInterface / initRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initRoom(_me: LingoMe) {
  var t_rContext = callMethod("_AccessRoom", callNamed("getThread", symbol("room")).component);
  if (callNamed("objectp", t_rContext)) {
  setMeProp(_me, "m_rVisualLights", callMethod("GetVisual", callMethod("Search", t_rContext, "SPRITE", "stage beams")));
  if (callNamed("objectp", meProp(_me, "m_rVisualLights"))) {
  callMethod("visible", meProp(_me, "m_rVisualLights"), 0)
  }

  setMeProp(_me, "m_rVisualScreen", callMethod("GetVisual", callMethod("Search", t_rContext, "SPRITE", "screen")));
  if (callNamed("objectp", meProp(_me, "m_rVisualScreen"))) {
  callMethod("visible", meProp(_me, "m_rVisualScreen"), 0)
  }

  }

}

