// vmk_pirates2_game_preshow_handler.cct / CPPSHandler / InstanceInfo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function InstanceInfo(_me: LingoMe, tMsg: LingoValue) {
  callMethod("ClearInstanceList", callMethod("getInterface", _me))
  var tSpaceID = callMethod("GetIntFrom", tMsg.connection);
  var tCount = callMethod("GetIntFrom", tMsg.connection);
  for (var i = 1; i <= tCount; ++i) {
  var tInstanceID = callMethod("GetIntFrom", tMsg.connection);
  var tUserPercentage = callMethod("GetIntFrom", tMsg.connection);
  callMethod("AddInstance", callMethod("getInterface", _me), tInstanceID, tUserPercentage)
  }

  callMethod("RefreshGameRooms", callMethod("getInterface", _me))
  callMethod("SetSpaceID", callMethod("getInterface", _me), tSpaceID)
}

