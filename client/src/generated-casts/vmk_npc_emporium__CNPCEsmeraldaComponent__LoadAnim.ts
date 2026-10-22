// vmk_npc_emporium.cct / CNPCEsmeraldaComponent / LoadAnim

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LoadAnim(_me: LingoMe) {
  if (callNamed("threadExists", symbol("animation"))) {
  var tAnimEngine = callMethod("getComponent", callNamed("getThread", symbol("animation")));
  meProp(_me, "m_animIDs")[1] = callMethod("LoadAnim", tAnimEngine, "esmeralda_levitate_arrangement");
  }

}

