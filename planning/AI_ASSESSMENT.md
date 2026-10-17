# Design: asking an AI chatbot for an assessment of a poll

Status: proposal, not implemented. 2026-10-17.

## 1. The user story

> During a poll, a voter clicks a button that packs the complete current poll
> state into a JSON file and shares it with the user's preferred personal AI
> chatbot service, with an editable prompt asking the AI for an assessment of
> the situation, the consensus potential, and a recommendation for voting and
> option-adding behaviour.

Extended: after a poll has closed, the same button asks for a post-mortem, the lessons to be learned from how the poll went.

## 2. Decisions in brief

| Question | Decision | Reason |
| --- | --- | --- |
| Who runs the AI? | The voter's own chatbot account. vodle calls no AI service and never sees the answer. | No API keys or costs for the deployment, no additional data processor for its operator, and the voter's free choice of provider. |
| Which service? | The voter enters the address of their chatbot once; it is kept as a user setting. vodle names no services. | vodle does not have to keep a list of providers or endorse any. Any chatbot with a web page works, including institutional and self-hosted ones. |
| How does the data get there? | The prompt and the data are copied to the clipboard as one text and the voter's chatbot page is opened, so the voter only has to paste. Where the device has a share sheet, sharing is offered as well. The file can also be downloaded. | No chatbot offers an official way for a web page to hand over data. These mechanisms work without any cooperation from the provider (§6). |
| What is "the complete poll state"? | Everything the voter can see on the poll page, plus figures vodle computes for the AI. It never includes identifiers, passwords or links. Other voters' individual ratings are included only anonymised (§7). | Exporting to a third party lifts the end-to-end encryption for this copy, so the default is aggregate figures. |
| Who decides how much may leave? | The voter, in the dialog. There is no per-poll setting. Other voters' individual ratings are an opt-in, unticked by default. | Each participant already sees all of this data and could copy it by hand; a per-poll limit could not be enforced. |
| The prompt | Two defaults in the voter's language: one for a running poll (assessment and tactical advice), one for a closed poll (post-mortem). The voter can edit both; the edited versions are kept as user settings and can be reset. | As the story asks. |
| Tactics | The prompt asks openly for tactical advice. | Rating in vodle is inherently tactical: there is no non-tactical way to vote. |
| Accuracy | The snapshot contains vodle's own computation of every number the AI needs, and a precise statement of the method. | Chatbots make arithmetic errors and do not know vodle's rules. Giving them computed facts reduces wrong advice. |

## 3. What the voter sees

The poll page of a running or closed poll has a button with a "sparkles" icon in the toolbar, labelled "AI assessment". It opens a dialog. The button is hidden only when the deployment switches the feature off.

```
┌ Ask an AI for an assessment ─────────────────────────────── ✕ ┐
│ vodle prepares the current state of this poll as text, with a │
│ question for an AI chatbot of your choice. The chatbot's      │
│ provider then processes it under its own terms; vodle does    │
│ not see the answer. AI assessments can be wrong.              │
│                                                               │
│ What is shared                                                │
│  ☑ the poll's title and descriptions                          │
│  ☑ how the ratings of each option are distributed             │
│  ☐ every voter's ratings, anonymously                         │
│  Always: your own ratings, the results, vodle's rules         │
│  ▸ Show the data (4.2 kB)                                     │
│                                                               │
│ Your question (editable)                    [Reset]           │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ I take part in a poll on vodle that is still running. … │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                               │
│ Your chatbot's address                                        │
│  [ https://chat.example.org/new                          ]    │
│                                                               │
│  [ Copy and open chat.example.org ]   [ Share… ]              │
│  Then paste (Ctrl+V) into the chat and send it.               │
│  Download the data as a file                                  │
└───────────────────────────────────────────────────────────────┘
```

- **The address field** is empty at first and keeps what the voter enters, on all of their devices. Its hint says to enter the page where a new chat starts. The example address in the field is a placeholder of the reserved domain `example.org`, not a service.
- **Without an address**, the main button reads "Copy" and opens nothing.
- **"Share…"** appears only where the device offers a share sheet; chatbot apps that are installed and accept shared files are listed there by the operating system.
- **For a closed poll**, the heading reads "Ask an AI what can be learned from this poll", and the closed-poll prompt is used (§5).

## 4. The snapshot

A versioned JSON document. Option labels (A, B, …) follow the poll page's order. Voters are "me" and, where included, V1…Vn in random order, newly drawn for each export. A vid never appears, so two exports cannot be linked through it.

