//
/*
    SnapAR - Interactive Grid
    Copyright (C) 2022 Sander Veenhof

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/

//@input SceneObject scenery

//@input SceneObject item
//@input Asset.Material mat

//@input Component.Text state
//@input Component.Text debug
//@input Component.Text list

//@input SceneObject cam

//@input Component.AudioComponent au

//@input SceneObject playercontainer

//@input Asset.AudioTrackAsset[] tracks

//@input SceneObject debugs
//@input SceneObject buttons

//@input SceneObject buttons2


script.buttons2.enabled = false;

var mute = true;

var fademodus = "off";

var startmodus = ""
var leavemodus = "";
var entermodus = "";
var wipemodus = "";
var delaymodus = "";

var colormode = "palet";
var sizemode = "bigsmall"; // or: one

var paletc = 0; // palet chosen

var actions = 0;

var mode ="";

f= 22;  

invis = 0;

function setmode(mode) {
      
    print("mode:"+mode);
    
    if (mode == "test") {
        
        f= 22;
        gridmodus = "random";    // positioning
        startmodus = "invisible";   // color
        leavemodus = "none";
        delaymodus = "fall";
        wipemodus = "wipe";
       

        entermodus = "";
        
        invis = 0;
        
        delaydelay=3;
        wipedelay = 10;
        // colormode = "random";
        
    } else if (mode == "entrance") {
        
        f= 22;
        appearmodus = "some";
        entermodus = "hit";
        
        gridmodus = "";    // some = positioning some
        startmodus = "invisible";   // color
        leavemodus = "none";
        delaymodus = "fall";
        wipemodus = "wipe";
       
        paletc = 2;
        invis = 0.0;
       
        colormode = "palet";
        
    } else if (mode == "party") {
        
        startmodus = "random";
        leavemodus = "delay";
        delaymodus = "fall";
        wipemodus = "wipe";
        
    } else if (mode == "wpp") {
        
        f= 12;  // 22

        sizemode = "one";
        startmodus = "invisible";
        leavemodus = "none";
        delaymodus = "none";
        wipemodus = "none";
        colormode = "palet";
        paletc = 4;
    
    
    } else if (mode == "wipe") {
        
        colormode = "random";
        delaymodus = "fall";
        startmodus = "invisible";
        leavemodus = "leave";
        wipemodus = "wipe";
        
    } else if (mode == "grid") {
        
        f= 22;
        gridmodus = "random";    // positioning
        startmodus = "visible";   // color
        leavemodus = "none";
        delaymodus = "none";
        wipemodus = "repos";
       
        fademodus = "fade";
        
        entermodus = "hit";
        
        invis = 0;
        
        delaydelay=3;
        wipedelay = 10;
        colormode = "palet";
        
        paletc=5;
        
    } else if (mode == "leave") {
        
        delaymodus = "none";
        wipemodus = "none";
        
    } else if (mode == "kill") {
        
        entermodus = "hit";
        delaymodus = "none";
        wipemodus = "none";
        
    }
    
    print("mode set");
}

// setmode("test");

var played = new Array();  

script.item.enabled = false;


sc0 = new vec3(0.02, 0.02, 0.02);

var scores = new Array();
var lastmoments = new Array();
scores[0]=0;
scores[1]=0;

var sec = 0;

var wipesec = -1;

if (global.deviceInfoSystem.isEditor()) {
    
    isEditor = true;
} else {
    isEditor = false;
}


if (isEditor) {
    width = 10;
    height = 18;
    len = 5;
} else {
    width = 20;
    height = 20;
    len = 15;
    
}

widthmid = width/2;
heightmid = height/2;
lenmid = len / 2;

var objs = new Array();

/*
var scales = new Array();
var cols = new Array();
var states = new Array();
var types = new Array();
var positions = new Array();
*/

var palet = new Array();

var palets = new Array();

palets[0]=pal(0);
palets[1]=pal(1);
palets[2]=pal(2);
palets[3]=pal(3);
palets[4]=pal(4);
palets[5]=pal(5);


