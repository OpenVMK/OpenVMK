// 42c66f7b170484e24189f467fe87b08d.cct / CSoundTracker / startPanLoop

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function startPanLoop(_me: LingoMe, a_ichannelNo: LingoValue, a_iMin: LingoValue, a_iMax: LingoValue, a_iTime: LingoValue, a_sType: LingoValue) {
  var t_iTime = lingoBinary("div", a_iTime, 50);
  var t_iPan = lingoBinary("div", lingoBinary("sub", a_iMax, a_iMin), 50);
  if (lingoBinary("gt", a_iMax, a_iMin)) {
  t_iPan = lingoBinary("sub", 0, t_iPan);
  }

  var t_arPanData = new LingoList([a_ichannelNo, t_iPan, a_sType]);
  var t_sID = lingoBinary("join", lingoBinary("join", a_sType, "Event"), a_ichannelNo);
  if (callNamed("timeoutExists", t_sID)) {
  callNamed("removeTimeout", t_sID)
  }

  callNamed("createTimeout", t_sID, t_iTime, symbol("panLoop"), callMethod("getID", _me), t_arPanData, undefined)
}

