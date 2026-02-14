# LLM Agent Guide for vodle

This document describes the semantic `data-vodle` HTML attributes added to vodle's
UI to help LLM-based browser agents navigate and interact with the application.
These attributes are invisible to human users and do not affect the app's
appearance or behaviour.

## Why `data-vodle` attributes?

LLM agents that drive a browser (e.g. via Playwright or similar tools) need
stable, descriptive selectors to identify interactive elements. Standard CSS
classes and Ionic component tags change across versions, but `data-vodle`
attributes are maintained specifically for agent consumption and remain stable.

## Attribute conventions

| Attribute | Purpose |
|---|---|
| `data-vodle="<name>"` | Static semantic label for an element (e.g. `data-vodle="rating-slider"`) |
| `data-vodle-poll-title="<title>"` | Dynamic poll title on a container or list item |
| `data-vodle-poll-type="<winner\|share>"` | Poll type indicator |
| `data-vodle-poll-state="<open\|closed>"` | Whether voting is still allowed |
| `data-vodle-option-name="<name>"` | Name of a poll option |
| `data-vodle-option-index="<n>"` | Zero-based index of an option |
| `data-vodle-current-rating="<0-100>"` | Current rating value on a slider |
| `data-vodle-step="<step>"` | Current step in a multi-step flow (e.g. login) |

## Page-by-page reference

### Navigation (app.component.html)

| Selector | Element |
|---|---|
| `[data-vodle="navigation-menu"]` | Side navigation menu |
| `[data-vodle="navigation-list"]` | Menu item list |
| `[data-vodle^="nav-item-"]` | Individual menu items (e.g. `nav-item-mypolls`) |

### Login (login.page.html)

The login content element exposes the current step via `data-vodle-step`
(values: `language`, `start`, `used_before`, `fresh_email`, `old_email`,
`fresh_password`, `old_password`, `connected`).

| Selector | Element |
|---|---|
| `[data-vodle="language-select"]` | Language dropdown |
| `[data-vodle="submit-language-button"]` | Next button after language selection |
| `[data-vodle="used-before-yes-button"]` | "Yes" – has used vodle before |
| `[data-vodle="used-before-no-button"]` | "No" – new user |
| `[data-vodle="email-input"]` | Email address input |
| `[data-vodle="accept-privacy-checkbox"]` | Privacy policy checkbox |
| `[data-vodle="submit-email-button"]` | Next button after email entry |
| `[data-vodle="login-as-guest-button"]` | Login as guest button |
| `[data-vodle="new-password-input"]` | New password input |
| `[data-vodle="confirm-password-input"]` | Confirm password input |
| `[data-vodle="submit-new-password-button"]` | Next button after new password |
| `[data-vodle="old-password-input"]` | Existing password input |
| `[data-vodle="submit-old-password-button"]` | Next button after old password |
| `[data-vodle="start-button"]` | Final "Start" button after connection |

### My Polls (mypolls.page.html)

| Selector | Element |
|---|---|
| `[data-vodle="my-polls-page"]` | Page container |
| `[data-vodle="running-polls-section"]` | Running polls section header |
| `[data-vodle="running-poll-item"]` | Individual running poll (has `data-vodle-poll-title`) |
| `[data-vodle="closed-polls-section"]` | Closed polls section header |
| `[data-vodle="closed-poll-item"]` | Individual closed poll |
| `[data-vodle="drafts-section"]` | Drafts section header |
| `[data-vodle="draft-poll-item"]` | Individual draft poll |
| `[data-vodle="create-new-poll-button"]` | Floating "+" button to create a new poll |

### Draft Poll / Create Poll (draftpoll.page.html)

| Selector | Element |
|---|---|
| `[data-vodle="draft-poll-page"]` | Page container |
| `[data-vodle="poll-type-select"]` | Poll type selector (winner/share) |
| `[data-vodle="poll-title-input"]` | Poll title text input |
| `[data-vodle="poll-description-input"]` | Poll description textarea |
| `[data-vodle="poll-due-type-select"]` | Due date type selector |
| `[data-vodle="option-name-input"]` | Option name input (has `data-vodle-option-index`) |
| `[data-vodle="start-poll-button"]` | "Ready" button to start the poll |

