// vmk_pirates_game.cct / CPiratesBuildingVisualizer / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_HEALTH", 1);
  var t_ar_sFireAnim = new LingoList(["fire_01", "fire_02", "fire_03", "fire_04", "fire_05", "fire_06", "fire_07", "fire_08", "fire_09", "fire_10", "fire_11", "fire_12", "fire_13", "fire_14", "fire_15"]);
  var t_ar_sGlowAnim = new LingoList(["glow_01", "glow_02"]);
  setMeProp(_me, "m_ar_rFireAnim", new LingoList([]));
  setMeProp(_me, "m_ar_rGlowAnim", new LingoList([]));
  for (var tFrame of t_ar_sFireAnim.toArray()) {
  callMethod("append", meProp(_me, "m_ar_rFireAnim"), callNamed("getMember", tFrame))
  }

  for (var tFrame of t_ar_sGlowAnim.toArray()) {
  callMethod("append", meProp(_me, "m_ar_rGlowAnim"), callNamed("getMember", tFrame))
  }

  return 1;
}