function pal(arg) {

    var palet = new Array();
    
    switch(arg) {
        
        case 0:
        palet[0] = new vec4(1,0,0,1);
        palet[1] = new vec4(1,0,0,1);
        palet[2] = new vec4(1,0,0,1);
       
       
        break;
        
        case 1:
        
        palet[0] = new vec4(255,208,62,1);
        palet[1] = new vec4(122,196,204,1);
        palet[2] = new vec4(106,182,95,1);
        palet[3] = new vec4(51,72,49,1);
        palet[4] = new vec4(226,140,66,1);
        
        break;
        
        case 2:
        
        palet[0] = new vec4(6,19,101,1);
        
        palet[0] = new vec4(0,255,248,1);
        palet[1] = new vec4(238,78,175,1);
        palet[2] = new vec4(241,150,211,1);
        palet[3] = new vec4(205,31,133,1);
        palet[4] = new vec4(83,9,101,1);
        palet[5] = new vec4(6,19,101,1);
        
        palet[6] = new vec4(83,9,101,1);
        
        
        break;
        
        case 3:
         palet[0] = new vec4(0,255,248,1);
            palet[1] = new vec4(238,78,175,1);
            palet[2] = new vec4(241,150,211,1);
            palet[3] = new vec4(205,31,133,1);
            
           
        break;
        
        case 4:
        
         palet[0] = new vec4(6,19,101,1);
            palet[1] = new vec4(83,9,101,1);
        
           
        break;
     
        case 5:
        
         palet[0] = new vec4(250,210,54,1);
        palet[1] = new vec4(230,59,56,1);
        palet[2] = new vec4(230,59,150,1);
        palet[3] = new vec4(66,34,39,1);
        palet[4] = new vec4(237,154,98,1);
        
        break;
    }
      
    for (i=0;i<palet.length;i++) {
        col = palet[i];
        newcol = new vec4(col.r/255,col.g/255,col.b/255,1);
        palet[i]=newcol;
        
    }
    
    return palet;
}


var scalings = new Array();
scalings[0]=new vec3(1,1,1);
scalings[1]=new vec3(2,2,2);

var i =0;


var startpos = script.cam.getTransform().getWorldPosition();

var timeouts = new Array();

itempos = script.item.getTransform().getWorldPosition();

var farposx = itempos.x;
var farposz = itempos.z;
var groundy = -150;

var wipedelay = 5;
var delaydelay = 2;

var total = width*height*len;
print("total:"+total);

var lastsec = -1;

state = "wait";

var t = 0;


var curr=-1;
var followup = -1; 

var moments = new Array();
var events = new Array();
var hits = new Array(); // hitted objects
var hitnumbers = new Array();

var resetting = false;

var processed = 0;

var maxitems = 700;

var processes = new Array();

// var scores = new Array();


var states = new Array();

// width / height / len
var gridarray = new Array();

function init() {

    prepare();
    
    gridi=0;

    x=0;
    y=0;
    z=0;
    
    print("init done");
    
}

init();

mainstart();

function addSphere(type) {
    
    // print(i+" x:"+x+" y:"+y+" z:"+z);
    objs[gridi] = script.scenery.copyWholeHierarchy(script.item);
    
    objs[gridi].pending = "";
    
    alpha = invis;
    
    if (colormode == "palet") {
        
       r = Math.floor(Math.random()*palets[paletc].length);
       col = palets[paletc][r];
       r=col.r;
       g=col.g;
       b=col.b;
        
    } else if (colormode == "random") {
        
        
    } else if (colormode == "gradient") {
    
        r = 0.5*(1+ Math.sin(Math.PI*2*(x%15)/15) );
        g = 0.5*(1+ Math.sin(Math.PI*2*(y%13)/15) );
        b = 0.5*(1+ Math.sin(Math.PI*2*(z%27)/15) );
    
    }  else if (colormode == "dark") {
        
        r=1;
        g=0;
        b=0;
    }
      
    
    if (startmodus == "invisible") {
        
       alpha =  invis;
    
    } else if (startmodus == "visible") {
        
       alpha = 1;
        
    } else if (startmodus == "trans") {
        
       alpha = 0.1;
        
    }
    
    if (gridmodus == "some") {
       
        r= Math.random();
        
        if (r>0.97) {
            
            alpha=1;
        } else {
            
            alpha=0;
        }
    } 

    
    
    if (type == "big") {
        alpha = 1;
    }
    
    if (type == "show") {
        alpha = 1;
        
    }
    
    col = new vec4(r,g,b,alpha);
    
    objs[gridi].col = col;
    
    newmaterial = script.mat.clone();

    objs[gridi].getFirstComponent("Component.RenderMeshVisual").clearMaterials();
    objs[gridi].getFirstComponent("Component.RenderMeshVisual").addMaterial(newmaterial);
    objs[gridi].getFirstComponent("Component.RenderMeshVisual").getMaterial(0).mainPass.baseColor = objs[gridi].col;
   
    transf = objs[gridi].getTransform();
        
    posx = farposx+(x- (len/2) )*f;
    posy= groundy+ f * y;
    posz= farposz+(z- (width/2) )*f;
    
    pos = new vec3(posx,posy,posz);
    
    objs[gridi].pos = pos;
    
    transf.setWorldPosition(pos);
    
    if (type == "big") {
        
        sc=scalings[1];
    } else {
        sc=scalings[0];
    }


    /*
    if (sizemode == "one") {
        
        sc=scalings[0];
        
    } else if (sizemode == "bigsmall") {
        
        r= Math.random();
        
        if (r>0.95) {
            
            sc=scalings[1];
        } else {
            sc=scalings[0];
        }
        
    }
    */
    
    objs[gridi].scaling=sc;
    
    transf.setLocalScale(sc);
     
    
    //print(p+" / "+guide.name);
    collider = objs[gridi].getComponent("Physics.ColliderComponent");
    
    // guideCollision is a function()
    collider.onOverlapEnter.add(coll.bind(objs[gridi]));
    
    collider.onOverlapExit.add(leave.bind(objs[gridi]));
    
    
    objs[gridi].name = "item"+gridi;
    objs[gridi].enabled=true;
     
    objs[gridi].spheretype = "unknown";
    

}


