# Design: asking an AI chatbot for an assessment of a running poll

Status: proposal, not implemented. 2026-10-17.

## 1. The user story

> During a poll, a voter clicks a button that packs the complete current poll
> state into a JSON file and shares it with the user's preferred personal AI
> chatbot service, with an editable prompt asking the AI for an assessment of
> the situation, the consensus potential, and a recommendation for voting and
> option-adding behaviour.

## 2. Decisions in brief

| Question | Decision | Reason |
| --- | --- | --- |
| Who runs the AI? | The voter's own chatbot account (ChatGPT, Claude, Gemini, Le Chat, …). vodle calls no AI service and never sees the answer. | No API keys or costs for the deployment, no additional data processor for its operator, and the voter's free choice of provider, as the story asks. |
| How does the data get there? | In order of preference: the device's share sheet (file and prompt); otherwise the clipboard plus opening the provider's chat page; always also a download. | No chatbot offers an official way for a web page to hand over a file. These three mechanisms work without any cooperation from the provider (§6). |
| What is "the complete poll state"? | Everything the voter can see on the poll page, plus figures vodle computes for the AI. It never includes identifiers, passwords or links. Other voters' individual ratings are included only anonymised, and only where the poll allows it (§7). | Exporting to a third party lifts the end-to-end encryption for this copy. The other participants did not consent to that, so the default is aggregate figures. |
| Who decides how much may leave? | The poll's creator sets an upper limit when drafting the poll. The voter may share less than that limit, never more. | It is the other participants' data. The creator's setting is shown to everyone before they join. |
| The prompt | A default in the voter's language that the voter can edit. The edited version is kept as a user setting (synced across devices) and can be reset. | As the story asks. |
| Accuracy | The snapshot contains vodle's own computation of every number the AI needs, and a precise statement of the method. | Chatbots make arithmetic errors and do not know vodle's rules. Giving them computed facts reduces wrong advice. |

## 3. What the voter sees

On the poll page of a running poll, a button with a "sparkles" icon in the toolbar, labelled "AI assessment", opens a dialog. The button is hidden when the deployment switches the feature off or the poll's creator disallowed it.

```
┌ Ask an AI for an assessment ─────────────────────────────── ✕ ┐
│ vodle prepares the current state of this poll as a file, with │
│ a question for an AI chatbot of your choice. The chatbot's    │
│ provider then processes it under its own terms; vodle does    │
│ not see the answer. AI assessments can be wrong.              │
│                                                               │
│ What is shared                                                │
│  ☑ the poll's title and descriptions                          │
│  ☑ how the ratings of each option are distributed             │
│  ☐ every voter's ratings, anonymously        (if allowed)     │
│  Always: your own ratings, the current results, vodle's rules │
│  ▸ Show the file (4.2 kB)                                     │
│                                                               │
│ Your question (editable)                    [Reset]           │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ I take part in a poll on vodle. The attached file …      │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                               │
│ Chatbot   [ Claude ▾ ]  (remembered)                          │
│                                                               │
│            [ Copy and open Claude ]                           │
│ Then paste (Ctrl+V) into the new chat and send it. The file   │
│ is also in your downloads.                                    │
└───────────────────────────────────────────────────────────────┘
```

On a phone the main button reads "Share…" and opens the system share sheet. Chatbot apps that are installed and accept shared files appear in it.

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
- **`poll`:** for share polls, also the budget, its unit and the unspent amount. For each option, the allowed amounts and the expected amount (#201).
- **`rating_histogram`:** counts in ten bins of ten points (the last bin is 90–100). It is present when the voter ticks the distribution box.
- **`me`:**
  - `lowest_rating_that_approves` is computed by vodle: the voter's own rating is varied while the others' ratings stay fixed. The AI cannot easily work this out, because the voter's own rating also moves the threshold. In the example, a rating of 1 for C would be enough.
  - `ratings_set_by_delegate` lists the options for which the voter's effective rating comes from a delegate.
- **`individual_ratings`:** only when the poll allows it and the voter ticks the box. It contains effective ratings, shuffled, without delegation structure.
- **Never included:** the poll id, vids, the poll password, invitation and delegation links, nicknames, server names, or anyone else's delegations.

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
> fair lottery]. Ratings can be changed until the deadline.

## 5. The default prompt

It is stored in the translation files (`ai-assessment.default-prompt`) in the ten maintained languages. The English version:

> I take part in a poll on vodle that is still running. The attached file
> describes its current state; the section "method" says exactly how vodle
> turns ratings into results, and "me" holds my own ratings. Please
> 1. assess the situation: which options get how much approval and share, and why;
> 2. assess the potential for consensus: how close is the group to an option
>    that nearly everyone approves, what stands in the way, and could a new
>    option or changed ratings raise the overall approval;
> 3. recommend how I should rate the options and whether I should propose a
>    new option, and what it could look like, in line with my own preferences
>    and with the aim of a broadly acceptable result.
> Base your answer on the file and on vodle's rules as stated there; say where
> you rely on assumptions about the other voters. Answer in English.

The last sentence carries the language name, so that the answer comes in the voter's language even when the voter edits the rest.

## 6. Getting it to the chatbot

What a web page can do, in the order the dialog tries it:

