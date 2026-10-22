// fda7c1aad86c08c12d1a13ae95116821.cct / CBspTreeNode / sortChildrenByAxis

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function sortChildrenByAxis(_me: LingoMe, a_iAxis: LingoValue) {
  for (var i = 1; i <= _me.children.count; ++i) {
  for (var j = i; j <= _me.children.count; ++j) {
  var tMid1 = lingoBinary("div", lingoBinary("add", _me.children[i].dimensions[lingoBinary("add", lingoBinary("mul", lingoBinary("sub", a_iAxis, 1), 2), 1)], _me.children[i].dimensions[lingoBinary("add", lingoBinary("mul", lingoBinary("sub", a_iAxis, 1), 2), 2)]), 2);
  var tMid2 = lingoBinary("div", lingoBinary("add", _me.children[j].dimensions[lingoBinary("add", lingoBinary("mul", lingoBinary("sub", a_iAxis, 1), 2), 1)], _me.children[j].dimensions[lingoBinary("add", lingoBinary("mul", lingoBinary("sub", a_iAxis, 1), 2), 2)]), 2);
  if (lingoBinary("gt", tMid1, tMid2)) {
  var tTemp = _me.children[i];
  _me.children[i] = _me.children[j];
  _me.children[j] = tTemp;
  }

  }

  }

}

