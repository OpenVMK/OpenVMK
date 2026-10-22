-- Script
on construct this
  executeMessage("LoadRoomSound", "music-mix_")
  return 1
end
on deconstruct this
  executeMessage("StopRoomSound")
  return 1
end