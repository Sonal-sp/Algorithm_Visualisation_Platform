import { AlgorithmItem, ChallengeItem, LearningModule } from '../types/algorithm';

export const ALGORITHMS: AlgorithmItem[] = [
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'sorting',
    categoryName: 'Sorting',
    difficulty: 'Beginner',
    shortDescription: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    fullDescription: 'Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping adjacent elements if they are in wrong order. While intuitive, its quadratic average time makes it inefficient on large lists.',
    complexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)',
      stable: true,
      inPlace: true
    },
    defaultArray: [42, 17, 63, 8, 31, 25],
    tags: ['Comparison', 'In-Place', 'Stable', 'Iterative'],
    code: {
      python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
      javascript: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
      cpp: `void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}`,
      java: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`
    }
  },
  {
    id: 'selection-sort',
    name: 'Selection Sort',
    category: 'sorting',
    categoryName: 'Sorting',
    difficulty: 'Beginner',
    shortDescription: 'Divides the list into a sorted and unsorted region, repeatedly finding the minimum element to place.',
    fullDescription: 'Selection Sort segments the array into sorted and unsorted parts. In each iteration, it finds the smallest element from the unsorted part and swaps it into the sorted section.',
    complexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)',
      stable: false,
      inPlace: true
    },
    defaultArray: [29, 10, 14, 37, 13, 5],
    tags: ['Comparison', 'In-Place', 'Unstable'],
    code: {
      python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
      javascript: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}`,
      cpp: `void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        swap(arr[i], arr[minIdx]);
    }
}`,
      java: `public static void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        int temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
    }
}`
    }
  },
  {
    id: 'insertion-sort',
    name: 'Insertion Sort',
    category: 'sorting',
    categoryName: 'Sorting',
    difficulty: 'Beginner',
    shortDescription: 'Builds the final sorted array one item at a time by inserting each element into its proper position.',
    fullDescription: 'Insertion Sort works similarly to how people sort playing cards in their hands. It maintains a sorted subarray and inserts each new element into its correct relative position.',
    complexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)',
      stable: true,
      inPlace: true
    },
    defaultArray: [35, 12, 48, 9, 21, 16],
    tags: ['Comparison', 'Adaptive', 'Stable', 'In-Place'],
    code: {
      python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
      javascript: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
      cpp: `void insertionSort(vector<int>& arr) {
    for (int i = 1; i < arr.size(); i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
      java: `public static void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`
    }
  },
  {
    id: 'merge-sort',
    name: 'Merge Sort',
    category: 'sorting',
    categoryName: 'Sorting',
    difficulty: 'Intermediate',
    shortDescription: 'Efficient, general-purpose divide-and-conquer comparison-based sorting algorithm with guaranteed O(n log n).',
    fullDescription: 'Merge Sort divides the unsorted list into n sublists recursively until each contains 1 element, then repeatedly merges sublists to produce new sorted sublists until there is only 1 sublist remaining.',
    complexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      space: 'O(n)',
      stable: true,
      inPlace: false
    },
    defaultArray: [38, 27, 43, 3, 9, 82, 10],
    tags: ['Divide & Conquer', 'Stable', 'Guaranteed O(n log n)'],
    code: {
      python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
      javascript: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}`,
      cpp: `void merge(vector<int>& arr, int l, int m, int r) {
    int n1 = m - l + 1, n2 = r - m;
    vector<int> L(n1), R(n2);
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}`,
      java: `void mergeSort(int[] arr, int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`
    }
  },
  {
    id: 'quick-sort',
    name: 'Quick Sort',
    category: 'sorting',
    categoryName: 'Sorting',
    difficulty: 'Intermediate',
    shortDescription: 'Partitions an array around a chosen pivot, placing the pivot in its final position.',
    fullDescription: 'Quick Sort chooses a pivot element, partitions the other elements into two sub-arrays according to whether they are less than or greater than the pivot, and recursively sorts the sub-arrays.',
    complexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
      space: 'O(log n)',
      stable: false,
      inPlace: true
    },
    defaultArray: [50, 23, 9, 18, 61, 32],
    tags: ['Divide & Conquer', 'In-Place', 'Pivot Partitioning'],
    code: {
      python: `def quick_sort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
      javascript: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}`,
      cpp: `int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}`,
      java: `int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
}`
    }
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    category: 'searching',
    categoryName: 'Searching',
    difficulty: 'Beginner',
    shortDescription: 'Searches a sorted array by repeatedly dividing the search interval in half.',
    fullDescription: 'Binary Search compares the target value to the middle element of the array. If they are not equal, the half in which the target cannot lie is eliminated and the search continues on the remaining half.',
    complexity: {
      best: 'O(1)',
      average: 'O(log n)',
      worst: 'O(log n)',
      space: 'O(1)',
      stable: true,
      inPlace: true
    },
    defaultArray: [4, 9, 15, 23, 31, 42, 58, 77],
    tags: ['Sorted Input Required', 'Logarithmic Time', 'Divide & Conquer'],
    code: {
      python: `def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
      javascript: `function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
      cpp: `int binarySearch(const vector<int>& arr, int target) {
    int low = 0, high = arr.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
      java: `public static int binarySearch(int[] arr, int target) {
    int low = 0, high = arr.length - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`
    }
  },
  {
    id: 'linear-search',
    name: 'Linear Search',
    category: 'searching',
    categoryName: 'Searching',
    difficulty: 'Beginner',
    shortDescription: 'Sequentially checks each element of the list until a match is found or the whole list has been searched.',
    fullDescription: 'Linear Search is the basic sequential search method. It starts at the beginning of the list and inspects every element one-by-one until finding the target or reaching the end.',
    complexity: {
      best: 'O(1)',
      average: 'O(n)',
      worst: 'O(n)',
      space: 'O(1)',
      stable: true,
      inPlace: true
    },
    defaultArray: [18, 42, 7, 31, 88, 14],
    tags: ['Unsorted Supported', 'Sequential', 'O(n)'],
    code: {
      python: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`,
      javascript: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
      cpp: `int linearSearch(const vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}`,
      java: `public static int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}`
    }
  },
  {
    id: 'breadth-first-search',
    name: 'Breadth-First Search (BFS)',
    category: 'graphs',
    categoryName: 'Graphs',
    difficulty: 'Intermediate',
    shortDescription: 'Traverses graph level by level using a queue, finding shortest path in unweighted graphs.',
    fullDescription: 'BFS explores vertices layer by layer from the starting node. It guarantees the shortest path in unweighted networks and is fundamental to peer discovery and web crawlers.',
    complexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)',
      space: 'O(V)',
      stable: true,
      inPlace: false
    },
    defaultArray: [1, 2, 3, 4, 5, 6],
    tags: ['Queue-Based', 'Level-Order', 'Shortest Unweighted Path'],
    code: {
      python: `from collections import deque

def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    while queue:
        vertex = queue.popleft()
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)`,
      javascript: `function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  while (queue.length > 0) {
    const node = queue.shift();
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}`,
      cpp: `void bfs(int start, const vector<vector<int>>& adj) {
    vector<bool> visited(adj.size(), false);
    queue<int> q;
    visited[start] = true;
    q.push(start);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}`,
      java: `void bfs(int start, List<List<Integer>> adj) {
    boolean[] visited = new boolean[adj.size()];
    Queue<Integer> q = new LinkedList<>();
    visited[start] = true;
    q.add(start);
    while (!q.isEmpty()) {
        int u = q.poll();
        for (int v : adj.get(u)) {
            if (!visited[v]) {
                visited[v] = true;
                q.add(v);
            }
        }
    }
}`
    }
  },
  {
    id: 'depth-first-search',
    name: 'Depth-First Search (DFS)',
    category: 'graphs',
    categoryName: 'Graphs',
    difficulty: 'Intermediate',
    shortDescription: 'Explores as far as possible along each branch before backtracking, using recursion or a stack.',
    fullDescription: 'DFS travels down a branch until it reaches a dead end, then backtracks. It is ideal for topological sorting, cycle detection, and maze generation.',
    complexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)',
      space: 'O(V)',
      stable: true,
      inPlace: false
    },
    defaultArray: [1, 2, 3, 4, 5, 6],
    tags: ['Stack-Based', 'Recursion', 'Topological Sort'],
    code: {
      python: `def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    visited.add(start)
    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
    return visited`,
      javascript: `function dfs(graph, start, visited = new Set()) {
  visited.add(start);
  for (const neighbor of graph[start]) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited);
    }
  }
  return visited;
}`,
      cpp: `void dfs(int u, const vector<vector<int>>& adj, vector<bool>& visited) {
    visited[u] = true;
    for (int v : adj[u]) {
        if (!visited[v]) dfs(v, adj, visited);
    }
}`,
      java: `void dfs(int u, List<List<Integer>> adj, boolean[] visited) {
    visited[u] = true;
    for (int v : adj.get(u)) {
        if (!visited[v]) dfs(v, adj, visited);
    }
}`
    }
  },
  {
    id: 'dijkstra',
    name: "Dijkstra's Algorithm",
    category: 'pathfinding',
    categoryName: 'Pathfinding',
    difficulty: 'Advanced',
    shortDescription: 'Finds the shortest paths between nodes in a weighted graph with non-negative edge costs.',
    fullDescription: "Dijkstra's Algorithm calculates the minimal distance from a source node to all other nodes by maintaining a priority queue of tentative distances.",
    complexity: {
      best: 'O((V + E) log V)',
      average: 'O((V + E) log V)',
      worst: 'O((V + E) log V)',
      space: 'O(V)',
      stable: true,
      inPlace: false
    },
    defaultArray: [0, 4, 8, 11, 7],
    tags: ['Greedy', 'Priority Queue', 'Weighted Graph'],
    code: {
      python: `import heapq

def dijkstra(graph, start):
    dist = {node: float('inf') for node in graph}
    dist[start] = 0
    pq = [(0, start)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]: continue
        for v, weight in graph[u].items():
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                heapq.heappush(pq, (dist[v], v))
    return dist`,
      javascript: `function dijkstra(graph, start) {
  const dist = {};
  for (const node in graph) dist[node] = Infinity;
  dist[start] = 0;
  const pq = [[0, start]];
  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]);
    const [d, u] = pq.shift();
    if (d > dist[u]) continue;
    for (const [v, w] of graph[u]) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        pq.push([dist[v], v]);
      }
    }
  }
  return dist;
}`,
      cpp: `vector<int> dijkstra(int start, int n, const vector<vector<pair<int,int>>>& adj) {
    vector<int> dist(n, 1e9);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    dist[start] = 0;
    pq.push({0, start});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`,
      java: `int[] dijkstra(int start, int n, List<List<Edge>> adj) {
    int[] dist = new int[n];
    Arrays.fill(dist, Integer.MAX_VALUE);
    PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
    dist[start] = 0;
    pq.add(new int[]{0, start});
    while (!pq.isEmpty()) {
        int[] top = pq.poll();
        int d = top[0], u = top[1];
        if (d > dist[u]) continue;
        for (Edge e : adj.get(u)) {
            if (dist[u] + e.w < dist[e.v]) {
                dist[e.v] = dist[u] + e.w;
                pq.add(new int[]{dist[e.v], e.v});
            }
        }
    }
    return dist;
}`
    }
  },
  {
    id: 'binary-search-tree',
    name: 'Binary Search Tree (BST)',
    category: 'trees',
    categoryName: 'Trees',
    difficulty: 'Intermediate',
    shortDescription: 'Node-based binary tree data structure with left-smaller and right-greater invariant.',
    fullDescription: 'A BST satisfies the invariant that all values in the left subtree of any node are smaller than the node value, and all values in the right subtree are greater.',
    complexity: {
      best: 'O(log n)',
      average: 'O(log n)',
      worst: 'O(n)',
      space: 'O(n)',
      stable: true,
      inPlace: false
    },
    defaultArray: [50, 30, 70, 20, 40, 60, 80],
    tags: ['Hierarchical', 'In-Order Traversal', 'Recursive Invariant'],
    code: {
      python: `class Node:
    def __init__(self, key):
        self.val = key
        self.left = None
        self.right = None

def insert(root, key):
    if root is None:
        return Node(key)
    if key < root.val:
        root.left = insert(root.left, key)
    else:
        root.right = insert(root.right, key)
    return root`,
      javascript: `class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

function insert(root, val) {
  if (!root) return new Node(val);
  if (val < root.val) root.left = insert(root.left, val);
  else root.right = insert(root.right, val);
  return root;
}`,
      cpp: `struct Node {
    int val;
    Node *left = nullptr, *right = nullptr;
    Node(int v): val(v) {}
};

Node* insert(Node* root, int key) {
    if (!root) return new Node(key);
    if (key < root->val) root->left = insert(root->left, key);
    else root->right = insert(root->right, key);
    return root;
}`,
      java: `class Node {
    int val;
    Node left, right;
    Node(int v) { val = v; }
}

Node insert(Node root, int key) {
    if (root == null) return new Node(key);
    if (key < root.val) root.left = insert(root.left, key);
    else root.right = insert(root.right, key);
    return root;
}`
    }
  },
  {
    id: 'stack-queue',
    name: 'Stack & Queue',
    category: 'data-structures',
    categoryName: 'Data Structures',
    difficulty: 'Beginner',
    shortDescription: 'LIFO (Last-In First-Out) and FIFO (First-In First-Out) linear storage primitives.',
    fullDescription: 'Stacks follow LIFO semantics via push and pop operations. Queues follow FIFO semantics via enqueue and dequeue operations.',
    complexity: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(1)',
      space: 'O(n)',
      stable: true,
      inPlace: false
    },
    defaultArray: [10, 20, 30, 40, 50],
    tags: ['LIFO', 'FIFO', 'O(1) Push/Pop'],
    code: {
      python: `# Stack: LIFO
stack = []
stack.append(10)  # Push
val = stack.pop() # Pop

# Queue: FIFO
from collections import deque
queue = deque()
queue.append(10)      # Enqueue
front = queue.popleft() # Dequeue`,
      javascript: `// Stack
const stack = [];
stack.push(10);
const val = stack.pop();

// Queue
const queue = [];
queue.push(10);
const front = queue.shift();`,
      cpp: `stack<int> s;
s.push(10);
s.pop();

queue<int> q;
q.push(10);
q.pop();`,
      java: `Deque<Integer> stack = new ArrayDeque<>();
stack.push(10);
stack.pop();

Queue<Integer> queue = new ArrayDeque<>();
queue.add(10);
queue.poll();`
    }
  }
];

