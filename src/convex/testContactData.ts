import { mutation } from "./_generated/server";

export const addTestContacts = mutation({
  args: {},
  handler: async (ctx) => {
    // Clear any existing test data first
    const existingTests = await ctx.db
      .query("contacts")
      .filter((q) => q.eq(q.field("name"), "TEST USER"))
      .collect();
    
    for (const test of existingTests) {
      await ctx.db.delete(test._id);
    }

    // Add sample test contact submissions
    const testContacts = [
      {
        name: "TEST USER",
        email: "test.user1@example.com",
        subject: "TEST: Inquiry about PCB Design Services",
        message: "Hi, I'm interested in learning more about your PCB design services for a high-speed digital project. Could you provide more information about your process and pricing?",
        status: "new",
      },
      {
        name: "TEST USER",
        email: "test.user2@example.com",
        subject: "TEST: Collaboration Opportunity",
        message: "Hello! I came across your portfolio and I'm impressed with your work on the STM32 GPS tracker. I'd like to discuss a potential collaboration on a similar IoT project.",
        status: "new",
      },
      {
        name: "TEST USER",
        email: "test.user3@example.com",
        subject: "TEST: Question about KiCad Design",
        message: "I noticed you use KiCad for your designs. I'm working on a 4-layer board and would love to get your advice on signal integrity best practices.",
        status: "new",
      },
    ];

    const insertedIds = [];
    for (const contact of testContacts) {
      const id = await ctx.db.insert("contacts", contact);
      insertedIds.push(id);
    }

    return {
      success: true,
      message: `Successfully added ${testContacts.length} test contact submissions`,
      insertedIds,
    };
  },
});
