// minigame_engine_potc2.cct / CGameComponent / _MinigameTestChecksum

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _MinigameTestChecksum(_me: LingoMe, i_iChecksum: LingoValue) {
  /* global */ var g_profMGEngine = globalVar("g_profMGEngine");
  /* global */ var g_profMGEProcess = globalVar("g_profMGEProcess");
  if (lingoBinary("or", (lingoTruthy(callNamed("voidp", meProp(_me, "m_rRoomContext"))) ? 0 : 1), meProp(_me, "m_bChecksumInvalid"))) {
  var tMyChecksum = callMethod("calculateChecksum", _me);
  if (meProp(_me, "m_bDump")) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", "Checksum:", tMyChecksum), "vs."), i_iChecksum))
  }

  if (lingoBinary("neq", i_iChecksum, tMyChecksum)) {
  callNamed("put", "MGEngine: Checksum mismatch")
  var tDump = meProp(_me, "m_bDump");
  setMeProp(_me, "m_bDump", 0);
  if (meProp(_me, "m_bDump")) {
  callNamed("put", "START")
  callNamed("put", lingoBinary("join", lingoBinary("join", "Turn was ", meProp(_me, "m_syncLostTime")), " seconds late."))
  callMethod("PrintEvents", _me, meProp(_me, "m_rCurrentTurn"))
  callMethod("calculateChecksum", _me)
  callNamed("put", "END")
  }

  setMeProp(_me, "m_bDump", tDump);
  callMethod("_SendMinigameAction", _me, 3, new LingoList([]))
  setMeProp(_me, "m_bChecksumInvalid", 1);
  callMethod("SetSyncState", meProp(_me, "m_rHandler"), 0)
  }

  }

}

