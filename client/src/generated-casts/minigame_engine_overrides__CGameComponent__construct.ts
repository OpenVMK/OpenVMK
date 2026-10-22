// minigame_engine_overrides.cct / CGameComponent / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setThePropOf(_me, "m_iAllocationModel", symbol("simple"));
  setThePropOf(_me, "m_rObjectPool", undefined);
  setThePropOf(_me, "m_rHandler", undefined);
  setThePropOf(_me, "m_mp_objects", callNamed("propList"));
  callMethod("sort", _me.m_mp_objects)
  setThePropOf(_me, "m_sHandler", new LingoList(["CMinigameHandlerPrototype"]));
  setThePropOf(_me, "m_mp_sObject", callNamed("propList"));
  setThePropOf(_me, "m_ar_ar_objByType", new LingoList([]));
  setThePropOf(_me, "m_rRoomContext", undefined);
  setThePropOf(_me, "m_rCurrentTurn", undefined);
  setThePropOf(_me, "m_rNextTurn", undefined);
  setThePropOf(_me, "m_fTurnT", float(0));
  setThePropOf(_me, "m_fTurnPulse", "??33333");
  setThePropOf(_me, "m_iLastMS", 0);
  setThePropOf(_me, "m_iLastSubturn", 0);
  setThePropOf(_me, "m_ar_turnBuffer", new LingoList([]));
  setThePropOf(_me, "m_bChecksumInvalid", 0);
  setThePropOf(_me, "m_syncLostTime", float(0));
  setThePropOf(_me, "m_iSpeedUp", 1);
  setThePropOf(_me, "m_iSubTurnSpacing", float(100));
  setThePropOf(_me, "m_iOwnerRef", 0);
  setThePropOf(_me, "m_ar_rMyObjects", new LingoList([]));
  setThePropOf(_me, "m_MGEProcessAcc", 0);
  setThePropOf(_me, "m_bDump", 0);
  callNamed("createObject", "MGEVelocityTable", "CVelocityTbl")
  setThePropOf(_me, "m_rVelocityTable", callNamed("getObject", "MGEVelocityTable"));
  callNamed("createObject", "MGEQuickRandom", "CIterateSeed")
  setThePropOf(_me, "m_rQuickRandom", callNamed("getObject", "MGEQuickRandom"));
  callNamed("createObject", "MGEComponentToAngle", "CComponentToAngle")
  setThePropOf(_me, "m_rComponentToAngle", callNamed("getObject", "MGEComponentToAngle"));
  callNamed("createObject", "MGECollisionRoutine", "CCollision")
  setThePropOf(_me, "m_rCollision", callNamed("getObject", "MGECollisionRoutine"));
  callNamed("registerMessage", symbol("SetMinigameHandler"), callMethod("getID", _me), symbol("_SetMinigameHandler"))
  callNamed("registerMessage", symbol("RegisterMinigameObject"), callMethod("getID", _me), symbol("SetMinigameObject"))
  callNamed("registerMessage", symbol("SendMinigameAction"), callMethod("getID", _me), symbol("_SendMinigameAction"))
  callNamed("registerMessage", symbol("SetMinigameOwnerRef"), callMethod("getID", _me), symbol("_SetMinigameOwnerRef"))
  callNamed("registerMessage", symbol("StartMinigameEngine"), callMethod("getID", _me), symbol("StartMinigameEngine"))
  callNamed("registerMessage", symbol("StopMinigameEngine"), callMethod("getID", _me), symbol("StopMinigameEngine"))
  callNamed("receiveUpdate", callMethod("getID", _me))
  return 1;
}

