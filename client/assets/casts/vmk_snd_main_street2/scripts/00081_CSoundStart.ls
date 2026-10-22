-- Script
on construct this
  executeMessage("LoadRoomSound", "main_street_")
  return 1
end
on deconstruct this
  executeMessage("StopRoomSound")
  return 1
end