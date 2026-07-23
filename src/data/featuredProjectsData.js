export const featuredProjects = [
  {
    id: 'ucf',
    title: 'Uttarakhand State Co-operative Federation (U.C.F.)',
    domain: 'ucf.org.in',
    liveUrl: 'https://ucf.org.in',
    category: 'Enterprise Federation Portal & E-Governance Backend',
    description: 'A high-performance RESTful digital platform managing Uttarakhand State Co-operative Federation services, including product catalogs, tender publishing, news updates, media galleries, warehouse inventory tracking, and subscriber notifications.',
    images: [
      {
        src: '/images/projects/ucf-home.png',
        caption: 'UCF Main Homepage & Digital Services Portal'
      },
      {
        src: '/images/projects/ucf-factory.png',
        caption: 'Co-operative Drug Factory & Ayurvedic Products Section'
      }
    ],
    highlights: [
      'Public (/api/public) & Protected Admin (/api/admin) API separation with custom Bearer token AuthInterceptor.',
      'Automated async (@Async) HTML email dispatching to active mailing list subscribers upon new tender/news releases.',
      'Direct Cloudinary CDN integration for multi-image uploads and administrative gallery management.',
      'IP-based rate limiting (5-min window per IP) on contact submissions & auto-expiration handling for news links.',
      'JVM low-memory runtime optimizations (-Xms64m -Xmx128m) & HikariCP PostgreSQL pool tuning.'
    ],
    tags: ['Spring Boot 4.0.5', 'Java 25', 'PostgreSQL', 'Spring Data JPA', 'HikariCP', 'Cloudinary SDK', 'JavaMail', 'Gradle'],
    status: 'Production Live'
  },
  {
    id: 'petcare',
    title: 'UrsPetCare - Pet Care & Billing Platform',
    domain: 'invoice.urspetcare.in',
    liveUrl: 'https://invoice.urspetcare.in',
    category: 'Automated Pet Vaccination Tracker & Clinic Billing System',
    description: 'A comprehensive veterinary clinic & pet care management platform with automated vaccination tracking, daily email reminders, full CRUD billing with multi-field filtering, revenue analytics, and document generation.',
    images: [
      {
        src: '/images/projects/petcare-dashboard.png',
        caption: 'Clinic Dashboard & Revenue Summary Overview'
      },
      {
        src: '/images/projects/petcare-chart.png',
        caption: 'Monthly Sales Analytics & Revenue Visualization Chart'
      },
      {
        src: '/images/projects/petcare-modal.png',
        caption: 'Itemized Invoice Detail View & PDF Receipt Download'
      }
    ],
    highlights: [
      'Full CRUD invoice management with multi-parameter search (pet/owner name, phone) & date-range filter pagination.',
      'Automated daily @Scheduled cron job running at 9:00 AM dispatching email alerts 2 days before vaccination due dates.',
      'One-click Microsoft Excel (.xlsx) spreadsheet export via Apache POI & styled PDF receipt generation via OpenPDF.',
      'JWT-based stateless authentication security with clinic profile & custom logo storage via Cloudinary.',
      'System health monitoring endpoint (/health) and Docker container deployment architecture.'
    ],
    tags: ['Java 21', 'Spring Boot 3.5.9', 'PostgreSQL', 'JWT Security', 'Apache POI', 'OpenPDF', 'Cloudinary SDK', 'Docker', 'Maven'],
    status: 'Production Live'
  }
];
