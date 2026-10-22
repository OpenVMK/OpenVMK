// 42c66f7b170484e24189f467fe87b08d.cct / CSoundTracker / SoundEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SoundEvent(_me: LingoMe, a_mpSoundData: LingoValue) {
  if (callNamed("listp", a_mpSoundData)) {
  a_mpSoundData["count"] = lingoBinary("add", a_mpSoundData["count"], 1);
  var tEvent = a_mpSoundData["event"];
  var t_iCount = a_mpSoundData["count"];
  switch (tEvent) {
case "vol":
  var t_iMin = a_mpSoundData["min"];
  var t_iMax = a_mpSoundData["max"];
  var t_iChn = a_mpSoundData["channel"];
  var t_iVol = lingoBinary("div", lingoBinary("sub", t_iMax, t_iMin), 50);
  t_iVol = lingoBinary("add", callNamed("sound", t_iChn).volume, t_iVol);
  if (lingoBinary("gt", t_iVol, meProp(_me, "m_iVolume"))) {
  t_iVol = meProp(_me, "m_iVolume");
  }

  setThePropOf(callNamed("sound", t_iChn), "volume", t_iVol);
  break;
case "pan":
  t_iMin = a_mpSoundData["min"];
  t_iMax = a_mpSoundData["max"];
  t_iChn = a_mpSoundData["channel"];
  var t_iPan = lingoBinary("div", lingoBinary("sub", t_iMax, t_iMin), 50);
  if (lingoBinary("gt", t_iMax, t_iMin)) {
  t_iPan = lingoBinary("sub", 0, t_iPan);
  }

  setThePropOf(callNamed("sound", t_iChn), "pan", lingoBinary("add", callNamed("sound", t_iChn).pan, t_iPan));
  break;
  }

  } else {
  return callNamed("error", _me, lingoBinary("joinPad", "Sound data Missing:", a_mpSoundData), symbol("SoundEvent"));
  }

}

