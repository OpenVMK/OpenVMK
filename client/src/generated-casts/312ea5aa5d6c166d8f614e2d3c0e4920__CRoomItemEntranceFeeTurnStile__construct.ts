// 312ea5aa5d6c166d8f614e2d3c0e4920.cct / CRoomItemEntranceFeeTurnStile / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  callNamed("registerObject", callNamed("getUniqueID"), _this)
  setMeProp(_me, "m_bReady", 0);
  setMeProp(_me, "m_iRef", 0);
  setMeProp(_me, "m_iFee0", callNamed("getText", "item.conf.turnstile.fee.0", "0").integer);
  setMeProp(_me, "m_iFee1", callNamed("getText", "item.conf.turnstile.fee.1", "1").integer);
  setMeProp(_me, "m_iFee2", callNamed("getText", "item.conf.turnstile.fee.2", "3").integer);
  setMeProp(_me, "m_iFee3", callNamed("getText", "item.conf.turnstile.fee.3", "4").integer);
  var t_sFeeText0 = callNamed("getText", "item.conf.turnstile.fee.text.0", "Free");
  var t_sFeeText1 = callNamed("getText", "item.conf.turnstile.fee.text.1", "Credit");
  var t_sFeeText2 = callNamed("getText", "item.conf.turnstile.fee.text.2", "Credits");
  if (lingoBinary("gt", meProp(_me, "m_iFee0"), 1)) {
  setMeProp(_me, "m_sFeeText0", lingoBinary("joinPad", meProp(_me, "m_iFee0"), t_sFeeText2));
  } else {
  if (lingoBinary("eq", meProp(_me, "m_iFee0"), 1)) {
  setMeProp(_me, "m_sFeeText0", lingoBinary("joinPad", meProp(_me, "m_iFee0"), t_sFeeText1));
  } else {
  setMeProp(_me, "m_sFeeText0", t_sFeeText0);
  }

  }

  if (lingoBinary("gt", meProp(_me, "m_iFee1"), 1)) {
  setMeProp(_me, "m_sFeeText1", lingoBinary("joinPad", meProp(_me, "m_iFee1"), t_sFeeText2));
  } else {
  if (lingoBinary("eq", meProp(_me, "m_iFee1"), 1)) {
  setMeProp(_me, "m_sFeeText1", lingoBinary("joinPad", meProp(_me, "m_iFee1"), t_sFeeText1));
  } else {
  setMeProp(_me, "m_sFeeText1", t_sFeeText0);
  }

  }

  if (lingoBinary("gt", meProp(_me, "m_iFee2"), 1)) {
  setMeProp(_me, "m_sFeeText2", lingoBinary("joinPad", meProp(_me, "m_iFee2"), t_sFeeText2));
  } else {
  if (lingoBinary("eq", meProp(_me, "m_iFee2"), 1)) {
  setMeProp(_me, "m_sFeeText2", lingoBinary("joinPad", meProp(_me, "m_iFee2"), t_sFeeText1));
  } else {
  setMeProp(_me, "m_sFeeText2", t_sFeeText0);
  }

  }

  if (lingoBinary("gt", meProp(_me, "m_iFee3"), 1)) {
  setMeProp(_me, "m_sFeeText3", lingoBinary("joinPad", meProp(_me, "m_iFee3"), t_sFeeText2));
  } else {
  if (lingoBinary("eq", meProp(_me, "m_iFee3"), 1)) {
  setMeProp(_me, "m_sFeeText3", lingoBinary("joinPad", meProp(_me, "m_iFee3"), t_sFeeText1));
  } else {
  setMeProp(_me, "m_sFeeText3", t_sFeeText0);
  }

  }

  setMeProp(_me, "m_iCollectableCredits", 0);
  callNamed("registerMessage", "room_leave", callMethod("getID", _this), symbol("CloseWindows"))
  return 1;
}

