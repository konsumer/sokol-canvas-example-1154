
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
["_memory","___indirect_function_table","__sapp_emsc_onpaste","__sapp_html5_get_ask_leave_site","__sapp_emsc_begin_drop","__sapp_emsc_drop","__sapp_emsc_end_drop","__sapp_emsc_invoke_fetch_cb","___em_lib_deps_sokol_app","_sapp_js_add_beforeunload_listener","_sapp_js_remove_beforeunload_listener","_sapp_js_add_clipboard_listener","_sapp_js_remove_clipboard_listener","_sapp_js_write_clipboard","_sapp_js_add_dragndrop_listeners","_sapp_js_dropped_file_size","_sapp_js_fetch_dropped_file","_sapp_js_remove_dragndrop_listeners","_sapp_js_init","_sapp_js_request_pointerlock","_sapp_js_exit_pointerlock","_sapp_js_set_cursor","_sapp_js_clear_favicon","_sapp_js_set_favicon","_slog_js_log","_main","onRuntimeInitialized"].forEach((prop) => {
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
    var f = 'data:application/octet-stream;base64,AGFzbQEAAAABrQEaYAF/AGABfwF/YAAAYAJ/fwBgAn9/AX9gAAF/YAN/f38Bf2AFf39/f38Bf2AEf39/fwBgA39/fwBgB39/f39/f38AYAJ/fABgAAF8YAR9fX19AGACfX0AYAR/f31/AGAGf39/f39/AGAFf39/f38AYAp/f39/f39/f39/AGAIf39/f39/f38AYAJ8fwF/YAR/f39/AX9gAn5+AX9gAX8BfGABfQF9YAN/fn8BfgK9GnIDZW52DV9fYXNzZXJ0X2ZhaWwACANlbnYMc2FwcF9qc19pbml0AAADZW52H2Vtc2NyaXB0ZW5fZ2V0X2VsZW1lbnRfY3NzX3NpemUABgNlbnYoZW1zY3JpcHRlbl9zZXRfcmVzaXplX2NhbGxiYWNrX29uX3RocmVhZAAHA2VudiFlbXNjcmlwdGVuX2dldF9kZXZpY2VfcGl4ZWxfcmF0aW8ADANlbnYiZW1zY3JpcHRlbl9zZXRfY2FudmFzX2VsZW1lbnRfc2l6ZQAGA2VudhhlbXNjcmlwdGVuX3NldF9tYWluX2xvb3AACQNlbnYnZW1zY3JpcHRlbl9yZXF1ZXN0X2FuaW1hdGlvbl9mcmFtZV9sb29wAAMDZW52FXNhcHBfanNfY2xlYXJfZmF2aWNvbgACA2VudhNzYXBwX2pzX3NldF9mYXZpY29uAAkDZW52C3Nsb2dfanNfbG9nAAMDZW52H2Vtc2NyaXB0ZW5fd2ViZ2xfY3JlYXRlX2NvbnRleHQABANlbnYlZW1zY3JpcHRlbl93ZWJnbF9tYWtlX2NvbnRleHRfY3VycmVudAABA2Vudg1nbEdldEludGVnZXJ2AAMDZW52IWVtc2NyaXB0ZW5fd2ViZ2xfZW5hYmxlX2V4dGVuc2lvbgAEA2VuditlbXNjcmlwdGVuX3NldF9tb3VzZWRvd25fY2FsbGJhY2tfb25fdGhyZWFkAAcDZW52KWVtc2NyaXB0ZW5fc2V0X21vdXNldXBfY2FsbGJhY2tfb25fdGhyZWFkAAcDZW52K2Vtc2NyaXB0ZW5fc2V0X21vdXNlbW92ZV9jYWxsYmFja19vbl90aHJlYWQABwNlbnYsZW1zY3JpcHRlbl9zZXRfbW91c2VlbnRlcl9jYWxsYmFja19vbl90aHJlYWQABwNlbnYsZW1zY3JpcHRlbl9zZXRfbW91c2VsZWF2ZV9jYWxsYmFja19vbl90aHJlYWQABwNlbnYnZW1zY3JpcHRlbl9zZXRfd2hlZWxfY2FsbGJhY2tfb25fdGhyZWFkAAcDZW52KWVtc2NyaXB0ZW5fc2V0X2tleWRvd25fY2FsbGJhY2tfb25fdGhyZWFkAAcDZW52J2Vtc2NyaXB0ZW5fc2V0X2tleXVwX2NhbGxiYWNrX29uX3RocmVhZAAHA2VudiplbXNjcmlwdGVuX3NldF9rZXlwcmVzc19jYWxsYmFja19vbl90aHJlYWQABwNlbnYsZW1zY3JpcHRlbl9zZXRfdG91Y2hzdGFydF9jYWxsYmFja19vbl90aHJlYWQABwNlbnYrZW1zY3JpcHRlbl9zZXRfdG91Y2htb3ZlX2NhbGxiYWNrX29uX3RocmVhZAAHA2VudiplbXNjcmlwdGVuX3NldF90b3VjaGVuZF9jYWxsYmFja19vbl90aHJlYWQABwNlbnYtZW1zY3JpcHRlbl9zZXRfdG91Y2hjYW5jZWxfY2FsbGJhY2tfb25fdGhyZWFkAAcDZW52M2Vtc2NyaXB0ZW5fc2V0X3BvaW50ZXJsb2NrY2hhbmdlX2NhbGxiYWNrX29uX3RocmVhZAAHA2VudjJlbXNjcmlwdGVuX3NldF9wb2ludGVybG9ja2Vycm9yX2NhbGxiYWNrX29uX3RocmVhZAAHA2VudidlbXNjcmlwdGVuX3NldF9mb2N1c19jYWxsYmFja19vbl90aHJlYWQABwNlbnYmZW1zY3JpcHRlbl9zZXRfYmx1cl9jYWxsYmFja19vbl90aHJlYWQABwNlbnYhc2FwcF9qc19hZGRfYmVmb3JldW5sb2FkX2xpc3RlbmVyAAIDZW52HnNhcHBfanNfYWRkX2NsaXBib2FyZF9saXN0ZW5lcgACA2Vudh9zYXBwX2pzX2FkZF9kcmFnbmRyb3BfbGlzdGVuZXJzAAADZW52MmVtc2NyaXB0ZW5fc2V0X3dlYmdsY29udGV4dGxvc3RfY2FsbGJhY2tfb25fdGhyZWFkAAcDZW52NmVtc2NyaXB0ZW5fc2V0X3dlYmdsY29udGV4dHJlc3RvcmVkX2NhbGxiYWNrX29uX3RocmVhZAAHA2VudhplbXNjcmlwdGVuX3BlcmZvcm1hbmNlX25vdwAMA2VudhtlbXNjcmlwdGVuX2NhbmNlbF9tYWluX2xvb3AAAgNlbnYbc2FwcF9qc19yZXF1ZXN0X3BvaW50ZXJsb2NrAAIDZW52JHNhcHBfanNfcmVtb3ZlX2JlZm9yZXVubG9hZF9saXN0ZW5lcgACA2VudiFzYXBwX2pzX3JlbW92ZV9jbGlwYm9hcmRfbGlzdGVuZXIAAgNlbnYic2FwcF9qc19yZW1vdmVfZHJhZ25kcm9wX2xpc3RlbmVycwAAA2VudgpnbEdldEVycm9yAAUDZW52EWdsR2VuVmVydGV4QXJyYXlzAAMDZW52EWdsQmluZFZlcnRleEFycmF5AAADZW52DWdsUGl4ZWxTdG9yZWkAAwNlbnYMZ2xHZXRTdHJpbmdpAAQDZW52GmdsRGlzYWJsZVZlcnRleEF0dHJpYkFycmF5AAADZW52CGdsRW5hYmxlAAADZW52C2dsRGVwdGhGdW5jAAADZW52C2dsRGVwdGhNYXNrAAADZW52CWdsRGlzYWJsZQAAA2Vudg1nbFN0ZW5jaWxGdW5jAAkDZW52C2dsU3RlbmNpbE9wAAkDZW52DWdsU3RlbmNpbE1hc2sAAANlbnYTZ2xCbGVuZEZ1bmNTZXBhcmF0ZQAIA2VudhdnbEJsZW5kRXF1YXRpb25TZXBhcmF0ZQADA2VudgxnbEJsZW5kQ29sb3IADQNlbnYLZ2xDb2xvck1hc2sACANlbnYPZ2xQb2x5Z29uT2Zmc2V0AA4DZW52C2dsRnJvbnRGYWNlAAADZW52CmdsQ3VsbEZhY2UAAANlbnYMZ2xCaW5kQnVmZmVyAAMDZW52EGdsQmluZEJ1ZmZlckJhc2UACQNlbnYPZ2xBY3RpdmVUZXh0dXJlAAADZW52DWdsQmluZFRleHR1cmUAAwNlbnYNZ2xCaW5kU2FtcGxlcgADA2Vudg9nbERlbGV0ZUJ1ZmZlcnMAAwNlbnYQZ2xEZWxldGVUZXh0dXJlcwADA2VudhVnbERlbGV0ZVJlbmRlcmJ1ZmZlcnMAAwNlbnYQZ2xEZWxldGVTYW1wbGVycwADA2Vudg9nbERlbGV0ZVByb2dyYW0AAANlbnYMZ2xVc2VQcm9ncmFtAAADZW52FGdsRGVsZXRlRnJhbWVidWZmZXJzAAMDZW52FGdsRGVsZXRlVmVydGV4QXJyYXlzAAMDZW52DGdsR2VuQnVmZmVycwADA2VudgxnbEJ1ZmZlckRhdGEACANlbnYPZ2xCdWZmZXJTdWJEYXRhAAgDZW52D2dsQ3JlYXRlUHJvZ3JhbQAFA2Vudg5nbEF0dGFjaFNoYWRlcgADA2Vudg1nbExpbmtQcm9ncmFtAAADZW52DmdsRGVsZXRlU2hhZGVyAAADZW52DmdsR2V0UHJvZ3JhbWl2AAkDZW52E2dsR2V0UHJvZ3JhbUluZm9Mb2cACANlbnYUZ2xHZXRVbmlmb3JtTG9jYXRpb24ABANlbnYLZ2xVbmlmb3JtMWkAAwNlbnYOZ2xDcmVhdGVTaGFkZXIAAQNlbnYOZ2xTaGFkZXJTb3VyY2UACANlbnYPZ2xDb21waWxlU2hhZGVyAAADZW52DWdsR2V0U2hhZGVyaXYACQNlbnYSZ2xHZXRTaGFkZXJJbmZvTG9nAAgDZW52E2dsR2V0QXR0cmliTG9jYXRpb24ABANlbnYRZ2xCaW5kRnJhbWVidWZmZXIAAwNlbnYKZ2xWaWV3cG9ydAAIA2VudglnbFNjaXNzb3IACANlbnYPZ2xDbGVhckJ1ZmZlcmZ2AAkDZW52D2dsQ2xlYXJCdWZmZXJmaQAPA2Vudg9nbENsZWFyQnVmZmVyaXYACQNlbnYVZ2xTdGVuY2lsRnVuY1NlcGFyYXRlAAgDZW52E2dsU3RlbmNpbE9wU2VwYXJhdGUACANlbnYVZ2xWZXJ0ZXhBdHRyaWJQb2ludGVyABADZW52FWdsVmVydGV4QXR0cmliRGl2aXNvcgADA2VudhlnbEVuYWJsZVZlcnRleEF0dHJpYkFycmF5AAADZW52F2dsRHJhd0VsZW1lbnRzSW5zdGFuY2VkABEDZW52DmdsRHJhd0VsZW1lbnRzAAgDZW52FWdsRHJhd0FycmF5c0luc3RhbmNlZAAIA2VudgxnbERyYXdBcnJheXMACQNlbnYMZ2xSZWFkQnVmZmVyAAADZW52EWdsQmxpdEZyYW1lYnVmZmVyABIDZW52F2dsSW52YWxpZGF0ZUZyYW1lYnVmZmVyAAkDZW52CV9hYm9ydF9qcwACA2VudhVfZW1zY3JpcHRlbl9tZW1jcHlfanMACQNlbnYWZW1zY3JpcHRlbl9yZXNpemVfaGVhcAABA64CrAICAgICAgkCAAABAAYFAAEDBQACAwEICRMEAAAGAgIAAhQFBQUFBQIBBAMBARUFBQUFBQUFBQUFBQUFBQADAwMAAAMBAAIAAgIAAAAAAAAAAgAABQgFAQYFBQQEAQQEBAQEBAQEBAQDAwEDBAMDAQMEAwMBAQMGAQEBAAMBAAMCBAQBBQAAAQAAAAEBAQkJCQICAgICAgICFgoGBgAAAwAGBgYGBgYGBgYLAgICAgEAAAABAgEBAQEBCwICAAEXCwEBAQICAAkAAgICAgICAAAAAAAAAAAAAAAAAAAAAAADAAAABAEBAAMACAEABgYEBggEAwQBBgEBAQEBBAQBAQEBAQEDAAIGBgUAABgEAQYGBAQGBgQEBAQEBQUBAQYAAAUCBQUFBQIBAAEAAQUEBQFwARISBQYBAe4F7gUGqgEZfwFBgIAEC38BQQALfwFBAAt/AUEAC38AQfD4Bgt/AEGU+QYLfwBB8/oGC38AQcj7Bgt/AEHM/QYLfwBBk/4GC38AQfqBBwt/AEGdiwcLfwBB3IwHC38AQbaSBwt/AEH3lAcLfwBB8pgHC38AQeWZBwt/AEGxmgcLfwBBk58HC38AQYugBwt/AEH6owcLfwBB8PgGC38AQZT5Bgt/AEGU+QYLfwBB5KUHCwf4CCgGbWVtb3J5AgARX193YXNtX2NhbGxfY3RvcnMAchlfX2luZGlyZWN0X2Z1bmN0aW9uX3RhYmxlAQASX3NhcHBfZW1zY19vbnBhc3RlAHweX3NhcHBfaHRtbDVfZ2V0X2Fza19sZWF2ZV9zaXRlAIIBFV9zYXBwX2Vtc2NfYmVnaW5fZHJvcACDAQ9fc2FwcF9lbXNjX2Ryb3AAhQETX3NhcHBfZW1zY19lbmRfZHJvcACIARpfc2FwcF9lbXNjX2ludm9rZV9mZXRjaF9jYgCJARBfX21haW5fYXJnY19hcmd2AIoBBm1hbGxvYwCNAxdfX2VtX2xpYl9kZXBzX3Nva29sX2FwcAMEKl9fZW1fanNfX3NhcHBfanNfYWRkX2JlZm9yZXVubG9hZF9saXN0ZW5lcgMFLV9fZW1fanNfX3NhcHBfanNfcmVtb3ZlX2JlZm9yZXVubG9hZF9saXN0ZW5lcgMGJ19fZW1fanNfX3NhcHBfanNfYWRkX2NsaXBib2FyZF9saXN0ZW5lcgMHKl9fZW1fanNfX3NhcHBfanNfcmVtb3ZlX2NsaXBib2FyZF9saXN0ZW5lcgMIIF9fZW1fanNfX3NhcHBfanNfd3JpdGVfY2xpcGJvYXJkAwkoX19lbV9qc19fc2FwcF9qc19hZGRfZHJhZ25kcm9wX2xpc3RlbmVycwMKIl9fZW1fanNfX3NhcHBfanNfZHJvcHBlZF9maWxlX3NpemUDCyNfX2VtX2pzX19zYXBwX2pzX2ZldGNoX2Ryb3BwZWRfZmlsZQMMK19fZW1fanNfX3NhcHBfanNfcmVtb3ZlX2RyYWduZHJvcF9saXN0ZW5lcnMDDRVfX2VtX2pzX19zYXBwX2pzX2luaXQDDiRfX2VtX2pzX19zYXBwX2pzX3JlcXVlc3RfcG9pbnRlcmxvY2sDDyFfX2VtX2pzX19zYXBwX2pzX2V4aXRfcG9pbnRlcmxvY2sDEBtfX2VtX2pzX19zYXBwX2pzX3NldF9jdXJzb3IDER5fX2VtX2pzX19zYXBwX2pzX2NsZWFyX2Zhdmljb24DEhxfX2VtX2pzX19zYXBwX2pzX3NldF9mYXZpY29uAxMUX19lbV9qc19fc2xvZ19qc19sb2cDFAZmZmx1c2gAmgMVZW1zY3JpcHRlbl9zdGFja19pbml0AJIDGWVtc2NyaXB0ZW5fc3RhY2tfZ2V0X2ZyZWUAkwMZZW1zY3JpcHRlbl9zdGFja19nZXRfYmFzZQCUAxhlbXNjcmlwdGVuX3N0YWNrX2dldF9lbmQAlQMZX2Vtc2NyaXB0ZW5fc3RhY2tfcmVzdG9yZQCbAxdfZW1zY3JpcHRlbl9zdGFja19hbGxvYwCcAxxlbXNjcmlwdGVuX3N0YWNrX2dldF9jdXJyZW50AJ0DE19fc3RhcnRfZW1fbGliX2RlcHMDFRJfX3N0b3BfZW1fbGliX2RlcHMDFg1fX3N0YXJ0X2VtX2pzAxcMX19zdG9wX2VtX2pzAxgJJAEAQQELEXhzdXmKAo0BkQGSAZECkgKTApQClQKWApcCmAKZAgrG0gmsAgUAEJIDC5oCASV/IwAhAEHQASEBIAAgAWshAiACJABBACEDIAIgAzYCDEEMIQQgAiAEaiEFIAUhBkEEIQcgBiAHaiEIQfgAIQlB3KcHIQogCCAKIAkQ9wIaQQwhCyACIAtqIQwgDCENQfwAIQ4gDSAOaiEPQQAhECAPIBA2AgBBDCERIAIgEWohEiAS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e0EDIXwgeyB8SCF9QQEhfiB9IH5xIX8gf0UNASACKAJkIYABQcABIYEBIAIggQFqIYIBIIIBIYMBQQIhhAEggAEghAF0IYUBIIMBIIUBaiGGASCGASgCACGHASACIIcBNgJgIAIoAmAhiAFBCCGJASCIASCJAW8higECQCCKAUUNAEH79QUhiwFBmsYEIYwBQYcaIY0BQfDABCGOASCLASCMASCNASCOARAAAAsgAigCYCGPAUEIIZABII8BIJABbSGRASACIJEBNgJcQQAhkgEgAiCSATYCWEEAIZMBIAIgkwE2AlQCQANAIAIoAlghlAFBCCGVASCUASCVAUghlgFBASGXASCWASCXAXEhmAEgmAFFDQEgAigCWCGZAUHwACGaASACIJoBaiGbASCbASGcAUECIZ0BIJkBIJ0BdCGeASCcASCeAWohnwEgnwEoAgAhoAEgAiCgATYCUEEAIaEBIAIgoQE2AkwCQANAIAIoAkwhogEgAigCXCGjASCiASCjAUghpAFBASGlASCkASClAXEhpgEgpgFFDQEgAigCWCGnAUGYASGoASACIKgBaiGpASCpASGqASCqASCnAWohqwEgqwEtAAAhrAEgAiCsAToAS0EAIa0BIAIgrQE2AkRBACGuASACIK4BNgJAAkADQCACKAJEIa8BQQghsAEgrwEgsAFIIbEBQQEhsgEgsQEgsgFxIbMBILMBRQ0BIAItAEshtAFB/wEhtQEgtAEgtQFxIbYBQYABIbcBILYBILcBcSG4AUEAIbkBILkBILgBRiG6AUEBIbsBILoBILsBcSG8AQJAAkAgvAFFDQBB////ByG9ASC9ASG+AQwBCyACKAJQIb8BIL8BIb4BCyC+ASHAASACIMABNgI8QQAhwQEgAiDBATYCOAJAA0AgAigCOCHCASACKAJcIcMBIMIBIMMBSCHEAUEBIcUBIMQBIMUBcSHGASDGAUUNASACKAK0ASHHASACKAKwASHIASDHASDIAUkhyQFBASHKASDJASDKAXEhywECQCDLAQ0AQZ2VBSHMAUGaxgQhzQFBkBohzgFB8MAEIc8BIMwBIM0BIM4BIM8BEAAACyACKAI8IdABIAIoArQBIdEBQQQh0gEg0QEg0gFqIdMBIAIg0wE2ArQBINEBINABNgIAIAIoAjgh1AFBASHVASDUASDVAWoh1gEg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hgFBASGHASCGASCHAXEhiAECQCCIAUUNACADKAK4ASGJASCJASgCDCGKAUEAIYsBIIoBIIsBSyGMAUEBIY0BIIwBII0BcSGOAQJAII4BDQBBggEhjwFBACGQASCQASCPATYC7OoHQYIBIZEBQQEhkgFBACGTAUGvggEhlAEgkQEgkgEgkwEglAEQxQELCyADKAK4ASGVASCVASgCHCGWAUEAIZcBIJcBIJYBRyGYAUEBIZkBIJgBIJkBcSGaAQJAIJoBRQ0AIAMoArgBIZsBIJsBKAIgIZwBQQAhnQEgnAEgnQFLIZ4BQQEhnwEgngEgnwFxIaABAkAgoAENAEGCASGhAUEAIaIBIKIBIKEBNgLs6gdBggEhowFBASGkAUEAIaUBQbKCASGmASCjASCkASClASCmARDFAQsLQaABIacBIAMgpwFqIagBIKgBIakBIKkBENwCQQAhqgEgAyCqATYCnAECQANAIAMoApwBIasBQQghrAEgqwEgrAFJIa0BQQEhrgEgrQEgrgFxIa8BIK8BRQ0BIAMoArgBIbABQewBIbEBILABILEBaiGyASADKAKcASGzAUHQASG0ASCzASC0AWwhtQEgsgEgtQFqIbYBIAMgtgE2ApgBIAMoApgBIbcBILcBKAIAIbgBAkACQCC4AQ0ADAELIAMoApgBIbkBILkBKAIEIboBQQAhuwEgugEguwFLIbwBQQEhvQEgvAEgvQFxIb4BAkAgvgENAEGEASG/AUEAIcABIMABIL8BNgLs6gdBhAEhwQFBASHCAUEAIcMBQciCASHEASDBASDCASDDASDEARDFAQtBASHFASADIMUBOgCXAUEAIcYBIAMgxgE2ApABQQAhxwEgAyDHATYCjAFBACHIASADIMgBNgKIAQJAA0AgAygCiAEhyQFBECHKASDJASDKAUkhywFBASHMASDLASDMAXEhzQEgzQFFDQEgAygCmAEhzgFBECHPASDOASDPAWoh0AEgAygCiAEh0QFBDCHSASDRASDSAWwh0wEg0AEg0wFqIdQBIAMg1AE2AoQBIAMoAoQBIdUBINUBKAIAIdYBAkACQCDWAUUNACADLQCXASHXAUEBIdgBINcBINgBcSHZAQJAINkBDQBBgwEh2gFBACHbASDbASDaATYC7OoHQYMBIdwBQQEh3QFBACHeAUHdggEh3wEg3AEg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IQALIACMIAAgAUEASBshAAsgAAtZAQJ/IAEtAAAhAgJAIAAtAAAiA0UNACADIAJB/wFxRw0AA0AgAS0AASECIAAtAAEiA0UNASABQQFqIQEgAEEBaiEAIAMgAkH/AXFGDQALCyADIAJB/wFxawuIAQEDfyAAIQECQAJAIABBA3FFDQACQCAALQAADQAgACAAaw8LIAAhAQNAIAFBAWoiAUEDcUUNASABLQAADQAMAgsACwNAIAEiAkEEaiEBQYCChAggAigCACIDayADckGAgYKEeHFBgIGChHhGDQALA0AgAiIBQQFqIQIgAS0AAA0ACwsgASAAawuBAgEBfwJAAkACQAJAIAEgAHNBA3ENACACQQBHIQMCQCABQQNxRQ0AIAJFDQADQCAAIAEtAAAiAzoAACADRQ0FIABBAWohACACQX9qIgJBAEchAyABQQFqIgFBA3FFDQEgAg0ACwsgA0UNAiABLQAARQ0DIAJBBEkNAANAQYCChAggASgCACIDayADckGAgYKEeHFBgIGChHhHDQIgACADNgIAIABBBGohACABQQRqIQEgAkF8aiICQQNLDQALCyACRQ0BCwNAIAAgAS0AACIDOgAAIANFDQIgAEEBaiEAIAFBAWohASACQX9qIgINAAsLQQAhAgsgAEEAIAIQ+AIaIAALDgAgACABIAIQ/wIaIAAL+QEBA38CQAJAAkACQCABQf8BcSICRQ0AAkAgAEEDcUUNACABQf8BcSEDA0AgAC0AACIERQ0FIAQgA0YNBSAAQQFqIgBBA3ENAAsLQYCChAggACgCACIDayADckGAgYKEeHFBgIGChHhHDQEgAkGBgoQIbCECA0BBgIKECCADIAJzIgRrIARyQYCBgoR4cUGAgYKEeEcNAiAAKAIEIQMgAEEEaiIEIQAgA0GAgoQIIANrckGAgYKEeHFBgIGChHhGDQAMAwsACyAAIAAQ/gJqDwsgACEECwNAIAQiAC0AACIDRQ0BIABBAWohBCADIAFB/wFxRw0ACwsgAAsaACAAIAEQgQMiAEEAIAAtAAAgAUH/AXFGGwuHAQECfwJAAkACQCACQQRJDQAgASAAckEDcQ0BA0AgACgCACABKAIARw0CIAFBBGohASAAQQRqIQAgAkF8aiICQQNLDQALCyACRQ0BCwJAA0AgAC0AACIDIAEtAAAiBEcNASAB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CwkAQaj/BxD7AgsEAEEBCwIAC8gCAQN/AkAgAA0AQQAhAQJAQQAoArD/B0UNAEEAKAKw/wcQmgMhAQsCQEEAKAKw/wdFDQBBACgCsP8HEJoDIAFyIQELAkAQlgMoAgAiAEUNAANAAkACQCAAKAJMQQBODQBBASECDAELIAAQmANFIQILAkAgACgCFCAAKAIcRg0AIAAQmgMgAXIhAQsCQCACDQAgABCZAwsgACgCOCIADQALCxCXAyABDwsCQAJAIAAoAkxBAE4NAEEBIQIMAQsgABCYA0UhAgsCQAJAAkAgACgCFCAAKAIcRg0AIABBAEEAIAAoAiQRBgAaIAAoAhQNAEF/IQEgAkUNAQwCCwJAIAAoAgQiASAAKAIIIgNGDQAgACABIANrrEEBIAAoAigRGQAaC0EAIQEgAEEANgIcIABCADcDECAAQgA3AgQgAg0BCyAAEJkDCyABCwYAIAAkAAsSAQJ/IwAgAGtBcHEiASQAIAELBAAjAAsLhaYDBABBgIAEC4DmAkFORFJPSURfTkFUSVZFX0FDVElWSVRZX09OTE9XTUVNT1JZOiBOYXRpdmVBY3Rpdml0eSBvbkxvd01lbW9yeQBfc2FwcF9zdHJjcHkAX3NnX3N0cmNweQBBTkRST0lEX05BVElWRV9BQ1RJVklUWV9PTkRFU1RST1k6IE5hdGl2ZUFjdGl2aXR5IG9uRGVzdHJveQBOdW1wYWRNdWx0aXBseQBfc2dfc2xvdF9pbmRleAAoMCkgIT0gc2xvdF9pbmRleABfc2dfcG9vbF9hbGxvY19pbmRleABXSU4zMl9DUkVBVEVfSEVMUEVSX1dJTkRPV19GQUlMRUQ6IGZhaWxlZCB0byBjcmVhdGUgaGVscGVyIHdpbmRvdwBzYXBwX3dncHVfZ2V0X3JlbmRlcl92aWV3AHNhcHBfZDNkMTFfZ2V0X3JlbmRlcl92aWV3AHNhcHBfd2dwdV9nZXRfZGVwdGhfc3RlbmNpbF92aWV3AHNhcHBfZDNkMTFfZ2V0X2RlcHRoX3N0ZW5jaWxfdmlldwBzYXBwX3dncHVfZ2V0X3Jlc29sdmVfdmlldwBzYXBwX2QzZDExX2dldF9yZXNvbHZlX3ZpZXcAX3NnX2dsX2RyYXcAc2dfZHJhdwBzYXBwX2QzZDExX2dldF9kZXZpY2VfY29udGV4dABXSU4zMl9EVU1NWV9DT05URVhUX1NFVF9QSVhFTEZPUk1BVF9GQUlMRUQ6IGZhaWxlZCB0byBzZXQgcGl4ZWwgZm9ybWF0IGZvciBkdW1teSBHTCBjb250ZXh0AFdJTjMyX0NSRUFURV9EVU1NWV9DT05URVhUX0ZBSUxFRDogZmFpbGVkIHRvIGNyZWF0ZSBkdW1teSBHTCBjb250ZXh0AF9zYXBwX3RpbWluZ19wdXQAVkFMSURBVEVfU0hBREVSREVTQ19VQl9TVEQxNDBfQVJSQVlfVFlQRTogdW5pZm9ybSBhcnJheXMgb25seSBhbGxvd2VkIGZvciBGTE9BVDQsIElOVDQsIE1BVDQgaW4gc3RkMTQwIGxheW91dABkc3QASW5zZXJ0AFZBTElEQVRFX0FVQl9OT19VQl9BVF9TTE9UOiBzZ19hcHBseV91bmlmb3Jtczogbm8gdW5pZm9ybSBibG9jayBkZWNsYXJhdGlvbiBhdCB0aGlzIHNoYWRlciBzdGFnZSBVQiBzbG90AFZBTElEQVRFX0FQSVBfU0FNUExFX0NPVU5UOiBzZ19hcHBseV9waXBlbGluZTogcGlwZWxpbmUgTVNBQSBzYW1wbGUgY291bnQgZG9lc24ndCBtYXRjaCByZW5kZXIgcGFzcyBhdHRhY2htZW50IHNhbXBsZSBjb3VudABWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfREVQVEhfSU1BR0VfU0FNUExFX0NPVU5UOiBwYXNzIGRlcHRoIGF0dGFjaG1lbnQgc2FtcGxlIGNvdW50IG11c3QgbWF0Y2ggY29sb3IgYXR0YWNobWVudCBzYW1wbGUgY291bnQAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0lNQUdFX1NBTVBMRV9DT1VOVFM6IGFsbCBwYXNzIGF0dGFjaG1lbnRzIG11c3QgaGF2ZSB0aGUgc2FtZSBzYW1wbGUgY291bnQAV0lOMzJfRFVNTVlfQ09OVEVYVF9NQUtFX0NVUlJFTlRfRkFJTEVEOiBmYWlsZWQgdG8gbWFrZSBkdW1teSBHTCBjb250ZXh0IGN1cnJlbnQAX3NnX3VuaWZvcm1fYWxpZ25tZW50AF9zZ19zaGFkZXJfY29tbW9uX2luaXQAX3NnX3BpcGVsaW5lX2NvbW1vbl9pbml0AHNnX2NvbW1pdABfc2dfdmFsaWRhdGVfc2V0X3Nsb3RfYml0AEFycm93UmlnaHQAQWx0UmlnaHQAU2hpZnRSaWdodABCcmFja2V0UmlnaHQAQ29udHJvbFJpZ2h0AE1ldGFSaWdodABBcnJvd0xlZnQAQWx0TGVmdABTaGlmdExlZnQAQnJhY2tldExlZnQAQ29udHJvbExlZnQATWV0YUxlZnQAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9FWFBFQ1RfQ09MT1JGT1JNQVRfTk9UU0VUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5jb2xvcl9mb3JtYXQgdG8gYmUgdW5zZXQAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9FWFBFQ1RfREVQVEhGT1JNQVRfTk9UU0VUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5kZXB0aF9mb3JtYXQgdG8gYmUgdW5zZXQAdWJfZGVzYy0+c2l6ZSA9PSAoc2l6ZV90KWN1cl91bmlmb3JtX29mZnNldABfc2dfZ2xfYnVmZmVyX3RhcmdldABXSU4zMl9EM0QxMV9HRVRfSURYR0lGQUNUT1JZX0ZBSUxFRDogY291bGQgbm90IG9idGFpbiBJRFhHSUZhY3Rvcnkgb2JqZWN0AFdJTjMyX0QzRDExX0dFVF9JRFhHSUFEQVBURVJfRkFJTEVEOiBjb3VsZCBub3Qgb2J0YWluIElEWEdJQWRhcHRlciBvYmplY3QAV0dQVV9TV0FQQ0hBSU5fQ1JFQVRFX1NXQVBDSEFJTl9GQUlMRUQ6IHdncHU6IGZhaWxlZCB0byBjcmVhdGUgc3dhcGNoYWluIG9iamVjdABOdW1wYWRTdWJ0cmFjdABfY29sb3JfYnVmZmVyX2Zsb2F0AF9jb2xvcl9idWZmZXJfaGFsZl9mbG9hdABWQUxJREFURV9BUElQX0NPTE9SX0ZPUk1BVDogc2dfYXBwbHlfcGlwZWxpbmU6IHBpcGVsaW5lIGNvbG9yIGF0dGFjaG1lbnQgcGl4ZWwgZm9ybWF0IGRvZXNuJ3QgbWF0Y2ggcGFzcyBjb2xvciBhdHRhY2htZW50IHBpeGVsIGZvcm1hdABWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfUkVTT0xWRV9JTUFHRV9GT1JNQVQ6IHBhc3MgcmVzb2x2ZSBhdHRhY2htZW50IHBpeGVsIGZvcm1hdCBtdXN0IG1hdGNoIGNvbG9yIGF0dGFjaG1lbnQgcGl4ZWwgZm9ybWF0AFZBTElEQVRFX0FQSVBfREVQVEhfRk9STUFUOiBzZ19hcHBseV9waXBlbGluZTogcGlwZWxpbmUgZGVwdGggcGl4ZWxfZm9ybWF0IGRvZXNuJ3QgbWF0Y2ggcGFzcyBkZXB0aCBhdHRhY2htZW50IHBpeGVsIGZvcm1hdABWQUxJREFURV9JTUFHRURFU0NfTk9fTVNBQV9SVF9TVVBQT1JUOiBNU0FBIG5vdCBzdXBwb3J0ZWQgZm9yIHRoaXMgcGl4ZWwgZm9ybWF0AFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19DT0xPUl9JTlZfUElYRUxGT1JNQVQ6IHBhc3MgY29sb3ItYXR0YWNobWVudCBpbWFnZXMgbXVzdCBiZSByZW5kZXJhYmxlIGNvbG9yIHBpeGVsIGZvcm1hdABWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfREVQVEhfSU5WX1BJWEVMRk9STUFUOiBwYXNzIGRlcHRoLWF0dGFjaG1lbnQgaW1hZ2UgbXVzdCBiZSBkZXB0aCBvciBkZXB0aC1zdGVuY2lsIHBpeGVsIGZvcm1hdABXSU4zMl9XR0xfU0VUX1BJWEVMRk9STUFUX0ZBSUxFRDogZmFpbGVkIHRvIHNldCBzZWxlY3RlZCBwaXhlbCBmb3JtYXQAV0lOMzJfV0dMX0ZJTkRfUElYRUxGT1JNQVRfRkFJTEVEOiBmYWlsZWQgdG8gZmluZCBtYXRjaGluZyBXR0wgcGl4ZWwgZm9ybWF0AFZBTElEQVRFX0lNQUdFREVTQ19ERVBUSF8zRF9JTUFHRTogM0QgaW1hZ2VzIGNhbm5vdCBoYXZlIGEgZGVwdGgvc3RlbmNpbCBpbWFnZSBmb3JtYXQAX3NnX2F0dGFjaG1lbnRzX2F0AF9zZ19zYW1wbGVyX2F0AF9zZ19idWZmZXJfYXQAX3NnX3NoYWRlcl9hdABfc2dfcGlwZWxpbmVfYXQAX3NnX2ltYWdlX2F0AFZBTElEQVRFX1BJUEVMSU5FREVTQ19OT19DT05UX0FUVFJTOiBzZ19waXBlbGluZV9kZXNjLmxheW91dC5hdHRycyBpcyBub3QgY29udGludW91cwBNaW51cwBhdHRzAEJFR0lOUEFTU19BVFRBQ0hNRU5UX0lOVkFMSUQ6IHNnX2JlZ2luX3Bhc3M6IGFuIGF0dGFjaG1lbnQgd2FzIHByb3ZpZGVkIHRoYXQgbm8gbG9uZ2VyIGV4aXN0cwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfTk9fQ09OVF9DT0xPUl9BVFRTOiBjb2xvciBhdHRhY2htZW50cyBtdXN0IG9jY3VweSBjb250aW51b3VzIHNsb3RzAFZBTElEQVRFX1NIQURFUkRFU0NfTk9fQ09OVF9VQl9NRU1CRVJTOiB1bmlmb3JtIGJsb2NrIG1lbWJlcnMgbXVzdCBvY2N1cHkgY29udGludW91cyBzbG90cwBMSU5VWF9HTFhfTE9BRF9FTlRSWV9QT0lOVFNfRkFJTEVEOiBmYWlsZWQgdG8gbG9hZCBHTFggZW50cnkgcG9pbnRzAF9zZ19sb29rdXBfYXR0YWNobWVudHMAX3NnX2dsX2Rpc2NhcmRfYXR0YWNobWVudHMAVkFMSURBVEVfQVBJUF9BVFRfQ09VTlQ6IHNnX2FwcGx5X3BpcGVsaW5lOiBudW1iZXIgb2YgcGlwZWxpbmUgY29sb3IgYXR0YWNobWVudHMgZG9lc24ndCBtYXRjaCBudW1iZXIgb2YgcGFzcyBjb2xvciBhdHRhY2htZW50cwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfTk9fQVRUQUNITUVOVFM6IHNnX2F0dGFjaG1lbnRzX2Rlc2Mgbm8gY29sb3Igb3IgZGVwdGgtc3RlbmNpbCBhdHRhY2htZW50cwBXR1BVX0FUVEFDSE1FTlRTX0NSRUFURV9URVhUVVJFX1ZJRVdfRkFJTEVEOiB3Z3B1VGV4dHVyZUNyZWF0ZVZpZXcoKSBmYWlsZWQgaW4gY3JlYXRlIGF0dGFjaG1lbnRzAF9zZ19wYXNzX2FjdGlvbl9kZWZhdWx0cwBfc2FwcF9kZXNjX2RlZmF1bHRzAF9zZ19waXBlbGluZV9kZXNjX2RlZmF1bHRzAF9zZ19nbF9pbml0X2xpbWl0cwBfc2dfdmFsaWRhdGVfc2xvdF9iaXRzAF9zZ19nbF9iZWdpbl9wYXNzAHNnX2JlZ2luX3Bhc3MAIV9zZy5jdXJfcGFzcy5pbl9wYXNzAF9zZ19nbF9lbmRfcGFzcwBzZ19lbmRfcGFzcwBhdHRyX2xvYyA8IChHTGludClfc2cubGltaXRzLm1heF92ZXJ0ZXhfYXR0cnMAcG9vbCAmJiBwb29sLT5nZW5fY3RycwBWQUxJREFURV9BQk5EX0VYUEVDVEVEX05PTkZJTFRFUklOR19TQU1QTEVSOiBzZ19hcHBseV9iaW5kaW5nczogc2hhZGVyIGV4cGVjdGVkIFNHX1NBTVBMRVJUWVBFX05PTkZJTFRFUklORywgYnV0IHNhbXBsZXIgaGFzIFNHX0ZJTFRFUl9MSU5FQVIgZmlsdGVycwBfc2dfbm90aWZ5X2NvbW1pdF9saXN0ZW5lcnMAX3NnX3NldHVwX2NvbW1pdF9saXN0ZW5lcnMAX3NnX2Rpc2NhcmRfY29tbWl0X2xpc3RlbmVycwBWQUxJREFURV9TSEFERVJERVNDX1NBTVBMRVJfV0dTTF9HUk9VUDFfQklORElOR19DT0xMSVNJT046IHNhbXBsZXIgJ3dnc2xfZ3JvdXAxX2JpbmRpbmdfbicgbXVzdCBiZSB1bmlxdWUgYWNyb3NzIGFsbCBpbWFnZXMsIHNhbXBsZXJzIGFuZCBzdG9yYWdlIGJ1ZmZlcnMAVkFMSURBVEVfU0hBREVSREVTQ19TVE9SQUdFQlVGRkVSX1dHU0xfR1JPVVAxX0JJTkRJTkdfQ09MTElTSU9OOiBzdG9yYWdlIGJ1ZmZlciAnd2dzbF9ncm91cDFfYmluZGluZ19uJyBtdXN0IGJlIHVuaXF1ZSBhY3Jvc3MgYWxsIGltYWdlcywgc2FtcGxlcnMgYW5kIHN0b3JhZ2UgYnVmZmVycwBWQUxJREFURV9TSEFERVJERVNDX0lNQUdFX1dHU0xfR1JPVVAxX0JJTkRJTkdfQ09MTElTSU9OOiBpbWFnZSAnd2dzbF9ncm91cDFfYmluZGluZ19uJyBtdXN0IGJlIHVuaXF1ZSBhY3Jvc3MgYWxsIGltYWdlcywgc2FtcGxlcnMgYW5kIHN0b3JhZ2UgYnVmZmVycwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfTUlQTEVWRUw6IHBhc3MgYXR0YWNobWVudCBtaXAgbGV2ZWwgaXMgYmlnZ2VyIHRoYW4gaW1hZ2UgaGFzIG1pcG1hcHMAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0RFUFRIX01JUExFVkVMOiBwYXNzIGRlcHRoIGF0dGFjaG1lbnQgbWlwIGxldmVsIGlzIGJpZ2dlciB0aGFuIGltYWdlIGhhcyBtaXBtYXBzAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19SRVNPTFZFX01JUExFVkVMOiBwYXNzIHJlc29sdmUgYXR0YWNobWVudCBtaXAgbGV2ZWwgaXMgYmlnZ2VyIHRoYW4gaW1hZ2UgaGFzIG1pcG1hcHMAVkFMSURBVEVfU0hBREVSREVTQ19OT19VQl9NRU1CRVJTOiBHTCBiYWNrZW5kIHJlcXVpcmVzIHVuaWZvcm0gYmxvY2sgbWVtYmVyIGRlY2xhcmF0aW9ucwAwID09IF9zZy5jb21taXRfbGlzdGVuZXJzLml0ZW1zADAgIT0gX3NnLmNvbW1pdF9saXN0ZW5lcnMuaXRlbXMAX3NnX3NldHVwX3Bvb2xzAF9zZ19kaXNjYXJkX3Bvb2xzADAgPT0gX3NhcHAuZGVmYXVsdF9pY29uX3BpeGVscwAwICE9IF9zYXBwLmRlZmF1bHRfaWNvbl9waXhlbHMAVkFMSURBVEVfU0hBREVSREVTQ19VQl9XR1NMX0dST1VQMF9CSU5ESU5HX0NPTExJU0lPTjogdW5pZm9ybSBibG9jayAnd2dzbF9ncm91cDBfYmluZGluZ19uJyBtdXN0IGJlIHVuaXF1ZSBhY3Jvc3MgYWxsIHVuaWZvcm0gYmxvY2tzAF9zZ19nbF9hcHBseV9iaW5kaW5ncwBzZ19hcHBseV9iaW5kaW5ncwBfc2dfdmFsaWRhdGVfYXBwbHlfYmluZGluZ3MAX3NnX2dsX2NhY2hlX2NsZWFyX3RleHR1cmVfc2FtcGxlcl9iaW5kaW5ncwBEUkFXX1dJVEhPVVRfQklORElOR1M6IGF0dGVtcHRpbmcgdG8gZHJhdyB3aXRob3V0IHJlc291cmNlIGJpbmRpbmdzAExJTlVYX0dMWF9OT19HTFhGQkNPTkZJR1M6IGdsWEdldEZCQ29uZmlncygpIHJldHVybmVkIG5vIGNvbmZpZ3MATElOVVhfRUdMX05PX0NPTkZJR1M6IGVnbENob29zZUNvbmZpZygpIHJldHVybmVkIG5vIGNvbmZpZ3MAX3NhcHAuZHJvcC5udW1fZmlsZXMgPD0gX3NhcHAuZHJvcC5tYXhfZmlsZXMAVkFMSURBVEVfU0hBREVSREVTQ19TVE9SQUdFQlVGRkVSX0dMU0xfQklORElOR19DT0xMSVNJT046IHN0b3JhZ2UgYnVmZmVyICdnbHNsX2JpbmRpbmdfbicgbXVzdCBiZSB1bmlxdWUgYWNyb3NzIHNoYWRlciBzdGFnZXMAdHJpYW5nbGUtdmVydGljZXMAY2FudmFzAF9zYXBwX2Ryb3BwZWRfZmlsZV9wYXRoX3B0cgBkZXNjLT5kYXRhLnB0cgBXSU4zMl9XR0xfREVTQ1JJQkVfUElYRUxGT1JNQVRfRkFJTEVEOiBmYWlsZWQgdG8gZ2V0IHBpeGVsIGZvcm1hdCBkZXNjcmlwdG9yAF9zZ19nbF9ibGVuZF9mYWN0b3IAZXJyb3IARW50ZXIAMCA9PSBfc2cuY29tbWl0X2xpc3RlbmVycy51cHBlcgBJREVOVElDQUxfQ09NTUlUX0xJU1RFTkVSOiBhdHRlbXB0aW5nIHRvIGFkZCBpZGVudGljYWwgY29tbWl0IGxpc3RlbmVyAF9zZ19nbF9jYWNoZV9pbnZhbGlkYXRlX3RleHR1cmVfc2FtcGxlcgBfc2dfZ2xfY2FjaGVfYmluZF90ZXh0dXJlX3NhbXBsZXIAX3NnX2dsX2Rpc2NhcmRfc2FtcGxlcgBWQUxJREFURV9TSEFERVJERVNDX0NPTVBBUklTT05fU0FNUExFUl9SRVFVSVJFRDogaW1hZ2Ugc2FtcGxlIHR5cGUgREVQVEggY2FuIG9ubHkgYmUgdXNlZCB3aXRoIENPTVBBUklTT04gc2FtcGxlcgBWQUxJREFURV9TSEFERVJERVNDX05PTkZJTFRFUklOR19TQU1QTEVSX1JFUVVJUkVEOiBpbWFnZSBzYW1wbGUgdHlwZSBVTkZJTFRFUkFCTEVfRkxPQVQsIFVJTlQsIFNJTlQgY2FuIG9ubHkgYmUgdXNlZCB3aXRoIE5PTkZJTFRFUklORyBzYW1wbGVyAHNhcHBfZ2xfZ2V0X2ZyYW1lYnVmZmVyAF9zZ19pbml0X2J1ZmZlcgBfc2FwcF9jbGVhcl9kcm9wX2J1ZmZlcgBfc2dfZ2xfY3JlYXRlX2J1ZmZlcgBzZ19tYWtlX2J1ZmZlcgBfc2dfZ2xfY2FjaGVfYmluZF9zdG9yYWdlX2J1ZmZlcgBfc2dfZ2xfZGlzY2FyZF9idWZmZXIAX3NnX2dsX2NhY2hlX2JpbmRfYnVmZmVyAF9zYXBwLmRyb3AuYnVmZmVyAF9zYXBwLmNsaXBib2FyZC5idWZmZXIAVkFMSURBVEVfQVBQRU5EQlVGX1VTQUdFOiBzZ19hcHBlbmRfYnVmZmVyOiBjYW5ub3QgYXBwZW5kIHRvIGltbXV0YWJsZSBidWZmZXIAVkFMSURBVEVfVVBEQVRFQlVGX1VTQUdFOiBzZ191cGRhdGVfYnVmZmVyOiBjYW5ub3QgdXBkYXRlIGltbXV0YWJsZSBidWZmZXIAVkFMSURBVEVfQUJORF9TVE9SQUdFQlVGRkVSX0JJTkRJTkdfQlVGRkVSVFlQRTogc2dfYXBwbHlfYmluZGluZ3M6IGJ1ZmZlciBib3VuZCBzdG9yYWdlIGJ1ZmZlciBzbG90IGlzIG5vdCBvZiB0eXBlIHN0b3JhZ2UgYnVmZmVyAENMSVBCT0FSRF9TVFJJTkdfVE9PX0JJRzogY2xpcGJvYXJkIHN0cmluZyBkaWRuJ3QgZml0IGludG8gY2xpcGJvYXJkIGJ1ZmZlcgBfc2dfaW5pdF9zaGFkZXIAX3NnX2xvb2t1cF9zaGFkZXIAX3NnX2dsX2NyZWF0ZV9zaGFkZXIAX3NnX2dsX2NvbXBpbGVfc2hhZGVyAHRyaWFuZ2xlX3NoYWRlcgBzZ19tYWtlX3NoYWRlcgBfc2dfZ2xfZGlzY2FyZF9zaGFkZXIAYm5kLT5waXAgJiYgYm5kLT5waXAtPnNoYWRlcgBWQUxJREFURV9QSVBFTElORURFU0NfQVRUUl9TRU1BTlRJQ1M6IEQzRDExIG1pc3NpbmcgdmVydGV4IGF0dHJpYnV0ZSBzZW1hbnRpY3MgaW4gc2hhZGVyAF90ZXh0dXJlX2Zsb2F0X2xpbmVhcgBfc2FwcF9jbGVhcgBfc2dfY2xlYXIAc2dfc2V0dXAAc2FwcABzb2tvbF9hcHAAX3NhcHBfZW1zY19kcm9wAF9zZ19nbF9zdGVuY2lsX29wAF9zZ19nbF9ibGVuZF9vcABzbXAAcGlwAEFycm93VXAAUGFnZVVwAFZBTElEQVRFX1NIQURFUkRFU0NfVUJfU0laRV9JU19aRVJPOiBib3VuZCB1bmlmb3JtIGJsb2NrIHNpemUgY2Fubm90IGJlIHplcm8AaW5mbwBWQUxJREFURV9BQk5EX1ZCX09WRVJGTE9XOiBzZ19hcHBseV9iaW5kaW5nczogYnVmZmVyIGluIHZlcnRleCBidWZmZXIgc2xvdCBpcyBvdmVyZmxvd24AVkFMSURBVEVfQUJORF9JQl9PVkVSRkxPVzogc2dfYXBwbHlfYmluZGluZ3M6IGJ1ZmZlciBpbiBpbmRleCBidWZmZXIgc2xvdCBpcyBvdmVyZmxvd24AQXJyb3dEb3duAFBhZ2VEb3duAFdJTjMyX1dHTF9DUkVBVEVfQ09OVEVYVF9BVFRSSUJTX0ZBSUxFRF9PVEhFUjogQ3JlYXRlQ29udGV4dEF0dHJpYnNBUkIgZmFpbGVkIGZvciBvdGhlciByZWFzb24AU2VtaWNvbG9uAHBvc2l0aW9uAExJTlVYX1gxMV9GQUlMRURfVE9fQkVDT01FX09XTkVSX09GX0NMSVBCT0FSRDogWDExOiBGYWlsZWQgdG8gYmVjb21lIG93bmVyIG9mIGNsaXBib2FyZCBzZWxlY3Rpb24AYWN0aW9uAExJTlVYX0dMWF9RVUVSWV9WRVJTSU9OX0ZBSUxFRDogZmFpbGVkIHRvIHF1ZXJ5IEdMWCB2ZXJzaW9uAF9zYXBwX3NldHVwX2RlZmF1bHRfaWNvbgBzYXBwX3NldF9pY29uAF9zYXBwX2Vtc2Nfc2V0X2ljb24AbWFpbgBXR1BVX1NXQVBDSEFJTl9DUkVBVEVfREVQVEhfU1RFTkNJTF9URVhUVVJFX0ZBSUxFRDogd2dwdTogZmFpbGVkIHRvIGNyZWF0ZSBkZXB0aC1zdGVuY2lsIHRleHR1cmUgZm9yIHN3YXBjaGFpbgBXR1BVX1NXQVBDSEFJTl9DUkVBVEVfTVNBQV9URVhUVVJFX0ZBSUxFRDogd2dwdTogZmFpbGVkIHRvIGNyZWF0ZSBtc2FhIHRleHR1cmUgZm9yIHN3YXBjaGFpbgBXR1BVX1NXQVBDSEFJTl9DUkVBVEVfU1VSRkFDRV9GQUlMRUQ6IHdncHU6IGZhaWxlZCB0byBjcmVhdGUgc3VyZmFjZSBmb3Igc3dhcGNoYWluAFByaW50U2NyZWVuADAgPT0gX3NnLmNvbW1pdF9saXN0ZW5lcnMubnVtAF9zZ19pbml0X3Bvb2wAX3NnX2Rpc2NhcmRfcG9vbABDT01NSVRfTElTVEVORVJfQVJSQVlfRlVMTDogY29tbWl0IGxpc3RlbmVyIGFycmF5IGZ1bGwAV0lOMzJfTE9BRF9PUEVOR0wzMl9ETExfRkFJTEVEOiBmYWlsZWQgbG9hZGluZyBvcGVuZ2wzMi5kbGwARXF1YWwATnVtcGFkRGVjaW1hbABDYXBzTG9jawBOdW1Mb2NrAFNjcm9sbExvY2sAT0s6IE9rAEJhY2tzbGFzaABTbGFzaAAvVXNlcnMva29uc3VtZXIvRGVza3RvcC9kZXYvc29rb2wtY2FudmFzLWV4YW1wbGUtMTE1NC9zb2tvbC9zb2tvbF9nZnguaAAvVXNlcnMva29uc3VtZXIvRGVza3RvcC9kZXYvc29rb2wtY2FudmFzLWV4YW1wbGUtMTE1NC9zb2tvbC9zb2tvbF9hcHAuaABBTkRST0lEX1dSSVRFX01TR19GQUlMRUQ6IGZhaWxlZCB0byB3cml0ZSBtZXNzYWdlIGluIF9zYXBwX2FuZHJvaWRfbXNnACFzaGQtPmdsLnByb2cATElOVVhfR0xYX1JFUVVJUkVEX0VYVEVOU0lPTlNfTUlTU0lORzogR0xYIGV4dGVuc2lvbnMgQVJCX2NyZWF0ZV9jb250ZXh0IGFuZCBBUkJfY3JlYXRlX2NvbnRleHRfcHJvZmlsZSBtaXNzaW5nAFZBTElEQVRFX1NIQURFUkRFU0NfSU1BR0VfU0FNUExFUl9QQUlSX0dMU0xfTkFNRTogaW1hZ2Utc2FtcGxlci1wYWlyICdnbHNsX25hbWUnIG1pc3NpbmcAVkFMSURBVEVfU0hBREVSREVTQ19VQl9VTklGT1JNX0dMU0xfTkFNRTogdW5pZm9ybSBibG9jayBtZW1iZXIgJ2dsc2xfbmFtZScgbWlzc2luZwB3YXJuaW5nAF9zZ19nbF9jYWNoZV9yZXN0b3JlX2J1ZmZlcl9iaW5kaW5nAF9zZ19nbF9jYWNoZV9zdG9yZV9idWZmZXJfYmluZGluZwBpbWcATElOVVhfR0xYX05PX1NVSVRBQkxFX0dMWEZCQ09ORklHOiBmYWlsZWQgdG8gZmluZCBhIHN1aXRhYmxlIEdMWEZCQ29uZmlnAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19SRVNPTFZFX0xBWUVSOiBwYXNzIHJlc29sdmUgYXR0YWNobWVudCBpcyBhcnJheSB0ZXh0dXJlLCBidXQgbGF5ZXIgaW5kZXggaXMgdG9vIGJpZwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfTEFZRVI6IHBhc3MgYXR0YWNobWVudCBpbWFnZSBpcyBhcnJheSB0ZXh0dXJlLCBidXQgbGF5ZXIgaW5kZXggaXMgdG9vIGJpZwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfREVQVEhfTEFZRVI6IHBhc3MgZGVwdGggYXR0YWNobWVudCBpbWFnZSBpcyBhcnJheSB0ZXh0dXJlLCBidXQgbGF5ZXIgaW5kZXggaXMgdG9vIGJpZwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfUkVTT0xWRV9GQUNFOiBwYXNzIHJlc29sdmUgYXR0YWNobWVudCBpcyBjdWJlbWFwLCBidXQgZmFjZSBpbmRleCBpcyB0b28gYmlnAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19GQUNFOiBwYXNzIGF0dGFjaG1lbnQgaW1hZ2UgaXMgY3ViZW1hcCwgYnV0IGZhY2UgaW5kZXggaXMgdG9vIGJpZwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfREVQVEhfRkFDRTogcGFzcyBkZXB0aCBhdHRhY2htZW50IGltYWdlIGlzIGN1YmVtYXAsIGJ1dCBmYWNlIGluZGV4IGlzIHRvbyBiaWcAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX1JFU09MVkVfU0xJQ0U6IHBhc3MgcmVzb2x2ZSBhdHRhY2htZW50IGlzIDNkIHRleHR1cmUsIGJ1dCBzbGljZSB2YWx1ZSBpcyB0b28gYmlnAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19TTElDRTogcGFzcyBhdHRhY2htZW50IGltYWdlIGlzIDNkIHRleHR1cmUsIGJ1dCBzbGljZSB2YWx1ZSBpcyB0b28gYmlnAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19ERVBUSF9TTElDRTogcGFzcyBkZXB0aCBhdHRhY2htZW50IGltYWdlIGlzIDNkIHRleHR1cmUsIGJ1dCBzbGljZSB2YWx1ZSBpcyB0b28gYmlnAGdsX2J1ZgBfc2dfdmVydGV4Zm9ybWF0X2J5dGVzaXplAF9zZ19nbF92ZXJ0ZXhmb3JtYXRfc2l6ZQBfc2dfdW5pZm9ybV9zaXplAG9mZnNldCA8IF9zYXBwLmRyb3AuYnVmX3NpemUAVkFMSURBVEVfVVBEQVRFQlVGX1NJWkU6IHNnX3VwZGF0ZV9idWZmZXI6IHVwZGF0ZSBzaXplIGlzIGJpZ2dlciB0aGFuIGJ1ZmZlciBzaXplAFZBTElEQVRFX0FQUEVOREJVRl9TSVpFOiBzZ19hcHBlbmRfYnVmZmVyOiBvdmVyYWxsIGFwcGVuZGVkIHNpemUgaXMgYmlnZ2VyIHRoYW4gYnVmZmVyIHNpemUAVkFMSURBVEVfQlVGRkVSREVTQ19EQVRBX1NJWkU6IGltbXV0YWJsZSBidWZmZXIgZGF0YSBzaXplIGRpZmZlcnMgZnJvbSBidWZmZXIgc2l6ZQBWQUxJREFURV9TSEFERVJERVNDX1VCX1NJWkVfTUlTTUFUQ0g6IHNpemUgb2YgdW5pZm9ybSBibG9jayBtZW1iZXJzIGRvZXNuJ3QgbWF0Y2ggdW5pZm9ybSBibG9jayBzaXplAFZBTElEQVRFX0FVQl9TSVpFOiBzZ19hcHBseV91bmlmb3JtczogZGF0YSBzaXplIGRvZXNuJ3QgbWF0Y2ggZGVjbGFyZWQgdW5pZm9ybSBibG9jayBzaXplAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19JTUFHRV9TSVpFUzogYWxsIHBhc3MgYXR0YWNobWVudHMgbXVzdCBoYXZlIHRoZSBzYW1lIHNpemUAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX1JFU09MVkVfSU1BR0VfU0laRVM6IHBhc3MgcmVzb2x2ZSBhdHRhY2htZW50IHNpemUgbXVzdCBtYXRjaCBjb2xvciBhdHRhY2htZW50IGltYWdlIHNpemUAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0RFUFRIX0lNQUdFX1NJWkVTOiBwYXNzIGRlcHRoIGF0dGFjaG1lbnQgaW1hZ2Ugc2l6ZSBtdXN0IG1hdGNoIGNvbG9yIGF0dGFjaG1lbnQgaW1hZ2Ugc2l6ZQBWQUxJREFURV9JTUFHRURBVEFfREFUQV9TSVpFOiBzZ19pbWFnZV9kYXRhOiBkYXRhIHNpemUgZG9lc24ndCBtYXRjaCBleHBlY3RlZCBzdXJmYWNlIHNpemUAVkFMSURBVEVfQkVHSU5QQVNTX0FUVEFDSE1FTlRTX0VYSVNUUzogc2dfYmVnaW5fcGFzczogYXR0YWNobWVudHMgb2JqZWN0IG5vIGxvbmdlciBhbGl2ZQBWQUxJREFURV9BUElQX1NIQURFUl9FWElTVFM6IHNnX2FwcGx5X3BpcGVsaW5lOiBzaGFkZXIgb2JqZWN0IG5vIGxvbmdlciBhbGl2ZQBWQUxJREFURV9BQk5EX1BJUEVMSU5FX0VYSVNUUzogc2dfYXBwbHlfYmluZGluZ3M6IGN1cnJlbnRseSBhcHBsaWVkIHBpcGVsaW5lIG9iamVjdCBubyBsb25nZXIgYWxpdmUAVkFMSURBVEVfQVBJUF9QSVBFTElORV9FWElTVFM6IHNnX2FwcGx5X3BpcGVsaW5lOiBwaXBlbGluZSBvYmplY3Qgbm8gbG9uZ2VyIGFsaXZlAFZBTElEQVRFX0FQSVBfQ1VSUEFTU19BVFRBQ0hNRU5UU19FWElTVFM6IHNnX2FwcGx5X3BpcGVsaW5lOiBjdXJyZW50IHBhc3MgYXR0YWNobWVudHMgbm8gbG9uZ2VyIGFsaXZlAFZBTElEQVRFX0FCTkRfU01QX0VYSVNUUzogc2dfYXBwbHlfYmluZGluZ3M6IGJvdW5kIHNhbXBsZXIgbm8gbG9uZ2VyIGFsaXZlAFZBTElEQVRFX0FCTkRfVkJfRVhJU1RTOiBzZ19hcHBseV9iaW5kaW5nczogdmVydGV4IGJ1ZmZlciBubyBsb25nZXIgYWxpdmUAVkFMSURBVEVfQUJORF9JQl9FWElTVFM6IHNnX2FwcGx5X2JpbmRpbmdzOiBpbmRleCBidWZmZXIgbm8gbG9uZ2VyIGFsaXZlAFZBTElEQVRFX0FCTkRfU1RPUkFHRUJVRkZFUl9FWElTVFM6IHNnX2FwcGx5X2JpbmRpbmdzOiBib3VuZCBzdG9yYWdlIGJ1ZmZlciBubyBsb25nZXIgYWxpdmUAVkFMSURBVEVfQUJORF9JTUdfRVhJU1RTOiBzZ19hcHBseV9iaW5kaW5nczogYm91bmQgaW1hZ2Ugbm8gbG9uZ2VyIGFsaXZlAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19SRVNPTFZFX0lNQUdFX05PX1JUOiBwYXNzIHJlc29sdmUgYXR0YWNobWVudCBpbWFnZSBtdXN0IGhhdmUgcmVuZGVyX3RhcmdldD10cnVlAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19JTUFHRV9OT19SVDogcGFzcyBhdHRhY2htZW50IGltYWdlIG11c3QgYmUgaGF2ZSByZW5kZXJfdGFyZ2V0PXRydWUAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0RFUFRIX0lNQUdFX05PX1JUOiBwYXNzIGRlcHRoIGF0dGFjaG1lbnQgaW1hZ2UgbXVzdCBiZSBoYXZlIHJlbmRlcl90YXJnZXQ9dHJ1ZQBfc2FwcF9yaW5nX2VucXVldWUAX3NhcHBfcmluZ19kZXF1ZXVlAHBvb2wtPmZyZWVfcXVldWUAV0lOMzJfR0VUX1BJWEVMRk9STUFUX0FUVFJJQl9GQUlMRUQ6IGZhaWxlZCB0byBnZXQgV0dMIHBpeGVsIGZvcm1hdCBhdHRyaWJ1dGUAQmFja3F1b3RlAFF1b3RlAERlbGV0ZQBfc2FwcF9pbml0X3N0YXRlAF9zYXBwX2Rpc2NhcmRfc3RhdGUAVkFMSURBVEVfQVBJUF9TSEFERVJfVkFMSUQ6IHNnX2FwcGx5X3BpcGVsaW5lOiBzaGFkZXIgb2JqZWN0IG5vdCBpbiB2YWxpZCBzdGF0ZQBWQUxJREFURV9BQk5EX1BJUEVMSU5FX1ZBTElEOiBzZ19hcHBseV9iaW5kaW5nczogY3VycmVudGx5IGFwcGxpZWQgcGlwZWxpbmUgb2JqZWN0IG5vdCBpbiB2YWxpZCBzdGF0ZQBWQUxJREFURV9BUElQX1BJUEVMSU5FX1ZBTElEOiBzZ19hcHBseV9waXBlbGluZTogcGlwZWxpbmUgb2JqZWN0IG5vdCBpbiB2YWxpZCBzdGF0ZQBWQUxJREFURV9BUElQX0NVUlBBU1NfQVRUQUNITUVOVFNfVkFMSUQ6IHNnX2FwcGx5X3BpcGVsaW5lOiBjdXJyZW50IHBhc3MgYXR0YWNobWVudHMgbm90IGluIHZhbGlkIHN0YXRlAERFQUxMT0NfU0FNUExFUl9JTlZBTElEX1NUQVRFOiBzZ19kZWFsbG9jX3NhbXBsZXIoKTogc2FtcGxlciBtdXN0IGJlIGluIGFsbG9jIHN0YXRlAERFQUxMT0NfSU1BR0VfSU5WQUxJRF9TVEFURTogc2dfZGVhbGxvY19pbWFnZSgpOiBpbWFnZSBtdXN0IGJlIGluIGFsbG9jIHN0YXRlAFVOSU5JVF9BVFRBQ0hNRU5UU19JTlZBTElEX1NUQVRFOiBzZ191bmluaXRfYXR0YWNobWVudHMoKTogYXR0YWNobWVudHMgbXVzdCBiZSBpbiBWQUxJRCBvciBGQUlMRUQgc3RhdGUAVU5JTklUX1NBTVBMRVJfSU5WQUxJRF9TVEFURTogc2dfdW5pbml0X3NhbXBsZXIoKTogc2FtcGxlciBtdXN0IGJlIGluIFZBTElEIG9yIEZBSUxFRCBzdGF0ZQBVTklOSVRfQlVGRkVSX0lOVkFMSURfU1RBVEU6IHNnX3VuaW5pdF9idWZmZXIoKTogYnVmZmVyIG11c3QgYmUgaW4gVkFMSUQgb3IgRkFJTEVEIHN0YXRlAFVOSU5JVF9TSEFERVJfSU5WQUxJRF9TVEFURTogc2dfdW5pbml0X3NoYWRlcigpOiBzaGFkZXIgbXVzdCBiZSBpbiBWQUxJRCBvciBGQUlMRUQgc3RhdGUAVU5JTklUX1BJUEVMSU5FX0lOVkFMSURfU1RBVEU6IHNnX3VuaW5pdF9waXBlbGluZSgpOiBwaXBlbGluZSBtdXN0IGJlIGluIFZBTElEIG9yIEZBSUxFRCBzdGF0ZQBVTklOSVRfSU1BR0VfSU5WQUxJRF9TVEFURTogc2dfdW5pbml0X2ltYWdlKCk6IGltYWdlIG11c3QgYmUgaW4gVkFMSUQgb3IgRkFJTEVEIHN0YXRlAEZBSUxfQVRUQUNITUVOVFNfSU5WQUxJRF9TVEFURTogc2dfZmFpbF9hdHRhY2htZW50cygpOiBhdHRhY2htZW50cyBtdXN0IGJlIGluIEFMTE9DIHN0YXRlAERFQUxMT0NfQVRUQUNITUVOVFNfSU5WQUxJRF9TVEFURTogc2dfZGVhbGxvY19hdHRhY2htZW50cygpOiBhdHRhY2htZW50cyBtdXN0IGJlIGluIEFMTE9DIHN0YXRlAElOSVRfQVRUQUNITUVOVFNfSU5WQUxJRF9TVEFURTogc2dfaW5pdF9hdHRhY2htZW50cygpOiBwYXNzIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUASU5JVF9TQU1QTEVSX0lOVkFMSURfU1RBVEU6IHNnX2luaXRfc2FtcGxlcigpOiBzYW1wbGVyIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUARkFJTF9TQU1QTEVSX0lOVkFMSURfU1RBVEU6IHNnX2ZhaWxfc2FtcGxlcigpOiBzYW1wbGVyIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUASU5JVF9CVUZGRVJfSU5WQUxJRF9TVEFURTogc2dfaW5pdF9idWZmZXIoKTogYnVmZmVyIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUARkFJTF9CVUZGRVJfSU5WQUxJRF9TVEFURTogc2dfZmFpbF9idWZmZXIoKTogYnVmZmVyIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUAREVBTExPQ19CVUZGRVJfSU5WQUxJRF9TVEFURTogc2dfZGVhbGxvY19idWZmZXIoKTogYnVmZmVyIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUASU5JVF9TSEFERVJfSU5WQUxJRF9TVEFURTogc2dfaW5pdF9zaGFkZXIoKTogc2hhZGVyIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUARkFJTF9TSEFERVJfSU5WQUxJRF9TVEFURTogc2dfZmFpbF9zaGFkZXIoKTogc2hhZGVyIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUAREVBTExPQ19TSEFERVJfSU5WQUxJRF9TVEFURTogc2dfZGVhbGxvY19zaGFkZXIoKTogc2hhZGVyIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUASU5JVF9QSVBFTElORV9JTlZBTElEX1NUQVRFOiBzZ19pbml0X3BpcGVsaW5lKCk6IHBpcGVsaW5lIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUARkFJTF9QSVBFTElORV9JTlZBTElEX1NUQVRFOiBzZ19mYWlsX3BpcGVsaW5lKCk6IHBpcGVsaW5lIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUAREVBTExPQ19QSVBFTElORV9JTlZBTElEX1NUQVRFOiBzZ19kZWFsbG9jX3BpcGVsaW5lKCk6IHBpcGVsaW5lIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUASU5JVF9JTUFHRV9JTlZBTElEX1NUQVRFOiBzZ19pbml0X2ltYWdlKCk6IGltYWdlIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUARkFJTF9JTUFHRV9JTlZBTElEX1NUQVRFOiBzZ19mYWlsX2ltYWdlKCk6IGltYWdlIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfT05TQVZFSU5TVEFOQ0VTVEFURTogTmF0aXZlQWN0aXZpdHkgb25TYXZlSW5zdGFuY2VTdGF0ZQBBTkRST0lEX05BVElWRV9BQ1RJVklUWV9PTkNSRUFURTogTmF0aXZlQWN0aXZpdHkgb25DcmVhdGUAX3NhcHBfaW1hZ2VfdmFsaWRhdGUAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfT05QQVVTRTogTmF0aXZlQWN0aXZpdHkgb25QYXVzZQBzYXBwX21ldGFsX2dldF9tc2FhX2NvbG9yX3RleHR1cmUAc2FwcF9tZXRhbF9nZXRfZGVwdGhfc3RlbmNpbF90ZXh0dXJlAF9zZ19nbF9jYWNoZV9hY3RpdmVfdGV4dHVyZQBXR1BVX1NXQVBDSEFJTl9DUkVBVEVfREVQVEhfU1RFTkNJTF9WSUVXX0ZBSUxFRDogd2dwdTogZmFpbGVkIHRvIGNyZWF0ZSB2aWV3IG9iamVjdCBmb3Igc3dhcGNoYWluIGRlcHRoLXN0ZW5jaWwgdGV4dHVyZQBXR1BVX1NXQVBDSEFJTl9DUkVBVEVfTVNBQV9WSUVXX0ZBSUxFRDogd2dwdTogZmFpbGVkIHRvIGNyZWF0ZSB2aWV3IG9iamVjdCBmb3Igc3dhcGNoYWluIG1zYWEgdGV4dHVyZQBfc2dfZ2xfaW5kZXhfdHlwZQBfc2dfZ2xfdmVydGV4Zm9ybWF0X3R5cGUAX3NnX2dsX3ByaW1pdGl2ZV90eXBlAEFORFJPSURfQ1JFQVRFX1RIUkVBRF9QSVBFX0ZBSUxFRDogZmFpbGVkIHRvIGNyZWF0ZSB0aHJlYWQgcGlwZQBFc2NhcGUAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfRE9ORTogTmF0aXZlQWN0aXZpdHkgZG9uZQBBTkRST0lEX0xPT1BfVEhSRUFEX0RPTkU6IGxvb3AgdGhyZWFkIGRvbmUAX3NnX2dsX2FwcGx5X3BpcGVsaW5lAFZBTElEQVRFX0FCTkRfUElQRUxJTkU6IHNnX2FwcGx5X2JpbmRpbmdzOiBtdXN0IGJlIGNhbGxlZCBhZnRlciBzZ19hcHBseV9waXBlbGluZQBfc2dfdmFsaWRhdGVfYXBwbHlfcGlwZWxpbmUAX3NnX2luaXRfcGlwZWxpbmUAX3NnLmdsLmNhY2hlLmN1cl9waXBlbGluZQBfc2dfbG9va3VwX3BpcGVsaW5lAF9zZ19nbF9jcmVhdGVfcGlwZWxpbmUAc2dfbWFrZV9waXBlbGluZQBfc2dfZ2xfZGlzY2FyZF9waXBlbGluZQB0cmlhbmdsZS1waXBlbGluZQBBTkRST0lEX05BVElWRV9BQ1RJVklUWV9PTlJFU1VNRTogTmF0aXZlQWN0aXZpdHkgb25SZXN1bWUASG9tZQBWQUxJREFURV9BUFBFTkRCVUZfVVBEQVRFOiBzZ19hcHBlbmRfYnVmZmVyOiBjYW5ub3QgY2FsbCBzZ19hcHBlbmRfYnVmZmVyIGFuZCBzZ191cGRhdGVfYnVmZmVyIGluIHNhbWUgZnJhbWUAVkFMSURBVEVfVVBEQVRFQlVGX0FQUEVORDogc2dfdXBkYXRlX2J1ZmZlcjogY2Fubm90IGNhbGwgc2dfdXBkYXRlX2J1ZmZlciBhbmQgc2dfYXBwZW5kX2J1ZmZlciBpbiBzYW1lIGZyYW1lAFZBTElEQVRFX1VQREFURUJVRl9PTkNFOiBzZ191cGRhdGVfYnVmZmVyOiBvbmx5IG9uZSB1cGRhdGUgYWxsb3dlZCBwZXIgYnVmZmVyIGFuZCBmcmFtZQBWQUxJREFURV9VUERJTUdfT05DRTogc2dfdXBkYXRlX2ltYWdlOiBvbmx5IG9uZSB1cGRhdGUgYWxsb3dlZCBwZXIgaW1hZ2UgYW5kIGZyYW1lAHVfZGVzYy0+Z2xzbF9uYW1lAGltZ19zbXBfZGVzYy0+Z2xzbF9uYW1lAHNhcHBfbWV0YWxfZ2V0X2N1cnJlbnRfZHJhd2FibGUAVkFMSURBVEVfSU1BR0VERVNDX0NPTVBSRVNTRURfSU1NVVRBQkxFOiBjb21wcmVzc2VkIGltYWdlcyBtdXN0IGJlIGltbXV0YWJsZQBfc2dfZ2xfcmVzZXRfc3RhdGVfY2FjaGUAX3NnX2dsX3NoYWRlcl9zdGFnZQBkZXNjLT5zYW1wbGVyc1tzcmMtPnNhbXBsZXJfc2xvdF0uc3RhZ2UgPT0gc3JjLT5zdGFnZQBkZXNjLT5pbWFnZXNbc3JjLT5pbWFnZV9zbG90XS5zdGFnZSA9PSBzcmMtPnN0YWdlAFZBTElEQVRFX1NIQURFUkRFU0NfSU1BR0VfU0FNUExFUl9QQUlSX1NBTVBMRVJfU1RBR0VfTUlTTUFUQ0g6IGltYWdlLXNhbXBsZXItcGFpciBzdGFnZSBkb2Vzbid0IG1hdGNoIHJlZmVyZW5jZWQgc2FtcGxlciBzdGFnZQBWQUxJREFURV9TSEFERVJERVNDX1VCX01FVEFMX0JVRkZFUl9TTE9UX0NPTExJU0lPTjogdW5pZm9ybSBibG9jayAnbXNsX2J1ZmZlcl9uJyBtdXN0IGJlIHVuaXF1ZSBhY3Jvc3MgdW5pZm9ybSBibG9ja3MgYW5kIHN0b3JhZ2UgYnVmZmVycyBpbiBzYW1lIHNoYWRlciBzdGFnZQBWQUxJREFURV9TSEFERVJERVNDX0lNQUdFX0hMU0xfUkVHSVNURVJfVF9DT0xMSVNJT046IGltYWdlICdobHNsX3JlZ2lzdGVyX3RfbicgbXVzdCBiZSB1bmlxdWUgYWNyb3NzIGltYWdlcyBhbmQgc3RvcmFnZSBidWZmZXJzIGluIHNhbWUgc2hhZGVyIHN0YWdlAFZBTElEQVRFX1NIQURFUkRFU0NfVUJfSExTTF9SRUdJU1RFUl9CX0NPTExJU0lPTjogdW5pZm9ybSBibG9jayAnaGxzbF9yZWdpc3Rlcl9iX24nIG11c3QgYmUgdW5pcXVlIGFjcm9zcyB1bmlmb3JtIGJsb2NrcyBpbiBzYW1lIHNoYWRlciBzdGFnZQBWQUxJREFURV9TSEFERVJERVNDX1NUT1JBR0VCVUZGRVJfSExTTF9SRUdJU1RFUl9UX0NPTExJU0lPTjogc3RvcmFnZV9idWZmZXIgJ2hsc2xfcmVnaXN0ZXJfdF9uJyBtdXN0IGJlIHVuaXF1ZSBhY3Jvc3Mgc3RvcmFnZSBidWZmZXJzIGFuZCBpbWFnZXMgaW4gc2FtZSBzaGFkZXIgc3RhZ2UAVkFMSURBVEVfU0hBREVSREVTQ19TVE9SQUdFQlVGRkVSX01FVEFMX0JVRkZFUl9TTE9UX0NPTExJU0lPTjogc3RvcmFnZSBidWZmZXIgJ21zbF9idWZmZXJfbicgbXVzdCBiZSB1bmlxdWUgYWNyb3NzIHVuaWZvcm0gYmxvY2tzIGFuZCBzdG9yYWdlIGJ1ZmZlciBpbiBzYW1lIHNoYWRlciBzdGFnZQBWQUxJREFURV9TSEFERVJERVNDX1NBTVBMRVJfSExTTF9SRUdJU1RFUl9TX0NPTExJU0lPTjogc2FtcGxlciAnaGxzbF9yZWdpc3Rlcl9zX24nIG11c3QgYmUgdW5pcXVlIGluIHNhbWUgc2hhZGVyIHN0YWdlAFZBTElEQVRFX1NIQURFUkRFU0NfU0FNUExFUl9NRVRBTF9TQU1QTEVSX1NMT1RfQ09MTElTSU9OOiBzYW1wbGVyICdtc2xfc2FtcGxlcl9uJyBtdXN0IGJlIHVuaXF1ZSBpbiBzYW1lIHNoYWRlciBzdGFnZQBWQUxJREFURV9TSEFERVJERVNDX0lNQUdFX01FVEFMX1RFWFRVUkVfU0xPVF9DT0xMSVNJT046IGltYWdlICdtc2xfdGV4dHVyZV9uJyBtdXN0IGJlIHVuaXF1ZSBpbiBzYW1lIHNoYWRlciBzdGFnZQBWQUxJREFURV9TSEFERVJERVNDX0lNQUdFX1NBTVBMRVJfUEFJUl9JTUFHRV9TVEFHRV9NSVNNQVRDSDogaW1hZ2Utc2FtcGxlci1wYWlyIHN0YWdlIGRvZXNuJ3QgbWF0Y2ggcmVmZXJlbmNlZCBpbWFnZSBzdGFnZQBfc2dfZ2xfdXNhZ2UAX3NnX2dsX2F0dGFjaG1lbnRzX2RzX2ltYWdlAF9zZ19nbF9hdHRhY2htZW50c19jb2xvcl9pbWFnZQBfc2dfZ2xfYXR0YWNobWVudHNfcmVzb2x2ZV9pbWFnZQBfc2dfZ2xfZGlzY2FyZF9pbWFnZQBWQUxJREFURV9JTUFHRURFU0NfTk9OUlRfUElYRUxGT1JNQVQ6IGludmFsaWQgcGl4ZWwgZm9ybWF0IGZvciBub24tcmVuZGVyLXRhcmdldCBpbWFnZQBWQUxJREFURV9JTUFHRURFU0NfUlRfUElYRUxGT1JNQVQ6IGludmFsaWQgcGl4ZWwgZm9ybWF0IGZvciByZW5kZXItdGFyZ2V0IGltYWdlAFZBTElEQVRFX1VQRElNR19VU0FHRTogc2dfdXBkYXRlX2ltYWdlOiBjYW5ub3QgdXBkYXRlIGltbXV0YWJsZSBpbWFnZQBOdW1wYWREaXZpZGUAV0dQVV9DUkVBVEVfSU5TVEFOQ0VfRkFJTEVEOiB3Z3B1OiBmYWlsZWQgdG8gY3JlYXRlIGluc3RhbmNlAHNhcHBfd2dwdV9nZXRfZGV2aWNlAHNhcHBfbWV0YWxfZ2V0X2RldmljZQBzYXBwX2QzZDExX2dldF9kZXZpY2UAQmFja3NwYWNlAFNwYWNlAFdJTjMyX0QzRDExX1FVRVJZX0lOVEVSRkFDRV9JRFhHSURFVklDRTFfRkFJTEVEOiBjb3VsZCBub3Qgb2J0YWluIElEWEdJRGV2aWNlMSBpbnRlcmZhY2UAUGVyaW9kAExJTlVYX0dMWF9FWFRFTlNJT05fTk9UX0ZPVU5EOiBHTFggZXh0ZW5zaW9uIG5vdCBmb3VuZABfZmxvYXRfYmxlbmQAc2dfcXVlcnlfYmFja2VuZABfc2dfZ2xfc2V0dXBfYmFja2VuZABfc2dfZ2xfZGlzY2FyZF9iYWNrZW5kAGRzdCA9PSBkc3RfZW5kAGRzdCA8IGRzdF9lbmQAYm5kAEVuZABWQUxJREFURV9BQk5EX0VYUEVDVEVEX1NBTVBMRVJfQklORElORzogc2dfYXBwbHlfYmluZGluZ3M6IHNhbXBsZXIgYmluZGluZyBpcyBtaXNzaW5nIG9yIHRoZSBzYW1wbGVyIGhhbmRsZSBpcyBpbnZhbGlkAFZBTElEQVRFX0FCTkRfRVhQRUNURURfVkI6IHNnX2FwcGx5X2JpbmRpbmdzOiB2ZXJ0ZXggYnVmZmVyIGJpbmRpbmcgaXMgbWlzc2luZyBvciBidWZmZXIgaGFuZGxlIGlzIGludmFsaWQAVkFMSURBVEVfQUJORF9FWFBFQ1RFRF9TVE9SQUdFQlVGRkVSX0JJTkRJTkc6IHNnX2FwcGx5X2JpbmRpbmdzOiBzdG9yYWdlIGJ1ZmZlciBiaW5kaW5nIGlzIG1pc3Npbmcgb3IgdGhlIGJ1ZmZlciBoYW5kbGUgaXMgaW52YWxpZABWQUxJREFURV9BQk5EX0VYUEVDVEVEX0lNQUdFX0JJTkRJTkc6IHNnX2FwcGx5X2JpbmRpbmdzOiBpbWFnZSBiaW5kaW5nIGlzIG1pc3Npbmcgb3IgdGhlIGltYWdlIGhhbmRsZSBpcyBpbnZhbGlkAFZBTElEQVRFX1BJUEVMSU5FREVTQ19TSEFERVI6IHNnX3BpcGVsaW5lX2Rlc2Muc2hhZGVyIG1pc3Npbmcgb3IgaW52YWxpZAAhX3NnLmN1cl9wYXNzLnZhbGlkAF9zYXBwLnZhbGlkAF9zZy5nbC52YWxpZABfc2cudmFsaWQAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0lNQUdFOiBwYXNzIGF0dGFjaG1lbnQgaW1hZ2UgaXMgbm90IHZhbGlkAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19ERVBUSF9JTUFHRTogcGFzcyBkZXB0aCBhdHRhY2htZW50IGltYWdlIGlzIG5vdCB2YWxpZABWQUxJREFURV9CRUdJTlBBU1NfQ09MT1JfQVRUQUNITUVOVF9JTUFHRTogc2dfYmVnaW5fcGFzczogb25lIG9yIG1vcmUgY29sb3IgYXR0YWNobWVudCBpbWFnZXMgYXJlIG5vdCB2YWxpZABWQUxJREFURV9CRUdJTlBBU1NfREVQVEhTVEVOQ0lMX0FUVEFDSE1FTlRfSU1BR0U6IHNnX2JlZ2luX3Bhc3M6IG9uZSBvciBtb3JlIGRlcHRoLXN0ZW5jaWwgYXR0YWNobWVudCBpbWFnZXMgYXJlIG5vdCB2YWxpZABWQUxJREFURV9CRUdJTlBBU1NfUkVTT0xWRV9BVFRBQ0hNRU5UX0lNQUdFOiBzZ19iZWdpbl9wYXNzOiBvbmUgb3IgbW9yZSByZXNvbHZlIGF0dGFjaG1lbnQgaW1hZ2VzIGFyZSBub3QgdmFsaWQAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX1JFU09MVkVfSU1BR0U6IHBhc3MgcmVzb2x2ZSBhdHRhY2htZW50IGltYWdlIG5vdCB2YWxpZABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0VYUEVDVF9DT0xPUkZPUk1BVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4uY29sb3JfZm9ybWF0IHRvIGJlIHZhbGlkAGRlc2MtPnNoYWRlci5pZCA9PSBzaGQtPnNsb3QuaWQAYXR0cy0+c2xvdC5pZCA9PSBfc2cuY3VyX3Bhc3MuYXR0c19pZC5pZABibmQtPnBpcC0+c2hhZGVyLT5zbG90LmlkID09IGJuZC0+cGlwLT5jbW4uc2hhZGVyX2lkLmlkAHNoZABWQUxJREFURV9CRUdJTlBBU1NfQ0FOQVJZOiBzZ19iZWdpbl9wYXNzOiBwYXNzIHN0cnVjdCBub3QgaW5pdGlhbGl6ZWQAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0NBTkFSWTogc2dfYXR0YWNobWVudHNfZGVzYyBub3QgaW5pdGlhbGl6ZWQAVkFMSURBVEVfU0FNUExFUkRFU0NfQ0FOQVJZOiBzZ19zYW1wbGVyX2Rlc2Mgbm90IGluaXRpYWxpemVkAFZBTElEQVRFX0JVRkZFUkRFU0NfQ0FOQVJZOiBzZ19idWZmZXJfZGVzYyBub3QgaW5pdGlhbGl6ZWQAVkFMSURBVEVfU0hBREVSREVTQ19DQU5BUlk6IHNnX3NoYWRlcl9kZXNjIG5vdCBpbml0aWFsaXplZABWQUxJREFURV9QSVBFTElORURFU0NfQ0FOQVJZOiBzZ19waXBlbGluZV9kZXNjIG5vdCBpbml0aWFsaXplZABWQUxJREFURV9JTUFHRURFU0NfQ0FOQVJZOiBzZ19pbWFnZV9kZXNjIG5vdCBpbml0aWFsaXplZABBTkRST0lEX05BVElWRV9BQ1RJVklUWV9PTk5BVElWRVdJTkRPV0RFU1RST1lFRDogTmF0aXZlQWN0aXZpdHkgb25OYXRpdmVXaW5kb3dEZXN0cm95ZWQAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfT05JTlBVVFFVRVVFREVTVFJPWUVEOiBOYXRpdmVBY3Rpdml0eSBvbklucHV0UXVldWVEZXN0cm95ZWQAQU5EUk9JRF9VTktOT1dOX01TRzogdW5rbm93biBtc2cgdHlwZSByZWNlaXZlZABQQVNTX1BPT0xfRVhIQVVTVEVEOiBwYXNzIHBvb2wgZXhoYXVzdGVkAFNBTVBMRVJfUE9PTF9FWEhBVVNURUQ6IHNhbXBsZXIgcG9vbCBleGhhdXN0ZWQAQlVGRkVSX1BPT0xfRVhIQVVTVEVEOiBidWZmZXIgcG9vbCBleGhhdXN0ZWQAU0hBREVSX1BPT0xfRVhIQVVTVEVEOiBzaGFkZXIgcG9vbCBleGhhdXN0ZWQAUElQRUxJTkVfUE9PTF9FWEhBVVNURUQ6IHBpcGVsaW5lIHBvb2wgZXhoYXVzdGVkAElNQUdFX1BPT0xfRVhIQVVTVEVEOiBpbWFnZSBwb29sIGV4aGF1c3RlZABBTkRST0lEX0xPT1BfVEhSRUFEX1NUQVJURUQ6IGxvb3AgdGhyZWFkIHN0YXJ0ZWQAVkFMSURBVEVfQUJORF9FWFBFQ1RFRF9ERVBUSF9JTUFHRTogc2dfYXBwbHlfYmluZGluZ3M6IGRlcHRoIGltYWdlIGV4cGVjdGVkAFZBTElEQVRFX0FCTkRfRVhQRUNURURfRklMVEVSQUJMRV9JTUFHRTogc2dfYXBwbHlfYmluZGluZ3M6IGZpbHRlcmFibGUgaW1hZ2UgZXhwZWN0ZWQAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfQ1JFQVRFX1NVQ0NFU1M6IE5hdGl2ZUFjdGl2aXR5IHN1Y2Nlc3NmdWxseSBjcmVhdGVkAEFORFJPSURfTkFUSVZFX0FDVElWSVRZX09OTkFUSVZFV0lORE9XQ1JFQVRFRDogTmF0aXZlQWN0aXZpdHkgb25OYXRpdmVXaW5kb3dDcmVhdGVkAEFORFJPSURfTkFUSVZFX0FDVElWSVRZX09OSU5QVVRRVUVVRUNSRUFURUQ6IE5hdGl2ZUFjdGl2aXR5IG9uSW5wdXRRdWV1ZUNyZWF0ZWQAV0lOMzJfV0dMX0FSQl9DUkVBVEVfQ09OVEVYVF9SRVFVSVJFRDogQVJCX2NyZWF0ZV9jb250ZXh0IHJlcXVpcmVkAFdJTjMyX1dHTF9BUkJfQ1JFQVRFX0NPTlRFWFRfUFJPRklMRV9SRVFVSVJFRDogQVJCX2NyZWF0ZV9jb250ZXh0X3Byb2ZpbGUgcmVxdWlyZWQAVkFMSURBVEVfU0hBREVSREVTQ19TT1VSQ0VfT1JfQllURUNPREU6IHNoYWRlciBzb3VyY2Ugb3IgYnl0ZSBjb2RlIHJlcXVpcmVkAFZBTElEQVRFX1NIQURFUkRFU0NfQllURUNPREU6IHNoYWRlciBieXRlIGNvZGUgcmVxdWlyZWQAVkFMSURBVEVfU0hBREVSREVTQ19TT1VSQ0U6IHNoYWRlciBzb3VyY2UgY29kZSByZXF1aXJlZABWQUxJREFURV9TSEFERVJERVNDX05PX0JZVEVDT0RFX1NJWkU6IHNoYWRlciBieXRlIGNvZGUgbGVuZ3RoIChpbiBieXRlcykgcmVxdWlyZWQAVFJBQ0VfSE9PS1NfTk9UX0VOQUJMRUQ6IHNnX2luc3RhbGxfdHJhY2VfaG9va3MoKSBjYWxsZWQsIGJ1dCBTT0tPTF9UUkFDRV9IT09LUyBpcyBub3QgZGVmaW5lZABWQUxJREFURV9JTUFHRURFU0NfTVNBQV9CVVRfTk9fUlQ6IG5vbi1yZW5kZXItdGFyZ2V0IGltYWdlcyBjYW5ub3QgYmUgbXVsdGlzYW1wbGVkAFZBTElEQVRJT05fRkFJTEVEOiB2YWxpZGF0aW9uIGxheWVyIGNoZWNrcyBmYWlsZWQAV0dQVV9DUkVBVEVCSU5ER1JPVVBfRkFJTEVEOiB3Z3B1RGV2aWNlQ3JlYXRlQmluZEdyb3VwIGZhaWxlZABNQUxMT0NfRkFJTEVEOiBtZW1vcnkgYWxsb2NhdGlvbiBmYWlsZWQATElOVVhfR0xYX0dFVF9WSVNVQUxfRlJPTV9GQkNPTkZJR19GQUlMRUQ6IGdsWEdldFZpc3VhbEZyb21GQkNvbmZpZyBmYWlsZWQAV0dQVV9TSEFERVJfQ1JFQVRFX0JJTkRHUk9VUF9MQVlPVVRfRkFJTEVEOiB3Z3B1RGV2aWNlQ3JlYXRlQmluZEdyb3VwTGF5b3V0KCkgZm9yIHNoYWRlciBzdGFnZSBmYWlsZWQATElOVVhfRUdMX05PX05BVElWRV9WSVNVQUw6IGVnbEdldENvbmZpZ0F0dHJpYigpIGZvciBFR0xfTkFUSVZFX1ZJU1VBTF9JRCBmYWlsZWQATElOVVhfRUdMX0JJTkRfT1BFTkdMX0VTX0FQSV9GQUlMRUQ6IGVnbEJpbmRBUEkoRUdMX09QRU5HTF9FU19BUEkpIGZhaWxlZABMSU5VWF9FR0xfQklORF9PUEVOR0xfQVBJX0ZBSUxFRDogZWdsQmluZEFQSShFR0xfT1BFTkdMX0FQSSkgZmFpbGVkAExJTlVYX0VHTF9HRVRfRElTUExBWV9GQUlMRUQ6IGVnbEdldERpc3BsYXkoKSBmYWlsZWQATElOVVhfWDExX09QRU5fRElTUExBWV9GQUlMRUQ6IFhPcGVuRGlzcGxheSgpIGZhaWxlZABMSU5VWF9HTFhfQ1JFQVRFX1dJTkRPV19GQUlMRUQ6IGdsWENyZWF0ZVdpbmRvdygpIGZhaWxlZABMSU5VWF9YMTFfQ1JFQVRFX1dJTkRPV19GQUlMRUQ6IFhDcmVhdGVXaW5kb3coKSBmYWlsZWQAV0dQVV9DUkVBVEVfVEVYVFVSRV9WSUVXX0ZBSUxFRDogd2dwdVRleHR1cmVDcmVhdGVWaWV3KCkgZmFpbGVkAExJTlVYX0VHTF9DUkVBVEVfQ09OVEVYVF9GQUlMRUQ6IGVnbENyZWF0ZUNvbnRleHQoKSBmYWlsZWQAV0dQVV9DUkVBVEVfUElQRUxJTkVfTEFZT1VUX0ZBSUxFRDogd2dwdURldmljZUNyZWF0ZVBpcGVsaW5lTGF5b3V0KCkgZmFpbGVkAExJTlVYX0VHTF9NQUtFX0NVUlJFTlRfRkFJTEVEOiBlZ2xNYWtlQ3VycmVudCgpIGZhaWxlZABXR1BVX0NSRUFURV9TQU1QTEVSX0ZBSUxFRDogd2dwdURldmljZUNyZWF0ZVNhbXBsZXIoKSBmYWlsZWQAV0dQVV9DUkVBVEVfQlVGRkVSX0ZBSUxFRDogd2dwdURldmljZUNyZWF0ZUJ1ZmZlcigpIGZhaWxlZABMSU5VWF9FR0xfR0VUX1ZJU1VBTF9JTkZPX0ZBSUxFRDogWEdldFZpc3VhbEluZm8oKSBmYWlsZWQATElOVVhfRUdMX0lOSVRJQUxJWkVfRkFJTEVEOiBlZ2xJbml0aWFsaXplKCkgZmFpbGVkAFdHUFVfQ1JFQVRFX1RFWFRVUkVfRkFJTEVEOiB3Z3B1RGV2aWNlQ3JlYXRlVGV4dHVyZSgpIGZhaWxlZABXR1BVX0NSRUFURV9SRU5ERVJfUElQRUxJTkVfRkFJTEVEOiB3Z3B1RGV2aWNlQ3JlYXRlUmVuZGVyUGlwZWxpbmUoKSBmYWlsZWQAV0dQVV9DUkVBVEVfU0hBREVSX01PRFVMRV9GQUlMRUQ6IHdncHVEZXZpY2VDcmVhdGVTaGFkZXJNb2R1bGUoKSBmYWlsZWQATElOVVhfRUdMX0NSRUFURV9XSU5ET1dfU1VSRkFDRV9GQUlMRUQ6IGVnbENyZWF0ZVdpbmRvd1N1cmZhY2UoKSBmYWlsZWQAV0lOMzJfR0VUX1JBV19JTlBVVF9EQVRBX0ZBSUxFRDogR2V0UmF3SW5wdXREYXRhKCkgZmFpbGVkAF9zYXBwX2Vtc2Nfc2l6ZV9jaGFuZ2VkAEFORFJPSURfTkFUSVZFX0FDVElWSVRZX09OV0lORE9XRk9DVVNDSEFOR0VEOiBOYXRpdmVBY3Rpdml0eSBvbldpbmRvd0ZvY3VzQ2hhbmdlZABBTkRST0lEX05BVElWRV9BQ1RJVklUWV9PTkNPTkZJR1VSQVRJT05DSEFOR0VEOiBOYXRpdmVBY3Rpdml0eSBvbkNvbmZpZ3VyYXRpb25DaGFuZ2VkAFZBTElEQVRFX0FCTkRfSUI6IHNnX2FwcGx5X2JpbmRpbmdzOiBwaXBlbGluZSBvYmplY3QgZGVmaW5lcyBub24taW5kZXhlZCByZW5kZXJpbmcsIGJ1dCBpbmRleCBidWZmZXIgcHJvdmlkZWQAVkFMSURBVEVfQUJORF9OT19JQjogc2dfYXBwbHlfYmluZGluZ3M6IHBpcGVsaW5lIG9iamVjdCBkZWZpbmVzIGluZGV4ZWQgcmVuZGVyaW5nLCBidXQgbm8gaW5kZXggYnVmZmVyIHByb3ZpZGVkAFZBTElEQVRFX0FQSVBfUElQRUxJTkVfVkFMSURfSUQ6IHNnX2FwcGx5X3BpcGVsaW5lOiBpbnZhbGlkIHBpcGVsaW5lIGlkIHByb3ZpZGVkAE51bXBhZEFkZABfY29tcHJlc3NlZF90ZXh0dXJlX2FzdGMAX3RleHR1cmVfY29tcHJlc3Npb25fcHZydGMAV0VCS0lUX1dFQkdMX2NvbXByZXNzZWRfdGV4dHVyZV9wdnJ0YwBfdGV4dHVyZV9jb21wcmVzc2lvbl9icHRjAF90ZXh0dXJlX2NvbXByZXNzaW9uX3JndGMAX2NvbXByZXNzZWRfdGV4dHVyZV9ldGMAX3RleHR1cmVfY29tcHJlc3Npb25fczN0YwBfY29tcHJlc3NlZF90ZXh0dXJlX3MzdGMAX3NnX3ZhbGlkYXRlX2J1ZmZlcl9kZXNjAF9zZ192YWxpZGF0ZV9zaGFkZXJfZGVzYwBfc2FwcF92YWxpZGF0ZV9pY29uX2Rlc2MAX3NnX3ZhbGlkYXRlX3BpcGVsaW5lX2Rlc2MAVkFMSURBVEVfQUJORF9JTUFHRV9UWVBFX01JU01BVENIOiBzZ19hcHBseV9iaW5kaW5nczogdHlwZSBvZiBib3VuZCBpbWFnZSBkb2Vzbid0IG1hdGNoIHNoYWRlciBkZXNjAGJ1ZiAmJiBkZXNjAHBpcCAmJiBzaGQgJiYgZGVzYwBzcmMAX3NhcHBfbWFsbG9jAF9zZ19tYWxsb2MAX3NnX3Nsb3RfYWxsb2MAX3NnX2dsX2NvbXBhcmVfZnVuYwBfdGV4dHVyZV9maWx0ZXJfYW5pc290cm9waWMAcGFuaWMAdmIAYXR0cy0+Z2wuZmIAVGFiAFZBTElEQVRFX0JVRkZFUkRFU0NfTk9fREFUQTogZHluYW1pYy9zdHJlYW0gdXNhZ2UgYnVmZmVycyBjYW5ub3QgYmUgaW5pdGlhbGl6ZWQgd2l0aCBkYXRhAFZBTElEQVRFX0lNQUdFREVTQ19JTkpFQ1RFRF9OT19EQVRBOiBpbWFnZXMgd2l0aCBpbmplY3RlZCB0ZXh0dXJlcyBjYW5ub3QgYmUgaW5pdGlhbGl6ZWQgd2l0aCBkYXRhAFZBTElEQVRFX0lNQUdFREVTQ19SVF9OT19EQVRBOiByZW5kZXIgdGFyZ2V0IGltYWdlcyBjYW5ub3QgYmUgaW5pdGlhbGl6ZWQgd2l0aCBkYXRhAFZBTElEQVRFX0lNQUdFREVTQ19EWU5BTUlDX05PX0RBVEE6IGR5bmFtaWMvc3RyZWFtIGltYWdlcyBjYW5ub3QgYmUgaW5pdGlhbGl6ZWQgd2l0aCBkYXRhAENvbW1hAGRlc2MtPmdsX2J1ZmZlcnNbc2xvdF0AWwBLZXlaAEtleVkAQU5EUk9JRF9NU0dfREVTVFJPWTogTVNHX0RFU1RST1kAS2V5WABLZXlXAEFORFJPSURfTVNHX1NFVF9OQVRJVkVfV0lORE9XOiBNU0dfU0VUX05BVElWRV9XSU5ET1cAS2V5VgBLZXlVAEtleVQAS2V5UwBBTkRST0lEX01TR19OT19GT0NVUzogTVNHX05PX0ZPQ1VTAEFORFJPSURfTVNHX0ZPQ1VTOiBNU0dfRk9DVVMAaW1nX3NtcC0+c2FtcGxlcl9zbG90IDwgU0dfTUFYX1NBTVBMRVJfQklORFNMT1RTAGFfc3RhdGUtPmJ1ZmZlcl9pbmRleCA8IFNHX01BWF9WRVJURVhCVUZGRVJfQklORFNMT1RTAGF0dHItPnZiX2luZGV4IDwgU0dfTUFYX1ZFUlRFWEJVRkZFUl9CSU5EU0xPVFMAaW1nX3NtcC0+aW1hZ2Vfc2xvdCA8IFNHX01BWF9JTUFHRV9CSU5EU0xPVFMAX3NnLmxpbWl0cy5tYXhfdmVydGV4X2F0dHJzIDw9IFNHX01BWF9WRVJURVhfQVRUUklCVVRFUwBudW1faW1hZ2VzIDw9IFNBUFBfTUFYX0lDT05JTUFHRVMAS2V5UgBWQUxJREFURV9BQk5EX1VORVhQRUNURURfU0FNUExFUl9DT01QQVJFX05FVkVSOiBzZ19hcHBseV9iaW5kaW5nczogc2hhZGVyIGV4cGVjdHMgU0dfU0FNUExFUlRZUEVfQ09NUEFSSVNPTiBidXQgc2FtcGxlciBoYXMgU0dfQ09NUEFSRUZVTkNfTkVWRVIAVkFMSURBVEVfQUJORF9FWFBFQ1RFRF9TQU1QTEVSX0NPTVBBUkVfTkVWRVI6IHNnX2FwcGx5X2JpbmRpbmdzOiBzaGFkZXIgZXhwZWN0cyBTR19TQU1QTEVSVFlQRV9GSUxURVJJTkcgb3IgU0dfU0FNUExFUlRZUEVfTk9ORklMVEVSSU5HIGJ1dCBzYW1wbGVyIGRvZXNuJ3QgaGF2ZSBTR19DT01QQVJFRlVOQ19ORVZFUgBWQUxJREFURV9BQk5EX1ZCX1RZUEU6IHNnX2FwcGx5X2JpbmRpbmdzOiBidWZmZXIgaW4gdmVydGV4IGJ1ZmZlciBzbG90IGlzIG5vdCBhIFNHX0JVRkZFUlRZUEVfVkVSVEVYQlVGRkVSAFZBTElEQVRFX0FCTkRfSUJfVFlQRTogc2dfYXBwbHlfYmluZGluZ3M6IGJ1ZmZlciBpbiBpbmRleCBidWZmZXIgc2xvdCBpcyBub3QgYSBTR19CVUZGRVJUWVBFX0lOREVYQlVGRkVSAFZBTElEQVRFX1NBTVBMRVJERVNDX0FOSVNUUk9QSUNfUkVRVUlSRVNfTElORUFSX0ZJTFRFUklORzogc2dfc2FtcGxlcl9kZXNjLm1heF9hbmlzb3Ryb3B5ID4gMSByZXF1aXJlcyBtaW4vbWFnL21pcG1hcF9maWx0ZXIgdG8gYmUgU0dfRklMVEVSX0xJTkVBUgBLZXlRAEtleVAAS2V5TwBLZXlOAEtleU0AS2V5TABMSU5VWF9HTFhfTE9BRF9MSUJHTF9GQUlMRUQ6IGZhaWxlZCB0byBsb2FkIGxpYkdMAHNsb3QtPnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfSU5JVElBTABLZXlLAEtleUoAS2V5SQBLZXlIAEtleUcAS2V5RgBLZXlFAEFORFJPSURfTVNHX1NFVF9JTlBVVF9RVUVVRTogTVNHX1NFVF9JTlBVVF9RVUVVRQBBTkRST0lEX01TR19DUkVBVEU6IE1TR19DUkVBVEUAQU5EUk9JRF9NU0dfUEFVU0U6IE1TR19QQVVTRQBwYXNzX2RlZi5zd2FwY2hhaW4uY29sb3JfZm9ybWF0ID4gU0dfUElYRUxGT1JNQVRfTk9ORQBBTkRST0lEX01TR19SRVNVTUU6IE1TR19SRVNVTUUAVkFMSURBVEVfSU1BR0VERVNDX1JUX0lNTVVUQUJMRTogcmVuZGVyIHRhcmdldCBpbWFnZXMgbXVzdCBiZSBTR19VU0FHRV9JTU1VVEFCTEUAS2V5RABzbG90LT5pZCA9PSBTR19JTlZBTElEX0lEAGJpbmRpbmdzLT5zYW1wbGVyc1tpXS5pZCAhPSBTR19JTlZBTElEX0lEAGJpbmRpbmdzLT52ZXJ0ZXhfYnVmZmVyc1tpXS5pZCAhPSBTR19JTlZBTElEX0lEAGJpbmRpbmdzLT5zdG9yYWdlX2J1ZmZlcnNbaV0uaWQgIT0gU0dfSU5WQUxJRF9JRABiaW5kaW5ncy0+aW1hZ2VzW2ldLmlkICE9IFNHX0lOVkFMSURfSUQAVkFMSURBVEVfQkVHSU5QQVNTX0FUVEFDSE1FTlRTX1ZBTElEOiBzZ19iZWdpbl9wYXNzOiBhdHRhY2htZW50cyBvYmplY3Qgbm90IGluIHJlc291cmNlIHN0YXRlIFZBTElEAEtleUMAV0lOMzJfSEVMUEVSX1dJTkRPV19HRVREQ19GQUlMRUQ6IGZhaWxlZCB0byBnZXQgaGVscGVyIHdpbmRvdyBEQwBLZXlCAExJTlVYX0dMWF9DUkVBVEVfQ09OVEVYVF9GQUlMRUQ6IEZhaWxlZCB0byBjcmVhdGUgR0wgY29udGV4dCB2aWEgZ2xYQ3JlYXRlQ29udGV4dEF0dHJpYnNBUkIAV0lOMzJfV0dMX0lOQ09NUEFUSUJMRV9ERVZJQ0VfQ09OVEVYVDogQ3JlYXRlQ29udGV4dEF0dHJpYnNBUkIgZmFpbGVkIHdpdGggRVJST1JfSU5DT01QQVRJQkxFX0RFVklDRV9DT05URVhUU19BUkIAS2V5QQA8ZmA8BmY8AFtsaW5lOgBbaWQ6AERpZ2l0OQBOdW1wYWQ5AEY5AERpZ2l0OABOdW1wYWQ4AEY4AHNsb3QgPCAxMjgARGlnaXQ3AE51bXBhZDcARjcARGlnaXQ2AE51bXBhZDYARjYARGlnaXQ1AE51bXBhZDUARjUARGlnaXQ0AE51bXBhZDQARjQAc2xvdCA8IDY0AFZBTElEQVRFX1BJUEVMSU5FREVTQ19MQVlPVVRfU1RSSURFNDogc2dfcGlwZWxpbmVfZGVzYy5sYXlvdXQuYnVmZmVyc1tdLnN0cmlkZSBtdXN0IGJlIG11bHRpcGxlIG9mIDQAVkFMSURBVEVfQlVGRkVSREVTQ19TVE9SQUdFQlVGRkVSX1NJWkVfTVVMVElQTEVfNDogc2l6ZSBvZiBzdG9yYWdlIGJ1ZmZlcnMgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQARGlnaXQzAE51bXBhZDMARjMARGlnaXQyAE51bXBhZDIARjIAX3NnX2FsaWduX3UzMgBGMTIARGlnaXQxAE51bXBhZDEARjEAVkFMSURBVEVfQUJORF9JTUFHRV9NU0FBOiBzZ19hcHBseV9iaW5kaW5nczogY2Fubm90IGJpbmQgaW1hZ2Ugd2l0aCBzYW1wbGVfY291bnQ+MQBGMTEAZ2xfYXR0ci0+dmJfaW5kZXggPT0gLTEAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX1JFU09MVkVfU0FNUExFX0NPVU5UOiBwYXNzIHJlc29sdmUgYXR0YWNobWVudCBpbWFnZSBzYW1wbGUgY291bnQgbXVzdCBiZSAxAFZBTElEQVRFX0lNQUdFREVTQ19NU0FBXzNEX0lNQUdFOiAzRCBpbWFnZXMgY2Fubm90IGhhdmUgYSBzYW1wbGVfY291bnQgPiAxAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19SRVNPTFZFX0NPTE9SX0lNQUdFX01TQUE6IHBhc3MgcmVzb2x2ZSBhdHRhY2htZW50cyBtdXN0IGhhdmUgYSBjb2xvciBhdHRhY2htZW50IGltYWdlIHdpdGggc2FtcGxlIGNvdW50ID4gMQBWQUxJREFURV9TSEFERVJERVNDX1VCX0FSUkFZX0NPVU5UOiB1bmlmb3JtIGFycmF5IGNvdW50IG11c3QgYmUgPj0gMQBWQUxJREFURV9JTUFHRURFU0NfTVNBQV9OVU1fTUlQTUFQUzogTVNBQSBpbWFnZXMgbXVzdCBoYXZlIG51bV9taXBtYXBzID09IDEARGlnaXQwAGNvbG9yMABOdW1wYWQwAEYxMABMSU5VWF9YMTFfUVVFUllfU1lTVEVNX0RQSV9GQUlMRUQ6IGZhaWxlZCB0byBxdWVyeSBzeXN0ZW0gZHBpIHZhbHVlLCBhc3N1bWluZyBkZWZhdWx0IDk2LjAAVkFMSURBVEVfQlVGRkVSREVTQ19TSVpFOiBzZ19idWZmZXJfZGVzYy5zaXplIGFuZCAuZGF0YS5zaXplIGNhbm5vdCBib3RoIGJlIDAAYXJyYXlfY291bnQgPiAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRVhQRUNUX1NBTVBMRUNPVU5UOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5zYW1wbGVfY291bnQgPiAwAHBhc3NfZGVmLnN3YXBjaGFpbi5zYW1wbGVfY291bnQgPiAwAGRlc2MtPmhlaWdodCA+IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9FWFBFQ1RfSEVJR0hUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5oZWlnaHQgPiAwAHBhc3NfZGVmLnN3YXBjaGFpbi5oZWlnaHQgPiAwAGRlc2MtPm1heF9jb21taXRfbGlzdGVuZXJzID4gMAB0LT5udW0gPiAwAGRlc2MtPndpZHRoID4gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0VYUEVDVF9XSURUSDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ud2lkdGggPiAwAHBhc3NfZGVmLnN3YXBjaGFpbi53aWR0aCA+IDAAdWJfZGVzYy0+c2l6ZSA+IDAAZGVzYy0+cGl4ZWxzLnNpemUgPiAwAGxfc3RhdGUtPnN0cmlkZSA+IDAAVkFMSURBVEVfSU1BR0VERVNDX0hFSUdIVDogc2dfaW1hZ2VfZGVzYy5oZWlnaHQgbXVzdCBiZSA+IDAAVkFMSURBVEVfSU1BR0VERVNDX1dJRFRIOiBzZ19pbWFnZV9kZXNjLndpZHRoIG11c3QgYmUgPiAwAGRlc2MtPnNhbXBsZV9jb3VudCA+PSAwAGJhc2VfZWxlbWVudCA+PSAwAGRlc2MtPmhlaWdodCA+PSAwAG51bV9lbGVtZW50cyA+PSAwAGRlc2MtPm1heF9kcm9wcGVkX2ZpbGVzID49IDAAbnVtX2luc3RhbmNlcyA+PSAwAGRlc2MtPnN3YXBfaW50ZXJ2YWwgPj0gMABkZXNjLT5tYXhfZHJvcHBlZF9maWxlX3BhdGhfbGVuZ3RoID49IDAAZGVzYy0+d2lkdGggPj0gMABkZXNjLT5jbGlwYm9hcmRfc2l6ZSA+PSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fV0dQVV9FWFBFQ1RfUkVOREVSVklFV19OT1RTRVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLndncHUucmVuZGVyX3ZpZXcgPT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0QzRDExX0VYUEVDVF9SRU5ERVJWSUVXX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4uZDNkMTEucmVuZGVyX3ZpZXcgPT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX1dHUFVfRVhQRUNUX0RFUFRIU1RFTkNJTFZJRVdfTk9UU0VUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi53Z3B1LmRlcHRoX3N0ZW5jaWxfdmlldyA9PSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRDNEMTFfRVhQRUNUX0RFUFRIU1RFTkNJTFZJRVdfTk9UU0VUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5kM2QxMS5kZXB0aF9zdGVuY2lsX3ZpZXcgPT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX1dHUFVfRVhQRUNUX1JFU09MVkVWSUVXX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ud2dwdS5yZXNvbHZlX3ZpZXcgPT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0QzRDExX0VYUEVDVF9SRVNPTFZFVklFV19OT1RTRVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLmQzZDExLnJlc29sdmVfdmlldyA9PSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRVhQRUNUX1NBTVBMRUNPVU5UX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4uc2FtcGxlX2NvdW50ID09IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9FWFBFQ1RfSEVJR0hUX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4uaGVpZ2h0ID09IDAAX3NnLmN1cl9wYXNzLmF0dHMgPT0gMAB1Yi0+bnVtX3VuaWZvcm1zID09IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9HTF9FWFBFQ1RfRlJBTUVCVUZGRVJfTk9UU0VUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5nbC5mcmFtZWJ1ZmZlciA9PSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRVhQRUNUX1dJRFRIX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ud2lkdGggPT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX01FVEFMX0VYUEVDVF9NU0FBQ09MT1JURVhUVVJFX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ubWV0YWwubXNhYV9jb2xvcl90ZXh0dXJlID09IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9NRVRBTF9FWFBFQ1RfREVQVEhTVEVOQ0lMVEVYVFVSRV9OT1RTRVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLm1ldGFsLmRlcHRoX3N0ZW5jaWxfdGV4dHVyZSA9PSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fTUVUQUxfRVhQRUNUX0NVUlJFTlREUkFXQUJMRV9OT1RTRVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLm1ldGFsLmN1cnJlbnRfZHJhd2FibGUgPT0gMAAoZGltICUgOCkgPT0gMABnbEdldEVycm9yKCkgPT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX1dHUFVfRVhQRUNUX1JFTkRFUlZJRVc6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLndncHUucmVuZGVyX3ZpZXcgIT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0QzRDExX0VYUEVDVF9SRU5ERVJWSUVXOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5kM2QxMS5yZW5kZXJfdmlldyAhPSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fV0dQVV9FWFBFQ1RfREVQVEhTVEVOQ0lMVklFVzogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ud2dwdS5kZXB0aF9zdGVuY2lsX3ZpZXcgIT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0QzRDExX0VYUEVDVF9ERVBUSFNURU5DSUxWSUVXOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5kM2QxMS5kZXB0aF9zdGVuY2lsX3ZpZXcgIT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX1dHUFVfRVhQRUNUX1JFU09MVkVWSUVXOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi53Z3B1LnJlc29sdmVfdmlldyAhPSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRDNEMTFfRVhQRUNUX1JFU09MVkVWSUVXOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5kM2QxMS5yZXNvbHZlX3ZpZXcgIT0gMABkZXNjLT5waXhlbHMucHRyICE9IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9NRVRBTF9FWFBFQ1RfTVNBQUNPTE9SVEVYVFVSRTogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ubWV0YWwubXNhYV9jb2xvcl90ZXh0dXJlICE9IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9NRVRBTF9FWFBFQ1RfREVQVEhTVEVOQ0lMVEVYVFVSRTogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ubWV0YWwuZGVwdGhfc3RlbmNpbF90ZXh0dXJlICE9IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9NRVRBTF9FWFBFQ1RfQ1VSUkVOVERSQVdBQkxFOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5tZXRhbC5jdXJyZW50X2RyYXdhYmxlICE9IDAAV0lOMzJfRDNEMTFfQ1JFQVRFX0RFVklDRV9BTkRfU1dBUENIQUlOX1dJVEhfREVCVUdfRkFJTEVEOiBEM0QxMUNyZWF0ZURldmljZUFuZFN3YXBDaGFpbigpIHdpdGggRDNEMTFfQ1JFQVRFX0RFVklDRV9ERUJVRyBmYWlsZWQsIHJldHJ5aW5nIHdpdGhvdXQgZGVidWcgZmxhZy4AVkFMSURBVEVfU0hBREVSREVTQ19TVE9SQUdFQlVGRkVSX1JFQURPTkxZOiBzaGFkZXIgc3RhZ2Ugc3RvcmFnZSBidWZmZXJzIG11c3QgYmUgcmVhZG9ubHkgKHNnX3NoYWRlcl9kZXNjLnN0b3JhZ2VfYnVmZmVyc1tdLnJlYWRvbmx5KQBXR1BVX0JJTkRHUk9VUFNDQUNIRV9TSVpFX1BPVzI6IHNnX2Rlc2Mud2dwdV9iaW5kZ3JvdXBzX2NhY2hlX3NpemUgbXVzdCBiZSBhIHBvd2VyIG9mIDIgKHdncHUpAFdHUFVfQklOREdST1VQU0NBQ0hFX1NJWkVfR1JFQVRFUl9PTkU6IHNnX2Rlc2Mud2dwdV9iaW5kZ3JvdXBzX2NhY2hlX3NpemUgbXVzdCBiZSA+IDEgKHdncHUpAFdHUFVfQklOREdST1VQU19QT09MX0VYSEFVU1RFRDogYmluZGdyb3VwcyBwb29sIGV4aGF1c3RlZCAoaW5jcmVhc2Ugc2dfZGVzYy5iaW5kZ3JvdXBzX2NhY2hlX3NpemUpICh3Z3B1KQBWQUxJREFURV9TSEFERVJERVNDX1NBTVBMRVJfTk9UX1JFRkVSRU5DRURfQllfSU1BR0VfU0FNUExFUl9QQUlSUzogb25lIG9yIG1vcmUgc2FtcGxlcnMgYXJlIG5vdCByZWZlcmVuY2VkIGJ5IGltYWdlLXNhbXBsZXItcGFpcnMgKHNnX3NoYWRlcl9kZXNjLmltYWdlX3NhbXBsZXJfcGFpcnNbXS5zYW1wbGVyX3Nsb3QpAFZBTElEQVRFX1NIQURFUkRFU0NfSU1BR0VfU0FNUExFUl9QQUlSX1NBTVBMRVJfU0xPVF9PVVRfT0ZfUkFOR0U6IGltYWdlLXNhbXBsZXItcGFpciBzYW1wbGVyIHNsb3QgaW5kZXggaXMgb3V0IG9mIHJhbmdlIChzZ19zaGFkZXJfZGVzYy5pbWFnZV9zYW1wbGVyX3BhaXJzW10uc2FtcGxlcl9zbG90KQBWQUxJREFURV9TSEFERVJERVNDX0lNQUdFX05PVF9SRUZFUkVOQ0VEX0JZX0lNQUdFX1NBTVBMRVJfUEFJUlM6IG9uZSBvciBtb3JlIGltYWdlcyBhcmUgbm90IHJlZmVyZW5jZWQgYnkgYnkgaW1hZ2Utc2FtcGxlci1wYWlycyAoc2dfc2hhZGVyX2Rlc2MuaW1hZ2Vfc2FtcGxlcl9wYWlyc1tdLmltYWdlX3Nsb3QpAFZBTElEQVRFX1NIQURFUkRFU0NfSU1BR0VfU0FNUExFUl9QQUlSX0lNQUdFX1NMT1RfT1VUX09GX1JBTkdFOiBpbWFnZS1zYW1wbGVyLXBhaXIgaW1hZ2Ugc2xvdCBpbmRleCBpcyBvdXQgb2YgcmFuZ2UgKHNnX3NoYWRlcl9kZXNjLmltYWdlX3NhbXBsZXJfcGFpcnNbXS5pbWFnZV9zbG90KQAoMHg4ODkyID09IHRhcmdldCkgfHwgKDB4ODg5MyA9PSB0YXJnZXQpIHx8ICgweDkwRDIgPT0gdGFyZ2V0KQBJTUFHRV9EQVRBX1NJWkVfTUlTTUFUQ0g6IGltYWdlIGRhdGEgc2l6ZSBtaXNtYXRjaCAobXVzdCBiZSB3aWR0aCpoZWlnaHQqNCBieXRlcykAKGluZGV4ID49IDApICYmIChpbmRleCA8PSBfc2FwcC5kcm9wLm1heF9maWxlcykAVHJpYW5nbGUgKHNva29sLWFwcCkAVkFMSURBVEVfSU1BR0VEQVRBX05PREFUQTogc2dfaW1hZ2VfZGF0YTogbm8gZGF0YSAoLnB0ciBhbmQvb3IgLnNpemUgaXMgemVybykAKGRlc2MtPmFsbG9jYXRvci5hbGxvY19mbiAmJiBkZXNjLT5hbGxvY2F0b3IuZnJlZV9mbikgfHwgKCFkZXNjLT5hbGxvY2F0b3IuYWxsb2NfZm4gJiYgIWRlc2MtPmFsbG9jYXRvci5mcmVlX2ZuKQBHTF9WRVJURVhfQVRUUklCVVRFX05PVF9GT1VORF9JTl9TSEFERVI6IHZlcnRleCBhdHRyaWJ1dGUgbm90IGZvdW5kIGluIHNoYWRlciAoZ2wpAEdMX0lNQUdFX1NBTVBMRVJfTkFNRV9OT1RfRk9VTkRfSU5fU0hBREVSOiBpbWFnZS1zYW1wbGVyIG5hbWUgbm90IGZvdW5kIGluIHNoYWRlciAoZ2wpAEdMX1RFWFRVUkVfRk9STUFUX05PVF9TVVBQT1JURUQ6IHBpeGVsIGZvcm1hdCBub3Qgc3VwcG9ydGVkIGZvciB0ZXh0dXJlIChnbCkAR0xfQVJSQVlfVEVYVFVSRVNfTk9UX1NVUFBPUlRFRDogYXJyYXkgdGV4dHVyZXMgbm90IHN1cHBvcnRlZCAoZ2wpAEdMXzNEX1RFWFRVUkVTX05PVF9TVVBQT1JURUQ6IDNkIHRleHR1cmVzIG5vdCBzdXBwb3J0ZWQgKGdsKQBHTF9TSEFERVJfQ09NUElMQVRJT05fRkFJTEVEOiBzaGFkZXIgY29tcGlsYXRpb24gZmFpbGVkIChnbCkAR0xfU0hBREVSX0xJTktJTkdfRkFJTEVEOiBzaGFkZXIgbGlua2luZyBmYWlsZWQgKGdsKQBHTF9GUkFNRUJVRkZFUl9TVEFUVVNfSU5DT01QTEVURV9NSVNTSU5HX0FUVEFDSE1FTlQ6IGZyYW1lYnVmZmVyIGNvbXBsZXRlbmVzcyBjaGVjayBmYWlsZWQgd2l0aCBHTF9GUkFNRUJVRkZFUl9JTkNPTVBMRVRFX01JU1NJTkdfQVRUQUNITUVOVCAoZ2wpAEdMX0ZSQU1FQlVGRkVSX1NUQVRVU19JTkNPTVBMRVRFX0FUVEFDSE1FTlQ6IGZyYW1lYnVmZmVyIGNvbXBsZXRlbmVzcyBjaGVjayBmYWlsZWQgd2l0aCBHTF9GUkFNRUJVRkZFUl9JTkNPTVBMRVRFX0FUVEFDSE1FTlQgKGdsKQBHTF9GUkFNRUJVRkZFUl9TVEFUVVNfSU5DT01QTEVURV9NVUxUSVNBTVBMRTogZnJhbWVidWZmZXIgY29tcGxldGVuZXNzIGNoZWNrIGZhaWxlZCB3aXRoIEdMX0ZSQU1FQlVGRkVSX0lOQ09NUExFVEVfTVVMVElTQU1QTEUgKGdsKQBHTF9GUkFNRUJVRkZFUl9TVEFUVVNfVU5TVVBQT1JURUQ6IGZyYW1lYnVmZmVyIGNvbXBsZXRlbmVzcyBjaGVjayBmYWlsZWQgd2l0aCBHTF9GUkFNRUJVRkZFUl9VTlNVUFBPUlRFRCAoZ2wpAEdMX0ZSQU1FQlVGRkVSX1NUQVRVU19VTkRFRklORUQ6IGZyYW1lYnVmZmVyIGNvbXBsZXRlbmVzcyBjaGVjayBmYWlsZWQgd2l0aCBHTF9GUkFNRUJVRkZFUl9VTkRFRklORUQgKGdsKQBHTF9GUkFNRUJVRkZFUl9TVEFUVVNfVU5LTk9XTjogZnJhbWVidWZmZXIgY29tcGxldGVuZXNzIGNoZWNrIGZhaWxlZCAodW5rbm93biByZWFzb24pIChnbCkATUVUQUxfQ1JFQVRFX1NBTVBMRVJfRkFJTEVEOiBmYWlsZWQgdG8gY3JlYXRlIHNhbXBsZXIgb2JqZWN0IChtZXRhbCkATUVUQUxfQ1JFQVRFX0JVRkZFUl9GQUlMRUQ6IGZhaWxlZCB0byBjcmVhdGUgYnVmZmVyIG9iamVjdCAobWV0YWwpAE1FVEFMX0NSRUFURV9URVhUVVJFX0ZBSUxFRDogZmFpbGVkIHRvIGNyZWF0ZSB0ZXh0dXJlIG9iamVjdCAobWV0YWwpAE1FVEFMX0NSRUFURV9EU1NfRkFJTEVEOiBmYWlsZWQgdG8gY3JlYXRlIGRlcHRoIHN0ZW5jaWwgc3RhdGUgKG1ldGFsKQBNRVRBTF9DUkVBVEVfUlBTX0ZBSUxFRDogZmFpbGVkIHRvIGNyZWF0ZSByZW5kZXIgcGlwZWxpbmUgc3RhdGUgKG1ldGFsKQBNRVRBTF9URVhUVVJFX0ZPUk1BVF9OT1RfU1VQUE9SVEVEOiBwaXhlbCBmb3JtYXQgbm90IHN1cHBvcnRlZCBmb3IgdGV4dHVyZSAobWV0YWwpAE1FVEFMX1NIQURFUl9FTlRSWV9OT1RfRk9VTkQ6IHNoYWRlciBlbnRyeSBmdW5jdGlvbiBub3QgZm91bmQgKG1ldGFsKQBNRVRBTF9TSEFERVJfQ09NUElMQVRJT05fRkFJTEVEOiBzaGFkZXIgY29tcGlsYXRpb24gZmFpbGVkIChtZXRhbCkATUVUQUxfU0hBREVSX0NSRUFUSU9OX0ZBSUxFRDogc2hhZGVyIGNyZWF0aW9uIGZhaWxlZCAobWV0YWwpAFdJTjMyX1JFR0lTVEVSX1JBV19JTlBVVF9ERVZJQ0VTX0ZBSUxFRF9NT1VTRV9VTkxPQ0s6IFJlZ2lzdGVyUmF3SW5wdXREZXZpY2VzKCkgZmFpbGVkIChvbiBtb3VzZSB1bmxvY2spAFdJTjMyX1JFR0lTVEVSX1JBV19JTlBVVF9ERVZJQ0VTX0ZBSUxFRF9NT1VTRV9MT0NLOiBSZWdpc3RlclJhd0lucHV0RGV2aWNlcygpIGZhaWxlZCAob24gbW91c2UgbG9jaykARFJPUFBFRF9GSUxFX1BBVEhfVE9PX0xPTkc6IGRyb3BwZWQgZmlsZSBwYXRoIHRvbyBsb25nIChzYXBwX2Rlc2MubWF4X2Ryb3BwZWRfZmlsZWRfcGF0aF9sZW5ndGgpACFfc2FwcF9yaW5nX2VtcHR5KHJpbmcpACFfc2FwcF9yaW5nX2Z1bGwocmluZykAKHNsb3RfaW5kZXggPiAwKSAmJiAoc2xvdF9pbmRleCA8IHBvb2wtPnNpemUpAChzbG90X2luZGV4ID4gKDApKSAmJiAoc2xvdF9pbmRleCA8IHBvb2wtPnNpemUpAChzbG90X2luZGV4ID4gKDApKSAmJiAoc2xvdF9pbmRleCA8IHAtPmF0dGFjaG1lbnRzX3Bvb2wuc2l6ZSkAKHNsb3RfaW5kZXggPiAoMCkpICYmIChzbG90X2luZGV4IDwgcC0+c2FtcGxlcl9wb29sLnNpemUpAChzbG90X2luZGV4ID4gKDApKSAmJiAoc2xvdF9pbmRleCA8IHAtPmJ1ZmZlcl9wb29sLnNpemUpAChzbG90X2luZGV4ID4gKDApKSAmJiAoc2xvdF9pbmRleCA8IHAtPnNoYWRlcl9wb29sLnNpemUpAChzbG90X2luZGV4ID4gKDApKSAmJiAoc2xvdF9pbmRleCA8IHAtPnBpcGVsaW5lX3Bvb2wuc2l6ZSkAKHNsb3RfaW5kZXggPiAoMCkpICYmIChzbG90X2luZGV4IDwgcC0+aW1hZ2VfcG9vbC5zaXplKQBWQUxJREFURV9CVUZGRVJERVNDX0RBVEE6IGltbXV0YWJsZSBidWZmZXJzIG11c3QgYmUgaW5pdGlhbGl6ZWQgd2l0aCBkYXRhIChzZ19idWZmZXJfZGVzYy5kYXRhLnB0ciBhbmQgc2dfYnVmZmVyX2Rlc2MuZGF0YS5zaXplKQBwICYmIChTR19JTlZBTElEX0lEICE9IGF0dHNfaWQpAHAgJiYgKFNHX0lOVkFMSURfSUQgIT0gc21wX2lkKQBwICYmIChTR19JTlZBTElEX0lEICE9IHBpcF9pZCkAcCAmJiAoU0dfSU5WQUxJRF9JRCAhPSBpbWdfaWQpAHAgJiYgKFNHX0lOVkFMSURfSUQgIT0gYnVmX2lkKQBwICYmIChTR19JTlZBTElEX0lEICE9IHNoZF9pZCkAYm5kLnBpcC0+c2hhZGVyICYmIChibmQucGlwLT5jbW4uc2hhZGVyX2lkLmlkID09IGJuZC5waXAtPnNoYWRlci0+c2xvdC5pZCkAcGlwLT5zaGFkZXIgJiYgKHBpcC0+Y21uLnNoYWRlcl9pZC5pZCA9PSBwaXAtPnNoYWRlci0+c2xvdC5pZCkAcGlwLT5zaGFkZXIgJiYgKHBpcC0+c2hhZGVyLT5zbG90LmlkID09IHBpcC0+Y21uLnNoYWRlcl9pZC5pZCkAKHNyYy0+c2FtcGxlcl9zbG90ID49IDApICYmIChzcmMtPnNhbXBsZXJfc2xvdCA8IFNHX01BWF9TQU1QTEVSX0JJTkRTTE9UUykAc2J1Zl9kZXNjLT5nbHNsX2JpbmRpbmdfbiA8ICgyICogU0dfTUFYX1NUT1JBR0VCVUZGRVJfQklORFNMT1RTKQAoc3JjLT5pbWFnZV9zbG90ID49IDApICYmIChzcmMtPmltYWdlX3Nsb3QgPCBTR19NQVhfSU1BR0VfQklORFNMT1RTKQAoZGVzYy0+Y29sb3JfY291bnQgPj0gMCkgJiYgKGRlc2MtPmNvbG9yX2NvdW50IDw9IFNHX01BWF9DT0xPUl9BVFRBQ0hNRU5UUykAYXR0cyAmJiAoaW5kZXggPj0gMCkgJiYgKGluZGV4IDwgU0dfTUFYX0NPTE9SX0FUVEFDSE1FTlRTKQAobnVtX2ltYWdlcyA+IDApICYmIChudW1faW1hZ2VzIDw9IFNBUFBfTUFYX0lDT05JTUFHRVMpAChkZXNjLT5hdHRhY2htZW50c19wb29sX3NpemUgPiAwKSAmJiAoZGVzYy0+YXR0YWNobWVudHNfcG9vbF9zaXplIDwgX1NHX01BWF9QT09MX1NJWkUpAChkZXNjLT5zYW1wbGVyX3Bvb2xfc2l6ZSA+IDApICYmIChkZXNjLT5zYW1wbGVyX3Bvb2xfc2l6ZSA8IF9TR19NQVhfUE9PTF9TSVpFKQAoZGVzYy0+YnVmZmVyX3Bvb2xfc2l6ZSA+IDApICYmIChkZXNjLT5idWZmZXJfcG9vbF9zaXplIDwgX1NHX01BWF9QT09MX1NJWkUpAChkZXNjLT5zaGFkZXJfcG9vbF9zaXplID4gMCkgJiYgKGRlc2MtPnNoYWRlcl9wb29sX3NpemUgPCBfU0dfTUFYX1BPT0xfU0laRSkAKGRlc2MtPnBpcGVsaW5lX3Bvb2xfc2l6ZSA+IDApICYmIChkZXNjLT5waXBlbGluZV9wb29sX3NpemUgPCBfU0dfTUFYX1BPT0xfU0laRSkAKGRlc2MtPmltYWdlX3Bvb2xfc2l6ZSA+IDApICYmIChkZXNjLT5pbWFnZV9wb29sX3NpemUgPCBfU0dfTUFYX1BPT0xfU0laRSkAKHBpcC0+c2hhZGVyID09IDApICYmIChwaXAtPmNtbi5zaGFkZXJfaWQuaWQgIT0gU0dfSU5WQUxJRF9JRCkAKHBpcC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX1ZBTElEKXx8KHBpcC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0ZBSUxFRCkAKHBpcC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX1ZBTElEKSB8fCAocGlwLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfRkFJTEVEKQAoYnVmLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfVkFMSUQpfHwoYnVmLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfRkFJTEVEKQAoYnVmLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfVkFMSUQpIHx8IChidWYtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9GQUlMRUQpAChzaGQtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9WQUxJRCl8fChzaGQtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9GQUlMRUQpAChzaGQtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9WQUxJRCkgfHwgKHNoZC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0ZBSUxFRCkAcGlwICYmIChwaXAtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9BTExPQykAYnVmICYmIChidWYtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9BTExPQykAc2hkICYmIChzaGQtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9BTExPQykAV0lOMzJfV0dMX09QRU5HTF9WRVJTSU9OX05PVF9TVVBQT1JURUQ6IHJlcXVlc3RlZCBPcGVuR0wgdmVyc2lvbiBub3Qgc3VwcG9ydGVkIGJ5IEdMIGRyaXZlciAoRVJST1JfSU5WQUxJRF9WRVJTSU9OX0FSQikAV0lOMzJfV0dMX09QRU5HTF9QUk9GSUxFX05PVF9TVVBQT1JURUQ6IHJlcXVlc3RlZCBPcGVuR0wgcHJvZmlsZSBub3Qgc3VwcG9ydCBieSBHTCBkcml2ZXIgKEVSUk9SX0lOVkFMSURfUFJPRklMRV9BUkIpAFZBTElEQVRFX1NIQURFUkRFU0NfU0FNUExFUl9XR1NMX0dST1VQMV9CSU5ESU5HX09VVF9PRl9SQU5HRTogc2FtcGxlciAnd2dzbF9ncm91cDFfYmluZGluZ19uJyBpcyBvdXQgb2YgcmFuZ2UgKG11c3QgYmUgMC4uMTI3KQBWQUxJREFURV9TSEFERVJERVNDX1NUT1JBR0VCVUZGRVJfV0dTTF9HUk9VUDFfQklORElOR19PVVRfT0ZfUkFOR0U6IHN0b3JhZ2UgYnVmZmVyICd3Z3NsX2dyb3VwMV9iaW5kaW5nX24nIGlzIG91dCBvZiByYW5nZSAobXVzdCBiZSAwLi4xMjcpAFZBTElEQVRFX1NIQURFUkRFU0NfSU1BR0VfV0dTTF9HUk9VUDFfQklORElOR19PVVRfT0ZfUkFOR0U6IGltYWdlICd3Z3NsX2dyb3VwMV9iaW5kaW5nX24nIGlzIG91dCBvZiByYW5nZSAobXVzdCBiZSAwLi4xMjcpAFZBTElEQVRFX1NIQURFUkRFU0NfVUJfTUVUQUxfQlVGRkVSX1NMT1RfT1VUX09GX1JBTkdFOiB1bmlmb3JtIGJsb2NrICdtc2xfYnVmZmVyX24nIGlzIG91dCBvZiByYW5nZSAobXVzdCBiZSAwLi43KQBWQUxJREFURV9TSEFERVJERVNDX1VCX0hMU0xfUkVHSVNURVJfQl9PVVRfT0ZfUkFOR0U6IHVuaWZvcm0gYmxvY2sgJ2hsc2xfcmVnaXN0ZXJfYl9uJyBpcyBvdXQgb2YgcmFuZ2UgKG11c3QgYmUgMC4uNykAVkFMSURBVEVfU0hBREVSREVTQ19BVFRSX1NUUklOR19UT09fTE9ORzogdmVydGV4IGF0dHJpYnV0ZSBuYW1lL3NlbWFudGljIHN0cmluZyB0b28gbG9uZyAobWF4IGxlbiAxNikAVkFMSURBVEVfU0hBREVSREVTQ19TVE9SQUdFQlVGRkVSX01FVEFMX0JVRkZFUl9TTE9UX09VVF9PRl9SQU5HRTogc3RvcmFnZSBidWZmZXIgJ21zbF9idWZmZXJfbicgaXMgb3V0IG9mIHJhbmdlIChtdXN0IGJlIDguLjE1KQBWQUxJREFURV9TSEFERVJERVNDX1NBTVBMRVJfSExTTF9SRUdJU1RFUl9TX09VVF9PRl9SQU5HRTogc2FtcGxlciAnaGxzbF9yZWdpc3Rlcl9zX24nIGlzIG91dCBvZiByYW5nIChtdXN0IGJlIDAuLjE1KQBWQUxJREFURV9TSEFERVJERVNDX1NBTVBMRVJfTUVUQUxfU0FNUExFUl9TTE9UX09VVF9PRl9SQU5HRTogc2FtcGxlciAnbXNsX3NhbXBsZXJfbicgaXMgb3V0IG9mIHJhbmdlIChtdXN0IGJlIDAuLjE1KQBWQUxJREFURV9TSEFERVJERVNDX1NUT1JBR0VCVUZGRVJfR0xTTF9CSU5ESU5HX09VVF9PRl9SQU5HRTogc3RvcmFnZSBidWZmZXIgJ2dsc2xfYmluZGluZ19uJyBpcyBvdXQgb2YgcmFuZ2UgKG11c3QgYmUgMC4uMTUpAFZBTElEQVRFX1NIQURFUkRFU0NfVUJfV0dTTF9HUk9VUDBfQklORElOR19PVVRfT0ZfUkFOR0U6IHVuaWZvcm0gYmxvY2sgJ3dnc2xfZ3JvdXAwX2JpbmRpbmdfbicgaXMgb3V0IG9mIHJhbmdlIChtdXN0IGJlIDAuLjE1KQBWQUxJREFURV9TSEFERVJERVNDX0lNQUdFX01FVEFMX1RFWFRVUkVfU0xPVF9PVVRfT0ZfUkFOR0U6IGltYWdlICdtc2xfdGV4dHVyZV9uJyBpcyBvdXQgb2YgcmFuZ2UgKG11c3QgYmUgMC4uMTUpAFZBTElEQVRFX1NIQURFUkRFU0NfU1RPUkFHRUJVRkZFUl9ITFNMX1JFR0lTVEVSX1RfT1VUX09GX1JBTkdFOiBzdG9yYWdlIGJ1ZmZlciAnaGxzbF9yZWdpc3Rlcl90X24nIGlzIG91dCBvZiByYW5nZSAobXVzdCBiZSAwLi4yMykAVkFMSURBVEVfU0hBREVSREVTQ19JTUFHRV9ITFNMX1JFR0lTVEVSX1RfT1VUX09GX1JBTkdFOiBpbWFnZSAnaGxzbF9yZWdpc3Rlcl90X24nIGlzIG91dCBvZiByYW5nZSAobXVzdCBiZSAwLi4yMykAVkFMSURBVEVfQlVGRkVSREVTQ19TVE9SQUdFQlVGRkVSX1NVUFBPUlRFRDogc3RvcmFnZSBidWZmZXJzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGJhY2tlbmQgM0QgQVBJIChyZXF1aXJlcyBPcGVuR0wgPj0gNC4zKQBMSU5VWF9HTFhfVkVSU0lPTl9UT09fTE9XOiBHTFggdmVyc2lvbiB0b28gbG93IChuZWVkIGF0IGxlYXN0IDEuMykARDNEMTFfQ1JFQVRFX0NPTlNUQU5UX0JVRkZFUl9GQUlMRUQ6IENyZWF0ZUJ1ZmZlcigpIGZhaWxlZCBmb3IgdW5pZm9ybSBjb25zdGFudCBidWZmZXIgKGQzZDExKQBEM0QxMV9NQVBfRk9SX0FQUEVORF9CVUZGRVJfRkFJTEVEOiBNYXAoKSBmYWlsZWQgd2hlbiBhcHBlbmRpbmcgdG8gYnVmZmVyIChkM2QxMSkARDNEMTFfTUFQX0ZPUl9VUERBVEVfQlVGRkVSX0ZBSUxFRDogTWFwKCkgZmFpbGVkIHdoZW4gdXBkYXRpbmcgYnVmZmVyIChkM2QxMSkARDNEMTFfQ1JFQVRFX0JVRkZFUl9TUlZfRkFJTEVEOiBDcmVhdGVTaGFkZXJSZXNvdXJjZVZpZXcoKSBmYWlsZWQgZm9yIHN0b3JhZ2UgYnVmZmVyIChkM2QxMSkARDNEMTFfQ1JFQVRFXzJEX1RFWFRVUkVfVU5TVVBQT1JURURfUElYRUxfRk9STUFUOiBwaXhlbCBmb3JtYXQgbm90IHN1cHBvcnRlZCBmb3IgMmQtLCBjdWJlLSBvciBhcnJheS10ZXh0dXJlIChkM2QxMSkARDNEMTFfQ1JFQVRFXzJEX1NSVl9GQUlMRUQ6IENyZWF0ZVNoYWRlclJlc291cmNlVmlldygpIGZhaWxlZCBmb3IgMmQtLCBjdWJlLSBvciBhcnJheS10ZXh0dXJlIChkM2QxMSkARDNEMTFfQ1JFQVRFXzJEX1RFWFRVUkVfRkFJTEVEOiBDcmVhdGVUZXh0dXJlMkQoKSBmYWlsZWQgZm9yIDJkLSwgY3ViZS0gb3IgYXJyYXktdGV4dHVyZSAoZDNkMTEpAEQzRDExX0NSRUFURV9NU0FBX1RFWFRVUkVfRkFJTEVEOiBDcmVhdGVUZXh0dXJlMkQoKSBmYWlsZWQgZm9yIE1TQUEgcmVuZGVyIHRhcmdldCB0ZXh0dXJlIChkM2QxMSkARDNEMTFfQ1JFQVRFX0RFUFRIX1RFWFRVUkVfVU5TVVBQT1JURURfUElYRUxfRk9STUFUOiBwaXhlbCBmb3JtYXQgbm90IHN1cHBvcnRlZCBmb3IgZGVwdGgtc3RlbmNpbCB0ZXh0dXJlIChkM2QxMSkARDNEMTFfQ1JFQVRFX0RFUFRIX1RFWFRVUkVfRkFJTEVEOiBDcmVhdGVUZXh0dXJlMkQoKSBmYWlsZWQgZm9yIGRlcHRoLXN0ZW5jaWwgdGV4dHVyZSAoZDNkMTEpAEQzRDExX0NSRUFURV8zRF9TUlZfRkFJTEVEOiBDcmVhdGVTaGFkZXJSZXNvdXJjZVZpZXcoKSBmYWlsZWQgZm9yIDNkIHRleHR1cmUgKGQzZDExKQBEM0QxMV9DUkVBVEVfM0RfVEVYVFVSRV9VTlNVUFBPUlRFRF9QSVhFTF9GT1JNQVQ6IHBpeGVsIGZvcm1hdCBub3Qgc3VwcG9ydGVkIGZvciAzRCB0ZXh0dXJlIChkM2QxMSkARDNEMTFfTUFQX0ZPUl9VUERBVEVfSU1BR0VfRkFJTEVEOiBNYXAoKSBmYWlsZWQgd2hlbiB1cGRhdGluZyBpbWFnZSAoZDNkMTEpAEQzRDExX1NIQURFUl9DT01QSUxBVElPTl9GQUlMRUQ6IHNoYWRlciBjb21waWxhdGlvbiBmYWlsZWQgKGQzZDExKQBEM0QxMV9MT0FEX0QzRENPTVBJTEVSXzQ3X0RMTF9GQUlMRUQ6IGxvYWRpbmcgZDNkY29tcGlsZXJfNDcuZGxsIGZhaWxlZCAoZDNkMTEpAEQzRDExX0NSRUFURV9SVFZfRkFJTEVEOiBDcmVhdGVSZW5kZXJUYXJnZXRWaWV3KCkgZmFpbGVkIChkM2QxMSkARDNEMTFfQ1JFQVRFX0RTVl9GQUlMRUQ6IENyZWF0ZURlcHRoU3RlbmNpbFZpZXcoKSBmYWlsZWQgKGQzZDExKQBEM0QxMV9DUkVBVEVfSU5QVVRfTEFZT1VUX0ZBSUxFRDogQ3JlYXRlSW5wdXRMYXlvdXQoKSBmYWlsZWQgKGQzZDExKQBEM0QxMV9DUkVBVEVfQlVGRkVSX0ZBSUxFRDogQ3JlYXRlQnVmZmVyKCkgZmFpbGVkIChkM2QxMSkARDNEMTFfQ1JFQVRFX1JBU1RFUklaRVJfU1RBVEVfRkFJTEVEOiBDcmVhdGVSYXN0ZXJpemVyU3RhdGUoKSBmYWlsZWQgKGQzZDExKQBEM0QxMV9DUkVBVEVfU0FNUExFUl9TVEFURV9GQUlMRUQ6IENyZWF0ZVNhbXBsZXJTdGF0ZSgpIGZhaWxlZCAoZDNkMTEpAEQzRDExX0NSRUFURV9ERVBUSF9TVEVOQ0lMX1NUQVRFX0ZBSUxFRDogQ3JlYXRlRGVwdGhTdGVuY2lsU3RhdGUoKSBmYWlsZWQgKGQzZDExKQBEM0QxMV9DUkVBVEVfQkxFTkRfU1RBVEVfRkFJTEVEOiBDcmVhdGVCbGVuZFN0YXRlKCkgZmFpbGVkIChkM2QxMSkARDNEMTFfQ1JFQVRFXzNEX1RFWFRVUkVfRkFJTEVEOiBDcmVhdGVUZXh0dXJlM0QoKSBmYWlsZWQgKGQzZDExKQBNQUNPU19JTlZBTElEX05TT1BFTkdMX1BST0ZJTEU6IG1hY29zOiBpbnZhbGlkIE5TT3BlbkdMUHJvZmlsZSAodmFsaWQgY2hvaWNlcyBhcmUgMS4wIGFuZCA0LjEpAHBvb2wgJiYgKG51bSA+PSAxKQAoYmluZGluZ3MtPl9zdGFydF9jYW5hcnkgPT0gMCkgJiYgKGJpbmRpbmdzLT5fZW5kX2NhbmFyeT09MCkAKF9zYXBwLmZyYW1lYnVmZmVyX3dpZHRoID4gMCkgJiYgKF9zYXBwLmZyYW1lYnVmZmVyX2hlaWdodCA+IDApAHNyYyAmJiBkc3QgJiYgKG1heF9sZW4gPiAwKQBwdHIgJiYgKHNpemUgPiAwKQAocGFzcy0+X3N0YXJ0X2NhbmFyeSA9PSAwKSAmJiAocGFzcy0+X2VuZF9jYW5hcnkgPT0gMCkAKGRlc2MtPl9zdGFydF9jYW5hcnkgPT0gMCkgJiYgKGRlc2MtPl9lbmRfY2FuYXJ5ID09IDApAChhbGlnbiA+IDApICYmICgoYWxpZ24gJiAoYWxpZ24gLSAxKSkgPT0gMCkAKGdsX3RleF9zbG90ID49IDApICYmIChnbF90ZXhfc2xvdCA8IChTR19NQVhfSU1BR0VfU0FNUExFUl9QQUlSUykpAEFORFJPSURfTkFUSVZFX0FDVElWSVRZX09OU1RBUlQ6IE5hdGl2ZUFjdGl2aXR5IG9uU3RhcnQoKQBBTkRST0lEX05BVElWRV9BQ1RJVklUWV9PTlNUT1A6IE5hdGl2ZUFjdGl2aXR5IG9uU3RvcCgpAERSQVdfUkVRVUlSRURfQklORElOR1NfT1JfVU5JRk9STVNfTUlTU0lORzogY2FsbCB0byBzZ19hcHBseV9iaW5kaW5ncygpIGFuZC9vciBzZ19hcHBseV91bmlmb3JtcygpIG1pc3NpbmcgYWZ0ZXIgc2dfYXBwbHlfcGlwZWxpbmUoKQBWQUxJREFURV9BVUJfTk9fUElQRUxJTkU6IHNnX2FwcGx5X3VuaWZvcm1zOiBtdXN0IGJlIGNhbGxlZCBhZnRlciBzZ19hcHBseV9waXBlbGluZSgpAEFORFJPSURfVU5TVVBQT1JURURfSU5QVVRfRVZFTlRfSU5QVVRfQ0I6IHVuc3VwcG9ydGVkIGlucHV0IGV2ZW50IGVuY291bnRlcmVkIGluIF9zYXBwX2FuZHJvaWRfaW5wdXRfY2IoKQBBTkRST0lEX1JFQURfTVNHX0ZBSUxFRDogZmFpbGVkIHRvIHJlYWQgbWVzc2FnZSBpbiBfc2FwcF9hbmRyb2lkX21haW5fY2IoKQBBTkRST0lEX1VOU1VQUE9SVEVEX0lOUFVUX0VWRU5UX01BSU5fQ0I6IHVuc3VwcG9ydGVkIGlucHV0IGV2ZW50IGVuY291bnRlcmVkIGluIF9zYXBwX2FuZHJvaWRfbWFpbl9jYigpAFdHUFVfUkVRVUVTVF9BREFQVEVSX1NUQVRVU19FUlJPUjogd2dwdTogcmVxdWVzdGluZyBhZGFwdGVyIGZhaWxlZCB3aXRoIHN0YXR1cyAnZXJyb3InAFdHUFVfUkVRVUVTVF9ERVZJQ0VfU1RBVFVTX0VSUk9SOiB3Z3B1OiByZXF1ZXN0aW5nIGRldmljZSBmYWlsZWQgd2l0aCBzdGF0dXMgJ2Vycm9yJwBXR1BVX1JFUVVFU1RfQURBUFRFUl9TVEFUVVNfVU5LTk9XTjogd2dwdTogcmVxdWVzdGluZyBhZGFwdGVyIGZhaWxlZCB3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AQByKQEAZUABAPg/AQBZGwEAxCkBAIs/AQDMSAEAvUABAPBXAQDA/wEAAEHw+AYLJCR3aXRoU3RhY2tTYXZlLCRzdHJpbmdUb1VURjhPblN0YWNrAABBlPkGC9AsKHZvaWQpPDo6PnsgTW9kdWxlLnNva29sX2JlZm9yZXVubG9hZCA9IChldmVudCkgPT4geyBpZiAoX19zYXBwX2h0bWw1X2dldF9hc2tfbGVhdmVfc2l0ZSgpICE9IDApIHsgZXZlbnQucHJldmVudERlZmF1bHQoKTsgZXZlbnQucmV0dXJuVmFsdWUgPSAnICc7IH0gfTsgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsIE1vZHVsZS5zb2tvbF9iZWZvcmV1bmxvYWQpOyB9ACh2b2lkKTw6Oj57IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCBNb2R1bGUuc29rb2xfYmVmb3JldW5sb2FkKTsgfQAodm9pZCk8Ojo+eyBNb2R1bGUuc29rb2xfcGFzdGUgPSAoZXZlbnQpID0+IHsgY29uc3QgcGFzdGVkX3N0ciA9IGV2ZW50LmNsaXBib2FyZERhdGEuZ2V0RGF0YSgndGV4dCcpOyB3aXRoU3RhY2tTYXZlKCgpID0+IHsgY29uc3QgY3N0ciA9IHN0cmluZ1RvVVRGOE9uU3RhY2socGFzdGVkX3N0cik7IF9fc2FwcF9lbXNjX29ucGFzdGUoY3N0cik7IH0pOyB9OyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncGFzdGUnLCBNb2R1bGUuc29rb2xfcGFzdGUpOyB9ACh2b2lkKTw6Oj57IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwYXN0ZScsIE1vZHVsZS5zb2tvbF9wYXN0ZSk7IH0AKGNvbnN0IGNoYXIqIGNfc3RyKTw6Oj57IGNvbnN0IHN0ciA9IFVURjhUb1N0cmluZyhjX3N0cik7IGNvbnN0IHRhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTsgdGEuc2V0QXR0cmlidXRlKCdhdXRvY29tcGxldGUnLCAnb2ZmJyk7IHRhLnNldEF0dHJpYnV0ZSgnYXV0b2NvcnJlY3QnLCAnb2ZmJyk7IHRhLnNldEF0dHJpYnV0ZSgnYXV0b2NhcGl0YWxpemUnLCAnb2ZmJyk7IHRhLnNldEF0dHJpYnV0ZSgnc3BlbGxjaGVjaycsICdmYWxzZScpOyB0YS5zdHlsZS5sZWZ0ID0gLTEwMCArICdweCc7IHRhLnN0eWxlLnRvcCA9IC0xMDAgKyAncHgnOyB0YS5zdHlsZS5oZWlnaHQgPSAxOyB0YS5zdHlsZS53aWR0aCA9IDE7IHRhLnZhbHVlID0gc3RyOyBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRhKTsgdGEuc2VsZWN0KCk7IGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jyk7IGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGEpOyB9AChjb25zdCBjaGFyKiBjYW52YXNfc2VsZWN0b3JfY3N0cik8Ojo+eyBNb2R1bGUuc29rb2xfZHJvcF9maWxlcyA9IFtdOyBjb25zdCBjYW52YXMgPSBNb2R1bGUuY2FudmFzOyBNb2R1bGUuc29rb2xfZHJhZ2VudGVyID0gKGV2ZW50KSA9PiB7IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyB9OyBNb2R1bGUuc29rb2xfZHJhZ2xlYXZlID0gKGV2ZW50KSA9PiB7IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyB9OyBNb2R1bGUuc29rb2xfZHJhZ292ZXIgPSAoZXZlbnQpID0+IHsgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7IGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IH07IE1vZHVsZS5zb2tvbF9kcm9wID0gKGV2ZW50KSA9PiB7IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyBjb25zdCBmaWxlcyA9IGV2ZW50LmRhdGFUcmFuc2Zlci5maWxlczsgTW9kdWxlLnNva29sX2Ryb3BwZWRfZmlsZXMgPSBmaWxlczsgX19zYXBwX2Vtc2NfYmVnaW5fZHJvcChmaWxlcy5sZW5ndGgpOyBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKSB7IHdpdGhTdGFja1NhdmUoKCkgPT4geyBjb25zdCBjc3RyID0gc3RyaW5nVG9VVEY4T25TdGFjayhmaWxlc1tpXS5uYW1lKTsgX19zYXBwX2Vtc2NfZHJvcChpLCBjc3RyKTsgfSk7IH0gbGV0IG1vZHMgPSAwOyBpZiAoZXZlbnQuc2hpZnRLZXkpIHsgbW9kcyB8PSAxOyB9IGlmIChldmVudC5jdHJsS2V5KSB7IG1vZHMgfD0gMjsgfSBpZiAoZXZlbnQuYWx0S2V5KSB7IG1vZHMgfD0gNDsgfSBpZiAoZXZlbnQubWV0YUtleSkgeyBtb2RzIHw9IDg7IH0gX19zYXBwX2Vtc2NfZW5kX2Ryb3AoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSwgbW9kcyk7IH07IGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCBNb2R1bGUuc29rb2xfZHJhZ2VudGVyLCBmYWxzZSk7IGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCBNb2R1bGUuc29rb2xfZHJhZ2xlYXZlLCBmYWxzZSk7IGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIE1vZHVsZS5zb2tvbF9kcmFnb3ZlciwgZmFsc2UpOyBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIE1vZHVsZS5zb2tvbF9kcm9wLCBmYWxzZSk7IH0AKGludCBpbmRleCk8Ojo+eyAvKiogQHN1cHByZXNzIHttaXNzaW5nUHJvcGVydGllc30gKi8gY29uc3QgZmlsZXMgPSBNb2R1bGUuc29rb2xfZHJvcHBlZF9maWxlczsgaWYgKChpbmRleCA8IDApIHx8IChpbmRleCA+PSBmaWxlcy5sZW5ndGgpKSB7IHJldHVybiAwOyB9IGVsc2UgeyByZXR1cm4gZmlsZXNbaW5kZXhdLnNpemU7IH0gfQAoaW50IGluZGV4LCBfc2FwcF9odG1sNV9mZXRjaF9jYWxsYmFjayBjYWxsYmFjaywgdm9pZCogYnVmX3B0ciwgdWludDMyX3QgYnVmX3NpemUsIHZvaWQqIHVzZXJfZGF0YSk8Ojo+eyBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpOyByZWFkZXIub25sb2FkID0gKGxvYWRFdmVudCkgPT4geyBjb25zdCBjb250ZW50ID0gbG9hZEV2ZW50LnRhcmdldC5yZXN1bHQ7IGlmIChjb250ZW50LmJ5dGVMZW5ndGggPiBidWZfc2l6ZSkgeyBfX3NhcHBfZW1zY19pbnZva2VfZmV0Y2hfY2IoaW5kZXgsIDAsIDEsIGNhbGxiYWNrLCAwLCBidWZfcHRyLCBidWZfc2l6ZSwgdXNlcl9kYXRhKTsgfSBlbHNlIHsgSEVBUFU4LnNldChuZXcgVWludDhBcnJheShjb250ZW50KSwgYnVmX3B0cik7IF9fc2FwcF9lbXNjX2ludm9rZV9mZXRjaF9jYihpbmRleCwgMSwgMCwgY2FsbGJhY2ssIGNvbnRlbnQuYnl0ZUxlbmd0aCwgYnVmX3B0ciwgYnVmX3NpemUsIHVzZXJfZGF0YSk7IH0gfTsgcmVhZGVyLm9uZXJyb3IgPSAoKSA9PiB7IF9fc2FwcF9lbXNjX2ludm9rZV9mZXRjaF9jYihpbmRleCwgMCwgMiwgY2FsbGJhY2ssIDAsIGJ1Zl9wdHIsIGJ1Zl9zaXplLCB1c2VyX2RhdGEpOyB9OyAvKiogQHN1cHByZXNzIHttaXNzaW5nUHJvcGVydGllc30gKi8gY29uc3QgZmlsZXMgPSBNb2R1bGUuc29rb2xfZHJvcHBlZF9maWxlczsgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGZpbGVzW2luZGV4XSk7IH0AKGNvbnN0IGNoYXIqIGNhbnZhc19zZWxlY3Rvcl9jc3RyKTw6Oj57IGNvbnN0IGNhbnZhcyA9IE1vZHVsZXMuY2FudmFzOyBjYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgTW9kdWxlLnNva29sX2RyYWdlbnRlcik7IGNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCBNb2R1bGUuc29rb2xfZHJhZ2xlYXZlKTsgY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgTW9kdWxlLnNva29sX2RyYWdvdmVyKTsgY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCBNb2R1bGUuc29rb2xfZHJvcCk7IH0AKGNvbnN0IGNoYXIqIGNhbnZhc19zZWxlY3Rvcl9jc3RyKTw6Oj57IGlmIChNb2R1bGUuY2FudmFzKSB7IHNwZWNpYWxIVE1MVGFyZ2V0c1siIWNhbnZhcyJdID0gTW9kdWxlLmNhbnZhczsgc3RyaW5nVG9VVEY4KCIhY2FudmFzIiwgY2FudmFzX3NlbGVjdG9yX2NzdHIsIDgpOyByZXR1cm47IH0gY29uc3QgY2FudmFzX3NlbGVjdG9yID0gVVRGOFRvU3RyaW5nKGNhbnZhc19zZWxlY3Rvcl9jc3RyKTsgTW9kdWxlLmNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY2FudmFzX3NlbGVjdG9yKTsgaWYgKCFNb2R1bGUuY2FudmFzKSB7IGNvbnNvbGUubG9nKCJzb2tvbF9hcHAuaDogaW52YWxpZCB0YXJnZXQ6IiArIGNhbnZhc19zZWxlY3Rvcik7IH0gaWYgKCFNb2R1bGUuY2FudmFzLnJlcXVlc3RQb2ludGVyTG9jaykgeyBjb25zb2xlLmxvZygic29rb2xfYXBwLmg6IHRhcmdldCBkb2Vzbid0IHN1cHBvcnQgcmVxdWVzdFBvaW50ZXJMb2NrOiIgKyBjYW52YXNfc2VsZWN0b3IpOyB9IH0AKHZvaWQpPDo6PnsgaWYgKE1vZHVsZS5jYW52YXMpIHsgaWYgKE1vZHVsZS5jYW52YXMucmVxdWVzdFBvaW50ZXJMb2NrKSB7IE1vZHVsZS5jYW52YXMucmVxdWVzdFBvaW50ZXJMb2NrKCk7IH0gfSB9ACh2b2lkKTw6Oj57IGlmIChkb2N1bWVudC5leGl0UG9pbnRlckxvY2spIHsgZG9jdW1lbnQuZXhpdFBvaW50ZXJMb2NrKCk7IH0gfQAoaW50IGN1cnNvcl90eXBlLCBpbnQgc2hvd24pPDo6PnsgaWYgKE1vZHVsZS5jYW52YXMpIHsgbGV0IGN1cnNvcjsgaWYgKHNob3duID09PSAwKSB7IGN1cnNvciA9ICJub25lIjsgfSBlbHNlIHN3aXRjaCAoY3Vyc29yX3R5cGUpIHsgY2FzZSAwOiBjdXJzb3IgPSAiYXV0byI7IGJyZWFrOyBjYXNlIDE6IGN1cnNvciA9ICJkZWZhdWx0IjsgYnJlYWs7IGNhc2UgMjogY3Vyc29yID0gInRleHQiOyBicmVhazsgY2FzZSAzOiBjdXJzb3IgPSAiY3Jvc3NoYWlyIjsgYnJlYWs7IGNhc2UgNDogY3Vyc29yID0gInBvaW50ZXIiOyBicmVhazsgY2FzZSA1OiBjdXJzb3IgPSAiZXctcmVzaXplIjsgYnJlYWs7IGNhc2UgNjogY3Vyc29yID0gIm5zLXJlc2l6ZSI7IGJyZWFrOyBjYXNlIDc6IGN1cnNvciA9ICJud3NlLXJlc2l6ZSI7IGJyZWFrOyBjYXNlIDg6IGN1cnNvciA9ICJuZXN3LXJlc2l6ZSI7IGJyZWFrOyBjYXNlIDk6IGN1cnNvciA9ICJhbGwtc2Nyb2xsIjsgYnJlYWs7IGNhc2UgMTA6IGN1cnNvciA9ICJub3QtYWxsb3dlZCI7IGJyZWFrOyBkZWZhdWx0OiBjdXJzb3IgPSAiYXV0byI7IGJyZWFrOyB9IE1vZHVsZS5jYW52YXMuc3R5bGUuY3Vyc29yID0gY3Vyc29yOyB9IH0AKHZvaWQpPDo6PnsgY29uc3QgbGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzb2tvbC1hcHAtZmF2aWNvbicpOyBpZiAobGluaykgeyBkb2N1bWVudC5oZWFkLnJlbW92ZUNoaWxkKGxpbmspOyB9IH0AKGludCB3LCBpbnQgaCwgY29uc3QgdWludDhfdCogcGl4ZWxzKTw6Oj57IGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpOyBjYW52YXMud2lkdGggPSB3OyBjYW52YXMuaGVpZ2h0ID0gaDsgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7IGNvbnN0IGltZ19kYXRhID0gY3R4LmNyZWF0ZUltYWdlRGF0YSh3LCBoKTsgaW1nX2RhdGEuZGF0YS5zZXQoSEVBUFU4LnN1YmFycmF5KHBpeGVscywgcGl4ZWxzICsgdypoKjQpKTsgY3R4LnB1dEltYWdlRGF0YShpbWdfZGF0YSwgMCwgMCk7IGNvbnN0IG5ld19saW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpOyBuZXdfbGluay5pZCA9ICdzb2tvbC1hcHAtZmF2aWNvbic7IG5ld19saW5rLnJlbCA9ICdzaG9ydGN1dCBpY29uJzsgbmV3X2xpbmsuaHJlZiA9IGNhbnZhcy50b0RhdGFVUkwoKTsgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChuZXdfbGluayk7IH0AKHVpbnQzMl90IGxldmVsLCBjb25zdCBjaGFyKiBjX3N0cik8Ojo+eyBjb25zdCBzdHIgPSBVVEY4VG9TdHJpbmcoY19zdHIpOyBzd2l0Y2ggKGxldmVsKSB7IGNhc2UgMDogY29uc29sZS5lcnJvcihzdHIpOyBicmVhazsgY2FzZSAxOiBjb25zb2xlLmVycm9yKHN0cik7IGJyZWFrOyBjYXNlIDI6IGNvbnNvbGUud2FybihzdHIpOyBicmVhazsgZGVmYXVsdDogY29uc29sZS5pbmZvKHN0cik7IGJyZWFrOyB9IH0A';
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

function sapp_js_add_beforeunload_listener() { Module.sokol_beforeunload = (event) => { if (__sapp_html5_get_ask_leave_site() != 0) { event.preventDefault(); event.returnValue = ' '; } }; window.addEventListener('beforeunload', Module.sokol_beforeunload); }
function sapp_js_remove_beforeunload_listener() { window.removeEventListener('beforeunload', Module.sokol_beforeunload); }
function sapp_js_add_clipboard_listener() { Module.sokol_paste = (event) => { const pasted_str = event.clipboardData.getData('text'); withStackSave(() => { const cstr = stringToUTF8OnStack(pasted_str); __sapp_emsc_onpaste(cstr); }); }; window.addEventListener('paste', Module.sokol_paste); }
function sapp_js_remove_clipboard_listener() { window.removeEventListener('paste', Module.sokol_paste); }
function sapp_js_write_clipboard(c_str) { const str = UTF8ToString(c_str); const ta = document.createElement('textarea'); ta.setAttribute('autocomplete', 'off'); ta.setAttribute('autocorrect', 'off'); ta.setAttribute('autocapitalize', 'off'); ta.setAttribute('spellcheck', 'false'); ta.style.left = -100 + 'px'; ta.style.top = -100 + 'px'; ta.style.height = 1; ta.style.width = 1; ta.value = str; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); }
function sapp_js_add_dragndrop_listeners(canvas_selector_cstr) { Module.sokol_drop_files = []; const canvas = Module.canvas; Module.sokol_dragenter = (event) => { event.stopPropagation(); event.preventDefault(); }; Module.sokol_dragleave = (event) => { event.stopPropagation(); event.preventDefault(); }; Module.sokol_dragover = (event) => { event.stopPropagation(); event.preventDefault(); }; Module.sokol_drop = (event) => { event.stopPropagation(); event.preventDefault(); const files = event.dataTransfer.files; Module.sokol_dropped_files = files; __sapp_emsc_begin_drop(files.length); for (let i = 0; i < files.length; i++) { withStackSave(() => { const cstr = stringToUTF8OnStack(files[i].name); __sapp_emsc_drop(i, cstr); }); } let mods = 0; if (event.shiftKey) { mods |= 1; } if (event.ctrlKey) { mods |= 2; } if (event.altKey) { mods |= 4; } if (event.metaKey) { mods |= 8; } __sapp_emsc_end_drop(event.clientX, event.clientY, mods); }; canvas.addEventListener('dragenter', Module.sokol_dragenter, false); canvas.addEventListener('dragleave', Module.sokol_dragleave, false); canvas.addEventListener('dragover', Module.sokol_dragover, false); canvas.addEventListener('drop', Module.sokol_drop, false); }
function sapp_js_dropped_file_size(index) { /** @suppress {missingProperties} */ const files = Module.sokol_dropped_files; if ((index < 0) || (index >= files.length)) { return 0; } else { return files[index].size; } }
function sapp_js_fetch_dropped_file(index,callback,buf_ptr,buf_size,user_data) { const reader = new FileReader(); reader.onload = (loadEvent) => { const content = loadEvent.target.result; if (content.byteLength > buf_size) { __sapp_emsc_invoke_fetch_cb(index, 0, 1, callback, 0, buf_ptr, buf_size, user_data); } else { HEAPU8.set(new Uint8Array(content), buf_ptr); __sapp_emsc_invoke_fetch_cb(index, 1, 0, callback, content.byteLength, buf_ptr, buf_size, user_data); } }; reader.onerror = () => { __sapp_emsc_invoke_fetch_cb(index, 0, 2, callback, 0, buf_ptr, buf_size, user_data); }; /** @suppress {missingProperties} */ const files = Module.sokol_dropped_files; reader.readAsArrayBuffer(files[index]); }
function sapp_js_remove_dragndrop_listeners(canvas_selector_cstr) { const canvas = Modules.canvas; canvas.removeEventListener('dragenter', Module.sokol_dragenter); canvas.removeEventListener('dragleave', Module.sokol_dragleave); canvas.removeEventListener('dragover', Module.sokol_dragover); canvas.removeEventListener('drop', Module.sokol_drop); }
function sapp_js_init(canvas_selector_cstr) { if (Module.canvas) { specialHTMLTargets["!canvas"] = Module.canvas; stringToUTF8("!canvas", canvas_selector_cstr, 8); return; } const canvas_selector = UTF8ToString(canvas_selector_cstr); Module.canvas = document.querySelector(canvas_selector); if (!Module.canvas) { console.log("sokol_app.h: invalid target:" + canvas_selector); } if (!Module.canvas.requestPointerLock) { console.log("sokol_app.h: target doesn't support requestPointerLock:" + canvas_selector); } }
function sapp_js_request_pointerlock() { if (Module.canvas) { if (Module.canvas.requestPointerLock) { Module.canvas.requestPointerLock(); } } }
function sapp_js_exit_pointerlock() { if (document.exitPointerLock) { document.exitPointerLock(); } }
function sapp_js_set_cursor(cursor_type,shown) { if (Module.canvas) { let cursor; if (shown === 0) { cursor = "none"; } else switch (cursor_type) { case 0: cursor = "auto"; break; case 1: cursor = "default"; break; case 2: cursor = "text"; break; case 3: cursor = "crosshair"; break; case 4: cursor = "pointer"; break; case 5: cursor = "ew-resize"; break; case 6: cursor = "ns-resize"; break; case 7: cursor = "nwse-resize"; break; case 8: cursor = "nesw-resize"; break; case 9: cursor = "all-scroll"; break; case 10: cursor = "not-allowed"; break; default: cursor = "auto"; break; } Module.canvas.style.cursor = cursor; } }
function sapp_js_clear_favicon() { const link = document.getElementById('sokol-app-favicon'); if (link) { document.head.removeChild(link); } }
function sapp_js_set_favicon(w,h,pixels) { const canvas = document.createElement('canvas'); canvas.width = w; canvas.height = h; const ctx = canvas.getContext('2d'); const img_data = ctx.createImageData(w, h); img_data.data.set(HEAPU8.subarray(pixels, pixels + w*h*4)); ctx.putImageData(img_data, 0, 0); const new_link = document.createElement('link'); new_link.id = 'sokol-app-favicon'; new_link.rel = 'shortcut icon'; new_link.href = canvas.toDataURL(); document.head.appendChild(new_link); }
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

  
  
  var webglPowerPreferences = ["default","low-power","high-performance"];
  
  
  
  /** @suppress {duplicate } */
  var _emscripten_webgl_do_create_context = (target, attributes) => {
      assert(attributes);
      var attr32 = ((attributes)>>2);
      var powerPreference = HEAP32[attr32 + (8>>2)];
      var contextAttributes = {
        'alpha': !!HEAP8[attributes + 0],
        'depth': !!HEAP8[attributes + 1],
        'stencil': !!HEAP8[attributes + 2],
        'antialias': !!HEAP8[attributes + 3],
        'premultipliedAlpha': !!HEAP8[attributes + 4],
        'preserveDrawingBuffer': !!HEAP8[attributes + 5],
        'powerPreference': webglPowerPreferences[powerPreference],
        'failIfMajorPerformanceCaveat': !!HEAP8[attributes + 12],
        // The following are not predefined WebGL context attributes in the WebGL specification, so the property names can be minified by Closure.
        majorVersion: HEAP32[attr32 + (16>>2)],
        minorVersion: HEAP32[attr32 + (20>>2)],
        enableExtensionsByDefault: HEAP8[attributes + 24],
        explicitSwapControl: HEAP8[attributes + 25],
        proxyContextToMainThread: HEAP32[attr32 + (28>>2)],
        renderViaOffscreenBackBuffer: HEAP8[attributes + 32]
      };
  
      var canvas = findCanvasEventTarget(target);
  
      if (!canvas) {
        return 0;
      }
  
      if (contextAttributes.explicitSwapControl) {
        return 0;
      }
  
      var contextHandle = GL.createContext(canvas, contextAttributes);
      return contextHandle;
    };
  var _emscripten_webgl_create_context = _emscripten_webgl_do_create_context;

  
  
  
  
  
  
  
  
  
  
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
  emscripten_webgl_create_context: _emscripten_webgl_create_context,
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
