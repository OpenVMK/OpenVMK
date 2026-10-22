// vmk_npc_gatorwaiter.cct / CGatorWaiterHandler / elementUpdate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function elementUpdate(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_rInput = a_rMsg.connection;
  var t_iRef = callMethod("GetIntFrom", t_rInput);
  var t_iCategory = callMethod("GetIntFrom", t_rInput);
  var t_iPlaceRef = callMethod("GetIntFrom", t_rInput);
  var t_iAllowMove = callMethod("GetIntFrom", t_rInput);
  var t_iParamCnt = callMethod("GetIntFrom", t_rInput);
  var t_iNpcDir = callMethod("GetIntFrom", t_rInput);
  var t_iNpcAction = callMethod("GetIntFrom", t_rInput);
  callMethod("ControlGator", _this._interface, t_iNpcDir, t_iNpcAction)
}

