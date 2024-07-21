import {connectDB} from '@/lib/mongodb';
import User from '../../../../models/User';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    await connectDB();

    // Extract the user ID from the URL
    const email = request.nextUrl.pathname.split('/').pop();
    console.log(email)

    try {
        // Fetch the user by ID and select only relevant fields
        const user = await User.findOne({ email: email }).select('username score');

        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify(user), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "No user found" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
