-- Behavior
on repeatTest
  repeat with i = 1 to 100
    if i = 50 then
      exit repeat
      next repeat
    end if
    trace("Hello: " & i)
  end repeat
  repeat with j = 1 to 100
    exit repeat
  end repeat
end