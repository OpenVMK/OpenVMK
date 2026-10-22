// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFurniThumbRenderer / _FetchFurniThumbnail

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _FetchFurniThumbnail(_me: LingoMe, _this: LingoValue, a_mp_iType_rOutput: LingoValue, a_rCallback: LingoValue) {
  callMethod("load", callNamed("createObject", symbol("random"), "CRoomFurniSetLoader"), a_mp_iType_rOutput, a_rCallback, _this, symbol("_ReturnFurniThumbnail"))
}

