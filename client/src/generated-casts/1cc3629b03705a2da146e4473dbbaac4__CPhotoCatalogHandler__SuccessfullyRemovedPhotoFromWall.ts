// 1cc3629b03705a2da146e4473dbbaac4.cct / CPhotoCatalogHandler / SuccessfullyRemovedPhotoFromWall

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SuccessfullyRemovedPhotoFromWall(_me: LingoMe, tMsg: LingoValue) {
  var tRef = callMethod("GetIntFrom", tMsg.connection);
  var tID = callMethod("GetIntFrom", tMsg.connection);
  callMethod("AddID", callMethod("getComponent", _me), tID)
}

