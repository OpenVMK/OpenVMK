// vmk_monorail_mixer.cct / t / MMcheckSoundNames

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function MMcheckSoundNames(_me: LingoMe) {
  var cstName = "vmk_music_mixer/vmk_monorail_mixer_samples";
  var cst = callNamed("castLib", cstName);
  var t = theProperty("milliSeconds");
  var oldDelim = theProperty("itemDelimiter");
  setTheProperty("itemDelimiter", "-");
  for (var i = 1; i <= cst.member.count; ++i) {
  var mbr = callNamed("member", i, cstName);
  if (lingoBinary("eq", mbr._type, symbol("sound"))) {
  if (lingoBinary("contains", mbr.name, "-")) {
  var tDuration = mbr.duration;
  if (lingoBinary("and", lingoBinary("gt", tDuration, 3400), lingoBinary("lt", tDuration, 4100))) {
  var tLength = 4;
  } else {
  tLength = 2;
  }

  switch (mbr.name.item[1]) {
case "bass":
  var tInstrument = "bas";
  var tBank = "20";
  break;
case "drums":
  tInstrument = "drm";
  tBank = "";
  break;
case "guitar":
  tInstrument = "gtr";
  tBank = "10";
  break;
case "FX":
  tInstrument = "fx";
  tBank = "40";
  break;
case "synth":
  tInstrument = "snt";
  tBank = "30";
  break;
  }

  var tName = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", tInstrument, "_"), tBank), mbr.name.item[2]), "_"), tLength);
  setThePropOf(mbr, "name", tName);
  }

  }

  }

  setTheProperty("itemDelimiter", oldDelim);
}

