

const modelParams = {
	imageScaleFactor: 0.4,
	maxNumBoxes: 1,
	iouThreshold: 0.5,
	scoreThreshold: 0.9,
  }


//SOUNDS
const synth = new Tone.Synth().toMaster();

const polySynth = new Tone.PolySynth(4, Tone.Synth).toMaster();

// synth.triggerAttackRelease(["C3"], "4n") To check sound.
polySynth.triggerAttackRelease(["C4", "G4", "C4", "D4", "B3"], "2n");

//VIDEO
const video = document.querySelector("#video");
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
let model; 

  navigator.getUserMedia = 
	navigator.getUserMedia || 
	navigator.webkitGetUserMedia ||
	navigator.mozGetUserMedia ||
	navigator.msGetUserMedia;

//SELECT FROM HTML

handTrack.load(modelParams).then(lmodel => {
		model = lmodel;
	  });


handTrack.startVideo(video).then(status => {
		  if(status){
			  navigator.getUserMedia({video: {}}, stream =>{
				  video.srcObject = stream;
				  //Run detection
				  setInterval(runDetection, 200);
			  },
			   err => console.log(err)
			  );
		  }
	});


	  
//TO RUN DETECTION
function runDetection() {
	model.detect(video).then(predictions => {
		model.renderPredictions(predictions, canvas, context, video)
		if(predictions.length !== 0){
			let hand1 = predictions[0].bbox;
			let x = hand1[0];
			let y = hand1[1];
			console.log(y)
			// console.log(x)
			if(x < 500){
				if(y < 100 && y > 20){
					synth.triggerAttackRelease("C4", "8n");
				} else if(y < 150){
					synth.triggerAttackRelease("D4", "8n");
				} else if(y < 350){
					synth.triggerAttackRelease("E4", "8n");
				} else if(y < 450){
					synth.triggerAttackRelease("F4", "8n");
				} 
			}
			// requestAnimationFrame(runDetection);
		};
	});
}

// //attach a click listener to a play button
// document.querySelector('').addEventListener('click', async () => {
// 	await Tone.start()
// 	console.log('audio is ready')
// })

