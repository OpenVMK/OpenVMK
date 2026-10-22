// core.old.cct / CMgrWindow / create

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function create(_me: LingoMe, tID: LingoValue, tLayout: LingoValue, tLocX: LingoValue, tLocY: LingoValue, tSpecial: LingoValue) {
  switch (tSpecial) {
case symbol("modal"):
  return callMethod("modal", _me, tID, tLayout);
  }

  if (callNamed("voidp", tLayout)) {
  tLayout = "empty.window";
  }

  if (callMethod("exists", _me, tID)) {
  if (callNamed("voidp", tLocX)) {
  tLocX = callMethod("getProperty", callMethod("get", _me, tID), symbol("locX"));
  }

  if (callNamed("voidp", tLocY)) {
  tLocY = callMethod("getProperty", callMethod("get", _me, tID), symbol("locY"));
  }

  callMethod("Remove", _me, tID)
  }

  if (lingoBinary("and", callNamed("integerp", tLocX), callNamed("integerp", tLocY))) {
  var tX = tLocX;
  var tY = tLocY;
  } else {
  if (!lingoTruthy(callNamed("voidp", _me.pPosCache[tID]))) {
  tX = _me.pPosCache[tID][1];
  tY = _me.pPosCache[tID][2];
  } else {
  tX = meProp(_me, "pDefLocX");
  tY = meProp(_me, "pDefLocY");
  }

  }

  var tItem = callMethod("create", callNamed("getObjectManager"), tID, _me.pInstanceClass);
  if (!lingoTruthy(tItem)) {
  return callNamed("error", _me, lingoBinary("joinPad", "Failed to create window object:", tID), symbol("create"));
  }

  var tProps = new LingoPropList([]);
  tProps[symbol("locX")] = tX;
  tProps[symbol("locY")] = tY;
  tProps[symbol("locZ")] = _me.pAvailableLocZ;
  tProps[symbol("boundary")] = _me.pBoundary;
  tProps[symbol("elements")] = meProp(_me, "pClsList");
  tProps[symbol("manager")] = _me;
  if (!lingoTruthy(callMethod("Define", tItem, tProps))) {
  callMethod("Remove", callNamed("getObjectManager"), tID)
  return 0;
  }

  callMethod("add", _me.pItemList, tID)
  callMethod("merge", tItem, tLayout)
  // ⚠ HAND-CORRECTED — the emitter got this one line wrong.
  //
  // The Lingo is `pAvailableLocZ = pAvailableLocZ + tItem.getProperty(#sprCount)`,
  // an assignment to a ME PROPERTY. The emitter wrote `var pAvailableLocZ = ...`,
  // which declares a LOCAL that shadows the property and reads ITSELF while
  // still undefined — so the result was VOID and `_me.pAvailableLocZ` never
  // advanced. Every window was therefore created at the SAME locZ (see the
  // `tProps[symbol("locZ")] = _me.pAvailableLocZ` above, which reads the
  // property correctly), so window layering had no ordering to work with.
  //
  // The emitter reads this property correctly two lines up; only the
  // self-referencing ASSIGNMENT is mistranslated. Fix belongs upstream in the
  // emitter too — this file is machine-generated and will be overwritten.
  // Uses `_me.pAvailableLocZ` for BOTH sides, matching how this same handler
  // already reads it for `tProps[symbol("locZ")]` above — the emitter does not
  // classify this name as a handler property (or the assignment would have
  // become `setMeProp`), so going through `meProp` here could resolve
  // differently from the read a few lines up.
  _me.pAvailableLocZ = lingoBinary("add", _me.pAvailableLocZ, callMethod("getProperty", tItem, symbol("sprCount")));
  callMethod("Activate", _me)
  return 1;
}

