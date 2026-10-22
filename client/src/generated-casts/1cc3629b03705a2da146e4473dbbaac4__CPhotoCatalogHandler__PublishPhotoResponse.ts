// 1cc3629b03705a2da146e4473dbbaac4.cct / CPhotoCatalogHandler / PublishPhotoResponse

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PublishPhotoResponse(_me: LingoMe, tMsg: LingoValue) {
  var tAction = callMethod("GetIntFrom", tMsg.connection);
  var tPhotoID = callMethod("GetIntFrom", tMsg.connection);
  var tSuccessCode = callMethod("GetIntFrom", tMsg.connection);
  if (lingoBinary("eq", tSuccessCode, 0)) {
  callMethod("removePhotoID", callMethod("getComponent", _me), tPhotoID)
  } else {
  if (lingoBinary("eq", tSuccessCode, 1)) {
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "ErrorDialog", 1, 0);
  callMethod("show", t)
  callMethod("setText", t, callNamed("getText", "photocatalog_action_cannot_be_applied"), "Error", "OK")
  } else {
  if (lingoBinary("eq", tSuccessCode, 2)) {
  t = callNamed("createDialogWindow", callMethod("getID", _me), "ErrorDialog", 1, 0);
  callMethod("show", t)
  callMethod("setText", t, callNamed("getText", "photocatalog_album_size_exceeded"), callNamed("getText", "album_full"), "OK")
  callMethod("SetAlbumFull", callMethod("getComponent", _me), 1)
  }

  }

  }

}

