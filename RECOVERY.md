# Recovery Support Protocol

**Established:** August 3, 2026
**Tag:** `stable-recovery-point`
**Branch:** `fallback/stable-recovery-point`

This repository state has been designated by the CTO as the **Permanent Stable Fallback**. 

It contains the pristine, approved HTML structure for the Radiance Glamour Lounge with the correctly hydrated `/book/` links and functional mobile menus, without any experimental embedded styling that overrides the live Elementor WordPress CSS.

### How to use this recovery point

If future development causes regressions, broken styling, or mismatched pages, immediately revert to this state by running the following command in the terminal:

```bash
git checkout stable-recovery-point -- pages/
```
*(This will safely overwrite your `pages/` directory with the files from this exact moment.)*

### Emergency Zip
A permanently backed up copy of the theme at this exact state has been generated and saved at:
`_deploy/radiance-theme-STABLE-FALLBACK.zip`

You can upload this zip file directly to your WordPress Dashboard > Appearance > Themes to instantly recover the site at any time.
