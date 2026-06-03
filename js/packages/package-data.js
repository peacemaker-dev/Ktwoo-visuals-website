/**
 * packages-data.js
 * ─────────────────────────────────────────────────────────────
 * Single source of truth for ALL Ktwoo Visuals package content.
 *
 * HOW TO UPDATE PRICES:
 *   Find the service key, find the package key, update the price.
 *   No HTML files need to be touched.
 *
 * HOW TO ADD A NEW SERVICE:
 *   Add a new key to packagesData with the correct type.
 *
 * TYPES:
 *   "dual"   — Two-level tabs: coverage type + P/S/B
 *              Used by: matric-dance, graduation, photoshoot, kids-shoot
 *   "single" — Single-level tabs: P/S/B only
 *              Used by: music-videos, promo-videos
 *   "rates"  — Flat rates table, no packages
 *              Used by: freelancing
 *
 * COVERAGE TYPE KEYS:
 *   "pv" — Photo & Video
 *   "po" — Photo Only
 *   "vo" — Video Only
 *
 * PACKAGE KEYS (dual):   "pv-premium", "pv-standard", "pv-basic",
 *                        "po-premium", "po-standard", "po-basic",
 *                        "vo-premium", "vo-standard", "vo-basic"
 * PACKAGE KEYS (single): "premium", "standard", "basic"
 */

