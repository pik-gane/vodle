issue #51

after poll has closed, the "poll" page has three sections:
- poll metadata as for an open poll
- "results":
  - for budget sharing polls: 
    - list of options with metadata and shares as numbers and pie pieces, in descending order
    - "why is the budget shared this way?", collapsed by default:
      - "each option gets a share that is proportional to the number of voters who approved this option and did not approve any other option that more voters approved than this one"  
  - for single option polls: 
    - winning option with metadata (as on voting page)
    - "why did this option win?", collapsed by default:
      - paragraph summarizing the reason, e.g.:
        - "this is the only option that everyone approved"
        - "among the options that everyone approved, this one had the highest total rating"
        - "this option was approved by xx% of those voters who did not abstain. no option was approved by more voters. so this option had a xx% chance of winning. the other options together had a (100-xx)% chance of winning. when the poll closed, vodle used these probabilities to perform a lottery between the options. this option won that lottery."
        - "this option was approved by zz% of those voters who did not abstain. among them, aa% also approved some other option that more voters approved than this one. the votes of the remaining xx = zz - aa% (who approved this option and did not approve any other option that more voters approved) went to this option. therefore this option received a xx% chance of winning. the other options together had a (100-xx)% chance of winning. when the poll closed, vodle used these probabilities to perform a lottery between the options. this option won that lottery."
- "your ballot", collapsed by default, showing the same view as for an open poll, but with frozen ratings, without "add option", and with slightly changed status texts (e.g. in past tense).
