// vmk_monorail_mixer.cct / t / MMparseSounds

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function MMparseSounds(_me: LingoMe) {
  var cstName = "vmk_music_mixer/vmk_monorail_mixer_samples";
  var cst = callNamed("castLib", cstName);
  var t = theProperty("milliSeconds");
  var soundCount = 0;
  var Output = new LingoPropList([]);
  for (var i = 1; i <= cst.member.count; ++i) {
  var mbr = callNamed("member", i, cstName);
  if (lingoBinary("eq", mbr._type, symbol("sound"))) {
  soundCount = lingoBinary("add", soundCount, 1);
  callMethod("setaProp", Output, soundCount, mbr.name)
  }

  }

}

