// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CORE_XML_API / MD5Digest

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function MD5Digest(_me: LingoMe, a_sInput: LingoValue) {
  var tt = theProperty("milliSeconds");
  var t_iLen = lingoBinary("mul", callNamed("length", a_sInput), 8);
  var t_iCnt = lingoBinary("add", lingoBinary("mul", lingoBinary("div", lingoBinary("add", t_iLen, 64), 512), 16), 16);
  var x = new LingoList([]);
  x[t_iCnt] = 0;
  var t_fArr = new LingoList([1, 256, 65536, 16777216]);
  var i = 0;
  var j = 0;
  while (lingoBinary("lt", i, t_iLen)) {
  j = lingoBinary("add", j, 1);
  var t_iNext = lingoBinary("add", lingoBinary("div", i, 32), 1);
  var t_iTemp = lingoBinary("mul", callNamed("bitAnd", callNamed("charToNum", chunkOf(a_sInput, "char", lingoBinary("add", lingoBinary("div", i, 8), 1), 0)), 255), t_fArr[j]);
  x[t_iNext] = callNamed("bitOr", x[t_iNext], t_iTemp);
  i = lingoBinary("add", i, 8);
  j = lingoBinary("mod", j, 4);
  }

  t_iNext = lingoBinary("add", lingoBinary("div", t_iLen, 32), 1);
  x[t_iNext] = callNamed("bitOr", x[t_iNext], lingoBinary("mul", 128, t_fArr[lingoBinary("add", j, 1)]));
  x[lingoBinary("add", lingoBinary("mul", lingoBinary("div", lingoBinary("add", t_iLen, 64), 512), 16), 15)] = t_iLen;
  var a = 1732584193;
  var b = -float(271733879);
  var c = -float(1732584194);
  var d = 271733878;
  i = 1;
  var t_iWrap = lingoBinary("add", theProperty("maxinteger"), 1);
  var t_iCount = lingoBinary("add", x.count, 1);
  while (lingoBinary("lt", i, t_iCount)) {
  var olda = a;
  var oldb = b;
  var oldc = c;
  var oldd = d;
  var n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitOr", callNamed("bitAnd", b, c), callNamed("bitAnd", callNamed("bitNot", b), d)), a), x[i]), 680876936);
  if (lingoBinary("lt", n, 0)) {
  a = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 128), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 33554432), 64)), b);
  } else {
  a = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 128), lingoBinary("div", n, 33554432)), b);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitOr", callNamed("bitAnd", a, b), callNamed("bitAnd", callNamed("bitNot", a), c)), d), x[lingoBinary("add", i, 1)]), 389564586);
  if (lingoBinary("lt", n, 0)) {
  d = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 4096), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 1048576), 2048)), a);
  } else {
  d = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 4096), lingoBinary("div", n, 1048576)), a);
  }

  n = lingoBinary("add", lingoBinary("add", lingoBinary("add", callNamed("bitOr", callNamed("bitAnd", d, a), callNamed("bitAnd", callNamed("bitNot", d), b)), c), x[lingoBinary("add", i, 2)]), 606105819);
  if (lingoBinary("lt", n, 0)) {
  c = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 131072), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 32768), 65536)), d);
  } else {
  c = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 131072), lingoBinary("div", n, 32768)), d);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitOr", callNamed("bitAnd", c, d), callNamed("bitAnd", callNamed("bitNot", c), a)), b), x[lingoBinary("add", i, 3)]), 1044525330);
  if (lingoBinary("lt", n, 0)) {
  b = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 4194304), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 1024), 2097152)), c);
  } else {
  b = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 4194304), lingoBinary("div", n, 1024)), c);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitOr", callNamed("bitAnd", b, c), callNamed("bitAnd", callNamed("bitNot", b), d)), a), x[lingoBinary("add", i, 4)]), 176418897);
  if (lingoBinary("lt", n, 0)) {
  a = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 128), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 33554432), 64)), b);
  } else {
  a = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 128), lingoBinary("div", n, 33554432)), b);
  }

  n = lingoBinary("add", lingoBinary("add", lingoBinary("add", callNamed("bitOr", callNamed("bitAnd", a, b), callNamed("bitAnd", callNamed("bitNot", a), c)), d), x[lingoBinary("add", i, 5)]), 1200080426);
  if (lingoBinary("lt", n, 0)) {
  d = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 4096), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 1048576), 2048)), a);
  } else {
  d = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 4096), lingoBinary("div", n, 1048576)), a);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitOr", callNamed("bitAnd", d, a), callNamed("bitAnd", callNamed("bitNot", d), b)), c), x[lingoBinary("add", i, 6)]), 1473231341);
  if (lingoBinary("lt", n, 0)) {
  c = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 131072), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 32768), 65536)), d);
  } else {
  c = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 131072), lingoBinary("div", n, 32768)), d);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitOr", callNamed("bitAnd", c, d), callNamed("bitAnd", callNamed("bitNot", c), a)), b), x[lingoBinary("add", i, 7)]), 45705983);
  if (lingoBinary("lt", n, 0)) {
  b = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 4194304), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 1024), 2097152)), c);
  } else {
  b = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 4194304), lingoBinary("div", n, 1024)), c);
  }

  n = lingoBinary("add", lingoBinary("add", lingoBinary("add", callNamed("bitOr", callNamed("bitAnd", b, c), callNamed("bitAnd", callNamed("bitNot", b), d)), a), x[lingoBinary("add", i, 8)]), 1770035416);
  if (lingoBinary("lt", n, 0)) {
  a = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 128), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 33554432), 64)), b);
  } else {
  a = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 128), lingoBinary("div", n, 33554432)), b);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitOr", callNamed("bitAnd", a, b), callNamed("bitAnd", callNamed("bitNot", a), c)), d), x[lingoBinary("add", i, 9)]), 1958414417);
  if (lingoBinary("lt", n, 0)) {
  d = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 4096), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 1048576), 2048)), a);
  } else {
  d = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 4096), lingoBinary("div", n, 1048576)), a);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitOr", callNamed("bitAnd", d, a), callNamed("bitAnd", callNamed("bitNot", d), b)), c), x[lingoBinary("add", i, 10)]), 42063);
  if (lingoBinary("lt", n, 0)) {
  c = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 131072), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 32768), 65536)), d);
  } else {
  c = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 131072), lingoBinary("div", n, 32768)), d);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitOr", callNamed("bitAnd", c, d), callNamed("bitAnd", callNamed("bitNot", c), a)), b), x[lingoBinary("add", i, 11)]), 1990404162);
  if (lingoBinary("lt", n, 0)) {
  b = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 4194304), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 1024), 2097152)), c);
  } else {
  b = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 4194304), lingoBinary("div", n, 1024)), c);
  }

  n = lingoBinary("add", lingoBinary("add", lingoBinary("add", callNamed("bitOr", callNamed("bitAnd", b, c), callNamed("bitAnd", callNamed("bitNot", b), d)), a), x[lingoBinary("add", i, 12)]), 1804603682);
  if (lingoBinary("lt", n, 0)) {
  a = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 128), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 33554432), 64)), b);
  } else {
  a = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 128), lingoBinary("div", n, 33554432)), b);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitOr", callNamed("bitAnd", a, b), callNamed("bitAnd", callNamed("bitNot", a), c)), d), x[lingoBinary("add", i, 13)]), 40341101);
  if (lingoBinary("lt", n, 0)) {
  d = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 4096), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 1048576), 2048)), a);
  } else {
  d = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 4096), lingoBinary("div", n, 1048576)), a);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitOr", callNamed("bitAnd", d, a), callNamed("bitAnd", callNamed("bitNot", d), b)), c), x[lingoBinary("add", i, 14)]), 1502002290);
  if (lingoBinary("lt", n, 0)) {
  c = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 131072), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 32768), 65536)), d);
  } else {
  c = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 131072), lingoBinary("div", n, 32768)), d);
  }

  n = lingoBinary("add", lingoBinary("add", lingoBinary("add", callNamed("bitOr", callNamed("bitAnd", c, d), callNamed("bitAnd", callNamed("bitNot", c), a)), b), x[lingoBinary("add", i, 15)]), 1236535329);
  if (lingoBinary("lt", n, 0)) {
  b = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 4194304), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 1024), 2097152)), c);
  } else {
  b = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 4194304), lingoBinary("div", n, 1024)), c);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitOr", callNamed("bitAnd", b, d), callNamed("bitAnd", c, callNamed("bitNot", d))), a), x[lingoBinary("add", i, 1)]), 165796510);
  if (lingoBinary("lt", n, 0)) {
  a = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 32), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 134217728), 16)), b);
  } else {
  a = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 32), lingoBinary("div", n, 134217728)), b);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitOr", callNamed("bitAnd", a, c), callNamed("bitAnd", b, callNamed("bitNot", c))), d), x[lingoBinary("add", i, 6)]), 1069501632);
  if (lingoBinary("lt", n, 0)) {
  d = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 512), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 8388608), 256)), a);
  } else {
  d = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 512), lingoBinary("div", n, 8388608)), a);
  }

  n = lingoBinary("add", lingoBinary("add", lingoBinary("add", callNamed("bitOr", callNamed("bitAnd", d, b), callNamed("bitAnd", a, callNamed("bitNot", b))), c), x[lingoBinary("add", i, 11)]), 643717713);
  if (lingoBinary("lt", n, 0)) {
  c = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 16384), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 262144), 8192)), d);
  } else {
  c = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 16384), lingoBinary("div", n, 262144)), d);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitOr", callNamed("bitAnd", c, a), callNamed("bitAnd", d, callNamed("bitNot", a))), b), x[i]), 373897302);
  if (lingoBinary("lt", n, 0)) {
  b = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 1048576), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 4096), 524288)), c);
  } else {
  b = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 1048576), lingoBinary("div", n, 4096)), c);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitOr", callNamed("bitAnd", b, d), callNamed("bitAnd", c, callNamed("bitNot", d))), a), x[lingoBinary("add", i, 5)]), 701558691);
  if (lingoBinary("lt", n, 0)) {
  a = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 32), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 134217728), 16)), b);
  } else {
  a = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 32), lingoBinary("div", n, 134217728)), b);
  }

  n = lingoBinary("add", lingoBinary("add", lingoBinary("add", callNamed("bitOr", callNamed("bitAnd", a, c), callNamed("bitAnd", b, callNamed("bitNot", c))), d), x[lingoBinary("add", i, 10)]), 38016083);
  if (lingoBinary("lt", n, 0)) {
  d = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 512), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 8388608), 256)), a);
  } else {
  d = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 512), lingoBinary("div", n, 8388608)), a);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitOr", callNamed("bitAnd", d, b), callNamed("bitAnd", a, callNamed("bitNot", b))), c), x[lingoBinary("add", i, 15)]), 660478335);
  if (lingoBinary("lt", n, 0)) {
  c = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 16384), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 262144), 8192)), d);
  } else {
  c = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 16384), lingoBinary("div", n, 262144)), d);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitOr", callNamed("bitAnd", c, a), callNamed("bitAnd", d, callNamed("bitNot", a))), b), x[lingoBinary("add", i, 4)]), 405537848);
  if (lingoBinary("lt", n, 0)) {
  b = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 1048576), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 4096), 524288)), c);
  } else {
  b = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 1048576), lingoBinary("div", n, 4096)), c);
  }

  n = lingoBinary("add", lingoBinary("add", lingoBinary("add", callNamed("bitOr", callNamed("bitAnd", b, d), callNamed("bitAnd", c, callNamed("bitNot", d))), a), x[lingoBinary("add", i, 9)]), 568446438);
  if (lingoBinary("lt", n, 0)) {
  a = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 32), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 134217728), 16)), b);
  } else {
  a = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 32), lingoBinary("div", n, 134217728)), b);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitOr", callNamed("bitAnd", a, c), callNamed("bitAnd", b, callNamed("bitNot", c))), d), x[lingoBinary("add", i, 14)]), 1019803690);
  if (lingoBinary("lt", n, 0)) {
  d = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 512), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 8388608), 256)), a);
  } else {
  d = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 512), lingoBinary("div", n, 8388608)), a);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitOr", callNamed("bitAnd", d, b), callNamed("bitAnd", a, callNamed("bitNot", b))), c), x[lingoBinary("add", i, 3)]), 187363961);
  if (lingoBinary("lt", n, 0)) {
  c = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 16384), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 262144), 8192)), d);
  } else {
  c = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 16384), lingoBinary("div", n, 262144)), d);
  }

  n = lingoBinary("add", lingoBinary("add", lingoBinary("add", callNamed("bitOr", callNamed("bitAnd", c, a), callNamed("bitAnd", d, callNamed("bitNot", a))), b), x[lingoBinary("add", i, 8)]), 1163531501);
  if (lingoBinary("lt", n, 0)) {
  b = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 1048576), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 4096), 524288)), c);
  } else {
  b = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 1048576), lingoBinary("div", n, 4096)), c);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitOr", callNamed("bitAnd", b, d), callNamed("bitAnd", c, callNamed("bitNot", d))), a), x[lingoBinary("add", i, 13)]), 1444681467);
  if (lingoBinary("lt", n, 0)) {
  a = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 32), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 134217728), 16)), b);
  } else {
  a = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 32), lingoBinary("div", n, 134217728)), b);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitOr", callNamed("bitAnd", a, c), callNamed("bitAnd", b, callNamed("bitNot", c))), d), x[lingoBinary("add", i, 2)]), 51403784);
  if (lingoBinary("lt", n, 0)) {
  d = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 512), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 8388608), 256)), a);
  } else {
  d = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 512), lingoBinary("div", n, 8388608)), a);
  }

  n = lingoBinary("add", lingoBinary("add", lingoBinary("add", callNamed("bitOr", callNamed("bitAnd", d, b), callNamed("bitAnd", a, callNamed("bitNot", b))), c), x[lingoBinary("add", i, 7)]), 1735328473);
  if (lingoBinary("lt", n, 0)) {
  c = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 16384), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 262144), 8192)), d);
  } else {
  c = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 16384), lingoBinary("div", n, 262144)), d);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitOr", callNamed("bitAnd", c, a), callNamed("bitAnd", d, callNamed("bitNot", a))), b), x[lingoBinary("add", i, 12)]), 1926607734);
  if (lingoBinary("lt", n, 0)) {
  b = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 1048576), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 4096), 524288)), c);
  } else {
  b = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 1048576), lingoBinary("div", n, 4096)), c);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitXor", callNamed("bitXor", b, c), d), a), x[lingoBinary("add", i, 5)]), 378558);
  if (lingoBinary("lt", n, 0)) {
  a = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 16), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 268435456), 8)), b);
  } else {
  a = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 16), lingoBinary("div", n, 268435456)), b);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitXor", callNamed("bitXor", a, b), c), d), x[lingoBinary("add", i, 8)]), 2022574463);
  if (lingoBinary("lt", n, 0)) {
  d = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 2048), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 2097152), 1024)), a);
  } else {
  d = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 2048), lingoBinary("div", n, 2097152)), a);
  }

  n = lingoBinary("add", lingoBinary("add", lingoBinary("add", callNamed("bitXor", callNamed("bitXor", d, a), b), c), x[lingoBinary("add", i, 11)]), 1839030562);
  if (lingoBinary("lt", n, 0)) {
  c = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 65536), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 65536), 32768)), d);
  } else {
  c = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 65536), lingoBinary("div", n, 65536)), d);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitXor", callNamed("bitXor", c, d), a), b), x[lingoBinary("add", i, 14)]), 35309556);
  if (lingoBinary("lt", n, 0)) {
  b = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 8388608), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 512), 4194304)), c);
  } else {
  b = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 8388608), lingoBinary("div", n, 512)), c);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitXor", callNamed("bitXor", b, c), d), a), x[lingoBinary("add", i, 1)]), 1530992060);
  if (lingoBinary("lt", n, 0)) {
  a = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 16), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 268435456), 8)), b);
  } else {
  a = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 16), lingoBinary("div", n, 268435456)), b);
  }

  n = lingoBinary("add", lingoBinary("add", lingoBinary("add", callNamed("bitXor", callNamed("bitXor", a, b), c), d), x[lingoBinary("add", i, 4)]), 1272893353);
  if (lingoBinary("lt", n, 0)) {
  d = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 2048), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 2097152), 1024)), a);
  } else {
  d = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 2048), lingoBinary("div", n, 2097152)), a);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitXor", callNamed("bitXor", d, a), b), c), x[lingoBinary("add", i, 7)]), 155497632);
  if (lingoBinary("lt", n, 0)) {
  c = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 65536), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 65536), 32768)), d);
  } else {
  c = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 65536), lingoBinary("div", n, 65536)), d);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitXor", callNamed("bitXor", c, d), a), b), x[lingoBinary("add", i, 10)]), 1094730640);
  if (lingoBinary("lt", n, 0)) {
  b = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 8388608), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 512), 4194304)), c);
  } else {
  b = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 8388608), lingoBinary("div", n, 512)), c);
  }

  n = lingoBinary("add", lingoBinary("add", lingoBinary("add", callNamed("bitXor", callNamed("bitXor", b, c), d), a), x[lingoBinary("add", i, 13)]), 681279174);
  if (lingoBinary("lt", n, 0)) {
  a = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 16), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 268435456), 8)), b);
  } else {
  a = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 16), lingoBinary("div", n, 268435456)), b);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitXor", callNamed("bitXor", a, b), c), d), x[i]), 358537222);
  if (lingoBinary("lt", n, 0)) {
  d = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 2048), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 2097152), 1024)), a);
  } else {
  d = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 2048), lingoBinary("div", n, 2097152)), a);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitXor", callNamed("bitXor", d, a), b), c), x[lingoBinary("add", i, 3)]), 722521979);
  if (lingoBinary("lt", n, 0)) {
  c = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 65536), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 65536), 32768)), d);
  } else {
  c = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 65536), lingoBinary("div", n, 65536)), d);
  }

  n = lingoBinary("add", lingoBinary("add", lingoBinary("add", callNamed("bitXor", callNamed("bitXor", c, d), a), b), x[lingoBinary("add", i, 6)]), 76029189);
  if (lingoBinary("lt", n, 0)) {
  b = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 8388608), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 512), 4194304)), c);
  } else {
  b = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 8388608), lingoBinary("div", n, 512)), c);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitXor", callNamed("bitXor", b, c), d), a), x[lingoBinary("add", i, 9)]), 640364487);
  if (lingoBinary("lt", n, 0)) {
  a = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 16), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 268435456), 8)), b);
  } else {
  a = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 16), lingoBinary("div", n, 268435456)), b);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitXor", callNamed("bitXor", a, b), c), d), x[lingoBinary("add", i, 12)]), 421815835);
  if (lingoBinary("lt", n, 0)) {
  d = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 2048), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 2097152), 1024)), a);
  } else {
  d = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 2048), lingoBinary("div", n, 2097152)), a);
  }

  n = lingoBinary("add", lingoBinary("add", lingoBinary("add", callNamed("bitXor", callNamed("bitXor", d, a), b), c), x[lingoBinary("add", i, 15)]), 530742520);
  if (lingoBinary("lt", n, 0)) {
  c = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 65536), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 65536), 32768)), d);
  } else {
  c = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 65536), lingoBinary("div", n, 65536)), d);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitXor", callNamed("bitXor", c, d), a), b), x[lingoBinary("add", i, 2)]), 995338651);
  if (lingoBinary("lt", n, 0)) {
  b = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 8388608), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 512), 4194304)), c);
  } else {
  b = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 8388608), lingoBinary("div", n, 512)), c);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitXor", c, callNamed("bitOr", b, callNamed("bitNot", d))), a), x[i]), 198630844);
  if (lingoBinary("lt", n, 0)) {
  a = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 64), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 67108864), 32)), b);
  } else {
  a = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 64), lingoBinary("div", n, 67108864)), b);
  }

  n = lingoBinary("add", lingoBinary("add", lingoBinary("add", callNamed("bitXor", b, callNamed("bitOr", a, callNamed("bitNot", c))), d), x[lingoBinary("add", i, 7)]), 1126891415);
  if (lingoBinary("lt", n, 0)) {
  d = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 1024), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 4194304), 512)), a);
  } else {
  d = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 1024), lingoBinary("div", n, 4194304)), a);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitXor", a, callNamed("bitOr", d, callNamed("bitNot", b))), c), x[lingoBinary("add", i, 14)]), 1416354905);
  if (lingoBinary("lt", n, 0)) {
  c = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 32768), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 131072), 16384)), d);
  } else {
  c = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 32768), lingoBinary("div", n, 131072)), d);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitXor", d, callNamed("bitOr", c, callNamed("bitNot", a))), b), x[lingoBinary("add", i, 5)]), 57434055);
  if (lingoBinary("lt", n, 0)) {
  b = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 2097152), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 2048), 1048576)), c);
  } else {
  b = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 2097152), lingoBinary("div", n, 2048)), c);
  }

  n = lingoBinary("add", lingoBinary("add", lingoBinary("add", callNamed("bitXor", c, callNamed("bitOr", b, callNamed("bitNot", d))), a), x[lingoBinary("add", i, 12)]), 1700485571);
  if (lingoBinary("lt", n, 0)) {
  a = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 64), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 67108864), 32)), b);
  } else {
  a = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 64), lingoBinary("div", n, 67108864)), b);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitXor", b, callNamed("bitOr", a, callNamed("bitNot", c))), d), x[lingoBinary("add", i, 3)]), 1894986606);
  if (lingoBinary("lt", n, 0)) {
  d = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 1024), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 4194304), 512)), a);
  } else {
  d = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 1024), lingoBinary("div", n, 4194304)), a);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitXor", a, callNamed("bitOr", d, callNamed("bitNot", b))), c), x[lingoBinary("add", i, 10)]), 1051523);
  if (lingoBinary("lt", n, 0)) {
  c = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 32768), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 131072), 16384)), d);
  } else {
  c = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 32768), lingoBinary("div", n, 131072)), d);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitXor", d, callNamed("bitOr", c, callNamed("bitNot", a))), b), x[lingoBinary("add", i, 1)]), 2054922799);
  if (lingoBinary("lt", n, 0)) {
  b = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 2097152), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 2048), 1048576)), c);
  } else {
  b = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 2097152), lingoBinary("div", n, 2048)), c);
  }

  n = lingoBinary("add", lingoBinary("add", lingoBinary("add", callNamed("bitXor", c, callNamed("bitOr", b, callNamed("bitNot", d))), a), x[lingoBinary("add", i, 8)]), 1873313359);
  if (lingoBinary("lt", n, 0)) {
  a = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 64), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 67108864), 32)), b);
  } else {
  a = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 64), lingoBinary("div", n, 67108864)), b);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitXor", b, callNamed("bitOr", a, callNamed("bitNot", c))), d), x[lingoBinary("add", i, 15)]), 30611744);
  if (lingoBinary("lt", n, 0)) {
  d = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 1024), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 4194304), 512)), a);
  } else {
  d = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 1024), lingoBinary("div", n, 4194304)), a);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitXor", a, callNamed("bitOr", d, callNamed("bitNot", b))), c), x[lingoBinary("add", i, 6)]), 1560198380);
  if (lingoBinary("lt", n, 0)) {
  c = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 32768), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 131072), 16384)), d);
  } else {
  c = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 32768), lingoBinary("div", n, 131072)), d);
  }

  n = lingoBinary("add", lingoBinary("add", lingoBinary("add", callNamed("bitXor", d, callNamed("bitOr", c, callNamed("bitNot", a))), b), x[lingoBinary("add", i, 13)]), 1309151649);
  if (lingoBinary("lt", n, 0)) {
  b = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 2097152), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 2048), 1048576)), c);
  } else {
  b = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 2097152), lingoBinary("div", n, 2048)), c);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitXor", c, callNamed("bitOr", b, callNamed("bitNot", d))), a), x[lingoBinary("add", i, 4)]), 145523070);
  if (lingoBinary("lt", n, 0)) {
  a = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 64), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 67108864), 32)), b);
  } else {
  a = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 64), lingoBinary("div", n, 67108864)), b);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitXor", b, callNamed("bitOr", a, callNamed("bitNot", c))), d), x[lingoBinary("add", i, 11)]), 1120210379);
  if (lingoBinary("lt", n, 0)) {
  d = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 1024), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 4194304), 512)), a);
  } else {
  d = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 1024), lingoBinary("div", n, 4194304)), a);
  }

  n = lingoBinary("add", lingoBinary("add", lingoBinary("add", callNamed("bitXor", a, callNamed("bitOr", d, callNamed("bitNot", b))), c), x[lingoBinary("add", i, 2)]), 718787259);
  if (lingoBinary("lt", n, 0)) {
  c = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 32768), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 131072), 16384)), d);
  } else {
  c = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 32768), lingoBinary("div", n, 131072)), d);
  }

  n = lingoBinary("sub", lingoBinary("add", lingoBinary("add", callNamed("bitXor", d, callNamed("bitOr", c, callNamed("bitNot", a))), b), x[lingoBinary("add", i, 9)]), 343485551);
  if (lingoBinary("lt", n, 0)) {
  b = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 2097152), callNamed("bitOr", lingoBinary("div", lingoBinary("add", n, t_iWrap), 2048), 1048576)), c);
  } else {
  b = lingoBinary("add", callNamed("bitOr", lingoBinary("mul", n, 2097152), lingoBinary("div", n, 2048)), c);
  }

  a = lingoBinary("add", a, olda);
  b = lingoBinary("add", b, oldb);
  c = lingoBinary("add", c, oldc);
  d = lingoBinary("add", d, oldd);
  i = lingoBinary("add", i, 16);
  }

  var t_sHex = "0123456789abcdef";
  var t_iArr = new LingoList([a, b, c, d]);
  var t_sOut = "";
  for (var i of t_iArr.toArray()) {
  if (lingoBinary("gt", i, 0)) {
  for (var n = 1; n <= 4; ++n) {
  j = lingoBinary("mod", i, 16);
  i = lingoBinary("div", i, 16);
  var k = lingoBinary("mod", i, 16);
  i = lingoBinary("div", i, 16);
  t_sOut = t_sOut + chunkOf(t_sHex, "char", lingoBinary("add", k, 1), 0);
  t_sOut = t_sOut + chunkOf(t_sHex, "char", lingoBinary("add", j, 1), 0);
  }

  continue;
  }

  i = callNamed("bitNot", i);
  for (var n = 1; n <= 4; ++n) {
  j = lingoBinary("mod", i, 16);
  i = lingoBinary("div", i, 16);
  k = lingoBinary("mod", i, 16);
  i = lingoBinary("div", i, 16);
  t_sOut = t_sOut + chunkOf(t_sHex, "char", lingoBinary("sub", 16, k), 0);
  t_sOut = t_sOut + chunkOf(t_sHex, "char", lingoBinary("sub", 16, j), 0);
  }

  }

  tt = lingoBinary("sub", theProperty("milliSeconds"), tt);
  callNamed("put", lingoBinary("joinPad", "md5:", tt))
  return t_sOut;
}

