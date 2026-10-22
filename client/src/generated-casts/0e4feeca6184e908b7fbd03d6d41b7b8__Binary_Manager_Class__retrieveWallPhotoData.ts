// 0e4feeca6184e908b7fbd03d6d41b7b8.cct / Binary Manager Class / retrieveWallPhotoData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function retrieveWallPhotoData(_me: LingoMe, tID: LingoValue, tCallBackObj: LingoValue) {
  if ((lingoTruthy(callMethod("checkRecycleCount", _me)) ? 0 : 1)) {
  return 0;
  }

  callMethod("add", meProp(_me, "pQueue"), new LingoPropList([symbol("type"), symbol("retrievewall"), symbol("id"), tID, symbol("callback"), tCallBackObj]))
  if (lingoBinary("or", lingoBinary("eq", callNamed("count", meProp(_me, "pQueue")), 1), (lingoTruthy(callNamed("multiuserExists", meProp(_me, "pConnectionId"))) ? 0 : 1))) {
  callMethod("next", _me)
  }

}

