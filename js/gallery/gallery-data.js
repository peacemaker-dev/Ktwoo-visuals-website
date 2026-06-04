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
    { type: "image", src: "assets/music-videos/music-video (13).jpg", alt: "Cinematic videography behind the scenes" },
    { type: "image", src: "assets/music-videos/music-video (2).jpg", alt: "Videography drone aerial footage" },
    { type: "image", src: "assets/music-videos/music-video (3).jpg", alt: "Videography lighting setup" },
    { type: "image", src: "assets/music-videos/music-video (13).jpg", alt: "Videography camera setup" },
    { type: "image", src: "assets/music-videos/music-video (8).jpg", alt: "Cinematic videography edit" },
    { type: "image", src: "assets/music-videos/music-video (7).jpg", alt: "Videography production team" },
    { type: "image", src: "assets/music-videos/music-video (9).jpg", alt: "Videography outdoor shoot" },
    { type: "image", src: "assets/music-videos/music-video (10).jpg", alt: "Videography highlight reel frame" },
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
    { type: "image", src: "assets/photoshoot/photoshoot (14).png", alt: "Creative photoshoot portrait" },
    { type: "image", src: "assets/photoshoot/photoshoot (23).jpg", alt: "Photoshoot outdoor session" },
    { type: "image", src: "assets/photoshoot/photoshoot (31).png", alt: "Photoshoot studio lighting" },
    { type: "image", src: "assets/photoshoot/photoshoot (29).jpg", alt: "Photoshoot smoke bomb effects" },
    { type: "image", src: "assets/photoshoot/photoshoot (10).png", alt: "Photoshoot creative direction" },
    { type: "image", src: "assets/photoshoot/photoshoot (25).jpg", alt: "Photoshoot cinematic edit" },
    { type: "image", src: "assets/photoshoot/photoshoot (7).png", alt: "Photoshoot champagne props" },
    { type: "image", src: "assets/photoshoot/photoshoot (8).png", alt: "Photoshoot drone aerial shot" },
  ],

  "kids-shoot": [
    { type: "image", src: "assets/kids-shoot/kids-shoot-1.jpg", alt: "Kids shoot fun portrait" },
    { type: "image", src: "assets/kids-shoot/kids-shoot-2.jpg", alt: "Kids shoot with balloons" },
    { type: "image", src: "assets/kids-shoot/kids-shoot-3.jpg", alt: "Kids shoot outdoor session" },
    { type: "image", src: "assets/kids-shoot/kids-shoot-4.jpg", alt: "Kids shoot with props and toys" },
    { type: "image", src: "assets/kids-shoot/kids-shoot-5.jpg", alt: "Kids shoot creative lighting" },
    { type: "image", src: "assets/kids-shoot/kids-shoot-6.jpg", alt: "Kids shoot candid moment" },
    { type: "image", src: "assets/kids-shoot/kids-shoot-7.jpg", alt: "Kids shoot smoke bomb effects" },
    { type: "image", src: "assets/kids-shoot/kids-shoot-8.jpg", alt: "Kids shoot full length portrait" },
  ],

  "music-videos": [
    { type: "image", src: "assets/music-videos/music-video (13).jpg", alt: "Music video production behind the scenes" },
    { type: "image", src: "assets/music-videos/music-video (2).jpg", alt: "Music video drone aerial shot" },
    { type: "image", src: "assets/music-videos/music-video (3).jpg", alt: "Music video lighting setup" },
    { type: "image", src: "assets/music-videos/music-video (4).jpg", alt: "Music video artist portrait" },
    { type: "image", src: "assets/music-videos/music-video (9).jpg", alt: "Music video cinematic frame" },
    { type: "image", src: "assets/music-videos/music-video (10).jpg", alt: "Music video behind the scenes content" },
    { type: "image", src: "assets/music-videos/music-video (7).jpg", alt: "Music video production team" },
    { type: "image", src: "assets/music-videos/music-video (8).jpg", alt: "Music video outdoor location" },
  ],

  "promo-videos": [
    { type: "image", src: "assets/promo-videos/promo-video.jpg", alt: "Promo video production behind the scenes" },
    { type: "image", src: "assets/promo-videos/promo-video (2).jpg", alt: "Promo video brand shoot" },
    { type: "image", src: "assets/promo-videos/promo-video (3).jpg", alt: "Promo video cinematic frame" },
    { type: "image", src: "assets/promo-videos/promo-video (4).jpg", alt: "Promo video drone aerial shot" },
    { type: "image", src: "assets/promo-videos/promo-video (5).jpg", alt: "Promo video lighting setup" },
    { type: "image", src: "assets/promo-videos/promo-video (6).jpg", alt: "Promo video behind the scenes content" },
    { type: "image", src: "assets/promo-videos/promo-video (7).jpg", alt: "Promo video outdoor location" },
    { type: "image", src: "assets/promo-videos/promo-video (8).jpg", alt: "Promo video production team" },
  ],

  "freelancing": [
    { type: "image", src: "assets/freelance/freelance (5).jpg", alt: "Wedding videography ceremony" },
    { type: "image", src: "assets/freelance/freelance (2).jpg", alt: "Traditional wedding videography" },
    { type: "image", src: "assets/freelance/freelance (3).jpg", alt: "Event videography coverage" },
    { type: "image", src: "assets/freelance/freelance (4).jpg", alt: "Corporate event videography" },
    { type: "image", src: "assets/freelance/freelance (6).jpg", alt: "Wedding drone aerial shot" },
    { type: "image", src: "assets/freelance/freelance (7).jpg", alt: "Wedding cinematic highlight" },
    { type: "image", src: "assets/freelance/freelance (8).jpg", alt: "Event videography candid moment" },
    { type: "image", src: "assets/freelance/freelance (9).jpg", alt: "Wedding traditional ceremony" },
  ],

};