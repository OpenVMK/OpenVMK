// 38365562899c7799eeaea4a99041ea57.cct / CUIComponent / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  for (var t_rLayout of meProp(_me, "m_ar_layouts").toArray()) {
  callNamed("removeObject", callMethod("getID", t_rLayout))
  }

  for (var t_rComponent of meProp(_me, "m_ar_Children").toArray()) {
  callNamed("removeObject", callMethod("getID", t_rComponent))
  }

  if (callNamed("objectp", meProp(_me, "m_rBackground"))) {
  switch (callNamed("ilk", meProp(_me, "m_rBackground"))) {
case symbol("instance"):
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rBackground")))
  break;
  }

  }

  return 1;
}