function randomize(randomamount) {
    
    // positionx positiony
    x = 0;
    y = 0;
    z = 0;
    
    
    for (randoms=0;randoms<randomamount;randoms++) {
        
        print("R:"+randoms);
        rx = Math.floor(4+Math.random()*4);
        ry = Math.floor(4+Math.random()*4);
        rz = Math.floor(4+Math.random()*4);
    
        
        x = (x + rx)%width;
        y = (y + ry)%height;
        z = (z + rz)%len;
        
        // print("try:"+x+","+y+","+z);
        
        available = true;
        
        for(ax=-1;ax<=1;ax++) {
            for(ay=-1;ay<=1;ay++) {
                for(az=-1;az<=1;az++) {
                    
                    // checkx
                    cx = x + ax;    // area spacingx
                    cy = y + ay;
                    cz = z + az;
                    
                    summ = cx+"-"+cy+"-"+cz;
                    if (gridarray[summ]) {
                        available = false;
                        
                    };
                }
            }
        }
        
        if (available) {
            addSphere("big");
            
            // sx spacex spacey etc
            for(ax=-1;ax<=1;ax++) {
                for(ay=-1;ay<=1;ay++) {
                    for(az=-1;az<=1;az++) {
                        
                        // register x
                        rx = x + ax;
                        ry = y + ay;
                        rz = z + az;
                        
                        summ = rx+"-"+ry+"-"+rz;
                        // print("R:"+summ);
                        gridarray[summ] = true;
                    }
                }
            }
        }
        
                
    }
}


function createGrid(a) {

    c = true;   // continue
    while (c) {
        
        summ = x+ "-"+y+"-"+z;
        
        if (!gridarray[summ]) {
            
            skip = false;
            if (fademodus == "fade") {
                
                xdist = Math.abs(x-widthmid);
                ydist = Math.abs(y-heightmid);
                zdist = Math.abs(z-lenmid);
                
                dist = Math.sqrt(xdist*xdist+ydist*ydist+zdist*zdist);
                
                decide = Math.random()*dist/heightmid;
                
                if (decide>0.5) {
                    skip=true;
                    print("skip:"+xdist+" / "+ydist+" / "+zdist);
                }
                
            }
            if (!skip) {
                addSphere("normal");
                gridarray[summ] = true;
            }
            
            //print(summ);
        } else {
            // for debuggin:
            // addSphere("show");
        }
        
        x++;
        if (x>len) {
            x=0;
            z++;
            if (z>width) {
                z=0;
                y++;
                if (y>height) {
                    c= false;
                }
            }
        }
        
        gridi++;
        a--;
           if (a<0) {
                
                c=false;
           }
       
     }
        
}

function reset(){
    
    for (i=0;i<5;i++) {
        scores[i]=0;
    }
}