### Poll / Voting (poll.page.html)

The content container exposes: `data-vodle-poll-title`, `data-vodle-poll-type`,
and `data-vodle-poll-state`.

| Selector | Element |
|---|---|
| `[data-vodle="poll-voting-page"]` | Page container with poll metadata |
| `[data-vodle="delegate-button"]` | Button to delegate your vote |
| `[data-vodle="toggle-live-scores-button"]` | Toggle to show/hide live scores |
| `[data-vodle="poll-option-item"]` | Option row (has `data-vodle-option-name`, `data-vodle-option-index`) |
| `[data-vodle="rating-slider"]` | Rating slider (has `data-vodle-option-name`, `data-vodle-current-rating`; range 0–100) |
| `[data-vodle="add-option-button"]` | Button to add a new option to the poll |

### Join Poll (joinpoll.page.html)

| Selector | Element |
|---|---|
| `[data-vodle="join-poll-page"]` | Page container |
| `[data-vodle="join-poll-go-button"]` | "Let's Go" button to join |

### Invite to Poll (inviteto.page.html)

| Selector | Element |
|---|---|
| `[data-vodle="invite-to-poll-page"]` | Page container |
| `[data-vodle="share-invite-button"]` | Share invitation button |
| `[data-vodle="copy-invite-link-button"]` | Copy invitation link button |
| `[data-vodle="go-to-poll-button"]` | Navigate to the poll |

### Add Option Dialog (addoption-dialog.page.html)

| Selector | Element |
|---|---|
| `[data-vodle="add-option-dialog"]` | Dialog container |
| `[data-vodle="new-option-name-input"]` | New option name input |
| `[data-vodle="new-option-description-input"]` | New option description textarea |
| `[data-vodle="confirm-add-option-button"]` | Confirm / add button |

### Delegation Dialog (delegation-dialog.page.html)

| Selector | Element |
|---|---|
| `[data-vodle="delegation-dialog"]` | Dialog container |
| `[data-vodle="delegate-nickname-input"]` | Delegate nickname input |
| `[data-vodle="share-delegation-button"]` | Copy delegation link button |

## Typical agent workflow

1. **Login** – Navigate to `/login`. Select language, enter email/password (or
   use guest login), and press the start button.
2. **Join a poll** – Navigate to the magic link URL. The join page loads
   automatically; press the "Let's Go" button.
3. **Vote** – On the poll page, for each option locate the `rating-slider`
   element and set its value (0–100). The `data-vodle-option-name` attribute
   identifies which option the slider controls. Use the `data-vodle-current-rating`
   attribute to read the current value.
4. **Create a poll** – Press the "+" button on My Polls, fill in the draft poll
   form fields, and press "Ready" to start.

## Querying attributes

Use standard CSS attribute selectors to find elements:

```js
// All rating sliders
document.querySelectorAll('[data-vodle="rating-slider"]');

// Slider for a specific option
document.querySelector('[data-vodle="rating-slider"][data-vodle-option-name="Option A"]');

// Current login step
document.querySelector('[data-vodle-step]')?.getAttribute('data-vodle-step');
```

## Best practices for LLM agents

- **Prefer `data-vodle` selectors** over CSS classes or tag names, since they
  are stable across UI refactors.
- **Wait for `*ngIf` rendering** – many elements are conditionally rendered.
  Wait for the expected `data-vodle` element to appear in the DOM before
  interacting.
- **Use `ionChange` semantics** – Ionic input components fire `ionChange`
  rather than native `change`/`input` events. To set a slider value
  programmatically, set the `value` property and dispatch an `ionChange` event.
- **Check `disabled` state** – buttons and sliders may be disabled. Check the
  `disabled` attribute before interacting.
