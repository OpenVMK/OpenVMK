// vmk_sound.cct / CSoundTracker / StopRoomSounds

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function StopRoomSounds(_me: LingoMe) {
  setMeProp(_me, "m_TmrTracker", "trackerTimer");
  setMeProp(_me, "m_CurrentTime", float(0));
  setMeProp(_me, "m_PanCounter", 0);
  setMeProp(_me, "m_mpSoundData", new LingoPropList([]));
  setMeProp(_me, "m_mp_SoundProperties", new LingoPropList([]));
  setMeProp(_me, "m_mpEndTime", undefined);
  setMeProp(_me, "m_arLoopChannels", undefined);
  if (callNamed("timeoutExists", meProp(_me, "m_TmrTracker"))) {
  callNamed("removeTimeout", meProp(_me, "m_TmrTracker"))
  }

  callMethod("resetSettings", _me)
}

