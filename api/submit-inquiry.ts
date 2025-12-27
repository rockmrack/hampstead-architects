import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
    if (!name || !email || !phone || !postcode) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Map project type codes to readable labels
    const projectTypeLabels: { [key: string]: string } = {
      'renovation': 'Full Renovation',
      'extension': 'Extension / Basement',
      'newbuild': 'New Build',
      'heritage': 'Heritage Restoration',
    };

    const planningStatusLabels: { [key: string]: string } = {
      'dreaming': 'Just Dreaming',
      'concept': 'Concept Phase',
      'approved': 'Planning Submitted/Approved',
      'rescue': 'Rescue Mission',
    };

    const budgetLabels: { [key: string]: string } = {
      '100-250': '£100k - £250k',
      '250-500': '£250k - £500k',
      '500-1000': '£500k - £1M',
      '1000+': '£1M+',
    };

    // Send client confirmation email
    const clientEmail = await resend.emails.send({
      from: 'The Studio at Palace Court <studio@hampsteadarchitects.com>',
      to: [email],
      replyTo: 'private-clients@hampsteadarchitects.com',
      subject: `Receipt of Brief: ${projectTypeLabels[projectType] || projectType} at ${postcode}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1E1E1E; max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { border-bottom: 2px solid #3D5A58; padding-bottom: 20px; margin-bottom: 30px; }
              .logo { font-family: Georgia, serif; font-size: 24px; color: #1E1E1E; letter-spacing: -0.5px; }
              .subtitle { font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px; margin-top: 5px; }
              .content { margin-bottom: 30px; }
              .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #999; margin-bottom: 5px; }
              .value { font-size: 16px; margin-bottom: 20px; }
              .highlight { background: #F5F1EC; padding: 20px; border-left: 3px solid #3D5A58; margin: 30px 0; }
              .steps { margin: 30px 0; }
              .step { margin-bottom: 20px; padding-left: 30px; position: relative; }
              .step-number { position: absolute; left: 0; top: 0; background: #3D5A58; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; }
              .footer { border-top: 1px solid #E5E5E5; padding-top: 20px; margin-top: 40px; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="logo">Hampstead Architects</div>
              <div class="subtitle">& Interiors</div>
            </div>

            <div class="content">
              <h2 style="font-family: Georgia, serif; font-weight: 300; font-size: 28px; margin-bottom: 20px;">Case File Opened</h2>

              <p>Dear ${name},</p>

              <p>Thank you for submitting your project brief through our architectural concierge service. We have received your inquiry for a <strong>${projectTypeLabels[projectType] || projectType}</strong> at <strong>${postcode}</strong>${conservationArea === 'Yes' ? ' (conservation area)' : ''}.</p>

              ${conservationArea === 'Yes' ? `
              <div class="highlight">
                <p style="margin: 0;"><strong>Conservation Area Notice:</strong> We note your property is in a conservation area. We will match you with a specialist architect experienced in securing Camden Planning consent for heritage-sensitive sites.</p>
              </div>
              ` : ''}

              <div class="steps">
                <h3 style="font-size: 18px; margin-bottom: 20px;">Your Next Steps</h3>

                <div class="step">
                  <div class="step-number">1</div>
                  <strong>Feasibility Review (24-48 hours)</strong>
                  <p style="margin: 5px 0 0 0; color: #666;">Our team will review your site constraints, planning status, and project scope.</p>
                </div>

                <div class="step">
                  <div class="step-number">2</div>
                  <strong>Architect Selection</strong>
                  <p style="margin: 5px 0 0 0; color: #666;">We will identify 2-3 specialist architects from our network whose expertise matches your specific requirements.</p>
                </div>

                <div class="step">
                  <div class="step-number">3</div>
                  <strong>Consultation at Palace Court</strong>
                  <p style="margin: 5px 0 0 0; color: #666;">You'll meet the architects, review precedent work, and select your preferred design partner.</p>
                </div>
              </div>

              <p>We will contact you within 24 hours to schedule your consultation via <strong>${consultationMethod}</strong>.</p>

              <p style="margin-top: 30px;">
                Best regards,<br>
                <strong>The Studio at Palace Court</strong><br>
                Hampstead Architects & Interiors
              </p>
            </div>

            <div class="footer">
              <p style="margin: 0 0 10px 0;"><strong>Palace Court</strong><br>250 Finchley Road, London NW3 6DN</p>
              <p style="margin: 0 0 10px 0;">020 7123 4567 • <a href="mailto:private-clients@hampsteadarchitects.com" style="color: #3D5A58;">private-clients@hampsteadarchitects.com</a></p>
              <p style="margin: 15px 0 0 0; font-size: 11px; color: #999;">🤖 Generated with <a href="https://claude.com/claude-code" style="color: #999;">Claude Code</a></p>
            </div>
          </body>
        </html>
      `,
      text: `
Dear ${name},

Thank you for submitting your project brief through our architectural concierge service.

PROJECT DETAILS
----------------
Type: ${projectTypeLabels[projectType] || projectType}
Location: ${postcode}
Planning Status: ${planningStatusLabels[planningStatus] || planningStatus}
Budget: ${budgetLabels[budget] || budget}
Conservation Area: ${conservationArea}
Freehold Status: ${freeholdStatus}

YOUR NEXT STEPS
---------------
1. Feasibility Review (24-48 hours)
   Our team will review your site constraints, planning status, and project scope.

2. Architect Selection
   We will identify 2-3 specialist architects from our network whose expertise matches your specific requirements.

3. Consultation at Palace Court
   You'll meet the architects, review precedent work, and select your preferred design partner.

We will contact you within 24 hours to schedule your consultation via ${consultationMethod}.

Best regards,
The Studio at Palace Court
Hampstead Architects & Interiors

Palace Court
250 Finchley Road, London NW3 6DN
020 7123 4567 • private-clients@hampsteadarchitects.com

🤖 Generated with Claude Code (https://claude.com/claude-code)
      `,
    });

    // Send team notification email
    const teamEmail = await resend.emails.send({
      from: 'Hampstead Architects <inquiries@hampsteadarchitects.com>',
      to: ['private-clients@hampsteadarchitects.com'],
      subject: `🏗️ New Inquiry: ${projectTypeLabels[projectType] || projectType} at ${postcode}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, monospace; line-height: 1.6; color: #1E1E1E; max-width: 700px; margin: 0 auto; padding: 20px; background: #F5F1EC; }
              .container { background: white; padding: 30px; border-left: 4px solid #3D5A58; }
              .header { border-bottom: 2px solid #3D5A58; padding-bottom: 15px; margin-bottom: 25px; }
              h1 { font-size: 24px; margin: 0; font-weight: 600; }
              .section { margin-bottom: 25px; }
              .section-title { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #3D5A58; margin-bottom: 10px; font-weight: bold; }
              .data-grid { display: grid; grid-template-columns: 150px 1fr; gap: 10px; }
              .data-label { font-weight: bold; color: #666; }
              .data-value { color: #1E1E1E; }
              .highlight { background: #FFF9E6; border-left: 3px solid #F4A900; padding: 15px; margin: 20px 0; }
              .action-required { background: #FFE6E6; border-left: 3px solid #D32F2F; padding: 15px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🏗️ New Project Inquiry</h1>
                <p style="margin: 5px 0 0 0; color: #666;">Received ${new Date().toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short' })}</p>
              </div>

              <div class="section">
                <div class="section-title">Client Details</div>
                <div class="data-grid">
                  <div class="data-label">Name:</div>
                  <div class="data-value">${name}</div>
                  <div class="data-label">Email:</div>
                  <div class="data-value"><a href="mailto:${email}">${email}</a></div>
                  <div class="data-label">Phone:</div>
                  <div class="data-value"><a href="tel:${phone}">${phone}</a></div>
                  <div class="data-label">Consultation:</div>
                  <div class="data-value">${consultationMethod}</div>
                </div>
              </div>

              <div class="section">
                <div class="section-title">Project Details</div>
                <div class="data-grid">
                  <div class="data-label">Type:</div>
                  <div class="data-value"><strong>${projectTypeLabels[projectType] || projectType}</strong></div>
                  <div class="data-label">Planning Status:</div>
                  <div class="data-value">${planningStatusLabels[planningStatus] || planningStatus}</div>
                  <div class="data-label">Budget:</div>
                  <div class="data-value"><strong>${budgetLabels[budget] || budget}</strong></div>
                </div>
              </div>

              <div class="section">
                <div class="section-title">Property Information</div>
                <div class="data-grid">
                  <div class="data-label">Postcode:</div>
                  <div class="data-value"><strong>${postcode}</strong></div>
                  <div class="data-label">Conservation Area:</div>
                  <div class="data-value">${conservationArea}</div>
                  <div class="data-label">Freehold Status:</div>
                  <div class="data-value">${freeholdStatus}</div>
                </div>
              </div>

              ${conservationArea === 'Yes' || freeholdStatus === 'leasehold' ? `
              <div class="${conservationArea === 'Yes' ? 'highlight' : 'action-required'}">
                <strong>⚠️ Special Considerations:</strong>
                <ul style="margin: 10px 0 0 0; padding-left: 20px;">
                  ${conservationArea === 'Yes' ? '<li>Conservation Area - Match with conservation specialist architect</li>' : ''}
                  ${freeholdStatus === 'leasehold' ? '<li>Leasehold - Check License to Alter requirements with freeholder</li>' : ''}
                </ul>
              </div>
              ` : ''}

              <div class="section">
                <div class="section-title">Next Actions</div>
                <ul style="margin: 10px 0; padding-left: 20px;">
                  <li>Run postcode through Camden Planning portal for constraints</li>
                  <li>Check conservation area designation (if "Unsure" was selected)</li>
                  <li>Identify 2-3 specialist architects from network</li>
                  <li>Schedule consultation within 24-48 hours</li>
                  <li>Prepare precedent portfolio for client's project type</li>
                </ul>
              </div>

              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E5E5; font-size: 12px; color: #666;">
                <p style="margin: 0;">Client confirmation email sent to: ${email}</p>
                <p style="margin: 5px 0 0 0;">🤖 Automated via Hampstead Architects Inquiry System</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
NEW PROJECT INQUIRY
Received: ${new Date().toLocaleString('en-GB')}

CLIENT DETAILS
--------------
Name: ${name}
Email: ${email}
Phone: ${phone}
Consultation: ${consultationMethod}

PROJECT DETAILS
---------------
Type: ${projectTypeLabels[projectType] || projectType}
Planning Status: ${planningStatusLabels[planningStatus] || planningStatus}
Budget: ${budgetLabels[budget] || budget}

PROPERTY INFORMATION
--------------------
Postcode: ${postcode}
Conservation Area: ${conservationArea}
Freehold Status: ${freeholdStatus}

${conservationArea === 'Yes' || freeholdStatus === 'leasehold' ? `
SPECIAL CONSIDERATIONS
----------------------
${conservationArea === 'Yes' ? '⚠️ Conservation Area - Match with conservation specialist architect\n' : ''}${freeholdStatus === 'leasehold' ? '⚠️ Leasehold - Check License to Alter requirements\n' : ''}
` : ''}

NEXT ACTIONS
------------
- Run postcode through Camden Planning portal for constraints
- Check conservation area designation
- Identify 2-3 specialist architects from network
- Schedule consultation within 24-48 hours
- Prepare precedent portfolio for client's project type

Client confirmation email sent to: ${email}
🤖 Automated via Hampstead Architects Inquiry System
      `,
    });

    return res.status(200).json({
      success: true,
      clientEmailId: clientEmail.data?.id,
      teamEmailId: teamEmail.data?.id,
    });
  } catch (error: any) {
    console.error('Error sending emails:', error);
    return res.status(500).json({
      error: 'Failed to submit inquiry',
      details: error.message
    });
  }
}
