import { StepAction } from '../types/algorithm';

/**
 * Generate step-by-step execution states for Bubble Sort
 */
export function generateBubbleSortSteps(initialArr: number[]): StepAction[] {
  const steps: StepAction[] = [];
  const arr = [...initialArr];
  const n = arr.length;
  const sortedIndices = new Set<number>();

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    codeLine: 1,
    status: 'idle',
    stepDescription: `Starting Bubble Sort on array of ${n} elements.`,
    actionExplanation: 'Initialize outer loop from 0 to n-1.'
  });

  for (let i = 0; i < n; i++) {
    let swappedAny = false;
    for (let j = 0; j < n - i - 1; j++) {
      // Step: Comparison
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapping: [],
        sorted: Array.from(sortedIndices),
        pointers: { j, 'j+1': j + 1 },
        codeLine: 3,
        status: 'comparing',
        stepDescription: `Comparing ${arr[j]} at index ${j} with ${arr[j + 1]} at index ${j + 1}.`,
        actionExplanation: arr[j] > arr[j + 1]
          ? `Condition met (${arr[j]} > ${arr[j + 1]}): Elements need to be swapped.`
          : `No swap needed: ${arr[j]} ≤ ${arr[j + 1]}.`
      });

      if (arr[j] > arr[j + 1]) {
        // Step: Swap
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swappedAny = true;

        steps.push({
          array: [...arr],
          comparing: [],
          swapping: [j, j + 1],
          sorted: Array.from(sortedIndices),
          pointers: { j, 'j+1': j + 1 },
          codeLine: 4,
          status: 'swapping',
          stepDescription: `Swapped elements at index ${j} and ${j + 1}.`,
          actionExplanation: `Position updated: ${arr[j]} is now before ${arr[j + 1]}.`
        });
      }
    }

    sortedIndices.add(n - i - 1);
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: Array.from(sortedIndices),
      codeLine: 1,
      status: 'sorted',
      stepDescription: `Element ${arr[n - i - 1]} at index ${n - i - 1} is now in its sorted position.`,
      actionExplanation: `Pass ${i + 1} completed. The largest unsorted element has bubbled to the end.`
    });

    if (!swappedAny) {
      // Early exit optimization
      for (let k = 0; k < n; k++) sortedIndices.add(k);
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from(sortedIndices),
        codeLine: 1,
        status: 'sorted',
        stepDescription: 'No swaps occurred during the pass — array is completely sorted!',
        actionExplanation: 'Early termination triggered (O(n) best-case complexity).'
      });
      break;
    }
  }

  // Ensure all marked sorted
  for (let k = 0; k < n; k++) sortedIndices.add(k);
  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from(sortedIndices),
    codeLine: 1,
    status: 'sorted',
    stepDescription: 'Bubble Sort complete. All elements are in non-decreasing order.',
    actionExplanation: 'Final array verified sorted.'
  });

  return steps;
}

/**
 * Generate step-by-step execution states for Selection Sort
 */
