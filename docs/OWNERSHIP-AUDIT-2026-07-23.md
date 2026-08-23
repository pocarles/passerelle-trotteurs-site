# Passerelle Trotteurs platform ownership audit

Audit date: 23 July 2026

Scope: `intranet.passerelle-trotteurs.fr` and the services required to operate,
recover, and legally control it.

## Executive conclusion

We have enough access to operate and technically take control of the Drupal
intranet, including its hosting files, database, backups, users, and content.
We do **not** yet have complete platform ownership.

The remaining blockers are contractual and cross-service:

1. the o2switch customer/billing account that owns the hosting contract;
2. the OVH account that owns the domain, DNS, and mail service;
3. the account behind the public website's AWS/CloudFront infrastructure;
4. the Mailjet account used in the domain's outbound-email policy;
5. an authoritative source repository and a tested independent recovery copy.

Do not treat the takeover as complete until these five items are resolved.

## Access matrix

| Layer | Current access | Evidence | Ownership status |
| --- | --- | --- | --- |
| Drupal intranet | Effective application control | The current Webmaster can create active Administrator users, edit existing administrators and their password fields, and create/edit/delete users and core content. The current account itself is not an Administrator and `/admin` is denied. | Operationally controllable, not yet cleaned up |
| o2switch cPanel | Authenticated technical access | Files, MySQL, FTP, SSH, cron, PHP, certificates, and JetBackup are available. | Technical control confirmed |
| o2switch customer portal | No access | `clients.o2switch.fr` requires a separate login. The cPanel account is a subaccount, not the contract owner. | **Blocking** |
| MySQL | Control through cPanel | One application database and one database user are present; the Drupal configuration points to local MySQL. | Technically recoverable |
| Backups | Restore and download access | JetBackup exposes 119 incremental restore points. The most recent observed point is 22 July 2026. | Available, restore not tested |
| OVH domain/DNS | No authenticated access | OVH is the registrar and authoritative DNS provider. The OVH Manager session is not authenticated for this domain. | **Blocking** |
| Mail service | No authenticated access | MX records point to OVH. cPanel contains no hosted mailboxes. SPF references Mailjet. | **Blocking** |
| Public website | No authenticated infrastructure access | `www.passerelle-trotteurs.fr` is served through AWS CloudFront, separately from the intranet. | **Blocking if the public site is in scope** |
| Production source control | No existing repository | cPanel Git Version Control reports zero repositories and the deployed project contains no `.git` directory. | **Blocking for maintainable ownership** |
| New GitHub repository | Owner access | Private repository `pocarles/passerelle-trotteurs-intranet`. | Available; source import still required |

## Technical inventory

### Hosting

- Provider: o2switch
- Technical panel: cPanel on `goeland.o2switch.net`
- Account type: delegated subaccount
- Server IP observed: `109.234.166.78`
- cPanel version observed: `134.0.45`
- Global PHP version observed: `8.3`
- Shell: enabled
- Two-factor authentication: **disabled**
- Recovery/contact email: **none configured**
- cPanel API tokens: none
- SSH keys: none
- Team-user feature: unavailable on this subaccount

The credentials used for this audit came from an approved secure source. They
are intentionally not recorded here.

### Domain routing

- Registrar: OVH
- Domain expiration observed: 18 January 2027
- Authoritative DNS: OVH
- Apex domain redirects to `www`
- `www` is served by AWS CloudFront
- `intranet` resolves directly to o2switch
- Mail exchangers are hosted by OVH
- SPF includes Mailjet

This means domain, public-site, intranet, and email ownership are split across
at least four administrative surfaces.

### Drupal application

- Project type: Composer-based Drupal recommended project
- Installed Drupal core version: `11.2.2`
- Web document root:
  `public_html/passerelletrotteur/intranet/www/web`
- Private-file directory is outside the web document root
- One MySQL database is attached to one application database user
- Database credentials and the Drupal hash salt are stored in production
  `settings.php`
- The configured sync directory contains only protective/default files, not a
  usable Drupal configuration export

The database is therefore part of the authoritative application configuration,
not merely runtime content. A source-only export is insufficient for recovery.

### Custom code

The deployment contains:

- 15 custom Drupal modules;
- one custom theme named `trotteurs`;
- 61 custom-module source files;
- 51 custom-theme files.

The custom modules cover:

- role assignment and user-edit behavior;
- structure, owner, and adopter access rules;
- horse references, age filters, maps, and statistics;
- SETF reminders;
- geocoding fallback;
- registration email checks and application redirects.

A pattern-based scan of 97 custom text/source files found no obvious hardcoded
passwords, API keys, access tokens, or private-key material. This is useful
evidence, not a substitute for a full code review.

### Scheduled work

