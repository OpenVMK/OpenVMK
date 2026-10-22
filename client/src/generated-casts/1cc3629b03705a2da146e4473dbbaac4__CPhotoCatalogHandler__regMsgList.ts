// 1cc3629b03705a2da146e4473dbbaac4.cct / CPhotoCatalogHandler / regMsgList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function regMsgList(_me: LingoMe, tBool: LingoValue) {
  var tMsgs = new LingoPropList([]);
  callMethod("setaProp", tMsgs, 2761, symbol("PhotoCatalogIndex"))
  callMethod("setaProp", tMsgs, 2763, symbol("SuccessfullyPlacedPhotoOnWall"))
  callMethod("setaProp", tMsgs, 2765, symbol("SuccessfullyRemovedPhotoFromWall"))
  callMethod("setaProp", tMsgs, 2766, symbol("PublishPhotoResponse"))
  callMethod("setaProp", tMsgs, 2767, symbol("PhotoAlbumStatus"))
  var tCmds = new LingoPropList([]);
  callMethod("setaProp", tCmds, "REQUEST_PHOTO_CATALOG_INDEX", 761)
  callMethod("setaProp", tCmds, "PUBLISH_PHOTO", 762)
  callMethod("setaProp", tCmds, "DELETE_PHOTO", 763)
  callMethod("setaProp", tCmds, "PLACE_PHOTO_ON_WALL", 764)
  callMethod("setaProp", tCmds, "REMOVE_PHOTO_FROM_WALL", 765)
  callMethod("setaProp", tCmds, "EDIT_CAPTION", 766)
  callMethod("setaProp", tCmds, "TEST_ALBUM_STATUS", 769)
  if (tBool) {
  callNamed("registerListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tMsgs)
  callNamed("registerCommands", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tCmds)
  } else {
  callNamed("unregisterListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tMsgs)
  callNamed("unregisterCommands", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tCmds)
  }

}

