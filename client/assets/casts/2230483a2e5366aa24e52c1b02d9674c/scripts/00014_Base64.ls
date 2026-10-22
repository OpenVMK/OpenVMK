-- Script
property pBase64Lookup
property pSubLengthLim
property pReturn
property pMimeHeader

on new me
  pBase64Lookup = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
  pSubLengthLim = 6000
  pReturn = numToChar(13) & numToChar(10)
  pMimeHeader = EMPTY
  return me
end
on showProgress me, prog
end
on setMimeHeader me, tFilename, tMimeType
  pMimeHeader = EMPTY
  if stringp(tMimeType) then
    put "Content-Type: " & tMimeType & ";" & pReturn after pMimeHeader
  end if
  put "Content-Transfer-Encoding: base64" & pReturn after pMimeHeader
  put "Content-Disposition: inline; filename=" & QUOTE & tFilename & QUOTE & pReturn & pReturn after pMimeHeader
end
on Base64Encode me, str, splitChunks
  if the platform contains "mac" then
    return me.Base64EncodeMAC(str, splitChunks)
  end if
  subStrings = []
  out = EMPTY
  i = 1
  strRemainder = str.length mod 3
  strLength = str.length - strRemainder
  repeat while i < strLength
    if i mod 100 = 0 then
      me.showProgress(float(i) / strLength)
    end if
    a = charToNum(str.char[i])
    b = charToNum(str.char[i + 1])
    c = charToNum(str.char[i + 2])
    put pBase64Lookup.char[bitAnd(a, 252) / 4 + 1] after out
    put pBase64Lookup.char[bitAnd(a * 256 + b, 1008) / 16 + 1] after out
    put pBase64Lookup.char[bitAnd(b * 256 + c, 4032) / 64 + 1] after out
    put pBase64Lookup.char[bitAnd(c, 63) + 1] after out
    i = i + 3
    if splitChunks and i mod 54 = 1 then
      put pReturn after out
    end if
    if length(out) > pSubLengthLim then
      subStrings.append(out)
      out = EMPTY
    end if
  end repeat
  if strRemainder = 1 then
    a = charToNum(str.char[i])
    put pBase64Lookup.char[bitAnd(a, 252) / 4 + 1] after out
    put pBase64Lookup.char[bitAnd(a * 256, 1008) / 16 + 1] after out
    put "=" after out
    put "=" after out
  else
    if strRemainder = 2 then
      a = charToNum(str.char[i])
      b = charToNum(str.char[i + 1])
      put pBase64Lookup.char[bitAnd(a, 252) / 4 + 1] after out
      put pBase64Lookup.char[bitAnd(a * 256 + b, 1008) / 16 + 1] after out
      put pBase64Lookup.char[bitAnd(b * 256, 4032) / 64 + 1] after out
      put "=" after out
    end if
  end if
  b64Str = EMPTY
  repeat with s in subStrings
    put s after b64Str
  end repeat
  put out after b64Str
  if splitChunks then
    if b64Str.char[b64Str.length - pReturn.length + 1..b64Str.length] = pReturn then
      delete char b64Str.length - pReturn.length + 1 to b64Str.length of b64Str
    end if
  end if
  put pMimeHeader before b64Str
  me.showProgress(1)
  return b64Str
