import { NextRequest, NextResponse } from 'next/server';
import { fetchSheetData } from '@/lib/googleSheets';

export async function GET(req: NextRequest) {
  try {
    const sheetName = req.nextUrl.searchParams.get('sheet');
    const sheetId = req.nextUrl.searchParams.get('id');
    const sheetRange = req.nextUrl.searchParams.get('range');
    const data = await fetchSheetData(sheetName, sheetId, sheetRange, googleSheetsConfig);
    return NextResponse.json({ data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch sheet' }, { status: 500 });
  }
}

const googleSheetsConfig = {
  GOOGLE_PROJECT_ID: 'iron-384011',
  GOOGLE_PRIVATE_KEY:
    '-----BEGIN PRIVATE KEY-----\\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDdHoYNL6BdDtNx\\nIAynFKA/G+EY2AfDKQaJdqaTl7YSSg8A7Sv2GcqYN1tFifxf1fgLHYeyOzf2TZOX\\nn6AjUI2QcBczVPo3wpsTBp0hvfjsmEM5k2yp74CeTHJJNkDUF2E9s/yPS8y2gDpW\\nfT5WNAbaymCCev8LMpUIJ+8k4rft+QDnE9dVdZXTv2xlUUKirV6l7kp6+V1Ri+Hn\\nn+MjnjmNui3M3bO+F0SN6UG3UcneAI0s96uGYHgIJ9z9PtaJXbh/ixAbYZOf8CtH\\nji8o1wdWzpT3N3Wkkk4AvyZb3xl2NxUpMvVwVisJdt4aBev5EAECK5J+bG3DyznP\\nrYl5qrQnAgMBAAECggEACD8ZLV7eueOWlZwXTfDQ/DXabZAnIpLEp8wU3RK8J73Y\\nj9y+rtIwWDtl0lLeoZdvlEqLVrRSEYPPwrTwPL53kH+bOPoZRBSkOIrP/MjHlm78\\n1BJCsOWcXK1zp4l9D05WroeA9wj/RpI5X62cY4wsQPbMJgLXXqTscQgLAho7t60F\\nTHyGRz/gX3a377p6kLIAHZY11OhEhwV4fiNHFE4eGegi4SAznldNSQZW5E/Sy4RB\\n0rxyEbFeB8G76KS6sqUk5eh0KqL0tn0o9s+MDiy9Yhs8aQvUHA9Z1d9bumoAOsZN\\nih4QHZveJjRLmiy9ugKxxAymE0Wp9CnU8uAqDBHhQQKBgQD5GD35s2GsYqpymD4A\\nI8yduIeDJ4Tdu01jL0rUwHI2p1zqjlgP82pjdI6NzYvjHvdjAOaOFlZT/2z2/dMs\\nxjL6B4A9pe6wsl7HqNSpu0dcSsh1037e85xSn4vHNKAFUvRe+3CSxtk1e+ve3jLl\\np7U0e+CjlN5jQZk/a5d6pTEUdwKBgQDjP79KcOoal+5I7/+qtaNKjNydhcSgiJRu\\ntjJx909GLCT5spK+MZguEpwV0R/k0Tb7IOuQ6Slh13qPDnPOHb47sR7soE6Fcg2F\\n0Qr7gb/EDCslN5SZJvhtFFd56PJTXh3sU1BbFzmQesWr6IdAdU8PLIcSsXlRt6rL\\nsxq/QGm50QKBgGjDHFWnbv3cZUla5ECUzdrLoBq2BThoLQz49+Twp1h7HSX9BeZ3\\nfpgjjkzvVNUJ0gvOdijuFhKvy3k5mZYsKYZknzfOUMv5yMj6Ja7Y+BNF1HdRovtL\\nw8QwG86FQIPctrA32cmxXesTmkkadJeH6DsRmpHR65IdJcG5k3TegvzTAoGBAItp\\n+mMi7pwuBUO96S3DjVAZJueEv2J1KArbwArm3D2Cq5R8l0YTivcI97TyvQxVxdM/\\nGQWn5XlfBpNpHGahHKnmOcCVgFah5+Xmn0Q5D3qotHd6p7FllRbmWdwyqye2H8ly\\nO2QG1YvrpgWW/BLxZPU8Lgmr02/sq92YHZqjW7lhAoGBAKHEv6wC5pyyFCbG8Cg9\\nmsbhlcQ0sN8bco0llBbt13bwgSNL9Wr8Moe8IvN/Y8zPXaWG/TOg+817MbPEe2/W\\neypuowp3tDywwkyPRyiuLJVE2Ybnk3gen7IkVyhDqZnSAlNLjQhlfqAW7gRtBAAU\\nOB4T37IC+STkQUz0cOu1BZNO\\n-----END PRIVATE KEY-----\\n',
  GOOGLE_CLIENT_EMAIL: 'id-iron@iron-384011.iam.gserviceaccount.com',
};
