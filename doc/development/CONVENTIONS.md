# Conventions followed

We try to adhere to existing standards whereever sensible,
but are sometimes following slightly different conventions where it made sense.
We are also very happy to pragmatically deviate from these conventions wherever is makes sense.

## Naming

- Classes are in `CamelCase`
- functions, methods, variables and attributes are in `lowercase_with_underscores`
- variables of type Map or Set have `_map` or `_set` in their name (see [below](#data-structures)).

There are two main exceptions to this.

1. Methods that override parent class functions or that are in some sense "standard methods" use CamelCase if that is the general convention for such methods. An example of this is `onClick` instead of `on_click`.
2. Attributes that are *very frequently used* and *complex*, such as services, are named using uppercase letters as follows:
    - `D` for the [DataService](../../src/app/data.service.ts)
    - `Del` for the [DelegationService](../../src/app/delegation.service.ts)
    - `G` for the [GlobalService](../../src/app/global.service.ts)
    - `L` for the Logger
    - `N` for the [NewsService](../../src/app/news.service.ts)
    - `P` for the [PollService](../../src/app/poll.service.ts)
    - `S` for the [SettingsService](../../src/app/settings.service.ts)
    - `T` for a poll's tallying data cache


## Data structures

As container data structures, we use [Maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), [Sets](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set), [Records](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type), and standard Arrays. 

Therefore, special care has to be taken not to confuse their syntax for accessing and looping over entries, which can cause very hard-to-identify bugs. There is a [cheat sheet](../../src/app/typescript_cheat_sheet.md) summarizing the differences. 

For this reason, all variables of type Map or Set have `_map` or `_set` in their name.
