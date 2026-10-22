// vmk_steamboat_handler.cct / CSteamBoatInterface / ExitPodium

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ExitPodium(_me: LingoMe) {
  if (callNamed("objectp", meProp(_me, "m_rVisualScreen"))) {
  callMethod("visible", meProp(_me, "m_rVisualScreen"), 0)
  }

  if (callNamed("objectp", meProp(_me, "m_rVisualLights"))) {
  callMethod("visible", meProp(_me, "m_rVisualLights"), 0)
  }

}

