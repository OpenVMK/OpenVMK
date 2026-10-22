// vmk_sound.cct / CSoundTracker / StartRoomSounds

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function StartRoomSounds(_me: LingoMe, a_sRoomName: LingoValue) {
  if (lingoBinary("eq", meProp(_me, "m_iVolume"), 0)) {
  callMethod("StopRoomSounds", _me)
  } else {
  if (lingoBinary("and", lingoBinary("eq", meProp(_me, "m_bFx"), 0), lingoBinary("eq", meProp(_me, "m_bMusic"), 0))) {
  callMethod("StopRoomSounds", _me)
  } else {
  setMeProp(_me, "m_TmrTracker", "trackerTimer");
  setMeProp(_me, "m_CurrentTime", float(0));
  setMeProp(_me, "m_PanCounter", 0);
  setMeProp(_me, "m_mpSoundData", new LingoPropList([]));
  setMeProp(_me, "m_mp_SoundProperties", new LingoPropList([]));
  setMeProp(_me, "m_mp_SndTypes", new LingoPropList([]));
  setMeProp(_me, "m_mpEndTime", undefined);
  setMeProp(_me, "m_arLoopChannels", undefined);
  setMeProp(_me, "m_sRoomName", a_sRoomName);
  if (callNamed("timeoutExists", meProp(_me, "m_TmrTracker"))) {
  callNamed("removeTimeout", meProp(_me, "m_TmrTracker"))
  }

  if (callNamed("memberExists", lingoBinary("join", a_sRoomName, "sound.xml"))) {
  callMethod("ParseSounds", _me, lingoBinary("join", a_sRoomName, "sound.xml"))
  } else {
  if (callNamed("memberExists", "Sound.xml")) {
  callMethod("ParseSounds", _me, "Sound.xml")
  }

  }

  if (callNamed("memberExists", lingoBinary("join", lingoBinary("join", a_sRoomName, "Tracker"), ".xml"))) {
  callMethod("parseTrackerData", _me, lingoBinary("join", lingoBinary("join", a_sRoomName, "Tracker"), ".xml"))
  } else {
  if (callNamed("memberExists", "Tracker.xml")) {
  callMethod("parseTrackerData", _me, "Tracker.xml")
  }

  }

  }

  }

}

