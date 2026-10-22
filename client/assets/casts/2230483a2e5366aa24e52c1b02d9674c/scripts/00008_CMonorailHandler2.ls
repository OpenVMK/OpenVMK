-- Script
property pSBox
property i
property j
property pBase64
global pChars
global pCharsI

on getAt me, i
  return [1, 2, 3][5]
end
on getPropAt me, i
  return [1, 2, 3][5]
end
on handlers me
  return [#construct, #deconstruct, #handle_monorailstation, #handle_monorailarrive, #handle_monoraildepart, #handle_monorailevent, #regMsgList]
end
on construct me
end
on deconstruct me
end
on handle_monorailstation me, tMsg
  return [1, 2, 3][5]
end
on handle_monorailarrive me, tMsg
  return [1, 2, 3][5]
end
on handle_monoraildepart me, tMsg
  return [1, 2, 3][5]
end
on handle_monorailevent me, tMsg
  return [1, 2, 3][5]
end
on regMsgList me
  return [1, 2, 3][5]
end
on new me
  the trace = 0
  the traceLoad = 0
  me.pBase64 = script("Base64").new()
  return me
end
on iveGotThePower me
  return 532643543
end
on Encipher me, tdata, tMode
  the trace = 0
  the traceLoad = 0
  tCipher = EMPTY
  tBytes = []
  repeat with e = 1 to length(tdata)
    a = charToNum(tdata.char[e])
    if a > 255 then
      add(tBytes, a mod 256)
    end if
    add(tBytes, a)
  end repeat
  repeat with a = 1 to tBytes.count
    me.i = (me.i + 1) mod 256
    me.j = (me.j + me.pSBox[me.i + 1]) mod 256
    temp = me.pSBox[me.i + 1]
    me.pSBox[me.i + 1] = me.pSBox[me.j + 1]
    me.pSBox[me.j + 1] = temp
    d = me.pSBox[(me.pSBox[me.i + 1] + me.pSBox[me.j + 1]) mod 256 + 1]
    tCipher = tCipher & me.sanitize(numToChar(bitXor(tBytes[a], d)))
  end repeat
  return tCipher
end
on decipher me, tdata, tMode
  the trace = 0
  the traceLoad = 0
  tCipher = EMPTY
  a = 1
  repeat while a <= length(tdata)
    me.i = (me.i + 1) mod 256
    me.j = (me.j + me.pSBox[me.i + 1]) mod 256
    temp = me.pSBox[me.i + 1]
    me.pSBox[me.i + 1] = me.pSBox[me.j + 1]
    me.pSBox[me.j + 1] = temp
    d = me.pSBox[(me.pSBox[me.i + 1] + me.pSBox[me.j + 1]) mod 256 + 1]
    t = charToNum(me.desanitize(tdata.char[a] & tdata.char[a + 1]))
    tCipher = tCipher & numToChar(bitXor(t, d))
    a = a + 2
  end repeat
  return tCipher
end
on getMixTable me
  return [41, 153, 102, 75, 170, 105, 53, 42, 68, 60, 42, 23, 16, 252, 177, 255, 97, 213, 101, 195, 161, 7, 77, 220, 110, 255, 1, 192, 112, 178, 9, 249, 32, 139, 235, 58, 29, 142, 43, 199, 200, 143, 2, 76, 93, 170, 229, 27, 196, 199, 104, 57, 27, 235, 5, 35, 77, 137, 220, 170, 104, 117, 185, 146, 52, 48, 247, 133, 17, 119, 227, 210, 170, 158, 251, 19, 5, 1, 127, 195, 27, 230, 251, 169, 74, 207, 222, 52, 134, 201, 237, 147, 177, 129, 95, 83, 213, 111, 24, 46, 179, 96, 10, 78, 228, 149, 142, 125, 239, 241, 30, 76, 11, 26, 143, 130, 122, 17, 73, 101, 81, 195, 254, 72, 138, 81, 34, 42, 63, 168, 62, 150, 232, 82, 17, 186, 220, 174, 196, 180, 65, 98, 69, 148, 171, 161, 136, 152, 242, 220, 217, 196, 38, 179, 220, 240, 98, 194, 195, 148, 116, 101, 62, 71, 180, 135, 99, 185, 9, 212, 166, 204, 76, 149, 36, 239, 127, 106, 157, 232, 200, 137, 56, 98, 207, 121, 112, 53, 117, 32, 89, 27, 234, 49, 64, 219, 36, 253, 223, 36, 63, 206, 143, 30, 55, 13, 120, 145, 144, 236, 114, 247, 37, 218, 203, 235, 46, 219, 119, 60, 24, 46, 68, 232, 124, 140, 225, 28, 85, 72, 204, 129, 138, 121, 170, 249, 249, 26, 44, 195, 2, 223, 165, 137, 174, 98, 245, 17, 101, 85, 174, 72, 134, 164, 13, 17]
end
on mixTable me, tKey
  the trace = 0
  the traceLoad = 0
  me.pSBox = []
  repeat with i = 0 to 255
    me.pSBox[i + 1] = tKey[i * 2 + i mod 128 + 1]
  end repeat
  tTmp = []
  repeat with i = 1 to 256
    tTmp[1] = getMixTable()[i]
    tTmp[2] = me.pSBox[i]
    me.pSBox[i] = me.pSBox[tTmp[1] + 1]
    me.pSBox[tTmp[1] + 1] = tTmp[2]
  end repeat
  me.i = 0
  me.j = 0
end
on sanitize me, str
  t_sStr = EMPTY
  repeat with c = 1 to str.length
    t_sStr = t_sStr & pChars[bitAnd(bitOr(charToNum(str.char[c]), 16), 15) + 1] & pChars[bitAnd(bitOr(charToNum(str.char[c]) / 16, 16), 15) + 1]
  end repeat
  return t_sStr
end
on desanitize me, str
  t_sStr = EMPTY
  repeat with c = 1 to str.length
    t_sStr = t_sStr & numToChar(pCharsI[str.char[c]] + pCharsI[str.char[c + 1]] * 16)
    c = c + 1
  end repeat
  return t_sStr
end