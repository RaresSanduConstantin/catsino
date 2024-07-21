import { connectDB } from '@/lib/mongodb';
import User from '../../../models/User';
import { NextApiHandler } from 'next';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    await connectDB();

    try {
        // Select only the 'username' and 'score' fields from the User documents
        const users = await User.find({}).select('username score email _id');  // '-_id' excludes the '_id' field
        return new Response(JSON.stringify(users), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache, no-store, must-revalidate',  // Prevents caching of the response
                'Pragma': 'no-cache',  // For compatibility with HTTP/1.0 caches
                'Expires': '0'  // Proxies older caches
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "No users" }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}