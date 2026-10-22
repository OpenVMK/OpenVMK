// 6f0542e8885a8074c087cc89ca510672.cct / CTutorialComponent / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_iNavCode", undefined);
  setMeProp(_me, "m_bSettingsDataArrived", 0);
  setMeProp(_me, "m_visible", 0);
  setMeProp(_me, "m_bTutorialsAllowed", 1);
  setMeProp(_me, "m_pTakenActions", new LingoList([]));
  setMeProp(_me, "m_pTutorialsData", undefined);
  callNamed("registerMessage", symbol("Initialize"), callMethod("getID", _me), symbol("InitializeObject"))
  callNamed("registerMessage", symbol("ui_tutorial"), callMethod("getID", _me), symbol("showHide"))
  callNamed("registerMessage", symbol("get_tutorials_state"), callMethod("getID", _me), symbol("getTutorialsVisibleState"))
  callNamed("registerMessage", symbol("set_tutorials_state"), callMethod("getID", _me), symbol("setTutorialsVisibleState"))
}

