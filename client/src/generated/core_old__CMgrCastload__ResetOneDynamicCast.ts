// core.old.cct / CMgrCastload / ResetOneDynamicCast

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ResetOneDynamicCast(_me: LingoMe, _this: LingoValue, tCastNum: LingoValue) {
  if (lingoBinary("neq", callMethod("getOne", meProp(_me, "pLoadedCasts"), callNamed("string", tCastNum)), 0)) {
  callMethod("deleteProp", meProp(_me, "pLoadedCasts"), callMethod("getOne", meProp(_me, "pLoadedCasts"), callNamed("string", tCastNum)))
  } else {
  callNamed("error", _this, lingoBinary("joinPad", "Couldn't remove cast:", tCastNum), symbol("ResetOneDynamicCast"))
  }

  callMethod("closeThread", callNamed("getThreadManager"), tCastNum)
  callMethod("unregisterMembers", callNamed("getResourceManager"), tCastNum)
  callMethod("unregisterMembers", callNamed("getSpriteManager"), tCastNum)
  setThePropOf(callNamed("castLib", tCastNum), "name", lingoBinary("joinPad", meProp(_me, "pNullCastName"), lingoBinary("sub", tCastNum, 2)));
  setThePropOf(callNamed("castLib", lingoBinary("joinPad", meProp(_me, "pNullCastName"), lingoBinary("sub", tCastNum, 2))), "fileName", lingoBinary("join", lingoBinary("join", theProperty("moviePath"), meProp(_me, "pNullCastName")), meProp(_me, "pFileExtension")));
  callMethod("addProp", meProp(_me, "pAvailableDynCasts"), lingoBinary("join", meProp(_me, "pNullCastName"), lingoBinary("sub", tCastNum, 2)), tCastNum)
  return 1;
}

