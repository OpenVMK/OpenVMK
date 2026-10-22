-- Script
property m_rWriterSay
property m_rWriterShout
property m_rWriterWhisper
property m_iNumBubbles
property m_ar_rBubbles
property m_iNextFreeBbl
property m_iBubbleHeight
property m_kBubbleState
property m_iBubbleScroll
property m_iScrollDelay
property m_iScrollTimer
property m_ar_rChatQueue
property m_mp_sWnd_sName

on construct this
  m_iNumBubbles = 6
  m_ar_rBubbles = []
  m_iNextFreeBbl = 1
  m_kBubbleState = #wait
  m_iBubbleScroll = 0
  m_iScrollDelay = the frameTempo * 6
  m_iScrollTimer = 0
  m_ar_rChatQueue = []
  m_mp_sWnd_sName = [:]
  if not memberExists("speech_bubble.window") then
    return error(this, "Missing resource:" && QUOTE & "speech_bubble.window" & QUOTE, #construct)
  end if
  repeat with i = 1 to m_iNumBubbles
    t_sWnd = "RoomBubbleWnd" && i
    if createWindow(t_sWnd) then
      t_rWnd = getWindow(t_sWnd)
      t_rWnd.registerClient(this.getID())
      t_rWnd.registerProcedure(#_EventProc, this.getID(), #mouseUp)
      if t_rWnd.merge("speech_bubble.window") then
        deactivateWindow(t_sWnd)
        t_rWnd.hide()
        m_ar_rBubbles.append(t_rWnd)
      end if
    end if
  end repeat
  m_iBubbleHeight = m_ar_rBubbles[1].getProperty(#height) + 1
  if m_iBubbleHeight mod 2 then
    m_iBubbleHeight = m_iBubbleHeight + 1
  end if
  m_iNumBubbles = m_ar_rBubbles.count
  t_iY = -m_iBubbleHeight
  repeat with t_rWnd in m_ar_rBubbles
    t_rWnd.moveTo(0, t_iY)
    t_iY = t_iY + m_iBubbleHeight
  end repeat
  if createWriter("SpeechBblWriSay", getStructVariable("struct.font.chat.plain")) then
    m_rWriterSay = getWriter("SpeechBblWriSay")
  end if
  if createWriter("SpeechBblWriShout", getStructVariable("struct.font.chat.bold")) then
    m_rWriterShout = getWriter("SpeechBblWriShout")
  end if
  if createWriter("SpeechBblWriwhisper", getStructVariable("struct.font.italic")) then
    m_rWriterWhisper = getWriter("SpeechBblWriwhisper")
  end if
  registerMessage(#chat, this.getID(), #_QueueChat)
  registerMessage("room_leave", this.getID(), #_HideBubbles)
  receiveUpdate(this.getID())
  return 1
end
on deconstruct this
  repeat with i = 1 to m_iNumBubbles
    t_sWnd = "RoomBubbleWnd" && i
    if windowExists(t_sWnd) then
      removeWindow(t_sWnd)
    end if
  end repeat
  m_ar_rBubbles = []
  m_ar_rChatQueue = []
  if not voidp(m_rWriterSay) then
    removeWriter(m_rWriterSay.getID())
  end if
  if not voidp(m_rWriterShout) then
    removeWriter(m_rWriterShout.getID())
  end if
  if not voidp(m_rWriterWhisper) then
    removeWriter(m_rWriterWhisper.getID())
  end if
  m_rWriterSay = VOID
  m_rWriterShout = VOID
  m_rWriterWhisper = VOID
  unregisterMessage(#chat, this.getID())
  unregisterMessage("room_leave", this.getID())
  unregisterMessage("room_ready", this.getID())
  removeUpdate(this.getID())
  return 1
end
on _QueueChat this, a_rChat
  m_ar_rChatQueue.append(a_rChat)
end
on _RenderChat this, a_rChat
  t_rNameImg = m_rWriterShout.render(a_rChat.name & ":")
  case a_rChat.mode of
    #say:
      t_rChatImg = m_rWriterSay.render(a_rChat.message)
    #shout:
      t_rChatImg = m_rWriterShout.render(a_rChat.message)
    #whisper:
      t_rChatImg = m_rWriterWhisper.render(a_rChat.message)

  end case
  t_rTextImg = image(t_rNameImg.width + t_rChatImg.width, t_rNameImg.height, t_rNameImg.depth)
  t_rTextImg.copyPixels(t_rNameImg, t_rNameImg.rect, t_rNameImg.rect)
  t_rTextImg.copyPixels(t_rChatImg, t_rChatImg.rect + [t_rNameImg.width, 0, t_rNameImg.width, 0], t_rChatImg.rect)
  t_rBubble = m_ar_rBubbles[m_iNextFreeBbl]
  m_iNextFreeBbl = m_iNextFreeBbl mod m_iNumBubbles + 1
  t_rImgElem = t_rBubble.getElement("text")
  t_iCurWidth = t_rImgElem.getProperty(#width)
  t_iOffWidth = t_rTextImg.width - t_iCurWidth
  t_rBubble.ResizeBy(t_iOffWidth, 0)
  t_rImgElem.feedImage(t_rTextImg)
  t_iBblWidth = t_rBubble.getProperty(#width)
  t_iLocX = a_rChat.loc.x - t_iBblWidth / 2
  if t_iLocX < 0 then
    t_iLocX = 0
  end if
  if t_iLocX + t_iBblWidth > (the stage).rect.width then
    t_iLocX = t_iLocX - (t_iLocX + t_iBblWidth - (the stage).rect.width)
  end if
  t_rColor = a_rChat.color
  t_rBubble.getElement("bubble.color").getProperty(#sprite).bgColor = t_rColor
  t_rBubble.moveTo(t_iLocX, t_rBubble.getProperty(#locY))
  m_kBubbleState = #animate
  m_iScrollTimer = 0
  m_mp_sWnd_sName.setaProp(t_rBubble.getID(), a_rChat.name)
end
on _HideBubbles this
  m_ar_rChatQueue = []
  repeat with i = 1 to m_iNumBubbles
    t_sWnd = "RoomBubbleWnd" && i
    if windowExists(t_sWnd) then
      getWindow(t_sWnd).hide()
    end if
  end repeat
end
on update this
  if m_ar_rBubbles.count > 0 then
    if m_ar_rChatQueue.count then
      m_kBubbleState = #animate
    end if
    if m_kBubbleState = #animate then
      repeat with t_rBubble in m_ar_rBubbles
        if t_rBubble.getProperty(#locY) = -m_iBubbleHeight then
          t_rBubble.moveBy(0, m_iNumBubbles * m_iBubbleHeight)
          m_iNextFreeBbl = m_ar_rBubbles.getPos(t_rBubble)
          if m_ar_rChatQueue.count then
            this._RenderChat(m_ar_rChatQueue[1])
            m_ar_rChatQueue.deleteAt(1)
            t_rBubble.show()
          else
            t_rBubble.hide()
          end if
        end if
        t_rBubble.moveBy(0, -2)
      end repeat
      m_iBubbleScroll = m_iBubbleScroll + 2
      if m_iBubbleScroll >= m_iBubbleHeight then
        m_iBubbleScroll = 0
        if m_ar_rChatQueue.count < 1 then
          m_kBubbleState = #wait
        end if
        m_iScrollTimer = 0
      end if
    else
      m_iScrollTimer = m_iScrollTimer + 1
      if m_iScrollTimer = m_iScrollDelay then
        m_iScrollTimer = 0
        m_kBubbleState = #animate
      end if
    end if
  end if
end
on _EventProc this, a_kEvt, a_sElm, a_vPrm, a_sWnd
  t_sName = m_mp_sWnd_sName.getaProp(a_sWnd)
  t_rIterator = getThread(#room).component._AccessRoom().GetIterator("avatar")
  repeat while 1
    t_rAvatar = t_rIterator.getToken()
    if voidp(t_rAvatar) then
      exit repeat
    end if
    if t_rAvatar.GetParam("NAME") = t_sName then
      exit repeat
    end if
    if not t_rIterator.NextToken() then
      exit repeat
    end if
  end repeat
  t_rIterator.clear()
  t_rIterator = VOID
  if not voidp(t_rAvatar) then
  else
  end if
end