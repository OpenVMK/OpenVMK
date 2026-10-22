// vmk_musicmix1.cct / CMusicMixerInterface / HandleMuteButtons

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HandleMuteButtons(_me: LingoMe, a_iChannel: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", a_iChannel)) ? 0 : 1)) {
  var t_iNum = callNamed("value", a_iChannel);
  var t_iCurState = meProp(_me, "m_arMuteStates")[t_iNum];
  var t_iNewState = (lingoTruthy(t_iCurState) ? 0 : 1);
  meProp(_me, "m_arMuteStates")[t_iNum] = t_iNewState;
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  if (callMethod("elementExists", tWndObj, lingoBinary("join", "button.mute.", a_iChannel))) {
  var t_rElement = callMethod("getElement", tWndObj, lingoBinary("join", "button.mute.", a_iChannel));
  var t_Img = callNamed("member", callNamed("getmemnum", lingoBinary("join", "button.audio.", t_iNewState))).image;
  callMethod("feedImage", t_rElement, t_Img)
  }

  setThePropOf(callNamed("sound", lingoBinary("add", callMethod("getComponent", _me).m_iFirstSoundChannel, t_iNum)), "volume", lingoBinary("mul", t_iNewState, 255));
  }

}

