# Setting up a test poll and looking into all corners

We suggest you use the following tour to familiarize yourself with vodle's components. You can either take the tour in the online version on [vodle.it](http://vodle.it) or in your freshly installed local development version (see [INSTALL.md](../../INSTALL.md)). In the latter case, it will also tell you whether your local installation is working fine.

The tour will take between ten minutes and about half an hour, depending on your preferred pace.

1. On the *My polls* page (see here for its [Angular template](./src/app/mypolls/mypolls.page.html) and [Typescript source code](./src/app/mypolls/mypolls.page.ts)), click the **+** button in the bottom right corner to create a new poll, which should bring you to the *[Draft poll](./src/app/draftpoll/)* page.
2. Choose *select one of several options*, then click the three dots in the top right corner, which should open a [menu](./src/app/draftpoll-kebap/).
3. Choose *Use an example > Icecream flavour (large test poll)*, which should fill the form with a poll title, description, due date, and some options. Adjust the *Poll will close...* setting to *after one hour* to have enough time for your test. 
4. Click the bottom right *Ready* button, which should trigger a short notification by your browser that the poll was saved under 'drafts' and then bring you to the *[Please check](./src/app/previewpoll/)* page.
5. Click *Start the poll now*, which should bring you to the *[Invite poll participants](./src/app/inviteto/)* page.
6. Click *Compose email*, which should open your mail application and show a draft of an invitation email. Send this email to yourself. 
7. Back in the browser, click *Copy link* and verify that the browser shows you a notification that the link was copied to the clipboard, and that the clipboard actually contains an invitation link.
8. In the main menu on the left (maybe hidden behind the three lines main menu button on the top left), choose *My polls*, which should bring you back to that page. Verify that now your new poll is listed under *Running polls* with a badge saying *New*. 
9. Click on the poll to open the *[Poll](./src/app/poll/)* page, which should show you a voting interface with five sliders and a **+** button.
10. Move the rating slider for *Strawberry* slowly to the right and verify that it turns from red to blue to dark green as it enters the light approval bar, and that the hint above the sliders changes from red to yellow.
11. Move the rating slider for *Lemon* slowly to the right and verify that the hint changes in the beginning and again when you pass the rating for *Strawberry*, and that the slider turns light green as it enters the light approval bar.
12. Click the **>** button to the left of *Strawberry* to expand this option's details.
13. Click the *(explain)* link at the end of that expanded text, which should open an overlay page *Approval for Strawberry* showing an animation that explains how this option's approval score is determined. Try the playback controls at the bottom. Then click the arrow in the top-right corner to switch to another animation that explains how this option's share is determined. Then close the overlay.
14. Click the **+** button on the bottom left, which should open an overlay for adding another option. Enter some data, click *Add*, and verify that your browser shows a short notification and the new option is now listed last. 
15. In the main menu, click *Log out*, confirm with *Yes, log out*, and log in with a *different* email than before. (*Note:* due to a bug, the following may not work properly unless you log in *before* clicking the invite link!)
16. Fetch your earlier sent email and click the link contained in it, which should get you to the *[Join a poll](./src/app/joinpoll/)* page. Clicking *OK, let's go* should get you again to the *Poll* page.
17. This time, click *Delegate* in the top right, which should open a [delegation dialog](./src/app/delegation-dialog/). Enter some nickname for your other persona (the one that set up the poll), e.g. simply the first email address you used. Then click *Compose an email* and again send the email to yourself. The *Poll* page should now note that your other persona has not yet responded to your delegation request.
18. Open a second, independent browser session that does not share cookies with the first session (In Chrome, you can do this by opening a *New Incognito Window*), and paste the delegation link from the last email into its URL field. This should again ask you to log in. Do so with the email address you used to set up the poll. Now you can simulate both voters simulateneously. After the login, you should see the *[Act as delegate?](./src/app/delrespond/)* page. 
19. Click *Accept*, which should make your other browser window fire a notification that the delegation request was accepted, and should bring this browser window to the *Poll* page. There you should see a note that "Some of the ratings below are also used for one other voter...".
20. Behind that note, click the three dots, which should expand the note to show you your accepted delegation. Clicking on it will bring you back to the response page. 
21. Clicking *Revoke* will fire another notification in the other window that the request was declined after all, and your own window should now say "You have declined all delegation requests". 
22. Again click the three dots and the request card and now *Accept* again. This will fire another notification in the other window that the request was accepted after all.
23. Switch to the other browser window, which should still be on the *Poll* page. On the top of that page, you should now see some news items with the same information as the earlier notifications.
24. Go to *My polls*, where you should see the same news items. Dismiss them by clicking their **x**. The line listing the test poll should now have a badge saying *Delegated*. Enter the poll again.
25. On the *Poll* page, you should now also see a note that "... controls all of your ratings as your delegate", and a set of delegation toggles on the right edge. Play around with them and verify that the note and ratings sliders change accordingly.
<!--
26. An hour after you started the poll, go back to the *Poll* page to see the results and their explanation.
-->
