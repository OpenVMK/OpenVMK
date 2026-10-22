// vmk_sound.cct / CSoundTracker / panLoop

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function panLoop(_me: LingoMe, a_arPanData: LingoValue) {
  var t_iChannelNo = a_arPanData[1];
  var t_iAmount = a_arPanData[2];
  var t_sType = a_arPanData[3];
  if (lingoBinary("gt", meProp(_me, "m_PanCounter"), 50)) {
  if (lingoBinary("lt", t_iAmount, 0)) {
  t_iAmount = callNamed("abs", t_iAmount);
  } else {
  t_iAmount = lingoBinary("sub", t_iAmount, lingoBinary("mul", 2, t_iAmount));
  }

  }

  if (lingoBinary("gte", meProp(_me, "m_PanCounter"), 99)) {
  setMeProp(_me, "m_PanCounter", 0);
  }

  setMeProp(_me, "m_PanCounter", lingoBinary("add", meProp(_me, "m_PanCounter"), 1));
  switch (t_sType) {
case "Pan":
  var t_iPan = callNamed("sound", t_iChannelNo).pan;
  var t_iPanAmount = lingoBinary("add", t_iPan, t_iAmount);
  setThePropOf(callNamed("sound", t_iChannelNo), "pan", t_iPanAmount);
  break;
case "Vol":
  var t_iVol = callNamed("sound", t_iChannelNo).volume;
  var t_iVolAmount = lingoBinary("add", t_iVol, t_iAmount);
  if (lingoBinary("gt", t_iVolAmount, meProp(_me, "m_iVolume"))) {
  t_iVolAmount = meProp(_me, "m_iVolume");
  }

  setThePropOf(callNamed("sound", t_iChannelNo), "volume", t_iVolAmount);
  break;
  }

}