```json
{
  "format": "vodle-poll-snapshot",
  "version": 1,
  "created": "2026-10-17T14:05:00Z",
  "language": "en",
  "method": "… fixed English text, see below …",
  "poll": {
    "type": "winner",
    "state": "running",
    "title": "Where should the team retreat take place?",
    "description": "…",
    "deadline": "2026-10-20T18:00:00Z",
    "time_left_hours": 75.9,
    "voters_not_abstaining": 7
  },
  "options": [
    { "label": "C", "name": "Mountain hut", "description": "…", "added_by_me": false,
      "approval_threshold": 30, "approvals": 7, "approval_percent": 100,
      "mean_rating": 57.9, "share_percent": 100,
      "rating_histogram": [0, 0, 0, 1, 1, 1, 1, 2, 1, 0] },
    { "label": "A", "name": "Lake hotel", "approval_threshold": 20, "approvals": 6,
      "approval_percent": 85.7, "mean_rating": 57.1, "share_percent": 0,
      "rating_histogram": [1, 0, 1, 0, 0, 1, 1, 0, 1, 2] }
  ],
  "me": {
    "ratings": { "A": 80, "B": 30, "C": 60 },
    "approves": ["A", "B", "C"],
    "vote_goes_to": "C",
    "lowest_rating_that_approves": { "A": 15, "B": 29, "C": 1 },
    "ratings_set_by_delegate": []
  },
  "agreement_level_percent": 100,
  "individual_ratings": [
    { "voter": "V1", "ratings": { "A": 90, "B": 10, "C": 30 } }
  ]
}
```

The figures in the example were computed with vodle's tally rule from a seven-voter example. They show what the rule does: option C is approved by everyone, so every vote, and the whole share, goes to it.