export function generateSelectionSortSteps(initialArr: number[]): StepAction[] {
  const steps: StepAction[] = [];
  const arr = [...initialArr];
  const n = arr.length;
  const sortedIndices = new Set<number>();

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    codeLine: 1,
    status: 'idle',
    stepDescription: `Starting Selection Sort on array of ${n} elements.`,
    actionExplanation: 'In each pass, find the minimum element in unsorted subarray and swap it into place.'
  });

  for (let i = 0; i < n; i++) {
    let minIdx = i;
    steps.push({
      array: [...arr],
      comparing: [minIdx],
      swapping: [],
      sorted: Array.from(sortedIndices),
      pivot: minIdx,
      pointers: { i, min: minIdx },
      codeLine: 2,
      status: 'comparing',
      stepDescription: `Assuming initial minimum element is ${arr[minIdx]} at index ${minIdx}.`,
      actionExplanation: `Scanning remaining unsorted elements from index ${i + 1} to ${n - 1}.`
    });

    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...arr],
        comparing: [j, minIdx],
        swapping: [],
        sorted: Array.from(sortedIndices),
        pivot: minIdx,
        pointers: { j, min: minIdx },
        codeLine: 4,
        status: 'comparing',
        stepDescription: `Comparing candidate ${arr[j]} at index ${j} with current minimum ${arr[minIdx]} at index ${minIdx}.`,
        actionExplanation: arr[j] < arr[minIdx]
          ? `New minimum found: ${arr[j]} < ${arr[minIdx]}. Update minimum index to ${j}.`
          : `Keep current minimum: ${arr[j]} ≥ ${arr[minIdx]}.`
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        steps.push({
          array: [...arr],
          comparing: [minIdx],
          swapping: [],
          sorted: Array.from(sortedIndices),
          pivot: minIdx,
          pointers: { min: minIdx },
          codeLine: 5,
          status: 'comparing',
          stepDescription: `Updated minimum index to ${minIdx} (value ${arr[minIdx]}).`,
          actionExplanation: 'Proceeding to scan remaining elements.'
        });
      }
    }

    if (minIdx !== i) {
      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;

      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [i, minIdx],
        sorted: Array.from(sortedIndices),
        pointers: { i, min: minIdx },
        codeLine: 6,
        status: 'swapping',
        stepDescription: `Swapping found minimum ${arr[i]} at index ${minIdx} with index ${i}.`,
        actionExplanation: `Placing the smallest unsorted element into index ${i}.`
      });
    }

    sortedIndices.add(i);
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: Array.from(sortedIndices),
      codeLine: 6,
      status: 'sorted',
      stepDescription: `Index ${i} (value ${arr[i]}) is now confirmed in sorted order.`,
      actionExplanation: `Pass ${i + 1} completed.`
    });
  }

  for (let k = 0; k < n; k++) sortedIndices.add(k);
  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from(sortedIndices),
    codeLine: 1,
    status: 'sorted',
    stepDescription: 'Selection Sort complete. Array is fully sorted.',
    actionExplanation: 'All passes concluded.'
  });

  return steps;
}

/**
 * Generate step-by-step execution states for Insertion Sort
 */
export function generateInsertionSortSteps(initialArr: number[]): StepAction[] {
  const steps: StepAction[] = [];
  const arr = [...initialArr];
  const n = arr.length;
  const sortedIndices = new Set<number>([0]);

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [0],
    codeLine: 1,
    status: 'idle',
    stepDescription: `Starting Insertion Sort. First element ${arr[0]} is considered trivially sorted.`,
    actionExplanation: 'Iterate from index 1 and insert each key element into its sorted position to the left.'
  });

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    steps.push({
      array: [...arr],
      comparing: [i],
      swapping: [],
      sorted: Array.from(sortedIndices),
      pivot: i,
      pointers: { key: i },
      codeLine: 2,
      status: 'comparing',
      stepDescription: `Selecting key element ${key} at index ${i} to insert into sorted left portion.`,
      actionExplanation: 'Compare key with elements to its left.'
    });

    while (j >= 0 && arr[j] > key) {
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapping: [],
        sorted: Array.from(sortedIndices),
        pivot: i,
        pointers: { j, 'j+1': j + 1 },
        codeLine: 4,
        status: 'comparing',
        stepDescription: `Comparing sorted element ${arr[j]} at index ${j} with key ${key}.`,
        actionExplanation: `${arr[j]} > ${key}: Shift ${arr[j]} one position to the right.`
      });

      arr[j + 1] = arr[j];

      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [j, j + 1],
        sorted: Array.from(sortedIndices),
        pointers: { shifted: j + 1 },
        codeLine: 5,
        status: 'shifting',
        stepDescription: `Shifted element ${arr[j + 1]} right into index ${j + 1}.`,
        actionExplanation: `Making room for key ${key}.`
      });

      j--;
    }

    arr[j + 1] = key;
    sortedIndices.add(i);

    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [j + 1],
      sorted: Array.from(sortedIndices),
      pointers: { inserted: j + 1 },
      codeLine: 6,
      status: 'swapping',
      stepDescription: `Inserted key ${key} at destination index ${j + 1}.`,
      actionExplanation: `Subarray from 0 to ${i} is now sorted.`
    });
  }

  for (let k = 0; k < n; k++) sortedIndices.add(k);
  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from(sortedIndices),
    codeLine: 1,
    status: 'sorted',
    stepDescription: 'Insertion Sort complete. All elements correctly placed.',
    actionExplanation: 'The entire array is now sorted.'
  });

  return steps;
}

