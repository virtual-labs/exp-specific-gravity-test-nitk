var p=Math.floor(Math.random()*(3));
var screensVal = 0;
var tries = 0;
var specificValue = null;
var qCount = 0;
var varInt = 0;

function checkInputValid(e) {
	e.value = e.value.match(/\d*(\.\d*)?/)[0];
}

// Prompt questions during simulation
//Questions object
var questions = {
	ans1:0,
	options:[],
	nextFunction:function(){},
	// setOptions:function(d1,d2,d3,d4){
		// questions.options = new Array(d1,d2,d3,d4);
	// },
	setOptions:function(d1,d2,d3,d4,d5){
		if(d5 == 0 && d4!=0)
			questions.options = new Array(d1,d2,d3,d4);
		else if(d4 == 0 && d5 == 0)
		{
			questions.options = new Array(d1,d2,d3);
		}
		else 
		{
			questions.options = new Array(d1,d2,d3,d4,d5);
		}
	},
	setAns:function(ans){
		if(simsubscreennum == 8){
			if(soilType == "Fine grained soil")
				questions.ans1 = 3;
			else if(soilType == "Sandy soil")
				questions.ans1 = 2;
		}
		else
		questions.ans1 = ans;
	},
	frameQuestions:function(qun){
		var myDiv  = document.getElementById("question-div");
		var myDiv1 = document.getElementById("divq");
		myDiv.style.visibility = "visible";
		if(simsubscreennum == 8)
			document.getElementById("divq").innerHTML = qun+""+soilType;
		else
			document.getElementById("divq").innerHTML = qun;
		//Create and append select list
		var selectList = document.createElement("select");
		selectList.setAttribute("id", "mySelect");
		selectList.setAttribute("autocomplete", "off");
		// selectList.setAttribute("onchange", "questions.setAnswer()");
		
		var button1 = document.createElement("input");
		button1.setAttribute("onclick","questions.setAnswer(this)");
		button1.setAttribute("type","button");
		button1.setAttribute("value","OK");
		
		// Appending the contents to the division
		myDiv1.appendChild(selectList);
		myDiv1.appendChild(button1);

	//Create and append the options
		for (var i = 0; i < questions.options.length; i++) {
			var opt = document.createElement("option");
			opt.setAttribute("value", questions.options[i]);
			opt.innerHTML = questions.options[i];
			selectList.appendChild(opt);
		}
	},
	setAnswer:function(ev){
		var x = document.getElementById("mySelect");
		var i = x.selectedIndex;
		if(i == 0)
		{
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You have not selected any value";
			document.getElementById("divq").appendChild(dispAns);		
			setTimeout(function(){
				dispAns.innerHTML = "";
			},200);
		}
		else if(i == questions.ans1)
		{
			ev.onclick = "";
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You are right<span class='boldClass'>&#128077;</span> ";
			document.getElementById("divq").appendChild(dispAns);		
			questions.callNextFunction();
		}
		else
		{
			ev.onclick = "";
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You are Wrong<span class='boldClass'>&#128078;</span><br>Answer is: "+x.options[questions.ans1].text;
			document.getElementById("divq").appendChild(dispAns);		
			questions.callNextFunction();
		}
	},
	setCallBack:function(cb){
		nextFunction = cb;
	},
	callNextFunction:function()
	{
		setTimeout(function()
		{
			// document.getElementById("question-div").innerHTML = "";
			document.getElementById("question-div").style.visibility = "hidden";
			nextFunction();
		},800);
	}
}
function navNext()
{
	for(temp=0;temp<=7;temp++)
	{
		document.getElementById("canvas"+temp).style.visibility="hidden";
	}
	simsubscreennum+=1;
	document.getElementById("canvas"+simsubscreennum).style.visibility="visible";
	document.getElementById("nextButton").style.visibility="hidden";
	magic();
}

//-----------------------------------------blink arrow on the next step---------------------------------------------
//blink arrow on the next step
function animatearrow()
{
     if (document.getElementById('arrow1').style.visibility=="hidden")
         document.getElementById('arrow1').style.visibility="visible";
     else
         document.getElementById('arrow1').style.visibility="hidden";
}