**Contents of each section:**
- **`poll`:**
  - for share polls, also the budget, its unit and the unspent amount, and for each option the allowed amounts and the expected amount (#201);
  - for a closed poll, `state` is `"closed"`, `time_left_hours` is omitted, and a `result` is added: the drawn winner in a winner poll, or the allocation and how it was rounded (`allocation_method`) in a share poll. All other figures are the final ones.
- **`rating_histogram`:** counts in ten bins of ten points (the last bin is 90–100). It is present when the voter ticks the distribution box.
- **`me`:**
  - `lowest_rating_that_approves` is computed by vodle: the voter's own rating is varied while the others' ratings stay fixed. The AI cannot easily work this out, because the voter's own rating also moves the threshold. In the example, a rating of 1 for C would be enough. For a closed poll it shows what would have been enough at the end.
  - `ratings_set_by_delegate` lists the options for which the voter's effective rating comes from a delegate.
- **`individual_ratings`:** only when the voter ticks the box. It contains effective ratings, shuffled, without delegation structure.
- **Never included:** the poll id, vids, the poll password, invitation and delegation links, nicknames, server names, or anyone else's delegations.
- **No history.** The snapshot is the state at one moment. The app works with the current ratings and does not reconstruct how they changed over time; the closed-poll prompt says so, so that the post-mortem does not invent a course of events.

**`method`.** A fixed English text, versioned with the format and checked by a spec against the tally code:

> Each voter rates each option from 0 to 100 (their "willingness to approve").
> For each option vodle finds an approval threshold: the smallest positive
> rating r such that fewer than r percent of the non-abstaining voters rate
> the option below r. Voters whose rating is at or above the threshold approve
> the option. Options are ranked by their number of approvals, ties broken by
> the sum of ratings. Each voter's vote goes to the highest-ranked option they
> approve; with none, they abstain. An option's share is its fraction of all
> votes. In a "winner" poll, the winner is drawn at random with these shares
> as probabilities when the poll closes; in a "share" poll, the budget is
> divided in proportion to the shares [and rounded to allowed amounts by a
> fair lottery]. Ratings are tactical choices: voters see the current results
> and may change their ratings, and add options, at any time until the
> deadline.

## 5. The default prompts

Stored in the translation files in the ten maintained languages. The English versions:

**Running poll** (`ai-assessment.prompt-running`):

> I take part in a poll on vodle that is still running. The attached data
> describes its current state; the section "method" says exactly how vodle
> turns ratings into results, and "me" holds my own ratings. Please
> 1. assess the situation: which options get how much approval and share, and why;
> 2. assess the potential for consensus: how close is the group to an option
>    that nearly everyone approves, what stands in the way, and could a new
>    option or changed ratings raise the overall approval;
> 3. recommend how I should rate the options, and whether I should propose a
>    new option and what it could look like, so that the result serves my
>    interests as well as possible, taking into account how the other voters
>    may react before the deadline.
>
> My preferences, if they differ from what my ratings suggest:
>
> Base your answer on the data and on vodle's rules as stated there; say where
> you rely on assumptions about the other voters. Answer in English.

**Closed poll** (`ai-assessment.prompt-closed`):

> I took part in a poll on vodle that has ended. The attached data describes
> its final state and result; the section "method" says exactly how vodle
> turned the ratings into this result, and "me" holds my own final ratings.
> Please write a short post-mortem:
> 1. what the result was, and why it came about;
> 2. how close the group came to consensus, and what stood in the way;
> 3. how my own ratings and options affected the result, and what I could
>    have done differently;
> 4. lessons for me and for the group for future polls, including options
>    that might have been worth proposing.
>
> The data shows only the final state, not how the ratings changed over time.
> Base your answer on the data and on vodle's rules as stated there. Answer in
> English.

The last sentence of each carries the language name, so that the answer comes in the voter's language even when the voter edits the rest. Edited prompts are kept separately for the two cases.

## 6. Getting it to the chatbot

1. **Clipboard and the voter's chatbot page.** This is the main path, on all devices.
   - One text, the prompt followed by the JSON in a fenced block, is written to the clipboard (`navigator.clipboard.writeText`, within the click).
   - If an address is set, it is opened in a new tab with `noopener,noreferrer`. `window.open` is called synchronously in the same click so that pop-up blockers allow it.
   - **The address is checked before it is stored or opened:** it must parse as a URL, with `https:`, or `http:` only for `localhost` and `127.0.0.1` (a chatbot running on the voter's own computer). Anything else, `javascript:` and `data:` included, is refused with a message.
   - **No data in the address.** vodle appends nothing to it, so neither the prompt nor the data ends up in browser history or server logs. Pre-filling a chat through undocumented URL parameters is deliberately not used.
2. **The share sheet** (Web Share API with files), offered as a second button where `navigator.canShare({files, text})` is true, mainly on phones.
   - The data is shared as `vodle-poll-<date>.txt` with the type `text/plain`. Chromium's share accepts `.txt` but not `.json` (checked in `chrome/browser/webshare/share_service_impl.cc`).
   - The prompt goes along as the shared text.
   - The existing guard for browsers that claim to share but do nothing (`web_share_broke`, #343) applies.
3. **Download** of `vodle-poll-<date>.json`, for chatbots that work better with an uploaded file.

If the clipboard is refused (no secure context, or permission denied), the dialog shows the text in a selectable box with a "Select all" button.

## 7. Privacy

- **What changes.** Within vodle, every participant already sees every rating, keyed by vid (`PRIVACY.md` §5). The export creates a copy outside the end-to-end encryption, held by the chatbot's provider and possibly used for training, depending on the voter's account settings there.
- **Who decides.** The voter alone, in the dialog. The poll has no setting for it; the deployment can only switch the feature off as a whole (§8).
- **Minimisation.** By default only aggregates: other voters' individual ratings leave only when the voter ticks that box, and then anonymised. Labels instead of identifiers, a fresh voter order for each export, and none of the identifiers listed in §4.
- **Informing the participants.** Since no poll announces it, participants learn from the FAQ and the privacy statement that any participant can pass a poll's state, including anonymous individual ratings, to a chatbot of their choice. A new subsection in `PRIVACY.md` says the same, and the deployment's privacy statement must mention it.
- **The chatbot's address.** It is stored in the user data, which is encrypted like the rest of the user's settings. vodle never contacts that address itself; only the voter's browser opens it.

## 8. Configuration

- **`environment.ai_assessment.enabled`** (default `true`): the deployment's only setting.
- **User settings (synced):**
  - `ai_chat_url`: the voter's chatbot address, empty at first;
  - `ai_prompt_running`, `ai_prompt_closed`: the edited prompts, empty meaning the default;
  - `ai_share_titles`, `ai_share_histograms`, `ai_share_individual`: the last choices in the dialog. `ai_share_individual` starts unticked.

## 9. Implementation plan

1. **`src/app/ai-snapshot.ts`** (pure functions, no Angular):
   - `snapshot(input, choices)` builds the document from a plain input (options, effective ratings, tally maps, my vid, the poll's facts and, for a closed poll, its result);
   - `lowest_rating_that_approves`, which reuses the threshold rule extracted from `update_threshold_and_approvals` into a shared function so that the two cannot diverge;
   - `anonymise` (cryptographic shuffle and relabelling);
   - `snapshot_text(prompt, json)`;
   - `chat_url_ok(url)`, the check of §6.
2. **`src/app/ai-assessment-dialog/`:** a modal component with the dialog of §3. It contains the transfer logic of §6, with the share, clipboard and window functions injectable for tests.
3. **Poll page:** the toolbar button, for running and closed polls.
4. **`environment.ts` and `environment.prod.ts`:** `ai_assessment.enabled`.
5. **i18n:** dialog strings and the two default prompts in ten languages; the `method` text stays English.
6. **Specs:**
   - the snapshot never contains the pid, any vid, the password or a link (searched for in the serialised text);
   - individual ratings appear only when chosen, and then without vids and in a different order on each export;
   - every tally figure in the snapshot equals the poll's own tally; for a closed poll, the result equals the stored one;
   - `lowest_rating_that_approves` agrees with a brute-force re-tally;
   - `chat_url_ok` takes `https:` addresses and local `http:` ones, and refuses `javascript:`, `data:`, other `http:` and malformed addresses;
   - the prompt follows the poll's state, and each edited prompt is kept for its own case;
   - the transfer and its fallbacks, with stubbed browser APIs;
   - a test for the `method` text against the example of §4.
7. **Documentation:** `PRIVACY.md`, FAQ/help, `deploy/README.md` (the switch).

Before release, the clipboard path should be tried by hand with a few chatbots in desktop and mobile browsers, and the share sheet on Android and iOS.

## 10. Open questions

None at present. The owner decided on 2026-10-17: no per-poll setting; no list of services, the voter enters their chatbot's address; tactical advice asked for openly, since rating in vodle is inherently tactical; a post-mortem prompt for closed polls.
