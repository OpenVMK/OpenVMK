// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomRoot / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  var t_iX = lingoBinary("div", theProperty("stage").image.width, 2);
  var t_iY = lingoBinary("div", theProperty("stage").image.height, 2);
  var t_iZ = -float(5000000);
  setMeProp(_me, "m_veViewCenter", callNamed("vector", t_iX, t_iY, t_iZ));
  return 1;
}

