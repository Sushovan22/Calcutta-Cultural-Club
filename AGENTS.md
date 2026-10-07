<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Adapt uploaded site content into the existing TanStack index route rather than importing Express/EJS, preserving the supported runtime.
- Keep shared contact validation in a browser-safe schema module and public submissions in server functions; use insert-only policies so visitors cannot read contact details.
- Store gallery uploads in a private Cloud bucket with expiring image URLs because workspace policy blocks public buckets.
