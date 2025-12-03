// Console Blocker Main
(function (window) {
    'use strict';

    window.ConsoleBlocker = window.ConsoleBlocker || {};
    const config = window.ConsoleBlocker.config;
    const detectors = window.ConsoleBlocker.detectors;
    const protections = window.ConsoleBlocker.protections;
    const ui = window.ConsoleBlocker.ui;

    // State tracking
    let state = {
        devToolsOpen: false,
        detectionCount: 0,
        lastCheck: 0,
        initialized: false
    };

    // Local Storage Key
    const STORAGE_KEY = 'cb_detection_state';

    const main = {
        // Main detection function
        detectDevTools: function () {
            if (!config.enableDevToolsDetection) return;

            // Check persistence first
            if (config.enablePersistence && localStorage.getItem(STORAGE_KEY) === 'detected') {
                state.devToolsOpen = true;
                ui.handleDetection({ 'persistence': true });
                return;
            }

            try {
                let positiveDetections = 0;
                const methodResults = {};
                const methodNames = Object.keys(detectors);

                methodNames.forEach(methodName => {
                    try {
                        const result = detectors[methodName]();
                        methodResults[methodName] = result;
                        if (result) {
                            positiveDetections++;
                        }
                    } catch (e) {
                        // Ignore method errors
                    }
                });

                // Require multiple methods to agree (reduces false positives)
                // If debug mode, 1 method is enough
                const threshold = config.debug ? 1 : 2;
                const isDetected = positiveDetections >= threshold;

                if (isDetected && !state.devToolsOpen) {
                    state.detectionCount++;

                    if (state.detectionCount >= config.maxDetectionAttempts) {
                        state.devToolsOpen = true;

                        // Save state if persistence enabled
                        if (config.enablePersistence) {
                            localStorage.setItem(STORAGE_KEY, 'detected');
                        }

                        // Dispatch custom event
                        window.dispatchEvent(new CustomEvent('devtools-detected', {
                            detail: { methods: methodResults }
                        }));

                        ui.handleDetection(methodResults);
                    }
                } else if (!isDetected && state.detectionCount > 0) {
                    // Gradually reduce detection count if not detected
                    state.detectionCount = Math.max(0, state.detectionCount - 1);
                    if (state.detectionCount === 0) {
                        state.devToolsOpen = false;
                    }
                }
            } catch (e) {
                // Fail silently
            }
        },

        // Throttled detection for events
        throttledDetection: function () {
            const now = Date.now();
            if (now - state.lastCheck > config.throttleInterval) {
                state.lastCheck = now;
                main.detectDevTools();
            }
        },

        // Initialize all protections
        initialize: function () {
            if (state.initialized) return;

            // Keyboard shortcuts
            document.addEventListener('keydown', protections.blockKeyboardShortcuts, { passive: false });
            document.addEventListener('keyup', protections.blockKeyboardShortcuts, { passive: false });

            // Context menu
            document.addEventListener('contextmenu', protections.blockContextMenu, { passive: false });

            // Text selection
            document.addEventListener('selectstart', protections.blockTextSelection, { passive: false });
            document.addEventListener('dragstart', protections.blockTextSelection, { passive: false });

            // Additional protections
            protections.setupAdditionalProtections();

            // Dev tools detection
            if (config.enableDevToolsDetection) {
                // Initial detection after delay
                setTimeout(this.detectDevTools.bind(this), 1000);

                // Periodic detection
                setInterval(this.detectDevTools.bind(this), config.detectionInterval);

                // Event-based detection (throttled)
                ['resize', 'focus', 'blur'].forEach(event => {
                    window.addEventListener(event, this.throttledDetection.bind(this), { passive: true });
                });
            }

            state.initialized = true;
            console.log('🛡️ Console Blocker initialized');
        }
    };

    // Expose main module
    window.ConsoleBlocker.main = main;

    // Start initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main.initialize.bind(main));
    } else {
        main.initialize();
    }

})(window);
