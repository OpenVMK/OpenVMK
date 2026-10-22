// 38365562899c7799eeaea4a99041ea57.cct / CUIComponentPage / getVisible

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
  callMethod("append", t_ar_visible, t_rComponent)
  if (callMethod("hasChildren", t_rComponent)) {
  for (var t_rChild of callMethod("getChildren", t_rComponent).toArray()) {
  callMethod("append", t_ar_visible, t_rChild)
  }

  }

  }

  return t_ar_visible;
}

