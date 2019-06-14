# LotFP Tools

## Help

```bash
smac@ludo:/path/to/rpg-tools/lotfp
$ node index.js -h
usage: index.js [-h] [-v] [-n NUMBER] [-c CLASSES] [-o OUTPUT_DIR]

LotFP Character Generator Saver

Optional arguments:
  -h, --help            Show this help message and exit.
  -v, --version         Show program's version number and exit.
  -n NUMBER, --number NUMBER
                        number of characters to generate, default 100
  -c CLASSES, --classes CLASSES
                        classes to save, default=cleric,fighter,magic-user,
                        specialist
  -o OUTPUT_DIR, --output-dir OUTPUT_DIR
                        location to save files, eg ./output
```

## Example

```bash
smac@ludo:/path/to/rpg-tools/lotfp
$ node ./index.js -n 99 -o /path/to/pregens
Namespace {
  number: '3',
  classes: 'cleric,fighter,magic-user,specialist',
  output_dir: './output' }
Generating character # 1
Invalid class dwarf getting another.
Generating character # 1
Saved /path/to/pregens/lotfp-magic-user-1560493056528.txt
Generating character # 2
Saved /path/to/pregens/lotfp-cleric-1560493057052.txt
Generating character # 3
Saved /path/to/pregens/lotfp-cleric-1560493057615.txt
```