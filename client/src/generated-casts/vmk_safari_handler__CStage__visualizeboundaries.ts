// vmk_safari_handler.cct / CStage / visualizeboundaries

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function visualizeboundaries(_me: LingoMe) {
  for (var i = 1; i <= meProp(_me, "m_ar_leftboundary").count; ++i) {
  setThePropOf(meProp(_me, "m_ar_markers")[i], "member", callNamed("member", "splinemarker"));
  setThePropOf(meProp(_me, "m_ar_markers")[i], "loc", callNamed("ProjectAxonometricPosition", callNamed("point", meProp(_me, "m_ar_leftboundary")[i].pos.x, meProp(_me, "m_ar_leftboundary")[i].pos.y)));
  setThePropOf(meProp(_me, "m_ar_markers")[i], "locZ", 0);
  }

  for (var i = 1; i <= meProp(_me, "m_ar_rightboundary").count; ++i) {
  var j = lingoBinary("add", i, meProp(_me, "m_iBoundaryAccuracy"));
  setThePropOf(meProp(_me, "m_ar_markers")[j], "member", callNamed("member", "splinemarker"));
  setThePropOf(meProp(_me, "m_ar_markers")[j], "loc", callNamed("ProjectAxonometricPosition", callNamed("point", meProp(_me, "m_ar_rightboundary")[i].pos.x, meProp(_me, "m_ar_rightboundary")[i].pos.y)));
  setThePropOf(meProp(_me, "m_ar_markers")[j], "locZ", 0);
  }

}

