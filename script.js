// Function to find the minimum cost of connecting ropes
function minCostOfRopes(arr) {
  let minCost = 0;

  // Create a min-heap (priority queue)
  const minHeap = new MinHeap();

  // Add all the ropes to the min-heap
  for (let i = 0; i < arr.length; i++) {
    minHeap.insert(arr[i]);
  }

  // Connect ropes until there is only one rope left in the heap
  while (minHeap.size() > 1) {
    const rope1 = minHeap.extractMin();
    const rope2 = minHeap.extractMin();

    const cost = rope1 + rope2;
    minCost += cost;

    // Add the connected rope back to the min-heap
    minHeap.insert(cost);
  }

  return minCost;
}

// Function to handle form submission
function handleSubmit() {
  const inputElement = document.getElementById('input');
  const resultElement = document.getElementById('result');

  const inputText = inputElement.value;
  const inputArray = inputText.split(',').map(Number);

  const minCost = minCostOfRopes(inputArray);

  resultElement.innerHTML = `Minimum Cost: ${minCost}`;
}

// Define a min-heap (priority queue) class
class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.isEmpty()) return null;

    const min = this.heap[0];
    const last = this.heap.pop();

    if (!this.isEmpty()) {
      this.heap[0] = last;
      this.sinkDown(0);
    }

    return min;
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);

      if (this.heap[parentIndex] <= this.heap[index]) break;

      [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
      index = parentIndex;
    }
  }

  sinkDown(index) {
    while (true) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let smallest = index;

      if (leftChildIndex < this.size() && this.heap[leftChildIndex] < this.heap[smallest]) {
        smallest = leftChildIndex;
      }

      if (rightChildIndex < this.size() && this.heap[rightChildIndex] < this.heap[smallest]) {
        smallest = rightChildIndex;
      }

      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      index = smallest;
    }
  }
}

// Attach event listener to form submission
const formElement = document.getElementById('rope-form');
formElement.addEventListener('submit', function (e) {
  e.preventDefault();
  handleSubmit();
});
