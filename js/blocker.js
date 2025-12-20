/**
 * Enhanced Console Blocker - Advanced Detection & Blocking Logic
 */
(function (window) {
    'use strict';

    window.ConsoleBlocker = window.ConsoleBlocker || {};

    // Default Configuration
    const defaultConfig = {
        debug: false,
        detectionThreshold: 100,
        maxDetectionAttempts: 3,
        detectionInterval: 1000,
        enableContextMenu: false,
        enableTextSelection: false,
        enableKeyboardShortcuts: true,
        enableDevToolsDetection: true,
        enableDebuggerLoop: true,    // NEW: Aggressive debugger loop
        enableConsoleSpam: true,     // NEW: Spam console to make it unusable
        enableBlur: true,
        enableWarningOverlay: true
    };

    // Merge user config if exists
    const config = { ...defaultConfig, ...(window.consoleBlockerConfig || {}) };
    window.ConsoleBlocker.config = config;

    let state = {
        devToolsOpen: false,
        detectionCount: 0,
        loopActive: false
    };

    // --- 1. Aggressive Debugger Loop ---
    function activateDebuggerLoop() {
        if (!config.enableDebuggerLoop || state.loopActive) return;
        state.loopActive = true;

        // Recursive debugger call with random variations to prevent simple breakpoints
        (function recursiveDebugger() {
            try {
                // Polymorphic debugger: slightly different code path each time
                if (Math.random() > 0.5) {
                    (function () { debugger; })();
                } else {
                    debugger;
                }
            } catch (e) { }

            // If DevTools is open, this will pause execution here.
            // When resumed, it immediately calls itself again.
            if (state.devToolsOpen) {
                requestAnimationFrame(recursiveDebugger);
                // Also use setTimeout as a backup
                setTimeout(recursiveDebugger, 10);
            } else {
                state.loopActive = false;
            }
        })();
    }

    // --- 2. Console Spamming ---
    function spamConsole() {
        if (!config.enableConsoleSpam || !state.devToolsOpen) return;

        // Clear console first
        console.clear();

        // Spam warnings
        const warnings = [
            '🚫 STOP! Developer Tools are blocked.',
            '⚠️ Security Alert: Inspection detected.',
            '🔒 Access Denied.',
            '❌ Do not attempt to reverse engineer.'
        ];

        setInterval(() => {
            if (state.devToolsOpen) {
                console.log('%c' + warnings[Math.floor(Math.random() * warnings.length)],
                    'color: red; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 0px black;');

                // Occasionally clear to annoy user
                if (Math.random() > 0.8) console.clear();
            }
        }, 200);
    }

    // --- 3. Advanced Detection Methods ---
    const detectionMethods = {
        // Standard timing attack
        timing: function () {
            const start = performance.now();
            debugger;
            const end = performance.now();
            return (end - start) > config.detectionThreshold;
        },

        // Object.defineProperty / toString detection (Chrome/Firefox)
        elementId: function () {
            let detected = false;
            const element = document.createElement('div');
            Object.defineProperty(element, 'id', {
                get: function () {
                    detected = true;
                    return 'detected';
                }
            });
            // Logging the element triggers the getter if console is open
            console.log(element);
            console.clear();
            return detected;
        },

        // Function toString detection
        functionToString: function () {
            let count = 0;
            const func = function () { };
            func.toString = function () {
                count++;
                return 'function() {}';
            };
            console.dir(func);
            return count > 0;
        }
    };

    // --- 4. Main Detection Logic ---
    function detectDevTools() {
        if (!config.enableDevToolsDetection) return;

        let detected = false;

        // Check all methods
        for (const method in detectionMethods) {
            try {
                if (detectionMethods[method]()) {
                    detected = true;
                    break; // One positive is enough for aggressive mode
                }
            } catch (e) { }
        }

        if (detected) {
            state.detectionCount++;
            if (state.detectionCount >= config.maxDetectionAttempts) {
                if (!state.devToolsOpen) {
                    state.devToolsOpen = true;
                    triggerProtection();
                }
            }
        } else {
            state.detectionCount = Math.max(0, state.detectionCount - 1);
            if (state.detectionCount === 0) {
                state.devToolsOpen = false;
            }
        }
    }

    function triggerProtection() {
        // UI Action
        if (window.ConsoleBlocker.ui) {
            window.ConsoleBlocker.ui.handleDetection({ aggressive: true });
        } else {
            alert('🚫 Developer Tools Detected!');
        }

        // Active Countermeasures
        activateDebuggerLoop();
        spamConsole();
    }

    // --- 5. Event Blockers ---
    function blockEvents() {
        // Keyboard Shortcuts
        if (config.enableKeyboardShortcuts) {
            window.addEventListener('keydown', (e) => {
                if (
                    e.key === 'F12' ||
                    (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
                    (e.ctrlKey && e.key === 'U')
                ) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            }, true);
        }

        // Context Menu
        if (!config.enableContextMenu) {
            document.addEventListener('contextmenu', e => e.preventDefault());
        }

        // Text Selection
        if (!config.enableTextSelection) {
            document.addEventListener('selectstart', e => e.preventDefault());
        }
    }

    // --- Initialization ---
    function init() {
        blockEvents();

        // Periodic detection
        setInterval(detectDevTools, config.detectionInterval);

        // Immediate check
        setTimeout(detectDevTools, 500);

        console.log('🛡️ Advanced Console Blocker Active');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})(window);
