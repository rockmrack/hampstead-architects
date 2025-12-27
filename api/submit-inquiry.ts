import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      projectType,
      planningStatus,
      budget,
      postcode,
      conservationArea,
      freeholdStatus,
      name,
      email,
      phone,
      consultationMethod,
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !postcode || !projectType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Map project type IDs to readable names
    const projectTypeNames: Record<string, string> = {
      'renovation': 'Full Renovation',
      'extension': 'Extension / Basement',
      'newbuild': 'New Build',
      'heritage': 'Grade II Restoration',
    };

    const projectTypeName = projectTypeNames[projectType] || projectType;

    // Map budget IDs to readable names
    const budgetNames: Record<string, string> = {
      '100-250': '£100k - £250k',
      '250-500': '£250k - £500k',
      '500-1000': '£500k - £1M',
      '1000+': '£1M+',
    };

    const budgetName = budgetNames[budget] || 'Not specified';

    // Send white glove acknowledgment email to client
    const clientEmail = await resend.emails.send({
      from: 'The Studio at Palace Court <studio@hampsteadarchitects.com>',
      to: [email],
      replyTo: 'private-clients@hampsteadarchitects.com',
      subject: `Receipt of Brief: ${projectTypeName} at ${postcode}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.7;
              color: #1E1E1E;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              border-bottom: 1px solid #E5E5E5;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 20px;
              font-weight: 300;
              letter-spacing: -0.02em;
              color: #1E1E1E;
              margin-bottom: 5px;
            }
            h1 {
              font-size: 18px;
              font-weight: 500;
              margin: 30px 0 20px 0;
              color: #3D5A58;
            }
            p {
              margin: 15px 0;
              font-size: 15px;
            }
            .steps {
              background: #F5F1EC;
              padding: 20px;
              margin: 25px 0;
              border-left: 3px solid #3D5A58;
            }
            .steps ol {
              margin: 10px 0;
              padding-left: 20px;
            }
            .steps li {
              margin: 10px 0;
              font-size: 15px;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #E5E5E5;
              font-size: 13px;
              color: #666;
            }
            .signature {
              margin: 30px 0;
              font-size: 15px;
            }
            strong {
              font-weight: 600;
              color: #3D5A58;
            }
            .note {
              font-style: italic;
              color: #666;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">Hampstead Architects</div>
            <div style="font-size: 12px; color: #666;">Part of the Hampstead Renovations Group</div>
          </div>

          <p><strong>Dear ${name},</strong></p>

          <p>We have successfully received your preliminary brief for the property at <strong>${postcode}</strong>.</p>

          <p>Thank you for providing the initial details regarding the <strong>${projectTypeName}</strong>. ${conservationArea === 'Yes' ? 'Given your indication that this property is located within a Conservation Area, we have flagged this for immediate review by our Senior Planning Consultant.' : 'We have flagged this as a potential structural project requiring specialist architectural input.'}</p>

          <h1>What happens next?</h1>

          <p>We do not believe in automated quotes. Architecture in North London is nuanced, and your specific requirements deserve a considered response.</p>

          <div class="steps">
            <ol>
              <li><strong>Technical Review:</strong> Over the next 24 hours, our team will review the planning history of the street and the specific constraints of the site.</li>
              <li><strong>The Feasibility Call:</strong> We will contact you at <strong>${phone}</strong> to discuss the "Buildability" of your vision and budget alignment.</li>
              <li><strong>The Match:</strong> Based on this conversation, we will propose the specific architectural partner best suited to deliver this project.</li>
            </ol>
          </div>

          <p>You do not need to take any further action at this stage.</p>

          <p>We look forward to speaking with you.</p>

          <div class="signature">
            <p>Sincerely,</p>
            <p><strong>The Studio Team</strong></p>
          </div>

          <div class="footer">
            <p><strong>Hampstead Architects</strong><br>
            <em>Part of the Hampstead Renovations Group</em></p>
            <p><strong>Studio:</strong> Palace Court, 250 Finchley Rd, London NW3 6DN<br>
            <strong>Web:</strong> <a href="https://hampsteadarchitects.com" style="color: #3D5A58;">www.hampstead-architects.com</a></p>
            <p class="note">We prioritize buildability. Every design we oversee is stress-tested for real-world execution.</p>
          </div>
        </body>
        </html>
      `,
      text: `Dear ${name},

We have successfully received your preliminary brief for the property at ${postcode}.

Thank you for providing the initial details regarding the ${projectTypeName}. ${conservationArea === 'Yes' ? 'Given your indication that this property is located within a Conservation Area, we have flagged this for immediate review by our Senior Planning Consultant.' : 'We have flagged this as a potential structural project requiring specialist architectural input.'}

WHAT HAPPENS NEXT?

We do not believe in automated quotes. Architecture in North London is nuanced, and your specific requirements deserve a considered response.

1. Technical Review: Over the next 24 hours, our team will review the planning history of the street and the specific constraints of the site.

2. The Feasibility Call: We will contact you at ${phone} to discuss the "Buildability" of your vision and budget alignment.

3. The Match: Based on this conversation, we will propose the specific architectural partner best suited to deliver this project.

You do not need to take any further action at this stage.

We look forward to speaking with you.

Sincerely,

The Studio Team

---
Hampstead Architects
Part of the Hampstead Renovations Group

Studio: Palace Court, 250 Finchley Rd, London NW3 6DN
Web: www.hampstead-architects.com

Note: We prioritize buildability. Every design we oversee is stress-tested for real-world execution.`,
    });

    // Send internal notification email to team
    const teamEmail = await resend.emails.send({
      from: 'Project Inquiry System <inquiries@hampsteadarchitects.com>',
      to: ['private-clients@hampsteadarchitects.com'],
      subject: `🏗️ New Inquiry: ${projectTypeName} at ${postcode}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #1E1E1E;
              max-width: 700px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: #3D5A58;
              color: white;
              padding: 20px;
              margin: -20px -20px 30px -20px;
            }
            .section {
              margin: 20px 0;
              padding: 15px;
              background: #F5F1EC;
              border-left: 4px solid #3D5A58;
            }
            .field {
              margin: 10px 0;
            }
            .label {
              font-weight: 600;
              color: #3D5A58;
              display: inline-block;
              width: 200px;
            }
            .value {
              display: inline-block;
            }
            .urgent {
              background: #FFF3CD;
              border-left-color: #FF9800;
              padding: 15px;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0;">New Project Inquiry</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Case file opened at ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}</p>
          </div>

          <div class="section">
            <h2 style="margin-top: 0;">Client Information</h2>
            <div class="field"><span class="label">Name:</span><span class="value">${name}</span></div>
            <div class="field"><span class="label">Email:</span><span class="value"><a href="mailto:${email}">${email}</a></span></div>
            <div class="field"><span class="label">Phone:</span><span class="value"><a href="tel:${phone}">${phone}</a></span></div>
            <div class="field"><span class="label">Preferred Contact:</span><span class="value">${consultationMethod}</span></div>
          </div>

          <div class="section">
            <h2 style="margin-top: 0;">Project Details</h2>
            <div class="field"><span class="label">Project Type:</span><span class="value">${projectTypeName}</span></div>
            <div class="field"><span class="label">Planning Status:</span><span class="value">${planningStatus}</span></div>
            <div class="field"><span class="label">Budget:</span><span class="value">${budgetName}</span></div>
          </div>

          <div class="section">
            <h2 style="margin-top: 0;">Property Information</h2>
            <div class="field"><span class="label">Postcode:</span><span class="value"><strong>${postcode}</strong></span></div>
            <div class="field"><span class="label">Conservation Area:</span><span class="value">${conservationArea}</span></div>
            <div class="field"><span class="label">Freehold Status:</span><span class="value">${freeholdStatus}</span></div>
          </div>

          ${conservationArea === 'Yes' || freeholdStatus === 'leasehold' ? `
          <div class="urgent">
            <strong>⚠️ Action Required:</strong>
            <ul style="margin: 10px 0;">
              ${conservationArea === 'Yes' ? '<li>Conservation Area - Requires planning specialist review</li>' : ''}
              ${freeholdStatus === 'leasehold' ? '<li>Leasehold property - Check License to Alter requirements</li>' : ''}
            </ul>
          </div>
          ` : ''}

          <div style="margin-top: 30px; padding: 20px; background: #E8F5E9; border-left: 4px solid #4CAF50;">
            <strong>Next Steps:</strong>
            <ol style="margin: 10px 0;">
              <li>Review planning history for ${postcode}</li>
              <li>Schedule feasibility call within 24 hours</li>
              <li>Match with appropriate architect from network</li>
            </ol>
          </div>
        </body>
        </html>
      `,
    });

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Inquiry submitted successfully',
      clientEmailId: clientEmail.data?.id,
      teamEmailId: teamEmail.data?.id,
    });

  } catch (error) {
    console.error('Error processing inquiry:', error);

    return res.status(500).json({
      error: 'Failed to process inquiry',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
