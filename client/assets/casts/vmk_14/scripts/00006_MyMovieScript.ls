-- Behavior
on trace meme, a, b, d, e
end
on put me, a, b, c, d
  if a contains "Avatar data" or b contains "Avatar data" then
    trace("avatar data has indeed been parsed!")
    trace(me && a)
  end if
end
on handlers
  return [#exitFrame, #enterFrame]
end