//blink machuineval on the next step
function animateVal()
{
     if (document.getElementById('can1-5').innerHTML=="00.01")
         document.getElementById('can1-5').innerHTML="00.00";
     else
         document.getElementById('can1-5').innerHTML="00.01";
}

//stop blinking arrow
function myStopFunction() 
{
     clearInterval(myInt);
     document.getElementById('arrow1').style.visibility="hidden";
}


//animate arrow at position
function animateArrowATPosition(left,top,degg)
{
	document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:"+left+"px; top: "+top+"px; height: 30px; z-index: 10;";
	document.getElementById("arrow1").style.WebkitTransform = "rotate("+degg+"deg)"; 
	 // Code for IE9
	document.getElementById("arrow1").style.msTransform = "rotate("+degg+"deg)";
	 // Standard syntax
	document.getElementById("arrow1").style.transform = "rotate("+degg+"deg)";
}

function magic()
{
	if(simsubscreennum==1)
	{
		
		machineOnTare(nextProceed);			
		
	}
	
	else if(simsubscreennum==2)
	{
		document.getElementById("nextButton").style.visibility="hidden";
		document.getElementById("can1-1").style.visibility="hidden";
		document.getElementById("can1-4").style.visibility="hidden";
		document.getElementById("can1-5").style.visibility="hidden";
		document.getElementById("w1").style.visibility="hidden";
		document.getElementById("w1span").style.visibility="hidden";
		myInt = setInterval(function(){ animatearrow(); }, 500);
		animateArrowATPosition(250,300,180);
		document.getElementById("can2-2").onclick=function()
		{
			myStopFunction();
			document.getElementById("can2-2").onclick="";
			document.getElementById("can2-2").style="position:absolute; left:110px; top:254px;cursor:pointer;visibility:hidden";
			document.getElementById("can2-2a").style.visibility = "visible";
			document.getElementById("can2-2a").style.animation = "moveBottleCap 0.8s forwards linear";
			setTimeout(function()
			{
				document.getElementById("can2-2a").style.visibility = "hidden";
				document.getElementById("can2-2").style.visibility = "visible";
				document.getElementById("can2-3").style.visibility="visible";
				myInt = setInterval(function(){ animatearrow(); }, 500);
				animateArrowATPosition(480,350,360);
				document.getElementById("can2-3").onclick=function()
				{
					myStopFunction();
					document.getElementById("can2-3").onclick="";
					document.getElementById("can2-3").style.animation = "distilMove 0.8s forwards linear";
					setTimeout(function()
					{
						document.getElementById("can2-3").style.visibility = "hidden";
						document.getElementById("can2-3a").style.visibility = "visible";
						// document.getElementById("can2-3").style="position:absolute; left:240px; top:220px";
						document.getElementById("can2-5").style.visibility = "visible";
						document.getElementById("can2-5").style.animation = "distilWaterMove 0.8s forwards linear";
						setTimeout(function()
						{
							document.getElementById("can2-3a").style.visibility = "hidden";
							document.getElementById("can2-3b").style.visibility = "visible";
							setTimeout(function()
							{
								document.getElementById("can2-3b").style.visibility="hidden";
								myInt = setInterval(function(){ animatearrow(); }, 500);
								animateArrowATPosition(120,320,-180);
								document.getElementById("can2-2").onclick=function()
								{
									myStopFunction();
									document.getElementById("can2-2").onclick = "";
									setTimeout(function()
									{
										document.getElementById("can2-2").style="position:absolute;left:239px; top:232px;visibility:hidden";
										document.getElementById("can2-2a").style = "position:absolute;left:0px; top:174px;visibility:visible";
										document.getElementById("can2-2a").style.animation = "moveBottleCap2 0.8s forwards linear";
										setTimeout(function()
										{
											document.getElementById("can2-2a").style.visibility = "hidden";
											document.getElementById("can2-2").style.visibility = "visible";
											document.getElementById("can2-6").style.visibility="visible";
											// setDialog("Now specific gravity bottle with water is placed in water container for at least half an hour at temperature 27<sup>0</sup>C",100,120,120,300);
											var q1 = Object.create(questions);
											generateQuestion(q1,"The temperature of water bath is maintained at __________ ","","50&deg;C","27&deg;C","90&deg;C","95&deg;C",2,waterBottleOnBath,100,100,250,150);
										},900);
									},100);
								}
							},900);
						},900);
					},900);
				}
			},900);
		}
	
	}
	
	else if(simsubscreennum==3)
	{
		document.getElementById("nextButton").style.visibility = "hidden";
		document.getElementById("can2-6").style.visibility = "hidden";
		machineOnTare(nextProceed);			
	}
	else if(simsubscreennum==4)
	{
		document.getElementById("nextButton").style.visibility = "hidden";
		document.getElementById("can3-1").style.visibility = "hidden";
		document.getElementById("can3-2").style.visibility = "hidden";
		document.getElementById("can3-3").style.visibility = "hidden";
		document.getElementById("can3-4").style.visibility = "hidden";
		document.getElementById("can3-5").style.visibility = "hidden";
		document.getElementById("w2").style.visibility = "hidden";
		myInt = setInterval(function(){ animatearrow(); }, 500);
		animateArrowATPosition(300,420,180);
		document.getElementById("can4-1").onclick=function()
		{
			myStopFunction();
			document.getElementById("can4-1").onclick="";
			document.getElementById("can4-1").src = "images/bunsenon.png";
			document.getElementById("can4-2").style.visibility = "visible";
			setTimeout(function()
			{
				myInt = setInterval(function(){ animatearrow(); }, 500);
				animateArrowATPosition(175,315,180);
				document.getElementById("can4-2").onclick=function()
				{
					myStopFunction();
					document.getElementById("can4-2").onclick="";
					document.getElementById("can4-2").style.visibility = "hidden";
					document.getElementById("can4-3").style.visibility = "visible";
					document.getElementById("can4-3").style.animation = "bitMove 1s forwards linear";
					setTimeout(function()
					{
						document.getElementById("can4-4").style.visibility = "visible";
						document.getElementById("can4-4").style.animation = "thermoMove 0.5s forwards linear";
						setTimeout(function()
						{
							document.getElementById("can4-4").src = "images/thermocut.png";
							document.getElementById("can4-5").style.visibility = "visible";
							document.getElementById("can4-6").style.visibility = "visible";
							setTimeout(function()
							{
								document.getElementById("can4-6").style.animation = "thermoZoomMove 1s forwards linear";
								setTimeout(function(){
									// setDialog("Pouring temperature of bituminous material is 90<sup>0</sup>C",480,300,100,220);
									var q2 = Object.create(questions);
									generateQuestion(q2,"Pouring temperature of bitumen material is: ","","50&deg;C","27&deg;C","90&deg;C","95&deg;C",3,pourBitumenIntoBottle,450,300,250,150);
								},1100);
							},800);
						},500);
					},1200);
				}
			},500);
		}	
	}
	else if(simsubscreennum == 5)
	{
		document.getElementById("nextButton").style.visibility = "hidden";
		document.getElementById("can4-11").style.visibility = "hidden";
		document.getElementById("can4-13").style.visibility = "hidden";
		document.getElementById("can4-7").style.visibility = "hidden";
		document.getElementById("can4-8").style.visibility = "hidden";
		machineOnTare(nextProceed);		
	}
	else if(simsubscreennum == 6)
	{
		document.getElementById("nextButton").style.visibility = "hidden";
		document.getElementById("can5-1").style.visibility = "hidden";
		document.getElementById("can5-2").style.visibility = "hidden";
		document.getElementById("can5-3").style.visibility = "hidden";
		document.getElementById("can5-4b").style.visibility = "hidden";
		document.getElementById("can5-5").style.visibility = "hidden";
		document.getElementById("w3").style.visibility = "hidden";
		myInt = setInterval(function(){ animatearrow(); }, 500);
		animateArrowATPosition(250,300,180);
		document.getElementById("can6-2").onclick=function()
		{
			myStopFunction();
			document.getElementById("can6-2").onclick="";
			document.getElementById("can6-2").style.visibility = "hidden";
			document.getElementById("can6-2a").style.visibility = "visible";
			document.getElementById("can6-2a").style.animation = "moveBottleCap 1s forwards linear";
			setTimeout(function()
			{
				document.getElementById("can6-2a").style.visibility = "hidden";
				document.getElementById("can6-2b").style.visibility = "visible";
				document.getElementById("can6-3").style.visibility="visible";
				myInt = setInterval(function(){ animatearrow(); }, 500);
				animateArrowATPosition(480,350,360);
				document.getElementById("can6-3").onclick=function()
				{
					myStopFunction();
					document.getElementById("can6-3").onclick="";
					document.getElementById("can6-3").style.animation = "distilMove 1s forwards linear";
					setTimeout(function()
					{
						document.getElementById("can6-3").style.visibility = "hidden";
						document.getElementById("can6-3a").style.visibility = "visible";
						// document.getElementById("can6-3").src = "images/bittilt.png";
						// document.getElementById("can6-3").style="position:absolute; left:240px; top:220px";
						document.getElementById("can6-5").style.animation = "distilWaterMove 1s forwards linear";
						setTimeout(function()
						{
							document.getElementById("can6-3a").style.visibility = "hidden";
							document.getElementById("can6-3b").style.visibility = "visible";
							// document.getElementById("can6-3").src = "images/halfBottle.png";
							// document.getElementById("can6-3").style="position:absolute; left:300px; top:220px";
							setTimeout(function()
							{
								document.getElementById("can6-3b").style.visibility="hidden";
								myInt = setInterval(function(){ animatearrow(); }, 500);
								animateArrowATPosition(120,320,-180);
								document.getElementById("can6-2b").onclick=function()
								{
									myStopFunction();
									document.getElementById("can6-2b").onclick = "";
									setTimeout(function()
									{
										document.getElementById("can6-2b").style.visibility = "hidden";
										document.getElementById("can6-2a").style.visibility = "visible";
										// document.getElementById("can6-2b").src = "images/bottleCapHand.png";
										document.getElementById("can6-2a").style.animation = "moveBottleCap2 1s forwards linear";
										setTimeout(function()
										{
											// document.getElementById("can6-2b").src = "images/bottleCap.png";
											document.getElementById("can6-2b").style.visibility = "visible";
											document.getElementById("can6-2a").style.visibility = "hidden";
											document.getElementById("can6-2b").style="position:absolute;left:239px; top:232px;";
											document.getElementById("can6-6").style.visibility="visible";
											setDialog("Now Specific Gravity bottle along with water and bitumen is placed in water container for at least half an hour at temperature 27<sup>0</sup>C.",100,120,120,300);
										},1100);
									},100);
								}
							},1100);
						},1200);
					},1100);
				}
			},1100);
		}
	}
	else if(simsubscreennum == 7)
	{
		document.getElementById("nextButton").style.visibility = "hidden";
		document.getElementById("can6-6").style.visibility = "hidden";
		machineOnTare(nextProceed);
	}
	else if(simsubscreennum == 8)
	{
		document.getElementById("nextButton").style.visibility = "hidden";
		document.getElementById("can7-1").style.visibility = "hidden";
		document.getElementById("can7-2").style.visibility = "hidden";
		document.getElementById("can7-3").style.visibility = "hidden";
		document.getElementById("can7-4").style.visibility = "hidden";
		document.getElementById("can7-5").style.visibility = "hidden";
		setTimeout(function()
		{
			document.getElementById("can8-1span").innerHTML = data[p][0].toFixed(2);
			document.getElementById("can8-2span").innerHTML = data[p][1].toFixed(2);
			document.getElementById("can8-3span").innerHTML = data[p][2].toFixed(2);
			document.getElementById("can8-4span").innerHTML = data[p][3].toFixed(2);
			var inputVal = document.createElement("input");
			var checkVal = document.createElement("input");
			var rightVal = document.createElement("span");
			specificValue = document.getElementById("can8-5");
			inputVal.setAttribute("type","text");
			inputVal.setAttribute("id","res1");
			inputVal.setAttribute("oninput","checkInputValid(this)");
			rightVal.setAttribute("id","rightAns");
			inputVal.classList.add("inputStyle");
			checkVal.setAttribute("type","button");
			checkVal.setAttribute("id","chk");
			checkVal.setAttribute("cursor","pointer");
			checkVal.setAttribute("onclick","checkResult();");
			checkVal.setAttribute("value","CHECK");
			specificValue.appendChild(inputVal);
			specificValue.appendChild(rightVal);
			specificValue.appendChild(checkVal);
		},500);
	}
}
function waterBottleOnBath()
{
	if(simsubscreennum == 2)
	{
		document.getElementById("can2-1").style.visibility = "hidden";
		document.getElementById("can2-1a").style.visibility = "visible";
		document.getElementById("can2-5").style.visibility = "hidden";
		document.getElementById("can2-2").style.visibility = "hidden"
		myInt = setInterval(function(){ animatearrow(); }, 500);
		animateArrowATPosition(200,320,-180);
		document.getElementById("can2-1a").onclick=function()
		{
			myStopFunction();
			// document.getElementById("can2-1a").onclick = "";
			document.getElementById("can2-1a").style.visibility = "hidden";
			document.getElementById("can2-1b").style.visibility = "visible";
			// document.getElementById("can2-1").style="position:absolute;left:130px; top:174px;width:20%";
			document.getElementById("can2-1b").style.animation = "bottleTank 1.5s forwards";
			setTimeout(function()
			{
				document.getElementById("can2-6").src = "images/waterbath.png";
				document.getElementById("can2-1b").style.visibility = "hidden";
				document.getElementById("nextButton").style.visibility = "visible";
			},1600);
		}
	}
	else if(simsubscreennum == 6)
	{
		myInt = setInterval(function(){ animatearrow(); }, 500);
		animateArrowATPosition(200,320,-180);
		document.getElementById("can6-1a").onclick=function()
		{
			myStopFunction();
			document.getElementById("can6-1a").onclick = "";
			document.getElementById("can6-1a").style.visibility = "hidden";
			document.getElementById("can6-1b").style.visibility = "visible";
			// document.getElementById("can6-1").style="position:absolute;left:130px; top:174px;width:20%";
			document.getElementById("can6-1b").style.animation = "bottleTank 1s forwards";
			setTimeout(function()
			{
				document.getElementById("can6-6").src = "images/waterbath.png";
				document.getElementById("can6-1b").style.visibility = "hidden";
				document.getElementById("nextButton").style.visibility = "visible";
			},1100);
		}
	}
}
function pourBitumenIntoBottle()
{
	for(var k = 4; k<=6; k++){
		document.getElementById("can4-"+k).style.visibility = "hidden";
	}
	myInt = setInterval(function(){ animatearrow(); }, 500);
	animateArrowATPosition(300,420,180);
	document.getElementById("can4-1").onclick=function()
	{
		myStopFunction();
		document.getElementById("can4-1").onclick="";
		setTimeout(function()
		{
			document.getElementById("can4-1").style.visibility = "hidden";
			document.getElementById("can4-2").style.visibility = "hidden";
			setTimeout(function()
			{
				document.getElementById("can4-3").style.visibility = "hidden";
				document.getElementById("can4-11").style.visibility = "visible";
				document.getElementById("can4-7").style.visibility = "visible";
				document.getElementById("can4-8").style.visibility = "visible";
				myInt = setInterval(function(){ animatearrow(); }, 500);
				animateArrowATPosition(250,300,180);
				document.getElementById("can4-8").onclick=function()
				{
					myStopFunction();
					document.getElementById("can4-8").onclick="";
					document.getElementById("can4-8").src = "images/bottleCapHand.png";
					document.getElementById("can4-8").style="position:absolute; left:130px; top:174px";
					document.getElementById("can4-8").style.animation = "moveBottleCap 1s forwards linear";
					setTimeout(function()
					{
						document.getElementById("can4-8").src = "images/bottleCap.png";
						document.getElementById("can4-8").style="position:absolute; left:110px; top:254px";
						myInt = setInterval(function(){ animatearrow(); }, 500);
						animateArrowATPosition(380,180,-90);
						document.getElementById("can4-11").onclick=function()
						{
							myStopFunction();
							document.getElementById("can4-11").onclick="";
							document.getElementById("can4-11").style.animation = "pourBitMove 1s forwards linear";
							setTimeout(function(){
								document.getElementById("can4-11").style.visibility = "hidden";
								document.getElementById("can4-12").style.visibility = "visible";
								document.getElementById("can4-13").style.visibility = "visible";
								document.getElementById("can4-13").style.animation = "bitUpMove 1.3s forwards linear";
								setTimeout(function(){
									document.getElementById("can4-12").style.visibility = "hidden";
									myInt = setInterval(function(){ animatearrow(); }, 500);
									animateArrowATPosition(120,320,-180);
									document.getElementById("can4-8").onclick=function()
									{
										myStopFunction();
										document.getElementById("can4-8").onclick = "";
										setTimeout(function()
										{
											document.getElementById("can4-8").src = "images/bottleCapHand.png";
											document.getElementById("can4-8").style.animation = "moveBottleCap 1s reverse linear";
											setTimeout(function()
											{
												document.getElementById("can4-8").src = "images/bottleCap.png";
												document.getElementById("can4-8").style="position:absolute;left:239px; top:232px;";
												screensVal = 1;
												var q2 = Object.create(questions);
												generateQuestion(q2,"To permit an escape of air bubbles, the sample bottle is allowed to stand for _____ minutes at suitable temperature cooled to 27<sup>0</sup>C: ","","40","50","30","20",3,screen4Proceed,450,270,250,200);
												// setDialog("To permit an escape of air bubbles, the sample bottle is allowed to stand for 30 minutes at suitable temperature cooled to 27<sup>0</sup>C",420,300,120,340);
											},800);
										},100);
									}
								},1400);
							},1100);
						}
					},1100);
				}
			},800);
		},500);
	}
}
function checkResult()
{
	var idd = document.getElementById("res1");
	var idd1 = document.getElementById("chk");
	var ansId = document.getElementById("rightAns");
		// console.log(idd.value);

	// document.getElementById("alertId").style.visibility = "hidden";
	// document.getElementById("alertId").style.animation = "";
	if(!idd.value  || !idd.value!=" ")
	{
		// document.getElementById("alertId").style.visibility = "visible";
		// document.getElementById("alertId").style.animation = "blink_effect 1s infinite";
	}
	else if(Math.round(idd.value) != Math.round(data[p][4]))
	{
		// console.log(2);
		qCount++;
		// blinkStop();
		idd.style.borderColor = "red";
		ansId.style.color = "red";
		ansId.innerHTML= "&#10008;";
		ansId.classList.remove("resultStyle");
		if(qCount == 2)
		{
			idd1.value = "RESULT";
		}
		if(qCount == 3)
		{
			idd1.style.visibility = "hidden";
			idd.parentNode.removeChild(idd);
			ansId.classList.add("resultStyle");
			ansId.style.color = "black";
			ansId.innerHTML= data[p][4];
			document.getElementById("p8-1").style.visibility = "visible";
		document.getElementById("p8-1").style.animation  ="slidePara 2s forwards";
		}
	}
	else
	{
		idd1.style.visibility = "hidden";
		idd.parentNode.removeChild(idd);
		ansId.classList.add("resultStyle");
		ansId.style.color = "black";
		ansId.innerHTML= data[p][4]+"<span style='color:green;font-size:20px;'>&#10004;</span>";
		document.getElementById("p8-1").style.visibility = "visible";
		document.getElementById("p8-1").style.animation  ="slidePara 2s forwards";
	}
}
function checkSpecificValue()
{
	var element = document.getElementById("checkText");
	if(tries < 2)
	{
		if(document.getElementById ("checkText").value  == data[p][4])
		{
			document.getElementById("checkText").style.visibility = "visible";
			document.getElementById("checkButton").style.visibility = "hidden";
			element.classList.remove("wrong");
			element.classList.add("line2");
			document.getElementById("checkText").value = data[p][4];
		}
		else if(document.getElementById ("checkText").value  != data[p][4])
		{
			tries++;
			element.classList.add("wrong");
			if(tries == 2)
			{
				document.getElementById("checkButton").value = "RESULT";
			}
		}
	}
	else if(tries == 2)
	{
		tries = 0;
		displayResult();
	}
}
function screen4Proceed()
{
	document.getElementById("nextButton").style.visibility  = "visible";
}
function generateQuestion(qObject,qn,op1,op2,op3,op4,op5,ansKey,fn,dleft,dright,dwidth,dheight)
{
	document.getElementById('question-div').style.left=dleft+"px";											
	document.getElementById('question-div').style.top=dright+"px";												
	document.getElementById('question-div').style.width=dwidth+"px";
	document.getElementById('question-div').style.height=dheight+"px";
	qObject.setOptions(op1,op2,op3,op4,op5);
	qObject.setAns(ansKey);
	qObject.frameQuestions(qn);	
	qObject.setCallBack(fn);	
}
function displayResult()
{
	var element = document.getElementById("checkText");
	document.getElementById("checkText").style.visibility = "visible";
	document.getElementById("checkButton").style.visibility = "hidden";
	element.classList.remove("wrong");
	element.classList.add("line2");
	document.getElementById ("checkText").value = data[p][4];
}
function setDialog(textContent,leftPos,topPos,heightVal,widthVal)
{
	document.getElementById("divp").innerHTML = textContent;
	document.getElementById('dialog-div').style.left=leftPos+"px";											
	document.getElementById('dialog-div').style.top=topPos+"px";												
	// document.getElementById('dialog-div').style.height=heightVal+"px";
	// document.getElementById('dialog-div').style.width=widthVal+"px";
	document.getElementById('dialog-div').style.visibility="visible";											
}
function hideDialog()
{
	document.getElementById("dialog-div").style.visibility = "hidden";
	if(simsubscreennum == 2)
	{
		// document.getElementById("can2-1").src = "images/waterBottle.PNG";
		document.getElementById("can2-1").style.visibility = "hidden";
		document.getElementById("can2-1a").style.visibility = "visible";
		document.getElementById("can2-5").style.visibility = "hidden";
		document.getElementById("can2-2").style.visibility = "hidden";
		waterBottleOnBath();
	}
	else if(simsubscreennum == 4 && screensVal == 0)
	{
		pourBitumenIntoBottle();
	}
	else if(simsubscreennum == 4 && screensVal == 1)
	{
		document.getElementById("nextButton").style.visibility = "visible";
	}
	else if(simsubscreennum == 6)
	{
		// document.getElementById("can6-1").src = "images/bituminBottle.PNG";
		document.getElementById("can6-2b").style.visibility = "hidden";
		document.getElementById("can6-1").style.visibility = "hidden";
		document.getElementById("can6-1a").style.visibility = "visible";
		document.getElementById("can6-5").style.visibility = "hidden";
		document.getElementById("can6-2").style.visibility = "hidden";
		waterBottleOnBath();
	}
}	

