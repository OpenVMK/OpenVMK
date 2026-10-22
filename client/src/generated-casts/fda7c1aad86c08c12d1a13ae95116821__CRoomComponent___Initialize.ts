// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomComponent / _Initialize

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _Initialize(_me: LingoMe, _this: LingoValue, a_sStatus: LingoValue) {
  callNamed("unregisterMessage", symbol("Initialize"), callMethod("getID", _this))
  setMeProp(_me, "m_rFurniMap", callNamed("createObject", callNamed("getUniqueID"), "CRoomFurnitureMap"));
  callNamed("createObject", "RoomItemAssetManager", "CRoomItemAssetManager")
  setMeProp(_me, "m_rThumbRenderer", callNamed("createObject", callNamed("getUniqueID"), "CRoomFurniThumbRenderer"));
}

