export type LoginExpectation = 'success' | 'invalid' | 'required';

export type LoginCase = {
  name: string;
  username: string;
  password: string;
  submitWithEnter?: boolean;
  expect: LoginExpectation;
};

const adminU = process.env.ADMIN_USERNAME!;
const adminP = process.env.ADMIN_PASSWORD!;

export const loginCases: LoginCase[] = [
  { name: 'Valid credentials - @login @regression @smoke', username: adminU, password: adminP, expect: 'success' },

  { name: 'Enter key submission - @login @regression @smoke', username: adminU, password: adminP, submitWithEnter: true, expect: 'success' },

  { name: 'Trim spaces after username - @login', username: `${adminU}  `, password: adminP, expect: 'success' },

  { name: 'Trim spaces before username - @login', username: `  ${adminU}`, password: adminP, expect: 'invalid' },

  { name: 'Case sensitivity (lowercase) - @login', username: adminU.toLowerCase(), password: adminP, expect: 'success' },

  { name: 'Case sensitivity (uppercase) - @login', username: adminU.toUpperCase(), password: adminP, expect: 'success' },

  { name: 'Invalid password - @login @regression', username: adminU, password: 'wrongpass', expect: 'invalid' },

  { name: 'Invalid username - @login @regression', username: 'WrongUser', password: adminP, expect: 'invalid' },

  { name: 'Empty username - @login', username: '', password: adminP, expect: 'required' },

  { name: 'Empty password - @login', username: adminP, password: '', expect: 'required' },

  { name: 'SQL injection in username - @login', username: "' OR '1'='1", password: adminP, expect: 'invalid' },

  { name: 'XSS payload in username - @login', username: '<script>alert(1)</script>', password: adminP, expect: 'invalid' },
];
