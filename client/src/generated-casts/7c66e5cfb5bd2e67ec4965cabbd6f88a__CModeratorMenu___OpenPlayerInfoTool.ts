// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorMenu / _OpenPlayerInfoTool

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _OpenPlayerInfoTool(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_ObjUserToOperate"))) {
  setMeProp(_me, "m_sName", callMethod("GetParam", meProp(_me, "m_ObjUserToOperate"), "NAME"));
  } else {
  setMeProp(_me, "m_sName", callMethod("getText", callMethod("getElement", meProp(_me, "m_rWnd"), "mods.target.input")));
  }

  if (lingoBinary("neq", meProp(_me, "m_sName"), "")) {
  if (lingoBinary("contains", theProperty("platform"), "macintosh")) {
  var t_mp_EncodeList = new LingoPropList([32, "20", 33, "21", 34, "22", 35, "23", 36, "24", 37, "25", 38, "26", 39, "27", 40, "28", 41, "29", 42, "2A", 43, "2B", 44, "2C", 45, "2D", 46, "2E", 47, "2F", 48, "30", 49, "31", 50, "32", 51, "33", 52, "34", 53, "35", 54, "36", 55, "37", 56, "38", 57, "39", 58, "3A", 59, "3B", 60, "3C", 61, "3D", 62, "3E", 63, "3F", 64, "40", 91, "5B", 92, "5C", 93, "5D", 94, "5E", 95, "5F", 96, "60", 123, "7B", 124, "7C", 125, "7D", 126, "7E", 127, "7F", 165, "80", 170, "81", 173, "82", 176, "83", 179, "84", 183, "85", 186, "86", 189, "87", 195, "88", 197, "89", 201, "8A", 209, "8B", 212, "8C", 217, "8D", 218, "8E", 182, "8F", 198, "90", 206, "91", 226, "92", 227, "93", 228, "94", 240, "95", 246, "96", 247, "97", 249, "98", 250, "99", 251, "9A", 253, "9B", 254, "9C", 255, "9D", 245, "9E", 196, "9F", 202, "A0", 193, "A1", 162, "A2", 163, "A3", 219, "A4", 180, "A5", 207, "A6", 164, "A7", 172, "A8", 169, "A9", 187, "AA", 199, "AB", 194, "AC", 208, "AD", 168, "AE", 248, "AF", 161, "B0", 177, "B1", 211, "B2", 210, "B3", 171, "B4", 181, "B5", 166, "B6", 225, "B7", 252, "B8", 213, "B9", 188, "BA", 200, "BB", 185, "BC", 184, "BD", 178, "BE", 192, "BF", 203, "C0", 231, "C1", 229, "C2", 204, "C3", 128, "C4", 129, "C5", 174, "C6", 130, "C7", 233, "C8", 131, "C9", 230, "CA", 232, "CB", 237, "CC", 234, "CD", 235, "CE", 236, "CF", 220, "D0", 132, "D1", 241, "D2", 238, "D3", 239, "D4", 205, "D5", 133, "D6", 215, "D7", 175, "D8", 244, "D9", 242, "DA", 243, "DB", 134, "DC", 160, "DD", 222, "DE", 167, "DF", 136, "E0", 135, "E1", 137, "E2", 139, "E3", 138, "E4", 140, "E5", 190, "E6", 141, "E7", 143, "E8", 142, "E9", 144, "EA", 145, "EB", 147, "EC", 146, "ED", 148, "EE", 149, "EF", 221, "F0", 150, "F1", 152, "F2", 151, "F3", 153, "F4", 155, "F5", 154, "F6", 214, "F7", 191, "F8", 157, "F9", 156, "FA"]);
  var s2 = "";
  for (var i = 1; i <= callNamed("length", meProp(_me, "m_sName")); ++i) {
  var c = chunkOf(meProp(_me, "m_sName"), "char", i, 0);
  if ((lingoTruthy(callNamed("voidp", callMethod("getaProp", t_mp_EncodeList, callNamed("charToNum", c)))) ? 0 : 1)) {
  s2 = lingoBinary("join", lingoBinary("join", s2, "%"), callMethod("getaProp", t_mp_EncodeList, callNamed("charToNum", c)));
  continue;
  }

  s2 = lingoBinary("join", s2, c);
  }

  } else {
  var s = callNamed("urlEncode", meProp(_me, "m_sName"));
  s2 = "";
  for (var i = 1; i <= s.length; ++i) {
  switch (chunkOf(s, "char", i, 0)) {
case ",":
  s2 = lingoBinary("join", s2, "%2c");
  break;
  default:
  s2 = lingoBinary("join", s2, chunkOf(s, "char", i, 0));
  }

  }

  }

  var t_sURL = callNamed("getVariable", "playerinfotool.url");
  t_sURL = lingoBinary("join", lingoBinary("join", t_sURL, "="), s2);
  if (callNamed("stringp", t_sURL)) {
  callNamed("gotoNetPage", t_sURL, "housekeeping")
  }

  }

}

