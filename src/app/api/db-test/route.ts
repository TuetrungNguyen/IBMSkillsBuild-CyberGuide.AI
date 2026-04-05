import { NextResponse } from 'next/server';
import cloudant from '@/lib/cloudant';

export async function GET() {
  try {
    // This simply asks the IBM Cloudant server for its basic metadata.
    // If it succeeds, our connection and credentials are valid.
    const response = await cloudant.getServerInformation();
    
    return NextResponse.json({ 
      status: "success", 
      message: "Successfully connected to IBM Cloudant Vector DB!",
      cloudant_version: response.result.version
    });
  } catch (error: any) {
    console.error("Cloudant Connection Error:", error);
    
    return NextResponse.json({ 
      status: "error", 
      message: "Failed to connect to the IBM Cloudant database.",
      error: error.message || "Unknown error occurred"
    }, { status: 500 });
  }
}
