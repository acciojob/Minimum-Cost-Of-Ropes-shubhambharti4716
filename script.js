function calculateMinCost() {
  const inputElement = document.getElementById("input");
  const resultElement = document.getElementById("result");

  // Get the input string and split it into an array of integers
  const inputString = inputElement.value;
  const ropes = inputString.split(",").map(Number);

  // Create a min-heap (priority queue) using a JavaScript array
  const minHeap = [...ropes];

  // Convert the array into a min-heap
  for (let i = Math.floor(minHeap.length / 2); i >= 0; i--) {
    heapify(minHeap, i);
  }

  // Initialize the total cost
  let totalCost = 0;

  // Merge the ropes until only one rope remains in the min-heap
  while (minHeap.length > 1) {
    // Extract the two shortest ropes from the min-heap
    const min1 = extractMin(minHeap);
    const min2 = extractMin(minHeap);

    // Calculate the cost of merging these two ropes
    const cost = min1 + min2;

    // Add the cost to the total cost
    totalCost += cost;

    // Insert the merged rope back into the min-heap
    insert(minHeap, cost);
  }

  // The totalCost now contains the minimum cost to connect all ropes
  resultElement.textContent = totalCost;
}

// Rest of the code for heapify, extractMin, and insert functions as provided earlier
