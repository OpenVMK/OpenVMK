// 1a936647fad14382b01ad7810fd3d19f.cct / xml.node / new

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _new(_me: LingoMe, _name: LingoValue, _type: LingoValue, _data: LingoValue) {
  setThePropOf(_me, "name", _name);
  // HAND-CORRECTED: the decompiler/transpiler renamed the node's `type` property
  // to `_type` at every READ site (xml.node.makeSublist reads `_me._type`,
  // CHelpContent.parseContent reads `node._type`) but left this WRITE as "type".
  // So `_type` was always undefined: parseContent never matched #chardata/#element,
  // built an empty answer HTML, and the Help "Answers" panel rendered blank.
  // Writing `_type` here to match the reads restores the answer content.
  // ⚠ RE-APPLY AFTER ANY REGENERATION of client/src/generated-casts.
  setThePropOf(_me, "_type", _type);
  setThePropOf(_me, "text", _data);
  setThePropOf(_me, "child", new LingoList([]));
  setThePropOf(_me, "attributeName", new LingoList([]));
  setThePropOf(_me, "attributeValue", new LingoPropList([]));
  return _me;
}

