// vmk_music_mixer.cct / CMusicMixerPopup / dialogWindowEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dialogWindowEvent(_me: LingoMe, t_dialogName: LingoValue, t_dialogEvent: LingoValue) {
  var receiverEvent = symbol("popupWindowEvent");
  var passEvent = 1;
  var tObject = callMethod("get", callNamed("getObjectManager"), meProp(_me, "m_iClientID"));
  if (lingoBinary("eq", tObject, 0)) {
  passEvent = 0;
  } else {
  if (lingoBinary("eq", callMethod("getOne", callMethod("handlers", tObject), receiverEvent), 0)) {
  passEvent = 0;
  }

  }

  switch (t_dialogName) {
case "musicmix.dialog.delete.confirm":
  switch (t_dialogEvent) {
case symbol("dialogOK"):
  if (lingoBinary("neq", meProp(_me, "m_pSongList"), 0)) {
  if (lingoBinary("neq", callMethod("GetSelected", meProp(_me, "m_pSongList")), 0)) {
  if (passEvent) {
  callNamed("call", receiverEvent, tObject, "delete", callMethod("GetSelected", meProp(_me, "m_pSongList")))
  callMethod("reset", meProp(_me, "m_pSongList"))
  }

  }

  }

  callMethod("evaluateActiveButtons", _me)
  break;
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

