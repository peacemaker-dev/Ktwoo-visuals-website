/**
 * gallery-data.js
 * ─────────────────────────────────────────────
 * Centralized gallery data for all Ktwoo Visuals service pages.
 *
 * HOW TO ADD IMAGES:
 *   Add an object to the relevant service array below.
 *   Only src and alt are required. type defaults to "image".
 *
 * HOW TO ADD A NEW SERVICE:
 *   Add a new key to the galleries object with an empty array.
 *   Set data-gallery="your-service-key" on the gallery grid element.
 *
 * FUTURE VIDEO SUPPORT:
 *   Add type: "video" with a poster and src to any array.
 *   The gallery renderer will handle it automatically when implemented.
 *
 * STRUCTURE:
 * {
 *   type    : "image" | "video"  — defaults to "image" if omitted
 *   src     : string             — path to image or video file
 *   alt     : string             — descriptive alt text for accessibility
 *   poster  : string             — thumbnail for video type (optional)
 * }
 */

const galleries = {

  "matric-dance": [
    { type: "image", src: "assets/matric-dance/mtd-1.png", alt: "Matric dance couple portrait" },
    { type: "image", src: "assets/matric-dance/mtd-2.png", alt: "Matric dance full length shot" },
    { type: "image", src: "assets/matric-dance/mtd-3.png", alt: "Matric dance group photo" },
    { type: "image", src: "assets/matric-dance/mtd-4.png", alt: "Matric dance candid moment" },
    { type: "image", src: "assets/matric-dance/mtd-5.png", alt: "Matric dance smoke bomb effect" },
    { type: "image", src: "assets/matric-dance/mtd-6.jpg", alt: "Matric dance champagne props" },
    { type: "image", src: "assets/matric-dance/mtd-7.png", alt: "Matric dance cinematic portrait" },
    { type: "image", src: "assets/matric-dance/mtd-8.png", alt: "Matric dance drone aerial shot" },
    { type: "image", src: "assets/matric-dance/mtd-9.png", alt: "Matric dance drone aerial shot" },
    { type: "image", src: "assets/matric-dance/mtd-10.png", alt: "Matric dance drone aerial shot" },
  ],

  "photography": [
    { type: "image", src: "assets/photography/photo (11).jpg", alt: "Professional portrait photography" },
    { type: "image", src: "assets/photography/photo (5).jpg", alt: "Outdoor photography session" },
    { type: "image", src: "assets/photography/photo (3).jpg", alt: "Studio photography with lighting" },
    { type: "image", src: "assets/photography/photo (4).jpg", alt: "Photography with smoke bomb effects" },
    { type: "image", src: "assets/photography/photo (6).jpg", alt: "Professional photography portrait" },
    { type: "image", src: "assets/photography/photo (2).jpg", alt: "Photography creative direction" },
    { type: "image", src: "assets/photography/photo (14).jpg", alt: "Photography champagne props" },
    { type: "image", src: "assets/photography/photo (9).jpg", alt: "Photography cinematic edit" },
  ],

  "videography": [
    { type: "image", src: "assets/videography/gallery-1.webp", alt: "Cinematic videography behind the scenes" },
    { type: "image", src: "assets/videography/gallery-2.webp", alt: "Videography drone aerial footage" },
    { type: "image", src: "assets/videography/gallery-3.webp", alt: "Videography lighting setup" },
    { type: "image", src: "assets/videography/gallery-4.webp", alt: "Videography camera setup" },
    { type: "image", src: "assets/videography/gallery-5.webp", alt: "Cinematic videography edit" },
    { type: "image", src: "assets/videography/gallery-6.webp", alt: "Videography production team" },
    { type: "image", src: "assets/videography/gallery-7.webp", alt: "Videography outdoor shoot" },
    { type: "image", src: "assets/videography/gallery-8.webp", alt: "Videography highlight reel frame" },
  ],

  "graduation": [
    { type: "image", src: "assets/graduation/graduation (2).png", alt: "Graduation portrait photography" },
    { type: "image", src: "assets/graduation/graduation (1).jpg", alt: "Graduation gown full length shot" },
    { type: "image", src: "assets/graduation/graduation (15).jpg", alt: "Graduation outdoor shoot" },
    { type: "image", src: "assets/graduation/graduation (5).png", alt: "Graduation drone aerial shot" },
    { type: "image", src: "assets/graduation/graduation (6).png", alt: "Graduation cinematic portrait" },
    { type: "image", src: "assets/graduation/graduation (7).png", alt: "Graduation smoke bomb effects" },
    { type: "image", src: "assets/graduation/graduation (10).png", alt: "Graduation champagne props" },
    { type: "image", src: "assets/graduation/graduation (9).png", alt: "Graduation highlight video frame" },
  ],

  "photoshoot": [
    { type: "image", src: "assets/photoshoot/gallery-1.webp", alt: "Creative photoshoot portrait" },
    { type: "image", src: "assets/photoshoot/gallery-2.webp", alt: "Photoshoot outdoor session" },
    { type: "image", src: "assets/photoshoot/gallery-3.webp", alt: "Photoshoot studio lighting" },
    { type: "image", src: "assets/photoshoot/gallery-4.webp", alt: "Photoshoot smoke bomb effects" },
    { type: "image", src: "assets/photoshoot/gallery-5.webp", alt: "Photoshoot creative direction" },
    { type: "image", src: "assets/photoshoot/gallery-6.webp", alt: "Photoshoot cinematic edit" },
    { type: "image", src: "assets/photoshoot/gallery-7.webp", alt: "Photoshoot champagne props" },
    { type: "image", src: "assets/photoshoot/gallery-8.webp", alt: "Photoshoot drone aerial shot" },
  ],

  "kids-shoot": [
    { type: "image", src: "assets/kids-shoot/gallery-1.webp", alt: "Kids shoot fun portrait" },
    { type: "image", src: "assets/kids-shoot/gallery-2.webp", alt: "Kids shoot with balloons" },
    { type: "image", src: "assets/kids-shoot/gallery-3.webp", alt: "Kids shoot outdoor session" },
    { type: "image", src: "assets/kids-shoot/gallery-4.webp", alt: "Kids shoot with props and toys" },
    { type: "image", src: "assets/kids-shoot/gallery-5.webp", alt: "Kids shoot creative lighting" },
    { type: "image", src: "assets/kids-shoot/gallery-6.webp", alt: "Kids shoot candid moment" },
    { type: "image", src: "assets/kids-shoot/gallery-7.webp", alt: "Kids shoot smoke bomb effects" },
    { type: "image", src: "assets/kids-shoot/gallery-8.webp", alt: "Kids shoot full length portrait" },
  ],

  "music-videos": [
    { type: "image", src: "assets/music-videos/gallery-1.webp", alt: "Music video production behind the scenes" },
    { type: "image", src: "assets/music-videos/gallery-2.webp", alt: "Music video drone aerial shot" },
    { type: "image", src: "assets/music-videos/gallery-3.webp", alt: "Music video lighting setup" },
    { type: "image", src: "assets/music-videos/gallery-4.webp", alt: "Music video artist portrait" },
    { type: "image", src: "assets/music-videos/gallery-5.webp", alt: "Music video cinematic frame" },
    { type: "image", src: "assets/music-videos/gallery-6.webp", alt: "Music video behind the scenes content" },
    { type: "image", src: "assets/music-videos/gallery-7.webp", alt: "Music video production team" },
    { type: "image", src: "assets/music-videos/gallery-8.webp", alt: "Music video outdoor location" },
  ],

  "promo-videos": [
    { type: "image", src: "assets/promo-videos/gallery-1.webp", alt: "Promo video production behind the scenes" },
    { type: "image", src: "assets/promo-videos/gallery-2.webp", alt: "Promo video brand shoot" },
    { type: "image", src: "assets/promo-videos/gallery-3.webp", alt: "Promo video cinematic frame" },
    { type: "image", src: "assets/promo-videos/gallery-4.webp", alt: "Promo video drone aerial shot" },
    { type: "image", src: "assets/promo-videos/gallery-5.webp", alt: "Promo video lighting setup" },
    { type: "image", src: "assets/promo-videos/gallery-6.webp", alt: "Promo video behind the scenes content" },
    { type: "image", src: "assets/promo-videos/gallery-7.webp", alt: "Promo video outdoor location" },
    { type: "image", src: "assets/promo-videos/gallery-8.webp", alt: "Promo video production team" },
  ],

  "freelancing": [
    { type: "image", src: "assets/freelancing/gallery-1.webp", alt: "Wedding videography ceremony" },
    { type: "image", src: "assets/freelancing/gallery-2.webp", alt: "Traditional wedding videography" },
    { type: "image", src: "assets/freelancing/gallery-3.webp", alt: "Event videography coverage" },
    { type: "image", src: "assets/freelancing/gallery-4.webp", alt: "Corporate event videography" },
    { type: "image", src: "assets/freelancing/gallery-5.webp", alt: "Wedding drone aerial shot" },
    { type: "image", src: "assets/freelancing/gallery-6.webp", alt: "Wedding cinematic highlight" },
    { type: "image", src: "assets/freelancing/gallery-7.webp", alt: "Event videography candid moment" },
    { type: "image", src: "assets/freelancing/gallery-8.webp", alt: "Wedding traditional ceremony" },
  ],

};