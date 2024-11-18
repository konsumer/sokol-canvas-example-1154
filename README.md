This is an example that modifies [sokol_app](sokol/sokol_app.h) to allow non css-selector-based canvas config.

This allows things like shadow-dom (web-components, etc.)


```
# native
sokol-shdc --input triangle-sapp.glsl --output triangle-sapp.glsl.h --slang glsl430
cmake -B build
cmake --build build

# web
sokol-shdc --input triangle-sapp.glsl --output triangle-sapp.glsl.h --slang glsl300es
emcmake cmake -B wbuild
cmake --build wbuild

# run a webserver (1 of these)
emrun docs
python3 -m http.server --directory docs 8000
npx -y live-server docs
```