const packagesData = {

  /* ─────────────────────────────────────────────
     MATRIC DANCE
  ───────────────────────────────────────────── */
  "matric-dance": {
    type: "dual",
    bgImage: "assets/matric-dance/pkg-bg.jpeg",
    heading: "Choose Your Package",
    subheading: "Every matric dance is a milestone. Pick the coverage type and experience that fits your vision — from solid coverage to a full cinematic production.",
    packages: {
      "pv-premium": {
        label: "Premium — Photo & Video",
        title: "Full Cinematic Experience",
        price: "R12 500",
        team: [
          "Photographer ×1",
          "Light Assistant ×1",
          "Videographer / Drone Operator ×1",
          "Video Editor"
        ],
        included: [
          "Drone Coverage",
          "Cameras ×2",
          "LED Tube Light",
          "Photography Lights ×2",
          "Champagne Props",
          "Flowers (Optional)",
          "Smoke Bomb Effects"
        ],
        deliverables: [
          "Digital Link — Photos & Videos",
          "50 Professionally Edited Pictures",
          "10 High-End Retouched Pictures",
          "Short Documentary Video",
          "Cinematic Reel",
          "A3 Photo-book ×1",
          "A1 Canvas Photo ×1"
        ]
      },
      "pv-standard": {
        label: "Standard — Photo & Video",
        title: "Photography & Reel Coverage",
        price: "R8 500",
        team: [
          "Photographer ×1",
          "Videographer ×1",
          "Video Editor"
        ],
        included: [
          "Drone Coverage",
          "Cameras ×2",
          "LED Lighting Setup",
          "Champagne Props",
          "Smoke Bomb Effects"
        ],
        deliverables: [
          "Digital Link — Photos & Videos",
          "35 Edited Pictures",
          "5 Retouched Pictures",
          "Cinematic Reel",
          "Highlight Video",
          "A3 Photo-book ×1"
        ]
      },
      "pv-basic": {
        label: "Basic — Photo & Video",
        title: "Photography Coverage",
        price: "R4 500",
        team: [
          "Photographer ×1",
          "Assistant ×1"
        ],
        included: [
          "Camera Coverage",
          "Basic Lighting Setup",
          "Champagne Props"
        ],
        deliverables: [
          "Digital Link — Photos",
          "20 Edited Pictures",
          "3 Retouched Pictures",
          "Short Reel"
        ]
      },
      "po-premium": {
        label: "Premium — Photo Only",
        title: "Full Photography Experience",
        price: "R7 500",
        team: [
          "Photographer ×1",
          "Light Assistant ×1",
          "Photo Editor"
        ],
        included: [
          "Cameras ×2",
          "LED Tube Light",
          "Photography Lights ×2",
          "Champagne Props",
          "Flowers (Optional)",
          "Smoke Bomb Effects"
        ],
        deliverables: [
          "Digital Link — Photos",
          "50 Professionally Edited Pictures",
          "10 High-End Retouched Pictures",
          "A3 Photo-book ×1",
          "A1 Canvas Photo ×1"
        ]
      },
      "po-standard": {
        label: "Standard — Photo Only",
        title: "Professional Photography",
        price: "R4 500",
        team: [
          "Photographer ×1",
          "Assistant ×1"
        ],
        included: [
          "Camera Coverage",
          "Lighting Setup",
          "Champagne Props",
          "Smoke Bomb Effects"
        ],
        deliverables: [
          "Digital Link — Photos",
          "35 Edited Pictures",
          "5 Retouched Pictures",
          "A3 Photo-book ×1"
        ]
      },
      "po-basic": {
        label: "Basic — Photo Only",
        title: "Essential Photography",
        price: "R2 500",
        team: [
          "Photographer ×1"
        ],
        included: [
          "Camera Coverage",
          "Basic Lighting Setup"
        ],
        deliverables: [
          "Digital Link — Photos",
          "20 Edited Pictures",
          "3 Retouched Pictures"
        ]
      },
      "vo-premium": {
        label: "Premium — Video Only",
        title: "Full Videography Experience",
        price: "R8 500",
        team: [
          "Videographer / Drone Operator ×1",
          "Light Assistant ×1",
          "Video Editor"
        ],
        included: [
          "Drone Coverage",
          "Cameras ×2",
          "LED Tube Light",
          "Champagne Props",
          "Flowers (Optional)",
          "Smoke Bomb Effects"
        ],
        deliverables: [
          "Short Documentary Video",
          "Cinematic Reel",
          "Full Edited Video",
          "Digital Download Link"
        ]
      },
      "vo-standard": {
        label: "Standard — Video Only",
        title: "Highlights Videography",
        price: "R5 500",
        team: [
          "Videographer ×1",
          "Video Editor"
        ],
        included: [
          "Drone Coverage",
          "Camera Coverage",
          "Lighting Setup",
          "Champagne Props",
          "Smoke Bomb Effects"
        ],
        deliverables: [
          "Highlight Video",
          "Cinematic Reel",
          "Digital Download Link"
        ]
      },
      "vo-basic": {
        label: "Basic — Video Only",
        title: "Essential Videography",
        price: "R3 000",
        team: [
          "Videographer ×1"
        ],
        included: [
          "Camera Coverage",
          "Basic Lighting Setup"
        ],
        deliverables: [
          "Short Reel",
          "Edited Highlight Clip",
          "Digital Download Link"
        ]
      }
    }
  },

  /* ─────────────────────────────────────────────
     GRADUATION SHOOT
  ───────────────────────────────────────────── */
  "graduation": {
    type: "dual",
    bgImage: "assets/graduation/pkg-bg.jpeg",
    heading: "Choose Your Package",
    subheading: "Celebrate your achievement in cinematic style. Choose your coverage type and the package that matches your vision.",
    packages: {
      "pv-premium": {
        label: "Premium — Photo & Video",
        title: "Full Cinematic Experience",
        price: "R8 500",
        team: [
          "Photographer ×1",
          "Light Assistant ×1",
          "Videographer ×1",
          "Video Editor"
        ],
        included: [
          "Cameras ×2",
          "Drone Coverage",
          "LED Tube Light",
          "Photography Lights ×2",
          "Creative Direction",
          "Graduation Gown Styling Assistance",
          "Champagne Props",
          "Flowers (Optional)",
          "Smoke Bomb Effects"
        ],
        deliverables: [
          "Digital Link — Photos & Videos",
          "50 Professionally Edited Pictures",
          "10 High-End Retouched Pictures",
          "Cinematic Graduation Highlight Video",
          "Cinematic Reel",
          "A3 Photo-book ×1",
          "A1 Canvas Photo ×1"
        ]
      },
      "pv-standard": {
        label: "Standard — Photo & Video",
        title: "Professional Coverage",
        price: "R5 500",
        team: [
          "Photographer ×1",
          "Videographer ×1"
        ],
        included: [
          "Camera Coverage",
          "Drone Coverage",
          "Lighting Setup",
          "Creative Direction",
          "Graduation Gown Styling Assistance",
          "Champagne Props",
          "Smoke Bomb Effects"
        ],
        deliverables: [
          "Digital Link — Photos & Videos",
          "30 Edited Pictures",
          "5 Retouched Pictures",
          "Highlight Video",
          "Cinematic Reel",
          "A3 Photo-book ×1"
        ]
      },
      "pv-basic": {
        label: "Basic — Photo & Video",
        title: "Essential Coverage",
        price: "R3 500",
        team: [
          "Photographer ×1",
          "Videographer ×1"
        ],
        included: [
          "Camera Coverage",
          "Basic Lighting Setup",
          "Creative Direction"
        ],
        deliverables: [
          "Digital Link — Photos & Videos",
          "15 Edited Pictures",
          "Short Reel"
        ]
      },
      "po-premium": {
        label: "Premium — Photo Only",
        title: "Full Photography Experience",
        price: "R6 000",
        team: [
          "Photographer ×1",
          "Light Assistant ×1",
          "Photo Editor"
        ],
        included: [
          "Cameras ×2",
          "LED Tube Light",
          "Photography Lights ×2",
          "Creative Direction",
          "Graduation Gown Styling Assistance",
          "Champagne Props",
          "Flowers (Optional)",
          "Smoke Bomb Effects"
        ],
        deliverables: [
          "Digital Link — Photos",
          "50 Professionally Edited Pictures",
          "10 High-End Retouched Pictures",
          "A3 Photo-book ×1",
          "A1 Canvas Photo ×1"
        ]
      },
      "po-standard": {
        label: "Standard — Photo Only",
        title: "Professional Photography",
        price: "R4 000",
        team: [
          "Photographer ×1",
          "Assistant ×1"
        ],
        included: [
          "Camera Coverage",
          "Lighting Setup",
          "Creative Direction",
          "Graduation Gown Styling Assistance",
          "Champagne Props",
          "Smoke Bomb Effects"
        ],
        deliverables: [
          "Digital Link — Photos",
          "30 Edited Pictures",
          "5 Retouched Pictures",
          "A3 Photo-book ×1"
        ]
      },
      "po-basic": {
        label: "Basic — Photo Only",
        title: "Essential Photography",
        price: "R2 200",
        team: [
          "Photographer ×1"
        ],
        included: [
          "Camera Coverage",
          "Basic Lighting Setup",
          "Creative Direction"
        ],
        deliverables: [
          "Digital Link — Photos",
          "15 Edited Pictures",
          "3 Retouched Pictures"
        ]
      },
      "vo-premium": {
        label: "Premium — Video Only",
        title: "Full Videography Experience",
        price: "R7 000",
        team: [
          "Videographer ×1",
          "Light Assistant ×1",
          "Video Editor"
        ],
        included: [
          "Cameras ×2",
          "Drone Coverage",
          "LED Tube Light",
          "Creative Direction",
          "Graduation Gown Styling Assistance",
          "Champagne Props",
          "Flowers (Optional)",
          "Smoke Bomb Effects"
        ],
        deliverables: [
          "Cinematic Graduation Highlight Video",
          "Cinematic Reel",
          "Full Edited Video",
          "Digital Download Link"
        ]
      },
      "vo-standard": {
        label: "Standard — Video Only",
        title: "Highlights Videography",
        price: "R4 500",
        team: [
          "Videographer ×1",
          "Video Editor"
        ],
        included: [
          "Camera Coverage",
          "Drone Coverage",
          "Lighting Setup",
          "Creative Direction",
          "Graduation Gown Styling Assistance",
          "Champagne Props",
          "Smoke Bomb Effects"
        ],
        deliverables: [
          "Highlight Video",
          "Cinematic Reel",
          "Digital Download Link"
        ]
      },
      "vo-basic": {
        label: "Basic — Video Only",
        title: "Essential Videography",
        price: "R2 800",
        team: [
          "Videographer ×1"
        ],
        included: [
          "Camera Coverage",
          "Basic Lighting Setup",
          "Creative Direction"
        ],
        deliverables: [
          "Short Reel",
          "Edited Highlight Clip",
          "Digital Download Link"
        ]
      }
    }
  },

  /* ─────────────────────────────────────────────
     PHOTOSHOOT
  ───────────────────────────────────────────── */
  "photoshoot": {
    type: "dual",
    bgImage: "assets/photoshoot/pkg-bg.jpeg",
    heading: "Choose Your Package",
    subheading: "Creative direction, cinematic lighting, and professional production — built around your vision. Choose your coverage and package below.",
    packages: {
      "pv-premium": {
        label: "Premium — Photo & Video",
        title: "Full Creative Production",
        price: "R7 500",
        team: [
          "Photographer ×1",
          "Light Assistant ×1",
          "Videographer ×1",
          "Video Editor"
        ],
        included: [
          "Cameras ×2",
          "Drone Coverage",
          "LED Tube Light",
          "Photography Lights ×2",
          "Creative Direction",
          "Champagne Props",
          "Flowers (Optional)",
          "Smoke Bomb Effects"
        ],
        deliverables: [
          "Digital Link — Photos & Videos",
          "40 Professionally Edited Pictures",
          "10 High-End Retouched Pictures",
          "Cinematic Highlight Video",
          "Cinematic Reel",
          "A3 Photo-book ×1",
          "A1 Canvas Photo ×1"
        ]
      },
      "pv-standard": {
        label: "Standard — Photo & Video",
        title: "Professional Coverage",
        price: "R5 000",
        team: [
          "Photographer ×1",
          "Videographer ×1"
        ],
        included: [
          "Camera Coverage",
          "Drone Coverage",
          "Lighting Setup",
          "Creative Direction",
          "Champagne Props",
          "Smoke Bomb Effects"
        ],
        deliverables: [
          "Digital Link — Photos & Videos",
          "25 Edited Pictures",
          "5 Retouched Pictures",
          "Highlight Video",
          "Cinematic Reel",
          "A3 Photo-book ×1"
        ]
      },
      "pv-basic": {
        label: "Basic — Photo & Video",
        title: "Essential Coverage",
        price: "R3 000",
        team: [
          "Photographer ×1",
          "Videographer ×1"
        ],
        included: [
          "Camera Coverage",
          "Basic Lighting Setup",
          "Creative Direction"
        ],
        deliverables: [
          "Digital Link — Photos & Videos",
          "15 Edited Pictures",
          "Short Reel"
        ]
      },
      "po-premium": {
        label: "Premium — Photo Only",
        title: "Full Photography Experience",
        price: "R5 500",
        team: [
          "Photographer ×1",
          "Light Assistant ×1",
          "Photo Editor"
        ],
        included: [
          "Cameras ×2",
          "LED Tube Light",
          "Photography Lights ×2",
          "Creative Direction",
          "Champagne Props",
          "Flowers (Optional)",
          "Smoke Bomb Effects"
        ],
        deliverables: [
          "Digital Link — Photos",
          "40 Professionally Edited Pictures",
          "10 High-End Retouched Pictures",
          "A3 Photo-book ×1",
          "A1 Canvas Photo ×1"
        ]
      },
      "po-standard": {
        label: "Standard — Photo Only",
        title: "Professional Photography",
        price: "R3 500",
        team: [
          "Photographer ×1",
          "Assistant ×1"
        ],
        included: [
          "Camera Coverage",
          "Lighting Setup",
          "Creative Direction",
          "Champagne Props",
          "Smoke Bomb Effects"
        ],
        deliverables: [
          "Digital Link — Photos",
          "25 Edited Pictures",
          "5 Retouched Pictures",
          "A3 Photo-book ×1"
        ]
      },
      "po-basic": {
        label: "Basic — Photo Only",
        title: "Essential Photography",
        price: "R1 800",
        team: [
          "Photographer ×1"
        ],
        included: [
          "Camera Coverage",
          "Basic Lighting Setup",
          "Creative Direction"
        ],
        deliverables: [
          "Digital Link — Photos",
          "15 Edited Pictures",
          "3 Retouched Pictures"
        ]
      },
      "vo-premium": {
        label: "Premium — Video Only",
        title: "Full Videography Experience",
        price: "R6 500",
        team: [
          "Videographer ×1",
          "Light Assistant ×1",
          "Video Editor"
        ],
        included: [
          "Cameras ×2",
          "Drone Coverage",
          "LED Tube Light",
          "Creative Direction",
          "Champagne Props",
          "Flowers (Optional)",
          "Smoke Bomb Effects"
        ],
        deliverables: [
          "Cinematic Highlight Video",
          "Cinematic Reel",
          "Full Edited Video",
          "Digital Download Link"
        ]
      },
      "vo-standard": {
        label: "Standard — Video Only",
        title: "Highlights Videography",
        price: "R4 000",
        team: [
          "Videographer ×1",
          "Video Editor"
        ],
        included: [
          "Camera Coverage",
          "Drone Coverage",
          "Lighting Setup",
          "Creative Direction",
          "Champagne Props",
          "Smoke Bomb Effects"
        ],
        deliverables: [
          "Highlight Video",
          "Cinematic Reel",
          "Digital Download Link"
        ]
      },
      "vo-basic": {
        label: "Basic — Video Only",
        title: "Essential Videography",
        price: "R2 500",
        team: [
          "Videographer ×1"
        ],
        included: [
          "Camera Coverage",
          "Basic Lighting Setup",
          "Creative Direction"
        ],
        deliverables: [
          "Short Reel",
          "Edited Highlight Clip",
          "Digital Download Link"
        ]
      }
    }
  },

  /* ─────────────────────────────────────────────
     KID'S SHOOT
  ───────────────────────────────────────────── */
  "kids-shoot": {
    type: "dual",
    bgImage: "assets/kids-shoot/pkg-bg.jpeg",
    heading: "Choose Your Package",
    subheading: "Fun, creative, and kid-friendly production — capturing pure joy and unforgettable moments. Choose your coverage and package below.",
    packages: {
      "pv-premium": {
        label: "Premium — Photo & Video",
        title: "Full Creative Production",
        price: "R7 500",
        team: [
          "Photographer ×1",
          "Light Assistant ×1",
          "Videographer ×1",
          "Video Editor"
        ],
        included: [
          "Cameras ×2",
          "Drone Coverage",
          "LED Tube Light",
          "Photography Lights ×2",
          "Creative Direction",
          "Kid-Friendly Setup",
          "Props & Toys",
          "Balloons & Smoke Bomb Effects"
        ],
        deliverables: [
          "Digital Link — Photos & Videos",
          "50 Professionally Edited Pictures",
          "10 High-End Retouched Pictures",
          "Cinematic Highlight Video",
          "Cinematic Reel",
          "A3 Photo-book ×1",
          "A1 Canvas Photo ×1"
        ]
      },
      "pv-standard": {
        label: "Standard — Photo & Video",
        title: "Professional Coverage",
        price: "R5 000",
        team: [
          "Photographer ×1",
          "Videographer ×1"
        ],
        included: [
          "Camera Coverage",
          "Drone Coverage",
          "Lighting Setup",
          "Creative Direction",
          "Kid-Friendly Setup",
          "Props & Balloons"
        ],
        deliverables: [
          "Digital Link — Photos & Videos",
          "30 Edited Pictures",
          "5 Retouched Pictures",
          "Highlight Video",
          "Cinematic Reel",
          "A3 Photo-book ×1"
        ]
      },
      "pv-basic": {
        label: "Basic — Photo & Video",
        title: "Essential Coverage",
        price: "R3 000",
        team: [
          "Photographer ×1",
          "Videographer ×1"
        ],
        included: [
          "Camera Coverage",
          "Basic Lighting Setup",
          "Creative Direction"
        ],
        deliverables: [
          "Digital Link — Photos & Videos",
          "15 Edited Pictures",
          "Short Reel"
        ]
      },
      "po-premium": {
        label: "Premium — Photo Only",
        title: "Full Photography Experience",
        price: "R5 500",
        team: [
          "Photographer ×1",
          "Light Assistant ×1",
          "Photo Editor"
        ],
        included: [
          "Cameras ×2",
          "LED Tube Light",
          "Photography Lights ×2",
          "Creative Direction",
          "Kid-Friendly Setup",
          "Props & Toys",
          "Balloons & Smoke Bomb Effects"
        ],
        deliverables: [
          "Digital Link — Photos",
          "50 Professionally Edited Pictures",
          "10 High-End Retouched Pictures",
          "A3 Photo-book ×1",
          "A1 Canvas Photo ×1"
        ]
      },
      "po-standard": {
        label: "Standard — Photo Only",
        title: "Professional Photography",
        price: "R3 500",
        team: [
          "Photographer ×1",
          "Assistant ×1"
        ],
        included: [
          "Camera Coverage",
          "Lighting Setup",
          "Creative Direction",
          "Kid-Friendly Setup",
          "Props & Balloons"
        ],
        deliverables: [
          "Digital Link — Photos",
          "30 Edited Pictures",
          "5 Retouched Pictures",
          "A3 Photo-book ×1"
        ]
      },
      "po-basic": {
        label: "Basic — Photo Only",
        title: "Essential Photography",
        price: "R2 000",
        team: [
          "Photographer ×1"
        ],
        included: [
          "Camera Coverage",
          "Basic Lighting Setup",
          "Creative Direction"
        ],
        deliverables: [
          "Digital Link — Photos",
          "15 Edited Pictures",
          "3 Retouched Pictures"
        ]
      },
      "vo-premium": {
        label: "Premium — Video Only",
        title: "Full Videography Experience",
        price: "R6 500",
        team: [
          "Videographer ×1",
          "Light Assistant ×1",
          "Video Editor"
        ],
        included: [
          "Cameras ×2",
          "Drone Coverage",
          "LED Tube Light",
          "Creative Direction",
          "Kid-Friendly Setup",
          "Props & Toys",
          "Balloons & Smoke Bomb Effects"
        ],
        deliverables: [
          "Cinematic Highlight Video",
          "Cinematic Reel",
          "Full Edited Video",
          "Digital Download Link"
        ]
      },
      "vo-standard": {
        label: "Standard — Video Only",
        title: "Highlights Videography",
        price: "R4 000",
        team: [
          "Videographer ×1",
          "Video Editor"
        ],
        included: [
          "Camera Coverage",
          "Drone Coverage",
          "Lighting Setup",
          "Creative Direction",
          "Kid-Friendly Setup",
          "Props & Balloons"
        ],
        deliverables: [
          "Highlight Video",
          "Cinematic Reel",
          "Digital Download Link"
        ]
      },
      "vo-basic": {
        label: "Basic — Video Only",
        title: "Essential Videography",
        price: "R2 500",
        team: [
          "Videographer ×1"
        ],
        included: [
          "Camera Coverage",
          "Basic Lighting Setup",
          "Creative Direction"
        ],
        deliverables: [
          "Short Reel",
          "Edited Highlight Clip",
          "Digital Download Link"
        ]
      }
    }
  },

  /* ─────────────────────────────────────────────
     MUSIC VIDEOS
  ───────────────────────────────────────────── */
  "music-videos": {
    type: "single",
    bgImage: "assets/music-videos/pkg-bg.jpeg",
    heading: "Choose Your Package",
    subheading: "Full-scale music video productions from concept to delivery. Choose the package that matches your production scale and budget.",
    packages: {
      "premium": {
        label: "Premium",
        title: "Full Production Experience",
        price: "R8 500",
        coverage: "Up to 8 Hours Coverage",
        team: [
          "Director / Lead Videographer",
          "Drone Operator",
          "Photographer",
          "Behind-the-Scenes Content Creator",
          "Lighting Assistant",
          "Video Editor"
        ],
        included: [
          "Sony Camera with Professional Lenses",
          "Drone Coverage",
          "Godox Tube Lighting Setup",
          "Client's Preferred Location or Studio Access"
        ],
        deliverables: [
          "Cinematic Music Video",
          "Promo Video",
          "Professional Photoshoot",
          "Behind-the-Scenes Photography",
          "Behind-the-Scenes iPhone Content"
        ]
      },
      "standard": {
        label: "Standard",
        title: "Professional Visual Package",
        price: "R5 500",
        coverage: "Up to 8 Hours Coverage",
        team: [
          "Lead Videographer",
          "Drone Operator / Assistant",
          "Behind-the-Scenes Content Creator",
          "Video Editor"
        ],
        included: [
          "Sony Camera with Professional Lenses",
          "Godox Tube Lighting Setup",
          "Client's Preferred Location or Studio Access"
        ],
        deliverables: [
          "Music Video",
          "Promo Video",
          "Behind-the-Scenes iPhone Content"
        ]
      },
      "basic": {
        label: "Basic",
        title: "Essential Visual Coverage",
        price: "R3 500",
        coverage: "Up to 8 Hours Coverage",
        team: [
          "Lead Videographer",
          "Video Editor"
        ],
        included: [
          "Sony Camera with Professional Lenses",
          "Client's Preferred Location or Studio Access"
        ],
        deliverables: [
          "Music Video Only"
        ]
      }
    }
  },

  /* ─────────────────────────────────────────────
     PROMO VIDEOS
  ───────────────────────────────────────────── */
  "promo-videos": {
    type: "single",
    bgImage: "assets/promo-videos/pkg-bg.jpeg",
    heading: "Choose Your Package",
    subheading: "Cinematic promotional content that elevates your brand. Choose the package that fits your production needs.",
    packages: {
      "premium": {
        label: "Premium",
        title: "Complete Promo Experience",
        price: "R5 500",
        coverage: "Up to 8 Hours Coverage",
        team: [
          "Director / Lead Videographer",
          "Drone Operator",
          "Photographer",
          "Behind-the-Scenes Content Creator",
          "Lighting Assistant",
          "Video Editor"
        ],
        included: [
          "Sony Camera with Professional Lenses",
          "Drone Coverage",
          "Godox Tube Lighting Setup",
          "Client's Preferred Location or Studio Access"
        ],
        deliverables: [
          "Cinematic Promo Video",
          "Professional Photoshoot",
          "Behind-the-Scenes Photography",
          "Behind-the-Scenes iPhone Content"
        ]
      },
      "standard": {
        label: "Standard",
        title: "Professional Promo Package",
        price: "R3 500",
        coverage: "Up to 8 Hours Coverage",
        team: [
          "Lead Videographer",
          "Drone Operator / Assistant",
          "Behind-the-Scenes Content Creator",
          "Video Editor"
        ],
        included: [
          "Sony Camera with Professional Lenses",
          "Godox Tube Lighting Setup",
          "Client's Preferred Location or Studio Access"
        ],
        deliverables: [
          "Promo Video",
          "Behind-the-Scenes iPhone Content"
        ]
      },
      "basic": {
        label: "Basic",
        title: "Essential Promo Coverage",
        price: "R2 000",
        coverage: "Up to 4 Hours Coverage",
        team: [
          "Lead Videographer",
          "Video Editor"
        ],
        included: [
          "Sony Camera with Professional Lenses",
          "Client's Preferred Location or Studio Access"
        ],
        deliverables: [
          "Promo Video Only"
        ]
      }
    }
  },

  /* ─────────────────────────────────────────────
     FREELANCING
  ───────────────────────────────────────────── */
  "freelancing": {
    type: "rates",
    bgImage: "assets/freelancing/pkg-bg.jpeg",
    heading: "Freelancing Rates",
    subheading: "Videography services with 8 hours coverage. Equipment excluded. Full payment required before the gig date.",
    note: "Rates apply to videography services only and do not include equipment hire. Transportation, food, and accommodation costs are excluded.",
    rates: [
      { service: "White & Traditional Wedding", rate: "R5 000", coverage: "8 Hours" },
      { service: "White Wedding",               rate: "R3 500", coverage: "8 Hours" },
      { service: "Traditional Wedding",         rate: "R3 000", coverage: "8 Hours" },
      { service: "Traditional Ceremonies",      rate: "R2 500", coverage: "8 Hours" },
      { service: "Events",                      rate: "R3 000", coverage: "8 Hours" },
      { service: "Corporate Events",            rate: "R2 500", coverage: "8 Hours" }
    ]
  }

};