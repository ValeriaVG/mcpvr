HTMLElement.prototype.hasClass = function(className){

  return this.getAttribute("class").indexOf(className)!==-1;
};
