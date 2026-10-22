// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomObjectPlacer / MovePoster

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function MovePoster(_me: LingoMe, _this: LingoValue, a_rMovable: LingoValue) {
  setMeProp(_me, "m_kMode", symbol("move"));
  setMeProp(_me, "m_bRunning", 1);
  setMeProp(_me, "m_rMovable", a_rMovable);
  setMeProp(_me, "m_sLastOwner", "");
  setMeProp(_me, "m_ptLastScrPos", callNamed("point", 0, 0));
  setMeProp(_me, "m_rContext", callMethod("GetContext", meProp(_me, "m_rMovable")));
  setMeProp(_me, "m_rIterator", callMethod("GetIterator", meProp(_me, "m_rContext"), "wall"));
  setMeProp(_me, "m_rOriginalPlace", new LingoPropList([symbol("pos"), callMethod("GetRelPos", meProp(_me, "m_rMovable")), symbol("owner"), callNamed("integer", callMethod("GetParam", callMethod("GetOwner", meProp(_me, "m_rMovable")), "REF"))]));
  callNamed("createObject", "RoomObjPlacerEventAgent", "CEventAgent")
  callMethod("registerEvent", callNamed("getObject", "RoomObjPlacerEventAgent"), _this, symbol("mouseUp"), symbol("StopPlacement"))
  callNamed("receiveUpdate", callMethod("getID", _this))
}

