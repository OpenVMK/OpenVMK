// d0e535313898676eb605277339b50f27.cct / CFigureSetSplitterTool / ListAllGraphics

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ListAllGraphics(_me: LingoMe, a_sPart: LingoValue, a_i1: LingoValue, a_i2: LingoValue) {
  setMeProp(_me, "m_mp_castList", new LingoPropList([]));
  var t_sCastName = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "vmk_avatar_", a_sPart), "_"), a_i1), "_"), a_i2);
  var t_ar_PartList = new LingoList([]);
  callMethod("add", t_ar_PartList, a_sPart)
  switch (a_sPart) {
case "lpn":
  callMethod("add", t_ar_PartList, "rpn")
  t_sCastName = lingoBinary("join", lingoBinary("join", lingoBinary("join", "vmk_avatar_pn_", a_i1), "_"), a_i2);
  break;
case "lsh":
  callMethod("add", t_ar_PartList, "rsh")
  t_sCastName = lingoBinary("join", lingoBinary("join", lingoBinary("join", "vmk_avatar_sh_", a_i1), "_"), a_i2);
  break;
case "ch":
  callMethod("add", t_ar_PartList, "ch2")
  t_sCastName = lingoBinary("join", lingoBinary("join", lingoBinary("join", "vmk_avatar_ch_", a_i1), "_"), a_i2);
  break;
case "ls":
  callMethod("add", t_ar_PartList, "rs")
  t_sCastName = lingoBinary("join", lingoBinary("join", lingoBinary("join", "vmk_avatar_s_", a_i1), "_"), a_i2);
  break;
case "rpn":
  callMethod("add", t_ar_PartList, "lpn")
  t_sCastName = lingoBinary("join", lingoBinary("join", lingoBinary("join", "vmk_avatar_pn_", a_i1), "_"), a_i2);
  break;
case "rsh":
  callMethod("add", t_ar_PartList, "lsh")
  t_sCastName = lingoBinary("join", lingoBinary("join", lingoBinary("join", "vmk_avatar_sh_", a_i1), "_"), a_i2);
  break;
case "ch2":
  callMethod("add", t_ar_PartList, "ch")
  t_sCastName = lingoBinary("join", lingoBinary("join", lingoBinary("join", "vmk_avatar_ch_", a_i1), "_"), a_i2);
  break;
case "rs":
  callMethod("add", t_ar_PartList, "ls")
  t_sCastName = lingoBinary("join", lingoBinary("join", lingoBinary("join", "vmk_avatar_s_", a_i1), "_"), a_i2);
  break;
  }

  callMethod("addProp", meProp(_me, "m_mp_castList"), t_sCastName, new LingoList([]))
  for (var u = 1; u <= t_ar_PartList.count; ++u) {
  a_sPart = t_ar_PartList[u];
  for (var i = a_i1; i <= a_i2; ++i) {
  callMethod("addProp", meProp(_me, "m_mp_SetsAndCasts"), lingoBinary("join", lingoBinary("join", a_sPart, "_"), i), t_sCastName)
  for (var e = 0; e <= 4; ++e) {
  var t_sName = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "std_", a_sPart), "_"), i), "_"), e), "_0");
  if (callNamed("memberExists", t_sName)) {
  callMethod("add", meProp(_me, "m_mp_castList")[t_sCastName], t_sName)
  }

  t_sName = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "sit_", a_sPart), "_"), i), "_"), e), "_0");
  if (callNamed("memberExists", t_sName)) {
  callMethod("add", meProp(_me, "m_mp_castList")[t_sCastName], t_sName)
  }

  for (var f = 0; f <= 1; ++f) {
  t_sName = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "drk_", a_sPart), "_"), i), "_"), e), "_"), f);
  if (callNamed("memberExists", t_sName)) {
  callMethod("add", meProp(_me, "m_mp_castList")[t_sCastName], t_sName)
  }

  }

  for (var f = 0; f <= 1; ++f) {
  t_sName = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "wav_", a_sPart), "_"), i), "_"), e), "_"), f);
  if (callNamed("memberExists", t_sName)) {
  callMethod("add", meProp(_me, "m_mp_castList")[t_sCastName], t_sName)
  }

  }

  for (var f = 0; f <= 3; ++f) {
  t_sName = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "wlk_", a_sPart), "_"), i), "_"), e), "_"), f);
  if (callNamed("memberExists", t_sName)) {
  callMethod("add", meProp(_me, "m_mp_castList")[t_sCastName], t_sName)
  }

  }

  }

  }

  }

  if (lingoBinary("gt", meProp(_me, "m_mp_castList")[1].count, 0)) {
  callMethod("SplitItems", _me, callMethod("getPropAt", meProp(_me, "m_mp_castList"), 1), meProp(_me, "m_mp_castList"))
  }

}

