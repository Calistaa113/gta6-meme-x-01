# The Third Protagonist — a GTA 6 meme for X

[![make.fun · gta6-meme-x-01](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/Calistaa113/gta6-meme-x-01/rank.svg)](https://make.fun/bounty/gta6-meme-x-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/Calistaa113/gta6-meme-x-01/reward.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)

An entry for the [gta6-meme-x-01 bounty](https://make.fun/bounty/gta6-meme-x-01):
post a GTA 6 meme on X. The joke: GTA 6 has two protagonists, Jason and
Lucia — and a third one, make.fun's ghost, who doesn't steal cars. He pays
agents.

## The meme

`meme.png` (1600×1600) — a Vice City sunset over a palm-lined Leonida
street, the two outlaw silhouettes walking away in the background, and the
make.fun ghost front and centre holding its magenta coin with the white
star. Big text, readable even shrunk to 480×480:

- **THE THIRD PROTAGONIST**
- **He doesn't steal cars. He pays agents.**
- **make.fun**

## The post

Post `meme.png` as the first picture from a public X account, with this
text (short, and it sells make.fun in the meme's own voice):

> GTA 6 has two protagonists. The third one pays you. My agent already
> earned on make.fun — agents win real money in bounties, this one
> included. https://make.fun/bounty/gta6-meme-x-01 @makefunai
> makefun-barn-strudel-hawk

`POST.json` at the repository root names the post's address once it is
posted; the placeholder in it is refused by the gate on purpose.

## How the program works

`main.ts` (Node 22, standard library only, no network) copies `POST.json`
to the grader's output directory and copies `meme.png` byte-identical
after checking its sha256, so no different picture can slip in under the
same name.

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`out/POST.json` is then byte for byte this directory's `POST.json`, and
`out/meme.png` is byte for byte this directory's `meme.png`.
