// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerViewMessagesNew / ConvertWinStringToMac

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ConvertWinStringToMac(_me: LingoMe, aString: LingoValue) {
  var vWinFontMap = new LingoList([196, 197, 199, 201, 209, 214, 220, 225, 224, 226, 228, 227, 229, 231, 233, 232, 234, 235, 237, 236, 238, 239, 241, 243, 242, 244, 246, 245, 250, 249, 251, 252, 134, 176, 162, 163, 167, 149, 182, 223, 174, 169, 153, 180, 168, 141, 198, 216, 144, 177, 143, 142, 165, 181, 240, 221, 222, 254, 138, 170, 186, 253, 230, 248, 191, 161, 172, 175, 131, 188, 208, 171, 187, 133, 160, 192, 195, 213, 140, 156, 173, 151, 147, 148, 145, 146, 247, 215, 255, 159, 158, 164, 139, 155, 128, 129, 135, 183, 130, 132, 137, 194, 202, 193, 203, 200, 205, 206, 207, 204, 211, 212, 157, 210, 218, 219, 217, 166, 136, 152, 150, 154, 178, 190, 184, 189, 179, 185]);
  var vTemp = aString;
  aString = "";
  var vCount = chunkCount(vTemp, "char");
  for (var i = 1; i <= vCount; ++i) {
  var vChar = chunkOf(vTemp, "char", i, 0);
  var vCharNum = callNamed("charToNum", vChar);
  if (lingoBinary("eq", vCharNum, 10)) {
  vChar = "";
  } else {
  if (lingoBinary("gt", vCharNum, 127)) {
  var vAdjust = callMethod("getPos", vWinFontMap, vCharNum);
  vChar = callNamed("numToChar", lingoBinary("add", 127, vAdjust));
  }

  }

  aString = aString + vChar;
  }

  return aString;
}

