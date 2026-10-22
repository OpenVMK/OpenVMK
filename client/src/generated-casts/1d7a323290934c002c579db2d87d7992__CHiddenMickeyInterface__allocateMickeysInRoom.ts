// 1d7a323290934c002c579db2d87d7992.cct / CHiddenMickeyInterface / allocateMickeysInRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function allocateMickeysInRoom(_me: LingoMe, a_kSkipActiveCheck: LingoValue) {
  var t_rRoomXML = callMethod("GetRoot", callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room")))));
  var t_sMickeyDef = lingoBinary("join", t_rRoomXML[symbol("param")]["NAME"], ".mickey.xml");
  if (lingoBinary("gt", callNamed("member", t_sMickeyDef).memberNum, 0)) {
  var t_rHMXML = callNamed("CreateXML", callNamed("member", t_sMickeyDef).text);
  for (var tMickey of callMethod("GetRoot", t_rHMXML)[symbol("child")][1][symbol("child")].toArray()) {
  var t_iMickeyID = callNamed("value", tMickey[symbol("param")]["ID"]);
  if (lingoBinary("and", lingoBinary("eq", callMethod("getPos", meProp(_me, "m_arActiveMickeyList"), t_iMickeyID), 0), lingoBinary("neq", a_kSkipActiveCheck, symbol("skipactivecheck")))) {
  continue;
  }

  callMethod("setaProp", meProp(_me, "m_mpHiddenMickeysInRoom"), t_iMickeyID, new LingoPropList([]))
  var tSprite = callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me)));
  for (var i = 1; i <= tMickey[symbol("param")].count; ++i) {
  var tParamName = callMethod("getPropAt", tMickey[symbol("param")], i);
  var tParamStr = tMickey[symbol("param")][i];
  var tParamVal = callNamed("value", tMickey[symbol("param")][i]);
  switch (tParamName) {
case "TYPE":
  var tColor = callMethod("getaProp", meProp(_me, "m_mpMickeyColorList"), t_iMickeyID);
  if (callNamed("voidp", tColor)) {
  tColor = 0;
  }

  var tmember = callMethod("getaProp", meProp(_me, "m_mpHMMembersByType"), tColor)[tParamStr];
  setThePropOf(tSprite, "member", callNamed("getMember", tmember));
  break;
case "X":
  setThePropOf(tSprite, "locH", tParamVal);
  break;
case "Y":
  setThePropOf(tSprite, "locV", tParamVal);
  break;
case "Z":
  setThePropOf(tSprite, "locZ", tParamVal);
  break;
case "W":
  setThePropOf(tSprite, "width", tParamVal);
  break;
case "H":
  setThePropOf(tSprite, "height", tParamVal);
  break;
case "BLEND":
  setThePropOf(tSprite, "blend", tParamVal);
  break;
case "FLIPH":
  setThePropOf(tSprite, "flipH", tParamVal);
  break;
  }

  callMethod("setaProp", callMethod("getaProp", meProp(_me, "m_mpHiddenMickeysInRoom"), t_iMickeyID), tParamName, tParamStr)
  }

  callMethod("setaProp", callMethod("getaProp", meProp(_me, "m_mpHiddenMickeysInRoom"), t_iMickeyID), "SPRITE", tSprite)
  }

  } else {
  callNamed("error", _me, "Unable to find hidden mickey definition XML for room!", symbol("allocateMickeysInRoom"))
  }

}

