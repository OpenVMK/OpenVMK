// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogPinsView / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setThePropOf(_this, "m_sThumbRenderMessage", "GetPinThumbnail");
  setThePropOf(_this, "m_sPrevRenderMEssage", "GetPinPreview");
  if (callNamed("objectp", _this.m_rGridRenderer)) {
  callNamed("removeObject", callMethod("getID", _this.m_rGridRenderer))
  }

  setThePropOf(_this, "m_rGridRenderer", callNamed("createObject", callNamed("getUniqueID"), new LingoList(["CGenericThumbnailGrid", "CCatPinThumbnailGrid"])));
  return 1;
}

