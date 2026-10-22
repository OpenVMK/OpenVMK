// vmk_musicmix1.cct / CMusicMixerInterface / dialogWindowEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dialogWindowEvent(_me: LingoMe, t_dialogName: LingoValue, t_dialogEvent: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  switch (t_dialogName) {
case "musicmix.dialog.exit.confirm":
  switch (t_dialogEvent) {
case symbol("dialogOK"):
  callMethod("StopEverything", _me)
  callMethod("showHideMusicMixer", _me)
  callMethod("send", callNamed("getConnection", "VMK"), "CloseMixer")
  return 1;
case symbol("dialogCancel"):
  break;
case symbol("dialogAlternative"):
  break;
  }

  break;
case "MusicMixerClearAllDialog":
  switch (t_dialogEvent) {
case symbol("dialogOK"):
  var tElem = callMethod("getElement", tWndObj, "music.mixer.entername");
  if (lingoBinary("neq", tElem, 0)) {
  callMethod("setFocus", tElem, 0)
  }

  callMethod("ClearAll", callMethod("getComponent", _me))
  callMethod("StopPointerTimer", _me)
  callMethod("setButtonState", _me, "button.savemusic", 1)
  return 1;
case symbol("dialogCancel"):
  break;
case symbol("dialogAlternative"):
  break;
  }

  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Unknown Dialog Window", t_dialogName))
  }

}

