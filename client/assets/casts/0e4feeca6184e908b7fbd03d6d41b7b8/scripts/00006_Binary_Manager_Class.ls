-- Script
property pConnectionId
property pTimeOutID
property pQueue
property m_checkingConnection
property pRecycleCount

on construct me
  pConnectionId = getVariable("connection.mus.id", #mus)
  pTimeOutID = "mus_close_delay"
  pQueue = []
  m_checkingConnection = 0
  pRecycleCount = 0
  registerMessage(#recycleMusConnection, me.getID(), #recycleConnection)
  return me.registerCmds(1)
end
on deconstruct me
  me.registerCmds(0)
  unregisterMessage(#recycleMusConnection, me.getID())
  return 1
end
on disconnect me
  removeMultiuser(pConnectionId)
end
on removeTopTask me
  put "Cancel MUS Task :" && pQueue[1]
  pQueue.deleteAt(1)
end
on checkRecycleCount me
  if pRecycleCount > getVariableValue("connection.mus.maxretries", 6) then
    t = createDialogWindow(me.getID(), "MUSConnectionProblem", 1, 1)
    t.show()
    t.setText(getText("phototransfer.error.could.not.connect"), getText("phototransfer.error.title"), "OK")
    unregisterMessage(#recycleMusConnection, me.getID())
    return 0
  end if
  return 1
end
on recycleConnection me
  t = createDialogWindow(me.getID(), "MUSConnectionError", 1, 1)
  t.show()
  t.setText(getText("phototransfer.error.in.operation"), getText("phototransfer.error.title"), "OK")
  if not me.checkRecycleCount() then
    return 0
  end if
  pRecycleCount = pRecycleCount + 1
  put "Recycle Connection"
  pQueue = []
  me.next()
end
on retrieveThumbnailData me, tID, tCallBackObj
  if not me.checkRecycleCount() then
    return 0
  end if
  pQueue.add([#type: #retrievethumb, #id: tID, #callback: tCallBackObj])
  if count(pQueue) = 1 or not multiuserExists(pConnectionId) then
    me.next()
  end if
end
on retrieveCatalogPhotoData me, tID, tCallBackObj
  if not me.checkRecycleCount() then
    return 0
  end if
  pQueue.add([#type: #retrievecatalog, #id: tID, #callback: tCallBackObj])
  if count(pQueue) = 1 or not multiuserExists(pConnectionId) then
    me.next()
  end if
end
on retrieveQuestPhotoData me, tID, tCallBackObj
  if not me.checkRecycleCount() then
    return 0
  end if
  pQueue.add([#type: #retrievequest, #id: tID, #callback: tCallBackObj])
  if count(pQueue) = 1 or not multiuserExists(pConnectionId) then
    me.next()
  end if
end
on retrieveNextAlbumPhotoData me, tID, tCallBackObj
  if not me.checkRecycleCount() then
    return 0
  end if
  pQueue.add([#type: #retrievenext, #id: tID, #callback: tCallBackObj])
  if count(pQueue) = 1 or not multiuserExists(pConnectionId) then
    me.next()
  end if
end
on retrievePreviousAlbumPhotoData me, tID, tCallBackObj
  if not me.checkRecycleCount() then
    return 0
  end if
  pQueue.add([#type: #retrieveprev, #id: tID, #callback: tCallBackObj])
  if count(pQueue) = 1 or not multiuserExists(pConnectionId) then
    me.next()
  end if
end
on retrieveWallPhotoData me, tID, tCallBackObj
  if not me.checkRecycleCount() then
    return 0
  end if
  pQueue.add([#type: #retrievewall, #id: tID, #callback: tCallBackObj])
  if count(pQueue) = 1 or not multiuserExists(pConnectionId) then
    me.next()
  end if
end
on storePhotoData me, tdata, tCallBackObj
  if not me.checkRecycleCount() then
    return 0
  end if
  pQueue.add([#type: #storephoto, #data: tdata, #callback: tCallBackObj])
  if count(pQueue) = 1 or not multiuserExists(pConnectionId) then
    me.next()
  end if
end
on storeThumbData me, tdata, tCallBackObj
  if not me.checkRecycleCount() then
    return 0
  end if
  pQueue.add([#type: #storethumb, #data: tdata, #callback: tCallBackObj])
  if count(pQueue) = 1 or not multiuserExists(pConnectionId) then
    me.next()
  end if
end
on addMessageToQueue me, tMsg
  if not me.checkRecycleCount() then
    return 0
  end if
  pQueue.add([#type: #fusemsg, #message: tMsg])
  if count(pQueue) = 1 or not multiuserExists(pConnectionId) then
    me.next()
  end if
end
on storePhotoCaption me, tMsg, tCallBackObj
  if not me.checkRecycleCount() then
    return 0
  end if
  pQueue.add([#type: #fusemsg, #message: tMsg, #callback: tCallBackObj])
  if count(pQueue) = 1 or not multiuserExists(pConnectionId) then
    me.next()
  end if
end
on checkConnection me
  if not multiuserExists(pConnectionId) then
    return error(me, "MUS connection not found:" && pConnectionId, #checkConnection)
  end if
  if getMultiuser(pConnectionId).connectionReady() then
    getMultiuser(pConnectionId).send("LOGIN" && getObject(#session).get("sessionID"))
    me.next()
  else
    me.delay(2000, #checkConnection)
  end if
end
on binaryDataStored me, tMsg
  tTask = pQueue[1]
  if tTask[#callback] <> VOID then
    tObject = getObject(tTask[#callback])
    if tObject.ilk = #instance then
      call(#binaryDataStored, tObject, tMsg.getaProp(#content))
    end if
  end if
  pQueue.deleteAt(1)
  me.next()
end
on thumbnailDataStored me, tMsg
  tTask = pQueue[1]
  if tTask[#callback] <> VOID then
    tObject = getObject(tTask[#callback])
    if tObject.ilk = #instance then
      call(#thumbnailDataStored, tObject, tMsg.getaProp(#content))
    end if
  end if
  pQueue.deleteAt(1)
  me.next()
end
on binaryDataAuthKeyError me
  pQueue.deleteAt(1)
  me.next()
end
on binaryDataReceived me, tdata
  tTask = pQueue[1]
  pQueue.deleteAt(1)
  if tTask[#callback] <> VOID then
    tObject = getObject(tTask[#callback])
    if tObject.ilk = #instance then
      call(#binaryDataReceived, tObject, tdata, tTask[#id])
    end if
  end if
  me.next()
end
on thumbnailInfo me, tdata
  tTask = pQueue[1]
  if tTask[#callback] <> VOID then
    tObject = getObject(tTask[#callback])
    if tObject.ilk = #instance then
      call(#thumbnailInfo, tObject, tdata, tTask[#id])
    end if
  end if
end
on thumbnailData me, tdata
  tTask = pQueue[1]
  pQueue.deleteAt(1)
  if tTask[#callback] <> VOID then
    tObject = getObject(tTask[#callback])
    if tObject.ilk = #instance then
      call(#thumbnailData, tObject, tdata, tTask[#id])
    end if
  end if
  me.next()
end
on catalogPhotoInfo me, tdata
  tTask = pQueue[1]
  if tTask[#callback] <> VOID then
    tObject = getObject(tTask[#callback])
    if tObject.ilk = #instance then
      call(#catalogPhotoInfo, tObject, tdata, tTask[#id])
    end if
  end if
end
on catalogPhotoData me, tdata
  tTask = pQueue[1]
  pQueue.deleteAt(1)
  if tTask[#callback] <> VOID then
    tObject = getObject(tTask[#callback])
    if tObject.ilk = #instance then
      call(#catalogPhotoData, tObject, tdata, tTask[#id])
    end if
  end if
  me.next()
end
on albumPhotoInfo me, tdata
  tTask = pQueue[1]
  if tTask[#callback] <> VOID then
    tObject = getObject(tTask[#callback])
    if tObject.ilk = #instance then
      call(#albumPhotoInfo, tObject, tdata, tTask[#id])
    end if
  end if
end
on albumPhotoData me, tdata
  tTask = pQueue[1]
  pQueue.deleteAt(1)
  if tTask[#callback] <> VOID then
    tObject = getObject(tTask[#callback])
    if tObject.ilk = #instance then
      call(#albumPhotoData, tObject, tdata, tTask[#id])
    end if
  end if
  me.next()
end
on albumEmpty me, tdata
  tTask = pQueue[1]
  pQueue.deleteAt(1)
  if tTask[#callback] <> VOID then
    tObject = getObject(tTask[#callback])
    if tObject.ilk = #instance then
      call(#albumEmpty, tObject, tdata, tTask[#id])
    end if
  end if
  me.next()
end
on wallPhotoInfo me, tdata
  tTask = pQueue[1]
  if tTask[#callback] <> VOID then
    tObject = getObject(tTask[#callback])
    if tObject.ilk = #instance then
      call(#wallPhotoInfo, tObject, tdata, tTask[#id])
    end if
  end if
end
on wallPhotoData me, tdata
  tTask = pQueue[1]
  pQueue.deleteAt(1)
  if tTask[#callback] <> VOID then
    tObject = getObject(tTask[#callback])
    if tObject.ilk = #instance then
      call(#wallPhotoData, tObject, tdata, tTask[#id])
    end if
  end if
  me.next()
end
on captionReceived me, tdata
  tTask = pQueue[1]
  pQueue.deleteAt(1)
  if tTask[#callback] <> VOID then
    tObject = getObject(tTask[#callback])
    if tObject.ilk = #instance then
      call(#captionReceived, tObject, tdata, tTask[#id])
    end if
  end if
end
on next me
  if not multiuserExists(pConnectionId) then
    createMultiuser(pConnectionId, getVariable("connection.mus.host"), getIntVariable("connection.mus.port"))
    getMultiuser(pConnectionId).registerBinaryDataHandler(me.getID(), #binaryDataReceived)
    me.delay(2000, #checkConnection)
  else
    if getMultiuser(pConnectionId).connectionReady() then
      if timeoutExists(pTimeOutID) then
        removeTimeout(pTimeOutID)
      end if
      if count(pQueue) > 0 then
        tTask = pQueue[1]
        case tTask.type of
          #storephoto:
            return getMultiuser(pConnectionId).sendBinary(the data of tTask)
          #storethumb:
            return getMultiuser(pConnectionId).sendThumb(the data of tTask)
          #retrievethumb:
            return getMultiuser(pConnectionId).send("REQUEST_THUMBNAIL" && the id of tTask)
          #retrievecatalog:
            return getMultiuser(pConnectionId).send("REQUEST_CATALOG_PHOTO" && the id of tTask)
          #retrievequest:
            return getMultiuser(pConnectionId).send("REQUEST_QUEST_PHOTO" && the id of tTask)
          #retrievenext:
            return getMultiuser(pConnectionId).send("REQUEST_NEXT_ALBUM_PHOTO" && the id of tTask)
          #retrieveprev:
            return getMultiuser(pConnectionId).send("REQUEST_PREVIOUS_ALBUM_PHOTO" && the id of tTask)
          #retrievewall:
            return getMultiuser(pConnectionId).send("REQUEST_WALL_PHOTO" && the id of tTask)
          #fusemsg:
            getMultiuser(pConnectionId).send(tTask.message)
            return 1

        end case
      else
        createTimeout(pTimeOutID, 30000, #delayedClosing, me.getID(), VOID, 1)
      end if
    else
      me.checkConnection()
    end if
  end if
end
on delayedClosing me
  if multiuserExists(pConnectionId) and count(pQueue) = 0 then
    removeMultiuser(pConnectionId)
  end if
end
on registerCmds me, tBool
  tList = [:]
  tList["THUMBNAIL_RECEIVED"] = #thumbnailDataStored
  tList["PICTURE_SAVED"] = #binaryDataStored
  tList["BINDATA_AUTHKEYERROR"] = #binaryDataAuthKeyError
  tList["DISCONNECT"] = #disconnect
  tList["HELLO"] = #foo
  tList["OK"] = #foo
  tList["THUMBNAIL_INFO"] = #thumbnailInfo
  tList["THUMBNAIL"] = #thumbnailData
  tList["CATALOG_PHOTO_INFO"] = #catalogPhotoInfo
  tList["CATALOG_PHOTO"] = #catalogPhotoData
  tList["ALBUM_PHOTO_INFO"] = #albumPhotoInfo
  tList["ALBUM_PHOTO"] = #albumPhotoData
  tList["WALL_PHOTO_INFO"] = #wallPhotoInfo
  tList["WALL_PHOTO"] = #wallPhotoData
  tList["PICTURE_CAPTION_RECEIVED"] = #captionReceived
  tList["ALBUM_EMPTY"] = #albumEmpty
  if tBool then
    return getMultiuserManager().registerListener(pConnectionId, me.getID(), tList)
  else
    return getMultiuserManager().unregisterListener(pConnectionId, me.getID(), tList)
  end if
end
on foo me
end