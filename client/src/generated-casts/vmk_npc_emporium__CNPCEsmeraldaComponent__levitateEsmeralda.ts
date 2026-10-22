// vmk_npc_emporium.cct / CNPCEsmeraldaComponent / levitateEsmeralda

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function levitateEsmeralda(_me: LingoMe, i_age: LingoValue) {
  if (callNamed("threadExists", symbol("animation"))) {
  if ((lingoTruthy(callNamed("voidp", i_age)) ? 0 : 1)) {
  var tFrameIndex = lingoBinary("div", lingoBinary("mul", i_age, 24), float(1000));
  } else {
  tFrameIndex = 0;
  }

  callNamed("executeMessage", "PlayInterfaceSound", "NPC-esmeralda-levitate-III")
  callNamed("executeMessage", "PlayInterfaceSound", "NPC-esmeralda-lights")
  var tAnimEngine = callMethod("getComponent", callNamed("getThread", symbol("animation")));
  callMethod("stopAnimations", _me, tAnimEngine)
  callMethod("PlayAnim", tAnimEngine, meProp(_me, "m_animIDs")[1], tFrameIndex)
  }

}

