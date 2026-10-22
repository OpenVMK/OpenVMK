// minigame_engine_overrides.cct / CGameComponent / _MinigameTestChecksum

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _MinigameTestChecksum(_me: LingoMe, i_iChecksum: LingoValue) {
  if (lingoBinary("or", (lingoTruthy(callNamed("voidp", _me.m_rRoomContext)) ? 0 : 1), _me.m_bChecksumInvalid)) {
  var tMyChecksum = callMethod("calculateChecksum", _me);
  if (_me.m_bDump) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", "Checksum:", tMyChecksum), "vs."), i_iChecksum))
  }

  if (lingoBinary("neq", i_iChecksum, tMyChecksum)) {
  callNamed("put", "MGEngine: Checksum mismatch")
  var tDump = _me.m_bDump;
  setThePropOf(_me, "m_bDump", 0);
  if (_me.m_bDump) {
  callNamed("put", "START")
  callNamed("put", lingoBinary("join", lingoBinary("join", "Turn was ", _me.m_syncLostTime), " seconds late."))
  callMethod("PrintEvents", _me, _me.m_rCurrentTurn)
  callMethod("calculateChecksum", _me)
  callNamed("put", "END")
  }

  setThePropOf(_me, "m_bDump", tDump);
  callMethod("_SendMinigameAction", _me, 3, new LingoList([]))
  setThePropOf(_me, "m_bChecksumInvalid", 1);
  callMethod("SetSyncState", _me.m_rHandler, 1)
  }

  }

}

