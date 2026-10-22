-- Behavior
on DisplayHighscore a_iGameCode, a_rElement, a_rgbColor, a_iIndexType
  getThread("highscore").getComponent().SetElement(a_rElement)
  if not voidp(a_rgbColor) then
    getThread("highscore").getComponent().SetRenderColor(a_rgbColor)
  end if
  case a_iGameCode of
    5:
      if voidp(a_iIndexType) then
        a_iIndexType = 0
      end if
      getConnection(getVariable("main.connection.id", "VMK")).send(661, [#int: a_iGameCode, #int: a_iIndexType])
    otherwise:
      getConnection(getVariable("main.connection.id", "VMK")).send(660, [#int: a_iGameCode])

  end case
end
on DisableHighScore
  getThread("highscore").getComponent().SetElement(VOID)
end