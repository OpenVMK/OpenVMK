// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskAcquireItem / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  if (callNamed("objectp", meProp(_me, "m_rGridFurnishings"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rGridFurnishings")))
  setMeProp(_me, "m_rGridFurnishings", undefined);
  }

  if (callNamed("objectp", meProp(_me, "m_rGridPins"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rGridPins")))
  setMeProp(_me, "m_rGridPins", undefined);
  }

  if (callNamed("objectp", meProp(_me, "m_rGridPosters"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rGridPosters")))
  setMeProp(_me, "m_rGridPosters", undefined);
  }

  if (callNamed("objectp", meProp(_me, "m_rGridClothing"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rGridClothing")))
  setMeProp(_me, "m_rGridClothing", undefined);
  }

  if (callNamed("objectp", meProp(_me, "m_rGridRenderer"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rGridRenderer")))
  setMeProp(_me, "m_rGridRenderer", undefined);
  }

  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  callMethod("Purge", _me, meProp(_me, "m_rWindow"))
  }

  if (callNamed("objectp", meProp(_me, "m_rGridLoadAnim"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rGridLoadAnim")))
  setMeProp(_me, "m_rGridLoadAnim", undefined);
  }

  for (var t_rComponent of meProp(_me, "m_ar_components").toArray()) {
  callNamed("removeObject", callMethod("getID", t_rComponent))
  }

  return 1;
}

