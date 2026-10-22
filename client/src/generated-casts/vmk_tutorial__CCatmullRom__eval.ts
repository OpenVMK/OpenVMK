// vmk_tutorial.cct / CCatmullRom / eval

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

function _eval(_me: LingoMe) {
  setMeProp(_me, "m_ar_polygon", new LingoList([]));
  if (lingoBinary("gt", meProp(_me, "pts").count, 1)) {
  callMethod("append", meProp(_me, "m_ar_polygon"), callMethod("duplicate", meProp(_me, "pts")[2]))
  for (var i = 3; i <= lingoBinary("sub", meProp(_me, "pts").count, 1); ++i) {
  for (var j = 1; j <= meProp(_me, "steps"); ++j) {
  var Q = callMethod("p", _me, i, lingoBinary("div", j, lingoBinary("mul", meProp(_me, "steps"), float(1))));
  callMethod("append", meProp(_me, "m_ar_polygon"), callMethod("duplicate", Q))
  }

  }

  }

  var t_projection = new LingoList([]);
  for (var p of meProp(_me, "m_ar_polygon").toArray()) {
  callMethod("append", t_projection, callNamed("ProjectAxonometricPosition", p))
  }

  return meProp(_me, "m_ar_polygon");
}
export { _eval as eval };

