import { mutation } from "./_generated/server";

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    // Clear existing projects
    const existing = await ctx.db.query("projects").collect();
    for (const project of existing) {
      await ctx.db.delete(project._id);
    }

    // Add sample projects
    const projects = [
      {
        title: "Cellular-Enabled STM32 GPS Asset Tracker",
        slug: "cellular-enabled-stm32-gps-asset-tracker",
        summary: "A compact, robust hardware platform for real-time asset tracking integrating STM32 microcontroller with GPS/GNSS and GSM cellular modules. Designed for vehicle tracking, fleet management, and high-value asset monitoring with 12V power input.",
        heroImage: "https://harmless-tapir-303.convex.cloud/api/storage/32615aed-c452-430e-8b30-6bb97de5df82",
        featured: true,
        technologies: ["STM32", "GPS/GNSS", "GSM/GPRS", "4-Layer PCB", "KiCad", "SPI", "I2C", "UART", "RF Design", "50-Ohm Impedance"],
        concept: "This project is a compact, robust, and feature-rich hardware platform for real-time asset tracking. At its core, it integrates a powerful STM32 microcontroller with dedicated GPS/GNSS and GSM cellular modules. The device is designed to acquire precise location coordinates from satellite systems and transmit this data, along with any additional sensor readings, to a remote server over the cellular network. Engineered for reliability in mobile environments, the board accepts a wide-range 12V power input, making it ideal for vehicle tracking, fleet management, and high-value asset monitoring. The inclusion of standard peripheral interfaces like SPI and I2C allows for future expansion with sensors such as accelerometers or temperature probes, enabling more sophisticated applications like driver behavior monitoring or cold chain logistics.",
        layoutStrategy: "The architecture is centered around the STM32 MCU which interfaces with the GPS module over UART to receive NMEA sentences and manages the GSM modem using AT commands for data transmission. The decision to use a 4-layer PCB was critical for ensuring signal integrity and mitigating noise in this mixed-signal RF design. The two most critical RF subsystems are the GPS and GSM antennas - both require 50-ohm controlled impedance transmission lines to ensure maximum signal power transfer. A full 6-pin SIM card interface is implemented with power, clock, data, reset, and card presence detection. The current stackup defines all four layers as signal, but a superior stackup would be Signal-Ground-Power-Signal, dedicating an entire inner layer to be a solid, uninterrupted ground plane for low-inductance return paths and improved EMI/EMC performance.",
        challenges: "The primary challenge was ensuring RF performance and signal integrity for both the GPS and GSM subsystems. The GPS_ANT and GSM_ANT traces must be routed as 50-ohm controlled impedance transmission lines to maximize signal power transfer from the antennas to the sensitive receivers. Component placement was critical - the GPS and GSM modules needed to be as close as possible to their respective antenna connectors to minimize transmission line losses. Another key challenge was managing the mixed-signal environment with sensitive RF sections alongside switching power regulation circuitry. The recommendation for future revisions is to implement a Signal-Ground-Power-Signal stackup with a dedicated solid ground plane to significantly improve RF reliability and EMI/EMC performance.",
        schematicImage: "https://harmless-tapir-303.convex.cloud/api/storage/46121b6c-a850-4ce2-a8c4-3cfcfc51db6c",
        layoutImages: [
          "https://harmless-tapir-303.convex.cloud/api/storage/3a88210c-b4be-40e0-8ea3-447672a727b6",
          "https://harmless-tapir-303.convex.cloud/api/storage/0725169e-10e0-4c43-9adf-57b3e53bbbbf",
          "https://harmless-tapir-303.convex.cloud/api/storage/54407332-879e-4980-b3b2-3242784de436",
          "https://harmless-tapir-303.convex.cloud/api/storage/6a1c0853-cf21-40c5-b1ec-db13b34cc2cb",
          "https://harmless-tapir-303.convex.cloud/api/storage/af2b5d6e-315d-41f5-90d1-de593b02cd79",
          "https://harmless-tapir-303.convex.cloud/api/storage/212d2b11-28b4-4a24-b1ce-a68490113b1c"
        ],
        githubUrl: "https://github.com/Saie12/KICAD-STM32-GPS-Tracker-Project/tree/main",
        order: 1,
      },
      {
        title: "High-Speed Ethernet Interface",
        slug: "high-speed-ethernet-interface",
        summary: "6-layer PCB design for 100BASE-TX Ethernet with ARM Cortex-M4, featuring advanced signal integrity techniques.",
        heroImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
        featured: true,
        technologies: ["KiCad", "6-Layer PCB", "Ethernet", "ARM Cortex-M4", "Differential Pairs", "EMI/EMC", "C"],
        concept: "Designed a robust Ethernet interface board using the STM32F407 microcontroller with integrated MAC and an external PHY (LAN8720A). The goal was to create a reliable 100Mbps Ethernet connection with proper EMI mitigation for industrial environments.",
        layoutStrategy: "Implemented a 6-layer stack-up optimized for high-speed signals: Top Signal - GND - Signal - Power - GND - Bottom Signal. The Ethernet differential pairs (TX+/TX-, RX+/RX-) were routed as 100-ohm controlled impedance with matched lengths within 50 mils. Used ground plane cutouts strategically to control impedance and minimize crosstalk. The magnetics module was placed close to the RJ45 connector with proper isolation.",
        challenges: "The main challenge was meeting EMC requirements for industrial use. I implemented a comprehensive EMI mitigation strategy including: ferrite beads on power lines, proper grounding with star topology, shielding on critical traces, and careful component placement to minimize loop areas. All high-speed signals were kept away from board edges and properly terminated.",
        layoutImages: [
          "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=400&fit=crop",
          "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=600&h=400&fit=crop"
        ],
        githubUrl: "https://github.com",
        order: 2,
      },
    ];

    for (const project of projects) {
      await ctx.db.insert("projects", project);
    }

    return { success: true, count: projects.length };
  },
});