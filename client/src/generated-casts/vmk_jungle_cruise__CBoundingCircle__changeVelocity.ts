// vmk_jungle_cruise.cct / CBoundingCircle / changeVelocity

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function changeVelocity(_me: LingoMe, t_direction: LingoValue, i_vec_direction: LingoValue, t_amount: LingoValue) {
  var tX = lingoBinary("add", meProp(_me, "velocity").x, lingoBinary("mul", lingoBinary("mul", t_direction, i_vec_direction.x), t_amount));
  var tY = lingoBinary("add", meProp(_me, "velocity").y, lingoBinary("mul", lingoBinary("mul", t_direction, i_vec_direction.y), t_amount));
  callMethod("setVelocityN", _me, tX, tY)
}

