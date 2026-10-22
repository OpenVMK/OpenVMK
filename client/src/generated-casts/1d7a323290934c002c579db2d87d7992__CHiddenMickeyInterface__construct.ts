// 1d7a323290934c002c579db2d87d7992.cct / CHiddenMickeyInterface / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_mpHMMembersByType", new LingoPropList([0, new LingoPropList(["floor", "q2", "wall", "q1"]), 1, new LingoPropList(["floor", "q4", "wall", "q3"]), 2, new LingoPropList(["floor", "q6", "wall", "q5"]), 3, new LingoPropList(["floor", "q8", "wall", "q7"]), 4, new LingoPropList(["floor", "q10", "wall", "q9"])]));
  setMeProp(_me, "m_windowTitle", "Hidden Mickey");
  setMeProp(_me, "m_sCameraWindowName", "CameraViewFinder");
  setMeProp(_me, "m_sPicTitleWindowName", "CameraPictureTitle");
  setMeProp(_me, "m_lHiddenMickeysInViewFinder", new LingoList([]));
  setMeProp(_me, "m_ar_HiddenMickeysInRoom", new LingoList([]));
  setMeProp(_me, "m_mpHiddenMickeysInRoom", new LingoPropList([]));
  callMethod("sort", meProp(_me, "m_mpHiddenMickeysInRoom"))
  setMeProp(_me, "m_arActiveMickeyList", new LingoList([]));
  setMeProp(_me, "m_mpMickeyColorList", new LingoPropList([]));
  callMethod("sort", meProp(_me, "m_mpMickeyColorList"))
  callNamed("registerMessage", symbol("Initialize"), callMethod("getID", _me), symbol("InitializeObject"))
  callNamed("registerMessage", symbol("room_ready"), callMethod("getID", _me), symbol("allocateMickeysInRoom"))
  callNamed("registerMessage", symbol("room_leave"), callMethod("getID", _me), symbol("reset"))
  return 1;
}

