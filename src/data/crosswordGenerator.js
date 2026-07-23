export const masterWordBank = [
  { answer: 'JAVA', clue: "My core object-oriented programming language of choice for building enterprise Spring Boot backends.", category: 'Skill' },
  { answer: 'JWT', clue: "The stateless token authentication format I implemented to protect admin API endpoints in my UrsPetCare project.", category: 'Security' },
  { answer: 'POSTGRES', clue: "The relational database system I tuned with HikariCP connection pooling for high throughput on Aiven Cloud.", category: 'Database' },
  { answer: 'RESTFUL', clue: "The clean architectural API style I designed for hotel booking, society management, and billing integrations.", category: 'Architecture' },
  { answer: 'UNIX', clue: "The operating system environment where I configure Nginx load balancing and manage cloud server deployments.", category: 'DevOps' },
  { answer: 'GMAIL', clue: "The SMTP protocol service I wired into Spring Boot Starter Mail to dispatch automated async subscriber updates.", category: 'Service' },
  { answer: 'REDIS', clue: "The in-memory data store I utilize for caching to boost response times by up to 40%.", category: 'Performance' },
  { answer: 'UCF', clue: "My enterprise platform built for Uttarakhand State Co-operative Federation (ucf.org.in) serving products and tenders.", category: 'Project' },
  { answer: 'PETCARE', clue: "My full-stack veterinary clinic platform (invoice.urspetcare.in) featuring automated vaccination alerts and invoice billing.", category: 'Project' },
  { answer: 'PDF', clue: "The receipt format I generate dynamically using OpenPDF for clinic staff to download itemized patient invoices.", category: 'Service' },
  { answer: 'TENDER', clue: "The public bidding module I developed in UCF backend that triggers automatic subscriber email broadcasts.", category: 'Feature' },
  { answer: 'EMAIL', clue: "The asynchronous notifications I dispatch every morning at 9:00 AM to remind pet owners 2 days before due dates.", category: 'Service' },
  { answer: 'DATABASE', clue: "The persistent storage engine where I structure billing records, inventory tracking, and warehouse data.", category: 'Infrastructure' },
  { answer: 'DEVOPS', clue: "The deployment discipline I practice combining Docker, Nginx, and CI/CD pipelines to cut turnaround time by 50%.", category: 'Service' },
  { answer: 'DOCKER', clue: "The containerization platform I use to package Spring Boot applications with pre-tuned JVM memory args.", category: 'DevOps' },
  { answer: 'SECURITY', clue: "The Spring framework layer I configured to enforce Bearer token validation across all protected /api/admin/** routes.", category: 'Security' },
  { answer: 'CLOUD', clue: "The hosting infrastructure where I deploy my apps, utilizing AWS EC2, S3, LightSail, and Aiven Cloud DB.", category: 'Cloud' },
  { answer: 'EXCEL', clue: "The spreadsheet format I export using Apache POI so clinic managers can download and analyze sales records.", category: 'Service' },
  { answer: 'SCRIPT', clue: "The automated shell and build automation scripts I write for deployment and database maintenance.", category: 'Tooling' },
  { answer: 'NGINX', clue: "The high-performance web server I configure on Linux to handle load balancing and reverse proxying.", category: 'DevOps' }
];

const shuffle = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// Check if placement is valid
const canPlaceWord = (grid, N, word, row, col, dir) => {
  const len = word.length;
  if (dir === 'ACROSS') {
    if (col + len > N) return false;
    // Check cell before head and after tail
    if (col > 0 && grid[row][col - 1] !== '') return false;
    if (col + len < N && grid[row][col + len] !== '') return false;

    let intersections = 0;
    for (let i = 0; i < len; i++) {
      const r = row;
      const c = col + i;
      const current = grid[r][c];

      if (current !== '') {
        if (current !== word[i]) return false;
        intersections++;
      } else {
        // Parallel neighbor checks
        if (r > 0 && grid[r - 1][c] !== '') return false;
        if (r < N - 1 && grid[r + 1][c] !== '') return false;
      }
    }
    return intersections;
  } else {
    // DOWN
    if (row + len > N) return false;
    if (row > 0 && grid[row - 1][col] !== '') return false;
    if (row + len < N && grid[row + len][col] !== '') return false;

    let intersections = 0;
    for (let i = 0; i < len; i++) {
      const r = row + i;
      const c = col;
      const current = grid[r][c];

      if (current !== '') {
        if (current !== word[i]) return false;
        intersections++;
      } else {
        if (c > 0 && grid[r][c - 1] !== '') return false;
        if (c < N - 1 && grid[r][c + 1] !== '') return false;
      }
    }
    return intersections;
  }
};

