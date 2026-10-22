// 1cc3629b03705a2da146e4473dbbaac4.cct / CThumbList / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe) {
  var tImg = callNamed("image", meProp(_me, "m_width"), meProp(_me, "m_height"), 32);
  var indx = 1;
  for (var y = 1; y <= meProp(_me, "m_dimVert"); ++y) {
  for (var x = 1; x <= meProp(_me, "m_dimHorz"); ++x) {
  if (lingoBinary("gte", meProp(_me, "m_ar_items").count, indx)) {
  var tSource = meProp(_me, "m_ar_items")[indx].image;
  callMethod("copyPixels", tImg, tSource, meProp(_me, "m_ar_items")[indx].rect, tSource.rect)
  }

  indx = lingoBinary("add", indx, 1);
  }

  }

  setMeProp(_me, "m_Img", tImg);
  return meProp(_me, "m_Img");
}

