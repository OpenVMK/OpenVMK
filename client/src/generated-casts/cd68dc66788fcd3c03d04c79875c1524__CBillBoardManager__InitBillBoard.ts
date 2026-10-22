// cd68dc66788fcd3c03d04c79875c1524.cct / CBillBoardManager / InitBillBoard

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function InitBillBoard(_me: LingoMe, a_mp_initialization: LingoValue, a_sRoomTag: LingoValue) {
  if (callNamed("ilk", a_mp_initialization, symbol("propList"))) {
  var tIdentifier = lingoBinary("join", callMethod("getPropAt", a_mp_initialization, 1), a_sRoomTag);
  var tContent = a_mp_initialization[1];
  var tParamsToCallback = new LingoPropList([symbol("boardName"), callMethod("getPropAt", a_mp_initialization, 1), symbol("clickName"), tContent.clickarea, symbol("tag"), a_sRoomTag]);
  if (callNamed("voidp", callMethod("getaProp", meProp(_me, "m_mp_boards"), tIdentifier))) {
  if (lingoBinary("neq", tContent.content, "")) {
  var tMemNum = callNamed("queueDownload", tContent.content, lingoBinary("join", "BillBoardExternal:", meProp(_me, "m_iNameCounter")), symbol("bitmap"), 0);
  callNamed("registerDownloadCallback", tMemNum, symbol("PushPicture"), callMethod("getID", _me), tParamsToCallback)
  meProp(_me, "m_mp_boards")[tIdentifier] = new LingoPropList([symbol("state"), symbol("LOADING"), symbol("memNum"), tMemNum, symbol("space"), tContent.space, symbol("url"), tContent.url, symbol("clickSpr"), undefined]);
  setMeProp(_me, "m_iNameCounter", lingoBinary("add", meProp(_me, "m_iNameCounter"), 1));
  }

  } else {
  if (lingoBinary("eq", meProp(_me, "m_mp_boards")[tIdentifier].state, symbol("done"))) {
  callMethod("PushPicture", _me, tParamsToCallback)
  }

  }

  }

}

