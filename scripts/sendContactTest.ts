#!/usr/bin/env tsx

/**
 * Test script to verify contact form email sending pipeline
 * 
 * This script directly invokes the contact.submit procedure to test
 * that emails are being routed to the correct recipient (CONTACT_TO_EMAIL).
 * 
 * Usage:
 *   npx tsx scripts/sendContactTest.ts
 */

import { createCaller } from "../src/server/trpc/root";

async function main() {
  console.log("\n=================================================");
  console.log("Contact Form Email Test - Starting");
  console.log("=================================================\n");
  
  // Create a tRPC caller (server-side invocation)
  const caller = createCaller({});
  
  // Test payload
  const testData = {
    name: "Test User",
    email: "test@example.com",
    phone: "+1 (555) 123-4567",
    inquiryType: "other" as const,
    message: "This is a test message for verifying Contact email routing. If you receive this email, the pipeline is working correctly!",
  };
  
  console.log("Submitting test contact form with data:");
  console.log(JSON.stringify(testData, null, 2));
  console.log("\n");
  
  try {
    // Invoke the contact.submit mutation
    const result = await caller.contact.submit(testData);
    
    console.log("\n=================================================");
    console.log("Test Result - SUCCESS");
    console.log("=================================================");
    console.log("Response:", JSON.stringify(result, null, 2));
    console.log("\nCheck the logs above for email sending details.");
    console.log("If CONTACT_TO_EMAIL is set, the email was sent to that address.");
    console.log("=================================================\n");
    
    process.exit(0);
  } catch (error) {
    console.error("\n=================================================");
    console.error("Test Result - FAILURE");
    console.error("=================================================");
    console.error("Error:", error);
    console.error("=================================================\n");
    
    process.exit(1);
  }
}

main();
