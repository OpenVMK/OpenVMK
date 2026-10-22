// d0e535313898676eb605277339b50f27.cct /  / AddFolderToClothCasts

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AddFolderToClothCasts(_me: LingoMe, a_sData: LingoValue, a_sFolder: LingoValue) {
  if (lingoBinary("neq", a_sFolder.char[a_sFolder.length], "/")) {
  a_sFolder = lingoBinary("join", a_sFolder, "/");
  }

  var t_rdata = callNamed("value", a_sData);
  var t_rOutput = new LingoPropList([]);
  var t_iCount = t_rdata.count;
  for (var i = 1; i <= t_iCount; ++i) {
  var t_sSet = callMethod("getPropAt", t_rdata, i);
  var t_rList = new LingoList([]);
  for (var j = 1; j <= t_rdata[i].count; ++j) {
  callMethod("add", t_rList, lingoBinary("join", a_sFolder, t_rdata[i][j]))
  }

  t_rOutput[t_sSet] = t_rList;
  }

  return t_rOutput;
}

