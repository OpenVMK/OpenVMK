// vmk_fireworks_minigame.cct / CFireworksGameComponent / StageEnd

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function StageEnd(_me: LingoMe, i_iTime: LingoValue, i_ar_params: LingoValue) {
  if ((lingoTruthy(meProp(_me, "m_bScoreSent")) ? 0 : 1)) {
  callMethod("SendScore", _me)
  }

  var tTopScore = new LingoPropList([]);
  for (var i = 0; i <= 14; ++i) {
  callMethod("addProp", tTopScore, i_ar_params[lingoBinary("add", lingoBinary("mul", i, 2), 6)], i_ar_params[lingoBinary("add", lingoBinary("mul", i, 2), 7)])
  }

  if (lingoBinary("lt", callMethod("GetQualifiedPercent", meProp(_me, "m_stage")), 100)) {
  var tRoundnum = 0;
  var tRank = i_ar_params[1];
  var tLowestQual = i_ar_params[3];
  if (lingoBinary("eq", i_ar_params[4], 0)) {
  if (lingoBinary("eq", i_ar_params[2], 1)) {
  callMethod("ShowStageEnd", callMethod("getInterface", _me), symbol("qualified"), tRoundnum, tTopScore, tRank, meProp(_me, "m_iScore"), tLowestQual, i_iTime)
  } else {
  callMethod("ShowStageEnd", callMethod("getInterface", _me), symbol("disqualified"), tRoundnum, tTopScore, tRank, meProp(_me, "m_iScore"), tLowestQual, i_iTime)
  }

  } else {
  callMethod("ShowStageEnd", callMethod("getInterface", _me), symbol("gameover"), tRoundnum, tTopScore, tRank, meProp(_me, "m_iScore"), undefined, i_iTime)
  }

  }

  setMeProp(_me, "m_iScore", i_ar_params[5]);
  callMethod("setScore", callMethod("getInterface", _me), meProp(_me, "m_iScore"))
  callMethod("RemoveActionSprites", _me)
  callMethod("switchState", _me, symbol("waitforserver"))
}