export const CHALLENGES: ChallengeItem[] = [
  {
    id: 'challenge-1',
    number: '01',
    title: 'Fewest Comparisons for Pre-Sorted Input',
    question: 'Which sorting algorithm performs the fewest comparisons when the input array is already completely sorted in ascending order?',
    arrayInput: [1, 2, 3, 4, 5],
    options: ['Bubble Sort (optimized)', 'Selection Sort', 'Insertion Sort'],
    correctIndex: 2,
    explanation: 'Insertion Sort only performs n - 1 comparisons (O(n) time) on an already sorted array because each element immediately satisfies the while-loop condition without shifting. Selection Sort always scans the remaining subarray and takes O(n²) comparisons regardless of initial order.',
    hint: 'Think about which algorithm stops comparing early when an element is already in the right place relative to the sorted prefix.'
  },
  {
    id: 'challenge-2',
    number: '02',
    title: 'Predict Quick Sort Partitioning',
    question: 'In Lomuto partitioning on [17, 8, 31, 63, 42] with pivot 42 (last element), what will be the final placed position (0-based index) of pivot 42?',
    arrayInput: [17, 8, 31, 63, 42],
    options: ['Index 2', 'Index 3', 'Index 4'],
    correctIndex: 1,
    explanation: 'Elements smaller than 42 are {17, 8, 31} (3 elements). Element 63 is greater than 42. Thus the three smaller items occupy indices 0, 1, 2, and pivot 42 is swapped into index 3.',
    hint: 'Count how many elements in the array are strictly less than 42.'
  },
  {
    id: 'challenge-3',
    number: '03',
    title: 'Binary Search Comparisons Count',
    question: 'How many comparisons are made when Binary Search searches for target 19 in the sorted array [2, 4, 7, 12, 19, 23]?',
    arrayInput: [2, 4, 7, 12, 19, 23],
    options: ['2 comparisons', '3 comparisons', '5 comparisons'],
    correctIndex: 0,
    explanation: '1st check: mid = index 2 (value 7). Since 7 < 19, low becomes index 3. 2nd check: mid = (3+5)//2 = index 4 (value 19). Value matches target! Exactly 2 comparisons are performed.',
    hint: 'Track mid at step 1: (0+5)//2 = 2. Then new range [3..5], mid = (3+5)//2 = 4.'
  }
];

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: 'module-1',
    number: 1,
    title: 'What is an Algorithm?',
    readTime: '4 min read',
    algorithmsCount: 2,
    completed: true,
    overview: 'A step-by-step procedure for solving a computational problem or performing a computation in finite time.',
    concept: 'An algorithm takes input, processes it through deterministic steps, and produces an output. Key properties include definiteness, finiteness, correctness, and generality.',
    visualizationTips: 'Pay attention to how state changes after each single instruction in the execution panel.',
    exampleProblem: 'Finding the maximum element in an unsorted list of test scores.',
    practicePrompt: 'Trace how many primitive operations occur when scanning a list of 5 numbers.',
    recommendedAlgorithmId: 'linear-search'
  },
  {
    id: 'module-2',
    number: 2,
    title: 'Complexity & Big-O Notation',
    readTime: '6 min read',
    algorithmsCount: 5,
    completed: true,
    overview: 'Classifying algorithm scalability as input size n grows asymptotically toward infinity.',
    concept: 'Big-O describes upper bounds: O(1) constant, O(log n) logarithmic, O(n) linear, O(n log n) linearithmic, O(n²) quadratic, and O(2ⁿ) exponential.',
    visualizationTips: 'Notice how doubling input size barely affects O(log n) but quadruples operations in O(n²).',
    exampleProblem: 'Comparing a nested loop vs a single linear scan on 10,000 records.',
    practicePrompt: 'Calculate the total comparisons in bubble sort worst-case: n(n-1)/2.',
    recommendedAlgorithmId: 'binary-search'
  },
  {
    id: 'module-3',
    number: 3,
    title: 'Searching Algorithms',
    readTime: '5 min read',
    algorithmsCount: 2,
    completed: true,
    overview: 'Techniques for locating a specific record or key within a collection of data.',
    concept: 'Linear Search inspects every item sequentially (useful on unsorted data). Binary Search splits a sorted array in half each time, achieving O(log n).',
    visualizationTips: 'Watch the low, mid, and high pointers collapse the search space.',
    exampleProblem: 'Looking up a name in a physical phonebook or dictionary.',
    practicePrompt: 'Try searching for an element not present in the array to see the termination condition.',
    recommendedAlgorithmId: 'binary-search'
  },
  {
    id: 'module-4',
    number: 4,
    title: 'Sorting Techniques',
    readTime: '8 min read',
    algorithmsCount: 5,
    completed: true,
    overview: 'Arranging elements of a list in a specified non-decreasing or non-increasing order.',
    concept: 'Simple sorts (Bubble, Selection, Insertion) are O(n²). Divide-and-conquer sorts (Merge Sort, Quick Sort) achieve O(n log n) average efficiency.',
    visualizationTips: 'Observe how Quick Sort partitions elements around a pivot vs Merge Sort combining split subarrays.',
    exampleProblem: 'Arranging 1,000,000 e-commerce transactions by timestamp.',
    practicePrompt: 'Run Quick Sort and Bubble Sort on the same reverse-sorted input to compare steps.',
    recommendedAlgorithmId: 'bubble-sort'
  },
  {
    id: 'module-5',
    number: 5,
    title: 'Binary Trees & BST',
    readTime: '7 min read',
    algorithmsCount: 2,
    completed: false,
    overview: 'Non-linear hierarchical data structures where each node has at most two children.',
    concept: 'In a Binary Search Tree (BST), every node in the left subtree has a key strictly less than the root, and right subtree keys are strictly greater.',
    visualizationTips: 'Visualize in-order traversal to see how it yields sorted numbers.',
    exampleProblem: 'Implementing an auto-complete indexing dictionary.',
    practicePrompt: 'Simulate inserting values 50, 30, 70, 20, 40 into an empty BST.',
    recommendedAlgorithmId: 'binary-search-tree'
  },
  {
    id: 'module-6',
    number: 6,
    title: 'Graph Traversals',
    readTime: '9 min read',
    algorithmsCount: 3,
    completed: false,
    overview: 'Visiting all nodes in a network of vertices and edges connected arbitrarily.',
    concept: 'BFS uses a FIFO queue to explore layer-by-layer (shortest unweighted paths). DFS uses recursion or a LIFO stack to dive deep before backtracking.',
    visualizationTips: 'Watch the queue and visited set grow simultaneously during BFS.',
    exampleProblem: 'Finding the degrees of separation between two LinkedIn users.',
    practicePrompt: 'Track how DFS backtracks when reaching a leaf node with no unvisited neighbors.',
    recommendedAlgorithmId: 'breadth-first-search'
  },
  {
    id: 'module-7',
    number: 7,
    title: 'Dynamic Programming',
    readTime: '10 min read',
    algorithmsCount: 4,
    completed: false,
    overview: 'Breaking problems into overlapping subproblems and memoizing results to eliminate redundant computation.',
    concept: 'Optimal substructure and overlapping subproblems are the hallmarks of DP. Approaches include Top-Down (memoization) and Bottom-Up (tabulation).',
    visualizationTips: 'Observe the 2D grid table fill cell by cell without repeating recursive branches.',
    exampleProblem: '0/1 Knapsack Problem and Longest Common Subsequence.',
    practicePrompt: 'Write out the recurrence relation for Fibonacci numbers with memoization.',
    recommendedAlgorithmId: 'dijkstra'
  }
];
