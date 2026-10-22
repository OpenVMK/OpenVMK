// vmk_music_mixer.cct / CMusicMixerInterface / removeMouseDown

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function removeMouseDown(_me: LingoMe, t_arguments: LingoValue) {
  if (lingoBinary("neq", meProp(_me, "m_ar_trackClickBuffer").count, 0)) {
  if (lingoBinary("eq", callNamed("ilk", t_arguments), symbol("list"))) {
  if (lingoBinary("gt", t_arguments.count, 0)) {
  var t_lastClickTime = t_arguments[1];
  }

  if (lingoBinary("gt", t_arguments.count, 1)) {
  var t_iTrack = t_arguments[2];
  }

  if (lingoBinary("gt", t_arguments.count, 2)) {
  var t_iSlot = t_arguments[3];
  }

  }

  callMethod("AddSample", callMethod("getComponent", _me), t_iTrack, t_iSlot)
  setMeProp(_me, "m_ar_trackClickBuffer", new LingoList([]));
  }

}

