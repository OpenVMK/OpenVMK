// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomItemAssetManager / IsItemPending

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function IsItemPending(_me: LingoMe, _this: LingoValue, a_iItemTypeCode: LingoValue) {
  return lingoBinary("gt", callMethod("getOne", meProp(_me, "m_ar_iPending"), a_iItemTypeCode), 0);
}

