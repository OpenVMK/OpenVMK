// eba88a10adbb7784498c2112110c5871.cct / Navigator Handler Class / HandleError

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HandleError(_me: LingoMe, tMsg: LingoValue) {
  var t_iMsgNum = tMsg[symbol("subject")];
  switch (t_iMsgNum) {
case 20:
  callNamed("put", "space does not exist")
  break;
case 21:
  callNamed("put", "search string too short")
  break;
case 22:
  callNamed("put", "entering space without owner present")
  break;
case 23:
  callNamed("put", "space not accessible from navigator")
  break;
case 30:
  callNamed("put", "unknown navigation node tag")
  break;
  }

}

