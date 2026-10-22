// vmk_monorail_mixer.cct / CMusicMixerComponent / setEditingMode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setEditingMode(_me: LingoMe, t_iEditMode: LingoValue) {
  switch (t_iEditMode) {
case symbol("none"):
  callMethod("setActiveSong", _me, -float(1))
  callMethod("ClearAll", _me)
  break;
case symbol("new"):
  callMethod("setActiveSong", _me, -float(1))
  break;
  }

  setMeProp(_me, "m_iEditMode", t_iEditMode);
}

