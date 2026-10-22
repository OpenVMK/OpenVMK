// core.old.cct / CMgrCastload / TellStreamState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TellStreamState(_me: LingoMe, _this: LingoValue, tFileName: LingoValue, tstate: LingoValue, tPercent: LingoValue, tID: LingoValue) {
  callNamed("call", symbol("UpdateTaskPercent"), meProp(_me, "pTaskList")[tID], tPercent, tFileName)
}

