import IEventDispatcher = require("lib/temple/events/IEventDispatcher");

interface ITask extends IEventDispatcher
{
    progress:number;
    total:number;

	execute():void;
}

export = ITask;