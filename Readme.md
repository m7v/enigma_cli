# Enigma-CLI

Welcome to Enigma Machine.

### What is it?

The Enigma machine is a cipher device developed and used in the early- to mid-20th century to protect commercial, diplomatic, and military communication. It was employed extensively by Nazi Germany during World War II, in all branches of the German military. The Germans believed, erroneously, that use of the Enigma machine enabled them to communicate securely and thus enjoy a huge advantage in World War II. The Enigma machine was considered to be so secure that even the most top–secret messages were enciphered on its electrical circuits.

This project is emulator of *real* enigma machine.
For more information and enigma works please [read wikipedia](https://www.wikiwand.com/en/Enigma_machine).

### Information
The Wehrmacht used the following abbreviations:
KLAM = Parenthesis
ZZ = Comma
X = Full stop (end of sentence)
YY = Point or dot
X****X = Inverted commas
Question mark (Fragezeichen in German) was usually abbreviated to FRAGE, FRAGEZ or FRAQ.
Foreign names, places, etc. are delimited twice by "X" as in XPARISXPARISX or XFEUERSTEINX
The letters CH were written as Q. ACHT became AQT, RICHTUNG became RIQTUNG
Numbers were written out as NULL EINZ ZWO DREI VIER FUNF SEQS SIEBEN AQT NEUN
It was prohibited to encipher the word "NULL" several times in succession, so they used CENTA (00), MILLE
(000) and MYRIA (0000). Some examples: 200 = ZWO CENTA, 00780 = CENTA SIEBEN AQT 

#### Authentic Wartime Message from the Russian Front

The message was sent by the commander of the SS-Totenkopf Division (SS-T), also known as 3
SS-Panzergrenadier-Division Totenkopf, a division of the Waffen-SS. The message was destined to
the LVI (56) Armee Korps. In April 1941, SS-T was ordered east to join Heeresgruppe Nord, which
formed the northern wing of operation Barbarossa, the campaign against Russia. SS-T saw action in
Lithuania and Latvia, and breached the Stalin Line in July 1941. The message from July 7 contains a
situation report on SS Panzer Regiment 3 and its 1st Battalion. 

The settings as recovered by the CSG codebreakers:

```
Maschine     | Wehrmacht Enigma I
UKW          | B
Walzenlage   | 2 4 5
Ringstellung | BUL
Stecker      | AV BS CG DL FU HZ IN KM OW RX 
```

The Real message was sent by Morse code:
```
Befordert am: 07.07.1941 1925 Uhr Durch:
Funkspruch Nr.:20 Von/An: f8v/bz2
Absendende Stelle : SS-T Div Kdr An: LVI A.K.

fuer m7g 1840 - 2tl 1t 179 - WXC KCH –
RFUGZ EDPUD NRGYS ZRCXN
UYTPO MRMBO FKTBZ REZKM
LXLVE FGUEY SIOZV EQMIK
UBPMM YLKLT TDEIS MDICA
GYKUA CTCDO MOHWX MUUIA
UBSTS LRNBZ SZWNR FXWFY
SSXJZ VIJHI DISHP RKLKA
YUPAD TXQSP INQMA TLPIF
SVKDA SCTAC DPBOP VHJK

2tl 155 - CRS YPJ -
FNJAU SFBWD NJUSE GQOBH
KRTAR EEZMW KPPRB XOHDR
OEQGB BGTQV PGVKB VVGBI
MHUSZ YDAJQ IROAX SSSNR
EHYGG RPISE ZBOVM QIEMM
ZCYSG QDGRE RVBIL EKXYQ
IRGIR QNRDN VRXCY YTNJR 
```

### Installation

Install the dependencies and devDependencies and start the server.

```sh
$ npm i
$ npm run execute-ts
```

For build project...

```sh
$ npm i
$ npm run build
$ npm run execute
```

License
----

MIT
