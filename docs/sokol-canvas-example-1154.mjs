
var Module = (() => {
  var _scriptName = import.meta.url;
  
  return (
async function(moduleArg = {}) {
  var moduleRtn;

// include: shell.js
// The Module object: Our interface to the outside world. We import
// and export values on it. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(moduleArg) => Promise<Module>
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to check if Module already exists (e.g. case 3 above).
// Substitution will be replaced with actual code on later stage of the build,
// this way Closure Compiler will not mangle it (e.g. case 4. above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module = moduleArg;

// Set up the promise that indicates the Module is initialized
var readyPromiseResolve, readyPromiseReject;
var readyPromise = new Promise((resolve, reject) => {
  readyPromiseResolve = resolve;
  readyPromiseReject = reject;
});
["_memory","___indirect_function_table","__sapp_emsc_onpaste","__sapp_html5_get_ask_leave_site","__sapp_emsc_begin_drop","__sapp_emsc_drop","__sapp_emsc_end_drop","__sapp_emsc_invoke_fetch_cb","__dk_grab_canvas","___em_lib_deps_sokol_app","_sapp_js_add_beforeunload_listener","_sapp_js_remove_beforeunload_listener","_sapp_js_add_clipboard_listener","_sapp_js_remove_clipboard_listener","_sapp_js_write_clipboard","_sapp_js_add_dragndrop_listeners","_sapp_js_dropped_file_size","_sapp_js_fetch_dropped_file","_sapp_js_remove_dragndrop_listeners","_sapp_js_init","_sapp_js_request_pointerlock","_sapp_js_exit_pointerlock","_sapp_js_set_cursor","_sapp_js_clear_favicon","_sapp_js_set_favicon","__dk_sapp_get_canvas_size","__dk_sapp_set_canvas_size","__dk_setup_context","_slog_js_log","_main","onRuntimeInitialized"].forEach((prop) => {
  if (!Object.getOwnPropertyDescriptor(readyPromise, prop)) {
    Object.defineProperty(readyPromise, prop, {
      get: () => abort('You are getting ' + prop + ' on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'),
      set: () => abort('You are setting ' + prop + ' on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'),
    });
  }
});

// Determine the runtime environment we are in. You can customize this by
// setting the ENVIRONMENT setting at compile time (see settings.js).

// Attempt to auto-detect the environment
var ENVIRONMENT_IS_WEB = typeof window == 'object';
var ENVIRONMENT_IS_WORKER = typeof importScripts == 'function';
// N.b. Electron.js environment is simultaneously a NODE-environment, but
// also a web environment.
var ENVIRONMENT_IS_NODE = typeof process == 'object' && typeof process.versions == 'object' && typeof process.versions.node == 'string' && process.type != 'renderer';
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

if (ENVIRONMENT_IS_NODE) {
  // `require()` is no-op in an ESM module, use `createRequire()` to construct
  // the require()` function.  This is only necessary for multi-environment
  // builds, `-sENVIRONMENT=node` emits a static import declaration instead.
  // TODO: Swap all `require()`'s with `import()`'s?
  const { createRequire } = await import('module');
  let dirname = import.meta.url;
  if (dirname.startsWith("data:")) {
    dirname = '/';
  }
  /** @suppress{duplicate} */
  var require = createRequire(dirname);

}

// --pre-jses are emitted after the Module integration code, so that they can
// refer to Module (if they choose; they can also define Module)


// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = Object.assign({}, Module);

var arguments_ = [];
var thisProgram = './this.program';
var quit_ = (status, toThrow) => {
  throw toThrow;
};

// `/` should be present at the end if `scriptDirectory` is not empty
var scriptDirectory = '';
function locateFile(path) {
  if (Module['locateFile']) {
    return Module['locateFile'](path, scriptDirectory);
  }
  return scriptDirectory + path;
}

// Hooks that are implemented differently in different runtime environments.
var readAsync, readBinary;

if (ENVIRONMENT_IS_NODE) {
  if (typeof process == 'undefined' || !process.release || process.release.name !== 'node') throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

  var nodeVersion = process.versions.node;
  var numericVersion = nodeVersion.split('.').slice(0, 3);
  numericVersion = (numericVersion[0] * 10000) + (numericVersion[1] * 100) + (numericVersion[2].split('-')[0] * 1);
  var minVersion = 160000;
  if (numericVersion < 160000) {
    throw new Error('This emscripten-generated code requires node v16.0.0 (detected v' + nodeVersion + ')');
  }

  // These modules will usually be used on Node.js. Load them eagerly to avoid
  // the complexity of lazy-loading.
  var fs = require('fs');
  var nodePath = require('path');

  // EXPORT_ES6 + ENVIRONMENT_IS_NODE always requires use of import.meta.url,
  // since there's no way getting the current absolute path of the module when
  // support for that is not available.
  if (!import.meta.url.startsWith('data:')) {
    scriptDirectory = nodePath.dirname(require('url').fileURLToPath(import.meta.url)) + '/';
  }

// include: node_shell_read.js
readBinary = (filename) => {
  // We need to re-wrap `file://` strings to URLs. Normalizing isn't
  // necessary in that case, the path should already be absolute.
  filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
  var ret = fs.readFileSync(filename);
  assert(ret.buffer);
  return ret;
};

readAsync = (filename, binary = true) => {
  // See the comment in the `readBinary` function.
  filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
  return new Promise((resolve, reject) => {
    fs.readFile(filename, binary ? undefined : 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(binary ? data.buffer : data);
    });
  });
};
// end include: node_shell_read.js
  if (!Module['thisProgram'] && process.argv.length > 1) {
    thisProgram = process.argv[1].replace(/\\/g, '/');
  }

  arguments_ = process.argv.slice(2);

  // MODULARIZE will export the module in the proper place outside, we don't need to export here

  quit_ = (status, toThrow) => {
    process.exitCode = status;
    throw toThrow;
  };

} else
if (ENVIRONMENT_IS_SHELL) {

  if ((typeof process == 'object' && typeof require === 'function') || typeof window == 'object' || typeof importScripts == 'function') throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

} else

// Note that this includes Node.js workers when relevant (pthreads is enabled).
// Node.js workers are detected as a combination of ENVIRONMENT_IS_WORKER and
// ENVIRONMENT_IS_NODE.
if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  if (ENVIRONMENT_IS_WORKER) { // Check worker, not web, since window could be polyfilled
    scriptDirectory = self.location.href;
  } else if (typeof document != 'undefined' && document.currentScript) { // web
    scriptDirectory = document.currentScript.src;
  }
  // When MODULARIZE, this JS may be executed later, after document.currentScript
  // is gone, so we saved it, and we use it here instead of any other info.
  if (_scriptName) {
    scriptDirectory = _scriptName;
  }
  // blob urls look like blob:http://site.com/etc/etc and we cannot infer anything from them.
  // otherwise, slice off the final part of the url to find the script directory.
  // if scriptDirectory does not contain a slash, lastIndexOf will return -1,
  // and scriptDirectory will correctly be replaced with an empty string.
  // If scriptDirectory contains a query (starting with ?) or a fragment (starting with #),
  // they are removed because they could contain a slash.
  if (scriptDirectory.startsWith('blob:')) {
    scriptDirectory = '';
  } else {
    scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, '').lastIndexOf('/')+1);
  }

  if (!(typeof window == 'object' || typeof importScripts == 'function')) throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

  {
// include: web_or_worker_shell_read.js
if (ENVIRONMENT_IS_WORKER) {
    readBinary = (url) => {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.responseType = 'arraybuffer';
      xhr.send(null);
      return new Uint8Array(/** @type{!ArrayBuffer} */(xhr.response));
    };
  }

  readAsync = (url) => {
    // Fetch has some additional restrictions over XHR, like it can't be used on a file:// url.
    // See https://github.com/github/fetch/pull/92#issuecomment-140665932
    // Cordova or Electron apps are typically loaded from a file:// url.
    // So use XHR on webview if URL is a file URL.
    if (isFileURI(url)) {
      return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = () => {
          if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            resolve(xhr.response);
            return;
          }
          reject(xhr.status);
        };
        xhr.onerror = reject;
        xhr.send(null);
      });
    }
    return fetch(url, { credentials: 'same-origin' })
      .then((response) => {
        if (response.ok) {
          return response.arrayBuffer();
        }
        return Promise.reject(new Error(response.status + ' : ' + response.url));
      })
  };
// end include: web_or_worker_shell_read.js
  }
} else
{
  throw new Error('environment detection error');
}

var out = Module['print'] || console.log.bind(console);
var err = Module['printErr'] || console.error.bind(console);

// Merge back in the overrides
Object.assign(Module, moduleOverrides);
// Free the object hierarchy contained in the overrides, this lets the GC
// reclaim data used.
moduleOverrides = null;
checkIncomingModuleAPI();

// Emit code to handle expected values on the Module object. This applies Module.x
// to the proper local x. This has two benefits: first, we only emit it if it is
// expected to arrive, and second, by using a local everywhere else that can be
// minified.

if (Module['arguments']) arguments_ = Module['arguments'];legacyModuleProp('arguments', 'arguments_');

if (Module['thisProgram']) thisProgram = Module['thisProgram'];legacyModuleProp('thisProgram', 'thisProgram');

// perform assertions in shell.js after we set up out() and err(), as otherwise if an assertion fails it cannot print the message
// Assertions on removed incoming Module JS APIs.
assert(typeof Module['memoryInitializerPrefixURL'] == 'undefined', 'Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['pthreadMainPrefixURL'] == 'undefined', 'Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['cdInitializerPrefixURL'] == 'undefined', 'Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['filePackagePrefixURL'] == 'undefined', 'Module.filePackagePrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['read'] == 'undefined', 'Module.read option was removed');
assert(typeof Module['readAsync'] == 'undefined', 'Module.readAsync option was removed (modify readAsync in JS)');
assert(typeof Module['readBinary'] == 'undefined', 'Module.readBinary option was removed (modify readBinary in JS)');
assert(typeof Module['setWindowTitle'] == 'undefined', 'Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)');
assert(typeof Module['TOTAL_MEMORY'] == 'undefined', 'Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY');
legacyModuleProp('asm', 'wasmExports');
legacyModuleProp('readAsync', 'readAsync');
legacyModuleProp('readBinary', 'readBinary');
legacyModuleProp('setWindowTitle', 'setWindowTitle');
var IDBFS = 'IDBFS is no longer included by default; build with -lidbfs.js';
var PROXYFS = 'PROXYFS is no longer included by default; build with -lproxyfs.js';
var WORKERFS = 'WORKERFS is no longer included by default; build with -lworkerfs.js';
var FETCHFS = 'FETCHFS is no longer included by default; build with -lfetchfs.js';
var ICASEFS = 'ICASEFS is no longer included by default; build with -licasefs.js';
var JSFILEFS = 'JSFILEFS is no longer included by default; build with -ljsfilefs.js';
var OPFS = 'OPFS is no longer included by default; build with -lopfs.js';

var NODEFS = 'NODEFS is no longer included by default; build with -lnodefs.js';

assert(!ENVIRONMENT_IS_SHELL, 'shell environment detected but not enabled at build time.  Add `shell` to `-sENVIRONMENT` to enable.');

// end include: shell.js

// include: preamble.js
// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in:
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at:
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html

var wasmBinary = Module['wasmBinary'];legacyModuleProp('wasmBinary', 'wasmBinary');

if (typeof WebAssembly != 'object') {
  err('no native wasm support detected');
}

// include: base64Utils.js
// Converts a string of base64 into a byte array (Uint8Array).
function intArrayFromBase64(s) {
  if (typeof ENVIRONMENT_IS_NODE != 'undefined' && ENVIRONMENT_IS_NODE) {
    var buf = Buffer.from(s, 'base64');
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.length);
  }

  var decoded = atob(s);
  var bytes = new Uint8Array(decoded.length);
  for (var i = 0 ; i < decoded.length ; ++i) {
    bytes[i] = decoded.charCodeAt(i);
  }
  return bytes;
}

// If filename is a base64 data URI, parses and returns data (Buffer on node,
// Uint8Array otherwise). If filename is not a base64 data URI, returns undefined.
function tryParseAsDataURI(filename) {
  if (!isDataURI(filename)) {
    return;
  }

  return intArrayFromBase64(filename.slice(dataURIPrefix.length));
}
// end include: base64Utils.js
// Wasm globals

var wasmMemory;

//========================================
// Runtime essentials
//========================================

// whether we are quitting the application. no code should run after this.
// set in exit() and abort()
var ABORT = false;

// set by exit() and abort().  Passed to 'onExit' handler.
// NOTE: This is also used as the process return code code in shell environments
// but only when noExitRuntime is false.
var EXITSTATUS;

// In STRICT mode, we only define assert() when ASSERTIONS is set.  i.e. we
// don't define it at all in release modes.  This matches the behaviour of
// MINIMAL_RUNTIME.
// TODO(sbc): Make this the default even without STRICT enabled.
/** @type {function(*, string=)} */
function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed' + (text ? ': ' + text : ''));
  }
}

// We used to include malloc/free by default in the past. Show a helpful error in
// builds with assertions.
function _free() {
  // Show a helpful error since we used to include free by default in the past.
  abort('free() called but not included in the build - add `_free` to EXPORTED_FUNCTIONS');
}

// Memory management

var HEAP,
/** @type {!Int8Array} */
  HEAP8,
/** @type {!Uint8Array} */
  HEAPU8,
/** @type {!Int16Array} */
  HEAP16,
/** @type {!Uint16Array} */
  HEAPU16,
/** @type {!Int32Array} */
  HEAP32,
/** @type {!Uint32Array} */
  HEAPU32,
/** @type {!Float32Array} */
  HEAPF32,
/** @type {!Float64Array} */
  HEAPF64;

// include: runtime_shared.js
function updateMemoryViews() {
  var b = wasmMemory.buffer;
  Module['HEAP8'] = HEAP8 = new Int8Array(b);
  Module['HEAP16'] = HEAP16 = new Int16Array(b);
  Module['HEAPU8'] = HEAPU8 = new Uint8Array(b);
  Module['HEAPU16'] = HEAPU16 = new Uint16Array(b);
  Module['HEAP32'] = HEAP32 = new Int32Array(b);
  Module['HEAPU32'] = HEAPU32 = new Uint32Array(b);
  Module['HEAPF32'] = HEAPF32 = new Float32Array(b);
  Module['HEAPF64'] = HEAPF64 = new Float64Array(b);
}

// end include: runtime_shared.js
assert(!Module['STACK_SIZE'], 'STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time')

assert(typeof Int32Array != 'undefined' && typeof Float64Array !== 'undefined' && Int32Array.prototype.subarray != undefined && Int32Array.prototype.set != undefined,
       'JS engine does not provide full typed array support');

// If memory is defined in wasm, the user can't provide it, or set INITIAL_MEMORY
assert(!Module['wasmMemory'], 'Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally');
assert(!Module['INITIAL_MEMORY'], 'Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically');

// include: runtime_stack_check.js
// Initializes the stack cookie. Called at the startup of main and at the startup of each thread in pthreads mode.
function writeStackCookie() {
  var max = _emscripten_stack_get_end();
  assert((max & 3) == 0);
  // If the stack ends at address zero we write our cookies 4 bytes into the
  // stack.  This prevents interference with SAFE_HEAP and ASAN which also
  // monitor writes to address zero.
  if (max == 0) {
    max += 4;
  }
  // The stack grow downwards towards _emscripten_stack_get_end.
  // We write cookies to the final two words in the stack and detect if they are
  // ever overwritten.
  HEAPU32[((max)>>2)] = 0x02135467;
  HEAPU32[(((max)+(4))>>2)] = 0x89BACDFE;
  // Also test the global address 0 for integrity.
  HEAPU32[((0)>>2)] = 1668509029;
}

function checkStackCookie() {
  if (ABORT) return;
  var max = _emscripten_stack_get_end();
  // See writeStackCookie().
  if (max == 0) {
    max += 4;
  }
  var cookie1 = HEAPU32[((max)>>2)];
  var cookie2 = HEAPU32[(((max)+(4))>>2)];
  if (cookie1 != 0x02135467 || cookie2 != 0x89BACDFE) {
    abort(`Stack overflow! Stack cookie has been overwritten at ${ptrToString(max)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${ptrToString(cookie2)} ${ptrToString(cookie1)}`);
  }
  // Also test the global address 0 for integrity.
  if (HEAPU32[((0)>>2)] != 0x63736d65 /* 'emsc' */) {
    abort('Runtime error: The application has corrupted its heap memory area (address zero)!');
  }
}
// end include: runtime_stack_check.js
var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATMAIN__    = []; // functions called when main() is to be run
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the main() is called

var runtimeInitialized = false;

function preRun() {
  var preRuns = Module['preRun'];
  if (preRuns) {
    if (typeof preRuns == 'function') preRuns = [preRuns];
    preRuns.forEach(addOnPreRun);
  }
  callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
  assert(!runtimeInitialized);
  runtimeInitialized = true;

  checkStackCookie();

  
  callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
  checkStackCookie();
  
  callRuntimeCallbacks(__ATMAIN__);
}

function postRun() {
  checkStackCookie();

  var postRuns = Module['postRun'];
  if (postRuns) {
    if (typeof postRuns == 'function') postRuns = [postRuns];
    postRuns.forEach(addOnPostRun);
  }

  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}

function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}

function addOnExit(cb) {
}

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}

// include: runtime_math.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc

assert(Math.imul, 'This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.fround, 'This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.clz32, 'This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.trunc, 'This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
// end include: runtime_math.js
// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// Module.preRun (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled
var runDependencyTracking = {};

function getUniqueRunDependency(id) {
  var orig = id;
  while (1) {
    if (!runDependencyTracking[id]) return id;
    id = orig + Math.random();
  }
}

function addRunDependency(id) {
  runDependencies++;

  Module['monitorRunDependencies']?.(runDependencies);

  if (id) {
    assert(!runDependencyTracking[id]);
    runDependencyTracking[id] = 1;
    if (runDependencyWatcher === null && typeof setInterval != 'undefined') {
      // Check for missing dependencies every few seconds
      runDependencyWatcher = setInterval(() => {
        if (ABORT) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
          return;
        }
        var shown = false;
        for (var dep in runDependencyTracking) {
          if (!shown) {
            shown = true;
            err('still waiting on run dependencies:');
          }
          err(`dependency: ${dep}`);
        }
        if (shown) {
          err('(end of list)');
        }
      }, 10000);
    }
  } else {
    err('warning: run dependency added without ID');
  }
}

