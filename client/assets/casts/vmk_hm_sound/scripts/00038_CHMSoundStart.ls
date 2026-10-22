-- Script
on construct this
  return 1
end
on startSound me
  put "Start HM game sound"
  executeMessage("LoadRoomSound", "hauntedmansiongame_")
end
on deconstruct this
  executeMessage("StopRoomSound")
  return 1
end