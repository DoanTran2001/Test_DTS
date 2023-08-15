const generateButton = document.getElementById("generateButton");
const actionButtons = document.querySelectorAll(".actionBtn");
const bubbleSortBtn = document.getElementById("bubbleSort");
const selectionSortBtn = document.getElementById("selectionSort");
const arrayList = document.getElementById("arrayList");
const timeTaken = document.getElementById("timeTaken");
const showCode = document.getElementById("showCode");

let randomArray = [];

function generateRandomArray() {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  randomArray = Array.from({ length: 1000 }, () =>
    Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join("")
  );
  showArray(randomArray);
}

function showArray(arr) {
  arrayList.innerHTML = "";
  arr.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("listItem");
    li.textContent = item;
    arrayList.appendChild(li);
  });
}

function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
}

function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
}

function insertionSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    let current = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
}
// ==================== merge Sort ==============================
function mergeSort(arr) {
  const n = arr.length;

  if (n <= 1) {
    return arr;
  }

  const middle = Math.floor(n / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}
// ============= Quick Sort ===================
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

generateButton.addEventListener("click", generateRandomArray);

actionButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const action = event.target.id;
    const startTime = performance.now();
    window[action](randomArray);
    showCode.innerHTML = window[action];
    const endTime = performance.now();
    const duration = endTime - startTime;
    showArray(randomArray);
    timeTaken.textContent = `Time taken: ${duration} milliseconds - ${action}`;
  });
  btn.addEventListener("mouseover", (e) => {
    const action = e.target.id;
    showCode.innerHTML = window[action];
    showCode.classList.add("active");
  });
  btn.addEventListener("mouseout", (e) => {
    const action = e.target.id;
    showCode.innerHTML = window[action];
    showCode.classList.remove("active");
  });
});

generateRandomArray();
