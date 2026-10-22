// minigame_engine2.cct / CGoopComponent / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  /* global */ var g_profMGEngine = globalVar("g_profMGEngine");
  /* global */ var g_profMGEProcess = globalVar("g_profMGEProcess");
  setMeProp(_me, "m_iAllocationModel", symbol("simple"));
  setMeProp(_me, "m_rObjectPool", undefined);
  setMeProp(_me, "m_rHandler", undefined);
  setMeProp(_me, "m_mp_objects", new LingoPropList([]));
  callMethod("sort", meProp(_me, "m_mp_objects"))
  setMeProp(_me, "m_sHandler", new LingoList(["CMinigameHandlerPrototype"]));
  setMeProp(_me, "m_mp_sObject", new LingoPropList([]));
  setMeProp(_me, "m_ar_ar_objByType", new LingoList([]));
  setMeProp(_me, "m_rRoomContext", undefined);
  setMeProp(_me, "m_rCurrentTurn", undefined);
  setMeProp(_me, "m_rNextTurn", undefined);
  setMeProp(_me, "m_fTurnT", float(0));
  setMeProp(_me, "m_fTurnPulse", 0.3);
  setMeProp(_me, "m_iLastMS", 0);
  setMeProp(_me, "m_iLastSubturn", 0);
  setMeProp(_me, "m_ar_turnBuffer", new LingoList([]));
  setMeProp(_me, "m_bChecksumInvalid", 0);
  setMeProp(_me, "m_syncLostTime", float(0));
  setMeProp(_me, "m_iSpeedUp", 1);
  setMeProp(_me, "m_iSubTurnSpacing", float(100));
  setMeProp(_me, "m_iOwnerRef", 0);
  setMeProp(_me, "m_ar_rMyObjects", new LingoList([]));
  setMeProp(_me, "m_MGEProcessAcc", 0);
  setMeProp(_me, "m_bDump", 0);
  callNamed("createObject", "MGEVelocityTable", "CVelocityTbl")
  setMeProp(_me, "m_rVelocityTable", callNamed("getObject", "MGEVelocityTable"));
  callNamed("createObject", "MGEQuickRandom", "CIterateSeed")
  setMeProp(_me, "m_rQuickRandom", callNamed("getObject", "MGEQuickRandom"));
  callNamed("createObject", "MGEComponentToAngle", "CComponentToAngle")
  setMeProp(_me, "m_rComponentToAngle", callNamed("getObject", "MGEComponentToAngle"));
  callNamed("createObject", "MGECollisionRoutine", "CCollision")
  setMeProp(_me, "m_rCollision", callNamed("getObject", "MGECollisionRoutine"));
  callNamed("registerMessage", symbol("SetMinigameHandler"), callMethod("getID", _me), symbol("_SetMinigameHandler"))
  callNamed("registerMessage", symbol("RegisterMinigameObject"), callMethod("getID", _me), symbol("SetMinigameObject"))
  callNamed("registerMessage", symbol("SendMinigameAction"), callMethod("getID", _me), symbol("_SendMinigameAction"))
  callNamed("registerMessage", symbol("SetMinigameOwnerRef"), callMethod("getID", _me), symbol("_SetMinigameOwnerRef"))
  callNamed("registerMessage", symbol("StartMinigameEngine"), callMethod("getID", _me), symbol("StartMinigameEngine"))
  callNamed("registerMessage", symbol("StopMinigameEngine"), callMethod("getID", _me), symbol("StopMinigameEngine"))
  callNamed("receiveUpdate", callMethod("getID", _me))
  return 1;
}

