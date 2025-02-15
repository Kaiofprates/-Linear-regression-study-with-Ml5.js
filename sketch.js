const yolo = ml5.YOLO(modelReady); let img; let objects = []; let status;
function setup() {
  createCanvas(640, 420);
  img = createImg('./galo.jpg', imageReady);
  img.hide();
  img.size(640, 420);

}
// Change the status when the model loads.
function modelReady() {
  console.log("model Ready!")
  status = true;
}
// When the image has been loaded, // get a prediction for that image
function imageReady() {
  console.log('Detecting') 
  yolo.detect(img, gotResult);
}
// A function to run when we get any errors and the results
function gotResult(err, results) {
  if (err) {
    console.log(err);
  }
  console.log(results)
  objects = results;
}

function draw() {
  // unless the model is loaded, do not draw anything to canvas
  if (status != undefined) {
    image(img, 0, 0)

    for (let i = 0; i < objects.length; i++) {
      noStroke();
      fill(0, 255, 0);
      text(objects[i].label + " " + nfc(objects[i].confidence * 100.0, 2) + "%", objects[i].x * width + 5, objects[i].y * height + 15);
      noFill();
      strokeWeight(4);
      stroke(0, 255, 0);
      rect(objects[i].x * width, objects[i].y * height, objects[i].w * width, objects[i].h * height);
    }
  }
}