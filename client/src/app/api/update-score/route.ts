// app/api/update-score.ts
import {connectDB} from '@/lib/mongodb';
import User from '@/models/User';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    await connectDB();

    // Parse JSON body from the request
    const data = await request.json();
    const { email, score } = data;

    if (!email || score === undefined) {
        return new Response(JSON.stringify({ error: 'Missing email or score' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        // Update the user's score
        const user = await User.findOneAndUpdate(
            { email: email },
            { $set: { score: score } },
            { new: true }
        );

        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ success: true, score: user.score }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to update score" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
