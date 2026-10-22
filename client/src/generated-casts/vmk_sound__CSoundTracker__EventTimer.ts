// vmk_sound.cct / CSoundTracker / EventTimer

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function EventTimer(_me: LingoMe, a_mpSoundData: LingoValue) {
  if (callNamed("listp", a_mpSoundData)) {
  var t_iSndChn = a_mpSoundData;
  var t_iChn = a_mpSoundData["channel"];
  var t_sID = lingoBinary("join", "sndEvent", t_iChn);
  var t_iTime = lingoBinary("div", a_mpSoundData["time"], 50);
  var tEvent = a_mpSoundData["event"];
  if (callNamed("timeoutExists", t_sID)) {
  callNamed("removeTimeout", t_sID)
  }

  switch (tEvent) {
case "vol":
  var t_iVol = a_mpSoundData["min"];
  if (lingoBinary("gt", t_iVol, meProp(_me, "m_iVolume"))) {
  t_iVol = meProp(_me, "m_iVolume");
  }

  setThePropOf(callNamed("sound", t_iChn), "volume", t_iVol);
  break;
case "pan":
  setThePropOf(callNamed("sound", t_iChn), "pan", a_mpSoundData["min"]);
  break;
  }

  a_mpSoundData["count"] = 0;
  callNamed("createTimeout", t_sID, t_iTime, symbol("SoundEvent"), callMethod("getID", _me), a_mpSoundData, 50)
  } else {
  return callNamed("error", _me, lingoBinary("joinPad", "Sound data Missing:", a_mpSoundData), symbol("EventTimer"));
  }

}

