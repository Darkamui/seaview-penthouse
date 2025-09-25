import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Define the expected form data interface
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  checkIn: string;
  checkOut: string;
  guests?: string;
  eventType?: string;
  message?: string;
}

// Rate limiting - simple in-memory store (for production, use Redis or similar)
const submissions = new Map<string, number[]>();
const MAX_SUBMISSIONS_PER_HOUR = 5;
const HOUR_IN_MS = 60 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const userSubmissions = submissions.get(ip) || [];

  // Remove submissions older than 1 hour
  const recentSubmissions = userSubmissions.filter(time => now - time < HOUR_IN_MS);
  submissions.set(ip, recentSubmissions);

  return recentSubmissions.length >= MAX_SUBMISSIONS_PER_HOUR;
}

function addSubmission(ip: string): void {
  const userSubmissions = submissions.get(ip) || [];
  userSubmissions.push(Date.now());
  submissions.set(ip, userSubmissions);
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    // Check rate limiting
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse request body
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.checkIn || !body.checkOut) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, check-in date, and check-out date are required.' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format.' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(body.name),
      email: sanitizeInput(body.email),
      phone: body.phone ? sanitizeInput(body.phone) : '',
      checkIn: sanitizeInput(body.checkIn),
      checkOut: sanitizeInput(body.checkOut),
      guests: body.guests ? sanitizeInput(body.guests) : 'Not specified',
      eventType: body.eventType ? sanitizeInput(body.eventType) : 'Not specified',
      message: body.message ? sanitizeInput(body.message) : 'No additional message'
    };

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Format dates for better readability
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    // Create email content
    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #00274d; border-bottom: 3px solid #d4af37; padding-bottom: 10px; margin-bottom: 20px;">
            🏖️ New Booking Inquiry - Seaview Penthouse
          </h2>

          <div style="margin-bottom: 25px;">
            <h3 style="color: #00274d; margin-bottom: 15px;">👤 Contact Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #555; width: 120px;">Name:</td>
                <td style="padding: 8px 0; color: #333;">${sanitizedData.name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
                <td style="padding: 8px 0; color: #333;">${sanitizedData.email}</td>
              </tr>
              ${sanitizedData.phone ? `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td>
                <td style="padding: 8px 0; color: #333;">${sanitizedData.phone}</td>
              </tr>
              ` : ''}
            </table>
          </div>

          <div style="margin-bottom: 25px;">
            <h3 style="color: #00274d; margin-bottom: 15px;">📅 Booking Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #555; width: 120px;">Check-in:</td>
                <td style="padding: 8px 0; color: #333;">${formatDate(sanitizedData.checkIn)}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Check-out:</td>
                <td style="padding: 8px 0; color: #333;">${formatDate(sanitizedData.checkOut)}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Guests:</td>
                <td style="padding: 8px 0; color: #333;">${sanitizedData.guests}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Purpose:</td>
                <td style="padding: 8px 0; color: #333;">${sanitizedData.eventType}</td>
              </tr>
            </table>
          </div>

          ${sanitizedData.message !== 'No additional message' ? `
          <div style="margin-bottom: 25px;">
            <h3 style="color: #00274d; margin-bottom: 15px;">💬 Special Requests</h3>
            <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #d4af37; border-radius: 4px;">
              <p style="margin: 0; color: #333; line-height: 1.5;">${sanitizedData.message}</p>
            </div>
          </div>
          ` : ''}

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
            <p style="color: #666; font-size: 14px; margin: 5px 0;">
              This inquiry was submitted through the Seaview Penthouse website
            </p>
            <p style="color: #666; font-size: 12px; margin: 5px 0;">
              Submitted on: ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    `;

    // Email options
    const mailOptions = {
      from: `"Seaview Penthouse Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || 'rachel.yer@gmail.com',
      subject: `🏖️ New Booking Inquiry from ${sanitizedData.name}`,
      html: emailHTML,
      replyTo: sanitizedData.email, // Allow replying directly to the customer
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Add to rate limiting
    addSubmission(ip);

    return NextResponse.json(
      {
        success: true,
        message: 'Your inquiry has been sent successfully. We will get back to you within 2 hours!'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Email sending error:', error);

    return NextResponse.json(
      {
        error: 'Failed to send email. Please try again or contact us directly.',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    );
  }
}