end
on Base64EncodeMAC me, str, splitChunks
  out = EMPTY
  i = 1
  strLength = str.length
  strRemainder = strLength mod 3
  strLength = strLength - strRemainder
  chunk = char 1 to pSubLengthLim of str
  delete char 1 to pSubLengthLim of str
  b64Str = EMPTY
  repeat while i < strLength
    if i mod 100 = 0 then
      me.showProgress(float(i) / strLength)
    end if
    a = charToNum(chunk.char[1])
    b = charToNum(chunk.char[2])
    c = charToNum(chunk.char[3])
    put pBase64Lookup.char[bitAnd(a, 252) / 4 + 1] after out
    put pBase64Lookup.char[bitAnd(a * 256 + b, 1008) / 16 + 1] after out
    put pBase64Lookup.char[bitAnd(b * 256 + c, 4032) / 64 + 1] after out
    put pBase64Lookup.char[bitAnd(c, 63) + 1] after out
    i = i + 3
    if splitChunks and i mod 54 = 1 then
      put pReturn after out
    end if
    delete char 1 to 3 of chunk
    if (i - 1) mod pSubLengthLim = 0 then
      chunk = char 1 to pSubLengthLim of str
      delete char 1 to pSubLengthLim of str
      put out after b64Str
      out = EMPTY
    end if
  end repeat
  if strRemainder = 1 then
    a = charToNum(chunk.char[1])
    put pBase64Lookup.char[bitAnd(a, 252) / 4 + 1] after out
    put pBase64Lookup.char[bitAnd(a * 256, 1008) / 16 + 1] after out
    put "==" after out
  else
    if strRemainder = 2 then
      a = charToNum(chunk.char[1])
      b = charToNum(chunk.char[2])
      put pBase64Lookup.char[bitAnd(a, 252) / 4 + 1] after out
      put pBase64Lookup.char[bitAnd(a * 256 + b, 1008) / 16 + 1] after out
      put pBase64Lookup.char[bitAnd(b * 256, 4032) / 64 + 1] after out
      put "=" after out
    end if
  end if
  put out after b64Str
  if splitChunks then
    if b64Str.char[b64Str.length - pReturn.length + 1..b64Str.length] = pReturn then
      delete char b64Str.length - pReturn.length + 1 to b64Str.length of b64Str
    end if
  end if
  put pMimeHeader before b64Str
  me.showProgress(1)
  return b64Str
end
on Base64Decode me, str
  Base64Lookup = ["A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5, "G": 6, "H": 7, "I": 8, "J": 9, "K": 10, "L": 11, "M": 12, "N": 13, "O": 14, "P": 15, "Q": 16, "R": 17, "S": 18, "T": 19, "U": 20, "V": 21, "W": 22, "X": 23, "Y": 24, "Z": 25, "a": 26, "b": 27, "c": 28, "d": 29, "e": 30, "f": 31, "g": 32, "h": 33, "i": 34, "j": 35, "k": 36, "l": 37, "m": 38, "n": 39, "o": 40, "p": 41, "q": 42, "r": 43, "s": 44, "t": 45, "u": 46, "v": 47, "w": 48, "x": 49, "y": 50, "z": 51, "0": 52, "1": 53, "2": 54, "3": 55, "4": 56, "5": 57, "6": 58, "7": 59, "8": 60, "9": 61, "+": 62, "/": 63]
  subStrings = []
  out = EMPTY
  quanta = []
  repeat with i = 1 to str.length
    c = Base64Lookup.getaProp(str.char[i])
    if not voidp(c) then
      quanta.add(c)
    end if
    if quanta.count = 4 then
      put numToChar(bitAnd(quanta[1] * 64 + quanta[2], 4080) / 16) after out
      put numToChar(bitAnd(quanta[2] * 64 + quanta[3], 1020) / 4) after out
      put numToChar(bitAnd(quanta[3] * 64 + quanta[4], 255)) after out
      quanta = []
      if length(out) > pSubLengthLim then
        subStrings.append(out)
        out = EMPTY
      end if
    end if
  end repeat
  if quanta.count = 3 then
    put numToChar(bitAnd(quanta[1] * 64 + quanta[2], 4080) / 16) after out
    put numToChar(bitAnd(quanta[2] * 64 + quanta[3], 1020) / 4) after out
  else
    if quanta.count = 2 then
      put numToChar(bitAnd(quanta[1] * 64 + quanta[2], 4080) / 16) after out
    end if
  end if
  str = EMPTY
  repeat with s in subStrings
    put s after str
  end repeat
  put out after str
  return str
end