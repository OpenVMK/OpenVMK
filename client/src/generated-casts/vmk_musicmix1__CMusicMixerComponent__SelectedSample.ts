// vmk_musicmix1.cct / CMusicMixerComponent / SelectedSample

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SelectedSample(_me: LingoMe, a_sInst: LingoValue, a_iSampleNum: LingoValue) {
  if (callNamed("memberExists", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", a_sInst, "_"), a_iSampleNum), "_"), 2))) {
  setMeProp(_me, "m_rCurrentSample", callNamed("member", callNamed("getmemnum", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", a_sInst, "_"), a_iSampleNum), "_"), 2))));
  setMeProp(_me, "m_iSampleLength", 2);
  }

  if (callNamed("memberExists", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", a_sInst, "_"), a_iSampleNum), "_"), 4))) {
  setMeProp(_me, "m_rCurrentSample", callNamed("member", callNamed("getmemnum", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", a_sInst, "_"), a_iSampleNum), "_"), 4))));
  setMeProp(_me, "m_iSampleLength", 4);
  }

  switch (a_sInst) {
case "drm":
  var tBtnColor = "red";
  var t_Col = callNamed("rgb", "6F0000");
  break;
case "gtr":
  tBtnColor = "green";
  t_Col = callNamed("rgb", "5C8B00");
  break;
case "fx":
  tBtnColor = "blue";
  t_Col = callNamed("rgb", "008687");
  break;
case "bas":
  tBtnColor = "orange";
  t_Col = callNamed("rgb", "B05800");
  break;
case "snt":
  tBtnColor = "pink";
  t_Col = callNamed("rgb", "C20081");
  break;
  default:
  t_Col = callNamed("rgb", 20, 30, 210);
  }

  var t_sSymbolNum = a_iSampleNum.char[a_iSampleNum.length];
  var t_Img = callNamed("member", callNamed("getmemnum", lingoBinary("join", lingoBinary("join", tBtnColor, t_sSymbolNum), ".big"))).image;
  setMeProp(_me, "m_colInstrument", t_Col);
  setMeProp(_me, "m_ImgSymbol", t_Img);
}

