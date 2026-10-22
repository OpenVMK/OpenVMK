// d0e535313898676eb605277339b50f27.cct / CAvatarClassHauntedMansion / RenderFaces

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RenderFaces(_me: LingoMe) {
  setMeProp(_me, "m_ar_FaceList", new LingoList([]));
  setMeProp(_me, "m_ar_FaceListAlpha", new LingoList([]));
  var t_ar_PartList = new LingoList(["hd", "hr", "fc", "ey"]);
  var t_mpSortedParts = new LingoPropList([]);
  for (var i = 1; i <= t_ar_PartList.count; ++i) {
  var t_sPart = t_ar_PartList[i];
  if (lingoBinary("gt", callMethod("findPos", meProp(_me, "m_arPartList"), t_sPart), 0)) {
  callMethod("addProp", t_mpSortedParts, t_sPart, meProp(_me, "m_arPartList")[t_sPart])
  }

  }

  for (var e = 1; e <= 8; ++e) {
  setMeProp(_me, "m_rAlpha", callNamed("image", meProp(_me, "m_iCanvasWidth"), meProp(_me, "m_iCanvasHeight"), 8, symbol("grayscale")));
  setMeProp(_me, "m_imgBuffer", callNamed("image", meProp(_me, "m_iCanvasWidth"), meProp(_me, "m_iCanvasHeight"), 32));
  callMethod("fill", meProp(_me, "m_imgBuffer"), meProp(_me, "m_imgBuffer").rect, callNamed("rgb", 0, 0, 0))
  setThePropOf(meProp(_me, "m_imgBuffer"), "useAlpha", 0);
  setMeProp(_me, "m_iHeadDir", lingoBinary("sub", e, 1));
  callNamed("call", symbol("update"), t_mpSortedParts)
  callMethod("setAlpha", meProp(_me, "m_imgBuffer"), meProp(_me, "m_rAlpha"))
  setThePropOf(meProp(_me, "m_imgBuffer"), "useAlpha", 1);
  var t_Img = callMethod("duplicate", meProp(_me, "m_imgBuffer"));
  var t_Img_a = callMethod("duplicate", meProp(_me, "m_rAlpha"));
  callMethod("add", meProp(_me, "m_ar_FaceList"), t_Img)
  callMethod("add", meProp(_me, "m_ar_FaceListAlpha"), t_Img_a)
  }

}

