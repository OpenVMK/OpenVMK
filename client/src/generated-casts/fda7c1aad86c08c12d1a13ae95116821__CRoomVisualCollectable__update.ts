// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualCollectable / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue) {
  if (lingoBinary("eq", meProp(_me, "m_yState"), symbol("stable"))) {
  return 1;
  }

  if (lingoBinary("lte", meProp(_me, "m_ar_rSprites").count, 0)) {
  return 1;
  }

  var tTimeNow = theProperty("milliSeconds");
  var tElapsedMS = lingoBinary("sub", tTimeNow, meProp(_me, "m_iStateStart"));
  if (lingoBinary("gt", tElapsedMS, meProp(_me, "m_iPopTime"))) {
  if (lingoBinary("eq", meProp(_me, "m_yState"), symbol("appearing"))) {
  setMeProp(_me, "m_yState", symbol("stable"));
  callMethod("ScaleSprites", _this, float(1))
  return 1;
  }

  if (lingoBinary("eq", meProp(_me, "m_yState"), symbol("disappearing"))) {
  return 1;
  }

  }

  if (lingoBinary("eq", meProp(_me, "m_yState"), symbol("appearing"))) {
  callMethod("ScaleSprites", _this, lingoBinary("div", callNamed("sin", lingoBinary("mul", lingoBinary("add", lingoBinary("div", callNamed("pi"), 2), lingoBinary("div", callNamed("pi"), 4)), lingoBinary("div", callNamed("float", tElapsedMS), meProp(_me, "m_iPopTime")))), 0.7071))
  } else {
  if (lingoBinary("eq", meProp(_me, "m_yState"), symbol("disappearing"))) {
  callMethod("ScaleSprites", _this, callNamed("sin", lingoBinary("mul", lingoBinary("div", callNamed("pi"), 2), lingoBinary("sub", float(1), lingoBinary("div", callNamed("float", tElapsedMS), meProp(_me, "m_iPopTime"))))))
  }

  }

}

