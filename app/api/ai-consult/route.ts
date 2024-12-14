


// pages/api/consult.js
import axios from 'axios';
import { NextResponse } from 'next/server';

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/complete';

export const POST = async (req: Request) => {
    // if (req.method === 'POST') {
    //     const symptoms = req.json();

    try {
        // Make a request to Claude API
        const symptoms = req.json();

        console.log(symptoms);

        const response = await axios.post(
            CLAUDE_API_URL,
            {
                prompt: `The patient describes the following symptoms: ${`headache, feverish, tiredness`}. What could be the possible diagnosis?`,
                max_tokens_to_sample: 300,
                model: 'claude-3-5-haiku-20241022',
            },
            {
                headers: {
                    'x-api-key': process.env.ANTHROPIC_API_KEY,
                    'Content-Type': 'application/json',
                },
            }
        );

        // Log the full response to check its structure
        console.log('Claude API Response:', response.data);

        // Ensure we are capturing the correct part of the response
        const diagnosis = response.data.completion?.trim();

        if (diagnosis) {
            return NextResponse.json({ diagnosis });
        } else {
            return NextResponse.json({ error: 'Failed to retrieve diagnosis from the response.' });
        }
    } catch (error: any) {
        console.error('Error fetching diagnosis from Claude:', error.response?.data || error.message);
        return NextResponse.json({ ...error.response?.data });
    }
    // } else {
    //     return NextResponse.json({ message: 'Only POST requests are allowed' });
    // }
}
