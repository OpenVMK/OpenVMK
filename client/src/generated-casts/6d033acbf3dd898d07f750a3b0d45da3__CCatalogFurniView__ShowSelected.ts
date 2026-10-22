// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogFurniView / ShowSelected

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowSelected(_me: LingoMe, _this: LingoValue) {
  var t_iCode = callMethod("GetSelected", _this).code;
  var t_rInput = new LingoPropList([]);
  callMethod("setaProp", t_rInput, t_iCode, undefined)
  callNamed("executeMessage", meProp(_me, "m_sPrevRenderMEssage"), t_rInput, new LingoPropList([symbol("client"), callMethod("getID", _this), symbol("method"), symbol("_PreviewReadyCbk")]))
}

