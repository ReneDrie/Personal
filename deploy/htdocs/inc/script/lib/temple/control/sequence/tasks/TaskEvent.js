var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "lib/temple/events/BaseEvent"], function (require, exports, BaseEvent) {
    var TaskEvent = (function (_super) {
        __extends(TaskEvent, _super);
        /**
         * @param type the type of the event
         * @param task the task that <i>originally</i> generated the event (explicitly, instead of using event.target)
         * @param message an optional message, mainly used with error event types.
         */
        function TaskEvent(type, task, message) {
            if (message === void 0) { message = null; }
            _super.call(this, type);
            this.task = task;
            this.message = message;
        }
        TaskEvent.DONE = "TaskEvent.done";
        TaskEvent.START = "TaskEvent.start";
        TaskEvent.ERROR = "TaskEvent.error";
        TaskEvent.UPDATE = "TaskEvent.update";
        return TaskEvent;
    })(BaseEvent);
    return TaskEvent;
});
