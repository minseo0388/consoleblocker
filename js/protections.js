// Console Blocker Protections
(function (window) {
    'use strict';

    window.ConsoleBlocker = window.ConsoleBlocker || {};
    const config = window.ConsoleBlocker.config;

    // Blocked keyboard shortcuts
    const blockedShortcuts = [
        // Windows/Linux
        { ctrl: true, shift: true, key: 'C' },
        { ctrl: true, shift: true, key: 'I' },
        { ctrl: true, shift: true, key: 'J' },
        { ctrl: true, shift: true, key: 'K' },
        { ctrl: true, key: 'U' },

        // Mac
        { meta: true, alt: true, key: 'C' },
        { meta: true, alt: true, key: 'I' },
        { meta: true, alt: true, key: 'J' },
        { meta: true, alt: true, key: 'K' },
        { meta: true, key: 'U' },

        // Function keys
        { key: 'F12' },
        { key: 'F1' }
    ];

    window.ConsoleBlocker.protections = {
        // Keyboard shortcut blocker
        blockKeyboardShortcuts: function (event) {
            if (!config.enableKeyboardShortcuts) return;

            const { key, ctrlKey, shiftKey, altKey, metaKey } = event;

            for (const blocked of blockedShortcuts) {
                if (blocked.key === key &&
                    (blocked.ctrl === undefined || blocked.ctrl === ctrlKey) &&
                    (blocked.shift === undefined || blocked.shift === shiftKey) &&
                    (blocked.alt === undefined || blocked.alt === altKey) &&
                    (blocked.meta === undefined || blocked.meta === metaKey)) {

                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                }
            }
        },

        // Block context menu
        blockContextMenu: function (event) {
            if (!config.enableContextMenu) {
                event.preventDefault();
                return false;
            }
        },

        // Block text selection
        blockTextSelection: function (event) {
            if (!config.enableTextSelection) {
                event.preventDefault();
                return false;
            }
        },

        // Setup additional protection measures
        setupAdditionalProtections: function () {
            // Disable common bypass methods
            try {
                // Disable eval
                window.eval = function () {
                    throw new Error('eval is disabled');
                };

                // Monitor console methods
                const consoleMethods = ['log', 'warn', 'error', 'info', 'debug'];
                consoleMethods.forEach(method => {
                    const original = console[method];
                    console[method] = function () {
                        // Allow console in debug mode
                        if (!config.debug) {
                            // Trigger detection check if console is used
                            if (window.ConsoleBlocker.main && window.ConsoleBlocker.main.detectDevTools) {
                                window.ConsoleBlocker.main.detectDevTools();
                            }
                        }
                        return original.apply(console, arguments);
                    };
                });

                // Disable common debugging functions
                window.debugger = undefined;

            } catch (e) {
                // Ignore errors
            }
        }
    };
})(window);
