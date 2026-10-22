// d0e535313898676eb605277339b50f27.cct / CAvatarClassHauntedMansion / arrangeParts

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function arrangeParts(_me: LingoMe) {
  if (lingoBinary("or", lingoBinary("or", lingoBinary("or", lingoBinary("eq", meProp(_me, "m_iBdDir"), 0), lingoBinary("eq", meProp(_me, "m_iBdDir"), 3)), lingoBinary("eq", meProp(_me, "m_iBdDir"), 4)), lingoBinary("eq", meProp(_me, "m_iBdDir"), 5))) {
  setMeProp(_me, "m_mpPartIndex", new LingoList(["tr", "llg", "lsh", "lpn", "rlg", "rlg", "rsh", "rpn", "lh", "li", "ls", "ch2", "rh", "ri", "rs", "hd", "fc", "ey", "hr", "ht", "ch"]));
  }

  if (lingoBinary("or", lingoBinary("or", lingoBinary("or", lingoBinary("eq", meProp(_me, "m_iBdDir"), 1), lingoBinary("eq", meProp(_me, "m_iBdDir"), 2)), lingoBinary("eq", meProp(_me, "m_iBdDir"), 6)), lingoBinary("eq", meProp(_me, "m_iBdDir"), 7))) {
  setMeProp(_me, "m_mpPartIndex", new LingoList(["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "lh", "li", "ls", "ch2", "rh", "ri", "rs", "hd", "fc", "ey", "hr", "ht", "ch"]));
  }

  setMeProp(_me, "m_mpSortedParts", new LingoPropList([]));
  for (var i = 1; i <= meProp(_me, "m_mpPartIndex").count; ++i) {
  var t_sPart = meProp(_me, "m_mpPartIndex")[i];
  if (lingoBinary("gt", callMethod("findPos", meProp(_me, "m_arPartList"), t_sPart), 0)) {
  callMethod("addProp", meProp(_me, "m_mpSortedParts"), t_sPart, meProp(_me, "m_arPartList")[t_sPart])
  }

  }

}