script.createEvent("UpdateEvent").bind(function (e) {
    
    dt = getDeltaTime();

    sec +=dt;
   
    for (i=0;i<timeouts.length;i++) {
        timeouts[i]=timeouts[i]-dt;
    }
    
    campos = script.cam.getTransform().getWorldPosition();
    
    /* WALK SCRIPT
    
    // when reaching 400 then move the whole
    // scenery there:
    dist = startpos.distance(campos);
    if (dist > 400) {
        
        startpos = campos;
        script.scenery.getTransform().setWorldPosition(campos);
        
    }
    */
      
    
    if (state == "wait") {
        
        
    } else if (state == "init") {
        
        if (gridi<total) {
            
            createGrid(50);
            
            perc = Math.floor(gridi/total*100);
            
            script.state.text = ""+perc+"% "; // +x+"GRID: "+total+"/"+gridi;
        
        } else {
            script.state.text = "";
            
            //script.hidden.enabled = false;
            
            state = "reset";
           
            // script.au.play(1);
            script.state.text = "";
        }
        
    } else if (state == "reset") {
        
        reset();      
        state = "followup";
        
    } else if (state == "followup") {
        
        if (hits.length>0) {
            memory(100);
        }
        
        t++;
        
        
    }
   
});


function coll (e) {
   
    sceneobj = e.overlap.collider.getSceneObject();
    
    sceneobjname = sceneobj.name.substring(0,4);
    
    itemname = this.name.substring(0,4);
    
    itemnum = parseInt(this.name.substring(4,10) );
  
    /*
    if (sceneobjname == "hidden") {
        
        if (objs[itemnum].spheretype != "wpp") {
            objs[itemnum].spheretype = "wpp";
            r = Math.floor(Math.random() * palets[3].length);
            col = palets[3][r];
            objs[itemnum].col = col;
             
            objs[itemnum].getFirstComponent("Component.RenderMeshVisual").getMaterial(0).mainPass.baseColor = col;
                            
            transp(this,0);
        }
        
    }
    */
    
    
    if (itemname != "item") {
            
        return;
    }
    
    if (sceneobjname != "guid") {
        return;
    }
   
    
    par = sceneobj.getParent().name;
    
    if (objs[itemnum].currstate=="falling") {
       
        return;
    
    } else if (objs[itemnum].currstate=="on") {
        
        return;
        
    } else {
        
        
       if (entermodus == "hit") {
          
             //objs[itemnum].getFirstComponent("Physics.ColliderComponent").enabled = false;
             //objs[itemnum].getFirstComponent("Physics.BodyComponent").enabled = true;
            
        }
        
       //transp(objs[itemnum],1);
       //objs[itemnum].currstate="on";
        
    }
   
    
    var hand = false;
    
    if ( (sceneobj.name=="guide_hand_r_collider") || (sceneobj.name=="guide_hand_l_collider") ) {
             
        hand = true;
        
    } else {
        
        //return;
        
    }
   
    
}
    

function leave (e) {
    
    
    if (state == "init") {
        return;
    }
    
    sceneobj = e.overlap.collider.getSceneObject();
    
    sceneobjname = sceneobj.name.substring(0,4);
    
    itemname = this.name.substring(0,4);
    
    itemnum = parseInt(this.name.substring(4,10) );
   
    if (itemname != "item") {
            
        return;
    }
    
    if (sceneobjname != "guid") {
        return;
    }
    
    if (objs[itemnum].currstate=="falling") {
        
        return;
        
    } else if (objs[itemnum].pending=="pending") {
        
        return;
        
    }
    
    curr++;
    
    if (curr == maxitems) {
        resetting=true;
        curr = 0;
        
    }
    
    if (objs[itemnum].currstate != "on") {
        objs[itemnum].currstate = "on";
        transp(objs[itemnum],1);
    }
    
    
    moments[curr]=sec;
    hits[curr]=this;
    events[curr]="leave";
    
    hitnumbers[curr]=itemnum;
    
    objs[itemnum].eventnum = curr;
    objs[itemnum].pending = "pending";
    
    actions++;
    
}

