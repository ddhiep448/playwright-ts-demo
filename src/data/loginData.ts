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
  { name: 'LGN-001 - Click button submission with Valid credentials - @login @regression @smoke', username: adminU, password: adminP, expect: 'success' },

  { name: 'LGN-002 - Enter key submission with valid credentials - @login @regression @smoke', username: adminU, password: adminP, submitWithEnter: true, expect: 'success' },

  { name: 'LGN-101 - Trim spaces after username - @login', username: `${adminU}  `, password: adminP, expect: 'success' },

  { name: 'LGN-102 - Trim spaces before username - @login', username: `  ${adminU}`, password: adminP, expect: 'invalid' },

  { name: 'LGN-103 - Case sensitivity (lowercase) - @login', username: adminU.toLowerCase(), password: adminP, expect: 'success' },

  { name: 'LGN-104 - Case sensitivity (uppercase) - @login', username: adminU.toUpperCase(), password: adminP, expect: 'success' },

  { name: 'LGN-201 - Invalid password - @login @regression', username: adminU, password: 'wrongpass', expect: 'invalid' },

  { name: 'LGN-202 - Invalid username - @login @regression', username: 'WrongUser', password: adminP, expect: 'invalid' },

  { name: 'LGN-203 - Empty username - @login', username: '', password: adminP, expect: 'required' },

  { name: 'LGN-204 - Empty password - @login', username: adminP, password: '', expect: 'required' },

  { name: 'LGN-206 - SQL injection in username - @login', username: "' OR '1'='1", password: adminP, expect: 'invalid' },

  { name: 'LGN-207 - XSS payload in username - @login', username: '<script>alert(1)</script>', password: adminP, expect: 'invalid' },
];
