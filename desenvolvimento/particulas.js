particlesJS("particles-container", {
    particles: {
      number: { value: 150, density: { enable: true, value_area: 800 } },
      color: { value: "#A80ABA" },
      shape: {
        type: "circle",
        stroke: { width: 0.5, color: "#A80ABA" },
        polygon: { nb_sides: 5 }
      },
      opacity: { value: 0.5, random: false },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 6,
        direction: "none",
        out_mode: "out"
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
       
      },
      modes: {
        repulse: { distance: 200, duration: 15 },
        push: { particles_nb: 4 }
      }
    },
    retina_detect: true
  });
