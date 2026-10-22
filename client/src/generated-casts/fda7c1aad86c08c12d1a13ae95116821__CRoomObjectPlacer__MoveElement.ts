// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomObjectPlacer / MoveElement

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function MoveElement(_me: LingoMe, _this: LingoValue, a_rMovable: LingoValue) {
  setMeProp(_me, "m_kMode", symbol("move"));
  setMeProp(_me, "m_bRunning", 1);
  setMeProp(_me, "m_rMovable", a_rMovable);
  setMeProp(_me, "m_sLastOwner", "");
  setMeProp(_me, "m_veLastScrPos", callNamed("vector"));
  setMeProp(_me, "m_ptLastScrPos", callNamed("point", 0, 0));
  setMeProp(_me, "m_rContext", callMethod("GetContext", meProp(_me, "m_rMovable")));
  setMeProp(_me, "m_rIterator", callMethod("GetIterator", meProp(_me, "m_rContext"), "floor"));
  setMeProp(_me, "m_rOriginalPlace", callMethod("GetTheTileStack", callMethod("GetFactor", a_rMovable)));
  callNamed("createObject", "RoomObjPlacerEventAgent", "CEventAgent")
  callMethod("registerEvent", callNamed("getObject", "RoomObjPlacerEventAgent"), _this, symbol("mouseUp"), symbol("StopPlacement"))
  callNamed("receiveUpdate", callMethod("getID", _this))
}

