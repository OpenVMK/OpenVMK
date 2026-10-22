// 0e4feeca6184e908b7fbd03d6d41b7b8.cct / Binary Manager Class / next

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function next(_me: LingoMe) {
  if ((lingoTruthy(callNamed("multiuserExists", meProp(_me, "pConnectionId"))) ? 0 : 1)) {
  callNamed("createMultiuser", meProp(_me, "pConnectionId"), callNamed("getVariable", "connection.mus.host"), callNamed("getIntVariable", "connection.mus.port"))
  callMethod("registerBinaryDataHandler", callNamed("getMultiuser", meProp(_me, "pConnectionId")), callMethod("getID", _me), symbol("binaryDataReceived"))
  callMethod("delay", _me, 2000, symbol("checkConnection"))
  } else {
  if (callMethod("connectionReady", callNamed("getMultiuser", meProp(_me, "pConnectionId")))) {
  if (callNamed("timeoutExists", meProp(_me, "pTimeOutID"))) {
  callNamed("removeTimeout", meProp(_me, "pTimeOutID"))
  }

  if (lingoBinary("gt", callNamed("count", meProp(_me, "pQueue")), 0)) {
  var tTask = meProp(_me, "pQueue")[1];
  switch (tTask._type) {
case symbol("storephoto"):
  return callMethod("sendBinary", callNamed("getMultiuser", meProp(_me, "pConnectionId")), tTask.data);
case symbol("storethumb"):
  return callMethod("sendThumb", callNamed("getMultiuser", meProp(_me, "pConnectionId")), tTask.data);
case symbol("retrievethumb"):
  return callMethod("send", callNamed("getMultiuser", meProp(_me, "pConnectionId")), lingoBinary("joinPad", "REQUEST_THUMBNAIL", tTask.id));
case symbol("retrievecatalog"):
  return callMethod("send", callNamed("getMultiuser", meProp(_me, "pConnectionId")), lingoBinary("joinPad", "REQUEST_CATALOG_PHOTO", tTask.id));
case symbol("retrievequest"):
  return callMethod("send", callNamed("getMultiuser", meProp(_me, "pConnectionId")), lingoBinary("joinPad", "REQUEST_QUEST_PHOTO", tTask.id));
case symbol("retrievenext"):
  return callMethod("send", callNamed("getMultiuser", meProp(_me, "pConnectionId")), lingoBinary("joinPad", "REQUEST_NEXT_ALBUM_PHOTO", tTask.id));
case symbol("retrieveprev"):
  return callMethod("send", callNamed("getMultiuser", meProp(_me, "pConnectionId")), lingoBinary("joinPad", "REQUEST_PREVIOUS_ALBUM_PHOTO", tTask.id));
case symbol("retrievewall"):
  return callMethod("send", callNamed("getMultiuser", meProp(_me, "pConnectionId")), lingoBinary("joinPad", "REQUEST_WALL_PHOTO", tTask.id));
case symbol("fusemsg"):
  callMethod("send", callNamed("getMultiuser", meProp(_me, "pConnectionId")), tTask.message)
  return 1;
  }

  } else {
  callNamed("createTimeout", meProp(_me, "pTimeOutID"), 30000, symbol("delayedClosing"), callMethod("getID", _me), undefined, 1)
  }

  } else {
  callMethod("checkConnection", _me)
  }

  }

}