function memory(a) {
   
    // amount of items to check: a
    
    c = true;   // continue
    
    while (c) {
       
        if (resetting) {
            
            if (followup == maxitems-1) {
                
                if (processed<maxitems-1) {
                    found = false;
                    while(!found && (processed<maxitems-1) ) {
                        
                        if (events[processed]!="") {
                            found = true; // exits the while
                        } else {
                            processed++;
                        }
                        
                    }
                    
                    if (found == false) {
                        resetting = false;
                        processed=0;
                        followup=-1;
                    } else {
                        followup=processed;
                    }
                    
                    
                } else {
                    
                    followup=processed;
                
                }
                
               
            } 
            
           
        } else {
          
           if (followup == curr) {
                
                if (processed<curr) {
                    found = false;
                    while(!found && (processed<curr) ) {
                        
                        itemnum = hitnumbers[processed];
                        
                        if (events[processed]!="") {
                            found = true; // exits the while
                        } else {
                            processed++;
                        }
                        
                    }
                } else {
                    
                }
                followup=processed;
                
            } 
            
        } 
        
        script.debug.text = resetting+" p:"+processed+" f:"+followup+" curr:"+curr;
    
        if (followup>-1) {
            itemname = hits[followup].name;
            
            itemnum = parseInt(itemname.substring(4,10));
            
             
            delayed = sec - delaydelay;
            
            wipe = sec - wipedelay;
           
            if (events[followup] !="") {
                
                if (moments[followup]<wipe) {
                    
                    actions--;
                    
                    objs[itemnum].pending="";
                    events[followup]="";    // done, so clear the entry
                    
                    objs[itemnum].currstate="off";
                   
                    if (wipemodus != "none") {
                        
                        objs[itemnum].getFirstComponent("Physics.ColliderComponent").enabled = true;
                        objs[itemnum].getFirstComponent("Physics.BodyComponent").enabled = false;
               
                        // put back
    
                        pos = objs[itemnum].pos;
                        objs[itemnum].getTransform().setWorldPosition(pos);
                    }
                    
                    wipesec = Math.floor(moments[followup]);
                    
                    if (wipemodus == "none") {
                        
                        
                    } else if (wipemodus == "wipe") {
                            
                        transp(hits[followup],invis);
                
                    } else if (wipemodus == "fall") {
                    
                             
                    }
                    
                    
                } else if (moments[followup]<delayed) {
                        
                    if (objs[itemnum].pending=="pending") {
                        
                        if (events[followup] == "leave") {
                            
                            if (delaymodus == "fall") {
                              
                                objs[itemnum].currstate = "falling";
                                hits[followup].getFirstComponent("Physics.ColliderComponent").enabled = false;
                                hits[followup].getFirstComponent("Physics.BodyComponent").enabled = true;
                               
                            } 
                            
                            
                        }
                    }
                    
                }
               
            }
            
           
        }
            
        
        if (resetting) {
            if (followup<maxitems) {
                followup++;
            }
        } else {
            
            if (followup<curr) {
                followup++;
            }
            
        }
        
        
        a--;
       
        //
        if (a<0) {
            c=false;
        }
    }
        
    
}

function prepare() {
    
    //playeramount = script.playercontainer.getChildrenCount();
    //playeri=0;
        
}

function transp(obj,t) {
    
    col = obj.getFirstComponent("Component.RenderMeshVisual").getMaterial(0).mainPass.baseColor;

    transcol = new vec4(col.r,col.g,col.b,t);
    // black test
    //transcol = new vec4(0,0,0,t);
    
    obj.getFirstComponent("Component.RenderMeshVisual").getMaterial(0).mainPass.baseColor = transcol;
    
}

soundnum  =0;

sountTimeout = 0;

function snd(arg) {
  
    if (mute) {
        return;
    }
    
    itemnum =0;
    
    switch(arg) {
        
        case "boundary":
        num=0;
        break;
        
        case "player1":
        num=1;
        break;
        
        case "player2":
        num=2;
        break;
        
    }
    
    player =script.playercontainer.getChild(playeri).getComponent("Component.AudioComponent");
    player.audioTrack = script.tracks[itemnum];
    
    player.play(1);
    
    playeri++;
    if (playeri==playeramount) {
        playeri=0;
    }
    
}

function mainstart() {
    
    setmode("entrance");
    
    //randomize(4);

    delaydelay=1;
    wipedelay = 4.5;
    
    go();
    
}



function go(arg) {
    
    x=0;
    y=0;
    z=0;
        
    for(c=0;c<script.buttons.getChildrenCount();c++) {
       script.buttons.getChild(c).getComponent("Component.Image").mainPass.baseColor = new vec4(1,1,1, 0);
    }
   
    //script.buttons.enabled = false;
   
    state = "init";
    
}
