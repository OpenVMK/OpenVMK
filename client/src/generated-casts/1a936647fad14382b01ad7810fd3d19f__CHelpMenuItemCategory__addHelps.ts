// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpMenuItemCategory / addHelps

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addHelps(_me: LingoMe, parentNode: LingoValue, i_rMem: LingoValue) {
  callMethod("setCaption", _me, callMethod("getaProp", parentNode.param, "CAPTION"), i_rMem)
  for (var node of parentNode.child.toArray()) {
  var t_clsList = callNamed("GetClsVariable", "help.menu.item.topic");
  var Help = callNamed("createObject", symbol("random"), t_clsList);
  callMethod("setData", Help, node, i_rMem)
  callMethod("addPages", Help, node)
  callMethod("append", meProp(_me, "helps"), Help)
  }

}

