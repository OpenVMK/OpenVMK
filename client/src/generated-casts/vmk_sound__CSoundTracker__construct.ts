// vmk_sound.cct / CSoundTracker / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  callNamed("registerMessage", "LoadRoomSound", callMethod("getID", _me), symbol("StartRoomSounds"))
  callNamed("registerMessage", "StopRoomSound", callMethod("getID", _me), symbol("StopRoomSounds"))
  callNamed("registerMessage", "ResetRoomSound", callMethod("getID", _me), symbol("ResetRoomSounds"))
  callNamed("registerMessage", "ResetFXChannels", callMethod("getID", _me), symbol("ResetFXChannels"))
  callNamed("registerMessage", "ControlRoomMusic", callMethod("getID", _me), symbol("ControlRoomMusic"))
  callNamed("registerMessage", symbol("room_ready"), callMethod("getID", _me), symbol("StartRoomSounds"))
  callNamed("registerMessage", "room_leave", callMethod("getID", _me), symbol("RoomLeave"))
  setMeProp(_me, "m_TmrTracker", "trackerTimer");
  setMeProp(_me, "m_CurrentTime", float(0));
  setMeProp(_me, "m_PanCounter", 0);
  setMeProp(_me, "m_mpSoundData", new LingoPropList([]));
  setMeProp(_me, "m_mp_SoundProperties", new LingoPropList([]));
  setMeProp(_me, "m_ar_OneShot", new LingoPropList([]));
  setMeProp(_me, "m_mp_SndTypes", new LingoPropList([]));
  setMeProp(_me, "m_mpEndTime", undefined);
  setMeProp(_me, "m_arLoopChannels", undefined);
  var m_bStatus = undefined;
  setMeProp(_me, "m_sRoomName", undefined);
  setMeProp(_me, "m_iMasterLoopCount", 0);
  setMeProp(_me, "m_StopJustMusic", 0);
  setMeProp(_me, "m_bMusic", callMethod("get", callNamed("getObject", symbol("session")), "music"));
  setMeProp(_me, "m_bFx", callMethod("get", callNamed("getObject", symbol("session")), "fx"));
  setMeProp(_me, "m_iVolume", callMethod("get", callNamed("getObject", symbol("session")), "volume"));
  callMethod("resetSettings", _me)
  return 1;
}

