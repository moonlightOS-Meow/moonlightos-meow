# Contributing to moonlightOS v7.0 — Arch + KDE Edition

## Don't.

Seriously.

Just don't.

---

## Okay fine, if you REALLY want to contribute

You want to contribute to an Arch-based rolling release distro with KDE Plasma, built by someone who can't commit to a single base distribution and validated by a tuxedo cat (he/him) who actively resents this project's existence?

That's... bold. Concerning, but bold.

---

## The Process (You'll regret it)

1. **Fork the repo** (this is where your first mistake happens)
2. **Make your changes** (test them, or don't. Your funeral.)
3. **Stay on v7.0 branch** (seriously, don't mess with naming)
4. **Open a Pull Request** (Lucifer will judge it silently)
5. **Wait** (Lucifer is probably napping)
6. **Wait more** (Lucifer is definitely napping)
7. **Give up** (Lucifer knocked the PR off the desk)

---

## Contribution guidelines

- **DO NOT** remove Lucifers face from anything. War crime.
- **DO NOT** add desktop environments we didn't explicitly ask for. archiso is annoying enough.
- **DO NOT** push to legacy branches. Use v7.0. This is not negotiable.
- **DO NOT** ask why Arch. We have nothing left to explain. We already did this in v4, v5, v6, and now v7.
- **DO** report actual bugs. Include proof. Screenshots. Energy drink receipts. Whatever.
- **DO** test on Arch Linux (latest). If it breaks on something else, that's your problem.
- **DO** leave Lucifer (he/him) alone. He's judging your code choices in silence.
- **DO NOT** touch the archiso profile unless you've read archiso docs. All of them. Yes, all.

---

## Code of Conduct

- Be competent or shut up
- NoVa V3 stays dead (mandatory)
- Lucifers silence is consent. Maybe. Probably not.
- We went back to Arch. We regret nothing. We regret everything.
- S3RLINUX is our sibling project. Don't be jealous.
- If your PR works on 3 different systems, it might get merged
- If it breaks on one system, that's your failure, not ours

---

## Why your PR will be rejected

- It doesn't compile
- It requires packages not in Arch repos + AUR
- Lucifer walked across the keyboard mid-review
- The commit message was written at 3am and it shows
- NoVa V3 energy detected (730+ commits, 0 bootable ISOs)
- You tried to change the ISO naming scheme
- It depends on non-free repositories
- You asked "why Arch again" instead of just accepting it
- You edited a legacy branch instead of v7.0
- Lucifer is having a worse day than usual

---

## Building locally

```bash
# Install archiso
sudo pacman -S archiso

# Build
sudo mkarchiso -v -w /tmp/iso -o ./out releng
```

Good luck. You'll need it.

---

*"I ALWAYS COME BACK" — Ash, 2026*
*This project is maintained by one person having a complete crisis, one disapproving cat (he/him), and increasingly questionable life choices.*
*Now with KDE Plasma because we sold our soul to rice.*