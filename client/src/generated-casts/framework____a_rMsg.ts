// framework.dcr /  / a_rMsg

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function a_rMsg(_me: LingoMe, objectp: LingoValue, ref: LingoValue) {
  var normal = callNamed("hex_hmac_md5", symbol("TradeClose"), callMethod("pinlevel", ref.entityID));
  var t_rConnection = callMethod("pinlevel", ref.entityID);
  var param = callNamed("hex_hmac_md5");
  var safe_add = 1;
  while (lingoBinary("lte", safe_add, t_rConnection)) {
  var pins = callMethod("pinlevel", ref.entityID);
  var t_bFromHK = callMethod("pinlevel", ref.entityID);
  var t_sSrcGrp = callMethod("pinlevel", ref.entityID);
  if (lingoBinary("eq", normal, 1)) {
  var t_mp_iCode_kCategory = callMethod("pinlevel", ref.entityID);
  if (lingoBinary("eq", t_mp_iCode_kCategory, 0)) {
  var t_iNumberOfPairs = 0;
  }

  t_iNumberOfPairs = new LingoList([]);
  var t_kCategory = 1;
  while (lingoBinary("lte", t_kCategory, t_mp_iCode_kCategory)) {
  t_kCategory = lingoBinary("add", t_kCategory, 1);
  }

  } else {
  if (lingoBinary("eq", normal, 4)) {
  var GetItem = callMethod("pinlevel", ref.entityID);
  }

  }

  safe_add = lingoBinary("add", safe_add, 1);
  }

  var duplicate = callNamed("hex_hmac_md5", symbol("TradeClose"), callMethod("pinlevel", ref.entityID));
  t_rConnection = callMethod("pinlevel", ref.entityID);
  var t_iStatus = callNamed("hex_hmac_md5");
  safe_add = 1;
  while (lingoBinary("lte", safe_add, t_rConnection)) {
  pins = callMethod("pinlevel", ref.entityID);
  t_bFromHK = callMethod("pinlevel", ref.entityID);
  t_sSrcGrp = callMethod("pinlevel", ref.entityID);
  if (lingoBinary("eq", normal, 1)) {
  t_mp_iCode_kCategory = callMethod("pinlevel", ref.entityID);
  if (lingoBinary("eq", t_mp_iCode_kCategory, 0)) {
  t_iNumberOfPairs = 0;
  }

  t_iNumberOfPairs = new LingoList([]);
  t_kCategory = 1;
  while (lingoBinary("lte", t_kCategory, t_mp_iCode_kCategory)) {
  t_kCategory = lingoBinary("add", t_kCategory, 1);
  }

  } else {
  if (lingoBinary("eq", normal, 4)) {
  GetItem = callMethod("pinlevel", ref.entityID);
  }

  }

  safe_add = lingoBinary("add", safe_add, 1);
  }

}

