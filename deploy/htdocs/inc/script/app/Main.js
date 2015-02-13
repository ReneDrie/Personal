define(["require", "exports", 'app/component/CanvasBackground', 'app/component/Homepage'], function (require, exports, CanvasBackground, Homepage) {
    var Main = (function () {
        function Main() {
            this._progress = 0;
            this.setMailtoLink();
            this._background = new CanvasBackground(document.querySelector('.canvas-background'));
            this._homepage = new Homepage(document.querySelector('.page-home'));
            this._slides = Array.prototype.slice.call(document.querySelectorAll('.page'));
            this.createMainTimeline();
        }
        Main.prototype.setMailtoLink = function () {
            var link = document.querySelector('.mailto');
            link.innerHTML = link.innerHTML.split('').reverse().join('');
            link.setAttribute('href', link.getAttribute('href').split('').reverse().join(''));
        };
        Main.prototype.createMainTimeline = function () {
            var _this = this;
            this._mainTl = new TimelineLite({
                paused: true
            });
            var delay = 0;
            this._slides.forEach(function (element, i) {
                var duration = i == 0 || i == _this._slides.length - 1 ? Main.SINGLE_PAGE_DURATION / 2 : Main.SINGLE_PAGE_DURATION;
                _this._mainTl.to(element, duration, {
                    left: i == _this._slides.length - 1 ? '0%' : '80%',
                    ease: Linear.easeNone,
                    onUpdateParams: ['{self}'],
                    onUpdate: function (timelineItem) {
                        element.style.visibility = 'visible';
                    },
                    onComplete: function () {
                        if (i !== _this._slides.length - 1) {
                            element.style.visibility = 'hidden';
                        }
                    }
                }, delay);
                // Fade in From Left
                if (i !== 0) {
                    _this._mainTl.from(element, Main.SINGLE_PAGE_DURATION * 0.25, { opacity: 0, ease: Linear.easeNone }, delay);
                }
                // Fade out to Right
                if (i !== _this._slides.length - 1) {
                    var extraDuration = i == 0 ? 0.25 : 0.75;
                    _this._mainTl.to(element, Main.SINGLE_PAGE_DURATION * 0.25, { opacity: 0, ease: Linear.easeNone }, delay + (Main.SINGLE_PAGE_DURATION * extraDuration));
                }
                delay += duration - (Main.SINGLE_PAGE_DURATION / 2);
            });
            var scrollHeight = document.body.scrollHeight - window.innerHeight;
            /*
            var draggable:Draggable = Draggable.create(document.body, {
                type: 'scroll',
                edgeResistance: 0.98,
                throwProps: true,
                onDrag: () =>
                {
                    // TODO: See if drag is over the end
                }
            })[0];
    
            draggable.scrollProxy.content.style.height = '100%';
            */
            window.addEventListener('scroll', function () {
                var progress = Math.max(0, Math.min(1, document.body.scrollTop / scrollHeight));
                if (progress !== _this._progress) {
                    _this._mainTl.seek(_this._mainTl.duration() * progress, false);
                    _this._progress = progress;
                    _this._background.setProgress(progress);
                    _this._homepage.update(progress);
                }
            }, false);
            /*
            $(d).on('scroll', () =>
            {
                var progress = $(this.element).scrollTop() / scrollHeight;
                mainTl.seek(mainTl.duration() * progress, false);
    
                //dataManager.canvasBackground.setProgress(progress);
    
                scrollHomepage.update(progress);
            });
            */
        };
        Main.SINGLE_PAGE_DURATION = 4;
        return Main;
    })();
    return Main;
});
