// vmk_sound.cct / CSoundTracker / timerStart

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function timerStart(_me: LingoMe) {
  if (callNamed("timeoutExists", meProp(_me, "m_TmrTracker"))) {
  callNamed("removeTimeout", meProp(_me, "m_TmrTracker"))
  }

  setMeProp(_me, "m_CurrentTime", float(0));
  callNamed("createTimeout", meProp(_me, "m_TmrTracker"), 100, symbol("TrackerEvent"), callMethod("getID", _me), undefined, 0)
}

