function calculateSpacing() {
  // Get input values
  let totalDistance = parseFloat(document.getElementById("distance").value);
  let numSpaces = parseInt(document.getElementById("spaces").value);
  let slatWidth = parseFloat(document.getElementById("width").value);
  let resultDiv = document.getElementById("result");

  // Input validation
  if (
    isNaN(totalDistance) ||
    isNaN(numSpaces) ||
    isNaN(slatWidth) ||
    numSpaces <= 1
  ) {
    resultDiv.innerHTML =
      "<span style='color: red;'>Please enter valid numbers!</span>";
    return;
  }

  // Calculate spacing
  let spacing = (totalDistance - (numSpaces - 1) * slatWidth) / numSpaces;

  // Display result
  resultDiv.innerHTML = `Spacing between slats: <strong>${spacing.toFixed(
    2
  )} cm</strong>`;

  // Draw the updated sketch
  drawSketch(totalDistance, numSpaces + 1, slatWidth, spacing);
}

function drawSketch(totalDistance, numSpaces, slatWidth, spacing) {
  let canvas = document.getElementById("sketchCanvas");
  let ctx = canvas.getContext("2d");

  // Responsive canvas width, up to 600px max
  let maxCanvasWidth = Math.min(window.innerWidth * 0.9, 600);
  let requiredWidth = totalDistance + (numSpaces - 1) * spacing;
  canvas.width = Math.min(maxCanvasWidth, requiredWidth + 40);
  canvas.height = 200;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Scaling to fit within canvas
  let scale = (canvas.width - 40) / requiredWidth;
  let slatHeight = 50;

  // Draw slats and spacing dynamically
  let x = 20; // Start position
  let firstSlatEdge, lastSlatEdge;

  for (let i = 0; i < numSpaces; i++) {
    // Draw slat
    ctx.fillStyle = "#007BFF";
    ctx.fillRect(x, 75, slatWidth * scale, slatHeight);

    if (i === 0) firstSlatEdge = x + slatWidth * scale; // Inside edge of first slat
    if (i === numSpaces - 1) lastSlatEdge = x; // Inside edge of last slat

    x += slatWidth * scale;

    // Draw spacing (if not the last one)
    if (i < numSpaces - 1) {
      ctx.fillStyle = "#FF0000";
      ctx.fillRect(x, 90, spacing * scale, 20);
      x += spacing * scale;
    }
  }

  // Draw black base line between INSIDE edges of end slats
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(firstSlatEdge, 100);
  ctx.lineTo(lastSlatEdge, 100); // Stops at the last slat’s inside edge
  ctx.stroke();

  // Add labels
  ctx.fillStyle = "black";
  ctx.font = "12px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(`Total Inside Edge Distance: ${totalDistance} cm`, 20, 20);
  ctx.fillStyle = "#007BFF";
  ctx.fillText(`Each Slat: ${slatWidth} cm`, 20, 60);
  ctx.fillStyle = "#FF0000";
  ctx.fillText(
    `Spacing Between Slats: ${spacing.toFixed(2)} cm`,
    Math.max(20, canvas.width - 250),
    150
  );
}

// Resize canvas when window resizes
window.addEventListener("resize", () => {
  let totalDistance = parseFloat(document.getElementById("distance").value);
  let numSpaces = parseInt(document.getElementById("spaces").value);
  let slatWidth = parseFloat(document.getElementById("width").value);

  if (
    !isNaN(totalDistance) &&
    !isNaN(numSpaces) &&
    !isNaN(slatWidth) &&
    numSpaces > 1
  ) {
    calculateSpacing();
  }
});
