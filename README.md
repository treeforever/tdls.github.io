# tdls-website
Source code for TDLS website.

## Instructions

First, clone this repository from command line. 

Use a static server of your choosing. For python 3 users, try

```python
python -m http.server 8080
```

And navigate to `http://127.0.0.1:8080`

Note: only 8080 may work due to domain restrictions on Google Key. Similarly, only `127.0.0.1` may work, instead of `localhost` or `0.0.0.0`.

## Contribution Guideline

TL;DR: Make a pull request. 

### If you do not have write permission to this repository


1. Fork this repository.
2. `git clone https://github.com/<YOUR-USERNAME>/tdls-website`
3. make changes, commit & push to your own fork
4. Go to the webpage of your own fork (`https://github.com/<YOUR-USERNAME>/tdls-website`) and make a pull request to `https://github.com/tdls/tdls-website`.
5. We will be notified of you PR and review as soon as we can.

### If you have write permission to this repository

In addition to the forking method, you can make a branch in git, commit and push to that branch. This can be achieved via the following commands

```bash
# assuming you are on latested master

git checkout -b <BRANCH_NAME>

# make some changes

git add -A .
git commit -m "some new commit"


git push --set-upstream origin <BRANCH_NAME>

```

And make a pull request from your branch.

