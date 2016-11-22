HTMLElement.prototype.clientStyle = function(pseudo){
  if(pseudo===undefined){
    pseudo=null;
  }
  return window.getComputedStyle(this, pseudo);
};
