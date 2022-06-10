Currently the workflow is still manual
1. Push to remote main
2. On github, merge into github-pages-test
3. Pull to local github-pages-test: `git switch github-pages-test; git pull`
4. Build web page locally with `ionic build --prod` (no longer `ionic capacitor build browser --prod`)
5. If all seems fine, `rm -rf docs; cp -r www docs`
6. Commit and push to remote github-pages-test: `git add .; git commit; git push`
7. (not yet working:) wait for the page building workflow on gitub finishes 
    - TODO: create that workflow as a copy of [the live workflow](https://github.com/pik-gane/vodle/actions/workflows/pages/pages-build-deployment) but without the deployment step. But how? I can't find a corresponding workflow YAML file...
8. If all seems fine, on github merge github-pages-test into github-pages-live, which will trigger the actual deployment workflow.
9. Make a final check on the [live page](http://vodle.it) whether all look fine.
10. Don't forget to switch back to your working branch! `git switch ...`


(Later we could do this via a github workflow/actions)