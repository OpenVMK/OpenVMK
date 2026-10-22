// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomHandler / _ElementStatus

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ElementStatus(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_iRef = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iInt = callMethod("GetIntFrom", a_rMsg.connection);
  var t_rContext = callMethod("_AccessRoom", callMethod("getComponent", _this));
  if (callNamed("objectp", t_rContext)) {
  var t_rElem = callMethod("_AccessIndexed", t_rContext, t_iRef, "element");
  if (callNamed("objectp", t_rElem)) {
  callMethod("setState", callMethod("GetFactor", t_rElem), t_iInt)
  } else {
  t_rElem = callMethod("_AccessIndexed", t_rContext, t_iRef, "collectable");
  if (callNamed("objectp", t_rElem)) {
  callMethod("setState", callMethod("GetFactor", t_rElem), t_iInt)
  }

  }

  }

}

