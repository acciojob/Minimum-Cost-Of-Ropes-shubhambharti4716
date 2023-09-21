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

// Function to heapify a subtree rooted at the given index
function heapify(arr, i) {
  const n = arr.length;
  let smallest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && arr[left] < arr[smallest]) {
    smallest = left;
  }

  if (right < n && arr[right] < arr[smallest]) {
    smallest = right;
  }

  if (smallest !== i) {
    // Swap arr[i] and arr[smallest]
    [arr[i], arr[smallest]] = [arr[smallest], arr[i]];

    // Recursively heapify the affected sub-tree
    heapify(arr, smallest);
  }
}

// Function to extract the minimum element from the min-heap
function extractMin(arr) {
  const root = arr[0];
  const lastElement = arr.pop();

  if (arr.length > 0) {
    arr[0] = lastElement;
    heapify(arr, 0);
  }

  return root;
}

// Function to insert a new element into the min-heap
function insert(arr, element) {
  arr.push(element);
  let i = arr.length - 1;

  // Fix the min-heap property
  while (i > 0) {
    const parent = Math.floor((i - 1) / 2);
    if (arr[i] < arr[parent]) {
      // Swap arr[i] and arr[parent]
      [arr[i], arr[parent]] = [arr[parent], arr[i]];
      i = parent;
    } else {
      break;
    }
  }
}
