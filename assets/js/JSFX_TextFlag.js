/*******************************************************************
*
* File    : JSFX_TextFlag.js © JavaScript-FX.com
*
* Created : 2001/03/17
*
* Author  : Roy Whittle www.Roy.Whittle.com
*           
* Purpose : To create an animated textflag that follows the cursor
*
* History
* Date         Version        Description
*
* 2001-03-17	2.0		Converted for javascript-fx
***********************************************************************/
if(!window.JSFX)
	JSFX = new Object();

JSFX.TextFlag = function(textStr, textColor, textFont,  textSize)
{
	if(textSize==null || textSize==0) textSize=1;

	this.gap   		= 3*textSize;
	this.angle		= 0;
	this.radiusX 	= 2;
	this.radiusY 	= 5;
	this.followMode 	= 0;

	this.charArray=new Array();

	for(i=0 ; i<textStr.length ; i++){
		this.charArray[i] = new JSFX.Layer("<FONT COLOR='"+textColor
						+ "' SIZE='" + textSize
						+ "' FACE='" + textFont
						+ "'>" 
						+ textStr.charAt(i)
						+ "</FONT>");
		this.charArray[i].show();
	}
}
JSFX.TextFlag.prototype.animate = function()
{
	this.angle += 0.4;
	locX = this.radiusX*Math.cos(this.angle);	
	locY = this.radiusY*Math.sin(this.angle);	

	for(i=this.charArray.length-1; i>0 ; i--){
		this.charArray[i].moveTo(this.charArray[i-1].getX()+this.gap, this.charArray[i-1].getY());
	}

	if(this.followMode == 0)
	{
		var x1=this.charArray[0].getX();
		var y1=this.charArray[0].getY();
		x1 += ((JSFX.Browser.mouseX-x1)/10) +locX+2;
		y1 += ((JSFX.Browser.mouseY-y1)/10) +locY-2;
		this.charArray[0].moveTo(x1, y1);
	}
	else
		this.charArray[0].moveTo(JSFX.Browser.mouseX+(locX+20), JSFX.Browser.mouseY+(locY-10));
}


JSFX.MakeTextFlag = function(textStr, textColor, textFont,  textSize)
{
	var textFlag = new JSFX.TextFlag(textStr, textColor, textFont,  textSize);
	JSFX.MakeTextFlag.flags[JSFX.MakeTextFlag.flags.length] = textFlag;

	if(!JSFX.MakeTextFlag.theTimer)
		JSFX.MakeTextFlag.theTimer = setInterval("JSFX.MakeTextFlag.animate()", 50)
	return(textFlag);
}
JSFX.MakeTextFlag.flags= new Array();
JSFX.MakeTextFlag.animate = function()
{
	var i;
	for(i=0 ; i<JSFX.MakeTextFlag.flags.length ; i++)
		JSFX.MakeTextFlag.flags[i].animate();
}

/*** If no other script has added it yet, add the ns resize fix ***/
if(navigator.appName.indexOf("Netscape") != -1 && !document.getElementById)
{
	if(!JSFX.ns_resize)
	{
		JSFX.ow = outerWidth;
		JSFX.oh = outerHeight;
		JSFX.ns_resize = function()
		{
			if(outerWidth != JSFX.ow || outerHeight != JSFX.oh )
				location.reload();
		}
	}
	window.onresize=JSFX.ns_resize;
}
