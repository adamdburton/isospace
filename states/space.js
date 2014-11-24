SpaceState.prototype = new State();

function SpaceState(statemanager)
{
	this.statemanager = statemanager;
	
	this.createObject('Space');
}