-- Script
property m_rWindow
property m_kCurView
property m_rGameList
property m_rScoreList
property m_iGameCode
property m_rMemHs1
property m_rMemHs2
property m_ar_rAvatarQueue

on construct this
  m_iGameCode = 1
  m_kCurView = #none
  m_ar_rAvatarQueue = []
  if not memberExists("CheckersHs1") then
    m_rMemHs1 = member(createMember("CheckersHs1", #bitmap))
  else
    m_rMemHs1 = getMember("CheckersHs1")
  end if
  if not memberExists("CheckersHs2") then
    m_rMemHs2 = member(createMember("CheckersHs2", #bitmap))
  else
    m_rMemHs2 = getMember("CheckersHs2")
  end if
  this.open(#play)
  return 1
end
on deconstruct this
  this.CloseCurrentView()
  if objectp(m_rWindow) then
    removeWindow(m_rWindow.getID())
    m_rWindow = VOID
  end if
  return 1
end
on open this, a_kPage
  if voidp(m_rWindow) then
    t_sWnd = getUniqueID()
    if createWindow(t_sWnd, "vmk_checkers_lobby.window") then
      m_rWindow = getWindow(t_sWnd)
      m_rWindow.registerClient(this.getID())
      m_rWindow.registerProcedure(#EventProc, this.getID(), #mouseUp)
    else
      error(this, "Failed to create window!", #open)
    end if
  else
    this.CloseCurrentView()
  end if
  case a_kPage of
    #play:
      this.OpenPlayView(m_rWindow)
    #watch:
      this.OpenWatchView(m_rWindow)
    #score:
      this.OpenScoreView(m_rWindow)

  end case
end
on close this
  if objectp(m_rWindow) then
    removeWindow(m_rWindow.getID())
    m_rWindow = VOID
    m_kCurView = #none
  end if
end
on CloseCurrentView this
  case m_kCurView of
    #play:
      this.ClosePlayView()
    #watch:
      this.CloseWatchView()
    #score:
      this.CloseScoreView()

  end case
  m_kCurView = #none
end
on OpenPlayView this
  if objectp(m_rWindow) then
    if m_kCurView = #none then
      m_kCurView = #play
      m_rWindow.merge("vmk_checkers_play.window")
      m_rWindow.getElement("tab.checkers.active").setProperty(#blend, 100)
    else
      error(this, "Window has content already!", #OpenPlayView)
    end if
  else
    return this.open(#play)
  end if
end
on ClosePlayView this
  if objectp(m_rWindow) then
    if m_kCurView = #play then
      if m_rWindow.valid then
        m_rWindow.getElement("tab.checkers.active").setProperty(#blend, 0)
        m_rWindow.unmerge()
      end if
      m_kCurView = #none
    end if
  end if
end
on OpenWatchView this
  if objectp(m_rWindow) then
    if m_kCurView = #none then
      m_kCurView = #watch
      m_rWindow.merge("vmk_checkers_watch.window")
      m_rWindow.getElement("tab.watch.active").setProperty(#blend, 100)
      m_rGameList = createObject(getUniqueID(), "CCasualGameListInterface", "CCheckersGameList")
      m_rGameList.SetImageElement(m_rWindow.getElement("games.list"))
    else
      error(this, "Window has content already!", #OpenWatchView)
    end if
  else
    return this.open(#watch)
  end if
end
on CloseWatchView this
  if objectp(m_rGameList) then
    removeObject(m_rGameList.getID())
    m_rGameList = VOID
  end if
  if objectp(m_rWindow) then
    if m_kCurView = #watch then
      if m_rWindow.valid then
        m_rWindow.getElement("tab.watch.active").setProperty(#blend, 0)
        m_rWindow.unmerge()
      end if
      m_kCurView = #none
    end if
  end if
end
on OpenScoreView this
  if objectp(m_rWindow) then
    if m_kCurView = #none then
      m_kCurView = #score
      m_rWindow.merge("vmk_checkers_highscores.window")
      m_rWindow.getElement("tab.highscores.active").setProperty(#blend, 100)
      m_rScoreList = createObject(getUniqueID(), "CCasualGameHighScoreInterface", "CCheckersGameHighScoreInterface")
      m_rScoreList.SetImageElement(m_rWindow.getElement("highscores.list"))
    else
      error(this, "Window has content already!", #OpenScoreView)
    end if
  else
    return this.open(#score)
  end if
end
on CloseScoreView this
  if objectp(m_rScoreList) then
    removeObject(m_rScoreList.getID())
    m_rScoreList = VOID
  end if
  if objectp(m_rWindow) then
    if m_kCurView = #score then
      if m_rWindow.valid then
        m_rWindow.getElement("tab.highscores.active").setProperty(#blend, 0)
        m_rWindow.unmerge()
      end if
      m_kCurView = #none
    end if
  end if
end
on SetGameList this, a_ar_rGames
  if objectp(m_rWindow) then
    if m_kCurView = #watch then
      if objectp(m_rGameList) then
        m_rGameList.SetGameList(a_ar_rGames)
      end if
    end if
  end if
end
on GetGameList this
  if objectp(m_rGameList) then
    return m_rGameList.GetGameList()
  else
    return []
  end if
end
on SetScoreList this, a_ar_rScores
  if objectp(m_rWindow) then
    if m_kCurView = #score then
      if objectp(m_rScoreList) then
        m_rScoreList.SetScoreList(a_ar_rScores)
      end if
    end if
  end if
end
on GetScoreList this
  if objectp(m_rScoreList) then
    return m_rScoreList.GetScoreList()
  else
    return []
  end if
end
on EventProc this, a_kEvent, a_sElement, a_ptOffset, a_sWindow
  put a_sElement
  case a_sElement of
    "checkers.play":
      getConnection("VMK").send("PlayNow", [#integer: m_iGameCode])
      this.close()
    "checkers.watch":
      if objectp(m_rGameList) then
        m_rGameList.WatchGame()
        this.close()
      end if
    "checkers.challenge":
      if objectp(m_rScoreList) then
        m_rScoreList.StartGame()
        this.close()
      end if
    "games.list":
      if objectp(m_rGameList) then
        m_rGameList.EventProc(a_kEvent, a_sElement, a_ptOffset, a_sWindow)
        t_rGame = m_rGameList.GetSelectedGame()
        if t_rGame.players.count > 0 then
          this._ShowGameDetails(t_rGame.instance, t_rGame.players[1][#name], t_rGame.players[2][#name])
        end if
      end if
    "highscores.list":
      if objectp(m_rScoreList) then
        m_rScoreList.EventProc(a_kEvent, a_sElement, a_ptOffset, a_sWindow)
        t_rScore = m_rScoreList.GetSelectedScore()
        if t_rScore.player > -1 then
          this._ShowAvatarFigure(t_rScore.name, t_rScore.player, m_rWindow.getElement("human.preview.img"))
        end if
      end if
    "tab.watch.active", "tab.watch.passive":
      if m_kCurView <> #watch then
        this.CloseCurrentView()
        this.OpenWatchView()
      end if
    "tab.checkers.active", "tab.checkers.passive":
      if m_kCurView <> #play then
        this.CloseCurrentView()
        this.OpenPlayView()
      end if
    "tab.highscores.active", "tab.highscores.passive":
      if m_kCurView <> #score then
        this.CloseCurrentView()
        this.OpenScoreView()
      end if
    "help":
      case m_kCurView of
        #play:
          executeMessage(#open_help_page, "help.checkers.play")
        #view:
          executeMessage(#open_help_page, "help.checkers.view")
        #score:
          executeMessage(#open_help_page, "help.checkers.score")

      end case
    "close":
      removeObject(this.getID())

  end case
  return 1
end
on _ShowAvatarFigure this, a_sAvatar, a_iAvatar, a_rElement
  t_iQueue = m_ar_rAvatarQueue.count
  t_iIndex = 0
  if t_iQueue > 0 then
    repeat with i = t_iQueue down to 1
      if m_ar_rAvatarQueue[i].element = a_rElement then
        if m_ar_rAvatarQueue[i].name = a_sAvatar then
          t_iIndex = i
          exit repeat
          next repeat
        end if
        m_ar_rAvatarQueue.deleteAt(i)
      end if
    end repeat
  end if
  if t_iIndex = 0 then
    m_ar_rAvatarQueue.add([#name: a_sAvatar, #number: a_iAvatar, #element: a_rElement, #view: m_kCurView])
  end if
  getConnection("VMK").send("GetPlayerDetails", [#integer: m_iGameCode, #integer: a_iAvatar])
end
on SetAvatarFigure this, a_rStruct
  if objectp(m_rWindow) then
    t_rStruct = VOID
    repeat with i = 1 to m_ar_rAvatarQueue.count
      if m_ar_rAvatarQueue[i].name = a_rStruct.name then
        t_rStruct = m_ar_rAvatarQueue[i]
        exit repeat
      end if
    end repeat
    if t_rStruct <> VOID then
      t_rCanvas = image(200, 200, 32)
      t_rBlack = image(200, 200, 8, #grayscale)
      t_rBlack.fill(t_rBlack.rect, rgb(0, 0, 0))
      t_rCanvas.setAlpha(t_rBlack)
      t_rCanvas.useAlpha = 1
      a_rStruct.addProp(#mem, m_rMemHs1)
      t_rRenderer = createObject(getUniqueID(), "CAvatarAnimator")
      t_rRenderer.Define([#outlook: a_rStruct.figure, #tilesize: 32])
      t_rRenderer.setCallback(this.getID(), #_AvatarAssetsReady, a_rStruct)
      t_rRenderer.SetAction([#head: 3, #body: 3, #emoticon: 0, #LeftHand: 0, #RightHand: 0, #legs: 0, #magic: 0])
    end if
  end if
end
on _AvatarAssetsReady this, a_rImage, a_rStruct
  if objectp(m_rWindow) then
    repeat with i = 1 to m_ar_rAvatarQueue.count
      if a_rStruct.name = m_ar_rAvatarQueue[i].name then
        if m_ar_rAvatarQueue[i].view = m_kCurView then
          t_rRect = m_ar_rAvatarQueue[i].element.getProperty(#image).rect
          t_iOffX = (t_rRect.width - a_rImage.width) / 2
          t_iOffY = (t_rRect.height - a_rImage.height) / 2
          t_rBuffer = image(t_rRect.width, t_rRect.height, 32)
          t_rBuffer.copyPixels(a_rImage, a_rImage.rect + [t_iOffX, t_iOffY, t_iOffX, t_iOffY], a_rImage.rect)
          t_rMem = a_rStruct.mem
          t_rMem.image = a_rImage
          t_spr = m_ar_rAvatarQueue[i].element.getProperty(#sprite)
          if m_kCurView = #score then
            t_spr.width = a_rImage.width * 1.5
            t_spr.height = a_rImage.height * 1.5
            t_rMem.regPoint = point(0, -7)
          else
            t_spr.width = a_rImage.width
            t_spr.height = a_rImage.height
            t_rMem.regPoint = point(0, 0)
          end if
          t_spr.member = t_rMem
        end if
        m_ar_rAvatarQueue.deleteAt(i)
        exit repeat
      end if
    end repeat
  end if
end
on _ShowGameDetails this, a_iInstance, a_sPlayer1, a_sPlayer2
  getConnection("VMK").send("GetGameDetails", [#integer: m_iGameCode, #integer: a_iInstance])
end
on SetGameDetails this, a_ar_rPlayers
  if m_kCurView = #watch then
    if objectp(m_rWindow) then
      if a_ar_rPlayers.count > 0 then
        repeat with j = 1 to a_ar_rPlayers.count
          if j = 1 then
            t_sNumber = EMPTY
            t_iDir = 3
          else
            t_sNumber = string(j)
            t_iDir = 5
          end if
          t_rElem = m_rWindow.getElement("human.preview.img" & t_sNumber)
          if voidp(t_rElem) then
            exit
          end if
          t_iQueue = m_ar_rAvatarQueue.count
          t_iIndex = 0
          if t_iQueue > 0 then
            repeat with i = t_iQueue down to 1
              if m_ar_rAvatarQueue[i].element = t_rElem then
                if m_ar_rAvatarQueue[i].name = a_ar_rPlayers[j].name then
                  t_iIndex = i
                  exit repeat
                  next repeat
                end if
                m_ar_rAvatarQueue.deleteAt(i)
              end if
            end repeat
          end if
          if t_iIndex = 0 then
            m_ar_rAvatarQueue.add([#name: a_ar_rPlayers[j].name, #number: 0, #element: t_rElem, #figure: a_ar_rPlayers[j].figure, #view: m_kCurView, #mem: getMember("CheckersHs" & j)])
            t_iIndex = m_ar_rAvatarQueue.count
          end if
          t_rStruct = m_ar_rAvatarQueue[t_iIndex]
          t_rRenderer = createObject(getUniqueID(), "CAvatarAnimator")
          t_rRenderer.Define([#outlook: t_rStruct.figure, #tilesize: 32])
          t_rRenderer.setCallback(this.getID(), #_AvatarAssetsReady, t_rStruct)
          t_rRenderer.SetAction([#head: t_iDir, #body: t_iDir, #emoticon: 0, #LeftHand: 0, #RightHand: 0, #legs: 0, #magic: 0])
        end repeat
      end if
    end if
  end if
end