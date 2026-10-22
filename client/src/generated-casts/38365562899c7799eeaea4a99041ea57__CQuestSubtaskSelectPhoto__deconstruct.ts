// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskSelectPhoto / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("unregisterMessage", symbol("photo_catalog_redraw"), callMethod("getID", _me))
  if (callNamed("objectp", callMethod("getInterface", callNamed("getThread", symbol("PhotoCatalog"))).m_rThumblist)) {
  setThePropOf(callMethod("getInterface", callNamed("getThread", symbol("PhotoCatalog"))).m_rThumblist, "m_dimHorz", 4);
  }

  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  callMethod("Purge", _me, meProp(_me, "m_rWindow"))
  }

  for (var t_rComponent of meProp(_me, "m_ar_components").toArray()) {
  callNamed("removeObject", callMethod("getID", t_rComponent))
  }

  return 1;
}

