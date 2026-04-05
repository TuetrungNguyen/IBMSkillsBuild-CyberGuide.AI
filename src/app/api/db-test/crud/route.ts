import { NextResponse } from 'next/server';
import cloudant from '@/lib/cloudant';

const DB_NAME = 'cyberguide_test_db';

export async function GET() {
  try {
    // 1. Ensure the Database exists
    try {
      await cloudant.putDatabase({ db: DB_NAME });
    } catch (err: any) {
      // Error code 412 means the DB already exists, which is perfectly fine.
      if (err.status !== 412) throw err;
    }

    // 2. SEND (Write) Information to the Database
    const testDocument = {
      role: "Cybersecurity Analyst",
      skill: "Threat Detection",
      timestamp: new Date().toISOString(),
      message: "This is a test insertion from our Next.js backend!"
    };

    const writeResponse = await cloudant.postDocument({
      db: DB_NAME,
      document: testDocument
    });

    const newDocumentId = writeResponse.result.id;

    // 3. RECEIVE (Read) Information from the Database
    // We fetch the exact document we just created using its generated ID
    const readResponse = await cloudant.getDocument({
      db: DB_NAME,
      docId: newDocumentId!
    });

    // 4. Return the proof to the browser!
    return NextResponse.json({ 
      status: "success", 
      step_1_write: {
        message: "Successfully SENT data to Cloudant.",
        document_id: newDocumentId
      },
      step_2_read: {
        message: "Successfully RECEIVED data back from Cloudant.",
        database_record: readResponse.result
      }
    });

  } catch (error: any) {
    console.error("Database Test Error:", error);
    return NextResponse.json({ 
      status: "error", 
      message: "Failed to send/receive data.",
      error: error.message 
    }, { status: 500 });
  }
}
