// vmk_hm_interface.cct /  / fixregpoints

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function fixregpoints(_me: LingoMe) {
  var t_cst = callNamed("castLib", "vmk_haunted_mansion_interface");
  var t_num = t_cst.member.count;
  for (var i = 1; i <= t_num; ++i) {
  var t_mem = callNamed("member", i, "vmk_haunted_mansion_interface");
  if (lingoBinary("eq", t_mem._type, symbol("bitmap"))) {
  callNamed("put", t_mem.name)
  setThePropOf(t_mem, "regPoint", callNamed("point", 0, 0));
  }

  }

}

