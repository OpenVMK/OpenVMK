// vmk_fireworks.cct / CFireworksGameInterface / showScore

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showScore(_me: LingoMe, i_pos: LingoValue, a_iScore: LingoValue, a_iRank: LingoValue, a_sName: LingoValue) {
  var t_rElem = callMethod("getElement", meProp(_me, "m_fireWorkSelector"), lingoBinary("join", "fw.rankstatus.", i_pos));
  if (lingoBinary("eq", a_sName, "")) {
  var t_sTitle = "";
  } else {
  t_sTitle = lingoBinary("joinPad", lingoBinary("join", a_iRank, "."), a_sName);
  }

  callMethod("setText", t_rElem, t_sTitle)
  var t_bHide = 1;
  for (var i = 5; i >= 0; --i) {
  if (lingoBinary("gt", a_iScore, -float(1))) {
  var t_iInt = callNamed("integer", lingoBinary("sub", lingoBinary("div", lingoBinary("mod", a_iScore, callNamed("power", 10, lingoBinary("add", i, 1))), callNamed("power", 10, i)), 0.5));
  if (t_bHide) {
  if (lingoBinary("gt", t_iInt, 0)) {
  t_bHide = 0;
  } else {
  if (lingoBinary("eq", i, 0)) {
  t_bHide = 0;
  }

  }

  }

  }

  var t_rSprite = meProp(_me, "m_ar_scoreDisplay")[i_pos][lingoBinary("add", i, 1)];
  if (t_bHide) {
  setThePropOf(t_rSprite, "visible", 0);
  continue;
  }

  setThePropOf(t_rSprite, "visible", 1);
  var t_iNumImg = callMethod("getNumberImg", _me, t_iInt);
  setThePropOf(t_rSprite, "member", t_iNumImg);
  setThePropOf(t_rSprite, "width", t_iNumImg.width);
  setThePropOf(t_rSprite, "height", t_iNumImg.height);
  }

}

