// fda7c1aad86c08c12d1a13ae95116821.cct / CBspTreeNode / subdivide

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function subdivide(_me: LingoMe, a_iLastAxis: LingoValue) {
  if (lingoBinary("gt", _me.children.count, 1)) {
  var tNextAxis = callMethod("getNextAxis", _me, a_iLastAxis);
  var tSplit = callMethod("split", _me, tNextAxis);
  for (var t = 2; t <= _me.dimensions.count; ++t) {
  if (lingoBinary("or", lingoBinary("lt", tSplit.high.count, 1), lingoBinary("lt", tSplit.low.count, 1))) {
  tNextAxis = callMethod("getNextAxis", _me, tNextAxis);
  tSplit = callMethod("split", _me, tNextAxis);
  if (lingoBinary("eq", t, _me.dimensions.count)) {
  tNextAxis = callMethod("getNextAxis", _me, a_iLastAxis);
  tSplit = callMethod("split", _me, tNextAxis, symbol("DONT_FIX_OVERLAP"));
  callNamed("put", "BSP couldn't perform a clean split, your objects might overlap!")
  }

  continue;
  }

  break;
  }

  setThePropOf(_me, "children", new LingoList([]));
  if (lingoBinary("gt", tSplit.low.count, 0)) {
  var tNu = callNamed("createObject", symbol("random"), "CBspTreeNode");
  setThePropOf(tNu, "children", tSplit.low);
  setThePropOf(tNu, "dimensions", callNamed("getMaxDimensions", tSplit.low, lingoBinary("div", meProp(_me, "dimensions").count, 2)));
  callMethod("append", _me.children, tNu)
  }

  if (lingoBinary("gt", tSplit.high.count, 0)) {
  tNu = callNamed("createObject", symbol("random"), "CBspTreeNode");
  setThePropOf(tNu, "children", tSplit.high);
  setThePropOf(tNu, "dimensions", callNamed("getMaxDimensions", tSplit.high, lingoBinary("div", meProp(_me, "dimensions").count, 2)));
  callMethod("append", _me.children, tNu)
  }

  callMethod("subdivide", _me.children[1], tNextAxis)
  if (lingoBinary("gt", _me.children.count, 1)) {
  callMethod("subdivide", _me.children[2], tNextAxis)
  }

  } else {
  setThePropOf(_me, "obj", _me.children[1].obj);
  setThePropOf(_me, "dimensions", _me.children[1].dimensions);
  setThePropOf(_me, "isleaf", 1);
  callNamed("removeObject", callMethod("getID", _me.children[1]))
  setThePropOf(_me, "children", new LingoList([]));
  }

}