function removeRunDependency(id) {
  runDependencies--;

  Module['monitorRunDependencies']?.(runDependencies);

  if (id) {
    assert(runDependencyTracking[id]);
    delete runDependencyTracking[id];
  } else {
    err('warning: run dependency removed without ID');
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}

/** @param {string|number=} what */
function abort(what) {
  Module['onAbort']?.(what);

  what = 'Aborted(' + what + ')';
  // TODO(sbc): Should we remove printing and leave it up to whoever
  // catches the exception?
  err(what);

  ABORT = true;

  // Use a wasm runtime error, because a JS error might be seen as a foreign
  // exception, which means we'd run destructors on it. We need the error to
  // simply make the program stop.
  // FIXME This approach does not work in Wasm EH because it currently does not assume
  // all RuntimeErrors are from traps; it decides whether a RuntimeError is from
  // a trap or not based on a hidden field within the object. So at the moment
  // we don't have a way of throwing a wasm trap from JS. TODO Make a JS API that
  // allows this in the wasm spec.

  // Suppress closure compiler warning here. Closure compiler's builtin extern
  // definition for WebAssembly.RuntimeError claims it takes no arguments even
  // though it can.
  // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure gets fixed.
  /** @suppress {checkTypes} */
  var e = new WebAssembly.RuntimeError(what);

  readyPromiseReject(e);
  // Throw the error whether or not MODULARIZE is set because abort is used
  // in code paths apart from instantiation where an exception is expected
  // to be thrown when abort is called.
  throw e;
}

// include: memoryprofiler.js
// end include: memoryprofiler.js
// show errors on likely calls to FS when it was not included
var FS = {
  error() {
    abort('Filesystem support (FS) was not included. The problem is that you are using files from JS, but files were not used from C/C++, so filesystem support was not auto-included. You can force-include filesystem support with -sFORCE_FILESYSTEM');
  },
  init() { FS.error() },
  createDataFile() { FS.error() },
  createPreloadedFile() { FS.error() },
  createLazyFile() { FS.error() },
  open() { FS.error() },
  mkdev() { FS.error() },
  registerDevice() { FS.error() },
  analyzePath() { FS.error() },

  ErrnoError() { FS.error() },
};
Module['FS_createDataFile'] = FS.createDataFile;
Module['FS_createPreloadedFile'] = FS.createPreloadedFile;

// include: URIUtils.js
// Prefix of data URIs emitted by SINGLE_FILE and related options.
var dataURIPrefix = 'data:application/octet-stream;base64,';

/**
 * Indicates whether filename is a base64 data URI.
 * @noinline
 */
var isDataURI = (filename) => filename.startsWith(dataURIPrefix);

/**
 * Indicates whether filename is delivered via file protocol (as opposed to http/https)
 * @noinline
 */
var isFileURI = (filename) => filename.startsWith('file://');
// end include: URIUtils.js
function createExportWrapper(name, nargs) {
  return (...args) => {
    assert(runtimeInitialized, `native function \`${name}\` called before runtime initialization`);
    var f = wasmExports[name];
    assert(f, `exported native function \`${name}\` not found`);
    // Only assert for too many arguments. Too few can be valid since the missing arguments will be zero filled.
    assert(args.length <= nargs, `native function \`${name}\` called with ${args.length} args but expects ${nargs}`);
    return f(...args);
  };
}

// include: runtime_exceptions.js
// end include: runtime_exceptions.js
function findWasmBinary() {
    var f = 'data:application/octet-stream;base64,AGFzbQEAAAABrQEaYAF/AGABfwF/YAAAYAJ/fwBgAn9/AX9gAAF/YAN/f38Bf2AFf39/f38Bf2AEf39/fwBgA39/fwBgB39/f39/f38AYAJ/fABgAAF8YAR/f39/AX9gBH19fX0AYAJ9fQBgBH9/fX8AYAZ/f39/f38AYAV/f39/fwBgCn9/f39/f39/f38AYAh/f39/f39/fwBgAnx/AX9gAn5+AX9gAX8BfGABfQF9YAN/fn8BfgKDG3UDZW52DV9fYXNzZXJ0X2ZhaWwACANlbnYMc2FwcF9qc19pbml0AAADZW52H2Vtc2NyaXB0ZW5fZ2V0X2VsZW1lbnRfY3NzX3NpemUABgNlbnYoZW1zY3JpcHRlbl9zZXRfcmVzaXplX2NhbGxiYWNrX29uX3RocmVhZAAHA2VudiFlbXNjcmlwdGVuX2dldF9kZXZpY2VfcGl4ZWxfcmF0aW8ADANlbnYiZW1zY3JpcHRlbl9zZXRfY2FudmFzX2VsZW1lbnRfc2l6ZQAGA2VudhhlbXNjcmlwdGVuX3NldF9tYWluX2xvb3AACQNlbnYnZW1zY3JpcHRlbl9yZXF1ZXN0X2FuaW1hdGlvbl9mcmFtZV9sb29wAAMDZW52FXNhcHBfanNfY2xlYXJfZmF2aWNvbgACA2VudhNzYXBwX2pzX3NldF9mYXZpY29uAAkDZW52C3Nsb2dfanNfbG9nAAMDZW52D19ka19ncmFiX2NhbnZhcwAAA2VudhhfZGtfc2FwcF9nZXRfY2FudmFzX3NpemUAAwNlbnYYX2RrX3NhcHBfc2V0X2NhbnZhc19zaXplAAMDZW52EV9ka19zZXR1cF9jb250ZXh0AA0DZW52JWVtc2NyaXB0ZW5fd2ViZ2xfbWFrZV9jb250ZXh0X2N1cnJlbnQAAQNlbnYNZ2xHZXRJbnRlZ2VydgADA2VudiFlbXNjcmlwdGVuX3dlYmdsX2VuYWJsZV9leHRlbnNpb24ABANlbnYrZW1zY3JpcHRlbl9zZXRfbW91c2Vkb3duX2NhbGxiYWNrX29uX3RocmVhZAAHA2VudillbXNjcmlwdGVuX3NldF9tb3VzZXVwX2NhbGxiYWNrX29uX3RocmVhZAAHA2VuditlbXNjcmlwdGVuX3NldF9tb3VzZW1vdmVfY2FsbGJhY2tfb25fdGhyZWFkAAcDZW52LGVtc2NyaXB0ZW5fc2V0X21vdXNlZW50ZXJfY2FsbGJhY2tfb25fdGhyZWFkAAcDZW52LGVtc2NyaXB0ZW5fc2V0X21vdXNlbGVhdmVfY2FsbGJhY2tfb25fdGhyZWFkAAcDZW52J2Vtc2NyaXB0ZW5fc2V0X3doZWVsX2NhbGxiYWNrX29uX3RocmVhZAAHA2VudillbXNjcmlwdGVuX3NldF9rZXlkb3duX2NhbGxiYWNrX29uX3RocmVhZAAHA2VudidlbXNjcmlwdGVuX3NldF9rZXl1cF9jYWxsYmFja19vbl90aHJlYWQABwNlbnYqZW1zY3JpcHRlbl9zZXRfa2V5cHJlc3NfY2FsbGJhY2tfb25fdGhyZWFkAAcDZW52LGVtc2NyaXB0ZW5fc2V0X3RvdWNoc3RhcnRfY2FsbGJhY2tfb25fdGhyZWFkAAcDZW52K2Vtc2NyaXB0ZW5fc2V0X3RvdWNobW92ZV9jYWxsYmFja19vbl90aHJlYWQABwNlbnYqZW1zY3JpcHRlbl9zZXRfdG91Y2hlbmRfY2FsbGJhY2tfb25fdGhyZWFkAAcDZW52LWVtc2NyaXB0ZW5fc2V0X3RvdWNoY2FuY2VsX2NhbGxiYWNrX29uX3RocmVhZAAHA2VudjNlbXNjcmlwdGVuX3NldF9wb2ludGVybG9ja2NoYW5nZV9jYWxsYmFja19vbl90aHJlYWQABwNlbnYyZW1zY3JpcHRlbl9zZXRfcG9pbnRlcmxvY2tlcnJvcl9jYWxsYmFja19vbl90aHJlYWQABwNlbnYnZW1zY3JpcHRlbl9zZXRfZm9jdXNfY2FsbGJhY2tfb25fdGhyZWFkAAcDZW52JmVtc2NyaXB0ZW5fc2V0X2JsdXJfY2FsbGJhY2tfb25fdGhyZWFkAAcDZW52IXNhcHBfanNfYWRkX2JlZm9yZXVubG9hZF9saXN0ZW5lcgACA2Vudh5zYXBwX2pzX2FkZF9jbGlwYm9hcmRfbGlzdGVuZXIAAgNlbnYfc2FwcF9qc19hZGRfZHJhZ25kcm9wX2xpc3RlbmVycwAAA2VudjJlbXNjcmlwdGVuX3NldF93ZWJnbGNvbnRleHRsb3N0X2NhbGxiYWNrX29uX3RocmVhZAAHA2VudjZlbXNjcmlwdGVuX3NldF93ZWJnbGNvbnRleHRyZXN0b3JlZF9jYWxsYmFja19vbl90aHJlYWQABwNlbnYaZW1zY3JpcHRlbl9wZXJmb3JtYW5jZV9ub3cADANlbnYbZW1zY3JpcHRlbl9jYW5jZWxfbWFpbl9sb29wAAIDZW52G3NhcHBfanNfcmVxdWVzdF9wb2ludGVybG9jawACA2VudiRzYXBwX2pzX3JlbW92ZV9iZWZvcmV1bmxvYWRfbGlzdGVuZXIAAgNlbnYhc2FwcF9qc19yZW1vdmVfY2xpcGJvYXJkX2xpc3RlbmVyAAIDZW52InNhcHBfanNfcmVtb3ZlX2RyYWduZHJvcF9saXN0ZW5lcnMAAANlbnYKZ2xHZXRFcnJvcgAFA2VudhFnbEdlblZlcnRleEFycmF5cwADA2VudhFnbEJpbmRWZXJ0ZXhBcnJheQAAA2Vudg1nbFBpeGVsU3RvcmVpAAMDZW52DGdsR2V0U3RyaW5naQAEA2VudhpnbERpc2FibGVWZXJ0ZXhBdHRyaWJBcnJheQAAA2VudghnbEVuYWJsZQAAA2VudgtnbERlcHRoRnVuYwAAA2VudgtnbERlcHRoTWFzawAAA2VudglnbERpc2FibGUAAANlbnYNZ2xTdGVuY2lsRnVuYwAJA2VudgtnbFN0ZW5jaWxPcAAJA2Vudg1nbFN0ZW5jaWxNYXNrAAADZW52E2dsQmxlbmRGdW5jU2VwYXJhdGUACANlbnYXZ2xCbGVuZEVxdWF0aW9uU2VwYXJhdGUAAwNlbnYMZ2xCbGVuZENvbG9yAA4DZW52C2dsQ29sb3JNYXNrAAgDZW52D2dsUG9seWdvbk9mZnNldAAPA2VudgtnbEZyb250RmFjZQAAA2VudgpnbEN1bGxGYWNlAAADZW52DGdsQmluZEJ1ZmZlcgADA2VudhBnbEJpbmRCdWZmZXJCYXNlAAkDZW52D2dsQWN0aXZlVGV4dHVyZQAAA2Vudg1nbEJpbmRUZXh0dXJlAAMDZW52DWdsQmluZFNhbXBsZXIAAwNlbnYPZ2xEZWxldGVCdWZmZXJzAAMDZW52EGdsRGVsZXRlVGV4dHVyZXMAAwNlbnYVZ2xEZWxldGVSZW5kZXJidWZmZXJzAAMDZW52EGdsRGVsZXRlU2FtcGxlcnMAAwNlbnYPZ2xEZWxldGVQcm9ncmFtAAADZW52DGdsVXNlUHJvZ3JhbQAAA2VudhRnbERlbGV0ZUZyYW1lYnVmZmVycwADA2VudhRnbERlbGV0ZVZlcnRleEFycmF5cwADA2VudgxnbEdlbkJ1ZmZlcnMAAwNlbnYMZ2xCdWZmZXJEYXRhAAgDZW52D2dsQnVmZmVyU3ViRGF0YQAIA2Vudg9nbENyZWF0ZVByb2dyYW0ABQNlbnYOZ2xBdHRhY2hTaGFkZXIAAwNlbnYNZ2xMaW5rUHJvZ3JhbQAAA2Vudg5nbERlbGV0ZVNoYWRlcgAAA2Vudg5nbEdldFByb2dyYW1pdgAJA2VudhNnbEdldFByb2dyYW1JbmZvTG9nAAgDZW52FGdsR2V0VW5pZm9ybUxvY2F0aW9uAAQDZW52C2dsVW5pZm9ybTFpAAMDZW52DmdsQ3JlYXRlU2hhZGVyAAEDZW52DmdsU2hhZGVyU291cmNlAAgDZW52D2dsQ29tcGlsZVNoYWRlcgAAA2Vudg1nbEdldFNoYWRlcml2AAkDZW52EmdsR2V0U2hhZGVySW5mb0xvZwAIA2VudhNnbEdldEF0dHJpYkxvY2F0aW9uAAQDZW52EWdsQmluZEZyYW1lYnVmZmVyAAMDZW52CmdsVmlld3BvcnQACANlbnYJZ2xTY2lzc29yAAgDZW52D2dsQ2xlYXJCdWZmZXJmdgAJA2Vudg9nbENsZWFyQnVmZmVyZmkAEANlbnYPZ2xDbGVhckJ1ZmZlcml2AAkDZW52FWdsU3RlbmNpbEZ1bmNTZXBhcmF0ZQAIA2VudhNnbFN0ZW5jaWxPcFNlcGFyYXRlAAgDZW52FWdsVmVydGV4QXR0cmliUG9pbnRlcgARA2VudhVnbFZlcnRleEF0dHJpYkRpdmlzb3IAAwNlbnYZZ2xFbmFibGVWZXJ0ZXhBdHRyaWJBcnJheQAAA2VudhdnbERyYXdFbGVtZW50c0luc3RhbmNlZAASA2Vudg5nbERyYXdFbGVtZW50cwAIA2VudhVnbERyYXdBcnJheXNJbnN0YW5jZWQACANlbnYMZ2xEcmF3QXJyYXlzAAkDZW52DGdsUmVhZEJ1ZmZlcgAAA2VudhFnbEJsaXRGcmFtZWJ1ZmZlcgATA2VudhdnbEludmFsaWRhdGVGcmFtZWJ1ZmZlcgAJA2VudglfYWJvcnRfanMAAgNlbnYVX2Vtc2NyaXB0ZW5fbWVtY3B5X2pzAAkDZW52FmVtc2NyaXB0ZW5fcmVzaXplX2hlYXAAAQOsAqoCAgICAgIJAgAAAQAGBQABAwUAAgMBCAkUBAAABgICAAIVBQUFBQUCAQQDAQENBQUFBQUFBQUFBQUFBQUAAwMDAAADAQACAAICAAAAAAAAAAIAAAUIBQEGBQUEBAEEBAQEBAQEBAQEAwMBAwQDAwEDBAMDAQEDBgEBAQADAQADAgQEAQUAAAEAAAABAQEJCQkCAgICAgICAhYKBgYAAAMABgYGBgYGBgYGCwICAgIBAAAAAQIBAQEBAQsCAgABFwsBAQECAgAJAAICAgICAgAAAAAAAAAAAAAAAAAAAAAAAwAAAAQBAQADAAgBAAYGBAYIBAMEAQYBAQEBAQQEAQEBAQEBAwIGBhgEAQYGBAQGBgQEBAQEBQUBAQYAAAUCBQUFAAAFAgEAAQABBQQFAXABEhIFBgEB7gXuBQbGAR1/AUGAgAQLfwFBAAt/AUEAC38BQQALfwBB8PgGC38AQZGsBwt/AEHe+gYLfwBBvfwGC38AQZL9Bgt/AEGW/wYLfwBB3f8GC38AQcSDBwt/AEGujQcLfwBB7Y4HC38AQceUBwt/AEHOlwcLfwBBxJoHC38AQdWbBwt/AEGhnAcLfwBBl6EHC38AQY+iBwt/AEH+pQcLfwBB/6YHC38AQcinBwt/AEGnqgcLfwBB8PgGC38AQZGsBwt/AEGRrAcLfwBBtawHCwf4CSwGbWVtb3J5AgARX193YXNtX2NhbGxfY3RvcnMAdRlfX2luZGlyZWN0X2Z1bmN0aW9uX3RhYmxlAQASX3NhcHBfZW1zY19vbnBhc3RlAH8eX3NhcHBfaHRtbDVfZ2V0X2Fza19sZWF2ZV9zaXRlAIUBFV9zYXBwX2Vtc2NfYmVnaW5fZHJvcACGAQ9fc2FwcF9lbXNjX2Ryb3AAiAETX3NhcHBfZW1zY19lbmRfZHJvcACLARpfc2FwcF9lbXNjX2ludm9rZV9mZXRjaF9jYgCMARBfX21haW5fYXJnY19hcmd2AI0BBm1hbGxvYwCMAxhfX2VtX2pzX19fZGtfZ3JhYl9jYW52YXMDBBdfX2VtX2xpYl9kZXBzX3Nva29sX2FwcAMFKl9fZW1fanNfX3NhcHBfanNfYWRkX2JlZm9yZXVubG9hZF9saXN0ZW5lcgMGLV9fZW1fanNfX3NhcHBfanNfcmVtb3ZlX2JlZm9yZXVubG9hZF9saXN0ZW5lcgMHJ19fZW1fanNfX3NhcHBfanNfYWRkX2NsaXBib2FyZF9saXN0ZW5lcgMIKl9fZW1fanNfX3NhcHBfanNfcmVtb3ZlX2NsaXBib2FyZF9saXN0ZW5lcgMJIF9fZW1fanNfX3NhcHBfanNfd3JpdGVfY2xpcGJvYXJkAwooX19lbV9qc19fc2FwcF9qc19hZGRfZHJhZ25kcm9wX2xpc3RlbmVycwMLIl9fZW1fanNfX3NhcHBfanNfZHJvcHBlZF9maWxlX3NpemUDDCNfX2VtX2pzX19zYXBwX2pzX2ZldGNoX2Ryb3BwZWRfZmlsZQMNK19fZW1fanNfX3NhcHBfanNfcmVtb3ZlX2RyYWduZHJvcF9saXN0ZW5lcnMDDhVfX2VtX2pzX19zYXBwX2pzX2luaXQDDyRfX2VtX2pzX19zYXBwX2pzX3JlcXVlc3RfcG9pbnRlcmxvY2sDECFfX2VtX2pzX19zYXBwX2pzX2V4aXRfcG9pbnRlcmxvY2sDERtfX2VtX2pzX19zYXBwX2pzX3NldF9jdXJzb3IDEh5fX2VtX2pzX19zYXBwX2pzX2NsZWFyX2Zhdmljb24DExxfX2VtX2pzX19zYXBwX2pzX3NldF9mYXZpY29uAxQhX19lbV9qc19fX2RrX3NhcHBfZ2V0X2NhbnZhc19zaXplAxUhX19lbV9qc19fX2RrX3NhcHBfc2V0X2NhbnZhc19zaXplAxYaX19lbV9qc19fX2RrX3NldHVwX2NvbnRleHQDFxRfX2VtX2pzX19zbG9nX2pzX2xvZwMYBmZmbHVzaACbAxVlbXNjcmlwdGVuX3N0YWNrX2luaXQAkQMZZW1zY3JpcHRlbl9zdGFja19nZXRfZnJlZQCSAxllbXNjcmlwdGVuX3N0YWNrX2dldF9iYXNlAJMDGGVtc2NyaXB0ZW5fc3RhY2tfZ2V0X2VuZACUAxlfZW1zY3JpcHRlbl9zdGFja19yZXN0b3JlAJwDF19lbXNjcmlwdGVuX3N0YWNrX2FsbG9jAJ0DHGVtc2NyaXB0ZW5fc3RhY2tfZ2V0X2N1cnJlbnQAngMNX19zdGFydF9lbV9qcwMZDF9fc3RvcF9lbV9qcwMaE19f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MV9nZXRfcmVzb2x2ZV92aWV3AF9zZ19nbF9kcmF3AHNnX2RyYXcAc2FwcF9kM2QxMV9nZXRfZGV2aWNlX2NvbnRleHQAV0lOMzJfRFVNTVlfQ09OVEVYVF9TRVRfUElYRUxGT1JNQVRfRkFJTEVEOiBmYWlsZWQgdG8gc2V0IHBpeGVsIGZvcm1hdCBmb3IgZHVtbXkgR0wgY29udGV4dABXSU4zMl9DUkVBVEVfRFVNTVlfQ09OVEVYVF9GQUlMRUQ6IGZhaWxlZCB0byBjcmVhdGUgZHVtbXkgR0wgY29udGV4dABfc2FwcF90aW1pbmdfcHV0AFZBTElEQVRFX1NIQURFUkRFU0NfVUJfU1REMTQwX0FSUkFZX1RZUEU6IHVuaWZvcm0gYXJyYXlzIG9ubHkgYWxsb3dlZCBmb3IgRkxPQVQ0LCBJTlQ0LCBNQVQ0IGluIHN0ZDE0MCBsYXlvdXQAZHN0AEluc2VydABWQUxJREFURV9BVUJfTk9fVUJfQVRfU0xPVDogc2dfYXBwbHlfdW5pZm9ybXM6IG5vIHVuaWZvcm0gYmxvY2sgZGVjbGFyYXRpb24gYXQgdGhpcyBzaGFkZXIgc3RhZ2UgVUIgc2xvdABWQUxJREFURV9BUElQX1NBTVBMRV9DT1VOVDogc2dfYXBwbHlfcGlwZWxpbmU6IHBpcGVsaW5lIE1TQUEgc2FtcGxlIGNvdW50IGRvZXNuJ3QgbWF0Y2ggcmVuZGVyIHBhc3MgYXR0YWNobWVudCBzYW1wbGUgY291bnQAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0RFUFRIX0lNQUdFX1NBTVBMRV9DT1VOVDogcGFzcyBkZXB0aCBhdHRhY2htZW50IHNhbXBsZSBjb3VudCBtdXN0IG1hdGNoIGNvbG9yIGF0dGFjaG1lbnQgc2FtcGxlIGNvdW50AFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19JTUFHRV9TQU1QTEVfQ09VTlRTOiBhbGwgcGFzcyBhdHRhY2htZW50cyBtdXN0IGhhdmUgdGhlIHNhbWUgc2FtcGxlIGNvdW50AFdJTjMyX0RVTU1ZX0NPTlRFWFRfTUFLRV9DVVJSRU5UX0ZBSUxFRDogZmFpbGVkIHRvIG1ha2UgZHVtbXkgR0wgY29udGV4dCBjdXJyZW50AF9zZ191bmlmb3JtX2FsaWdubWVudABfc2dfc2hhZGVyX2NvbW1vbl9pbml0AF9zZ19waXBlbGluZV9jb21tb25faW5pdABzZ19jb21taXQAX3NnX3ZhbGlkYXRlX3NldF9zbG90X2JpdABBcnJvd1JpZ2h0AEFsdFJpZ2h0AFNoaWZ0UmlnaHQAQnJhY2tldFJpZ2h0AENvbnRyb2xSaWdodABNZXRhUmlnaHQAQXJyb3dMZWZ0AEFsdExlZnQAU2hpZnRMZWZ0AEJyYWNrZXRMZWZ0AENvbnRyb2xMZWZ0AE1ldGFMZWZ0AFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRVhQRUNUX0NPTE9SRk9STUFUX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4uY29sb3JfZm9ybWF0IHRvIGJlIHVuc2V0AFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRVhQRUNUX0RFUFRIRk9STUFUX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4uZGVwdGhfZm9ybWF0IHRvIGJlIHVuc2V0AHViX2Rlc2MtPnNpemUgPT0gKHNpemVfdCljdXJfdW5pZm9ybV9vZmZzZXQAX3NnX2dsX2J1ZmZlcl90YXJnZXQAV0lOMzJfRDNEMTFfR0VUX0lEWEdJRkFDVE9SWV9GQUlMRUQ6IGNvdWxkIG5vdCBvYnRhaW4gSURYR0lGYWN0b3J5IG9iamVjdABXSU4zMl9EM0QxMV9HRVRfSURYR0lBREFQVEVSX0ZBSUxFRDogY291bGQgbm90IG9idGFpbiBJRFhHSUFkYXB0ZXIgb2JqZWN0AFdHUFVfU1dBUENIQUlOX0NSRUFURV9TV0FQQ0hBSU5fRkFJTEVEOiB3Z3B1OiBmYWlsZWQgdG8gY3JlYXRlIHN3YXBjaGFpbiBvYmplY3QATnVtcGFkU3VidHJhY3QAX2NvbG9yX2J1ZmZlcl9mbG9hdABfY29sb3JfYnVmZmVyX2hhbGZfZmxvYXQAVkFMSURBVEVfQVBJUF9DT0xPUl9GT1JNQVQ6IHNnX2FwcGx5X3BpcGVsaW5lOiBwaXBlbGluZSBjb2xvciBhdHRhY2htZW50IHBpeGVsIGZvcm1hdCBkb2Vzbid0IG1hdGNoIHBhc3MgY29sb3IgYXR0YWNobWVudCBwaXhlbCBmb3JtYXQAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX1JFU09MVkVfSU1BR0VfRk9STUFUOiBwYXNzIHJlc29sdmUgYXR0YWNobWVudCBwaXhlbCBmb3JtYXQgbXVzdCBtYXRjaCBjb2xvciBhdHRhY2htZW50IHBpeGVsIGZvcm1hdABWQUxJREFURV9BUElQX0RFUFRIX0ZPUk1BVDogc2dfYXBwbHlfcGlwZWxpbmU6IHBpcGVsaW5lIGRlcHRoIHBpeGVsX2Zvcm1hdCBkb2Vzbid0IG1hdGNoIHBhc3MgZGVwdGggYXR0YWNobWVudCBwaXhlbCBmb3JtYXQAVkFMSURBVEVfSU1BR0VERVNDX05PX01TQUFfUlRfU1VQUE9SVDogTVNBQSBub3Qgc3VwcG9ydGVkIGZvciB0aGlzIHBpeGVsIGZvcm1hdABWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfQ09MT1JfSU5WX1BJWEVMRk9STUFUOiBwYXNzIGNvbG9yLWF0dGFjaG1lbnQgaW1hZ2VzIG11c3QgYmUgcmVuZGVyYWJsZSBjb2xvciBwaXhlbCBmb3JtYXQAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0RFUFRIX0lOVl9QSVhFTEZPUk1BVDogcGFzcyBkZXB0aC1hdHRhY2htZW50IGltYWdlIG11c3QgYmUgZGVwdGggb3IgZGVwdGgtc3RlbmNpbCBwaXhlbCBmb3JtYXQAV0lOMzJfV0dMX1NFVF9QSVhFTEZPUk1BVF9GQUlMRUQ6IGZhaWxlZCB0byBzZXQgc2VsZWN0ZWQgcGl4ZWwgZm9ybWF0AFdJTjMyX1dHTF9GSU5EX1BJWEVMRk9STUFUX0ZBSUxFRDogZmFpbGVkIHRvIGZpbmQgbWF0Y2hpbmcgV0dMIHBpeGVsIGZvcm1hdABWQUxJREFURV9JTUFHRURFU0NfREVQVEhfM0RfSU1BR0U6IDNEIGltYWdlcyBjYW5ub3QgaGF2ZSBhIGRlcHRoL3N0ZW5jaWwgaW1hZ2UgZm9ybWF0AF9zZ19hdHRhY2htZW50c19hdABfc2dfc2FtcGxlcl9hdABfc2dfYnVmZmVyX2F0AF9zZ19zaGFkZXJfYXQAX3NnX3BpcGVsaW5lX2F0AF9zZ19pbWFnZV9hdABWQUxJREFURV9QSVBFTElORURFU0NfTk9fQ09OVF9BVFRSUzogc2dfcGlwZWxpbmVfZGVzYy5sYXlvdXQuYXR0cnMgaXMgbm90IGNvbnRpbnVvdXMATWludXMAYXR0cwBCRUdJTlBBU1NfQVRUQUNITUVOVF9JTlZBTElEOiBzZ19iZWdpbl9wYXNzOiBhbiBhdHRhY2htZW50IHdhcyBwcm92aWRlZCB0aGF0IG5vIGxvbmdlciBleGlzdHMAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX05PX0NPTlRfQ09MT1JfQVRUUzogY29sb3IgYXR0YWNobWVudHMgbXVzdCBvY2N1cHkgY29udGludW91cyBzbG90cwBWQUxJREFURV9TSEFERVJERVNDX05PX0NPTlRfVUJfTUVNQkVSUzogdW5pZm9ybSBibG9jayBtZW1iZXJzIG11c3Qgb2NjdXB5IGNvbnRpbnVvdXMgc2xvdHMATElOVVhfR0xYX0xPQURfRU5UUllfUE9JTlRTX0ZBSUxFRDogZmFpbGVkIHRvIGxvYWQgR0xYIGVudHJ5IHBvaW50cwBfc2dfbG9va3VwX2F0dGFjaG1lbnRzAF9zZ19nbF9kaXNjYXJkX2F0dGFjaG1lbnRzAFZBTElEQVRFX0FQSVBfQVRUX0NPVU5UOiBzZ19hcHBseV9waXBlbGluZTogbnVtYmVyIG9mIHBpcGVsaW5lIGNvbG9yIGF0dGFjaG1lbnRzIGRvZXNuJ3QgbWF0Y2ggbnVtYmVyIG9mIHBhc3MgY29sb3IgYXR0YWNobWVudHMAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX05PX0FUVEFDSE1FTlRTOiBzZ19hdHRhY2htZW50c19kZXNjIG5vIGNvbG9yIG9yIGRlcHRoLXN0ZW5jaWwgYXR0YWNobWVudHMAV0dQVV9BVFRBQ0hNRU5UU19DUkVBVEVfVEVYVFVSRV9WSUVXX0ZBSUxFRDogd2dwdVRleHR1cmVDcmVhdGVWaWV3KCkgZmFpbGVkIGluIGNyZWF0ZSBhdHRhY2htZW50cwBfc2dfcGFzc19hY3Rpb25fZGVmYXVsdHMAX3NhcHBfZGVzY19kZWZhdWx0cwBfc2dfcGlwZWxpbmVfZGVzY19kZWZhdWx0cwBfc2dfZ2xfaW5pdF9saW1pdHMAX3NnX3ZhbGlkYXRlX3Nsb3RfYml0cwBfc2dfZ2xfYmVnaW5fcGFzcwBzZ19iZWdpbl9wYXNzACFfc2cuY3VyX3Bhc3MuaW5fcGFzcwBfc2dfZ2xfZW5kX3Bhc3MAc2dfZW5kX3Bhc3MAYXR0cl9sb2MgPCAoR0xpbnQpX3NnLmxpbWl0cy5tYXhfdmVydGV4X2F0dHJzAHBvb2wgJiYgcG9vbC0+Z2VuX2N0cnMAVkFMSURBVEVfQUJORF9FWFBFQ1RFRF9OT05GSUxURVJJTkdfU0FNUExFUjogc2dfYXBwbHlfYmluZGluZ3M6IHNoYWRlciBleHBlY3RlZCBTR19TQU1QTEVSVFlQRV9OT05GSUxURVJJTkcsIGJ1dCBzYW1wbGVyIGhhcyBTR19GSUxURVJfTElORUFSIGZpbHRlcnMAX3NnX25vdGlmeV9jb21taXRfbGlzdGVuZXJzAF9zZ19zZXR1cF9jb21taXRfbGlzdGVuZXJzAF9zZ19kaXNjYXJkX2NvbW1pdF9saXN0ZW5lcnMAVkFMSURBVEVfU0hBREVSREVTQ19TQU1QTEVSX1dHU0xfR1JPVVAxX0JJTkRJTkdfQ09MTElTSU9OOiBzYW1wbGVyICd3Z3NsX2dyb3VwMV9iaW5kaW5nX24nIG11c3QgYmUgdW5pcXVlIGFjcm9zcyBhbGwgaW1hZ2VzLCBzYW1wbGVycyBhbmQgc3RvcmFnZSBidWZmZXJzAFZBTElEQVRFX1NIQURFUkRFU0NfU1RPUkFHRUJVRkZFUl9XR1NMX0dST1VQMV9CSU5ESU5HX0NPTExJU0lPTjogc3RvcmFnZSBidWZmZXIgJ3dnc2xfZ3JvdXAxX2JpbmRpbmdfbicgbXVzdCBiZSB1bmlxdWUgYWNyb3NzIGFsbCBpbWFnZXMsIHNhbXBsZXJzIGFuZCBzdG9yYWdlIGJ1ZmZlcnMAVkFMSURBVEVfU0hBREVSREVTQ19JTUFHRV9XR1NMX0dST1VQMV9CSU5ESU5HX0NPTExJU0lPTjogaW1hZ2UgJ3dnc2xfZ3JvdXAxX2JpbmRpbmdfbicgbXVzdCBiZSB1bmlxdWUgYWNyb3NzIGFsbCBpbWFnZXMsIHNhbXBsZXJzIGFuZCBzdG9yYWdlIGJ1ZmZlcnMAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX01JUExFVkVMOiBwYXNzIGF0dGFjaG1lbnQgbWlwIGxldmVsIGlzIGJpZ2dlciB0aGFuIGltYWdlIGhhcyBtaXBtYXBzAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19ERVBUSF9NSVBMRVZFTDogcGFzcyBkZXB0aCBhdHRhY2htZW50IG1pcCBsZXZlbCBpcyBiaWdnZXIgdGhhbiBpbWFnZSBoYXMgbWlwbWFwcwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfUkVTT0xWRV9NSVBMRVZFTDogcGFzcyByZXNvbHZlIGF0dGFjaG1lbnQgbWlwIGxldmVsIGlzIGJpZ2dlciB0aGFuIGltYWdlIGhhcyBtaXBtYXBzAFZBTElEQVRFX1NIQURFUkRFU0NfTk9fVUJfTUVNQkVSUzogR0wgYmFja2VuZCByZXF1aXJlcyB1bmlmb3JtIGJsb2NrIG1lbWJlciBkZWNsYXJhdGlvbnMAMCA9PSBfc2cuY29tbWl0X2xpc3RlbmVycy5pdGVtcwAwICE9IF9zZy5jb21taXRfbGlzdGVuZXJzLml0ZW1zAF9zZ19zZXR1cF9wb29scwBfc2dfZGlzY2FyZF9wb29scwAwID09IF9zYXBwLmRlZmF1bHRfaWNvbl9waXhlbHMAMCAhPSBfc2FwcC5kZWZhdWx0X2ljb25fcGl4ZWxzAFZBTElEQVRFX1NIQURFUkRFU0NfVUJfV0dTTF9HUk9VUDBfQklORElOR19DT0xMSVNJT046IHVuaWZvcm0gYmxvY2sgJ3dnc2xfZ3JvdXAwX2JpbmRpbmdfbicgbXVzdCBiZSB1bmlxdWUgYWNyb3NzIGFsbCB1bmlmb3JtIGJsb2NrcwBfc2dfZ2xfYXBwbHlfYmluZGluZ3MAc2dfYXBwbHlfYmluZGluZ3MAX3NnX3ZhbGlkYXRlX2FwcGx5X2JpbmRpbmdzAF9zZ19nbF9jYWNoZV9jbGVhcl90ZXh0dXJlX3NhbXBsZXJfYmluZGluZ3MARFJBV19XSVRIT1VUX0JJTkRJTkdTOiBhdHRlbXB0aW5nIHRvIGRyYXcgd2l0aG91dCByZXNvdXJjZSBiaW5kaW5ncwBMSU5VWF9HTFhfTk9fR0xYRkJDT05GSUdTOiBnbFhHZXRGQkNvbmZpZ3MoKSByZXR1cm5lZCBubyBjb25maWdzAExJTlVYX0VHTF9OT19DT05GSUdTOiBlZ2xDaG9vc2VDb25maWcoKSByZXR1cm5lZCBubyBjb25maWdzAF9zYXBwLmRyb3AubnVtX2ZpbGVzIDw9IF9zYXBwLmRyb3AubWF4X2ZpbGVzAFZBTElEQVRFX1NIQURFUkRFU0NfU1RPUkFHRUJVRkZFUl9HTFNMX0JJTkRJTkdfQ09MTElTSU9OOiBzdG9yYWdlIGJ1ZmZlciAnZ2xzbF9iaW5kaW5nX24nIG11c3QgYmUgdW5pcXVlIGFjcm9zcyBzaGFkZXIgc3RhZ2VzAHRyaWFuZ2xlLXZlcnRpY2VzAGNhbnZhcwBfc2FwcF9kcm9wcGVkX2ZpbGVfcGF0aF9wdHIAZGVzYy0+ZGF0YS5wdHIAV0lOMzJfV0dMX0RFU0NSSUJFX1BJWEVMRk9STUFUX0ZBSUxFRDogZmFpbGVkIHRvIGdldCBwaXhlbCBmb3JtYXQgZGVzY3JpcHRvcgBfc2dfZ2xfYmxlbmRfZmFjdG9yAGVycm9yAEVudGVyADAgPT0gX3NnLmNvbW1pdF9saXN0ZW5lcnMudXBwZXIASURFTlRJQ0FMX0NPTU1JVF9MSVNURU5FUjogYXR0ZW1wdGluZyB0byBhZGQgaWRlbnRpY2FsIGNvbW1pdCBsaXN0ZW5lcgBfc2dfZ2xfY2FjaGVfaW52YWxpZGF0ZV90ZXh0dXJlX3NhbXBsZXIAX3NnX2dsX2NhY2hlX2JpbmRfdGV4dHVyZV9zYW1wbGVyAF9zZ19nbF9kaXNjYXJkX3NhbXBsZXIAVkFMSURBVEVfU0hBREVSREVTQ19DT01QQVJJU09OX1NBTVBMRVJfUkVRVUlSRUQ6IGltYWdlIHNhbXBsZSB0eXBlIERFUFRIIGNhbiBvbmx5IGJlIHVzZWQgd2l0aCBDT01QQVJJU09OIHNhbXBsZXIAVkFMSURBVEVfU0hBREVSREVTQ19OT05GSUxURVJJTkdfU0FNUExFUl9SRVFVSVJFRDogaW1hZ2Ugc2FtcGxlIHR5cGUgVU5GSUxURVJBQkxFX0ZMT0FULCBVSU5ULCBTSU5UIGNhbiBvbmx5IGJlIHVzZWQgd2l0aCBOT05GSUxURVJJTkcgc2FtcGxlcgBzYXBwX2dsX2dldF9mcmFtZWJ1ZmZlcgBfc2dfaW5pdF9idWZmZXIAX3NhcHBfY2xlYXJfZHJvcF9idWZmZXIAX3NnX2dsX2NyZWF0ZV9idWZmZXIAc2dfbWFrZV9idWZmZXIAX3NnX2dsX2NhY2hlX2JpbmRfc3RvcmFnZV9idWZmZXIAX3NnX2dsX2Rpc2NhcmRfYnVmZmVyAF9zZ19nbF9jYWNoZV9iaW5kX2J1ZmZlcgBfc2FwcC5kcm9wLmJ1ZmZlcgBfc2FwcC5jbGlwYm9hcmQuYnVmZmVyAFZBTElEQVRFX0FQUEVOREJVRl9VU0FHRTogc2dfYXBwZW5kX2J1ZmZlcjogY2Fubm90IGFwcGVuZCB0byBpbW11dGFibGUgYnVmZmVyAFZBTElEQVRFX1VQREFURUJVRl9VU0FHRTogc2dfdXBkYXRlX2J1ZmZlcjogY2Fubm90IHVwZGF0ZSBpbW11dGFibGUgYnVmZmVyAFZBTElEQVRFX0FCTkRfU1RPUkFHRUJVRkZFUl9CSU5ESU5HX0JVRkZFUlRZUEU6IHNnX2FwcGx5X2JpbmRpbmdzOiBidWZmZXIgYm91bmQgc3RvcmFnZSBidWZmZXIgc2xvdCBpcyBub3Qgb2YgdHlwZSBzdG9yYWdlIGJ1ZmZlcgBDTElQQk9BUkRfU1RSSU5HX1RPT19CSUc6IGNsaXBib2FyZCBzdHJpbmcgZGlkbid0IGZpdCBpbnRvIGNsaXBib2FyZCBidWZmZXIAX3NnX2luaXRfc2hhZGVyAF9zZ19sb29rdXBfc2hhZGVyAF9zZ19nbF9jcmVhdGVfc2hhZGVyAF9zZ19nbF9jb21waWxlX3NoYWRlcgB0cmlhbmdsZV9zaGFkZXIAc2dfbWFrZV9zaGFkZXIAX3NnX2dsX2Rpc2NhcmRfc2hhZGVyAGJuZC0+cGlwICYmIGJuZC0+cGlwLT5zaGFkZXIAVkFMSURBVEVfUElQRUxJTkVERVNDX0FUVFJfU0VNQU5USUNTOiBEM0QxMSBtaXNzaW5nIHZlcnRleCBhdHRyaWJ1dGUgc2VtYW50aWNzIGluIHNoYWRlcgBfdGV4dHVyZV9mbG9hdF9saW5lYXIAX3NhcHBfY2xlYXIAX3NnX2NsZWFyAHNnX3NldHVwAHNhcHAAc29rb2xfYXBwAF9zYXBwX2Vtc2NfZHJvcABfc2dfZ2xfc3RlbmNpbF9vcABfc2dfZ2xfYmxlbmRfb3AAc21wAHBpcABBcnJvd1VwAFBhZ2VVcABWQUxJREFURV9TSEFERVJERVNDX1VCX1NJWkVfSVNfWkVSTzogYm91bmQgdW5pZm9ybSBibG9jayBzaXplIGNhbm5vdCBiZSB6ZXJvAGluZm8AVkFMSURBVEVfQUJORF9WQl9PVkVSRkxPVzogc2dfYXBwbHlfYmluZGluZ3M6IGJ1ZmZlciBpbiB2ZXJ0ZXggYnVmZmVyIHNsb3QgaXMgb3ZlcmZsb3duAFZBTElEQVRFX0FCTkRfSUJfT1ZFUkZMT1c6IHNnX2FwcGx5X2JpbmRpbmdzOiBidWZmZXIgaW4gaW5kZXggYnVmZmVyIHNsb3QgaXMgb3ZlcmZsb3duAEFycm93RG93bgBQYWdlRG93bgBXSU4zMl9XR0xfQ1JFQVRFX0NPTlRFWFRfQVRUUklCU19GQUlMRURfT1RIRVI6IENyZWF0ZUNvbnRleHRBdHRyaWJzQVJCIGZhaWxlZCBmb3Igb3RoZXIgcmVhc29uAFNlbWljb2xvbgBwb3NpdGlvbgBMSU5VWF9YMTFfRkFJTEVEX1RPX0JFQ09NRV9PV05FUl9PRl9DTElQQk9BUkQ6IFgxMTogRmFpbGVkIHRvIGJlY29tZSBvd25lciBvZiBjbGlwYm9hcmQgc2VsZWN0aW9uAGFjdGlvbgBMSU5VWF9HTFhfUVVFUllfVkVSU0lPTl9GQUlMRUQ6IGZhaWxlZCB0byBxdWVyeSBHTFggdmVyc2lvbgBfc2FwcF9zZXR1cF9kZWZhdWx0X2ljb24Ac2FwcF9zZXRfaWNvbgBfc2FwcF9lbXNjX3NldF9pY29uAG1haW4AV0dQVV9TV0FQQ0hBSU5fQ1JFQVRFX0RFUFRIX1NURU5DSUxfVEVYVFVSRV9GQUlMRUQ6IHdncHU6IGZhaWxlZCB0byBjcmVhdGUgZGVwdGgtc3RlbmNpbCB0ZXh0dXJlIGZvciBzd2FwY2hhaW4AV0dQVV9TV0FQQ0hBSU5fQ1JFQVRFX01TQUFfVEVYVFVSRV9GQUlMRUQ6IHdncHU6IGZhaWxlZCB0byBjcmVhdGUgbXNhYSB0ZXh0dXJlIGZvciBzd2FwY2hhaW4AV0dQVV9TV0FQQ0hBSU5fQ1JFQVRFX1NVUkZBQ0VfRkFJTEVEOiB3Z3B1OiBmYWlsZWQgdG8gY3JlYXRlIHN1cmZhY2UgZm9yIHN3YXBjaGFpbgBQcmludFNjcmVlbgAwID09IF9zZy5jb21taXRfbGlzdGVuZXJzLm51bQBfc2dfaW5pdF9wb29sAF9zZ19kaXNjYXJkX3Bvb2wAQ09NTUlUX0xJU1RFTkVSX0FSUkFZX0ZVTEw6IGNvbW1pdCBsaXN0ZW5lciBhcnJheSBmdWxsAFdJTjMyX0xPQURfT1BFTkdMMzJfRExMX0ZBSUxFRDogZmFpbGVkIGxvYWRpbmcgb3BlbmdsMzIuZGxsAEVxdWFsAE51bXBhZERlY2ltYWwAQ2Fwc0xvY2sATnVtTG9jawBTY3JvbGxMb2NrAE9LOiBPawBCYWNrc2xhc2gAU2xhc2gAL2hvbWUva29uc3VtZXIvRG9jdW1lbnRzL2Rldi9zb2tvbC1jYW52YXMtZXhhbXBsZS0xMTU0L3Nva29sL3Nva29sX2dmeC5oAC9ob21lL2tvbnN1bWVyL0RvY3VtZW50cy9kZXYvc29rb2wtY2FudmFzLWV4YW1wbGUtMTE1NC9zb2tvbC9zb2tvbF9hcHAuaABBTkRST0lEX1dSSVRFX01TR19GQUlMRUQ6IGZhaWxlZCB0byB3cml0ZSBtZXNzYWdlIGluIF9zYXBwX2FuZHJvaWRfbXNnACFzaGQtPmdsLnByb2cATElOVVhfR0xYX1JFUVVJUkVEX0VYVEVOU0lPTlNfTUlTU0lORzogR0xYIGV4dGVuc2lvbnMgQVJCX2NyZWF0ZV9jb250ZXh0IGFuZCBBUkJfY3JlYXRlX2NvbnRleHRfcHJvZmlsZSBtaXNzaW5nAFZBTElEQVRFX1NIQURFUkRFU0NfSU1BR0VfU0FNUExFUl9QQUlSX0dMU0xfTkFNRTogaW1hZ2Utc2FtcGxlci1wYWlyICdnbHNsX25hbWUnIG1pc3NpbmcAVkFMSURBVEVfU0hBREVSREVTQ19VQl9VTklGT1JNX0dMU0xfTkFNRTogdW5pZm9ybSBibG9jayBtZW1iZXIgJ2dsc2xfbmFtZScgbWlzc2luZwB3YXJuaW5nAF9zZ19nbF9jYWNoZV9yZXN0b3JlX2J1ZmZlcl9iaW5kaW5nAF9zZ19nbF9jYWNoZV9zdG9yZV9idWZmZXJfYmluZGluZwBpbWcATElOVVhfR0xYX05PX1NVSVRBQkxFX0dMWEZCQ09ORklHOiBmYWlsZWQgdG8gZmluZCBhIHN1aXRhYmxlIEdMWEZCQ29uZmlnAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19SRVNPTFZFX0xBWUVSOiBwYXNzIHJlc29sdmUgYXR0YWNobWVudCBpcyBhcnJheSB0ZXh0dXJlLCBidXQgbGF5ZXIgaW5kZXggaXMgdG9vIGJpZwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfTEFZRVI6IHBhc3MgYXR0YWNobWVudCBpbWFnZSBpcyBhcnJheSB0ZXh0dXJlLCBidXQgbGF5ZXIgaW5kZXggaXMgdG9vIGJpZwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfREVQVEhfTEFZRVI6IHBhc3MgZGVwdGggYXR0YWNobWVudCBpbWFnZSBpcyBhcnJheSB0ZXh0dXJlLCBidXQgbGF5ZXIgaW5kZXggaXMgdG9vIGJpZwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfUkVTT0xWRV9GQUNFOiBwYXNzIHJlc29sdmUgYXR0YWNobWVudCBpcyBjdWJlbWFwLCBidXQgZmFjZSBpbmRleCBpcyB0b28gYmlnAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19GQUNFOiBwYXNzIGF0dGFjaG1lbnQgaW1hZ2UgaXMgY3ViZW1hcCwgYnV0IGZhY2UgaW5kZXggaXMgdG9vIGJpZwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfREVQVEhfRkFDRTogcGFzcyBkZXB0aCBhdHRhY2htZW50IGltYWdlIGlzIGN1YmVtYXAsIGJ1dCBmYWNlIGluZGV4IGlzIHRvbyBiaWcAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX1JFU09MVkVfU0xJQ0U6IHBhc3MgcmVzb2x2ZSBhdHRhY2htZW50IGlzIDNkIHRleHR1cmUsIGJ1dCBzbGljZSB2YWx1ZSBpcyB0b28gYmlnAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19TTElDRTogcGFzcyBhdHRhY2htZW50IGltYWdlIGlzIDNkIHRleHR1cmUsIGJ1dCBzbGljZSB2YWx1ZSBpcyB0b28gYmlnAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19ERVBUSF9TTElDRTogcGFzcyBkZXB0aCBhdHRhY2htZW50IGltYWdlIGlzIDNkIHRleHR1cmUsIGJ1dCBzbGljZSB2YWx1ZSBpcyB0b28gYmlnAGdsX2J1ZgBfc2dfdmVydGV4Zm9ybWF0X2J5dGVzaXplAF9zZ19nbF92ZXJ0ZXhmb3JtYXRfc2l6ZQBfc2dfdW5pZm9ybV9zaXplAG9mZnNldCA8IF9zYXBwLmRyb3AuYnVmX3NpemUAVkFMSURBVEVfVVBEQVRFQlVGX1NJWkU6IHNnX3VwZGF0ZV9idWZmZXI6IHVwZGF0ZSBzaXplIGlzIGJpZ2dlciB0aGFuIGJ1ZmZlciBzaXplAFZBTElEQVRFX0FQUEVOREJVRl9TSVpFOiBzZ19hcHBlbmRfYnVmZmVyOiBvdmVyYWxsIGFwcGVuZGVkIHNpemUgaXMgYmlnZ2VyIHRoYW4gYnVmZmVyIHNpemUAVkFMSURBVEVfQlVGRkVSREVTQ19EQVRBX1NJWkU6IGltbXV0YWJsZSBidWZmZXIgZGF0YSBzaXplIGRpZmZlcnMgZnJvbSBidWZmZXIgc2l6ZQBWQUxJREFURV9TSEFERVJERVNDX1VCX1NJWkVfTUlTTUFUQ0g6IHNpemUgb2YgdW5pZm9ybSBibG9jayBtZW1iZXJzIGRvZXNuJ3QgbWF0Y2ggdW5pZm9ybSBibG9jayBzaXplAFZBTElEQVRFX0FVQl9TSVpFOiBzZ19hcHBseV91bmlmb3JtczogZGF0YSBzaXplIGRvZXNuJ3QgbWF0Y2ggZGVjbGFyZWQgdW5pZm9ybSBibG9jayBzaXplAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19JTUFHRV9TSVpFUzogYWxsIHBhc3MgYXR0YWNobWVudHMgbXVzdCBoYXZlIHRoZSBzYW1lIHNpemUAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX1JFU09MVkVfSU1BR0VfU0laRVM6IHBhc3MgcmVzb2x2ZSBhdHRhY2htZW50IHNpemUgbXVzdCBtYXRjaCBjb2xvciBhdHRhY2htZW50IGltYWdlIHNpemUAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0RFUFRIX0lNQUdFX1NJWkVTOiBwYXNzIGRlcHRoIGF0dGFjaG1lbnQgaW1hZ2Ugc2l6ZSBtdXN0IG1hdGNoIGNvbG9yIGF0dGFjaG1lbnQgaW1hZ2Ugc2l6ZQBWQUxJREFURV9JTUFHRURBVEFfREFUQV9TSVpFOiBzZ19pbWFnZV9kYXRhOiBkYXRhIHNpemUgZG9lc24ndCBtYXRjaCBleHBlY3RlZCBzdXJmYWNlIHNpemUAVkFMSURBVEVfQkVHSU5QQVNTX0FUVEFDSE1FTlRTX0VYSVNUUzogc2dfYmVnaW5fcGFzczogYXR0YWNobWVudHMgb2JqZWN0IG5vIGxvbmdlciBhbGl2ZQBWQUxJREFURV9BUElQX1NIQURFUl9FWElTVFM6IHNnX2FwcGx5X3BpcGVsaW5lOiBzaGFkZXIgb2JqZWN0IG5vIGxvbmdlciBhbGl2ZQBWQUxJREFURV9BQk5EX1BJUEVMSU5FX0VYSVNUUzogc2dfYXBwbHlfYmluZGluZ3M6IGN1cnJlbnRseSBhcHBsaWVkIHBpcGVsaW5lIG9iamVjdCBubyBsb25nZXIgYWxpdmUAVkFMSURBVEVfQVBJUF9QSVBFTElORV9FWElTVFM6IHNnX2FwcGx5X3BpcGVsaW5lOiBwaXBlbGluZSBvYmplY3Qgbm8gbG9uZ2VyIGFsaXZlAFZBTElEQVRFX0FQSVBfQ1VSUEFTU19BVFRBQ0hNRU5UU19FWElTVFM6IHNnX2FwcGx5X3BpcGVsaW5lOiBjdXJyZW50IHBhc3MgYXR0YWNobWVudHMgbm8gbG9uZ2VyIGFsaXZlAFZBTElEQVRFX0FCTkRfU01QX0VYSVNUUzogc2dfYXBwbHlfYmluZGluZ3M6IGJvdW5kIHNhbXBsZXIgbm8gbG9uZ2VyIGFsaXZlAFZBTElEQVRFX0FCTkRfVkJfRVhJU1RTOiBzZ19hcHBseV9iaW5kaW5nczogdmVydGV4IGJ1ZmZlciBubyBsb25nZXIgYWxpdmUAVkFMSURBVEVfQUJORF9JQl9FWElTVFM6IHNnX2FwcGx5X2JpbmRpbmdzOiBpbmRleCBidWZmZXIgbm8gbG9uZ2VyIGFsaXZlAFZBTElEQVRFX0FCTkRfU1RPUkFHRUJVRkZFUl9FWElTVFM6IHNnX2FwcGx5X2JpbmRpbmdzOiBib3VuZCBzdG9yYWdlIGJ1ZmZlciBubyBsb25nZXIgYWxpdmUAVkFMSURBVEVfQUJORF9JTUdfRVhJU1RTOiBzZ19hcHBseV9iaW5kaW5nczogYm91bmQgaW1hZ2Ugbm8gbG9uZ2VyIGFsaXZlAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19SRVNPTFZFX0lNQUdFX05PX1JUOiBwYXNzIHJlc29sdmUgYXR0YWNobWVudCBpbWFnZSBtdXN0IGhhdmUgcmVuZGVyX3RhcmdldD10cnVlAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19JTUFHRV9OT19SVDogcGFzcyBhdHRhY2htZW50IGltYWdlIG11c3QgYmUgaGF2ZSByZW5kZXJfdGFyZ2V0PXRydWUAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0RFUFRIX0lNQUdFX05PX1JUOiBwYXNzIGRlcHRoIGF0dGFjaG1lbnQgaW1hZ2UgbXVzdCBiZSBoYXZlIHJlbmRlcl90YXJnZXQ9dHJ1ZQBfc2FwcF9yaW5nX2VucXVldWUAX3NhcHBfcmluZ19kZXF1ZXVlAHBvb2wtPmZyZWVfcXVldWUAV0lOMzJfR0VUX1BJWEVMRk9STUFUX0FUVFJJQl9GQUlMRUQ6IGZhaWxlZCB0byBnZXQgV0dMIHBpeGVsIGZvcm1hdCBhdHRyaWJ1dGUAQmFja3F1b3RlAFF1b3RlAERlbGV0ZQBfc2FwcF9pbml0X3N0YXRlAF9zYXBwX2Rpc2NhcmRfc3RhdGUAVkFMSURBVEVfQVBJUF9TSEFERVJfVkFMSUQ6IHNnX2FwcGx5X3BpcGVsaW5lOiBzaGFkZXIgb2JqZWN0IG5vdCBpbiB2YWxpZCBzdGF0ZQBWQUxJREFURV9BQk5EX1BJUEVMSU5FX1ZBTElEOiBzZ19hcHBseV9iaW5kaW5nczogY3VycmVudGx5IGFwcGxpZWQgcGlwZWxpbmUgb2JqZWN0IG5vdCBpbiB2YWxpZCBzdGF0ZQBWQUxJREFURV9BUElQX1BJUEVMSU5FX1ZBTElEOiBzZ19hcHBseV9waXBlbGluZTogcGlwZWxpbmUgb2JqZWN0IG5vdCBpbiB2YWxpZCBzdGF0ZQBWQUxJREFURV9BUElQX0NVUlBBU1NfQVRUQUNITUVOVFNfVkFMSUQ6IHNnX2FwcGx5X3BpcGVsaW5lOiBjdXJyZW50IHBhc3MgYXR0YWNobWVudHMgbm90IGluIHZhbGlkIHN0YXRlAERFQUxMT0NfU0FNUExFUl9JTlZBTElEX1NUQVRFOiBzZ19kZWFsbG9jX3NhbXBsZXIoKTogc2FtcGxlciBtdXN0IGJlIGluIGFsbG9jIHN0YXRlAERFQUxMT0NfSU1BR0VfSU5WQUxJRF9TVEFURTogc2dfZGVhbGxvY19pbWFnZSgpOiBpbWFnZSBtdXN0IGJlIGluIGFsbG9jIHN0YXRlAFVOSU5JVF9BVFRBQ0hNRU5UU19JTlZBTElEX1NUQVRFOiBzZ191bmluaXRfYXR0YWNobWVudHMoKTogYXR0YWNobWVudHMgbXVzdCBiZSBpbiBWQUxJRCBvciBGQUlMRUQgc3RhdGUAVU5JTklUX1NBTVBMRVJfSU5WQUxJRF9TVEFURTogc2dfdW5pbml0X3NhbXBsZXIoKTogc2FtcGxlciBtdXN0IGJlIGluIFZBTElEIG9yIEZBSUxFRCBzdGF0ZQBVTklOSVRfQlVGRkVSX0lOVkFMSURfU1RBVEU6IHNnX3VuaW5pdF9idWZmZXIoKTogYnVmZmVyIG11c3QgYmUgaW4gVkFMSUQgb3IgRkFJTEVEIHN0YXRlAFVOSU5JVF9TSEFERVJfSU5WQUxJRF9TVEFURTogc2dfdW5pbml0X3NoYWRlcigpOiBzaGFkZXIgbXVzdCBiZSBpbiBWQUxJRCBvciBGQUlMRUQgc3RhdGUAVU5JTklUX1BJUEVMSU5FX0lOVkFMSURfU1RBVEU6IHNnX3VuaW5pdF9waXBlbGluZSgpOiBwaXBlbGluZSBtdXN0IGJlIGluIFZBTElEIG9yIEZBSUxFRCBzdGF0ZQBVTklOSVRfSU1BR0VfSU5WQUxJRF9TVEFURTogc2dfdW5pbml0X2ltYWdlKCk6IGltYWdlIG11c3QgYmUgaW4gVkFMSUQgb3IgRkFJTEVEIHN0YXRlAEZBSUxfQVRUQUNITUVOVFNfSU5WQUxJRF9TVEFURTogc2dfZmFpbF9hdHRhY2htZW50cygpOiBhdHRhY2htZW50cyBtdXN0IGJlIGluIEFMTE9DIHN0YXRlAERFQUxMT0NfQVRUQUNITUVOVFNfSU5WQUxJRF9TVEFURTogc2dfZGVhbGxvY19hdHRhY2htZW50cygpOiBhdHRhY2htZW50cyBtdXN0IGJlIGluIEFMTE9DIHN0YXRlAElOSVRfQVRUQUNITUVOVFNfSU5WQUxJRF9TVEFURTogc2dfaW5pdF9hdHRhY2htZW50cygpOiBwYXNzIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUASU5JVF9TQU1QTEVSX0lOVkFMSURfU1RBVEU6IHNnX2luaXRfc2FtcGxlcigpOiBzYW1wbGVyIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUARkFJTF9TQU1QTEVSX0lOVkFMSURfU1RBVEU6IHNnX2ZhaWxfc2FtcGxlcigpOiBzYW1wbGVyIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUASU5JVF9CVUZGRVJfSU5WQUxJRF9TVEFURTogc2dfaW5pdF9idWZmZXIoKTogYnVmZmVyIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUARkFJTF9CVUZGRVJfSU5WQUxJRF9TVEFURTogc2dfZmFpbF9idWZmZXIoKTogYnVmZmVyIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUAREVBTExPQ19CVUZGRVJfSU5WQUxJRF9TVEFURTogc2dfZGVhbGxvY19idWZmZXIoKTogYnVmZmVyIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUASU5JVF9TSEFERVJfSU5WQUxJRF9TVEFURTogc2dfaW5pdF9zaGFkZXIoKTogc2hhZGVyIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUARkFJTF9TSEFERVJfSU5WQUxJRF9TVEFURTogc2dfZmFpbF9zaGFkZXIoKTogc2hhZGVyIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUAREVBTExPQ19TSEFERVJfSU5WQUxJRF9TVEFURTogc2dfZGVhbGxvY19zaGFkZXIoKTogc2hhZGVyIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUASU5JVF9QSVBFTElORV9JTlZBTElEX1NUQVRFOiBzZ19pbml0X3BpcGVsaW5lKCk6IHBpcGVsaW5lIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUARkFJTF9QSVBFTElORV9JTlZBTElEX1NUQVRFOiBzZ19mYWlsX3BpcGVsaW5lKCk6IHBpcGVsaW5lIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUAREVBTExPQ19QSVBFTElORV9JTlZBTElEX1NUQVRFOiBzZ19kZWFsbG9jX3BpcGVsaW5lKCk6IHBpcGVsaW5lIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUASU5JVF9JTUFHRV9JTlZBTElEX1NUQVRFOiBzZ19pbml0X2ltYWdlKCk6IGltYWdlIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUARkFJTF9JTUFHRV9JTlZBTElEX1NUQVRFOiBzZ19mYWlsX2ltYWdlKCk6IGltYWdlIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfT05TQVZFSU5TVEFOQ0VTVEFURTogTmF0aXZlQWN0aXZpdHkgb25TYXZlSW5zdGFuY2VTdGF0ZQBBTkRST0lEX05BVElWRV9BQ1RJVklUWV9PTkNSRUFURTogTmF0aXZlQWN0aXZpdHkgb25DcmVhdGUAX3NhcHBfaW1hZ2VfdmFsaWRhdGUAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfT05QQVVTRTogTmF0aXZlQWN0aXZpdHkgb25QYXVzZQBzYXBwX21ldGFsX2dldF9tc2FhX2NvbG9yX3RleHR1cmUAc2FwcF9tZXRhbF9nZXRfZGVwdGhfc3RlbmNpbF90ZXh0dXJlAF9zZ19nbF9jYWNoZV9hY3RpdmVfdGV4dHVyZQBXR1BVX1NXQVBDSEFJTl9DUkVBVEVfREVQVEhfU1RFTkNJTF9WSUVXX0ZBSUxFRDogd2dwdTogZmFpbGVkIHRvIGNyZWF0ZSB2aWV3IG9iamVjdCBmb3Igc3dhcGNoYWluIGRlcHRoLXN0ZW5jaWwgdGV4dHVyZQBXR1BVX1NXQVBDSEFJTl9DUkVBVEVfTVNBQV9WSUVXX0ZBSUxFRDogd2dwdTogZmFpbGVkIHRvIGNyZWF0ZSB2aWV3IG9iamVjdCBmb3Igc3dhcGNoYWluIG1zYWEgdGV4dHVyZQBfc2dfZ2xfaW5kZXhfdHlwZQBfc2dfZ2xfdmVydGV4Zm9ybWF0X3R5cGUAX3NnX2dsX3ByaW1pdGl2ZV90eXBlAEFORFJPSURfQ1JFQVRFX1RIUkVBRF9QSVBFX0ZBSUxFRDogZmFpbGVkIHRvIGNyZWF0ZSB0aHJlYWQgcGlwZQBFc2NhcGUAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfRE9ORTogTmF0aXZlQWN0aXZpdHkgZG9uZQBBTkRST0lEX0xPT1BfVEhSRUFEX0RPTkU6IGxvb3AgdGhyZWFkIGRvbmUAX3NnX2dsX2FwcGx5X3BpcGVsaW5lAFZBTElEQVRFX0FCTkRfUElQRUxJTkU6IHNnX2FwcGx5X2JpbmRpbmdzOiBtdXN0IGJlIGNhbGxlZCBhZnRlciBzZ19hcHBseV9waXBlbGluZQBfc2dfdmFsaWRhdGVfYXBwbHlfcGlwZWxpbmUAX3NnX2luaXRfcGlwZWxpbmUAX3NnLmdsLmNhY2hlLmN1cl9waXBlbGluZQBfc2dfbG9va3VwX3BpcGVsaW5lAF9zZ19nbF9jcmVhdGVfcGlwZWxpbmUAc2dfbWFrZV9waXBlbGluZQBfc2dfZ2xfZGlzY2FyZF9waXBlbGluZQB0cmlhbmdsZS1waXBlbGluZQBBTkRST0lEX05BVElWRV9BQ1RJVklUWV9PTlJFU1VNRTogTmF0aXZlQWN0aXZpdHkgb25SZXN1bWUASG9tZQBWQUxJREFURV9BUFBFTkRCVUZfVVBEQVRFOiBzZ19hcHBlbmRfYnVmZmVyOiBjYW5ub3QgY2FsbCBzZ19hcHBlbmRfYnVmZmVyIGFuZCBzZ191cGRhdGVfYnVmZmVyIGluIHNhbWUgZnJhbWUAVkFMSURBVEVfVVBEQVRFQlVGX0FQUEVORDogc2dfdXBkYXRlX2J1ZmZlcjogY2Fubm90IGNhbGwgc2dfdXBkYXRlX2J1ZmZlciBhbmQgc2dfYXBwZW5kX2J1ZmZlciBpbiBzYW1lIGZyYW1lAFZBTElEQVRFX1VQREFURUJVRl9PTkNFOiBzZ191cGRhdGVfYnVmZmVyOiBvbmx5IG9uZSB1cGRhdGUgYWxsb3dlZCBwZXIgYnVmZmVyIGFuZCBmcmFtZQBWQUxJREFURV9VUERJTUdfT05DRTogc2dfdXBkYXRlX2ltYWdlOiBvbmx5IG9uZSB1cGRhdGUgYWxsb3dlZCBwZXIgaW1hZ2UgYW5kIGZyYW1lAHVfZGVzYy0+Z2xzbF9uYW1lAGltZ19zbXBfZGVzYy0+Z2xzbF9uYW1lAHNhcHBfbWV0YWxfZ2V0X2N1cnJlbnRfZHJhd2FibGUAVkFMSURBVEVfSU1BR0VERVNDX0NPTVBSRVNTRURfSU1NVVRBQkxFOiBjb21wcmVzc2VkIGltYWdlcyBtdXN0IGJlIGltbXV0YWJsZQBfc2dfZ2xfcmVzZXRfc3RhdGVfY2FjaGUAX3NnX2dsX3NoYWRlcl9zdGFnZQBkZXNjLT5zYW1wbGVyc1tzcmMtPnNhbXBsZXJfc2xvdF0uc3RhZ2UgPT0gc3JjLT5zdGFnZQBkZXNjLT5pbWFnZXNbc3JjLT5pbWFnZV9zbG90XS5zdGFnZSA9PSBzcmMtPnN0YWdlAFZBTElEQVRFX1NIQURFUkRFU0NfSU1BR0VfU0FNUExFUl9QQUlSX1NBTVBMRVJfU1RBR0VfTUlTTUFUQ0g6IGltYWdlLXNhbXBsZXItcGFpciBzdGFnZSBkb2Vzbid0IG1hdGNoIHJlZmVyZW5jZWQgc2FtcGxlciBzdGFnZQBWQUxJREFURV9TSEFERVJERVNDX1VCX01FVEFMX0JVRkZFUl9TTE9UX0NPTExJU0lPTjogdW5pZm9ybSBibG9jayAnbXNsX2J1ZmZlcl9uJyBtdXN0IGJlIHVuaXF1ZSBhY3Jvc3MgdW5pZm9ybSBibG9ja3MgYW5kIHN0b3JhZ2UgYnVmZmVycyBpbiBzYW1lIHNoYWRlciBzdGFnZQBWQUxJREFURV9TSEFERVJERVNDX0lNQUdFX0hMU0xfUkVHSVNURVJfVF9DT0xMSVNJT046IGltYWdlICdobHNsX3JlZ2lzdGVyX3RfbicgbXVzdCBiZSB1bmlxdWUgYWNyb3NzIGltYWdlcyBhbmQgc3RvcmFnZSBidWZmZXJzIGluIHNhbWUgc2hhZGVyIHN0YWdlAFZBTElEQVRFX1NIQURFUkRFU0NfVUJfSExTTF9SRUdJU1RFUl9CX0NPTExJU0lPTjogdW5pZm9ybSBibG9jayAnaGxzbF9yZWdpc3Rlcl9iX24nIG11c3QgYmUgdW5pcXVlIGFjcm9zcyB1bmlmb3JtIGJsb2NrcyBpbiBzYW1lIHNoYWRlciBzdGFnZQBWQUxJREFURV9TSEFERVJERVNDX1NUT1JBR0VCVUZGRVJfSExTTF9SRUdJU1RFUl9UX0NPTExJU0lPTjogc3RvcmFnZV9idWZmZXIgJ2hsc2xfcmVnaXN0ZXJfdF9uJyBtdXN0IGJlIHVuaXF1ZSBhY3Jvc3Mgc3RvcmFnZSBidWZmZXJzIGFuZCBpbWFnZXMgaW4gc2FtZSBzaGFkZXIgc3RhZ2UAVkFMSURBVEVfU0hBREVSREVTQ19TVE9SQUdFQlVGRkVSX01FVEFMX0JVRkZFUl9TTE9UX0NPTExJU0lPTjogc3RvcmFnZSBidWZmZXIgJ21zbF9idWZmZXJfbicgbXVzdCBiZSB1bmlxdWUgYWNyb3NzIHVuaWZvcm0gYmxvY2tzIGFuZCBzdG9yYWdlIGJ1ZmZlciBpbiBzYW1lIHNoYWRlciBzdGFnZQBWQUxJREFURV9TSEFERVJERVNDX1NBTVBMRVJfSExTTF9SRUdJU1RFUl9TX0NPTExJU0lPTjogc2FtcGxlciAnaGxzbF9yZWdpc3Rlcl9zX24nIG11c3QgYmUgdW5pcXVlIGluIHNhbWUgc2hhZGVyIHN0YWdlAFZBTElEQVRFX1NIQURFUkRFU0NfU0FNUExFUl9NRVRBTF9TQU1QTEVSX1NMT1RfQ09MTElTSU9OOiBzYW1wbGVyICdtc2xfc2FtcGxlcl9uJyBtdXN0IGJlIHVuaXF1ZSBpbiBzYW1lIHNoYWRlciBzdGFnZQBWQUxJREFURV9TSEFERVJERVNDX0lNQUdFX01FVEFMX1RFWFRVUkVfU0xPVF9DT0xMSVNJT046IGltYWdlICdtc2xfdGV4dHVyZV9uJyBtdXN0IGJlIHVuaXF1ZSBpbiBzYW1lIHNoYWRlciBzdGFnZQBWQUxJREFURV9TSEFERVJERVNDX0lNQUdFX1NBTVBMRVJfUEFJUl9JTUFHRV9TVEFHRV9NSVNNQVRDSDogaW1hZ2Utc2FtcGxlci1wYWlyIHN0YWdlIGRvZXNuJ3QgbWF0Y2ggcmVmZXJlbmNlZCBpbWFnZSBzdGFnZQBfc2dfZ2xfdXNhZ2UAX3NnX2dsX2F0dGFjaG1lbnRzX2RzX2ltYWdlAF9zZ19nbF9hdHRhY2htZW50c19jb2xvcl9pbWFnZQBfc2dfZ2xfYXR0YWNobWVudHNfcmVzb2x2ZV9pbWFnZQBfc2dfZ2xfZGlzY2FyZF9pbWFnZQBWQUxJREFURV9JTUFHRURFU0NfTk9OUlRfUElYRUxGT1JNQVQ6IGludmFsaWQgcGl4ZWwgZm9ybWF0IGZvciBub24tcmVuZGVyLXRhcmdldCBpbWFnZQBWQUxJREFURV9JTUFHRURFU0NfUlRfUElYRUxGT1JNQVQ6IGludmFsaWQgcGl4ZWwgZm9ybWF0IGZvciByZW5kZXItdGFyZ2V0IGltYWdlAFZBTElEQVRFX1VQRElNR19VU0FHRTogc2dfdXBkYXRlX2ltYWdlOiBjYW5ub3QgdXBkYXRlIGltbXV0YWJsZSBpbWFnZQBOdW1wYWREaXZpZGUAV0dQVV9DUkVBVEVfSU5TVEFOQ0VfRkFJTEVEOiB3Z3B1OiBmYWlsZWQgdG8gY3JlYXRlIGluc3RhbmNlAHNhcHBfd2dwdV9nZXRfZGV2aWNlAHNhcHBfbWV0YWxfZ2V0X2RldmljZQBzYXBwX2QzZDExX2dldF9kZXZpY2UAQmFja3NwYWNlAFNwYWNlAFdJTjMyX0QzRDExX1FVRVJZX0lOVEVSRkFDRV9JRFhHSURFVklDRTFfRkFJTEVEOiBjb3VsZCBub3Qgb2J0YWluIElEWEdJRGV2aWNlMSBpbnRlcmZhY2UAUGVyaW9kAExJTlVYX0dMWF9FWFRFTlNJT05fTk9UX0ZPVU5EOiBHTFggZXh0ZW5zaW9uIG5vdCBmb3VuZABfZmxvYXRfYmxlbmQAc2dfcXVlcnlfYmFja2VuZABfc2dfZ2xfc2V0dXBfYmFja2VuZABfc2dfZ2xfZGlzY2FyZF9iYWNrZW5kAGRzdCA9PSBkc3RfZW5kAGRzdCA8IGRzdF9lbmQAYm5kAEVuZABWQUxJREFURV9BQk5EX0VYUEVDVEVEX1NBTVBMRVJfQklORElORzogc2dfYXBwbHlfYmluZGluZ3M6IHNhbXBsZXIgYmluZGluZyBpcyBtaXNzaW5nIG9yIHRoZSBzYW1wbGVyIGhhbmRsZSBpcyBpbnZhbGlkAFZBTElEQVRFX0FCTkRfRVhQRUNURURfVkI6IHNnX2FwcGx5X2JpbmRpbmdzOiB2ZXJ0ZXggYnVmZmVyIGJpbmRpbmcgaXMgbWlzc2luZyBvciBidWZmZXIgaGFuZGxlIGlzIGludmFsaWQAVkFMSURBVEVfQUJORF9FWFBFQ1RFRF9TVE9SQUdFQlVGRkVSX0JJTkRJTkc6IHNnX2FwcGx5X2JpbmRpbmdzOiBzdG9yYWdlIGJ1ZmZlciBiaW5kaW5nIGlzIG1pc3Npbmcgb3IgdGhlIGJ1ZmZlciBoYW5kbGUgaXMgaW52YWxpZABWQUxJREFURV9BQk5EX0VYUEVDVEVEX0lNQUdFX0JJTkRJTkc6IHNnX2FwcGx5X2JpbmRpbmdzOiBpbWFnZSBiaW5kaW5nIGlzIG1pc3Npbmcgb3IgdGhlIGltYWdlIGhhbmRsZSBpcyBpbnZhbGlkAFZBTElEQVRFX1BJUEVMSU5FREVTQ19TSEFERVI6IHNnX3BpcGVsaW5lX2Rlc2Muc2hhZGVyIG1pc3Npbmcgb3IgaW52YWxpZAAhX3NnLmN1cl9wYXNzLnZhbGlkAF9zYXBwLnZhbGlkAF9zZy5nbC52YWxpZABfc2cudmFsaWQAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0lNQUdFOiBwYXNzIGF0dGFjaG1lbnQgaW1hZ2UgaXMgbm90IHZhbGlkAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19ERVBUSF9JTUFHRTogcGFzcyBkZXB0aCBhdHRhY2htZW50IGltYWdlIGlzIG5vdCB2YWxpZABWQUxJREFURV9CRUdJTlBBU1NfQ09MT1JfQVRUQUNITUVOVF9JTUFHRTogc2dfYmVnaW5fcGFzczogb25lIG9yIG1vcmUgY29sb3IgYXR0YWNobWVudCBpbWFnZXMgYXJlIG5vdCB2YWxpZABWQUxJREFURV9CRUdJTlBBU1NfREVQVEhTVEVOQ0lMX0FUVEFDSE1FTlRfSU1BR0U6IHNnX2JlZ2luX3Bhc3M6IG9uZSBvciBtb3JlIGRlcHRoLXN0ZW5jaWwgYXR0YWNobWVudCBpbWFnZXMgYXJlIG5vdCB2YWxpZABWQUxJREFURV9CRUdJTlBBU1NfUkVTT0xWRV9BVFRBQ0hNRU5UX0lNQUdFOiBzZ19iZWdpbl9wYXNzOiBvbmUgb3IgbW9yZSByZXNvbHZlIGF0dGFjaG1lbnQgaW1hZ2VzIGFyZSBub3QgdmFsaWQAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX1JFU09MVkVfSU1BR0U6IHBhc3MgcmVzb2x2ZSBhdHRhY2htZW50IGltYWdlIG5vdCB2YWxpZABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0VYUEVDVF9DT0xPUkZPUk1BVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4uY29sb3JfZm9ybWF0IHRvIGJlIHZhbGlkAGRlc2MtPnNoYWRlci5pZCA9PSBzaGQtPnNsb3QuaWQAYXR0cy0+c2xvdC5pZCA9PSBfc2cuY3VyX3Bhc3MuYXR0c19pZC5pZABibmQtPnBpcC0+c2hhZGVyLT5zbG90LmlkID09IGJuZC0+cGlwLT5jbW4uc2hhZGVyX2lkLmlkAHNoZABWQUxJREFURV9CRUdJTlBBU1NfQ0FOQVJZOiBzZ19iZWdpbl9wYXNzOiBwYXNzIHN0cnVjdCBub3QgaW5pdGlhbGl6ZWQAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0NBTkFSWTogc2dfYXR0YWNobWVudHNfZGVzYyBub3QgaW5pdGlhbGl6ZWQAVkFMSURBVEVfU0FNUExFUkRFU0NfQ0FOQVJZOiBzZ19zYW1wbGVyX2Rlc2Mgbm90IGluaXRpYWxpemVkAFZBTElEQVRFX0JVRkZFUkRFU0NfQ0FOQVJZOiBzZ19idWZmZXJfZGVzYyBub3QgaW5pdGlhbGl6ZWQAVkFMSURBVEVfU0hBREVSREVTQ19DQU5BUlk6IHNnX3NoYWRlcl9kZXNjIG5vdCBpbml0aWFsaXplZABWQUxJREFURV9QSVBFTElORURFU0NfQ0FOQVJZOiBzZ19waXBlbGluZV9kZXNjIG5vdCBpbml0aWFsaXplZABWQUxJREFURV9JTUFHRURFU0NfQ0FOQVJZOiBzZ19pbWFnZV9kZXNjIG5vdCBpbml0aWFsaXplZABBTkRST0lEX05BVElWRV9BQ1RJVklUWV9PTk5BVElWRVdJTkRPV0RFU1RST1lFRDogTmF0aXZlQWN0aXZpdHkgb25OYXRpdmVXaW5kb3dEZXN0cm95ZWQAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfT05JTlBVVFFVRVVFREVTVFJPWUVEOiBOYXRpdmVBY3Rpdml0eSBvbklucHV0UXVldWVEZXN0cm95ZWQAQU5EUk9JRF9VTktOT1dOX01TRzogdW5rbm93biBtc2cgdHlwZSByZWNlaXZlZABQQVNTX1BPT0xfRVhIQVVTVEVEOiBwYXNzIHBvb2wgZXhoYXVzdGVkAFNBTVBMRVJfUE9PTF9FWEhBVVNURUQ6IHNhbXBsZXIgcG9vbCBleGhhdXN0ZWQAQlVGRkVSX1BPT0xfRVhIQVVTVEVEOiBidWZmZXIgcG9vbCBleGhhdXN0ZWQAU0hBREVSX1BPT0xfRVhIQVVTVEVEOiBzaGFkZXIgcG9vbCBleGhhdXN0ZWQAUElQRUxJTkVfUE9PTF9FWEhBVVNURUQ6IHBpcGVsaW5lIHBvb2wgZXhoYXVzdGVkAElNQUdFX1BPT0xfRVhIQVVTVEVEOiBpbWFnZSBwb29sIGV4aGF1c3RlZABBTkRST0lEX0xPT1BfVEhSRUFEX1NUQVJURUQ6IGxvb3AgdGhyZWFkIHN0YXJ0ZWQAVkFMSURBVEVfQUJORF9FWFBFQ1RFRF9ERVBUSF9JTUFHRTogc2dfYXBwbHlfYmluZGluZ3M6IGRlcHRoIGltYWdlIGV4cGVjdGVkAFZBTElEQVRFX0FCTkRfRVhQRUNURURfRklMVEVSQUJMRV9JTUFHRTogc2dfYXBwbHlfYmluZGluZ3M6IGZpbHRlcmFibGUgaW1hZ2UgZXhwZWN0ZWQAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfQ1JFQVRFX1NVQ0NFU1M6IE5hdGl2ZUFjdGl2aXR5IHN1Y2Nlc3NmdWxseSBjcmVhdGVkAEFORFJPSURfTkFUSVZFX0FDVElWSVRZX09OTkFUSVZFV0lORE9XQ1JFQVRFRDogTmF0aXZlQWN0aXZpdHkgb25OYXRpdmVXaW5kb3dDcmVhdGVkAEFORFJPSURfTkFUSVZFX0FDVElWSVRZX09OSU5QVVRRVUVVRUNSRUFURUQ6IE5hdGl2ZUFjdGl2aXR5IG9uSW5wdXRRdWV1ZUNyZWF0ZWQAV0lOMzJfV0dMX0FSQl9DUkVBVEVfQ09OVEVYVF9SRVFVSVJFRDogQVJCX2NyZWF0ZV9jb250ZXh0IHJlcXVpcmVkAFdJTjMyX1dHTF9BUkJfQ1JFQVRFX0NPTlRFWFRfUFJPRklMRV9SRVFVSVJFRDogQVJCX2NyZWF0ZV9jb250ZXh0X3Byb2ZpbGUgcmVxdWlyZWQAVkFMSURBVEVfU0hBREVSREVTQ19TT1VSQ0VfT1JfQllURUNPREU6IHNoYWRlciBzb3VyY2Ugb3IgYnl0ZSBjb2RlIHJlcXVpcmVkAFZBTElEQVRFX1NIQURFUkRFU0NfQllURUNPREU6IHNoYWRlciBieXRlIGNvZGUgcmVxdWlyZWQAVkFMSURBVEVfU0hBREVSREVTQ19TT1VSQ0U6IHNoYWRlciBzb3VyY2UgY29kZSByZXF1aXJlZABWQUxJREFURV9TSEFERVJERVNDX05PX0JZVEVDT0RFX1NJWkU6IHNoYWRlciBieXRlIGNvZGUgbGVuZ3RoIChpbiBieXRlcykgcmVxdWlyZWQAVFJBQ0VfSE9PS1NfTk9UX0VOQUJMRUQ6IHNnX2luc3RhbGxfdHJhY2VfaG9va3MoKSBjYWxsZWQsIGJ1dCBTT0tPTF9UUkFDRV9IT09LUyBpcyBub3QgZGVmaW5lZABWQUxJREFURV9JTUFHRURFU0NfTVNBQV9CVVRfTk9fUlQ6IG5vbi1yZW5kZXItdGFyZ2V0IGltYWdlcyBjYW5ub3QgYmUgbXVsdGlzYW1wbGVkAFZBTElEQVRJT05fRkFJTEVEOiB2YWxpZGF0aW9uIGxheWVyIGNoZWNrcyBmYWlsZWQAV0dQVV9DUkVBVEVCSU5ER1JPVVBfRkFJTEVEOiB3Z3B1RGV2aWNlQ3JlYXRlQmluZEdyb3VwIGZhaWxlZABNQUxMT0NfRkFJTEVEOiBtZW1vcnkgYWxsb2NhdGlvbiBmYWlsZWQATElOVVhfR0xYX0dFVF9WSVNVQUxfRlJPTV9GQkNPTkZJR19GQUlMRUQ6IGdsWEdldFZpc3VhbEZyb21GQkNvbmZpZyBmYWlsZWQAV0dQVV9TSEFERVJfQ1JFQVRFX0JJTkRHUk9VUF9MQVlPVVRfRkFJTEVEOiB3Z3B1RGV2aWNlQ3JlYXRlQmluZEdyb3VwTGF5b3V0KCkgZm9yIHNoYWRlciBzdGFnZSBmYWlsZWQATElOVVhfRUdMX05PX05BVElWRV9WSVNVQUw6IGVnbEdldENvbmZpZ0F0dHJpYigpIGZvciBFR0xfTkFUSVZFX1ZJU1VBTF9JRCBmYWlsZWQATElOVVhfRUdMX0JJTkRfT1BFTkdMX0VTX0FQSV9GQUlMRUQ6IGVnbEJpbmRBUEkoRUdMX09QRU5HTF9FU19BUEkpIGZhaWxlZABMSU5VWF9FR0xfQklORF9PUEVOR0xfQVBJX0ZBSUxFRDogZWdsQmluZEFQSShFR0xfT1BFTkdMX0FQSSkgZmFpbGVkAExJTlVYX0VHTF9HRVRfRElTUExBWV9GQUlMRUQ6IGVnbEdldERpc3BsYXkoKSBmYWlsZWQATElOVVhfWDExX09QRU5fRElTUExBWV9GQUlMRUQ6IFhPcGVuRGlzcGxheSgpIGZhaWxlZABMSU5VWF9HTFhfQ1JFQVRFX1dJTkRPV19GQUlMRUQ6IGdsWENyZWF0ZVdpbmRvdygpIGZhaWxlZABMSU5VWF9YMTFfQ1JFQVRFX1dJTkRPV19GQUlMRUQ6IFhDcmVhdGVXaW5kb3coKSBmYWlsZWQAV0dQVV9DUkVBVEVfVEVYVFVSRV9WSUVXX0ZBSUxFRDogd2dwdVRleHR1cmVDcmVhdGVWaWV3KCkgZmFpbGVkAExJTlVYX0VHTF9DUkVBVEVfQ09OVEVYVF9GQUlMRUQ6IGVnbENyZWF0ZUNvbnRleHQoKSBmYWlsZWQAV0dQVV9DUkVBVEVfUElQRUxJTkVfTEFZT1VUX0ZBSUxFRDogd2dwdURldmljZUNyZWF0ZVBpcGVsaW5lTGF5b3V0KCkgZmFpbGVkAExJTlVYX0VHTF9NQUtFX0NVUlJFTlRfRkFJTEVEOiBlZ2xNYWtlQ3VycmVudCgpIGZhaWxlZABXR1BVX0NSRUFURV9TQU1QTEVSX0ZBSUxFRDogd2dwdURldmljZUNyZWF0ZVNhbXBsZXIoKSBmYWlsZWQAV0dQVV9DUkVBVEVfQlVGRkVSX0ZBSUxFRDogd2dwdURldmljZUNyZWF0ZUJ1ZmZlcigpIGZhaWxlZABMSU5VWF9FR0xfR0VUX1ZJU1VBTF9JTkZPX0ZBSUxFRDogWEdldFZpc3VhbEluZm8oKSBmYWlsZWQATElOVVhfRUdMX0lOSVRJQUxJWkVfRkFJTEVEOiBlZ2xJbml0aWFsaXplKCkgZmFpbGVkAFdHUFVfQ1JFQVRFX1RFWFRVUkVfRkFJTEVEOiB3Z3B1RGV2aWNlQ3JlYXRlVGV4dHVyZSgpIGZhaWxlZABXR1BVX0NSRUFURV9SRU5ERVJfUElQRUxJTkVfRkFJTEVEOiB3Z3B1RGV2aWNlQ3JlYXRlUmVuZGVyUGlwZWxpbmUoKSBmYWlsZWQAV0dQVV9DUkVBVEVfU0hBREVSX01PRFVMRV9GQUlMRUQ6IHdncHVEZXZpY2VDcmVhdGVTaGFkZXJNb2R1bGUoKSBmYWlsZWQATElOVVhfRUdMX0NSRUFURV9XSU5ET1dfU1VSRkFDRV9GQUlMRUQ6IGVnbENyZWF0ZVdpbmRvd1N1cmZhY2UoKSBmYWlsZWQAV0lOMzJfR0VUX1JBV19JTlBVVF9EQVRBX0ZBSUxFRDogR2V0UmF3SW5wdXREYXRhKCkgZmFpbGVkAF9zYXBwX2Vtc2Nfc2l6ZV9jaGFuZ2VkAEFORFJPSURfTkFUSVZFX0FDVElWSVRZX09OV0lORE9XRk9DVVNDSEFOR0VEOiBOYXRpdmVBY3Rpdml0eSBvbldpbmRvd0ZvY3VzQ2hhbmdlZABBTkRST0lEX05BVElWRV9BQ1RJVklUWV9PTkNPTkZJR1VSQVRJT05DSEFOR0VEOiBOYXRpdmVBY3Rpdml0eSBvbkNvbmZpZ3VyYXRpb25DaGFuZ2VkAFZBTElEQVRFX0FCTkRfSUI6IHNnX2FwcGx5X2JpbmRpbmdzOiBwaXBlbGluZSBvYmplY3QgZGVmaW5lcyBub24taW5kZXhlZCByZW5kZXJpbmcsIGJ1dCBpbmRleCBidWZmZXIgcHJvdmlkZWQAVkFMSURBVEVfQUJORF9OT19JQjogc2dfYXBwbHlfYmluZGluZ3M6IHBpcGVsaW5lIG9iamVjdCBkZWZpbmVzIGluZGV4ZWQgcmVuZGVyaW5nLCBidXQgbm8gaW5kZXggYnVmZmVyIHByb3ZpZGVkAFZBTElEQVRFX0FQSVBfUElQRUxJTkVfVkFMSURfSUQ6IHNnX2FwcGx5X3BpcGVsaW5lOiBpbnZhbGlkIHBpcGVsaW5lIGlkIHByb3ZpZGVkAE51bXBhZEFkZABfY29tcHJlc3NlZF90ZXh0dXJlX2FzdGMAX3RleHR1cmVfY29tcHJlc3Npb25fcHZydGMAV0VCS0lUX1dFQkdMX2NvbXByZXNzZWRfdGV4dHVyZV9wdnJ0YwBfdGV4dHVyZV9jb21wcmVzc2lvbl9icHRjAF90ZXh0dXJlX2NvbXByZXNzaW9uX3JndGMAX2NvbXByZXNzZWRfdGV4dHVyZV9ldGMAX3RleHR1cmVfY29tcHJlc3Npb25fczN0YwBfY29tcHJlc3NlZF90ZXh0dXJlX3MzdGMAX3NnX3ZhbGlkYXRlX2J1ZmZlcl9kZXNjAF9zZ192YWxpZGF0ZV9zaGFkZXJfZGVzYwBfc2FwcF92YWxpZGF0ZV9pY29uX2Rlc2MAX3NnX3ZhbGlkYXRlX3BpcGVsaW5lX2Rlc2MAVkFMSURBVEVfQUJORF9JTUFHRV9UWVBFX01JU01BVENIOiBzZ19hcHBseV9iaW5kaW5nczogdHlwZSBvZiBib3VuZCBpbWFnZSBkb2Vzbid0IG1hdGNoIHNoYWRlciBkZXNjAGJ1ZiAmJiBkZXNjAHBpcCAmJiBzaGQgJiYgZGVzYwBzcmMAX3NhcHBfbWFsbG9jAF9zZ19tYWxsb2MAX3NnX3Nsb3RfYWxsb2MAX3NnX2dsX2NvbXBhcmVfZnVuYwBfdGV4dHVyZV9maWx0ZXJfYW5pc290cm9waWMAcGFuaWMAdmIAYXR0cy0+Z2wuZmIAVGFiAFZBTElEQVRFX0JVRkZFUkRFU0NfTk9fREFUQTogZHluYW1pYy9zdHJlYW0gdXNhZ2UgYnVmZmVycyBjYW5ub3QgYmUgaW5pdGlhbGl6ZWQgd2l0aCBkYXRhAFZBTElEQVRFX0lNQUdFREVTQ19JTkpFQ1RFRF9OT19EQVRBOiBpbWFnZXMgd2l0aCBpbmplY3RlZCB0ZXh0dXJlcyBjYW5ub3QgYmUgaW5pdGlhbGl6ZWQgd2l0aCBkYXRhAFZBTElEQVRFX0lNQUdFREVTQ19SVF9OT19EQVRBOiByZW5kZXIgdGFyZ2V0IGltYWdlcyBjYW5ub3QgYmUgaW5pdGlhbGl6ZWQgd2l0aCBkYXRhAFZBTElEQVRFX0lNQUdFREVTQ19EWU5BTUlDX05PX0RBVEE6IGR5bmFtaWMvc3RyZWFtIGltYWdlcyBjYW5ub3QgYmUgaW5pdGlhbGl6ZWQgd2l0aCBkYXRhAENvbW1hAGRlc2MtPmdsX2J1ZmZlcnNbc2xvdF0AWwBLZXlaAEtleVkAQU5EUk9JRF9NU0dfREVTVFJPWTogTVNHX0RFU1RST1kAS2V5WABLZXlXAEFORFJPSURfTVNHX1NFVF9OQVRJVkVfV0lORE9XOiBNU0dfU0VUX05BVElWRV9XSU5ET1cAS2V5VgBLZXlVAEtleVQAS2V5UwBBTkRST0lEX01TR19OT19GT0NVUzogTVNHX05PX0ZPQ1VTAEFORFJPSURfTVNHX0ZPQ1VTOiBNU0dfRk9DVVMAaW1nX3NtcC0+c2FtcGxlcl9zbG90IDwgU0dfTUFYX1NBTVBMRVJfQklORFNMT1RTAGFfc3RhdGUtPmJ1ZmZlcl9pbmRleCA8IFNHX01BWF9WRVJURVhCVUZGRVJfQklORFNMT1RTAGF0dHItPnZiX2luZGV4IDwgU0dfTUFYX1ZFUlRFWEJVRkZFUl9CSU5EU0xPVFMAaW1nX3NtcC0+aW1hZ2Vfc2xvdCA8IFNHX01BWF9JTUFHRV9CSU5EU0xPVFMAX3NnLmxpbWl0cy5tYXhfdmVydGV4X2F0dHJzIDw9IFNHX01BWF9WRVJURVhfQVRUUklCVVRFUwBudW1faW1hZ2VzIDw9IFNBUFBfTUFYX0lDT05JTUFHRVMAS2V5UgBWQUxJREFURV9BQk5EX1VORVhQRUNURURfU0FNUExFUl9DT01QQVJFX05FVkVSOiBzZ19hcHBseV9iaW5kaW5nczogc2hhZGVyIGV4cGVjdHMgU0dfU0FNUExFUlRZUEVfQ09NUEFSSVNPTiBidXQgc2FtcGxlciBoYXMgU0dfQ09NUEFSRUZVTkNfTkVWRVIAVkFMSURBVEVfQUJORF9FWFBFQ1RFRF9TQU1QTEVSX0NPTVBBUkVfTkVWRVI6IHNnX2FwcGx5X2JpbmRpbmdzOiBzaGFkZXIgZXhwZWN0cyBTR19TQU1QTEVSVFlQRV9GSUxURVJJTkcgb3IgU0dfU0FNUExFUlRZUEVfTk9ORklMVEVSSU5HIGJ1dCBzYW1wbGVyIGRvZXNuJ3QgaGF2ZSBTR19DT01QQVJFRlVOQ19ORVZFUgBWQUxJREFURV9BQk5EX1ZCX1RZUEU6IHNnX2FwcGx5X2JpbmRpbmdzOiBidWZmZXIgaW4gdmVydGV4IGJ1ZmZlciBzbG90IGlzIG5vdCBhIFNHX0JVRkZFUlRZUEVfVkVSVEVYQlVGRkVSAFZBTElEQVRFX0FCTkRfSUJfVFlQRTogc2dfYXBwbHlfYmluZGluZ3M6IGJ1ZmZlciBpbiBpbmRleCBidWZmZXIgc2xvdCBpcyBub3QgYSBTR19CVUZGRVJUWVBFX0lOREVYQlVGRkVSAFZBTElEQVRFX1NBTVBMRVJERVNDX0FOSVNUUk9QSUNfUkVRVUlSRVNfTElORUFSX0ZJTFRFUklORzogc2dfc2FtcGxlcl9kZXNjLm1heF9hbmlzb3Ryb3B5ID4gMSByZXF1aXJlcyBtaW4vbWFnL21pcG1hcF9maWx0ZXIgdG8gYmUgU0dfRklMVEVSX0xJTkVBUgBLZXlRAEtleVAAS2V5TwBLZXlOAEtleU0AS2V5TABMSU5VWF9HTFhfTE9BRF9MSUJHTF9GQUlMRUQ6IGZhaWxlZCB0byBsb2FkIGxpYkdMAHNsb3QtPnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfSU5JVElBTABLZXlLAEtleUoAS2V5SQBLZXlIAEtleUcAS2V5RgBLZXlFAEFORFJPSURfTVNHX1NFVF9JTlBVVF9RVUVVRTogTVNHX1NFVF9JTlBVVF9RVUVVRQBBTkRST0lEX01TR19DUkVBVEU6IE1TR19DUkVBVEUAQU5EUk9JRF9NU0dfUEFVU0U6IE1TR19QQVVTRQBwYXNzX2RlZi5zd2FwY2hhaW4uY29sb3JfZm9ybWF0ID4gU0dfUElYRUxGT1JNQVRfTk9ORQBBTkRST0lEX01TR19SRVNVTUU6IE1TR19SRVNVTUUAVkFMSURBVEVfSU1BR0VERVNDX1JUX0lNTVVUQUJMRTogcmVuZGVyIHRhcmdldCBpbWFnZXMgbXVzdCBiZSBTR19VU0FHRV9JTU1VVEFCTEUAS2V5RABzbG90LT5pZCA9PSBTR19JTlZBTElEX0lEAGJpbmRpbmdzLT5zYW1wbGVyc1tpXS5pZCAhPSBTR19JTlZBTElEX0lEAGJpbmRpbmdzLT52ZXJ0ZXhfYnVmZmVyc1tpXS5pZCAhPSBTR19JTlZBTElEX0lEAGJpbmRpbmdzLT5zdG9yYWdlX2J1ZmZlcnNbaV0uaWQgIT0gU0dfSU5WQUxJRF9JRABiaW5kaW5ncy0+aW1hZ2VzW2ldLmlkICE9IFNHX0lOVkFMSURfSUQAVkFMSURBVEVfQkVHSU5QQVNTX0FUVEFDSE1FTlRTX1ZBTElEOiBzZ19iZWdpbl9wYXNzOiBhdHRhY2htZW50cyBvYmplY3Qgbm90IGluIHJlc291cmNlIHN0YXRlIFZBTElEAEtleUMAV0lOMzJfSEVMUEVSX1dJTkRPV19HRVREQ19GQUlMRUQ6IGZhaWxlZCB0byBnZXQgaGVscGVyIHdpbmRvdyBEQwBLZXlCAExJTlVYX0dMWF9DUkVBVEVfQ09OVEVYVF9GQUlMRUQ6IEZhaWxlZCB0byBjcmVhdGUgR0wgY29udGV4dCB2aWEgZ2xYQ3JlYXRlQ29udGV4dEF0dHJpYnNBUkIAV0lOMzJfV0dMX0lOQ09NUEFUSUJMRV9ERVZJQ0VfQ09OVEVYVDogQ3JlYXRlQ29udGV4dEF0dHJpYnNBUkIgZmFpbGVkIHdpdGggRVJST1JfSU5DT01QQVRJQkxFX0RFVklDRV9DT05URVhUU19BUkIAS2V5QQA8ZmA8BmY8AFtsaW5lOgBbaWQ6AERpZ2l0OQBOdW1wYWQ5AEY5AERpZ2l0OABOdW1wYWQ4AEY4AHNsb3QgPCAxMjgARGlnaXQ3AE51bXBhZDcARjcARGlnaXQ2AE51bXBhZDYARjYARGlnaXQ1AE51bXBhZDUARjUARGlnaXQ0AE51bXBhZDQARjQAc2xvdCA8IDY0AFZBTElEQVRFX1BJUEVMSU5FREVTQ19MQVlPVVRfU1RSSURFNDogc2dfcGlwZWxpbmVfZGVzYy5sYXlvdXQuYnVmZmVyc1tdLnN0cmlkZSBtdXN0IGJlIG11bHRpcGxlIG9mIDQAVkFMSURBVEVfQlVGRkVSREVTQ19TVE9SQUdFQlVGRkVSX1NJWkVfTVVMVElQTEVfNDogc2l6ZSBvZiBzdG9yYWdlIGJ1ZmZlcnMgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQARGlnaXQzAE51bXBhZDMARjMARGlnaXQyAE51bXBhZDIARjIAX3NnX2FsaWduX3UzMgBGMTIARGlnaXQxAE51bXBhZDEARjEAVkFMSURBVEVfQUJORF9JTUFHRV9NU0FBOiBzZ19hcHBseV9iaW5kaW5nczogY2Fubm90IGJpbmQgaW1hZ2Ugd2l0aCBzYW1wbGVfY291bnQ+MQBGMTEAZ2xfYXR0ci0+dmJfaW5kZXggPT0gLTEAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX1JFU09MVkVfU0FNUExFX0NPVU5UOiBwYXNzIHJlc29sdmUgYXR0YWNobWVudCBpbWFnZSBzYW1wbGUgY291bnQgbXVzdCBiZSAxAFZBTElEQVRFX0lNQUdFREVTQ19NU0FBXzNEX0lNQUdFOiAzRCBpbWFnZXMgY2Fubm90IGhhdmUgYSBzYW1wbGVfY291bnQgPiAxAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19SRVNPTFZFX0NPTE9SX0lNQUdFX01TQUE6IHBhc3MgcmVzb2x2ZSBhdHRhY2htZW50cyBtdXN0IGhhdmUgYSBjb2xvciBhdHRhY2htZW50IGltYWdlIHdpdGggc2FtcGxlIGNvdW50ID4gMQBWQUxJREFURV9TSEFERVJERVNDX1VCX0FSUkFZX0NPVU5UOiB1bmlmb3JtIGFycmF5IGNvdW50IG11c3QgYmUgPj0gMQBWQUxJREFURV9JTUFHRURFU0NfTVNBQV9OVU1fTUlQTUFQUzogTVNBQSBpbWFnZXMgbXVzdCBoYXZlIG51bV9taXBtYXBzID09IDEARGlnaXQwAGNvbG9yMABOdW1wYWQwAEYxMABMSU5VWF9YMTFfUVVFUllfU1lTVEVNX0RQSV9GQUlMRUQ6IGZhaWxlZCB0byBxdWVyeSBzeXN0ZW0gZHBpIHZhbHVlLCBhc3N1bWluZyBkZWZhdWx0IDk2LjAAVkFMSURBVEVfQlVGRkVSREVTQ19TSVpFOiBzZ19idWZmZXJfZGVzYy5zaXplIGFuZCAuZGF0YS5zaXplIGNhbm5vdCBib3RoIGJlIDAAYXJyYXlfY291bnQgPiAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRVhQRUNUX1NBTVBMRUNPVU5UOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5zYW1wbGVfY291bnQgPiAwAHBhc3NfZGVmLnN3YXBjaGFpbi5zYW1wbGVfY291bnQgPiAwAGRlc2MtPmhlaWdodCA+IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9FWFBFQ1RfSEVJR0hUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5oZWlnaHQgPiAwAHBhc3NfZGVmLnN3YXBjaGFpbi5oZWlnaHQgPiAwAGRlc2MtPm1heF9jb21taXRfbGlzdGVuZXJzID4gMAB0LT5udW0gPiAwAGRlc2MtPndpZHRoID4gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0VYUEVDVF9XSURUSDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ud2lkdGggPiAwAHBhc3NfZGVmLnN3YXBjaGFpbi53aWR0aCA+IDAAdWJfZGVzYy0+c2l6ZSA+IDAAZGVzYy0+cGl4ZWxzLnNpemUgPiAwAGxfc3RhdGUtPnN0cmlkZSA+IDAAVkFMSURBVEVfSU1BR0VERVNDX0hFSUdIVDogc2dfaW1hZ2VfZGVzYy5oZWlnaHQgbXVzdCBiZSA+IDAAVkFMSURBVEVfSU1BR0VERVNDX1dJRFRIOiBzZ19pbWFnZV9kZXNjLndpZHRoIG11c3QgYmUgPiAwAGRlc2MtPnNhbXBsZV9jb3VudCA+PSAwAGJhc2VfZWxlbWVudCA+PSAwAGRlc2MtPmhlaWdodCA+PSAwAG51bV9lbGVtZW50cyA+PSAwAGRlc2MtPm1heF9kcm9wcGVkX2ZpbGVzID49IDAAbnVtX2luc3RhbmNlcyA+PSAwAGRlc2MtPnN3YXBfaW50ZXJ2YWwgPj0gMABkZXNjLT5tYXhfZHJvcHBlZF9maWxlX3BhdGhfbGVuZ3RoID49IDAAZGVzYy0+d2lkdGggPj0gMABkZXNjLT5jbGlwYm9hcmRfc2l6ZSA+PSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fV0dQVV9FWFBFQ1RfUkVOREVSVklFV19OT1RTRVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLndncHUucmVuZGVyX3ZpZXcgPT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0QzRDExX0VYUEVDVF9SRU5ERVJWSUVXX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4uZDNkMTEucmVuZGVyX3ZpZXcgPT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX1dHUFVfRVhQRUNUX0RFUFRIU1RFTkNJTFZJRVdfTk9UU0VUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi53Z3B1LmRlcHRoX3N0ZW5jaWxfdmlldyA9PSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRDNEMTFfRVhQRUNUX0RFUFRIU1RFTkNJTFZJRVdfTk9UU0VUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5kM2QxMS5kZXB0aF9zdGVuY2lsX3ZpZXcgPT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX1dHUFVfRVhQRUNUX1JFU09MVkVWSUVXX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ud2dwdS5yZXNvbHZlX3ZpZXcgPT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0QzRDExX0VYUEVDVF9SRVNPTFZFVklFV19OT1RTRVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLmQzZDExLnJlc29sdmVfdmlldyA9PSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRVhQRUNUX1NBTVBMRUNPVU5UX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4uc2FtcGxlX2NvdW50ID09IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9FWFBFQ1RfSEVJR0hUX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4uaGVpZ2h0ID09IDAAX3NnLmN1cl9wYXNzLmF0dHMgPT0gMAB1Yi0+bnVtX3VuaWZvcm1zID09IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9HTF9FWFBFQ1RfRlJBTUVCVUZGRVJfTk9UU0VUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5nbC5mcmFtZWJ1ZmZlciA9PSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRVhQRUNUX1dJRFRIX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ud2lkdGggPT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX01FVEFMX0VYUEVDVF9NU0FBQ09MT1JURVhUVVJFX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ubWV0YWwubXNhYV9jb2xvcl90ZXh0dXJlID09IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9NRVRBTF9FWFBFQ1RfREVQVEhTVEVOQ0lMVEVYVFVSRV9OT1RTRVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLm1ldGFsLmRlcHRoX3N0ZW5jaWxfdGV4dHVyZSA9PSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fTUVUQUxfRVhQRUNUX0NVUlJFTlREUkFXQUJMRV9OT1RTRVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLm1ldGFsLmN1cnJlbnRfZHJhd2FibGUgPT0gMAAoZGltICUgOCkgPT0gMABnbEdldEVycm9yKCkgPT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX1dHUFVfRVhQRUNUX1JFTkRFUlZJRVc6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLndncHUucmVuZGVyX3ZpZXcgIT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0QzRDExX0VYUEVDVF9SRU5ERVJWSUVXOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5kM2QxMS5yZW5kZXJfdmlldyAhPSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fV0dQVV9FWFBFQ1RfREVQVEhTVEVOQ0lMVklFVzogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ud2dwdS5kZXB0aF9zdGVuY2lsX3ZpZXcgIT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0QzRDExX0VYUEVDVF9ERVBUSFNURU5DSUxWSUVXOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5kM2QxMS5kZXB0aF9zdGVuY2lsX3ZpZXcgIT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX1dHUFVfRVhQRUNUX1JFU09MVkVWSUVXOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi53Z3B1LnJlc29sdmVfdmlldyAhPSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRDNEMTFfRVhQRUNUX1JFU09MVkVWSUVXOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5kM2QxMS5yZXNvbHZlX3ZpZXcgIT0gMABkZXNjLT5waXhlbHMucHRyICE9IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9NRVRBTF9FWFBFQ1RfTVNBQUNPTE9SVEVYVFVSRTogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ubWV0YWwubXNhYV9jb2xvcl90ZXh0dXJlICE9IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9NRVRBTF9FWFBFQ1RfREVQVEhTVEVOQ0lMVEVYVFVSRTogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ubWV0YWwuZGVwdGhfc3RlbmNpbF90ZXh0dXJlICE9IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9NRVRBTF9FWFBFQ1RfQ1VSUkVOVERSQVdBQkxFOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5tZXRhbC5jdXJyZW50X2RyYXdhYmxlICE9IDAAV0lOMzJfRDNEMTFfQ1JFQVRFX0RFVklDRV9BTkRfU1dBUENIQUlOX1dJVEhfREVCVUdfRkFJTEVEOiBEM0QxMUNyZWF0ZURldmljZUFuZFN3YXBDaGFpbigpIHdpdGggRDNEMTFfQ1JFQVRFX0RFVklDRV9ERUJVRyBmYWlsZWQsIHJldHJ5aW5nIHdpdGhvdXQgZGVidWcgZmxhZy4AVkFMSURBVEVfU0hBREVSREVTQ19TVE9SQUdFQlVGRkVSX1JFQURPTkxZOiBzaGFkZXIgc3RhZ2Ugc3RvcmFnZSBidWZmZXJzIG11c3QgYmUgcmVhZG9ubHkgKHNnX3NoYWRlcl9kZXNjLnN0b3JhZ2VfYnVmZmVyc1tdLnJlYWRvbmx5KQBXR1BVX0JJTkRHUk9VUFNDQUNIRV9TSVpFX1BPVzI6IHNnX2Rlc2Mud2dwdV9iaW5kZ3JvdXBzX2NhY2hlX3NpemUgbXVzdCBiZSBhIHBvd2VyIG9mIDIgKHdncHUpAFdHUFVfQklOREdST1VQU0NBQ0hFX1NJWkVfR1JFQVRFUl9PTkU6IHNnX2Rlc2Mud2dwdV9iaW5kZ3JvdXBzX2NhY2hlX3NpemUgbXVzdCBiZSA+IDEgKHdncHUpAFdHUFVfQklOREdST1VQU19QT09MX0VYSEFVU1RFRDogYmluZGdyb3VwcyBwb29sIGV4aGF1c3RlZCAoaW5jcmVhc2Ugc2dfZGVzYy5iaW5kZ3JvdXBzX2NhY2hlX3NpemUpICh3Z3B1KQBWQUxJREFURV9TSEFERVJERVNDX1NBTVBMRVJfTk9UX1JFRkVSRU5DRURfQllfSU1BR0VfU0FNUExFUl9QQUlSUzogb25lIG9yIG1vcmUgc2FtcGxlcnMgYXJlIG5vdCByZWZlcmVuY2VkIGJ5IGltYWdlLXNhbXBsZXItcGFpcnMgKHNnX3NoYWRlcl9kZXNjLmltYWdlX3NhbXBsZXJfcGFpcnNbXS5zYW1wbGVyX3Nsb3QpAFZBTElEQVRFX1NIQURFUkRFU0NfSU1BR0VfU0FNUExFUl9QQUlSX1NBTVBMRVJfU0xPVF9PVVRfT0ZfUkFOR0U6IGltYWdlLXNhbXBsZXItcGFpciBzYW1wbGVyIHNsb3QgaW5kZXggaXMgb3V0IG9mIHJhbmdlIChzZ19zaGFkZXJfZGVzYy5pbWFnZV9zYW1wbGVyX3BhaXJzW10uc2FtcGxlcl9zbG90KQBWQUxJREFURV9TSEFERVJERVNDX0lNQUdFX05PVF9SRUZFUkVOQ0VEX0JZX0lNQUdFX1NBTVBMRVJfUEFJUlM6IG9uZSBvciBtb3JlIGltYWdlcyBhcmUgbm90IHJlZmVyZW5jZWQgYnkgYnkgaW1hZ2Utc2FtcGxlci1wYWlycyAoc2dfc2hhZGVyX2Rlc2MuaW1hZ2Vfc2FtcGxlcl9wYWlyc1tdLmltYWdlX3Nsb3QpAFZBTElEQVRFX1NIQURFUkRFU0NfSU1BR0VfU0FNUExFUl9QQUlSX0lNQUdFX1NMT1RfT1VUX09GX1JBTkdFOiBpbWFnZS1zYW1wbGVyLXBhaXIgaW1hZ2Ugc2xvdCBpbmRleCBpcyBvdXQgb2YgcmFuZ2UgKHNnX3NoYWRlcl9kZXNjLmltYWdlX3NhbXBsZXJfcGFpcnNbXS5pbWFnZV9zbG90KQAoMHg4ODkyID09IHRhcmdldCkgfHwgKDB4ODg5MyA9PSB0YXJnZXQpIHx8ICgweDkwRDIgPT0gdGFyZ2V0KQBJTUFHRV9EQVRBX1NJWkVfTUlTTUFUQ0g6IGltYWdlIGRhdGEgc2l6ZSBtaXNtYXRjaCAobXVzdCBiZSB3aWR0aCpoZWlnaHQqNCBieXRlcykAKGluZGV4ID49IDApICYmIChpbmRleCA8PSBfc2FwcC5kcm9wLm1heF9maWxlcykAVHJpYW5nbGUgKHNva29sLWFwcCkAVkFMSURBVEVfSU1BR0VEQVRBX05PREFUQTogc2dfaW1hZ2VfZGF0YTogbm8gZGF0YSAoLnB0ciBhbmQvb3IgLnNpemUgaXMgemVybykAKGRlc2MtPmFsbG9jYXRvci5hbGxvY19mbiAmJiBkZXNjLT5hbGxvY2F0b3IuZnJlZV9mbikgfHwgKCFkZXNjLT5hbGxvY2F0b3IuYWxsb2NfZm4gJiYgIWRlc2MtPmFsbG9jYXRvci5mcmVlX2ZuKQBHTF9WRVJURVhfQVRUUklCVVRFX05PVF9GT1VORF9JTl9TSEFERVI6IHZlcnRleCBhdHRyaWJ1dGUgbm90IGZvdW5kIGluIHNoYWRlciAoZ2wpAEdMX0lNQUdFX1NBTVBMRVJfTkFNRV9OT1RfRk9VTkRfSU5fU0hBREVSOiBpbWFnZS1zYW1wbGVyIG5hbWUgbm90IGZvdW5kIGluIHNoYWRlciAoZ2wpAEdMX1RFWFRVUkVfRk9STUFUX05PVF9TVVBQT1JURUQ6IHBpeGVsIGZvcm1hdCBub3Qgc3VwcG9ydGVkIGZvciB0ZXh0dXJlIChnbCkAR0xfQVJSQVlfVEVYVFVSRVNfTk9UX1NVUFBPUlRFRDogYXJyYXkgdGV4dHVyZXMgbm90IHN1cHBvcnRlZCAoZ2wpAEdMXzNEX1RFWFRVUkVTX05PVF9TVVBQT1JURUQ6IDNkIHRleHR1cmVzIG5vdCBzdXBwb3J0ZWQgKGdsKQBHTF9TSEFERVJfQ09NUElMQVRJT05fRkFJTEVEOiBzaGFkZXIgY29tcGlsYXRpb24gZmFpbGVkIChnbCkAR0xfU0hBREVSX0xJTktJTkdfRkFJTEVEOiBzaGFkZXIgbGlua2luZyBmYWlsZWQgKGdsKQBHTF9GUkFNRUJVRkZFUl9TVEFUVVNfSU5DT01QTEVURV9NSVNTSU5HX0FUVEFDSE1FTlQ6IGZyYW1lYnVmZmVyIGNvbXBsZXRlbmVzcyBjaGVjayBmYWlsZWQgd2l0aCBHTF9GUkFNRUJVRkZFUl9JTkNPTVBMRVRFX01JU1NJTkdfQVRUQUNITUVOVCAoZ2wpAEdMX0ZSQU1FQlVGRkVSX1NUQVRVU19JTkNPTVBMRVRFX0FUVEFDSE1FTlQ6IGZyYW1lYnVmZmVyIGNvbXBsZXRlbmVzcyBjaGVjayBmYWlsZWQgd2l0aCBHTF9GUkFNRUJVRkZFUl9JTkNPTVBMRVRFX0FUVEFDSE1FTlQgKGdsKQBHTF9GUkFNRUJVRkZFUl9TVEFUVVNfSU5DT01QTEVURV9NVUxUSVNBTVBMRTogZnJhbWVidWZmZXIgY29tcGxldGVuZXNzIGNoZWNrIGZhaWxlZCB3aXRoIEdMX0ZSQU1FQlVGRkVSX0lOQ09NUExFVEVfTVVMVElTQU1QTEUgKGdsKQBHTF9GUkFNRUJVRkZFUl9TVEFUVVNfVU5TVVBQT1JURUQ6IGZyYW1lYnVmZmVyIGNvbXBsZXRlbmVzcyBjaGVjayBmYWlsZWQgd2l0aCBHTF9GUkFNRUJVRkZFUl9VTlNVUFBPUlRFRCAoZ2wpAEdMX0ZSQU1FQlVGRkVSX1NUQVRVU19VTkRFRklORUQ6IGZyYW1lYnVmZmVyIGNvbXBsZXRlbmVzcyBjaGVjayBmYWlsZWQgd2l0aCBHTF9GUkFNRUJVRkZFUl9VTkRFRklORUQgKGdsKQBHTF9GUkFNRUJVRkZFUl9TVEFUVVNfVU5LTk9XTjogZnJhbWVidWZmZXIgY29tcGxldGVuZXNzIGNoZWNrIGZhaWxlZCAodW5rbm93biByZWFzb24pIChnbCkATUVUQUxfQ1JFQVRFX1NBTVBMRVJfRkFJTEVEOiBmYWlsZWQgdG8gY3JlYXRlIHNhbXBsZXIgb2JqZWN0IChtZXRhbCkATUVUQUxfQ1JFQVRFX0JVRkZFUl9GQUlMRUQ6IGZhaWxlZCB0byBjcmVhdGUgYnVmZmVyIG9iamVjdCAobWV0YWwpAE1FVEFMX0NSRUFURV9URVhUVVJFX0ZBSUxFRDogZmFpbGVkIHRvIGNyZWF0ZSB0ZXh0dXJlIG9iamVjdCAobWV0YWwpAE1FVEFMX0NSRUFURV9EU1NfRkFJTEVEOiBmYWlsZWQgdG8gY3JlYXRlIGRlcHRoIHN0ZW5jaWwgc3RhdGUgKG1ldGFsKQBNRVRBTF9DUkVBVEVfUlBTX0ZBSUxFRDogZmFpbGVkIHRvIGNyZWF0ZSByZW5kZXIgcGlwZWxpbmUgc3RhdGUgKG1ldGFsKQBNRVRBTF9URVhUVVJFX0ZPUk1BVF9OT1RfU1VQUE9SVEVEOiBwaXhlbCBmb3JtYXQgbm90IHN1cHBvcnRlZCBmb3IgdGV4dHVyZSAobWV0YWwpAE1FVEFMX1NIQURFUl9FTlRSWV9OT1RfRk9VTkQ6IHNoYWRlciBlbnRyeSBmdW5jdGlvbiBub3QgZm91bmQgKG1ldGFsKQBNRVRBTF9TSEFERVJfQ09NUElMQVRJT05fRkFJTEVEOiBzaGFkZXIgY29tcGlsYXRpb24gZmFpbGVkIChtZXRhbCkATUVUQUxfU0hBREVSX0NSRUFUSU9OX0ZBSUxFRDogc2hhZGVyIGNyZWF0aW9uIGZhaWxlZCAobWV0YWwpAFdJTjMyX1JFR0lTVEVSX1JBV19JTlBVVF9ERVZJQ0VTX0ZBSUxFRF9NT1VTRV9VTkxPQ0s6IFJlZ2lzdGVyUmF3SW5wdXREZXZpY2VzKCkgZmFpbGVkIChvbiBtb3VzZSB1bmxvY2spAFdJTjMyX1JFR0lTVEVSX1JBV19JTlBVVF9ERVZJQ0VTX0ZBSUxFRF9NT1VTRV9MT0NLOiBSZWdpc3RlclJhd0lucHV0RGV2aWNlcygpIGZhaWxlZCAob24gbW91c2UgbG9jaykARFJPUFBFRF9GSUxFX1BBVEhfVE9PX0xPTkc6IGRyb3BwZWQgZmlsZSBwYXRoIHRvbyBsb25nIChzYXBwX2Rlc2MubWF4X2Ryb3BwZWRfZmlsZWRfcGF0aF9sZW5ndGgpACFfc2FwcF9yaW5nX2VtcHR5KHJpbmcpACFfc2FwcF9yaW5nX2Z1bGwocmluZykAKHNsb3RfaW5kZXggPiAwKSAmJiAoc2xvdF9pbmRleCA8IHBvb2wtPnNpemUpAChzbG90X2luZGV4ID4gKDApKSAmJiAoc2xvdF9pbmRleCA8IHBvb2wtPnNpemUpAChzbG90X2luZGV4ID4gKDApKSAmJiAoc2xvdF9pbmRleCA8IHAtPmF0dGFjaG1lbnRzX3Bvb2wuc2l6ZSkAKHNsb3RfaW5kZXggPiAoMCkpICYmIChzbG90X2luZGV4IDwgcC0+c2FtcGxlcl9wb29sLnNpemUpAChzbG90X2luZGV4ID4gKDApKSAmJiAoc2xvdF9pbmRleCA8IHAtPmJ1ZmZlcl9wb29sLnNpemUpAChzbG90X2luZGV4ID4gKDApKSAmJiAoc2xvdF9pbmRleCA8IHAtPnNoYWRlcl9wb29sLnNpemUpAChzbG90X2luZGV4ID4gKDApKSAmJiAoc2xvdF9pbmRleCA8IHAtPnBpcGVsaW5lX3Bvb2wuc2l6ZSkAKHNsb3RfaW5kZXggPiAoMCkpICYmIChzbG90X2luZGV4IDwgcC0+aW1hZ2VfcG9vbC5zaXplKQBWQUxJREFURV9CVUZGRVJERVNDX0RBVEE6IGltbXV0YWJsZSBidWZmZXJzIG11c3QgYmUgaW5pdGlhbGl6ZWQgd2l0aCBkYXRhIChzZ19idWZmZXJfZGVzYy5kYXRhLnB0ciBhbmQgc2dfYnVmZmVyX2Rlc2MuZGF0YS5zaXplKQBwICYmIChTR19JTlZBTElEX0lEICE9IGF0dHNfaWQpAHAgJiYgKFNHX0lOVkFMSURfSUQgIT0gc21wX2lkKQBwICYmIChTR19JTlZBTElEX0lEICE9IHBpcF9pZCkAcCAmJiAoU0dfSU5WQUxJRF9JRCAhPSBpbWdfaWQpAHAgJiYgKFNHX0lOVkFMSURfSUQgIT0gYnVmX2lkKQBwICYmIChTR19JTlZBTElEX0lEICE9IHNoZF9pZCkAYm5kLnBpcC0+c2hhZGVyICYmIChibmQucGlwLT5jbW4uc2hhZGVyX2lkLmlkID09IGJuZC5waXAtPnNoYWRlci0+c2xvdC5pZCkAcGlwLT5zaGFkZXIgJiYgKHBpcC0+Y21uLnNoYWRlcl9pZC5pZCA9PSBwaXAtPnNoYWRlci0+c2xvdC5pZCkAcGlwLT5zaGFkZXIgJiYgKHBpcC0+c2hhZGVyLT5zbG90LmlkID09IHBpcC0+Y21uLnNoYWRlcl9pZC5pZCkAKHNyYy0+c2FtcGxlcl9zbG90ID49IDApICYmIChzcmMtPnNhbXBsZXJfc2xvdCA8IFNHX01BWF9TQU1QTEVSX0JJTkRTTE9UUykAc2J1Zl9kZXNjLT5nbHNsX2JpbmRpbmdfbiA8ICgyICogU0dfTUFYX1NUT1JBR0VCVUZGRVJfQklORFNMT1RTKQAoc3JjLT5pbWFnZV9zbG90ID49IDApICYmIChzcmMtPmltYWdlX3Nsb3QgPCBTR19NQVhfSU1BR0VfQklORFNMT1RTKQAoZGVzYy0+Y29sb3JfY291bnQgPj0gMCkgJiYgKGRlc2MtPmNvbG9yX2NvdW50IDw9IFNHX01BWF9DT0xPUl9BVFRBQ0hNRU5UUykAYXR0cyAmJiAoaW5kZXggPj0gMCkgJiYgKGluZGV4IDwgU0dfTUFYX0NPTE9SX0FUVEFDSE1FTlRTKQAobnVtX2ltYWdlcyA+IDApICYmIChudW1faW1hZ2VzIDw9IFNBUFBfTUFYX0lDT05JTUFHRVMpAChkZXNjLT5hdHRhY2htZW50c19wb29sX3NpemUgPiAwKSAmJiAoZGVzYy0+YXR0YWNobWVudHNfcG9vbF9zaXplIDwgX1NHX01BWF9QT09MX1NJWkUpAChkZXNjLT5zYW1wbGVyX3Bvb2xfc2l6ZSA+IDApICYmIChkZXNjLT5zYW1wbGVyX3Bvb2xfc2l6ZSA8IF9TR19NQVhfUE9PTF9TSVpFKQAoZGVzYy0+YnVmZmVyX3Bvb2xfc2l6ZSA+IDApICYmIChkZXNjLT5idWZmZXJfcG9vbF9zaXplIDwgX1NHX01BWF9QT09MX1NJWkUpAChkZXNjLT5zaGFkZXJfcG9vbF9zaXplID4gMCkgJiYgKGRlc2MtPnNoYWRlcl9wb29sX3NpemUgPCBfU0dfTUFYX1BPT0xfU0laRSkAKGRlc2MtPnBpcGVsaW5lX3Bvb2xfc2l6ZSA+IDApICYmIChkZXNjLT5waXBlbGluZV9wb29sX3NpemUgPCBfU0dfTUFYX1BPT0xfU0laRSkAKGRlc2MtPmltYWdlX3Bvb2xfc2l6ZSA+IDApICYmIChkZXNjLT5pbWFnZV9wb29sX3NpemUgPCBfU0dfTUFYX1BPT0xfU0laRSkAKHBpcC0+c2hhZGVyID09IDApICYmIChwaXAtPmNtbi5zaGFkZXJfaWQuaWQgIT0gU0dfSU5WQUxJRF9JRCkAKHBpcC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX1ZBTElEKXx8KHBpcC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0ZBSUxFRCkAKHBpcC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX1ZBTElEKSB8fCAocGlwLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfRkFJTEVEKQAoYnVmLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfVkFMSUQpfHwoYnVmLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfRkFJTEVEKQAoYnVmLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfVkFMSUQpIHx8IChidWYtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9GQUlMRUQpAChzaGQtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9WQUxJRCl8fChzaGQtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9GQUlMRUQpAChzaGQtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9WQUxJRCkgfHwgKHNoZC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0ZBSUxFRCkAcGlwICYmIChwaXAtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9BTExPQykAYnVmICYmIChidWYtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9BTExPQykAc2hkICYmIChzaGQtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9BTExPQykAV0lOMzJfV0dMX09QRU5HTF9WRVJTSU9OX05PVF9TVVBQT1JURUQ6IHJlcXVlc3RlZCBPcGVuR0wgdmVyc2lvbiBub3Qgc3VwcG9ydGVkIGJ5IEdMIGRyaXZlciAoRVJST1JfSU5WQUxJRF9WRVJTSU9OX0FSQikAV0lOMzJfV0dMX09QRU5HTF9QUk9GSUxFX05PVF9TVVBQT1JURUQ6IHJlcXVlc3RlZCBPcGVuR0wgcHJvZmlsZSBub3Qgc3VwcG9ydCBieSBHTCBkcml2ZXIgKEVSUk9SX0lOVkFMSURfUFJPRklMRV9BUkIpAFZBTElEQVRFX1NIQURFUkRFU0NfU0FNUExFUl9XR1NMX0dST1VQMV9CSU5ESU5HX09VVF9PRl9SQU5HRTogc2FtcGxlciAnd2dzbF9ncm91cDFfYmluZGluZ19uJyBpcyBvdXQgb2YgcmFuZ2UgKG11c3QgYmUgMC4uMTI3KQBWQUxJREFURV9TSEFERVJERVNDX1NUT1JBR0VCVUZGRVJfV0dTTF9HUk9VUDFfQklORElOR19PVVRfT0ZfUkFOR0U6IHN0b3JhZ2UgYnVmZmVyICd3Z3NsX2dyb3VwMV9iaW5kaW5nX24nIGlzIG91dCBvZiByYW5nZSAobXVzdCBiZSAwLi4xMjcpAFZBTElEQVRFX1NIQURFUkRFU0NfSU1BR0VfV0dTTF9HUk9VUDFfQklORElOR19PVVRfT0ZfUkFOR0U6IGltYWdlICd3Z3NsX2dyb3VwMV9iaW5kaW5nX24nIGlzIG91dCBvZiByYW5nZSAobXVzdCBiZSAwLi4xMjcpAFZBTElEQVRFX1NIQURFUkRFU0NfVUJfTUVUQUxfQlVGRkVSX1NMT1RfT1VUX09GX1JBTkdFOiB1bmlmb3JtIGJsb2NrICdtc2xfYnVmZmVyX24nIGlzIG91dCBvZiByYW5nZSAobXVzdCBiZSAwLi43KQBWQUxJREFURV9TSEFERVJERVNDX1VCX0hMU0xfUkVHSVNURVJfQl9PVVRfT0ZfUkFOR0U6IHVuaWZvcm0gYmxvY2sgJ2hsc2xfcmVnaXN0ZXJfYl9uJyBpcyBvdXQgb2YgcmFuZ2UgKG11c3QgYmUgMC4uNykAVkFMSURBVEVfU0hBREVSREVTQ19BVFRSX1NUUklOR19UT09fTE9ORzogdmVydGV4IGF0dHJpYnV0ZSBuYW1lL3NlbWFudGljIHN0cmluZyB0b28gbG9uZyAobWF4IGxlbiAxNikAVkFMSURBVEVfU0hBREVSREVTQ19TVE9SQUdFQlVGRkVSX01FVEFMX0JVRkZFUl9TTE9UX09VVF9PRl9SQU5HRTogc3RvcmFnZSBidWZmZXIgJ21zbF9idWZmZXJfbicgaXMgb3V0IG9mIHJhbmdlIChtdXN0IGJlIDguLjE1KQBWQUxJREFURV9TSEFERVJERVNDX1NBTVBMRVJfSExTTF9SRUdJU1RFUl9TX09VVF9PRl9SQU5HRTogc2FtcGxlciAnaGxzbF9yZWdpc3Rlcl9zX24nIGlzIG91dCBvZiByYW5nIChtdXN0IGJlIDAuLjE1KQBWQUxJREFURV9TSEFERVJERVNDX1NBTVBMRVJfTUVUQUxfU0FNUExFUl9TTE9UX09VVF9PRl9SQU5HRTogc2FtcGxlciAnbXNsX3NhbXBsZXJfbicgaXMgb3V0IG9mIHJhbmdlIChtdXN0IGJlIDAuLjE1KQBWQUxJREFURV9TSEFERVJERVNDX1NUT1JBR0VCVUZGRVJfR0xTTF9CSU5ESU5HX09VVF9PRl9SQU5HRTogc3RvcmFnZSBidWZmZXIgJ2dsc2xfYmluZGluZ19uJyBpcyBvdXQgb2YgcmFuZ2UgKG11c3QgYmUgMC4uMTUpAFZBTElEQVRFX1NIQURFUkRFU0NfVUJfV0dTTF9HUk9VUDBfQklORElOR19PVVRfT0ZfUkFOR0U6IHVuaWZvcm0gYmxvY2sgJ3dnc2xfZ3JvdXAwX2JpbmRpbmdfbicgaXMgb3V0IG9mIHJhbmdlIChtdXN0IGJlIDAuLjE1KQBWQUxJREFURV9TSEFERVJERVNDX0lNQUdFX01FVEFMX1RFWFRVUkVfU0xPVF9PVVRfT0ZfUkFOR0U6IGltYWdlICdtc2xfdGV4dHVyZV9uJyBpcyBvdXQgb2YgcmFuZ2UgKG11c3QgYmUgMC4uMTUpAFZBTElEQVRFX1NIQURFUkRFU0NfU1RPUkFHRUJVRkZFUl9ITFNMX1JFR0lTVEVSX1RfT1VUX09GX1JBTkdFOiBzdG9yYWdlIGJ1ZmZlciAnaGxzbF9yZWdpc3Rlcl90X24nIGlzIG91dCBvZiByYW5nZSAobXVzdCBiZSAwLi4yMykAVkFMSURBVEVfU0hBREVSREVTQ19JTUFHRV9ITFNMX1JFR0lTVEVSX1RfT1VUX09GX1JBTkdFOiBpbWFnZSAnaGxzbF9yZWdpc3Rlcl90X24nIGlzIG91dCBvZiByYW5nZSAobXVzdCBiZSAwLi4yMykAVkFMSURBVEVfQlVGRkVSREVTQ19TVE9SQUdFQlVGRkVSX1NVUFBPUlRFRDogc3RvcmFnZSBidWZmZXJzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGJhY2tlbmQgM0QgQVBJIChyZXF1aXJlcyBPcGVuR0wgPj0gNC4zKQBMSU5VWF9HTFhfVkVSU0lPTl9UT09fTE9XOiBHTFggdmVyc2lvbiB0b28gbG93IChuZWVkIGF0IGxlYXN0IDEuMykARDNEMTFfQ1JFQVRFX0NPTlNUQU5UX0JVRkZFUl9GQUlMRUQ6IENyZWF0ZUJ1ZmZlcigpIGZhaWxlZCBmb3IgdW5pZm9ybSBjb25zdGFudCBidWZmZXIgKGQzZDExKQBEM0QxMV9NQVBfRk9SX0FQUEVORF9CVUZGRVJfRkFJTEVEOiBNYXAoKSBmYWlsZWQgd2hlbiBhcHBlbmRpbmcgdG8gYnVmZmVyIChkM2QxMSkARDNEMTFfTUFQX0ZPUl9VUERBVEVfQlVGRkVSX0ZBSUxFRDogTWFwKCkgZmFpbGVkIHdoZW4gdXBkYXRpbmcgYnVmZmVyIChkM2QxMSkARDNEMTFfQ1JFQVRFX0JVRkZFUl9TUlZfRkFJTEVEOiBDcmVhdGVTaGFkZXJSZXNvdXJjZVZpZXcoKSBmYWlsZWQgZm9yIHN0b3JhZ2UgYnVmZmVyIChkM2QxMSkARDNEMTFfQ1JFQVRFXzJEX1RFWFRVUkVfVU5TVVBQT1JURURfUElYRUxfRk9STUFUOiBwaXhlbCBmb3JtYXQgbm90IHN1cHBvcnRlZCBmb3IgMmQtLCBjdWJlLSBvciBhcnJheS10ZXh0dXJlIChkM2QxMSkARDNEMTFfQ1JFQVRFXzJEX1NSVl9GQUlMRUQ6IENyZWF0ZVNoYWRlclJlc291cmNlVmlldygpIGZhaWxlZCBmb3IgMmQtLCBjdWJlLSBvciBhcnJheS10ZXh0dXJlIChkM2QxMSkARDNEMTFfQ1JFQVRFXzJEX1RFWFRVUkVfRkFJTEVEOiBDcmVhdGVUZXh0dXJlMkQoKSBmYWlsZWQgZm9yIDJkLSwgY3ViZS0gb3IgYXJyYXktdGV4dHVyZSAoZDNkMTEpAEQzRDExX0NSRUFURV9NU0FBX1RFWFRVUkVfRkFJTEVEOiBDcmVhdGVUZXh0dXJlMkQoKSBmYWlsZWQgZm9yIE1TQUEgcmVuZGVyIHRhcmdldCB0ZXh0dXJlIChkM2QxMSkARDNEMTFfQ1JFQVRFX0RFUFRIX1RFWFRVUkVfVU5TVVBQT1JURURfUElYRUxfRk9STUFUOiBwaXhlbCBmb3JtYXQgbm90IHN1cHBvcnRlZCBmb3IgZGVwdGgtc3RlbmNpbCB0ZXh0dXJlIChkM2QxMSkARDNEMTFfQ1JFQVRFX0RFUFRIX1RFWFRVUkVfRkFJTEVEOiBDcmVhdGVUZXh0dXJlMkQoKSBmYWlsZWQgZm9yIGRlcHRoLXN0ZW5jaWwgdGV4dHVyZSAoZDNkMTEpAEQzRDExX0NSRUFURV8zRF9TUlZfRkFJTEVEOiBDcmVhdGVTaGFkZXJSZXNvdXJjZVZpZXcoKSBmYWlsZWQgZm9yIDNkIHRleHR1cmUgKGQzZDExKQBEM0QxMV9DUkVBVEVfM0RfVEVYVFVSRV9VTlNVUFBPUlRFRF9QSVhFTF9GT1JNQVQ6IHBpeGVsIGZvcm1hdCBub3Qgc3VwcG9ydGVkIGZvciAzRCB0ZXh0dXJlIChkM2QxMSkARDNEMTFfTUFQX0ZPUl9VUERBVEVfSU1BR0VfRkFJTEVEOiBNYXAoKSBmYWlsZWQgd2hlbiB1cGRhdGluZyBpbWFnZSAoZDNkMTEpAEQzRDExX1NIQURFUl9DT01QSUxBVElPTl9GQUlMRUQ6IHNoYWRlciBjb21waWxhdGlvbiBmYWlsZWQgKGQzZDExKQBEM0QxMV9MT0FEX0QzRENPTVBJTEVSXzQ3X0RMTF9GQUlMRUQ6IGxvYWRpbmcgZDNkY29tcGlsZXJfNDcuZGxsIGZhaWxlZCAoZDNkMTEpAEQzRDExX0NSRUFURV9SVFZfRkFJTEVEOiBDcmVhdGVSZW5kZXJUYXJnZXRWaWV3KCkgZmFpbGVkIChkM2QxMSkARDNEMTFfQ1JFQVRFX0RTVl9GQUlMRUQ6IENyZWF0ZURlcHRoU3RlbmNpbFZpZXcoKSBmYWlsZWQgKGQzZDExKQBEM0QxMV9DUkVBVEVfSU5QVVRfTEFZT1VUX0ZBSUxFRDogQ3JlYXRlSW5wdXRMYXlvdXQoKSBmYWlsZWQgKGQzZDExKQBEM0QxMV9DUkVBVEVfQlVGRkVSX0ZBSUxFRDogQ3JlYXRlQnVmZmVyKCkgZmFpbGVkIChkM2QxMSkARDNEMTFfQ1JFQVRFX1JBU1RFUklaRVJfU1RBVEVfRkFJTEVEOiBDcmVhdGVSYXN0ZXJpemVyU3RhdGUoKSBmYWlsZWQgKGQzZDExKQBEM0QxMV9DUkVBVEVfU0FNUExFUl9TVEFURV9GQUlMRUQ6IENyZWF0ZVNhbXBsZXJTdGF0ZSgpIGZhaWxlZCAoZDNkMTEpAEQzRDExX0NSRUFURV9ERVBUSF9TVEVOQ0lMX1NUQVRFX0ZBSUxFRDogQ3JlYXRlRGVwdGhTdGVuY2lsU3RhdGUoKSBmYWlsZWQgKGQzZDExKQBEM0QxMV9DUkVBVEVfQkxFTkRfU1RBVEVfRkFJTEVEOiBDcmVhdGVCbGVuZFN0YXRlKCkgZmFpbGVkIChkM2QxMSkARDNEMTFfQ1JFQVRFXzNEX1RFWFRVUkVfRkFJTEVEOiBDcmVhdGVUZXh0dXJlM0QoKSBmYWlsZWQgKGQzZDExKQBNQUNPU19JTlZBTElEX05TT1BFTkdMX1BST0ZJTEU6IG1hY29zOiBpbnZhbGlkIE5TT3BlbkdMUHJvZmlsZSAodmFsaWQgY2hvaWNlcyBhcmUgMS4wIGFuZCA0LjEpAHBvb2wgJiYgKG51bSA+PSAxKQAoYmluZGluZ3MtPl9zdGFydF9jYW5hcnkgPT0gMCkgJiYgKGJpbmRpbmdzLT5fZW5kX2NhbmFyeT09MCkAKF9zYXBwLmZyYW1lYnVmZmVyX3dpZHRoID4gMCkgJiYgKF9zYXBwLmZyYW1lYnVmZmVyX2hlaWdodCA+IDApAHNyYyAmJiBkc3QgJiYgKG1heF9sZW4gPiAwKQBwdHIgJiYgKHNpemUgPiAwKQAocGFzcy0+X3N0YXJ0X2NhbmFyeSA9PSAwKSAmJiAocGFzcy0+X2VuZF9jYW5hcnkgPT0gMCkAKGRlc2MtPl9zdGFydF9jYW5hcnkgPT0gMCkgJiYgKGRlc2MtPl9lbmRfY2FuYXJ5ID09IDApAChhbGlnbiA+IDApICYmICgoYWxpZ24gJiAoYWxpZ24gLSAxKSkgPT0gMCkAKGdsX3RleF9zbG90ID49IDApICYmIChnbF90ZXhfc2xvdCA8IChTR19NQVhfSU1BR0VfU0FNUExFUl9QQUlSUykpAEFORFJPSURfTkFUSVZFX0FDVElWSVRZX09OU1RBUlQ6IE5hdGl2ZUFjdGl2aXR5IG9uU3RhcnQoKQBBTkRST0lEX05BVElWRV9BQ1RJVklUWV9PTlNUT1A6IE5hdGl2ZUFjdGl2aXR5IG9uU3RvcCgpAERSQVdfUkVRVUlSRURfQklORElOR1NfT1JfVU5JRk9STVNfTUlTU0lORzogY2FsbCB0byBzZ19hcHBseV9iaW5kaW5ncygpIGFuZC9vciBzZ19hcHBseV91bmlmb3JtcygpIG1pc3NpbmcgYWZ0ZXIgc2dfYXBwbHlfcGlwZWxpbmUoKQBWQUxJREFURV9BVUJfTk9fUElQRUxJTkU6IHNnX2FwcGx5X3VuaWZvcm1zOiBtdXN0IGJlIGNhbGxlZCBhZnRlciBzZ19hcHBseV9waXBlbGluZSgpAEFORFJPSURfVU5TVVBQT1JURURfSU5QVVRfRVZFTlRfSU5QVVRfQ0I6IHVuc3VwcG9ydGVkIGlucHV0IGV2ZW50IGVuY291bnRlcmVkIGluIF9zYXBwX2FuZHJvaWRfaW5wdXRfY2IoKQBBTkRST0lEX1JFQURfTVNHX0ZBSUxFRDogZmFpbGVkIHRvIHJlYWQgbWVzc2FnZSBpbiBfc2FwcF9hbmRyb2lkX21haW5fY2IoKQBBTkRST0lEX1VOU1VQUE9SVEVEX0lOUFVUX0VWRU5UX01BSU5fQ0I6IHVuc3VwcG9ydGVkIGlucHV0IGV2ZW50IGVuY291bnRlcmVkIGluIF9zYXBwX2FuZHJvaWRfbWFpbl9jYigpAFdHUFVfUkVRVUVTVF9BREFQVEVSX1NUQVRVU19FUlJPUjogd2dwdTogcmVxdWVzdGluZyBhZGFwdGVyIGZhaWxlZCB3aXRoIHN0YXR1cyAnZXJyb3InAFdHUFVfUkVRVUVTVF9ERVZJQ0VfU1RBVFVTX0VSUk9SOiB3Z3B1OiByZXF1ZXN0aW5nIGRldmljZSBmYWlsZWQgd2l0aCBzdGF0dXMgJ2Vycm9yJwBX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AMUvAQBjYQEAGm4BAFZUAQAKVAEAtUoBAMRlAQBVZgEAsRABAIsuAQCXSwEAaS8BAPIbAQDbqwEAJwMBANoqAQCnGwEAdCkBAGdAAQD6PwEAWRsBAMYpAQCNPwEAzkgBAL9AAQDyVwEAEAMCAABB8PgGC6EzKGNoYXIqIHNlbGVjdG9yKTw6Oj57IGlmIChNb2R1bGUuY2FudmFzKSB7IGNvbnNvbGUubG9nKCdjYW52YXMgc2V0IHdpdGggcGFyYW0nLCBNb2R1bGUuY2FudmFzKTsgcmV0dXJuOyB9IGNvbnN0IGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFVURjhUb1N0cmluZyhzZWxlY3RvcikpOyBpZiAoZSkgeyBNb2R1bGUuY2FudmFzID0gZTsgfSBjb25zb2xlLmxvZygnY2FudmFzIHNldCcsIE1vZHVsZS5jYW52YXMpOyB9ACh2b2lkKTw6Oj57IE1vZHVsZS5zb2tvbF9iZWZvcmV1bmxvYWQgPSAoZXZlbnQpID0+IHsgaWYgKF9fc2FwcF9odG1sNV9nZXRfYXNrX2xlYXZlX3NpdGUoKSAhPSAwKSB7IGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IGV2ZW50LnJldHVyblZhbHVlID0gJyAnOyB9IH07IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCBNb2R1bGUuc29rb2xfYmVmb3JldW5sb2FkKTsgfQAodm9pZCk8Ojo+eyB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgTW9kdWxlLnNva29sX2JlZm9yZXVubG9hZCk7IH0AKHZvaWQpPDo6PnsgTW9kdWxlLnNva29sX3Bhc3RlID0gKGV2ZW50KSA9PiB7IGNvbnN0IHBhc3RlZF9zdHIgPSBldmVudC5jbGlwYm9hcmREYXRhLmdldERhdGEoJ3RleHQnKTsgd2l0aFN0YWNrU2F2ZSgoKSA9PiB7IGNvbnN0IGNzdHIgPSBzdHJpbmdUb1VURjhPblN0YWNrKHBhc3RlZF9zdHIpOyBfX3NhcHBfZW1zY19vbnBhc3RlKGNzdHIpOyB9KTsgfTsgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Bhc3RlJywgTW9kdWxlLnNva29sX3Bhc3RlKTsgfQAodm9pZCk8Ojo+eyB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncGFzdGUnLCBNb2R1bGUuc29rb2xfcGFzdGUpOyB9AChjb25zdCBjaGFyKiBjX3N0cik8Ojo+eyBjb25zdCBzdHIgPSBVVEY4VG9TdHJpbmcoY19zdHIpOyBjb25zdCB0YSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7IHRhLnNldEF0dHJpYnV0ZSgnYXV0b2NvbXBsZXRlJywgJ29mZicpOyB0YS5zZXRBdHRyaWJ1dGUoJ2F1dG9jb3JyZWN0JywgJ29mZicpOyB0YS5zZXRBdHRyaWJ1dGUoJ2F1dG9jYXBpdGFsaXplJywgJ29mZicpOyB0YS5zZXRBdHRyaWJ1dGUoJ3NwZWxsY2hlY2snLCAnZmFsc2UnKTsgdGEuc3R5bGUubGVmdCA9IC0xMDAgKyAncHgnOyB0YS5zdHlsZS50b3AgPSAtMTAwICsgJ3B4JzsgdGEuc3R5bGUuaGVpZ2h0ID0gMTsgdGEuc3R5bGUud2lkdGggPSAxOyB0YS52YWx1ZSA9IHN0cjsgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0YSk7IHRhLnNlbGVjdCgpOyBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpOyBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRhKTsgfQAoY29uc3QgY2hhciogY2FudmFzX25hbWVfY3N0cik8Ojo+eyBNb2R1bGUuc29rb2xfZHJvcF9maWxlcyA9IFtdOyBjb25zdCBjYW52YXNfbmFtZSA9IFVURjhUb1N0cmluZyhjYW52YXNfbmFtZV9jc3RyKTsgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FudmFzX25hbWUpOyBNb2R1bGUuc29rb2xfZHJhZ2VudGVyID0gKGV2ZW50KSA9PiB7IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyB9OyBNb2R1bGUuc29rb2xfZHJhZ2xlYXZlID0gKGV2ZW50KSA9PiB7IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyB9OyBNb2R1bGUuc29rb2xfZHJhZ292ZXIgPSAoZXZlbnQpID0+IHsgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7IGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IH07IE1vZHVsZS5zb2tvbF9kcm9wID0gKGV2ZW50KSA9PiB7IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyBjb25zdCBmaWxlcyA9IGV2ZW50LmRhdGFUcmFuc2Zlci5maWxlczsgTW9kdWxlLnNva29sX2Ryb3BwZWRfZmlsZXMgPSBmaWxlczsgX19zYXBwX2Vtc2NfYmVnaW5fZHJvcChmaWxlcy5sZW5ndGgpOyBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKSB7IHdpdGhTdGFja1NhdmUoKCkgPT4geyBjb25zdCBjc3RyID0gc3RyaW5nVG9VVEY4T25TdGFjayhmaWxlc1tpXS5uYW1lKTsgX19zYXBwX2Vtc2NfZHJvcChpLCBjc3RyKTsgfSk7IH0gbGV0IG1vZHMgPSAwOyBpZiAoZXZlbnQuc2hpZnRLZXkpIHsgbW9kcyB8PSAxOyB9IGlmIChldmVudC5jdHJsS2V5KSB7IG1vZHMgfD0gMjsgfSBpZiAoZXZlbnQuYWx0S2V5KSB7IG1vZHMgfD0gNDsgfSBpZiAoZXZlbnQubWV0YUtleSkgeyBtb2RzIHw9IDg7IH0gX19zYXBwX2Vtc2NfZW5kX2Ryb3AoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSwgbW9kcyk7IH07IGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCBNb2R1bGUuc29rb2xfZHJhZ2VudGVyLCBmYWxzZSk7IGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCBNb2R1bGUuc29rb2xfZHJhZ2xlYXZlLCBmYWxzZSk7IGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIE1vZHVsZS5zb2tvbF9kcmFnb3ZlciwgZmFsc2UpOyBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIE1vZHVsZS5zb2tvbF9kcm9wLCBmYWxzZSk7IH0AKGludCBpbmRleCk8Ojo+eyAvKiogQHN1cHByZXNzIHttaXNzaW5nUHJvcGVydGllc30gKi8gY29uc3QgZmlsZXMgPSBNb2R1bGUuc29rb2xfZHJvcHBlZF9maWxlczsgaWYgKChpbmRleCA8IDApIHx8IChpbmRleCA+PSBmaWxlcy5sZW5ndGgpKSB7IHJldHVybiAwOyB9IGVsc2UgeyByZXR1cm4gZmlsZXNbaW5kZXhdLnNpemU7IH0gfQAoaW50IGluZGV4LCBfc2FwcF9odG1sNV9mZXRjaF9jYWxsYmFjayBjYWxsYmFjaywgdm9pZCogYnVmX3B0ciwgdWludDMyX3QgYnVmX3NpemUsIHZvaWQqIHVzZXJfZGF0YSk8Ojo+eyBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpOyByZWFkZXIub25sb2FkID0gKGxvYWRFdmVudCkgPT4geyBjb25zdCBjb250ZW50ID0gbG9hZEV2ZW50LnRhcmdldC5yZXN1bHQ7IGlmIChjb250ZW50LmJ5dGVMZW5ndGggPiBidWZfc2l6ZSkgeyBfX3NhcHBfZW1zY19pbnZva2VfZmV0Y2hfY2IoaW5kZXgsIDAsIDEsIGNhbGxiYWNrLCAwLCBidWZfcHRyLCBidWZfc2l6ZSwgdXNlcl9kYXRhKTsgfSBlbHNlIHsgSEVBUFU4LnNldChuZXcgVWludDhBcnJheShjb250ZW50KSwgYnVmX3B0cik7IF9fc2FwcF9lbXNjX2ludm9rZV9mZXRjaF9jYihpbmRleCwgMSwgMCwgY2FsbGJhY2ssIGNvbnRlbnQuYnl0ZUxlbmd0aCwgYnVmX3B0ciwgYnVmX3NpemUsIHVzZXJfZGF0YSk7IH0gfTsgcmVhZGVyLm9uZXJyb3IgPSAoKSA9PiB7IF9fc2FwcF9lbXNjX2ludm9rZV9mZXRjaF9jYihpbmRleCwgMCwgMiwgY2FsbGJhY2ssIDAsIGJ1Zl9wdHIsIGJ1Zl9zaXplLCB1c2VyX2RhdGEpOyB9OyAvKiogQHN1cHByZXNzIHttaXNzaW5nUHJvcGVydGllc30gKi8gY29uc3QgZmlsZXMgPSBNb2R1bGUuc29rb2xfZHJvcHBlZF9maWxlczsgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGZpbGVzW2luZGV4XSk7IH0AKGNvbnN0IGNoYXIqIGNhbnZhc19uYW1lX2NzdHIpPDo6PnsgY29uc3QgY2FudmFzX25hbWUgPSBVVEY4VG9TdHJpbmcoY2FudmFzX25hbWVfY3N0cik7IGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNhbnZhc19uYW1lKTsgY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIE1vZHVsZS5zb2tvbF9kcmFnZW50ZXIpOyBjYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgTW9kdWxlLnNva29sX2RyYWdsZWF2ZSk7IGNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIE1vZHVsZS5zb2tvbF9kcmFnb3Zlcik7IGNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCdkcm9wJywgTW9kdWxlLnNva29sX2Ryb3ApOyB9AChjb25zdCBjaGFyKiBjX3N0cl90YXJnZXQpPDo6PnsgY29uc3QgdGFyZ2V0X3N0ciA9IFVURjhUb1N0cmluZyhjX3N0cl90YXJnZXQpOyBNb2R1bGUuc2FwcF9lbXNjX3RhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldF9zdHIpOyBpZiAoIU1vZHVsZS5zYXBwX2Vtc2NfdGFyZ2V0KSB7IGNvbnNvbGUubG9nKCJzb2tvbF9hcHAuaDogaW52YWxpZCB0YXJnZXQ6IiArIHRhcmdldF9zdHIpOyB9IGlmICghTW9kdWxlLnNhcHBfZW1zY190YXJnZXQucmVxdWVzdFBvaW50ZXJMb2NrKSB7IGNvbnNvbGUubG9nKCJzb2tvbF9hcHAuaDogdGFyZ2V0IGRvZXNuJ3Qgc3VwcG9ydCByZXF1ZXN0UG9pbnRlckxvY2s6IiArIHRhcmdldF9zdHIpOyB9IH0AKHZvaWQpPDo6PnsgaWYgKE1vZHVsZS5zYXBwX2Vtc2NfdGFyZ2V0KSB7IGlmIChNb2R1bGUuc2FwcF9lbXNjX3RhcmdldC5yZXF1ZXN0UG9pbnRlckxvY2spIHsgTW9kdWxlLnNhcHBfZW1zY190YXJnZXQucmVxdWVzdFBvaW50ZXJMb2NrKCk7IH0gfSB9ACh2b2lkKTw6Oj57IGlmIChkb2N1bWVudC5leGl0UG9pbnRlckxvY2spIHsgZG9jdW1lbnQuZXhpdFBvaW50ZXJMb2NrKCk7IH0gfQAoaW50IGN1cnNvcl90eXBlLCBpbnQgc2hvd24pPDo6PnsgaWYgKE1vZHVsZS5zYXBwX2Vtc2NfdGFyZ2V0KSB7IGxldCBjdXJzb3I7IGlmIChzaG93biA9PT0gMCkgeyBjdXJzb3IgPSAibm9uZSI7IH0gZWxzZSBzd2l0Y2ggKGN1cnNvcl90eXBlKSB7IGNhc2UgMDogY3Vyc29yID0gImF1dG8iOyBicmVhazsgY2FzZSAxOiBjdXJzb3IgPSAiZGVmYXVsdCI7IGJyZWFrOyBjYXNlIDI6IGN1cnNvciA9ICJ0ZXh0IjsgYnJlYWs7IGNhc2UgMzogY3Vyc29yID0gImNyb3NzaGFpciI7IGJyZWFrOyBjYXNlIDQ6IGN1cnNvciA9ICJwb2ludGVyIjsgYnJlYWs7IGNhc2UgNTogY3Vyc29yID0gImV3LXJlc2l6ZSI7IGJyZWFrOyBjYXNlIDY6IGN1cnNvciA9ICJucy1yZXNpemUiOyBicmVhazsgY2FzZSA3OiBjdXJzb3IgPSAibndzZS1yZXNpemUiOyBicmVhazsgY2FzZSA4OiBjdXJzb3IgPSAibmVzdy1yZXNpemUiOyBicmVhazsgY2FzZSA5OiBjdXJzb3IgPSAiYWxsLXNjcm9sbCI7IGJyZWFrOyBjYXNlIDEwOiBjdXJzb3IgPSAibm90LWFsbG93ZWQiOyBicmVhazsgZGVmYXVsdDogY3Vyc29yID0gImF1dG8iOyBicmVhazsgfSBNb2R1bGUuc2FwcF9lbXNjX3RhcmdldC5zdHlsZS5jdXJzb3IgPSBjdXJzb3I7IH0gfQAodm9pZCk8Ojo+eyBjb25zdCBsaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nva29sLWFwcC1mYXZpY29uJyk7IGlmIChsaW5rKSB7IGRvY3VtZW50LmhlYWQucmVtb3ZlQ2hpbGQobGluayk7IH0gfQAoaW50IHcsIGludCBoLCBjb25zdCB1aW50OF90KiBwaXhlbHMpPDo6PnsgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7IGNhbnZhcy53aWR0aCA9IHc7IGNhbnZhcy5oZWlnaHQgPSBoOyBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTsgY29uc3QgaW1nX2RhdGEgPSBjdHguY3JlYXRlSW1hZ2VEYXRhKHcsIGgpOyBpbWdfZGF0YS5kYXRhLnNldChIRUFQVTguc3ViYXJyYXkocGl4ZWxzLCBwaXhlbHMgKyB3KmgqNCkpOyBjdHgucHV0SW1hZ2VEYXRhKGltZ19kYXRhLCAwLCAwKTsgY29uc3QgbmV3X2xpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7IG5ld19saW5rLmlkID0gJ3Nva29sLWFwcC1mYXZpY29uJzsgbmV3X2xpbmsucmVsID0gJ3Nob3J0Y3V0IGljb24nOyBuZXdfbGluay5ocmVmID0gY2FudmFzLnRvRGF0YVVSTCgpOyBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKG5ld19saW5rKTsgfQAoZG91YmxlKiB3LCBkb3VibGUqIGgpPDo6PnsgTW9kdWxlLkhFQVBGNjRbdy84XSA9IE1vZHVsZS5jYW52YXMub2Zmc2V0V2lkdGg7IE1vZHVsZS5IRUFQRjY0W3cvOF0gPSBNb2R1bGUuY2FudmFzLm9mZnNldEhlaWdodDsgfQAoaW50IHcsIGludCBoKTw6Oj57IE1vZHVsZS5jYW52YXMud2lkdGggPSB3OyBNb2R1bGUuY2FudmFzLmhlaWdodCA9IGg7IH0AKF9Cb29sIGFscGhhLCBfQm9vbCBhbnRpYWxpYXMsIF9Cb29sIHByZW11bHRpcGxpZWRBbHBoYSwgX0Jvb2wgcHJlc2VydmVEcmF3aW5nQnVmZmVyKTw6Oj57IGlmICghTW9kdWxlLmNhbnZhcykgeyBjb25zb2xlLmVycm9yKCdNYWtlIHN1cmUgdG8gc2V0dXAgTW9kdWxlLmNhbnZhcycpOyB9IHJldHVybiBHTC5jcmVhdGVDb250ZXh0KE1vZHVsZS5jYW52YXMsIHsgZGVwdGg6IHRydWUsIHN0ZW5jaWw6IHRydWUsIGVuYWJsZUV4dGVuc2lvbnNCeURlZmF1bHQ6IHRydWUsIG1ham9yVmVyc2lvbjogMiwgYWxwaGEsIGFudGlhbGlhcywgcHJlbXVsdGlwbGllZEFscGhhLCBwcmVzZXJ2ZURyYXdpbmdCdWZmZXIgfSk7IH0AKHVpbnQzMl90IGxldmVsLCBjb25zdCBjaGFyKiBjX3N0cik8Ojo+eyBjb25zdCBzdHIgPSBVVEY4VG9TdHJpbmcoY19zdHIpOyBzd2l0Y2ggKGxldmVsKSB7IGNhc2UgMDogY29uc29sZS5lcnJvcihzdHIpOyBicmVhazsgY2FzZSAxOiBjb25zb2xlLmVycm9yKHN0cik7IGJyZWFrOyBjYXNlIDI6IGNvbnNvbGUud2FybihzdHIpOyBicmVhazsgZGVmYXVsdDogY29uc29sZS5pbmZvKHN0cik7IGJyZWFrOyB9IH0AAEGRrAcLJCR3aXRoU3RhY2tTYXZlLCRzdHJpbmdUb1VURjhPblN0YWNrAA==';
    return f;
}

var wasmBinaryFile;

function getBinarySync(file) {
  if (file == wasmBinaryFile && wasmBinary) {
    return new Uint8Array(wasmBinary);
  }
  var binary = tryParseAsDataURI(file);
  if (binary) {
    return binary;
  }
  if (readBinary) {
    return readBinary(file);
  }
  throw 'both async and sync fetching of the wasm failed';
}

function getBinaryPromise(binaryFile) {

  // Otherwise, getBinarySync should be able to get it synchronously
  return Promise.resolve().then(() => getBinarySync(binaryFile));
}

function instantiateArrayBuffer(binaryFile, imports, receiver) {
  return getBinaryPromise(binaryFile).then((binary) => {
    return WebAssembly.instantiate(binary, imports);
  }).then(receiver, (reason) => {
    err(`failed to asynchronously prepare wasm: ${reason}`);

    // Warn on some common problems.
    if (isFileURI(wasmBinaryFile)) {
      err(`warning: Loading from a file URI (${wasmBinaryFile}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`);
    }
    abort(reason);
  });
}

function instantiateAsync(binary, binaryFile, imports, callback) {
  return instantiateArrayBuffer(binaryFile, imports, callback);
}

function getWasmImports() {
  // prepare imports
  return {
    'env': wasmImports,
    'wasi_snapshot_preview1': wasmImports,
  }
}

// Create the wasm instance.
// Receives the wasm imports, returns the exports.
function createWasm() {
  var info = getWasmImports();
  // Load the wasm module and create an instance of using native support in the JS engine.
  // handle a generated wasm instance, receiving its exports and
  // performing other necessary setup
  /** @param {WebAssembly.Module=} module*/
  function receiveInstance(instance, module) {
    wasmExports = instance.exports;

    

    wasmMemory = wasmExports['memory'];
    
    assert(wasmMemory, 'memory not found in wasm exports');
    updateMemoryViews();

    wasmTable = wasmExports['__indirect_function_table'];
    
    assert(wasmTable, 'table not found in wasm exports');

    addOnInit(wasmExports['__wasm_call_ctors']);

    removeRunDependency('wasm-instantiate');
    return wasmExports;
  }
  // wait for the pthread pool (if any)
  addRunDependency('wasm-instantiate');

  // Prefer streaming instantiation if available.
  // Async compilation can be confusing when an error on the page overwrites Module
  // (for example, if the order of elements is wrong, and the one defining Module is
  // later), so we save Module and check it later.
  var trueModule = Module;
  function receiveInstantiationResult(result) {
    // 'result' is a ResultObject object which has both the module and instance.
    // receiveInstance() will swap in the exports (to Module.asm) so they can be called
    assert(Module === trueModule, 'the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?');
    trueModule = null;
    // TODO: Due to Closure regression https://github.com/google/closure-compiler/issues/3193, the above line no longer optimizes out down to the following line.
    // When the regression is fixed, can restore the above PTHREADS-enabled path.
    receiveInstance(result['instance']);
  }

  // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
  // to manually instantiate the Wasm module themselves. This allows pages to
  // run the instantiation parallel to any other async startup actions they are
  // performing.
  // Also pthreads and wasm workers initialize the wasm instance through this
  // path.
  if (Module['instantiateWasm']) {
    try {
      return Module['instantiateWasm'](info, receiveInstance);
    } catch(e) {
      err(`Module.instantiateWasm callback failed with error: ${e}`);
        // If instantiation fails, reject the module ready promise.
        readyPromiseReject(e);
    }
  }

  wasmBinaryFile ??= findWasmBinary();

  // If instantiation fails, reject the module ready promise.
  instantiateAsync(wasmBinary, wasmBinaryFile, info, receiveInstantiationResult).catch(readyPromiseReject);
  return {}; // no exports yet; we'll fill them in later
}

// Globals used by JS i64 conversions (see makeSetValue)
var tempDouble;
var tempI64;

// include: runtime_debug.js
// Endianness check
(() => {
  var h16 = new Int16Array(1);
  var h8 = new Int8Array(h16.buffer);
  h16[0] = 0x6373;
  if (h8[0] !== 0x73 || h8[1] !== 0x63) throw 'Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)';
})();

if (Module['ENVIRONMENT']) {
  throw new Error('Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)');
}

function legacyModuleProp(prop, newName, incoming=true) {
  if (!Object.getOwnPropertyDescriptor(Module, prop)) {
    Object.defineProperty(Module, prop, {
      configurable: true,
      get() {
        let extra = incoming ? ' (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)' : '';
        abort(`\`Module.${prop}\` has been replaced by \`${newName}\`` + extra);

      }
    });
  }
}

function ignoredModuleProp(prop) {
  if (Object.getOwnPropertyDescriptor(Module, prop)) {
    abort(`\`Module.${prop}\` was supplied but \`${prop}\` not included in INCOMING_MODULE_JS_API`);
  }
}

// forcing the filesystem exports a few things by default
function isExportedByForceFilesystem(name) {
  return name === 'FS_createPath' ||
         name === 'FS_createDataFile' ||
         name === 'FS_createPreloadedFile' ||
         name === 'FS_unlink' ||
         name === 'addRunDependency' ||
         // The old FS has some functionality that WasmFS lacks.
         name === 'FS_createLazyFile' ||
         name === 'FS_createDevice' ||
         name === 'removeRunDependency';
}

/**
 * Intercept access to a global symbol.  This enables us to give informative
 * warnings/errors when folks attempt to use symbols they did not include in
 * their build, or no symbols that no longer exist.
 */
function hookGlobalSymbolAccess(sym, func) {
  if (typeof globalThis != 'undefined' && !Object.getOwnPropertyDescriptor(globalThis, sym)) {
    Object.defineProperty(globalThis, sym, {
      configurable: true,
      get() {
        func();
        return undefined;
      }
    });
  }
}

function missingGlobal(sym, msg) {
  hookGlobalSymbolAccess(sym, () => {
    warnOnce(`\`${sym}\` is not longer defined by emscripten. ${msg}`);
  });
}

missingGlobal('buffer', 'Please use HEAP8.buffer or wasmMemory.buffer');
missingGlobal('asm', 'Please use wasmExports instead');

function missingLibrarySymbol(sym) {
  hookGlobalSymbolAccess(sym, () => {
    // Can't `abort()` here because it would break code that does runtime
    // checks.  e.g. `if (typeof SDL === 'undefined')`.
    var msg = `\`${sym}\` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line`;
    // DEFAULT_LIBRARY_FUNCS_TO_INCLUDE requires the name as it appears in
    // library.js, which means $name for a JS name with no prefix, or name
    // for a JS name like _name.
    var librarySymbol = sym;
    if (!librarySymbol.startsWith('_')) {
      librarySymbol = '$' + sym;
    }
    msg += ` (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='${librarySymbol}')`;
    if (isExportedByForceFilesystem(sym)) {
      msg += '. Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you';
    }
    warnOnce(msg);
  });

  // Any symbol that is not included from the JS library is also (by definition)
  // not exported on the Module object.
  unexportedRuntimeSymbol(sym);
}

function unexportedRuntimeSymbol(sym) {
  if (!Object.getOwnPropertyDescriptor(Module, sym)) {
    Object.defineProperty(Module, sym, {
      configurable: true,
      get() {
        var msg = `'${sym}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;
        if (isExportedByForceFilesystem(sym)) {
          msg += '. Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you';
        }
        abort(msg);
      }
    });
  }
}

// Used by XXXXX_DEBUG settings to output debug messages.
function dbg(...args) {
  // TODO(sbc): Make this configurable somehow.  Its not always convenient for
  // logging to show up as warnings.
  console.warn(...args);
}
// end include: runtime_debug.js
// === Body ===

function _dk_grab_canvas(selector) { if (Module.canvas) { console.log('canvas set with param', Module.canvas); return; } const e = document.querySelector(UTF8ToString(selector)); if (e) { Module.canvas = e; } console.log('canvas set', Module.canvas); }
function sapp_js_add_beforeunload_listener() { Module.sokol_beforeunload = (event) => { if (__sapp_html5_get_ask_leave_site() != 0) { event.preventDefault(); event.returnValue = ' '; } }; window.addEventListener('beforeunload', Module.sokol_beforeunload); }
function sapp_js_remove_beforeunload_listener() { window.removeEventListener('beforeunload', Module.sokol_beforeunload); }
function sapp_js_add_clipboard_listener() { Module.sokol_paste = (event) => { const pasted_str = event.clipboardData.getData('text'); withStackSave(() => { const cstr = stringToUTF8OnStack(pasted_str); __sapp_emsc_onpaste(cstr); }); }; window.addEventListener('paste', Module.sokol_paste); }
function sapp_js_remove_clipboard_listener() { window.removeEventListener('paste', Module.sokol_paste); }
function sapp_js_write_clipboard(c_str) { const str = UTF8ToString(c_str); const ta = document.createElement('textarea'); ta.setAttribute('autocomplete', 'off'); ta.setAttribute('autocorrect', 'off'); ta.setAttribute('autocapitalize', 'off'); ta.setAttribute('spellcheck', 'false'); ta.style.left = -100 + 'px'; ta.style.top = -100 + 'px'; ta.style.height = 1; ta.style.width = 1; ta.value = str; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); }
function sapp_js_add_dragndrop_listeners(canvas_name_cstr) { Module.sokol_drop_files = []; const canvas_name = UTF8ToString(canvas_name_cstr); const canvas = document.getElementById(canvas_name); Module.sokol_dragenter = (event) => { event.stopPropagation(); event.preventDefault(); }; Module.sokol_dragleave = (event) => { event.stopPropagation(); event.preventDefault(); }; Module.sokol_dragover = (event) => { event.stopPropagation(); event.preventDefault(); }; Module.sokol_drop = (event) => { event.stopPropagation(); event.preventDefault(); const files = event.dataTransfer.files; Module.sokol_dropped_files = files; __sapp_emsc_begin_drop(files.length); for (let i = 0; i < files.length; i++) { withStackSave(() => { const cstr = stringToUTF8OnStack(files[i].name); __sapp_emsc_drop(i, cstr); }); } let mods = 0; if (event.shiftKey) { mods |= 1; } if (event.ctrlKey) { mods |= 2; } if (event.altKey) { mods |= 4; } if (event.metaKey) { mods |= 8; } __sapp_emsc_end_drop(event.clientX, event.clientY, mods); }; canvas.addEventListener('dragenter', Module.sokol_dragenter, false); canvas.addEventListener('dragleave', Module.sokol_dragleave, false); canvas.addEventListener('dragover', Module.sokol_dragover, false); canvas.addEventListener('drop', Module.sokol_drop, false); }
function sapp_js_dropped_file_size(index) { /** @suppress {missingProperties} */ const files = Module.sokol_dropped_files; if ((index < 0) || (index >= files.length)) { return 0; } else { return files[index].size; } }
function sapp_js_fetch_dropped_file(index,callback,buf_ptr,buf_size,user_data) { const reader = new FileReader(); reader.onload = (loadEvent) => { const content = loadEvent.target.result; if (content.byteLength > buf_size) { __sapp_emsc_invoke_fetch_cb(index, 0, 1, callback, 0, buf_ptr, buf_size, user_data); } else { HEAPU8.set(new Uint8Array(content), buf_ptr); __sapp_emsc_invoke_fetch_cb(index, 1, 0, callback, content.byteLength, buf_ptr, buf_size, user_data); } }; reader.onerror = () => { __sapp_emsc_invoke_fetch_cb(index, 0, 2, callback, 0, buf_ptr, buf_size, user_data); }; /** @suppress {missingProperties} */ const files = Module.sokol_dropped_files; reader.readAsArrayBuffer(files[index]); }
function sapp_js_remove_dragndrop_listeners(canvas_name_cstr) { const canvas_name = UTF8ToString(canvas_name_cstr); const canvas = document.getElementById(canvas_name); canvas.removeEventListener('dragenter', Module.sokol_dragenter); canvas.removeEventListener('dragleave', Module.sokol_dragleave); canvas.removeEventListener('dragover', Module.sokol_dragover); canvas.removeEventListener('drop', Module.sokol_drop); }
function sapp_js_init(c_str_target) { const target_str = UTF8ToString(c_str_target); Module.sapp_emsc_target = document.getElementById(target_str); if (!Module.sapp_emsc_target) { console.log("sokol_app.h: invalid target:" + target_str); } if (!Module.sapp_emsc_target.requestPointerLock) { console.log("sokol_app.h: target doesn't support requestPointerLock:" + target_str); } }
function sapp_js_request_pointerlock() { if (Module.sapp_emsc_target) { if (Module.sapp_emsc_target.requestPointerLock) { Module.sapp_emsc_target.requestPointerLock(); } } }
function sapp_js_exit_pointerlock() { if (document.exitPointerLock) { document.exitPointerLock(); } }
function sapp_js_set_cursor(cursor_type,shown) { if (Module.sapp_emsc_target) { let cursor; if (shown === 0) { cursor = "none"; } else switch (cursor_type) { case 0: cursor = "auto"; break; case 1: cursor = "default"; break; case 2: cursor = "text"; break; case 3: cursor = "crosshair"; break; case 4: cursor = "pointer"; break; case 5: cursor = "ew-resize"; break; case 6: cursor = "ns-resize"; break; case 7: cursor = "nwse-resize"; break; case 8: cursor = "nesw-resize"; break; case 9: cursor = "all-scroll"; break; case 10: cursor = "not-allowed"; break; default: cursor = "auto"; break; } Module.sapp_emsc_target.style.cursor = cursor; } }
function sapp_js_clear_favicon() { const link = document.getElementById('sokol-app-favicon'); if (link) { document.head.removeChild(link); } }
function sapp_js_set_favicon(w,h,pixels) { const canvas = document.createElement('canvas'); canvas.width = w; canvas.height = h; const ctx = canvas.getContext('2d'); const img_data = ctx.createImageData(w, h); img_data.data.set(HEAPU8.subarray(pixels, pixels + w*h*4)); ctx.putImageData(img_data, 0, 0); const new_link = document.createElement('link'); new_link.id = 'sokol-app-favicon'; new_link.rel = 'shortcut icon'; new_link.href = canvas.toDataURL(); document.head.appendChild(new_link); }
function _dk_sapp_get_canvas_size(w,h) { Module.HEAPF64[w/8] = Module.canvas.offsetWidth; Module.HEAPF64[w/8] = Module.canvas.offsetHeight; }
function _dk_sapp_set_canvas_size(w,h) { Module.canvas.width = w; Module.canvas.height = h; }
function _dk_setup_context(alpha,antialias,premultipliedAlpha,preserveDrawingBuffer) { if (!Module.canvas) { console.error('Make sure to setup Module.canvas'); } return GL.createContext(Module.canvas, { depth: true, stencil: true, enableExtensionsByDefault: true, majorVersion: 2, alpha, antialias, premultipliedAlpha, preserveDrawingBuffer }); }
function slog_js_log(level,c_str) { const str = UTF8ToString(c_str); switch (level) { case 0: console.error(str); break; case 1: console.error(str); break; case 2: console.warn(str); break; default: console.info(str); break; } }

// end include: preamble.js


  /** @constructor */
  function ExitStatus(status) {
      this.name = 'ExitStatus';
      this.message = `Program terminated with exit(${status})`;
      this.status = status;
    }

  var callRuntimeCallbacks = (callbacks) => {
      // Pass the module as the first argument.
      callbacks.forEach((f) => f(Module));
    };

  
    /**
     * @param {number} ptr
     * @param {string} type
     */
  function getValue(ptr, type = 'i8') {
    if (type.endsWith('*')) type = '*';
    switch (type) {
      case 'i1': return HEAP8[ptr];
      case 'i8': return HEAP8[ptr];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': abort('to do getValue(i64) use WASM_BIGINT');
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      case '*': return HEAPU32[((ptr)>>2)];
      default: abort(`invalid type for getValue: ${type}`);
    }
  }

  var noExitRuntime = Module['noExitRuntime'] || true;

  var ptrToString = (ptr) => {
      assert(typeof ptr === 'number');
      // With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
      ptr >>>= 0;
      return '0x' + ptr.toString(16).padStart(8, '0');
    };

  
    /**
     * @param {number} ptr
     * @param {number} value
     * @param {string} type
     */
  function setValue(ptr, value, type = 'i8') {
    if (type.endsWith('*')) type = '*';
    switch (type) {
      case 'i1': HEAP8[ptr] = value; break;
      case 'i8': HEAP8[ptr] = value; break;
      case 'i16': HEAP16[((ptr)>>1)] = value; break;
      case 'i32': HEAP32[((ptr)>>2)] = value; break;
      case 'i64': abort('to do setValue(i64) use WASM_BIGINT');
      case 'float': HEAPF32[((ptr)>>2)] = value; break;
      case 'double': HEAPF64[((ptr)>>3)] = value; break;
      case '*': HEAPU32[((ptr)>>2)] = value; break;
      default: abort(`invalid type for setValue: ${type}`);
    }
  }

  var stackRestore = (val) => __emscripten_stack_restore(val);

  var stackSave = () => _emscripten_stack_get_current();

  var warnOnce = (text) => {
      warnOnce.shown ||= {};
      if (!warnOnce.shown[text]) {
        warnOnce.shown[text] = 1;
        if (ENVIRONMENT_IS_NODE) text = 'warning: ' + text;
        err(text);
      }
    };

  var UTF8Decoder = typeof TextDecoder != 'undefined' ? new TextDecoder() : undefined;
  
    /**
     * Given a pointer 'idx' to a null-terminated UTF8-encoded string in the given
     * array that contains uint8 values, returns a copy of that string as a
     * Javascript String object.
     * heapOrArray is either a regular array, or a JavaScript typed array view.
     * @param {number=} idx
     * @param {number=} maxBytesToRead
     * @return {string}
     */
  var UTF8ArrayToString = (heapOrArray, idx = 0, maxBytesToRead = NaN) => {
      var endIdx = idx + maxBytesToRead;
      var endPtr = idx;
      // TextDecoder needs to know the byte length in advance, it doesn't stop on
      // null terminator by itself.  Also, use the length info to avoid running tiny
      // strings through TextDecoder, since .subarray() allocates garbage.
      // (As a tiny code save trick, compare endPtr against endIdx using a negation,
      // so that undefined/NaN means Infinity)
      while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
  
      if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
        return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
      }
      var str = '';
      // If building with TextDecoder, we have already computed the string length
      // above, so test loop end condition against that
      while (idx < endPtr) {
        // For UTF8 byte structure, see:
        // http://en.wikipedia.org/wiki/UTF-8#Description
        // https://www.ietf.org/rfc/rfc2279.txt
        // https://tools.ietf.org/html/rfc3629
        var u0 = heapOrArray[idx++];
        if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
        var u1 = heapOrArray[idx++] & 63;
        if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
        var u2 = heapOrArray[idx++] & 63;
        if ((u0 & 0xF0) == 0xE0) {
          u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
        } else {
          if ((u0 & 0xF8) != 0xF0) warnOnce('Invalid UTF-8 leading byte ' + ptrToString(u0) + ' encountered when deserializing a UTF-8 string in wasm memory to a JS string!');
          u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heapOrArray[idx++] & 63);
        }
  
        if (u0 < 0x10000) {
          str += String.fromCharCode(u0);
        } else {
          var ch = u0 - 0x10000;
          str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
        }
      }
      return str;
    };
  
    /**
     * Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the
     * emscripten HEAP, returns a copy of that string as a Javascript String object.
     *
     * @param {number} ptr
     * @param {number=} maxBytesToRead - An optional length that specifies the
     *   maximum number of bytes to read. You can omit this parameter to scan the
     *   string until the first 0 byte. If maxBytesToRead is passed, and the string
     *   at [ptr, ptr+maxBytesToReadr[ contains a null byte in the middle, then the
     *   string will cut short at that byte index (i.e. maxBytesToRead will not
     *   produce a string of exact length [ptr, ptr+maxBytesToRead[) N.B. mixing
     *   frequent uses of UTF8ToString() with and without maxBytesToRead may throw
     *   JS JIT optimizations off, so it is worth to consider consistently using one
     * @return {string}
     */
  var UTF8ToString = (ptr, maxBytesToRead) => {
      assert(typeof ptr == 'number', `UTF8ToString expects a number (got ${typeof ptr})`);
      return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : '';
    };
  var ___assert_fail = (condition, filename, line, func) => {
      abort(`Assertion failed: ${UTF8ToString(condition)}, at: ` + [filename ? UTF8ToString(filename) : 'unknown filename', line, func ? UTF8ToString(func) : 'unknown function']);
    };

  var __abort_js = () => {
      abort('native code called abort()');
    };

  var __emscripten_memcpy_js = (dest, src, num) => HEAPU8.copyWithin(dest, src, src + num);

  
  var _emscripten_set_main_loop_timing = (mode, value) => {
      MainLoop.timingMode = mode;
      MainLoop.timingValue = value;
  
      if (!MainLoop.func) {
        err('emscripten_set_main_loop_timing: Cannot set timing mode for main loop since a main loop does not exist! Call emscripten_set_main_loop first to set one up.');
        return 1; // Return non-zero on failure, can't set timing mode when there is no main loop.
      }
  
      if (!MainLoop.running) {
        
        MainLoop.running = true;
      }
      if (mode == 0) {
        MainLoop.scheduler = function MainLoop_scheduler_setTimeout() {
          var timeUntilNextTick = Math.max(0, MainLoop.tickStartTime + value - _emscripten_get_now())|0;
          setTimeout(MainLoop.runner, timeUntilNextTick); // doing this each time means that on exception, we stop
        };
        MainLoop.method = 'timeout';
      } else if (mode == 1) {
        MainLoop.scheduler = function MainLoop_scheduler_rAF() {
          MainLoop.requestAnimationFrame(MainLoop.runner);
        };
        MainLoop.method = 'rAF';
      } else if (mode == 2) {
        if (typeof MainLoop.setImmediate == 'undefined') {
          if (typeof setImmediate == 'undefined') {
            // Emulate setImmediate. (note: not a complete polyfill, we don't emulate clearImmediate() to keep code size to minimum, since not needed)
            var setImmediates = [];
            var emscriptenMainLoopMessageId = 'setimmediate';
            /** @param {Event} event */
            var MainLoop_setImmediate_messageHandler = (event) => {
              // When called in current thread or Worker, the main loop ID is structured slightly different to accommodate for --proxy-to-worker runtime listening to Worker events,
              // so check for both cases.
              if (event.data === emscriptenMainLoopMessageId || event.data.target === emscriptenMainLoopMessageId) {
                event.stopPropagation();
                setImmediates.shift()();
              }
            };
            addEventListener("message", MainLoop_setImmediate_messageHandler, true);
            MainLoop.setImmediate = /** @type{function(function(): ?, ...?): number} */((func) => {
              setImmediates.push(func);
              if (ENVIRONMENT_IS_WORKER) {
                Module['setImmediates'] ??= [];
                Module['setImmediates'].push(func);
                postMessage({target: emscriptenMainLoopMessageId}); // In --proxy-to-worker, route the message via proxyClient.js
              } else postMessage(emscriptenMainLoopMessageId, "*"); // On the main thread, can just send the message to itself.
            });
          } else {
            MainLoop.setImmediate = setImmediate;
          }
        }
        MainLoop.scheduler = function MainLoop_scheduler_setImmediate() {
          MainLoop.setImmediate(MainLoop.runner);
        };
        MainLoop.method = 'immediate';
      }
      return 0;
    };
  
  var _emscripten_get_now = () => performance.now();
  
  
  var runtimeKeepaliveCounter = 0;
  var keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0;
  var _proc_exit = (code) => {
      EXITSTATUS = code;
      if (!keepRuntimeAlive()) {
        Module['onExit']?.(code);
        ABORT = true;
      }
      quit_(code, new ExitStatus(code));
    };
  
  /** @suppress {duplicate } */
  /** @param {boolean|number=} implicit */
  var exitJS = (status, implicit) => {
      EXITSTATUS = status;
  
      checkUnflushedContent();
  
      // if exit() was called explicitly, warn the user if the runtime isn't actually being shut down
      if (keepRuntimeAlive() && !implicit) {
        var msg = `program exited (with status: ${status}), but keepRuntimeAlive() is set (counter=${runtimeKeepaliveCounter}) due to an async operation, so halting execution but not exiting the runtime or preventing further async execution (you can use emscripten_force_exit, if you want to force a true shutdown)`;
        readyPromiseReject(msg);
        err(msg);
      }
  
      _proc_exit(status);
    };
  var _exit = exitJS;
  
  var handleException = (e) => {
      // Certain exception types we do not treat as errors since they are used for
      // internal control flow.
      // 1. ExitStatus, which is thrown by exit()
      // 2. "unwind", which is thrown by emscripten_unwind_to_js_event_loop() and others
      //    that wish to return to JS event loop.
      if (e instanceof ExitStatus || e == 'unwind') {
        return EXITSTATUS;
      }
      checkStackCookie();
      if (e instanceof WebAssembly.RuntimeError) {
        if (_emscripten_stack_get_current() <= 0) {
          err('Stack overflow detected.  You can try increasing -sSTACK_SIZE (currently set to 65536)');
        }
      }
      quit_(1, e);
    };
  
  var maybeExit = () => {
      if (!keepRuntimeAlive()) {
        try {
          _exit(EXITSTATUS);
        } catch (e) {
          handleException(e);
        }
      }
    };
  
    /**
     * @param {number=} arg
     * @param {boolean=} noSetTiming
     */
  var setMainLoop = (iterFunc, fps, simulateInfiniteLoop, arg, noSetTiming) => {
      assert(!MainLoop.func, 'emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.');
      MainLoop.func = iterFunc;
      MainLoop.arg = arg;
  
      var thisMainLoopId = MainLoop.currentlyRunningMainloop;
      function checkIsRunning() {
        if (thisMainLoopId < MainLoop.currentlyRunningMainloop) {
          
          maybeExit();
          return false;
        }
        return true;
      }
  
      // We create the loop runner here but it is not actually running until
      // _emscripten_set_main_loop_timing is called (which might happen a
      // later time).  This member signifies that the current runner has not
      // yet been started so that we can call runtimeKeepalivePush when it
      // gets it timing set for the first time.
      MainLoop.running = false;
      MainLoop.runner = function MainLoop_runner() {
        if (ABORT) return;
        if (MainLoop.queue.length > 0) {
          var start = Date.now();
          var blocker = MainLoop.queue.shift();
          blocker.func(blocker.arg);
          if (MainLoop.remainingBlockers) {
            var remaining = MainLoop.remainingBlockers;
            var next = remaining%1 == 0 ? remaining-1 : Math.floor(remaining);
            if (blocker.counted) {
              MainLoop.remainingBlockers = next;
            } else {
              // not counted, but move the progress along a tiny bit
              next = next + 0.5; // do not steal all the next one's progress
              MainLoop.remainingBlockers = (8*remaining + next)/9;
            }
          }
          MainLoop.updateStatus();
  
          // catches pause/resume main loop from blocker execution
          if (!checkIsRunning()) return;
  
          setTimeout(MainLoop.runner, 0);
          return;
        }
  
        // catch pauses from non-main loop sources
        if (!checkIsRunning()) return;
  
        // Implement very basic swap interval control
        MainLoop.currentFrameNumber = MainLoop.currentFrameNumber + 1 | 0;
        if (MainLoop.timingMode == 1 && MainLoop.timingValue > 1 && MainLoop.currentFrameNumber % MainLoop.timingValue != 0) {
          // Not the scheduled time to render this frame - skip.
          MainLoop.scheduler();
          return;
        } else if (MainLoop.timingMode == 0) {
          MainLoop.tickStartTime = _emscripten_get_now();
        }
  
        if (MainLoop.method === 'timeout' && Module.ctx) {
          warnOnce('Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!');
          MainLoop.method = ''; // just warn once per call to set main loop
        }
  
        MainLoop.runIter(iterFunc);
  
        // catch pauses from the main loop itself
        if (!checkIsRunning()) return;
  
        MainLoop.scheduler();
      }
  
      if (!noSetTiming) {
        if (fps && fps > 0) {
          _emscripten_set_main_loop_timing(0, 1000.0 / fps);
        } else {
          // Do rAF by rendering each frame (no decimating)
          _emscripten_set_main_loop_timing(1, 1);
        }
  
        MainLoop.scheduler();
      }
  
      if (simulateInfiniteLoop) {
        throw 'unwind';
      }
    };
  
  
  var callUserCallback = (func) => {
      if (ABORT) {
        err('user callback triggered after runtime exited or application aborted.  Ignoring.');
        return;
      }
      try {
        func();
        maybeExit();
      } catch (e) {
        handleException(e);
      }
    };
  
  var MainLoop = {
  running:false,
  scheduler:null,
  method:"",
  currentlyRunningMainloop:0,
  func:null,
  arg:0,
  timingMode:0,
  timingValue:0,
  currentFrameNumber:0,
  queue:[],
  preMainLoop:[],
  postMainLoop:[],
  pause() {
        MainLoop.scheduler = null;
        // Incrementing this signals the previous main loop that it's now become old, and it must return.
        MainLoop.currentlyRunningMainloop++;
      },
  resume() {
        MainLoop.currentlyRunningMainloop++;
        var timingMode = MainLoop.timingMode;
        var timingValue = MainLoop.timingValue;
        var func = MainLoop.func;
        MainLoop.func = null;
        // do not set timing and call scheduler, we will do it on the next lines
        setMainLoop(func, 0, false, MainLoop.arg, true);
        _emscripten_set_main_loop_timing(timingMode, timingValue);
        MainLoop.scheduler();
      },
  updateStatus() {
        if (Module['setStatus']) {
          var message = Module['statusMessage'] || 'Please wait...';
          var remaining = MainLoop.remainingBlockers ?? 0;
          var expected = MainLoop.expectedBlockers ?? 0;
          if (remaining) {
            if (remaining < expected) {
              Module['setStatus'](`{message} ({expected - remaining}/{expected})`);
            } else {
              Module['setStatus'](message);
            }
          } else {
            Module['setStatus']('');
          }
        }
      },
  init() {
        Module['preMainLoop'] && MainLoop.preMainLoop.push(Module['preMainLoop']);
        Module['postMainLoop'] && MainLoop.postMainLoop.push(Module['postMainLoop']);
      },
  runIter(func) {
        if (ABORT) return;
        for (var pre of MainLoop.preMainLoop) {
          if (pre() === false) {
            return; // |return false| skips a frame
          }
        }
        callUserCallback(func);
        for (var post of MainLoop.postMainLoop) {
          post();
        }
        checkStackCookie();
      },
  nextRAF:0,
  fakeRequestAnimationFrame(func) {
        // try to keep 60fps between calls to here
        var now = Date.now();
        if (MainLoop.nextRAF === 0) {
          MainLoop.nextRAF = now + 1000/60;
        } else {
          while (now + 2 >= MainLoop.nextRAF) { // fudge a little, to avoid timer jitter causing us to do lots of delay:0
            MainLoop.nextRAF += 1000/60;
          }
        }
        var delay = Math.max(MainLoop.nextRAF - now, 0);
        setTimeout(func, delay);
      },
  requestAnimationFrame(func) {
        if (typeof requestAnimationFrame == 'function') {
          requestAnimationFrame(func);
          return;
        }
        var RAF = MainLoop.fakeRequestAnimationFrame;
        RAF(func);
      },
  };
  var _emscripten_cancel_main_loop = () => {
      MainLoop.pause();
      MainLoop.func = null;
    };

  var _emscripten_get_device_pixel_ratio = () => {
      return (typeof devicePixelRatio == 'number' && devicePixelRatio) || 1.0;
    };

  var JSEvents = {
  removeAllEventListeners() {
        while (JSEvents.eventHandlers.length) {
          JSEvents._removeHandler(JSEvents.eventHandlers.length - 1);
        }
        JSEvents.deferredCalls = [];
      },
  inEventHandler:0,
  deferredCalls:[],
  deferCall(targetFunction, precedence, argsList) {
        function arraysHaveEqualContent(arrA, arrB) {
          if (arrA.length != arrB.length) return false;
  
          for (var i in arrA) {
            if (arrA[i] != arrB[i]) return false;
          }
          return true;
        }
        // Test if the given call was already queued, and if so, don't add it again.
        for (var call of JSEvents.deferredCalls) {
          if (call.targetFunction == targetFunction && arraysHaveEqualContent(call.argsList, argsList)) {
            return;
          }
        }
        JSEvents.deferredCalls.push({
          targetFunction,
          precedence,
          argsList
        });
  
        JSEvents.deferredCalls.sort((x,y) => x.precedence < y.precedence);
      },
  removeDeferredCalls(targetFunction) {
        JSEvents.deferredCalls = JSEvents.deferredCalls.filter((call) => call.targetFunction != targetFunction);
      },
  canPerformEventHandlerRequests() {
        if (navigator.userActivation) {
          // Verify against transient activation status from UserActivation API
          // whether it is possible to perform a request here without needing to defer. See
          // https://developer.mozilla.org/en-US/docs/Web/Security/User_activation#transient_activation
          // and https://caniuse.com/mdn-api_useractivation
          // At the time of writing, Firefox does not support this API: https://bugzilla.mozilla.org/show_bug.cgi?id=1791079
          return navigator.userActivation.isActive;
        }
  
        return JSEvents.inEventHandler && JSEvents.currentEventHandler.allowsDeferredCalls;
      },
  runDeferredCalls() {
        if (!JSEvents.canPerformEventHandlerRequests()) {
          return;
        }
        var deferredCalls = JSEvents.deferredCalls;
        JSEvents.deferredCalls = [];
        for (var call of deferredCalls) {
          call.targetFunction(...call.argsList);
        }
      },
  eventHandlers:[],
  removeAllHandlersOnTarget:(target, eventTypeString) => {
        for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
          if (JSEvents.eventHandlers[i].target == target &&
            (!eventTypeString || eventTypeString == JSEvents.eventHandlers[i].eventTypeString)) {
             JSEvents._removeHandler(i--);
           }
        }
      },
  _removeHandler(i) {
        var h = JSEvents.eventHandlers[i];
        h.target.removeEventListener(h.eventTypeString, h.eventListenerFunc, h.useCapture);
        JSEvents.eventHandlers.splice(i, 1);
      },
  registerOrRemoveHandler(eventHandler) {
        if (!eventHandler.target) {
          err('registerOrRemoveHandler: the target element for event handler registration does not exist, when processing the following event handler registration:');
          console.dir(eventHandler);
          return -4;
        }
        if (eventHandler.callbackfunc) {
          eventHandler.eventListenerFunc = function(event) {
            // Increment nesting count for the event handler.
            ++JSEvents.inEventHandler;
            JSEvents.currentEventHandler = eventHandler;
            // Process any old deferred calls the user has placed.
            JSEvents.runDeferredCalls();
            // Process the actual event, calls back to user C code handler.
            eventHandler.handlerFunc(event);
            // Process any new deferred calls that were placed right now from this event handler.
            JSEvents.runDeferredCalls();
            // Out of event handler - restore nesting count.
            --JSEvents.inEventHandler;
          };
  
          eventHandler.target.addEventListener(eventHandler.eventTypeString,
                                               eventHandler.eventListenerFunc,
                                               eventHandler.useCapture);
          JSEvents.eventHandlers.push(eventHandler);
        } else {
          for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
            if (JSEvents.eventHandlers[i].target == eventHandler.target
             && JSEvents.eventHandlers[i].eventTypeString == eventHandler.eventTypeString) {
               JSEvents._removeHandler(i--);
             }
          }
        }
        return 0;
      },
  getNodeNameForTarget(target) {
        if (!target) return '';
        if (target == window) return '#window';
        if (target == screen) return '#screen';
        return target?.nodeName || '';
      },
  fullscreenEnabled() {
        return document.fullscreenEnabled
        // Safari 13.0.3 on macOS Catalina 10.15.1 still ships with prefixed webkitFullscreenEnabled.
        // TODO: If Safari at some point ships with unprefixed version, update the version check above.
        || document.webkitFullscreenEnabled
         ;
      },
  };
  
  var maybeCStringToJsString = (cString) => {
      // "cString > 2" checks if the input is a number, and isn't of the special
      // values we accept here, EMSCRIPTEN_EVENT_TARGET_* (which map to 0, 1, 2).
      // In other words, if cString > 2 then it's a pointer to a valid place in
      // memory, and points to a C string.
      return cString > 2 ? UTF8ToString(cString) : cString;
    };
  
  /** @type {Object} */
  var specialHTMLTargets = [0, typeof document != 'undefined' ? document : 0, typeof window != 'undefined' ? window : 0];
  var findEventTarget = (target) => {
      target = maybeCStringToJsString(target);
      var domElement = specialHTMLTargets[target] || (typeof document != 'undefined' ? document.querySelector(target) : undefined);
      return domElement;
    };
  
  var getBoundingClientRect = (e) => specialHTMLTargets.indexOf(e) < 0 ? e.getBoundingClientRect() : {'left':0,'top':0};
  var _emscripten_get_element_css_size = (target, width, height) => {
      target = findEventTarget(target);
      if (!target) return -4;
  
      var rect = getBoundingClientRect(target);
      HEAPF64[((width)>>3)] = rect.width;
      HEAPF64[((height)>>3)] = rect.height;
  
      return 0;
    };

  var _emscripten_performance_now = () => performance.now();

  var wasmTableMirror = [];
  
  /** @type {WebAssembly.Table} */
  var wasmTable;
  var getWasmTableEntry = (funcPtr) => {
      var func = wasmTableMirror[funcPtr];
      if (!func) {
        if (funcPtr >= wasmTableMirror.length) wasmTableMirror.length = funcPtr + 1;
        wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
      }
      assert(wasmTable.get(funcPtr) == func, 'JavaScript-side Wasm function table mirror is out of date!');
      return func;
    };
  var _emscripten_request_animation_frame_loop = (cb, userData) => {
      function tick(timeStamp) {
        if (getWasmTableEntry(cb)(timeStamp, userData)) {
          requestAnimationFrame(tick);
        }
      }
      return requestAnimationFrame(tick);
    };

  var getHeapMax = () =>
      HEAPU8.length;
  
  var alignMemory = (size, alignment) => {
      assert(alignment, "alignment argument is required");
      return Math.ceil(size / alignment) * alignment;
    };
  
  var abortOnCannotGrowMemory = (requestedSize) => {
      abort(`Cannot enlarge memory arrays to size ${requestedSize} bytes (OOM). Either (1) compile with -sINITIAL_MEMORY=X with X higher than the current value ${HEAP8.length}, (2) compile with -sALLOW_MEMORY_GROWTH which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with -sABORTING_MALLOC=0`);
    };
  var _emscripten_resize_heap = (requestedSize) => {
      var oldSize = HEAPU8.length;
      // With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
      requestedSize >>>= 0;
      abortOnCannotGrowMemory(requestedSize);
    };

  
  
  
  var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
      assert(typeof str === 'string', `stringToUTF8Array expects a string (got ${typeof str})`);
      // Parameter maxBytesToWrite is not optional. Negative values, 0, null,
      // undefined and false each don't write out any bytes.
      if (!(maxBytesToWrite > 0))
        return 0;
  
      var startIdx = outIdx;
      var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
        // unit, not a Unicode code point of the character! So decode
        // UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description
        // and https://www.ietf.org/rfc/rfc2279.txt
        // and https://tools.ietf.org/html/rfc3629
        var u = str.charCodeAt(i); // possibly a lead surrogate
        if (u >= 0xD800 && u <= 0xDFFF) {
          var u1 = str.charCodeAt(++i);
          u = 0x10000 + ((u & 0x3FF) << 10) | (u1 & 0x3FF);
        }
        if (u <= 0x7F) {
          if (outIdx >= endIdx) break;
          heap[outIdx++] = u;
        } else if (u <= 0x7FF) {
          if (outIdx + 1 >= endIdx) break;
          heap[outIdx++] = 0xC0 | (u >> 6);
          heap[outIdx++] = 0x80 | (u & 63);
        } else if (u <= 0xFFFF) {
          if (outIdx + 2 >= endIdx) break;
          heap[outIdx++] = 0xE0 | (u >> 12);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
        } else {
          if (outIdx + 3 >= endIdx) break;
          if (u > 0x10FFFF) warnOnce('Invalid Unicode code point ' + ptrToString(u) + ' encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).');
          heap[outIdx++] = 0xF0 | (u >> 18);
          heap[outIdx++] = 0x80 | ((u >> 12) & 63);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
        }
      }
      // Null-terminate the pointer to the buffer.
      heap[outIdx] = 0;
      return outIdx - startIdx;
    };
  var stringToUTF8 = (str, outPtr, maxBytesToWrite) => {
      assert(typeof maxBytesToWrite == 'number', 'stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
      return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
    };
  
  var registerFocusEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.focusEvent ||= _malloc(256);
  
      var focusEventHandlerFunc = (e = event) => {
        var nodeName = JSEvents.getNodeNameForTarget(e.target);
        var id = e.target.id ? e.target.id : '';
  
        var focusEvent = JSEvents.focusEvent;
        stringToUTF8(nodeName, focusEvent + 0, 128);
        stringToUTF8(id, focusEvent + 128, 128);
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, focusEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target: findEventTarget(target),
        eventTypeString,
        callbackfunc,
        handlerFunc: focusEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  var _emscripten_set_blur_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerFocusEventCallback(target, userData, useCapture, callbackfunc, 12, "blur", targetThread);

  
  var findCanvasEventTarget = findEventTarget;
  var _emscripten_set_canvas_element_size = (target, width, height) => {
      var canvas = findCanvasEventTarget(target);
      if (!canvas) return -4;
      canvas.width = width;
      canvas.height = height;
      return 0;
    };

  var _emscripten_set_focus_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerFocusEventCallback(target, userData, useCapture, callbackfunc, 13, "focus", targetThread);

  
  
  
  
  var registerKeyEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.keyEvent ||= _malloc(160);
  
      var keyEventHandlerFunc = (e) => {
        assert(e);
  
        var keyEventData = JSEvents.keyEvent;
        HEAPF64[((keyEventData)>>3)] = e.timeStamp;
  
        var idx = ((keyEventData)>>2);
  
        HEAP32[idx + 2] = e.location;
        HEAP8[keyEventData + 12] = e.ctrlKey;
        HEAP8[keyEventData + 13] = e.shiftKey;
        HEAP8[keyEventData + 14] = e.altKey;
        HEAP8[keyEventData + 15] = e.metaKey;
        HEAP8[keyEventData + 16] = e.repeat;
        HEAP32[idx + 5] = e.charCode;
        HEAP32[idx + 6] = e.keyCode;
        HEAP32[idx + 7] = e.which;
        stringToUTF8(e.key || '', keyEventData + 32, 32);
        stringToUTF8(e.code || '', keyEventData + 64, 32);
        stringToUTF8(e.char || '', keyEventData + 96, 32);
        stringToUTF8(e.locale || '', keyEventData + 128, 32);
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, keyEventData, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target: findEventTarget(target),
        eventTypeString,
        callbackfunc,
        handlerFunc: keyEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  var _emscripten_set_keydown_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerKeyEventCallback(target, userData, useCapture, callbackfunc, 2, "keydown", targetThread);

  var _emscripten_set_keypress_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerKeyEventCallback(target, userData, useCapture, callbackfunc, 1, "keypress", targetThread);

  var _emscripten_set_keyup_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerKeyEventCallback(target, userData, useCapture, callbackfunc, 3, "keyup", targetThread);

  
  var _emscripten_set_main_loop = (func, fps, simulateInfiniteLoop) => {
      var iterFunc = getWasmTableEntry(func);
      setMainLoop(iterFunc, fps, simulateInfiniteLoop);
    };

  
  
  
  var fillMouseEventData = (eventStruct, e, target) => {
      assert(eventStruct % 4 == 0);
      HEAPF64[((eventStruct)>>3)] = e.timeStamp;
      var idx = ((eventStruct)>>2);
      HEAP32[idx + 2] = e.screenX;
      HEAP32[idx + 3] = e.screenY;
      HEAP32[idx + 4] = e.clientX;
      HEAP32[idx + 5] = e.clientY;
      HEAP8[eventStruct + 24] = e.ctrlKey;
      HEAP8[eventStruct + 25] = e.shiftKey;
      HEAP8[eventStruct + 26] = e.altKey;
      HEAP8[eventStruct + 27] = e.metaKey;
      HEAP16[idx*2 + 14] = e.button;
      HEAP16[idx*2 + 15] = e.buttons;
  
      HEAP32[idx + 8] = e["movementX"]
        ;
  
      HEAP32[idx + 9] = e["movementY"]
        ;
  
      // Note: rect contains doubles (truncated to placate SAFE_HEAP, which is the same behaviour when writing to HEAP32 anyway)
      var rect = getBoundingClientRect(target);
      HEAP32[idx + 10] = e.clientX - (rect.left | 0);
      HEAP32[idx + 11] = e.clientY - (rect.top  | 0);
  
    };
  
  
  
  var registerMouseEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.mouseEvent ||= _malloc(64);
      target = findEventTarget(target);
  
      var mouseEventHandlerFunc = (e = event) => {
        // TODO: Make this access thread safe, or this could update live while app is reading it.
        fillMouseEventData(JSEvents.mouseEvent, e, target);
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, JSEvents.mouseEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        allowsDeferredCalls: eventTypeString != 'mousemove' && eventTypeString != 'mouseenter' && eventTypeString != 'mouseleave', // Mouse move events do not allow fullscreen/pointer lock requests to be handled in them!
        eventTypeString,
        callbackfunc,
        handlerFunc: mouseEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  var _emscripten_set_mousedown_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 5, "mousedown", targetThread);

  var _emscripten_set_mouseenter_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 33, "mouseenter", targetThread);

  var _emscripten_set_mouseleave_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 34, "mouseleave", targetThread);

  var _emscripten_set_mousemove_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 8, "mousemove", targetThread);

  var _emscripten_set_mouseup_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 6, "mouseup", targetThread);

  
  
  
  var fillPointerlockChangeEventData = (eventStruct) => {
      var pointerLockElement = document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement;
      var isPointerlocked = !!pointerLockElement;
      // Assigning a boolean to HEAP32 with expected type coercion.
      /** @suppress{checkTypes} */
      HEAP8[eventStruct] = isPointerlocked;
      var nodeName = JSEvents.getNodeNameForTarget(pointerLockElement);
      var id = pointerLockElement?.id || '';
      stringToUTF8(nodeName, eventStruct + 1, 128);
      stringToUTF8(id, eventStruct + 129, 128);
    };
  
  
  
  var registerPointerlockChangeEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.pointerlockChangeEvent ||= _malloc(257);
  
      var pointerlockChangeEventHandlerFunc = (e = event) => {
        var pointerlockChangeEvent = JSEvents.pointerlockChangeEvent;
        fillPointerlockChangeEventData(pointerlockChangeEvent);
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, pointerlockChangeEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        eventTypeString,
        callbackfunc,
        handlerFunc: pointerlockChangeEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  
  
  /** @suppress {missingProperties} */
  var _emscripten_set_pointerlockchange_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => {
      // TODO: Currently not supported in pthreads or in --proxy-to-worker mode. (In pthreads mode, document object is not defined)
      if (!document || !document.body || (!document.body.requestPointerLock && !document.body.mozRequestPointerLock && !document.body.webkitRequestPointerLock && !document.body.msRequestPointerLock)) {
        return -1;
      }
  
      target = findEventTarget(target);
      if (!target) return -4;
      registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "mozpointerlockchange", targetThread);
      registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "webkitpointerlockchange", targetThread);
      registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "mspointerlockchange", targetThread);
      return registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "pointerlockchange", targetThread);
    };

  
  
  
  
  var registerPointerlockErrorEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
  
      var pointerlockErrorEventHandlerFunc = (e = event) => {
        if (getWasmTableEntry(callbackfunc)(eventTypeId, 0, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        eventTypeString,
        callbackfunc,
        handlerFunc: pointerlockErrorEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  
  
  /** @suppress {missingProperties} */
  var _emscripten_set_pointerlockerror_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => {
      // TODO: Currently not supported in pthreads or in --proxy-to-worker mode. (In pthreads mode, document object is not defined)
      if (!document || !document.body.requestPointerLock && !document.body.mozRequestPointerLock && !document.body.webkitRequestPointerLock && !document.body.msRequestPointerLock) {
        return -1;
      }
  
      target = findEventTarget(target);
  
      if (!target) return -4;
      registerPointerlockErrorEventCallback(target, userData, useCapture, callbackfunc, 38, "mozpointerlockerror", targetThread);
      registerPointerlockErrorEventCallback(target, userData, useCapture, callbackfunc, 38, "webkitpointerlockerror", targetThread);
      registerPointerlockErrorEventCallback(target, userData, useCapture, callbackfunc, 38, "mspointerlockerror", targetThread);
      return registerPointerlockErrorEventCallback(target, userData, useCapture, callbackfunc, 38, "pointerlockerror", targetThread);
    };

  
  
  
  var registerUiEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.uiEvent ||= _malloc(36);
  
      target = findEventTarget(target);
  
      var uiEventHandlerFunc = (e = event) => {
        if (e.target != target) {
          // Never take ui events such as scroll via a 'bubbled' route, but always from the direct element that
          // was targeted. Otherwise e.g. if app logs a message in response to a page scroll, the Emscripten log
          // message box could cause to scroll, generating a new (bubbled) scroll message, causing a new log print,
          // causing a new scroll, etc..
          return;
        }
        var b = document.body; // Take document.body to a variable, Closure compiler does not outline access to it on its own.
        if (!b) {
          // During a page unload 'body' can be null, with "Cannot read property 'clientWidth' of null" being thrown
          return;
        }
        var uiEvent = JSEvents.uiEvent;
        HEAP32[((uiEvent)>>2)] = 0; // always zero for resize and scroll
        HEAP32[(((uiEvent)+(4))>>2)] = b.clientWidth;
        HEAP32[(((uiEvent)+(8))>>2)] = b.clientHeight;
        HEAP32[(((uiEvent)+(12))>>2)] = innerWidth;
        HEAP32[(((uiEvent)+(16))>>2)] = innerHeight;
        HEAP32[(((uiEvent)+(20))>>2)] = outerWidth;
        HEAP32[(((uiEvent)+(24))>>2)] = outerHeight;
        HEAP32[(((uiEvent)+(28))>>2)] = pageXOffset | 0; // scroll offsets are float
        HEAP32[(((uiEvent)+(32))>>2)] = pageYOffset | 0;
        if (getWasmTableEntry(callbackfunc)(eventTypeId, uiEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        eventTypeString,
        callbackfunc,
        handlerFunc: uiEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  var _emscripten_set_resize_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerUiEventCallback(target, userData, useCapture, callbackfunc, 10, "resize", targetThread);

  
  
  
  
  var registerTouchEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.touchEvent ||= _malloc(1552);
  
      target = findEventTarget(target);
  
      var touchEventHandlerFunc = (e) => {
        assert(e);
        var t, touches = {}, et = e.touches;
        // To ease marshalling different kinds of touches that browser reports (all touches are listed in e.touches,
        // only changed touches in e.changedTouches, and touches on target at a.targetTouches), mark a boolean in
        // each Touch object so that we can later loop only once over all touches we see to marshall over to Wasm.
  
        for (let t of et) {
          // Browser might recycle the generated Touch objects between each frame (Firefox on Android), so reset any
          // changed/target states we may have set from previous frame.
          t.isChanged = t.onTarget = 0;
          touches[t.identifier] = t;
        }
        // Mark which touches are part of the changedTouches list.
        for (let t of e.changedTouches) {
          t.isChanged = 1;
          touches[t.identifier] = t;
        }
        // Mark which touches are part of the targetTouches list.
        for (let t of e.targetTouches) {
          touches[t.identifier].onTarget = 1;
        }
  
        var touchEvent = JSEvents.touchEvent;
        HEAPF64[((touchEvent)>>3)] = e.timeStamp;
        HEAP8[touchEvent + 12] = e.ctrlKey;
        HEAP8[touchEvent + 13] = e.shiftKey;
        HEAP8[touchEvent + 14] = e.altKey;
        HEAP8[touchEvent + 15] = e.metaKey;
        var idx = touchEvent + 16;
        var targetRect = getBoundingClientRect(target);
        var numTouches = 0;
        for (let t of Object.values(touches)) {
          var idx32 = ((idx)>>2); // Pre-shift the ptr to index to HEAP32 to save code size
          HEAP32[idx32 + 0] = t.identifier;
          HEAP32[idx32 + 1] = t.screenX;
          HEAP32[idx32 + 2] = t.screenY;
          HEAP32[idx32 + 3] = t.clientX;
          HEAP32[idx32 + 4] = t.clientY;
          HEAP32[idx32 + 5] = t.pageX;
          HEAP32[idx32 + 6] = t.pageY;
          HEAP8[idx + 28] = t.isChanged;
          HEAP8[idx + 29] = t.onTarget;
          HEAP32[idx32 + 8] = t.clientX - (targetRect.left | 0);
          HEAP32[idx32 + 9] = t.clientY - (targetRect.top  | 0);
  
          idx += 48;
  
          if (++numTouches > 31) {
            break;
          }
        }
        HEAP32[(((touchEvent)+(8))>>2)] = numTouches;
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, touchEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        allowsDeferredCalls: eventTypeString == 'touchstart' || eventTypeString == 'touchend',
        eventTypeString,
        callbackfunc,
        handlerFunc: touchEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  var _emscripten_set_touchcancel_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerTouchEventCallback(target, userData, useCapture, callbackfunc, 25, "touchcancel", targetThread);

  var _emscripten_set_touchend_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerTouchEventCallback(target, userData, useCapture, callbackfunc, 23, "touchend", targetThread);

  var _emscripten_set_touchmove_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerTouchEventCallback(target, userData, useCapture, callbackfunc, 24, "touchmove", targetThread);

  var _emscripten_set_touchstart_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerTouchEventCallback(target, userData, useCapture, callbackfunc, 22, "touchstart", targetThread);

  
  
  var GLctx;
  
  var webgl_enable_ANGLE_instanced_arrays = (ctx) => {
      // Extension available in WebGL 1 from Firefox 26 and Google Chrome 30 onwards. Core feature in WebGL 2.
      var ext = ctx.getExtension('ANGLE_instanced_arrays');
      // Because this extension is a core function in WebGL 2, assign the extension entry points in place of
      // where the core functions will reside in WebGL 2. This way the calling code can call these without
      // having to dynamically branch depending if running against WebGL 1 or WebGL 2.
      if (ext) {
        ctx['vertexAttribDivisor'] = (index, divisor) => ext['vertexAttribDivisorANGLE'](index, divisor);
        ctx['drawArraysInstanced'] = (mode, first, count, primcount) => ext['drawArraysInstancedANGLE'](mode, first, count, primcount);
        ctx['drawElementsInstanced'] = (mode, count, type, indices, primcount) => ext['drawElementsInstancedANGLE'](mode, count, type, indices, primcount);
        return 1;
      }
    };
  
  var webgl_enable_OES_vertex_array_object = (ctx) => {
      // Extension available in WebGL 1 from Firefox 25 and WebKit 536.28/desktop Safari 6.0.3 onwards. Core feature in WebGL 2.
      var ext = ctx.getExtension('OES_vertex_array_object');
      if (ext) {
        ctx['createVertexArray'] = () => ext['createVertexArrayOES']();
        ctx['deleteVertexArray'] = (vao) => ext['deleteVertexArrayOES'](vao);
        ctx['bindVertexArray'] = (vao) => ext['bindVertexArrayOES'](vao);
        ctx['isVertexArray'] = (vao) => ext['isVertexArrayOES'](vao);
        return 1;
      }
    };
  
  var webgl_enable_WEBGL_draw_buffers = (ctx) => {
      // Extension available in WebGL 1 from Firefox 28 onwards. Core feature in WebGL 2.
      var ext = ctx.getExtension('WEBGL_draw_buffers');
      if (ext) {
        ctx['drawBuffers'] = (n, bufs) => ext['drawBuffersWEBGL'](n, bufs);
        return 1;
      }
    };
  
  var webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance = (ctx) =>
      // Closure is expected to be allowed to minify the '.dibvbi' property, so not accessing it quoted.
      !!(ctx.dibvbi = ctx.getExtension('WEBGL_draw_instanced_base_vertex_base_instance'));
  
  var webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance = (ctx) => {
      // Closure is expected to be allowed to minify the '.mdibvbi' property, so not accessing it quoted.
      return !!(ctx.mdibvbi = ctx.getExtension('WEBGL_multi_draw_instanced_base_vertex_base_instance'));
    };
  
  var webgl_enable_EXT_polygon_offset_clamp = (ctx) => {
      return !!(ctx.extPolygonOffsetClamp = ctx.getExtension('EXT_polygon_offset_clamp'));
    };
  
  var webgl_enable_EXT_clip_control = (ctx) => {
      return !!(ctx.extClipControl = ctx.getExtension('EXT_clip_control'));
    };
  
  var webgl_enable_WEBGL_polygon_mode = (ctx) => {
      return !!(ctx.webglPolygonMode = ctx.getExtension('WEBGL_polygon_mode'));
    };
  
  var webgl_enable_WEBGL_multi_draw = (ctx) => {
      // Closure is expected to be allowed to minify the '.multiDrawWebgl' property, so not accessing it quoted.
      return !!(ctx.multiDrawWebgl = ctx.getExtension('WEBGL_multi_draw'));
    };
  
  var getEmscriptenSupportedExtensions = (ctx) => {
      // Restrict the list of advertised extensions to those that we actually
      // support.
      var supportedExtensions = [
        // WebGL 1 extensions
        'ANGLE_instanced_arrays',
        'EXT_blend_minmax',
        'EXT_disjoint_timer_query',
        'EXT_frag_depth',
        'EXT_shader_texture_lod',
        'EXT_sRGB',
        'OES_element_index_uint',
        'OES_fbo_render_mipmap',
        'OES_standard_derivatives',
        'OES_texture_float',
        'OES_texture_half_float',
        'OES_texture_half_float_linear',
        'OES_vertex_array_object',
        'WEBGL_color_buffer_float',
        'WEBGL_depth_texture',
        'WEBGL_draw_buffers',
        // WebGL 2 extensions
        'EXT_color_buffer_float',
        'EXT_conservative_depth',
        'EXT_disjoint_timer_query_webgl2',
        'EXT_texture_norm16',
        'NV_shader_noperspective_interpolation',
        'WEBGL_clip_cull_distance',
        // WebGL 1 and WebGL 2 extensions
        'EXT_clip_control',
        'EXT_color_buffer_half_float',
        'EXT_depth_clamp',
        'EXT_float_blend',
        'EXT_polygon_offset_clamp',
        'EXT_texture_compression_bptc',
        'EXT_texture_compression_rgtc',
        'EXT_texture_filter_anisotropic',
        'KHR_parallel_shader_compile',
        'OES_texture_float_linear',
        'WEBGL_blend_func_extended',
        'WEBGL_compressed_texture_astc',
        'WEBGL_compressed_texture_etc',
        'WEBGL_compressed_texture_etc1',
        'WEBGL_compressed_texture_s3tc',
        'WEBGL_compressed_texture_s3tc_srgb',
        'WEBGL_debug_renderer_info',
        'WEBGL_debug_shaders',
        'WEBGL_lose_context',
        'WEBGL_multi_draw',
        'WEBGL_polygon_mode'
      ];
      // .getSupportedExtensions() can return null if context is lost, so coerce to empty array.
      return (ctx.getSupportedExtensions() || []).filter(ext => supportedExtensions.includes(ext));
    };
  
  
  var GL = {
  counter:1,
  buffers:[],
  programs:[],
  framebuffers:[],
  renderbuffers:[],
  textures:[],
  shaders:[],
  vaos:[],
  contexts:[],
  offscreenCanvases:{
  },
  queries:[],
  samplers:[],
  transformFeedbacks:[],
  syncs:[],
  stringCache:{
  },
  stringiCache:{
  },
  unpackAlignment:4,
  unpackRowLength:0,
  recordError:(errorCode) => {
        if (!GL.lastError) {
          GL.lastError = errorCode;
        }
      },
  getNewId:(table) => {
        var ret = GL.counter++;
        for (var i = table.length; i < ret; i++) {
          table[i] = null;
        }
        return ret;
      },
  genObject:(n, buffers, createFunction, objectTable
        ) => {
        for (var i = 0; i < n; i++) {
          var buffer = GLctx[createFunction]();
          var id = buffer && GL.getNewId(objectTable);
          if (buffer) {
            buffer.name = id;
            objectTable[id] = buffer;
          } else {
            GL.recordError(0x502 /* GL_INVALID_OPERATION */);
          }
          HEAP32[(((buffers)+(i*4))>>2)] = id;
        }
      },
  getSource:(shader, count, string, length) => {
        var source = '';
        for (var i = 0; i < count; ++i) {
          var len = length ? HEAPU32[(((length)+(i*4))>>2)] : undefined;
          source += UTF8ToString(HEAPU32[(((string)+(i*4))>>2)], len);
        }
        return source;
      },
  createContext:(/** @type {HTMLCanvasElement} */ canvas, webGLContextAttributes) => {
  
        // BUG: Workaround Safari WebGL issue: After successfully acquiring WebGL
        // context on a canvas, calling .getContext() will always return that
        // context independent of which 'webgl' or 'webgl2'
        // context version was passed. See:
        //   https://bugs.webkit.org/show_bug.cgi?id=222758
        // and:
        //   https://github.com/emscripten-core/emscripten/issues/13295.
        // TODO: Once the bug is fixed and shipped in Safari, adjust the Safari
        // version field in above check.
        if (!canvas.getContextSafariWebGL2Fixed) {
          canvas.getContextSafariWebGL2Fixed = canvas.getContext;
          /** @type {function(this:HTMLCanvasElement, string, (Object|null)=): (Object|null)} */
          function fixedGetContext(ver, attrs) {
            var gl = canvas.getContextSafariWebGL2Fixed(ver, attrs);
            return ((ver == 'webgl') == (gl instanceof WebGLRenderingContext)) ? gl : null;
          }
          canvas.getContext = fixedGetContext;
        }
  
        var ctx =
          (webGLContextAttributes.majorVersion > 1)
          ?
            canvas.getContext("webgl2", webGLContextAttributes)
          :
          (canvas.getContext("webgl", webGLContextAttributes)
            // https://caniuse.com/#feat=webgl
            );
  
        if (!ctx) return 0;
  
        var handle = GL.registerContext(ctx, webGLContextAttributes);
  
        return handle;
      },
  registerContext:(ctx, webGLContextAttributes) => {
        // without pthreads a context is just an integer ID
        var handle = GL.getNewId(GL.contexts);
  
        var context = {
          handle,
          attributes: webGLContextAttributes,
          version: webGLContextAttributes.majorVersion,
          GLctx: ctx
        };
  
        // Store the created context object so that we can access the context
        // given a canvas without having to pass the parameters again.
        if (ctx.canvas) ctx.canvas.GLctxObject = context;
        GL.contexts[handle] = context;
        if (typeof webGLContextAttributes.enableExtensionsByDefault == 'undefined' || webGLContextAttributes.enableExtensionsByDefault) {
          GL.initExtensions(context);
        }
  
        return handle;
      },
  makeContextCurrent:(contextHandle) => {
  
        // Active Emscripten GL layer context object.
        GL.currentContext = GL.contexts[contextHandle];
        // Active WebGL context object.
        Module.ctx = GLctx = GL.currentContext?.GLctx;
        return !(contextHandle && !GLctx);
      },
  getContext:(contextHandle) => {
        return GL.contexts[contextHandle];
      },
  deleteContext:(contextHandle) => {
        if (GL.currentContext === GL.contexts[contextHandle]) {
          GL.currentContext = null;
        }
        if (typeof JSEvents == 'object') {
          // Release all JS event handlers on the DOM element that the GL context is
          // associated with since the context is now deleted.
          JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas);
        }
        // Make sure the canvas object no longer refers to the context object so
        // there are no GC surprises.
        if (GL.contexts[contextHandle] && GL.contexts[contextHandle].GLctx.canvas) {
          GL.contexts[contextHandle].GLctx.canvas.GLctxObject = undefined;
        }
        GL.contexts[contextHandle] = null;
      },
  initExtensions:(context) => {
        // If this function is called without a specific context object, init the
        // extensions of the currently active context.
        context ||= GL.currentContext;
  
        if (context.initExtensionsDone) return;
        context.initExtensionsDone = true;
  
        var GLctx = context.GLctx;
  
        // Detect the presence of a few extensions manually, ction GL interop
        // layer itself will need to know if they exist.
  
        // Extensions that are available in both WebGL 1 and WebGL 2
        webgl_enable_WEBGL_multi_draw(GLctx);
        webgl_enable_EXT_polygon_offset_clamp(GLctx);
        webgl_enable_EXT_clip_control(GLctx);
        webgl_enable_WEBGL_polygon_mode(GLctx);
        // Extensions that are only available in WebGL 1 (the calls will be no-ops
        // if called on a WebGL 2 context active)
        webgl_enable_ANGLE_instanced_arrays(GLctx);
        webgl_enable_OES_vertex_array_object(GLctx);
        webgl_enable_WEBGL_draw_buffers(GLctx);
        // Extensions that are available from WebGL >= 2 (no-op if called on a WebGL 1 context active)
        webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance(GLctx);
        webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance(GLctx);
  
        // On WebGL 2, EXT_disjoint_timer_query is replaced with an alternative
        // that's based on core APIs, and exposes only the queryCounterEXT()
        // entrypoint.
        if (context.version >= 2) {
          GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query_webgl2");
        }
  
        // However, Firefox exposes the WebGL 1 version on WebGL 2 as well and
        // thus we look for the WebGL 1 version again if the WebGL 2 version
        // isn't present. https://bugzilla.mozilla.org/show_bug.cgi?id=1328882
        if (context.version < 2 || !GLctx.disjointTimerQueryExt)
        {
          GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query");
        }
  
        getEmscriptenSupportedExtensions(GLctx).forEach((ext) => {
          // WEBGL_lose_context, WEBGL_debug_renderer_info and WEBGL_debug_shaders
          // are not enabled by default.
          if (!ext.includes('lose_context') && !ext.includes('debug')) {
            // Call .getExtension() to enable that extension permanently.
            GLctx.getExtension(ext);
          }
        });
      },
  };
  
  var registerWebGlEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
  
      var webGlEventHandlerFunc = (e = event) => {
        if (getWasmTableEntry(callbackfunc)(eventTypeId, 0, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target: findEventTarget(target),
        eventTypeString,
        callbackfunc,
        handlerFunc: webGlEventHandlerFunc,
        useCapture
      };
      JSEvents.registerOrRemoveHandler(eventHandler);
    };
  
  var _emscripten_set_webglcontextlost_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => {
      registerWebGlEventCallback(target, userData, useCapture, callbackfunc, 31, "webglcontextlost", targetThread);
      return 0;
    };

  
  var _emscripten_set_webglcontextrestored_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => {
      registerWebGlEventCallback(target, userData, useCapture, callbackfunc, 32, "webglcontextrestored", targetThread);
      return 0;
    };

  
  
  
  
  
  var registerWheelEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.wheelEvent ||= _malloc(96);
  
      // The DOM Level 3 events spec event 'wheel'
      var wheelHandlerFunc = (e = event) => {
        var wheelEvent = JSEvents.wheelEvent;
        fillMouseEventData(wheelEvent, e, target);
        HEAPF64[(((wheelEvent)+(64))>>3)] = e["deltaX"];
        HEAPF64[(((wheelEvent)+(72))>>3)] = e["deltaY"];
        HEAPF64[(((wheelEvent)+(80))>>3)] = e["deltaZ"];
        HEAP32[(((wheelEvent)+(88))>>2)] = e["deltaMode"];
        if (getWasmTableEntry(callbackfunc)(eventTypeId, wheelEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        allowsDeferredCalls: true,
        eventTypeString,
        callbackfunc,
        handlerFunc: wheelHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  
  var _emscripten_set_wheel_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => {
      target = findEventTarget(target);
      if (!target) return -4;
      if (typeof target.onwheel != 'undefined') {
        return registerWheelEventCallback(target, userData, useCapture, callbackfunc, 9, "wheel", targetThread);
      } else {
        return -1;
      }
    };

  
  
  
  
  
  
  
  
  
  
  var _emscripten_webgl_enable_extension = (contextHandle, extension) => {
      var context = GL.getContext(contextHandle);
      var extString = UTF8ToString(extension);
      if (extString.startsWith('GL_')) extString = extString.substr(3); // Allow enabling extensions both with "GL_" prefix and without.
  
      // Switch-board that pulls in code for all GL extensions, even if those are not used :/
      // Build with -sGL_SUPPORT_SIMPLE_ENABLE_EXTENSIONS=0 to avoid this.
  
      // Obtain function entry points to WebGL 1 extension related functions.
      if (extString == 'ANGLE_instanced_arrays') webgl_enable_ANGLE_instanced_arrays(GLctx);
      if (extString == 'OES_vertex_array_object') webgl_enable_OES_vertex_array_object(GLctx);
      if (extString == 'WEBGL_draw_buffers') webgl_enable_WEBGL_draw_buffers(GLctx);
  
      if (extString == 'WEBGL_draw_instanced_base_vertex_base_instance') webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance(GLctx);
      if (extString == 'WEBGL_multi_draw_instanced_base_vertex_base_instance') webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance(GLctx);
  
      if (extString == 'WEBGL_multi_draw') webgl_enable_WEBGL_multi_draw(GLctx);
      if (extString == 'EXT_polygon_offset_clamp') webgl_enable_EXT_polygon_offset_clamp(GLctx);
      if (extString == 'EXT_clip_control') webgl_enable_EXT_clip_control(GLctx);
      if (extString == 'WEBGL_polygon_mode') webgl_enable_WEBGL_polygon_mode(GLctx);
  
      var ext = context.GLctx.getExtension(extString);
      return !!ext;
    };

  var _emscripten_webgl_make_context_current = (contextHandle) => {
      var success = GL.makeContextCurrent(contextHandle);
      return success ? 0 : -5;
    };

  var _glActiveTexture = (x0) => GLctx.activeTexture(x0);

  var _glAttachShader = (program, shader) => {
      GLctx.attachShader(GL.programs[program], GL.shaders[shader]);
    };

  var _glBindBuffer = (target, buffer) => {
  
      if (target == 0x88EB /*GL_PIXEL_PACK_BUFFER*/) {
        // In WebGL 2 glReadPixels entry point, we need to use a different WebGL 2
        // API function call when a buffer is bound to
        // GL_PIXEL_PACK_BUFFER_BINDING point, so must keep track whether that
        // binding point is non-null to know what is the proper API function to
        // call.
        GLctx.currentPixelPackBufferBinding = buffer;
      } else if (target == 0x88EC /*GL_PIXEL_UNPACK_BUFFER*/) {
        // In WebGL 2 gl(Compressed)Tex(Sub)Image[23]D entry points, we need to
        // use a different WebGL 2 API function call when a buffer is bound to
        // GL_PIXEL_UNPACK_BUFFER_BINDING point, so must keep track whether that
        // binding point is non-null to know what is the proper API function to
        // call.
        GLctx.currentPixelUnpackBufferBinding = buffer;
      }
      GLctx.bindBuffer(target, GL.buffers[buffer]);
    };

  var _glBindBufferBase = (target, index, buffer) => {
      GLctx.bindBufferBase(target, index, GL.buffers[buffer]);
    };

  var _glBindFramebuffer = (target, framebuffer) => {
  
      GLctx.bindFramebuffer(target, GL.framebuffers[framebuffer]);
  
    };

  var _glBindSampler = (unit, sampler) => {
      GLctx.bindSampler(unit, GL.samplers[sampler]);
    };

  var _glBindTexture = (target, texture) => {
      GLctx.bindTexture(target, GL.textures[texture]);
    };

  var _glBindVertexArray = (vao) => {
      GLctx.bindVertexArray(GL.vaos[vao]);
    };

  var _glBlendColor = (x0, x1, x2, x3) => GLctx.blendColor(x0, x1, x2, x3);

  var _glBlendEquationSeparate = (x0, x1) => GLctx.blendEquationSeparate(x0, x1);

  var _glBlendFuncSeparate = (x0, x1, x2, x3) => GLctx.blendFuncSeparate(x0, x1, x2, x3);

  var _glBlitFramebuffer = (x0, x1, x2, x3, x4, x5, x6, x7, x8, x9) => GLctx.blitFramebuffer(x0, x1, x2, x3, x4, x5, x6, x7, x8, x9);

  var _glBufferData = (target, size, data, usage) => {
  
      if (GL.currentContext.version >= 2) {
        // If size is zero, WebGL would interpret uploading the whole input
        // arraybuffer (starting from given offset), which would not make sense in
        // WebAssembly, so avoid uploading if size is zero. However we must still
        // call bufferData to establish a backing storage of zero bytes.
        if (data && size) {
          GLctx.bufferData(target, HEAPU8, usage, data, size);
        } else {
          GLctx.bufferData(target, size, usage);
        }
        return;
      }
      // N.b. here first form specifies a heap subarray, second form an integer
      // size, so the ?: code here is polymorphic. It is advised to avoid
      // randomly mixing both uses in calling code, to avoid any potential JS
      // engine JIT issues.
      GLctx.bufferData(target, data ? HEAPU8.subarray(data, data+size) : size, usage);
    };

  var _glBufferSubData = (target, offset, size, data) => {
      if (GL.currentContext.version >= 2) {
        size && GLctx.bufferSubData(target, offset, HEAPU8, data, size);
        return;
      }
      GLctx.bufferSubData(target, offset, HEAPU8.subarray(data, data+size));
    };

  var _glClearBufferfi = (x0, x1, x2, x3) => GLctx.clearBufferfi(x0, x1, x2, x3);

  var _glClearBufferfv = (buffer, drawbuffer, value) => {
  
      GLctx.clearBufferfv(buffer, drawbuffer, HEAPF32, ((value)>>2));
    };

  var _glClearBufferiv = (buffer, drawbuffer, value) => {
  
      GLctx.clearBufferiv(buffer, drawbuffer, HEAP32, ((value)>>2));
    };

  var _glColorMask = (red, green, blue, alpha) => {
      GLctx.colorMask(!!red, !!green, !!blue, !!alpha);
    };

  var _glCompileShader = (shader) => {
      GLctx.compileShader(GL.shaders[shader]);
    };

  var _glCreateProgram = () => {
      var id = GL.getNewId(GL.programs);
      var program = GLctx.createProgram();
      // Store additional information needed for each shader program:
      program.name = id;
      // Lazy cache results of
      // glGetProgramiv(GL_ACTIVE_UNIFORM_MAX_LENGTH/GL_ACTIVE_ATTRIBUTE_MAX_LENGTH/GL_ACTIVE_UNIFORM_BLOCK_MAX_NAME_LENGTH)
      program.maxUniformLength = program.maxAttributeLength = program.maxUniformBlockNameLength = 0;
      program.uniformIdCounter = 1;
      GL.programs[id] = program;
      return id;
    };

  var _glCreateShader = (shaderType) => {
      var id = GL.getNewId(GL.shaders);
      GL.shaders[id] = GLctx.createShader(shaderType);
  
      return id;
    };

  var _glCullFace = (x0) => GLctx.cullFace(x0);

  var _glDeleteBuffers = (n, buffers) => {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((buffers)+(i*4))>>2)];
        var buffer = GL.buffers[id];
  
        // From spec: "glDeleteBuffers silently ignores 0's and names that do not
        // correspond to existing buffer objects."
        if (!buffer) continue;
  
        GLctx.deleteBuffer(buffer);
        buffer.name = 0;
        GL.buffers[id] = null;
  
        if (id == GLctx.currentPixelPackBufferBinding) GLctx.currentPixelPackBufferBinding = 0;
        if (id == GLctx.currentPixelUnpackBufferBinding) GLctx.currentPixelUnpackBufferBinding = 0;
      }
    };

  var _glDeleteFramebuffers = (n, framebuffers) => {
      for (var i = 0; i < n; ++i) {
        var id = HEAP32[(((framebuffers)+(i*4))>>2)];
        var framebuffer = GL.framebuffers[id];
        if (!framebuffer) continue; // GL spec: "glDeleteFramebuffers silently ignores 0s and names that do not correspond to existing framebuffer objects".
        GLctx.deleteFramebuffer(framebuffer);
        framebuffer.name = 0;
        GL.framebuffers[id] = null;
      }
    };

  var _glDeleteProgram = (id) => {
      if (!id) return;
      var program = GL.programs[id];
      if (!program) {
        // glDeleteProgram actually signals an error when deleting a nonexisting
        // object, unlike some other GL delete functions.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      GLctx.deleteProgram(program);
      program.name = 0;
      GL.programs[id] = null;
    };

  var _glDeleteRenderbuffers = (n, renderbuffers) => {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((renderbuffers)+(i*4))>>2)];
        var renderbuffer = GL.renderbuffers[id];
        if (!renderbuffer) continue; // GL spec: "glDeleteRenderbuffers silently ignores 0s and names that do not correspond to existing renderbuffer objects".
        GLctx.deleteRenderbuffer(renderbuffer);
        renderbuffer.name = 0;
        GL.renderbuffers[id] = null;
      }
    };

  var _glDeleteSamplers = (n, samplers) => {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((samplers)+(i*4))>>2)];
        var sampler = GL.samplers[id];
        if (!sampler) continue;
        GLctx.deleteSampler(sampler);
        sampler.name = 0;
        GL.samplers[id] = null;
      }
    };

  var _glDeleteShader = (id) => {
      if (!id) return;
      var shader = GL.shaders[id];
      if (!shader) {
        // glDeleteShader actually signals an error when deleting a nonexisting
        // object, unlike some other GL delete functions.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      GLctx.deleteShader(shader);
      GL.shaders[id] = null;
    };

  var _glDeleteTextures = (n, textures) => {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((textures)+(i*4))>>2)];
        var texture = GL.textures[id];
        // GL spec: "glDeleteTextures silently ignores 0s and names that do not
        // correspond to existing textures".
        if (!texture) continue;
        GLctx.deleteTexture(texture);
        texture.name = 0;
        GL.textures[id] = null;
      }
    };

  var _glDeleteVertexArrays = (n, vaos) => {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((vaos)+(i*4))>>2)];
        GLctx.deleteVertexArray(GL.vaos[id]);
        GL.vaos[id] = null;
      }
    };

  var _glDepthFunc = (x0) => GLctx.depthFunc(x0);

  var _glDepthMask = (flag) => {
      GLctx.depthMask(!!flag);
    };

  var _glDisable = (x0) => GLctx.disable(x0);

  var _glDisableVertexAttribArray = (index) => {
      GLctx.disableVertexAttribArray(index);
    };

  var _glDrawArrays = (mode, first, count) => {
  
      GLctx.drawArrays(mode, first, count);
  
    };

  var _glDrawArraysInstanced = (mode, first, count, primcount) => {
      GLctx.drawArraysInstanced(mode, first, count, primcount);
    };

  var _glDrawElements = (mode, count, type, indices) => {
  
      GLctx.drawElements(mode, count, type, indices);
  
    };

  var _glDrawElementsInstanced = (mode, count, type, indices, primcount) => {
      GLctx.drawElementsInstanced(mode, count, type, indices, primcount);
    };

  var _glEnable = (x0) => GLctx.enable(x0);

  var _glEnableVertexAttribArray = (index) => {
      GLctx.enableVertexAttribArray(index);
    };

  var _glFrontFace = (x0) => GLctx.frontFace(x0);

  var _glGenBuffers = (n, buffers) => {
      GL.genObject(n, buffers, 'createBuffer', GL.buffers
        );
    };

  var _glGenVertexArrays = (n, arrays) => {
      GL.genObject(n, arrays, 'createVertexArray', GL.vaos
        );
    };

  
  var _glGetAttribLocation = (program, name) => {
      return GLctx.getAttribLocation(GL.programs[program], UTF8ToString(name));
    };

  var _glGetError = () => {
      var error = GLctx.getError() || GL.lastError;
      GL.lastError = 0/*GL_NO_ERROR*/;
      return error;
    };

  var readI53FromI64 = (ptr) => {
      return HEAPU32[((ptr)>>2)] + HEAP32[(((ptr)+(4))>>2)] * 4294967296;
    };
  
  var readI53FromU64 = (ptr) => {
      return HEAPU32[((ptr)>>2)] + HEAPU32[(((ptr)+(4))>>2)] * 4294967296;
    };
  var writeI53ToI64 = (ptr, num) => {
      HEAPU32[((ptr)>>2)] = num;
      var lower = HEAPU32[((ptr)>>2)];
      HEAPU32[(((ptr)+(4))>>2)] = (num - lower)/4294967296;
      var deserialized = (num >= 0) ? readI53FromU64(ptr) : readI53FromI64(ptr);
      var offset = ((ptr)>>2);
      if (deserialized != num) warnOnce(`writeI53ToI64() out of range: serialized JS Number ${num} to Wasm heap as bytes lo=${ptrToString(HEAPU32[offset])}, hi=${ptrToString(HEAPU32[offset+1])}, which deserializes back to ${deserialized} instead!`);
    };
  
  
  var webglGetExtensions = function $webglGetExtensions() {
      var exts = getEmscriptenSupportedExtensions(GLctx);
      exts = exts.concat(exts.map((e) => "GL_" + e));
      return exts;
    };
  
  var emscriptenWebGLGet = (name_, p, type) => {
      // Guard against user passing a null pointer.
      // Note that GLES2 spec does not say anything about how passing a null
      // pointer should be treated.  Testing on desktop core GL 3, the application
      // crashes on glGetIntegerv to a null pointer, but better to report an error
      // instead of doing anything random.
      if (!p) {
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      var ret = undefined;
      switch (name_) { // Handle a few trivial GLES values
        case 0x8DFA: // GL_SHADER_COMPILER
          ret = 1;
          break;
        case 0x8DF8: // GL_SHADER_BINARY_FORMATS
          if (type != 0 && type != 1) {
            GL.recordError(0x500); // GL_INVALID_ENUM
          }
          // Do not write anything to the out pointer, since no binary formats are
          // supported.
          return;
        case 0x87FE: // GL_NUM_PROGRAM_BINARY_FORMATS
        case 0x8DF9: // GL_NUM_SHADER_BINARY_FORMATS
          ret = 0;
          break;
        case 0x86A2: // GL_NUM_COMPRESSED_TEXTURE_FORMATS
          // WebGL doesn't have GL_NUM_COMPRESSED_TEXTURE_FORMATS (it's obsolete
          // since GL_COMPRESSED_TEXTURE_FORMATS returns a JS array that can be
          // queried for length), so implement it ourselves to allow C++ GLES2
          // code get the length.
          var formats = GLctx.getParameter(0x86A3 /*GL_COMPRESSED_TEXTURE_FORMATS*/);
          ret = formats ? formats.length : 0;
          break;
  
        case 0x821D: // GL_NUM_EXTENSIONS
          if (GL.currentContext.version < 2) {
            // Calling GLES3/WebGL2 function with a GLES2/WebGL1 context
            GL.recordError(0x502 /* GL_INVALID_OPERATION */);
            return;
          }
          ret = webglGetExtensions().length;
          break;
        case 0x821B: // GL_MAJOR_VERSION
        case 0x821C: // GL_MINOR_VERSION
          if (GL.currentContext.version < 2) {
            GL.recordError(0x500); // GL_INVALID_ENUM
            return;
          }
          ret = name_ == 0x821B ? 3 : 0; // return version 3.0
          break;
      }
  
      if (ret === undefined) {
        var result = GLctx.getParameter(name_);
        switch (typeof result) {
          case "number":
            ret = result;
            break;
          case "boolean":
            ret = result ? 1 : 0;
            break;
          case "string":
            GL.recordError(0x500); // GL_INVALID_ENUM
            return;
          case "object":
            if (result === null) {
              // null is a valid result for some (e.g., which buffer is bound -
              // perhaps nothing is bound), but otherwise can mean an invalid
              // name_, which we need to report as an error
              switch (name_) {
                case 0x8894: // ARRAY_BUFFER_BINDING
                case 0x8B8D: // CURRENT_PROGRAM
                case 0x8895: // ELEMENT_ARRAY_BUFFER_BINDING
                case 0x8CA6: // FRAMEBUFFER_BINDING or DRAW_FRAMEBUFFER_BINDING
                case 0x8CA7: // RENDERBUFFER_BINDING
                case 0x8069: // TEXTURE_BINDING_2D
                case 0x85B5: // WebGL 2 GL_VERTEX_ARRAY_BINDING, or WebGL 1 extension OES_vertex_array_object GL_VERTEX_ARRAY_BINDING_OES
                case 0x8F36: // COPY_READ_BUFFER_BINDING or COPY_READ_BUFFER
                case 0x8F37: // COPY_WRITE_BUFFER_BINDING or COPY_WRITE_BUFFER
                case 0x88ED: // PIXEL_PACK_BUFFER_BINDING
                case 0x88EF: // PIXEL_UNPACK_BUFFER_BINDING
                case 0x8CAA: // READ_FRAMEBUFFER_BINDING
                case 0x8919: // SAMPLER_BINDING
                case 0x8C1D: // TEXTURE_BINDING_2D_ARRAY
                case 0x806A: // TEXTURE_BINDING_3D
                case 0x8E25: // TRANSFORM_FEEDBACK_BINDING
                case 0x8C8F: // TRANSFORM_FEEDBACK_BUFFER_BINDING
                case 0x8A28: // UNIFORM_BUFFER_BINDING
                case 0x8514: { // TEXTURE_BINDING_CUBE_MAP
                  ret = 0;
                  break;
                }
                default: {
                  GL.recordError(0x500); // GL_INVALID_ENUM
                  return;
                }
              }
            } else if (result instanceof Float32Array ||
                       result instanceof Uint32Array ||
                       result instanceof Int32Array ||
                       result instanceof Array) {
              for (var i = 0; i < result.length; ++i) {
                switch (type) {
                  case 0: HEAP32[(((p)+(i*4))>>2)] = result[i]; break;
                  case 2: HEAPF32[(((p)+(i*4))>>2)] = result[i]; break;
                  case 4: HEAP8[(p)+(i)] = result[i] ? 1 : 0; break;
                }
              }
              return;
            } else {
              try {
                ret = result.name | 0;
              } catch(e) {
                GL.recordError(0x500); // GL_INVALID_ENUM
                err(`GL_INVALID_ENUM in glGet${type}v: Unknown object returned from WebGL getParameter(${name_})! (error: ${e})`);
                return;
              }
            }
            break;
          default:
            GL.recordError(0x500); // GL_INVALID_ENUM
            err(`GL_INVALID_ENUM in glGet${type}v: Native code calling glGet${type}v(${name_}) and it returns ${result} of type ${typeof(result)}!`);
            return;
        }
      }
  
      switch (type) {
        case 1: writeI53ToI64(p, ret); break;
        case 0: HEAP32[((p)>>2)] = ret; break;
        case 2:   HEAPF32[((p)>>2)] = ret; break;
        case 4: HEAP8[p] = ret ? 1 : 0; break;
      }
    };
  
  var _glGetIntegerv = (name_, p) => emscriptenWebGLGet(name_, p, 0);

  var _glGetProgramInfoLog = (program, maxLength, length, infoLog) => {
      var log = GLctx.getProgramInfoLog(GL.programs[program]);
      if (log === null) log = '(unknown error)';
      var numBytesWrittenExclNull = (maxLength > 0 && infoLog) ? stringToUTF8(log, infoLog, maxLength) : 0;
      if (length) HEAP32[((length)>>2)] = numBytesWrittenExclNull;
    };

  var _glGetProgramiv = (program, pname, p) => {
      if (!p) {
        // GLES2 specification does not specify how to behave if p is a null
        // pointer. Since calling this function does not make sense if p == null,
        // issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
  
      if (program >= GL.counter) {
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
  
      program = GL.programs[program];
  
      if (pname == 0x8B84) { // GL_INFO_LOG_LENGTH
        var log = GLctx.getProgramInfoLog(program);
        if (log === null) log = '(unknown error)';
        HEAP32[((p)>>2)] = log.length + 1;
      } else if (pname == 0x8B87 /* GL_ACTIVE_UNIFORM_MAX_LENGTH */) {
        if (!program.maxUniformLength) {
          var numActiveUniforms = GLctx.getProgramParameter(program, 0x8B86/*GL_ACTIVE_UNIFORMS*/);
          for (var i = 0; i < numActiveUniforms; ++i) {
            program.maxUniformLength = Math.max(program.maxUniformLength, GLctx.getActiveUniform(program, i).name.length+1);
          }
        }
        HEAP32[((p)>>2)] = program.maxUniformLength;
      } else if (pname == 0x8B8A /* GL_ACTIVE_ATTRIBUTE_MAX_LENGTH */) {
        if (!program.maxAttributeLength) {
          var numActiveAttributes = GLctx.getProgramParameter(program, 0x8B89/*GL_ACTIVE_ATTRIBUTES*/);
          for (var i = 0; i < numActiveAttributes; ++i) {
            program.maxAttributeLength = Math.max(program.maxAttributeLength, GLctx.getActiveAttrib(program, i).name.length+1);
          }
        }
        HEAP32[((p)>>2)] = program.maxAttributeLength;
      } else if (pname == 0x8A35 /* GL_ACTIVE_UNIFORM_BLOCK_MAX_NAME_LENGTH */) {
        if (!program.maxUniformBlockNameLength) {
          var numActiveUniformBlocks = GLctx.getProgramParameter(program, 0x8A36/*GL_ACTIVE_UNIFORM_BLOCKS*/);
          for (var i = 0; i < numActiveUniformBlocks; ++i) {
            program.maxUniformBlockNameLength = Math.max(program.maxUniformBlockNameLength, GLctx.getActiveUniformBlockName(program, i).length+1);
          }
        }
        HEAP32[((p)>>2)] = program.maxUniformBlockNameLength;
      } else {
        HEAP32[((p)>>2)] = GLctx.getProgramParameter(program, pname);
      }
    };

  
  var _glGetShaderInfoLog = (shader, maxLength, length, infoLog) => {
      var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
      if (log === null) log = '(unknown error)';
      var numBytesWrittenExclNull = (maxLength > 0 && infoLog) ? stringToUTF8(log, infoLog, maxLength) : 0;
      if (length) HEAP32[((length)>>2)] = numBytesWrittenExclNull;
    };

  var _glGetShaderiv = (shader, pname, p) => {
      if (!p) {
        // GLES2 specification does not specify how to behave if p is a null
        // pointer. Since calling this function does not make sense if p == null,
        // issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      if (pname == 0x8B84) { // GL_INFO_LOG_LENGTH
        var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
        if (log === null) log = '(unknown error)';
        // The GLES2 specification says that if the shader has an empty info log,
        // a value of 0 is returned. Otherwise the log has a null char appended.
        // (An empty string is falsey, so we can just check that instead of
        // looking at log.length.)
        var logLength = log ? log.length + 1 : 0;
        HEAP32[((p)>>2)] = logLength;
      } else if (pname == 0x8B88) { // GL_SHADER_SOURCE_LENGTH
        var source = GLctx.getShaderSource(GL.shaders[shader]);
        // source may be a null, or the empty string, both of which are falsey
        // values that we report a 0 length for.
        var sourceLength = source ? source.length + 1 : 0;
        HEAP32[((p)>>2)] = sourceLength;
      } else {
        HEAP32[((p)>>2)] = GLctx.getShaderParameter(GL.shaders[shader], pname);
      }
    };

  
  var lengthBytesUTF8 = (str) => {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
        // unit, not a Unicode code point of the character! So decode
        // UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        var c = str.charCodeAt(i); // possibly a lead surrogate
        if (c <= 0x7F) {
          len++;
        } else if (c <= 0x7FF) {
          len += 2;
        } else if (c >= 0xD800 && c <= 0xDFFF) {
          len += 4; ++i;
        } else {
          len += 3;
        }
      }
      return len;
    };
  
  
  var stringToNewUTF8 = (str) => {
      var size = lengthBytesUTF8(str) + 1;
      var ret = _malloc(size);
      if (ret) stringToUTF8(str, ret, size);
      return ret;
    };
  var _glGetStringi = (name, index) => {
      if (GL.currentContext.version < 2) {
        GL.recordError(0x502 /* GL_INVALID_OPERATION */); // Calling GLES3/WebGL2 function with a GLES2/WebGL1 context
        return 0;
      }
      var stringiCache = GL.stringiCache[name];
      if (stringiCache) {
        if (index < 0 || index >= stringiCache.length) {
          GL.recordError(0x501/*GL_INVALID_VALUE*/);
          return 0;
        }
        return stringiCache[index];
      }
      switch (name) {
        case 0x1F03 /* GL_EXTENSIONS */:
          var exts = webglGetExtensions().map(stringToNewUTF8);
          stringiCache = GL.stringiCache[name] = exts;
          if (index < 0 || index >= stringiCache.length) {
            GL.recordError(0x501/*GL_INVALID_VALUE*/);
            return 0;
          }
          return stringiCache[index];
        default:
          GL.recordError(0x500/*GL_INVALID_ENUM*/);
          return 0;
      }
    };

  /** @suppress {checkTypes} */
  var jstoi_q = (str) => parseInt(str);
  
  /** @noinline */
  var webglGetLeftBracePos = (name) => name.slice(-1) == ']' && name.lastIndexOf('[');
  
  var webglPrepareUniformLocationsBeforeFirstUse = (program) => {
      var uniformLocsById = program.uniformLocsById, // Maps GLuint -> WebGLUniformLocation
        uniformSizeAndIdsByName = program.uniformSizeAndIdsByName, // Maps name -> [uniform array length, GLuint]
        i, j;
  
      // On the first time invocation of glGetUniformLocation on this shader program:
      // initialize cache data structures and discover which uniforms are arrays.
      if (!uniformLocsById) {
        // maps GLint integer locations to WebGLUniformLocations
        program.uniformLocsById = uniformLocsById = {};
        // maps integer locations back to uniform name strings, so that we can lazily fetch uniform array locations
        program.uniformArrayNamesById = {};
  
        var numActiveUniforms = GLctx.getProgramParameter(program, 0x8B86/*GL_ACTIVE_UNIFORMS*/);
        for (i = 0; i < numActiveUniforms; ++i) {
          var u = GLctx.getActiveUniform(program, i);
          var nm = u.name;
          var sz = u.size;
          var lb = webglGetLeftBracePos(nm);
          var arrayName = lb > 0 ? nm.slice(0, lb) : nm;
  
          // Assign a new location.
          var id = program.uniformIdCounter;
          program.uniformIdCounter += sz;
          // Eagerly get the location of the uniformArray[0] base element.
          // The remaining indices >0 will be left for lazy evaluation to
          // improve performance. Those may never be needed to fetch, if the
          // application fills arrays always in full starting from the first
          // element of the array.
          uniformSizeAndIdsByName[arrayName] = [sz, id];
  
          // Store placeholder integers in place that highlight that these
          // >0 index locations are array indices pending population.
          for (j = 0; j < sz; ++j) {
            uniformLocsById[id] = j;
            program.uniformArrayNamesById[id++] = arrayName;
          }
        }
      }
    };
  
  
  
  var _glGetUniformLocation = (program, name) => {
  
      name = UTF8ToString(name);
  
      if (program = GL.programs[program]) {
        webglPrepareUniformLocationsBeforeFirstUse(program);
        var uniformLocsById = program.uniformLocsById; // Maps GLuint -> WebGLUniformLocation
        var arrayIndex = 0;
        var uniformBaseName = name;
  
        // Invariant: when populating integer IDs for uniform locations, we must
        // maintain the precondition that arrays reside in contiguous addresses,
        // i.e. for a 'vec4 colors[10];', colors[4] must be at location
        // colors[0]+4.  However, user might call glGetUniformLocation(program,
        // "colors") for an array, so we cannot discover based on the user input
        // arguments whether the uniform we are dealing with is an array. The only
        // way to discover which uniforms are arrays is to enumerate over all the
        // active uniforms in the program.
        var leftBrace = webglGetLeftBracePos(name);
  
        // If user passed an array accessor "[index]", parse the array index off the accessor.
        if (leftBrace > 0) {
          arrayIndex = jstoi_q(name.slice(leftBrace + 1)) >>> 0; // "index]", coerce parseInt(']') with >>>0 to treat "foo[]" as "foo[0]" and foo[-1] as unsigned out-of-bounds.
          uniformBaseName = name.slice(0, leftBrace);
        }
  
        // Have we cached the location of this uniform before?
        // A pair [array length, GLint of the uniform location]
        var sizeAndId = program.uniformSizeAndIdsByName[uniformBaseName];
  
        // If an uniform with this name exists, and if its index is within the
        // array limits (if it's even an array), query the WebGLlocation, or
        // return an existing cached location.
        if (sizeAndId && arrayIndex < sizeAndId[0]) {
          arrayIndex += sizeAndId[1]; // Add the base location of the uniform to the array index offset.
          if ((uniformLocsById[arrayIndex] = uniformLocsById[arrayIndex] || GLctx.getUniformLocation(program, name))) {
            return arrayIndex;
          }
        }
      }
      else {
        // N.b. we are currently unable to distinguish between GL program IDs that
        // never existed vs GL program IDs that have been deleted, so report
        // GL_INVALID_VALUE in both cases.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
      }
      return -1;
    };

  var tempFixedLengthArray = [];
  var _glInvalidateFramebuffer = (target, numAttachments, attachments) => {
      var list = tempFixedLengthArray[numAttachments];
      for (var i = 0; i < numAttachments; i++) {
        list[i] = HEAP32[(((attachments)+(i*4))>>2)];
      }
  
      GLctx.invalidateFramebuffer(target, list);
    };

  var _glLinkProgram = (program) => {
      program = GL.programs[program];
      GLctx.linkProgram(program);
      // Invalidate earlier computed uniform->ID mappings, those have now become stale
      program.uniformLocsById = 0; // Mark as null-like so that glGetUniformLocation() knows to populate this again.
      program.uniformSizeAndIdsByName = {};
  
    };

  var _glPixelStorei = (pname, param) => {
      if (pname == 3317) {
        GL.unpackAlignment = param;
      } else if (pname == 3314) {
        GL.unpackRowLength = param;
      }
      GLctx.pixelStorei(pname, param);
    };

  var _glPolygonOffset = (x0, x1) => GLctx.polygonOffset(x0, x1);

  var _glReadBuffer = (x0) => GLctx.readBuffer(x0);

  var _glScissor = (x0, x1, x2, x3) => GLctx.scissor(x0, x1, x2, x3);

  var _glShaderSource = (shader, count, string, length) => {
      var source = GL.getSource(shader, count, string, length);
  
      GLctx.shaderSource(GL.shaders[shader], source);
    };

  var _glStencilFunc = (x0, x1, x2) => GLctx.stencilFunc(x0, x1, x2);

  var _glStencilFuncSeparate = (x0, x1, x2, x3) => GLctx.stencilFuncSeparate(x0, x1, x2, x3);

  var _glStencilMask = (x0) => GLctx.stencilMask(x0);

  var _glStencilOp = (x0, x1, x2) => GLctx.stencilOp(x0, x1, x2);

  var _glStencilOpSeparate = (x0, x1, x2, x3) => GLctx.stencilOpSeparate(x0, x1, x2, x3);

  var webglGetUniformLocation = (location) => {
      var p = GLctx.currentProgram;
  
      if (p) {
        var webglLoc = p.uniformLocsById[location];
        // p.uniformLocsById[location] stores either an integer, or a
        // WebGLUniformLocation.
        // If an integer, we have not yet bound the location, so do it now. The
        // integer value specifies the array index we should bind to.
        if (typeof webglLoc == 'number') {
          p.uniformLocsById[location] = webglLoc = GLctx.getUniformLocation(p, p.uniformArrayNamesById[location] + (webglLoc > 0 ? `[${webglLoc}]` : ''));
        }
        // Else an already cached WebGLUniformLocation, return it.
        return webglLoc;
      } else {
        GL.recordError(0x502/*GL_INVALID_OPERATION*/);
      }
    };
  
  var _glUniform1i = (location, v0) => {
      GLctx.uniform1i(webglGetUniformLocation(location), v0);
    };

  var _glUseProgram = (program) => {
      program = GL.programs[program];
      GLctx.useProgram(program);
      // Record the currently active program so that we can access the uniform
      // mapping table of that program.
      GLctx.currentProgram = program;
    };

  var _glVertexAttribDivisor = (index, divisor) => {
      GLctx.vertexAttribDivisor(index, divisor);
    };

  var _glVertexAttribPointer = (index, size, type, normalized, stride, ptr) => {
      GLctx.vertexAttribPointer(index, size, type, !!normalized, stride, ptr);
    };

  var _glViewport = (x0, x1, x2, x3) => GLctx.viewport(x0, x1, x2, x3);



  
  
  var stackAlloc = (sz) => __emscripten_stack_alloc(sz);
  var stringToUTF8OnStack = (str) => {
      var size = lengthBytesUTF8(str) + 1;
      var ret = stackAlloc(size);
      stringToUTF8(str, ret, size);
      return ret;
    };

  
  var withStackSave = (f) => {
      var stack = stackSave();
      var ret = f();
      stackRestore(stack);
      return ret;
    };


      Module["requestAnimationFrame"] = MainLoop.requestAnimationFrame;
      Module["pauseMainLoop"] = MainLoop.pause;
      Module["resumeMainLoop"] = MainLoop.resume;
      MainLoop.init();;
for (var i = 0; i < 32; ++i) tempFixedLengthArray.push(new Array(i));;
function checkIncomingModuleAPI() {
  ignoredModuleProp('fetchSettings');
}
var wasmImports = {
  /** @export */
  __assert_fail: ___assert_fail,
  /** @export */
  _abort_js: __abort_js,
  /** @export */
  _dk_grab_canvas,
  /** @export */
  _dk_sapp_get_canvas_size,
  /** @export */
  _dk_sapp_set_canvas_size,
  /** @export */
  _dk_setup_context,
  /** @export */
  _emscripten_memcpy_js: __emscripten_memcpy_js,
  /** @export */
  emscripten_cancel_main_loop: _emscripten_cancel_main_loop,
  /** @export */
  emscripten_get_device_pixel_ratio: _emscripten_get_device_pixel_ratio,
  /** @export */
  emscripten_get_element_css_size: _emscripten_get_element_css_size,
  /** @export */
  emscripten_performance_now: _emscripten_performance_now,
  /** @export */
  emscripten_request_animation_frame_loop: _emscripten_request_animation_frame_loop,
  /** @export */
  emscripten_resize_heap: _emscripten_resize_heap,
  /** @export */
  emscripten_set_blur_callback_on_thread: _emscripten_set_blur_callback_on_thread,
  /** @export */
  emscripten_set_canvas_element_size: _emscripten_set_canvas_element_size,
  /** @export */
  emscripten_set_focus_callback_on_thread: _emscripten_set_focus_callback_on_thread,
  /** @export */
  emscripten_set_keydown_callback_on_thread: _emscripten_set_keydown_callback_on_thread,
  /** @export */
  emscripten_set_keypress_callback_on_thread: _emscripten_set_keypress_callback_on_thread,
  /** @export */
  emscripten_set_keyup_callback_on_thread: _emscripten_set_keyup_callback_on_thread,
  /** @export */
  emscripten_set_main_loop: _emscripten_set_main_loop,
  /** @export */
  emscripten_set_mousedown_callback_on_thread: _emscripten_set_mousedown_callback_on_thread,
  /** @export */
  emscripten_set_mouseenter_callback_on_thread: _emscripten_set_mouseenter_callback_on_thread,
  /** @export */
  emscripten_set_mouseleave_callback_on_thread: _emscripten_set_mouseleave_callback_on_thread,
  /** @export */
  emscripten_set_mousemove_callback_on_thread: _emscripten_set_mousemove_callback_on_thread,
  /** @export */
  emscripten_set_mouseup_callback_on_thread: _emscripten_set_mouseup_callback_on_thread,
  /** @export */
  emscripten_set_pointerlockchange_callback_on_thread: _emscripten_set_pointerlockchange_callback_on_thread,
  /** @export */
  emscripten_set_pointerlockerror_callback_on_thread: _emscripten_set_pointerlockerror_callback_on_thread,
  /** @export */
  emscripten_set_resize_callback_on_thread: _emscripten_set_resize_callback_on_thread,
  /** @export */
  emscripten_set_touchcancel_callback_on_thread: _emscripten_set_touchcancel_callback_on_thread,
  /** @export */
  emscripten_set_touchend_callback_on_thread: _emscripten_set_touchend_callback_on_thread,
  /** @export */
  emscripten_set_touchmove_callback_on_thread: _emscripten_set_touchmove_callback_on_thread,
  /** @export */
  emscripten_set_touchstart_callback_on_thread: _emscripten_set_touchstart_callback_on_thread,
  /** @export */
  emscripten_set_webglcontextlost_callback_on_thread: _emscripten_set_webglcontextlost_callback_on_thread,
  /** @export */
  emscripten_set_webglcontextrestored_callback_on_thread: _emscripten_set_webglcontextrestored_callback_on_thread,
  /** @export */
  emscripten_set_wheel_callback_on_thread: _emscripten_set_wheel_callback_on_thread,
  /** @export */
  emscripten_webgl_enable_extension: _emscripten_webgl_enable_extension,
  /** @export */
  emscripten_webgl_make_context_current: _emscripten_webgl_make_context_current,
  /** @export */
  glActiveTexture: _glActiveTexture,
  /** @export */
  glAttachShader: _glAttachShader,
  /** @export */
  glBindBuffer: _glBindBuffer,
  /** @export */
  glBindBufferBase: _glBindBufferBase,
  /** @export */
  glBindFramebuffer: _glBindFramebuffer,
  /** @export */
  glBindSampler: _glBindSampler,
  /** @export */
  glBindTexture: _glBindTexture,
  /** @export */
  glBindVertexArray: _glBindVertexArray,
  /** @export */
  glBlendColor: _glBlendColor,
  /** @export */
  glBlendEquationSeparate: _glBlendEquationSeparate,
  /** @export */
  glBlendFuncSeparate: _glBlendFuncSeparate,
  /** @export */
  glBlitFramebuffer: _glBlitFramebuffer,
  /** @export */
  glBufferData: _glBufferData,
  /** @export */
  glBufferSubData: _glBufferSubData,
  /** @export */
  glClearBufferfi: _glClearBufferfi,
  /** @export */
  glClearBufferfv: _glClearBufferfv,
  /** @export */
  glClearBufferiv: _glClearBufferiv,
  /** @export */
  glColorMask: _glColorMask,
  /** @export */
  glCompileShader: _glCompileShader,
  /** @export */
  glCreateProgram: _glCreateProgram,
  /** @export */
  glCreateShader: _glCreateShader,
  /** @export */
  glCullFace: _glCullFace,
  /** @export */
  glDeleteBuffers: _glDeleteBuffers,
  /** @export */
  glDeleteFramebuffers: _glDeleteFramebuffers,
  /** @export */
  glDeleteProgram: _glDeleteProgram,
  /** @export */
  glDeleteRenderbuffers: _glDeleteRenderbuffers,
  /** @export */
  glDeleteSamplers: _glDeleteSamplers,
  /** @export */
  glDeleteShader: _glDeleteShader,
  /** @export */
  glDeleteTextures: _glDeleteTextures,
  /** @export */
  glDeleteVertexArrays: _glDeleteVertexArrays,
  /** @export */
  glDepthFunc: _glDepthFunc,
  /** @export */
  glDepthMask: _glDepthMask,
  /** @export */
  glDisable: _glDisable,
  /** @export */
  glDisableVertexAttribArray: _glDisableVertexAttribArray,
  /** @export */
  glDrawArrays: _glDrawArrays,
  /** @export */
  glDrawArraysInstanced: _glDrawArraysInstanced,
  /** @export */
  glDrawElements: _glDrawElements,
  /** @export */
  glDrawElementsInstanced: _glDrawElementsInstanced,
  /** @export */
  glEnable: _glEnable,
  /** @export */
  glEnableVertexAttribArray: _glEnableVertexAttribArray,
  /** @export */
  glFrontFace: _glFrontFace,
  /** @export */
  glGenBuffers: _glGenBuffers,
  /** @export */
  glGenVertexArrays: _glGenVertexArrays,
  /** @export */
  glGetAttribLocation: _glGetAttribLocation,
  /** @export */
  glGetError: _glGetError,
  /** @export */
  glGetIntegerv: _glGetIntegerv,
  /** @export */
  glGetProgramInfoLog: _glGetProgramInfoLog,
  /** @export */
  glGetProgramiv: _glGetProgramiv,
  /** @export */
  glGetShaderInfoLog: _glGetShaderInfoLog,
  /** @export */
  glGetShaderiv: _glGetShaderiv,
  /** @export */
  glGetStringi: _glGetStringi,
  /** @export */
  glGetUniformLocation: _glGetUniformLocation,
  /** @export */
  glInvalidateFramebuffer: _glInvalidateFramebuffer,
  /** @export */
  glLinkProgram: _glLinkProgram,
  /** @export */
  glPixelStorei: _glPixelStorei,
  /** @export */
  glPolygonOffset: _glPolygonOffset,
  /** @export */
  glReadBuffer: _glReadBuffer,
  /** @export */
  glScissor: _glScissor,
  /** @export */
  glShaderSource: _glShaderSource,
  /** @export */
  glStencilFunc: _glStencilFunc,
  /** @export */
  glStencilFuncSeparate: _glStencilFuncSeparate,
  /** @export */
  glStencilMask: _glStencilMask,
  /** @export */
  glStencilOp: _glStencilOp,
  /** @export */
  glStencilOpSeparate: _glStencilOpSeparate,
  /** @export */
  glUniform1i: _glUniform1i,
  /** @export */
  glUseProgram: _glUseProgram,
  /** @export */
  glVertexAttribDivisor: _glVertexAttribDivisor,
  /** @export */
  glVertexAttribPointer: _glVertexAttribPointer,
  /** @export */
  glViewport: _glViewport,
  /** @export */
  sapp_js_add_beforeunload_listener,
  /** @export */
  sapp_js_add_clipboard_listener,
  /** @export */
  sapp_js_add_dragndrop_listeners,
  /** @export */
  sapp_js_clear_favicon,
  /** @export */
  sapp_js_init,
  /** @export */
  sapp_js_remove_beforeunload_listener,
  /** @export */
  sapp_js_remove_clipboard_listener,
  /** @export */
  sapp_js_remove_dragndrop_listeners,
  /** @export */
  sapp_js_request_pointerlock,
  /** @export */
  sapp_js_set_favicon,
  /** @export */
  slog_js_log
};
var wasmExports = createWasm();
var ___wasm_call_ctors = createExportWrapper('__wasm_call_ctors', 0);
var __sapp_emsc_onpaste = Module['__sapp_emsc_onpaste'] = createExportWrapper('_sapp_emsc_onpaste', 1);
var __sapp_html5_get_ask_leave_site = Module['__sapp_html5_get_ask_leave_site'] = createExportWrapper('_sapp_html5_get_ask_leave_site', 0);
var __sapp_emsc_begin_drop = Module['__sapp_emsc_begin_drop'] = createExportWrapper('_sapp_emsc_begin_drop', 1);
var __sapp_emsc_drop = Module['__sapp_emsc_drop'] = createExportWrapper('_sapp_emsc_drop', 2);
var __sapp_emsc_end_drop = Module['__sapp_emsc_end_drop'] = createExportWrapper('_sapp_emsc_end_drop', 3);
var __sapp_emsc_invoke_fetch_cb = Module['__sapp_emsc_invoke_fetch_cb'] = createExportWrapper('_sapp_emsc_invoke_fetch_cb', 8);
var _main = Module['_main'] = createExportWrapper('__main_argc_argv', 2);
var _malloc = createExportWrapper('malloc', 1);
var _fflush = createExportWrapper('fflush', 1);
var _emscripten_stack_init = () => (_emscripten_stack_init = wasmExports['emscripten_stack_init'])();
var _emscripten_stack_get_free = () => (_emscripten_stack_get_free = wasmExports['emscripten_stack_get_free'])();
var _emscripten_stack_get_base = () => (_emscripten_stack_get_base = wasmExports['emscripten_stack_get_base'])();
var _emscripten_stack_get_end = () => (_emscripten_stack_get_end = wasmExports['emscripten_stack_get_end'])();
var __emscripten_stack_restore = (a0) => (__emscripten_stack_restore = wasmExports['_emscripten_stack_restore'])(a0);
var __emscripten_stack_alloc = (a0) => (__emscripten_stack_alloc = wasmExports['_emscripten_stack_alloc'])(a0);
var _emscripten_stack_get_current = () => (_emscripten_stack_get_current = wasmExports['emscripten_stack_get_current'])();


// include: postamble.js
// === Auto-generated postamble setup entry stuff ===

var missingLibrarySymbols = [
  'writeI53ToI64Clamped',
  'writeI53ToI64Signaling',
  'writeI53ToU64Clamped',
  'writeI53ToU64Signaling',
  'convertI32PairToI53',
  'convertI32PairToI53Checked',
  'convertU32PairToI53',
  'getTempRet0',
  'setTempRet0',
  'zeroMemory',
  'growMemory',
  'strError',
  'inetPton4',
  'inetNtop4',
  'inetPton6',
  'inetNtop6',
  'readSockaddr',
  'writeSockaddr',
  'initRandomFill',
  'randomFill',
  'emscriptenLog',
  'readEmAsmArgs',
  'getExecutableName',
  'listenOnce',
  'autoResumeAudioContext',
  'dynCallLegacy',
  'getDynCaller',
  'dynCall',
  'runtimeKeepalivePush',
  'runtimeKeepalivePop',
  'asmjsMangle',
  'asyncLoad',
  'mmapAlloc',
  'HandleAllocator',
  'getNativeTypeSize',
  'STACK_SIZE',
  'STACK_ALIGN',
  'POINTER_SIZE',
  'ASSERTIONS',
  'getCFunc',
  'ccall',
  'cwrap',
  'uleb128Encode',
  'sigToWasmTypes',
  'generateFuncType',
  'convertJsFunctionToWasm',
  'getEmptyTableSlot',
  'updateTableMap',
  'getFunctionAddress',
  'addFunction',
  'removeFunction',
  'reallyNegative',
  'unSign',
  'strLen',
  'reSign',
  'formatString',
  'intArrayFromString',
  'intArrayToString',
  'AsciiToString',
  'stringToAscii',
  'UTF16ToString',
  'stringToUTF16',
  'lengthBytesUTF16',
  'UTF32ToString',
  'stringToUTF32',
  'lengthBytesUTF32',
  'writeArrayToMemory',
  'fillDeviceOrientationEventData',
  'registerDeviceOrientationEventCallback',
  'fillDeviceMotionEventData',
  'registerDeviceMotionEventCallback',
  'screenOrientation',
  'fillOrientationChangeEventData',
  'registerOrientationChangeEventCallback',
  'fillFullscreenChangeEventData',
  'registerFullscreenChangeEventCallback',
  'JSEvents_requestFullscreen',
  'JSEvents_resizeCanvasForFullscreen',
  'registerRestoreOldStyle',
  'hideEverythingExceptGivenElement',
  'restoreHiddenElements',
  'setLetterbox',
  'softFullscreenResizeWebGLRenderTarget',
  'doRequestFullscreen',
  'requestPointerLock',
  'fillVisibilityChangeEventData',
  'registerVisibilityChangeEventCallback',
  'fillGamepadEventData',
  'registerGamepadEventCallback',
  'registerBeforeUnloadEventCallback',
  'fillBatteryEventData',
  'battery',
  'registerBatteryEventCallback',
  'setCanvasElementSize',
  'getCanvasElementSize',
  'jsStackTrace',
  'getCallstack',
  'convertPCtoSourceLocation',
  'getEnvStrings',
  'checkWasiClock',
  'flush_NO_FILESYSTEM',
  'wasiRightsToMuslOFlags',
  'wasiOFlagsToMuslOFlags',
  'createDyncallWrapper',
  'safeSetTimeout',
  'setImmediateWrapped',
  'clearImmediateWrapped',
  'polyfillSetImmediate',
  'registerPostMainLoop',
  'registerPreMainLoop',
  'getPromise',
  'makePromise',
  'idsToPromises',
  'makePromiseCallback',
  'ExceptionInfo',
  'findMatchingCatch',
  'Browser_asyncPrepareDataCounter',
  'safeRequestAnimationFrame',
  'isLeapYear',
  'ydayFromDate',
  'arraySum',
  'addDays',
  'getSocketFromFD',
  'getSocketAddress',
  'heapObjectForWebGLType',
  'toTypedArrayIndex',
  'computeUnpackAlignedImageSize',
  'colorChannelsInGlTextureFormat',
  'emscriptenWebGLGetTexPixelData',
  'emscriptenWebGLGetUniform',
  'emscriptenWebGLGetVertexAttrib',
  '__glGetActiveAttribOrUniform',
  'writeGLArray',
  'runAndAbortIfError',
  'emscriptenWebGLGetIndexed',
  'ALLOC_NORMAL',
  'ALLOC_STACK',
  'allocate',
  'writeStringToMemory',
  'writeAsciiToMemory',
  'setErrNo',
  'demangle',
  'stackTrace',
];
missingLibrarySymbols.forEach(missingLibrarySymbol)

var unexportedSymbols = [
  'run',
  'addOnPreRun',
  'addOnInit',
  'addOnPreMain',
  'addOnExit',
  'addOnPostRun',
  'addRunDependency',
  'removeRunDependency',
  'out',
  'err',
  'callMain',
  'abort',
  'wasmMemory',
  'wasmExports',
  'writeStackCookie',
  'checkStackCookie',
  'intArrayFromBase64',
  'tryParseAsDataURI',
  'writeI53ToI64',
  'readI53FromI64',
  'readI53FromU64',
  'stackSave',
  'stackRestore',
  'stackAlloc',
  'ptrToString',
  'exitJS',
  'getHeapMax',
  'abortOnCannotGrowMemory',
  'ENV',
  'ERRNO_CODES',
  'DNS',
  'Protocols',
  'Sockets',
  'timers',
  'warnOnce',
  'readEmAsmArgsArray',
  'jstoi_q',
  'jstoi_s',
  'handleException',
  'keepRuntimeAlive',
  'callUserCallback',
  'maybeExit',
  'alignMemory',
  'wasmTable',
  'noExitRuntime',
  'freeTableIndexes',
  'functionsInTableMap',
  'setValue',
  'getValue',
  'PATH',
  'PATH_FS',
  'UTF8Decoder',
  'UTF8ArrayToString',
  'UTF8ToString',
  'stringToUTF8Array',
  'stringToUTF8',
  'lengthBytesUTF8',
  'UTF16Decoder',
  'stringToNewUTF8',
  'stringToUTF8OnStack',
  'JSEvents',
  'registerKeyEventCallback',
  'specialHTMLTargets',
  'maybeCStringToJsString',
  'findEventTarget',
  'findCanvasEventTarget',
  'getBoundingClientRect',
  'fillMouseEventData',
  'registerMouseEventCallback',
  'registerWheelEventCallback',
  'registerUiEventCallback',
  'registerFocusEventCallback',
  'currentFullscreenStrategy',
  'restoreOldWindowedStyle',
  'fillPointerlockChangeEventData',
  'registerPointerlockChangeEventCallback',
  'registerPointerlockErrorEventCallback',
  'registerTouchEventCallback',
  'UNWIND_CACHE',
  'ExitStatus',
  'promiseMap',
  'uncaughtExceptionCount',
  'exceptionLast',
  'exceptionCaught',
  'Browser',
  'getPreloadedImageData__data',
  'wget',
  'MONTH_DAYS_REGULAR',
  'MONTH_DAYS_LEAP',
  'MONTH_DAYS_REGULAR_CUMULATIVE',
  'MONTH_DAYS_LEAP_CUMULATIVE',
  'SYSCALLS',
  'tempFixedLengthArray',
  'miniTempWebGLFloatBuffers',
  'miniTempWebGLIntBuffers',
  'webgl_enable_ANGLE_instanced_arrays',
  'webgl_enable_OES_vertex_array_object',
  'webgl_enable_WEBGL_draw_buffers',
  'webgl_enable_WEBGL_multi_draw',
  'webgl_enable_EXT_polygon_offset_clamp',
  'webgl_enable_EXT_clip_control',
  'webgl_enable_WEBGL_polygon_mode',
  'GL',
  'emscriptenWebGLGet',
  'webglGetUniformLocation',
  'webglPrepareUniformLocationsBeforeFirstUse',
  'webglGetLeftBracePos',
  'registerWebGlEventCallback',
  'AL',
  'GLUT',
  'EGL',
  'GLEW',
  'IDBStore',
  'SDL',
  'SDL_gfx',
  'webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance',
  'webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance',
  'allocateUTF8',
  'allocateUTF8OnStack',
  'print',
  'printErr',
];
unexportedSymbols.forEach(unexportedRuntimeSymbol);



var calledRun;
var calledPrerun;

dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!calledRun) run();
  if (!calledRun) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
};

function callMain(args = []) {
  assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on Module["onRuntimeInitialized"])');
  assert(calledPrerun, 'cannot call main without calling preRun first');

  var entryFunction = _main;

  args.unshift(thisProgram);

  var argc = args.length;
  var argv = stackAlloc((argc + 1) * 4);
  var argv_ptr = argv;
  args.forEach((arg) => {
    HEAPU32[((argv_ptr)>>2)] = stringToUTF8OnStack(arg);
    argv_ptr += 4;
  });
  HEAPU32[((argv_ptr)>>2)] = 0;

  try {

    var ret = entryFunction(argc, argv);

    // if we're not running an evented main loop, it's time to exit
    exitJS(ret, /* implicit = */ true);
    return ret;
  }
  catch (e) {
    return handleException(e);
  }
}

function stackCheckInit() {
  // This is normally called automatically during __wasm_call_ctors but need to
  // get these values before even running any of the ctors so we call it redundantly
  // here.
  _emscripten_stack_init();
  // TODO(sbc): Move writeStackCookie to native to to avoid this.
  writeStackCookie();
}

function run(args = arguments_) {

  if (runDependencies > 0) {
    return;
  }

  stackCheckInit();

  if (!calledPrerun) {
    calledPrerun = 1;
    preRun();

    // a preRun added a dependency, run will be called later
    if (runDependencies > 0) {
      return;
    }
  }

  function doRun() {
    // run may have just been called through dependencies being fulfilled just in this very frame,
    // or while the async setStatus time below was happening
    if (calledRun) return;
    calledRun = 1;
    Module['calledRun'] = 1;

    if (ABORT) return;

    initRuntime();

    preMain();

    readyPromiseResolve(Module);
    Module['onRuntimeInitialized']?.();

    if (shouldRunNow) callMain(args);

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(() => {
      setTimeout(() => Module['setStatus'](''), 1);
      doRun();
    }, 1);
  } else
  {
    doRun();
  }
  checkStackCookie();
}

function checkUnflushedContent() {
  // Compiler settings do not allow exiting the runtime, so flushing
  // the streams is not possible. but in ASSERTIONS mode we check
  // if there was something to flush, and if so tell the user they
  // should request that the runtime be exitable.
  // Normally we would not even include flush() at all, but in ASSERTIONS
  // builds we do so just for this check, and here we see if there is any
  // content to flush, that is, we check if there would have been
  // something a non-ASSERTIONS build would have not seen.
  // How we flush the streams depends on whether we are in SYSCALLS_REQUIRE_FILESYSTEM=0
  // mode (which has its own special function for this; otherwise, all
  // the code is inside libc)
  var oldOut = out;
  var oldErr = err;
  var has = false;
  out = err = (x) => {
    has = true;
  }
  try { // it doesn't matter if it fails
    _fflush(0);
  } catch(e) {}
  out = oldOut;
  err = oldErr;
  if (has) {
    warnOnce('stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the Emscripten FAQ), or make sure to emit a newline when you printf etc.');
    warnOnce('(this may also be due to not including full filesystem support - try building with -sFORCE_FILESYSTEM)');
  }
}

if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}

// shouldRunNow refers to calling main(), not run().
var shouldRunNow = true;

if (Module['noInitialRun']) shouldRunNow = false;

run();

// end include: postamble.js

// include: postamble_modularize.js
// In MODULARIZE mode we wrap the generated code in a factory function
// and return either the Module itself, or a promise of the module.
//
// We assign to the `moduleRtn` global here and configure closure to see
// this as and extern so it won't get minified.

moduleRtn = readyPromise;

// Assertion for attempting to access module properties on the incoming
// moduleArg.  In the past we used this object as the prototype of the module
// and assigned properties to it, but now we return a distinct object.  This
// keeps the instance private until it is ready (i.e the promise has been
// resolved).
for (const prop of Object.keys(Module)) {
  if (!(prop in moduleArg)) {
    Object.defineProperty(moduleArg, prop, {
      configurable: true,
      get() {
        abort(`Access to module property ('${prop}') is no longer possible via the module constructor argument; Instead, use the result of the module constructor.`)
      }
    });
  }
}
// end include: postamble_modularize.js



  return moduleRtn;
}
);
})();
export default Module;
