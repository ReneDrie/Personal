import refdef = require('lib/ReferenceDefinitions');

class Homepage
{
	static STARTDELAY:number = 0.1;

	private _timeline:TimelineLite;

	constructor(public element:HTMLElement)
	{
		this._timeline = new TimelineLite({
			paused: true
		});

		Array.prototype.forEach.call(this.element.getElementsByClassName('letter'), (letter:HTMLElement, i:number) =>
		{
			var tl = new TimelineLite;

			Array.prototype.forEach.call(letter.getElementsByClassName('sprite'), (sprite:HTMLElement, j:number) =>
			{
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

			this._timeline.add(tl, Homepage.STARTDELAY + (i * 0.1));
		});

		var linesTl = new TimelineLite;
		var lines = <HTMLElement>this.element.getElementsByClassName('lines')[0];
		Array.prototype.forEach.call(lines.getElementsByClassName('sprite'), (sprite:HTMLElement, i:number) =>
		{
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
	}

	public update(progress:number):void
	{
		this._timeline.seek(Math.min(this._timeline.duration(), this._timeline.duration() * (progress * 4)));
	}

	public destruct():void
	{

	}

}

export = Homepage;