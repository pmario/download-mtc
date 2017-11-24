# Download MTC

## What it does

The first button will save the quine in the browser downloads folder. Download mechanism is set to "overwrite".

The second button will save the quine to a "downloads subfolder" and open itself in a new tab. 

Now the newly created Quine is broken! .. The first button overwrites the quine in the downloads folder an not in the subfolder.

## What it shows

There is no easy way to fix this problem, other than save a dummyfile, to determine, the actual position of the active quine relative to the downloads folder. 

## Request

- There should be an web-ext API, that allows the developer to ask for the existing downloads directory browser setting, so the second quine can determine the relative position in the download folder.
