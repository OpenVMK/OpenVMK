// 3f02613936ba018480acffaf92dd883a.cct / CAnimationComponent / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_iLastFrame", theProperty("milliSeconds"));
  setMeProp(_me, "m_mp_arrangements", new LingoPropList([]));
  setMeProp(_me, "m_idAllocator", 1);
  setMeProp(_me, "m_maxIDs", 5000);
  setMeProp(_me, "m_ar_animations", new LingoList([]));
  setMeProp(_me, "m_rAnimationManager", undefined);
  callNamed("registerMessage", symbol("Initialize"), callMethod("getID", _me), symbol("InitializeAnimationManager"))
  callNamed("registerMessage", symbol("room_ready"), callMethod("getID", _me), symbol("activateAnimations"))
  callNamed("registerMessage", symbol("room_leave"), callMethod("getID", _me), symbol("deActivateAnimations"))
  callNamed("receiveUpdate", callMethod("getID", _me))
  return 1;
}

