// vmk_monorail_mixer.cct / CMusicMixerInterface / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  var t_iMillisecs = lingoBinary("sub", theProperty("milliSeconds"), meProp(_me, "m_iMilliseconds"));
  if (lingoBinary("gt", t_iMillisecs, 500)) {
  setMeProp(_me, "m_iMilliseconds", theProperty("milliSeconds"));
  }

  var t_iCount = callMethod("getPlaylist", callNamed("sound", lingoBinary("add", callMethod("getComponent", _me).m_iFirstSoundChannel, 5))).count;
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  if (callMethod("elementExists", tWndObj, "track.pointer")) {
  var t_rElement = callMethod("getElement", tWndObj, "track.pointer");
  if (lingoBinary("eq", t_iCount, 0)) {
  setMeProp(_me, "m_iPointerLoc", lingoBinary("add", meProp(_me, "m_iPointerLoc"), 40));
  callMethod("setProperty", t_rElement, symbol("locH"), meProp(_me, "m_iPointerLoc"))
  callMethod("StopPointerTimer", _me)
  callMethod("playBackControl", callMethod("getComponent", _me), "Stop")
  }

  if (lingoBinary("gte", lingoBinary("sub", meProp(_me, "m_iListCount"), t_iCount), 1)) {
  setMeProp(_me, "m_iListCount", t_iCount);
  var t_LocH = callMethod("getProperty", t_rElement, symbol("locH"));
  setMeProp(_me, "m_iPointerLoc", lingoBinary("add", meProp(_me, "m_iPointerLoc"), 40));
  callMethod("setProperty", t_rElement, symbol("locH"), meProp(_me, "m_iPointerLoc"))
  }

  }

}