1. **The share sheet** (Web Share API with files). It is used where `navigator.canShare({files, text})` is true, which is mainly on phones. The file is shared as `vodle-poll-<date>.txt` with the type `text/plain`. Chromium's share accepts `.txt` but not `.json` (checked in `chrome/browser/webshare/share_service_impl.cc`). The prompt goes along as the shared text. The existing guard for browsers that claim to share but do nothing (`web_share_broke`, #343) applies.
2. **Clipboard and provider page.** One text, the prompt followed by the JSON in a fenced block, is written to the clipboard (`navigator.clipboard.writeText`, within the click). The provider's new-chat page is then opened in a new tab, with `window.open` called synchronously in the same click so that pop-up blockers allow it. The JSON file is also downloaded, for providers that work better with an upload.
   - Some providers fill a new chat from a URL parameter (`?q=`, for example). These parameters are **not documented** and may change.
   - A provider entry may therefore declare such a parameter. It is used only for the prompt and only while the URL stays short (below 2000 characters). The data itself never goes into a URL, where it would end up in browser history and server logs.
   - Each parameter is to be checked when the feature is implemented. It lives in the configuration (§8), so a deployment can correct it without a new release.
3. **"Other / copy only."** The text is copied to the clipboard and the file downloaded; nothing is opened. This also covers institutional or self-hosted chatbots that are not in the list.

If the clipboard is refused (no secure context, or permission denied), the dialog shows the text in a selectable box with a "Select all" button.

## 7. Privacy and the poll's setting

- **What changes.** Within vodle, every participant already sees every rating, keyed by vid (`PRIVACY.md` §5). The export creates a copy outside the end-to-end encryption, held by the chatbot's provider and possibly used for training, depending on the voter's account settings there. Hence the following:
- **The creator's setting.** A new poll field, "AI assessments by participants", is chosen in the draft:
  - *not offered*;
  - *results and distributions only* (the default);
  - *also anonymous individual ratings*.

  The field is shown on the preview and join pages so that participants know before they rate. Polls from before the feature are treated as the default. It is stored like the other poll fields (encrypted), added to the draft-link whitelist (#386), and immutable once the poll runs.
- **Limits.** The setting cannot be enforced technically: a participant can always copy what they see. It states the group's norm, and the app keeps to it.
- **Minimisation.** By default only aggregates, labels instead of identifiers, a fresh voter order for each export, and none of the identifiers listed in §4.
- **Documentation.** A new subsection in `PRIVACY.md` and an FAQ entry. The deployment's privacy statement must mention that participants can pass poll data to third parties of their choice.

## 8. Configuration

- **`environment.ai_assessment`:**
  - `enabled` (default `true`);
  - `services`: the list offered, `[{id, name, url, prefill_param?}]`. The default is ChatGPT, Claude, Copilot, Gemini, Le Chat and Perplexity in alphabetical order, plus "share sheet" and "other". A deployment can shorten the list, reorder it, or add an institutional chatbot.
- **User settings (synced):**
  - `ai_service`: the preferred service;
  - `ai_prompt`: the edited prompt, empty meaning the default;
  - `ai_share_titles`, `ai_share_histograms`, `ai_share_individual`: the last choices in the dialog.
- **Poll field:** `ai_export` = `off` | `aggregate` | `individual`.

## 9. Implementation plan

1. **`src/app/ai-snapshot.ts`** (pure functions, no Angular):
   - `snapshot(input, choices)` builds the document from a plain input (options, effective ratings, tally maps, my vid, the poll's facts);
   - `lowest_rating_that_approves`, which reuses the threshold rule extracted from `update_threshold_and_approvals` into a shared function so that the two cannot diverge;
   - `anonymise` (cryptographic shuffle and relabelling);
   - `snapshot_text(prompt, json)`.
2. **`src/app/ai-assessment-dialog/`:** a modal component with the dialog of §3. It contains the transfer logic of §6, with the share, clipboard and window functions injectable for tests.
3. **Poll page:** the toolbar button; and `Poll.ai_export` with its default.
4. **Draft, preview and join pages:** the creator's setting and its display; draft-link whitelist.
5. **`environment.ts` and `environment.prod.ts`:** the `ai_assessment` block.
6. **i18n:** dialog strings, the default prompt and the setting's labels in ten languages; the `method` text stays English.
7. **Specs:**
   - the snapshot never contains the pid, any vid, the password or a link (searched for in the serialised text);
   - the poll's setting caps the voter's choices;
   - every tally figure in the snapshot equals the poll's own tally;
   - `lowest_rating_that_approves` agrees with a brute-force re-tally;
   - the transfer order and its fallbacks, with stubbed browser APIs;
   - a test for the `method` text against the example of §4.
8. **Documentation:** `PRIVACY.md`, FAQ/help, `deploy/README.md` (the configuration).

Before release, the three transfer paths should be tried by hand on Android, iOS and a desktop browser with the providers in the default list, and the prefill parameters that do not work should be removed.

## 10. Open questions for the owner

1. **Default for the creator's setting:** "results and distributions only", as proposed, or "not offered" until participants are used to the feature?
2. **The default list of providers:** listing commercial services by name may read as an endorsement. Alternatives are a neutral list that the deployment fills in, or an institutional chatbot first.
3. **Strategic advice:** advice on "voting behaviour" may push some voters towards tactical ratings that others do not use. The proposed prompt asks for advice that is consistent with the voter's own preferences and with a broadly acceptable result, and the `method` text states what vodle intends ratings to mean. Whether that is enough, or whether the recommendation part should be phrased more narrowly, is a question of the method's design rather than of the code.
4. **Closed polls:** the story concerns running polls. The same snapshot could serve a reflection on a closed poll ("why did it end like this?") at almost no extra cost.
