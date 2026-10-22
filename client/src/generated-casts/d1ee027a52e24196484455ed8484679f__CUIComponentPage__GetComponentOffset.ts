// d1ee027a52e24196484455ed8484679f.cct / CUIComponentPage / GetComponentOffset

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetComponentOffset(_me: LingoMe, a_rComponent: LingoValue) {
  var t_pOffset = callNamed("point", 0, 0);
  var t_ar_visible = callMethod("getVisible", _me);
  for (var t_rComponent of t_ar_visible.toArray()) {
  if (lingoBinary("eq", t_rComponent, a_rComponent)) {
  return lingoBinary("add", t_pOffset, a_rComponent.m_pOffset);
  }

  t_pOffset = lingoBinary("add", t_pOffset, callNamed("point", 0, lingoBinary("add", t_rComponent.m_iHeight, callMethod("GetPadding", t_rComponent))));
  }

  return t_pOffset;
}

