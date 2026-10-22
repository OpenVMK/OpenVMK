// vmk_monorail_station_handler.cct / CAnimateMonorail / addAnimationMember

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addAnimationMember(_me: LingoMe, i_memName: LingoValue) {
  callNamed("put", lingoBinary("joinPad", "Add", i_memName))
  var tMem = new LingoPropList([]);
  tMem[symbol("member")] = callNamed("member", i_memName);
  tMem[symbol("regPoint")] = callNamed("member", i_memName).regPoint;
  tMem[symbol("offset")] = callNamed("member", i_memName).regPoint;
  callMethod("append", meProp(_me, "mAnimationMembers"), tMem)
}

