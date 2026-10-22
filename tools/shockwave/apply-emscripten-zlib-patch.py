"""Patch LibreShockwave CMake to enable zlib via -sUSE_ZLIB=1 on Emscripten."""
from __future__ import annotations

import sys
from pathlib import Path

MARKER = "LibreShockwave zlib support: enabled (Emscripten USE_ZLIB)"

OLD = """find_package(ZLIB QUIET)
if(ZLIB_FOUND)
    target_link_libraries(libreshockwave PUBLIC ZLIB::ZLIB)
    target_compile_definitions(libreshockwave PUBLIC LIBRESHOCKWAVE_HAVE_ZLIB=1)
    message(STATUS "LibreShockwave zlib support: enabled")
elseif(LIBRESHOCKWAVE_REQUIRE_ZLIB)
    message(FATAL_ERROR
        "zlib is required for this build but was not found. "
        "Install zlib development files or configure with a zlib CMake package."
    )
else()
    message(STATUS "LibreShockwave zlib support: disabled")
endif()"""

NEW = """find_package(ZLIB QUIET)
if(ZLIB_FOUND)
    target_link_libraries(libreshockwave PUBLIC ZLIB::ZLIB)
    target_compile_definitions(libreshockwave PUBLIC LIBRESHOCKWAVE_HAVE_ZLIB=1)
    message(STATUS "LibreShockwave zlib support: enabled")
elseif(EMSCRIPTEN)
    target_compile_options(libreshockwave PUBLIC "-sUSE_ZLIB=1")
    target_link_options(libreshockwave PUBLIC "-sUSE_ZLIB=1")
    target_compile_definitions(libreshockwave PUBLIC LIBRESHOCKWAVE_HAVE_ZLIB=1)
    message(STATUS "LibreShockwave zlib support: enabled (Emscripten USE_ZLIB)")
elseif(LIBRESHOCKWAVE_REQUIRE_ZLIB)
    message(FATAL_ERROR
        "zlib is required for this build but was not found. "
        "Install zlib development files or configure with a zlib CMake package."
    )
else()
    message(STATUS "LibreShockwave zlib support: disabled")
endif()"""


def main() -> int:
    cmake = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("cpp/CMakeLists.txt")
    text = cmake.read_text(encoding="utf-8")
    if MARKER in text:
        print("Patch already applied:", cmake)
        return 0
    if OLD not in text:
        print("CMakeLists.txt layout changed — manual patch needed:", cmake, file=sys.stderr)
        return 1
    cmake.write_text(text.replace(OLD, NEW, 1), encoding="utf-8")
    print("Applied Emscripten zlib patch:", cmake)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
