// fda7c1aad86c08c12d1a13ae95116821.cct / RoomGraphicsTools / rectToQuad

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function rectToQuad(_me: LingoMe, a_rc: LingoValue) {
  return new LingoList([callNamed("point", a_rc.left, a_rc.top), callNamed("point", a_rc.right, a_rc.top), callNamed("point", a_rc.right, a_rc.bottom), callNamed("point", a_rc.left, a_rc.bottom)]);
}