/**
 * Generate step-by-step execution states for Quick Sort
 */
export function generateQuickSortSteps(initialArr: number[]): StepAction[] {
  const steps: StepAction[] = [];
  const arr = [...initialArr];
  const sortedIndices = new Set<number>();

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    codeLine: 1,
    status: 'idle',
    stepDescription: `Starting Quick Sort (Lomuto partition scheme).`,
    actionExplanation: 'Select pivot, partition elements less than pivot to the left, then recursively sort partitions.'
  });

  function quickSortHelper(low: number, high: number) {
    if (low < high) {
      const pi = partition(low, high);
      sortedIndices.add(pi);
      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    } else if (low === high) {
      sortedIndices.add(low);
    }
  }

  function partition(low: number, high: number): number {
    const pivot = arr[high];
    steps.push({
      array: [...arr],
      comparing: [high],
      swapping: [],
      sorted: Array.from(sortedIndices),
      pivot: high,
      pointers: { pivot: high, low, high },
      codeLine: 3,
      status: 'partitioning',
      stepDescription: `Chosen pivot element is ${pivot} at index ${high}.`,
      actionExplanation: `Partitioning subarray [${low}..${high}].`
    });

    let i = low - 1;
    for (let j = low; j < high; j++) {
      steps.push({
        array: [...arr],
        comparing: [j, high],
        swapping: [],
        sorted: Array.from(sortedIndices),
        pivot: high,
        pointers: { j, pivot: high, i: Math.max(0, i) },
        codeLine: 5,
        status: 'comparing',
        stepDescription: `Comparing ${arr[j]} at index ${j} against pivot ${pivot}.`,
        actionExplanation: arr[j] < pivot
          ? `${arr[j]} < ${pivot}: Element belongs in the left partition. Increment i and swap.`
          : `${arr[j]} ≥ ${pivot}: Element remains in the right partition.`
      });

      if (arr[j] < pivot) {
        i++;
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        steps.push({
          array: [...arr],
          comparing: [],
          swapping: [i, j],
          sorted: Array.from(sortedIndices),
          pivot: high,
          pointers: { i, j },
          codeLine: 7,
          status: 'swapping',
          stepDescription: `Swapped ${arr[i]} at index ${i} with ${arr[j]} at index ${j}.`,
          actionExplanation: `Smaller element moved to partition index ${i}.`
        });
      }
    }

    // Place pivot at correct position
    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [i + 1, high],
      sorted: Array.from(sortedIndices),
      pivot: i + 1,
      pointers: { pivotPlaced: i + 1 },
      codeLine: 8,
      status: 'swapping',
      stepDescription: `Placed pivot ${pivot} at its finalized position: index ${i + 1}.`,
      actionExplanation: `All elements to left are < ${pivot}, and all to right are ≥ ${pivot}.`
    });

    return i + 1;
  }

  quickSortHelper(0, arr.length - 1);

  for (let k = 0; k < arr.length; k++) sortedIndices.add(k);
  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from(sortedIndices),
    codeLine: 1,
    status: 'sorted',
    stepDescription: 'Quick Sort complete. All sub-partitions are sorted.',
    actionExplanation: 'Final array is sorted in non-decreasing order.'
  });

  return steps;
}

/**
 * Generate step-by-step execution states for Merge Sort
 */
