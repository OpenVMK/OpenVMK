-- Behavior
global g_rInitializer

on prepareMovie
  g_rInitializer = new(script("CInit"))
  g_rInitializer.CTOR()
end
on stopMovie arg
  if objectp(g_rInitializer) then
    g_rInitializer.DTOR()
    g_rInitializer = VOID
  end if
  clearGlobals()
end
on exitFrame foo
  if voidp(foo) then
    go(the frame)
  end if
end
on streamStatus url, state, bytesSoFar, bytesTotal
  put ["onStreamStatus", url, state, bytesSoFar, bytesTotal]
  if state = "Complete" then
    put url && "download finished"
  end if
end
on ExportStageDescriptions
  Files = []
  Files.append("dock")
  Files.append("cambodian")
  Files.append("indy")
  Files.append("safari")
  Files.append("tent")
  Files.append("tiki")
  repeat with tFile in Files
    repeat with i = 1 to 3
      tMemName = tFile & ".stage" & i & ".xml"
      tMem = member(tMemName)
      if not voidp(tMem) then
        f = xtra("FileIO").new()
        tPath = _movie.path
        tMedia = VOID
        if objectp(f) then
          f.createFile(tPath & tMemName)
          if f.error(f.status()) = "OK" then
            f.openfile(tPath & tMemName, 2)
            if f.error(f.status()) = "OK" then
              f.writeString(tMem.text)
              f.closeFile()
            else
              put f.status() && f.error(f.status())
            end if
          else
            put f.status() && f.error(f.status())
          end if
          next repeat
        end if
        put f.status() && f.error(f.status())
      end if
    end repeat
  end repeat
end