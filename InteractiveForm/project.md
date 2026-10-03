Build Codveda Technologies Front-End Development Internship
Level 1 – Task 2: Interactive Form.

PROJECT:
Create a professional "RentHome Account Registration" form.

IMPORTANT:
This is ONLY Level 1 Task 2.
Do not build a backend, database, authentication system, API, or full rental management system.

TECHNOLOGIES:
- HTML5
- CSS3
- Vanilla JavaScript
- No React
- No Bootstrap
- No external frameworks

FORM FIELDS:
1. Full Name
2. Email Address
3. Phone Number
4. Password
5. Confirm Password

REQUIRED FUNCTIONALITY:

1. REQUIRED FIELD VALIDATION
- Every field must be required.
- Prevent submission when a required field is empty.

2. EMAIL VALIDATION
- Validate that the email has a valid email format.
- Show a clear error message next to/below the email field.

3. PHONE VALIDATION
- Validate a reasonable phone-number format.
- Show a clear error message for invalid input.

4. PASSWORD STRENGTH
Require the password to:
- Have at least 8 characters
- Contain at least one uppercase letter
- Contain at least one lowercase letter
- Contain at least one number

Show a helpful password-strength message while the user types.

5. CONFIRM PASSWORD
- Confirm Password must match Password.
- Show a real-time error if they do not match.

6. REAL-TIME VALIDATION
Validate fields while the user interacts with them.
Do not wait until the final submit for every error.

7. FOCUS AND BLUR EVENTS
Use JavaScript focus and blur events:
- Highlight the active field professionally.
- Validate the field when the user leaves it.
- Remove/update error messages when the input becomes valid.

8. SUBMISSION
- Prevent the default form submission.
- Do not reload the page.
- If validation fails, show the appropriate errors.
- If everything is valid, display a professional success/confirmation message such as:
  "Account created successfully!"
- Clear or reset the form after successful submission if appropriate.

DESIGN:

Create a clean and professional RentHome registration page.

Layout:
- Centered form card
- RentHome branding
- Short heading:
  "Create Your RentHome Account"
- Short supporting text
- Clearly labeled fields
- Password visibility toggle using vanilla JavaScript
- Professional Submit button
- Success message area

UX:
- Clear labels
- Good spacing
- Accessible form controls
- Visible focus states
- Clear error states
- Clear success states
- Helpful validation messages
- Do not use browser alert() for normal validation messages

RESPONSIVE DESIGN:
The form must work properly on:
- Mobile
- Tablet
- Desktop

Use mobile-first CSS and media queries.

VISUAL STYLE:
- Modern real-estate/product design
- Clean and minimal
- Professional typography
- Consistent spacing
- Subtle shadows
- Moderate border radius
- Professional buttons
- Do not make the design overly complicated
- Do not add unnecessary sections

ACCESSIBILITY:
- Use semantic HTML5
- Use proper label elements
- Connect labels to inputs
- Use appropriate input types
- Provide meaningful validation messages
- Ensure keyboard navigation works
- Maintain readable color contrast

JAVASCRIPT:
Use vanilla JavaScript only.
Use:
- addEventListener()
- input/change events where appropriate
- focus events
- blur events
- submit event
- DOM manipulation

Do not use page reloads for validation.

CODE ORGANIZATION:
Create:
- index.html
- style.css
- script.js

Keep the code clean and readable.
Use meaningful variable and function names.
Avoid unnecessary dependencies.
Make sure there are no console errors.

CODVEDA TASK 2 CHECKLIST:
Before finishing, verify:

✓ Name field
✓ Email field
✓ Phone number field
✓ Password field
✓ Required-field validation
✓ Email-format validation
✓ Phone validation
✓ Password-strength validation
✓ Confirm-password validation
✓ Real-time error messages
✓ No page reload during validation
✓ Focus events
✓ Blur events
✓ Successful-submission confirmation
✓ Responsive design
✓ Clean professional styling
✓ Vanilla JavaScript
✓ No console errors

Finally, test all validation cases manually:
- Empty form
- Invalid email
- Invalid phone
- Weak password
- Password mismatch
- Valid form submission
- Mobile screen
- Desktop screen

Do not add backend functionality.
Keep the project focused strictly on the Codveda Level 1 Task 2 requirements.