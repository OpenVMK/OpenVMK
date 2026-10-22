// vmk_music_mixer.cct / CMusicMixerPopup / evaluateActiveButtons

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function evaluateActiveButtons(_me: LingoMe) {
  var tActiveItem = callMethod("GetSelected", meProp(_me, "m_pSongList"));
  if (lingoBinary("neq", tActiveItem, 0)) {
  callMethod("setButtonState", _me, "musicmix.rename.button", 1)
  callMethod("setButtonState", _me, "musicmix.delete.button", 1)
  callMethod("setButtonText", _me, "musicmix.edit.button", callNamed("getText", "musicmix.edit"))
  callMethod("setButtonState", _me, "musicmix.edit.button", 1)
  } else {
  callMethod("setButtonState", _me, "musicmix.rename.button", 0)
  callMethod("setButtonState", _me, "musicmix.delete.button", 0)
  callMethod("setButtonText", _me, "musicmix.edit.button", callNamed("getText", "musicmix.createsong"))
  if (lingoBinary("gte", meProp(_me, "m_pSongList").m_pSongs.count, 4)) {
  callMethod("setButtonState", _me, "musicmix.edit.button", 0)
  } else {
  callMethod("setButtonState", _me, "musicmix.edit.button", 1)
  }

  }

  var t_bError = 1;
  if (lingoBinary("neq", meProp(_me, "m_iClientID"), 0)) {
  var tObject = callMethod("get", callNamed("getObjectManager"), meProp(_me, "m_iClientID"));
  if (lingoBinary("neq", tObject, 0)) {
  var tComponent = callMethod("getComponent", tObject);
  if (lingoBinary("neq", tComponent, 0)) {
  var t_bMode = callMethod("getEditingMode", tComponent);
  if (lingoBinary("neq", t_bMode, symbol("none"))) {
  t_bError = 0;
  }

  }

  }

  }

  callNamed("put", lingoBinary("joinPad", t_bError, t_bMode))
  if (t_bError) {
  callMethod("setButtonState", _me, "musicmix.cancel.button", 0)
  } else {
  callMethod("setButtonState", _me, "musicmix.cancel.button", 1)
  }

}

