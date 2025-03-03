import dotenv from 'dotenv';
import express from 'express';
import fetch from 'node-fetch';
import type { Request, Response } from 'express';

const router = express.Router();

// Load environment variables from .env file
dotenv.config();

const AI_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const AI_API_KEY = process.env.OPENAI_API_KEY;

router.post('/', async (req: Request, res: Response) => {
  const { messages } = req.body;

  // Set response headers for SSE (Server-Sent Events)
  res.setHeader('Content-Type', 'text/event-stream'); // Indicate the response is an event stream
  res.setHeader('Cache-Control', 'no-cache'); // Disable caching for real-time updates
  res.setHeader('Connection', 'keep-alive'); // Keep the connection open for streaming

  // Define the payload to send to the AI API
  const payload = {
    model: 'google/gemini-2.0-flash-lite-preview-02-05:free', // Specify the AI model
    messages, // Forward the messages from the client
    stream: true, // Enable streaming response
  };

  try {
    // Make the POST request to the AI API
    const response = await fetch(AI_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // Get the response body stream
    const stream = response.body;

    // Handle cases where the API returns an error or no stream
    if (!response.ok || !stream) {
      const error = await response.text(); // Read the error response as text
      throw new Error(`Error from OpenAI: ${error}`); // Throw an error with the API's message
    }

    // Listen for data chunks from the stream
    stream.on('data', (chunk) => {
      const data = chunk.toString(); // Convert the chunk to a string
      console.log('Received chunk:', data); // Log the received chunk for debugging

      res.write(data); // Write the chunk to the client
    });

    // Handle the end of the stream
    stream.on('end', () => {
      res.end(); // Close the connection
    });

    // Handle any errors that occur during the stream
    stream.on('error', (err) => {
      console.error('Stream error:', err);
      res.status(500).send('Error in streaming response');
    });
  } catch (error) {
    console.error('Error occurred:', error);

    // Send an error response with details
    res.status(500).json({
      error: 'Internal Server Error',
      details: (error as Error).message,
    });
  }
});

export default router;
