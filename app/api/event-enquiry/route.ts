import { NextResponse } from 'next/server';

interface EventEnquiryData {
  locationId?: string;
  franchiseId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  event_date?: string;
  start_time?: string;
  end_time?: string;
  guest_count?: string;
  additional_information?: string;
  referral_source_id?: string;
  budget?: string;
  date_flexibility?: string;
  event_description?: string;
  field_293?: string; // Current date
  'g-recaptcha-response'?: string;
  [key: string]: string | undefined;
}

interface LeadPayload {
  lead: {
    first_name: string;
    last_name: string;
    email_address: string;
    phone_number: string;
    company?: string;
    event_description?: string;
    event_date: string;
    start_time: string;
    end_time: string;
    guest_count: number;
    additional_information?: string;
    referral_source_id?: number;
    location_id: number;
    budget?: string;
    date_flexibility?: string;
  };
}

const tripleseatConfigs = {
  baseUrl: 'https://api.tripleseat.com',
  publicKey: '274a7e275fc62906a67e4cd8272434291560a125',
  defaultLeadFormId: '44779',
  authConfig: {
    client_id: 'EOlICDRhLmmzrNuJRR4TMiSGPaezfqD0VrYMdZEK',
    client_secret: 'ydw6ECV1fyGTgzuTcB7oz0edFYRz3M6TJUAHW8U6',
    grant_type: 'client_credentials',
  },
};

export async function POST(request: Request) {
  try {
    const data: EventEnquiryData = await request.json();

    const token = await getBearerToken();

    const createdLead = await createLead(data);

    //Lead is not being used yet. Just verify if the lead is created successfully.
    await getLead(createdLead.lead_id, token);

    if (createdLead.errors) throw new Error(JSON.stringify(createdLead.errors));

    return NextResponse.json({
      success: true,
      status: 200,
      redirect_url: '/events-confirmation/',
      message: 'Event enquiry submitted successfully!',
    });
  } catch (error) {
    console.error('Event enquiry processing error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred processing your event enquiry. Please try again.',
        error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined,
      },
      { status: 500 }
    );
  }
}

const getBearerToken = async () => {
  const response = await fetch(`${tripleseatConfigs.baseUrl}/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tripleseatConfigs.authConfig),
  });
  const bearerToken: { access_token: string } = await response.json();

  return bearerToken.access_token;
};

const createLead = async (data: EventEnquiryData) => {
  const leadPayload: LeadPayload = {
    lead: {
      first_name: data.firstName || '',
      last_name: data.lastName || '',
      email_address: data.email || '',
      phone_number: data.phone || '',
      company: data.company,
      event_description: data.event_description || 'Birthday Party',
      event_date: data.event_date || '',
      start_time: data.start_time || '',
      end_time: data.end_time || '',
      guest_count: parseInt(data.guest_count || ''),
      additional_information: data.additional_information,
      referral_source_id: data.referral_source_id
        ? parseInt(data.referral_source_id || '')
        : undefined,
      location_id: parseInt(data.locationId || ''),
    },
  };

  const leadCreateUrl = new URL(`${tripleseatConfigs.baseUrl}/v1/leads/create.js`);
  leadCreateUrl.searchParams.set('public_key', tripleseatConfigs.publicKey);
  leadCreateUrl.searchParams.set('lead_form_id', tripleseatConfigs.defaultLeadFormId);

  const createLeadResponse = await fetch(leadCreateUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(leadPayload),
  });

  const createdLead: {
    success_message: string;
    lead_id: string;
    errors?: Record<string, Array<string>>;
  } = await createLeadResponse.json();

  console.log('Created Lead:', createdLead);
  return createdLead;
};

const getLead = async (leadId: string, token: string) => {
  const getLeadUrl = new URL(`${tripleseatConfigs.baseUrl}/v1/leads/${leadId}.json`);

  const response = await fetch(getLeadUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const lead = await response.json();
  return lead;
};
