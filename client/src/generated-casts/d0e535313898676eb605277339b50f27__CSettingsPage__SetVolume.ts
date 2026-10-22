// d0e535313898676eb605277339b50f27.cct / CSettingsPage / SetVolume

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetVolume(_me: LingoMe, _this: LingoValue) {
  if (lingoBinary("eq", meProp(_me, "m_iVolume"), 0)) {
  callMethod("setScrollOffset", callMethod("getElement", meProp(_me, "m_rWindow"), "nav.scrollbar"), 205)
  } else {
  var t_iPersent1 = lingoBinary("div", meProp(_me, "m_iVolume"), float(255));
  var t_iPersent2 = lingoBinary("sub", float(1), t_iPersent1);
  callMethod("setScrollOffset", callMethod("getElement", meProp(_me, "m_rWindow"), "nav.scrollbar"), callNamed("integer", lingoBinary("mul", t_iPersent2, 205)))
  }

}

