// vmk_sound.cct / CSoundTracker / ParseSounds

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ParseSounds(_me: LingoMe, a_sSoundList: LingoValue) {
  if (callNamed("memberExists", a_sSoundList)) {
  setMeProp(_me, "m_mp_SoundProperties", new LingoPropList([]));
  var t_rDocXML = callNamed("CreateXML");
  var t_mem = callNamed("member", callNamed("getmemnum", a_sSoundList)).text;
  callMethod("open", t_rDocXML, t_mem)
  if (callMethod("Search", t_rDocXML, "type", "SOUNDS")) {
  var t_rSOundList = callMethod("GetNode", t_rDocXML);
  var t_iSoundCount = t_rSOundList.child.count;
  for (var i = 1; i <= t_iSoundCount; ++i) {
  var t_mp_Child = t_rSOundList.child[i];
  if (callMethod("findPos", t_mp_Child.param, "member")) {
  var t_sName = t_mp_Child.param["member"];
  if (callNamed("memberExists", t_sName)) {
  var t_arList = new LingoPropList([symbol("member"), callNamed("member", callNamed("getmemnum", t_sName))]);
  } else {
  return callNamed("error", _me, lingoBinary("joinPad", "No such Member:", t_sName), symbol("ParseSounds"));
  }

  } else {
  return callNamed("error", _me, lingoBinary("joinPad", "Sound name Missing:", t_mp_Child.param), symbol("ParseSounds"));
  }

  for (var e = 2; e <= t_mp_Child.param.count; ++e) {
  var t_kSymbol = callNamed("symbol", callMethod("getPropAt", t_mp_Child.param, e));
  var t_iValue = callNamed("value", t_mp_Child.param[e]);
  t_arList[t_kSymbol] = t_iValue;
  }

  meProp(_me, "m_mp_SoundProperties")[t_sName] = t_arList;
  }

  }

  } else {
  }

}

