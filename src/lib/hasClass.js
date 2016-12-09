HTMLElement.prototype.hasClass = function(className){

  return this.getAttribute("class").test('/\b'+className+'\b/gi');
};
