// Console Blocker UI
(function (window) {
    'use strict';

    window.ConsoleBlocker = window.ConsoleBlocker || {};
    const config = window.ConsoleBlocker.config;

    window.ConsoleBlocker.ui = {
        // Handle detection action
        handleDetection: function (methodResults) {
            const detectedMethods = Object.keys(methodResults).filter(key => methodResults[key]);

            // Log detection if debug
            if (config.debug) {
                console.log('DevTools detected via:', detectedMethods);
            }

            // Blur page content
            if (config.enableBlur) {
                document.body.style.filter = 'blur(10px)';
                document.body.style.pointerEvents = 'none';
            }

            // Show warning overlay
            if (config.enableWarningOverlay) {
                this.showWarningOverlay(detectedMethods.length);
            } else {
                alert('🚫 개발자 도구가 감지되었습니다!\n보안을 위해 페이지 접근이 제한됩니다.');
            }
        },

        // Create warning overlay
        showWarningOverlay: function (detectionCount) {
            // Check if already exists
            if (document.getElementById('dev-tools-warning')) return;

            const createOverlay = () => {
                const overlay = document.createElement('div');
                overlay.id = 'dev-tools-warning';
                overlay.innerHTML = `
                    <div class="cb-overlay-content">
                        <div>
                            <h1 class="cb-title">⚠️ 접근 차단됨</h1>
                            <p class="cb-message">개발자 도구가 감지되었습니다.</p>
                            <p class="cb-submessage">보안을 위해 페이지 접근이 제한됩니다.</p>
                            <p class="cb-footer">
                                이 페이지를 정상적으로 이용하려면 개발자 도구를 닫아주세요.
                            </p>
                            ${config.debug ? `<div class="cb-debug">감지된 방법: ${detectionCount}개</div>` : ''}
                        </div>
                    </div>
                `;
                document.body.appendChild(overlay);
            };

            createOverlay();

            // Persistence: Re-add if removed
            const observer = new MutationObserver((mutations) => {
                if (!document.getElementById('dev-tools-warning')) {
                    createOverlay();
                }
            });

            observer.observe(document.body, { childList: true, subtree: true });
        }
    };
})(window);
