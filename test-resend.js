const { Resend } = require('resend');
const resend = new Resend('re_CHQrfCWc_8eCnCiKGJEnMs2PZ6Y1QTtBY');

async function test() {
  const { data, error } = await resend.emails.send({
    from: 'Mitra AI <mitraai0001@gmail.com>',
    to: ['test@example.com'],
    subject: 'Test',
    html: '<p>Test</p>'
  });
  console.log({ data, error });
}
test();