// Main dynamic placement algorithm
export const generateCustomCrossword = (N = 10) => {
  let bestPuzzle = null;
  let maxPlaced = 0;

  // Try 50 randomized generation passes to find a dense, valid puzzle layout
  for (let pass = 0; pass < 50; pass++) {
    const grid = Array.from({ length: N }, () => new Array(N).fill(''));
    const pool = shuffle(masterWordBank);
    const placedWords = [];

    // Place first word horizontally near top/center
    const firstItem = pool[0];
    const firstWord = firstItem.answer;
    const startRow = Math.floor(N / 4);
    const startCol = Math.max(0, Math.floor((N - firstWord.length) / 2));

    for (let i = 0; i < firstWord.length; i++) {
      grid[startRow][startCol + i] = firstWord[i];
    }

    placedWords.push({
      ...firstItem,
      row: startRow,
      col: startCol,
      direction: 'ACROSS'
    });

    // Try placing remaining candidate words
    for (let p = 1; p < pool.length; p++) {
      const item = pool[p];
      const word = item.answer;
      let placed = false;

      // Find possible intersection matches with already placed letters
      for (const placedW of placedWords) {
        if (placed) break;

        for (let i = 0; i < word.length; i++) {
          if (placed) break;
          const letter = word[i];

          // Search grid for matching letter
          for (let r = 0; r < N; r++) {
            if (placed) break;
            for (let c = 0; c < N; c++) {
              if (grid[r][c] === letter) {
                // Try perpendicular placement
                const tryDir = placedW.direction === 'ACROSS' ? 'DOWN' : 'ACROSS';
                const tryRow = tryDir === 'DOWN' ? r - i : r;
                const tryCol = tryDir === 'ACROSS' ? c - i : c;

                if (tryRow >= 0 && tryCol >= 0) {
                  const intersectCount = canPlaceWord(grid, N, word, tryRow, tryCol, tryDir);
                  if (intersectCount !== false && intersectCount >= 1) {
                    // Place word in grid
                    for (let k = 0; k < word.length; k++) {
                      const kr = tryDir === 'ACROSS' ? tryRow : tryRow + k;
                      const kc = tryDir === 'ACROSS' ? tryCol + k : tryCol;
                      grid[kr][kc] = word[k];
                    }

                    placedWords.push({
                      ...item,
                      row: tryRow,
                      col: tryCol,
                      direction: tryDir
                    });

                    placed = true;
                    break;
                  }
                }
              }
            }
          }
        }
      }
    }

    if (placedWords.length > maxPlaced) {
      maxPlaced = placedWords.length;
      bestPuzzle = { grid, placedWords };
    }

    if (placedWords.length >= 6) break; // Good dense layout found
  }

  // Format final puzzle object with cell numbers
  const finalWords = bestPuzzle ? bestPuzzle.placedWords : [];
  
  // Sort words by row, col to assign numbers (1, 2, 3...)
  const startMap = {};
  let currentNum = 1;

  finalWords.sort((a, b) => a.row - b.row || a.col - b.col);

  const formattedWords = finalWords.map(w => {
    const key = `${w.row}-${w.col}`;
    if (!startMap[key]) {
      startMap[key] = currentNum++;
    }
    return {
      id: `${w.answer}-${w.direction}-${w.row}-${w.col}`,
      number: startMap[key],
      direction: w.direction,
      answer: w.answer,
      clue: w.clue,
      category: w.category,
      row: w.row,
      col: w.col
    };
  });

  return {
    id: `custom-mix-${Date.now()}`,
    title: "Ali Umar's Custom Skills & Projects Mix",
    subtitle: "Dynamically generated from my backend architecture, live platforms, and cloud infrastructure",
    gridSize: N,
    words: formattedWords
  };
};