function machineOnTare(fn2)
{
	myInt = setInterval(function(){ animatearrow(); }, 500);
	animateArrowATPosition(305,470,90);	
	document.getElementById("can"+simsubscreennum+"-2").onclick=function()
	{
		myStopFunction();
		document.getElementById("can"+simsubscreennum+"-5").innerHTML = "00.01";
		varInt = setInterval(function(){ animateVal(); }, 500);
		document.getElementById("can"+simsubscreennum+"-2").onclick="";
		document.getElementById("can"+simsubscreennum+"-2").style.visibility="hidden";
		document.getElementById("can"+simsubscreennum+"-5").style.visibility="visible";
		myInt = setInterval(function(){ animatearrow(); }, 500);
		animateArrowATPosition(415,470,90);	
		document.getElementById("can"+simsubscreennum+"-3").onclick=function()
		{
			myStopFunction();
			clearInterval(varInt);
			document.getElementById("can"+simsubscreennum+"-3").onclick="";
			document.getElementById("can"+simsubscreennum+"-3").style.visibility="hidden";
			document.getElementById("can"+simsubscreennum+"-5").innerHTML = "00.00";
			document.getElementById("can"+simsubscreennum+"-4").style.visibility="visible";
			myInt = setInterval(function(){ animatearrow(); }, 500);
			fn2();
		}
	}
}
function nextProceed()
{
	if(simsubscreennum == 1)
	{
		animateArrowATPosition(120,300,180);
		document.getElementById("can1-4").onclick=function()
		{
			myStopFunction();
			document.getElementById("can1-4").onclick="";
			document.getElementById("can1-4").style="position:absolute; left:275px; top:110px;visibility:hidden";
			document.getElementById("can1-6").style.visibility = "visible";
			document.getElementById("can1-6").style.animation = "moveBottle 0.8s forwards linear";
			setTimeout(function()
			{
				document.getElementById("can1-6").style.visibility = "hidden";
				document.getElementById("can1-4").style.visibility = "visible";
				// if(data[p][0] == 42 )
				// {
					// document.getElementById("w1span").innerHTML = data[p][0]+".00"
					// document.getElementById("can1-5").innerHTML = data[p][0]+".00";
				// }
				// else
				// {
					document.getElementById("w1span").innerHTML = data[p][0].toFixed(2);
					document.getElementById("can1-5").innerHTML = data[p][0].toFixed(2);
				// }

				document.getElementById("nextButton").style.visibility="visible";
			},900);
		}		
	}
	else if(simsubscreennum == 3)
	{
		animateArrowATPosition(120,300,180);
		document.getElementById("can3-4").onclick=function()
		{
			myStopFunction();
			document.getElementById("can3-4").onclick="";
			document.getElementById("can3-4").style="position:absolute; left:275px; top:110px;visibility:hidden";
			document.getElementById("can3-6").style.visibility = "visible";
			document.getElementById("can3-6").style.animation = "moveBottle 1s forwards linear";
			setTimeout(function()
			{
				document.getElementById("can3-6").style.visibility = "hidden";
				document.getElementById("can3-4").style.visibility = "visible";
				// if(data[p][1] == 75 )
				// {
					// document.getElementById("w2span").innerHTML = data[p][1]+".00"
					// document.getElementById("can3-5").innerHTML = data[p][1]+".00";
				// }
				// else
				// {
					document.getElementById("w2span").innerHTML = data[p][1].toFixed(2);
					document.getElementById("can3-5").innerHTML = data[p][1].toFixed(2);
				// }
				document.getElementById("nextButton").style.visibility="visible";
			},1100);
		}		
	}
	else if(simsubscreennum == 5)
	{
		animateArrowATPosition(120,300,180);
		document.getElementById("can5-4").onclick=function()
		{
			myStopFunction();
			document.getElementById("can5-4").onclick="";
			document.getElementById("can5-4").style.visibility = "hidden";
			document.getElementById("can5-4a").style.visibility = "visible";
			// document.getElementById("can5-4").style="position:absolute; left:0px; top:180px";
			document.getElementById("can5-4a").style.animation = "moveBottle 1s forwards linear";
			setTimeout(function()
			{
				document.getElementById("can5-4a").style.visibility = "hidden";
				document.getElementById("can5-4b").style.visibility = "visible";
				// document.getElementById("can5-4").style="position:absolute; left:275px; top:110px";
				// if(data[p][2] == 64 )
				// {
					// document.getElementById("w3span").innerHTML = data[p][2]+".00"
					// document.getElementById("can5-5").innerHTML = data[p][2]+".00";
				// }
				// else
				// {
					document.getElementById("w3span").innerHTML = data[p][2].toFixed(2);
					document.getElementById("can5-5").innerHTML = data[p][2].toFixed(2);
				// }
				document.getElementById("nextButton").style.visibility="visible";
			},1100);
		}
	}
	else if(simsubscreennum == 7)
	{
		animateArrowATPosition(120,300,180);
		document.getElementById("can7-4").onclick=function()
		{
			myStopFunction();
			document.getElementById("can7-4").onclick="";
			document.getElementById("can7-4").style="position:absolute; left:275px; top:110px;visibility:hidden";
			document.getElementById("can7-6").style.visibility = "visible";
			document.getElementById("can7-6").style.animation = "moveBottle 1s forwards linear";
			setTimeout(function()
			{
				document.getElementById("can7-6").style.visibility = "hidden";
				document.getElementById("can7-4").style.visibility = "visible";
				document.getElementById("w4span").innerHTML = data[p][3].toFixed(2);
				document.getElementById("can7-5").innerHTML = data[p][3].toFixed(2);
				document.getElementById("nextButton").style.visibility="visible";
			},1100);
		}
	}
	
}
function setTopLeft(divid,leftPos,topPos,imgsrc)
{
	document.getElementById(divid).src = imgsrc;
	document.getElementById(divid).style.top = topPos+"px";
	document.getElementById(divid).style.left = leftPos+"px";
}

//code to get  pixel point in a page
// function getpx(event,elem)
// {
	// document.getElementById("1").innerHTML = event.pageX + " "+event.pageY;
// }