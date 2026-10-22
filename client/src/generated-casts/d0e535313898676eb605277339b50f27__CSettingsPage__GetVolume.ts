// d0e535313898676eb605277339b50f27.cct / CSettingsPage / GetVolume

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetVolume(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_iPrviousVolume", meProp(_me, "m_iVolume"));
  var t_iPersent1 = callMethod("ScrollBarPercentV", callMethod("getElement", meProp(_me, "m_rWindow"), "nav.scrollbar"));
  var t_iPersent2 = lingoBinary("sub", 1, t_iPersent1);
  var t_iVol = callNamed("integer", lingoBinary("mul", t_iPersent2, 255));
  setMeProp(_me, "m_iVolume", t_iVol);
  setMeProp(_me, "m_bChanges", 1);
}

