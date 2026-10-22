// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomHandler / _CurrentItemConfiguration

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _CurrentItemConfiguration(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_rInput = a_rMsg.connection;
  var t_iRef = callMethod("GetIntFrom", t_rInput);
  var t_iCount = callMethod("GetIntFrom", t_rInput);
  var t_ar_keypairs = new LingoPropList([]);
  for (var i = 1; i <= t_iCount; ++i) {
  var t_sKey = callMethod("GetStrFrom", t_rInput);
  var t_sValue = callMethod("GetStrFrom", t_rInput);
  t_ar_keypairs[t_sKey] = t_sValue;
  }

  var t_rContext = callMethod("_AccessRoom", callMethod("getComponent", _this));
  if (callNamed("objectp", t_rContext)) {
  var t_rElem = callMethod("_AccessIndexed", t_rContext, t_iRef, "element");
  if (callNamed("objectp", t_rElem)) {
  callMethod("CurrentItemConfiguration", callMethod("GetFactor", t_rElem), t_iRef, t_ar_keypairs)
  }

  }

}

