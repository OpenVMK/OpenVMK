// fda7c1aad86c08c12d1a13ae95116821.cct / CBspTreeNode / getNextAxis

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getNextAxis(_me: LingoMe, a_iLastAxis: LingoValue) {
  var tNextAxis = lingoBinary("add", a_iLastAxis, 1);
  if (lingoBinary("gt", lingoBinary("mul", tNextAxis, 2), _me.dimensions.count)) {
  tNextAxis = 1;
  }

  return tNextAxis;
}

