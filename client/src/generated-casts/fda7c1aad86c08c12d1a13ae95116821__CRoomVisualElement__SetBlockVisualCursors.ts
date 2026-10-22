// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualElement / SetBlockVisualCursors

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetBlockVisualCursors(_me: LingoMe, _this: LingoValue, a_voCursor: LingoValue, a_ar_ar_blockSpriteIndexes: LingoValue) {
  var t_ar_rBlocks = callMethod("GetBlocks", callMethod("GetFactor", callMethod("getObject", _this)));
  for (var i = 1; i <= t_ar_rBlocks.count; ++i) {
  var t_rVisual = callMethod("GetVisual", t_ar_rBlocks[i]);
  callMethod("setcursor", t_rVisual, a_voCursor, a_ar_ar_blockSpriteIndexes[i])
  }

}

