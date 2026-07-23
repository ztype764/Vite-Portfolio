export const puzzleSets = [
  {
    id: 'backend-stack-mix',
    title: "Ali Umar's Enterprise Stack & Project Mix",
    subtitle: "Mixed clues from my backend architecture, live platforms, and engineering skills",
    gridSize: 10,
    words: [
      { 
        id: 'w1', 
        number: 1, 
        direction: 'ACROSS', 
        answer: 'JAVA', 
        clue: "My core object-oriented programming language of choice for building enterprise Spring Boot backends.", 
        category: 'Skill', 
        row: 0, 
        col: 1 
      },
      { 
        id: 'w2', 
        number: 1, 
        direction: 'DOWN', 
        answer: 'JWT', 
        clue: "The stateless token authentication format I implemented to protect admin API endpoints in my UrsPetCare project.", 
        category: 'Security', 
        row: 0, 
        col: 1 
      },
      { 
        id: 'w3', 
        number: 2, 
        direction: 'DOWN', 
        answer: 'POSTGRES', 
        clue: "The relational database system I tuned with HikariCP connection pooling for high throughput on Aiven Cloud.", 
        category: 'Database', 
        row: 1, 
        col: 4 
      },
      { 
        id: 'w4', 
        number: 3, 
        direction: 'ACROSS', 
        answer: 'RESTFUL', 
        clue: "The clean architectural API style I designed for hotel booking, society management, and billing integrations.", 
        category: 'Architecture', 
        row: 3, 
        col: 2 
      },
      { 
        id: 'w5', 
        number: 4, 
        direction: 'DOWN', 
        answer: 'UNIX', 
        clue: "The operating system environment where I configure Nginx load balancing and manage cloud server deployments.", 
        category: 'DevOps', 
        row: 3, 
        col: 7 
      },
      { 
        id: 'w6', 
        number: 5, 
        direction: 'ACROSS', 
        answer: 'GMAIL', 
        clue: "The SMTP protocol service I wired into Spring Boot Starter Mail to dispatch automated async subscriber updates.", 
        category: 'Service', 
        row: 5, 
        col: 4 
      },
      { 
        id: 'w7', 
        number: 6, 
        direction: 'ACROSS', 
        answer: 'REDIS', 
        clue: "The in-memory data store I utilize for caching to boost response times by up to 40%.", 
        category: 'Performance', 
        row: 7, 
        col: 3 
      }
    ]
  },
  {
    id: 'production-systems-mix',
    title: "Production Systems & Automation Mix",
    subtitle: "Hints straight from my work on Uttarakhand Co-operative (ucf.org.in) and UrsPetCare (invoice.urspetcare.in)",
    gridSize: 10,
    words: [
      { 
        id: 'p1', 
        number: 1, 
        direction: 'DOWN', 
        answer: 'UCF', 
        clue: "My enterprise platform built for Uttarakhand State Co-operative Federation (ucf.org.in) serving products and tenders.", 
        category: 'Project', 
        row: 0, 
        col: 4 
      },
      { 
        id: 'p2', 
        number: 2, 
        direction: 'ACROSS', 
        answer: 'PETCARE', 
        clue: "My full-stack veterinary clinic platform (invoice.urspetcare.in) featuring automated vaccination alerts and invoice billing.", 
        category: 'Project', 
        row: 1, 
        col: 1 
      },
      { 
        id: 'p3', 
        number: 2, 
        direction: 'DOWN', 
        answer: 'PDF', 
        clue: "The receipt format I generate dynamically using OpenPDF for clinic staff to download itemized patient invoices.", 
        category: 'Service', 
        row: 1, 
        col: 1 
      },
      { 
        id: 'p4', 
        number: 3, 
        direction: 'ACROSS', 
        answer: 'TENDER', 
        clue: "The public bidding module I developed in UCF backend that triggers automatic subscriber email broadcasts.", 
        category: 'Feature', 
        row: 4, 
        col: 2 
      },
      { 
        id: 'p5', 
        number: 4, 
        direction: 'DOWN', 
        answer: 'EMAIL', 
        clue: "The asynchronous notifications I dispatch every morning at 9:00 AM to remind pet owners 2 days before due dates.", 
        category: 'Service', 
        row: 4, 
        col: 3 
      },
      { 
        id: 'p6', 
        number: 5, 
        direction: 'ACROSS', 
        answer: 'DATABASE', 
        clue: "The persistent storage engine where I structure billing records, inventory tracking, and warehouse data.", 
        category: 'Infrastructure', 
        row: 6, 
        col: 0 
      },
      { 
        id: 'p7', 
        number: 6, 
        direction: 'DOWN', 
        answer: 'DOCK', 
        clue: "The container prefix tool (Docker) I use to package my microservices for instant multi-cloud deployment.", 
        category: 'DevOps', 
        row: 6, 
        col: 0 
      }
    ]
  },
  {
    id: 'devops-cloud-security-mix',
    title: "DevOps, Security & Cloud Engineering Mix",
    subtitle: "Clues covering how I deploy, secure, containerize, and manage my cloud applications",
    gridSize: 10,
    words: [
      { 
        id: 'd1', 
        number: 1, 
        direction: 'ACROSS', 
        answer: 'DEVOPS', 
        clue: "The deployment discipline I practice combining Docker, Nginx, and CI/CD pipelines to cut turnaround time by 50%.", 
        category: 'Service', 
        row: 1, 
        col: 1 
      },
      { 
        id: 'd2', 
        number: 1, 
        direction: 'DOWN', 
        answer: 'DOCKER', 
        clue: "The containerization platform I use to package Spring Boot applications with pre-tuned JVM memory args.", 
        category: 'DevOps', 
        row: 1, 
        col: 1 
      },
      { 
        id: 'd3', 
        number: 2, 
        direction: 'DOWN', 
        answer: 'SECURITY', 
        clue: "The Spring framework layer I configured to enforce Bearer token validation across all protected /api/admin/** routes.", 
        category: 'Security', 
        row: 1, 
        col: 6 
      },
      { 
        id: 'd4', 
        number: 3, 
        direction: 'ACROSS', 
        answer: 'CLOUD', 
        clue: "The hosting infrastructure where I deploy my apps, utilizing AWS EC2, S3, LightSail, and Aiven Cloud DB.", 
        category: 'Cloud', 
        row: 3, 
        col: 1 
      },
      { 
        id: 'd5', 
        number: 4, 
        direction: 'ACROSS', 
        answer: 'EXCEL', 
        clue: "The spreadsheet format I export using Apache POI so clinic managers can download and analyze sales records.", 
        category: 'Service', 
        row: 5, 
        col: 1 
      },
      { 
        id: 'd6', 
        number: 5, 
        direction: 'ACROSS', 
        answer: 'SCRIPT', 
        clue: "The automated shell and build automation scripts I write for deployment and database maintenance.", 
        category: 'Tooling', 
        row: 7, 
        col: 1 
      }
    ]
  }
];
