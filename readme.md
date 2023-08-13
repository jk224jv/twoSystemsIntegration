# Integration of two systems

## Installation

run npm install
npm start

## Krav

Det ena systemet levererar ett radbaserat filformatmedan det andra kräver XML. Du ska skriva enkonverterare som bygger upp rätt XML-struktur utifråninput.. Använd valfritt programspråk!

## Requirements

The first system delivers a line-based file format while the other requires XML. You will write a converter that builds the correct XML structure based on input. Use any programming language!

## Indata

```` TEXT
Filformat input:
P|firstname|lastname
T|cellphone|landline
A|street|city|area code
F|name|birth year
P can be followed by T, A and F
F can be followed by T and A
Example:
P|Victoria|Bernadotte
T|070-0101010|0459-123456
A|Haga Slott|Stockholm|101
F|Estelle|2012
A|Solliden|Öland|10002
F|Oscar|2016
T|0702-020202|02-202020
P|Joe|Biden
A|White House|Washington, D.C
````

## Utdata / Output

```` XML
<people>
  <person>
    <firstname>Victoria</firstname>
    <lastname>Bernadotte</lastname>
    <address>
      <street>Haga Slott</street>
      ...
     </address>
    <phone>
      <mobile>070-0101010</mobile>
      ...
    </phone>
    <family>
      <name>Estelle</name>
        <born>2012</born>
        <address>...</address>
     </family>
     <family>...</family>
  </person>
  <person>...</person>
</people>
````
