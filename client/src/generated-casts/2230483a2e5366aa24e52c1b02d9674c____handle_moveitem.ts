// 2230483a2e5366aa24e52c1b02d9674c.cct /  / handle_moveitem

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function handle_moveitem(_me: LingoMe, a_rMsg: LingoValue) {
  /* global */ var g_rCore = globalVar("g_rCore");
  var t_rInput = a_rMsg.connection;
  var t_rContext = callMethod("_AccessRoom", callNamed("getObject", symbol("room_component")));
  var t_iRef = callMethod("GetIntFrom", t_rInput);
  var t_rObject = callMethod("_AccessIndexed", t_rContext, t_iRef, "element");
  if (callNamed("objectp", t_rObject)) {
  var t_rTile = callMethod("_AccessIndexed", t_rContext, callMethod("GetIntFrom", t_rInput), "tile");
  callMethod("SetToTileStack", callMethod("GetFactor", t_rObject), t_rTile, callMethod("GetIntFrom", t_rInput))
  } else {
  callNamed("error", "Unable to remove item: item doesn't exist!", symbol("handle_moveitem"))
  }

}