export function generateMergeSortSteps(initialArr: number[]): StepAction[] {
  const steps: StepAction[] = [];
  const arr = [...initialArr];
  const sortedIndices = new Set<number>();

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    codeLine: 1,
    status: 'idle',
    stepDescription: `Starting Merge Sort (Divide and Conquer).`,
    actionExplanation: 'Recursively split array into halves until singletons, then merge sorted halves back.'
  });

  function mergeSortHelper(start: number, end: number) {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);
    steps.push({
      array: [...arr],
      comparing: [start, end],
      swapping: [],
      sorted: Array.from(sortedIndices),
      pointers: { start, mid, end },
      codeLine: 3,
      status: 'partitioning',
      stepDescription: `Splitting range [${start}..${end}] at middle index ${mid}.`,
      actionExplanation: `Left half: [${start}..${mid}], Right half: [${mid + 1}..${end}].`
    });

    mergeSortHelper(start, mid);
    mergeSortHelper(mid + 1, end);
    merge(start, mid, end);
  }

  function merge(start: number, mid: number, end: number) {
    const left = arr.slice(start, mid + 1);
    const right = arr.slice(mid + 1, end + 1);

    let i = 0;
    let j = 0;
    let k = start;

    steps.push({
      array: [...arr],
      comparing: [start, end],
      swapping: [],
      sorted: Array.from(sortedIndices),
      pointers: { start, end },
      codeLine: 5,
      status: 'comparing',
      stepDescription: `Merging sorted subarrays [${start}..${mid}] and [${mid + 1}..${end}].`,
      actionExplanation: 'Compare smallest elements from left and right buffers.'
    });

    while (i < left.length && j < right.length) {
      steps.push({
        array: [...arr],
        comparing: [start + i, mid + 1 + j],
        swapping: [],
        sorted: Array.from(sortedIndices),
        pointers: { leftIdx: start + i, rightIdx: mid + 1 + j, target: k },
        codeLine: 6,
        status: 'comparing',
        stepDescription: `Comparing left element ${left[i]} with right element ${right[j]}.`,
        actionExplanation: left[i] <= right[j]
          ? `${left[i]} ≤ ${right[j]}: Select ${left[i]} for position ${k}.`
          : `${right[j]} < ${left[i]}: Select ${right[j]} for position ${k}.`
      });

      if (left[i] <= right[j]) {
        arr[k] = left[i];
        i++;
      } else {
        arr[k] = right[j];
        j++;
      }

      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [k],
        sorted: Array.from(sortedIndices),
        pointers: { placed: k },
        codeLine: 7,
        status: 'swapping',
        stepDescription: `Placed element ${arr[k]} at index ${k}.`,
        actionExplanation: 'Merged buffer element placed into main array.'
      });
      k++;
    }

    while (i < left.length) {
      arr[k] = left[i];
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [k],
        sorted: Array.from(sortedIndices),
        pointers: { placed: k },
        codeLine: 8,
        status: 'swapping',
        stepDescription: `Appending remaining left element ${arr[k]} to index ${k}.`,
        actionExplanation: 'Left buffer remainder copied.'
      });
      i++;
      k++;
    }

    while (j < right.length) {
      arr[k] = right[j];
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [k],
        sorted: Array.from(sortedIndices),
        pointers: { placed: k },
        codeLine: 9,
        status: 'swapping',
        stepDescription: `Appending remaining right element ${arr[k]} to index ${k}.`,
        actionExplanation: 'Right buffer remainder copied.'
      });
      j++;
      k++;
    }

    if (start === 0 && end === arr.length - 1) {
      for (let idx = 0; idx < arr.length; idx++) sortedIndices.add(idx);
    }
  }

  mergeSortHelper(0, arr.length - 1);

  for (let idx = 0; idx < arr.length; idx++) sortedIndices.add(idx);
  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from(sortedIndices),
    codeLine: 1,
    status: 'sorted',
    stepDescription: 'Merge Sort complete. Array is fully sorted.',
    actionExplanation: 'All merges finished in O(n log n) time.'
  });

  return steps;
}

/**
 * Generate step-by-step execution states for Binary Search
 */
