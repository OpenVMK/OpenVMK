// vmk_music_mixer.cct / CMusicMixerInterface / popupWindowEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function popupWindowEvent(_me: LingoMe, tEvent: LingoValue, tParam: LingoValue) {
  callNamed("put", lingoBinary("joinPad", "Popup Window Event", new LingoList([tEvent, tParam])))
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  switch (tEvent) {
case "edit":
  callMethod("editSong", callMethod("getComponent", _me), tParam)
  var tSong = callMethod("getSongData", callMethod("getComponent", _me), tParam);
  var tElem = callMethod("getElement", tWndObj, "music.mixer.entername");
  if (lingoBinary("neq", tElem, 0)) {
  if ((lingoTruthy(callNamed("voidp", callMethod("getaProp", tSong, symbol("name")))) ? 0 : 1)) {
  callMethod("setText", tElem, tSong.name)
  }

  }

  callMethod("setEditingMode", callMethod("getComponent", _me), symbol("edit"))
  break;
case "delete":
  callMethod("DeleteSong", callMethod("getComponent", _me), tParam)
  break;
case "exit":
  callMethod("StopEverything", _me)
  callMethod("showHideMusicMixer", _me)
  callMethod("send", callNamed("getConnection", "VMK"), "CloseMixer")
  break;
case "new":
  callMethod("setButtonState", _me, "button.savemusic", 1)
  if (lingoBinary("neq", tWndObj, 0)) {
  tElem = callMethod("getElement", tWndObj, "music.mixer.entername");
  if (lingoBinary("neq", tElem, 0)) {
  callMethod("setText", tElem, "")
  callMethod("setFocus", tElem, 0)
  }

  }

  callMethod("ClearAll", callMethod("getComponent", _me))
  callMethod("StopPointerTimer", _me)
  callMethod("setEditingMode", callMethod("getComponent", _me), symbol("new"))
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Unknown popup-event", tEvent))
  }

}

