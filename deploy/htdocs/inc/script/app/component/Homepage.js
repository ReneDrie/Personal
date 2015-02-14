define(["require", "exports"], function (require, exports) {
    var Homepage = (function () {
        function Homepage(element) {
            this.element = element;
            this._timeline = new TimelineLite({
                paused: true
            });
            this.animateLetters();
            this.animateLines();
            this._timeline.to(this.element.getElementsByClassName('sub-title')[0], 0.8, { opacity: 0 }, Homepage.STARTDELAY);
        }
        Homepage.prototype.animateLetters = function () {
            var _this = this;
            Array.prototype.forEach.call(this.element.getElementsByClassName('letter'), function (letter, i) {
                var tl = new TimelineLite;
                Array.prototype.forEach.call(letter.getElementsByClassName('sprite'), function (sprite, j) {
                    var startTime = Math.random() / 6;
                    tl.to(sprite, 1 + (Math.random() / 5), {
                        x: (window.innerWidth / 2) * Math.random(),
                        y: (window.innerHeight * Math.random()) - (window.innerHeight / 2),
                        rotation: (180 * Math.random()) - 90
                    }, Math.random() / 6);
                    tl.to(sprite, 0.6, {
                        opacity: 0,
                        ease: Linear.easeNone
                    }, startTime);
                });
                _this._timeline.add(tl, Homepage.STARTDELAY + (i * 0.1));
            });
        };
        Homepage.prototype.animateLines = function () {
            var linesTl = new TimelineLite;
            var lines = this.element.getElementsByClassName('lines')[0];
            Array.prototype.forEach.call(lines.getElementsByClassName('sprite'), function (sprite, i) {
                var startTime = Math.random() / 6;
                linesTl.to(sprite, 1 + (Math.random() / 5), {
                    x: (window.innerWidth / 2) * Math.random(),
                    y: (window.innerHeight * Math.random()) - (window.innerHeight / 2),
                    rotation: (360 * Math.random()) - 180
                }, Math.random() / 6);
                linesTl.to(sprite, 0.6, {
                    opacity: 0,
                    ease: Linear.easeNone
                }, startTime);
            });
            this._timeline.add(linesTl, Homepage.STARTDELAY);
        };
        Homepage.prototype.update = function (progress) {
            this._timeline.seek(Math.min(this._timeline.duration(), this._timeline.duration() * (progress * 3)));
        };
        Homepage.prototype.destruct = function () {
        };
        Homepage.STARTDELAY = 0.1;
        return Homepage;
    })();
    return Homepage;
});
