# Conventions followed

We try to adhere to existing standards whereever sensible,
but are sometimes following slightly different conventions where it made sense.
We are also very happy to pragmatically deviate from these conventions wherever is makes sense.

## Naming

- Classes are in `CamelCase`
- functions, methods, variables and attributes are in `lowercase_with_underscores`

The main exception to this are attributes that are *very frequently used* and *complex*, such as services,
which are named as follows:
- `D` for the [DataService](../../src/app/data.service.ts)
- `Del` for the [DelegationService](../../src/app/delegation.service.ts)
- `G` for the [GlobalService](../../src/app/global.service.ts)
- `L` for the Logger
- `N` for the [NewsService](../../src/app/news.service.ts)
- `P` for the [PollService](../../src/app/poll.service.ts)
- `S` for the [SettingsService](../../src/app/settings.service.ts)
- `T` for a poll's tallying data cache
