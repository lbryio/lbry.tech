//this doc has been moved to lbry.tech repo, will clean up later.
# URI

## Regex

If you are a robot and prefer regexes to English, here's the full regex for lbry:// URIs:

```
(?P<uri>
  ^
  (?P<protocol>lbry\:\/\/)?
  (?P<content_or_channel_name>
    (?P<content_name>[a-zA-Z0-9\-]+)
    |
    (?P<channel_name>\@[a-zA-Z0-9\-]{4,})
  )
  (?P<modifier>
    (?:\#(?P<claim_id>[0-9a-f]{1,40}))
    |
    (?:\$(?P<bid_position>\-?[1-9][0-9]*))
    |
    (?:\:(?P<claim_sequence>\-?[1-9][0-9]*))
  )?
  (?:\/(?P<path>[a-zA-Z0-9\-]+))?
  $
)

```

## Protocol

The LBRY protocol is called `lbry`. URIs using the protocol must start with `lbry://`.

## Reserved characters

- CHANNEL_CHAR = '@'
- CLAIM_ID_CHAR = '#'
- CLAIM_SEQUENCE_CHAR = ':'
- BID_POSITION_CHAR = '$'
- PATH_CHAR = '/'
- QUERY_CHAR = '?'

## Names

Names may contain English letters (upper and lower case), numbers, and hyphens.

### Content Name

`content_name` is the name of piece of content. 

### Channel Name

`channel_name` is the name of a channel (aka publisher identity). It must start with CHANNEL_CHAR, 
followed by at least 4 name characters.

## Modifiers

Only one modifier is allowed at a time.

### Claim ID

`claim_id` is a hex string identifying a claim. 
A claim id is prefixed with the CLAIM_ID_CHAR.
Partial claim ids are allowed (same is git hashes), and 
will resolve to the oldest claim who's id starts with the given characters. 

### Claim Sequence

`claim_sequence` is a positive integer (>= 1) that resolves to the Nth claim for a given name.
A claim sequence is prefixed with the CLAIM_SEQUENCE_CHAR.
All valid claims are considered, in the order that they appear in the blockchain. 
Nonwinning claims are included.

For example, `lbry://@chan:1` resolves to the oldest valid claim for `@chan`, even if that claim is no longer the winning claim for `@chan`.

Negative claim sequence numbers will be supported eventually. 

### Bid Position

_not implemented yet_

`bid_position` is a positive integer (>= 1) that resolves to the Nth highest-bid claim for a given name.
A bid position is prefixed with the BID_POSITION_CHAR.
All valid claims are considered, in order from highest bid to lowest bid, with ties being broken by claim age. 
Nonwinning claims are included.

For example, `lbry://@chan$1` always resolves to the current winning claim for `@chan`. `@chan` and `@chan$1` are equivalent.

Negative bid position numbers will be supported eventually.

## Path

`path` is a Unix-style path that resolves to a claim within a channel. 
A path is prefixed with PATH_CHAR.
Only paths one level deep are currently supported.
Only channel claims may have a path.

For example, `lbry://@chan/snaps_from_last_night` resolves to the claim for `snaps_from_last_night` that is signed by `@chan`

## Query Params

_not implemented yet_
