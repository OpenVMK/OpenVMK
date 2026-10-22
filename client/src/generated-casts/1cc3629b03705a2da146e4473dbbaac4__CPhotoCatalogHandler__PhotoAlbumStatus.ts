// 1cc3629b03705a2da146e4473dbbaac4.cct / CPhotoCatalogHandler / PhotoAlbumStatus

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PhotoAlbumStatus(_me: LingoMe, tMsg: LingoValue) {
  var tPics = callMethod("GetIntFrom", tMsg.connection);
  var tCapacity = callMethod("GetIntFrom", tMsg.connection);
  if (lingoBinary("gte", tPics, tCapacity)) {
  callMethod("SetAlbumFull", callMethod("getComponent", _me), 1)
  } else {
  callMethod("SetAlbumFull", callMethod("getComponent", _me), 0)
  }

}

