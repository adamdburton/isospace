function StateManager(gamemanager)
{
	this.gamemanager = gamemanager;
	
	this.states = [];
	
	this.currentState = null;
	this.lastState = null;
}

StateManager.prototype.create = function(name)
{
	this.states[name] = new window[name + 'State'](this);
}

StateManager.prototype.switchTo = function(name)
{
	this.lastState = this.currentState;
	this.currentState = name;
}

StateManager.prototype.update = function()
{
	if (!this.currentState) { return; }
	
	this.states[this.currentState].update();
}

StateManager.prototype.draw = function(_2d, delta)
{
	if (!this.currentState) { return; }
	
	this.states[this.currentState].draw(_2d, delta);
}