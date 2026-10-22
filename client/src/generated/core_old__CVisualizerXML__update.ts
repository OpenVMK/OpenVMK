// core.old.cct / CVisualizerXML / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  if (meProp(_me, "pDragFlag")) {
  callMethod("moveTo", _me, lingoBinary("sub", theProperty("mouseH"), meProp(_me, "pDragOffset")[1]), lingoBinary("sub", theProperty("mouseV"), meProp(_me, "pDragOffset")[2]))
  }

  var tProcessedGroups = new LingoPropList([]);
  if (lingoBinary("gt", meProp(_me, "pEnterLeaveStack").count, 0)) {
  for (var i = 1; i <= meProp(_me, "pEnterLeaveStack").count; ++i) {
  var tEvent = callMethod("getPropAt", meProp(_me, "pEnterLeaveStack"), i);
  var tGroup = meProp(_me, "pEnterLeaveStack")[i];
  if (callNamed("voidp", callMethod("getaProp", tProcessedGroups, tGroup))) {
  callMethod("setaProp", tProcessedGroups, tGroup, new LingoList([]))
  }

  callMethod("add", tProcessedGroups[tGroup], tEvent)
  }

  for (var g = 1; g <= tProcessedGroups.count; ++g) {
  tGroup = callMethod("getPropAt", tProcessedGroups, g);
  if (lingoBinary("neq", callMethod("getPos", tProcessedGroups[tGroup], symbol("mouseUp")), 0)) {
  callMethod("setElementGroupState", _me, tGroup, 1)
  continue;
  }

  if (lingoBinary("neq", callMethod("getPos", tProcessedGroups[tGroup], symbol("mouseDown")), 0)) {
  callMethod("setElementGroupState", _me, tGroup, 2)
  continue;
  }

  if (lingoBinary("neq", callMethod("getPos", tProcessedGroups[tGroup], symbol("mouseWithin")), 0)) {
  callMethod("setElementGroupState", _me, tGroup, 1)
  continue;
  }

  callMethod("setElementGroupState", _me, tGroup, 0)
  }

  setMeProp(_me, "pEnterLeaveStack", new LingoPropList([]));
  }

  for (var g = 1; g <= meProp(_me, "pElementGroups").count; ++g) {
  tGroup = callMethod("getPropAt", meProp(_me, "pElementGroups"), g);
  if (callNamed("voidp", callMethod("getaProp", tProcessedGroups, tGroup))) {
  callMethod("setElementGroupState", _me, tGroup, 0)
  }

  }

}

