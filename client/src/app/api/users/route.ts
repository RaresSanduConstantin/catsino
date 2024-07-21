import { connectDB } from '@/lib/mongodb';
import User from '../../../models/User';
import { NextApiHandler } from 'next';
import { NextRequest } from 'next/server';

export const dynamic = "force-dynamic"; // Prevents caching of the response

export async function GET(request: NextRequest) {
    await connectDB();

    try {
        const users = await User.find({}).select('username score email _id'); 
        return new Response(JSON.stringify(users), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache, no-store, must-revalidate',  // Prevents caching of the response
                'Pragma': 'no-cache',
                'Expires': '0'
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