// core.old.cct / CMgrDownload / fillTypeDefinitions

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function fillTypeDefinitions(_me: LingoMe) {
  setMeProp(_me, "pTypeDefList", new LingoPropList([]));
  meProp(_me, "pTypeDefList")["gif"] = symbol("bitmap");
  meProp(_me, "pTypeDefList")["jpg"] = symbol("bitmap");
  meProp(_me, "pTypeDefList")["bmp"] = symbol("bitmap");
  meProp(_me, "pTypeDefList")["png"] = symbol("bitmap");
  meProp(_me, "pTypeDefList")["tif"] = symbol("bitmap");
  meProp(_me, "pTypeDefList")["tiff"] = symbol("bitmap");
  meProp(_me, "pTypeDefList")["psd"] = symbol("bitmap");
  meProp(_me, "pTypeDefList")["txt"] = symbol("field");
  meProp(_me, "pTypeDefList")["html"] = symbol("field");
  meProp(_me, "pTypeDefList")["htm"] = symbol("field");
  meProp(_me, "pTypeDefList")["jsp"] = symbol("field");
  meProp(_me, "pTypeDefList")["xml"] = symbol("field");
  meProp(_me, "pTypeDefList")["nfo"] = symbol("field");
  meProp(_me, "pTypeDefList")["js"] = symbol("field");
  meProp(_me, "pTypeDefList")["css"] = symbol("field");
  meProp(_me, "pTypeDefList")["avi"] = symbol("digitalVideo");
  meProp(_me, "pTypeDefList")["mpg"] = symbol("digitalVideo");
  meProp(_me, "pTypeDefList")["mpeg"] = symbol("digitalVideo");
  meProp(_me, "pTypeDefList")["mp3"] = symbol("sound");
  meProp(_me, "pTypeDefList")["wav"] = symbol("sound");
  meProp(_me, "pTypeDefList")["snd"] = symbol("sound");
  meProp(_me, "pTypeDefList")["swa"] = symbol("swa");
  meProp(_me, "pTypeDefList")["fla"] = symbol("flash");
  meProp(_me, "pTypeDefList")["fnt"] = symbol("font");
  meProp(_me, "pTypeDefList")["ttf"] = symbol("font");
  meProp(_me, "pTypeDefList")["cur"] = symbol("cursor");
  return 1;
}

