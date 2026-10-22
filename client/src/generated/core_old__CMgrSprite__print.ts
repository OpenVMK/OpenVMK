// core.old.cct / CMgrSprite / print

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function print(_me: LingoMe, tCount: LingoValue) {
  if (callNamed("integerp", tCount)) {
  if (lingoBinary("gt", tCount, theProperty("lastChannel"))) {
  tCount = theProperty("lastChannel");
  }

  for (var i = 1; i <= tCount; ++i) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", callNamed("sprite", i).spriteNum, "--"), callNamed("sprite", i).member.name), "--"), callNamed("sprite", i).locZ), "--"), callNamed("sprite", i).rect), "--"), meProp(_me, "pClientList")[callNamed("sprite", i).spriteNum]))
  }

  } else {
  for (var tNum of meProp(_me, "pTotalSprList").toArray()) {
  if (lingoBinary("lt", callMethod("getPos", meProp(_me, "pFreeSprList"), tNum), 1)) {
  var tSymbol = "#";
  } else {
  tSymbol = callNamed("space");
  }

  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("join", tSymbol, tNum), callNamed("sprite", tNum).member.name), "--"), callNamed("sprite", tNum).locZ), "--"), callNamed("sprite", tNum).rect), "--"), meProp(_me, "pClientList")[tNum]), "--"), callNamed("sprite", tNum).puppet), "--"), callNamed("sprite", tNum)._type), "--"), callNamed("sprite", tNum).member._number))
  }

  }

}