export function generateBinarySearchSteps(initialArr: number[], target = 31): StepAction[] {
  const steps: StepAction[] = [];
  // Ensure array is sorted for binary search
  const arr = [...initialArr].sort((a, b) => a - b);
  const n = arr.length;

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    codeLine: 1,
    status: 'idle',
    stepDescription: `Starting Binary Search for target value ${target} in sorted array.`,
    actionExplanation: `Search bounds: low = 0, high = ${n - 1}.`
  });

  let low = 0;
  let high = n - 1;
  let found = false;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    steps.push({
      array: [...arr],
      comparing: [mid],
      swapping: [],
      sorted: [],
      pivot: mid,
      pointers: { low, mid, high },
      codeLine: 3,
      status: 'comparing',
      stepDescription: `Evaluating middle element arr[${mid}] = ${arr[mid]} against target ${target}.`,
      actionExplanation: `Active search range is [${low}..${high}].`
    });

    if (arr[mid] === target) {
      found = true;
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: [mid],
        pivot: mid,
        pointers: { found: mid },
        codeLine: 4,
        status: 'found',
        stepDescription: `Target ${target} found at index ${mid}!`,
        actionExplanation: `Match successful in logarithmic time O(log n).`
      });
      break;
    } else if (arr[mid] < target) {
      steps.push({
        array: [...arr],
        comparing: [mid],
        swapping: [],
        sorted: [],
        pointers: { low, mid, high },
        codeLine: 6,
        status: 'comparing',
        stepDescription: `${arr[mid]} < ${target}: Target must lie in the right half.`,
        actionExplanation: `Discard left half: updating low = ${mid + 1}.`
      });
      low = mid + 1;
    } else {
      steps.push({
        array: [...arr],
        comparing: [mid],
        swapping: [],
        sorted: [],
        pointers: { low, mid, high },
        codeLine: 8,
        status: 'comparing',
        stepDescription: `${arr[mid]} > ${target}: Target must lie in the left half.`,
        actionExplanation: `Discard right half: updating high = ${mid - 1}.`
      });
      high = mid - 1;
    }
  }

  if (!found) {
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [],
      codeLine: 9,
      status: 'not-found',
      stepDescription: `Target ${target} not found in array (low > high).`,
      actionExplanation: 'Search exhausted all possible elements.'
    });
  }

  return steps;
}

/**
 * Generate step-by-step execution states for Linear Search
 */
export function generateLinearSearchSteps(initialArr: number[], target = 31): StepAction[] {
  const steps: StepAction[] = [];
  const arr = [...initialArr];
  const n = arr.length;

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    codeLine: 1,
    status: 'idle',
    stepDescription: `Starting Linear Search for target ${target} across ${n} elements.`,
    actionExplanation: 'Inspect each element sequentially from index 0 to n-1.'
  });

  let found = false;
  for (let i = 0; i < n; i++) {
    steps.push({
      array: [...arr],
      comparing: [i],
      swapping: [],
      sorted: [],
      pointers: { i },
      codeLine: 2,
      status: 'comparing',
      stepDescription: `Checking index ${i}: arr[${i}] = ${arr[i]} vs target ${target}.`,
      actionExplanation: arr[i] === target
        ? `Match found! arr[${i}] matches target ${target}.`
        : `${arr[i]} ≠ ${target}. Proceed to next index.`
    });

    if (arr[i] === target) {
      found = true;
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: [i],
        pointers: { found: i },
        codeLine: 3,
        status: 'found',
        stepDescription: `Target ${target} found at index ${i}!`,
        actionExplanation: `Linear search successfully located target in ${i + 1} comparisons.`
      });
      break;
    }
  }

  if (!found) {
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [],
      codeLine: 4,
      status: 'not-found',
      stepDescription: `Target ${target} not present in the array.`,
      actionExplanation: 'All n elements inspected without finding target.'
    });
  }

  return steps;
}

/**
 * Dispatcher to get steps for any supported algorithm
 */
export function getAlgorithmSteps(algorithmId: string, customArray: number[], targetValue = 31): StepAction[] {
  const safeArray = customArray && customArray.length > 0 ? customArray : [42, 17, 63, 8, 31, 25];

  switch (algorithmId) {
    case 'bubble-sort':
      return generateBubbleSortSteps(safeArray);
    case 'selection-sort':
      return generateSelectionSortSteps(safeArray);
    case 'insertion-sort':
      return generateInsertionSortSteps(safeArray);
    case 'merge-sort':
      return generateMergeSortSteps(safeArray);
    case 'quick-sort':
      return generateQuickSortSteps(safeArray);
    case 'binary-search':
      return generateBinarySearchSteps(safeArray, targetValue);
    case 'linear-search':
      return generateLinearSearchSteps(safeArray, targetValue);
    default:
      return generateBubbleSortSteps(safeArray);
  }
}
