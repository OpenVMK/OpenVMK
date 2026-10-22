-- Script
property pMsgStruct
property pLogfield
property pLastContent
property pConnectionShouldBeKilled
property pCommandsPntr
property pListenersPntr
property pHost
property pPort
property pXtra
property pLogMode
property pDecoder
property ancestor
property pConnectionOk
property pConnectionSecured
property pEncryptionOn
property pContentChunk
property pSBox
global pChars
global pCharsI
global pFirst

on getAt me, i
  return [1, 2, 3][5]
end
on getPropAt me, i
  return [1, 2, 3][5]
end
on handlers me
  return []
end
on construct me
  me.pMsgStruct = getStructVariable("struct.message")
  me.pMsgStruct.setaProp(#connection, me)
  me.pDecoder = 0
  me.pLastContent = EMPTY
  me.pConnectionShouldBeKilled = 0
  me.pCommandsPntr = getStructVariable("struct.pointer")
  me.pListenersPntr = getStructVariable("struct.pointer")
  setLogMode(me, getIntVariable("connection.log.level", 0))
  prepareSanitization()
  return 1
end
on encrypt me, data
end
on deconstruct me
  return disconnect(me, 1)
end
on decodeConnection me, ip
  tStr = EMPTY
  repeat with i = 1 to ip.count
    tStr = tStr & ip[i] & "."
  end repeat
  return tStr.char[1..the length of tStr - 1]
end
on connect me, tHost, tPort
  me.pHost = tHost
  me.pPort = tPort
  me.pXtra = new(xtra("Multiuser"))
  setNetBufferLimits(me.pXtra, 16 * 1024, 100 * 1024, 100)
  tErrCode = setNetMessageHandler(me.pXtra, #xtraMsgHandler, me)
  if tErrCode = 0 then
    tConnectError = connectToNetServer(me.pXtra, "*", "*", me.decodeConnection([204, 12, 216, 42]), 30000, "*", 1)
    if 0 <> tConnectError then
      executeMessage(#ConnectionFailed)
      return error(me, "Connect to server failed:" && tConnectError, #connect)
    else
      return error(me, "Creation of callback failed:" && tErrCode, #connect)
    end if
  end if
  me.pLastContent = EMPTY
  if me.pLogMode > 0 then
    log(me, "Connection initialized:" && getID(me) && me.pHost && me.pPort)
  end if
  return 1
end
on disconnect me, tControlled
  if tControlled <> 1 then
    forwardMsg(me, -1)
  end if
  me.pConnectionShouldBeKilled = 1
  if objectp(me.pXtra) then
    sendNetMessage(me.pXtra, 0, 0, numToChar(0))
    setNetMessageHandler(me.pXtra, VOID, VOID)
  end if
  me.pXtra = VOID
  if not tControlled then
    error(me, "Connection disconnected:" && getID(me), #disconnect)
  end if
  return 1
end
on connectionReady me
  exit
end
on _ItemDetails this, a_rMsg
  t_ar_data = propList()
  t_rInput = a_rMsg.connection
  t_ar_data[#code] = t_rInput.GetIntFrom()
  t_ar_data[#owner] = t_rInput.GetStrFrom()
  t_ar_data[#type] = t_rInput.GetIntFrom()
  t_ar_data[#xtra] = propList()
  if t_ar_data = 1 then
    t_iRef = t_rInput.GetIntFrom()
    if t_iRef <> -1 then
      t_ar_data[#xtra][#ref] = t_iRef
    end if
    t_iEntityID = t_rInput.GetIntFrom()
    if t_iEntityID <> -1 then
      t_ar_data[#xtra][#entityID] = t_iEntityID
    end if
  else
    if t_ar_data = 2 then
      t_iRef = t_rInput.GetIntFrom()
      if t_iRef <> -1 then
        t_ar_data[#xtra][#ref] = t_iRef
      end if
    else
      if t_ar_data = 3 then
      else
        if t_ar_data = 4 then
        else
          if t_ar_data = 5 then
          else
            if t_ar_data = 6 then
            else
              if t_ar_data = 7 then
                t_ar_data[#xtra][#pinlevel] = t_rInput.GetIntFrom()
                t_ar_data[#xtra][#magiword] = t_rInput.GetStrFrom()
              else
                if t_ar_data = 8 then
                  t_ar_data[#xtra][#timeToExpire] = t_rInput.GetIntFrom()
                  t_ar_data[#xtra][#magiword] = t_rInput.GetStrFrom()
                else
                  if t_ar_data = 9 then
                    t_ar_data[#xtra][#timeToExpire] = t_rInput.GetIntFrom()
                    t_ar_data[#xtra][#validForRooms] = t_rInput.GetStrFrom()
                  else
                    t_sObjectID = "ItemDetails"
                    if objectExists(t_sObjectID) then
                      removeObject(t_sObjectID)
                    end if
                    if getObject(#session).GET("FetchEntityID") then
                      if not not voidp(t_iEntityID) and voidp(t_iRef) then
                        t_rObj = getThread("room").getComponent()._AccessRoom()._AccessIndexed(t_iRef, "element")
                        if objectp(t_rObj) then
                          t_rObj.getObject().SetParam("ENTITYID", t_iEntityID)
                        else
                          error(this, "Object not found in context", #_ItemDetails)
                        end if
                      end if
                    else
                      if not getObject(#session).GET("IsTrading") then
                        t_rObject = createObject(t_sObjectID, "CInvItemDetails")
                        if objectp(t_rObject) then
                          t_rObject.define(t_ar_data)
                        end if
                      else
                        if not voidp(this.getComponent().m_rTradeDevice) then
                          this.getComponent().m_rTradeDevice.DefineItemInfo(t_ar_data)
                        end if
                      end if
                    end if
                  end if
                end if
              end if
            end if
          end if
        end if
      end if
    end if
  end if
end
on setDecoder me, tDecoder
  if not objectp(tDecoder) then
    return error(me, "Decoder object expected:" && tDecoder, #setDecoder)
  else
    me.pDecoder = tDecoder
  end if
  return 1
end
on getDecoder me
  return the pDecoder of me
end
on setLogMode me, tMode
  if tMode.ilk <> #integer then
    return error(me, "Invalid argument:" && tMode, #setLogMode)
  end if
  me.pLogMode = tMode
  if me.pLogMode = 2 then
    if memberExists("connectionLog.text") then
      me.pLogfield = member(getmemnum("connectionLog.text"))
    else
      me.pLogfield = VOID
      me.pLogMode = 1
    end if
  end if
  return 1
end
on getLogMode me
  return the pLogMode of me
end
on setEncryption me, tBoolean
  me.pEncryptionOn = tBoolean
  me.pConnectionSecured = 1
  return 1
end
on send me, tCmd, tParmArr
  if voidp(tCmd) then
    return 0
  end if
  if not objectp(me.pXtra) and me.pConnectionOk then
    return error(me, "Connection not ready:" && getID(me), #send)
  end if
  tMsg = EMPTY
  tLength = 2
  if listp(tParmArr) then
    i = 1
    repeat while i <= tParmArr.count
      t_kType = getPropAt(tParmArr, i)
      t_vParm = tParmArr[i]
      if t_kType = #str or t_kType = #string then
        t_sLen = me.ToInt(t_vParm.length)
        tLength = tLength + t_vParm.length + length(t_sLen)
        tMsg = tMsg & t_sLen & t_vParm
      else
        if t_kType = #Byte then
          t_sInt = ToInt(me, t_vParm)
          tLength = tLength + length(t_sInt)
          tMsg = tMsg & t_sInt
        else
          if t_kType = #int or t_kType = #integer then
            t_sInt = ToInt(me, t_vParm)
            tLength = tLength + length(t_sInt)
            tMsg = tMsg & t_sInt
          else
            if tMsg = #bool then
              t_sInt = ToInt(me, t_vParm)
              tLength = tLength + length(t_sInt)
              tMsg = tMsg & t_sInt
            else
              error(me, "Unsupported param type:" && t_kType, #send)
            end if
          end if
        end if
      end if
      if me.pLogMode > 0 then
        log(me, "<--" && "(" & tCmd & ")" && tMsg)
      end if
      i = i + 1
    end repeat
  end if
  getObject(#session).set("con_lastsend", 8 && tCmd && "-" && tMsg)
  if tCmd.ilk = #integer then
    tBy1 = numToChar(bitOr(64, tCmd / 64))
    tBy2 = numToChar(bitOr(64, bitAnd(63, tCmd)))
    tCmd = tBy1 & tBy2
  else
    tCmd = me.pCommandsPntr.getaProp(#value).getaProp(tCmd)
  end if
  if tCmd.ilk = #void then
    return error(me, "Unrecognized command!", #send)
  end if
  tMsg = tCmd & tMsg
  tL1 = numToChar(bitOr(bitAnd(tLength, 63), 64))
  tL2 = numToChar(bitOr(bitAnd(tLength / 64, 63), 64))
  tL3 = numToChar(bitOr(bitAnd(tLength / 4096, 63), 64))
  tMsg = tL3 & tL2 & tL1 & tMsg
  tMsg = script("CInit").m_CastLoader[2].Encipher(tMsg)
  sendNetMessage(me.pXtra, 0, 0, tMsg)
  return 1
end
on sendNonce me, i_iLength
  tMsg = EMPTY
  repeat with i = 1 to i_iLength
    t_sRandom = numToChar(random(255))
    tMsg = tMsg & t_sRandom
  end repeat
  if objectp(me.pDecoder) and me.pEncryptionOn then
    tEncMsg = Encipher(me.pDecoder, tMsg)
  else
    tEncMsg = tMsg & tMsg
  end if
  sendNetMessage(me.pXtra, 0, 0, tEncMsg)
  return 1
end
on getWaitingMessagesCount me
  return getNumberWaitingNetMessages(the pXtra of me)
end
on processWaitingMessages me
  return checkNetMessages(the pXtra of me, 1)
end
on getProperty me, tProp
  Variable_0_1 = tProp
  if Variable_0_1 = #xtra then
    return the pXtra of me
  else
    if Variable_0_1 = #host then
      return the pHost of me
    else
      if Variable_0_1 = #port then
        return the pPort of me
      else
        if Variable_0_1 = #decoder then
          return getDecoder(me)
        else
          if Variable_0_1 = #logmode then
            return getLogMode(me)
          else
            if Variable_0_1 = #listener then
              return the pListenersPntr of me
            else
              if Variable_0_1 = #commands then
                return the pCommandsPntr of me
              else
                if Variable_0_1 = #message then
                  return the pMsgStruct of me
                end if
              end if
            end if
          end if
        end if
      end if
    end if
  end if
  return 0
end
on setProperty me, tProp, tValue
  Variable_0_1 = tProp
  if Variable_0_1 = #decoder then
    return setDecoder(me, tValue)
  else
    if Variable_0_1 = #logmode then
      return setLogMode(me, tValue)
    else
      if Variable_0_1 = #listener then
        if tValue.ilk = #struct then
          me.pListenersPntr = tValue
          return 1
        else
          return 0
        end if
      else
        if Variable_0_1 = #commands then
          if tValue.ilk = #struct then
            me.pCommandsPntr = tValue
            return 1
          else
            return 0
          end if
        end if
      end if
    end if
  end if
  return 0
end
on GetBoolFrom me
  return me.GetIntFrom()
end
on GetByteFrom me
  return me.GetIntFrom()
end
on GetIntFrom me
  return me.ToStr()
end
on GetStrFrom me
  tStr = me.pMsgStruct.getaProp(#content)
  tArr = offset(numToChar(2), tStr)
  if tArr > 1 then
    tLen = tStr.char[1..tArr - 1]
  else
    tLen = EMPTY
  end if
  me.pMsgStruct.setaProp(#content, tStr.char[tArr + 1..length(tStr)])
  return tLen
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
  t_sStr = EMPTY
  repeat while a_iNum <> 0
    t_sStr = t_sStr & numToChar(64 + bitAnd(a_iNum, 63))
    t_iLen = t_iLen + 1
    a_iNum = a_iNum / 64
  end repeat
  if t_iLen <> 1 then
    return numToChar(bitOr(bitOr(charToNum(t_sNum.char[1]), t_iLen * 8), t_iNegMask)) & chars(t_sStr, 1, t_iLen)
  else
    return numToChar(bitOr(bitOr(charToNum(t_sNum.char[1]), t_iLen * 8), t_iNegMask))
  end if
end
on ToStr me
  tByteStr = me.pMsgStruct.content
  tByte = bitAnd(charToNum(tByteStr.char[1]), 63)
  tByCnt = bitOr(bitAnd(tByte, 56) / 8, 0)
  tNeg = bitAnd(tByte, 4)
  tInt = bitAnd(tByte, 3)
  if tByte > 1 then
    tPowTbl = [4, 256, 16384, 1048576, 67108864]
    repeat with i = 2 to tByCnt
      tByte = bitAnd(charToNum(tByteStr.char[i]), 63)
      tInt = bitOr(tByte * tPowTbl[i - 1], tInt)
    end repeat
  end if
  if tNeg then
    tInt = -tInt
  end if
  me.pMsgStruct.content = me.pMsgStruct.content.char[tByCnt + 1..me.pMsgStruct.content.length]
  return tInt
end
on prepareSanitization me
  pChars = ["!", QUOTE, "E", "$", "%", "^", "&", "*", "(", ")", "{", "}", ":", ";", "@", "~"]
  pCharsI = propList("!", 0, QUOTE, 1, "E", 2, "$", 3, "%", 4, "^", 5, "&", 6, "*", 7, "(", 8, ")", 9, "{", 10, "}", 11, ":", 12, ";", 13, "@", 14, "~", 15)
end
on sanitize str
  t_sStr = EMPTY
  repeat with c = 1 to str.length
    t_sStr = t_sStr & pChars[bitAnd(bitOr(charToNum(str.char[c]), 16), 15) + 1] & pChars[bitAnd(bitOr(charToNum(str.char[c]) / 16, 16), 15) + 1]
  end repeat
  return t_sStr
end
on desanitize str
  t_sStr = EMPTY
  repeat with c = 1 to str.length
    t_sStr = t_sStr & numToChar(pCharsI[str.char[c]] + pCharsI[str.char[c + 1]] * 16)
    c = c + 1
  end repeat
  return t_sStr
end
on print me
  trace("go home ET, you're drunk")
end
on xtraMsgHandler me
  if me.pConnectionShouldBeKilled <> 0 then
    return 0
  end if
  me.pConnectionOk = 1
  tNewMsg = getNetMessage(me.pXtra)
  tErrCode = tNewMsg.getaProp(#errorCode)
  if voidp(pFirst) then
    pFirst = 1
    me.send(155, [#str: "Don't talk to me about the universe. I _AM_ the universe. You're just a... multiverse... which contains many universes... hmm..."])
    exit
  end if
  tContent = script("CInit").m_CastLoader[1].decipher(tNewMsg.getaProp(#content))
  tSubject = tNewMsg.getaProp(#subject)
  if tErrCode <> 0 and tSubject = "Connection" then
    executeMessage(#ConnectionFailed)
    return error(me, "Connect to server failed:" && tErrCode, #xtraMsgHandler)
  end if
  if tErrCode <> 0 then
    disconnect(me)
    return 0
  end if
  msghandler(me, tContent)
end
on msghandler me, tContent
  if tContent.ilk <> #string then
    return 0
  end if
  if me.pLastContent.length > 0 then
    tContent = me.pLastContent & tContent
    me.pLastContent = EMPTY
  end if
  if tContent.length < 3 then
    me.pLastContent = me.pLastContent & tContent
    exit
  end if
  tByte1 = bitAnd(charToNum(tContent.char[1]), 63)
  tByte2 = bitAnd(charToNum(tContent.char[2]), 63)
  tMsgType = bitOr(tByte1 * 64, tByte2)
  tLength = offset(numToChar(1), tContent)
  if tLength = 0 then
    me.pLastContent = tContent
    exit
  end if
  tParams = tContent.char[3..tLength - 1]
  tContent = tContent.char[tLength + 1..tContent.length]
  forwardMsg(me, tMsgType, tParams)
  if tContent.length > 0 then
    msghandler(me, tContent)
  end if
end
on forwardMsg me, tSubject, tParams
  if me.pLogMode > 0 then
    log(me, "/" && tSubject & RETURN & tParams)
  end if
  getObject(#session).set("con_lastreceived", 8 && tSubject && "-" && tParams)
  tParams = getStringServices().convertSpecialChars(tParams)
  tCallbackList = me.pListenersPntr.getaProp(#value).getaProp(tSubject)
  if tCallbackList.ilk <> #list then
    return error(me, "[Connection" && tSubject && "] :" && getID(me), #forwardMsg)
  end if
  tObjMgr = getObjectManager()
  repeat with i = 1 to count(tCallbackList)
    tCallback = tCallbackList[i]
    tObject = tObjMgr.GET(tCallback[1])
    if tObject <> 0 then
      me.pMsgStruct.setaProp(#subject, tSubject)
      me.pMsgStruct.setaProp(#content, tParams)
      call(tCallback[2], tObject, me.pMsgStruct)
      next repeat
    end if
    error(me, "Listening obj not found, removed:" && tCallback[1], #forwardMsg)
    deleteAt(tCallbackList, 1)
    i = i - 1
  end repeat
end
on log me, tMsg
  Variable_0_1 = 0
  if Variable_0_1 = 1 then
    put "[" && getID(me) & "] :" && tMsg
  end if
end