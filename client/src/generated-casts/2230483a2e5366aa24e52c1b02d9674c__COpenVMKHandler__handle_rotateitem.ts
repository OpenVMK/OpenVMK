// 2230483a2e5366aa24e52c1b02d9674c.cct / COpenVMKHandler / handle_rotateitem

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function handle_rotateitem(_me: LingoMe, a_rMsg: LingoValue) {
  /* global */ var g_rCore = globalVar("g_rCore");
  var t_rInput = a_rMsg.connection;
  var t_iRef = callMethod("GetIntFrom", t_rInput);
  var t_iRotation = callMethod("GetIntFrom", t_rInput);
  var t_rObject = callMethod("_AccessRoom", callNamed("getObject", symbol("room_component")));
  if (callNamed("objectp", t_rObject)) {
  var t_rElement = callMethod("_AccessIndexed", t_rObject, t_iRef, "element");
  if (callNamed("objectp", t_rElement)) {
  callMethod("SetParam", t_rElement, "DIR", callNamed("string", t_iRotation))
  callMethod("_ComposeBlocks", callMethod("GetFactor", t_rElement))
  if ((lingoTruthy(callNamed("voidp", callNamed("GetVisual", t_rElement))) ? 0 : 1)) {
  if (callNamed("IsSelected", callNamed("GetVisual", t_rElement))) {
  callNamed("RemoveHighlighters", callNamed("GetVisual", t_rElement))
  callNamed("CreateHighlighters", callNamed("GetVisual", t_rElement))
  }

  }

  } else {
  callNamed("error", "Unable to access element!", symbol("rotateitem"))
  }

  } else {
  callNamed("error", "Unable to access room!", symbol("rotateitem"))
  }

}

