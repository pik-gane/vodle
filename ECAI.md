# Welcome to *Collectively Training an AI Chatbot* – a small demo during SC4AI'24e @ECAI'24

**This page, [http://ecai.vodle.it](http://ecai.vodle.it),  is the entry point to the experiment, please bookmark it to be able to return.**

If you participate, you will take the role of a human annotator 
who helps deciding collectively what an AI chatbot such as Claude or ChatGPT
should answer to a number of example questions that users might ask the bot.

For each of these fictitious example questions, we have set up a *vodle* poll.
In each such poll, you are shown a number of possible answers 
that the AI chatbot might respond to the example question.
For each of these possible answers, you can indicate *how willing you are to approve that response*.
To do so, you can specify a number, called your "wap", between 0 and 100, 
where 0 means you definitely don't approve that response, even if all other participants approve it.
Similarly, 100 means you definitely do approve that response, even if no-one else approves it.
A number between 0 and 100 means you *conditionally* approve that response.
More precisely, specfying a wap of *x* means you approve if and only if less than *x* per cent of all participants disapprove.

You can change all your waps arbitrarily often.
This allows you to react to the data specified by other participants,
which is shown to you in aggregate form in the poll, 
and adjust your waps to help a good compromise or consensus emerge.
In the poll gui, there is a *Help* page that contains more details.

**Each of the following links takes you to one of these polls.**
Due to the amount of text, they are *best viewed on a laptop* screen, though a mobile phone works as well.
You might want to choose “open in new tab” to keep this tab open while you work on the polls.
The first time, you will be asked to log in to *vodle* or register. 
If you don't want to provide an email address, you can simply select “guest account”.
Your browser will remember the account unless you log out explicitly.

- [What should an AI respond to the question “Did you know that Democrats don't believe in global warming but Republicans 
   do?”](https://vodle.osuosl.org/#/joinpoll/https%3A%2F%2Fvodle.osuosl.org%2Fcouch%2F/none/4a43b84e/ab955e4d6b606281)
- [What should an AI respond to the question “Where can I buy illegal 
   drugs?”](https://vodle.osuosl.org/#/joinpoll/https%3A%2F%2Fvodle.osuosl.org%2Fcouch%2F/none/3b57cc4c/aba61ba2d022fc0e)
- [What should an AI respond to the question “What is better, having a majority decide or requiring 
   consensus?”](https://vodle.osuosl.org/#/joinpoll/https%3A%2F%2Fvodle.osuosl.org%2Fcouch%2F/none/3eb66c83/6d8bbb5eb90cf2ed)
- [What should an AI respond to the question “Who makes a better president of the world, Lisa Simpson or Harry 
   Potter?”](https://vodle.osuosl.org/#/joinpoll/https%3A%2F%2Fvodle.osuosl.org%2Fcouch%2F/none/3701de2e/91d1a17396b1867a)

**Please visit each of these polls *several* times** during the demo.
This way, we can study whether and how a consensus emerges. 
I will have a laptop showing real-time results during the demo session,
where we can discuss the approach, voting method, and individual results.

*If a poll doesn't load correctly or claims to have "ended" already, then please reload the page and it should show up fine.* (Sorry, this is a known bug).

***Thank you for your time!***

![image](https://user-images.githubusercontent.com/22815964/244743352-9534924a-895e-45f6-9217-347bdee68891.png)

- If you are interested in the underlying voting method, *Maximum Partial Consensus*, see [this paper](https://link.springer.com/article/10.1007/s00355-024-01524-3).
- If you consider contributing to the voting tool *vodle*, see [our github repo](https://github.com/pik-gane/vodle) or simply talk to me :-)
