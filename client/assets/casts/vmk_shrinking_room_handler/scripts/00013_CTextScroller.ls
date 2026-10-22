-- Script
property m_sContent
property m_ViewQueue
property m_Index
property m_bActive
property m_iVisibleCharCount
property m_bLoop
property m_iWaitCounter
property m_iScrollingState
property m_bBlinkState
property m_pRenderer
property m_iSpeed

on construct me
  m_iVisibleCharCount = 13
  m_pRenderer = VOID
  me.reset()
  return 1
end
on deconstruct me
end
on reset me
  m_sContent = EMPTY
  m_Index = 1
  m_ViewQueue = me.getEmptyQueueWithLength(" ", m_iVisibleCharCount)
  m_bActive = 0
  m_bLoop = 1
  m_iWaitCounter = 0
  m_iScrollingState = #normal
  m_bBlinkState = 0
  m_iSpeed = 175
end
on resetQueue me
  repeat with i = 1 to m_ViewQueue.count
    m_ViewQueue[i] = " "
  end repeat
end
on getEmptyQueueWithLength me, resetChar, resetLen
  t_queue = []
  if voidp(resetChar) then
    resetChar = " "
  end if
  if voidp(resetLen) then
    resetLen = m_iVisibleCharCount
  end if
  repeat with i = 1 to resetLen
    t_queue[i] = resetChar
  end repeat
  return t_queue
end
on getRandomQueueWithLength me, resetLen
  t_allowedChars = "ACDMNQRTUWXYZ0123456789!"
  t_queue = []
  if voidp(resetLen) then
    resetLen = m_iVisibleCharCount
  end if
  repeat with i = 1 to resetLen
    t_queue[i] = t_allowedChars.char[random(t_allowedChars.char.count)]
  end repeat
  return t_queue
end
on scramble me
  t_allowedChars = "ACDMNQRTUWXYZ0123456789!"
  t_iScrambleCount = 3
  repeat with i = 1 to t_iScrambleCount
    t_randomIndex = random(m_ViewQueue.count)
    m_ViewQueue[t_randomIndex] = t_allowedChars.char[random(t_allowedChars.char.count)]
  end repeat
end
on Init me, t_Content
  me.reset()
  m_sContent = t_Content
end
on start me
  if m_sContent.length > 0 then
    m_bActive = 1
    createTimeout(#textscroller_update & me.getID(), m_iSpeed, #updateScroller, me.getID(), VOID, 0)
  end if
end
on pause me
  m_bActive = 0
  removeTimeout(#textscroller_update & me.getID())
end
on stop me
  m_bActive = 0
  m_Index = 1
  removeTimeout(#textscroller_update & me.getID())
end
on advance me, t_char
  if t_char.length > 1 then
    t_char = t_char.char[1]
  end if
  m_ViewQueue.deleteAt(1)
  m_ViewQueue.append(t_char)
end
on SetRenderer me, t_renderType, t_renderID
  if not voidp(m_pRenderer) then
    m_pRenderer.deconstruct()
  end if
  case t_renderType of
    #text:
      m_pRenderer = createObject(me.getID() & ".renderer", "CTextScrollRendererText")
    #bitmap:
      m_pRenderer = createObject(me.getID() & ".renderer", "CTextScrollRendererBitmap")
    #isometric, #isometric1:
      m_pRenderer = createObject(me.getID() & ".renderer", "CTextScrollRendererIsometric")
    #isometric2:
    otherwise:
      put "Unknown scroll-renderer" && t_renderType

  end case
end
on GetRenderer me
  return m_pRenderer
end
on render me
  case m_iScrollingState of
    #normal:
      t_s = me.implode(m_ViewQueue, EMPTY)
    #blink:
      case m_bBlinkState of
        1:
          t_queue = me.getEmptyQueueWithLength(" ", m_iVisibleCharCount)
          t_s = me.implode(t_queue, EMPTY)
        0:
          t_s = me.implode(m_ViewQueue, EMPTY)

      end case
      m_bBlinkState = not m_bBlinkState
    #random:
      t_queue = me.getRandomQueueWithLength(m_iVisibleCharCount)
      t_s = me.implode(t_queue, EMPTY)
    #scramble:
      me.scramble()
      t_s = me.implode(m_ViewQueue, EMPTY)

  end case
  if voidp(m_pRenderer) then
    put t_s
  else
    m_pRenderer.render(t_s)
  end if
end
on implode me, t_ar, t_del
  t_s = EMPTY
  repeat with c in t_ar
    t_s = t_s & c & t_del
  end repeat
  return t_s
end
on updateScroller me
  if m_bActive then
    if m_iWaitCounter > 0 then
      m_iWaitCounter = m_iWaitCounter - 1
    else
      m_iScrollingState = #normal
      t_nextChar = m_sContent.char[m_Index]
      case t_nextChar of
        EMPTY:
          me.advance(" ")
          if m_Index > m_sContent.char.count + m_ViewQueue.count then
            if m_bLoop then
              m_Index = 0
            else
              m_bActive = 0
            end if
          end if
        "|":
          m_iWaitCounter = 10
        "$":
          m_iWaitCounter = 10
          m_iScrollingState = #blink
        "@":
          m_iWaitCounter = 14
          m_iScrollingState = #scramble
        otherwise:
          me.advance(t_nextChar)

      end case
      m_Index = m_Index + 1
    end if
    me.render()
  end if
end
on setVisibleCharCount me, t_count
  m_iVisibleCharCount = t_count
  m_ViewQueue = me.getEmptyQueueWithLength(" ", m_iVisibleCharCount)
end
on setSpeed me, t_fps
  m_iSpeed = 1000 / t_fps
end
on getSpeed me
  return 1000 / m_iSpeed
end
on setText me, i_txt
  me.stop()
  m_sContent = convertToHigherCase(i_txt)
  me.start()
end