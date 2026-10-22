-- Script
property pHost
property pPort
property pXtra
property pMsgStruct
property pConnectionOk
property pConnectionSecured
property pConnectionShouldBeKilled
property pEncryptionOn
property pDecoder
property pLastContent
property pContentChunk
property pLogMode
property pLogfield
property pCommandsPntr
property pListenersPntr
property m_sDebugInput
property m_sDebugOutput

on construct me
  pEncryptionOn = 0
  pMsgStruct = getStructVariable("struct.message")
  pMsgStruct.setaProp(#connection, me)
  pDecoder = 0
  pLastContent = EMPTY
  pConnectionShouldBeKilled = 0
  pCommandsPntr = getStructVariable("struct.pointer")
  pListenersPntr = getStructVariable("struct.pointer")
  m_sDebugInput = EMPTY
  m_sDebugOutput = EMPTY
  me.setLogMode(getIntVariable("connection.log.level", 0))
  return 1
end
on deconstruct me
  return me.disconnect(1)
end
on connect me, tHost, tPort
  pHost = tHost
  pPort = tPort
  pXtra = new(xtra("Multiuser"))
  pXtra.setNetBufferLimits(16 * 1024, 100 * 1024, 100)
  tErrCode = pXtra.setNetMessageHandler(#xtraMsgHandler, me)
  if tErrCode = 0 then
    tConnectError = pXtra.connectToNetServer("*", "*", pHost, pPort, "*", 1)
    if 0 <> tConnectError then
      executeMessage(#ConnectionFailed)
      return error(me, "Connect to server failed:" && tConnectError, #connect)
    end if
  else
    return error(me, "Creation of callback failed:" && tErrCode, #connect)
  end if
  pLastContent = EMPTY
  if pLogMode > 0 then
    me.log("Connection initialized:" && me.getID() && pHost && pPort)
  end if
  return 1
end
on disconnect me, tControlled
  if tControlled <> 1 then
    me.forwardMsg(-1)
  end if
  pConnectionShouldBeKilled = 1
  if objectp(pXtra) then
    pXtra.sendNetMessage(0, 0, numToChar(0))
    pXtra.setNetMessageHandler(VOID, VOID)
  end if
  pXtra = VOID
  if not tControlled then
    error(me, "Connection disconnected:" && me.getID(), #disconnect)
  end if
  return 1
end
on connectionReady me
  return pConnectionOk and pConnectionSecured
end
on setDecoder me, tDecoder
  if not objectp(tDecoder) then
    return error(me, "Decoder object expected:" && tDecoder, #setDecoder)
  else
    pDecoder = tDecoder
    return 1
  end if
end
on getDecoder me
  return pDecoder
end
on setLogMode me, tMode
  if tMode.ilk <> #integer then
    return error(me, "Invalid argument:" && tMode, #setLogMode)
  end if
  pLogMode = tMode
  if pLogMode = 2 then
    if memberExists("connectionLog.text") then
      pLogfield = member(getmemnum("connectionLog.text"))
    else
      pLogfield = VOID
      pLogMode = 1
    end if
  end if
  return 1
end
on getLogMode me
  return pLogMode
end
on setEncryption me, tBoolean
  pEncryptionOn = tBoolean
  pConnectionSecured = 1
  return 1
end
on send me, tCmd, tParmArr
  m_sDebugOutput = EMPTY
  if not (pConnectionOk and objectp(pXtra)) then
    return error(me, "Connection not ready:" && me.getID(), #send)
  end if
  tMsg = EMPTY
  tLength = 2
  if listp(tParmArr) then
    repeat with i = 1 to tParmArr.count
      t_kType = tParmArr.getPropAt(i)
      t_vParm = tParmArr[i]
      case t_kType of
        #string, #str:
          put "STR:" && t_vParm & RETURN after m_sDebugOutput
          t_iLen = 0
          repeat with t_iChr = 1 to length(t_vParm)
            t_iNum = charToNum(char t_iChr of t_vParm)
            t_iLen = t_iLen + 1 + (t_iNum > 255)
          end repeat
          t_sLen = me.ToInt(t_iLen)
          put t_sLen & t_vParm after tMsg
          tLength = tLength + t_iLen + length(t_sLen)
        #short, #Byte:
          put "BYTE:" && t_vParm & RETURN after m_sDebugOutput
          tByte = numToChar(bitOr(64, bitAnd(63, t_vParm)))
          put tByte after tMsg
          tLength = tLength + 1
        #integer, #int:
          put "INT:" && t_vParm & RETURN after m_sDebugOutput
          t_sInt = me.ToInt(t_vParm)
          put t_sInt after tMsg
          tLength = tLength + length(t_sInt)
        #boolean, #bool:
          put "BOOL:" && t_vParm & RETURN after m_sDebugOutput
          t_vParm = t_vParm <> 0
          tByte = numToChar(bitOr(64, bitAnd(63, t_vParm)))
          put tByte after tMsg
          tLength = tLength + 1
        otherwise:
          error(me, "Unsupported param type:" && t_kType, #send)

      end case
    end repeat
  end if
  getObject(#session).set("con_lastsend", the long time && tCmd && "-" && tMsg)
  if tCmd.ilk = #integer then
    t_iCmd = tCmd
    t_sCmd = tCmd
    tBy1 = numToChar(bitOr(64, tCmd / 64))
    tBy2 = numToChar(bitOr(64, bitAnd(63, tCmd)))
    tCmd = tBy1 & tBy2
  else
    t_sCmd = tCmd
    tCmd = pCommandsPntr.getaProp(#value).getaProp(tCmd)
    t_iCmd = tCmd
  end if
  if tCmd.ilk = #void then
    return error(me, "Unrecognized command!", #send)
  end if
  put RETURN & "OUTPUT" && t_sCmd && "[" & t_iCmd & "]" & the long time & RETURN & m_sDebugOutput & "-- -- -- --"
  tMsg = tCmd & tMsg
  tL1 = numToChar(bitOr(bitAnd(tLength, 63), 64))
  tL2 = numToChar(bitOr(bitAnd(tLength / 64, 63), 64))
  tL3 = numToChar(bitOr(bitAnd(tLength / 4096, 63), 64))
  tMsg = tL3 & tL2 & tL1 & tMsg
  if pEncryptionOn and objectp(pDecoder) then
    tMsg = pDecoder.Encipher(tMsg)
  end if
  pXtra.sendNetMessage(0, 0, tMsg)
  return 1
end
on sendNonce me, i_iLength
  tMsg = EMPTY
  repeat with i = 1 to i_iLength
    t_sRandom = numToChar(random(255))
    tMsg = tMsg & t_sRandom
  end repeat
  if pEncryptionOn and objectp(pDecoder) then
    tEncMsg = pDecoder.Encipher(tMsg)
  else
    tEncMsg = tMsg & tMsg
  end if
  pXtra.sendNetMessage(0, 0, tEncMsg)
  return 1
end
on getWaitingMessagesCount me
  return pXtra.getNumberWaitingNetMessages()
end
on processWaitingMessages me
  return pXtra.checkNetMessages(1)
end
on getProperty me, tProp
  case tProp of
    #xtra:
      return pXtra
    #host:
      return pHost
    #port:
      return pPort
    #decoder:
      return me.getDecoder()
    #logmode:
      return me.getLogMode()
    #listener:
      return pListenersPntr
    #commands:
      return pCommandsPntr
    #message:
      return pMsgStruct

  end case
  return 0
end
on setProperty me, tProp, tvalue
  case tProp of
    #decoder:
      return me.setDecoder(tvalue)
    #logmode:
      return me.setLogMode(tvalue)
    #listener:
      if tvalue.ilk = #struct then
        pListenersPntr = tvalue
        return 1
      else
        return 0
      end if
    #commands:
      if tvalue.ilk = #struct then
        pCommandsPntr = tvalue
        return 1
      else
        return 0
      end if

  end case
  return 0
end
on GetBoolFrom me
  tByteStr = pMsgStruct.getaProp(#content)
  tByte = bitAnd(charToNum(char 1 of tByteStr), 63)
  pMsgStruct.setaProp(#content, tByteStr.char[2..length(tByteStr)])
  put "BOOL:" && tByte <> 0 & RETURN after m_sDebugInput
  return tByte <> 0
end
on GetByteFrom me
  tStream = pMsgStruct.getaProp(#content)
  tByte = bitAnd(charToNum(char 1 of tStream), 63)
  pMsgStruct.setaProp(#content, tStream.char[2..length(tStream)])
  put "BYTE:" && tByte & RETURN after m_sDebugInput
  return tByte
end
on GetIntFrom me
  tByteStr = pMsgStruct.getaProp(#content)
  tByte = bitAnd(charToNum(char 1 of tByteStr), 63)
  tByCnt = bitOr(bitAnd(tByte, 56) / 8, 0)
  tNeg = bitAnd(tByte, 4)
  tInt = bitAnd(tByte, 3)
  if tByCnt > 1 then
    tPowTbl = [4, 256, 16384, 1048576, 67108864]
    repeat with i = 2 to tByCnt
      tByte = bitAnd(charToNum(char i of tByteStr), 63)
      tInt = bitOr(tByte * tPowTbl[i - 1], tInt)
    end repeat
  end if
  if tNeg then
    tInt = -tInt
  end if
  pMsgStruct.setaProp(#content, tByteStr.char[tByCnt + 1..length(tByteStr)])
  put "INT:" && tInt & RETURN after m_sDebugInput
  return tInt
end
on GetStrFrom me
  tArr = pMsgStruct.getaProp(#content)
  tLen = offset(numToChar(2), tArr)
  if tLen > 1 then
    tStr = char 1 to tLen - 1 of tArr
  else
    tStr = EMPTY
  end if
  pMsgStruct.setaProp(#content, char tLen + 1 to length(tArr) of tArr)
  put "STR:" && tStr & RETURN after m_sDebugInput
  return tStr
end
on ToInt this, a_iNum
  if a_iNum < 0 then
    t_iNegMask = 4
    a_iNum = -a_iNum
  else
    t_iNegMask = 0
  end if
  t_sNum = numToChar(64 + bitAnd(a_iNum, 3))
  t_iLen = 1
  a_iNum = a_iNum / 4
  repeat while a_iNum <> 0
    t_iLen = t_iLen + 1
    put numToChar(64 + bitAnd(a_iNum, 63)) after t_sNum
    a_iNum = a_iNum / 64
  end repeat
  return numToChar(bitOr(bitOr(charToNum(char 1 of t_sNum), t_iLen * 8), t_iNegMask)) & chars(t_sNum, 2, t_iLen)
end
on ToStr this, a_sStr
end
on print me
  tStr = EMPTY
  if symbolp(me.getID()) then
    put "#" after tStr
  end if
  put me.getID() & RETURN after tStr
  put "-- -- -- -- -- -- -- --" & RETURN after tStr
  tMsgsList = pListenersPntr.getaProp(#value)
  if listp(tMsgsList) then
    repeat with i = 1 to count(tMsgsList)
      put TAB & tMsgsList.getPropAt(i) & RETURN after tStr
      tCallbackList = tMsgsList[i]
      repeat with tCallback in tCallbackList
        put TAB & TAB & tCallback[1] && "->" && tCallback[2] & RETURN after tStr
      end repeat
      put RETURN after tStr
    end repeat
  end if
  put tStr & RETURN
  return 1
end
on xtraMsgHandler me
  if pConnectionShouldBeKilled <> 0 then
    return 0
  end if
  pConnectionOk = 1
  tNewMsg = pXtra.getNetMessage()
  tErrCode = tNewMsg.getaProp(#errorCode)
  tContent = tNewMsg.getaProp(#content)
  tSubject = tNewMsg.getaProp(#subject)
  if tSubject = "connectToNetServer" and tErrCode <> 0 then
    executeMessage(#ConnectionFailed)
    return error(me, "Connect to server failed:" && tErrCode, #xtraMsgHandler)
  end if
  if tErrCode <> 0 then
    if pLogMode > 0 then
      me.log("Connection" && me.getID() && "was disconnected")
      me.log("host = " & pHost && ", port = " & pPort)
      me.log(tNewMsg)
    end if
    if threadExists("DialogWindow") then
      t = createDialogWindow(me.getID(), "ErrorInConnection", 1, 1)
      t.show()
      t_sText = RETURN & pXtra.getNetErrorString(tErrCode) & RETURN & "Connection was disconnected."
      t.setText(t_sText, "Connection Error Message", "OK")
    end if
    me.disconnect()
    return 0
  end if
  me.msghandler(tContent)
end
on msghandler me, tContent
  if tContent.ilk <> #string then
    return 0
  end if
  if pLastContent.length > 0 then
    tContent = pLastContent & tContent
    pLastContent = EMPTY
  end if
  if tContent.length < 3 then
    pLastContent = pLastContent & tContent
    exit
  end if
  tByte1 = bitAnd(charToNum(char 2 of tContent), 63)
  tByte2 = bitAnd(charToNum(char 1 of tContent), 63)
  tMsgType = bitOr(tByte2 * 64, tByte1)
  tLength = offset(numToChar(1), tContent)
  if tLength = 0 then
    pLastContent = tContent
    exit
  end if
  tParams = char 3 to tLength - 1 of tContent
  tContent = char tLength + 1 to tContent.length of tContent
  me.forwardMsg(tMsgType, tParams)
  if tContent.length > 0 then
    me.msghandler(tContent)
  end if
end
on forwardMsg me, tSubject, tParams
  t_iTime = the long time
  getObject(#session).set("con_lastreceived", t_iTime && tSubject && "-" && tParams)
  tParams = getStringServices().convertSpecialChars(tParams)
  tCallbackList = pListenersPntr.getaProp(#value).getaProp(tSubject)
  if tCallbackList.ilk <> #list then
    return error(me, "Listener not found:" && tSubject && "/" && me.getID(), #forwardMsg)
  end if
  tObjMgr = getObjectManager()
  repeat with i = 1 to count(tCallbackList)
    tCallback = tCallbackList[i]
    tObject = tObjMgr.get(tCallback[1])
    if tObject <> 0 then
      pMsgStruct.setaProp(#subject, tSubject)
      pMsgStruct.setaProp(#content, tParams)
      m_sDebugInput = EMPTY
      call(tCallback[2], tObject, pMsgStruct)
      put RETURN & "INPUT" && tCallback[2] & "[" & tSubject & "]" && t_iTime & RETURN & m_sDebugInput & "-- -- -- --"
      next repeat
    end if
    error(me, "Listening obj not found, removed:" && tCallback[1], #forwardMsg)
    tCallbackList.deleteAt(1)
    i = i - 1
  end repeat
end
on log me, tMsg
end