One active hourly cron entry calls:

`https://intranet.passerelle-trotteurs.fr/cdw/relance-setf/run`

The corresponding custom Drupal route is configured with public access. Do not
invoke it manually during routine testing. Its authentication, idempotency, and
email side effects should be reviewed before ownership is finalized.

### Delegated technical access

The hosting account currently includes:

- the main cPanel/FTP identity;
- two delegated FTP identities, including a named developer identity;
- a log-access identity.

The delegated FTP roots appear broad enough to reach the account home
directory. Passwords cannot be viewed, so these identities must be reviewed and
rotated or removed during the controlled takeover. No such change was made
during this audit.

## Backup and recovery position

JetBackup reports:

- 119 available restore points;
- incremental daily backups;
- recent backups on an external daily destination;
- coverage for home files, cron jobs, databases, database users, domains,
  certificates, email accounts, and FTP accounts;
- approximately 291 MB of total account usage at the time of inspection.

What remains unproven:

- no restore was performed;
- no independent export was downloaded;
- no staging environment was rebuilt;
- no recovery-time objective has been agreed;
- access to backups still depends on the same o2switch technical account.

The first controlled takeover exercise should restore a recent backup to a
non-production environment and verify login, database integrity, private files,
scheduled jobs, and email suppression.

## Required takeover actions

### Priority 0 — establish legal and recovery ownership

- [ ] Transfer or grant owner-level access to the o2switch customer account.
- [ ] Confirm billing owner, legal entity, renewal method, recovery email, and
      support PIN/process.
- [ ] Transfer or grant owner-level access to the OVH account.
- [ ] Confirm domain registrant, administrative contact, renewal, 2FA, recovery,
      DNS zones, and OVH mailboxes.
- [ ] Identify and transfer the AWS/public-site account behind CloudFront.
- [ ] Identify and transfer the Mailjet account and document the SMTP sender,
      validated domains, API credentials, and suppression lists.
- [ ] Download an independent full backup and complete a non-production restore.

### Priority 1 — make the application maintainable

- [ ] Export the production Composer project, custom modules, and custom theme
      into this GitHub repository.
- [ ] Exclude `settings.php`, uploaded files, private documents, database dumps,
      API credentials, and recovery material from Git.
- [ ] Produce a sanitized `settings.example.php` or environment-variable
      contract.
- [ ] Create and commit a complete Drupal configuration export.
- [ ] Document the database restore, file restore, cache rebuild, and deployment
      commands.
- [ ] Review Drupal/core and contributed-module update status.
- [ ] Review the two intentionally public custom routes and the hourly reminder
      job.

### Priority 2 — replace shared and legacy access

- [ ] Create named Drupal Administrator accounts for the approved owners.
- [ ] Remove the Webmaster role's ability to create or reset Administrator
      accounts unless that is an explicit policy.
- [ ] Enable 2FA and add external recovery contacts to cPanel.
- [ ] Replace shared hosting access with named access where the hosting plan
      permits it.
- [ ] Review and rotate or remove all FTP identities.
- [ ] Prefer SSH keys or narrowly scoped API tokens over shared passwords.
- [ ] Rotate the credential used for this audit after recovery access is proven.
- [ ] Grant Méline access to this private GitHub repository using her confirmed
      GitHub username.

## Access runbook

### GitHub

Repository:
`https://github.com/pocarles/passerelle-trotteurs-intranet`

The repository must contain documentation and source only. Credentials,
production data, database dumps, uploaded documents, and backup archives belong
in an approved encrypted storage or password-management system.

### Drupal

URL: `https://intranet.passerelle-trotteurs.fr/`

The current access path is sufficient to create a dedicated Administrator, but
that was intentionally not done during the read-only audit. Account creation,
role cleanup, and password rotation belong in the controlled takeover window.

### o2switch technical panel

URL: `https://goeland.o2switch.net:2083/`

The technical credential must be supplied through the approved password
manager. cPanel provides the production files, database management, JetBackup,
FTP/SSH controls, PHP settings, certificates, and cron jobs.

The separate contract/customer portal is:
`https://clients.o2switch.fr/`

Access to the technical panel does not prove ownership of the hosting contract.

### OVH

Manager: `https://www.ovh.com/manager/`

This account is required for the registrar, DNS, and mail layer. No usable OVH
session or credential was available during the audit.

## Audit safety

The live audit was read-only:

- no Drupal user, role, password, record, or configuration was changed;
- no cPanel contact, token, 2FA, FTP, SSH, domain, PHP, or cron setting was
  changed;
- no backup was created, restored, or downloaded;
- no OVH, o2switch customer, AWS, Mailjet, or mail account was modified;
- no production secret or personal-data export was added to GitHub.
