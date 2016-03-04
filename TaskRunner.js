"use strict"
class TaskRunner {
  constructor(tasks) {
    this.tasks = tasks ||[];
    this.status = 0;
    this.indicator = [];
  }
  _taskFinished(cb){
    this.indicator.pop();
    if(this.indicator.length == 0){
      cb();
    }
  }
  run(){
    var tasks = this.tasks;
    var cb = cb||function(){};
    var result = null;
    var self = this;
    return new Promise(function(resolve,reject){
      for(var i = 0;i<tasks.length;i++){
        this.indicator.push(true);
        result = tasks[i].call();
        if(result instanceof Promise ){
          result.then(function(){
            self._taskFinished(resolve);
          })
        }else{
          self._taskFinished(resolve);
        }
      }
    });
  }
  addTask(task){
    this.tasks.push(task);
  }
}
module.exports = TaskRunner;
