// d0e535313898676eb605277339b50f27.cct / CAvatarAnimatorRenderer / arrangeParts

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function arrangeParts(_me: LingoMe) {
  setMeProp(_me, "m_mpPartIndex", undefined);
  switch (1) {
case lingoBinary("eq", meProp(_me, "m_bActDnc"), 1):
  if (lingoBinary("and", lingoBinary("eq", meProp(_me, "m_iBdDir"), 3), lingoBinary("eq", meProp(_me, "m_bActWav"), 1))) {
  setMeProp(_me, "m_mpPartIndex", new LingoList(["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "lh", "li", "ls", "ch", "ch2", "hd", "ey", "hr", "fc", "ht", "rh", "ri", "rs"]));
  } else {
  if (lingoBinary("or", lingoBinary("or", lingoBinary("or", lingoBinary("or", lingoBinary("eq", meProp(_me, "m_iBdDir"), 0), lingoBinary("eq", meProp(_me, "m_iBdDir"), 1)), lingoBinary("eq", meProp(_me, "m_iBdDir"), 2)), lingoBinary("eq", meProp(_me, "m_iBdDir"), 6)), lingoBinary("eq", meProp(_me, "m_iBdDir"), 7))) {
  setMeProp(_me, "m_mpPartIndex", new LingoList(["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "lh", "li", "ls", "ch", "ch2", "rh", "ri", "rs", "hd", "fc", "ey", "hr", "ht"]));
  }

  if (lingoBinary("or", lingoBinary("or", lingoBinary("eq", meProp(_me, "m_iBdDir"), 3), lingoBinary("eq", meProp(_me, "m_iBdDir"), 4)), lingoBinary("eq", meProp(_me, "m_iBdDir"), 5))) {
  setMeProp(_me, "m_mpPartIndex", new LingoList(["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "lh", "li", "ls", "ch", "ch2", "rh", "ri", "rs", "hd", "fc", "ey", "hr", "ht"]));
  }

  }

  break;
case lingoBinary("eq", meProp(_me, "m_bActWav"), 1):
  if (lingoBinary("or", lingoBinary("or", lingoBinary("eq", meProp(_me, "m_iBdDir"), 0), lingoBinary("eq", meProp(_me, "m_iBdDir"), 1)), lingoBinary("eq", meProp(_me, "m_iBdDir"), 7))) {
  setMeProp(_me, "m_mpPartIndex", new LingoList(["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "ch", "lh", "li", "ls", "ri", "rh", "rs", "ch2", "hd", "fc", "ey", "hr", "ht"]));
  }

  if (lingoBinary("or", lingoBinary("eq", meProp(_me, "m_iBdDir"), 2), lingoBinary("eq", meProp(_me, "m_iBdDir"), 6))) {
  setMeProp(_me, "m_mpPartIndex", new LingoList(["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "lh", "li", "ls", "ch", "ch2", "hd", "fc", "ey", "hr", "ht", "ri", "rh", "rs"]));
  }

  if (lingoBinary("eq", meProp(_me, "m_iBdDir"), 4)) {
  setMeProp(_me, "m_mpPartIndex", new LingoList(["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "ch", "ch2", "hd", "fc", "ey", "hr", "ht", "ri", "rh", "rs", "lh", "li", "ls"]));
  }

  if (lingoBinary("or", lingoBinary("eq", meProp(_me, "m_iBdDir"), 3), lingoBinary("eq", meProp(_me, "m_iBdDir"), 5))) {
  if (lingoBinary("eq", meProp(_me, "m_bActSit"), 1)) {
  setMeProp(_me, "m_mpPartIndex", new LingoList(["tr", "lh", "li", "llg", "lpn", "lsh", "rlg", "ch", "ls", "rpn", "ch2", "rsh", "hd", "fc", "ey", "hr", "ht", "rh", "ri", "rs"]));
  } else {
  setMeProp(_me, "m_mpPartIndex", new LingoList(["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "lh", "li", "ls", "ch", "ch2", "hd", "ey", "hr", "fc", "ht", "rh", "ri", "rs"]));
  }

  }

  break;
case lingoBinary("eq", meProp(_me, "m_bActEat"), 1):
case lingoBinary("eq", meProp(_me, "m_bActCrr"), 1):
  if (lingoBinary("eq", meProp(_me, "m_iBdDir"), 0)) {
  setMeProp(_me, "m_mpPartIndex", new LingoList(["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "lh", "li", "ch", "ls", "ch2", "rh          ", "ri", "rs", "hd", "fc", "ey", "hr", "ht"]));
  }

  if (lingoBinary("or", lingoBinary("eq", meProp(_me, "m_iBdDir"), 5), lingoBinary("eq", meProp(_me, "m_iBdDir"), 4))) {
  setMeProp(_me, "m_mpPartIndex", new LingoList(["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "lh", "ch", "ch2", "li", "ls", "rh", "ri", "rs", "hd", "fc", "ey", "hr", "ht"]));
  }

  if (lingoBinary("or", lingoBinary("or", lingoBinary("or", lingoBinary("or", lingoBinary("eq", meProp(_me, "m_iBdDir"), 1), lingoBinary("eq", meProp(_me, "m_iBdDir"), 2)), lingoBinary("eq", meProp(_me, "m_iBdDir"), 3)), lingoBinary("eq", meProp(_me, "m_iBdDir"), 6)), lingoBinary("eq", meProp(_me, "m_iBdDir"), 7))) {
  setMeProp(_me, "m_mpPartIndex", new LingoList(["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "lh", "li", "ls", "ch", "ch2", "rh", "ri", "rs", "hd", "fc", "ey", "hr", "ht"]));
  }

  break;
case lingoBinary("and", lingoBinary("eq", meProp(_me, "m_bActMv"), 0), lingoBinary("eq", meProp(_me, "m_bActSit"), 0)):
  if (lingoBinary("or", lingoBinary("or", lingoBinary("or", lingoBinary("eq", meProp(_me, "m_iBdDir"), 0), lingoBinary("eq", meProp(_me, "m_iBdDir"), 3)), lingoBinary("eq", meProp(_me, "m_iBdDir"), 4)), lingoBinary("eq", meProp(_me, "m_iBdDir"), 5))) {
  setMeProp(_me, "m_mpPartIndex", new LingoList(["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "lh", "li", "ls", "ch", "ch2", "rh", "ri", "rs", "hd", "fc", "ey", "hr", "ht"]));
  }

  if (lingoBinary("or", lingoBinary("or", lingoBinary("or", lingoBinary("eq", meProp(_me, "m_iBdDir"), 1), lingoBinary("eq", meProp(_me, "m_iBdDir"), 2)), lingoBinary("eq", meProp(_me, "m_iBdDir"), 6)), lingoBinary("eq", meProp(_me, "m_iBdDir"), 7))) {
  setMeProp(_me, "m_mpPartIndex", new LingoList(["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "lh", "li", "ls", "ch", "ch2", "rh", "ri", "rs", "hd", "fc", "ey", "hr", "ht"]));
  }

  break;
case lingoBinary("eq", meProp(_me, "m_bActSit"), 1):
  if (lingoBinary("eq", meProp(_me, "m_iBdDir"), 1)) {
  setMeProp(_me, "m_mpPartIndex", new LingoList(["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "lh", "li", "ls", "ch", "ch2", "rh", "ri", "rs", "hd", "fc", "ey", "hr", "ht"]));
  }

  if (lingoBinary("or", lingoBinary("eq", meProp(_me, "m_iBdDir"), 3), lingoBinary("eq", meProp(_me, "m_iBdDir"), 5))) {
  setMeProp(_me, "m_mpPartIndex", new LingoList(["tr", "lh", "li", "llg", "lpn", "lsh", "rlg", "ch", "ls", "rpn", "ch2", "rsh", "rh", "ri", "rs", "hd", "fc", "ey", "hr", "ht"]));
  }

  break;
case lingoBinary("eq", meProp(_me, "m_bActMv"), 1):
  if (lingoBinary("or", lingoBinary("or", lingoBinary("or", lingoBinary("eq", meProp(_me, "m_iBdDir"), 1), lingoBinary("eq", meProp(_me, "m_iBdDir"), 2)), lingoBinary("eq", meProp(_me, "m_iBdDir"), 6)), lingoBinary("eq", meProp(_me, "m_iBdDir"), 7))) {
  setMeProp(_me, "m_mpPartIndex", new LingoList(["tr", "llg", "lsh", "lh", "li", "ls", "lpn", "rlg", "rsh", "rpn", "ch", "ch2", "rh", "ri", "rs", "hd", "fc", "ey", "hr", "ht"]));
  }

  if (lingoBinary("and", lingoBinary("eq", meProp(_me, "m_iBdDir"), 0), lingoBinary("or", lingoBinary("eq", lingoBinary("add", meProp(_me, "m_iAnimCounter"), 1), 2), lingoBinary("eq", lingoBinary("add", meProp(_me, "m_iAnimCounter"), 1), 3)))) {
  setMeProp(_me, "m_mpPartIndex", new LingoList(["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "rh", "ri", "rs", "ch", "lh", "li", "ls", "ch2", "hd", "fc", "ey", "hr", "ht"]));
  }

  if (lingoBinary("and", lingoBinary("eq", meProp(_me, "m_iBdDir"), 0), lingoBinary("or", lingoBinary("eq", meProp(_me, "m_iAnimCounter"), 3), lingoBinary("eq", meProp(_me, "m_iAnimCounter"), 0)))) {
  setMeProp(_me, "m_mpPartIndex", new LingoList(["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "rh", "ri", "rs", "lh", "li", "ls", "ch", "ch2", "hd", "fc", "ey", "hr", "ht"]));
  }

  if (lingoBinary("and", lingoBinary("eq", meProp(_me, "m_iBdDir"), 0), lingoBinary("or", lingoBinary("eq", meProp(_me, "m_iAnimCounter"), 1), lingoBinary("eq", meProp(_me, "m_iAnimCounter"), 2)))) {
  setMeProp(_me, "m_mpPartIndex", new LingoList(["tr", "lh", "li", "ls", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "ch", "rh", "ri", "rs", "ch2", "hd", " fc", "ey", "hr", "ht"]));
  }

  if (lingoBinary("and", lingoBinary("eq", meProp(_me, "m_iBdDir"), 4), lingoBinary("eq", meProp(_me, "m_iAnimCounter"), 0))) {
  setMeProp(_me, "m_mpPartIndex", new LingoList(["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "lh", "li", "ls", "ch", "ch2", "rh", "ri", "rs", "hd", "fc", "ey", "hr", "ht"]));
  }

  if (lingoBinary("and", lingoBinary("eq", meProp(_me, "m_iBdDir"), 4), lingoBinary("or", lingoBinary("or", lingoBinary("eq", meProp(_me, "m_iAnimCounter"), 1), lingoBinary("eq", meProp(_me, "m_iAnimCounter"), 2)), lingoBinary("eq", meProp(_me, "m_iAnimCounter"), 3)))) {
  setMeProp(_me, "m_mpPartIndex", new LingoList(["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "ch", "lh", "li", "ls", "ch2", "rh", "ri", "rs", "hd", "fc", "ey", "hr", "ht"]));
  }

  if (lingoBinary("or", lingoBinary("eq", meProp(_me, "m_iBdDir"), 3), lingoBinary("eq", meProp(_me, "m_iBdDir"), 5))) {
  setMeProp(_me, "m_mpPartIndex", new LingoList(["tr", "lh", "ls", "li", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "ch", "ch2", "rh", "rs", "ri", "hd", "fc", "ey", "hr", "ht"]));
  }

  break;
  break;
  }

  if (callNamed("voidp", meProp(_me, "m_mpPartIndex"))) {
  if (lingoBinary("or", lingoBinary("or", lingoBinary("or", lingoBinary("eq", meProp(_me, "m_iBdDir"), 0), lingoBinary("eq", meProp(_me, "m_iBdDir"), 3)), lingoBinary("eq", meProp(_me, "m_iBdDir"), 4)), lingoBinary("eq", meProp(_me, "m_iBdDir"), 5))) {
  setMeProp(_me, "m_mpPartIndex", new LingoList(["tr", "llg", "lsh", "lpn", "rlg", "rlg", "rsh", "rpn", "lh", "li", "ls", "ch", "ch2", "rh", "ri", "rs", "hd", "fc", "ey", "hr", "ht"]));
  }

  if (lingoBinary("or", lingoBinary("or", lingoBinary("or", lingoBinary("eq", meProp(_me, "m_iBdDir"), 1), lingoBinary("eq", meProp(_me, "m_iBdDir"), 2)), lingoBinary("eq", meProp(_me, "m_iBdDir"), 6)), lingoBinary("eq", meProp(_me, "m_iBdDir"), 7))) {
  setMeProp(_me, "m_mpPartIndex", new LingoList(["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "lh", "li", "ls", "ch", "ch2", "rh", "ri", "rs", "hd", "fc", "ey", "hr", "ht"]));
  }

  }

  setMeProp(_me, "m_mpSortedParts", new LingoPropList([]));
  for (var i = 1; i <= meProp(_me, "m_mpPartIndex").count; ++i) {
  var t_sPart = meProp(_me, "m_mpPartIndex")[i];
  if (lingoBinary("gt", callMethod("findPos", meProp(_me, "m_arPartList"), t_sPart), 0)) {
  callMethod("addProp", meProp(_me, "m_mpSortedParts"), t_sPart, meProp(_me, "m_arPartList")[t_sPart])
  }

  }

  if (meProp(_me, "m_bDrawOnlyHead")) {
  var t_ar_HeadParts = new LingoList(["hd", "fc", "ey", "hr", "ht"]);
  var t_mp_headparts = new LingoPropList([]);
  for (var i = 1; i <= meProp(_me, "m_mpSortedParts").count; ++i) {
  t_sPart = callMethod("getPropAt", meProp(_me, "m_mpSortedParts"), i);
  if (lingoBinary("gt", callMethod("findPos", t_ar_HeadParts, t_sPart), 0)) {
  callMethod("addProp", t_mp_headparts, callMethod("getPropAt", meProp(_me, "m_mpSortedParts"), i), meProp(_me, "m_mpSortedParts")[i])
  }

  }

  setMeProp(_me, "m_mpSortedParts", t_mp_headparts);
  }

}

