// 1cc3629b03705a2da146e4473dbbaac4.cct / CThumbList / CalculateRects

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CalculateRects(_me: LingoMe) {
  var tY = 0;
  var indx = 1;
  for (var y = 1; y <= meProp(_me, "m_dimVert"); ++y) {
  var tX = 0;
  for (var x = 1; x <= meProp(_me, "m_dimHorz"); ++x) {
  if (lingoBinary("gte", meProp(_me, "m_ar_items").count, indx)) {
  var tRect = callNamed("rect", tX, tY, lingoBinary("add", tX, 80), lingoBinary("add", tY, 53));
  setThePropOf(meProp(_me, "m_ar_items")[indx], "rect", tRect);
  tX = lingoBinary("add", lingoBinary("add", tX, 80), meProp(_me, "m_margin"));
  }

  indx = lingoBinary("add", indx, 1);
  }

  tY = lingoBinary("add", lingoBinary("add", tY, 53), meProp(_me, "m_margin"));
  }

}

