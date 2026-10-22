// fda7c1aad86c08c12d1a13ae95116821.cct / RoomGraphicsTools / flipQuadH

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function flipQuadH(_me: LingoMe, a_q: LingoValue) {
  return new LingoList([a_q[2], a_q[1], a_q[4], a_q[3]]);
}

