
let canvas = null;
let ctx = null;

let gameObjects = [];

window.addEventListener("load", onAllAssetsLoaded);           // needed for websites
document.addEventListener("deviceready", onAllAssetsLoaded);  // needed for Cordova mobile apps

document.write("<div id='loadingMessage'>Loading...</div>");
function onAllAssetsLoaded()
{
 
    document.getElementById('loadingMessage').style.visibility = "hidden";

 
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    playGame(); 
}
Math.radians = function (degrees)
{
    return degrees * Math.PI / 180;
};