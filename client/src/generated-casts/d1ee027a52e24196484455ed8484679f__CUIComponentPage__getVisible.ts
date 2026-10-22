// d1ee027a52e24196484455ed8484679f.cct / CUIComponentPage / getVisible

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getVisible(_me: LingoMe) {
  var t_ar_visible = new LingoList([]);
  for (var t_rComponent of meProp(_me, "m_ar_components").toArray()) {
  callMethod("getVisible", t_rComponent, t_ar_visible)
  }

  return t_ar_visible;
}

