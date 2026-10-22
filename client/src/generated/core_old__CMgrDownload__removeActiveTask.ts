// core.old.cct / CMgrDownload / removeActiveTask

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function removeActiveTask(_me: LingoMe, tMemName: LingoValue, tCallback: LingoValue) {
  for (var i = 1; i <= meProp(_me, "pActiveTasks").count; ++i) {
  if (lingoBinary("eq", meProp(_me, "pActiveTasks")[i].pMemName, tMemName)) {
  callMethod("deconstruct", meProp(_me, "pActiveTasks")[i])
  callMethod("deleteAt", meProp(_me, "pActiveTasks"), i)
  callMethod("add", meProp(_me, "pCompleteTasks"), tMemName)
  callMethod("updateQueue", _me)
  break;
  }

  }

  if (!lingoTruthy(callNamed("voidp", tCallback))) {
  if (callNamed("objectExists", tCallback[symbol("client")])) {
  callNamed("call", tCallback[symbol("method")], callNamed("getObject", tCallback[symbol("client")]), tCallback[symbol("argument")])
  }

  }

  return 0;
}

