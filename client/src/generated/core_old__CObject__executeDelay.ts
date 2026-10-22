// core.old.cct / CObject / executeDelay

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function executeDelay(_me: LingoMe, _this: LingoValue, a_rTimeout: LingoValue) {
  var t_sID = a_rTimeout.name;
  var t_rTask = meProp(_me, "delays")[t_sID];
  callMethod("cancel", _this, t_sID)
  callNamed("call", t_rTask[symbol("method")], _this, t_rTask[symbol("argument")])
}

